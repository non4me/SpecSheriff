import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { approve } from "../../src/approvals.ts";
import { binding } from "../../src/binding.ts";
import { guard } from "../../src/guard.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { fingerprint, LEVELS_RULE } from "../../src/model.ts";
import { validate } from "../../src/validate.ts";
import { REPO } from "../repo.ts";
import { ALL_EXTENSIONS, file, loc, node, NONE, OWNER, repo, sid, table, taking, writing } from "../fixture.ts";
import { git } from "../code-project.ts";

/** The settings of a repository in which the SpecSheriff guidelines are written and no extension of them is chosen. */
const NO_EXTENSIONS = { code: [], tests: [] };

/** A small project that passes every check: its own guidelines, a domain, contracts, the technical appendix. */
/** The base's rule on a project's own checks, which the rule listing them refines. */
const OWN_CHECKS = "s-2fau85dfyyeq66m";

function good(): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: ALL_EXTENSIONS },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("levels rule"), node("one rule")] })),
    "specs/_guidelines/tools.json": file("_guidelines", "tools", node("tools", { kind: "section", text: "The tools.", children: [node("tool", { refs: [{ type: "implements", to: sid("one rule") }] })] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: sid("levels rule") }], list: { of: "the levels", members: ["core", "auxiliary"] } }),
    ] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("bank", { kind: "header", level: "core", sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: [
      node("open", { text: "An account is opened (§" + sid("close") + ").", refs: [{ type: "cites", to: sid("close") }] }),
      node("close"),
      node("account record", { kind: "RecordType", title: "account", schema: { type: "object", properties: { kind: { enum: ["plain", "savings"] } }, required: ["kind"] }, chosenBy: ["kind"] }),
      node("savings record", { kind: "RecordType", title: "savings account", schema: { properties: { rate: { type: "number" } }, required: ["rate"] }, answersTo: { kind: "savings" }, refs: [{ type: "refines", to: sid("account record") }] }),
    ] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [
      node("user", { kind: "term", title: "user", refs: [{ type: "term-relation", to: sid("session"), ratio: "1:0..*" }] }),
      node("session", { kind: "term", title: "session" }),
    ] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [node("node runtime")] })),
    "specs/tech/bank.json": file("tech", "bank", node("bank tech", { kind: "section", text: "Bank, built.", children: [node("store", { refs: [{ type: "implements", to: sid("open") }] })] })),
  });
  // the levels rule of the fixture's base stands where the base's own rule on levels does
  const path = join(root, "specs", "_guidelines", "spec.json");
  writeFileSync(path, readFileSync(path, "utf8").replaceAll(sid("levels rule"), LEVELS_RULE));
  for (const p of ["specs/_guidelines/project.json"]) {
    writeFileSync(join(root, p), readFileSync(join(root, p), "utf8").replaceAll(sid("levels rule"), LEVELS_RULE));
  }
  reindex(root);
  // The levels are read from the last approved wording of the rule that lists them (s-t9j29hppag2nren).
  approve(root, [sid("our levels")], { me: OWNER });
  reindex(root);
  return root;
}

/** Validates the repository at the given root. Where a parent commit is given, both are read as repositories in which the guidelines are written, and the root is validated against the parent. */
const run = (root: string, before?: string) => {
  if (!before) return validate(root);
  writing(before);
  const parent = loadSpecification(before);
  writing(root);
  return validate(root, { before: parent });
};
const messages = (root: string, before?: string) => run(root, before).map((f) => `${f.where}: ${f.message}`);

function edit(root: string, path: string, change: (data: any) => void): void {
  const full = join(root, path);
  const data = JSON.parse(readFileSync(full, "utf8"));
  change(data);
  writeFileSync(full, JSON.stringify(data, null, 2) + "\n");
}
const nodeIn = (data: any, name: string): any => {
  const stack = [...data.nodes];
  while (stack.length) {
    const n = stack.pop();
    if (n.sid === sid(name)) return n;
    stack.push(...(n.children ?? []));
  }
  throw new Error(name);
};
function expectOne(root: string, pattern: RegExp, before?: string): void {
  const found = messages(root, before);
  assert.ok(found.some((m) => pattern.test(m)), `expected ${pattern} among:\n${found.join("\n")}`);
}

test(`@spec s-jau82aq9juv9zzh passes a specification that holds together`, () => {
  assert.deepEqual(messages(good()), []);
});

test(`@spec s-7zqsstgnuc772ba refuses a key written more than once in one object, naming the file, the key and the line of each value, and says that sheriff reindex merges such values`, () => {
  const root = good();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Accounts.",\n      "text": "Accounts.",'));
  const first = readFileSync(path, "utf8").split("\n").findIndex((l) => l.includes('"text": "Accounts."')) + 1;
  assert.deepEqual(messages(root), [`specs/bank/a.json: "text" is written 3 times in one object, on lines ${first}, ${first + 1}, ${first + 2}; sheriff reindex merges such values wherever it can keep all of them`]);
});

test(`@spec s-7zqsstgnuc772ba reads every file of the schema that the repository keeps, including those in the folders under specs/_schema, and names the line at which parsing fails in a file that is not valid JSON`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "_schema", "extensions"), { recursive: true });
  writeFileSync(join(root, "specs", "_schema", "extensions", "notes.schema.json"), '{\n  "title": "a",\n  "title": "b"\n}\n');
  expectOne(root, /^specs\/_schema\/extensions\/notes\.schema\.json: "title" is written 2 times in one object, on lines 2, 3/);
  writeFileSync(join(root, "specs", "_schema", "extensions", "notes.schema.json"), '{\n  "title": "a"\n  "x": 1\n}\n');
  expectOne(root, /^specs\/_schema\/extensions\/notes\.schema\.json: line 3/);
});

test(`@spec s-jau82aq9juv9zzh refuses a file that does not match its schema`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").status = "done"));
  expectOne(root, /specs\/bank\/a\.json: .*status/);
});

test("@spec s-xzcw3hv4hmxz7h7 refuses an extension the schema of an extension refuses, naming it, and takes a project's extension as no copy of the schema", () => {
  const root = good();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ nodes: {} }));
  expectOne(root, /specs\/_schema\/project\.schema\.json: .*"nodes"/);
  const project = taking({ "specs/_schema/project.schema.json": { kinds: { job: { needsCode: false, schema: {} } } } });
  assert.ok(!validate(project).some((f) => /copy/.test(f.message)), validate(project).map((f) => `${f.where}: ${f.message}`).join("\n"));
});

test(`@spec s-vke5hakwf3uyrjs refuses a sid that two nodes hold, including a node in a cell of a TableRule, naming the file and the location of each node`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["close", "refused"]])));
  reindex(root);
  const found = messages(root).filter((m) => m.includes(`sid ${sid("close")}`));
  assert.equal(found.length, 1, messages(root).join("\n"));
  assert.match(found[0]!, /specs\/bank\/a\.json \(bank\/1\.2\), specs\/contracts\/c\.json \(contracts\/1\.1\.1\)/);
  assert.ok(!messages(root).some((m) => /location .* held by more than one node/.test(m)), messages(root).join("\n"));
});

test(`@spec s-stxmhq3hgfndvn6 refuses a location other than the one computed for the node, naming the node's file and sid and both locations`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").location = "bank/9"));
  expectOne(root, new RegExp(`specs/bank/a\\.json: ${sid("close")} .*location bank/9 .* computed .*bank/1\\.2`));
});

test(`@spec s-stxmhq3hgfndvn6 checks the locations of the nodes in the files that the repository keeps, including those in the cells of a TableRule`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["checked in a cell", "refused"]])));
  reindex(root);
  const nine = loc("contracts", "9");
  edit(root, "specs/contracts/c.json", (d) => (d.nodes[0].children.at(-1).groups[0].rows[0].cells.check.node.location = nine));
  expectOne(root, new RegExp(`${sid("checked in a cell")} .*location ${nine} .* computed .*${loc("contracts", "1")}\\.1\\.1`));
});

