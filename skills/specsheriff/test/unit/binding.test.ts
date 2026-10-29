import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { binding, citationsOutside } from "../../src/binding.ts";
import { confirm } from "../../src/confirmations.ts";
import { OWNER, sid } from "../fixture.ts";
import { codeProject as project, editSpec, git, nodeIn, OPEN, put } from "../code-project.ts";

const messages = async (root: string) => (await binding(root)).filter((f) => !f.reported).map((f) => `${f.where}: ${f.message}`);
async function expectOne(root: string, pattern: RegExp): Promise<void> {
  const found = await messages(root);
  assert.ok(found.some((m) => pattern.test(m)), `expected ${pattern} among:\n${found.join("\n")}`);
}

test("s-jau82aq9juv9zzh passes code and tests that agree with the specification", async () => {
  assert.deepEqual(await messages(project()), []);
});

test("s-jau82aq9juv9zzh refuses a symbol of the system's code carrying no tag", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  await expectOne(root, /src\/open\.ts:5: close carries no tag/);
});

test("s-jau82aq9juv9zzh refuses a tag naming no node, and a tag naming an unchecked node on a symbol a commit changes", async () => {
  const root = project();
  put(root, "src/other.ts", `/** @spec s-aaaaaaaaaaaaaab */\nexport const a = 1;\n/** @spec ${sid("draft")} */\nexport const b = 2;\n`);
  await expectOne(root, /src\/other\.ts:1: .*s-aaaaaaaaaaaaaab names no node/);
  await expectOne(root, new RegExp(`src/other\\.ts:3: .*${sid("draft")}.*not checked`));
});

test("s-kgbzk2ph9e6jfb4 lets a symbol the commit leaves unchanged keep a tag naming an unchecked node", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  assert.ok(!(await messages(root)).some((m) => /not checked/.test(m)));
});

test("s-kgbzk2ph9e6jfb4 counts as unchanged a symbol whose lines differ only in a comment, a citation's sid or a name renamed throughout", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", `/** @spec ${sid("open")} */\nexport function open(sum: number) {\n  return sum; // as §${sid("states")} says\n}\n`);
  assert.ok(!(await messages(root)).some((m) => /not checked/.test(m)), (await messages(root)).join("\n"));
});

test("s-kgbzk2ph9e6jfb4 counts a change to a tag as a change to the symbol's code", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace(`@spec ${sid("open")}`, `@spec ${sid("draft")}`));
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("draft")}.*not checked`));
});

test("s-jau82aq9juv9zzh refuses a tag that stands on no symbol", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + `\n/** @spec ${sid("open")} */\n`);
  await expectOne(root, /src\/open\.ts:6: a tag that stands on no symbol/);
});

test("s-jau82aq9juv9zzh refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying an unchecked node's sid", async () => {
  const root = project();
  put(root, "test/more.test.ts", `test("no sid here", () => {});\ntest("s-aaaaaaaaaaaaaab gone", () => {});\ntest("${sid("draft")} drafted", () => {});\n`);
  await expectOne(root, /test\/more\.test\.ts:1: the test "no sid here" carries no sid/);
  await expectOne(root, /test\/more\.test\.ts:2: .*s-aaaaaaaaaaaaaab.*no node/);
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:3: .*${sid("draft")}.*not checked`));
});

test("s-rah8b37kytb682y refuses a rule whose code a commit adds or changes with no test carrying its sid", async () => {
  const root = project();
  confirm(root, [sid("draft")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "draft confirmed");
  put(root, "src/draft.ts", `/** @spec ${sid("draft")} */\nexport const drafted = 1;\n`);
  await expectOne(root, new RegExp(`${sid("draft")}.*no test`));
});

test("s-rwqzepmrt77rv35 refuses a node's lists of code and tests that the tags and the tests' sids do not produce", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta = { code: [{ file: "src/elsewhere.ts" }], tests: [] }));
  await expectOne(root, new RegExp(`${sid("open")}.*code.*src/open\\.ts`));
  await expectOne(root, new RegExp(`${sid("open")}.*tests.*opens an account`));
});

test("s-rwqzepmrt77rv35 holds a node naming the symbols in a file to them", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "states").meta = { code: [{ file: "src/states.ts", symbols: ["State", "Other"] }] }));
  await expectOne(root, /names the symbol Other in src\/states\.ts/);
});

test("s-xqs2e24mx5253ye refuses a list its declaration in the code or in a schema does not match", async () => {
  const root = project();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "frozen";\n`);
  await expectOne(root, /list .*the states of an account.* does not match .*State/);
  const schema = project();
  editSpec(schema, (d) => (nodeIn(d, "states").list.declaredIn = { file: "specs/_schema/node.schema.json", declaration: "#/$defs/status" }));
  await expectOne(schema, /does not match .*#\/\$defs\/status/);
});

test("s-jau82aq9juv9zzh refuses a node's address in a file outside the specification", async () => {
  const root = project();
  put(root, "docs/notes.md", "As Contracts/1.1 says.\n");
  await expectOne(root, /docs\/notes\.md:1: .*Contracts\/1\.1.*address/);
});

test("s-zefk589ykh37b8u reads no file of the tools for an address where the SpecSheriff guidelines are written", async () => {
  const root = project();
  put(root, "skills/tool/test/a.test.ts", `test("${sid("open")} reads contracts/1.1", () => {});\n`);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: ["src/**"], tests: ["test/**", "skills/*/test/**"], writesSpecSheriffGuidelines: true }));
  assert.ok(!(await messages(root)).some((m) => /address/.test(m)));
});

test("s-jau82aq9juv9zzh reports a rule whose text changed after its code, and refuses nothing for it", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  confirm(root, [sid("open")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "reworded");
  const found = await binding(root);
  const drift = found.filter((f) => f.reported);
  assert.ok(drift.some((f) => f.where.includes(sid("open")) && /text changed/.test(f.message)), found.map((f) => f.message).join("\n"));
});

test("s-4kd2pave7vm4hmd refuses a sid in the code, the tests or the documents that names no node, the archive's included, and a number naming a node", async () => {
  const root = project();
  put(root, "docs/notes.md", "See §s-aaaaaaaaaaaaaab and §4.1.\n");
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => /docs\/notes\.md:1: .*s-aaaaaaaaaaaaaab names no node/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => /docs\/notes\.md:1: .*§4\.1.*number/.test(m)), found.join("\n"));
  assert.ok(!found.some((m) => m.includes("README.md")), found.join("\n"));
});
