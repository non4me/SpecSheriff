import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig, ownerSettings, readsAs, strictDefault } from "../../src/config.ts";
import { REPO } from "../repo.ts";

function withConfig(text: string): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  writeFileSync(join(root, "sheriff.config.json"), text);
  return root;
}

test("@spec s-zefk589ykh37b8u reads the globs naming where the system's code and its tests live", () => {
  const config = loadConfig(withConfig('{ "code": ["src/**/*.ts"], "tests": ["test/**/*.test.ts"] }'));
  assert.deepEqual(config, {
    code: ["src/**/*.ts"], tests: ["test/**/*.test.ts"], testCommand: null,
    review: { runner: "claude", minutes: 20 }, checks: [], generators: [], approvalStatus: [], strict: [], extensions: [],
  });
});

test("@spec s-d3nkw9b6mn98vuw reads the entries of the approval status, of the strict flag and of the choice of each extension, and gives each setting the value of the last entry that sets it", () => {
  const a = "a@example.com";
  const b = "b@example.com";
  const config = loadConfig(withConfig(JSON.stringify({
    code: [], tests: [],
    approvalStatus: [{ status: "approved", by: a }, { status: "draft", by: b }],
    strict: [{ on: false, by: a }, { on: true, by: a }],
    extensions: [{ name: "domains", chosen: true, by: a }, { name: "views", chosen: true, by: a }, { name: "domains", chosen: false, by: b }],
  })));
  assert.deepEqual(config.approvalStatus, [{ status: "approved", by: a }, { status: "draft", by: b }]);
  assert.deepEqual(ownerSettings(config, false), { approved: false, strict: true, extensions: new Set(["views"]) });
  const approved = { ...config, approvalStatus: [...config.approvalStatus, { status: "approved" as const, by: a }] };
  assert.equal(ownerSettings(approved, false).approved, true);
});

test("@spec s-d3nkw9b6mn98vuw treats the specification as a draft where no entry sets its approval status, and gives the strict flag the default value that the schema of sheriff.config.json specifies where no entry sets the flag", () => {
  const root = withConfig('{ "code": [], "tests": [] }');
  const config = loadConfig(root);
  assert.deepEqual(ownerSettings(config, true), { approved: false, strict: true, extensions: new Set() });
  assert.deepEqual(ownerSettings(config, false), { approved: false, strict: false, extensions: new Set() });
  assert.equal(strictDefault(root), false);
});

test("@spec s-d3nkw9b6mn98vuw refuses an entry that holds a key other than those of its list, or a value its list does not allow", () => {
  const settings = (key: string, entry: unknown) => withConfig(JSON.stringify({ code: [], tests: [], [key]: [entry] }));
  assert.throws(() => loadConfig(settings("approvalStatus", { status: "approved", by: "a@example.com", at: "today" })), /approvalStatus\[0\]\.at/);
  assert.throws(() => loadConfig(settings("approvalStatus", { status: "live", by: "a@example.com" })), /approvalStatus\[0\]\.status/);
  assert.throws(() => loadConfig(settings("strict", { on: "yes", by: "a@example.com" })), /strict\[0\]\.on/);
  assert.throws(() => loadConfig(settings("extensions", { name: "domains", chosen: true })), /extensions\[0\]\.by/);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "extensions": {} }')), /extensions must be a list/);
});

test("@spec s-477gtdrkw34dzxw reads the command that runs the tests of the system's code", () => {
  assert.equal(loadConfig(withConfig('{ "code": [], "tests": [], "testCommand": "npm test" }')).testCommand, "npm test");
});

test("@spec s-xr5xxa9cxf2mq5u reads the reviewer's runner and time limit from the project's settings, twenty minutes unless set, and no model or effort", () => {
  const set = loadConfig(withConfig('{ "code": [], "tests": [], "review": { "runner": "codex", "minutes": 5 } }')).review;
  assert.deepEqual(set, { runner: "codex", minutes: 5 });
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "review": { "runner": "other" } }')), /runner/);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "review": { "colour": 1 } }')), /colour/);
});

