import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, posix } from "node:path";
import { createHash } from "node:crypto";
import { loadConfig, modelFlags, ownerSettings, strictDefault, type Config } from "./config.ts";
import { git as gitIn } from "./diff.ts";
import { approvedWordings } from "./approved-wording.ts";
import { addedApprovals, APPROVALS, everApproved, readApprovals, stands } from "./approvals.ts";
import { keysTwice } from "./json-text.ts";
import { BASE_KINDS, builtStatuses, citations, fingerprint, isContainer, isProjectKind, locations, modelOf, incoming, isDomain, levelsOf, ownersOf, partOf, PROJECT } from "./model.ts";
import { headerIndex, judgedHere } from "./reindex.ts";
import { EXTENSION, isArchive, loadSchema, readExtension } from "./schema.ts";
import { fieldKey, gather } from "./values.ts";
import { cellNodes, specPaths, withTaken, writesGuidelines, type Located, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface Finding {
  /** The file, and the node where there is one. */
  where: string;
  message: string;
  /** Reported rather than refused. */
  reported?: true;
}

export interface ValidateOptions {
  /** The specification as the commit before this one holds it, for what the commit removes. */
  before?: Specification;
  /** `--strict`: the project's own checks are given an approved specification with the `strict` flag on (s-7pk89t8z6wymmj9). */
  strict?: boolean;
}

/** Every kind but a section and a domain's header requires something, a project's own kinds included (s-vsh384ybt4w25a2). */
const REQUIRING = { has: (kind: string) => kind !== "section" && kind !== "header" };
const isBase = (path: string) => !["_guidelines", "tech"].includes(partOf(path).part);

export function validate(root: string, { before, strict = false }: ValidateOptions = {}): Finding[] {
  const findings: Finding[] = [];
  const config = loadConfig(root);
  const paths = specPaths(root);

  // Outside the repository where the SpecSheriff guidelines are written, no copy of a file that the plugin delivers is kept (s-6bmnsbskg6en4nf).
  const writes = writesGuidelines(root);
  if (!writes) {
    const schemaDir = join(root, "specs", "_schema");
    const schemaFiles = existsSync(schemaDir)
      ? readdirSync(schemaDir, { recursive: true, encoding: "utf8" }).filter((p) => statSync(join(schemaDir, p)).isFile()).map((p) => `specs/_schema/${p.replaceAll("\\", "/")}`).filter((p) => p !== EXTENSION)
      : [];
    for (const path of [...paths.filter((p) => partOf(p).specSheriffGuidelines), ...schemaFiles].sort()) {
      findings.push({ where: path, message: "a copy of a file that the SpecSheriff plugin delivers, which the SpecSheriff tools read from the plugin" });
    }
    if (findings.length) return findings;
  }

  // Files read as text and against the schema; a file that does not read stops the checks of the nodes.
  const schema = loadSchema(root);
  for (const e of schema.extension) findings.push({ where: EXTENSION, message: e });
  const files: SpecFile[] = [];
  for (const path of [...paths, ...schemaPaths(root)]) {
    const text = readFileSync(join(root, path), "utf8");
    try {
      for (const k of keysTwice(text)) {
        findings.push({ where: path, message: `"${k.key}" is written ${k.lines.length} times in one object, on lines ${k.lines.join(", ")}; sheriff reindex merges such values wherever it can keep all of them` });
      }
    } catch (error) {
      findings.push({ where: path, message: (error as Error).message });
      continue;
    }
    if (!paths.includes(path)) continue;
    const data = JSON.parse(text);
    for (const e of isArchive(path) ? schema.checkArchive(data) : schema.check(data)) findings.push({ where: path, message: e });
    files.push({ path, data });
  }
  if (findings.length) return findings;

  const spec = withTaken(root, files);
  const at = (sid: string) => {
    const n = spec.nodes.get(sid)!;
    return `${n.file.path}: ${sid} (${n.node.location})`;
  };
  const refuse = (sid: string, message: string) => findings.push({ where: at(sid), message });
  // The project's own checks run after the files have passed the check for keys written more than once and the validation against the schema, and before the other checks (s-7pk89t8z6wymmj9).
  findings.push(...projectChecks(root, config, spec, strict));
  const chosen = ownerSettings(config, strictDefault(root)).extensions;
  // The nodes of the files that the repository keeps, the nodes in the cells of a TableRule included.
  const kept = [...spec.nodes].filter(([, { file }]) => !file.taken);

  // Each sid, each term and each name of a RecordType belongs to one node only (s-vke5hakwf3uyrjs).
  const count = (values: Array<[string, string]>, what: (v: string) => string) => {
    const seen = new Map<string, string[]>();
    for (const [v, where] of values) seen.set(v, [...(seen.get(v) ?? []), where]);
    for (const [v, wheres] of seen) if (wheres.length > 1) findings.push({ where: wheres.join(", "), message: what(v) });
  };
  const live: Array<{ node: SpecNode; path: string }> = [];
  for (const f of spec.files) walk(f.data.nodes, (node) => live.push({ node, path: f.path }));
  const held = ({ node, path }: { node: SpecNode; path: string }) => `${path} (${node.location})`;
  count(live.map((l) => [l.node.sid, held(l)]), (v) => `sid ${v} is held by more than one node`);
  count(live.filter(({ node }) => node.kind === "term").map((l) => [l.node.title.toLowerCase(), held(l)]), (v) => `term "${v}" is named by more than one term node`);
  count(live.filter(({ node }) => node.kind === "RecordType").map((l) => [l.node.title.toLowerCase(), held(l)]), (v) => `RecordType "${v}" is the name of more than one RecordType`);
  // A term node is kept in the contracts section, or in a domain's folder where the Domains extension is chosen (s-yauyedny2yzvs4c).
  for (const [sid, { node, file }] of kept) {
    const { part } = partOf(file.path);
    if (node.kind !== "term" || part === "contracts" || (chosen.has("domains") && isDomain(part))) continue;
    refuse(sid, `a term node outside the contracts section${chosen.has("domains") ? " and outside the folder of every domain" : ""}`);
  }

  // Each location is the one computed for its node (s-stxmhq3hgfndvn6).
  const ids = locations(spec);
  for (const [sid, { node }] of kept) {
    const want = ids.get(sid);
    if (want === undefined || want === node.location) continue;
    refuse(sid, node.location ? `location ${node.location} differs from the location computed for it, ${want}` : `has no location; the location computed for it is ${want}`);
  }

  // Approvals, the approval statuses of sections and headers (s-95w92rnjuv3sst8, s-agc6fb3vx46pc23), and the archive.
  const lines = readApprovals(root);
  const statuses = builtStatuses(spec);
  for (const [sid, { node, cell }] of kept) {
    if (isContainer(node.kind)) {
      if (statuses.get(sid) !== node.status) refuse(sid, `its status is ${node.status}, while the nodes under it make it ${statuses.get(sid)} (s-9kfdycuq34beqvs)`);
    } else if (node.status === "approved" && !stands(lines, sid, fingerprint(node, cell))) {
      refuse(sid, "approved, but no approval stands for its wording");
    }
  }
  for (const [sid, { node }] of spec.nodes) if (node.archived) refuse(sid, "carries the reason of its removal, but is not in the archive");
  // Who an approval names is checked in the commit that records it, against the owners as they are recorded in that commit.
  // An approval that a commit adds names a node in the files that the repository keeps and one of that node's owners (s-75ue25v6r23jkk8).
  for (const line of addedApprovals(root, lines)) {
    if (line.withdrawn) continue;
    const at = spec.nodes.get(line.sid);
    if (!at || at.file.taken) {
      findings.push({ where: APPROVALS, message: `an approval of ${line.sid} by ${line.by}, a sid that no node of the files that the repository keeps holds` });
      continue;
    }
    const owners = ownersOf(spec, line.sid);
    if (!owners.includes(line.by)) refuse(line.sid, `approved by ${line.by}, who is none of its owners (${owners.join(", ") || "none named"})`);
  }
  if (before) findings.push(...archiveFindings(spec, before, lines, writes));

  // Links and citations (s-c4rn9fj4czk768b, s-qzyacnqwvaeaps4, s-pvnnr844f3y964m).
  const built = incoming(spec);
  const isTerm = (sid: string) => spec.nodes.get(sid)?.node.kind === "term";
  for (const [sid, { node }] of kept) {
    const out = node.refs.filter((r) => r.to);
    for (const r of out) if (!spec.nodes.has(r.to!)) refuse(sid, `its ${r.type} link to ${r.to} names no node`);
    const cited = citations(node);
    for (const c of cited.sids) if (!out.some((r) => r.to === c)) refuse(sid, `cites ${c} but holds no link to it`);
    for (const a of cited.locations) refuse(sid, `cites ${a} by its location, not its sid`);
    for (const r of out.filter((r) => r.type === "cites")) {
      if (!cited.sids.includes(r.to!)) refuse(sid, `holds a cites link to ${r.to} but does not cite it`);
      if (out.some((o) => o.to === r.to && o.type !== "cites")) refuse(sid, `holds a cites link to ${r.to} beside a link of another type to it`);
    }
    for (const r of out.filter((r) => spec.nodes.has(r.to!))) {
      const twoTerms = isTerm(sid) && isTerm(r.to!);
      if ((r.type === "term-relation" || r.type === "uses") && !twoTerms) refuse(sid, `its ${r.type} link to ${r.to} does not bind two terms; settle it with the specification's owners`);
      if (r.type !== "term-relation" && r.type !== "uses" && twoTerms) refuse(sid, `its ${r.type} link to ${r.to} binds two terms; settle it with the specification's owners`);
    }
    const key = (r: { type: string; from?: string; ratio?: string }) => `${r.type} ${r.from} ${r.ratio ?? ""}`;
    const stored = node.refs.filter((r) => r.from).map(key).sort();
    const want = (built.get(sid) ?? []).map(key).sort();
    if (stored.join("|") !== want.join("|")) refuse(sid, "its incoming links are not what the outgoing ones produce");
  }

  // Each section contains at least one rule (s-zhen42p6mnaxu7w), and no node contains a run of words in capitals (s-e2vdhfsndy5stq9).
  // A word in capitals consists of two or more capital letters or digits of any script, beginning and ending with a letter; a run is three or more such words in a row.
  const word = String.raw`(?<![\p{L}\p{N}_])\p{Lu}[\p{Lu}\p{N}-]*[\p{Lu}\p{N}](?![\p{L}\p{N}_])`;
  const run = new RegExp(`${word}(?:[ \\t]+${word}){2,}`, "gu");
  for (const [sid, { node }] of kept) {
    if (node.kind === "section" && !holdsRule(node)) refuse(sid, "a section that holds no rule");
    for (const [field, value] of wordsRead(node)) {
      const bare = value.replace(/`[^`]*`/g, "").replace(/"[^"]*"|“[^”]*”/g, "");
      for (const m of bare.matchAll(run)) refuse(sid, `its ${field} sets "${m[0]}" in capitals`);
    }
  }

  // An `exempts` link goes from a node of the project's own guidelines that cites its target, to a section or a rule (s-qvgzubkrafadqgf).
  for (const [sid, { node, file }] of kept) {
    for (const r of node.refs.filter((r) => r.type === "exempts" && r.to && spec.nodes.has(r.to))) {
      const target = spec.nodes.get(r.to!)!.node.kind;
      const rule = ["section", "TextRule", "TableRule", "RecordType"].includes(target) || isProjectKind(target);
      if (file.path !== PROJECT || !rule || !citations(node).sids.includes(r.to!)) {
        refuse(sid, `its exempts link to ${r.to} is not allowed: an exempts link goes from a node of the project's own guidelines that cites its target, to a section or a rule`);
      }
    }
  }

  if (chosen.has("domains")) domains(root, spec, kept, built, refuse, findings);
  objectsInLists(kept, refuse);
  variants(spec, refuse, new Set([...BASE_KINDS, ...Object.keys(readExtension(root)?.kinds ?? {})]));
  appendices(spec, kept, chosen, refuse, findings);
  return findings;
}