test(`@spec s-vke5hakwf3uyrjs refuses two term nodes naming the same term, and two RecordTypes sharing a name`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "user"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "account"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /RecordType "account" .*more than one/);
});

test(`@spec s-vke5hakwf3uyrjs refuses two term nodes, or two RecordTypes, whose names differ only in the case of their letters`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "User"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "ACCOUNT"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /RecordType "account" .*more than one/);
});

test(`@spec s-yauyedny2yzvs4c refuses a term node outside the contracts section, naming its file and location, and accepts one in a domain's folder where the project has chosen the Domains extension`, () => {
  const root = good();
  edit(root, "specs/tech/bank.json", (d) => d.nodes[0].children.push(node("stray term", { kind: "term", title: "stray" })));
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("domain term", { kind: "term", title: "teller" })));
  reindex(root);
  expectOne(root, new RegExp(`specs/tech/bank\\.json: ${sid("stray term")} \\(${loc("tech", "bank", "stray")}\\): a term node outside the contracts section`));
  assert.ok(!messages(root).some((m) => m.includes(sid("domain term"))), messages(root).join("\n"));
});

test(`@spec s-yauyedny2yzvs4c refuses a term node in the folder of the base specification where the project has not chosen the Domains extension`, () => {
  const root = repo({
    "sheriff.config.json": NO_EXTENSIONS,
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [node("ours", { refs: [{ type: "refines", to: sid("base rule") }] })] })),
    "specs/base/a.json": file("base", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open"), node("base term", { kind: "term", title: "teller" })] })),
  });
  reindex(root);
  expectOne(root, new RegExp(`specs/base/a\\.json: ${sid("base term")} .*a term node outside the contracts section`));
});

test(`@spec s-76becsjwmasc2r2 refuses a term of a domain that a node outside the domain and its part of the technical appendix cites or links to, naming each such node`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("domain term", { kind: "term", title: "teller" })));
  edit(root, "specs/tech/bank.json", (d) => (nodeIn(d, "store").refs.push({ type: "refines", to: sid("domain term") })));
  reindex(root);
  assert.ok(!messages(root).some((m) => m.includes(sid("domain term"))), messages(root).join("\n"));
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "header" }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [node("lend", { text: `A loan goes through a teller (§${sid("domain term")}).`, refs: [{ type: "cites", to: sid("domain term") }] }), node("repay", { refs: [{ type: "refines", to: sid("domain term") }] })] }))));
  reindex(root);
  expectOne(root, new RegExp(`${sid("domain term")} .*cited or linked to from outside the domain bank: specs/loans/l\\.json ${sid("lend")}, specs/loans/l\\.json ${sid("repay")}`));
});

test(`@spec s-76becsjwmasc2r2 refuses a term of the contracts section that only the nodes of one domain cite or link to, naming that domain`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(node("teller term", { kind: "term", title: "teller" })));
  reindex(root);
  assert.ok(!messages(root).some((m) => m.includes(sid("teller term"))), messages(root).join("\n"));
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "refines", to: sid("teller term") }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("teller term")} .*only the domain bank cites or links to it; move it into that domain`));
});

test(`@spec s-95w92rnjuv3sst8 refuses an approved node for whose wording no approval is in force`, () => {
  const root = good();
  approve(root, [sid("close")], { me: OWNER });
  reindex(root);
  assert.deepEqual(messages(root), []);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "open").status = "approved"));
  expectOne(root, new RegExp(`${sid("open")}.*approved, but no approval stands for its wording`));
});

test(`@spec s-75ue25v6r23jkk8 refuses an approval of a sid that is held by no node in the files that the repository keeps, naming the sid and the approver's email address`, () => {
  const root = good();
  writeFileSync(join(root, "specs", "_approvals.jsonl"), readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8") + JSON.stringify({ sid: NONE, fingerprint: "0", by: OWNER }) + "\n");
  expectOne(root, new RegExp(`specs/_approvals\\.jsonl: an approval of ${NONE} by ${OWNER.replaceAll(".", "\\.")}, a sid that no node of the files that the repository keeps holds`));
});

test(`@spec s-75ue25v6r23jkk8 refuses an approval that the commit records and that was given by someone who is not one of the node's owners as the commit lists them`, () => {
  const root = good();
  const line = (name: string, by: string) => JSON.stringify({ sid: sid(name), fingerprint: fingerprint(loadSpecification(root).nodes.get(sid(name))!.node), by }) + "\n";
  writeFileSync(join(root, "specs", "_approvals.jsonl"), line("close", "stranger@example.org"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").status = "approved"));
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")}.*approved by stranger@example\\.org, who is none of its owners`));
  edit(root, "specs/_guidelines/project.json", (d) => (d.nodes[0].owners = [OWNER, "stranger@example.org"]));
  assert.ok(!messages(root).some((m) => /stranger/.test(m)), messages(root).join("\n"));
});

test(`@spec s-agc6fb3vx46pc23 refuses a section or a domain's header whose status is not the one the nodes under it produce`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (d.nodes[0].status = "approved"));
  expectOne(root, new RegExp(`${sid("accounts")}.*its status is approved, while the nodes under it make it draft`));
});

test(`@spec s-agc6fb3vx46pc23 builds the approval status of a domain's header from the header's own children and from the nodes in the cells of a TableRule`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (d.nodes[0].children = [node("open", { text: "An account is opened." })]));
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].children = [node("bank rules", { kind: "section", text: "Kept with the header.", children: [table("bank checks", [["checked by the bank", "refused"]])] })]));
  reindex(root);
  approve(root, [sid("open"), sid("bank checks")], { me: OWNER });
  // Approving the TableRule approves the node in its cell too (s-upkur92ry6332y5). Once that node's approval is withdrawn, that node keeps
  // the domain's header a draft.
  approve(root, [sid("checked by the bank")], { me: OWNER, withdraw: true });
  reindex(root);
  const spec = loadSpecification(root);
  assert.equal(spec.nodes.get(sid("bank"))!.node.status, "draft");
  approve(root, [sid("checked by the bank")], { me: OWNER });
  reindex(root);
  assert.equal(loadSpecification(root).nodes.get(sid("bank"))!.node.status, "approved");
  assert.deepEqual(messages(root), []);
});

test(`@spec s-95w92rnjuv3sst8 leaves the approvals of the SpecSheriff guidelines that a project takes to the repository where those guidelines are written`, () => {
  assert.deepEqual(messages(taking()), []);
});

/** A node of the archive, as the archive holds one: the removed node without its sid, with the reason for its removal. */
const entry = (name: string, location: string, fields: Record<string, unknown> = {}) => {
  const { sid: _, ...rest } = node(name, fields);
  return { ...rest, location, archived: { date: "2026-10-28", reason: "Gone." } };
};
const writeArchive = (root: string, ...nodes: object[]) => {
  mkdirSync(join(root, "specs", "_archive"), { recursive: true });
  writeFileSync(join(root, "specs", "_archive", "bank.json"), JSON.stringify(file("bank", "bank", ...nodes), null, 2) + "\n");
};

test(`@spec s-j4webte36gkraju refuses a removed node that was ever approved and has no entry in the archive, matched by location, kind and wording, and refuses an entry that no removal calls for`, () => {
  const before = good();
  approve(before, [sid("close")], { me: OWNER });
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(before, root, { recursive: true });
  writing(root);
  edit(root, "specs/bank/a.json", (d) => {
    const accounts = d.nodes[0];
    accounts.children = accounts.children.filter((n: any) => n.sid !== sid("close"));
    nodeIn(d, "open").refs = [];
    nodeIn(d, "open").text = "An account is opened.";
  });
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")}.*archive`), before);
  writeArchive(root, entry("close", "bank/1.2", { text: "Another wording." }));
  expectOne(root, new RegExp(`${sid("close")}.*archive`), before);
  writeArchive(root, entry("close", "bank/1.2"), entry("never", "bank/1.3"));
  const found = messages(root, before);
  assert.ok(!found.some((m) => m.includes(`${sid("close")}`) && /archive/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes("specs/_archive/bank.json") && m.includes("bank/1.3") && /no removed node/.test(m)), found.join("\n"));
});

