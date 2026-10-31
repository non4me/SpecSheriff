import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readCode, type CodeFile, type CodeSymbol } from "./code.ts";
import { loadConfig, readsAs, type Config } from "./config.ts";
import { before, changes, codeChanges, commitTexts, git, trackedFiles } from "./diff.ts";
import { addresses, partOf } from "./model.ts";
import { judgedHere } from "./reindex.ts";
import { loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";
import { generateTypes, typeFiles, waitingRecords } from "./types.ts";
import type { Finding } from "./validate.ts";

export interface BindingFinding extends Finding {
  /** Reported only: it refuses nothing. */
  reported?: true;
}

const SID_ANYWHERE = /\bs-[2-9a-hjkmnp-z]{15}\b/g;

/** The files the check of the citations outside the specification reads: the code, the tests and the documents, the tools' own included. */
function outsideFiles(root: string, config: Config): string[] {
  return trackedFiles(root).filter((p) => !p.startsWith("specs/") && (readsAs(config, p) !== null || p.endsWith(".md")));
}

async function readAll(root: string, paths: string[]): Promise<CodeFile[]> {
  const files: CodeFile[] = [];
  for (const path of paths) {
    const read = await readCode(path, readFileSync(join(root, path), "utf8"));
    if (read) files.push(read);
  }
  return files;
}

const allSymbols = (symbols: CodeSymbol[]): CodeSymbol[] => symbols.flatMap((s) => [s, ...allSymbols(s.inner)]);

export interface Commit {
  codeFiles: CodeFile[];
  testFiles: CodeFile[];
  /** The symbols whose code the commit adds or changes, by file. */
  changedSymbols: Map<string, Set<CodeSymbol>>;
  /** The names of the tests the commit adds or changes, by file. */
  changedTests: Map<string, Set<string>>;
}

/** How a file is read: as the settings' globs say, a file of the generated types as the system's code even where they do not reach it. */
export function reader(config: Config, spec: Specification): (path: string) => "code" | "tests" | null {
  const types = new Set(typeFiles(spec).paths.filter((p) => !p.endsWith(".json")));
  return (path) => readsAs(config, path) ?? (types.has(path) ? "code" : null);
}

/** The code and the tests as the commit leaves them, and what of them it adds or changes. */
export async function readCommit(root: string, config: Config, spec = loadSpecification(root)): Promise<Commit> {
  const reads = reader(config, spec);
  const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)));
  const codeFiles = await readAll(root, tracked.filter((p) => reads(p) === "code"));
  const testFiles = await readAll(root, tracked.filter((p) => reads(p) === "tests"));
  const commit = changes(root).filter((c) => reads(c.path) !== null);
  const lines = await codeChanges(commit, await commitTexts(root, (p) => reads(p) !== null));
  const changedSymbols = new Map<string, Set<CodeSymbol>>();
  const changedTests = new Map<string, Set<string>>();
  for (const change of commit) {
    const now = [...codeFiles, ...testFiles].find((f) => f.path === change.path);
    if (!now) continue;
    const was = before(root, change.before ?? change.path);
    const old = was === null ? null : await readCode(change.path, was);
    // Code changes as the rule on tags counts them; a test changes with any line of its text.
    const real = reads(change.path) === "tests"
      ? { added: new Set(change.added.map((l) => l.line)), removed: new Set(change.removed.map((l) => l.line)) }
      : lines.get(change.path)!;
    const symbols = new Set<CodeSymbol>();
    const tests = new Set<string>();
    const inSymbol = (file: CodeFile, line: number) =>
      allSymbols(file.symbols).filter((s) => (s.start <= line && line <= s.end) || s.tags.some((t) => t.line === line));
    for (const line of real.added) {
      inSymbol(now, line).forEach((s) => symbols.add(s));
      now.tests.filter((t) => t.start <= line && line <= t.end).forEach((t) => tests.add(t.name));
    }
    for (const line of real.removed) {
      if (!old) continue;
      for (const s of inSymbol(old, line)) allSymbols(now.symbols).filter((n) => n.name === s.name).forEach((n) => symbols.add(n));
      old.tests.filter((t) => t.start <= line && line <= t.end).forEach((t) => tests.add(t.name));
    }
    changedSymbols.set(change.path, symbols);
    changedTests.set(change.path, tests);
  }
  return { codeFiles, testFiles, changedSymbols, changedTests };
}

