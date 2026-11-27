import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { approve, readApprovals } from "../../src/approvals.ts";
import { reindex, rewriteTests, writeLists } from "../../src/reindex.ts";
import { loadSchema } from "../../src/schema.ts";
import { loadSpecification, specPaths } from "../../src/spec-files.ts";
import { APPROVAL_RULE, fingerprint, LEVELS_RULE, SID, TESTS_PASS_RULE } from "../../src/model.ts";
import { ALL_EXTENSIONS, file, loc, node, OWNER, repo, sid, table, taking } from "../fixture.ts";
import { codeProject, editSpec, nodeIn, put, typedProject } from "../code-project.ts";

const read = (root: string) => Object.fromEntries(specPaths(root).map((p) => [p, readFileSync(join(root, p), "utf8")]));
const at = (root: string, name: string) => loadSpecification(root).nodes.get(sid(name))!.node;
const codeOf = (root: string, name: string) => (((at(root, name).meta ?? {}) as { code?: Array<{ file: string }> }).code ?? []).map((c) => c.file);

function bank(extra: Record<string, unknown> = {}) {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", sections: [], refs: [{ type: "consumes", to: sid("shared") }] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open", { refs: [{ type: "cites", to: sid("close") }, { type: "cites", from: sid("lend") }] }), node("close")] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "What is shared.", children: [node("term", { kind: "term", title: "account" })] })),
    ...extra,
  });
}

test("@spec s-ygg5kpcxgzq3m7w computes every node's location from where it is", () => {
  const root = bank();
  reindex(root);
  assert.equal(at(root, "header").location, "bank");
  assert.equal(at(root, "close").location, "bank/1.2");
  assert.equal(at(root, "term").location, "contracts/account");
});

test("@spec s-bpdqd9v72wg7vsz empties every incoming list and rebuilds it from the outgoing links", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "open").refs, [{ type: "cites", to: sid("close") }]);
  assert.deepEqual(at(root, "close").refs, [{ type: "cites", from: sid("open") }]);
  assert.deepEqual(at(root, "shared").refs, [{ type: "consumes", from: sid("header") }]);
});

test("@spec s-gb8s9657a65hqmv removes from sheriff.config.json the setting by which an earlier release recognized the repository where the SpecSheriff guidelines are written, and keeps every other setting in its place", () => {
  const root = taking({ "sheriff.config.json": { code: ["src/**"], writesSpecSheriffGuidelines: false, tests: [] } });
  assert.equal(readFileSync(join(root, "sheriff.config.json"), "utf8"), JSON.stringify({ extensions: ALL_EXTENSIONS, code: ["src/**"], tests: [] }, null, 2) + "\n");
});

test("@spec s-gb8s9657a65hqmv removes its sid and every link pointing at it from a node of the archive that an earlier release wrote, and builds no link pointing from it to another node", () => {
  const root = bank({
    "specs/_archive/bank.json": file("bank", "bank", { ...node("gone", { refs: [{ type: "cites", from: sid("open") }, { type: "cites", to: sid("close") }] }), location: "bank/1.3", archived: { date: "2026-10-28", reason: "Gone." } }),
  });
  reindex(root);
  const archived = JSON.parse(readFileSync(join(root, "specs", "_archive", "bank.json"), "utf8")).nodes[0];
  assert.equal(archived.sid, undefined);
  assert.deepEqual(archived.refs, [{ type: "cites", to: sid("close") }]);
  assert.deepEqual(at(root, "close").refs, [{ type: "cites", from: sid("open") }]);
});

test("@spec s-yggv9myedprnaa7 rebuilds the index in a domain's header from the domain's sections", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "header").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts." }]);
});