test(`@spec s-hw84ynkvhgzcnpr validates a file of the archive against its own schema alone, refusing a node with a sid or a link pointing at it, and admitting any other property`, () => {
  const root = good();
  writeArchive(root, { ...entry("old form", "bank/1.7"), fields: [{ name: "kind", type: { is: "text" } }], unknown: "refused" });
  assert.ok(!messages(root).some((m) => m.includes("specs/_archive/bank.json")), messages(root).join("\n"));
  writeArchive(root, { ...entry("with a sid", "bank/1.8"), sid: sid("with a sid") });
  expectOne(root, /specs\/_archive\/bank\.json: \/nodes\/0/);
  writeArchive(root, { ...entry("pointed at", "bank/1.9"), refs: [{ type: "cites", from: sid("open") }] });
  expectOne(root, /specs\/_archive\/bank\.json: \/nodes\/0\/refs/);
});

test(`@spec s-j4webte36gkraju deletes a section outright, an approval given for it under an earlier release aside, and refuses one standing in the archive`, () => {
  const before = good();
  writeFileSync(join(before, "specs", "_approvals.jsonl"), JSON.stringify({ sid: sid("accounts"), fingerprint: "0", by: OWNER }) + "\n");
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(before, root, { recursive: true });
  edit(root, "specs/contracts/c.json", (d) => d.nodes.push(node("gone soon", { kind: "section", text: "Soon gone.", children: [node("gone rule")] })));
  const was = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(root, was, { recursive: true });
  writing(was);
  reindex(was);
  edit(root, "specs/contracts/c.json", (d) => (d.nodes = d.nodes.filter((n: any) => n.sid !== sid("gone soon"))));
  writing(root);
  reindex(root);
  assert.ok(!messages(root, was).some((m) => m.includes(sid("gone soon"))), messages(root, was).join("\n"));
  writeArchive(root, entry("old section", "bank/9", { kind: "section" }));
  expectOne(root, /specs\/_archive\/bank\.json: bank\/9.*no removed node/, was);
});

test(`@spec s-c4rn9fj4czk768b refuses a link whose target is not a node of the model, naming the link's type and its target, and accepts a link to a node of the SpecSheriff guidelines that a project takes`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "constrains", to: NONE }));
  expectOne(root, new RegExp(`specs/bank/a\\.json: ${sid("close")} .*its constrains link to ${NONE} names no node`));
  const project = taking();
  assert.deepEqual(validate(project).filter((f) => /names no node/.test(f.message)), []);
});

test(`@spec s-c4rn9fj4czk768b refuses a link to a nonexistent node, declared by a node that a cell of a TableRule holds`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["checked in a cell", "refused"]])));
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.at(-1).groups[0].rows[0].cells.check.node.refs.push({ type: "constrains", to: NONE }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("checked in a cell")} .*its constrains link to ${NONE} names no node`));
});

test(`@spec s-qzyacnqwvaeaps4 refuses a citation without a link, and a cites link without a citation`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "close").text = "See §" + sid("shared") + ".";
    nodeIn(d, "open").text = "An account is opened.";
  });
  expectOne(root, new RegExp(`cites ${sid("shared")} .*no link`));
  expectOne(root, new RegExp(`cites link to ${sid("close")} .*does not cite`));
});

test(`@spec s-qzyacnqwvaeaps4 refuses a citation that has no link, both in a node that a cell of a TableRule holds and in a text cell of that TableRule`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["checked in a cell", `refused, as §${sid("user")} says`]])));
  edit(root, "specs/contracts/c.json", (d) => (d.nodes[0].children.at(-1).groups[0].rows[0].cells.check.node.text = `See §${sid("session")}.`));
  reindex(root);
  expectOne(root, new RegExp(`${sid("checked in a cell")} .*cites ${sid("session")} .*no link`));
  expectOne(root, new RegExp(`${sid("shared checks")} .*cites ${sid("user")} .*no link`));
});

test(`@spec s-qzyacnqwvaeaps4 refuses a cites link beside a link of another type to the same node`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "open").refs.push({ type: "constrains", to: sid("close") }));
  reindex(root);
  expectOne(root, /cites link .* beside a link of another type/);
});

test(`@spec s-qzyacnqwvaeaps4 refuses a node citing another by its location`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "As §bank/1.1 says."));
  expectOne(root, /§bank\/1\.1.*location/);
});

test(`@spec s-pvnnr844f3y964m refuses a term-relation that does not bind two terms, and a link of another type that binds two terms, naming the link's type and target and referring the link's author to the specification's owners`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").refs.push({ type: "constrains", to: sid("user") })));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").refs.push({ type: "uses", to: sid("user") })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("session")} .*its constrains link to ${sid("user")} binds two terms; settle it with the specification's owners`));
  expectOne(root, new RegExp(`${sid("close")} .*its uses link to ${sid("user")} does not bind two terms; settle it with the specification's owners`));
});

test(`@spec s-pvnnr844f3y964m leaves a term-relation whose target is not a node to the check on a link's target`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").refs.push({ type: "term-relation", to: NONE, ratio: "1:1" })));
  const found = messages(root).filter((m) => m.includes(NONE));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /names no node/);
});

test(`@spec s-agc6fb3vx46pc23 refuses incoming links that the outgoing links do not produce`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "cites", from: sid("shared") }));
  expectOne(root, /incoming links .* outgoing/);
});

test(`@spec s-e2vdhfsndy5stq9 refuses in any node, whatever its status, three or more words in capitals in a row, and passes two such words and a quoted name`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "It MUST NOT EVER close; MUST NOT, REST API, `NOT CODE HERE` and \"QUOTED NAME TOO\" pass."));
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, new RegExp(`${sid("close")} .*its text sets "MUST NOT EVER" in capitals`));
  edit(root, "specs/bank/a.json", (d) => (d.nodes[0].text = "ACCOUNTS ARE KEPT here."));
  assert.ok(messages(root).some((m) => m.includes(sid("accounts")) && /"ACCOUNTS ARE KEPT"/.test(m)), messages(root).join("\n"));
});

test(`@spec s-e2vdhfsndy5stq9 reads each string of the members of a list, each text cell of a TableRule and each node in its cells`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("kinds listed", { list: { of: "the kinds of account", property: "name", members: ["plain", { name: "savings", note: "OPENED BY HAND" }] } })));
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["checked in a cell", "REFUSED AT ONCE"]])));
  edit(root, "specs/contracts/c.json", (d) => (d.nodes[0].children.at(-1).groups[0].rows[0].cells.check.node.text = "CHECKED EVERY TIME."));
  reindex(root);
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.ok(found.some((m) => m.includes(sid("kinds listed")) && /"OPENED BY HAND"/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes(sid("shared checks")) && /"REFUSED AT ONCE"/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes(sid("checked in a cell")) && /"CHECKED EVERY TIME"/.test(m)), found.join("\n"));
});

test(`@spec s-e2vdhfsndy5stq9 refuses three or more words in capitals in a row, including words in non-ASCII letters, and passes two such words`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "An account is never closed by DÉJÀ VU RÉSUMÉ; CAFÉ DÉCOR and NAÏVE ÉCLAT pass."));
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /"DÉJÀ VU RÉSUMÉ"/);
});

test(`@spec s-zhen42p6mnaxu7w refuses every section, whatever the section's status, that contains no rule, and the section that contains that section`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes.push({ ...node("outer", { kind: "section", text: "Nothing.", children: [node("empty", { kind: "section", text: "Nothing either." })] }) }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("empty")}.*a section that holds no rule`));
  expectOne(root, new RegExp(`${sid("outer")}.*a section that holds no rule`));
});

test(`@spec s-zhen42p6mnaxu7w counts a TableRule, a term and a node of a project's own kind as rules of their section`, () => {
  const root = good();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: false, schema: {} } } }));
  edit(root, "specs/contracts/c.json", (d) => d.nodes.push(
    node("tabled", { kind: "section", text: "A table.", children: [table("shared checks", [["checked in a cell", "refused"]])] }),
    node("jobs", { kind: "section", text: "Jobs.", children: [node("nightly", { kind: "job" })] }),
  ));
  reindex(root);
  assert.ok(!messages(root).some((m) => /holds no rule/.test(m)), messages(root).join("\n"));
});

