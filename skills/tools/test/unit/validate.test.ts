import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { confirm } from "../../src/confirmations.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { LEVELS_RULE } from "../../src/model.ts";
import { validate } from "../../src/validate.ts";
import { REPO } from "../repo.ts";
import { file, node, NONE, OWNER, repo, sid, taking } from "../fixture.ts";

/** A small project that passes every check: its own guidelines, a domain, contracts, the technical appendix. */
/** The base's rule on a project's own checks, which the rule listing them refines. */
const OWN_CHECKS = "s-2fau85dfyyeq66m";

function good(): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], writesSpecSheriffGuidelines: true },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("levels rule"), node("one rule")] })),
    "specs/_guidelines/tools.json": file("_guidelines", "tools", node("tools", { kind: "section", text: "The tools.", children: [node("tool", { refs: [{ type: "implements", to: sid("one rule") }] })] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: sid("levels rule") }], list: { of: "the levels", members: ["core", "auxiliary"] } }),
    ] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("bank", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: [
      node("open", { text: "An account is opened (§" + sid("close") + ").", refs: [{ type: "cites", to: sid("close") }] }),
      node("close"),
      node("account record", { kind: "recordType", title: "account", fields: [{ name: "kind", type: { is: "one of", values: ["plain", "savings"] }, required: true, text: "" }], unknown: "refused", chosenBy: ["kind"] }),
      node("savings record", { kind: "recordType", title: "savings account", fields: [{ name: "rate", type: { is: "number" }, required: true, text: "" }], unknown: "refused", answersTo: { kind: "savings" }, refs: [{ type: "refines", to: sid("account record") }] }),
    ] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [
      node("user", { kind: "term", title: "user", refs: [{ type: "term-relation", to: sid("session"), ratio: "1:0..N" }] }),
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
  return root;
}

const run = (root: string, before?: string) => validate(root, { before: before ? loadSpecification(before) : undefined });
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

test(`@spec s-jau82aq9juv9zzh refuses a file giving one field two values`, () => {
  const root = good();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Accounts.",'));
  expectOne(root, /specs\/bank\/a\.json: .*"text".*twice/);
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

test(`@spec s-jau82aq9juv9zzh refuses two nodes sharing a sid, and two sharing a location`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push({ ...nodeIn(d, "close") }));
  expectOne(root, /sid .* held by more than one node/);
  expectOne(root, /id .* held by more than one node/);
});

test(`@spec s-jau82aq9juv9zzh refuses a location other than the one its place gives`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").location = "bank/9"));
  expectOne(root, /bank\/9.*not the one its place gives.*bank\/1\.2/);
});

test(`@spec s-jau82aq9juv9zzh refuses two term nodes naming one term, and two RecordTypes sharing a name`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "user"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "account"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /RecordType "account" .*more than one/);
});

test(`@spec s-jau82aq9juv9zzh refuses two term nodes, or two RecordTypes, whose names differ only in the case of their letters`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "User"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "ACCOUNT"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /RecordType "account" .*more than one/);
});

test(`@spec s-jau82aq9juv9zzh refuses a term node standing outside contracts`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("stray term", { kind: "term", title: "stray" })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("stray term")}.*a term node outside contracts`));
});

test(`@spec s-jau82aq9juv9zzh refuses a checked node no confirmation by its owner holds`, () => {
  const root = good();
  confirm(root, [sid("close")], { me: OWNER });
  assert.deepEqual(messages(root), []);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "open").status = "checked"));
  expectOne(root, new RegExp(`${sid("open")}.*checked.*no confirmation`));
});

test(`@spec s-jau82aq9juv9zzh leaves the confirmations of the SpecSheriff guidelines a project takes to where they are written`, () => {
  assert.deepEqual(messages(taking()), []);
});

test(`@spec s-jau82aq9juv9zzh refuses a removed node ever confirmed that is not in the archive, and one never confirmed that is`, () => {
  const before = good();
  confirm(before, [sid("close")], { me: OWNER });
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(before, root, { recursive: true });
  edit(root, "specs/bank/a.json", (d) => {
    const accounts = d.nodes[0];
    accounts.children = accounts.children.filter((n: any) => n.sid !== sid("close"));
    nodeIn(d, "open").refs = [];
    nodeIn(d, "open").text = "An account is opened.";
  });
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")}.*archive`), before);
  const never = node("never");
  mkdirSync(join(root, "specs", "_archive"));
  writeFileSync(join(root, "specs", "_archive", "bank.json"), JSON.stringify(file("bank", "bank", { ...node("close"), location: "bank/1.2", archived: { date: "2026-10-28", reason: "Gone." } }, { ...never, location: "bank/1.3", archived: { date: "2026-10-28", reason: "x" } }), null, 2) + "\n");
  const found = messages(root, before);
  assert.ok(!found.some((m) => m.includes(`${sid("close")}`) && /archive/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes(sid("never")) && /never confirmed/.test(m)), found.join("\n"));
});

