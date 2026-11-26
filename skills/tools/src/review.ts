import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { delimiter, isAbsolute, join } from "node:path";
import { addedApprovals, readApprovals } from "./approvals.ts";
import { implementing, parentSpecification, readCommit, type Commit } from "./binding.ts";
import type { CodeComment, CodeFile, CodeSymbol, CodeTest, Tag } from "./code.ts";
import { loadConfig, ownerSettings, strictDefault, type Config, type ReviewSettings } from "./config.ts";
import { base, changes, git } from "./diff.ts";
import { runGenerators } from "./generators.ts";
import { messageText, noChangeTrailers } from "./message.ts";
import { partOf } from "./model.ts";
import { loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";
import { typeFiles } from "./types.ts";
import type { Finding } from "./validate.ts";

export type RunResult = { status: "ok"; out: string } | { status: "missing" | "timeout" | "failed"; detail: string };
/** What a runner is run at: the settings of its runner the user's git configuration gives, or their defaults, and the time limit. */
export interface RunSettings {
  minutes: number;
  values: Record<string, string>;
}
export type Runner = (input: string, settings: RunSettings) => RunResult;

/** Each runner's settings in the user's git configuration, under `specsheriff.review`, with the default taken where one is lacking. */
export const RUNNER_DEFAULTS: Record<ReviewSettings["runner"], Record<string, string>> = {
  claude: { claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" },
  codex: { codexModel: "", codexEffort: "high" },
};

/** The settings of a runner as the git configuration of the user who commits holds them, an empty one confirmed, and each it lacks at its default. */
export function runnerSettings(root: string, runner: ReviewSettings["runner"]): { values: Record<string, string>; defaulted: string[] } {
  const values: Record<string, string> = {};
  const defaulted: string[] = [];
  for (const [key, otherwise] of Object.entries(RUNNER_DEFAULTS[runner])) {
    const held = git(root, "config", "--get", `specsheriff.review.${key}`);
    if (held.ok) values[key] = held.out.replace(/\r?\n$/, "");
    else (values[key] = otherwise), defaulted.push(key);
  }
  return { values, defaulted };
}

/** What is said with a review held at a default: each setting taken so, and how the user confirms it. */
function defaultsNotice(runner: ReviewSettings["runner"], defaulted: string[]): string {
  const commands = defaulted.map((key) => {
    const value = RUNNER_DEFAULTS[runner][key]!;
    return `  git config --global specsheriff.review.${key} ${value === "" ? '""' : value}${value === "" ? "   (the model Codex chooses for your account)" : ""}`;
  });
  const where = runner === "claude" ? "as the plugin's options in /config of Claude Code, or " : "";
  return `sheriff review: the reviewer ran, at your cost, at settings you have not confirmed on this machine: ${defaulted.map((k) => `specsheriff.review.${k}`).join(", ")}. Confirm them, or name others, ${where}by:\n${commands.join("\n")}\n`;
}

const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;

export const SYSTEM_PROMPT = `You are the independent reviewer of one commit. You are given the commit's message, the wording of the nodes of the specification that bear on the commit, what each of your judgements needs, and the commit's change, and nothing else. Judge against those nodes, not against what the commit's author may have meant. A node's reason says what its rule protects: read a case that its text leaves open by it. Make each judgement for which the input has a section, and only those.

The judgement on code, "code". Judge each changed symbol, file and test given under "The code the commit adds or changes" whole, not only its changed lines. Refuse the commit where any of the following holds:
- a changed symbol or file whose SpecTags name rules does something that none of those rules states;
- a changed test checks something that the rule its SpecTag names does not state;
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or by a rule that the commit's message names anywhere other than in an Implementation-Needs-No-Change trailer;
- a changed symbol or file carries a SpecTag naming a rule that it does not implement;
- a changed symbol or file carries \`@spec none\`, but implements the system's logic;
- a changed symbol or file carries \`@spec none\` whose text does not say what the technology that the system is built with requires of it.
A finding on code that carries \`@spec none\` names s-kgbzk2ph9e6jfb4, the rule on how code is bound to its rules, as the rule that it concerns.

The judgement on comments, "comments". Each comment under "The comments the commit adds or changes" is followed by the code that it describes. Judge the comment's text, except its SpecTags. Find a problem only where the comment states something that the code it describes does not do, or contradicts a rule that a SpecTag on that code names. In a file given whole whose comments the input does not list, tell the comments apart from the code yourself, and judge each comment that the commit adds or changes. A finding on a comment names each rule that the comment contradicts, if any. It is only a warning and refuses nothing, so a verdict whose findings are all on comments passes the commit.

The judgement on a statement that a rule's implementation needs no change, "statement". For each rule under "The rules whose implementation, as the message states, needs no change", you are given its wording before and after the commit and the code and the tests bound to it. Refuse the commit where that code and those tests do not implement the rule as it reads after the commit. The finding names the rule.

The judgement on a node of the technical appendix, "appendix". For each node under "The nodes of the technical appendix that the commit approves", refuse the commit where the node contradicts a rule of the base specification, or implements a rule of the base specification without refining that rule. The finding names the node and that rule.

The files generated from the specification are left out of the change, and the input names those that the commit changes. They hold the types and runtime checks generated from the RecordTypes, or what a project's generator wrote, and another check compares them with what the nodes produce. Count what a RecordType requires as carried out by the types and runtime checks generated from it, and never refuse a commit because those files are not in the change.

Answer with one JSON object and nothing around it:
{"verdict": "pass" | "refuse", "findings": [{"nodes": ["<sid>"], "problem": "<what is wrong>", "judgement": "code" | "comments" | "statement" | "appendix", "file": "<path>" | null, "line": <line in the file as the commit leaves it> | null}]}
A refusal lists at least one finding whose judgement is not "comments". A pass lists only findings on comments, if any. A finding that concerns code names its file, and the line where the problem lies on one line. Any other finding gives null for both.`;

/** A piece of code as it is given to the reviewer: its file, its lines, its kind (a symbol, a test or a whole file), its SpecTags and its text. */
interface Piece {
  path: string;
  start: number;
  lines: string;
  what: string;
  tags: string[];
  code: string;
}

const span = (start: number, end: number) => (start === end ? `${start}` : `${start}-${end}`);
/** Each SpecTag as the reviewer reads it: the sid that it names, or `@spec none` with its text. */
const tagNames = (tags: Tag[]) => tags.map((g) => g.sid ?? `@spec none ${g.none ?? ""}`.trim());

/** The pieces of a file that the reviewer can be given: a symbol, a test, the whole file, or the code outside every symbol. */
function piecesOf(file: CodeFile, text: string) {
  const lines = text.split("\n");
  const slice = (start: number, end: number) => lines.slice(start - 1, end).join("\n");
  const count = text.endsWith("\n") ? lines.length - 1 : lines.length;
  const runs: Array<[number, number]> = [];
  for (const l of file.outside) {
    const last = runs.at(-1);
    if (last && l === last[1] + 1) last[1] = l;
    else runs.push([l, l]);
  }
  return {
    symbol: (s: CodeSymbol): Piece => ({ path: file.path, start: s.start, lines: span(s.start, s.end), what: s.name, tags: tagNames(s.tags), code: slice(s.start, s.end) }),
    test: (c: CodeTest): Piece => ({ path: file.path, start: c.start, lines: span(c.start, c.end), what: `the test "${c.name}"`, tags: [c.sid ?? c.bare].filter((s): s is string => !!s), code: slice(c.start, c.end) }),
    // The whole file is bound by every SpecTag in it: those at its start and those of its symbols and its tests.
    whole: (): Piece => ({ path: file.path, start: 1, lines: span(1, Math.max(count, 1)), what: "the whole file", tags: [...new Set([
      ...tagNames(file.fileTags),
      ...file.symbols.flatMap((s) => [s, ...s.inner]).flatMap((s) => tagNames(s.tags)),
      ...file.tests.flatMap((c) => [c.sid ?? c.bare].filter((s): s is string => !!s)),
    ])], code: text.replace(/\n$/, "") }),
    outside: (): Piece => ({
      path: file.path,
      start: runs[0]?.[0] ?? 1,
      lines: runs.map(([a, b]) => span(a, b)).join(", "),
      what: runs.length ? "the code outside every symbol" : "the code outside every symbol, which the commit removes",
      tags: tagNames(file.fileTags),
      code: runs.map(([a, b]) => slice(a, b)).join("\n…\n"),
    }),
  };
}

function shown(piece: Piece, level = "##"): string {
  const where = piece.lines ? `${piece.path}:${piece.lines}` : piece.path;
  return `${level} ${where} ${piece.what} (SpecTags: ${piece.tags.join(", ") || "no SpecTag"})\n\n\`\`\`\n${piece.code}\n\`\`\``;
}

/** The keys of a node that are shown in its wording apart from the fields of its kind, and the keys that are not part of its wording. */
const APART = new Set(["location", "sid", "status", "refs", "meta", "children", "owner", "owners", "sections", "archived", "kind", "title", "text", "reason", "examples"]);

/** A node's wording: its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (s-nyh9yk22ba6g77q). */
function wordingOf(node: SpecNode, level = "##"): string {
  const parts = [`${level} ${node.location} ${node.title} (${node.sid})`, "", node.text ?? ""];
  if (node.reason) parts.push("", `Why: ${node.reason}`);
  const examples = (node as { examples?: unknown }).examples;
  if (examples !== undefined) parts.push("", "Examples:", JSON.stringify(examples, null, 2));
  const fields = Object.fromEntries(Object.entries(node).filter(([k]) => !APART.has(k)));
  if (Object.keys(fields).length) parts.push("", `The fields of its kind, ${node.kind}:`, JSON.stringify(fields, null, 2));
  return parts.join("\n");
}

/** Every file that `sheriff types` writes: the types and runtime checks, and what the project's own generators print (s-vp24dqydygztqbt). */
function generatedFiles(root: string, spec: Specification, config: Config): Set<string> {
  return new Set([...typeFiles(root, spec).paths, ...runGenerators(root, spec, config).files.map((f) => f.path)]);
}

/** Each piece of code that the commit adds or changes outside the generated files, in full (s-rd9nftptjuz6bwv). */
function changedPieces(root: string, commit: Commit, generated: Set<string>): Piece[] {
  const pieces: Piece[] = [];
  for (const file of [...commit.codeFiles, ...commit.testFiles]) {
    if (generated.has(file.path)) continue;
    const symbols = commit.changedSymbols.get(file.path) ?? new Set<CodeSymbol>();
    const tests = commit.changedTests.get(file.path) ?? new Set<string>();
    const own = commit.changedFiles.has(file.path);
    if (!symbols.size && !tests.size && !own) continue;
    const at = piecesOf(file, readFileSync(join(root, file.path), "utf8"));
    const found = [...symbols].map(at.symbol);
    if (own) found.push(file.whole ? at.whole() : at.outside());
    for (const c of file.tests) if (tests.has(c.name)) found.push(at.test(c));
    pieces.push(...found.sort((a, b) => a.start - b.start));
  }
  return pieces;
}

/**
 * The code that a comment describes (s-7vpsdsy8dpqdy6r): the whole file, where it is bound as a whole; otherwise the innermost
 * symbol or test that holds the comment or starts directly below it; otherwise the symbol or the test that follows it; otherwise
 * the whole file.
 */
function describedBy(file: CodeFile, comment: CodeComment, at: ReturnType<typeof piecesOf>): Piece {
  if (file.whole) return at.whole();
  const units = [
    ...file.symbols.flatMap((s) => [s, ...s.inner]).map((s) => ({ start: s.start, end: s.end, piece: () => at.symbol(s) })),
    ...file.tests.map((c) => ({ start: c.start, end: c.end, piece: () => at.test(c) })),
  ];
  const holding = units.filter((u) => (u.start <= comment.start && comment.end <= u.end) || u.start === comment.end + 1).sort((a, b) => a.end - a.start - (b.end - b.start));
  const next = units.filter((u) => u.start > comment.end).sort((a, b) => a.start - b.start);
  return (holding[0] ?? next[0])?.piece() ?? at.whole();
}

/** Each piece of code and each test bound to a rule, directly or through a chain of `implements` links, in full, as the commit leaves it (s-kgqxg4gunzynwsv). */
function boundPieces(root: string, spec: Specification, commit: Commit, generated: Set<string>, sid: string): Piece[] {
  const chain = implementing(spec, sid);
  const names = (tags: Tag[]) => tags.some((g) => g.sid !== undefined && chain.has(g.sid));
  const pieces: Piece[] = [];
  for (const file of [...commit.codeFiles, ...commit.testFiles]) {
    if (generated.has(file.path)) continue;
    const symbols = file.symbols.flatMap((s) => [s, ...s.inner]).filter((s) => names(s.tags));
    const tests = file.tests.filter((c) => [c.sid, c.bare].some((s) => s && chain.has(s)));
    const own = names(file.fileTags);
    if (!symbols.length && !tests.length && !own) continue;
    const at = piecesOf(file, readFileSync(join(root, file.path), "utf8"));
    const found = [...symbols.map(at.symbol), ...tests.map(at.test)];
    if (own) found.push(file.whole ? at.whole() : at.outside());
    pieces.push(...found.sort((a, b) => a.start - b.start));
  }
  return pieces;
}

/** The parts that hold no rule of the base specification: the guidelines, the technical appendix and the archive. */
const NOT_BASE = ["_guidelines", "tech", "_archive"];
/** Whether a node is a rule of the base specification: a node other than a section or a domain's header, in a part of the base specification. */
function isBaseRule(spec: Specification, sid: string): boolean {
  const at = spec.nodes.get(sid);
  return !!at && !NOT_BASE.includes(partOf(at.file.path).part) && at.node.kind !== "section" && at.node.kind !== "header";
}

/** The top-level section of the base specification that holds a rule or, for a rule in no section, the rule's folder (s-4bwa4zepd4nwcv8). */
function topSection(spec: Specification, sid: string): string {
  let top: string | null = null;
  for (let at = spec.nodes.get(sid); at; at = at.parent ? spec.nodes.get(at.parent.sid) : undefined) if (at.node.kind === "section") top = at.node.sid;
  return top ?? `${partOf(spec.nodes.get(sid)!.file.path).part}/`;
}

/**
 * The rules of the base specification that bear on a node of the technical appendix (s-nyh9yk22ba6g77q): each rule that the node
 * implements, each with a link to or from such a rule, and each in the same top-level section as such a rule.
 */
function bearingRules(spec: Specification, sid: string): string[] {
  const implemented = spec.nodes.get(sid)!.node.refs.flatMap((r) => (r.type === "implements" && r.to && isBaseRule(spec, r.to) ? [r.to] : []));
  const keep = new Set<string>();
  for (const rule of implemented) {
    const section = topSection(spec, rule);
    for (const r of spec.nodes.get(rule)!.node.refs) for (const other of [r.to, r.from]) if (other && isBaseRule(spec, other)) keep.add(other);
    for (const [other, { node }] of spec.nodes) {
      if (!isBaseRule(spec, other)) continue;
      if (other === rule || node.refs.some((r) => r.to === rule) || topSection(spec, other) === section) keep.add(other);
    }
  }
  return [...spec.nodes.keys()].filter((s) => keep.has(s));
}

/** What the reviewer is given for a commit, and whether the reviewer must make any of its judgements about the commit (s-vp24dqydygztqbt). */
async function prepare(root: string, text: string): Promise<{ input: string; due: boolean }> {
  const spec = loadSpecification(root);
  const config = loadConfig(root);
  const commit = await readCommit(root, config, spec);
  const generated = generatedFiles(root, spec, config);
  const files = new Map([...commit.codeFiles, ...commit.testFiles].map((f) => [f.path, f]));

  const pieces = changedPieces(root, commit, generated);
  const removes = commit.removed.some((r) => !generated.has(r.path));
  const comments = [...commit.changedComments].filter(([path]) => !generated.has(path) && files.has(path)).flatMap(([path, found]) => {
    const file = files.get(path)!;
    const at = piecesOf(file, readFileSync(join(root, path), "utf8"));
    return found.map((comment) => ({ path, comment, described: describedBy(file, comment, at) }));
  });
  const trailers = [...noChangeTrailers(root, text)];
  // The specification of the commit's parent is read only where a trailer needs the wording that a rule had there.
  const parent = trailers.length ? parentSpecification(root) : null;
  const statements = trailers.filter((sid) => spec.nodes.has(sid) || parent?.nodes.has(sid));
  const approvedNow = new Set(addedApprovals(root, readApprovals(root)).filter((a) => !a.withdrawn).map((a) => a.sid));
  const appendix = [...approvedNow].filter((sid) => {
    const at = spec.nodes.get(sid);
    return !!at && partOf(at.file.path).part === "tech" && at.node.refs.some((r) => r.type === "implements" && !!r.to && isBaseRule(spec, r.to));
  });
  const due = pieces.length > 0 || removes || comments.length > 0 || statements.length > 0 || appendix.length > 0;

  // The wording of each node that the message names (s-nyh9yk22ba6g77q), and of each rule named by a SpecTag on code that the
  // commit adds or changes or on code that a comment added or changed by the commit describes.
  const named = new Set([...(messageText(text).match(SIDS) ?? []), ...[...pieces, ...comments.map((c) => c.described)].flatMap((p) => p.tags)]);
  const nodes = [...named].flatMap((sid) => {
    const node = spec.nodes.get(sid)?.node;
    return node ? [wordingOf(node)] : [];
  });
  const sections = [`# The commit's message\n\n${messageText(text).trim()}`, `# The nodes that the message and the SpecTags name\n\n${nodes.join("\n\n") || "(none)"}`];
  if (pieces.length || removes) {
    sections.push(`# The code the commit adds or changes\n\n${pieces.map((piece) => shown(piece)).join("\n\n") || "(none: the commit only removes code, which the change shows)"}`);
  }
  if (comments.length) {
    const each = comments.map(({ path, comment, described }) => `## ${path}:${span(comment.start, comment.end)}\n\n\`\`\`\n${comment.text}\n\`\`\`\n\nThe code that it describes:\n\n${shown(described, "###")}`);
    sections.push(`# The comments the commit adds or changes\n\n${each.join("\n\n")}`);
  }
  if (statements.length) {
    const each = statements.map((sid) => {
      const before = parent?.nodes.get(sid)?.node;
      const after = spec.nodes.get(sid)?.node;
      const code = boundPieces(root, spec, commit, generated, sid).map((piece) => shown(piece, "####"));
      return [
        `## ${sid}`,
        `### Its wording before the commit\n\n${before ? wordingOf(before, "####") : "(the commit's parent holds no such node)"}`,
        `### Its wording after the commit\n\n${after ? wordingOf(after, "####") : "(the commit removes the node)"}`,
        `### The code and the tests bound to it\n\n${code.join("\n\n") || "(none)"}`,
      ].join("\n\n");
    });
    sections.push(`# The rules whose implementation, as the message states, needs no change\n\n${each.join("\n\n")}`);
  }
  if (appendix.length) {
    const each = appendix.map((sid) => {
      const rules = bearingRules(spec, sid).map((rule) => wordingOf(spec.nodes.get(rule)!.node, "####"));
      return `${wordingOf(spec.nodes.get(sid)!.node)}\n\n### The rules of the base specification that bear on it\n\n${rules.join("\n\n")}`;
    });
    sections.push(`# The nodes of the technical appendix that the commit approves\n\n${each.join("\n\n")}`);
  }
  // The whole change, less the generated files, which another check compares with what the nodes produce. Those that the commit
  // changes are named to the reviewer, so that their absence does not read as something the commit leaves out.
  const changed = changes(root);
  const excluded = [...generated].map((path) => `:(exclude)${path}`);
  const diff = changed.length ? git(root, "diff", base(root), "--no-color", "--no-ext-diff", "--", ".", ...excluded).out : "";
  sections.push(`# The change\n\n\`\`\`diff\n${diff}\`\`\``);
  const left = [...generated].filter((path) => changed.some((c) => c.path === path || c.before === path)).sort();
  if (left.length) {
    const list = left.map((path) => `- ${path}`).join("\n");
    sections.push(`# The files left out of the change\n\nThe commit changes these files, which are generated from the specification. They hold the types and runtime checks generated from the RecordTypes, or what a project's generator wrote, and another check compares them with what the nodes produce. They are left out of the change:\n\n${list}`);
  }
  return { input: sections.join("\n\n") + "\n", due };
}

/** What the reviewer is given for a commit (s-nyh9yk22ba6g77q). */
export async function reviewInput(root: string, text: string): Promise<string> {
  return (await prepare(root, text)).input;
}

export function claudeArgs(values: Record<string, string>, promptFile: string): string[] {
  return [
    "-p",
    // An empty setting passes no flag, leaving its value to the CLI (s-tnz9zgqx8c629a7).
    ...(values.claudeModel ? ["--model", values.claudeModel] : []),
    ...(values.claudeFallbackModel ? ["--fallback-model", values.claudeFallbackModel] : []),
    ...(values.claudeEffort ? ["--effort", values.claudeEffort] : []),
    "--tools", "",
    "--setting-sources", "",
    "--strict-mcp-config",
    "--disable-slash-commands",
    "--no-session-persistence",
    "--output-format", "json",
    "--json-schema", VERDICT_SCHEMA,
    "--system-prompt-file", promptFile,
  ];
}

/** The variables of the environment a runner is handed: the system's paths and folders, the user's name, the locale, a proxy and the certificates to trust, and those by which its CLI finds its sign-in and chooses its provider; none an agent sets for its session, and none of git's. */
const ALLOWED = [
  "PATH", "PATHEXT", "SYSTEMROOT", "SYSTEMDRIVE", "WINDIR", "COMSPEC", "PROGRAMDATA", "PROGRAMFILES", "PROGRAMFILES(X86)", "PROGRAMW6432",
  "HOME", "USERPROFILE", "HOMEDRIVE", "HOMEPATH", "APPDATA", "LOCALAPPDATA", "TMP", "TEMP", "TMPDIR", "USER", "USERNAME", "LOGNAME",
  "LANG", "LC_*", "HTTP_PROXY", "HTTPS_PROXY", "NO_PROXY", "NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "SSL_CERT_DIR",
  "CLAUDE_CONFIG_DIR", "CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_GIT_BASH_PATH",
  "ANTHROPIC_*", "AWS_*", "CLOUD_ML_REGION", "GOOGLE_APPLICATION_CREDENTIALS", "OPENAI_*",
];

/** The variables of an environment a runner is handed, the allowed ones alone. */
export function runnerEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const allowed = (name: string) => ALLOWED.some((a) => (a.endsWith("*") ? name.toUpperCase().startsWith(a.slice(0, -1)) : name.toUpperCase() === a));
  return Object.fromEntries(Object.entries(env).filter(([k]) => allowed(k)));
}

/**
 * The program an npm command script starts and the arguments it gives it: the executable it names, or Node with the
 * script it names. Null where the script names neither.
 */
export function programOfShim(text: string, dir: string): { program: string; args: string[] } | null {
  const target = [...text.matchAll(/"%(?:~dp0|dp0%)([^"]+?\.(exe|js|cjs|mjs))"/gi)].at(-1);
  if (!target) return null;
  const path = `${dir.replace(/[\\/]+$/, "")}\\${target[1]!.replace(/^[\\/]+/, "")}`;
  return target[2]!.toLowerCase() === "exe" ? { program: path, args: [] } : { program: process.execPath, args: [path] };
}

/** Where a command is a program on the search path, or a command script npm installed, the program and the arguments to start it with. */
function resolveProgram(command: string): { program: string; args: string[] } | null {
  for (const dir of (process.env.PATH ?? process.env.Path ?? "").split(delimiter).filter(Boolean)) {
    if (existsSync(join(dir, `${command}.exe`))) return { program: join(dir, `${command}.exe`), args: [] };
    if (existsSync(join(dir, `${command}.cmd`))) return programOfShim(readFileSync(join(dir, `${command}.cmd`), "utf8"), dir);
  }
  return null;
}

/**
 * A watchdog that starts the runner's program and, once the time limit has passed, terminates the whole tree of processes that the
 * program started (s-xr5xxa9cxf2mq5u): on Windows with `taskkill /T`, elsewhere by killing the program's process group. It forwards the
 * program's output and exit status, and writes to standard error that the limit was reached or that the program was not found.
 */
const WATCHDOG = `
const { spawn, spawnSync } = require("node:child_process");
const { program, args, ms } = JSON.parse(process.argv[1]);
const child = spawn(program, args, { stdio: ["pipe", "pipe", "pipe"], detached: process.platform !== "win32" });
let out = "", err = "";
child.stdout.on("data", (d) => (out += d));
child.stderr.on("data", (d) => (err += d));
child.stdin.on("error", () => {});
process.stdin.pipe(child.stdin);
const timer = setTimeout(() => {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"]);
  else { try { process.kill(-child.pid, "SIGKILL"); } catch {} }
  process.stderr.write("\\u0000SHERIFF-LIMIT");
  process.exit(124);
}, ms);
child.on("error", (e) => { clearTimeout(timer); process.stderr.write("\\u0000SHERIFF-MISSING " + e.code); process.exit(127); });
child.on("close", (code) => { clearTimeout(timer); process.stdout.write(out, () => process.stderr.write(err, () => process.exit(code ?? 1))); });
`;

/**
 * Runs a CLI in `cwd`, passing the input on standard input, under a watchdog that terminates the whole tree of its processes after
 * the number of minutes that the settings specify. On Windows a CLI installed by npm is a command script; the program that it starts is run instead.
 */
export function runCli(command: string, args: string[], name: string, input: string, settings: RunSettings, cwd: string, env: NodeJS.ProcessEnv = {}): RunResult {
  const limit = settings.minutes * 60_000;
  const options = { input, cwd, env: { ...runnerEnv(process.env), ...env }, encoding: "utf8" as const, timeout: limit + 60_000, maxBuffer: 1 << 26 };
  // The CLI is started as a program, never through a shell, so that no shell interprets an argument.
  const found = isAbsolute(command) && existsSync(command) ? { program: command, args: [] } : process.platform === "win32" ? resolveProgram(command) : { program: command, args: [] };
  if (!found) return { status: "missing", detail: `the ${name}, ${command}, is not installed` };
  const run = spawnSync(process.execPath, ["-e", WATCHDOG, JSON.stringify({ program: found.program, args: [...found.args, ...args], ms: limit })], options);
  const err = run.stderr ?? "";
  if (err.includes("\u0000SHERIFF-MISSING")) return { status: "missing", detail: `the ${name}, ${command}, is not installed` };
  if (err.includes("\u0000SHERIFF-LIMIT") || run.signal) return { status: "timeout", detail: `${settings.minutes} minutes` };
  if (run.status !== 0) return { status: "failed", detail: (err || run.stdout).trim().slice(0, 500) };
  return { status: "ok", out: run.stdout };
}

/** The Claude Code CLI in print mode, started in an empty directory with no tools, settings, memory or session of its own. */
export const claudeRunner: Runner = (input, settings) => {
  const promptDir = mkdtempSync(join(tmpdir(), "sheriff-prompt-"));
  const workDir = mkdtempSync(join(tmpdir(), "sheriff-review-"));
  try {
    const promptFile = join(promptDir, "reviewer.md");
    writeFileSync(promptFile, SYSTEM_PROMPT);
    return runCli("claude", claudeArgs(settings.values, promptFile), "Claude Code CLI", input, settings, workDir);
  } finally {
    rmSync(promptDir, { recursive: true, force: true });
    rmSync(workDir, { recursive: true, force: true });
  }
};

/** The judgements that a finding belongs to (s-vp24dqydygztqbt): on code, on comments, on a statement that an implementation needs no change, and on a node of the technical appendix. */
export const JUDGEMENTS = ["code", "comments", "statement", "appendix"] as const;

/**
 * The schema of the verdict (s-68ds99w8wd67aae). Each finding names the sids of its nodes, the problem, the judgement it falls under, and
 * the file and the line, each null where the finding concerns no file or no line. Every property is required, as Codex's
 * `--output-schema` requires.
 */
export const VERDICT_SCHEMA = JSON.stringify({
  type: "object",
  properties: {
    verdict: { type: "string", enum: ["pass", "refuse"] },
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nodes: { type: "array", items: { type: "string" } },
          problem: { type: "string" },
          judgement: { type: "string", enum: [...JUDGEMENTS] },
          file: { type: ["string", "null"] },
          line: { type: ["integer", "null"] },
        },
        required: ["nodes", "problem", "judgement", "file", "line"],
        additionalProperties: false,
      },
    },
  },
  required: ["verdict", "findings"],
  additionalProperties: false,
});