test(`@spec s-8esbyvaj2yx5eqf refuses a domain whose files hold no header, or two headers, naming each header's file and sid`, () => {
  const headless = good();
  mkdirSync(join(headless, "specs", "loans"));
  writeFileSync(join(headless, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("headless section", { kind: "section", text: "Lending.", children: [node("headless rule")] }))));
  reindex(headless);
  expectOne(headless, /specs\/loans\/: domain loans has no header/);
  const twice = good();
  writeFileSync(join(twice, "specs", "bank", "b.json"), JSON.stringify(file("bank", "b", node("second header", { kind: "header" }))));
  reindex(twice);
  expectOne(twice, new RegExp(`specs/bank/: domain bank has more than one header: specs/bank/00-bank\\.json ${sid("bank")}, specs/bank/b\\.json ${sid("second header")}`));
});

test(`@spec s-8esbyvaj2yx5eqf checks no domain where the project has not chosen the Domains extension`, () => {
  const root = repo({
    "sheriff.config.json": NO_EXTENSIONS,
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours." , children: [node("ours", { refs: [{ type: "refines", to: sid("base rule") }] })] })),
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
    "specs/base/a.json": file("base", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open")] })),
  });
  reindex(root);
  assert.ok(!messages(root).some((m) => /header/.test(m)), messages(root).join("\n"));
});

test(`@spec s-agc6fb3vx46pc23 refuses a header whose index is not the one built from its domain's sections, and an index in the header of a domain without sections`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = []));
  expectOne(root, /index .* sections/);
  const empty = good();
  edit(empty, "specs/bank/a.json", (d) => (d.nodes = []));
  edit(empty, "specs/tech/bank.json", (d) => (d.nodes[0].children = [node("store")]));
  reindex(empty);
  assert.equal(loadSpecification(empty).nodes.get(sid("bank"))!.node.sections, undefined);
  edit(empty, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = []));
  expectOne(empty, new RegExp(`${sid("bank")} .*index .* sections`));
});

test(`@spec s-uxmkwbnpgtjzkgv takes the levels from every rule that refines the rule on levels, each in its last approved wording, and takes none from a rule that was never approved`, () => {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("more levels", { refs: [{ type: "refines", to: LEVELS_RULE }], list: { of: "more levels", members: ["edge"] } })));
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].level = "edge"));
  reindex(root);
  expectOne(root, new RegExp(`${sid("bank")} .*level "edge".*not.*listed`));
  approve(root, [sid("more levels")], { me: OWNER });
  reindex(root);
  assert.ok(!messages(root).some((m) => /level/.test(m)), messages(root).join("\n"));
  edit(root, "specs/_guidelines/project.json", (d) => (d.nodes[0].children.at(-1).list.members = ["edge", "top"]));
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].level = "top"));
  reindex(root);
  expectOne(root, new RegExp(`${sid("bank")} .*level "top".*not.*listed`));
});

test(`@spec s-uxmkwbnpgtjzkgv refuses a level the project's own guidelines do not list, and passes a header that contains no level`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].level = "top"));
  expectOne(root, new RegExp(`${sid("bank")} .*level "top".*not.*listed`));
  edit(root, "specs/bank/00-bank.json", (d) => delete d.nodes[0].level);
  assert.ok(!messages(root).some((m) => /level/.test(m)), messages(root).join("\n"));
});

test(`@spec s-p3n666zfjdrrw6a refuses a consumes link that does not go from a header to a section of another domain, naming its target, and leaves a link to a nonexistent node to the check on a link's target`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "consumes", to: sid("accounts") }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")} .*its consumes link to ${sid("accounts")} must go from a domain's header to a section of another domain`));
  edit(root, "specs/bank/00-bank.json", (d) => d.nodes[0].refs.push({ type: "consumes", to: NONE }));
  const found = messages(root).filter((m) => m.includes(NONE));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /names no node/);
});

test(`@spec s-qvgzubkrafadqgf passes an exempts link from a node of the project's own guidelines that cites a rule, a TableRule, a RecordType or a section, and refuses every other exempts link`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(table("shared checks", [["checked in a cell", "refused"]])));
  const cites = (...names: string[]) => names.map((n) => `§${sid(n)}`).join(", ");
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("by people", {
    text: `Carried out by people: ${cites("accounts", "node runtime", "shared checks", "account record")}.`,
    refs: ["accounts", "node runtime", "shared checks", "account record"].map((n) => ({ type: "exempts", to: sid(n) })),
  })));
  reindex(root);
  assert.ok(!messages(root).some((m) => /exempts/.test(m)), messages(root).join("\n"));
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "exempts", to: sid("open") }));
  edit(root, "specs/_guidelines/project.json", (d) => nodeIn(d, "by people").refs.push({ type: "exempts", to: sid("user") }, { type: "exempts", to: sid("store") }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")} .*its exempts link to ${sid("open")} is not allowed`));
  expectOne(root, new RegExp(`${sid("by people")} .*its exempts link to ${sid("user")} is not allowed`));
  expectOne(root, new RegExp(`${sid("by people")} .*its exempts link to ${sid("store")} is not allowed`));
});

test(`@spec s-qvgzubkrafadqgf passes an exempts link to a node of a project's own kind`, () => {
  const root = good();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: false, schema: {} } } }));
  edit(root, "specs/bank/a.json", (d) => d.nodes.push(node("jobs", { kind: "section", text: "Jobs.", children: [node("nightly", { kind: "job" })] })));
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("not coded", { text: `Run by the scheduler (§${sid("nightly")}).`, refs: [{ type: "exempts", to: sid("nightly") }] })));
  reindex(root);
  assert.ok(!messages(root).some((m) => /exempts/.test(m)), messages(root).join("\n"));
});

test(`@spec s-gvafe6bnstwab8b refuses each file of the technical appendix, at any depth, that is named after no domain, reporting each such file once, by its path, except the files of the stack and of the technical debt`, () => {
  const root = good();
  writeFileSync(join(root, "specs/tech/debt.json"), JSON.stringify(file("tech", "debt", node("debt", { kind: "section", text: "Debt.", children: [node("owed")] })), null, 2) + "\n");
  writeFileSync(join(root, "specs/tech/ledger.json"), JSON.stringify(file("tech", "ledger", node("ledger tech", { kind: "section", text: "Ledger, built.", children: [node("posting", { refs: [{ type: "implements", to: sid("open") }] })] }), node("ledger more", { kind: "section", text: "More.", children: [node("more posting", { refs: [{ type: "implements", to: sid("open") }] })] })), null, 2) + "\n");
  mkdirSync(join(root, "specs/tech/deep"));
  writeFileSync(join(root, "specs/tech/deep/bank.json"), JSON.stringify(file("tech", "deep/bank", node("deep tech", { kind: "section", text: "Deep.", children: [node("deep posting", { refs: [{ type: "implements", to: sid("open") }] })] })), null, 2) + "\n");
  reindex(root);
  const found = messages(root).filter((m) => /named after no domain/.test(m));
  assert.deepEqual(found, [
    "specs/tech/deep/bank.json: a file of the technical appendix named after no domain",
    "specs/tech/ledger.json: a file of the technical appendix named after no domain",
  ]);
});

