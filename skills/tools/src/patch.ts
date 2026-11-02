import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

/** A patch the tools cannot read, or cannot apply to the files it names. */
export class PatchError extends Error {}

/** One file an edit touches: its path from the root, what it holds before, and what after, null where the edit deletes it. */
export interface EditedFile {
  path: string;
  before: string;
  after: string | null;
}

interface Hunk {
  kind: "add" | "delete" | "update";
  path: string;
  moveTo?: string;
  lines: string[];
}

interface Chunk {
  context?: string;
  old: string[];
  new: string[];
  atEnd: boolean;
}

/** The hunks of a patch in Codex's format, from `*** Begin Patch` to `*** End Patch`, one per file. */
function readPatch(text: string): Hunk[] {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  while (lines.length && !lines.at(-1)!.trim()) lines.pop();
  if (lines[0]?.trim() !== "*** Begin Patch" || lines.at(-1)?.trim() !== "*** End Patch") {
    throw new PatchError("cannot read the patch: it does not run from *** Begin Patch to *** End Patch");
  }
  const hunks: Hunk[] = [];
  for (const line of lines.slice(1, -1)) {
    const file = /^\*\*\* (Add|Delete|Update) File: (.+)$/.exec(line);
    const move = /^\*\*\* Move to: (.+)$/.exec(line);
    const last = hunks.at(-1);
    if (file) hunks.push({ kind: file[1]!.toLowerCase() as Hunk["kind"], path: file[2]!.trim(), lines: [] });
    else if (move && last?.kind === "update" && !last.moveTo && !last.lines.length) last.moveTo = move[1]!.trim();
    else if (!last || (line.startsWith("*** ") && line !== "*** End of File")) throw new PatchError(`cannot read the patch at the line: ${line}`);
    else last.lines.push(line);
  }
  if (!hunks.length) throw new PatchError("cannot read the patch: it names no file");
  for (const h of hunks) {
    if (h.kind === "add" && h.lines.some((l) => !l.startsWith("+"))) throw new PatchError(`cannot read the patch: a line of the file it adds, ${h.path}, does not open with +`);
    if (h.kind === "delete" && h.lines.length) throw new PatchError(`cannot read the patch: it gives lines to the file it deletes, ${h.path}`);
  }
  return hunks;
}

/** The chunks of an update: each the lines it finds, the lines it puts in their place, and the line it is found after. */
function chunksOf(hunk: Hunk): Chunk[] {
  const chunks: Chunk[] = [];
  let current: Chunk | undefined;
  for (const line of hunk.lines) {
    if (line.startsWith("@@")) {
      chunks.push((current = { context: line.slice(2).trim() || undefined, old: [], new: [], atEnd: false }));
      continue;
    }
    if (line === "*** End of File") {
      if (!current) throw new PatchError(`cannot read the patch: *** End of File ends no change to ${hunk.path}`);
      current.atEnd = true;
      continue;
    }
    if (!current) chunks.push((current = { old: [], new: [], atEnd: false }));
    const body = line.slice(1);
    if (line === "" || line.startsWith(" ")) current.old.push(body), current.new.push(body);
    else if (line.startsWith("-")) current.old.push(body);
    else if (line.startsWith("+")) current.new.push(body);
    else throw new PatchError(`cannot read the patch at the line: ${line}`);
  }
  return chunks;
}

/** Where `pattern` stands in `lines` from `from` on, read exactly, then without trailing and then without any surrounding space; -1 where nowhere. */
function seek(lines: string[], pattern: string[], from: number, atEnd: boolean): number {
  for (const same of [(s: string) => s, (s: string) => s.trimEnd(), (s: string) => s.trim()]) {
    const holds = (at: number) => pattern.every((p, i) => same(lines[at + i]!) === same(p));
    const last = lines.length - pattern.length;
    if (atEnd && last >= from && holds(last)) return last;
    for (let at = from; at <= last; at++) if (holds(at)) return at;
  }
  return -1;
}

/** A file's text as an update leaves it, chunk by chunk, each found after the last. */
function update(text: string, hunk: Hunk): string {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  if (lines.at(-1) === "") lines.pop();
  const cannot = (why: string) => new PatchError(`cannot apply the patch to ${hunk.path}: ${why}`);
  const replacements: Array<[number, number, string[]]> = [];
  let from = 0;
  for (const chunk of chunksOf(hunk)) {
    if (chunk.context !== undefined) {
      const at = seek(lines, [chunk.context], from, false);
      if (at < 0) throw cannot(`it finds no line ${chunk.context}`);
      from = at + 1;
    }
    if (!chunk.old.length) {
      replacements.push([lines.length, 0, chunk.new]);
      continue;
    }
    const at = seek(lines, chunk.old, from, chunk.atEnd);
    if (at < 0) throw cannot(`it finds no lines ${chunk.old.join("\\n")}`);
    replacements.push([at, chunk.old.length, chunk.new]);
    from = at + chunk.old.length;
  }
  for (const [at, count, put] of replacements.sort((a, b) => b[0] - a[0])) lines.splice(at, count, ...put);
  return lines.join("\n") + "\n";
}

/**
 * The files a patch in Codex's format touches, each as it is and as the patch leaves it; a moved file is
 * deleted at its old path and added at its new one. The patch's paths are read from `cwd`, and returned
 * from `root` with forward slashes.
 */
export function patchedFiles(root: string, cwd: string, patch: string): EditedFile[] {
  const fromRoot = (path: string) => relative(root, isAbsolute(path) ? path : resolve(cwd, path)).split(sep).join("/");
  const read = (path: string) => (existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : null);
  const files: EditedFile[] = [];
  for (const hunk of readPatch(patch)) {
    const path = fromRoot(hunk.path);
    const before = read(path);
    if (hunk.kind === "add") {
      files.push({ path, before: before ?? "", after: hunk.lines.map((l) => l.slice(1)).join("\n") + "\n" });
      continue;
    }
    if (before === null) throw new PatchError(`cannot apply the patch to ${hunk.path}: no such file`);
    if (hunk.kind === "delete") {
      files.push({ path, before, after: null });
      continue;
    }
    const after = update(before, hunk);
    if (!hunk.moveTo) files.push({ path, before, after });
    else {
      const to = fromRoot(hunk.moveTo);
      files.push({ path, before, after: null }, { path: to, before: read(to) ?? "", after });
    }
  }
  return files;
}
