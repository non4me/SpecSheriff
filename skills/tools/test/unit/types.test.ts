import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { Ajv2020 } from "ajv/dist/2020.js";
import { loadSpecification, type SpecNode } from "../../src/spec-files.ts";
import { generateTypes, typeFiles, writeTypes } from "../../src/types.ts";
import { approve } from "../../src/approvals.ts";
import { file, NONE, node, OWNER, sid, taking } from "../fixture.ts";
import { codeProject, git, titlesOf, withGenerator } from "../code-project.ts";

/** The base's rule on data structures, which the rule of the stack listing the files implements. */
const DATA_STRUCTURES = "s-e877bnfa559tvk9";
const FILES = ["src/types.ts", "app/types.py", "schemas/checks.json"];
const CONTRACTS = "specs/contracts/c.json";
const STACK = "specs/tech/stack.json";
/** What `sheriff types` reports where it writes nothing and names nothing. */
const NOTHING = { written: [], refusals: [], waiting: [], leftOut: [], named: [] };

type Schema = Record<string, unknown>;
type SpecData = { nodes: object[] } & Record<string, unknown>;

/** A RecordType whose `schema` gives its format as a JSON Schema. */
const record = (title: string, schema: Schema, more: Record<string, unknown> = {}) =>
  node(title, { kind: "RecordType", title, text: `What a ${title} is.`, schema, ...more });
/** The schema of a RecordType that is not a RecordType variant: an object with the given fields, of which those named in `required` are guaranteed. */
const shape = (properties: Schema, required: string[] = [], more: Schema = {}): Schema => ({ type: "object", properties, ...(required.length ? { required } : {}), ...more });
const refines = (...names: string[]) => ({ refs: names.map((n) => ({ type: "refines", to: sid(n) })) });
const filesRule = (members: string[], name = "generated types") =>
  node(name, { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "the files of the generated types and runtime checks", members } });
/** Values gathered beside a field, each with a sid of its own. */
const gathered = (...values: string[]) => values.map((value) => ({ value, sid: sid(`the source of ${value}`) }));

const customer = () =>
  record("customer", shape({ number: { type: "string", description: "The customer's number." }, email: { type: "string", format: "email" } }, ["number"], { unevaluatedProperties: false }), { identifiedBy: "number" });

/**
 * A project that takes the SpecSheriff guidelines, with RecordTypes in contracts and in a domain, and a stack that lists
 * where the generated types are written. Its RecordTypes and the stack's rules that hold a list are approved, except the nodes that
 * `unapproved` names. `setUp` runs on the project before the fixture approves any node.
 */
function project(
  contracts: SpecNode[],
  bank: SpecNode[] = [],
  stack: SpecNode[] = [filesRule(FILES)],
  more: Record<string, SpecData> = {},
  { unapproved = [] as string[], setUp = (_root: string) => {} } = {},
): string {
  const files: Record<string, SpecData> = {
    [CONTRACTS]: file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: contracts })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("bank", { kind: "header", level: "core", sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: bank })),
    [STACK]: file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: stack })),
    ...more,
  };
  const root = taking(files);
  setUp(root);
  const skipped = new Set(unapproved.map(sid));
  const approved = [...loadSpecification(root).nodes]
    .filter(([s, { node: n, file: f }]) => !skipped.has(s) && (n.kind === "RecordType" || (f.path === STACK && Boolean(n.list))))
    .map(([s]) => s);
  if (approved.length) approve(root, approved, { me: OWNER });
  return root;
}

/** Changes the node with the given name in a file of the specification, without reindexing. */
function edit(root: string, path: string, name: string, change: (n: any) => void): void {
  const full = join(root, path);
  const data = JSON.parse(readFileSync(full, "utf8"));
  const find = (nodes: any[]): any => nodes.map((n) => (n.sid === sid(name) ? n : find(n.children ?? []))).find(Boolean);
  change(find(data.nodes));
  writeFileSync(full, JSON.stringify(data, null, 2) + "\n");
}

/** Commits everything in the project, first making it a repository if it is not one yet. */
function commit(root: string): void {
  if (!existsSync(join(root, ".git"))) {
    git(root, "init", "-q");
    git(root, "config", "user.email", OWNER);
    git(root, "config", "user.name", "Owner");
  }
  git(root, "add", "-A");
  git(root, "commit", "-qm", "approved");
}

const generated = (root: string) => {
  const result = generateTypes(root);
  assert.deepEqual(result.refusals, [], "nothing refused");
  return Object.fromEntries(result.files.map((f) => [f.path, f.text]));
};
const definitions = (root: string) => JSON.parse(generated(root)["schemas/checks.json"]!).$defs;
const refusals = (root: string) => generateTypes(root).refusals.map((f) => `${f.where}: ${f.message}`);

// ---- What each language makes of the generated files: they compile, run and check what they say.

/** The errors the TypeScript compiler finds in the file of types and in a file using it. */
function typescriptErrors(types: string, use: string): string[] {
  const dir = mkdtempSync(join(tmpdir(), "sheriff-types-"));
  writeFileSync(join(dir, "types.ts"), types);
  writeFileSync(join(dir, "use.ts"), use);
  const program = ts.createProgram([join(dir, "use.ts")], {
    strict: true, noEmit: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler, allowImportingTsExtensions: true, skipLibCheck: true,
  });
  return ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}

/** Runs the file of types in Python and resolves every type it defines, references written as strings included. */
function pythonRuns(types: string): string {
  const dir = mkdtempSync(join(tmpdir(), "sheriff-types-"));
  const path = join(dir, "generated_types.py");
  writeFileSync(path, types);
  const check = [
    "import runpy, sys, typing",
    "ns = runpy.run_path(sys.argv[1])",
    "for value in list(ns.values()):",
    "    if typing.is_typeddict(value): typing.get_type_hints(value, globalns=ns, include_extras=True)",
    "print('ok')",
  ].join("\n");
  const run = spawnSync("python", ["-I", "-c", check, path], { encoding: "utf8" });
  return run.status === 0 ? run.stdout.trim() : run.stderr;
}

/**
 * The RuntimeCheck of one definition in the file of RuntimeChecks, compiled by Ajv in strict mode. In that mode Ajv refuses
 * a keyword that it does not know, such as `identifierOf` or `enumSource`. Ajv resolves a `$ref` to an `$anchor` but does not
 * declare `$anchor` as a keyword, so `checker` declares it. A RecordType variant's definition has `properties` without
 * `"type": "object"` (s-qg2yqec2cgmcg2w), so Ajv's strict check of types is off. A variant's `required` may name a field that
 * another definition declares, so Ajv's strict check of `required` is off too.
 */
function checker(checks: string, name: string) {
  const ajv = new Ajv2020({ strict: true, strictTypes: false, strictRequired: false, validateFormats: false });
  ajv.addKeyword("$anchor");
  return ajv.compile({ ...JSON.parse(checks), $ref: `#/$defs/${name}` });
}

