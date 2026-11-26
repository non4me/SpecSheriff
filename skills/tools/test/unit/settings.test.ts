import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { changeSetting, parseChange, settingsText } from "../../src/settings.ts";
import { file, node, OWNER, sid } from "../fixture.ts";
import { codeProject, editSpec, git, nodeIn, put } from "../code-project.ts";
import { writeLists } from "../../src/reindex.ts";

const settingsOf = (root: string) => JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
const setSettings = (root: string, change: (s: any) => void) => {
  const s = settingsOf(root);
  change(s);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify(s, null, 2) + "\n");
};
const commitAll = (root: string, message = "next") => (git(root, "add", "-A"), git(root, "commit", "-qm", message));
/** A code project in which each extension of the guidelines is delivered by a file of its own holding no nodes. */
function project(): string {
  const root = codeProject();
  for (const name of ["domains", "recordtype", "views"]) put(root, `specs/_guidelines/extensions/${name}.json`, JSON.stringify(file("_guidelines/extensions", name), null, 2) + "\n");
  commitAll(root, "the extensions");
  return root;
}
const PAD = "/** @spec none formatting only, no rule of the system */\nexport function pad(s: string) {\n  return s.padStart(4);\n}\n\nexport function raw(s: string) {\n  return s;\n}\n";

test("@spec s-chsfpkgpmfk4fft reads one change from its arguments, and accepts `--confirm` only with `status approved`", () => {
  assert.deepEqual(parseChange(["status", "approved"]), { change: { status: "approved" }, confirm: false });
  assert.deepEqual(parseChange(["status", "approved", "--confirm"]), { change: { status: "approved" }, confirm: true });
  assert.deepEqual(parseChange(["status", "draft"]), { change: { status: "draft" }, confirm: false });
  assert.deepEqual(parseChange(["strict", "on"]), { change: { strict: true }, confirm: false });
  assert.deepEqual(parseChange(["strict", "off"]), { change: { strict: false }, confirm: false });
  assert.deepEqual(parseChange(["extension", "views", "off"]), { change: { extension: "views", chosen: false }, confirm: false });
  for (const bad of [["status"], ["status", "done"], ["strict", "yes"], ["extension", "views"], ["strict", "on", "--confirm"], ["colour", "red"]]) {
    assert.throws(() => parseChange(bad), /sheriff settings/, bad.join(" "));
  }
});

test("@spec s-chsfpkgpmfk4fft prints the settings that only an owner changes and every extension that the plugin delivers", () => {
  const root = project();
  setSettings(root, (s) => (s.extensions = [{ name: "views", chosen: true, by: OWNER }]));
  assert.equal(settingsText(root), [
    "status: draft",
    "strict: off",
    "extension domains: not chosen",
    "extension recordtype: not chosen",
    "extension views: chosen",
    "",
  ].join("\n"));
});

test("@spec s-chsfpkgpmfk4fft records a change only when an owner of the specification makes it, naming that owner, and refuses a change that anyone else makes", async () => {
  const root = project();
  const refused = await changeSetting(root, { status: "draft" }, { me: "stranger@example.org" });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), /stranger@example\.org is not an owner of the specification/);
  const done = await changeSetting(root, { strict: true }, { me: OWNER });
  assert.equal(done.recorded, true, JSON.stringify(done));
  assert.deepEqual(settingsOf(root).strict, [{ on: true, by: OWNER }]);
});

test("@spec s-chsfpkgpmfk4fft records the choice of an extension only where the plugin delivers it", async () => {
  const root = project();
  const refused = await changeSetting(root, { extension: "nosuch", chosen: true }, { me: OWNER });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), /the installed SpecSheriff plugin delivers no extension "nosuch"/);
  const done = await changeSetting(root, { extension: "views", chosen: true }, { me: OWNER });
  assert.equal(done.recorded, true, JSON.stringify(done));
  assert.deepEqual(settingsOf(root).extensions, [{ name: "views", chosen: true, by: OWNER }]);
});

test("@spec s-d3nkw9b6mn98vuw appends each entry to the end of its list, and records none that leaves its setting's value as it is", async () => {
  const root = project();
  setSettings(root, (s) => (s.strict = [{ on: false, by: OWNER }]));
  const same = await changeSetting(root, { strict: false }, { me: OWNER });
  assert.equal(same.recorded, false);
  assert.match(same.note ?? "", /already off/);
  await changeSetting(root, { strict: true }, { me: OWNER });
  await changeSetting(root, { strict: false }, { me: OWNER });
  assert.deepEqual(settingsOf(root).strict, [{ on: false, by: OWNER }, { on: true, by: OWNER }, { on: false, by: OWNER }]);
  const draft = await changeSetting(root, { status: "draft" }, { me: OWNER });
  assert.equal(draft.recorded, false);
  assert.equal(settingsOf(root).approvalStatus, undefined);
});

test("@spec s-m59dqwkw2e96wne approves a specification at once where the checks before an approval find nothing", async () => {
  const root = project();
  editSpec(root, (d) => (d.nodes[0].children = d.nodes[0].children.filter((n: any) => n.sid !== sid("draft"))));
  put(root, "test/states.test.ts", `test("@spec ${sid("states")} lists the states", () => {});\n`);
  await writeLists(root);
  commitAll(root);
  const done = await changeSetting(root, { status: "approved" }, { me: OWNER });
  assert.deepEqual(done.found, []);
  assert.equal(done.recorded, true, JSON.stringify(done));
  assert.deepEqual(settingsOf(root).approvalStatus, [{ status: "approved", by: OWNER }]);
});

