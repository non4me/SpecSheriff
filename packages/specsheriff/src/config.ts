import { readFileSync } from "node:fs";
import { join, posix } from "node:path";

export interface ReviewSettings {
  /** The runner the reviewer's input is handed to. */
  runner: "claude";
  model: string;
  /** The model asked for where the first is overloaded or not offered. */
  fallbackModel: string;
  /** The time after which a run is ended, in minutes. */
  minutes: number;
}

export interface Config {
  /** Globs naming where the system's code lives: read for tags. */
  code: string[];
  /** Globs naming where its tests live: read for the sids they declare. */
  tests: string[];
  /** Whether the SpecSheriff guidelines are written in this repository, so that their nodes are confirmed here rather than compared with a version. */
  writesSpecSheriffGuidelines: boolean;
  /** The command that runs the tests of the system's code, before a commit is shared. */
  testCommand: string | null;
  review: ReviewSettings;
}

const FILE = "sheriff.config.json";
const KEYS = ["code", "tests"] as const;
const REVIEW: ReviewSettings = { runner: "claude", model: "fable", fallbackModel: "opus", minutes: 20 };

export function loadConfig(root: string): Config {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(join(root, FILE), "utf8"));
  } catch (error) {
    throw new Error(`${FILE}: ${(error as Error).message}`);
  }
  for (const key of Object.keys(raw)) {
    if (![...KEYS, "writesSpecSheriffGuidelines", "testCommand", "review"].includes(key)) throw new Error(`${FILE}: ${key} is no setting of the SpecSheriff tools`);
  }
  for (const key of KEYS) {
    const value = raw[key];
    if (!Array.isArray(value) || !value.every((g) => typeof g === "string")) {
      throw new Error(`${FILE}: ${key} must be a list of glob patterns`);
    }
  }
  if (raw.writesSpecSheriffGuidelines !== undefined && typeof raw.writesSpecSheriffGuidelines !== "boolean") throw new Error(`${FILE}: writesSpecSheriffGuidelines must be true or false`);
  if (raw.testCommand !== undefined && typeof raw.testCommand !== "string") throw new Error(`${FILE}: testCommand must be a command`);
  const review = { ...REVIEW, ...((raw.review as object | undefined) ?? {}) } as ReviewSettings;
  for (const key of Object.keys(review)) if (!(key in REVIEW)) throw new Error(`${FILE}: review.${key} is no setting of the reviewer`);
  if (review.runner !== "claude") throw new Error(`${FILE}: review.runner names no runner the SpecSheriff tools describe: ${review.runner}`);
  if (typeof review.minutes !== "number" || review.minutes <= 0) throw new Error(`${FILE}: review.minutes must be a number of minutes`);
  return {
    code: raw.code as string[],
    tests: raw.tests as string[],
    writesSpecSheriffGuidelines: raw.writesSpecSheriffGuidelines === true,
    testCommand: (raw.testCommand as string | undefined) ?? null,
    review,
  };
}

/** How a file, by its path from the root with forward slashes, is read: a test wins over code where both name it. */
export function readsAs(config: Pick<Config, "code" | "tests">, path: string): "code" | "tests" | null {
  const matches = (globs: string[]) => globs.some((glob) => posix.matchesGlob(path, glob));
  if (matches(config.tests)) return "tests";
  if (matches(config.code)) return "code";
  return null;
}
