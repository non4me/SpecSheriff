// Tests the step of the release that tests the skills of both plugins (test-skills.mjs). A fake stands in for
// SkillEvaluator: it writes the reports that the step reads, so no test runs SkillEvaluator or calls a model.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { testSkills } from "./test-skills.mjs";

const KEYS = {
  SKILLEVAL_NVIDIA_API_KEY: "nvapi-test",
  SKILLEVAL_ANTHROPIC_API_KEY: "sk-ant-test",
  SKILLEVAL_CLAUDE_OAUTH_TOKEN: "oauth-test",
};

/** A repository with two skills in each plugin, and a fake SkillEvaluator whose verdicts the test sets. */
function setup(t, { tier1 = {}, loads = {}, tier2 = {}, changed = true, previousTag = "v0.6.0", env = KEYS, version = "1.0.1", driverFails = false } = {}) {
  const base = mkdtempSync(join(tmpdir(), "test-skills-"));
  t.after(() => rmSync(base, { recursive: true, force: true }));
  const root = join(base, "repo");
  for (const plugin of ["skills/claude-code/skills", "skills/codex/skills"]) {
    for (const skill of ["spec", "spec-init"]) {
      mkdirSync(join(root, plugin, skill), { recursive: true });
      writeFileSync(join(root, plugin, skill, "SKILL.md"), `---\nname: ${skill}\n---\n`);
    }
  }
  const calls = [];
  const evaluator = (args, { env: childEnv }) => {
    calls.push({ tool: "skillevaluator", args, env: childEnv });
    if (args[0] === "--version") return { status: 0, stdout: `skillevaluator ${version}\n`, stderr: "" };
    const skill = args[1].split(/[\\/]/).slice(-3).join("/");
    const out = args[args.indexOf("-o") + 1];
    if (args[0] === "tier1") write(join(out, "skillevaluator-tier1.json"), { overall_status: tier1[skill] ?? "passed" });
    if (args[0] === "tier2") write(join(out, "skillevaluator-tier2.json"), { overall_status: tier2[skill] ?? "passed" });
    if (args[0] === "harness-check") {
      const harnesses = ["codex", "claude-code"].map((harness) => ({ harness, status: loads[`${skill}:${harness}`] ?? "loads" }));
      write(args[args.indexOf("--json") + 1], { harness_compatibility: { [args[1]]: harnesses } });
    }
    return { status: 0, stdout: "", stderr: "" };
  };
  const driverRuns = [];
  const driver = (args, { env: childEnv }) => {
    driverRuns.push({ args, env: childEnv });
    if (driverFails) return { status: 1, stdout: "", stderr: "Docker is not running" };
    write(args[args.indexOf("--report") + 1], { cases: [{ id: "set1-a", with: [1, 1, 0.5], without: [0, 0.5, 0] }] });
    return { status: 0, stdout: "", stderr: "" };
  };
  const git = (...args) => {
    if (args[0] === "tag") return { status: 0, stdout: previousTag ? `${previousTag}\nv0.5.0\n` : "" };
    if (args[0] === "diff") return { status: changed ? 1 : 0, stdout: "" };
    if (args[0] === "rev-parse" && args[1] === "HEAD") return { status: 0, stdout: "head1234\n" };
    if (args[0] === "rev-parse") return { status: 0, stdout: "prev5678\n" };
    throw new Error(`unexpected git ${args.join(" ")}`);
  };
  const cacheDir = join(base, "cache");
  const run = () => testSkills({ root, env, evaluator, driver, git, cacheDir, outDir: join(base, "out"), log: () => {} });
  return { run, calls, driverRuns, cacheDir };
}

function write(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data));
}

test("runs tier 1 and the check of loading on every skill of both plugins, without any key in SkillEvaluator's environment", async (t) => {
  const { run, calls } = setup(t);
  await run();
  const tier1 = calls.filter((c) => c.args[0] === "tier1");
  assert.equal(tier1.length, 4);
  assert.ok(tier1.every((c) => c.args.includes("--no-llm")));
  for (const c of [...tier1, ...calls.filter((c) => c.args[0] === "harness-check")]) {
    assert.equal(c.env.NVIDIA_API_KEY, undefined);
    assert.equal(c.env.ANTHROPIC_API_KEY, undefined);
    assert.equal(c.env.CLAUDE_CODE_OAUTH_TOKEN, undefined);
  }
  const harness = calls.filter((c) => c.args[0] === "harness-check");
  assert.equal(harness.length, 4);
  assert.ok(harness.every((c) => c.args.includes("codex,claude-code")));
});

