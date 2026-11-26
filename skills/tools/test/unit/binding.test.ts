import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { binding, citationsOutside, readCommit, untagged } from "../../src/binding.ts";
import { loadConfig } from "../../src/config.ts";
import { APPROVAL_RULE, FIXTURES_RULE, fingerprint } from "../../src/model.ts";
import { approve } from "../../src/approvals.ts";
import { reindex, writeLists } from "../../src/reindex.ts";
import { DATA_STRUCTURES } from "../../src/types.ts";
import { BY_NUMBER, loc, node, NONE, OWNER, sid } from "../fixture.ts";
import { approveSpecification, codeProject as project, editSpec, git, nodeIn, OPEN, OPEN_TEST, put, titlesOf, typedProject, withGenerator } from "../code-project.ts";

test("@spec s-weuyx98r7c923ab lists by file and symbol the system's code and the tests that no SpecTag binds, whether or not the commit changes them", async () => {
  const root = project();
  put(root, "src/pad.ts", "/** @spec none formatting only, no rule of the system */\nexport function pad(s: string) {\n  return s.padStart(4);\n}\n\nexport function raw(s: string) {\n  return s;\n}\n");
  put(root, "test/loose.test.ts", 'test("works", () => {});\n');
  git(root, "add", "-A");
  git(root, "commit", "-qm", "loose");
  put(root, "src/setup.sh", "echo setting up\n");
  put(root, "test/open.test.ts", `${OPEN_TEST}test("@spec ${sid("accounts")} names a section", () => {});\n`);
  assert.deepEqual(await untagged(root), [
    "src/pad.ts:6 raw",
    "src/setup.sh",
    'test/loose.test.ts:1 the test "works"',
    `test/open.test.ts:2 the test "@spec ${sid("accounts")} names a section"`,
  ]);
});

test("@spec s-weuyx98r7c923ab names the code outside every symbol of a file that no SpecTag binds by the file's name alone", async () => {
  const root = project();
  put(root, "src/boot.ts", `console.log("booting");\n\n/** @spec ${sid("open")} */\nexport function boot() {\n  return 1;\n}\n`);
  assert.deepEqual(await untagged(root), ["src/boot.ts"]);
});

const messages = async (root: string) => (await binding(root)).filter((f) => !f.reported).map((f) => `${f.where}: ${f.message}`);
async function expectOne(root: string, pattern: RegExp): Promise<void> {
  const found = await messages(root);
  assert.ok(found.some((m) => pattern.test(m)), `expected ${pattern} among:\n${found.join("\n")}`);
}

test("@spec s-jau82aq9juv9zzh passes code and tests that agree with the specification", async () => {
  assert.deepEqual(await messages(project()), []);
});

test("@spec s-9rtrj24myzjvshu refuses a symbol of the system's code carrying no SpecTag", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  await expectOne(root, /src\/open\.ts:5: close carries no SpecTag/);
});

test("@spec s-36x8amvunmv2kp5 refuses a SpecTag whose sid names no node, on code the commit leaves unchanged, at the start of a file and in the bindings file", async () => {
  const root = project();
  put(root, "src/other.ts", `/** @spec ${NONE} */\nexport const a = 1;\n`);
  put(root, "src/page.css", `/* @spec ${NONE} */\nbody {}\n`);
  put(root, "src/texts.json", "{}\n");
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${NONE}`] }, null, 2) + "\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "sids of no node");
  await expectOne(root, new RegExp(`src/other\\.ts:1: the SpecTag ${NONE} on a names no node`));
  await expectOne(root, new RegExp(`src/page\\.css:1: the SpecTag ${NONE} on src/page\\.css names no node`));
  await expectOne(root, new RegExp(`sheriff\\.bindings\\.json:2: the SpecTag ${NONE} on src/texts\\.json names no node`));
});

test("@spec s-w93jfnqynfa47pf refuses a commit that adds, changes or removes code bound to a draft rule, naming the rule and the symbol, and reads the SpecTags of the commit's parent too", async () => {
  const root = project();
  put(root, "src/other.ts", `/** @spec ${sid("draft")} */\nexport const b = 2;\n`);
  await expectOne(root, new RegExp(`src/other\\.ts:2: b, which the commit adds, is bound to ${sid("draft")} \\(contracts/[0-9.]+\\) in specs/contracts/c\\.json, a draft rule`));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "the code of a draft rule");
  put(root, "src/other.ts", `/** @spec ${sid("open")} */\nexport const b = 2;\n`);
  await expectOne(root, new RegExp(`src/other\\.ts:2: b, which the commit changes, is bound to ${sid("draft")}.*a draft rule`));
  rmSync(join(root, "src", "other.ts"));
  await expectOne(root, new RegExp(`src/other\\.ts:2: b, which the commit removes, is bound to ${sid("draft")}.*a draft rule`));
});

test("@spec s-w93jfnqynfa47pf lets a symbol the commit leaves unchanged keep a SpecTag naming a draft rule", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  assert.ok(!(await messages(root)).some((m) => /a draft rule/.test(m)));
});

test("@spec s-u6mj5yv8ngnz79v counts as unchanged a symbol whose only change is a comment, a citation's sid in it, or its spacing", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", `return  amount; // as §${sid("states")} says`));
  assert.ok(!(await messages(root)).some((m) => /a draft rule/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-u6mj5yv8ngnz79v counts as changed a symbol in which a name is replaced", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", "return other;"));
  await expectOne(root, new RegExp(`src/open\\.ts:2: .*${sid("open")}.*a draft rule`));
});

