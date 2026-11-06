import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { binding, citationsOutside } from "../../src/binding.ts";
import { FIXTURES_RULE } from "../../src/model.ts";
import { approve } from "../../src/approvals.ts";
import { reindex } from "../../src/reindex.ts";
import { DATA_STRUCTURES } from "../../src/types.ts";
import { BY_NUMBER, loc, node, NONE, OWNER, sid } from "../fixture.ts";
import { approvalRuleSid, approveSpecification, codeProject as project, editSpec, git, nodeIn, OPEN, OPEN_TEST, put, typedProject, withGenerator } from "../code-project.ts";

const messages = async (root: string) => (await binding(root)).filter((f) => !f.reported).map((f) => `${f.where}: ${f.message}`);
async function expectOne(root: string, pattern: RegExp): Promise<void> {
  const found = await messages(root);
  assert.ok(found.some((m) => pattern.test(m)), `expected ${pattern} among:\n${found.join("\n")}`);
}

test("@spec s-jau82aq9juv9zzh passes code and tests that agree with the specification", async () => {
  assert.deepEqual(await messages(project()), []);
});

test("@spec s-jau82aq9juv9zzh refuses a symbol of the system's code carrying no tag", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  await expectOne(root, /src\/open\.ts:5: close carries no SpecTag/);
});

test("@spec s-jau82aq9juv9zzh refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes", async () => {
  const root = project();
  put(root, "src/other.ts", `/** @spec ${NONE} */\nexport const a = 1;\n/** @spec ${sid("draft")} */\nexport const b = 2;\n`);
  await expectOne(root, new RegExp(`src/other\\.ts:1: .*${NONE} names no node`));
  await expectOne(root, new RegExp(`src/other\\.ts:3: .*${sid("draft")}.*a draft node`));
});

test("@spec s-kgbzk2ph9e6jfb4 lets a symbol the commit leaves unchanged keep a tag naming a draft node", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  assert.ok(!(await messages(root)).some((m) => /a draft node/.test(m)));
});

test("@spec s-kgbzk2ph9e6jfb4 counts as unchanged a symbol whose lines differ only in a comment, a citation's sid or a name renamed throughout", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", `/** @spec ${sid("open")} */\nexport function open(sum: number) {\n  return sum; // as §${sid("states")} says\n}\n`);
  assert.ok(!(await messages(root)).some((m) => /a draft node/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-kgbzk2ph9e6jfb4 counts as changed a symbol where a name is replaced but the old one is still spelled", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", "return other;"));
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("open")}.*a draft node`));
});

test("@spec s-kgbzk2ph9e6jfb4 counts as changed a line whose text after // or # stands inside a string", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://a" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#fff"\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "strings");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://b" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#000"\n`);
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("open")}.*a draft node`));
  await expectOne(root, new RegExp(`src/paint\\.py:1: .*${sid("open")}.*a draft node`));
});

test("@spec s-kgbzk2ph9e6jfb4 counts as unchanged a symbol whose only change is a line inside a comment of several lines", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount.\n   */\n  return amount;"));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a comment");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount as given.\n   */\n  return amount;"));
  assert.ok(!(await messages(root)).some((m) => /a draft node/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-kgbzk2ph9e6jfb4 counts a change to a tag as a change to the symbol's code", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace(`@spec ${sid("open")}`, `@spec ${sid("draft")}`));
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("draft")}.*a draft node`));
});

test("@spec s-jau82aq9juv9zzh refuses a tag that stands on no symbol", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + `\n/** @spec ${sid("open")} */\n`);
  await expectOne(root, /src\/open\.ts:6: a SpecTag that stands on no symbol/);
});

test("@spec s-jau82aq9juv9zzh refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid", async () => {
  const root = project();
  put(root, "test/more.test.ts", `test("no sid here", () => {});\ntest("@spec ${NONE} gone", () => {});\ntest("@spec ${sid("draft")} drafted", () => {});\n`);
  await expectOne(root, /test\/more\.test\.ts:1: the test "no sid here" carries no SpecTag/);
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:2: .*${NONE}.*no node`));
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:3: .*${sid("draft")}.*a draft node`));
});