test("stops the release where tier 1 does not pass for a skill, naming the skill and the status", async (t) => {
  const { run } = setup(t, { tier1: { "codex/skills/spec-init": "failed" } });
  await assert.rejects(run(), /skills\/codex\/skills\/spec-init.*failed/s);
});

test("stops the release where tier 1 does not complete, as where it fails", async (t) => {
  const { run } = setup(t, { tier1: { "claude-code/skills/spec": "incomplete" } });
  await assert.rejects(run(), /skills\/claude-code\/skills\/spec.*incomplete/s);
});

test("stops the release where Claude Code or Codex does not load a skill", async (t) => {
  const { run } = setup(t, { loads: { "claude-code/skills/spec:codex": "drops" } });
  await assert.rejects(run(), /codex.*drops/s);
});

test("stops the release where SkillEvaluator is not version 1.0.1", async (t) => {
  const { run } = setup(t, { version: "1.1.0" });
  await assert.rejects(run(), /1\.0\.1/);
});

test("stops the release where the key of NVIDIA Build for tier 2 is missing", async (t) => {
  const { run } = setup(t, { env: { ...KEYS, SKILLEVAL_NVIDIA_API_KEY: "" } });
  await assert.rejects(run(), /SKILLEVAL_NVIDIA_API_KEY/);
});

test("runs tier 2 with the key of NVIDIA Build alone, and stops the release where it finds an overlap", async (t) => {
  const { run, calls } = setup(t, { tier2: { "claude-code/skills/spec-init": "failed" } });
  await assert.rejects(run(), /spec-init.*failed/s);
  const tier2 = calls.filter((c) => c.args[0] === "tier2" || c.args[0] === "similarity-check");
  assert.ok(tier2.length > 0);
  for (const c of tier2) {
    assert.equal(c.env.NVIDIA_API_KEY, "nvapi-test");
    assert.equal(c.env.SKILL_EVAL_LLM_PROVIDER, "nv_build");
    assert.equal(c.env.ANTHROPIC_API_KEY, undefined);
    assert.equal(c.env.CLAUDE_CODE_OAUTH_TOKEN, undefined);
  }
});

test("runs no live run where neither the skills nor the guidelines have changed since the last release, and says so", async (t) => {
  const { run, driverRuns } = setup(t, { changed: false });
  const { summary } = await run();
  assert.equal(driverRuns.length, 0);
  assert.match(summary, /Tier 3 was not run.*v0\.6\.0/s);
});

test("runs the live run where the skills or the guidelines have changed, the agent on the subscription and the judge on the API", async (t) => {
  const { run, driverRuns } = setup(t);
  const { summary } = await run();
  assert.equal(driverRuns.length, 1);
  const { env } = driverRuns[0];
  assert.equal(env.CLAUDE_CODE_OAUTH_TOKEN, "oauth-test");
  assert.equal(env.CLAUDE_FORCE_OAUTH, "1");
  assert.equal(env.ANTHROPIC_API_KEY, "sk-ant-test");
  assert.equal(env.NVIDIA_API_KEY, undefined);
  assert.match(summary, /set1-a: 0\.83 with the plugin, 0\.17 without it/);
});

test("reuses the report of a live run made on the same commit, such as the rehearsal's", async (t) => {
  const { run, driverRuns, cacheDir } = setup(t);
  await run();
  assert.ok(readFileSync(join(cacheDir, "head1234", "report.json"), "utf8"));
  await run();
  assert.equal(driverRuns.length, 1);
});

test("compares the live run with the one made for the last release, where that report is kept", async (t) => {
  const { run, cacheDir } = setup(t);
  write(join(cacheDir, "prev5678", "report.json"), { cases: [{ id: "set1-a", with: [0.5, 0.5, 0.5], without: [0, 0, 0] }] });
  const { summary } = await run();
  assert.match(summary, /set1-a: 0\.83 with the plugin, 0\.17 without it; 0\.50 and 0\.00 at v0\.6\.0/);
});

test("stops the release where the live run fails to produce its report", async (t) => {
  const { run } = setup(t, { driverFails: true });
  await assert.rejects(run(), /live run.*Docker is not running/s);
});
