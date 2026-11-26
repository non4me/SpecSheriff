import { existsSync, readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { readCode, readsForTags, type CodeComment, type CodeFile, type CodeSymbol, type Tag } from "./code.ts";
import { compareFiles, tagText, type Unit } from "./versions.ts";
import { allSymbols, boundLists, codeReader, noCommentFormats, readAll, readOwnTools, reader } from "./lists.ts";
import { BINDINGS, parseBindings, readBindings, type Bindings } from "./bindings.ts";
import { loadConfig, ownerSettings, readsAs, strictDefault, type Config } from "./config.ts";
import { before, changes, git, trackedFiles } from "./diff.ts";
import { APPROVALS, parseApprovals } from "./approvals.ts";
import { APPROVAL_RULE, fixtureGlobs, isFixture, isProjectKind, locations, partOf, PROJECT, specificationOwners, statusNow } from "./model.ts";
import { needsCode, schemaRefusals } from "./schema.ts";
import { clashes, runGenerators } from "./generators.ts";
import { judgedHere } from "./reindex.ts";
import { Ajv2020 } from "ajv/dist/2020.js";
import { approvedWordings } from "./approved-wording.ts";
import { loadSpecification, specificationOf, specPaths, writesGuidelines, type Located, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";
import { generateTypes, typeFiles } from "./types.ts";
import type { Finding } from "./validate.ts";

export interface BindingFinding extends Finding {
  /** Reported only: it refuses nothing. */
  reported?: true;
}

const SID_ANYWHERE = /\bs-[2-9a-hjkmnp-z]{15}\b/g;



export interface Commit {
  codeFiles: CodeFile[];
  testFiles: CodeFile[];
  /** The symbols whose code the commit adds or changes, by file. */
  changedSymbols: Map<string, Set<CodeSymbol>>;
  /** The names of the tests the commit adds or changes, by file. */
  changedTests: Map<string, Set<string>>;
  /** The files whose own code the commit adds or changes: the code outside every symbol, or the whole of a file bound as a whole. */
  changedFiles: Set<string>;
  /**
   * What the commit removes: each symbol, each test and each file's own code that only the commit's parent holds, each with its
   * name, its first line in the parent and its SpecTags.
   */
  removed: Array<{ path: string; key: string; kind: Unit["kind"]; name: string; line: number; tags: Tag[] }>;
  /** The lines that the commit adds to each file, as git shows them. */
  addedLines: Map<string, Set<number>>;
  /** The SpecTags in the commit's parent of each unit that the commit changes, by its symbol, or by `test:` or `file:`, its path and its name. */
  earlier: Map<unknown, Tag[]>;
  /** The paths whose entry in the bindings file the commit adds or changes. */
  changedEntries: Set<string>;
  /** The comments that the commit adds or changes, by file (s-7vpsdsy8dpqdy6r). */
  changedComments: Map<string, CodeComment[]>;
}


/**
 * The code and the tests as the commit leaves them, and which of them it adds, changes or removes (s-2x58az67bm6cxq2). Each
 * file that the commit changes is compared with the same file in the commit's parent, at the path that the file had there.
 * Each file whose entry in the bindings file, `sheriff.bindings.json`, the commit changes is compared in the same way.
 */
export async function readCommit(root: string, config: Config, spec = loadSpecification(root)): Promise<Commit> {
  const reads = reader(root, config, spec);
  const bindings = readBindings(root);
  const parentBindings = parseBindings(before(root, BINDINGS));
  const read = codeReader(root, spec, bindings);
  const readParent = codeReader(root, spec, parentBindings);
  const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)));
  const codeFiles = await readAll(root, tracked.filter((p) => reads(p) === "code"), read);
  const testFiles = await readAll(root, tracked.filter((p) => reads(p) === "tests"), read);
  const now = new Map([...codeFiles, ...testFiles].map((f) => [f.path, f]));
  const changed = changes(root);
  const compared = changed.filter((c) => reads(c.path) !== null).map((c) => ({ path: c.path, before: c.before ?? c.path }));
  const commit: Commit = { codeFiles, testFiles, changedSymbols: new Map(), changedTests: new Map(), changedFiles: new Set(), removed: [], addedLines: new Map(), earlier: new Map(), changedEntries: new Set(), changedComments: new Map() };
  for (const c of changed) commit.addedLines.set(c.path, new Set(c.added.map((l) => l.line)));
  const entry = (tags: Tag[] | undefined) => (tags ?? []).map(tagText).sort().join("\n");
  for (const path of new Set([...bindings.entries.keys(), ...parentBindings.entries.keys()])) {
    const raw = (b: typeof bindings) => (b.entries.has(path) ? `${entry(b.entries.get(path))}|${(b.entryProblems.get(path) ?? []).length}` : null);
    if (raw(bindings) === raw(parentBindings)) continue;
    if (bindings.entries.has(path)) commit.changedEntries.add(path);
    if (reads(path) !== null && !compared.some((c) => c.path === path)) compared.push({ path, before: path });
  }
  for (const c of compared) {
    const was = before(root, c.before);
    const old = was === null ? null : await readParent(c.before, was);
    const { added, changed, removed } = compareFiles(old, now.get(c.path) ?? null, reads(c.path) === "tests");
    // A comment is added or changed where its text differs from that of every comment of the file in the parent.
    const earlierComments = new Set((old?.comments ?? []).map((x) => x.key));
    const fresh = (now.get(c.path)?.comments ?? []).filter((x) => x.key && !earlierComments.has(x.key));
    if (fresh.length) commit.changedComments.set(c.path, fresh);
    const symbols = new Set<CodeSymbol>();
    const tests = new Set<string>();
    for (const u of [...added, ...changed]) {
      if (u.symbol) symbols.add(u.symbol);
      else if (u.test) tests.add(u.test.name);
      else commit.changedFiles.add(c.path);
    }
    for (const u of changed) commit.earlier.set(u.symbol ?? (u.test ? `test:${c.path}::${u.test.name}` : `file:${c.path}`), u.was?.tags ?? []);
    commit.changedSymbols.set(c.path, symbols);
    commit.changedTests.set(c.path, tests);
    for (const u of removed) {
      commit.removed.push({ path: c.before, key: u.key, kind: u.kind, name: u.symbol?.name ?? u.test?.name ?? c.before, line: u.symbol?.start ?? u.test?.start ?? 1, tags: u.tags });
    }
  }
  return commit;
}

