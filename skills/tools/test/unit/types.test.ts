import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { Ajv2020 } from "ajv/dist/2020.js";
import { loadSpecification } from "../../src/spec-files.ts";
import { generateTypes, writeTypes } from "../../src/types.ts";
import { confirm } from "../../src/confirmations.ts";
import { file, node, OWNER, sid, taking } from "../fixture.ts";
import { codeProject, editSpec, typedProject, withGenerator } from "../code-project.ts";

/** The base's rule on data structures, which the rule of the stack listing the files implements. */
const DATA_STRUCTURES = "s-e877bnfa559tvk9";
const FILES = ["src/types.ts", "app/types.py", "schemas/checks.json"];

const field = (name: string, type: object, required: boolean | string = true) => ({ name, type, required, text: "" });
const record = (title: string, fields: object[], more: Record<string, unknown> = {}) => node(title, { kind: "recordType", title, fields, unknown: "refused", ...more });
const filesRule = (members: string[], name = "generated types") =>
  node(name, { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "the files of the generated types and runtime checks", members } });

/**
 * A project taking the SpecSheriff guidelines, with RecordTypes in contracts and in a domain, and a stack listing where
 * the types go; its RecordTypes confirmed, since the code generated from them waits for that.
 */
function project(contracts: object[], bank: object[] = [], stack: object[] = [filesRule(FILES)], more: Record<string, unknown> = {}): string {
  const root = taking({
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: contracts })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("bank", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: bank })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: stack })),
    ...more,
  });
  const records = [...loadSpecification(root).nodes].filter(([, { node }]) => node.kind === "recordType").map(([s]) => s);
  if (records.length) confirm(root, records, { me: OWNER });
  return root;
}

const generated = (root: string) => {
  const result = generateTypes(loadSpecification(root));
  assert.deepEqual(result.refusals, [], "nothing refused");
  return Object.fromEntries(result.files.map((f) => [f.path, f.text]));
};
const refusals = (root: string) => generateTypes(loadSpecification(root)).refusals.map((f) => `${f.where}: ${f.message}`);

const customer = () => record("customer", [field("number", { is: "text" }), field("email", { is: "email address" }, false)], { identifiedBy: "number" });

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

/** The runtime check of one definition of the file of checks. */
function checker(checks: string, name: string) {
  const ajv = new Ajv2020({ strict: true, validateFormats: false });
  return ajv.compile({ ...JSON.parse(checks), $ref: `#/$defs/${name}` });
}

// ---- s-pvzms7d8kxb8dk2: where the files are written.

test("@spec s-pvzms7d8kxb8dk2 writes nothing where the technical appendix lists no files for the types", () => {
  const root = project([customer()], [], [node("runtime")]);
  assert.deepEqual(writeTypes(root), { written: [], refusals: [], waiting: [] });
  for (const path of FILES) assert.ok(!existsSync(join(root, path)), path);
});

