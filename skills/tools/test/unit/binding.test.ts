import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { binding, citationsOutside } from "../../src/binding.ts";
import { confirm } from "../../src/confirmations.ts";
import { reindex } from "../../src/reindex.ts";
import { DATA_STRUCTURES } from "../../src/types.ts";
import { BY_NUMBER, node, NONE, OWNER, sid } from "../fixture.ts";
import { codeProject as project, editSpec, git, nodeIn, OPEN, OPEN_TEST, put, typedProject } from "../code-project.ts";

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
  put(root, "src/other.ts", `/** @spec ${NONE} */\nexport const a = 1;\n/** @spec ${sid("draft")} */\nexport const b = 2;\n`);
  await expectOne(root, new RegExp(`src/other\\.ts:1: .*${NONE} names no node`));
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

test("s-kgbzk2ph9e6jfb4 counts as changed a symbol where a name is replaced but the old one is still spelled", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", "return other;"));
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("open")}.*not checked`));
});

test("s-kgbzk2ph9e6jfb4 counts as changed a line whose text after // or # stands inside a string", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://a" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#fff"\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "strings");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://b" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#000"\n`);
  await expectOne(root, new RegExp(`src/open\\.ts:1: .*${sid("open")}.*not checked`));
  await expectOne(root, new RegExp(`src/paint\\.py:1: .*${sid("open")}.*not checked`));
});

test("s-kgbzk2ph9e6jfb4 counts as unchanged a symbol whose only change is a line inside a comment of several lines", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount.\n   */\n  return amount;"));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a comment");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount as given.\n   */\n  return amount;"));
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
  put(root, "test/more.test.ts", `test("no sid here", () => {});\ntest("${NONE} gone", () => {});\ntest("${sid("draft")} drafted", () => {});\n`);
  await expectOne(root, /test\/more\.test\.ts:1: the test "no sid here" carries no sid/);
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:2: .*${NONE}.*no node`));
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:3: .*${sid("draft")}.*not checked`));
});

test("s-jau82aq9juv9zzh counts a test whose only change is its sid as a test the commit changes", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${sid("draft")} opens an account`]));
  put(root, "test/open.test.ts", OPEN_TEST.replace(sid("open"), sid("draft")));
  await expectOne(root, new RegExp(`test/open\\.test\\.ts:1: .*${sid("draft")}.*not checked`));
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

test("s-rwqzepmrt77rv35 refuses a node naming the symbols in a file that leaves out one its tag stands on", async () => {
  const root = project();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "closed";\n/** @spec ${sid("states")} */\nexport const initial: State = "open";\n`);
  await expectOne(root, new RegExp(`${sid("states")}.*leaves out the symbol initial in src/states\\.ts, which carries its tag`));
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

test("s-jau82aq9juv9zzh refuses a node's address in any file the repository keeps outside the specification, a term's and a file's included", async () => {
  const root = project();
  put(root, "config/routes.yaml", "# as contracts/1.1 says\n");
  put(root, "notes.txt", "Read contracts/c and contracts/Account.\nThe file specs/contracts/c.json and contracts/c.json are paths.\n");
  editSpec(root, (d) => d.nodes[0].children.push({ id: "", sid: sid("account term"), kind: "term", title: "account", status: "", text: "An account.", refs: [] }));
  await expectOne(root, /config\/routes\.yaml:1: .*contracts\/1\.1.*address/);
  await expectOne(root, /notes\.txt:1: contracts\/c is a node's address/);
  await expectOne(root, /notes\.txt:1: contracts\/Account is a node's address/);
  assert.ok(!(await messages(root)).some((m) => m.startsWith("notes.txt:2")), (await messages(root)).join("\n"));
});

test("s-zefk589ykh37b8u reads no file of the tools for an address where the SpecSheriff guidelines are written", async () => {
  const root = project();
  put(root, "skills/tool/test/a.test.ts", `test("${sid("open")} reads contracts/1.1", () => {});\n`);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: ["src/**"], tests: ["test/**", "skills/*/test/**"], writesSpecSheriffGuidelines: true }));
  assert.ok(!(await messages(root)).some((m) => /address/.test(m)));
});