/** The sids the tags on the symbols a commit changes name, inner symbols' own included. */
export function changedTags(commit: Commit): Set<string> {
  const sids = new Set<string>();
  for (const symbols of commit.changedSymbols.values()) for (const s of symbols) for (const t of s.tags) if (t.sid) sids.add(t.sid);
  return sids;
}

export async function binding(root: string): Promise<BindingFinding[]> {
  const findings: BindingFinding[] = [];
  const config = loadConfig(root);
  const spec = loadSpecification(root);
  const exists = (sid: string) => spec.nodes.has(sid);
  const checked = (sid: string) => spec.nodes.get(sid)?.node.status === "checked";
  const { codeFiles, testFiles, changedSymbols, changedTests } = await readCommit(root, config, spec);
  const at = (path: string, line: number) => `${path}:${line}`;

  // Tags.
  const rulesChanged = new Set<string>();
  for (const file of codeFiles) {
    for (const p of file.problems) findings.push({ where: at(file.path, p.line), message: p.message });
    for (const s of file.symbols) if (s.tags.length === 0) findings.push({ where: at(file.path, s.start), message: `${s.name} carries no tag` });
    for (const s of allSymbols(file.symbols)) {
      const changed = changedSymbols.get(file.path)?.has(s) ?? false;
      for (const t of s.tags) {
        if (!t.sid) continue;
        if (!exists(t.sid)) findings.push({ where: at(file.path, t.line), message: `the tag on ${s.name} ${t.sid} names no node` });
        else if (changed && !checked(t.sid)) findings.push({ where: at(file.path, t.line), message: `${s.name}, whose code the commit changes, is tagged ${t.sid}, a node not checked` });
        if (changed && spec.nodes.get(t.sid)?.node.kind === "rule") rulesChanged.add(t.sid);
      }
    }
  }

  // Tests.
  const testSids = new Set<string>();
  for (const file of testFiles) {
    for (const t of file.tests) {
      if (!t.sid) {
        findings.push({ where: at(file.path, t.start), message: `the test "${t.name}" carries no sid` });
        continue;
      }
      testSids.add(t.sid);
      const kind = spec.nodes.get(t.sid)?.node.kind;
      if (!exists(t.sid)) findings.push({ where: at(file.path, t.start), message: `the test "${t.name}" carries ${t.sid}, which names no node` });
      else if (kind !== "rule" && kind !== "term") {
        const named = kind === "record" ? "a data record" : kind === "domain" ? "a domain's header" : `a ${kind}`;
        findings.push({ where: at(file.path, t.start), message: `the test "${t.name}" carries ${t.sid}, ${named}, where a test carries the sid of a rule or a term` });
      } else if (changedTests.get(file.path)?.has(t.name) && !checked(t.sid)) {
        findings.push({ where: at(file.path, t.start), message: `the test "${t.name}", which the commit changes, carries ${t.sid}, a node not checked` });
      }
    }
  }
  for (const sid of rulesChanged) {
    if (!testSids.has(sid)) findings.push({ where: nodeWhere(spec, sid), message: "a rule whose code the commit adds or changes, and no test carries its sid" });
  }

  // The lists in the nodes' metadata, and the lists against their declarations.
  const producedCode = new Map<string, Map<string, Set<string>>>();
  for (const file of codeFiles) {
    for (const s of allSymbols(file.symbols)) for (const t of s.tags) {
      if (!t.sid) continue;
      if (!producedCode.has(t.sid)) producedCode.set(t.sid, new Map());
      const files = producedCode.get(t.sid)!;
      if (!files.has(file.path)) files.set(file.path, new Set());
      files.get(file.path)!.add(s.name);
    }
  }
  const producedTests = new Map<string, Set<string>>();
  for (const file of testFiles) for (const t of file.tests) {
    if (!t.sid) continue;
    if (!producedTests.has(t.sid)) producedTests.set(t.sid, new Set());
    producedTests.get(t.sid)!.add(`${file.path}::${t.name}`);
  }
  for (const [sid, { node, file }] of spec.nodes) {
    if (!judgedHere(file.path, config.writesSpecSheriffGuidelines)) continue;
    const meta = (node.meta ?? {}) as { code?: Array<{ file: string; symbols?: string[] }>; tests?: string[] };
    const produced = producedCode.get(sid) ?? new Map<string, Set<string>>();
    const listed = (meta.code ?? []).map((c) => c.file).sort();
    const want = [...produced.keys()].sort();
    if (listed.join("|") !== want.join("|")) {
      findings.push({ where: nodeWhere(spec, sid), message: `its list of code, ${listed.join(", ") || "none"}, is not what the tags produce: ${want.join(", ") || "none"}` });
    }
    // A node naming the symbols in a file names exactly those that carry its tag.
    for (const c of meta.code ?? []) {
      if (!c.symbols) continue;
      for (const name of c.symbols) {
        if (!produced.get(c.file)?.has(name)) findings.push({ where: nodeWhere(spec, sid), message: `names the symbol ${name} in ${c.file}, which carries no tag naming it` });
      }
      for (const name of produced.get(c.file) ?? []) {
        if (!c.symbols.includes(name)) findings.push({ where: nodeWhere(spec, sid), message: `leaves out the symbol ${name} in ${c.file}, which carries its tag` });
      }
    }
    const listedTests = [...(meta.tests ?? [])].sort();
    const wantTests = [...(producedTests.get(sid) ?? [])].sort();
    if (listedTests.join("|") !== wantTests.join("|")) {
      findings.push({ where: nodeWhere(spec, sid), message: `its list of tests is not what the tests' sids produce: ${wantTests.join(", ") || "none"}` });
    }
    const list = node.list as { of: string; members: string[]; declaredIn?: { file: string; declaration: string } } | undefined;
    if (list?.declaredIn) {
      const declared = await declaration(root, list.declaredIn.file, list.declaredIn.declaration);
      const same = declared !== null && [...declared].sort().join("|") === [...list.members].sort().join("|");
      if (!same) findings.push({ where: nodeWhere(spec, sid), message: `its list of ${list.of} does not match ${list.declaredIn.declaration} in ${list.declaredIn.file}: ${declared === null ? "no such declaration" : declared.join(", ")}` });
    }
  }

  const running = new Set(testFiles.flatMap((f) => f.tests.filter((t) => t.sid && !t.skipped).map((t) => t.sid!)));
  findings.push(...implementation(spec, new Set(producedCode.keys()), running));
  findings.push(...generatedCopies(root, spec));
  findings.push(...addressesOutside(root, config, spec));
  findings.push(...drift(root, spec, config));
  return findings;
}