test(`@spec s-bpdqd9v72wg7vsz refuses a node of the archive holding a link pointing at it`, () => {
  const root = good();
  confirm(root, [sid("close")], { me: OWNER });
  mkdirSync(join(root, "specs", "_archive"), { recursive: true });
  writeFileSync(join(root, "specs", "_archive", "bank.json"), JSON.stringify(file("bank", "bank", { ...node("close"), sid: sid("old close"), location: "bank/1.9", refs: [{ type: "cites", from: sid("open") }], archived: { date: "2026-10-28", reason: "Gone." } }), null, 2) + "\n");
  writeFileSync(join(root, "specs", "_confirmations.jsonl"), readFileSync(join(root, "specs", "_confirmations.jsonl"), "utf8").replaceAll(sid("close"), sid("old close")), { flag: "w" });
  expectOne(root, new RegExp(`specs/_archive/bank\\.json: ${sid("old close")}.*a link pointing at it`));
});

test(`@spec s-jau82aq9juv9zzh refuses a link to no node, and a citation without a link or a cites link without a citation`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "close").refs.push({ type: "constrains", to: NONE });
    nodeIn(d, "close").text = "See §" + sid("shared") + ".";
    nodeIn(d, "open").text = "An account is opened.";
  });
  expectOne(root, new RegExp(`link .* ${NONE} .*no node`));
  expectOne(root, new RegExp(`cites ${sid("shared")} .*no link`));
  expectOne(root, new RegExp(`cites link to ${sid("close")} .*does not cite`));
});

test(`@spec s-jau82aq9juv9zzh refuses a cites link beside a link of another type to the same node`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "open").refs.push({ type: "constrains", to: sid("close") }));
  reindex(root);
  expectOne(root, /cites link .* beside a link of another type/);
});

test(`@spec s-jau82aq9juv9zzh refuses a node citing another by its location`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "As §bank/1.1 says."));
  expectOne(root, /§bank\/1\.1.*location/);
});

test(`@spec s-jau82aq9juv9zzh refuses a term-relation not binding two terms, and a link of another type binding two`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").refs.push({ type: "constrains", to: sid("user") })));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").refs.push({ type: "uses", to: sid("user") })));
  reindex(root);
  expectOne(root, /constrains link binds two terms/);
  expectOne(root, /uses link .* two terms/);
});

test(`@spec s-jau82aq9juv9zzh refuses incoming links the outgoing ones do not produce`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "cites", from: sid("shared") }));
  expectOne(root, /incoming links .* outgoing/);
});

test(`@spec s-jau82aq9juv9zzh refuses a checked node setting three words or more running in capitals, two words and a quoted name left out`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "It MUST NOT EVER close; MUST NOT, REST API, `NOT CODE HERE` and \"QUOTED NAME TOO\" pass."));
  confirm(root, [sid("close")], { me: OWNER });
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /"MUST NOT EVER"/);
});

test(`@spec s-m6upmfq64kw5h4r refuses three words or more running in capitals, letters beyond ASCII included, two words left out`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "An account is never closed by DÉJÀ VU RÉSUMÉ; CAFÉ DÉCOR and NAÏVE ÉCLAT pass."));
  confirm(root, [sid("close")], { me: OWNER });
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /"DÉJÀ VU RÉSUMÉ"/);
});