test("@spec s-u6mj5yv8ngnz79v counts as changed a line whose text after // or # is inside a string literal", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://a" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#fff"\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "strings");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("return amount;", `return "http://b" + amount;`));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint():\n    return "#000"\n`);
  await expectOne(root, new RegExp(`src/open\\.ts:2: .*${sid("open")}.*a draft rule`));
  await expectOne(root, new RegExp(`src/paint\\.py:2: .*${sid("open")}.*a draft rule`));
});

test("@spec s-u6mj5yv8ngnz79v counts as changed a Python line moved out of its block by its indentation alone", async () => {
  const root = project();
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint(x):\n    if x:\n        prime()\n        coat()\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "paint");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/paint.py", `# @spec ${sid("open")}\ndef paint(x):\n    if x:\n        prime()\n    coat()\n`);
  await expectOne(root, new RegExp(`src/paint\\.py:2: .*${sid("open")}.*a draft rule`));
});

test("@spec s-u6mj5yv8ngnz79v counts as unchanged a symbol whose only change is a line inside a comment of several lines", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount.\n   */\n  return amount;"));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a comment");
  editSpec(root, (d) => (nodeIn(d, "open").text = "Opening, reworded."));
  put(root, "src/open.ts", OPEN.replace("  return amount;", "  /*\n   * Returns the amount as given.\n   */\n  return amount;"));
  assert.ok(!(await messages(root)).some((m) => /a draft rule/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-2x58az67bm6cxq2 counts a change to a SpecTag as a change to the symbol's code", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN.replace(`@spec ${sid("open")}`, `@spec ${sid("draft")}`));
  await expectOne(root, new RegExp(`src/open\\.ts:2: .*${sid("draft")}.*a draft rule`));
});

test("@spec s-9rtrj24myzjvshu refuses a SpecTag that is not above any symbol", async () => {
  const root = project();
  put(root, "src/open.ts", OPEN + `\n/** @spec ${sid("open")} */\n`);
  await expectOne(root, /src\/open\.ts:6: a SpecTag that stands on no symbol/);
});

test("@spec s-utf4mbt7ref8g9c refuses a test that the commit adds and that declares no SpecTag", async () => {
  const root = project();
  put(root, "test/more.test.ts", `test("no sid here", () => {});\n`);
  await expectOne(root, /test\/more\.test\.ts:1: the test "no sid here" carries no SpecTag/);
});

test("@spec s-36x8amvunmv2kp5 refuses a test whose SpecTag names no node, also where the commit leaves the test unchanged", async () => {
  const root = project();
  put(root, "test/more.test.ts", `test("@spec ${NONE} gone", () => {});\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "a test of no node");
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:1: the test "@spec ${NONE} gone" carries ${NONE}, which names no node`));
});

test("@spec s-w93jfnqynfa47pf refuses a test that the commit adds and whose SpecTag names a draft rule", async () => {
  const root = project();
  put(root, "test/more.test.ts", `test("@spec ${sid("draft")} drafted", () => {});\n`);
  await expectOne(root, new RegExp(`test/more\\.test\\.ts:1: the test "@spec ${sid("draft")} drafted", which the commit adds, is bound to ${sid("draft")}.*a draft rule`));
});