/** The features of the Codex CLI that give its model a tool, each turned off for the reviewer. */
const CODEX_FEATURES_OFF = [
  "shell_tool", "unified_exec", "unified_exec_tty", "write_stdin_approval", "shell_snapshot", "code_mode_host", "code_mode_interrupt",
  "apps", "browser_use", "browser_use_external", "computer_use", "goals", "hooks", "image_generation", "multi_agent", "plugins",
  "remote_plugin", "skill_search", "sleep_tool", "tool_suggest", "view_image", "skill_mcp_dependency_install", "mentions_v2",
  "in_app_browser", "in_app_local_automation",
];

export function codexArgs(values: Record<string, string>, files: { prompt: string; schema: string; out: string }): string[] {
  return [
    "exec",
    "--ephemeral",
    "--skip-git-repo-check",
    "-s", "read-only",
    ...(values.codexEffort ? ["-c", `model_reasoning_effort='${values.codexEffort}'`] : []),
    "-c", `model_instructions_file='${files.prompt}'`,
    "-c", "skills.include_instructions=false",
    "-c", "skills.bundled.enabled=false",
    "-c", "web_search='disabled'",
    ...CODEX_FEATURES_OFF.flatMap((f) => ["--disable", f]),
    ...(values.codexModel ? ["-m", values.codexModel] : []),
    "--output-schema", files.schema,
    "-o", files.out,
    "-",
  ];
}