/**
 * Each checked rule outside the SpecSheriff guidelines, a project's own guidelines and the technical debt that no tagged
 * symbol or no test that runs carries out — its own, or one of a rule implementing it, followed down the implements
 * links — unless an exempts link reaches it or a section it stands under. Reported only.
 */
function implementation(spec: Specification, tagged: Set<string>, tested: Set<string>): BindingFinding[] {
  const parent = new Map<string, string>();
  for (const f of spec.files) {
    const walk = (nodes: SpecNode[], up?: string): void => nodes.forEach((n) => {
      if (up) parent.set(n.sid, up);
      walk(n.children ?? [], n.sid);
    });
    walk(f.data.nodes);
  }
  const pointing = (type: string): Map<string, string[]> => {
    const by = new Map<string, string[]>();
    for (const [sid, { node }] of spec.nodes) for (const r of node.refs) if (r.type === type && r.to) by.set(r.to, [...(by.get(r.to) ?? []), sid]);
    return by;
  };
  const implementers = pointing("implements");
  const exempting = pointing("exempts");
  const found: BindingFinding[] = [];
  for (const [sid, { node, file }] of spec.nodes) {
    if (node.kind !== "rule" || node.status !== "checked") continue;
    if (file.path.startsWith("specs/_guidelines/") || file.path === "specs/tech/debt.json") continue;
    let exempt = false;
    for (let at: string | undefined = sid; at && !exempt; at = parent.get(at)) exempt = exempting.has(at);
    if (exempt) continue;
    const chain = new Set([sid]);
    for (const s of chain) for (const by of implementers.get(s) ?? []) chain.add(by);
    const hasTag = [...chain].some((s) => tagged.has(s));
    const hasTest = [...chain].some((s) => tested.has(s));
    if (hasTag && hasTest) continue;
    const lacks = hasTag ? "no test that runs carries its sid"
      : hasTest ? "no symbol of the system's code carries its tag"
      : "neither a symbol of the system's code carries its tag nor a test that runs its sid";
    found.push({ where: nodeWhere(spec, sid), message: `not implemented: ${lacks}`, reported: true });
  }
  return found;
}