test("@spec s-2x58az67bm6cxq2 counts a test whose only change is its sid as a test the commit changes", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("draft")} opens an account`]));
  put(root, "test/open.test.ts", OPEN_TEST.replace(sid("open"), sid("draft")));
  await expectOne(root, new RegExp(`test/open\\.test\\.ts:1: .*${sid("draft")}.*a draft rule`));
});

test("@spec s-8wp7xm7g3u8gscq refuses a rule whose code, a file bound as a whole included, a commit adds or changes with no test carrying its sid, a skipped test counting", async () => {
  const root = project();
  approve(root, [sid("draft")], { me: OWNER });
  git(root, "add", "-A");
  git(root, "commit", "-qm", "draft approved");
  put(root, "src/draft.ts", `/** @spec ${sid("draft")} */\nexport const drafted = 1;\n`);
  await expectOne(root, new RegExp(`${sid("draft")}.*no test`));
  put(root, "src/page.css", `/* @spec ${sid("states")} */\nbody {}\n`);
  await expectOne(root, new RegExp(`${sid("states")}.*no test`));
  put(root, "test/states.test.ts", `test.skip("@spec ${sid("states")} lists the states", () => {});\n`);
  assert.ok(!(await messages(root)).some((m) => m.includes(sid("states")) && /no test/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-9rtrj24myzjvshu refuses code outside every symbol and a file to be bound as a whole that the commit adds and that no SpecTag binds, and a SpecTag after the start of such a file", async () => {
  const root = project();
  put(root, "src/boot.ts", `import { open } from "./open.ts";\n\nopen(1);\n`);
  put(root, "src/page.css", `body { margin: 0; }\n/* @spec ${sid("open")} */\n`);
  await expectOne(root, /src\/boot\.ts: the code outside every symbol, imports aside, carries no SpecTag/);
  await expectOne(root, /src\/page\.css: the file is bound as a whole, and no SpecTag binds it/);
  await expectOne(root, /src\/page\.css:2: a SpecTag after the start of the file binds nothing/);
});

test("@spec s-9rtrj24myzjvshu refuses an entry of the bindings file that the commit adds for a file that is not code other than tests, whose format allows comments, or whose language a description covers", async () => {
  const root = project();
  put(root, "src/page.css", `/* @spec ${sid("open")} */\nbody {}\n`);
  put(root, "docs/notes.json", "{}\n");
  const tag = [`@spec ${sid("open")}`];
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/page.css": tag, "src/open.ts": tag, "docs/notes.json": tag }, null, 2) + "\n");
  await expectOne(root, /sheriff\.bindings\.json:2: the entry for src\/page\.css binds nothing: the file's format allows comments/);
  await expectOne(root, /sheriff\.bindings\.json:5: the entry for src\/open\.ts binds nothing: a description covers the file's language/);
  await expectOne(root, /sheriff\.bindings\.json:8: the entry for docs\/notes\.json binds nothing: the file is not part of the system's code other than tests/);
});

test("@spec s-9rtrj24myzjvshu refuses a SpecTag naming a node that is not a rule on code the commit adds, and leaves a misplaced SpecTag in code the commit leaves unchanged to the check of code outside the commit", async () => {
  const root = project();
  put(root, "src/other.ts", `/** @spec ${sid("accounts")} */\nexport const a = 1;\n`);
  await expectOne(root, new RegExp(`src/other\\.ts:1: the SpecTag ${sid("accounts")} on a names a section, which is not a rule`));
  const kept = project();
  put(kept, "src/open.ts", OPEN + `\n/** @spec ${sid("open")} */\n`);
  git(kept, "add", "-A");
  git(kept, "commit", "-qm", "a misplaced SpecTag");
  assert.ok(!(await messages(kept)).some((m) => /stands on no symbol/.test(m)), (await messages(kept)).join("\n"));
});

test("@spec s-t383grkn3q68dpf refuses a node's lists of code and tests that the SpecTags of the code and of the tests do not produce", async () => {
  const root = project();
  editSpec(root, (d) => (nodeIn(d, "open").meta = { code: [{ file: "src/elsewhere.ts" }], tests: [] }));
  await expectOne(root, new RegExp(`${sid("open")}.*code.*src/open\\.ts`));
  await expectOne(root, new RegExp(`${sid("open")}.*tests.*opens an account`));
});

test("@spec s-t383grkn3q68dpf compares a node's list of code by its files alone, in any order", async () => {
  const root = project();
  put(root, "src/more.ts", `/** @spec ${sid("open")} */\nexport const more = 1;\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.code = [{ file: "src/open.ts" }, { file: "src/more.ts" }]));
  assert.ok(!(await messages(root)).some((m) => m.includes(sid("open")) && /list of code/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-5hb9k2e34dgn284 refuses a list whose values the symbol that valueList names does not declare exactly, naming each value concerned, and a symbol that cannot be found", async () => {
  const root = project();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "frozen";\n`);
  await expectOne(root, new RegExp(`${sid("states")} .*its list of the states of an account does not match the symbol State in src/states\\.ts: closed is not declared there; frozen is declared there and not listed`));
  editSpec(root, (d) => (nodeIn(d, "states").list.valueList.symbol = "Gone"));
  await expectOne(root, new RegExp(`${sid("states")} .*its list of the states of an account names the symbol Gone in src/states\\.ts, which cannot be found`));
});

test("@spec s-5hb9k2e34dgn284 validates each value of a list against the schema at the place that jsonSchema points to, and refuses a value of its enum, reached through $ref, that the list does not hold", async () => {
  const root = project();
  put(root, "schema/account.schema.json", JSON.stringify({ $schema: "https://json-schema.org/draft/2020-12/schema", $defs: { state: { $ref: "#/$defs/states" }, states: { type: "string", enum: ["open", "closed", "frozen"] } } }, null, 2) + "\n");
  editSpec(root, (d) => {
    delete nodeIn(d, "states").list.valueList;
    nodeIn(d, "states").list.jsonSchema = { file: "schema/account.schema.json", pointer: "#/$defs/state" };
  });
  await expectOne(root, new RegExp(`${sid("states")} .*its list of the states of an account does not match #/\\$defs/state in schema/account\\.schema\\.json: frozen is a value of its enum and not listed`));
  editSpec(root, (d) => (nodeIn(d, "states").list.members = ["open", "closed", "frozen", "lost"]));
  await expectOne(root, new RegExp(`${sid("states")} .*lost is not valid against it`));
  editSpec(root, (d) => (nodeIn(d, "states").list.members = ["open", "closed", "frozen"]));
  assert.ok(!(await messages(root)).some((m) => /the states of an account/.test(m)), (await messages(root)).join("\n"));
  editSpec(root, (d) => (nodeIn(d, "states").list.jsonSchema.pointer = "#/$defs/nothing"));
  await expectOne(root, new RegExp(`${sid("states")} .*points to #/\\$defs/nothing in schema/account\\.schema\\.json, which cannot be found`));
});

test("@spec s-nh8b2hjvzasdxmd refuses a node's location in a file outside the specification", async () => {
  const root = project();
  put(root, "docs/notes.md", `As ${loc("Contracts", "1.1")} says.\n`);
  await expectOne(root, /docs\/notes\.md:1: .*Contracts\/1\.1.*location/);
});

test("@spec s-nh8b2hjvzasdxmd refuses a location of the new form in a file of the technical appendix, and leaves a location that a longer path or name continues", async () => {
  const root = project();
  put(root, "specs/tech/stack.json", JSON.stringify({ schemaVersion: 1, scope: "tech", section: "stack", nodes: [node("stack", { kind: "section", text: "The stack.", children: [node("runtime"), node("store")] })] }, null, 2) + "\n");
  reindex(root);
  const stack = ["tech", "stack"].join("/");
  const contracts = loc("contracts", "1.1");
  put(root, "docs/stack.md", `See ${stack}/2.\nKept in ${contracts}.json, ${contracts}-old, ${contracts}/x and ${stack}-old.\n`);
  await expectOne(root, new RegExp(`docs/stack\\.md:1: ${stack}/2 is a node's location`));
  assert.ok(!(await messages(root)).some((m) => m.startsWith("docs/stack.md:2")), (await messages(root)).join("\n"));
});