test(`@spec s-gvafe6bnstwab8b leaves the names of the files of the technical appendix unchecked where the project has not chosen the Domains extension`, () => {
  const root = good();
  edit(root, "sheriff.config.json", (d) => delete d.extensions);
  // Without the Domains extension, the schema holds no domain's header, and without the RecordType extension no RecordType.
  rmSync(join(root, "specs/bank/00-bank.json"));
  edit(root, "specs/bank/a.json", (d) => (d.nodes[0].children = d.nodes[0].children.filter((n: any) => n.kind !== "RecordType")));
  writeFileSync(join(root, "specs/tech/ledger.json"), JSON.stringify(file("tech", "ledger", node("ledger tech", { kind: "section", text: "Ledger, built.", children: [node("posting", { refs: [{ type: "implements", to: sid("open") }] })] })), null, 2) + "\n");
  reindex(root);
  assert.ok(!messages(root).some((m) => /named after no domain/.test(m)), messages(root).join("\n"));
});

test(`@spec s-g7auhqvzzbkw644 refuses a section of the technical appendix that lies below the first node of a file named after a folder of the base specification and whose path of titles leads to no section of that folder`, () => {
  const root = good();
  edit(root, "specs/tech/bank.json", (d) => d.nodes[0].children.push(
    node("accounts tech", { kind: "section", title: "accounts", text: "Accounts, built.", children: [node("kept", { refs: [{ type: "implements", to: sid("open") }] })] }),
    node("validation tech", { kind: "section", title: "Validation", text: "Checked.", children: [node("checked", { refs: [{ type: "implements", to: sid("open") }] })] }),
  ));
  reindex(root);
  const found = messages(root).filter((m) => /path of titles/.test(m));
  assert.equal(found.length, 1, messages(root).join("\n"));
  assert.match(found[0]!, new RegExp(`specs/tech/bank\\.json: ${sid("validation tech")} .*"Validation".*path of titles`));
});

test(`@spec s-g7auhqvzzbkw644 matches the sections of the technical appendix with those of the base specification where the project has not chosen the Domains extension`, () => {
  const root = repo({
    "sheriff.config.json": NO_EXTENSIONS,
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [node("ours", { refs: [{ type: "refines", to: sid("base rule") }] })] })),
    "specs/base/a.json": file("base", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open"), node("intake", { kind: "section", text: "Intake.", children: [node("take")] })] })),
    "specs/tech/base.json": file("tech", "base", node("base tech", { kind: "section", text: "Built.", children: [
      node("accounts built", { kind: "section", title: "accounts", text: "Built.", children: [node("intake built", { kind: "section", title: "intake", text: "Built.", children: [node("taken", { refs: [{ type: "implements", to: sid("take") }] })] })] }),
      node("intake misplaced", { kind: "section", title: "intake", text: "Built.", children: [node("taken too", { refs: [{ type: "implements", to: sid("take") }] })] }),
    ] })),
  });
  reindex(root);
  const found = messages(root);
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, new RegExp(`${sid("intake misplaced")} .*"intake".*path of titles`));
});

test(`@spec s-vuujweu57sxsa58 accepts two domains of which one cites a rule of the other, against the direction of the citing domain's consumes link`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "header", level: "core", sections: [], refs: [{ type: "consumes", to: sid("accounts") }] }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [node("lend")] }))));
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "refines", to: sid("lend") }));
  reindex(root);
  assert.ok(!messages(root).some((m) => /cycle/.test(m)), messages(root).join("\n"));
});

test(`@spec s-vuujweu57sxsa58 refuses domains using one another in a cycle`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "header", level: "core", sections: [], refs: [{ type: "consumes", to: sid("accounts") }] }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [node("lend")] }))));
  edit(root, "specs/bank/00-bank.json", (d) => d.nodes[0].refs.push({ type: "consumes", to: sid("lending") }));
  reindex(root);
  expectOne(root, /specs\/: the domains use one another in a cycle: bank → loans → bank/);
});


/** Adds the given nodes to the first section of the file of the domain `bank`. */
const addToBank = (root: string, ...nodes: object[]) => edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(...nodes));
/** A RecordType with the given schema. */
const recordType = (name: string, title: string, schema: object, more: Record<string, unknown> = {}) => node(name, { kind: "RecordType", title, schema, ...more });

test(`@spec s-c2r9jndrjbtbsv6 refuses a RecordType variant that has no refines link to a RecordType that has fields that select a variant, naming only that condition`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").refs = []));
  const found = messages(root).filter((m) => m.includes(sid("savings record")));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /a refines link to exactly one RecordType that has fields that select a variant/);
  assert.doesNotMatch(found[0]!, /adds|answersTo|section/);
});

test(`@spec s-c2r9jndrjbtbsv6 refuses a RecordType variant declared in a section other than its RecordType's`, () => {
  const root = good();
  let savings: any;
  edit(root, "specs/bank/a.json", (d) => {
    savings = nodeIn(d, "savings record");
    d.nodes[0].children = d.nodes[0].children.filter((n: any) => n !== savings);
    d.nodes.push(node("savings", { kind: "section", text: "Savings.", children: [savings] }));
  });
  reindex(root);
  expectOne(root, new RegExp(`${sid("savings record")}.*declared in the same section as its RecordType`));
});

test(`@spec s-c2r9jndrjbtbsv6 refuses a RecordType variant that adds no field, and one that adds a field that has the same name as a field of its RecordType`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").schema = { properties: {} }));
  expectOne(root, new RegExp(`${sid("savings record")}.*adds at least one field`));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").schema = { properties: { kind: { type: "string" }, rate: { type: "number" } } }));
  expectOne(root, new RegExp(`${sid("savings record")}.*adds a field that its RecordType already has: kind`));
});

test(`@spec s-c2r9jndrjbtbsv6 refuses a RecordType variant whose answersTo names fields other than those that select a variant, or names a value that is not one of the field's values`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").answersTo = { rate: "high" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*answersTo names rate, while the fields that select a variant are kind`));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").answersTo = { kind: "gold" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*"gold" is not one of the values of kind`));
});

test(`@spec s-c2r9jndrjbtbsv6 refuses two RecordType variants of one RecordType that answer to the same values, each naming the other`, () => {
  const root = good();
  addToBank(root, recordType("bonus record", "bonus account", { properties: { bonus: { type: "number" } } }, { answersTo: { kind: "savings" }, refs: [{ type: "refines", to: sid("account record") }] }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("savings record")}.*answers to the same values as ${sid("bonus record")}`));
  expectOne(root, new RegExp(`${sid("bonus record")}.*answers to the same values as ${sid("savings record")}`));
});

test(`@spec s-c2r9jndrjbtbsv6 refuses a RecordType that has RecordType variants and holds additionalProperties at the top level of its schema`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").schema.additionalProperties = false));
  expectOne(root, new RegExp(`${sid("account record")}.*has RecordType variants and holds additionalProperties`));
});

test(`@spec s-c2r9jndrjbtbsv6 passes a RecordType variant that also refines a fragment of a format, and takes the fields that select a variant through refines links`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(
    recordType("kinded", "kinded", { type: "object", properties: { kind: { enum: ["plain", "savings"] } }, required: ["kind"] }),
    recordType("dated", "dated", { type: "object", properties: { since: { type: "string", format: "date" } } }),
  ));
  edit(root, "specs/bank/a.json", (d) => {
    const account = nodeIn(d, "account record");
    account.schema = { type: "object", properties: { owner: { type: "string" } } };
    account.refs = [{ type: "refines", to: sid("kinded") }];
    nodeIn(d, "savings record").refs.push({ type: "refines", to: sid("dated") });
  });
  reindex(root);
  assert.deepEqual(messages(root), []);
});