/**
 * Runs each check a project's own guidelines add (s-2fau85dfyyeq66m) with the command that the settings name, in the directory
 * the other checks read, with the model on its standard input (s-7pk89t8z6wymmj9). The rule that lists the check is read
 * in its last approved wording. An exit status other than zero makes `sheriff validate` refuse the change, or only report
 * it where that rule says so; what the check printed is shown with the refusal or the report. A check that changes a file that git does not ignore is refused (s-vj67ztqkuhxbv7s).
 */
function projectChecks(root: string, config: Config, spec: Specification, strict: boolean): Finding[] {
  const found: Finding[] = [];
  if (!config.checks.length) return found;
  const flags = strict ? { approved: true, strict: true } : modelFlags(root, config, spec);
  const model = JSON.stringify(modelOf(spec, flags));
  const wordings = approvedWordings(root, spec);
  for (const check of config.checks) {
    const where = `check "${check.name}"`;
    const list = wordings.wording(check.rule)?.list as { members?: unknown[]; property?: string } | undefined;
    // A member's value is the member itself, or, if the member is an object, the value of the property that the list names (s-5hb9k2e34dgn284).
    const valueOf = (m: unknown) => (m && typeof m === "object" ? (m as Record<string, unknown>)[list?.property ?? ""] : m);
    const member = list?.members?.find((m) => valueOf(m) === check.name);
    if (member === undefined) {
      found.push({ where, message: `the last approved wording of the rule ${check.rule} does not list the check` });
      continue;
    }
    const before = snapshot(root);
    const run = spawnSync(check.command, { cwd: root, input: model, shell: true, encoding: "utf8", maxBuffer: 1 << 26 });
    const after = snapshot(root);
    if (before && after) {
      const changed = [...new Set([...before.keys(), ...after.keys()])].filter((p) => before.get(p) !== after.get(p)).sort();
      if (changed.length) found.push({ where, message: `the check changed files it may not change: ${changed.join(", ")}` });
    }
    if (run.status === 0) continue;
    const output = `${run.stdout ?? ""}${run.stderr ?? ""}`.trim();
    const onFailure = member && typeof member === "object" ? (member as Record<string, unknown>).onFailure : undefined;
    const reported = onFailure === "reported" || (onFailure === "reportedUnlessStrict" && !flags.strict);
    found.push({ where, message: output || `ended with exit status ${run.status}`, ...(reported ? { reported: true as const } : {}) });
  }
  return found;
}