test("@spec s-jau82aq9juv9zzh counts a test whose only change is its sid as a test the commit changes", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("draft")} opens an account`]));
  put(root, "test/open.test.ts", OPEN_TEST.replace(sid("open"), sid("draft")));
  await expectOne(root, new RegExp(`test/open\\.test\\.ts:1: .*${sid("draft")}.*a draft node`));
});

test("@spec s-rah8b37kytb682y refuses a rule whose code a commit adds or changes with no test carrying its sid", async () => {
  const root = project();
  approve(root, [sid("draft")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "draft approved");
  put(root, "src/draft.ts", `/** @spec ${sid("draft")} */\nexport const drafted = 1;\n`);
  await expectOne(root, new RegExp(`${sid("draft")}.*no test`));
});

test("@spec s-rwqzepmrt77rv35 refuses a node's lists of code and tests that the tags and the tests' sids do not produce", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta = { code: [{ file: "src/elsewhere.ts" }], tests: [] }));
  await expectOne(root, new RegExp(`${sid("open")}.*code.*src/open\\.ts`));
  await expectOne(root, new RegExp(`${sid("open")}.*tests.*opens an account`));
});

test("@spec s-rwqzepmrt77rv35 holds a node naming the symbols in a file to them", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "states").meta = { code: [{ file: "src/states.ts", symbols: ["State", "Other"] }] }));
  await expectOne(root, /names the symbol Other in src\/states\.ts/);
});

test("@spec s-rwqzepmrt77rv35 refuses a node naming the symbols in a file that leaves out one its tag stands on", async () => {
  const root = project();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "closed";\n/** @spec ${sid("states")} */\nexport const initial: State = "open";\n`);
  await expectOne(root, new RegExp(`${sid("states")}.*leaves out the symbol initial in src/states\\.ts, which carries its SpecTag`));
});

test("@spec s-xqs2e24mx5253ye refuses a list its declaration in the code or in a schema does not match", async () => {
  const root = project();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "frozen";\n`);
  await expectOne(root, /list .*the states of an account.* does not match .*State/);
  const schema = project();
  editSpec(schema, (d) => (nodeIn(d, "states").list.declaredIn = { file: "specs/_schema/node.schema.json", declaration: "#/$defs/status" }));
  await expectOne(schema, /does not match .*#\/\$defs\/status/);
});

test("@spec s-jau82aq9juv9zzh refuses a node's location in a file outside the specification", async () => {
  const root = project();
  put(root, "docs/notes.md", `As ${loc("Contracts", "1.1")} says.\n`);
  await expectOne(root, /docs\/notes\.md:1: .*Contracts\/1\.1.*location/);
});

test("@spec s-jau82aq9juv9zzh refuses a node's location in any file the repository keeps outside the specification, a term's and a file's included", async () => {
  const root = project();
  put(root, "config/routes.yaml", `# as ${loc("contracts", "1.1")} says\n`);
  put(root, "notes.txt", "Read contracts/c and contracts/Account.\nThe file specs/contracts/c.json and contracts/c.json are paths.\n");
  editSpec(root, (d) => d.nodes[0].children.push({ location: "", sid: sid("account term"), kind: "term", title: "account", status: "draft", text: "An account.", refs: [] }));
  await expectOne(root, /config\/routes\.yaml:1: .*contracts\/1\.1.*location/);
  await expectOne(root, /notes\.txt:1: contracts\/c is a node's location/);
  await expectOne(root, /notes\.txt:1: contracts\/Account is a node's location/);
  assert.ok(!(await messages(root)).some((m) => m.startsWith("notes.txt:2")), (await messages(root)).join("\n"));
});

/** A rule of the project's own guidelines listing the fixtures of its tests (s-6hha5en226aj8hu). */
function listFixtures(root: string, members: string[]): void {
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children = [node("fixtures", { refs: [{ type: "refines", to: FIXTURES_RULE }], list: { of: "the fixtures of the tests of the checks", members } })];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

test("@spec s-nh8b2hjvzasdxmd refuses a location in the files of the tools too, and leaves out those the project's own guidelines list as fixtures", async () => {
  const root = project();
  const at = ["contracts", "1.1"].join("/");
  put(root, "skills/tool/test/a.test.ts", `test("@spec ${sid("open")} reads ${at}", () => {});\n`);
  put(root, "skills/tool/test/fixtures/data.txt", `${at}\n`);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: ["src/**"], tests: ["test/**", "skills/*/test/**"], writesSpecSheriffGuidelines: true }));
  listFixtures(root, ["skills/*/test/fixtures/**"]);
  reindex(root);
  const found = await messages(root);
  assert.ok(found.some((m) => /skills\/tool\/test\/a\.test\.ts:1: .*is a node's location/.test(m)), found.join("\n"));
  assert.ok(!found.some((m) => m.includes("fixtures/data.txt")), found.join("\n"));
});

test("@spec s-m8nmfsxkcfu7cjp leaves out of the citations the files the project's own guidelines list as fixtures", async () => {
  const root = project();
  put(root, "test/fixtures/cited.md", `See §${NONE}.\n`);
  listFixtures(root, ["test/fixtures/**"]);
  reindex(root);
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(!found.some((m) => m.includes("cited.md")), found.join("\n"));
});

const notImplemented = async (root: string) => (await binding(root)).filter((f) => f.reported && f.message.startsWith("not implemented")).map((f) => `${f.where}: ${f.message}`);

test("@spec s-6fw72j65jkqrfpf reports an approved rule no tagged symbol or no test that runs carries out, and refuses nothing for it", async () => {
  const root = project();
  assert.deepEqual(await messages(root), []);
  const found = await notImplemented(root);
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, new RegExp(`${sid("states")}.*not implemented: no test that runs carries its SpecTag`));
  put(root, "test/states.test.ts", `test.skip("@spec ${sid("states")} lists the states", () => {});\n`);
  assert.equal((await notImplemented(root)).length, 1);
  put(root, "test/states.test.ts", `test("@spec ${sid("states")} lists the states", () => {});\n`);
  assert.deepEqual(await notImplemented(root), []);
  rmSync(join(root, "src/states.ts"));
  put(root, "src/open.ts", OPEN);
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("states")}.*not implemented: no symbol of the system's code carries its SpecTag`));
});

