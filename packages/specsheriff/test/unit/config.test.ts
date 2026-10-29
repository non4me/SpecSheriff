import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig, readsAs } from "../../src/config.ts";
import { REPO } from "../repo.ts";

function withConfig(text: string): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  writeFileSync(join(root, "sheriff.config.json"), text);
  return root;
}

test("s-zefk589ykh37b8u reads the globs naming where the system's code and its tests live", () => {
  const config = loadConfig(withConfig('{ "code": ["src/**/*.ts"], "tests": ["test/**/*.test.ts"] }'));
  assert.deepEqual(config, { code: ["src/**/*.ts"], tests: ["test/**/*.test.ts"], writesSpecSheriffGuidelines: false, testCommand: null, review: { runner: "claude", model: "fable", fallbackModel: "opus", minutes: 20 } });
});

test("s-477gtdrkw34dzxw reads the command that runs the tests of the system's code", () => {
  assert.equal(loadConfig(withConfig('{ "code": [], "tests": [], "testCommand": "npm test" }')).testCommand, "npm test");
});

test("s-xr5xxa9cxf2mq5u reads the reviewer's model and time limit, fable, opus and twenty minutes unless set otherwise", () => {
  const set = loadConfig(withConfig('{ "code": [], "tests": [], "review": { "model": "opus", "minutes": 5 } }')).review;
  assert.deepEqual(set, { runner: "claude", model: "opus", fallbackModel: "opus", minutes: 5 });
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "review": { "runner": "other" } }')), /runner/);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "review": { "colour": 1 } }')), /colour/);
});

test("s-zefk589ykh37b8u reads whether the SpecSheriff guidelines are written in the repository", () => {
  assert.equal(loadConfig(withConfig('{ "code": [], "tests": [], "writesSpecSheriffGuidelines": true }')).writesSpecSheriffGuidelines, true);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "writesSpecSheriffGuidelines": "yes" }')), /writesSpecSheriffGuidelines/);
});

test("s-zefk589ykh37b8u reads the code for tags, the tests for sids, and a file neither names for neither", () => {
  const config = { code: ["src/**/*.ts"], tests: ["src/**/*.test.ts", "test/**"], writesSpecSheriffGuidelines: false };
  assert.equal(readsAs(config, "src/a/b.ts"), "code");
  assert.equal(readsAs(config, "src/a/b.test.ts"), "tests");
  assert.equal(readsAs(config, "test/x.py"), "tests");
  assert.equal(readsAs(config, "tools/build.ts"), null);
  assert.equal(readsAs(config, "sheriff.config.json"), null);
});

test("s-zefk589ykh37b8u reads this repository's settings, whose tests are the tools' own", () => {
  const config = loadConfig(REPO);
  assert.equal(readsAs(config, "packages/specsheriff/test/unit/config.test.ts"), "tests");
  assert.equal(readsAs(config, "packages/specsheriff/src/config.ts"), null);
});

test("s-zefk589ykh37b8u refuses settings that are missing, not JSON, or hold a key nobody declared", () => {
  assert.throws(() => loadConfig(mkdtempSync(join(tmpdir(), "sheriff-"))), /sheriff\.config\.json/);
  assert.throws(() => loadConfig(withConfig("{ nope")), /sheriff\.config\.json/);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "other": 1 }')), /other/);
  assert.throws(() => loadConfig(withConfig('{ "code": "src", "tests": [] }')), /code/);
});