/**
 * The content of each of the directory's files that git lists either as untracked and not ignored, or as changed. Outside a
 * repository, the function returns null. A file that a check adds, changes or removes has different content in the listing
 * taken before the check runs and in the one taken after it.
 */
function snapshot(root: string): Map<string, string> | null {
  const listed = (...args: string[]) => {
    const run = gitIn(root, ...args);
    return run.ok ? run.out.split("\n").filter(Boolean) : null;
  };
  const untracked = listed("ls-files", "-o", "--exclude-standard");
  const changed = listed("diff", "--name-only", "--relative");
  if (!untracked || !changed) return null;
  const content = (p: string) => (existsSync(join(root, p)) ? createHash("sha1").update(readFileSync(join(root, p))).digest("hex") : "");
  return new Map([...new Set([...untracked, ...changed])].map((p) => [p, content(p)]));
}

/** Every JSON file of the schema that the repository keeps, in `specs/_schema/` and the folders under it (s-7zqsstgnuc772ba). */
function schemaPaths(root: string): string[] {
  const dir = join(root, "specs", "_schema");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: "utf8" })
    .map((p) => p.replaceAll("\\", "/"))
    .filter((p) => p.endsWith(".json") && statSync(join(dir, p)).isFile())
    .sort()
    .map((p) => `specs/_schema/${p}`);
}

