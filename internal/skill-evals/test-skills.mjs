// The step of the release that tests the skills of both plugins with SkillEvaluator 1.0.1, as internal/release.md
// describes. It runs three tiers:
// - tier 1 on every skill: the static checks, with no model, and the check that Claude Code and Codex CLI load the
//   skill;
// - tier 2 on every skill: the search for skills that overlap so much that an agent may confuse them, with
//   embeddings from NVIDIA Build;
// - tier 3, the live run of the test cases in internal/skill-evals/cases.json, but only if the skills or the
//   SpecSheriff guidelines have changed since the last release.
// A failure in tier 1 or tier 2, or a check of either tier that does not complete, stops the release. The scores of
// tier 3 do not stop it: they go into the release commit's message. A live run that produces no report stops
// the release, since the owner reads that report before agreeing to the release.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const VERSION = "1.0.1";
const PLUGINS = ["skills/claude-code/skills", "skills/codex/skills"];
const HARNESSES = "codex,claude-code";
// The keys of the providers SkillEvaluator can use, which no tier is handed unless it needs one.
const PROVIDER_KEYS = ["NVIDIA_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY", "SKILL_EVAL_LLM_PROVIDER", "CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_FORCE_OAUTH"];
const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * A copy of the environment passed in, without the variables that store a provider's key or select a provider, and
 * without any variable whose name starts with SKILLEVAL_.
 */
function clean(env) {
  const out = { ...env };
  for (const key of PROVIDER_KEYS) delete out[key];
  for (const key of Object.keys(out)) if (key.startsWith("SKILLEVAL_")) delete out[key];
  return out;
}

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

/** Each folder of a skill in both plugins, as a path relative to the repository's root. */
function skillFolders(root) {
  return PLUGINS.flatMap((plugin) =>
    existsSync(join(root, plugin))
      ? readdirSync(join(root, plugin), { withFileTypes: true })
          .filter((e) => e.isDirectory() && existsSync(join(root, plugin, e.name, "SKILL.md")))
          .map((e) => `${plugin}/${e.name}`)
      : [],
  );
}

const mean = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;
const two = (n) => n.toFixed(2);

/**
 * Tests the skills and returns the lines for the release commit's message. `evaluator` runs SkillEvaluator
 * and `driver` runs tier3.py, each given its arguments and its environment; `git` runs git in the repository.
 */