// ---- s-pvzms7d8kxb8dk2: where the files are written.

test("@spec s-pvzms7d8kxb8dk2 writes nothing where the technical appendix lists no files for the types", () => {
  const root = project([customer()], [], [node("runtime")]);
  assert.deepEqual(writeTypes(root), NOTHING);
  for (const path of FILES) assert.ok(!existsSync(join(root, path)), path);
});

test("@spec s-pvzms7d8kxb8dk2 writes each file the stack's rule lists, its extension saying what goes into it", () => {
  const root = project([customer()]);
  assert.deepEqual(writeTypes(root), { ...NOTHING, written: FILES });
  assert.match(readFileSync(join(root, "src/types.ts"), "utf8"), /^export type Customer = \{$/m);
  assert.match(readFileSync(join(root, "app/types.py"), "utf8"), /^Customer = TypedDict\("Customer", \{$/m);
  assert.equal(JSON.parse(readFileSync(join(root, "schemas/checks.json"), "utf8")).$schema, "https://json-schema.org/draft/2020-12/schema");
});

test("@spec s-pvzms7d8kxb8dk2 takes the list from a rule of the stack only", () => {
  const root = project([customer()], [], [node("runtime")], {
    "specs/tech/bank.json": file("tech", "bank", node("bank tech", { kind: "section", text: "Bank, built.", children: [filesRule(FILES, "bank types")] })),
  });
  approve(root, [sid("bank types")], { me: OWNER });
  assert.deepEqual(generateTypes(root).files, []);
});

test("@spec s-pvzms7d8kxb8dk2 reads the list in the last approved wording of the stack's rule, and a rule that has never been approved lists no file", () => {
  const root = project([customer()]);
  commit(root);
  edit(root, STACK, "generated types", (n) => {
    n.status = "draft";
    n.list.members.push("worker/types.py");
  });
  assert.deepEqual(typeFiles(root).paths, FILES, "the list as it was approved");
  assert.deepEqual(writeTypes(root).written, FILES);
  assert.ok(!existsSync(join(root, "worker/types.py")));
  const never = project([customer()], [], undefined, {}, { unapproved: ["generated types"] });
  assert.deepEqual(typeFiles(never).paths, []);
  assert.deepEqual(writeTypes(never), NOTHING);
});

test("@spec s-pvzms7d8kxb8dk2 takes the implements link of the stack's rule from the commit that added its last approval, and from the files until that commit is made", () => {
  const root = project([customer()]);
  commit(root);
  edit(root, STACK, "generated types", (n) => (n.refs = []));
  assert.deepEqual(typeFiles(root).paths, FILES, "the link as the approving commit holds it");
  const uncommitted = project([customer()]);
  edit(uncommitted, STACK, "generated types", (n) => (n.refs = []));
  assert.deepEqual(typeFiles(uncommitted).paths, [], "the link as the files hold it");
});

test("@spec s-pvzms7d8kxb8dk2 writes nothing where the project has not chosen the RecordType extension", () => {
  const root = project([customer()]);
  const path = join(root, "sheriff.config.json");
  const config = JSON.parse(readFileSync(path, "utf8"));
  config.extensions.push({ name: "recordtype", chosen: false, by: OWNER });
  writeFileSync(path, JSON.stringify(config, null, 2) + "\n");
  assert.deepEqual(writeTypes(root), NOTHING);
  for (const p of FILES) assert.ok(!existsSync(join(root, p)), p);
});

test("@spec s-dbk2vyeg8z5jxna refuses a listed file of another extension, and two rules of the stack each listing files, and then writes nothing", () => {
  const other = project([customer()], [], [filesRule(["src/types.js"])]);
  assert.ok(refusals(other).some((m) => m.includes(sid("generated types")) && /src\/types\.js.*neither \.ts, \.py nor \.json/.test(m)), refusals(other).join("\n"));
  const two = project([customer()], [], [filesRule(["src/types.ts"]), filesRule(["src/more.ts"], "more types")]);
  assert.ok(refusals(two).some((m) => m.includes(sid("more types")) && /a second list of the files/.test(m)), refusals(two).join("\n"));
  assert.equal(writeTypes(two).written.length, 0);
  assert.ok(!existsSync(join(two, "src/types.ts")));
});

// ---- s-a8fn72xa782wvbk: what is generated, from which wording, and when a file is written.

test("@spec s-a8fn72xa782wvbk sheriff types writes only a file that is missing or whose content, line endings aside, differs from what it generates, and names each file it writes", () => {
  const root = project([customer()]);
  writeTypes(root);
  assert.deepEqual(writeTypes(root), NOTHING, "run again, it writes nothing");
  const types = join(root, "src/types.ts");
  writeFileSync(types, readFileSync(types, "utf8").replace(/\n/g, "\r\n"));
  assert.deepEqual(writeTypes(root).written, [], "line endings aside");
  writeFileSync(types, "edited by hand\n");
  rmSync(join(root, "schemas/checks.json"));
  assert.deepEqual(writeTypes(root).written, ["src/types.ts", "schemas/checks.json"]);
  assert.match(readFileSync(types, "utf8"), /^export type Customer = \{$/m);
});

test("@spec s-a8fn72xa782wvbk generates the types of a RecordType that is a draft from its last approved wording", () => {
  const root = project([customer()]);
  commit(root);
  edit(root, CONTRACTS, "customer", (n) => {
    n.status = "draft";
    n.schema.properties.phone = { type: "string" };
  });
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^export type Customer = \{\n {2}number: string;\n {2}email\?: string;\n\};$/m);
  assert.ok(!Object.values(out).some((text) => text.includes("phone")), "the field that only the draft wording declares");
});

test("@spec s-a8fn72xa782wvbk leaves out a RecordType that has never been approved, and names each RecordType that it leaves out because it relies on one that has never been approved", () => {
  const root = project([
    record("draft fragment", shape({ a: { type: "string" } })),
    record("extended", shape({ b: { type: "string" } }), refines("draft fragment")),
    record("pointing", shape({ to: { $ref: `#${sid("draft fragment")}` } })),
    record("naming", shape({ by: { type: "array", items: { identifierOf: sid("draft fragment") } } })),
    record("further", shape({ c: { type: "string" } }), refines("extended")),
    record("kept", shape({ d: { type: "string" } })),
  ], [], undefined, {}, { unapproved: ["draft fragment"] });
  assert.deepEqual(writeTypes(root), { ...NOTHING, written: FILES, leftOut: [sid("extended"), sid("pointing"), sid("naming"), sid("further")] });
  assert.deepEqual([...readFileSync(join(root, "src/types.ts"), "utf8").matchAll(/^export type (\w+)/gm)].map((m) => m[1]), ["Kept"]);
  assert.deepEqual(Object.keys(JSON.parse(readFileSync(join(root, "schemas/checks.json"), "utf8")).$defs), ["Kept"]);
});

test("@spec s-a8fn72xa782wvbk takes the refines links of a RecordType from the commit that added its last approval", () => {
  const root = project([
    record("first part", shape({ a: { type: "string" } })),
    record("second part", shape({ b: { type: "string" } })),
    record("whole", shape({ c: { type: "string" } }), refines("first part")),
  ]);
  commit(root);
  edit(root, CONTRACTS, "whole", (n) => (n.refs = [{ type: "refines", to: sid("second part") }]));
  assert.match(generated(root)["src/types.ts"]!, /export type Whole = \{\n {2}a\?: string;\n {2}c\?: string;\n\};/);
});

test("@spec s-a8fn72xa782wvbk generates from the values gathered beside a field as the files hold them, even where the RecordType's approved wording comes from a commit", () => {
  const root = project([record("audit entry", shape({ part: { enumSource: { from: "parts", gathered: gathered("contracts", "bank") } } }, ["part"]))]);
  commit(root);
  edit(root, CONTRACTS, "audit entry", (n) => {
    n.status = "draft";
    n.schema.properties.extra = { type: "string" };
    n.schema.properties.part.enumSource.gathered = gathered("contracts", "bank", "cards");
  });
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^ {2}part: "contracts" \| "bank" \| "cards";$/m);
  assert.ok(!out["src/types.ts"]!.includes("extra"), "the approved wording, which holds no field extra");
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.AuditEntry.properties.part, { enum: ["contracts", "bank", "cards"] });
});

// ---- s-suv42g8r3ra2h6b: what a RecordType generates.

test("@spec s-suv42g8r3ra2h6b writes each RecordType as a type tagged with its sid and a definition under $defs, in each language", () => {
  const root = project([customer(), record("user account", shape({
    owner: { identifierOf: sid("customer") },
    tags: { type: "array", items: { type: "string" } },
    limits: { type: "object", additionalProperties: { type: "integer", minimum: 0 } },
  }, ["owner"]))]);
  const out = generated(root);
  assert.equal(out["src/types.ts"], [
    `/** @spec ${sid("customer")} */`,
    "export type Customer = {",
    "  number: string;",
    "  email?: string;",
    "};",
    "",
    `/** @spec ${sid("user account")} */`,
    "export type UserAccount = {",
    "  owner: string;",
    "  tags?: string[];",
    "  limits?: Record<string, number>;",
    "};",
    "",
  ].join("\n"));
  assert.equal(out["app/types.py"], [
    "from typing import NotRequired, TypedDict",
    "",
    `# @spec ${sid("customer")}`,
    'Customer = TypedDict("Customer", {',
    '    "number": str,',
    '    "email": NotRequired[str],',
    "})",
    "",
    `# @spec ${sid("user account")}`,
    'UserAccount = TypedDict("UserAccount", {',
    '    "owner": str,',
    '    "tags": NotRequired[list[str]],',
    '    "limits": NotRequired[dict[str, int]],',
    "})",
    "",
  ].join("\n"));
  const checks = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $defs: {
      Customer: {
        $comment: `@spec ${sid("customer")}`,
        $anchor: sid("customer"),
        type: "object",
        properties: { number: { type: "string", description: "The customer's number." }, email: { type: "string", format: "email" } },
        required: ["number"],
        unevaluatedProperties: false,
      },
      UserAccount: {
        $comment: `@spec ${sid("user account")}`,
        $anchor: sid("user account"),
        type: "object",
        properties: {
          owner: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          limits: { type: "object", additionalProperties: { type: "integer", minimum: 0 } },
        },
        required: ["owner"],
      },
    },
  };
  assert.equal(out["schemas/checks.json"], JSON.stringify(checks, null, 2) + "\n");
});