test("@spec s-yggv9myedprnaa7 names in a header's index the headers of the domains using a section", () => {
  const root = bank({
    "specs/loans/00-loans.json": file("loans", "00-loans", node("loans", { kind: "header", level: "core", sections: [], refs: [{ type: "consumes", to: sid("accounts") }] })),
  });
  reindex(root);
  assert.deepEqual(at(root, "header").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts.", usedBy: [sid("loans")] }]);
});

test("@spec s-f5rz6b7dhxejjts gives a sid to a node that has none, its location and sid first", () => {
  const root = bank();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.push({ kind: "TextRule", title: "new", status: "draft", text: "New.", refs: [] });
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  const added = JSON.parse(readFileSync(path, "utf8")).nodes[0].children[1];
  assert.match(added.sid, SID);
  assert.equal(added.location, loc("contracts", "1.1"));
  assert.deepEqual(Object.keys(added).slice(0, 3), ["location", "sid", "kind"]);
});

test("@spec s-5ah25f6gy99panq makes a draft an approved node no approval stands for, sections and headers left out, and names each", () => {
  const root = bank();
  approve(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].status = "approved";
  writeFileSync(path, JSON.stringify(data));
  const report = reindex(root);
  assert.equal(at(root, "term").status, "draft");
  assert.equal(at(root, "levels").status, "approved");
  assert.deepEqual(report.drafted, [sid("term")]);
});

test("@spec s-5ah25f6gy99panq keeps a node approved through a change of its owners and a move into a part with other owners", () => {
  const root = bank();
  approve(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].owners = ["new@example.org"];
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  assert.equal(at(root, "levels").status, "approved");
});

test("@spec s-9kfdycuq34beqvs writes the status of each section and domain's header from the nodes under it, after every change", () => {
  const root = bank();
  reindex(root);
  assert.equal(at(root, "accounts").status, "draft");
  assert.equal(at(root, "header").status, "draft");
  approve(root, [sid("open"), sid("close"), sid("term")], { me: OWNER });
  reindex(root);
  assert.equal(at(root, "accounts").status, "approved");
  assert.equal(at(root, "header").status, "approved");
  assert.equal(at(root, "shared").status, "approved");
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace("What close requires.", "What close requires now."));
  const report = reindex(root);
  assert.equal(at(root, "close").status, "draft");
  assert.equal(at(root, "accounts").status, "draft");
  assert.equal(at(root, "header").status, "draft");
  assert.deepEqual(report.drafted, [sid("close")]);
});

/** A project that takes the guidelines, and whose own guidelines hold a rule on the specification's approval status as an earlier release wrote it, approved by `by` unless `by` is null. */
function approvedByRule(by: string | null): string {
  const root = taking();
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  const rule = node("live", { title: "The specification is live", status: by ? "approved" : "draft", refs: [{ type: "refines", to: APPROVAL_RULE }] });
  data.nodes[0].children.push(rule);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  if (by) writeFileSync(join(root, "specs", "_approvals.jsonl"), JSON.stringify({ sid: rule.sid, fingerprint: fingerprint(rule), by }) + "\n");
  return root;
}
const settingsOf = (root: string) => JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
const archived = (root: string) => (existsSync(join(root, "specs", "_archive", "guidelines.json")) ? JSON.parse(readFileSync(join(root, "specs", "_archive", "guidelines.json"), "utf8")).nodes : []);
const projectRules = (root: string) => loadSpecification(root).nodes.get(sid("project"))!.node.children ?? [];

test("@spec s-gb8s9657a65hqmv replaces an approved rule of project.json on the specification's approval status with an entry that names the owner who last approved the rule, archives the rule, adds the draft rule on when the tests run, and reports that rule's sid", () => {
  const root = approvedByRule("boss@example.org");
  const report = reindex(root);
  assert.deepEqual(settingsOf(root).approvalStatus, [{ status: "approved", by: "boss@example.org" }]);
  assert.deepEqual(archived(root).map((n: any) => [n.title, n.archived.reason]), [["The specification is live", "Replaced by the entry in `sheriff.config.json` that records the specification's approval status"]]);
  const rules = projectRules(root);
  assert.ok(!rules.some((n) => n.sid === sid("live")));
  const added = rules.find((n) => n.title === "When the tests run")!;
  assert.deepEqual([added.text, added.status, added.refs.filter((r) => r.to).map((r) => [r.type, r.to]), (added.list as any).members], ["The tests run before every push.", "draft", [["refines", TESTS_PASS_RULE]], ["push"]]);
  assert.deepEqual(report.added, [added.sid]);
});

test("@spec s-gb8s9657a65hqmv archives a draft rule on the specification's approval status if the rule has ever been approved, deletes one that was never approved, and records no entry", () => {
  const once = approvedByRule("boss@example.org");
  const path = join(once, "specs", "_guidelines", "project.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"status": "approved"', '"status": "draft"'));
  reindex(once);
  assert.equal(settingsOf(once).approvalStatus, undefined);
  assert.deepEqual(archived(once).map((n: any) => n.archived.reason), ["The specification's approval status is recorded in `sheriff.config.json`"]);
  const never = approvedByRule(null);
  reindex(never);
  assert.deepEqual(archived(never), []);
  assert.ok(!projectRules(never).some((n) => n.sid === sid("live")));
});

test("@spec s-gb8s9657a65hqmv leaves a rule on the specification's approval status unchanged where sheriff.config.json already holds an entry for that status", () => {
  const root = approvedByRule("boss@example.org");
  const settings = settingsOf(root);
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ ...settings, approvalStatus: [{ status: "draft", by: OWNER }] }, null, 2) + "\n");
  reindex(root);
  assert.ok(projectRules(root).some((n) => n.sid === sid("live")));
  assert.deepEqual(settingsOf(root).approvalStatus, [{ status: "draft", by: OWNER }]);
});

