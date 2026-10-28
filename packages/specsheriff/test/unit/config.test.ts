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
  assert.deepEqual(config, { code: ["src/**/*.ts"], tests: ["test/**/*.test.ts"], writesCore: false });
});

test("s-zefk589ykh37b8u reads whether the core is written in the repository", () => {
  assert.equal(loadConfig(withConfig('{ "code": [], "tests": [], "writesCore": true }')).writesCore, true);
  assert.throws(() => loadConfig(withConfig('{ "code": [], "tests": [], "writesCore": "yes" }')), /writesCore/);
});

test("s-zefk589ykh37b8u reads the code for tags, the tests for sids, and a file neither names for neither", () => {
  const config = { code: ["src/**/*.ts"], tests: ["src/**/*.test.ts", "test/**"], writesCore: false };
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