/**
 * What a commit adds to the archive, compared with what it removes from the specification (s-j4webte36gkraju). A node is removed where the commit's parent holds
 * its sid and the commit does not. It must be archived where it was ever approved and its status is set by approvals.
 * Its entry is a node the commit adds to the archive with the location, the kind and the wording it had in the parent.
 * A node is added to the archive where the archive holds more nodes with its location, kind and wording than the parent's archive holds.
 */
function archiveFindings(spec: Specification, before: Specification, lines: ReturnType<typeof readApprovals>, writesGuidelines: boolean): Finding[] {
  const key = (n: SpecNode) => `${n.location}\u0000${n.kind}\u0000${fingerprint(n)}`;
  const counted = (s: Specification) => {
    const out = new Map<string, Array<{ node: SpecNode; path: string }>>();
    for (const f of s.archive) for (const node of f.data.nodes ?? []) out.set(key(node), [...(out.get(key(node)) ?? []), { node, path: f.path }]);
    return out;
  };
  const [now, was] = [counted(spec), counted(before)];
  const added = new Map<string, Array<{ node: SpecNode; path: string }>>();
  for (const [k, list] of now) {
    const extra = list.slice(was.get(k)?.length ?? 0);
    if (extra.length) added.set(k, extra);
  }
  const findings: Finding[] = [];
  for (const [sid, at] of before.nodes) {
    if (spec.nodes.has(sid) || !judgedHere(at.file.path, writesGuidelines)) continue;
    if (isContainer(at.node.kind) || !everApproved(lines, sid)) continue;
    const entries = added.get(key(at.node));
    if (entries?.length) entries.shift();
    else findings.push({ where: `${at.file.path}: ${sid} (${at.node.location})`, message: "removed after an approval was given for it, but not in the archive with its location, kind and wording" });
  }
  for (const entries of added.values()) {
    for (const { node, path } of entries) findings.push({ where: `${path}: ${node.location}`, message: "added to the archive, but is the entry of no removed node that must be archived" });
  }
  return findings;
}

/** Every node in `nodes` and every node under any of them, including the nodes in the cells of a TableRule. */
function walk(nodes: SpecNode[] | undefined, visit: (n: SpecNode) => void): void {
  for (const n of nodes ?? []) visit(n), walk(n.children, visit), walk(cellNodes(n).map((c) => c.node), visit);
}

function holdsRule(section: SpecNode): boolean {
  return (section.children ?? []).some((c) => REQUIRING.has(c.kind) || (c.kind === "section" && holdsRule(c)));
}

/** What the check for words in capitals reads in a node: its title, text and reason, each string in the members of its list, and each text cell of a TableRule (s-e2vdhfsndy5stq9). */
function wordsRead(node: SpecNode): Array<[string, string]> {
  const read: Array<[string, string]> = [];
  for (const field of ["title", "text", "reason"] as const) if (typeof node[field] === "string") read.push([field, node[field] as string]);
  const strings = (v: unknown): string[] => (typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === "object" ? Object.values(v).flatMap(strings) : []);
  for (const s of strings((node.list as { members?: unknown } | undefined)?.members)) read.push(["list", s]);
  for (const g of (node.groups as Array<{ rows?: Array<{ cells?: Record<string, { text?: unknown }> }> }> | undefined) ?? []) {
    for (const r of g.rows ?? []) for (const c of Object.values(r.cells ?? {})) if (typeof c.text === "string") read.push(["text cell", c.text]);
  }
  return read;
}