test("@spec s-f5rz6b7dhxejjts rewrites the statuses, the owners and the confirmations an earlier release wrote, keeping every approval", () => {
  const root = bank();
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  // One owner where the list stands, as earlier releases wrote it.
  data.nodes[0] = Object.fromEntries(Object.entries(data.nodes[0]).map(([k, v]) => (k === "owners" ? ["owner", OWNER] : [k, v])));
  data.nodes[0].status = "";
  data.nodes[0].children[0].status = "checked";
  writeFileSync(path, JSON.stringify(data));
  const print = fingerprint(data.nodes[0].children[0]);
  writeFileSync(join(root, "specs", "_confirmations.jsonl"), JSON.stringify({ sid: sid("levels"), fingerprint: print, owner: OWNER }) + "\n");
  writeFileSync(join(root, "specs", "_approvals.jsonl"), JSON.stringify({ sid: sid("open"), fingerprint: "0", by: OWNER }) + "\n");
  reindex(root);
  const top = JSON.parse(readFileSync(path, "utf8")).nodes[0];
  assert.deepEqual(top.owners, [OWNER]);
  assert.equal(top.owner, undefined);
  assert.equal(Object.keys(top).indexOf("owners"), Object.keys(data.nodes[0]).indexOf("owner"));
  assert.equal(at(root, "levels").status, "approved");
  assert.ok(!existsSync(join(root, "specs", "_confirmations.jsonl")));
  // The confirmations are appended after the lines that the approvals file already holds (s-gb8s9657a65hqmv).
  assert.deepEqual(readApprovals(root), [{ sid: sid("open"), fingerprint: "0", by: OWNER }, { sid: sid("levels"), fingerprint: print, by: OWNER }]);
  assert.deepEqual(readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).sid), [sid("open"), sid("levels")]);
});

test("@spec s-bsya3febm6u64ab leaves the status of the SpecSheriff guidelines a project takes as it stands, and judges it where they are written", () => {
  const project = taking();
  reindex(project);
  assert.equal(loadSpecification(project).nodes.get(LEVELS_RULE)!.node.status, "approved");
  const core = file("_guidelines", "spec", node("core", { kind: "section", status: "approved", children: [node("core rule", { status: "approved" })] }));
  const writing = bank({ "specs/_guidelines/spec.json": core });
  reindex(writing);
  assert.equal(at(writing, "core rule").status, "draft");
});

test("@spec s-f5rz6b7dhxejjts renames what an earlier release wrote under another name, each key keeping its place", () => {
  const old = (name: string, fields: Record<string, unknown>) => {
    const { location: _, ...rest } = node(name, fields);
    return { id: "bank/9", ...rest };
  };
  const root = bank({
    "specs/bank/b.json": file("bank", "b", old("loans", { kind: "section", text: "Loans.", children: [old("lend", { rationale: "Why lend." }), old("loan", { kind: "record", title: "loan", fields: [], unknown: "refused" })] })),
    "specs/_archive/bank.json": file("bank", "bank", { ...old("gone", { rationale: "Why it went." }), archived: { date: "2026-10-28", reason: "Gone." } }),
  });
  reindex(root);
  const lend = JSON.parse(readFileSync(join(root, "specs", "bank", "b.json"), "utf8")).nodes[0].children[0];
  assert.deepEqual(Object.keys(lend), ["location", "sid", "kind", "title", "status", "text", "refs", "reason"]);
  assert.equal(lend.location, "bank/2.1");
  assert.equal(lend.reason, "Why lend.");
  assert.equal(at(root, "loan").kind, "RecordType");
  assert.deepEqual(at(root, "loan").schema, { type: "object", unevaluatedProperties: false });
  const gone = JSON.parse(readFileSync(join(root, "specs", "_archive", "bank.json"), "utf8")).nodes[0];
  assert.equal(gone.reason, "Why it went.");
  assert.equal(gone.rationale, undefined);
  assert.equal(gone.id, undefined);
  assert.equal(gone.location, "bank/9");
});

test("@spec s-f5rz6b7dhxejjts renames the kinds an earlier release wrote, where a field's values come from a kind and in the extension", () => {
  const root = bank({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("shared") }] })),
    "specs/bank/r.json": file("bank", "r", node("records", { kind: "section", text: "Records.", children: [
      node("open rule", { kind: "rule" }),
      node("event", { kind: "recordType", title: "event", unknown: "refused", fields: [{ name: "rule", type: { is: "one of", from: "kindSids", kind: "rule" }, required: true, text: "" }] }),
    ] })),
    "specs/_schema/project.schema.json": { fields: { rule: { type: "object" }, recordType: { type: "object" } } },
  });
  reindex(root);
  assert.equal(at(root, "header").kind, "header");
  assert.equal(at(root, "open rule").kind, "TextRule");
  assert.equal(at(root, "event").kind, "RecordType");
  assert.deepEqual((at(root, "event").schema as any).properties.rule.enumSource.kind, "TextRule");
  const extension = JSON.parse(readFileSync(join(root, "specs", "_schema", "project.schema.json"), "utf8"));
  assert.deepEqual(Object.keys(extension.fields), ["TextRule", "RecordType"]);
});