/** The files of the generated types and runtime checks, each compared with what the data record nodes generate now. */
function generatedCopies(root: string, spec: Specification): BindingFinding[] {
  const { files, refusals } = generateTypes(spec);
  const found: BindingFinding[] = [...refusals];
  // Code generated from the nodes waits for every node it comes from to be checked, and no commit changes it meanwhile.
  const waiting = waitingRecords(spec);
  if (waiting.length) {
    for (const sid of waiting) found.push({ where: nodeWhere(spec, sid), message: "the types and runtime checks generated from the data record nodes wait for its confirmation", reported: true });
    for (const f of files) {
      const path = join(root, f.path);
      const kept = existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : null;
      const last = before(root, f.path)?.replace(/\r\n/g, "\n") ?? null;
      if (kept !== last) found.push({ where: f.path, message: `changed while the data record nodes it is generated from wait for their confirmation: ${waiting.join(", ")}` });
    }
    return found;
  }
  for (const f of files) {
    const path = join(root, f.path);
    // Git may check a text file out with CRLF endings; what is committed holds LF.
    const kept = existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : null;
    if (kept === null) found.push({ where: f.path, message: "missing: a file of the generated types and runtime checks, which sheriff types writes" });
    else if (kept !== f.text) found.push({ where: f.path, message: "not what the data record nodes generate now; sheriff types writes it anew" });
  }
  return found;
}

function nodeWhere(spec: Specification, sid: string): string {
  const at = spec.nodes.get(sid)!;
  return `${at.file.path}: ${sid} (${at.node.id})`;
}

/** The members a declaration holds: the enum a JSON pointer names in a schema, or the string literals of a symbol in the code. */
async function declaration(root: string, file: string, name: string): Promise<string[] | null> {
  if (!existsSync(join(root, file))) return null;
  const text = readFileSync(join(root, file), "utf8");
  if (file.endsWith(".json")) {
    let value: unknown = JSON.parse(text);
    for (const step of name.replace(/^#\/?/, "").split("/").filter(Boolean)) {
      value = (value as Record<string, unknown> | undefined)?.[step.replace(/~1/g, "/").replace(/~0/g, "~")];
    }
    const members = Array.isArray(value) ? value : (value as { enum?: unknown[] } | undefined)?.enum;
    return Array.isArray(members) ? members.map(String) : null;
  }
  const read = await readCode(file, text);
  return read?.symbols.find((s) => s.name === name)?.strings ?? null;
}

/** Every file the repository keeps outside `specs/` and the tools, tracked by git or new and not ignored. */
function keptOutside(root: string, config: Config): string[] {
  return trackedFiles(root).filter((p) => !p.startsWith("specs/") && !(config.writesSpecSheriffGuidelines && p.startsWith("skills/")) && existsSync(join(root, p)));
}

function addressesOutside(root: string, config: Config, spec: Specification): BindingFinding[] {
  const prefixes = new Set(["contracts", "tech", "_guidelines/spec", "_guidelines/tools", "_guidelines/project"]);
  for (const f of spec.files) {
    const { part, file } = partOf(f.path);
    prefixes.add(part === "_guidelines" || part === "tech" ? `${part}/${file}` : part);
  }
  const escape = (p: string) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escaped = [...prefixes].map(escape).join("|");
  // A place is a number, whether or not it names a node now, or the name a term or a file gives the node it addresses.
  const named = [...addresses(spec).values()].filter((a) => a.includes("/") && !/\/\d+(?:\.\d+)*$/.test(a)).sort((a, b) => b.length - a.length).map(escape).join("|");
  const pattern = new RegExp(`(?<![\\w./-])(?:(?:${escaped})/\\d+(?:\\.\\d+)*(?![\\w])${named ? `|(?:${named})(?![\\w]|\\.\\w)` : ""})`, "gi");
  const found: BindingFinding[] = [];
  for (const path of keptOutside(root, config)) {
    readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
      for (const m of text.matchAll(pattern)) found.push({ where: `${path}:${i + 1}`, message: `${m[0]} is a node's address; cite the node by its sid` });
    });
  }
  return found;
}