test("@spec s-nh8b2hjvzasdxmd refuses a node's location in any file the repository keeps outside the specification, a term's and a file's included", async () => {
  const root = project();
  put(root, "config/routes.yaml", `# as ${loc("contracts", "1.1")} says\n`);
  put(root, "notes.txt", `Read ${loc("contracts", "1")} and contracts/Account.\nThe file specs/contracts/c.json and contracts/c.json are paths.\n`);
  editSpec(root, (d) => d.nodes[0].children.push({ location: "", sid: sid("account term"), kind: "term", title: "account", status: "draft", text: "An account.", refs: [] }));
  await expectOne(root, /config\/routes\.yaml:1: .*contracts\/1\.1.*location/);
  await expectOne(root, /notes\.txt:1: contracts\/1 is a node's location/);
  await expectOne(root, /notes\.txt:1: contracts\/Account is a node's location/);
  assert.ok(!(await messages(root)).some((m) => m.startsWith("notes.txt:2")), (await messages(root)).join("\n"));
});

/** A rule of the project's own guidelines listing the fixtures of its tests (s-6hha5en226aj8hu). */
function listFixtures(root: string, members: string[]): void {
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children = [node("fixtures", { refs: [{ type: "refines", to: FIXTURES_RULE }], list: { of: "the fixtures of the tests of the checks", members } })];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
  // The rule is read in its last approved wording (s-t9j29hppag2nren).
  approve(root, [sid("fixtures")], { me: OWNER });
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

const notImplemented = async (root: string) => (await binding(root)).filter((f) => !f.reported && f.message.includes("an approved rule that the commit includes lacks")).map((f) => `${f.where}: ${f.message}`);

test("@spec s-jgejd5rpd9d43pd refuses, while the specification is approved, a rule whose approval the commit adds and that lacks code, a test that runs, or both, and checks nothing while it is a draft", async () => {
  const close = (root: string) => {
    editSpec(root, (d) => d.nodes[0].children.push(node("close", { text: "An account is closed." })));
    approve(root, [sid("close")], { me: OWNER });
  };
  const draft = project();
  close(draft);
  assert.deepEqual(await notImplemented(draft), []);
  const root = approvedProject();
  close(root);
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("close")} .*an approved rule that the commit includes lacks code of the system other than tests and a test that runs`));
  put(root, "src/close.ts", `/** @spec ${sid("close")} */\nexport function close() {}\n`);
  put(root, "test/close.test.ts", `test.skip("@spec ${sid("close")} closes", () => {});\n`);
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("close")} .*lacks a test that runs`));
  put(root, "test/close.test.ts", `test("@spec ${sid("close")} closes", () => {});\n`);
  assert.deepEqual(await notImplemented(root), []);
});

test("@spec s-jgejd5rpd9d43pd refuses a rule that loses the implements link through which code and a test were bound to it, and one whose exemption ends", async () => {
  const root = approvedProject();
  editSpec(root, (d) => d.nodes[0].children.push(
    node("close", { text: "An account is closed." }),
    node("closing", { text: "Closing, carried out.", refs: [{ type: "implements", to: sid("close") }] }),
  ));
  approve(root, [sid("close"), sid("closing")], { me: OWNER });
  put(root, "src/close.ts", `/** @spec ${sid("closing")} */\nexport function close() {}\n`);
  put(root, "test/close.test.ts", `test("@spec ${sid("closing")} closes", () => {});\n`);
  await writeLists(root);
  assert.deepEqual(await notImplemented(root), []);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "closing");
  editSpec(root, (d) => (nodeIn(d, "closing").refs = []));
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("close")} .*lacks code of the system other than tests and a test that runs`));

  const exempt = approvedProject();
  const path = join(exempt, "specs/_guidelines/project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children = [node("by people", { text: "Carried out by people.", refs: [{ type: "exempts", to: sid("states") }] })];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(exempt);
  approve(exempt, [sid("by people")], { me: OWNER });
  git(exempt, "add", "-A");
  git(exempt, "commit", "-qm", "states exempted");
  approve(exempt, [sid("by people")], { me: OWNER, withdraw: true });
  assert.match((await notImplemented(exempt)).join("\n"), new RegExp(`${sid("states")} .*lacks a test that runs`));
});

test("@spec s-6fw72j65jkqrfpf counts, for a rule, the SpecTags and the tests of each rule that implements it, directly or through rules that implement those in turn", async () => {
  const root = approvedProject();
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
  const root = approvedProject();
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "closed" | "open";\n`);
  assert.match((await notImplemented(root)).join("\n"), new RegExp(`${sid("states")} .*lacks a test that runs`));
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