test(`@spec s-jau82aq9juv9zzh refuses a checked section holding no rule`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes.push({ ...node("empty", { kind: "section", text: "Nothing." }) }));
  reindex(root);
  confirm(root, [sid("empty")], { me: OWNER });
  expectOne(root, new RegExp(`${sid("empty")}.*holds no rule`));
});

test(`@spec s-jau82aq9juv9zzh refuses a domain without a header, and a header whose index its sections do not produce`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = []));
  expectOne(root, /index .* sections/);
  const headless = good();
  mkdirSync(join(headless, "specs", "loans"));
  writeFileSync(join(headless, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("headless section", { kind: "section", text: "Lending.", children: [node("headless rule")] }))));
  reindex(headless);
  expectOne(headless, /domain loans has no header/);
});

test(`@spec s-jau82aq9juv9zzh refuses a level the project's own guidelines do not list`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].level = "top"));
  expectOne(root, /level "top".*not.*listed/);
});

test(`@spec s-jau82aq9juv9zzh refuses a consumes link that does not go from a header to a section of another domain`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "consumes", to: sid("accounts") }));
  reindex(root);
  expectOne(root, /consumes link .* from a domain's header/);
});

test(`@spec s-jau82aq9juv9zzh passes an exempts link from a node of the project's own guidelines to a rule or a section, and refuses one standing elsewhere or reaching anything else`, () => {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("by people", { text: "Carried out by people.", refs: [{ type: "exempts", to: sid("accounts") }, { type: "exempts", to: sid("node runtime") }] })));
  reindex(root);
  assert.ok(!messages(root).some((m) => /exempts/.test(m)), messages(root).join("\n"));
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "exempts", to: sid("open") }));
  edit(root, "specs/_guidelines/project.json", (d) => nodeIn(d, "by people").refs.push({ type: "exempts", to: sid("user") }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("close")} .*an exempts link must go from a node of the project's own guidelines to a rule, a node of a project's own kind or a section`));
  expectOne(root, new RegExp(`${sid("by people")} .*an exempts link must go from a node of the project's own guidelines to a rule, a node of a project's own kind or a section`));
});

test(`@spec s-jau82aq9juv9zzh refuses a section of the technical appendix standing under a name no domain has, the stack's and the technical debt's aside`, () => {
  const root = good();
  assert.ok(!messages(root).some((m) => /name of a domain/.test(m)), messages(root).join("\n"));
  writeFileSync(join(root, "specs/tech/ledger.json"), JSON.stringify(file("tech", "ledger", node("ledger tech", { kind: "section", text: "Ledger, built.", children: [node("posting", { refs: [{ type: "implements", to: sid("open") }] })] })), null, 2) + "\n");
  reindex(root);
  expectOne(root, new RegExp(`${sid("ledger tech")} .*stands under the name ledger, which no domain has`));
});

test(`@spec s-jau82aq9juv9zzh refuses domains using one another in a cycle`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("accounts") }] }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [node("lend")] }))));
  edit(root, "specs/bank/00-bank.json", (d) => d.nodes[0].refs.push({ type: "consumes", to: sid("lending") }));
  reindex(root);
  expectOne(root, /cycle/);
});

test(`@spec s-jau82aq9juv9zzh refuses a RecordType variant answering to a value its choosing field does not declare, or declaring no field of its own`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "savings record").answersTo = { kind: "gold" };
    nodeIn(d, "savings record").fields = [{ name: "kind", type: { is: "text" }, required: true, text: "" }];
  });
  expectOne(root, /"gold".*not declared/);
  expectOne(root, /declares no field of its own/);
});

test(`@spec s-jau82aq9juv9zzh refuses a RecordType variant answering to a value its choosing field declares in no list of values`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").fields[0].type = { is: "text" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*"savings" for kind.*no list of values`));
});