test("@spec s-f5brvuuu6xmkj6t keeps an approval through the renaming of the kind a field's values come from", () => {
  const event = (kind: string) => node("event", { kind: "RecordType", title: "event", schema: { type: "object", properties: { rule: { enumSource: { from: "kind", kind } } } } });
  assert.equal(fingerprint(event("TextRule")), fingerprint(event("rule")));
});

test("@spec s-f5rz6b7dhxejjts merges the values an object holds under one key and names every merge", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  const text = readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "refs": [{"type": "cites", "to": "' + sid("term") + '"}],');
  writeFileSync(path, text);
  const report = reindex(root);
  assert.deepEqual(report.merged.map((m) => `${m.file} ${m.key}`), ["specs/bank/a.json refs"]);
  assert.deepEqual(at(root, "accounts").refs, [{ type: "cites", to: sid("term") }]);
});

test("@spec s-f5rz6b7dhxejjts refuses two values it cannot merge and then writes no file", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Other.",'));
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/bank\/a\.json.*"text"/s);
  assert.deepEqual(read(root), before);
});

test("@spec s-jsqxdx47wkkj7gp run again on what it left, the reindex changes nothing", () => {
  const root = bank();
  reindex(root);
  const once = read(root);
  const again = reindex(root);
  assert.deepEqual(read(root), once);
  assert.deepEqual(again.written, []);
});

test("@spec s-ju5vcanbjph7mgh writes beside a field with enumSource, at any depth, the values gathered from its source, each with the node it comes from, in the order of those nodes, and none beside a field holding its own enum", () => {
  const root = bank({
    "specs/_schema/project.schema.json": { kinds: { job: { needsCode: false, schema: {} } } },
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "RecordType", title: "event", schema: { type: "object", properties: {
        part: { enumSource: { from: "parts" } },
        jobs: { type: "array", items: { enumSource: { from: "kind", kind: "job" } } },
        colour: { enum: ["red"] },
      } } }),
    ] })),
    "specs/bank/j.json": file("bank", "j", node("jobs", { kind: "section", text: "Jobs.", children: [node("close books", { kind: "job" }), node("pay out", { kind: "job" })] })),
  });
  reindex(root);
  const props = (at(root, "event").schema as any).properties;
  assert.deepEqual(props.part.enumSource.gathered, [{ value: "bank", sid: sid("header") }, { value: "contracts", sid: sid("shared") }]);
  assert.deepEqual(props.jobs.items.enumSource.gathered, [{ value: sid("close books"), sid: sid("close books") }, { value: sid("pay out"), sid: sid("pay out") }]);
  assert.equal(props.colour.enumSource, undefined);
});

test("@spec s-ztseyetus7np6br gathers the names of the parts of the base specification where the project has not chosen the Domains extension: the contracts section, then each top-level section of specs/base by its title", () => {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: [{ name: "recordtype", chosen: true, by: OWNER }] },
    "specs/base/b.json": file("base", "b", node("Requests", { kind: "section", text: "Requests.", children: [node("ask")] }), node("Users", { kind: "section", text: "Users.", children: [node("join")] })),
    "specs/contracts/c.json": file("contracts", "c", node("Contracts", { kind: "section", text: "What is shared.", children: [
      node("audit", { kind: "RecordType", title: "audit", schema: { type: "object", properties: { part: { enumSource: { from: "parts" } } } } }),
    ] })),
  });
  reindex(root);
  assert.deepEqual((at(root, "audit").schema as any).properties.part.enumSource.gathered, [
    { value: "Requests", sid: sid("Requests") },
    { value: "Users", sid: sid("Users") },
    { value: "contracts", sid: sid("Contracts") },
  ]);
});

