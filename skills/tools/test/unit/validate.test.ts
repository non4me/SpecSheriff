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
import { file, node, OWNER, repo, sid, taking } from "../fixture.ts";

/** A small project that passes every check: its own guidelines, a domain, contracts, the technical appendix. */
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
      node("account record", { kind: "record", title: "account", fields: [{ name: "kind", type: { is: "one of", values: ["plain", "savings"] }, required: true, text: "" }], unknown: "refused", chosenBy: ["kind"] }),
      node("savings record", { kind: "record", title: "savings account", fields: [{ name: "rate", type: { is: "number" }, required: true, text: "" }], unknown: "refused", answersTo: { kind: "savings" }, refs: [{ type: "refines", to: sid("account record") }] }),
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

test(`s-jau82aq9juv9zzh passes a specification that holds together`, () => {
  assert.deepEqual(messages(good()), []);
});

test(`s-jau82aq9juv9zzh refuses a file giving one field two values`, () => {
  const root = good();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Accounts.",'));
  expectOne(root, /specs\/bank\/a\.json: .*"text".*twice/);
});

test(`s-jau82aq9juv9zzh refuses a file that does not match its schema`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").status = "done"));
  expectOne(root, /specs\/bank\/a\.json: .*status/);
});

test(`s-jau82aq9juv9zzh refuses two nodes sharing a sid, and two sharing an id`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push({ ...nodeIn(d, "close") }));
  expectOne(root, /sid .* held by more than one node/);
  expectOne(root, /id .* held by more than one node/);
});

test(`s-jau82aq9juv9zzh refuses an id other than the address its place gives`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").id = "bank/9"));
  expectOne(root, /bank\/9.*address.*bank\/1\.2/);
});

test(`s-jau82aq9juv9zzh refuses two term nodes naming one term, and two data record nodes sharing a name`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "user"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "account"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /record "account" .*more than one/);
});

test(`s-jau82aq9juv9zzh refuses two term nodes, or two data record nodes, whose names differ only in the case of their letters`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").title = "User"));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "savings record").title = "ACCOUNT"));
  expectOne(root, /term "user" .*more than one/);
  expectOne(root, /record "account" .*more than one/);
});

test(`s-jau82aq9juv9zzh refuses a term node standing outside contracts`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => d.nodes[0].children.push(node("stray term", { kind: "term", title: "stray" })));
  reindex(root);
  expectOne(root, new RegExp(`${sid("stray term")}.*a term node outside contracts`));
});

test(`s-jau82aq9juv9zzh refuses a checked node no confirmation by its owner holds`, () => {
  const root = good();
  confirm(root, [sid("close")], { me: OWNER });
  assert.deepEqual(messages(root), []);
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "open").status = "checked"));
  expectOne(root, new RegExp(`${sid("open")}.*checked.*no confirmation`));
});

test(`s-jau82aq9juv9zzh leaves the confirmations of the SpecSheriff guidelines a project takes to where they are written`, () => {
  assert.deepEqual(messages(taking()), []);
});

test(`s-jau82aq9juv9zzh refuses a removed node ever confirmed that is not in the archive, and one never confirmed that is`, () => {
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
  writeFileSync(join(root, "specs", "_archive", "bank.json"), JSON.stringify(file("bank", "bank", { ...node("close"), id: "bank/1.2", archived: { date: "2026-10-28", reason: "Gone." } }, { ...never, id: "bank/1.3", archived: { date: "2026-10-28", reason: "x" } }), null, 2) + "\n");
  const found = messages(root, before);
  assert.ok(!found.some((m) => m.includes(`${sid("close")}`) && /archive/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes(sid("never")) && /never confirmed/.test(m)), found.join("\n"));
});

test(`s-jau82aq9juv9zzh refuses a link to no node, and a citation without a link or a cites link without a citation`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "close").refs.push({ type: "constrains", to: "s-aaaaaaaaaaaaaab" });
    nodeIn(d, "close").text = "See §" + sid("shared") + ".";
    nodeIn(d, "open").text = "An account is opened.";
  });
  expectOne(root, /link .* s-aaaaaaaaaaaaaab .*no node/);
  expectOne(root, new RegExp(`cites ${sid("shared")} .*no link`));
  expectOne(root, new RegExp(`cites link to ${sid("close")} .*does not cite`));
});

test(`s-jau82aq9juv9zzh refuses a cites link beside a link of another type to the same node`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "open").refs.push({ type: "constrains", to: sid("close") }));
  reindex(root);
  expectOne(root, /cites link .* beside a link of another type/);
});

test(`s-jau82aq9juv9zzh refuses a node citing another by its address`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "As §bank/1.1 says."));
  expectOne(root, /§bank\/1\.1.*address/);
});

test(`s-jau82aq9juv9zzh refuses a term-relation not binding two terms, and a link of another type binding two`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => (nodeIn(d, "session").refs.push({ type: "constrains", to: sid("user") })));
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").refs.push({ type: "uses", to: sid("user") })));
  reindex(root);
  expectOne(root, /constrains link binds two terms/);
  expectOne(root, /uses link .* two terms/);
});

test(`s-jau82aq9juv9zzh refuses incoming links the outgoing ones do not produce`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "cites", from: sid("shared") }));
  expectOne(root, /incoming links .* outgoing/);
});

test(`s-jau82aq9juv9zzh refuses a checked node setting three words or more running in capitals, two words and a quoted name left out`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "close").text = "It MUST NOT EVER close; MUST NOT, REST API, `NOT CODE HERE` and \"QUOTED NAME TOO\" pass."));
  confirm(root, [sid("close")], { me: OWNER });
  const found = messages(root).filter((m) => /capitals/.test(m));
  assert.equal(found.length, 1, found.join("\n"));
  assert.match(found[0]!, /"MUST NOT EVER"/);
});