test("@spec s-6fw72j65jkqrfpf counts a tag and a test of a rule implementing it, through rules implementing those in turn", async () => {
  const root = project();
  put(root, "test/states.test.ts", `test("@spec ${sid("states")} lists the states", () => {});\n`);
  editSpec(root, (d) => d.nodes[0].children.push(
    node("close", { text: "An account is closed." }),
    node("closing", { text: "Closing, carried out.", refs: [{ type: "implements", to: sid("close") }] }),
    node("closing detail", { text: "Closing, in detail.", refs: [{ type: "implements", to: sid("closing") }] }),
  ));
  approve(root, [sid("close"), sid("closing"), sid("closing detail")], { me: OWNER });
  assert.equal((await notImplemented(root)).length, 3);
  put(root, "src/close.ts", `/** @spec ${sid("closing detail")} */\nexport function close() {}\n`);
  put(root, "test/close.test.ts", `test("@spec ${sid("closing detail")} closes", () => {});\n`);
  assert.deepEqual(await notImplemented(root), []);
});

test("@spec s-6fw72j65jkqrfpf leaves out a rule a node of the project's own guidelines exempts, by a link to it or to a section above it, and the guidelines and the technical debt", async () => {
  const root = project();
  const exempting = (to: string) => {
    const path = join(root, "specs/_guidelines/project.json");
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.nodes[0].children = [node("by people", { text: "Carried out by people.", refs: [{ type: "exempts", to }] })];
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    reindex(root);
    approve(root, [sid("by people")], { me: OWNER });
  };
  exempting(sid("states"));
  assert.deepEqual(await notImplemented(root), []);
  exempting(sid("accounts"));
  assert.deepEqual(await notImplemented(root), []);
  put(root, "specs/tech/debt.json", JSON.stringify({ schemaVersion: 1, scope: "tech", section: "debt", nodes: [node("debt", { kind: "section", text: "Set aside.", children: [node("slow export", { text: "The export is slow." })] })] }, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("slow export")], { me: OWNER });
  reindex(root);
  assert.deepEqual(await notImplemented(root), []);
});