const notImplemented = async (root: string) => (await binding(root)).filter((f) => f.reported && f.message.startsWith("not implemented")).map((f) => `${f.where}: ${f.message}`);

test("s-6fw72j65jkqrfpf reports a checked rule no tagged symbol or no test that runs carries out, and refuses nothing for it", async () => {
  const root = project();
  assert.deepEqual(await messages(root), []);
  const found = await notImplemented(root);
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, new RegExp(`${sid("states")}.*not implemented: no test that runs carries its sid`));
  put(root, "test/states.test.ts", `test.skip("${sid("states")} lists the states", () => {});\n`);
  assert.equal((await notImplemented(root)).length, 1);
  put(root, "test/states.test.ts", `test("${sid("states")} lists the states", () => {});\n`);
  assert.deepEqual(await notImplemented(root), []);
  rmSync(join(root, "src/states.ts"));
  put(root, "src/open.ts", OPEN);
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("states")}.*not implemented: no symbol of the system's code carries its tag`));
});

test("s-6fw72j65jkqrfpf counts a tag and a test of a rule implementing it, through rules implementing those in turn", async () => {
  const root = project();
  put(root, "test/states.test.ts", `test("${sid("states")} lists the states", () => {});\n`);
  editSpec(root, (d) => d.nodes[0].children.push(
    node("close", { text: "An account is closed." }),
    node("closing", { text: "Closing, carried out.", refs: [{ type: "implements", to: sid("close") }] }),
    node("closing detail", { text: "Closing, in detail.", refs: [{ type: "implements", to: sid("closing") }] }),
  ));
  confirm(root, [sid("close"), sid("closing"), sid("closing detail")], { me: OWNER });
  assert.equal((await notImplemented(root)).length, 3);
  put(root, "src/close.ts", `/** @spec ${sid("closing detail")} */\nexport function close() {}\n`);
  put(root, "test/close.test.ts", `test("${sid("closing detail")} closes", () => {});\n`);
  assert.deepEqual(await notImplemented(root), []);
});

test("s-6fw72j65jkqrfpf leaves out a rule a node of the project's own guidelines exempts, by a link to it or to a section above it, and the guidelines and the technical debt", async () => {
  const root = project();
  const exempting = (to: string) => {
    const path = join(root, "specs/_guidelines/project.json");
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.nodes[0].children = [node("by people", { text: "Carried out by people.", refs: [{ type: "exempts", to }] })];
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    reindex(root);
    confirm(root, [sid("by people")], { me: OWNER });
  };
  exempting(sid("states"));
  assert.deepEqual(await notImplemented(root), []);
  exempting(sid("accounts"));
  assert.deepEqual(await notImplemented(root), []);
  put(root, "specs/tech/debt.json", JSON.stringify({ schemaVersion: 1, scope: "tech", section: "debt", nodes: [node("debt", { kind: "section", text: "Set aside.", children: [node("slow export", { text: "The export is slow." })] })] }, null, 2) + "\n");
  reindex(root);
  confirm(root, [sid("debt"), sid("slow export")], { me: OWNER });
  assert.deepEqual(await notImplemented(root), []);
});

test("s-rah8b37kytb682y refuses a test carrying the sid of a node that is neither a rule nor a term", async () => {
  const root = project();
  put(root, "test/kinds.test.ts", `test("${sid("accounts")} the accounts", () => {});\n`);
  await expectOne(root, new RegExp(`test/kinds\\.test\\.ts:1: the test "${sid("accounts")} the accounts" carries ${sid("accounts")}, a section, where a test carries the sid of a rule or a term`));
  const typed = typedProject();
  put(typed, "test/kinds.test.ts", `test("${sid("customer")} the customer", () => {});\n`);
  await expectOne(typed, /test\/kinds\.test\.ts:1: .* a data record, where a test carries the sid of a rule or a term/);
});

