import { existsSync, readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { approvedWordings } from "./approved-wording.ts";
import { readBindings, type Bindings } from "./bindings.ts";
import { readCode, type CodeFile, type CodeSymbol } from "./code.ts";
import { readsAs, type Config } from "./config.ts";
import { trackedFiles } from "./diff.ts";
import { noCommentGlobs } from "./model.ts";
import type { Specification } from "./spec-files.ts";
import { typeFiles } from "./types.ts";

/**
 * How a file is read, as the glob patterns in the settings decide. Each file of the generated types and of the RuntimeChecks is
 * read as the system's code, even where those patterns do not match it (s-tjsv2wv4j2cuapa).
 */
export function reader(root: string, config: Config, spec: Specification): (path: string) => "code" | "tests" | null {
  const types = new Set(typeFiles(root, spec).paths);
  return (path) => readsAs(config, path) ?? (types.has(path) ? "code" : null);
}

/** Reads a file with the given text for its symbols, its tests and their SpecTags, as the project's settings call for. */
export type CodeReader = (path: string, text: string) => Promise<CodeFile | null>;

/**
 * Reads each file for its SpecTags. A file whose format allows no comments, a JSON file or one that the project's own
 * guidelines list, takes the SpecTags that bind the whole file from its entry in the bindings file (s-trwczfskj5zmuft).
 */
export function codeReader(root: string, spec: Specification, bindings: Bindings = readBindings(root)): CodeReader {
  const noComments = noCommentFormats(root, spec);
  return async (path, text) => {
    const file = await readCode(path, text, { allowsComments: !noComments(path) });
    if (file?.whole && noComments(path)) {
      file.fileTags = bindings.entries.get(path) ?? [];
      file.fromBindings = true;
    }
    return file;
  };
}

/** Whether a file's format allows no comments: a JSON file, or a file that the project's own guidelines list as allowing none (s-trwczfskj5zmuft). */
export function noCommentFormats(root: string, spec: Specification): (path: string) => boolean {
  const globs = noCommentGlobs(spec, approvedWordings(root, spec));
  return (path) => path.endsWith(".json") || globs.some((g) => posix.matchesGlob(path, g));
}

/** The files at the given paths, each read for its symbols, its tests and their SpecTags. */
export async function readAll(root: string, paths: string[], read: CodeReader): Promise<CodeFile[]> {
  const files: CodeFile[] = [];
  for (const path of paths) {
    const file = await read(path, readFileSync(join(root, path), "utf8"));
    if (file) files.push(file);
  }
  return files;
}

/** Every symbol of a file, including the inner symbols of each. */
export const allSymbols = (symbols: CodeSymbol[]): CodeSymbol[] => symbols.flatMap((s) => [s, ...allSymbols(s.inner)]);

/**
 * The files of the project's own checks and generators that the working tree holds and that the settings do not already
 * read as the system's code or its tests, each read (s-sfjka4zc4rhfu67).
 */
export async function readOwnTools(root: string, config: Config, spec: Specification, read = codeReader(root, spec)): Promise<{ codeFiles: CodeFile[]; testFiles: CodeFile[] }> {
  const reads = reader(root, config, spec);
  const tools = [...config.checks, ...config.generators];
  const matches = (globs: string[], path: string) => globs.some((g) => posix.matchesGlob(path, g));
  const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)) && reads(p) === null);
  const tests = tracked.filter((p) => tools.some((t) => matches(t.tests, p)));
  const code = tracked.filter((p) => !tests.includes(p) && tools.some((t) => matches(t.code, p)));
  return { codeFiles: await readAll(root, code, read), testFiles: await readAll(root, tests, read) };
}

/** The files whose SpecTags produce a node's lists: the system's code and its tests, and the project's own checks and generators. */
export async function readBound(root: string, config: Config, spec: Specification): Promise<{ codeFiles: CodeFile[]; testFiles: CodeFile[] }> {
  const reads = reader(root, config, spec);
  const read = codeReader(root, spec);
  const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)));
  const own = await readOwnTools(root, config, spec, read);
  return {
    codeFiles: [...(await readAll(root, tracked.filter((p) => reads(p) === "code"), read)), ...own.codeFiles],
    testFiles: [...(await readAll(root, tracked.filter((p) => reads(p) === "tests"), read)), ...own.testFiles],
  };
}

/**
 * The lists for each node that SpecTags bind code or tests to, keyed by the node's sid (s-rwqzepmrt77rv35). The list of code
 * holds the files whose code, or a symbol in them, is bound to the node. The list of tests holds the tests bound to the node, each
 * named by its file and its name. `sheriff reindex` writes these lists (s-ztseyetus7np6br), and `sheriff binding` compares the
 * lists in the nodes with these lists (s-t383grkn3q68dpf).
 */
export function boundLists(codeFiles: CodeFile[], testFiles: CodeFile[]): { code: Map<string, Set<string>>; tests: Map<string, Set<string>> } {
  const code = new Map<string, Set<string>>();
  for (const file of codeFiles) {
    for (const t of file.fileTags) {
      if (!t.sid) continue;
      if (!code.has(t.sid)) code.set(t.sid, new Set());
      code.get(t.sid)!.add(file.path);
    }
    for (const s of allSymbols(file.symbols)) for (const t of s.tags) {
      if (!t.sid) continue;
      if (!code.has(t.sid)) code.set(t.sid, new Set());
      code.get(t.sid)!.add(file.path);
    }
  }
  const tests = new Map<string, Set<string>>();
  for (const file of testFiles) for (const t of file.tests) {
    if (!t.sid) continue;
    if (!tests.has(t.sid)) tests.set(t.sid, new Set());
    tests.get(t.sid)!.add(`${file.path}::${t.name}`);
  }
  return { code, tests };
}
