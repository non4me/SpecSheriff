import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { lineTokens } from "./code.ts";

export interface Line {
  line: number;
  text: string;
}

export interface FileChange {
  path: string;
  /** The path it had before the commit, where it had one. */
  before?: string;
  added: Line[];
  removed: Line[];
}

const EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

export function git(root: string, ...args: string[]): { ok: boolean; out: string } {
  const run = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 });
  return { ok: run.status === 0, out: run.stdout ?? "" };
}

/** The commit everything is compared with: the last one, or the empty tree where there is none. */
export function base(root: string): string {
  return git(root, "rev-parse", "--verify", "-q", "HEAD").ok ? "HEAD" : EMPTY_TREE;
}

/** What the file held in the last commit, or nothing. */
export function before(root: string, path: string): string | null {
  const shown = git(root, "show", `${base(root)}:${path}`);
  return shown.ok ? shown.out : null;
}

/** The files of the working tree git does not ignore, with forward slashes. */
export function trackedFiles(root: string): string[] {
  const listed = git(root, "ls-files", "--cached", "--others", "--exclude-standard");
  return [...new Set(listed.out.split("\n").filter(Boolean))].sort();
}

/** The commit being made: the working tree's difference from the last commit, line by line, a file git does not know yet added whole. */
export function changes(root: string): FileChange[] {
  const out: FileChange[] = [];
  let current: FileChange | null = null;
  let oldAt = 0;
  let newAt = 0;
  for (const raw of git(root, "diff", base(root), "-U0", "-M", "--no-color", "--no-ext-diff").out.split("\n")) {
    if (raw.startsWith("diff --git ")) {
      const m = / b\/(.*)$/.exec(raw);
      current = { path: m ? m[1]! : "", added: [], removed: [] };
      out.push(current);
    } else if (!current) continue;
    else if (raw.startsWith("rename from ")) current.before = raw.slice("rename from ".length);
    else if (raw.startsWith("+++ ")) current.path = raw === "+++ /dev/null" ? current.path : raw.slice(6);
    else if (raw.startsWith("--- ")) {
      if (raw !== "--- /dev/null" && !current.before && raw.slice(6) !== current.path) current.before = raw.slice(6);
    } else if (raw.startsWith("@@")) {
      const m = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw)!;
      oldAt = Number(m[1]);
      newAt = Number(m[2]);
    } else if (raw.startsWith("-")) current.removed.push({ line: oldAt++, text: raw.slice(1) });
    else if (raw.startsWith("+")) current.added.push({ line: newAt++, text: raw.slice(1) });
  }
  for (const path of git(root, "ls-files", "--others", "--exclude-standard").out.split("\n").filter(Boolean)) {
    const lines = readFileSync(join(root, path), "utf8").split("\n");
    if (lines.at(-1) === "") lines.pop();
    out.push({ path, added: lines.map((text, i) => ({ line: i + 1, text })), removed: [] });
  }
  return out;
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const tokens = (s: string) => s.match(/[A-Za-z_$][\w$]*|\S/g) ?? [];

