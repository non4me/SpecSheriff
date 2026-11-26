import { readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { schemaDir, type Specification } from "./spec-files.ts";

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

  /** The command that runs the tests of the system's code, before a commit is shared. */
  testCommand: string | null;
  review: ReviewSettings;
  checks: ProjectTool[];
  generators: ProjectTool[];
  /** The entries that set the specification's approval status, each recorded by an owner, the latest entry last (s-d3nkw9b6mn98vuw). */
  approvalStatus: Array<{ status: "approved" | "draft"; by: string }>;
  /** The entries that set the specification's `strict` flag, the latest entry last. */
  strict: Array<{ on: boolean; by: string }>;
  /** The entries that record the choice of each extension of the guidelines, the latest entry last. */
  extensions: Array<{ name: string; chosen: boolean; by: string }>;
}

const FILE = "sheriff.config.json";
const KEYS = ["code", "tests"] as const;
/** The lists of entries for the settings that only an owner changes, each with what an entry of the list holds besides `by`. */
const ENTRIES = {
  approvalStatus: { status: (v: unknown) => v === "approved" || v === "draft" },
  strict: { on: (v: unknown) => typeof v === "boolean" },
  extensions: { name: (v: unknown) => typeof v === "string" && v.length > 0, chosen: (v: unknown) => typeof v === "boolean" },
} as const;
/** Reads the settings of the SpecSheriff tools; unless they name the reviewer's runner, it is that of the agent `agent` names, and claude where it names none. */
export function loadConfig(root: string, agent: string | null = AGENT): Config {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(join(root, FILE), "utf8"));
  } catch (error) {
    throw new Error(`${FILE}: ${(error as Error).message}`);
  }
  for (const key of Object.keys(raw)) {
    if (![...KEYS, "writesSpecSheriffGuidelines", "testCommand", "review", "checks", "generators", ...Object.keys(ENTRIES)].includes(key)) throw new Error(`${FILE}: ${key} is no setting of the SpecSheriff tools`);
  }
  for (const key of KEYS) {
    const value = raw[key];
    if (!Array.isArray(value) || !value.every((g) => typeof g === "string")) {
      throw new Error(`${FILE}: ${key} must be a list of glob patterns`);
    }
  }
  // `writesSpecSheriffGuidelines`, which an earlier release wrote, is ignored: `sheriff reindex` removes it (s-gb8s9657a65hqmv).
  if (raw.testCommand !== undefined && typeof raw.testCommand !== "string") throw new Error(`${FILE}: testCommand must be a command`);
  const review = readReview(raw.review ?? {}, agent);
  return {
    code: raw.code as string[],
    tests: raw.tests as string[],

    testCommand: (raw.testCommand as string | undefined) ?? null,
    review,
    checks: readTools(raw.checks, "checks"),
    generators: readTools(raw.generators, "generators"),
    approvalStatus: readEntries(raw.approvalStatus, "approvalStatus") as Config["approvalStatus"],
    strict: readEntries(raw.strict, "strict") as Config["strict"],
    extensions: readEntries(raw.extensions, "extensions") as Config["extensions"],
  };
}

/** The entries of one list, for a setting that only an owner changes. An entry with a key or a value that its list does not allow is refused. */
function readEntries(value: unknown, key: keyof typeof ENTRIES): Array<Record<string, unknown>> {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${FILE}: ${key} must be a list of entries`);
  const allowed: Record<string, (v: unknown) => boolean> = { ...ENTRIES[key], by: (v) => typeof v === "string" && v.length > 0 };
  return value.map((entry: unknown, i) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new Error(`${FILE}: ${key}[${i}] must be an entry`);
    for (const k of Object.keys(entry)) if (!(k in allowed)) throw new Error(`${FILE}: ${key}[${i}].${k} is no key of an entry of ${key}`);
    for (const [k, ok] of Object.entries(allowed)) if (!ok((entry as Record<string, unknown>)[k])) throw new Error(`${FILE}: ${key}[${i}].${k} is missing or holds a value that ${key} does not allow`);
    return entry as Record<string, unknown>;
  });
}

/**
 * The values of the settings that only an owner of the specification changes (s-d3nkw9b6mn98vuw): each takes the value
 * of the last entry that sets it. Where no entry sets the approval status, the specification is a draft. Where
 * no entry sets the `strict` flag, the flag has the default value that the schema of `sheriff.config.json` specifies.
 */
export function ownerSettings(config: Pick<Config, "approvalStatus" | "strict" | "extensions">, strictByDefault: boolean): { approved: boolean; strict: boolean; extensions: Set<string> } {
  const chosen = new Map<string, boolean>();
  for (const e of config.extensions) chosen.set(e.name, e.chosen);
  return {
    approved: config.approvalStatus.at(-1)?.status === "approved",
    strict: config.strict.at(-1)?.on ?? strictByDefault,
    extensions: new Set([...chosen].filter(([, on]) => on).map(([name]) => name)),
  };
}

/** The specification's approval status and its `strict` flag, as the model of the specification holds them (s-w6gybeqn2ttydqx). */
export function modelFlags(root: string, config: Config, _spec: Specification): { approved: boolean; strict: boolean } {
  const { approved, strict } = ownerSettings(config, strictDefault(root));
  return { approved, strict };
}

/** The default of the `strict` flag: the `default` of an entry's `on` in the schema of `sheriff.config.json` (s-zefk589ykh37b8u). */
export function strictDefault(root: string): boolean {
  const schema = JSON.parse(readFileSync(join(schemaDir(root), "config.schema.json"), "utf8"));
  return schema.properties.strict.items.properties.on.default === true;
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