test("@spec s-gb8s9657a65hqmv rewrites the keys `fields` and `unknown` that an earlier release wrote in a RecordType as its schema in JSON Schema form, in the position of the key `fields`", () => {
  const field = (name: string, type: object, required = true, text = `What ${name} is.`) => ({ name, type, required, text });
  const root = bank({
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("account", { kind: "RecordType", title: "account", fields: [field("number", { is: "text" })], unknown: "refused", identifiedBy: "number" }),
      node("statement", { kind: "RecordType", title: "statement", unknown: "kept", fields: [
        field("account", { is: "identifier of", record: sid("account") }),
        field("owner", { is: "record", record: sid("account") }, false),
        field("email", { is: "email address" }),
        field("at", { is: "instant" }),
        field("day", { is: "date" }),
        field("term", { is: "duration" }),
        field("lines", { is: "list of", of: { is: "whole number", minimum: 1 }, minItems: 1, maxItems: 9 }),
        field("rate", { is: "number", exclusiveMinimum: 0 }),
        field("open", { is: "yes/no" }),
        field("tags", { is: "map of", of: { is: "text" } }),
        field("state", { is: "one of", values: ["open", "closed"] }),
        field("part", { is: "one of", from: "domainNames" }),
        field("rule", { is: "one of", from: "kindSids", kind: "TextRule" }),
        field("extra", { is: "any value" }, false, ""),
      ] }),
      node("loan", { kind: "RecordType", title: "loan", refs: [{ type: "refines", to: sid("statement") }], answersTo: { state: "open" }, fields: [field("due", { is: "date" })], unknown: "refused" }),
    ] })),
  });
  reindex(root);
  assert.deepEqual(Object.keys(at(root, "account")), ["location", "sid", "kind", "title", "status", "text", "refs", "schema", "identifiedBy"]);
  assert.deepEqual(at(root, "account").schema, { type: "object", properties: { number: { type: "string", description: "What number is." } }, required: ["number"], unevaluatedProperties: false });
  const statement = at(root, "statement").schema as any;
  const d = (name: string) => ({ description: `What ${name} is.` });
  assert.deepEqual(statement.properties, {
    account: { identifierOf: sid("account"), ...d("account") },
    owner: { $ref: `#${sid("account")}`, ...d("owner") },
    email: { type: "string", format: "email", ...d("email") },
    at: { type: "string", format: "date-time", ...d("at") },
    day: { type: "string", format: "date", ...d("day") },
    term: { type: "string", format: "duration", ...d("term") },
    lines: { type: "array", items: { type: "integer", minimum: 1 }, minItems: 1, maxItems: 9, ...d("lines") },
    rate: { type: "number", exclusiveMinimum: 0, ...d("rate") },
    open: { type: "boolean", ...d("open") },
    tags: { type: "object", additionalProperties: { type: "string" }, ...d("tags") },
    state: { enum: ["open", "closed"], ...d("state") },
    part: { enumSource: { from: "parts", gathered: [{ value: "bank", sid: sid("header") }, { value: "contracts", sid: sid("shared") }] }, ...d("part") },
    rule: statement.properties.rule,
    extra: {},
  });
  assert.equal(statement.properties.rule.enumSource.from, "kind");
  assert.equal(statement.properties.rule.enumSource.kind, "TextRule");
  assert.deepEqual(statement.required, ["account", "email", "at", "day", "term", "lines", "rate", "open", "tags", "state", "part", "rule"]);
  assert.equal(statement.unevaluatedProperties, undefined);
  assert.equal(at(root, "statement").unknown, undefined);
  assert.deepEqual(at(root, "loan").schema, { properties: { due: { type: "string", format: "date", description: "What due is." } }, required: ["due"] });
  assert.equal(at(root, "loan").unknown, undefined);
});

test("@spec s-gb8s9657a65hqmv leaves unchanged a RecordType holding a field of type variant, a field whose values the domains add, or a field whose own list of values is empty, and names that RecordType and each such field of the three kinds", () => {
  const field = (name: string, type: object, required: unknown = true) => ({ name, type, required, text: "" });
  const root = bank({
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "RecordType", title: "event", unknown: "refused", chosenBy: ["kind"], fields: [
        field("kind", { is: "one of", from: "domains" }),
        field("colour", { is: "one of", values: [] }),
        field("details", { is: "variant", fields: [field("note", { is: "text" }, false)] }, "where it holds a value"),
        field("note", { is: "text" }),
      ] }),
    ] })),
  });
  assert.throws(() => reindex(root), (e: Error) =>
    e.message.includes(sid("event")) && ["kind", "colour", "details"].every((f) => e.message.includes(`"${f}"`)) && !e.message.includes('"note"'));
});