test("@spec s-suv42g8r3ra2h6b takes the files in the code-point order of their paths and the nodes in the order they stand", () => {
  const a = () => shape({ a: { type: "string" } });
  const root = project([record("second", a())], [], undefined, {
    "specs/contracts/B.json": file("contracts", "B", node("upper", { kind: "section", text: "Upper.", children: [record("first", a()), record("between", a())] })),
  });
  const names = [...generated(root)["src/types.ts"]!.matchAll(/^export type (\w+)/gm)].map((m) => m[1]);
  assert.deepEqual(names, ["First", "Between", "Second"]);
});

test("@spec s-suv42g8r3ra2h6b first takes the fields of the RecordTypes it reaches through refines links, in the order of the links, each after those it reaches and none more than once", () => {
  const root = project([
    record("base event", shape({ at: { type: "string", format: "date-time" } }, ["at"])),
    record("left event", shape({ left: { type: "string" } }), refines("base event")),
    record("right event", shape({ right: { type: "string" } }, ["right"]), refines("base event")),
    record("joined event", shape({ by: { type: "string" } }), refines("right event", "left event")),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type JoinedEvent = \{\n {2}at: string;\n {2}right: string;\n {2}left\?: string;\n {2}by\?: string;\n\};/);
  const joined = JSON.parse(out["schemas/checks.json"]!).$defs.JoinedEvent;
  assert.deepEqual(Object.keys(joined.properties), ["at", "right", "left", "by"]);
  assert.deepEqual(joined.required, ["at", "right"]);
});

test("@spec s-suv42g8r3ra2h6b writes a field that several RecordTypes declare once, where it first appears, its definition holding their schemas in an allOf and its type the type of the last", () => {
  const long = "The Long and Winding Road Leading Out of Town";
  const root = project([
    record("address", shape({ city: { type: "string" }, street: { type: "string", maxLength: 40 } }, ["city"])),
    record("user", shape({ name: { type: "string" }, street: { enum: ["Main Street", long] } }, ["name", "street"]), refines("address")),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, new RegExp(`export type User = \\{\\n {2}city: string;\\n {2}street: "Main Street" \\| "${long}";\\n {2}name: string;\\n\\};`));
  assert.match(out["app/types.py"]!, new RegExp(`User = TypedDict\\("User", \\{\\n {4}"city": str,\\n {4}"street": Literal\\["Main Street", "${long}"\\],\\n {4}"name": str,\\n\\}\\)`));
  const user = JSON.parse(out["schemas/checks.json"]!).$defs.User;
  assert.deepEqual(user.properties.street, { allOf: [{ type: "string", maxLength: 40 }, { enum: ["Main Street", long] }] });
  assert.deepEqual(user.required, ["city", "street", "name"]);
  const check = checker(out["schemas/checks.json"]!, "User");
  assert.ok(check({ city: "Bath", street: "Main Street", name: "Ann" }));
  assert.ok(!check({ city: "Bath", street: "Cross Street", name: "Ann" }), "a street that the user's schema refuses");
  assert.ok(!check({ city: "Bath", street: long, name: "Ann" }), "a street that the address's schema refuses");
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { User } from "./types.ts";\nexport const u: User = { city: "Bath", street: "Main Street", name: "Ann" };\n`), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-suv42g8r3ra2h6b writes the SpecTag as the first line of each definition's $comment, before the text of the $comment of the RecordType's schema", () => {
  const root = project([record("ledger entry", shape({ amount: { type: "number" } }, [], { $comment: "Kept for seven years." })), customer()]);
  const defs = definitions(root);
  assert.equal(defs.LedgerEntry.$comment, `@spec ${sid("ledger entry")}\nKept for seven years.`);
  assert.deepEqual(Object.keys(defs.LedgerEntry), ["$comment", "$anchor", "type", "properties"]);
  assert.equal(defs.Customer.$comment, `@spec ${sid("customer")}`);
});

test("@spec s-suv42g8r3ra2h6b gives each definition its RecordType's sid as its $anchor, to which a $ref in another definition points", () => {
  const root = project([customer(), record("order", shape({ buyer: { $ref: `#${sid("customer")}` } }, ["buyer"]))]);
  const out = generated(root);
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.equal(defs.Customer.$anchor, sid("customer"));
  assert.deepEqual(defs.Order.properties.buyer, { $ref: `#${sid("customer")}` });
  const order = checker(out["schemas/checks.json"]!, "Order");
  assert.ok(order({ buyer: { number: "1" } }));
  assert.ok(!order({ buyer: { number: 1 } }), "a number that the customer's schema refuses");
  assert.ok(!order({ buyer: { number: "1", extra: true } }), "a field that the customer's schema refuses");
});

test("@spec s-suv42g8r3ra2h6b refers to a RecordType by the name of its type, in Python as a string, and the files compile and run", () => {
  const root = project([customer(), record("order", shape({
    buyer: { $ref: `#${sid("customer")}` },
    lines: { type: "array", items: { $ref: `#${sid("customer")}` } },
  }, ["buyer"]))]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^ {2}buyer: Customer;$/m);
  assert.match(out["src/types.ts"]!, /^ {2}lines\?: Customer\[\];$/m);
  assert.match(out["app/types.py"]!, /^ {4}"buyer": "Customer",$/m);
  assert.match(out["app/types.py"]!, /^ {4}"lines": NotRequired\[list\["Customer"\]\],$/m);
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { Order } from "./types.ts";\nexport const o: Order = { buyer: { number: "1" } };\n`), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-suv42g8r3ra2h6b builds each definition from its RecordType's own schema, keeping its other keywords and leaving out those of the RecordTypes it refines", () => {
  const root = project([
    record("base", shape({ a: { type: "string" } }, ["a"], { unevaluatedProperties: false, description: "The base." })),
    record("child", shape({ b: { type: "string" } }, [], { description: "The child.", minProperties: 1 }), refines("base")),
  ]);
  const child = definitions(root).Child;
  assert.deepEqual(child, {
    $comment: `@spec ${sid("child")}`,
    $anchor: sid("child"),
    type: "object",
    properties: { a: { type: "string" }, b: { type: "string" } },
    description: "The child.",
    minProperties: 1,
    required: ["a"],
  });
  assert.deepEqual(Object.keys(child), ["$comment", "$anchor", "type", "properties", "description", "minProperties", "required"]);
});

test("@spec s-suv42g8r3ra2h6b cannot generate a name that is no identifier in its file's language, or that the file already uses", () => {
  const a = () => shape({ a: { type: "string" } });
  const root = project([
    record("3d model", a()),
    record("none", a()),
    record("a b", a()),
    record("AB", a()),
    record("any", shape({ payload: {} })),
    record("record", shape({ index: { type: "object", additionalProperties: { type: "string" } } })),
    record("sample", shape({ "first name": { properties: { given: { type: "string" } } } })),
  ]);
  const found = refusals(root);
  const has = (who: string, pattern: RegExp) => assert.ok(found.some((m) => m.includes(sid(who)) && pattern.test(m)), `${who} ${pattern}:\n${found.join("\n")}`);
  has("3d model", /3dModel cannot be generated in src\/types\.ts: not an identifier/);
  has("3d model", /3dModel cannot be generated in app\/types\.py: not an identifier/);
  has("none", /None cannot be generated in app\/types\.py: a keyword/);
  has("AB", /AB cannot be generated in src\/types\.ts: a name the file already uses/);
  has("any", /Any cannot be generated in app\/types\.py: a name the file already uses/);
  has("record", /Record cannot be generated in src\/types\.ts: a name the file already uses/);
  has("sample", /SampleFirst name cannot be generated in app\/types\.py: not an identifier/);
  assert.ok(!found.some((m) => /None cannot be generated in src\/types\.ts|checks\.json: not an identifier/.test(m)), found.join("\n"));
  assert.equal(writeTypes(root).written.length, 0);
});

test("@spec s-suv42g8r3ra2h6b cannot generate the type that a $ref refers to where no RecordType has the sid it names, and then writes nothing", () => {
  const root = project([record("order", shape({ buyer: { $ref: `#${NONE}` } }))]);
  const found = refusals(root);
  assert.ok(found.some((m) => m.includes(sid("order")) && m.includes(NONE) && m.includes("/properties/buyer")), found.join("\n"));
  assert.deepEqual(writeTypes(root).written, []);
  for (const path of FILES) assert.ok(!existsSync(join(root, path)), path);
});

// ---- s-4npdup7mjkva69y: the type that the schema of each field gives.

test("@spec s-4npdup7mjkva69y gives each field's schema the type that the table names, in each language", () => {
  const fields = {
    ref: { $ref: `#${sid("customer")}` },
    id: { identifierOf: sid("customer") },
    fixed: { const: "v1" },
    mode: { enum: ["fast", "slow"] },
    either: { oneOf: [{ type: "string" }, { type: "integer" }] },
    flag: { anyOf: [{ type: "boolean" }, { type: "null" }] },
    both: { allOf: [{ properties: { a: { type: "string" } }, required: ["a"] }, { properties: { b: { type: "integer" } } }] },
    maybe: { type: ["string", "null"] },
    nothing: { type: "null" },
    title: { type: "string", maxLength: 3 },
    mail: { type: "string", format: "email" },
    at: { type: "string", format: "date-time" },
    day: { type: "string", format: "date" },
    span: { type: "string", format: "duration" },
    count: { type: "integer", minimum: 0, maximum: 10 },
    ratio: { type: "number", exclusiveMinimum: 0 },
    active: { type: "boolean" },
    levels: { type: "array", items: { enum: ["low", "high"] } },
    tags: { type: "array", items: { type: "integer" }, minItems: 1 },
    inline: { properties: { hint: { type: "string" } } },
    scores: { type: "object", additionalProperties: { type: "number" } },
    payload: { description: "Anything at all." },
  };
  const root = project([customer(), record("sample", shape(fields, Object.keys(fields)))]);
  const out = generated(root);
  assert.ok(out["src/types.ts"]!.includes([
    "export type Sample = {",
    "  ref: Customer;",
    "  id: string;",
    '  fixed: "v1";',
    '  mode: "fast" | "slow";',
    "  either: string | number;",
    "  flag: boolean | null;",
    "  both: {",
    "    a: string;",
    "  } & {",
    "    b?: number;",
    "  };",
    "  maybe: string | null;",
    "  nothing: null;",
    "  title: string;",
    "  mail: string;",
    "  at: string;",
    "  day: string;",
    "  span: string;",
    "  count: number;",
    "  ratio: number;",
    "  active: boolean;",
    '  levels: ("low" | "high")[];',
    "  tags: number[];",
    "  inline: {",
    "    hint?: string;",
    "  };",
    "  scores: Record<string, number>;",
    "  payload: unknown;",
    "};",
  ].join("\n")), out["src/types.ts"]);
  assert.ok(out["app/types.py"]!.startsWith("from typing import Any, Literal, NotRequired, TypedDict, Union\n"), out["app/types.py"]);
  assert.ok(out["app/types.py"]!.endsWith([
    `# @spec ${sid("sample")}`,
    'Sample = TypedDict("Sample", {',
    '    "ref": "Customer",',
    '    "id": str,',
    '    "fixed": Literal["v1"],',
    '    "mode": Literal["fast", "slow"],',
    '    "either": Union[str, int],',
    '    "flag": Union[bool, None],',
    '    "both": "SampleBoth",',
    '    "maybe": Union[str, None],',
    '    "nothing": None,',
    '    "title": str,',
    '    "mail": str,',
    '    "at": str,',
    '    "day": str,',
    '    "span": str,',
    '    "count": int,',
    '    "ratio": float,',
    '    "active": bool,',
    '    "levels": list[Literal["low", "high"]],',
    '    "tags": list[int],',
    '    "inline": "SampleInline",',
    '    "scores": dict[str, float],',
    '    "payload": Any,',
    "})",
    "",
    `# @spec ${sid("sample")}`,
    'SampleBoth = TypedDict("SampleBoth", {',
    '    "a": str,',
    '    "b": NotRequired[int],',
    "})",
    "",
    `# @spec ${sid("sample")}`,
    'SampleInline = TypedDict("SampleInline", {',
    '    "hint": NotRequired[str],',
    "})",
    "",
  ].join("\n")), out["app/types.py"]);
  assert.ok(!/SampleBoth1|SampleBoth2/.test(out["app/types.py"]!), "a TypedDict that no type uses is not written");
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.Sample.properties, { ...fields, id: { type: "string" } });
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { Sample } from "./types.ts";\nexport type S = Sample;\n`), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
  checker(out["schemas/checks.json"]!, "Sample");
});

test("@spec s-4npdup7mjkva69y bounds how many members a list holds in the runtime checks alone", () => {
  const root = project([record("order", shape({ lines: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 2 } }, ["lines"]))]);
  const out = generated(root);
  const check = checker(out["schemas/checks.json"]!, "Order");
  assert.equal(check({ lines: [] }), false, "fewer members than the least");
  assert.equal(check({ lines: ["a"] }), true);
  assert.equal(check({ lines: ["a", "b", "c"] }), false, "more members than the most");
  assert.match(out["src/types.ts"]!, /^ {2}lines: string\[\];$/m);
  assert.match(out["app/types.py"]!, /^ {4}"lines": list\[str\],$/m);
});

test("@spec s-4npdup7mjkva69y gives a field with enumSource the values gathered beside it, each once, in their order, and replaces enumSource with enum at any depth", () => {
  const source = (...values: string[]) => ({ enumSource: { from: "parts", gathered: gathered(...values) } });
  const root = project([record("audit entry", shape({
    part: source("contracts", "bank", "contracts"),
    parts: { type: "array", items: source("bank", "cards") },
  }, ["part"]))]);
  // The reindex gathers the values anew, so the values of the test are written after it.
  edit(root, CONTRACTS, "audit entry", (n) => {
    n.schema.properties.part.enumSource.gathered = gathered("contracts", "bank", "contracts");
    n.schema.properties.parts.items.enumSource.gathered = gathered("bank", "cards");
  });
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^ {2}part: "contracts" \| "bank";$/m);
  assert.match(out["src/types.ts"]!, /^ {2}parts\?: \("bank" \| "cards"\)\[\];$/m);
  assert.match(out["app/types.py"]!, /^ {4}"part": Literal\["contracts", "bank"\],$/m);
  const entry = JSON.parse(out["schemas/checks.json"]!).$defs.AuditEntry;
  assert.deepEqual(entry.properties, { part: { enum: ["contracts", "bank"] }, parts: { type: "array", items: { enum: ["bank", "cards"] } } });
  const check = checker(out["schemas/checks.json"]!, "AuditEntry");
  assert.ok(check({ part: "bank", parts: ["cards"] }));
  assert.ok(!check({ part: "cards" }), "a value gathered beside another field only");
});

test("@spec s-4npdup7mjkva69y gives an identifier the type of the field at the end of its chain of identifiers, and its RuntimeCheck every keyword of that field's schema but its description, at any depth", () => {
  const root = project([
    record("account", shape({ number: { type: "string", maxLength: 34, description: "The account's number." } }, ["number"]), { identifiedBy: "number" }),
    record("card", shape({ account: { identifierOf: sid("account") } }, ["account"]), { identifiedBy: "account" }),
    record("statement", shape({
      accountId: { identifierOf: sid("account"), description: "The account." },
      cardId: { identifierOf: sid("card") },
      accounts: { type: "array", items: { identifierOf: sid("account") } },
    }, ["accountId"])),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type Statement = \{\n {2}accountId: string;\n {2}cardId\?: string;\n {2}accounts\?: string\[\];\n\};/);
  assert.match(out["app/types.py"]!, /^ {4}"cardId": NotRequired\[str\],$/m);
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(defs.Statement.properties, {
    accountId: { type: "string", maxLength: 34, description: "The account." },
    cardId: { type: "string", maxLength: 34 },
    accounts: { type: "array", items: { type: "string", maxLength: 34 } },
  });
  assert.deepEqual(Object.keys(defs.Statement.properties.accountId), ["type", "maxLength", "description"], "in the place of identifierOf");
  assert.deepEqual(defs.Card.properties.account, { type: "string", maxLength: 34 });
  const statement = checker(out["schemas/checks.json"]!, "Statement");
  assert.ok(statement({ accountId: "GB33", accounts: ["GB34"] }));
  assert.ok(!statement({ accountId: "G".repeat(35) }), "longer than the account's number may be");
  assert.ok(!statement({ accountId: 33 }), "not a string");
});

test("@spec s-4npdup7mjkva69y gives a field whose chain of identifiers has no end the same type as {}, and removes its identifierOf from the RuntimeCheck", () => {
  const root = project([
    record("left", shape({ id: { identifierOf: sid("right") } }), { identifiedBy: "id" }),
    record("right", shape({ id: { identifierOf: sid("left") } }), { identifiedBy: "id" }),
    record("unnamed", shape({ code: { type: "string" } })),
    record("link", shape({
      toLeft: { identifierOf: sid("left"), description: "A left." },
      toUnnamed: { identifierOf: sid("unnamed") },
      toNothing: { type: "string" },
    }, ["toLeft"])),
  ]);
  // The schema refuses an identifierOf that holds no sid, so it is written after the reindex, and then the node is approved.
  edit(root, CONTRACTS, "link", (n) => (n.schema.properties.toNothing.identifierOf = "no sid at all"));
  approve(root, [sid("link")], { me: OWNER });
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type Link = \{\n {2}toLeft: unknown;\n {2}toUnnamed\?: unknown;\n {2}toNothing\?: unknown;\n\};/);
  assert.match(out["app/types.py"]!, /^ {4}"toLeft": Any,$/m);
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(defs.Link.properties, { toLeft: { description: "A left." }, toUnnamed: {}, toNothing: { type: "string" } });
  assert.deepEqual(defs.Left.properties.id, {});
  checker(out["schemas/checks.json"]!, "Link");
});

test("@spec s-4npdup7mjkva69y gives in Python the same type as {} to a const or an enum that Literal cannot hold, and writes true, false and null in Literal as True, False and None", () => {
  const fields = { ratio: { const: 1.5 }, mixed: { enum: ["a", 2.5] }, shaped: { const: { a: 1 } }, flags: { enum: [true, false, null] }, levels: { enum: [1, 2] } };
  const root = project([record("setting", shape(fields, Object.keys(fields)))]);
  const out = generated(root);
  assert.ok(out["app/types.py"]!.includes([
    '    "ratio": Any,',
    '    "mixed": Any,',
    '    "shaped": Any,',
    '    "flags": Literal[True, False, None],',
    '    "levels": Literal[1, 2],',
  ].join("\n")), out["app/types.py"]);
  assert.ok(out["src/types.ts"]!.includes([
    "  ratio: 1.5;",
    '  mixed: "a" | 2.5;',
    '  shaped: {"a":1};',
    "  flags: true | false | null;",
    "  levels: 1 | 2;",
  ].join("\n")), out["src/types.ts"]);
  const use = `import type { Setting } from "./types.ts";\nexport const s: Setting = { ratio: 1.5, mixed: "a", shaped: { a: 1 }, flags: null, levels: 2 };\n`;
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, use), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-4npdup7mjkva69y gives an allOf in Python a TypedDict of its own where each member gives one, and the same type as {} otherwise", () => {
  const root = project([customer(), record("order", shape({
    buyer: { allOf: [{ $ref: `#${sid("customer")}` }, { properties: { note: { type: "string" } }, required: ["note"] }] },
    code: { allOf: [{ type: "string" }, { maxLength: 3 }] },
    pair: { allOf: [{ properties: { a: { type: "string" } } }, { properties: { a: { const: "x" } }, required: ["a"] }] },
    solo: { allOf: [{ oneOf: [{ type: "string" }, { type: "integer" }] }] },
  }, ["buyer", "code", "pair", "solo"]))]);
  const out = generated(root);
  assert.ok(out["app/types.py"]!.includes([
    'Order = TypedDict("Order", {',
    '    "buyer": "OrderBuyer",',
    '    "code": Any,',
    '    "pair": "OrderPair",',
    '    "solo": Any,',
    "})",
    "",
    `# @spec ${sid("order")}`,
    'OrderBuyer = TypedDict("OrderBuyer", {',
    '    "number": str,',
    '    "email": NotRequired[str],',
    '    "note": str,',
    "})",
    "",
    `# @spec ${sid("order")}`,
    'OrderPair = TypedDict("OrderPair", {',
    '    "a": Literal["x"],',
    "})",
  ].join("\n")), out["app/types.py"]);
  assert.match(out["src/types.ts"]!, /^ {2}buyer: Customer & \{\n {4}note: string;\n {2}\};$/m);
  assert.match(out["src/types.ts"]!, /^ {2}code: string & unknown;$/m);
  assert.match(out["src/types.ts"]!, /^ {2}solo: string \| number;$/m, "an allOf of one member, written without parentheses");
  const use = `import type { Order } from "./types.ts";\nexport const o: Order = { buyer: { number: "1", note: "n" }, code: "abc", pair: { a: "x" }, solo: 1 };\n`;
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, use), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-4npdup7mjkva69y names each TypedDict of its own after the RecordType that holds it and each step down to it, and writes it once, after every type of that RecordType", () => {
  const root = project([
    record("user", shape({
      address: { properties: { city: { type: "string" }, geo: { properties: { lat: { type: "number" } } } } },
      lines: { type: "array", items: { properties: { sku: { type: "string" } } } },
      extras: { type: "object", additionalProperties: { properties: { size: { type: "integer" } } } },
      contact: { oneOf: [{ properties: { email: { type: "string" } } }, { properties: { phone: { type: "string" } } }] },
    }, ["address", "lines", "extras", "contact"])),
    record("admin", shape({ badge: { properties: { code: { type: "string" } }, required: ["code"] } }, ["badge"]), refines("user")),
  ]);
  const out = generated(root);
  const dict = (sid: string, name: string, ...fields: string[]) => [`# @spec ${sid}`, `${name} = TypedDict("${name}", {`, ...fields.map((f) => `    ${f},`), "})", ""];
  const user = ['"address": "UserAddress"', '"lines": list["UserLinesItem"]', '"extras": dict[str, "UserExtrasValue"]', '"contact": Union["UserContact1", "UserContact2"]'];
  assert.equal(out["app/types.py"], [
    "from typing import NotRequired, TypedDict, Union",
    "",
    ...dict(sid("user"), "User", ...user),
    ...dict(sid("user"), "UserAddress", '"city": NotRequired[str]', '"geo": NotRequired["UserAddressGeo"]'),
    ...dict(sid("user"), "UserAddressGeo", '"lat": NotRequired[float]'),
    ...dict(sid("user"), "UserLinesItem", '"sku": NotRequired[str]'),
    ...dict(sid("user"), "UserExtrasValue", '"size": NotRequired[int]'),
    ...dict(sid("user"), "UserContact1", '"email": NotRequired[str]'),
    ...dict(sid("user"), "UserContact2", '"phone": NotRequired[str]'),
    ...dict(sid("admin"), "Admin", ...user, '"badge": "AdminBadge"'),
    ...dict(sid("admin"), "AdminBadge", '"code": str'),
  ].join("\n"));
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { Admin } from "./types.ts";\nexport type A = Admin;\n`), []);
});

// ---- s-nk8td3ez58gahc4: a RecordType that its variants refine.

/** A payment whose field `kind` selects its variant: a card payment adds a field of its own. */
const payments = () => [
  record("payment", shape({
    kind: { enum: ["cash", "card", "voucher"] },
    amount: { type: "number" },
    details: { type: "object", properties: { note: { type: "string" } } },
  }, ["kind", "amount", "details"], { unevaluatedProperties: false }), { chosenBy: ["kind"] }),
  record("card payment", { properties: { last4: { type: "string" } }, required: ["last4"] }, { answersTo: { kind: "card" }, ...refines("payment") }),
];

test("@spec s-nk8td3ez58gahc4 writes a RecordType its variants refine as the union of each variant and a member for the values to which no variant corresponds", () => {
  const out = generated(project(payments()));
  const [P, V] = [sid("payment"), sid("card payment")];
  assert.equal(out["src/types.ts"], [
    `/** @spec ${P} */`,
    "export type Payment = CardPayment | PaymentOther;",
    "",
    `/** @spec ${P} */`,
    "export type PaymentOther = {",
    '  kind: "cash" | "voucher";',
    "  amount: number;",
    "  details: {",
    "    note?: string;",
    "  };",
    "};",
    "",
    `/** @spec ${V} */`,
    "export type CardPayment = {",
    '  kind: "card";',
    "  amount: number;",
    "  details: {",
    "    note?: string;",
    "  };",
    "  last4: string;",
    "};",
    "",
  ].join("\n"));
  assert.equal(out["app/types.py"], [
    "from typing import Literal, NotRequired, TypedDict, Union",
    "",
    `# @spec ${P}`,
    'Payment = Union["CardPayment", "PaymentOther"]',
    "",
    `# @spec ${P}`,
    'PaymentOther = TypedDict("PaymentOther", {',
    '    "kind": Literal["cash", "voucher"],',
    '    "amount": float,',
    '    "details": "PaymentDetails",',
    "})",
    "",
    `# @spec ${P}`,
    'PaymentDetails = TypedDict("PaymentDetails", {',
    '    "note": NotRequired[str],',
    "})",
    "",
    `# @spec ${V}`,
    'CardPayment = TypedDict("CardPayment", {',
    '    "kind": Literal["card"],',
    '    "amount": float,',
    '    "details": "PaymentDetails",',
    '    "last4": str,',
    "})",
    "",
  ].join("\n"));
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(Object.keys(defs), ["Payment", "CardPayment"]);
  assert.deepEqual(defs.Payment, {
    $comment: `@spec ${P}`,
    $anchor: P,
    type: "object",
    properties: {
      kind: { enum: ["cash", "card", "voucher"] },
      amount: { type: "number" },
      details: { type: "object", properties: { note: { type: "string" } } },
    },
    required: ["kind", "amount", "details"],
    unevaluatedProperties: false,
    allOf: [{ if: { properties: { kind: { const: "card" } }, required: ["kind"] }, then: { $ref: `#${V}` } }],
  });
  assert.deepEqual(defs.CardPayment, { $comment: `@spec ${V}`, $anchor: V, properties: { last4: { type: "string" } }, required: ["last4"] });
});