test(`@spec s-c2r9jndrjbtbsv6 refuses each RecordType variant of a RecordType without a chosenBy where the RecordTypes with a chosenBy that it reaches through the fewest refines links name fields that differ from one another, naming those RecordTypes`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(
    recordType("by colour", "by colour", { type: "object", properties: { colour: { enum: ["red"] } } }, { chosenBy: ["colour"] }),
    recordType("by size", "by size", { type: "object", properties: { size: { enum: ["big"] } } }, { chosenBy: ["size"] }),
  ));
  addToBank(root,
    recordType("parcel", "parcel", { type: "object", properties: { weight: { type: "number" } } }, { refs: [{ type: "refines", to: sid("by colour") }, { type: "refines", to: sid("by size") }] }),
    recordType("red parcel", "red parcel", { properties: { paint: { type: "string" } } }, { answersTo: { colour: "red" }, refs: [{ type: "refines", to: sid("parcel") }] }),
  );
  reindex(root);
  expectOne(root, new RegExp(`${sid("red parcel")}.*${sid("by colour")}.*${sid("by size")}`));
});

test(`@spec s-3anv9qcmx8pwp2w refuses a field with identifierOf, at any depth, whose RecordType names no field that identifies its data records, naming the field by its JSON Pointer`, () => {
  const root = good();
  addToBank(root, recordType("statement record", "statement", { type: "object", properties: { accounts: { type: "array", items: { identifierOf: sid("account record") } } } }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("statement record")}.*/properties/accounts/items.*names no field that identifies its data records`));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").identifiedBy = "number"));
  expectOne(root, new RegExp(`${sid("statement record")}.*/properties/accounts/items.*names no field that identifies its data records`));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").schema.properties.number = { type: "string" }));
  assert.deepEqual(messages(root), []);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "statement record").schema.properties.accounts.items.identifierOf = sid("close")));
  expectOne(root, new RegExp(`${sid("statement record")}.*/properties/accounts/items.*names no field that identifies its data records`));
});

test(`@spec s-3anv9qcmx8pwp2w refuses a field whose chain of identifiers has no end, and takes an identifying field through a refines link`, () => {
  const root = good();
  addToBank(root,
    recordType("left record", "left", { type: "object", properties: { right: { identifierOf: sid("right record") } } }, { identifiedBy: "right" }),
    recordType("right record", "right", { type: "object", properties: { left: { identifierOf: sid("left record") } } }, { identifiedBy: "left" }),
  );
  reindex(root);
  expectOne(root, new RegExp(`${sid("left record")}.*/properties/right.*the chain of identifiers that starts at it does not end in a field without identifierOf`));
  const inherited = good();
  edit(inherited, "specs/contracts/c.json", (d) => d.nodes[0].children.push(recordType("numbered", "numbered", { type: "object", properties: { number: { type: "string" } } })));
  addToBank(inherited,
    recordType("ledger", "ledger", { type: "object", properties: { owner: { type: "string" } } }, { identifiedBy: "number", refs: [{ type: "refines", to: sid("numbered") }] }),
    recordType("entry", "entry", { type: "object", properties: { ledger: { identifierOf: sid("ledger") } } }),
  );
  reindex(inherited);
  assert.deepEqual(messages(inherited), []);
});

test(`@spec s-dk3zfkbhc3v6xbp refuses a field with enum, at any depth, whose source gives it no value, or whose enumSource names a kind that the project's extension of the schema does not add`, () => {
  const root = good();
  addToBank(root, recordType("flag record", "flag", { type: "object", properties: { colours: { type: "array", items: { enum: [] } } } }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("flag record")}.*/properties/colours/items.*its source gives it no value`));
  const kinds = good();
  addToBank(kinds, recordType("about record", "about", { type: "object", properties: { about: { enumSource: { from: "kind", kind: "TextRule" } } } }));
  reindex(kinds);
  expectOne(kinds, new RegExp(`${sid("about record")}.*/properties/about.*names the kind TextRule, which the project's extension of the schema does not add`));
  writeFileSync(join(kinds, "specs/_schema/project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: false, schema: {} } } }));
  edit(kinds, "specs/bank/a.json", (d) => (nodeIn(d, "about record").schema.properties.about.enumSource.kind = "job"));
  reindex(kinds);
  expectOne(kinds, new RegExp(`${sid("about record")}.*/properties/about.*its source gives it no value`));
  addToBank(kinds, node("close books", { kind: "job" }));
  reindex(kinds);
  assert.deepEqual(messages(kinds), []);
});

test(`@spec s-agc6fb3vx46pc23 refuses values gathered beside a field that are not what its source produces`, () => {
  const root = good();
  addToBank(root, recordType("audit record", "audit", { type: "object", properties: { part: { enumSource: { from: "parts" } } } }));
  reindex(root);
  assert.deepEqual(messages(root), []);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "audit record").schema.properties.part.enumSource.gathered = [{ value: "loans", sid: sid("bank") }]));
  expectOne(root, new RegExp(`${sid("audit record")}.*values gathered beside /properties/part`));
});

test(`@spec s-yhe32vrbygjyd66 refuses a $ref within a RecordType's schema, at any depth, whose value is not # followed by the sid of a RecordType, quoting it`, () => {
  const root = good();
  addToBank(root, recordType("statement record", "statement", { type: "object", properties: { owner: { $ref: `#${sid("account record")}` }, lines: { type: "array", items: { $ref: "#/$defs/line" } } } }));
  reindex(root);
  const found = messages(root).filter((m) => m.includes(sid("statement record")));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /"#\/\$defs\/line"/);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "statement record").schema.properties.lines.items.$ref = `#${sid("close")}`));
  expectOne(root, new RegExp(`${sid("statement record")}.*"#${sid("close")}"`));
});

test(`@spec s-ezq8csd433vj6fj reports a RecordType that refers to a RecordType of another part of the system, and a fragment of a format that refers to a RecordType outside the contracts section, and lets the change pass`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "header", level: "core", sections: [] }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [
    recordType("loan record", "loan", { type: "object", properties: { account: { $ref: `#${sid("account record")}` } } }),
  ] }))));
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(
    recordType("address", "address", { type: "object", properties: { street: { type: "string" } } }),
    recordType("postal", "postal", { type: "object", properties: { owner: { $ref: `#${sid("account record")}` } } }),
  ));
  addToBank(root, recordType("branch record", "branch", { type: "object", properties: { where: { $ref: `#${sid("address")}` }, kind: { $ref: `#${sid("account record")}` } } }));
  reindex(root);
  const found = run(root);
  const reported = found.filter((f) => f.reported).map((f) => `${f.where}: ${f.message}`);
  assert.ok(reported.some((m) => m.includes(sid("loan record")) && m.includes(sid("account record"))), reported.join("\n"));
  assert.ok(reported.some((m) => m.includes(sid("postal")) && m.includes(sid("account record"))), reported.join("\n"));
  assert.ok(!reported.some((m) => m.includes(sid("branch record"))), reported.join("\n"));
  assert.deepEqual(found.filter((f) => !f.reported).map((f) => f.message), []);
});

test(`@spec s-ezq8csd433vj6fj where the project has not chosen the Domains extension, reports a reference between RecordTypes of two sections of specs/base whose locations are base/ followed by a single number`, () => {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: [{ name: "recordtype", chosen: true, by: OWNER }] },
    "specs/base/b.json": file("base", "b",
      node("requests", { kind: "section", text: "Requests.", children: [recordType("request", "request", { type: "object", properties: { by: { $ref: `#${sid("member")}` } } })] }),
      node("users", { kind: "section", text: "Users.", children: [recordType("member", "member", { type: "object", properties: { name: { type: "string" } } })] }),
    ),
  });
  reindex(root);
  const reported = run(root).filter((f) => f.reported).map((f) => `${f.where}: ${f.message}`);
  assert.ok(reported.some((m) => m.includes(sid("request")) && m.includes(sid("member"))), reported.join("\n"));
});

test(`@spec s-yprj7d6tnvauggr refuses a node of the technical appendix that implements no node of the base specification and is outside the stack and the technical debt, and accepts one that implements a section`, () => {
  const root = good();
  edit(root, "specs/tech/bank.json", (d) => (nodeIn(d, "store").refs = []));
  writeFileSync(join(root, "specs/tech/debt.json"), JSON.stringify(file("tech", "debt", node("debt", { kind: "section", text: "Debt.", children: [node("owed")] })), null, 2) + "\n");
  reindex(root);
  expectOne(root, new RegExp(`${sid("store")}.*a node of the technical appendix that implements no node of the base specification`));
  assert.ok(!messages(root).some((m) => m.includes(sid("owed"))), messages(root).join("\n"));
  edit(root, "specs/tech/bank.json", (d) => (nodeIn(d, "store").refs = [{ type: "implements", to: sid("accounts") }]));
  reindex(root);
  assert.ok(!messages(root).some((m) => m.includes(sid("store"))), messages(root).join("\n"));
});