/**
 * The sids of the SpecTags on the code, other than tests, that a commit adds or changes (s-2x58az67bm6cxq2): its symbols, inner
 * symbols included, and each file's own code, the code outside every symbol or the whole of a file bound as a whole.
 */
export function changedTags(commit: Commit): Set<string> {
  const sids = new Set<string>();
  for (const file of commit.codeFiles) {
    for (const s of commit.changedSymbols.get(file.path) ?? []) for (const t of s.tags) if (t.sid) sids.add(t.sid);
    if (commit.changedFiles.has(file.path)) for (const t of file.fileTags) if (t.sid) sids.add(t.sid);
  }
  return sids;
}

/**
 * The system's code and its tests that no SpecTag binds, whether or not the commit changes them (s-weuyx98r7c923ab), each by its
 * file and its first line and name: a symbol, a test, a file bound as a whole, or the code outside every symbol of a file, which
 * is named by the file alone. The same pieces count as unbound as in the check for code that no SpecTag binds (s-3xx2eukc8gtd2tx).
 */
export async function untagged(root: string): Promise<string[]> {
  const config = loadConfig(root);
  const spec = loadSpecification(root);
  const needs = needsCode(root);
  const isRule = (kind?: string) => kind === "TableRule" || kind === "RecordType" || kind === "TextRule" || Boolean(kind && isProjectKind(kind) && needs(kind));
  const kindOf = (sid: string) => spec.nodes.get(sid)?.node.kind;
  const bound = (tags: Tag[]) => tags.some((t) => (t.none !== undefined ? tags.length === 1 : Boolean(t.sid && isRule(kindOf(t.sid)))));
  const { codeFiles, testFiles } = await readCommit(root, config, spec);
  const found: Array<{ path: string; line: number; text: string }> = [];
  for (const file of codeFiles) {
    for (const s of file.symbols) if (!bound(s.tags)) found.push({ path: file.path, line: s.start, text: `${file.path}:${s.start} ${s.name}` });
    if ((file.whole || file.outside.length) && !bound(file.fileTags)) found.push({ path: file.path, line: 0, text: file.path });
  }
  for (const file of testFiles) {
    for (const t of file.tests) {
      if (!t.sid || !isRule(kindOf(t.sid))) found.push({ path: file.path, line: t.start, text: `${file.path}:${t.start} the test "${t.name}"` });
    }
  }
  return found.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : a.line - b.line)).map((f) => f.text);
}

export async function binding(root: string): Promise<BindingFinding[]> {
  // Every file is validated before anything is checked, and a refusal stops the checks (s-xzcw3hv4hmxz7h7).
  const unread: BindingFinding[] = [];
  const read = specPaths(root).flatMap((path) => {
    try {
      return [{ path, data: JSON.parse(readFileSync(join(root, path), "utf8")) as unknown }];
    } catch (error) {
      unread.push({ where: path, message: (error as Error).message });
      return [];
    }
  });
  const refused = [...unread, ...schemaRefusals(root, read)];
  if (refused.length) return refused;

  const findings: BindingFinding[] = [];
  const config = loadConfig(root);
  const spec = loadSpecification(root);
  // A rule, and a node of a project's own kind that needs code, is implemented and tested (s-vsh384ybt4w25a2).
  const needs = needsCode(root);
  const coded = (kind?: string) => kind === "TextRule" || Boolean(kind && isProjectKind(kind) && needs(kind));
  // The kinds of node that a SpecTag names as a rule (s-5z5gnu7pahr82xp).
  const isRule = (kind?: string) => kind === "TableRule" || kind === "RecordType" || coded(kind);
  const commit = await readCommit(root, config, spec);
  const { codeFiles, testFiles } = commit;
  findings.push(...entryFindings(root, config, spec));
  const bindings = readBindings(root);
  findings.push(...bindingsFindings(root, bindings));
  findings.push(...(await specTagFindings(root, spec, config, commit, bindings, isRule)));

  // The lists in the nodes' metadata, compared with those that the SpecTags produce (s-t383grkn3q68dpf), and the lists against their declarations.
  const own = await readOwnTools(root, config, spec);
  const { code: producedCode, tests: producedTests } = boundLists([...codeFiles, ...own.codeFiles], [...testFiles, ...own.testFiles]);
  for (const [sid, { node, file }] of spec.nodes) {
    if (!judgedHere(file.path, writesGuidelines(root))) continue;
    const meta = (node.meta ?? {}) as { code?: Array<{ file: string }>; tests?: string[] };
    const listed = (meta.code ?? []).map((c) => c.file).sort();
    const want = [...(producedCode.get(sid) ?? [])].sort();
    if (listed.join("|") !== want.join("|")) {
      findings.push({ where: nodeWhere(spec, sid), message: `its list of code, ${listed.join(", ") || "none"}, is not what the SpecTags produce: ${want.join(", ") || "none"}` });
    }
    const listedTests = [...(meta.tests ?? [])].sort();
    const wantTests = [...(producedTests.get(sid) ?? [])].sort();
    if (listedTests.join("|") !== wantTests.join("|")) {
      findings.push({ where: nodeWhere(spec, sid), message: `its list of tests is not what the tests' SpecTags produce: ${wantTests.join(", ") || "none"}` });
    }
    findings.push(...(await listFindings(root, spec, sid, node)));
  }
  findings.push(...ownKindFindings(root, spec));

  const running = new Set(testFiles.flatMap((f) => f.tests.filter((t) => t.sid && !t.skipped).map((t) => t.sid!)));
  findings.push(...implementationFindings(root, spec, config, commit, new Set(producedCode.keys()), running, isRule));
  findings.push(...generatedCopies(root, spec, config));
  findings.push(...locationsOutside(root, config, spec));
  return findings;
}