test("@spec s-rah8b37kytb682y refuses a test carrying the sid of a node that is neither a rule nor a term", async () => {
  const root = project();
  put(root, "test/kinds.test.ts", `test("@spec ${sid("accounts")} the accounts", () => {});\n`);
  await expectOne(root, new RegExp(`test/kinds\\.test\\.ts:1: the test "@spec ${sid("accounts")} the accounts" carries ${sid("accounts")}, a section, where a test carries the SpecTag of a rule or a term`));
  const typed = typedProject();
  put(typed, "test/kinds.test.ts", `test("@spec ${sid("customer")} the customer", () => {});\n`);
  await expectOne(typed, /test\/kinds\.test\.ts:1: .* a RecordType, where a test carries the SpecTag of a rule or a term/);
});

test("@spec s-m8nmfsxkcfu7cjp reads the tests and the documents of the tools for citations where the SpecSheriff guidelines are written", async () => {
  const root = project();
  put(root, "skills/tool/SKILL.md", `See §${NONE}.\n`);
  put(root, "skills/tool/test/a.test.ts", `test("@spec ${sid("open")} opens", () => open("${NONE}"));\n`);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: ["src/**"], tests: ["test/**", "skills/*/test/**"], writesSpecSheriffGuidelines: true }));
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `skills/tool/SKILL.md:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m === `skills/tool/test/a.test.ts:1: ${NONE} names no node`), found.join("\n"));
});

test("@spec s-jau82aq9juv9zzh reports a rule whose text changed after its code, and refuses nothing for it", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  approve(root, [sid("open")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "reworded");
  const found = await binding(root);
  const drift = found.filter((f) => f.reported);
  assert.ok(drift.some((f) => f.where.includes(sid("open")) && /behind its text|caught up/.test(f.message)), found.map((f) => f.message).join("\n"));
});

const lagging = async (root: string) => (await binding(root)).filter((f) => f.reported && f.where.includes(sid("open"))).map((f) => f.message);

test("@spec s-txbwsthdqhvyzd2 reports a node whose tests and code lag behind its text, naming each, and refuses nothing", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  approve(root, [sid("open")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "reworded");
  const found = await lagging(root);
  assert.ok(found.some((m) => /its tests lag behind its text/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => /its code lags behind its text/.test(m)), found.join("\n"));
  assert.ok(!(await binding(root)).some((f) => !f.reported && f.where.includes(sid("open"))));
});

test("@spec s-txbwsthdqhvyzd2 reports a node whose code has not caught up with its tests", async () => {
  const root = project();
  put(root, "test/open.test.ts", `test("@spec ${sid("open")} opens an account", () => {});\ntest("@spec ${sid("open")} opens an account twice", () => {});\n`);
  editSpec(root, (d) => nodeIn(d, "open").meta.tests.push(`test/open.test.ts::@spec ${sid("open")} opens an account twice`));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a test first");
  const found = await lagging(root);
  assert.ok(found.some((m) => /its code may not have caught up with its tests/.test(m)), found.join("\n"));
  assert.ok(!found.some((m) => /behind its text/.test(m)), found.join("\n"));
});

test("@spec s-txbwsthdqhvyzd2 counts the changes one commit makes as made at once", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  approve(root, [sid("open")], { me: OWNER });
  put(root, "test/open.test.ts", `test("@spec ${sid("open")} opens an account", () => { /* reworded */ });\n`);
  put(root, "src/open.ts", readFileSync(join(root, "src", "open.ts"), "utf8") + "// reworded\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "all at once");
  assert.deepEqual(await lagging(root), []);
});

test("@spec s-txbwsthdqhvyzd2 reads a node's file under every name it had, so that renaming it is no change to the node's text", async () => {
  const root = project();
  git(root, "mv", "specs/contracts/c.json", "specs/contracts/accounts.json");
  reindex(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "renamed");
  const found = await binding(root);
  assert.ok(!found.some((f) => f.reported && /behind its text|caught up/.test(f.message)), found.map((f) => `${f.where}: ${f.message}`).join("\n"));
});

test("@spec s-m8nmfsxkcfu7cjp refuses a sid in the code, the tests or the documents that names no node, the archive's included, and a number naming a node", async () => {
  const root = project();
  put(root, "docs/notes.md", `See §${NONE} and ${BY_NUMBER}.\n`);
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `docs/notes.md:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m.startsWith(`docs/notes.md:1: ${BY_NUMBER} names a node by a number`)), found.join("\n"));
  assert.ok(!found.some((m) => m.includes("README.md")), found.join("\n"));
});