/** Rewrites a file of the specification as `change` leaves its data. */
const rewrite = (root: string, path: string, change: (d: any) => void) => {
  const data = JSON.parse(readFileSync(join(root, path), "utf8"));
  change(data);
  writeFileSync(join(root, path), JSON.stringify(data, null, 2) + "\n");
};

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses a file the schema refuses, naming the file and every refusal in it, and then writes no file", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => {
    delete d.nodes[0].children[0].refs;
    d.nodes[0].children[1].children = "none";
  });
  rewrite(root, "specs/contracts/c.json", (d) => delete d.nodes[0].children[0].sid);
  const before = read(root);
  assert.throws(() => reindex(root), (error: Error) => {
    assert.match(error.message, /specs\/bank\/a\.json: \/nodes\/0\/children\/0: must have required property 'refs'/);
    assert.match(error.message, /specs\/bank\/a\.json: \/nodes\/0\/children\/1\/children: must be array/);
    assert.doesNotMatch(error.message, /specs\/contracts\/c\.json/);
    return true;
  });
  assert.deepEqual(read(root), before);
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses a sid that is not one, since only a sid a node lacks is left out of the validation", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => (d.nodes[0].children[1].sid = "s-not-a-sid"));
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/bank\/a\.json: \/nodes\/0\/children\/1\/sid: must match pattern/);
  assert.deepEqual(read(root), before);
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex validates once it has changed what an earlier release wrote, and leaves out what it writes itself", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => {
    const close = d.nodes[0].children[1];
    delete close.sid;
    delete close.location;
    d.nodes[0].children[0].id = "an old address";
    delete d.nodes[0].children[0].location;
    d.nodes[0].children[0].rationale = "An old reason.";
    close.refs.push({ type: "cites", from: "not even a sid" });
  });
  rewrite(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = [{ title: "stale" }]));
  reindex(root);
  const open = at(root, "open");
  assert.equal(open.reason, "An old reason.");
  assert.equal(open.location, "bank/1.1");
  assert.ok(SID.test(loadSpecification(root).nodes.get(sid("accounts"))!.node.children![1]!.sid));
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses where the schema of an extension refuses the project's extension, naming it, and then writes no file", () => {
  const root = bank({ "specs/_schema/project.schema.json": { nodes: {} } });
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/_schema\/project\.schema\.json: .*"nodes"/);
  assert.deepEqual(read(root), before);
});

test("@spec s-f5rz6b7dhxejjts rewrites each test naming its node by a bare sid, opening its name or as its mark, and the lists naming it, naming each file", async () => {
  const root = codeProject();
  const open = sid("open");
  const ts = `test("${open} opens an account", () => {});\ntest("${open}", () => {});\nconst fixture = 'test("${open} is no test")';\ntest("@spec ${open} already", () => {});\ntest("${open}x is no sid", () => {});\n`;
  put(root, "test/open.test.ts", ts);
  put(root, "test/test_open.py", `import pytest\n\n@pytest.mark.spec("${open}")\ndef test_open():\n    pass\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${open} opens an account`, `test/open.test.ts::${open}`, "test/test_open.py::test_open"]));
  assert.deepEqual(await rewriteTests(root), ["specs/contracts/c.json", "test/open.test.ts", "test/test_open.py"]);
  const want = ts.replace(`test("${open} opens`, `test("@spec ${open} opens`).replace(`test("${open}", `, `test("@spec ${open}", `);
  assert.equal(readFileSync(join(root, "test", "open.test.ts"), "utf8"), want);
  assert.equal(readFileSync(join(root, "test", "test_open.py"), "utf8"), `import pytest\n\n@pytest.mark.spec("@spec ${open}")\ndef test_open():\n    pass\n`);
  assert.deepEqual((at(root, "open").meta as { tests: string[] }).tests, [`test/open.test.ts::@spec ${open} opens an account`, `test/open.test.ts::@spec ${open}`, "test/test_open.py::test_open"]);
  assert.deepEqual(await rewriteTests(root), [], "run again, it rewrites nothing");
});

test("@spec s-w5wg69pvvhedsws rewriting the tests that name a node by a bare sid keeps every value of a key written twice in a file it rewrites", async () => {
  const root = codeProject();
  const open = sid("open");
  put(root, "test/open.test.ts", `test("${open} opens an account", () => {});\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${open} opens an account`]));
  const path = join(root, "specs", "contracts", "c.json");
  const todo = (text: string) => `{ "todos": [{ "date": "2026-11-26", "by": "owner", "text": "${text}" }] }`;
  const text = readFileSync(path, "utf8").replace('"title": "draft",', `"title": "draft", "meta": ${todo("First.")}, "meta": ${todo("Second.")},`);
  writeFileSync(path, text);
  await rewriteTests(root);
  const nodes = JSON.parse(readFileSync(path, "utf8")).nodes[0].children;
  assert.deepEqual(nodes[0].meta.tests, [`test/open.test.ts::@spec ${open} opens an account`]);
  assert.deepEqual(nodes[1].meta.todos.map((x: { text: string }) => x.text), ["First.", "Second."]);
});