test(`s-jau82aq9juv9zzh refuses a checked section holding no rule`, () => {
  const root = good();
  edit(root, "specs/contracts/c.json", (d) => d.nodes.push({ ...node("empty", { kind: "section", text: "Nothing." }) }));
  reindex(root);
  confirm(root, [sid("empty")], { me: OWNER });
  expectOne(root, new RegExp(`${sid("empty")}.*holds no rule`));
});

test(`s-jau82aq9juv9zzh refuses a domain without a header, and a header whose index its sections do not produce`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = []));
  expectOne(root, /index .* sections/);
  const headless = good();
  mkdirSync(join(headless, "specs", "loans"));
  writeFileSync(join(headless, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("headless section", { kind: "section", text: "Lending.", children: [node("headless rule")] }))));
  reindex(headless);
  expectOne(headless, /domain loans has no header/);
});

test(`s-jau82aq9juv9zzh refuses a level the project's own guidelines do not list`, () => {
  const root = good();
  edit(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].level = "top"));
  expectOne(root, /level "top".*not.*listed/);
});

test(`s-jau82aq9juv9zzh refuses a consumes link that does not go from a header to a section of another domain`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "close").refs.push({ type: "consumes", to: sid("accounts") }));
  reindex(root);
  expectOne(root, /consumes link .* from a domain's header/);
});

test(`s-jau82aq9juv9zzh refuses domains using one another in a cycle`, () => {
  const root = good();
  mkdirSync(join(root, "specs", "loans"));
  writeFileSync(join(root, "specs", "loans", "00-loans.json"), JSON.stringify(file("loans", "00-loans", node("loans", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("accounts") }] }))));
  writeFileSync(join(root, "specs", "loans", "l.json"), JSON.stringify(file("loans", "l", node("lending", { kind: "section", text: "Lending.", children: [node("lend")] }))));
  edit(root, "specs/bank/00-bank.json", (d) => d.nodes[0].refs.push({ type: "consumes", to: sid("lending") }));
  reindex(root);
  expectOne(root, /cycle/);
});

test(`s-jau82aq9juv9zzh refuses a data record variant answering to a value its choosing field does not declare, or declaring no field of its own`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => {
    nodeIn(d, "savings record").answersTo = { kind: "gold" };
    nodeIn(d, "savings record").fields = [{ name: "kind", type: { is: "text" }, required: true, text: "" }];
  });
  expectOne(root, /"gold".*not declared/);
  expectOne(root, /declares no field of its own/);
});

test(`s-jau82aq9juv9zzh refuses a data record variant answering to a value its choosing field declares in no list of values`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => (nodeIn(d, "account record").fields[0].type = { is: "text" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*"savings" for kind.*no list of values`));
});

test(`s-jau82aq9juv9zzh refuses a data record variant whose own fields only repeat those its data record's field of type variant holds`, () => {
  const root = good();
  edit(root, "specs/bank/a.json", (d) => nodeIn(d, "account record").fields.push({ name: "terms", type: { is: "variant", fields: [{ name: "rate", type: { is: "number" }, required: true, text: "" }] }, required: "where it holds a value", text: "" }));
  expectOne(root, new RegExp(`${sid("savings record")}.*declares no field of its own`));
});

test(`s-jau82aq9juv9zzh refuses a data record variant standing outside the domain whose data record declares the value it answers to`, () => {
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

test(`s-jau82aq9juv9zzh refuses a node of the technical appendix outside the stack implementing no node of the base`, () => {
  const root = good();
  edit(root, "specs/tech/bank.json", (d) => (nodeIn(d, "store").refs = []));
  reindex(root);
  expectOne(root, new RegExp(`${sid("store")}.*implements no node of the base`));
});

test(`s-jau82aq9juv9zzh refuses a rule of the appendix of the tools implementing no node of the base of the guidelines`, () => {
  const root = good();
  edit(root, "specs/_guidelines/tools.json", (d) => (nodeIn(d, "tool").refs = []));
  reindex(root);
  expectOne(root, new RegExp(`${sid("tool")}.*implements no node of the base of the guidelines`));
});

test(`s-jau82aq9juv9zzh refuses a rule of a project's own guidelines that neither refines nor implements a rule of the SpecSheriff guidelines`, () => {
  const root = good();
  edit(root, "specs/_guidelines/project.json", (d) => d.nodes[0].children.push(node("loose")));
  reindex(root);
  expectOne(root, new RegExp(`${sid("loose")}.*neither refines nor implements`));
});

test(`s-jau82aq9juv9zzh refuses, outside the repository the SpecSheriff guidelines are written in, a copy of them or of their schema`, () => {
  const root = taking();
  cpSync(join(REPO, "specs", "_guidelines", "tools.json"), join(root, "specs", "_guidelines", "tools.json"));
  mkdirSync(join(root, "specs", "_schema"));
  writeFileSync(join(root, "specs", "_schema", "notes.txt"), "ours\n");
  const found = messages(root);
  for (const path of ["specs/_guidelines/tools.json", "specs/_schema/notes.txt"]) {
    assert.ok(found.some((m) => m.startsWith(`${path}: `) && /copy of the SpecSheriff guidelines/.test(m)), found.join("\n"));
  }
});

test(`s-jau82aq9juv9zzh passes the SpecSheriff guidelines as this repository holds them, their confirmations aside`, () => {
  const found = validate(REPO).map((f) => `${f.where}: ${f.message}`);
  assert.deepEqual(found.filter((m) => !/no confirmation/.test(m)), []);
});