test("@spec s-pvzms7d8kxb8dk2 writes each file the stack's rule lists, its extension saying what goes into it", () => {
  const root = project([customer()]);
  const report = writeTypes(root);
  assert.deepEqual(report, { written: FILES, refusals: [], waiting: [] });
  assert.match(readFileSync(join(root, "src/types.ts"), "utf8"), /^export type Customer = \{$/m);
  assert.match(readFileSync(join(root, "app/types.py"), "utf8"), /^Customer = TypedDict\("Customer", \{$/m);
  assert.equal(JSON.parse(readFileSync(join(root, "schemas/checks.json"), "utf8")).$schema, "https://json-schema.org/draft/2020-12/schema");
});

test("@spec s-f5rz6b7dhxejjts sheriff types writes only a file that is missing or holds, line endings aside, anything else than it generates, and names each", () => {
  const root = project([customer()]);
  writeTypes(root);
  assert.deepEqual(writeTypes(root), { written: [], refusals: [], waiting: [] }, "run again, it writes nothing");
  const types = join(root, "src/types.ts");
  writeFileSync(types, readFileSync(types, "utf8").replace(/\n/g, "\r\n"));
  assert.deepEqual(writeTypes(root).written, [], "line endings aside");
  writeFileSync(types, "edited by hand\n");
  rmSync(join(root, "schemas/checks.json"));
  assert.deepEqual(writeTypes(root).written, ["src/types.ts", "schemas/checks.json"]);
  assert.match(readFileSync(types, "utf8"), /^export type Customer = \{$/m);
});

test("@spec s-f5rz6b7dhxejjts sheriff types writes no file while a RecordType is unchecked, and names each such node", () => {
  const root = project([customer(), record("order", [field("number", { is: "text" })])]);
  confirm(root, [sid("order")], { me: OWNER, withdraw: true });
  assert.deepEqual(writeTypes(root), { written: [], refusals: [], waiting: [sid("order")] });
  for (const path of FILES) assert.ok(!existsSync(join(root, path)), path);
});

test("@spec s-pvzms7d8kxb8dk2 refuses a listed file of another extension, and two rules of the stack each listing files, and then writes nothing", () => {
  const other = project([customer()], [], [filesRule(["src/types.js"])]);
  assert.ok(refusals(other).some((m) => m.includes(sid("generated types")) && /src\/types\.js.*neither \.ts, \.py nor \.json/.test(m)), refusals(other).join("\n"));
  const two = project([customer()], [], [filesRule(["src/types.ts"]), filesRule(["src/more.ts"], "more types")]);
  assert.ok(refusals(two).some((m) => m.includes(sid("more types")) && /a second list of the files/.test(m)), refusals(two).join("\n"));
  assert.equal(writeTypes(two).written.length, 0);
  assert.ok(!existsSync(join(two, "src/types.ts")));
});

test("@spec s-pvzms7d8kxb8dk2 takes the list from a rule of the stack only", () => {
  const root = project([customer()], [], [node("runtime")], {
    "specs/tech/bank.json": file("tech", "bank", node("bank tech", { kind: "section", text: "Bank, built.", children: [filesRule(FILES, "bank types")] })),
  });
  assert.deepEqual(generateTypes(loadSpecification(root)).files, []);
});

// ---- s-suv42g8r3ra2h6b: what a RecordType generates.

test("@spec s-suv42g8r3ra2h6b writes each RecordType as a type tagged with its sid and a definition under $defs, in each language", () => {
  const root = project([customer(), record("user account", [
    field("owner", { is: "identifier of", record: sid("customer") }),
    field("tags", { is: "list of", of: { is: "text" } }, false),
    field("limits", { is: "map of", of: { is: "whole number", minimum: 0 } }, false),
  ], { unknown: "kept" })]);
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
        type: "object",
        properties: { number: { type: "string" }, email: { type: "string", format: "email" } },
        required: ["number"],
        additionalProperties: false,
      },
      UserAccount: {
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
  const root = project([record("second", [field("a", { is: "text" })])], [], undefined, {
    "specs/contracts/B.json": file("contracts", "B", node("upper", { kind: "section", text: "Upper.", children: [record("first", [field("a", { is: "text" })]), record("between", [field("a", { is: "text" })])] })),
  });
  const names = [...generated(root)["src/types.ts"]!.matchAll(/^export type (\w+)/gm)].map((m) => m[1]);
  assert.deepEqual(names, ["First", "Between", "Second"]);
});

test("@spec s-suv42g8r3ra2h6b holds the fields of every RecordType up the refines links first, the topmost first", () => {
  const root = project([
    record("base event", [field("at", { is: "instant" })]),
    record("account event", [field("account", { is: "text" })], { refs: [{ type: "refines", to: sid("base event") }] }),
    record("audit event", [field("by", { is: "text" }, false)], { refs: [{ type: "refines", to: sid("account event") }] }),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type AuditEvent = \{\n {2}at: string;\n {2}account: string;\n {2}by\?: string;\n\};/);
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.AuditEvent.required, ["at", "account"]);
});

test("@spec s-suv42g8r3ra2h6b refers to a RecordType by the name of its type, in Python as a string, and the files compile and run", () => {
  const root = project([customer(), record("order", [field("buyer", { is: "record", record: sid("customer") }), field("lines", { is: "list of", of: { is: "record", record: sid("customer") } }, false)])]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^ {2}buyer: Customer;$/m);
  assert.match(out["app/types.py"]!, /^ {4}"buyer": "Customer",$/m);
  assert.match(out["app/types.py"]!, /^ {4}"lines": NotRequired\[list\["Customer"\]\],$/m);
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.Order.properties.buyer, { $ref: "#/$defs/Customer" });
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { Order } from "./types.ts";\nexport const o: Order = { buyer: { number: "1" } };\n`), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
  const order = checker(out["schemas/checks.json"]!, "Order");
  assert.ok(order({ buyer: { number: "1" } }));
  assert.ok(!order({ buyer: { number: "1", extra: true } }), "a property the RecordType refuses");
});

test("@spec s-suv42g8r3ra2h6b cannot generate a name that is no identifier in its file's language, or that the file already uses", () => {
  const root = project([
    record("3d model", [field("a", { is: "text" })]),
    record("none", [field("a", { is: "text" })]),
    record("a b", [field("a", { is: "text" })]),
    record("AB", [field("a", { is: "text" })]),
    record("any", [field("payload", { is: "any value" })]),
    record("record", [field("index", { is: "map of", of: { is: "text" } })]),
  ]);
  const found = refusals(root);
  const has = (who: string, pattern: RegExp) => assert.ok(found.some((m) => m.includes(sid(who)) && pattern.test(m)), `${who} ${pattern}:\n${found.join("\n")}`);
  has("3d model", /3dModel cannot be generated in src\/types\.ts: not an identifier/);
  has("3d model", /3dModel cannot be generated in app\/types\.py: not an identifier/);
  has("none", /None cannot be generated in app\/types\.py: a keyword/);
  has("AB", /AB cannot be generated in src\/types\.ts: a name the file already uses/);
  has("any", /Any cannot be generated in app\/types\.py: a name the file already uses/);
  has("record", /Record cannot be generated in src\/types\.ts: a name the file already uses/);
  assert.ok(!found.some((m) => /None cannot be generated in src\/types\.ts|checks\.json: not an identifier/.test(m)), found.join("\n"));
  assert.equal(writeTypes(root).written.length, 0);
});

// ---- s-nk8td3ez58gahc4: a RecordType its variants refine.

/** A payment whose kind chooses its variant: a card payment has fields of its own, inside the details every payment holds. */
const payments = () => [
  record("payment", [
    field("kind", { is: "one of", values: ["cash", "card", "voucher"] }),
    field("amount", { is: "number" }),
    field("details", { is: "variant", fields: [field("note", { is: "text" }, false)] }, "where it holds a value"),
  ], { chosenBy: ["kind"] }),
  record("card payment", [field("last4", { is: "text" })], { answersTo: { kind: "card" }, refs: [{ type: "refines", to: sid("payment") }] }),
];

test("@spec s-nk8td3ez58gahc4 writes a RecordType its variants refine as the union of each variant and a member for the values no variant answers to", () => {
  const out = generated(project(payments()));
  assert.equal(out["src/types.ts"], [
    `/** @spec ${sid("payment")} */`,
    "export type Payment = CardPayment | PaymentOther;",
    "",
    `/** @spec ${sid("payment")} */`,
    "export type PaymentOther = {",
    '  kind: "cash" | "voucher";',
    "  amount: number;",
    "  details: {",
    "    note?: string;",
    "  };",
    "};",
    "",
    `/** @spec ${sid("card payment")} */`,
    "export type CardPayment = {",
    '  kind: "card";',
    "  amount: number;",
    "  details: {",
    "    note?: string;",
    "    last4: string;",
    "  };",
    "};",
    "",
  ].join("\n"));
  assert.equal(out["app/types.py"], [
    "from typing import Literal, NotRequired, TypedDict, Union",
    "",
    `# @spec ${sid("payment")}`,
    'Payment = Union["CardPayment", "PaymentOther"]',
    "",
    `# @spec ${sid("payment")}`,
    'PaymentOther = TypedDict("PaymentOther", {',
    '    "kind": Literal["cash", "voucher"],',
    '    "amount": float,',
    '    "details": "PaymentOtherDetails",',
    "})",
    "",
    `# @spec ${sid("payment")}`,
    'PaymentOtherDetails = TypedDict("PaymentOtherDetails", {',
    '    "note": NotRequired[str],',
    "})",
    "",
    `# @spec ${sid("card payment")}`,
    'CardPayment = TypedDict("CardPayment", {',
    '    "kind": Literal["card"],',
    '    "amount": float,',
    '    "details": "CardPaymentDetails",',
    "})",
    "",
    `# @spec ${sid("card payment")}`,
    'CardPaymentDetails = TypedDict("CardPaymentDetails", {',
    '    "note": NotRequired[str],',
    '    "last4": str,',
    "})",
    "",
  ].join("\n"));
  const defs = JSON.parse(out["schemas/checks.json"]!).$defs;
  assert.deepEqual(Object.keys(defs), ["Payment", "PaymentOther", "CardPayment"]);
  assert.deepEqual(defs.Payment, { oneOf: [{ $ref: "#/$defs/CardPayment" }, { $ref: "#/$defs/PaymentOther" }] });
  assert.deepEqual(defs.PaymentOther, {
    type: "object",
    properties: {
      kind: { enum: ["cash", "card", "voucher"] },
      amount: { type: "number" },
      details: { type: "object", properties: { note: { type: "string" } }, additionalProperties: false },
    },
    required: ["kind", "amount", "details"],
    additionalProperties: false,
    not: { anyOf: [{ properties: { kind: { const: "card" } }, required: ["kind"] }] },
  });
  assert.deepEqual(defs.CardPayment, {
    type: "object",
    properties: {
      kind: { const: "card" },
      amount: { type: "number" },
      details: { type: "object", properties: { note: { type: "string" }, last4: { type: "string" } }, required: ["last4"], additionalProperties: false },
    },
    required: ["kind", "amount", "details"],
    additionalProperties: false,
  });
});

test("@spec s-nk8td3ez58gahc4 lets exactly one member hold each payment, in every language", () => {
  const out = generated(project(payments()));
  const payment = checker(out["schemas/checks.json"]!, "Payment");
  assert.ok(payment({ kind: "card", amount: 1, details: { last4: "1234" } }));
  assert.ok(payment({ kind: "cash", amount: 1, details: {} }));
  assert.ok(!payment({ kind: "card", amount: 1, details: {} }), "a card payment without its own field");
  assert.ok(!payment({ kind: "cash", amount: 1, details: { last4: "1234" } }), "a field only the card's variant declares");
  assert.ok(!payment({ kind: "cash", amount: 1 }), "the details every payment holds");
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, [
    `import type { Payment } from "./types.ts";`,
    `export const card: Payment = { kind: "card", amount: 1, details: { last4: "1234" } };`,
    `export const cash: Payment = { kind: "cash", amount: 1, details: {} };`,
    `// @ts-expect-error a card payment without its own field`,
    `export const bad: Payment = { kind: "card", amount: 1, details: {} };`,
    "",
  ].join("\n")), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-nk8td3ez58gahc4 sets a variant's own fields beside the RecordType's where it has no field of type variant, and leaves out the member nobody needs", () => {
  const root = project([
    record("light", [field("state", { is: "one of", values: ["on"] })], { chosenBy: ["state"] }),
    record("lit light", [field("lumens", { is: "whole number" })], { answersTo: { state: "on" }, refs: [{ type: "refines", to: sid("light") }] }),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type Light = LitLight;\n/);
  assert.match(out["src/types.ts"]!, /export type LitLight = \{\n {2}state: "on";\n {2}lumens: number;\n\};/);
  assert.ok(!/LightOther/.test(out["src/types.ts"]! + out["app/types.py"]! + out["schemas/checks.json"]!));
});

test("@spec s-nk8td3ez58gahc4 gives the other member every value of each choosing field where several choose, and refuses only the combinations a variant answers to", () => {
  const root = project([
    record("fee", [field("kind", { is: "one of", values: ["flat", "rated"] }), field("zone", { is: "one of", values: ["home", "abroad"] })], { chosenBy: ["kind", "zone"] }),
    record("rated abroad fee", [field("rate", { is: "number" })], { answersTo: { kind: "rated", zone: "abroad" }, refs: [{ type: "refines", to: sid("fee") }] }),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /export type FeeOther = \{\n {2}kind: "flat" \| "rated";\n {2}zone: "home" \| "abroad";\n\};/);
  const fee = checker(out["schemas/checks.json"]!, "Fee");
  assert.ok(fee({ kind: "rated", zone: "home" }));
  assert.ok(fee({ kind: "rated", zone: "abroad", rate: 2 }));
  assert.ok(!fee({ kind: "rated", zone: "abroad" }));
});

test("@spec s-nk8td3ez58gahc4 follows each node on a property nobody declared, and leaves out a field of type variant whose object would hold nothing", () => {
  const root = project([
    record("note", [field("kind", { is: "one of", values: ["plain", "signed"] }), field("extra", { is: "variant" }, "where it holds a value")], { chosenBy: ["kind"], unknown: "kept" }),
    record("signed note", [field("signer", { is: "text" })], { answersTo: { kind: "signed" }, refs: [{ type: "refines", to: sid("note") }] }),
  ]);
  const defs = JSON.parse(generated(root)["schemas/checks.json"]!).$defs;
  assert.deepEqual(Object.keys(defs.NoteOther.properties), ["kind"], "an object holding nothing is not declared");
  assert.equal(defs.NoteOther.additionalProperties, undefined, "the RecordType keeps what nobody declared");
  assert.equal(defs.SignedNote.additionalProperties, false, "the variant refuses it");
  assert.equal(defs.SignedNote.properties.extra.additionalProperties, false, "inside the field of type variant too");
  assert.deepEqual(defs.SignedNote.required, ["kind", "extra"]);
});

// ---- s-4npdup7mjkva69y: the type each neutral type gives.

test("@spec s-4npdup7mjkva69y gives each neutral type the type its table names, in each language", () => {
  const root = project([customer(), record("sample", [
    field("title", { is: "text" }),
    field("mail", { is: "email address" }),
    field("count", { is: "whole number", minimum: 0, maximum: 10 }),
    field("ratio", { is: "number", exclusiveMinimum: 0 }),
    field("active", { is: "yes/no" }),
    field("at", { is: "instant" }),
    field("day", { is: "date" }),
    field("span", { is: "duration" }),
    field("payload", { is: "any value" }),
    field("mode", { is: "one of", values: ["fast", "slow"] }),
    field("levels", { is: "list of", of: { is: "one of", values: ["low", "high"] } }),
    field("tags", { is: "list of", of: { is: "whole number", minimum: 0 }, minItems: 1, maxItems: 3 }),
    field("scores", { is: "map of", of: { is: "number" } }),
    field("owner", { is: "record", record: sid("customer") }),
    field("ownerNumber", { is: "identifier of", record: sid("customer") }),
    field("extra", { is: "variant", fields: [field("hint", { is: "text" }, false)] }, "where it holds a value"),
  ], { chosenBy: ["mode"], unknown: "kept" })]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, new RegExp([
    "export type Sample = \\{",
    "  title: string;", "  mail: string;", "  count: number;", "  ratio: number;", "  active: boolean;", "  at: string;", "  day: string;", "  span: string;",
    "  payload: unknown;", '  mode: "fast" \\| "slow";', '  levels: \\("low" \\| "high"\\)\\[\\];', "  tags: number\\[\\];", "  scores: Record<string, number>;",
    "  owner: Customer;", "  ownerNumber: string;", "  extra: \\{", "    hint\\?: string;", "  \\};", "\\};",
  ].join("\n")));
  assert.match(out["app/types.py"]!, /^from typing import Any, Literal, NotRequired, TypedDict$/m);
  assert.match(out["app/types.py"]!, new RegExp([
    'Sample = TypedDict\\("Sample", \\{',
    '    "title": str,', '    "mail": str,', '    "count": int,', '    "ratio": float,', '    "active": bool,', '    "at": str,', '    "day": str,', '    "span": str,',
    '    "payload": Any,', '    "mode": Literal\\["fast", "slow"\\],', '    "levels": list\\[Literal\\["low", "high"\\]\\],', '    "tags": list\\[int\\],', '    "scores": dict\\[str, float\\],',
    '    "owner": "Customer",', '    "ownerNumber": str,', '    "extra": "SampleExtra",', "\\}\\)",
    "", `# @spec ${sid("sample")}`, 'SampleExtra = TypedDict\\("SampleExtra", \\{', '    "hint": NotRequired\\[str\\],', "\\}\\)",
  ].join("\n")));
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.Sample, {
    type: "object",
    properties: {
      title: { type: "string" },
      mail: { type: "string", format: "email" },
      count: { type: "integer", minimum: 0, maximum: 10 },
      ratio: { type: "number", exclusiveMinimum: 0 },
      active: { type: "boolean" },
      at: { type: "string", format: "date-time" },
      day: { type: "string", format: "date" },
      span: { type: "string", format: "duration" },
      payload: {},
      mode: { enum: ["fast", "slow"] },
      levels: { type: "array", items: { enum: ["low", "high"] } },
      tags: { type: "array", items: { type: "integer", minimum: 0 }, minItems: 1, maxItems: 3 },
      scores: { type: "object", additionalProperties: { type: "number" } },
      owner: { $ref: "#/$defs/Customer" },
      ownerNumber: { type: "string" },
      extra: { type: "object", properties: { hint: { type: "string" } } },
    },
    required: ["title", "mail", "count", "ratio", "active", "at", "day", "span", "payload", "mode", "levels", "tags", "scores", "owner", "ownerNumber", "extra"],
  });
  assert.deepEqual(typescriptErrors(out["src/types.ts"]!, `import type { Sample } from "./types.ts";\nexport type S = Sample;\n`), []);
  assert.equal(pythonRuns(out["app/types.py"]!), "ok");
});

test("@spec s-4npdup7mjkva69y bounds how many members a list holds in the runtime checks alone", () => {
  const root = project([record("order", [field("lines", { is: "list of", of: { is: "text" }, minItems: 1, maxItems: 2 })])]);
  const out = generated(root);
  const check = checker(out["schemas/checks.json"]!, "Order");
  assert.equal(check({ lines: [] }), false, "fewer members than the least");
  assert.equal(check({ lines: ["a"] }), true);
  assert.equal(check({ lines: ["a", "b", "c"] }), false, "more members than the most");
  assert.match(out["src/types.ts"]!, /^ {2}lines: string\[\];$/m);
  assert.match(out["app/types.py"]!, /^ {4}"lines": list\[str\],$/m);
});

test("@spec s-4npdup7mjkva69y gives a field of type one of the values the lists of domains declare for it, in the order the specification reads", () => {
  const root = project([
    record("event", [field("kind", { is: "one of", from: "domains" })], { chosenBy: ["kind"] }),
  ], [
    node("bank events", { list: { of: "the kinds of event the bank brings", members: ["opened", "paid"], field: "kind" }, refs: [{ type: "refines", to: sid("event") }] }),
    record("paid event", [field("amount", { is: "number" })], { answersTo: { kind: "paid" }, refs: [{ type: "refines", to: sid("event") }] }),
  ]);
  const out = generated(root);
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.EventOther.properties.kind, { enum: ["opened", "paid"] });
  assert.match(out["src/types.ts"]!, /export type EventOther = \{\n {2}kind: "opened";\n\};/);
});