/** The specification as a commit holds it, the commit's parent by default, or none where there is no such commit. */
export function parentSpecification(root: string, ref = "HEAD"): Specification | null {
  const listed = git(root, "ls-tree", "-r", "--name-only", ref, "specs");
  if (!listed.ok) return null;
  const files: SpecFile[] = [];
  for (const path of listed.out.split("\n").filter((p) => p.endsWith(".json") && !/^specs\/_(schema|viewer)\//.test(p))) {
    const shown = git(root, "show", `${ref}:${path}`);
    try {
      if (shown.ok) files.push({ path, data: JSON.parse(shown.out) });
    } catch {
      // A file that the parent cannot parse holds no node to compare with.
    }
  }
  return specificationOf(files);
}

/**
 * The sids that an approved rule, and every node implementing it directly or through a chain of `implements` links, carry
 * (s-6fw72j65jkqrfpf): going down the links from the rule.
 */
export function implementing(spec: Specification, sid: string): Set<string> {
  const chain = new Set([sid]);
  for (const s of chain) for (const [other, { node }] of spec.nodes) if (node.refs.some((r) => r.type === "implements" && r.to === s)) chain.add(other);
  return chain;
}

/** The rules that a node implements, directly or through a chain of `implements` links, the node itself included: going up the links. */
export function implemented(spec: Specification, sid: string): Set<string> {
  const chain = new Set([sid]);
  for (const s of chain) for (const r of spec.nodes.get(s)?.node.refs ?? []) if (r.type === "implements" && r.to) chain.add(r.to);
  return chain;
}

/**
 * Whether the requirement that a rule be implemented leaves the rule out (s-6fw72j65jkqrfpf): a node of a project's own guidelines
 * or of the SpecSheriff guidelines, one in the technical debt, one that an approved node exempts, by a link to it or to a section
 * above it, and one of a kind that needs no code.
 */
function exception(spec: Specification, sid: string, isRule: (kind?: string) => boolean): boolean {
  const at = spec.nodes.get(sid);
  if (!at || !isRule(at.node.kind)) return true;
  if (at.file.path.startsWith("specs/_guidelines/") || at.file.path === "specs/tech/debt.json") return true;
  const exempted = new Set<string>();
  for (const { node } of spec.nodes.values()) {
    if (node.status !== "approved") continue;
    for (const r of node.refs) if (r.type === "exempts" && r.to) exempted.add(r.to);
  }
  for (let up: Located | undefined = at; up; up = up.parent ? spec.nodes.get(up.parent.sid) : undefined) if (exempted.has(up.node.sid)) return true;
  return false;
}

/**
 * Refuses, while the commit leaves the specification approved, each approved rule that the commit includes and that lacks code of
 * the system other than tests, a test that runs, or both (s-jgejd5rpd9d43pd). A commit includes a rule where it adds its approval,
 * where it adds, changes or removes code or a test bound to it in the parent or after the commit, where it removes an `implements`
 * link through which code or a test was bound to it in the parent, and where it takes the rule out of the exceptions.
 */
function implementationFindings(root: string, spec: Specification, config: Config, commit: Commit, tagged: Set<string>, tested: Set<string>, isRule: (kind?: string) => boolean): BindingFinding[] {
  if (!ownerSettings(config, strictDefault(root)).approved) return [];
  const parent = parentSpecification(root);
  const included = new Set<string>();
  const include = (sids: Iterable<string>, state: Specification | null) => {
    for (const s of sids) for (const r of implemented(state ?? spec, s)) included.add(r);
  };
  // The approvals that the commit adds: the lines that the approvals file holds more often than in the parent.
  const lines = (text: string | null) => (text ?? "").split("\n").filter((l) => l.trim());
  const was = new Map<string, number>();
  for (const l of lines(before(root, APPROVALS))) was.set(l, (was.get(l) ?? 0) + 1);
  const now = existsSync(join(root, APPROVALS)) ? readFileSync(join(root, APPROVALS), "utf8") : null;
  for (const l of lines(now)) {
    const left = was.get(l) ?? 0;
    if (left > 0) was.set(l, left - 1);
    else {
      try {
        const sid = (JSON.parse(l) as { sid?: unknown }).sid;
        if (typeof sid === "string") included.add(sid);
      } catch {
        // A line that is no approval adds none.
      }
    }
  }
  // The code and the tests that the commit adds, changes or removes, with their SpecTags in the parent and after the commit.
  const touched = (tags: Tag[]) => tags.flatMap((t) => (t.sid ? [t.sid] : []));
  for (const symbols of commit.changedSymbols.values()) for (const s of symbols) {
    include(touched(s.tags), spec);
    include(touched(commit.earlier.get(s) ?? []), parent);
  }
  for (const file of commit.testFiles) for (const t of file.tests) {
    if (!commit.changedTests.get(file.path)?.has(t.name)) continue;
    if (t.sid) include([t.sid], spec);
    include(touched(commit.earlier.get(`test:${file.path}::${t.name}`) ?? []), parent);
  }
  for (const file of commit.codeFiles) {
    if (!commit.changedFiles.has(file.path)) continue;
    include(touched(file.fileTags), spec);
    include(touched(commit.earlier.get(`file:${file.path}`) ?? []), parent);
  }
  for (const r of commit.removed) include(touched(r.tags), parent);
  if (parent) {
    // An implements link that the commit removes, through which code or a test was bound to its target in the parent.
    const bound = (sid: string) => [...implementing(parent, sid)].some((s) => {
      const meta = parent.nodes.get(s)?.node.meta as { code?: unknown[]; tests?: unknown[] } | undefined;
      return Boolean(meta?.code?.length || meta?.tests?.length);
    });
    for (const [sid, { node }] of parent.nodes) {
      for (const r of node.refs) {
        if (r.type !== "implements" || !r.to) continue;
        const kept = spec.nodes.get(sid)?.node.refs.some((k) => k.type === "implements" && k.to === r.to);
        if (!kept && bound(sid)) include([r.to], parent);
      }
    }
    // A rule that the commit takes out of the exceptions.
    for (const sid of spec.nodes.keys()) if (parent.nodes.has(sid) && exception(parent, sid, isRule) && !exception(spec, sid, isRule)) included.add(sid);
  }
  const found: BindingFinding[] = [];
  for (const sid of included) {
    const node = spec.nodes.get(sid)?.node;
    if (!node || node.status !== "approved" || exception(spec, sid, isRule)) continue;
    const chain = [...implementing(spec, sid)];
    const hasCode = chain.some((s) => tagged.has(s));
    const hasTest = chain.some((s) => tested.has(s));
    if (hasCode && hasTest) continue;
    const lacks = hasCode ? "a test that runs" : hasTest ? "code of the system other than tests" : "code of the system other than tests and a test that runs";
    found.push({ where: nodeWhere(spec, sid), message: `an approved rule that the commit includes lacks ${lacks}` });
  }
  return found;
}

/** The files of the generated types and runtime checks, each compared with what the RecordTypes generate now. */
function generatedCopies(root: string, spec: Specification, config: Config): BindingFinding[] {
  // The types and RuntimeChecks are generated from the last approved wording of each RecordType, whatever drafts there are (s-a8fn72xa782wvbk).
  const { files, refusals } = generateTypes(root, spec);
  const found: BindingFinding[] = [...refusals, ...projectCopies(root, spec, config, files)];
  for (const f of files) {
    const path = join(root, f.path);
    // Git may check a text file out with CRLF endings; what is committed holds LF.
    const kept = existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : null;
    if (kept === null) found.push({ where: f.path, message: "missing: a file of the generated types and runtime checks, which sheriff types writes" });
    else if (kept !== f.text) found.push({ where: f.path, message: "not what the RecordTypes generate now; sheriff types writes it anew" });
  }
  return found;
}

/**
 * The files of the project's own generators (s-dbk2vyeg8z5jxna). A file of a generator whose rule is approved is compared with
 * what the generator prints now. A file of a generator whose rule is a draft is compared with the commit's parent. A path for
 * which `sheriff types` would write different texts is refused.
 */
function projectCopies(root: string, spec: Specification, config: Config, typeFiles: Array<{ path: string; text: string }>): BindingFinding[] {
  // Every generator runs, one whose rule is a draft only to learn its paths (s-dbk2vyeg8z5jxna).
  const own = runGenerators(root, spec, config, true);
  const ready = own.files.filter((f) => !f.draft);
  const found: BindingFinding[] = [
    ...own.refusals,
    ...clashes([...typeFiles.map((f) => ({ ...f, by: "sheriff types" })), ...ready.map((f) => ({ ...f, by: `the generator "${f.generator}"` }))]),
  ];
  const read = (text: string | null | undefined) => (text ?? null)?.replace(/\r\n/g, "\n") ?? null;
  for (const f of own.files) {
    const path = join(root, f.path);
    const kept = read(existsSync(path) ? readFileSync(path, "utf8") : null);
    if (f.draft) {
      if (kept !== read(before(root, f.path))) found.push({ where: f.path, message: `the commit changes a file that the generator "${f.generator}" prints, while ${f.rule}, the rule that lists it, is a draft` });
    } else if (kept === null) found.push({ where: f.path, message: `missing: a file that the generator "${f.generator}" prints, which sheriff types writes` });
    else if (kept !== f.text) found.push({ where: f.path, message: `not what the generator "${f.generator}" generates now; sheriff types writes it anew` });
  }
  return found;
}

/**
 * What is wrong with the bindings file (s-trwczfskj5zmuft): it is not valid JSON or does not have the expected form, or an entry's
 * path names no file that the commit leaves in the repository.
 */
function bindingsFindings(root: string, bindings: Bindings): BindingFinding[] {
  const found: BindingFinding[] = bindings.problems.map((p) => ({ where: p.line === null ? BINDINGS : `${BINDINGS}:${p.line}`, message: p.message }));
  for (const [path, line] of bindings.lines) {
    if (!existsSync(join(root, path))) found.push({ where: `${BINDINGS}:${line}`, message: `the entry for ${path} names no file that the commit leaves in the repository` });
  }
  return found;
}

/**
 * The SpecTags of the system's code and of its tests, judged against what the commit adds, changes and removes:
 * - what the commit adds or changes and no SpecTag binds is refused (s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c);
 * - a SpecTag whose sid names no node is refused at every commit (s-36x8amvunmv2kp5);
 * - code and tests bound to a draft rule are refused where the commit adds, changes or removes them (s-w93jfnqynfa47pf);
 * - a rule whose code the commit adds or changes needs a test that carries its SpecTag (s-8wp7xm7g3u8gscq);
 * - code and tests outside the commit that no SpecTag binds cost what the approval status and the strict flag say (s-3xx2eukc8gtd2tx).
 */
async function specTagFindings(root: string, spec: Specification, config: Config, commit: Commit, bindings: Bindings, isRule: (kind?: string) => boolean): Promise<BindingFinding[]> {
  const found: BindingFinding[] = [];
  const at = (path: string, line: number) => `${path}:${line}`;
  const kindOf = (sid: string) => spec.nodes.get(sid)?.node.kind;
  const named = (kind?: string) => (kind === "RecordType" ? "a RecordType" : kind === "header" ? "a domain's header" : `a ${kind}`);
  // A SpecTag binds where it names a rule, or where it is `@spec none` and the code carries no other SpecTag (s-9rtrj24myzjvshu).
  const bound = (tags: Tag[]) => tags.some((t) => (t.none !== undefined ? tags.length === 1 : Boolean(t.sid && isRule(kindOf(t.sid)))));
  const ruleAt = (sid: string) => {
    const n = spec.nodes.get(sid)!;
    return `${sid} (${n.node.location}) in ${n.file.path}`;
  };
  let unbound = 0;
  const rulesChanged = new Set<string>();
  const testSids = new Set<string>();

  const checkTags = (where: (t: Tag) => string, name: string, tags: Tag[], changed: boolean) => {
    for (const t of tags) {
      if (!t.sid) continue;
      if (!spec.nodes.has(t.sid)) found.push({ where: where(t), message: `the SpecTag ${t.sid} on ${name} names no node` });
      else if (changed && !isRule(kindOf(t.sid))) found.push({ where: where(t), message: `the SpecTag ${t.sid} on ${name} names ${named(kindOf(t.sid))}, which is not a rule` });
    }
  };
  const drafts = (where: string, what: string, how: "adds" | "changes" | "removes", tags: Tag[]) => {
    for (const sid of new Set(tags.flatMap((t) => (t.sid ? [t.sid] : [])))) {
      const node = spec.nodes.get(sid)?.node;
      if (node && isRule(node.kind) && node.status !== "approved") found.push({ where, message: `${what}, which the commit ${how}, is bound to ${ruleAt(sid)}, a draft rule` });
    }
  };
  const ruleTags = (tags: Tag[]) => tags.forEach((t) => t.sid && isRule(kindOf(t.sid)) && rulesChanged.add(t.sid));

  for (const file of commit.codeFiles) {
    const added = commit.addedLines.get(file.path) ?? new Set<number>();
    // A misplaced SpecTag, or text in neither form of a SpecTag, on a line that the commit adds.
    for (const p of file.problems) if (added.has(p.line)) found.push({ where: at(file.path, p.line), message: p.message });
    const symbols = commit.changedSymbols.get(file.path) ?? new Set<CodeSymbol>();
    for (const s of allSymbols(file.symbols)) {
      const changed = symbols.has(s);
      checkTags((t) => at(file.path, t.line), s.name, s.tags, changed);
      if (!changed) continue;
      const was = commit.earlier.get(s);
      drafts(at(file.path, s.start), s.name, was ? "changes" : "adds", [...s.tags, ...(was ?? [])]);
      ruleTags(s.tags);
    }
    for (const s of file.symbols) {
      if (bound(s.tags)) continue;
      if (symbols.has(s)) found.push({ where: at(file.path, s.start), message: `${s.name} carries no SpecTag that binds it` });
      else unbound++;
    }
    // The file's own code: the code outside every symbol, or the whole of a file bound as a whole.
    const changed = commit.changedFiles.has(file.path);
    checkTags((t) => (file.fromBindings ? `${BINDINGS}:${t.line}` : at(file.path, t.line)), file.path, file.fileTags, changed);
    if (!file.whole && !file.outside.length) continue;
    const own = file.whole ? file.path : `the code outside every symbol of ${file.path}`;
    if (changed) {
      const was = commit.earlier.get(`file:${file.path}`);
      drafts(file.path, own, was ? "changes" : "adds", [...file.fileTags, ...(was ?? [])]);
      ruleTags(file.fileTags);
    }
    if (bound(file.fileTags)) continue;
    if (!changed) unbound++;
    else if (!file.whole) found.push({ where: file.path, message: "the code outside every symbol, imports aside, carries no SpecTag: SpecTags in the file's first comment bind it" });
    else found.push({ where: file.path, message: `the file is bound as a whole, and no SpecTag binds it: ${file.fromBindings ? "an entry in sheriff.bindings.json" : "SpecTags at its start"} bind such a file` });
  }

  for (const file of commit.testFiles) {
    const changedHere = commit.changedTests.get(file.path) ?? new Set<string>();
    for (const t of file.tests) {
      const where = at(file.path, t.start);
      const changed = changedHere.has(t.name);
      if (t.sid) testSids.add(t.sid);
      if (!t.sid) {
        if (!changed) unbound++;
        else found.push({ where, message: t.bare ? `the test "${t.name}" carries the bare sid ${t.bare}, the form an earlier release read, and so no SpecTag: sheriff reindex writes it` : `the test "${t.name}" carries no SpecTag` });
        continue;
      }
      if (!spec.nodes.has(t.sid)) found.push({ where, message: `the test "${t.name}" carries ${t.sid}, which names no node` });
      else if (!isRule(kindOf(t.sid))) {
        if (!changed) unbound++;
        else found.push({ where, message: `the test "${t.name}" carries ${t.sid}, ${named(kindOf(t.sid))}, where a test carries the SpecTag of a rule` });
      }
      if (changed) {
        const was = commit.earlier.get(`test:${file.path}::${t.name}`);
        drafts(where, `the test "${t.name}"`, was ? "changes" : "adds", [{ line: t.at, sid: t.sid }, ...(was ?? [])]);
      }
    }
  }
  for (const r of commit.removed) drafts(at(r.path, r.line), r.kind === "test" ? `the test "${r.name}"` : r.name, "removes", r.tags);
  for (const sid of rulesChanged) {
    if (!testSids.has(sid)) found.push({ where: nodeWhere(spec, sid), message: "a rule whose code the commit adds or changes, and no test carries its SpecTag" });
  }

  // An entry of the bindings file that the commit adds or changes binds only a file of the system's code, other than tests, that no
  // description covers and whose format allows no comments (s-9rtrj24myzjvshu).
  const reads = reader(root, config, spec);
  const noComments = noCommentFormats(root, spec);
  for (const path of commit.changedEntries) {
    for (const p of bindings.entryProblems.get(path) ?? []) found.push({ where: `${BINDINGS}:${p.line}`, message: p.message });
    const text = existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : null;
    if (text === null) continue;
    const reason = reads(path) !== "code" ? "the file is not part of the system's code other than tests"
      : readsForTags(path, text) ? "a description covers the file's language"
      : !noComments(path) ? "the file's format allows comments"
      : null;
    if (reason) found.push({ where: `${BINDINGS}:${bindings.lines.get(path)}`, message: `the entry for ${path} binds nothing: ${reason}` });
  }

  // Code and tests outside the commit that no SpecTag binds: nothing while the specification is a draft, one warning while it is
  // approved, and a refusal while its strict flag is on (s-3xx2eukc8gtd2tx).
  const settings = ownerSettings(config, strictDefault(root));
  if (unbound && settings.approved) {
    const pieces = unbound === 1 ? "1 piece of code or tests that the commit leaves unchanged is" : `${unbound} pieces of code and tests that the commit leaves unchanged are`;
    found.push({ where: "the code and the tests", message: `${pieces} bound by no SpecTag: sheriff untagged lists them`, ...(settings.strict ? {} : { reported: true as const }) });
  }
  return found;
}

function nodeWhere(spec: Specification, sid: string): string {
  const at = spec.nodes.get(sid)!;
  return `${at.file.path}: ${sid} (${at.node.location})`;
}

type ListValue = { of: string; members: unknown[]; property?: string; jsonSchema?: { file: string; pointer: string }; valueList?: { file: string; symbol: string } };

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** The value at a JSON Pointer given as a fragment, such as `#/$defs/state`, or undefined where nothing is there. */
function atPointer(doc: unknown, pointer: string): unknown {
  let value: unknown = doc;
  for (const step of pointer.replace(/^#\/?/, "").split("/").filter(Boolean)) {
    if (!isObject(value) && !Array.isArray(value)) return undefined;
    value = (value as Record<string, unknown>)[step.replace(/~1/g, "/").replace(/~0/g, "~")];
  }
  return value;
}

/** The values of the `enum` of a schema, reached directly or through a `$ref` within its file. */
function enumOf(doc: unknown, schema: unknown, depth = 0): unknown[] | null {
  if (!isObject(schema) || depth > 32) return null;
  if (Array.isArray(schema.enum)) return schema.enum;
  return typeof schema.$ref === "string" && schema.$ref.startsWith("#") ? enumOf(doc, atPointer(doc, schema.$ref), depth + 1) : null;
}

/**
 * A list against what declares its values (s-5hb9k2e34dgn284). With `jsonSchema`, each value is valid under JSON Schema
 * 2020-12 against the schema at that place, and each value of an `enum` there is listed. With `valueList`, the string literals
 * of the symbol are exactly the list's values. A list with a member that is an object and lacks the list's property is left to
 * the check of an object in a list (s-cdachayybfvg4na).
 */
async function listFindings(root: string, spec: Specification, sid: string, node: SpecNode): Promise<BindingFinding[]> {
  const list = node.list as ListValue | undefined;
  if (!list || !Array.isArray(list.members) || (!list.jsonSchema && !list.valueList)) return [];
  if (list.members.some((m) => isObject(m) && !(list.property && list.property in m))) return [];
  const values = list.members.map((m) => (isObject(m) ? m[list.property!] : m));
  const show = (v: unknown) => (typeof v === "string" ? v : JSON.stringify(v));
  const refuse = (message: string): BindingFinding[] => [{ where: nodeWhere(spec, sid), message: `its list of ${list.of} ${message}` }];
  const { file } = list.jsonSchema ?? list.valueList!;
  const text = existsSync(join(root, file)) ? readFileSync(join(root, file), "utf8") : null;
  if (text === null) return refuse(`points to the file ${file}, which cannot be found`);
  if (list.valueList) {
    const { symbol } = list.valueList;
    const read = await readCode(file, text);
    const found = read && allSymbols(read.symbols).find((s) => s.name === symbol);
    if (!found) return refuse(`names the symbol ${symbol} in ${file}, which cannot be found`);
    const declared = new Set(found.strings);
    const listed = new Set(values.map(show));
    const parts = [...[...listed].filter((v) => !declared.has(v)).map((v) => `${v} is not declared there`), ...[...declared].filter((v) => !listed.has(v)).map((v) => `${v} is declared there and not listed`)];
    return parts.length ? refuse(`does not match the symbol ${symbol} in ${file}: ${parts.join("; ")}`) : [];
  }
  const { pointer } = list.jsonSchema!;
  let doc: unknown;
  try {
    doc = JSON.parse(text);
  } catch {
    return refuse(`points to the file ${file}, which is not valid JSON`);
  }
  const schema = atPointer(doc, pointer);
  if (schema === undefined) return refuse(`points to ${pointer} in ${file}, which cannot be found`);
  // The file is added whole, so that its references resolve; the place is then compiled by its pointer.
  const id = `https://specsheriff.invalid/${file}`;
  const ajv = new Ajv2020({ strict: false, validateSchema: false, allErrors: true });
  const { $schema: _dialect, ...rest } = isObject(doc) ? doc : {};
  ajv.addSchema({ ...rest, $id: id });
  let validate: ((v: unknown) => boolean) | undefined;
  try {
    validate = ajv.getSchema(`${id}${pointer.startsWith("#") ? pointer : `#${pointer}`}`);
  } catch (error) {
    return refuse(`points to ${pointer} in ${file}, whose schema cannot be compiled: ${(error as Error).message}`);
  }
  if (!validate) return refuse(`points to ${pointer} in ${file}, which cannot be found`);
  const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
  const parts = [
    ...values.filter((v) => !validate!(v)).map((v) => `${show(v)} is not valid against it`),
    ...(enumOf(doc, schema) ?? []).filter((e) => !values.some((v) => same(v, e))).map((e) => `${show(e)} is a value of its enum and not listed`),
  ];
  return parts.length ? refuse(`does not match ${pointer} in ${file}: ${parts.join("; ")}`) : [];
}

/** The rule on a project's own kinds of node, which a rule of the project's own guidelines refines to list them. */
const OWN_KINDS_RULE = "s-vsh384ybt4w25a2";

/**
 * The kinds that the project's extension of the schema adds in its field `kinds` against the members of the lists of the rules
 * of `project.json` that refine the rule on a project's own kinds, read in their last approved wordings (s-czxaqvaesmu3gru).
 */
function ownKindFindings(root: string, spec: Specification): BindingFinding[] {
  const file = "specs/_schema/project.schema.json";
  let kinds: Record<string, { needsCode?: boolean }> = {};
  try {
    kinds = (JSON.parse(readFileSync(join(root, file), "utf8")) as { kinds?: typeof kinds }).kinds ?? {};
  } catch {
    // No extension of the schema, or one that the check of the schema refuses: no kinds to compare.
  }
  const wordings = approvedWordings(root, spec);
  const rules: Array<{ sid: string; list: ListValue }> = [];
  const walk = (nodes: SpecNode[]) => nodes.forEach((n) => {
    const list = wordings.wording(n.sid)?.list as ListValue | undefined;
    if (list && Array.isArray(list.members) && wordings.links(n.sid).some((r) => r.type === "refines" && r.to === OWN_KINDS_RULE)) rules.push({ sid: n.sid, list });
    walk(n.children ?? []);
  });
  walk(spec.files.find((f) => f.path === PROJECT)?.data.nodes ?? []);
  if (rules.some(({ list }) => list.members.some((m) => isObject(m) && !(list.property && list.property in m)))) return [];
  const found: BindingFinding[] = [];
  const listed = new Set<string>();
  for (const { sid, list } of rules) {
    for (const m of list.members) {
      const name = String(isObject(m) ? m[list.property!] : m);
      const needs = isObject(m) && m.needsCode === true;
      listed.add(name);
      if (!(name in kinds)) found.push({ where: nodeWhere(spec, sid), message: `lists the kind ${name}, which the field kinds of project.schema.json does not add` });
      else if (needs !== (kinds[name]!.needsCode === true)) {
        found.push({ where: nodeWhere(spec, sid), message: `lists the kind ${name} with needsCode ${needs}, where the field kinds of project.schema.json gives it needsCode ${kinds[name]!.needsCode === true}` });
      }
    }
  }
  for (const kind of Object.keys(kinds)) {
    if (!listed.has(kind)) found.push({ where: file, message: `the kind ${kind}, which the field kinds adds, is listed by no rule that refines ${OWN_KINDS_RULE}` });
  }
  return found;
}

/**
 * Every file that the repository keeps outside `specs/`, tracked by git or new and not ignored, other than the listed fixtures,
 * the bindings file and each file that git treats as binary, one holding a zero byte in its first 8000 bytes.
 */
function keptOutside(root: string, fixtures: string[]): string[] {
  return trackedFiles(root).filter((p) => {
    if (p.startsWith("specs/") || p === BINDINGS || isFixture(fixtures, p) || !existsSync(join(root, p))) return false;
    return !readFileSync(join(root, p)).subarray(0, 8000).includes(0);
  });
}

function locationsOutside(root: string, config: Config, spec: Specification): BindingFinding[] {
  // A numbered location begins with a folder of the base specification, or with the location of the first top-level node of a
  // file of the guidelines, of the appendix of the tools or of the technical appendix (s-ygg5kpcxgzq3m7w).
  const prefixes = new Set<string>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    const first = (f.data.nodes[0] as SpecNode | undefined)?.location;
    if (part === "_guidelines" || part === "tech") {
      if (first) prefixes.add(first);
    } else prefixes.add(part);
  }
  const escape = (p: string) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escaped = [...prefixes].map(escape).join("|");
  // A place is a number, whether or not it names a node now, or the name a term or a file gives the node it locates.
  const named = [...locations(spec).values()].filter((a) => a.includes("/") && !/\/\d+(?:\.\d+)*$/.test(a)).sort((a, b) => b.length - a.length).map(escape).join("|");
  // A location stands alone: `-`, `/` or `.` followed by a letter or a digit continues a longer path or name (s-nh8b2hjvzasdxmd).
  const end = "(?![\\w-]|[./][A-Za-z0-9])";
  const pattern = new RegExp(`(?<![\\w./-])(?:(?:${escaped})/\\d+(?:\\.\\d+)*${end}${named ? `|(?:${named})${end}` : ""})`, "gi");
  const found: BindingFinding[] = [];
  for (const path of keptOutside(root, fixtureGlobs(spec, approvedWordings(root, spec)))) {
    readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
      for (const m of text.matchAll(pattern)) found.push({ where: `${path}:${i + 1}`, message: `${m[0]} is a node's location; cite the node by its sid` });
    });
  }
  return found;
}