test("@spec s-dbk2vyeg8z5jxna passes the generated copies the RecordTypes produce, and refuses one edited by hand, left behind or missing", async () => {
  assert.deepEqual(await messages(typedProject()), []);
  const edited = typedProject();
  put(edited, "src/types.ts", readFileSync(join(edited, "src/types.ts"), "utf8").replace("number: string;", "number: number;"));
  await expectOne(edited, /^src\/types\.ts: not what the RecordTypes generate/);
  const behind = typedProject();
  const path = join(behind, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"name": "number"', '"name": "code"'));
  await expectOne(behind, /^schemas\/checks\.json: not what the RecordTypes generate/);
  const missing = typedProject();
  rmSync(join(missing, "schemas", "checks.json"));
  await expectOne(missing, /^schemas\/checks\.json: missing/);
});

test("@spec s-dbk2vyeg8z5jxna holds a generated copy to what the last commit holds while a RecordType is a draft, reporting the node", async () => {
  const typed = typedProject();
  const path = join(typed, "specs/contracts/c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  const customer = data.nodes[0].children[0];
  customer.fields[0].name = "reference";
  customer.status = "";
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(typed);
  assert.deepEqual(await messages(typed), []);
  const reported = (await binding(typed)).filter((f) => f.reported).map((f) => `${f.where}: ${f.message}`);
  assert.ok(reported.some((m) => m.includes(sid("customer")) && /wait for its approval/.test(m)), reported.join("\n"));
  put(typed, "src/types.ts", readFileSync(join(typed, "src/types.ts"), "utf8").replace("number: string;", "reference: string;"));
  await expectOne(typed, new RegExp(`^src/types\\.ts: changed while the RecordTypes it is generated from wait for their approval: ${sid("customer")}`));
});

test("@spec s-dbk2vyeg8z5jxna refuses a name that cannot be generated, and a second list of the files of the types", async () => {
  await expectOne(typedProject("3d customer"), new RegExp(`${sid("customer")}.*3dCustomer cannot be generated in src/types\\.ts`));
  const two = typedProject();
  const path = join(two, "specs", "tech", "stack.json");
  const stack = JSON.parse(readFileSync(path, "utf8"));
  stack.nodes[0].children.push(node("more types", { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "more files", members: ["src/more.ts"] } }));
  writeFileSync(path, JSON.stringify(stack, null, 2) + "\n");
  reindex(two);
  await expectOne(two, new RegExp(`${sid("more types")}.*a second list of the files`));
});

test("@spec s-pvzms7d8kxb8dk2 reads a file of types as the system's code where the globs naming the code do not reach it", async () => {
  const root = typedProject();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  delete data.nodes[0].children[0].meta;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  await expectOne(root, new RegExp(`${sid("customer")}.*its list of code, none, is not what the SpecTags produce: src/types\\.ts`));
});

test("@spec s-vsh384ybt4w25a2 reports an approved node of a project's own kind that needs code and has none, but not one that needs no code, and lets a test carry its sid", async () => {
  const withKind = (needsCode: boolean) => {
    const root = project();
    writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode, schema: {} } } }));
    editSpec(root, (d) => d.nodes[0].children.push(node("nightly", { kind: "job" })));
    reindex(root);
    approve(root, [sid("nightly")], { me: OWNER });
    reindex(root);
    return root;
  };
  const coded = withKind(true);
  assert.ok((await binding(coded)).some((f) => f.reported && f.where.includes(sid("nightly")) && /not implemented/.test(f.message)));
  assert.ok(!(await binding(withKind(false))).some((f) => f.where.includes(sid("nightly")) && /not implemented/.test(f.message)));
  put(coded, "test/nightly.test.ts", `test("@spec ${sid("nightly")} runs at night", () => {});\n`);
  editSpec(coded, (d) => (nodeIn(d, "nightly").meta = { tests: [`test/nightly.test.ts::@spec ${sid("nightly")} runs at night`] }));
  assert.ok(!(await messages(coded)).some((m) => /nightly\.test\.ts/.test(m)), (await messages(coded)).join("\n"));
});