test(`@spec s-yprj7d6tnvauggr refuses a rule of the appendix of the tools that implements no rule of the SpecSheriff guidelines or of an extension of them; a section does not count`, () => {
  const root = good();
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = []));
  reindex(root);
  expectOne(root, new RegExp(`${sid("tool")}.*a rule of the appendix of the tools that implements no rule of the SpecSheriff guidelines or of an extension of them`));
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = [{ type: "implements", to: sid("base") }]));
  reindex(root);
  expectOne(root, new RegExp(`${sid("tool")}.*implements no rule of the SpecSheriff guidelines`));
});

test(`@spec s-75r4pg4wdqu3gw5 refuses each link that a rule of the SpecSheriff guidelines declares to a node of an extension of the guidelines, naming the rule, the link's type and its target`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "_guidelines", "extensions"), { recursive: true });
  writeFileSync(join(root, "specs", "_guidelines", "extensions", "views.json"), JSON.stringify(file("_guidelines/extensions", "views", node("views", { kind: "section", text: "Views.", children: [node("a view")] })), null, 2) + "\n");
  edit(root, "specs/_guidelines/spec.json", (d) => (nodeIn(d, "one rule").refs = [{ type: "refines", to: sid("a view") }]));
  reindex(root);
  expectOne(root, new RegExp(`specs/_guidelines/spec\\.json: ${sid("one rule")} \\([^)]*\\): declares a link of the type refines to ${sid("a view")}, a node of the extension views of the guidelines`));
  edit(root, "specs/_guidelines/spec.json", (d) => (nodeIn(d, "one rule").refs = []));
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = [{ type: "implements", to: sid("a view") }]));
  reindex(root);
  assert.ok(!messages(root).some((m) => m.includes("a node of the extension")), messages(root).join("\n"));
});

test(`@spec s-yprj7d6tnvauggr accepts a rule of the appendix of the tools that implements a node of an extension of the guidelines, and reads no file of an extension as the project's own guidelines`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "_guidelines", "extensions"), { recursive: true });
  writeFileSync(join(root, "specs", "_guidelines", "extensions", "views.json"), JSON.stringify(file("_guidelines/extensions", "views", node("views", { kind: "section", text: "Views.", children: [node("a view")] })), null, 2) + "\n");
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = [{ type: "implements", to: sid("a view") }]));
  reindex(root);
  const found = messages(root);
  assert.ok(!found.some((m) => m.includes(sid("tool")) || m.includes(sid("a view"))), found.join("\n"));
});

test(`@spec s-yprj7d6tnvauggr refuses a rule of a project's own guidelines that refines no rule of the SpecSheriff guidelines or of an extension the project has chosen; an implements link does not count`, () => {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("loose"), node("implementing", { refs: [{ type: "implements", to: sid("one rule") }] }), node("refining tools", { refs: [{ type: "refines", to: sid("tool") }] })));
  reindex(root);
  for (const name of ["loose", "implementing", "refining tools"]) {
    expectOne(root, new RegExp(`${sid(name)}.*a rule of the project's own guidelines that refines no rule of the SpecSheriff guidelines or of an extension the project has chosen`));
  }
});

test(`@spec s-yprj7d6tnvauggr accepts a rule of a project's own guidelines that refines a rule of an extension, only where the project has chosen that extension`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "_guidelines", "extensions"), { recursive: true });
  writeFileSync(join(root, "specs", "_guidelines", "extensions", "views.json"), JSON.stringify(file("_guidelines/extensions", "views", node("views", { kind: "section", text: "Views.", children: [node("a view")] })), null, 2) + "\n");
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("our view", { refs: [{ type: "refines", to: sid("a view") }] })));
  reindex(root);
  assert.ok(!messages(root).some((m) => m.includes(sid("our view"))), messages(root).join("\n"));
  edit(root, "sheriff.config.json", (d) => d.extensions.push({ name: "views", chosen: false, by: OWNER }));
  expectOne(root, new RegExp(`${sid("our view")}.*refines no rule of the SpecSheriff guidelines or of an extension the project has chosen`));
});

test(`@spec s-6bmnsbskg6en4nf refuses, outside the repository where the SpecSheriff guidelines are written, each copy of a file that the plugin delivers, and runs no other check while any such copy is kept`, () => {
  const root = taking();
  cpSync(join(REPO, "specs", "_guidelines", "tools.json"), join(root, "specs", "_guidelines", "tools.json"));
  mkdirSync(join(root, "specs", "_guidelines", "extensions"), { recursive: true });
  cpSync(join(REPO, "specs", "_guidelines", "extensions", "views.json"), join(root, "specs", "_guidelines", "extensions", "views.json"));
  mkdirSync(join(root, "specs", "_schema", "extensions"), { recursive: true });
  writeFileSync(join(root, "specs", "_schema", "notes.txt"), "ours\n");
  writeFileSync(join(root, "specs", "_schema", "extensions", "x.schema.json"), "{}\n");
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), "{}\n");
  edit(root, "specs/_guidelines/project.json", (d) => (d.nodes[0].children[0].location = "elsewhere"));
  assert.deepEqual(messages(root), ["specs/_guidelines/extensions/views.json", "specs/_guidelines/tools.json", "specs/_schema/extensions/x.schema.json", "specs/_schema/notes.txt"]
    .map((path) => `${path}: a copy of a file that the SpecSheriff plugin delivers, which the SpecSheriff tools read from the plugin`));
});

test(`@spec s-jau82aq9juv9zzh passes the SpecSheriff guidelines as this repository holds them, their approvals aside`, () => {
  writing(REPO);
  const found = validate(REPO).map((f) => `${f.where}: ${f.message}`);
  assert.deepEqual(found.filter((m) => !/no approval stands/.test(m)), []);
});

test("@spec s-vsh384ybt4w25a2 counts a node of a project's own kind as a rule of its section, and lets an exempts link reach it", () => {
  const root = good();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: false, schema: {} } } }));
  edit(root, "specs/bank/a.json", (d) => d.nodes.push(node("jobs", { kind: "section", text: "Jobs.", children: [node("nightly", { kind: "job" })] })));
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("not coded", { refs: [{ type: "exempts", to: sid("nightly") }] })));
  reindex(root);
  approve(root, [sid("nightly")], { me: OWNER });
  reindex(root);
  assert.equal(loadSpecification(root).nodes.get(sid("jobs"))!.node.status, "approved");
  const found = validate(root).map((f) => `${f.where}: ${f.message}`);
  assert.ok(!found.some((m) => /holds no rule|exempts link must/.test(m)), found.join("\n"));
});

