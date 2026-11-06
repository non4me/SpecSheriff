import { readFileSync } from "node:fs";
import { join, posix } from "node:path";

/** The runners the reviewer's input can be handed to: the Claude Code CLI and the Codex CLI. */
export const RUNNERS = ["claude", "codex"] as const;

/** The reviewer's settings a project shares; the models and efforts of its runs are each user's, in their git configuration. */
export interface ReviewSettings {
  /** The runner the reviewer's input is handed to. */
  runner: (typeof RUNNERS)[number];
  /** The time after which a run is ended, in minutes. */
  minutes: number;
}

/** The agent of the plugin whose tools these are, which the `agent` file the build writes beside `release` names; null where there is none. */
export const AGENT: string | null = (() => {
  try {
    return readFileSync(new URL("../agent", import.meta.url), "utf8").trim() || null;
  } catch {
    return null;
  }
})();

/**
 * A project's own check or generator (s-2fau85dfyyeq66m, s-km4x4s26kv7pjze): the sid of the rule listing it, its name
 * in that rule's list, the command that runs it, and the globs naming the files of its code and of its tests.
 */
export interface ProjectTool {
  rule: string;
  name: string;
  command: string;
  code: string[];
  tests: string[];
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
  checks: ProjectTool[];
  generators: ProjectTool[];
}

const FILE = "sheriff.config.json";
const KEYS = ["code", "tests"] as const;
/** Reads the settings of the SpecSheriff tools; unless they name the reviewer's runner, it is that of the agent `agent` names, and claude where it names none. */
export function loadConfig(root: string, agent: string | null = AGENT): Config {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(join(root, FILE), "utf8"));
  } catch (error) {
    throw new Error(`${FILE}: ${(error as Error).message}`);
  }
  for (const key of Object.keys(raw)) {
    if (![...KEYS, "writesSpecSheriffGuidelines", "testCommand", "review", "checks", "generators"].includes(key)) throw new Error(`${FILE}: ${key} is no setting of the SpecSheriff tools`);
  }
  for (const key of KEYS) {
    const value = raw[key];
    if (!Array.isArray(value) || !value.every((g) => typeof g === "string")) {
      throw new Error(`${FILE}: ${key} must be a list of glob patterns`);
    }
  }
  if (raw.writesSpecSheriffGuidelines !== undefined && typeof raw.writesSpecSheriffGuidelines !== "boolean") throw new Error(`${FILE}: writesSpecSheriffGuidelines must be true or false`);
  if (raw.testCommand !== undefined && typeof raw.testCommand !== "string") throw new Error(`${FILE}: testCommand must be a command`);
  const review = readReview(raw.review ?? {}, agent);
  return {
    code: raw.code as string[],
    tests: raw.tests as string[],
    writesSpecSheriffGuidelines: raw.writesSpecSheriffGuidelines === true,
    testCommand: (raw.testCommand as string | undefined) ?? null,
    review,
    checks: readTools(raw.checks, "checks"),
    generators: readTools(raw.generators, "generators"),
  };
}

/** The entries of `checks` or `generators`, each refused where it lacks a rule, a name, a command or its globs. */
function readTools(value: unknown, key: string): ProjectTool[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${FILE}: ${key} must be a list`);
  return value.map((t: Record<string, unknown>, i) => {
    const text = (k: string) => {
      if (typeof t?.[k] !== "string" || !(t[k] as string).length) throw new Error(`${FILE}: ${key}[${i}] must name its ${k}`);
      return t[k] as string;
    };
    const globs = (k: string) => {
      const g = t?.[k] ?? [];
      if (!Array.isArray(g) || !g.every((x) => typeof x === "string")) throw new Error(`${FILE}: ${key}[${i}].${k} must be a list of glob patterns`);
      return g as string[];
    };
    for (const k of Object.keys(t ?? {})) if (!["rule", "name", "command", "code", "tests"].includes(k)) throw new Error(`${FILE}: ${key}[${i}].${k} is no setting of the SpecSheriff tools`);
    return { rule: text("rule"), name: text("name"), command: text("command"), code: globs("code"), tests: globs("tests") };
  });
}

/** Where a model or an effort a project's settings once held is kept now: the user's git configuration. */
const MOVED: Record<string, string> = {
  model: "specsheriff.review.claudeModel",
  fallbackModel: "specsheriff.review.claudeFallbackModel",
  claude: "specsheriff.review.claudeModel, claudeFallbackModel and claudeEffort",
  codex: "specsheriff.review.codexModel and codexEffort",
};

/** The reviewer's settings a project shares, each refused where it is not one the tools describe, its default where it is not set. */
function readReview(raw: unknown, agent: string | null): ReviewSettings {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error(`${FILE}: review must be an object`);
  const review = raw as Record<string, unknown>;
  for (const key of Object.keys(review)) {
    if (key in MOVED) throw new Error(`${FILE}: review.${key} is each user's to confirm, in their git configuration: ${MOVED[key]}`);
    if (key !== "runner" && key !== "minutes") throw new Error(`${FILE}: review.${key} is no setting of the reviewer`);
  }
  const runner = review.runner ?? ((RUNNERS as readonly unknown[]).includes(agent) ? agent : "claude");
  if (!(RUNNERS as readonly unknown[]).includes(runner)) throw new Error(`${FILE}: review.runner names no runner the SpecSheriff tools describe: ${runner}`);
  const minutes = review.minutes ?? 20;
  if (typeof minutes !== "number" || minutes <= 0) throw new Error(`${FILE}: review.minutes must be a number of minutes`);
  return { runner: runner as ReviewSettings["runner"], minutes };
}

/** How a file, by its path from the root with forward slashes, is read: a test wins over code where both name it. */
export function readsAs(config: Pick<Config, "code" | "tests">, path: string): "code" | "tests" | null {
  const matches = (globs: string[]) => globs.some((glob) => posix.matchesGlob(path, glob));
  if (matches(config.tests)) return "tests";
  if (matches(config.code)) return "code";
  return null;
}