test("@spec s-4npdup7mjkva69y gives an identifier the type of the field identifying the RecordType it names", () => {
  const root = project([
    record("ticket", [field("seq", { is: "whole number", minimum: 1 })], { identifiedBy: "seq" }),
    record("reply", [field("ticket", { is: "identifier of", record: sid("ticket") })]),
  ]);
  const out = generated(root);
  assert.match(out["src/types.ts"]!, /^ {2}ticket: number;$/m);
  assert.match(out["app/types.py"]!, /^ {4}"ticket": int,$/m);
  assert.deepEqual(JSON.parse(out["schemas/checks.json"]!).$defs.Reply.properties.ticket, { type: "integer", minimum: 1 });
});

test("@spec s-f5rz6b7dhxejjts sheriff types writes the files a project's own generator prints, and refuses a path under specs/", () => {
  const root = codeProject();
  withGenerator(root);
  const written = writeTypes(root);
  assert.deepEqual(written.written, ["gen/titles.txt"]);
  assert.equal(readFileSync(join(root, "gen", "titles.txt"), "utf8"), "open\n");
  const inside = codeProject();
  withGenerator(inside, "specs/forged.json");
  assert.ok(writeTypes(inside).refusals.some((f) => /specs\/forged\.json/.test(f.where + f.message)));
});

test("@spec s-kh8qcd5kxgh9z3j each generated file waits only for the nodes it is generated from: a generator's file for its nodes and its rule, the types for the RecordTypes", () => {
  const root = codeProject();
  withGenerator(root);
  editSpec(root, (d) => d.nodes[0].children.push(node("order", { kind: "recordType", title: "order", fields: [{ name: "number", type: { is: "text" }, required: true, text: "" }], unknown: "refused" })));
  const report = writeTypes(root);
  assert.deepEqual(report.written, ["gen/titles.txt"]);
  assert.deepEqual(report.waiting, [sid("order")]);

  const typed = typedProject();
  withGenerator(typed, "gen/titles.txt", "customer");
  confirm(typed, [sid("our generators")], { me: OWNER, withdraw: true });
  rmSync(join(typed, "src", "types.ts"));
  const again = writeTypes(typed);
  assert.deepEqual(again.written, ["src/types.ts"]);
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