type Refuse = (sid: string, message: string) => void;

/** The checks of the domains, run only where the project has chosen the Domains extension. */
function domains(root: string, spec: Specification, kept: Array<[string, Located]>, built: ReturnType<typeof incoming>, refuse: Refuse, findings: Finding[]): void {
  const parts = new Map<string, { headers: Array<{ node: SpecNode; path: string }>; sections: SpecNode[] }>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isDomain(part)) continue;
    if (!parts.has(part)) parts.set(part, { headers: [], sections: [] });
    const entry = parts.get(part)!;
    for (const n of f.data.nodes) {
      if (n.kind === "header") entry.headers.push({ node: n, path: f.path }), entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
      else if (n.kind === "section") entry.sections.push(n);
    }
  }
  const levels = levelsOf(spec, approvedWordings(root, spec));
  const domainOf = new Map<string, string>();
  for (const [part, { sections }] of parts) for (const s of sections) walk([s], (n) => domainOf.set(n.sid, part));
  const uses = new Map<string, Set<string>>();
  // Each domain's files hold exactly one header (s-8esbyvaj2yx5eqf), whose index is built from the domain's sections (s-agc6fb3vx46pc23).
  for (const [part, { headers, sections }] of parts) {
    if (headers.length !== 1) {
      const named = headers.map((h) => `${h.path} ${h.node.sid}`).join(", ");
      findings.push({ where: `specs/${part}/`, message: headers.length ? `domain ${part} has more than one header: ${named}` : `domain ${part} has no header` });
      continue;
    }
    const header = headers[0]!.node;
    domainOf.set(header.sid, part);
    if (JSON.stringify(header.sections) !== JSON.stringify(headerIndex(spec, sections, built))) {
      refuse(header.sid, "the index in its header is not what the domain's sections produce");
    }
    const level = header.level as string | undefined;
    if (level !== undefined && !levels.includes(level)) refuse(header.sid, `level "${level}" is not listed in the last approved wording of a rule of the project's own guidelines`);
  }
  // A `consumes` link goes from a domain's header to a section of another domain (s-p3n666zfjdrrw6a).
  for (const [sid, { node }] of kept) {
    for (const r of node.refs.filter((r) => r.type === "consumes" && r.to && spec.nodes.has(r.to))) {
      const from = node.kind === "header" ? domainOf.get(sid) : undefined;
      const to = spec.nodes.get(r.to!)?.node.kind === "section" ? domainOf.get(r.to!) : undefined;
      if (!from || !to || from === to) {
        refuse(sid, `its consumes link to ${r.to} must go from a domain's header to a section of another domain`);
        continue;
      }
      if (!uses.has(from)) uses.set(from, new Set());
      uses.get(from)!.add(to);
    }
  }
  const cycle = findCycle(uses);
  if (cycle) findings.push({ where: "specs/", message: `the domains use one another in a cycle: ${cycle.join(" → ")}` });

  // The nodes that cite a term or link to it determine where the term is defined (s-76becsjwmasc2r2).
  const users = new Map<string, Array<{ sid: string; path: string }>>();
  for (const [sid, { node, file }] of spec.nodes) {
    const targets = new Set([...node.refs.filter((r) => r.to).map((r) => r.to!), ...citations(node).sids]);
    for (const t of targets) if (t !== sid && spec.nodes.get(t)?.node.kind === "term") users.set(t, [...(users.get(t) ?? []), { sid, path: file.path }]);
  }
  // The domain that a node belongs to, determined from the folder that holds the node's file or from the file of the technical appendix named after the domain.
  const domainAt = (path: string) => {
    const { part, file } = partOf(path);
    return isDomain(part) ? part : part === "tech" && parts.has(file) ? file : undefined;
  };
  for (const [sid, { node, file }] of kept) {
    if (node.kind !== "term") continue;
    const { part } = partOf(file.path);
    const using = users.get(sid) ?? [];
    if (isDomain(part)) {
      const outside = using.filter((u) => domainAt(u.path) !== part);
      if (outside.length) refuse(sid, `a term of the domain ${part}, cited or linked to from outside the domain ${part}: ${outside.map((u) => `${u.path} ${u.sid}`).join(", ")}`);
    } else if (part === "contracts" && using.length) {
      const only = new Set(using.map((u) => domainAt(u.path)));
      const [domain] = only;
      if (only.size === 1 && domain) refuse(sid, `only the domain ${domain} cites or links to it; move it into that domain`);
    }
  }
}