test("@spec s-gb8s9657a65hqmv removes the key `code` that earlier releases wrote in a domain's header, and rewrites each N that they wrote in a link's ratio as *", () => {
  const root = bank({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", code: "src/bank", sections: [], refs: [{ type: "consumes", to: sid("shared") }] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "What is shared.", children: [
      node("term", { kind: "term", title: "account", refs: [{ type: "term-relation", to: sid("holder"), ratio: "0..N:1..N" }] }),
      node("holder", { kind: "term", title: "holder", refs: [{ type: "term-relation", to: sid("term"), ratio: "1:0..N" }] }),
    ] })),
  });
  reindex(root);
  assert.deepEqual(Object.keys(at(root, "header")), ["location", "sid", "kind", "title", "status", "text", "refs", "level", "sections"]);
  assert.deepEqual(at(root, "term").refs.filter((r) => r.to), [{ type: "term-relation", to: sid("holder"), ratio: "0..*:1..*" }]);
  assert.deepEqual(at(root, "holder").refs.filter((r) => r.to), [{ type: "term-relation", to: sid("term"), ratio: "1:0..*" }]);
});

test("@spec s-5nf87c3e3jg9v7c collects the sids of the nodes of the kind that enumSource names in the base specification only, including a node in a cell of a TableRule, after the children of that TableRule", () => {
  const jobs = table("job table", [["job in a cell", "refused"]], { children: [node("job under the table", { kind: "job" })] });
  (jobs.groups as any)[0].rows[0].cells.check.node.kind = "job";
  const root = bank({
    "specs/_schema/project.schema.json": { kinds: { job: { needsCode: false, schema: {} } } },
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "RecordType", title: "event", schema: { type: "object", properties: { job: { enumSource: { from: "kind", kind: "job" } } } } }),
    ] })),
    "specs/bank/j.json": file("bank", "j", node("jobs", { kind: "section", text: "Jobs.", children: [jobs] })),
    "specs/tech/bank.json": file("tech", "bank", node("bank tech", { kind: "section", text: "Built.", children: [node("job in the appendix", { kind: "job" })] })),
  });
  reindex(root);
  assert.deepEqual((at(root, "event").schema as any).properties.job.enumSource.gathered.map((g: { value: string }) => g.value), [sid("job under the table"), sid("job in a cell")]);
});

test("@spec s-gb8s9657a65hqmv rewrites a list's declaredIn, in the form that earlier releases wrote, into jsonSchema or valueList, renames the key declaration in them, removes one that points to the field kinds of the project's extension, and names each file that it rewrites", () => {
  const listed = (name: string, list: object) => node(name, { list: { of: `the ${name}`, members: ["a"], ...list } });
  const root = bank({
    "specs/bank/l.json": file("bank", "l", node("lists", { kind: "section", text: "Lists.", children: [
      listed("in code", { declaredIn: { file: "src/colour.ts", declaration: "Colour" } }),
      listed("in a schema", { declaredIn: { file: "config/kinds.json", declaration: "#/kinds" } }),
      listed("of kinds", { declaredIn: { file: "specs/_schema/project.schema.json", declaration: "#/kinds" } }),
      listed("pointer", { jsonSchema: { file: "config/kinds.json", declaration: "#/sizes" } }),
      listed("symbol", { valueList: { file: "src/size.ts", declaration: "Size" } }),
    ] })),
  });
  const report = reindex(root);
  const list = (name: string) => at(root, name).list as Record<string, unknown>;
  assert.deepEqual(list("in code").valueList, { file: "src/colour.ts", symbol: "Colour" });
  assert.deepEqual(list("in a schema").jsonSchema, { file: "config/kinds.json", pointer: "#/kinds" });
  assert.deepEqual(Object.keys(list("of kinds")), ["of", "members"]);
  assert.deepEqual(list("pointer").jsonSchema, { file: "config/kinds.json", pointer: "#/sizes" });
  assert.deepEqual(list("symbol").valueList, { file: "src/size.ts", symbol: "Size" });
  assert.ok(report.rewritten.includes("specs/bank/l.json"), JSON.stringify(report.rewritten));
  assert.ok(!report.rewritten.includes("specs/bank/a.json"), JSON.stringify(report.rewritten));
  assert.deepEqual(reindex(root).rewritten, [], "a second run rewrites nothing");
});

test("@spec s-gb8s9657a65hqmv removes every link of the type supersedes, which earlier releases wrote, and the schema then refuses one", () => {
  const root = bank({
    "specs/bank/s.json": file("bank", "s", node("superseding", { kind: "section", text: "Superseding.", children: [
      node("new rule", { refs: [{ type: "supersedes", to: sid("close") }, { type: "cites", to: sid("open") }], text: `Opens (§${sid("open")}).` }),
    ] })),
  });
  const report = reindex(root);
  assert.deepEqual(at(root, "new rule").refs, [{ type: "cites", to: sid("open") }]);
  assert.ok(!at(root, "close").refs.some((r) => r.type === "supersedes"));
  assert.ok(report.rewritten.includes("specs/bank/s.json"));
  assert.notDeepEqual(loadSchema(root).check(file("bank", "s", node("again", { refs: [{ type: "supersedes", to: sid("close") }] }))), [], "a supersedes link that this release reads");
});