test("@spec s-utf4mbt7ref8g9c refuses a test that the commit adds and whose SpecTag names a node that is not a rule, and accepts one naming a RecordType", async () => {
  const root = project();
  put(root, "test/kinds.test.ts", `test("@spec ${sid("accounts")} the accounts", () => {});\n`);
  await expectOne(root, new RegExp(`test/kinds\\.test\\.ts:1: the test "@spec ${sid("accounts")} the accounts" carries ${sid("accounts")}, a section, where a test carries the SpecTag of a rule`));
  const typed = typedProject();
  put(typed, "test/kinds.test.ts", `test("@spec ${sid("customer")} the customer", () => {});\n`);
  assert.ok(!(await messages(typed)).some((m) => /^test\/kinds\.test\.ts:/.test(m)), (await messages(typed)).join("\n"));
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

test("@spec s-m8nmfsxkcfu7cjp refuses a sid that names no node of the model, an archived node's included, and a number naming a node, in every file the repository keeps outside the specification", async () => {
  const root = project();
  put(root, "specs/_archive/c.json", JSON.stringify({ schemaVersion: 1, scope: "archive", section: "c", nodes: [{ ...node("old rule"), archived: { date: "2026-11-01", reason: "Replaced.", replacedBy: sid("open") } }] }, null, 2) + "\n");
  put(root, "docs/notes.md", `See §${NONE} and ${BY_NUMBER}.\n`);
  put(root, "notes/plan.txt", `Then ${sid("old rule")}.\n`);
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `docs/notes.md:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m.startsWith(`docs/notes.md:1: ${BY_NUMBER} names a node by a number`)), found.join("\n"));
  assert.ok(found.some((m) => m === `notes/plan.txt:1: ${sid("old rule")} names no node`), found.join("\n"));
  assert.ok(!found.some((m) => m.includes("README.md")), found.join("\n"));
});

test("@spec s-m8nmfsxkcfu7cjp leaves to the check of SpecTags the SpecTags in the system's code and the bindings file, and leaves out binary files", async () => {
  const root = project();
  put(root, "src/gone.ts", `/** @spec ${NONE} */\nexport const gone = 1;\n`);
  put(root, "src/texts.json", "{}\n");
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${NONE}`] }) + "\n");
  writeFileSync(join(root, "docs.png"), Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0]), Buffer.from(NONE)]));
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.deepEqual(found, []);
});

test("@spec s-m8nmfsxkcfu7cjp refuses a SpecTag outside the system's code that names no node or a node that is not a rule of the guidelines", async () => {
  const root = project();
  put(root, "tools/scan.mjs", `/** @spec ${NONE} */\nexport const scan = 1;\n/** @spec ${sid("open")} */\nexport const more = 2;\n`);
  const found = (await citationsOutside(root)).map((f) => `${f.where}: ${f.message}`);
  assert.ok(found.some((m) => m === `tools/scan.mjs:1: ${NONE} names no node`), found.join("\n"));
  assert.ok(found.some((m) => m === `tools/scan.mjs:3: the SpecTag @spec ${sid("open")} is outside the system's code and names a node that is not a rule of the guidelines`), found.join("\n"));
});

test("@spec s-dbk2vyeg8z5jxna passes the generated copies the RecordTypes produce, and refuses one edited by hand, left behind or missing", async () => {
  assert.deepEqual(await messages(typedProject()), []);
  const edited = typedProject();
  put(edited, "src/types.ts", readFileSync(join(edited, "src/types.ts"), "utf8").replace("number: string;", "number: number;"));
  await expectOne(edited, /^src\/types\.ts: not what the RecordTypes generate/);
  const behind = typedProject();
  const path = join(behind, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].schema.properties.number.maxLength = 9;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(behind);
  approve(behind, [sid("customer")], { me: OWNER });
  await expectOne(behind, /^schemas\/checks\.json: not what the RecordTypes generate/);
  const missing = typedProject();
  rmSync(join(missing, "schemas", "checks.json"));
  await expectOne(missing, /^schemas\/checks\.json: missing/);
});

test("@spec s-dbk2vyeg8z5jxna compares a generated copy with what the last approved wording of each RecordType generates, while the RecordType is a draft", async () => {
  const typed = typedProject();
  const path = join(typed, "specs/contracts/c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  const customer = data.nodes[0].children[0];
  customer.schema.properties = { reference: { type: "string" } };
  customer.schema.required = ["reference"];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(typed);
  assert.equal(JSON.parse(readFileSync(path, "utf8")).nodes[0].children[0].status, "draft");
  assert.deepEqual(await messages(typed), []);
  put(typed, "src/types.ts", readFileSync(join(typed, "src/types.ts"), "utf8").replace("number: string;", "reference: string;"));
  await expectOne(typed, /^src\/types\.ts: not what the RecordTypes generate/);
});

test("@spec s-dbk2vyeg8z5jxna refuses a name that cannot be generated, and a second list of the files of the types", async () => {
  await expectOne(typedProject("3d customer"), new RegExp(`${sid("customer")}.*3dCustomer cannot be generated in src/types\\.ts`));
  const two = typedProject();
  const path = join(two, "specs", "tech", "stack.json");
  const stack = JSON.parse(readFileSync(path, "utf8"));
  stack.nodes[0].children.push(node("more types", { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "more files", members: ["src/more.ts"] } }));
  writeFileSync(path, JSON.stringify(stack, null, 2) + "\n");
  reindex(two);
  approve(two, [sid("more types")], { me: OWNER });
  await expectOne(two, new RegExp(`${sid("more types")}.*a second list of the files`));
});

test("@spec s-tjsv2wv4j2cuapa reads a file of types as the system's code where the globs naming the code do not match it", async () => {
  const root = typedProject();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  delete data.nodes[0].children[0].meta;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  await expectOne(root, new RegExp(`${sid("customer")}.*its list of code, none, is not what the SpecTags produce: schemas/checks\\.json, src/types\\.ts`));
});