/**
 * The Codex CLI in `codex exec`, started in an empty directory with a Codex home of its own, made for the
 * run and deleted after it, holding a copy of the user's sign-in and nothing else.
 */
export const codexRunner: Runner = (input, settings) => {
  const runDir = mkdtempSync(join(tmpdir(), "sheriff-codex-run-"));
  try {
    const home = join(runDir, "home");
    const workDir = join(runDir, "work");
    mkdirSync(home);
    mkdirSync(workDir);
    const auth = join(process.env.CODEX_HOME || join(homedir(), ".codex"), "auth.json");
    if (existsSync(auth)) copyFileSync(auth, join(home, "auth.json"));
    const files = { prompt: join(runDir, "reviewer.md"), schema: join(runDir, "verdict.schema.json"), out: join(runDir, "verdict.json") };
    writeFileSync(files.prompt, SYSTEM_PROMPT);
    writeFileSync(files.schema, VERDICT_SCHEMA);
    const run = runCli("codex", codexArgs(settings.values, files), "Codex CLI", input, settings, workDir, { CODEX_HOME: home });
    if (run.status !== "ok") return run;
    if (!existsSync(files.out)) return { status: "failed", detail: `the Codex CLI wrote no answer: ${run.out.trim().slice(0, 300)}` };
    return { status: "ok", out: readFileSync(files.out, "utf8") };
  } finally {
    rmSync(runDir, { recursive: true, force: true });
  }
};