test(`@spec s-jau82aq9juv9zzh refuses a RecordType variant whose own fields only repeat those its RecordType's field of type variant holds`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "account record").fields.push({ name: "terms", type: { is: "variant", fields: [{ name: "rate", type: { is: "number" }, required: true, text: "" }] }, required: "where it holds a value", text: "" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*declares no field of its own`));
});

/** good(), with a RecordType of contracts whose kinds the bank declares in a list of its own, and a variant of one of them. */
function withEvents(): string {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes[0].children.push(
    node("event record", { kind: "recordType", title: "event", fields: [{ name: "kind", type: { is: "one of", from: "domains" }, required: true, text: "" }], unknown: "refused", chosenBy: ["kind"] }),
  ));
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(
    node("bank events", { list: { of: "the kinds of event the bank brings", members: ["opened", "paid"], field: "kind" }, refs: [{ type: "refines", to: sid("event record") }] }),
    node("paid event", { kind: "recordType", title: "paid event", fields: [{ name: "amount", type: { is: "number" }, required: true, text: "" }], unknown: "refused", answersTo: { kind: "paid" }, refs: [{ type: "refines", to: sid("event record") }] }),
  ));
  reindex(root);
  return root;
}

test(`@spec s-jau82aq9juv9zzh passes a value a domain declares for a RecordType of contracts, its variant standing in that domain`, () => {
  assert.deepEqual(messages(withEvents()), []);
});

test(`@spec s-jau82aq9juv9zzh refuses a value of a choosing field declared twice, or by a variant in another part than the one declaring it`, () => {
  const root = withEvents();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("more events", { list: { of: "more kinds of event", members: ["paid"], field: "kind" }, refs: [{ type: "refines", to: sid("event record") }] })));
  reindex(root);
  expectOne(root, /"paid".*declared more than once/);
  const moved = withEvents();
  let paid: any;
  edit(moved, "specs/bank/a.json", (d) => (paid = d.nodes[0].children.splice(d.nodes[0].children.findIndex((n: any) => n.sid === sid("paid event")), 1)[0]));
  edit(moved, "specs/contracts/c.json", (d) => d.nodes[0].children.push(paid));
  reindex(moved);
  expectOne(moved, new RegExp(`${sid("paid event")}.*stands in contracts.*declared in bank`));
});

test(`@spec s-jau82aq9juv9zzh refuses a list of values standing outside a domain, refining no RecordType of contracts, or naming a field whose values the domains do not add`, () => {
  const root = withEvents();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "bank events").list.field = "amount"));
  expectOne(root, new RegExp(`${sid("bank events")}.*amount.*whose values the domains do not add`));
  const own = withEvents();
  edit(own, "specs/bank/a.json", (d) => (nodeIn(d, "bank events").refs = [{ type: "refines", to: sid("account record") }]));
  reindex(own);
  expectOne(own, new RegExp(`${sid("bank events")}.*refines no RecordType described in contracts`));
});

test(`@spec s-jau82aq9juv9zzh refuses a RecordType holding two fields of type variant, the ones it inherits counted`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "account record").fields.push({ name: "terms", type: { is: "variant" }, required: "where it holds a value", text: "" });
    d.nodes[0].children.push(node("premium record", { kind: "recordType", title: "premium account", fields: [{ name: "perks", type: { is: "variant" }, required: "where it holds a value", text: "" }], unknown: "refused", chosenBy: ["kind"], refs: [{ type: "refines", to: sid("account record") }] }));
  });
  reindex(root);
  expectOne(root, new RegExp(`${sid("premium record")}.*two fields of type variant`));
});

test(`@spec s-jau82aq9juv9zzh refuses an identifier of a RecordType that names no field identifying it among its fields`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("statement record", { kind: "recordType", title: "statement", fields: [{ name: "account", type: { is: "list of", of: { is: "identifier of", record: sid("account record") } }, required: true, text: "" }], unknown: "refused" })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("statement record")}.*account.*names no field identifying it`));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").identifiedBy = "number"));
  expectOne(root, new RegExp(`${sid("account record")}.*identified by number, which is none of its fields`));
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "account record").fields.push({ name: "number", type: { is: "text" }, required: true, text: "" }));
  assert.deepEqual(messages(root), []);
});