test("@spec s-m59dqwkw2e96wne judges the working tree as if one commit added every node, the approvals in force, all the code and the tests, and records the approval only once the owner confirms it", async () => {
  const root = project();
  editSpec(root, (d) => (d.nodes[0].children = d.nodes[0].children.filter((n: any) => n.sid !== sid("draft"))));
  put(root, "src/pad.ts", PAD);
  commitAll(root);
  const first = await changeSetting(root, { status: "approved" }, { me: OWNER });
  assert.equal(first.recorded, false);
  assert.equal(first.unconfirmed, true);
  assert.ok(first.found.some((f) => /src\/pad\.ts:6: raw carries no SpecTag that binds it/.test(f)), first.found.join("\n"));
  assert.equal(settingsOf(root).approvalStatus, undefined);
  assert.equal(git(root, "status", "--porcelain").stdout, "", "the checks change nothing in the repository");
  const confirmed = await changeSetting(root, { status: "approved" }, { me: OWNER, confirm: true });
  assert.equal(confirmed.recorded, true, JSON.stringify(confirmed));
  assert.deepEqual(settingsOf(root).approvalStatus, [{ status: "approved", by: OWNER }]);
});

test("@spec s-m59dqwkw2e96wne refuses to approve the specification while the strict flag is on and a check that the flag makes stricter would refuse, naming the command that lists what it finds", async () => {
  const root = project();
  setSettings(root, (s) => (s.strict = [{ on: true, by: OWNER }]));
  put(root, "src/pad.ts", PAD);
  commitAll(root);
  const refused = await changeSetting(root, { status: "approved" }, { me: OWNER, confirm: true });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), /sheriff untagged/);
  assert.equal(settingsOf(root).approvalStatus, undefined);
});

test("@spec s-nxgkp988mej79eg refuses to turn the strict flag on while sheriff untagged would list anything, and turns it on once nothing is unbound", async () => {
  const root = project();
  put(root, "src/pad.ts", PAD);
  const refused = await changeSetting(root, { strict: true }, { me: OWNER });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), /sheriff untagged/);
  assert.equal(settingsOf(root).strict, undefined);
  put(root, "src/pad.ts", PAD.replace("\nexport function raw", "\n/** @spec none formatting only */\nexport function raw"));
  assert.equal((await changeSetting(root, { strict: true }, { me: OWNER })).recorded, true);
});

test("@spec s-nxgkp988mej79eg refuses to turn the strict flag on while a file of the specification fails the validation against its schema, naming sheriff validate", async () => {
  const root = project();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  nodeIn(data, "open").colour = "red";
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  const refused = await changeSetting(root, { strict: true }, { me: OWNER });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), /sheriff validate\b/);
});

test("@spec s-n4ny597qdv9c9bu refuses to withdraw an extension while a node depends on it, naming the node by its file, sid and location, and withdraws it once nothing does", async () => {
  const root = project();
  setSettings(root, (s) => (s.extensions = [{ name: "views", chosen: true, by: OWNER }]));
  put(root, "specs/_guidelines/extensions/views.json", JSON.stringify(file("_guidelines/extensions", "views", node("views", { kind: "section", text: "Views.", children: [node("a view")] })), null, 2) + "\n");
  editSpec(root, (d) => {
    nodeIn(d, "draft").text = `Drawn as §${sid("a view")} says.`;
    nodeIn(d, "draft").refs = [{ type: "cites", to: sid("a view") }];
  });
  const refused = await changeSetting(root, { extension: "views", chosen: false }, { me: OWNER });
  assert.equal(refused.recorded, false);
  assert.match(refused.refused.join("\n"), new RegExp(`specs/contracts/c\\.json: ${sid("draft")} \\([^)]+\\): .*links to ${sid("a view")}`));
  editSpec(root, (d) => {
    nodeIn(d, "draft").text = "Drawn.";
    nodeIn(d, "draft").refs = [];
  });
  const done = await changeSetting(root, { extension: "views", chosen: false }, { me: OWNER });
  assert.equal(done.recorded, true, JSON.stringify(done));
  assert.deepEqual(settingsOf(root).extensions.at(-1), { name: "views", chosen: false, by: OWNER });
});

test("@spec s-n4ny597qdv9c9bu refuses to withdraw an extension while a node has a kind or a type of link that the extension's schema adds, or the project's extension of the schema relies on it", async () => {
  const root = project();
  setSettings(root, (s) => (s.extensions = [{ name: "domains", chosen: true, by: OWNER }]));
  put(root, "specs/_schema/project.schema.json", JSON.stringify({ fields: { header: { properties: { colour: { type: "string" } } } } }, null, 2) + "\n");
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  nodeIn(data, "draft").refs = [{ type: "consumes", to: sid("open") }];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  const refused = await changeSetting(root, { extension: "domains", chosen: false }, { me: OWNER });
  assert.equal(refused.recorded, false);
  const text = refused.refused.join("\n");
  assert.match(text, new RegExp(`${sid("draft")} .*a link of the type consumes`));
  assert.match(text, /specs\/_schema\/project\.schema\.json: \/fields\/header/);
});