const RUN: Record<ReviewSettings["runner"], Runner> = { claude: claudeRunner, codex: codexRunner };

interface Verdict {
  verdict: "pass" | "refuse";
  findings: Array<{ nodes: string[]; problem: string; judgement: (typeof JUDGEMENTS)[number]; file: string | null; line: number | null }>;
}

/** The verdict in a runner's answer: the object itself, or the text of a CLI's JSON envelope holding it. */
function readVerdict(out: string): Verdict | null {
  const parse = (s: string): unknown => {
    try {
      return JSON.parse(s.trim().replace(/^```(?:json)?\s*|\s*```$/g, ""));
    } catch {
      return null;
    }
  };
  let value = parse(out) as { result?: unknown } | null;
  if (value && typeof value.result === "string") value = parse(value.result) as { result?: unknown } | null;
  const v = value as Verdict | null;
  if (!v || (v.verdict !== "pass" && v.verdict !== "refuse") || !Array.isArray(v.findings)) return null;
  const sound = v.findings.every((f) =>
    Array.isArray(f.nodes) && f.nodes.every((n) => typeof n === "string") && typeof f.problem === "string" && JUDGEMENTS.includes(f.judgement) &&
    (f.file === null || typeof f.file === "string") && (f.line === null || Number.isInteger(f.line)));
  // A passing verdict contains only findings about comments; a refusing verdict contains at least one finding of any other kind of
  // judgement (s-68ds99w8wd67aae).
  const others = v.findings.filter((f) => f.judgement !== "comments").length;
  const consistent = v.verdict === "pass" ? others === 0 : others > 0;
  return sound && consistent ? v : null;
}