test("@spec s-5hb9k2e34dgn284 compares a list whose members are objects by the property it names, and a JSON object by its keys", async () => {
  const root = project();
  put(root, "config/kinds.json", JSON.stringify({ kinds: { plain: { rate: 0 }, savings: { rate: 2 } } }));
  editSpec(root, (d) => d.nodes[0].children.push(node("kinds", { list: { of: "the kinds of account", property: "name", members: [{ name: "plain", note: "free" }, { name: "savings" }], declaredIn: { file: "config/kinds.json", declaration: "#/kinds" } } })));
  assert.ok(!(await messages(root)).some((m) => /kinds of account/.test(m)), (await messages(root)).join("\n"));
  editSpec(root, (d) => nodeIn(d, "kinds").list.members.pop());
  await expectOne(root, /the kinds of account.* does not match/);
});

test("@spec s-dbk2vyeg8z5jxna compares the files a project's own generator prints with what is committed, and refuses one edited by hand", async () => {
  const root = project();
  withGenerator(root);
  put(root, "gen/titles.txt", "open\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "generated");
  assert.ok(!(await messages(root)).some((m) => m.includes("gen/titles.txt")), (await messages(root)).join("\n"));
  put(root, "gen/titles.txt", "edited\n");
  await expectOne(root, /gen\/titles\.txt: .*not what .* generates now/);
});

test("@spec s-utf4mbt7ref8g9c holds the code of a project's own check to a test carrying the sid of the rule listing it, and each of its tests to that sid", async () => {
  const root = project();
  editSpec(root, (d) => d.nodes[0].children.push(node("our checks", { list: { of: "the project's own checks", property: "name", members: [{ name: "scan", onFailure: "refused" }] } })));
  approve(root, [sid("our checks")], { me: OWNER });
  const config = JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
  config.checks = [{ rule: sid("our checks"), name: "scan", command: "node tools/scan.mjs", code: ["tools/scan.mjs"], tests: ["tools/scan.test.mjs"] }];
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify(config));
  put(root, "tools/scan.mjs", "process.exit(0);\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a check");
  put(root, "tools/scan.mjs", "process.exit(0); // changed\n");
  await expectOne(root, /the code of the check "scan" changes, and no test carries the SpecTag of the rule listing it/);
  put(root, "tools/scan.test.mjs", `test("@spec ${sid("open")} scans", () => {});\n`);
  await expectOne(root, new RegExp(`tools/scan\\.test\\.mjs.*carries ${sid("open")}, not ${sid("our checks")}`));
  put(root, "tools/scan.test.mjs", `test("@spec ${sid("our checks")} scans", () => {});\n`);
  assert.ok(!(await messages(root)).some((m) => /scan/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-j9r8z4xdrfkfs47 while the commit leaves the specification a draft reports an untagged symbol a commit leaves alone and refuses one it changes; while it leaves it approved refuses both", async () => {
  const draft = project();
  put(draft, "src/old.ts", "export const legacy = 1;\n");
  git(draft, "add", "-A");
  git(draft, "commit", "-qm", "old code");
  const found = await binding(draft);
  assert.ok(found.some((f) => f.reported && /legacy carries no SpecTag/.test(f.message)), found.map((f) => f.message).join("\n"));
  assert.ok(!found.some((f) => !f.reported && /legacy carries no SpecTag/.test(f.message)));
  put(draft, "src/old.ts", "export const legacy = 2;\n");
  await expectOne(draft, /legacy carries no SpecTag/);
  const live = project();
  approveSpecification(live);
  git(live, "add", "-A");
  git(live, "commit", "-qm", "approved");
  put(live, "src/old.ts", "export const legacy = 1;\n");
  git(live, "add", "-A");
  git(live, "commit", "-qm", "old code");
  await expectOne(live, /legacy carries no SpecTag/);
});

test("@spec s-j9r8z4xdrfkfs47 refuses a commit approving the specification while a symbol carries no SpecTag", async () => {
  const untagged = project();
  put(untagged, "src/old.ts", "export const legacy = 1;\n");
  git(untagged, "add", "-A");
  git(untagged, "commit", "-qm", "old code");
  approveSpecification(untagged);
  await expectOne(untagged, /legacy carries no SpecTag/);
});

/** A project whose specification is approved, committed. */
function approvedProject(): string {
  const root = project();
  approveSpecification(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "approved");
  return root;
}

test("@spec s-qzthyh7yqvfhsa2 refuses a commit putting the specification back to draft by an edit of its rule's wording or by its removal, and passes one recording an owner's withdrawal", async () => {
  const path = (root: string) => join(root, "specs", "_guidelines", "project.json");
  const edited = approvedProject();
  writeFileSync(path(edited), readFileSync(path(edited), "utf8").replace("This project's specification is approved.", "This project's specification is approved, for now."));
  reindex(edited);
  await expectOne(edited, /puts the specification back to draft without a withdrawal/);
  const removed = approvedProject();
  const rule = approvalRuleSid(removed);
  const data = JSON.parse(readFileSync(path(removed), "utf8"));
  data.nodes[0].children = data.nodes[0].children.filter((n: { sid: string }) => n.sid !== rule);
  writeFileSync(path(removed), JSON.stringify(data, null, 2) + "\n");
  reindex(removed);
  await expectOne(removed, /puts the specification back to draft without a withdrawal/);
  const withdrawn = approvedProject();
  approveSpecification(withdrawn, { withdraw: true });
  assert.deepEqual(await messages(withdrawn), []);
});

test("@spec s-j9r8z4xdrfkfs47 counts a withdrawal of the rule's approval of whichever wording, by one of the specification's owners as the commit holds them", async () => {
  const path = (root: string) => join(root, "specs", "_guidelines", "project.json");
  const reworded = approvedProject();
  writeFileSync(path(reworded), readFileSync(path(reworded), "utf8").replace("This project's specification is approved.", "This project's specification is approved, for now."));
  reindex(reworded);
  approve(reworded, [approvalRuleSid(reworded)], { me: OWNER, withdraw: true });
  assert.deepEqual(await messages(reworded), []);
  const stranger = approvedProject();
  writeFileSync(join(stranger, "specs", "_approvals.jsonl"), readFileSync(join(stranger, "specs", "_approvals.jsonl"), "utf8") + JSON.stringify({ sid: approvalRuleSid(stranger), fingerprint: "0", withdrawn: true, by: "stranger@example.org" }) + "\n");
  writeFileSync(path(stranger), readFileSync(path(stranger), "utf8").replace('"status": "approved",\n          "text": "This project', '"status": "draft",\n          "text": "This project'));
  await expectOne(stranger, /puts the specification back to draft without a withdrawal/);
});

test("@spec s-j9r8z4xdrfkfs47 reads the specification before the commit as an earlier release wrote it, checked standing for approved", async () => {
  const root = approvedProject();
  const path = join(root, "specs", "_guidelines", "project.json");
  const was = readFileSync(path, "utf8");
  writeFileSync(path, was.replace('"status": "approved",\n          "text": "This project', '"status": "checked",\n          "text": "This project'));
  git(root, "commit", "-qam", "as an earlier release wrote it");
  writeFileSync(path, was);
  assert.deepEqual(await messages(root), []);
});

test("@spec s-xzcw3hv4hmxz7h7 sheriff binding refuses a file the schema refuses before it checks anything, naming the file and every refusal in it", async () => {
  const root = project();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  delete data.nodes[0].children[0].refs;
  data.nodes[0].children[1].children = "none";
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  assert.deepEqual(await messages(root), [
    "specs/contracts/c.json: /nodes/0/children/0: must have required property 'refs': \"refs\"",
    "specs/contracts/c.json: /nodes/0/children/1/children: must be array",
  ]);
});

test("@spec s-xzcw3hv4hmxz7h7 sheriff binding refuses where the schema of an extension refuses the project's extension, naming it, and checks nothing more", async () => {
  const root = project();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ nodes: {} }));
  const found = await messages(root);
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /^specs\/_schema\/project\.schema\.json: .*"nodes"/);
});