test("@spec s-cdachayybfvg4na refuses a member of a list that is an object lacking the property the list names", () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("kinds listed", { list: { of: "the kinds of account", property: "name", members: [{ name: "plain" }, { rank: 2 }] } })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("kinds listed")} .*member 2 of its list .*"name"`));
});


/**
 * A project whose own guidelines list the check "no plain accounts" as the given member, with the rule approved unless
 * the caller asks otherwise. The check fails where a node is titled "close", and prints that node's sid and the approval status and the strict flag of the model
 * that it receives.
 */
function withCheck(member: unknown, { approved = true, config = {} as Record<string, unknown> } = {}): string {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("our checks", {
    refs: [{ type: "refines", to: OWN_CHECKS }],
    list: { of: "the project's own checks", ...(typeof member === "object" ? { property: "name" } : {}), members: [member] },
  })));
  writeFileSync(join(root, "check.mjs"), [
    'let input = "";',
    'process.stdin.on("data", (c) => (input += c)).on("end", () => {',
    '  const model = JSON.parse(input);',
    '  const plain = model.nodes.filter((n) => n.title === "close");',
    '  if (plain.length) { console.log(`a node titled close: ${plain[0].sid}; ${model.approvalStatus}; strict ${model.strict}`); process.exit(1); }',
    '});',
  ].join("\n"));
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: [], tests: [], writesSpecSheriffGuidelines: true, extensions: ALL_EXTENSIONS,
    checks: [{ rule: sid("our checks"), name: "no plain accounts", command: "node check.mjs", code: ["check.mjs"], tests: [] }], ...config }));
  reindex(root);
  if (approved) {
    approve(root, [sid("our checks")], { me: OWNER });
    reindex(root);
  }
  return root;
}
const checkFindings = (root: string, strict = false) => validate(root, { strict }).filter((f) => /no plain accounts/.test(f.where));

test("@spec s-7pk89t8z6wymmj9 runs each of the project's own checks on the model, refusing or reporting as the rule listing it says, its output shown", () => {
  const refused = checkFindings(withCheck({ name: "no plain accounts", onFailure: "refused" }));
  assert.deepEqual(refused.map((f) => [f.message.includes(`a node titled close: ${sid("close")}`), Boolean(f.reported)]), [[true, false]]);
  const reported = checkFindings(withCheck({ name: "no plain accounts", onFailure: "reported" }));
  assert.deepEqual(reported.map((f) => Boolean(f.reported)), [true]);
});

test("@spec s-7pk89t8z6wymmj9 reads the rule that lists a check in the rule's last approved wording, and refuses a check that this wording does not list", () => {
  const never = checkFindings(withCheck({ name: "no plain accounts" }, { approved: false }));
  assert.deepEqual(never.map((f) => f.message), [`the last approved wording of the rule ${sid("our checks")} does not list the check`]);
  const root = withCheck({ name: "other check" });
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.at(-1).list.members.push({ name: "no plain accounts" }));
  reindex(root);
  assert.deepEqual(checkFindings(root).map((f) => f.message), [`the last approved wording of the rule ${sid("our checks")} does not list the check`]);
});

test("@spec s-7pk89t8z6wymmj9 takes a list member that is a string as the name of the check", () => {
  const found = checkFindings(withCheck("no plain accounts"));
  assert.equal(found.length, 1, found.map((f) => f.message).join("\n"));
  assert.match(found[0]!.message, /a node titled close/);
});

test("@spec s-7pk89t8z6wymmj9 runs the project's own checks after the check for keys written more than once and the validation against the schema have passed, and before the other checks", () => {
  const root = withCheck({ name: "no plain accounts" });
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "open").location = "bank/9"));
  const found = run(root).map((f) => f.where);
  const check = found.findIndex((w) => /no plain accounts/.test(w));
  const location = found.findIndex((w) => w.includes(sid("open")));
  assert.ok(check >= 0 && location > check, found.join("\n"));
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Accounts.",'));
  assert.deepEqual(checkFindings(root), []);
});

test("@spec s-7pk89t8z6wymmj9 reads reportedUnlessStrict as reported while the strict flag is off, and as refused while the flag is on or sheriff validate runs with --strict; the option --strict gives the check a model in which the specification is approved and the flag is on", () => {
  const member = { name: "no plain accounts", onFailure: "reportedUnlessStrict" };
  const off = checkFindings(withCheck(member));
  assert.deepEqual(off.map((f) => [Boolean(f.reported), /; draft; strict false$/.test(f.message)]), [[true, true]]);
  const on = checkFindings(withCheck(member, { config: { strict: [{ on: true, by: OWNER }] } }));
  assert.deepEqual(on.map((f) => [Boolean(f.reported), /strict true$/.test(f.message)]), [[false, true]]);
  const strict = checkFindings(withCheck(member), true);
  assert.deepEqual(strict.map((f) => [Boolean(f.reported), /; approved; strict true$/.test(f.message)]), [[false, true]]);
});

test("@spec s-vj67ztqkuhxbv7s refuses a project's own check that adds, changes or removes a file that git does not ignore, naming the check and each file", () => {
  const root = withCheck({ name: "no plain accounts", onFailure: "reported" });
  writeFileSync(join(root, ".gitignore"), "ignored.txt\n");
  writeFileSync(join(root, "kept.txt"), "kept\n");
  git(root, "init", "-q");
  writeFileSync(join(root, "check.mjs"), [
    'import { writeFileSync, rmSync } from "node:fs";',
    'writeFileSync("made.txt", "made\\n"); writeFileSync("ignored.txt", "ignored\\n"); rmSync("kept.txt");',
  ].join("\n"));
  const found = checkFindings(root);
  assert.deepEqual(found.map((f) => [f.message, Boolean(f.reported)]), [["the check changed files it may not change: kept.txt, made.txt", false]]);
});

test("@spec s-xzcw3hv4hmxz7h7 refuses an extension that is no JSON, or whose kind's schema is no JSON Schema, naming it rather than failing on it", () => {
  for (const text of ["{ not json", JSON.stringify({ kinds: { job: { needsCode: false, schema: { type: "nonsense" } } } })]) {
    const root = good();
    writeFileSync(join(root, "specs", "_schema", "project.schema.json"), text);
    expectOne(root, /^specs\/_schema\/project\.schema\.json: /);
    assert.throws(() => reindex(root), /specs\/_schema\/project\.schema\.json: /);
  }
});

test("@spec s-mhsb6fjsq5xn6c9 sheriff validate, sheriff binding, sheriff reindex and sheriff guard refuse to run where the plugin delivers no file for a chosen extension, naming the extension and the version of the SpecSheriff tools, and sheriff reindex writes nothing", async () => {
  const version = JSON.parse(readFileSync(join(REPO, "skills", "tools", "package.json"), "utf8")).version as string;
  const missing = (text: string) => text.includes('"audit"') && text.includes(version) && !text.includes('"domains"');
  const contents = (root: string) =>
    readdirSync(root, { recursive: true })
      .map(String)
      .filter((p) => statSync(join(root, p)).isFile())
      .sort()
      .map((p) => [p, readFileSync(join(root, p), "utf8")] as const);
  for (const writes of [true, false]) {
    const root = repo({ "sheriff.config.json": { code: [], tests: [], extensions: [...ALL_EXTENSIONS, { name: "audit", chosen: true, by: OWNER }] } }, { writes });
    if (writes) rmSync(join(root, "specs", "_guidelines", "extensions", "audit.json"));
    else rmSync(join(root, "specs", "_schema"), { recursive: true });
    const where = writes ? "where the SpecSheriff guidelines are written" : "in a project";
    assert.ok(validate(root).some((f) => missing(f.message)), `sheriff validate, ${where}`);
    assert.ok((await binding(root)).some((f) => missing(f.message)), `sheriff binding, ${where}`);
    const before = contents(root);
    assert.throws(() => reindex(root), (e: Error) => missing(e.message), `sheriff reindex, ${where}`);
    assert.deepEqual(contents(root), before, `sheriff reindex writes nothing, ${where}`);
    const refused = await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "notes.md"), content: "x\n" } });
    assert.ok(refused && missing(refused), `sheriff guard, ${where}`);
  }
});

test(`@spec s-68zhvb5vfprznmd refuses a link whose ratio holds a range whose lower bound is greater than its upper bound, naming the link's target and quoting the ratio, and compares the bounds as numbers`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "user").refs = [{ type: "term-relation", to: sid("session"), ratio: "1:3..1" }]));
  reindex(root);
  expectOne(root, new RegExp(`${sid("user")} .*${sid("session")}.*a range whose lower bound is greater than its upper bound: "1:3\\.\\.1"`));
  for (const ratio of ["1:9..10", "1:5..*", "2..2:0..1"]) {
    edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "user").refs[0].ratio = ratio));
    reindex(root);
    assert.deepEqual(messages(root), [], ratio);
  }
});