/**
 * The review of the commit being made (s-vp24dqydygztqbt): none where no judgement by the reviewer is required; a refusal where the
 * reviewer refuses or no review can be carried out.
 */
export async function review(root: string, text: string, { run, notice }: { run?: Runner; notice?: (message: string) => void } = {}): Promise<Finding[]> {
  const { input, due } = await prepare(root, text);
  if (!due) return [];
  const where = "the review";
  const config = loadConfig(root);
  const { runner, minutes } = config.review;
  const { values, defaulted } = runnerSettings(root, runner);
  const result = (run ?? RUN[runner])(input, { minutes, values });
  if (defaulted.length) notice?.(defaultsNotice(runner, defaulted));
  if (result.status !== "ok") {
    const why = { missing: "no reviewer to run", timeout: "the review did not end within", failed: "the reviewer failed:" }[result.status];
    return [{ where, message: `${why} ${result.detail}` }];
  }
  const verdict = readVerdict(result.out);
  if (!verdict) return [{ where, message: `the reviewer's answer cannot be read: ${result.out.trim().slice(0, 300)}` }];
  // Where the commit leaves the specification a draft, a finding on a statement that a rule's implementation needs no change is
  // disregarded (s-kgqxg4gunzynwsv). A finding on comments is only a warning, so the
  // commit is not refused because of it (s-7vpsdsy8dpqdy6r).
  const approved = ownerSettings(config, strictDefault(root)).approved;
  return verdict.findings.filter((f) => approved || f.judgement !== "statement").map((f) => ({
    where: f.file === null ? where : f.line === null ? f.file : `${f.file}:${f.line}`,
    message: `${f.nodes.join(", ")}: ${f.problem}`,
    ...(f.judgement === "comments" ? { reported: true as const } : {}),
  }));
}