function findCycle(uses: Map<string, Set<string>>): string[] | null {
  const state = new Map<string, "open" | "done">();
  const path: string[] = [];
  const visit = (d: string): string[] | null => {
    if (state.get(d) === "done") return null;
    if (state.get(d) === "open") return [...path.slice(path.indexOf(d)), d];
    state.set(d, "open");
    path.push(d);
    for (const next of [...(uses.get(d) ?? [])].sort()) {
      const found = visit(next);
      if (found) return found;
    }
    path.pop();
    state.set(d, "done");
    return null;
  };
  for (const d of [...uses.keys()].sort()) {
    const found = visit(d);
    if (found) return found;
  }
  return null;
}

type NeutralType = { is: string; values?: string[]; from?: string; kind?: string; fields?: Field[]; of?: NeutralType; record?: string };
type Field = { name: string; type: NeutralType; gathered?: Array<{ value: string; sid: string }> };

/** In any list, each member that is an object has the property that the list names (s-cdachayybfvg4na). */
function objectsInLists(kept: Array<[string, Located]>, refuse: Refuse): void {
  for (const [sid, { node }] of kept) {
    const list = node.list as { members?: unknown[]; property?: string } | undefined;
    (list?.members ?? []).forEach((m, i) => {
      if (!m || typeof m !== "object" || Array.isArray(m)) return;
      if (!list!.property) refuse(sid, `member ${i + 1} of its list is an object, and the list names no property holding its value`);
      else if (!(list!.property in m)) refuse(sid, `member ${i + 1} of its list lacks the property "${list!.property}" the list names`);
    });
  }
}