export async function testSkills({ root, env, evaluator, driver, git, cacheDir, outDir, log }) {
  const ran = (what, r) => {
    if (r.status !== 0) throw new Error(`${what} failed:\n${r.stdout ?? ""}${r.stderr ?? ""}`);
    return r;
  };
  const version = ran("skillevaluator --version", evaluator(["--version"], { env: clean(env) })).stdout.trim().split(/\s+/).pop();
  if (version !== VERSION) throw new Error(`the release tests the skills with SkillEvaluator ${VERSION}, and ${version} is installed`);
  const skills = skillFolders(root);
  if (!skills.length) throw new Error("no skill was found in either plugin");

  // Tier 1: no model, so no key reaches SkillEvaluator.
  for (const skill of skills) {
    log(`tier 1: ${skill}`);
    const out = join(outDir, "tier1", skill);
    ran(`tier 1 of ${skill}`, evaluator(["tier1", join(root, skill), "--no-llm", "-r", "json", "-o", out], { env: clean(env) }));
    const status = readJson(join(out, "skillevaluator-tier1.json")).overall_status;
    if (status !== "passed") throw new Error(`tier 1 of ${skill}: ${status}; the reports are in ${out}`);
    const json = join(outDir, "harness", `${skill}.json`);
    ran(`the check of loading of ${skill}`, evaluator(["harness-check", join(root, skill), "--harness", HARNESSES, "--json", json], { env: clean(env) }));
    for (const entry of Object.values(readJson(json).harness_compatibility).flat()) {
      if (entry.status !== "loads") throw new Error(`${entry.harness} ${entry.status} ${skill}; Claude Code and Codex CLI must each load every skill`);
    }
  }

  // Tier 2: embeddings from NVIDIA Build, with the NVIDIA Build key alone.
  const nvidia = env.SKILLEVAL_NVIDIA_API_KEY;
  if (!nvidia) throw new Error("tier 2 needs the key of NVIDIA Build in the environment variable SKILLEVAL_NVIDIA_API_KEY");
  const tier2Env = { ...clean(env), SKILL_EVAL_LLM_PROVIDER: "nv_build", NVIDIA_API_KEY: nvidia };
  for (const plugin of PLUGINS.filter((p) => skills.some((s) => s.startsWith(`${p}/`)))) {
    const catalog = join(outDir, "tier2", plugin, "catalog.json");
    log(`tier 2: the catalog of ${plugin}`);
    ran(`the catalog of ${plugin}`, evaluator(["similarity-check", join(root, plugin), "--save-catalog", catalog], { env: tier2Env }));
    for (const skill of skills.filter((s) => s.startsWith(`${plugin}/`))) {
      log(`tier 2: ${skill}`);
      const out = join(outDir, "tier2", skill);
      ran(`tier 2 of ${skill}`, evaluator(["tier2", join(root, skill), "--catalog", catalog, "-r", "json", "-o", out], { env: tier2Env }));
      const status = readJson(join(out, "skillevaluator-tier2.json")).overall_status;
      if (status !== "passed") throw new Error(`tier 2 of ${skill}: ${status}; the reports are in ${out}`);
    }
  }
  const lines = [`Skill tests (SkillEvaluator ${VERSION}): tiers 1 and 2 passed for the ${skills.length} skills of the two plugins.`];

  // Tier 3: only if the skills or the SpecSheriff guidelines have changed since the last release.
  const previous = git("tag", "--list", "v*", "--sort=-v:refname").stdout.split("\n").find(Boolean);
  if (previous && git("diff", "--quiet", previous, "HEAD", "--", "skills/claude-code/skills", "specs/_guidelines").status === 0) {
    lines.push(`Tier 3 was not run: neither the skills nor the SpecSheriff guidelines have changed since ${previous}.`);
    return { summary: lines.join("\n") };
  }
  const head = git("rev-parse", "HEAD").stdout.trim();
  const report = join(cacheDir, head, "report.json");
  if (existsSync(report)) log(`tier 3: the report made on ${head} is reused`);
  else {
    log("tier 3: the live run; it takes hours");
    mkdirSync(dirname(report), { recursive: true });
    const tier3Env = {
      ...clean(env),
      SKILL_EVAL_LLM_PROVIDER: "anthropic",
      ANTHROPIC_API_KEY: env.SKILLEVAL_ANTHROPIC_API_KEY ?? "",
      CLAUDE_CODE_OAUTH_TOKEN: env.SKILLEVAL_CLAUDE_OAUTH_TOKEN ?? "",
      CLAUDE_FORCE_OAUTH: "1",
    };
    const r = driver([join(HERE, "tier3.py"), "--root", root, "--cases", join(HERE, "cases.json"), "--report", report], { env: tier3Env });
    if (r.status !== 0 || !existsSync(report)) throw new Error(`the live run of tier 3 produced no report:\n${r.stdout ?? ""}${r.stderr ?? ""}`);
  }
  let earlier = null;
  if (previous) {
    const tested = git("rev-parse", `${previous}^1^1`);
    const path = join(cacheDir, tested.stdout.trim(), "report.json");
    if (tested.status === 0 && existsSync(path)) earlier = new Map(readJson(path).cases.map((c) => [c.id, c]));
  }
  lines.push("Tier 3, the mean score of each test case out of 1:");
  for (const c of readJson(report).cases) {
    let line = `- ${c.id}: ${two(mean(c.with))} with the plugin, ${two(mean(c.without))} without it`;
    const before = earlier?.get(c.id);
    if (before) line += `; ${two(mean(before.with))} and ${two(mean(before.without))} at ${previous}`;
    lines.push(line);
  }
  return { summary: lines.join("\n") };
}

/** The Python interpreter of the uv tool in which SkillEvaluator is installed, which tier3.py needs in order to import SkillEvaluator. */
function skillEvaluatorPython() {
  const tools = spawnSync("uv", ["tool", "dir"], { encoding: "utf8" }).stdout?.trim();
  if (!tools) throw new Error("uv is needed: SkillEvaluator is installed as a uv tool");
  return join(tools, "skillevaluator", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
}

/** Runs the step in the repository at `root` with the real SkillEvaluator, its Python and git. */
export function testSkillsHere(root, log = (line) => console.log(`skill tests: ${line}`)) {
  const spawn = (command) => (args, { env }) => {
    const r = spawnSync(command, args, { cwd: root, env, encoding: "utf8" });
    return { status: r.status ?? 1, stdout: r.stdout ?? "", stderr: r.error ? String(r.error) : (r.stderr ?? "") };
  };
  return testSkills({
    root,
    env: process.env,
    evaluator: spawn("skillevaluator"),
    driver: spawn(skillEvaluatorPython()),
    git: (...args) => spawn("git")(args, { env: process.env }),
    cacheDir: join(homedir(), ".specsheriff", "skill-evals"),
    outDir: mkdtempSync(join(tmpdir(), "skill-evals-")),
    log,
  });
}