test(`@spec s-jau82aq9juv9zzh refuses a field of type one of holding no value, in its own list or in a list of a domain`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("flag record", { kind: "recordType", title: "flag", fields: [{ name: "colours", type: { is: "list of", of: { is: "one of", values: [] } }, required: true, text: "" }], unknown: "refused" })));
  expectOne(root, /fields\/0\/type\/of\/values: must NOT have fewer than 1 items/);
  const events = withEvents();
  edit(events, "specs/bank/a.json", (d) => (d.nodes[0].children = d.nodes[0].children.filter((n: any) => n.sid !== sid("bank events"))));
  reindex(events);
  expectOne(events, new RegExp(`${sid("event record")}.*kind is of type one of with no value`));
});

test(`@spec s-jau82aq9juv9zzh refuses identifiers that lead, from one identifying field to the next, back to a RecordType already passed`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(
    node("left record", { kind: "recordType", title: "left", identifiedBy: "right", fields: [{ name: "right", type: { is: "identifier of", record: sid("right record") }, required: true, text: "" }], unknown: "refused" }),
    node("right record", { kind: "recordType", title: "right", identifiedBy: "left", fields: [{ name: "left", type: { is: "identifier of", record: sid("left record") }, required: true, text: "" }], unknown: "refused" }),
  ));
  reindex(root);
  expectOne(root, new RegExp(`${sid("left record")}.*right leads, from one identifying field to the next, back to`));
});

test(`@spec s-jau82aq9juv9zzh refuses a RecordType variant standing outside the domain whose RecordType declares the value it answers to`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "domain", level: "core", code: null, sections: [] }))));
  let savings: any;
  edit(root, "specs/bank/a.json", (d) => {
    savings = nodeIn(d, "savings record");
    d.nodes[0].children = d.nodes[0].children.filter((n: any) => n !== savings);
  });
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [savings] }))));
  reindex(root);
  expectOne(root, new RegExp(`${sid("savings record")}.*stands in loans.*declared in bank`));
});

test(`@spec s-jau82aq9juv9zzh refuses a node of the technical appendix outside the stack implementing no node of the base`, () => {
  const root = good();
  edit(root, "specs/tech/bank.json", (d) => (nodeIn(d, "store").refs = []));
  reindex(root);
  expectOne(root, new RegExp(`${sid("store")}.*implements no node of the base`));
});

test(`@spec s-jau82aq9juv9zzh refuses a rule of the appendix of the tools implementing no node of the base of the guidelines`, () => {
  const root = good();
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = []));
  reindex(root);
  expectOne(root, new RegExp(`${sid("tool")}.*implements no node of the base of the guidelines`));
});

test(`@spec s-jau82aq9juv9zzh refuses a rule of a project's own guidelines that neither refines nor implements a rule of the SpecSheriff guidelines`, () => {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("loose")));
  reindex(root);
  expectOne(root, new RegExp(`${sid("loose")}.*neither refines nor implements`));
});

test(`@spec s-jau82aq9juv9zzh refuses, outside the repository the SpecSheriff guidelines are written in, a copy of them or of their schema`, () => {
  const root = taking();
  cpSync(join(REPO, "specs", "_guidelines", "tools.json"), join(root, "specs", "_guidelines", "tools.json"));
  mkdirSync(join(root, "specs", "_schema"));
  writeFileSync(join(root, "specs", "_schema", "notes.txt"), "ours\n");
  const found = messages(root);
  for (const path of ["specs/_guidelines/tools.json", "specs/_schema/notes.txt"]) {
    assert.ok(found.some((m) => m.startsWith(`${path}: `) && /copy of the SpecSheriff guidelines/.test(m)), found.join("\n"));
  }
});

test(`@spec s-jau82aq9juv9zzh passes the SpecSheriff guidelines as this repository holds them, their confirmations aside`, () => {
  const found = validate(REPO).map((f) => `${f.where}: ${f.message}`);
  assert.deepEqual(found.filter((m) => !/no confirmation/.test(m)), []);
});