function variants(spec: Specification, refuse: Refuse, kinds: Set<string>): void {
  const record = (sid: string | undefined) => (sid ? spec.nodes.get(sid)?.node : undefined);
  const refined = (n: SpecNode) => record(n.refs.find((r) => r.type === "refines" && record(r.to)?.kind === "RecordType")?.to);
  const chain = (n: SpecNode | undefined): SpecNode[] => (n ? [n, ...chain(refined(n))] : []);
  // A RecordType's fields, the fields every variant holds in its field of type variant included.
  const fieldsOf = (n: SpecNode) => ((n.fields as Field[]) ?? []).flatMap((f) => [f, ...(f.type.is === "variant" ? (f.type.fields ?? []) : [])]);
  const fieldsUpChain = (n: SpecNode | undefined): Field[] => chain(n).flatMap(fieldsOf);
  const holding = (n: SpecNode | undefined, name: string): SpecNode | undefined =>
    !n || ((n.fields as Field[]) ?? []).some((f) => f.name === name) ? n : holding(refined(n), name);
  const part = (n: SpecNode) => partOf(spec.nodes.get(n.sid)!.file.path).part;

  // Where each value of a field choosing a variant is declared: its own list, then the lists rules of
  // domains define for it, each list found by its rule's refines link to a RecordType of contracts.
  const declared = new Map<string, Map<string, SpecNode[]>>();
  const declare = (holder: SpecNode, name: string, value: string, by: SpecNode) => {
    const key = `${holder.sid} ${name}`;
    if (!declared.has(key)) declared.set(key, new Map());
    declared.get(key)!.set(value, [...(declared.get(key)!.get(value) ?? []), by]);
  };
  // Each value comes from the field's one source: its own list, or the values gathered for it (s-xfu2gpzddjnmgks).
  const gathered = gather(spec);
  for (const [, { node }] of spec.nodes) {
    if (node.kind !== "RecordType") continue;
    for (const f of (node.fields as Field[]) ?? []) {
      if (f.type.is !== "one of") continue;
      if (f.type.from) for (const g of gathered.get(fieldKey(node, f.name)) ?? []) declare(node, f.name, g.value, spec.nodes.get(g.sid)?.node ?? node);
      else for (const v of f.type.values ?? []) declare(node, f.name, v, node);
    }
    const variantFields = chain(node).flatMap((n) => ((n.fields as Field[]) ?? []).filter((f) => f.type.is === "variant"));
    if (variantFields.length > 1) refuse(node.sid, `holds two fields of type variant, its inherited ones counted: ${variantFields.map((f) => f.name).join(", ")}`);
  }
  for (const [sid, { node }] of spec.nodes) {
    const list = node.list as { field?: string; members: string[] } | undefined;
    if (!list?.field) continue;
    const target = record(node.refs.find((r) => r.type === "refines" && record(r.to)?.kind === "RecordType")?.to);
    if (!isDomain(part(node))) refuse(sid, `a list of the values of ${list.field} standing in ${part(node)}, not in a domain`);
    if (!target || part(target) !== "contracts") {
      refuse(sid, `a list of the values of ${list.field} that refines no RecordType described in contracts`);
      continue;
    }
    const holder = holding(target, list.field);
    const field = ((holder?.fields as Field[]) ?? []).find((f) => f.name === list.field);
    if (!holder || field?.type.is !== "one of" || field.type.from !== "domains") refuse(sid, `declares values of ${list.field}, whose values the domains do not add`);
  }
  for (const values of declared.values()) {
    for (const [value, by] of values) if (by.length > 1) for (const n of by) refuse(n.sid, `"${value}" is declared more than once: ${by.map((b) => b.sid).join(", ")}`);
  }
  // A field of type one of holds at least one value: a RecordType's own field in its list or in a
  // domain's list for it, one standing inside another type in its own list.
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "RecordType") continue;
    const empty = (name: string, type: NeutralType, own: boolean) => {
      if (type.is === "one of" && !(own ? declared.get(`${sid} ${name}`)?.size : type.values?.length)) refuse(sid, `${name} is of type one of with no value, in its own list or in a list of a domain`);
      if (type.of) empty(name, type.of, false);
      for (const f of type.fields ?? []) empty(f.name, f.type, false);
    };
    for (const f of (node.fields as Field[]) ?? []) empty(f.name, f.type, true);
  }

  // The values gathered beside each field are what its source produces, and a kind it names is one the schema holds.
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "RecordType") continue;
    for (const f of fieldsOf(node)) {
      if (f.type.is !== "one of") continue;
      if (f.type.from === "kindSids" && !kinds.has(f.type.kind ?? "")) refuse(sid, `${f.name} names the kind ${f.type.kind}, which the schema does not hold`);
      const want = f.type.from ? (gathered.get(fieldKey(node, f.name)) ?? []) : undefined;
      if (JSON.stringify(f.gathered) !== JSON.stringify(want)) refuse(sid, `the values gathered beside ${f.name} are not what their source produces; sheriff reindex writes them`);
    }
  }

  const answers = new Map<string, string[]>();
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "RecordType" || !node.answersTo) continue;
    const parent = refined(node);
    if (!parent) {
      refuse(sid, "a RecordType variant that refines no RecordType");
      continue;
    }
    let chooser: SpecNode | undefined = parent;
    while (chooser && !chooser.chosenBy) chooser = refined(chooser);
    const chosenBy = (chooser?.chosenBy as string[]) ?? [];
    const answersTo = node.answersTo as Record<string, string>;
    if (JSON.stringify(Object.keys(answersTo).sort()) !== JSON.stringify([...chosenBy].sort())) {
      refuse(sid, `answers to ${Object.keys(answersTo).join(", ")}, not to the fields its RecordType names as choosing it, ${chosenBy.join(", ") || "none"}`);
    }
    const inherited = fieldsUpChain(parent);
    // A value is declared in its choosing field's own list or in a domain's list for it, and the
    // variant stands in the part of the node declaring it.
    for (const [name, value] of Object.entries(answersTo)) {
      const holder = holding(parent, name);
      const field = ((holder?.fields as Field[]) ?? []).find((f) => f.name === name);
      const by = holder ? declared.get(`${holder.sid} ${name}`)?.get(value) : undefined;
      if (field?.type.is !== "one of") refuse(sid, `answers to "${value}" for ${name}, a field with no list of values to declare it in`);
      else if (!by?.length) refuse(sid, `answers to "${value}" for ${name}, which is not declared among its values`);
      else if (by.length === 1 && part(node) !== part(by[0]!)) refuse(sid, `stands in ${part(node)}, while the value "${value}" it answers to for ${name} is declared in ${part(by[0]!)}`);
    }
    const own = ((node.fields as Field[]) ?? []).filter((f) => !inherited.some((i) => i.name === f.name));
    if (own.length === 0) refuse(sid, "a RecordType variant that declares no field of its own");
    const key = `${chooser?.sid} ${JSON.stringify(Object.entries(answersTo).sort())}`;
    answers.set(key, [...(answers.get(key) ?? []), sid]);
  }
  for (const sids of answers.values()) if (sids.length > 1) for (const sid of sids) refuse(sid, "answers to values another variant of its record answers to");

  // An identifier takes the type of the field identifying the RecordType it names, so that field,
  // followed from one identifier to the next, ends in a field of another type.
  const identifying = (n: SpecNode) => fieldsUpChain(n).find((f) => f.name === n.identifiedBy);
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "RecordType") continue;
    const by = node.identifiedBy as string | undefined;
    if (by && !fieldsUpChain(node).some((f) => f.name === by)) refuse(sid, `identified by ${by}, which is none of its fields`);
    const visit = (field: string, type: NeutralType) => {
      if (type.is === "identifier of") {
        const named = record(type.record);
        if (!named?.identifiedBy) refuse(sid, `${field} is an identifier of ${type.record}, which names no field identifying it`);
        const passed = named ? [named.sid] : [];
        for (let at = named && identifying(named); at?.type.is === "identifier of"; ) {
          const next = record(at.type.record);
          if (!next) break;
          if (passed.includes(next.sid)) {
            refuse(sid, `${field} leads, from one identifying field to the next, back to ${next.sid}`);
            break;
          }
          passed.push(next.sid);
          at = identifying(next);
        }
      }
      if (type.of) visit(field, type.of);
      for (const f of type.fields ?? []) visit(f.name, f.type);
    };
    for (const f of (node.fields as Field[]) ?? []) visit(f.name, f.type);
  }
}

