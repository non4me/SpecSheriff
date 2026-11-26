import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { noneAlone, tagOf, type Tag } from "./code.ts";

/** The bindings file at the root of the repository (s-trwczfskj5zmuft). */
export const BINDINGS = "sheriff.bindings.json";

export interface Bindings {
  /** The SpecTags of each entry, by the path of the file that the entry names. */
  entries: Map<string, Tag[]>;
  /** The line number of each entry's key in the bindings file, keyed by the path that the key names. */
  lines: Map<string, number>;
  /** The problems with the bindings file as a whole. */
  problems: Array<{ line: number | null; message: string }>;
  /** The problems with the string values of each entry, keyed by the path that the entry names, each problem with its line number. */
  entryProblems: Map<string, Array<{ line: number; message: string }>>;
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * The entries of the bindings file, each read as the SpecTags of the file that its path names (s-trwczfskj5zmuft). A file that
 * is not valid JSON, or is not an object whose every key maps to a list of strings, yields no entries.
 */
export function readBindings(root: string): Bindings {
  return parseBindings(existsSync(join(root, BINDINGS)) ? readFileSync(join(root, BINDINGS), "utf8") : null);
}

/** The entries in the given text of the bindings file, or none where there is no such file. */
export function parseBindings(text: string | null): Bindings {
  const out: Bindings = { entries: new Map(), lines: new Map(), problems: [], entryProblems: new Map() };
  if (text === null) return out;
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    out.problems.push({ line: null, message: "is not valid JSON" });
    return out;
  }
  if (!isObject(data) || !Object.values(data).every((v) => Array.isArray(v) && v.every((s) => typeof s === "string"))) {
    out.problems.push({ line: null, message: "is not a JSON object whose every key, a path, maps to a list of SpecTags, each a string" });
    return out;
  }
  const lines = text.split("\n");
  for (const [path, strings] of Object.entries(data as Record<string, string[]>)) {
    const line = lines.findIndex((l) => l.includes(JSON.stringify(path))) + 1 || 1;
    const problems: Array<{ line: number; message: string }> = [];
    const tags = strings.map((s) => tagOf(s, line, problems)).filter((t): t is Tag => t !== null);
    noneAlone(tags, problems);
    out.entries.set(path, tags);
    out.lines.set(path, line);
    out.entryProblems.set(path, problems);
  }
  return out;
}