/**
 * The citations outside the specification (s-m8nmfsxkcfu7cjp), in every file that the repository keeps outside `specs/`:
 * - a sid that names no node of the model of the specification is refused;
 * - a `§` followed by a digit, a node cited by a number, is refused;
 * - a SpecTag outside the system's code whose sid names a node that is not a rule of the guidelines is refused.
 * The sid of a SpecTag in the system's code, its tests included, is left to the check of SpecTags (s-36x8amvunmv2kp5).
 */
export async function citationsOutside(root: string): Promise<Finding[]> {
  const config = loadConfig(root);
  const spec = loadSpecification(root);
  const reads = reader(root, config, spec);
  const ruleOfGuidelines = (sid: string) => {
    const at = spec.nodes.get(sid);
    return Boolean(at && at.file.path.startsWith("specs/_guidelines/") && at.node.kind !== "section" && at.node.kind !== "term" && at.node.kind !== "header");
  };
  const found: Finding[] = [];
  for (const path of keptOutside(root, fixtureGlobs(spec, approvedWordings(root, spec)))) {
    const code = reads(path) !== null;
    readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
      const where = `${path}:${i + 1}`;
      // Where each sid of a SpecTag starts: left to the check of SpecTags in the system's code, judged here outside it.
      const tagged = new Set<number>();
      for (const m of text.matchAll(/@spec (s-[2-9a-hjkmnp-z]{15})\b/g)) {
        const sid = m[1]!;
        const at = m.index! + "@spec ".length;
        if (code) tagged.add(at);
        else if (spec.nodes.has(sid) && !ruleOfGuidelines(sid)) {
          tagged.add(at);
          found.push({ where, message: `the SpecTag @spec ${sid} is outside the system's code and names a node that is not a rule of the guidelines` });
        }
      }
      for (const m of text.matchAll(SID_ANYWHERE)) {
        if (!tagged.has(m.index!) && !spec.nodes.has(m[0])) found.push({ where, message: `${m[0]} names no node` });
      }
      for (const m of text.matchAll(/§\d[\d.]*/g)) found.push({ where, message: `${m[0].replace(/\.$/, "")} names a node by a number; cite it by its sid` });
    });
  }
  return found;
}