function appendices(spec: Specification, kept: Array<[string, Located]>, chosen: Set<string>, refuse: Refuse, findings: Finding[]): void {
  const linksTo = (n: SpecNode, type: string, ok: (target: Located) => boolean) =>
    n.refs.some((r) => r.to && r.type === type && spec.nodes.has(r.to) && ok(spec.nodes.get(r.to)!));
  const SPEC = "specs/_guidelines/spec.json";
  const EXTENSIONS = "specs/_guidelines/extensions/";
  const rule = (t: Located) => t.node.kind !== "section";
  const ownFiles = spec.files.filter((f) => !f.taken);

  // Where the project has chosen the Domains extension, each file of the technical appendix is named after a domain (s-gvafe6bnstwab8b).
  if (chosen.has("domains")) {
    const domains = new Set(spec.files.map((f) => partOf(f.path).part).filter(isDomain));
    for (const f of ownFiles) {
      const { part, file: name } = partOf(f.path);
      if (part === "tech" && name !== "stack" && name !== "debt" && !domains.has(name)) findings.push({ where: f.path, message: "a file of the technical appendix named after no domain" });
    }
  }

  // The links that the appendices and the project's own guidelines declare to the rules they build on (s-yprj7d6tnvauggr).
  for (const [sid, { node, file }] of kept) {
    const { part, file: name } = partOf(file.path);
    if (node.kind === "section") continue;
    if (part === "tech" && name !== "stack" && name !== "debt") {
      if (!linksTo(node, "implements", (t) => isBase(t.file.path))) refuse(sid, "a node of the technical appendix that implements no node of the base specification");
    } else if (part === "_guidelines" && name === "tools") {
      if (!linksTo(node, "implements", (t) => rule(t) && (t.file.path === SPEC || t.file.path.startsWith(EXTENSIONS)))) {
        refuse(sid, "a rule of the appendix of the tools that implements no rule of the SpecSheriff guidelines or of an extension of them");
      }
    } else if (part === "_guidelines" && name === "project") {
      const extensionChosen = (path: string) => path.startsWith(EXTENSIONS) && chosen.has(posix.basename(path, ".json"));
      if (!linksTo(node, "refines", (t) => rule(t) && (t.file.path === SPEC || extensionChosen(t.file.path)))) {
        refuse(sid, "a rule of the project's own guidelines that refines no rule of the SpecSheriff guidelines or of an extension the project has chosen");
      }
    }
  }

  // Each section of the technical appendix has the same path of titles as a section of the base specification (s-g7auhqvzzbkw644).
  const key = (titles: string[]) => JSON.stringify(titles);
  const paths = new Map<string, Set<string>>();
  const collect = (nodes: SpecNode[], above: string[], into: Set<string>) => {
    for (const n of nodes) {
      if (n.kind === "section") {
        const here = [...above, n.title];
        into.add(key(here));
        collect(n.children ?? [], here, into);
      } else if (n.kind === "header" && chosen.has("domains")) collect(n.children ?? [], above, into);
    }
  };
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isBase(f.path)) continue;
    if (!paths.has(part)) paths.set(part, new Set());
    collect(f.data.nodes, [], paths.get(part)!);
  }
  const everywhere = new Set([...paths.values()].flatMap((s) => [...s]));
  const match = (nodes: SpecNode[], above: string[], known: Set<string>) => {
    for (const n of nodes) {
      if (n.kind !== "section") continue;
      const here = [...above, n.title];
      if (!known.has(key(here))) refuse(n.sid, `a section of the technical appendix titled "${n.title}" whose path of titles leads to no section of the base specification`);
      match(n.children ?? [], here, known);
    }
  };
  for (const f of ownFiles) {
    const { part, file: name } = partOf(f.path);
    if (part !== "tech" || name === "stack" || name === "debt") continue;
    const [first, ...more] = f.data.nodes;
    if (!first) continue;
    // The nodes after the first top-level node are treated as nodes under it.
    const under = [...(first.children ?? []), ...more];
    if (paths.has(name)) match(under, [], paths.get(name)!);
    else match([{ ...first, children: under }], [], everywhere);
  }
}