/** A rule whose text changed after its code last did, read from the history: reported, never refused. */
function drift(root: string, spec: Specification, config: Config): BindingFinding[] {
  const found: BindingFinding[] = [];
  const order = git(root, "rev-list", "HEAD").out.split("\n").filter(Boolean);
  if (!order.length) return found;
  const position = (sha: string) => order.indexOf(sha);
  const versions = new Map<string, Array<{ sha: string; nodes: Map<string, SpecNode> }>>();
  const historyOf = (path: string) => {
    if (!versions.has(path)) {
      // Each commit with the name the file had in it, so that a renamed file is read under every name it had.
      const named: Array<{ sha: string; name: string }> = [];
      for (const line of git(root, "log", "--format=%H", "--name-only", "--follow", "--", path).out.split("\n").filter(Boolean)) {
        if (/^[0-9a-f]{40,64}$/.test(line)) named.push({ sha: line, name: path });
        else if (named.length) named[named.length - 1]!.name = line;
      }
      versions.set(path, named.map(({ sha, name }) => {
        const nodes = new Map<string, SpecNode>();
        const shown = git(root, "show", `${sha}:${name}`);
        if (shown.ok) {
          const walk = (ns: SpecNode[]) => ns.forEach((n) => (nodes.set(n.sid, n), walk(n.children ?? [])));
          try {
            walk(JSON.parse(shown.out).nodes ?? []);
          } catch {}
        }
        return { sha, nodes };
      }));
    }
    return versions.get(path)!;
  };
  for (const [sid, { node, file }] of spec.nodes) {
    const code = ((node.meta ?? {}) as { code?: Array<{ file: string }> }).code ?? [];
    if (!code.length || !judgedHere(file.path, config.writesSpecSheriffGuidelines)) continue;
    const history = historyOf(file.path);
    let textChanged: string | null = null;
    for (let i = 0; i < history.length; i++) {
      const now = history[i]!.nodes.get(sid)?.text;
      const was = history[i + 1]?.nodes.get(sid)?.text;
      if (now !== undefined && now !== was) {
        textChanged = history[i]!.sha;
        break;
      }
    }
    const codeChanged = code
      .map((c) => git(root, "log", "-1", "--format=%H", "--follow", "--", c.file).out.trim())
      .filter(Boolean)
      .sort((a, b) => position(a) - position(b))[0];
    if (textChanged && codeChanged && position(textChanged) < position(codeChanged)) {
      found.push({ where: nodeWhere(spec, sid), message: "its text changed after its code last did", reported: true });
    }
  }
  return found;
}

/** Every sid the code, the tests and the documents hold names a node, the archive's included, and no number names one. */
export async function citationsOutside(root: string): Promise<Finding[]> {
  const config = loadConfig(root);
  const spec = loadSpecification(root);
  const archived = new Set<string>();
  for (const f of spec.archive) {
    const walk = (ns: SpecNode[]) => ns.forEach((n) => (archived.add(n.sid), walk(n.children ?? [])));
    walk(f.data.nodes);
  }
  const found: Finding[] = [];
  for (const path of outsideFiles(root, config)) {
    readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
      for (const m of text.matchAll(SID_ANYWHERE)) {
        if (!spec.nodes.has(m[0]) && !archived.has(m[0])) found.push({ where: `${path}:${i + 1}`, message: `${m[0]} names no node` });
      }
      for (const m of text.matchAll(/§\d[\d.]*/g)) found.push({ where: `${path}:${i + 1}`, message: `${m[0].replace(/\.$/, "")} names a node by a number; cite it by its sid` });
    });
  }
  return found;
}