test("@spec s-zefk589ykh37b8u refuses a model or an effort in the project's settings, naming the key of the user's git configuration that holds it", () => {
  for (const [review, key] of [
    ['{ "model": "opus" }', "specsheriff.review.claudeModel"],
    ['{ "fallbackModel": "sonnet" }', "specsheriff.review.claudeFallbackModel"],
    ['{ "claude": { "model": "opus" } }', "specsheriff.review.claudeModel"],
    ['{ "codex": { "model": "gpt-6" } }', "specsheriff.review.codexModel"],
  ] as const) {
    assert.throws(() => loadConfig(withConfig(`{ "code": [], "tests": [], "review": ${review} }`)), new RegExp(key.replaceAll(".", "\\.")));
  }
});

test("@spec s-xr5xxa9cxf2mq5u takes the runner of the plugin whose tools run unless the settings name one, and claude for tools naming no agent", () => {
  const root = withConfig('{ "code": [], "tests": [] }');
  assert.equal(loadConfig(root, "codex").review.runner, "codex");
  assert.equal(loadConfig(root, "claude").review.runner, "claude");
  assert.equal(loadConfig(root, null).review.runner, "claude");
  assert.equal(loadConfig(withConfig('{ "code": [], "tests": [], "review": { "runner": "claude" } }'), "codex").review.runner, "claude");
});

test("@spec s-zefk589ykh37b8u accepts the setting writesSpecSheriffGuidelines that an earlier release wrote, and ignores it", () => {
  const config = loadConfig(withConfig('{ "code": [], "tests": [], "writesSpecSheriffGuidelines": true }'));
  assert.ok(!("writesSpecSheriffGuidelines" in config));
});

test("@spec s-zefk589ykh37b8u reads the code for tags, the tests for sids, and a file neither names for neither", () => {
  const config = { code: ["src/**/*.ts"], tests: ["src/**/*.test.ts", "test/**"] };
  assert.equal(readsAs(config, "src/a/b.ts"), "code");
  assert.equal(readsAs(config, "src/a/b.test.ts"), "tests");
  assert.equal(readsAs(config, "test/x.py"), "tests");
  assert.equal(readsAs(config, "tools/build.ts"), null);
  assert.equal(readsAs(config, "sheriff.config.json"), null);
});

test("@spec s-zefk589ykh37b8u reads this repository's settings, whose tests are the tools' own", () => {
  const config = loadConfig(REPO);
  assert.equal(readsAs(config, "skills/tools/test/unit/config.test.ts"), "tests");
  assert.equal(readsAs(config, "skills/tools/src/config.ts"), null);
});

test("@spec s-zefk589ykh37b8u refuses settings that are missing, not JSON, or hold a key nobody declared", () => {
  assert.throws(() => loadConfig(mkdtempSync(join(tmpdir(), "sheriff-"))), /sheriff\.config\.json/);
  assert.throws(() => loadConfig(withConfig("{ nope")), /sheriff\.config\.json/);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "other": 1 }')), /other/);
  assert.throws(() => loadConfig(withConfig('{ "code": "src", "tests": [] }')), /code/);
});

test("@spec s-zefk589ykh37b8u reads each of the project's own checks and generators: the rule listing it, its name there, its command and the globs of its code and tests", () => {
  const tool = { rule: "s-" + "a".repeat(15), name: "no internal names", command: "node tools/scan.mjs", code: ["tools/scan.mjs"], tests: ["tools/scan.test.mjs"] };
  const config = loadConfig(withConfig(JSON.stringify({ code: [], tests: [], checks: [tool], generators: [{ ...tool, name: "routes" }] })));
  assert.deepEqual(config.checks, [tool]);
  assert.deepEqual(config.generators, [{ ...tool, name: "routes" }]);
  assert.throws(() => loadConfig(withConfig(JSON.stringify({ code: [], tests: [], checks: [{ ...tool, command: undefined }] }))), /checks.*command/);
});
