import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

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

/**
 * The files named in a listing made by git. Git lists a git repository nested in the working tree, such as a worktree
 * kept inside the project, as its folder followed by a slash. Such a folder is not a file of the repository, so it is left out.
 */
export const listedFiles = (out: string): string[] => out.split("\n").filter((p) => p && !p.endsWith("/"));

/** The files of the working tree git does not ignore, with forward slashes. */
export function trackedFiles(root: string): string[] {
  const listed = git(root, "ls-files", "--cached", "--others", "--exclude-standard");
  return [...new Set(listedFiles(listed.out))].sort();
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
  for (const path of listedFiles(git(root, "ls-files", "--others", "--exclude-standard").out)) {
    const lines = readFileSync(join(root, path), "utf8").split("\n");
    if (lines.at(-1) === "") lines.pop();
    out.push({ path, added: lines.map((text, i) => ({ line: i + 1, text })), removed: [] });
  }
  return out;
}