test("@spec s-nk8td3ez58gahc4 lets exactly one member hold each payment, in every language", () => {
  const out = generated(project(payments()));
  const payment = checker(out["schemas/checks.json"]!, "Payment");
  assert.ok(payment({ kind: "card", amount: 1, details: {}, last4: "1234" }));
  assert.ok(payment({ kind: "cash", amount: 1, details: {} }));
  assert.ok(!payment({ kind: "card", amount: 1, details: {} }), "a card payment without its own field");
  assert.ok(!payment({ kind: "cash", amount: 1, details: {}, last4: "1234" }), "a field that only the card's variant declares");
  assert.ok(!payment({ kind: "cash", amount: 1 }), "the details that every payment holds");
  assert.ok(!payment({ kind: "cheque", amount: 1, details: {} }), "a kind that the payment does not name");
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, [
    `import type { Payment } from "./types.ts";`,
    `export const card: Payment = { kind: "card", amount: 1, details: {}, last4: "1234" };`,
    `export const cash: Payment = { kind: "cash", amount: 1, details: {} };`,
    `// @ts-expect-error a card payment without its own field`,
    `export const bad: Payment = { kind: "card", amount: 1, details: {} };`,
    "",
  ].join("\n")), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-nk8td3ez58gahc4 adds the if and then pair of each RecordType variant at the end of an allOf that the RecordType's schema already holds", () => {
  const root = project([
    record("note", shape({ kind: { enum: ["plain", "signed"] }, text: { type: "string" } }, ["kind"], { allOf: [{ required: ["text"] }] }), { chosenBy: ["kind"] }),
    record("signed note", { properties: { signer: { type: "string" } }, required: ["signer"] }, { answersTo: { kind: "signed" }, ...refines("note") }),
  ]);
  const out = generated(root);
  const note = JSON.parse(out["schemas/checks.json"]!).$defs.Note;
  assert.deepEqual(note.allOf, [{ required: ["text"] }, { if: { properties: { kind: { const: "signed" } }, required: ["kind"] }, then: { $ref: `#${sid("signed note")}` } }]);
  assert.deepEqual(Object.keys(note), ["$comment", "$anchor", "type", "properties", "required", "allOf"]);
  const check = checker(out["schemas/checks.json"]!, "Note");
  assert.ok(check({ kind: "signed", text: "t", signer: "s" }));
  assert.ok(!check({ kind: "signed", signer: "s" }), "the RecordType's own allOf");
  assert.ok(!check({ kind: "signed", text: "t" }), "the variant's field");
});