test("s-4kd2pave7vm4hmd reads the tests and the documents of the tools for citations where the SpecSheriff guidelines are written", async () => {
  const root = project();
  put(root, "skills/tool/SKILL.md", `See §${NONE}.\n`);
  put(root, "skills/tool/test/a.test.ts", `test("${sid("open")} opens", () => open("${NONE}"));\n`);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: ["src/**"], tests: ["test/**", "skills/*/test/**"], writesSpecSheriffGuidelines: true }));
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `skills/tool/SKILL.md:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m === `skills/tool/test/a.test.ts:1: ${NONE} names no node`), found.join("\n"));
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

test("s-4kd2pave7vm4hmd reads a node's file under every name it had, so that renaming it is no change to the node's text", async () => {
  const root = project();
  git(root, "mv", "specs/contracts/c.json", "specs/contracts/accounts.json");
  reindex(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "renamed");
  const found = await binding(root);
  assert.ok(!found.some((f) => f.reported && /text changed/.test(f.message)), found.map((f) => `${f.where}: ${f.message}`).join("\n"));
});

test("s-4kd2pave7vm4hmd refuses a sid in the code, the tests or the documents that names no node, the archive's included, and a number naming a node", async () => {
  const root = project();
  put(root, "docs/notes.md", `See §${NONE} and ${BY_NUMBER}.\n`);
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `docs/notes.md:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m.startsWith(`docs/notes.md:1: ${BY_NUMBER} names a node by a number`)), found.join("\n"));
  assert.ok(!found.some((m) => m.includes("README.md")), found.join("\n"));
});

test("s-4kd2pave7vm4hmd passes the generated copies the data record nodes produce, and refuses one edited by hand, left behind or missing", async () => {
  assert.deepEqual(await messages(typedProject()), []);
  const edited = typedProject();
  put(edited, "src/types.ts", readFileSync(join(edited, "src/types.ts"), "utf8").replace("number: string;", "number: number;"));
  await expectOne(edited, /^src\/types\.ts: not what the data record nodes generate/);
  const behind = typedProject();
  const path = join(behind, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"name": "number"', '"name": "code"'));
  await expectOne(behind, /^schemas\/checks\.json: not what the data record nodes generate/);
  const missing = typedProject();
  rmSync(join(missing, "schemas", "checks.json"));
  await expectOne(missing, /^schemas\/checks\.json: missing/);
});

test("s-4kd2pave7vm4hmd holds a generated copy to what the last commit holds while a data record node is unchecked, reporting the node", async () => {
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
  assert.ok(reported.some((m) => m.includes(sid("customer")) && /wait for its confirmation/.test(m)), reported.join("\n"));
  put(typed, "src/types.ts", readFileSync(join(typed, "src/types.ts"), "utf8").replace("number: string;", "reference: string;"));
  await expectOne(typed, new RegExp(`^src/types\\.ts: changed while the data record nodes it is generated from wait for their confirmation: ${sid("customer")}`));
});

test("s-4kd2pave7vm4hmd refuses a name that cannot be generated, and a second list of the files of the types", async () => {
  await expectOne(typedProject("3d customer"), new RegExp(`${sid("customer")}.*3dCustomer cannot be generated in src/types\\.ts`));
  const two = typedProject();
  const path = join(two, "specs", "tech", "stack.json");
  const stack = JSON.parse(readFileSync(path, "utf8"));
  stack.nodes[0].children.push(node("more types", { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "more files", members: ["src/more.ts"] } }));
  writeFileSync(path, JSON.stringify(stack, null, 2) + "\n");
  reindex(two);
  await expectOne(two, new RegExp(`${sid("more types")}.*a second list of the files`));
});

test("s-pvzms7d8kxb8dk2 reads a file of types as the system's code where the globs naming the code do not reach it", async () => {
  const root = typedProject();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  delete data.nodes[0].children[0].meta;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  await expectOne(root, new RegExp(`${sid("customer")}.*its list of code, none, is not what the tags produce: src/types\\.ts`));
});