test("@spec s-vsh384ybt4w25a2 reports an approved node of a project's own kind that needs code and has none, but not one that needs no code, and lets a test carry its sid", async () => {
  const withKind = (needsCode: boolean) => {
    const root = approvedProject();
    writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode, schema: {} } } }));
    editSpec(root, (d) => d.nodes[0].children.push(node("nightly", { kind: "job" })));
    reindex(root);
    approve(root, [sid("nightly")], { me: OWNER });
    reindex(root);
    return root;
  };
  const coded = withKind(true);
  assert.ok((await notImplemented(coded)).some((m) => m.includes(sid("nightly"))), (await notImplemented(coded)).join("\n"));
  assert.ok(!(await notImplemented(withKind(false))).some((m) => m.includes(sid("nightly"))));
  put(coded, "test/nightly.test.ts", `test("@spec ${sid("nightly")} runs at night", () => {});\n`);
  editSpec(coded, (d) => (nodeIn(d, "nightly").meta = { tests: [`test/nightly.test.ts::@spec ${sid("nightly")} runs at night`] }));
  assert.ok(!(await messages(coded)).some((m) => /nightly\.test\.ts/.test(m)), (await messages(coded)).join("\n"));
});

test("@spec s-5hb9k2e34dgn284 takes the value of a member that is an object from the property that the list names, and leaves unchecked a list with a member that lacks it", async () => {
  const root = project();
  put(root, "config/kinds.schema.json", JSON.stringify({ $defs: { kind: { enum: ["plain", "savings"] } } }));
  editSpec(root, (d) => d.nodes[0].children.push(node("kinds", { list: { of: "the kinds of account", property: "name", members: [{ name: "plain", note: "free" }, { name: "savings" }], jsonSchema: { file: "config/kinds.schema.json", pointer: "#/$defs/kind" } } })));
  assert.ok(!(await messages(root)).some((m) => /kinds of account/.test(m)), (await messages(root)).join("\n"));
  editSpec(root, (d) => nodeIn(d, "kinds").list.members.pop());
  await expectOne(root, /the kinds of account does not match .*savings is a value of its enum and not listed/);
  editSpec(root, (d) => nodeIn(d, "kinds").list.members.push({ note: "nameless" }));
  assert.ok(!(await messages(root)).some((m) => /kinds of account/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-czxaqvaesmu3gru refuses a kind of the project's extension that no rule lists, a member that names no kind and a member whose needsCode differs, and accepts a kind listed twice alike", async () => {
  const root = project();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: true, schema: {} }, note: { needsCode: false, schema: {} } } }));
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children = [...(data.nodes[0].children ?? []), node("our kinds", {
    refs: [{ type: "refines", to: "s-vsh384ybt4w25a2" }],
    list: { of: "the project's own kinds of node", property: "name", members: [{ name: "job", needsCode: false }, { name: "ghost", needsCode: true }] },
  })];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("our kinds")], { me: OWNER });
  await expectOne(root, /specs\/_schema\/project\.schema\.json: the kind note, which the field kinds adds, is listed by no rule that refines s-vsh384ybt4w25a2/);
  await expectOne(root, new RegExp(`${sid("our kinds")} .*lists the kind job with needsCode false, where the field kinds of project\\.schema\\.json gives it needsCode true`));
  await expectOne(root, new RegExp(`${sid("our kinds")} .*lists the kind ghost, which the field kinds of project\\.schema\\.json does not add`));
  const fixed = JSON.parse(readFileSync(path, "utf8"));
  fixed.nodes[0].children.at(-1).list.members = [{ name: "job", needsCode: true }, { name: "job", needsCode: true }, { name: "note", needsCode: false }];
  writeFileSync(path, JSON.stringify(fixed, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("our kinds")], { me: OWNER });
  assert.ok(!(await messages(root)).some((m) => /the kind |our kinds/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-dbk2vyeg8z5jxna compares the files a project's own generator prints with what is committed, and refuses one edited by hand", async () => {
  const root = project();
  withGenerator(root);
  put(root, "gen/titles.txt", titlesOf());
  await writeLists(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "generated");
  assert.ok(!(await messages(root)).some((m) => m.includes("gen/titles.txt")), (await messages(root)).join("\n"));
  put(root, "gen/titles.txt", titlesOf("open", "edited"));
  await expectOne(root, /gen\/titles\.txt: .*not what .* generates now/);
});

test("@spec s-dbk2vyeg8z5jxna refuses each file of a generator whose rule is a draft that the commit changes, adds or removes, and leaves one it keeps", async () => {
  const root = project();
  withGenerator(root);
  put(root, "gen/titles.txt", titlesOf());
  await writeLists(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "generated");
  approve(root, [sid("our generators")], { me: OWNER, withdraw: true });
  assert.ok(!(await messages(root)).some((m) => m.includes("gen/titles.txt")), (await messages(root)).join("\n"));
  put(root, "gen/titles.txt", titlesOf("open", "edited"));
  await expectOne(root, new RegExp(`gen/titles\\.txt: the commit changes a file that the generator "titles" prints, while ${sid("our generators")}, the rule that lists it, is a draft`));
  rmSync(join(root, "gen", "titles.txt"));
  await expectOne(root, /gen\/titles\.txt: the commit changes a file that the generator "titles" prints/);
});

test("@spec s-dbk2vyeg8z5jxna refuses a path that two of the project's own generators print with different texts", async () => {
  const root = project();
  withGenerator(root);
  writeFileSync(join(root, "gen2.mjs"), `console.log(JSON.stringify([{ path: "gen/titles.txt", content: "other\\n", sids: [] }]));\n`);
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.at(-1).list.members.push({ name: "others" });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  setSettings(root, (s) => s.generators.push({ rule: sid("our generators"), name: "others", command: "node gen2.mjs", code: ["gen2.mjs"], tests: [] }));
  reindex(root);
  approve(root, [sid("our generators")], { me: OWNER });
  await expectOne(root, /gen\/titles\.txt: sheriff types would write different texts at this path: those of the generator "titles" and the generator "others"/);
});