/**
 * The entries of the settings that only an owner of the specification changes (s-j9r8z4xdrfkfs47): after the commit,
 * each list of entries begins with the entries of the commit's parent, unchanged and in the same order, and each later
 * entry names one of the owners of the specification that `project.json` lists after the commit. The parent's entries are read as `sheriff reindex`
 * would rewrite them: an approved rule of its `project.json` on the specification's approval status is read as an entry.
 */
function entryFindings(root: string, config: Config, spec: Specification): BindingFinding[] {
  const found: BindingFinding[] = [];
  let parent: Record<string, unknown> = {};
  try {
    parent = JSON.parse(before(root, "sheriff.config.json") ?? "{}");
  } catch {
    parent = {};
  }
  if (!(Array.isArray(parent.approvalStatus) && parent.approvalStatus.length)) {
    const by = approvingRuleOwner(root);
    if (by) parent.approvalStatus = [{ status: "approved", by }];
  }
  const owners = specificationOwners(spec);
  const named = owners.join(", ") || "none named";
  for (const key of ["approvalStatus", "strict", "extensions"] as const) {
    const was = Array.isArray(parent[key]) ? (parent[key] as unknown[]) : [];
    const now = config[key] as unknown[];
    if (!was.every((e, i) => JSON.stringify(e) === JSON.stringify(now[i]))) {
      found.push({ where: "sheriff.config.json", message: `${key}: the entries ${JSON.stringify(was)} of the commit's parent are not the first entries, unchanged and in the same order; the specification's owners are ${named}` });
      continue;
    }
    for (const e of now.slice(was.length) as Array<{ by: string }>) {
      if (!owners.includes(e.by)) found.push({ where: "sheriff.config.json", message: `${key}: the entry ${JSON.stringify(e)} names no owner of the specification; the specification's owners are ${named}` });
    }
  }
  return found;
}

/** Who last approved the approved rule of the parent's `project.json` on the specification's approval status, as an earlier release recorded it. */
function approvingRuleOwner(root: string): string | undefined {
  let nodes: SpecNode[] = [];
  try {
    nodes = (JSON.parse(before(root, PROJECT) ?? "{}") as { nodes?: SpecNode[] }).nodes ?? [];
  } catch {
    return undefined;
  }
  const all: SpecNode[] = [];
  const walk = (ns: SpecNode[] = []) => ns.forEach((n) => (all.push(n), walk(n.children)));
  walk(nodes);
  const rule = all.find((n) => n.refs?.some((r) => r.type === "refines" && r.to === APPROVAL_RULE) && statusNow(n.status) === "approved");
  if (!rule) return undefined;
  return parseApprovals(before(root, APPROVALS) ?? "").filter((a) => a.sid === rule.sid && !a.withdrawn).at(-1)?.by;
}