test("@spec s-rwqzepmrt77rv35 writes each node's meta.code and meta.tests from the SpecTags of the code and the tests, each file once, sorted, and removes a list that no SpecTag produces", async () => {
  const root = codeProject();
  put(root, "src/more.ts", `/** @spec ${sid("open")} */\nexport const more = 1;\n/** @spec ${sid("open")} */\nexport const most = 2;\n`);
  editSpec(root, (d) => {
    nodeIn(d, "draft").meta = { tests: ["test/gone.test.ts::a test nobody keeps"] };
    nodeIn(d, "states").meta = { code: [{ file: "src/states.ts", symbols: ["State"] }] };
  });
  const written = await writeLists(root);
  assert.deepEqual(written, ["specs/contracts/c.json"]);
  assert.deepEqual(at(root, "open").meta, { code: [{ file: "src/more.ts" }, { file: "src/open.ts" }], tests: [`test/open.test.ts::@spec ${sid("open")} opens an account`] });
  assert.deepEqual(at(root, "states").meta, { code: [{ file: "src/states.ts" }] });
  assert.equal(at(root, "draft").meta, undefined);
  assert.deepEqual(await writeLists(root), [], "a second run writes nothing");
});

test("@spec s-ztseyetus7np6br writes the lists of a node that is in a cell of a TableRule, and those of the rule listing a project's own check, from the check's code and tests", async () => {
  const root = codeProject();
  editSpec(root, (d) => {
    d.nodes[0].children.push(node("our checks", { list: { of: "the project's own checks", property: "name", members: [{ name: "scan" }] } }));
    d.nodes[0].children.push(table("checks table", [["row check", "refused"]]));
  });
  const config = JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
  config.checks = [{ rule: sid("our checks"), name: "scan", command: "node tools/scan.mjs", code: ["tools/scan.mjs"], tests: ["tools/scan.test.mjs"] }];
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify(config));
  put(root, "tools/scan.mjs", `/** @spec ${sid("our checks")} */\nexport const scan = 1;\n`);
  put(root, "tools/scan.test.mjs", `test("@spec ${sid("our checks")} scans", () => {});\n`);
  put(root, "src/row.ts", `/** @spec ${sid("row check")} */\nexport const row = 1;\n`);
  await writeLists(root);
  assert.deepEqual(at(root, "our checks").meta, { code: [{ file: "tools/scan.mjs" }], tests: [`tools/scan.test.mjs::@spec ${sid("our checks")} scans`] });
  assert.deepEqual(at(root, "row check").meta, { code: [{ file: "src/row.ts" }] });
});

test("@spec s-ztseyetus7np6br writes into meta.code each file bound as a whole, by an entry of the bindings file or by SpecTags at its start, and each file in which the first comment or a definition of JSON Schema binds code to the node", async () => {
  const root = codeProject();
  put(root, "src/texts.json", `{ "greeting": "hello" }\n`);
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("states")}`] }));
  put(root, "src/page.css", `/* @spec ${sid("states")} */\nbody { margin: 0; }\n`);
  put(root, "src/main.ts", `/** @spec ${sid("states")} */\n\nimport { x } from "./x.ts";\nx();\n`);
  put(root, "src/shapes.json", JSON.stringify({ $schema: "https://json-schema.org/draft/2020-12/schema", $defs: { State: { $comment: `@spec ${sid("states")}`, enum: ["open", "closed"] } } }, null, 2) + "\n");
  await writeLists(root);
  assert.deepEqual(codeOf(root, "states"), ["src/main.ts", "src/page.css", "src/shapes.json", "src/states.ts", "src/texts.json"]);
});

test("@spec s-ztseyetus7np6br takes the SpecTags of a file whose format the project's own guidelines list as allowing no comments from its entry in the bindings file, never from its start", async () => {
  const root = codeProject();
  const project = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(project, "utf8"));
  data.nodes[0].children = [...(data.nodes[0].children ?? []), node("no comments", { refs: [{ type: "refines", to: "s-kgbzk2ph9e6jfb4" }], list: { of: "the files whose format allows no comments", members: ["src/**/*.txt"] } })];
  writeFileSync(project, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("no comments")], { me: OWNER });
  put(root, "src/a.txt", `@spec ${sid("open")}\n`);
  put(root, "src/b.txt", "plain\n");
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/b.txt": [`@spec ${sid("states")}`] }));
  await writeLists(root);
  assert.ok(!codeOf(root, "open").includes("src/a.txt"));
  assert.ok(codeOf(root, "states").includes("src/b.txt"));
});

test("@spec s-tjsv2wv4j2cuapa reads a file of RuntimeChecks that the stack lists as the system's code, even where the code's glob patterns do not match it", async () => {
  const root = typedProject();
  await writeLists(root);
  assert.deepEqual(codeOf(root, "customer"), ["schemas/checks.json", "src/types.ts"]);
});