test("@spec s-y5yk7eu6h4zrjpr hands a project's generator each node in its last approved wording, and refuses a path that it prints outside the system's code", async () => {
  const root = project();
  withGenerator(root);
  put(root, "gen/titles.txt", titlesOf());
  await writeLists(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "generated");
  editSpec(root, (d) => (nodeIn(d, "open").title = "Opening"));
  assert.ok(!(await messages(root)).some((m) => m.includes("gen/titles.txt")), (await messages(root)).join("\n"));
  const outside = project();
  withGenerator(outside, "docs/titles.txt");
  await expectOne(outside, /generator "titles": prints docs\/titles\.txt, a path outside the system's code/);
});

test("@spec s-t383grkn3q68dpf builds the lists of the rule listing a project's own check from the check's code and tests too", async () => {
  const root = project();
  editSpec(root, (d) => d.nodes[0].children.push(node("our checks", { list: { of: "the project's own checks", property: "name", members: [{ name: "scan", onFailure: "refused" }] } })));
  const config = JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
  config.checks = [{ rule: sid("our checks"), name: "scan", command: "node tools/scan.mjs", code: ["tools/scan.mjs"], tests: ["tools/scan.test.mjs"] }];
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify(config));
  put(root, "tools/scan.test.mjs", `test("@spec ${sid("our checks")} scans", () => {});\n`);
  assert.ok((await messages(root)).some((m) => m.includes(sid("our checks")) && /list of tests.*tools\/scan\.test\.mjs/.test(m)), (await messages(root)).join("\n"));
  await writeLists(root);
  assert.ok(!(await messages(root)).some((m) => /scan/.test(m)), (await messages(root)).join("\n"));
});

test("@spec s-3xx2eukc8gtd2tx passes code and tests outside the commit that no SpecTag binds while the specification is a draft, warns once while it is approved, and refuses while its strict flag is on", async () => {
  const old = (root: string) => {
    put(root, "src/old.ts", "export const legacy = 1;\n");
    put(root, "src/boot.ts", "start();\n");
    put(root, "test/old.test.ts", `test("checks the old way", () => {});\n`);
    git(root, "add", "-A");
    git(root, "commit", "-qm", "old code");
  };
  const draft = project();
  old(draft);
  const found = await binding(draft);
  assert.ok(!found.some((f) => /legacy|boot|checks the old way|sheriff untagged/.test(f.message)), found.map((f) => `${f.where}: ${f.message}`).join("\n"));
  put(draft, "src/old.ts", "export const legacy = 2;\n");
  await expectOne(draft, /src\/old\.ts:1: legacy carries no SpecTag/);
  const live = approvedProject();
  old(live);
  const warned = (await binding(live)).filter((f) => /sheriff untagged/.test(f.message));
  assert.equal(warned.length, 1, warned.map((f) => f.message).join("\n"));
  assert.equal(warned[0]!.reported, true);
  assert.match(warned[0]!.message, /3 pieces of code and tests that the commit leaves unchanged are bound by no SpecTag/);
  setSettings(live, (s) => (s.strict = [{ on: true, by: OWNER }]));
  await expectOne(live, /3 pieces of code and tests that the commit leaves unchanged are bound by no SpecTag: sheriff untagged lists them/);
});


/** A project whose specification is approved, committed. */
function approvedProject(): string {
  const root = project();
  approveSpecification(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "approved");
  return root;
}

/** Rewrites the settings of the project at the given root. */
function setSettings(root: string, change: (settings: Record<string, any>) => void): void {
  const path = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(path, "utf8"));
  change(settings);
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
}

test("@spec s-j9r8z4xdrfkfs47 accepts entries that a commit appends after those of its parent, each naming an owner of the specification", async () => {
  const root = approvedProject();
  approveSpecification(root, { withdraw: true });
  setSettings(root, (s) => s.strict = [{ on: true, by: OWNER }]);
  assert.deepEqual(await messages(root), []);
});

test("@spec s-j9r8z4xdrfkfs47 refuses a commit that removes, changes or moves an entry of its parent, and the refusal names the setting, the entries and the specification's owners", async () => {
  const removed = approvedProject();
  setSettings(removed, (s) => (s.approvalStatus = []));
  await expectOne(removed, new RegExp(`sheriff\\.config\\.json: approvalStatus: the entries .*"approved".* are not the first entries, unchanged and in the same order; the specification's owners are ${OWNER.replaceAll(".", "\\.")}`));
  const changed = approvedProject();
  setSettings(changed, (s) => (s.approvalStatus[0].by = "other@example.org"));
  await expectOne(changed, /approvalStatus: the entries .* are not the first entries/);
});

test("@spec s-j9r8z4xdrfkfs47 refuses an entry that names a person who is not an owner of the specification in project.json after the commit, and accepts the entry if the commit makes that person an owner", async () => {
  const root = approvedProject();
  setSettings(root, (s) => s.approvalStatus.push({ status: "draft", by: "stranger@example.org" }));
  await expectOne(root, /sheriff\.config\.json: approvalStatus: the entry .*"stranger@example\.org".* names no owner of the specification/);
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].owners = [OWNER, "stranger@example.org"];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  assert.ok(!(await messages(root)).some((m) => /names no owner/.test(m)));
});