/** A line as it reads with its comments taken off, every sid made one, and its spacing ignored. */
export function normalize(text: string, python: boolean): string {
  const code = python ? text.replace(/#.*$/, "") : text.replace(/\/\*.*?\*\//g, "").replace(/\/\/.*$/, "");
  return tokens(code.replace(/s-[2-9a-hjkmnp-z]{15}/g, "SID")).join(" ");
}

/** What the filter of code changes reads beside the changed lines. */
export interface Texts {
  /** What a changed file held before the commit, or nothing. */
  before(change: FileChange): string | null;
  /** What it holds after the commit, or nothing. */
  after(change: FileChange): string | null;
  /** Every name the system's code and its tests spell after the commit. */
  spelled: Set<string>;
}

/** The names a file spells outside its comments and its strings; in a file of no language described, every word of it. */
export async function namesIn(path: string, text: string): Promise<string[]> {
  const lexed = await lineTokens(path, text);
  return (lexed ? lexed.flat() : tokens(text)).filter((t) => IDENTIFIER.test(t));
}

/** Every name the files read as code or tests spell in the working tree, one of them read as the text given in its place. */
export async function spelledIn(root: string, read: (path: string) => boolean, instead: Map<string, string | null> = new Map()): Promise<Set<string>> {
  const spelled = new Set<string>();
  const tracked = trackedFiles(root);
  for (const path of tracked.filter(read)) {
    const text = instead.has(path) ? instead.get(path)! : existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : null;
    if (text !== null) for (const name of await namesIn(path, text)) spelled.add(name);
  }
  for (const [path, text] of instead) if (text !== null && read(path) && !tracked.includes(path)) for (const name of await namesIn(path, text)) spelled.add(name);
  return spelled;
}

/** The texts of the commit being made: the last commit's, the working tree's, and the names the files read as code or tests spell. */
export async function commitTexts(root: string, read: (path: string) => boolean): Promise<Texts> {
  return {
    before: (c) => before(root, c.before ?? c.path),
    after: (c) => (existsSync(join(root, c.path)) ? readFileSync(join(root, c.path), "utf8") : null),
    spelled: await spelledIn(root, read),
  };
}

/**
 * The lines of a change that change code: a line that holds a tag always does; a line that differs
 * from the one it replaces only in a comment, or in a name the commit renames everywhere it spells
 * it, does not. A line is read as tokens of its language, comments left out and strings kept apart
 * from names, so that a sid a citation names, which stands in a comment, changes nothing.
 */
export async function codeChanges(changes: FileChange[], texts: Texts): Promise<Map<string, { added: Set<number>; removed: Set<number> }>> {
  const result = new Map<string, { added: Set<number>; removed: Set<number> }>();
  const renames = new Map<string, string>();
  const tentative: Array<{ path: string; old: Line; neu: Line; pairs: Array<[string, string]> }> = [];
  const allAdded = new Set<string>();
  for (const change of changes) {
    const python = change.path.endsWith(".py");
    const entry = { added: new Set<number>(), removed: new Set<number>() };
    result.set(change.path, entry);
    const was = texts.before(change);
    const now = texts.after(change);
    const lexedBefore = was === null ? null : await lineTokens(change.before ?? change.path, was);
    const lexedAfter = now === null ? null : await lineTokens(change.path, now);
    // A line's tokens as its language reads them, or, in a file of no language described, as its text reads.
    const tokensOf = (lexed: string[][] | null, l: Line) => (lexed ? (lexed[l.line - 1] ?? []) : tokens(normalize(l.text, python)));
    for (const l of change.added) for (const t of tokensOf(lexedAfter, l)) allAdded.add(t);
    const meaningful = (lines: Line[], lexed: string[][] | null) => lines.filter((l) => l.text.includes("@spec") || tokensOf(lexed, l).length > 0);
    const removed = meaningful(change.removed, lexedBefore);
    const added = meaningful(change.added, lexedAfter);
    const real = (old?: Line, neu?: Line) => {
      if (old) entry.removed.add(old.line);
      if (neu) entry.added.add(neu.line);
    };
    if (removed.length !== added.length) {
      removed.forEach((l) => real(l));
      added.forEach((l) => real(undefined, l));
      continue;
    }
    removed.forEach((old, i) => {
      const neu = added[i]!;
      if (old.text.includes("@spec") || neu.text.includes("@spec")) return real(old, neu);
      const a = tokensOf(lexedBefore, old);
      const b = tokensOf(lexedAfter, neu);
      if (a.join(" ") === b.join(" ")) return;
      if (a.length !== b.length) return real(old, neu);
      const pairs: Array<[string, string]> = [];
      for (let k = 0; k < a.length; k++) {
        if (a[k] === b[k]) continue;
        if (!IDENTIFIER.test(a[k]!) || !IDENTIFIER.test(b[k]!)) return real(old, neu);
        pairs.push([a[k]!, b[k]!]);
      }
      tentative.push({ path: change.path, old, neu, pairs });
    });
  }
  const consistent = new Set<string>();
  for (const t of tentative) for (const [a, b] of t.pairs) {
    if (renames.has(a) && renames.get(a) !== b) consistent.add(`!${a}`);
    renames.set(a, b);
  }
  for (const t of tentative) {
    // A rename counts only where the old name is spelled nowhere in the code and the tests after the commit.
    const ok = t.pairs.every(([a]) => !consistent.has(`!${a}`) && !allAdded.has(a) && !texts.spelled.has(a));
    if (!ok) {
      result.get(t.path)!.removed.add(t.old.line);
      result.get(t.path)!.added.add(t.neu.line);
    }
  }
  return result;
}