test("@spec s-nk8td3ez58gahc4 leaves out a RecordType variant that has never been approved, and writes a RecordType none of whose variants was ever approved as an ordinary RecordType without variants", () => {
  const root = project([
    ...payments(),
    record("voucher payment", { properties: { code: { type: "string" } } }, { answersTo: { kind: "voucher" }, ...refines("payment") }),
    record("light", shape({ state: { enum: ["on", "off"] } }, ["state"]), { chosenBy: ["state"] }),
    record("lit light", { properties: { lumens: { type: "integer" } } }, { answersTo: { state: "on" }, ...refines("light") }),
  ], [], undefined, {}, { unapproved: ["voucher payment", "lit light"] });
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^export type Payment = CardPayment \| PaymentOther;$/m);
  assert.match(out["src/types.ts"]!, /^export type PaymentOther = \{\n {2}kind: "cash" \| "voucher";$/m);
  assert.match(out["src/types.ts"]!, /^export type Light = \{\n {2}state: "on" \| "off";\n\};$/m);
  assert.ok(!/VoucherPayment|LitLight|LightOther/.test(Object.values(out).join("\n")), Object.values(out).join("\n"));
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(Object.keys(defs), ["Payment", "CardPayment", "Light"]);
  assert.equal(defs.Payment.allOf.length, 1);
  assert.equal(defs.Light.allOf, undefined);
  assert.deepEqual(writeTypes(root).leftOut, [], "a variant never approved is not named");
});