test("@spec s-j9r8z4xdrfkfs47 reads the entries of the commit's parent as sheriff reindex would rewrite them; an approved rule of an earlier release is read as an entry", async () => {
  const root = project();
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  const rule = node("approved spec", { title: "The specification is approved", text: "This project's specification is approved.", status: "approved", refs: [{ type: "refines", to: APPROVAL_RULE }] });
  (data.nodes[0].children ??= []).push(rule);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  const approvals = join(root, "specs", "_approvals.jsonl");
  writeFileSync(approvals, (existsSync(approvals) ? readFileSync(approvals, "utf8") : "") + JSON.stringify({ sid: rule.sid, fingerprint: fingerprint(rule), by: OWNER }) + "\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "as an earlier release wrote it");
  reindex(root);
  assert.deepEqual(JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8")).approvalStatus, [{ status: "approved", by: OWNER }]);
  assert.ok(!(await messages(root)).some((m) => /sheriff\.config\.json/.test(m)), (await messages(root)).join("\n"));
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
  const root = earlierForm();
  put(root, "test/open.test.ts", `test("${sid("open")} opens an account", () => { void 0; });\n`);
  const found = await binding(root);
  const bare = found.filter((f) => f.where === "test/open.test.ts:1" && /bare sid/.test(f.message));
  assert.equal(bare.length, 1, found.map((f) => `${f.where}: ${f.message}`).join("\n"));
  assert.match(bare[0]!.message, new RegExp(`${sid("open")}.*sheriff reindex`));
});

test("@spec s-2x58az67bm6cxq2 counts as changed a test whose only change puts @spec before the bare sid it carried, since the commit adds its SpecTag", async () => {
  const root = earlierForm();
  editSpec(root, (d) => {
    nodeIn(d, "open").text = "Opening, reworded.";
    nodeIn(d, "open").meta.tests = [`test/open.test.ts::@spec ${sid("open")} opens an account`];
  });
  put(root, "test/open.test.ts", OPEN_TEST);
  await expectOne(root, new RegExp(`test/open\\.test\\.ts:1: .*${sid("open")}.*a draft rule`));
});

test("@spec s-utf4mbt7ref8g9c refuses a test without a SpecTag that the commit changes, and leaves one that it leaves unchanged to the check of code outside the commit", async () => {
  const draft = project();
  put(draft, "test/old.test.ts", `test("checks the old way", () => {});\n`);
  git(draft, "add", "-A");
  git(draft, "commit", "-qm", "old tests");
  assert.ok(!(await binding(draft)).some((f) => /"checks the old way"/.test(f.message)));
  put(draft, "test/old.test.ts", `test("checks the old way", () => { void 0; });\n`);
  await expectOne(draft, /"checks the old way" carries no SpecTag/);
});


test("@spec s-trwczfskj5zmuft refuses an entry of the bindings file whose path names no file that the commit leaves, naming the path", async () => {
  const root = project();
  put(root, "src/texts.json", `{ "greeting": "hello" }\n`);
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("open")}`], "src/gone.json": [`@spec ${sid("open")}`] }, null, 2) + "\n");
  await expectOne(root, /sheriff\.bindings\.json:\d+: the entry for src\/gone\.json names no file that the commit leaves in the repository/);
  assert.ok(!(await messages(root)).some((m) => m.includes("src/texts.json") && /names no file/.test(m)));
});

test("@spec s-trwczfskj5zmuft refuses a bindings file that is not valid JSON, or that is not an object whose every key maps to a list of strings", async () => {
  const root = project();
  for (const text of ["{ not json", "[]", JSON.stringify({ "src/texts.json": `@spec ${sid("open")}` }), JSON.stringify({ "src/texts.json": [1] })]) {
    put(root, "sheriff.bindings.json", text);
    await expectOne(root, /sheriff\.bindings\.json: (is not valid JSON|is not a JSON object whose every key, a path, maps to a list of SpecTags, each a string)/);
  }
});

test("@spec s-5z5gnu7pahr82xp refuses a string of the bindings file that has neither form of a SpecTag", async () => {
  const root = project();
  put(root, "src/texts.json", `{ "greeting": "hello" }\n`);
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": ["@spec none"] }, null, 2) + "\n");
  await expectOne(root, /sheriff\.bindings\.json:\d+: a text opening with `@spec` has neither form of a SpecTag/);
});

test("@spec s-2x58az67bm6cxq2 counts a file bound by an entry of the bindings file as changed where the commit changes the entry's SpecTags or the file's code", async () => {
  const root = project();
  put(root, "src/texts.json", `{ "greeting": "hello" }\n`);
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("open")}`] }) + "\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "texts");
  const changed = async () => [...(await readCommit(root, loadConfig(root))).changedFiles];
  put(root, "src/texts.json", `{"greeting":"hello"}\n`);
  assert.deepEqual(await changed(), [], "reformatting the JSON changes no code");
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("states")}`] }) + "\n");
  assert.deepEqual(await changed(), ["src/texts.json"]);
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("open")}`] }) + "\n");
  put(root, "src/texts.json", `{ "greeting": "hi" }\n`);
  assert.deepEqual(await changed(), ["src/texts.json"]);
});

test("@spec s-2x58az67bm6cxq2 determines what a commit removes: each symbol of a file that it deletes, with its SpecTags", async () => {
  const root = project();
  rmSync(join(root, "src", "open.ts"));
  const removed = (await readCommit(root, loadConfig(root))).removed;
  assert.deepEqual(removed.map((r) => [r.path, r.key, r.tags.map((t) => t.sid)]), [["src/open.ts", "open", [sid("open")]]]);
});