/** A project whose test of the rule "open" names it by a bare sid, as an earlier release read it, committed so. */
function earlierForm(): string {
  const root = project();
  put(root, "test/open.test.ts", `test("${sid("open")} opens an account", () => {});\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${sid("open")} opens an account`]));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "the earlier form");
  return root;
}

test("@spec s-utf4mbt7ref8g9c reads a test carrying a bare sid as carrying no SpecTag, and names sheriff reindex, which writes it", async () => {
  const found = await binding(earlierForm());
  const bare = found.filter((f) => f.where === "test/open.test.ts:1" && /bare sid/.test(f.message));
  assert.equal(bare.length, 1, found.map((f) => `${f.where}: ${f.message}`).join("\n"));
  assert.match(bare[0]!.message, new RegExp(`${sid("open")}.*sheriff reindex`));
});

test("@spec s-rah8b37kytb682y counts as unchanged a test whose only change puts @spec before the bare sid it carried", async () => {
  const root = earlierForm();
  editSpec(root, (d) => {
    nodeIn(d, "open").text = "Opening, reworded.";
    nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("open")} opens an account`];
  });
  put(root, "test/open.test.ts", OPEN_TEST);
  assert.ok(!(await messages(root)).some((m) => /test\/open\.test\.ts.*a draft node/.test(m)), (await messages(root)).join("\n"));
  put(root, "test/open.test.ts", OPEN_TEST.replace("opens an account", "opens an account at once"));
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("open")} opens an account at once`]));
  await expectOne(root, new RegExp(`test/open\\.test\\.ts:1: .*${sid("open")}.*a draft node`));
});