test("@spec s-nk8td3ez58gahc4 leaves out the type for the combinations that have no variant where every combination has one", () => {
  const root = project([
    record("light", shape({ state: { enum: ["on"] } }, ["state"]), { chosenBy: ["state"] }),
    record("lit light", { properties: { lumens: { type: "integer" } }, required: ["lumens"] }, { answersTo: { state: "on" }, ...refines("light") }),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^export type Light = LitLight;\n/m);
  assert.match(out["src/types.ts"]!, /export type LitLight = \{\n {2}state: "on";\n {2}lumens: number;\n\};/);
  assert.ok(!/LightOther/.test(Object.values(out).join("\n")));
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-nk8td3ez58gahc4 gives the type for the combinations that have no variant every value of each field that selects a variant where several do", () => {
  const root = project([
    record("fee", shape({ kind: { enum: ["flat", "rated"] }, zone: { enum: ["home", "abroad"] } }, ["kind", "zone"]), { chosenBy: ["kind", "zone"] }),
    record("rated abroad fee", { properties: { rate: { type: "number" } }, required: ["rate"] }, { answersTo: { kind: "rated", zone: "abroad" }, ...refines("fee") }),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type FeeOther = \{\n {2}kind: "flat" \| "rated";\n {2}zone: "home" \| "abroad";\n\};/);
  const pair = JSON.parse(out["schemas/checks.json"]!).$defs.Fee.allOf[0];
  assert.deepEqual(pair.if, { properties: { kind: { const: "rated" }, zone: { const: "abroad" } }, required: ["kind", "zone"] });
  const fee = checker(out["schemas/checks.json"]!, "Fee");
  assert.ok(fee({ kind: "rated", zone: "home" }));
  assert.ok(fee({ kind: "rated", zone: "abroad", rate: 2 }));
  assert.ok(!fee({ kind: "rated", zone: "abroad" }));
});

test("@spec s-nk8td3ez58gahc4 takes the fields that select a variant from the nearest RecordType that names them, and gives a variant's definition only the fields that it adds", () => {
  const root = project([
    record("event", shape({ kind: { enum: ["opened", "paid"] } }, ["kind"]), { chosenBy: ["kind"] }),
    record("account event", shape({ account: { type: "string" } }), refines("event")),
    record("stamp", shape({ at: { type: "string", format: "date-time" } }, ["at"])),
    record("paid event", { properties: { amount: { type: "number" } }, required: ["amount"] }, { answersTo: { kind: "paid" }, ...refines("account event", "stamp") }),
  ]);
  const out = generated(root);
  for (const text of [
    'export type Event = {\n  kind: "opened" | "paid";\n};',
    "export type AccountEvent = PaidEvent | AccountEventOther;",
    'export type AccountEventOther = {\n  kind: "opened";\n  account?: string;\n};',
    'export type PaidEvent = {\n  kind: "paid";\n  account?: string;\n  at: string;\n  amount: number;\n};',
  ]) assert.ok(out["src/types.ts"]!.includes(text), `${text}\n---\n${out["src/types.ts"]}`);
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(Object.keys(defs.PaidEvent.properties), ["at", "amount"]);
  assert.deepEqual(defs.PaidEvent.required, ["at", "amount"]);
  assert.deepEqual(defs.AccountEvent.allOf, [{ if: { properties: { kind: { const: "paid" } }, required: ["kind"] }, then: { $ref: `#${sid("paid event")}` } }]);
  assert.equal(defs.Event.allOf, undefined);
  const check = checker(out["schemas/checks.json"]!, "AccountEvent");
  assert.ok(check({ kind: "paid", amount: 1, at: "2026-01-01T00:00:00Z" }));
  assert.ok(!check({ kind: "paid", amount: 1 }), "the field that the variant takes from the stamp");
  assert.ok(check({ kind: "opened" }));
});

test("@spec s-nk8td3ez58gahc4 takes the values of a field that selects a variant as the SpecSheriff tools collect them, the values gathered beside it included", () => {
  const root = project([
    record("milestone", shape({ kind: { enumSource: { from: "parts", gathered: gathered("opened", "paid", "closed") } } }, ["kind"]), { chosenBy: ["kind"] }),
    record("paid milestone", { properties: { amount: { type: "number" } }, required: ["amount"] }, { answersTo: { kind: "paid" }, ...refines("milestone") }),
  ]);
  // The reindex gathers the values anew, so the values of the test are written after it.
  edit(root, CONTRACTS, "milestone", (n) => (n.schema.properties.kind.enumSource.gathered = gathered("opened", "paid", "closed")));
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type MilestoneOther = \{\n {2}kind: "opened" \| "closed";\n\};/);
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.Milestone.properties.kind, { enum: ["opened", "paid", "closed"] });
});