test("@spec s-vsh384ybt4w25a2 counts a node of a project's own kind as a rule of its section, and lets an exempts link reach it", () => {
  const root = good();
  writeFileSync(join(root, "specs", "_schema", "project.schema.json"), JSON.stringify({ kinds: { job: { needsCode: false, schema: {} } } }));
  edit(root, "specs/bank/a.json", (d) => d.nodes.push(node("jobs", { kind: "section", text: "Jobs.", status: "checked", children: [node("nightly", { kind: "job" })] })));
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("not coded", { refs: [{ type: "exempts", to: sid("nightly") }] })));
  reindex(root);
  confirm(root, [sid("jobs")], { me: OWNER });
  assert.equal(loadSpecification(root).nodes.get(sid("jobs"))!.node.status, "checked");
  const found = validate(root).map((f) => `${f.where}: ${f.message}`);
  assert.ok(!found.some((m) => /holds no rule|exempts link must/.test(m)), found.join("\n"));
});

test("@spec s-cdachayybfvg4na refuses a member of a list that is an object lacking the property the list names", () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("kinds listed", { list: { of: "the kinds of account", property: "name", members: [{ name: "plain" }, { rank: 2 }] } })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("kinds listed")} .*member 2 of its list .*"name"`));
});

test("@spec s-agc6fb3vx46pc23 refuses values gathered beside a field that are not what its source produces", () => {
  const root = withEvents();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "event record").fields[0].gathered = [{ value: "paid", sid: sid("bank events") }]));
  expectOne(root, new RegExp(`${sid("event record")}.*values gathered beside kind`));
});

test("@spec s-5nf87c3e3jg9v7c refuses a domain's list naming a field holding its own list, and a field naming a kind the schema does not hold", () => {
  const root = withEvents();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "event record").fields[0].type = { is: "one of", values: ["opened", "paid"] }));
  reindex(root);
  expectOne(root, new RegExp(`${sid("bank events")}.*kind.*whose values the domains do not add`));
  const kinds = good();
  edit(kinds, "specs/bank/a.json", (d) => nodeIn(d, "account record").fields.push({ name: "about", type: { is: "one of", from: "kindSids", kind: "chapter" }, required: true, text: "" }));
  reindex(kinds);
  expectOne(kinds, new RegExp(`${sid("account record")}.*about names the kind chapter, which the schema does not hold`));
});

test("@spec s-7pk89t8z6wymmj9 runs each of the project's own checks on the model, refusing or reporting as the rule listing it says, its output shown", () => {
  const withCheck = (onFailure: string) => {
    const root = good();
    edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("our checks", {
      refs: [{ type: "refines", to: OWN_CHECKS }],
      list: { of: "the project's own checks", property: "name", members: [{ name: "no plain accounts", onFailure }] },
    })));
    writeFileSync(join(root, "check.mjs"), [
      'let input = "";',
      'process.stdin.on("data", (c) => (input += c)).on("end", () => {',
      '  const plain = JSON.parse(input).nodes.filter((n) => n.title === "close");',
      '  if (plain.length) { console.log(`a node titled close: ${plain[0].sid}`); process.exit(1); }',
      '});',
    ].join("\n"));
    writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: [], tests: [], writesSpecSheriffGuidelines: true,
      checks: [{ rule: sid("our checks"), name: "no plain accounts", command: "node check.mjs", code: ["check.mjs"], tests: [] }] }));
    reindex(root);
    return root;
  };
  const refused = run(withCheck("refused")).filter((f) => /no plain accounts/.test(f.where));
  assert.deepEqual(refused.map((f) => [f.message.includes(`a node titled close: ${sid("close")}`), Boolean(f.reported)]), [[true, false]]);
  const reported = run(withCheck("reported")).filter((f) => /no plain accounts/.test(f.where));
  assert.deepEqual(reported.map((f) => Boolean(f.reported)), [true]);
});

test("@spec s-xzcw3hv4hmxz7h7 refuses an extension that is no JSON, or whose kind's schema is no JSON Schema, naming it rather than failing on it", () => {
  for (const text of ["{ not json", JSON.stringify({ kinds: { job: { needsCode: false, schema: { type: "nonsense" } } } })]) {
    const root = good();
    writeFileSync(join(root, "specs", "_schema", "project.schema.json"), text);
    expectOne(root, /^specs\/_schema\/project\.schema\.json: /);
    assert.throws(() => reindex(root), /specs\/_schema\/project\.schema\.json: /);
  }
});
