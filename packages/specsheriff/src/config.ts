import { readFileSync } from "node:fs";
import { join, posix } from "node:path";

export interface Config {
  /** Globs naming where the system's code lives: read for tags. */
  code: string[];
  /** Globs naming where its tests live: read for the sids they declare. */
  tests: string[];
}

const FILE = "sheriff.config.json";
const KEYS = ["code", "tests"] as const;

export function loadConfig(root: string): Config {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(join(root, FILE), "utf8"));
  } catch (error) {
    throw new Error(`${FILE}: ${(error as Error).message}`);
  }
  for (const key of Object.keys(raw)) {
    if (!(KEYS as readonly string[]).includes(key)) throw new Error(`${FILE}: ${key} is no setting of the toolset`);
  }
  for (const key of KEYS) {
    const value = raw[key];
    if (!Array.isArray(value) || !value.every((g) => typeof g === "string")) {
      throw new Error(`${FILE}: ${key} must be a list of glob patterns`);
    }
  }
  return { code: raw.code as string[], tests: raw.tests as string[] };
}

/** How a file, by its path from the root with forward slashes, is read: a test wins over code where both name it. */
export function readsAs(config: Config, path: string): "code" | "tests" | null {
  const matches = (globs: string[]) => globs.some((glob) => posix.matchesGlob(path, glob));
  if (matches(config.tests)) return "tests";
  if (matches(config.code)) return "code";
  return null;
}