// ---- A project's own generators beside the types.

test("@spec s-f5rz6b7dhxejjts sheriff types writes the files a project's own generator prints, and refuses a path under specs/", () => {
  const root = codeProject();
  withGenerator(root);
  const written = writeTypes(root);
  assert.deepEqual(written.written, ["gen/titles.txt"]);
  assert.equal(readFileSync(join(root, "gen", "titles.txt"), "utf8"), titlesOf());
  const inside = codeProject();
  withGenerator(inside, "specs/forged.json");
  assert.ok(writeTypes(inside).refusals.some((f) => /specs\/forged\.json/.test(f.where + f.message)));
});

test("@spec s-kh8qcd5kxgh9z3j each generated file waits only for the nodes it is generated from: a generator's file for its nodes and its rule, while the types wait for no draft", () => {
  const root = codeProject();
  withGenerator(root);
  const path = join(root, CONTRACTS);
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.push(record("order", shape({ number: { type: "string" } })));
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  const report = writeTypes(root);
  assert.deepEqual(report.written, ["gen/titles.txt"]);
  assert.deepEqual(report.waiting, []);

  const typed = project([customer(), node("open")], [], undefined, {}, { setUp: (r) => withGenerator(r, "gen/titles.txt", "open") });
  approve(typed, [sid("open")], { me: OWNER });
  approve(typed, [sid("our generators")], { me: OWNER, withdraw: true });
  const again = writeTypes(typed);
  assert.deepEqual(again.written, FILES);
  assert.deepEqual(again.waiting, [sid("our generators")]);
  assert.ok(!existsSync(join(typed, "gen", "titles.txt")));
});

test("@spec s-f5rz6b7dhxejjts sheriff types refuses a path a project's generator prints into git's own directory, or naming the repository itself, and then writes no file", () => {
  for (const path of [".git/hooks/pre-commit", "."]) {
    const root = codeProject();
    withGenerator(root, path);
    const report = writeTypes(root);
    assert.deepEqual(report.written, [], path);
    assert.ok(report.refusals.some((f) => f.message.includes(`prints ${path}`)), `${path}: ${report.refusals.map((f) => f.message).join("; ")}`);
  }
});