test("@spec s-utf4mbt7ref8g9c in draft mode reports a test carrying no SpecTag that a commit leaves alone and refuses one it adds or changes; in live mode refuses both", async () => {
  const draft = project();
  put(draft, "test/old.test.ts", `test("checks the old way", () => {});\n`);
  git(draft, "add", "-A");
  git(draft, "commit", "-qm", "old tests");
  const found = await binding(draft);
  assert.ok(found.some((f) => f.reported && /"checks the old way" carries no SpecTag/.test(f.message)), found.map((f) => f.message).join("\n"));
  assert.ok(!found.some((f) => !f.reported && /"checks the old way"/.test(f.message)));
  put(draft, "test/old.test.ts", `test("checks the old way", () => { void 0; });\n`);
  await expectOne(draft, /"checks the old way" carries no SpecTag/);
  put(draft, "test/new.test.ts", `test("checks anew", () => {});\n`);
  await expectOne(draft, /"checks anew" carries no SpecTag/);
  const live = project();
  approveSpecification(live);
  git(live, "add", "-A");
  git(live, "commit", "-qm", "approved");
  put(live, "test/old.test.ts", `test("checks the old way", () => {});\n`);
  git(live, "add", "-A");
  git(live, "commit", "-qm", "old tests");
  await expectOne(live, /"checks the old way" carries no SpecTag/);
});

test("@spec s-j9r8z4xdrfkfs47 refuses a commit approving the specification while a test carries no SpecTag", async () => {
  const root = project();
  put(root, "test/old.test.ts", `test("checks the old way", () => {});\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "old tests");
  approveSpecification(root);
  await expectOne(root, /"checks the old way" carries no SpecTag/);
});

test("@spec s-txbwsthdqhvyzd2 counts no commit whose only change to a file of tests puts @spec before bare sids", async () => {
  const root = earlierForm();
  put(root, "src/open.ts", OPEN.replace("return amount;", "return amount; // as before"));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "the code after its tests");
  put(root, "test/open.test.ts", OPEN_TEST);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("open")} opens an account`]));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "the SpecTag written");
  const found = (await binding(root)).filter((f) => f.reported && f.where.includes(sid("open"))).map((f) => f.message);
  assert.ok(!found.some((m) => /caught up with its tests/.test(m)), found.join("\n"));
});
