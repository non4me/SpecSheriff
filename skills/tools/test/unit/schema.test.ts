import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { loadSchema } from "../../src/schema.ts";
import { NONE, OWNER, repo, sid } from "../fixture.ts";
import { REPO } from "../repo.ts";

const schema = loadSchema(REPO);
const ok = { location: "x/1", sid: sid("ok"), kind: "TextRule", title: "t", status: "draft", text: "", refs: [] };
const file = (...nodes: object[]) => ({ schemaVersion: 1, scope: "x", section: "x", nodes });

test("@spec s-eferktypcj7njt5 accepts every file of the specification as it stands", () => {
  for (const f of loadSpecification(REPO).files) assert.deepEqual(schema.check(f.data), [], f.path);
});

const refused: Record<string, object> = {
  "a field nobody declared": { ...ok, foo: 1 },
  "owners on a rule": { ...ok, owners: ["a@b.c"] },
  "one owner where a list stands, as an earlier release wrote it": { ...ok, kind: "section", owner: "a@b.c" },
  "an empty list of owners": { ...ok, kind: "section", owners: [] },
  "a status other than draft or approved": { ...ok, status: "done" },
  "the status an earlier release wrote for approved": { ...ok, status: "checked" },
  "a sid outside its alphabet": { ...ok, sid: "s-000000000000000" },
  "a ratio on a link that is not a term-relation": { ...ok, refs: [{ type: "cites", to: NONE, ratio: "1:1" }] },
  "a link naming both its ends": { ...ok, refs: [{ type: "cites", to: NONE, from: NONE }] },
  "a comment opening with TODO": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "TODO x" }] } },
  "a comment of a type other than problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "note" }] } },


  "an archived node without its reason": { ...ok, archived: { date: "2026-10-28" } },
  "a list naming a field, as the lists of the domains of earlier releases did": { ...ok, list: { of: "x", members: ["a"], field: "kind" } },
};
for (const [what, node] of Object.entries(refused)) {
  test(`@spec s-eferktypcj7njt5 refuses ${what}`, () => {
    assert.notDeepEqual(schema.check(file(node)), []);
  });
}

const accepted: Record<string, object> = {
  "owners on a section": { ...ok, kind: "section", owners: ["a@b.c", "d@e.f"] },
  "a comment of type problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "problem" }] } },


  "an archived node with its reason and replacement": { ...ok, archived: { date: "2026-10-28", reason: "r", replacedBy: NONE } },
};
for (const [what, node] of Object.entries(accepted)) {
  test(`@spec s-eferktypcj7njt5 accepts ${what}`, () => {
    assert.deepEqual(schema.check(file(node)), []);
  });
}

test("@spec s-eferktypcj7njt5 names the field that is wrong", () => {
  const [error] = schema.check(file({ ...ok, children: [{ ...ok, status: "done" }] }));
  assert.match(error!, /\/nodes\/0\/children\/0\/status/);
});

test("@spec s-eferktypcj7njt5 names a field nobody declared, and a required field that is missing", () => {
  assert.ok(schema.check(file({ ...ok, foo: 1 })).some((e) => /\/nodes\/0.*"foo"/.test(e)), "the undeclared field");
  const { text: _, ...withoutText } = ok;
  assert.ok(schema.check(file(withoutText)).some((e) => /\/nodes\/0.*"text"/.test(e)), "the missing field");
});

/** A project's extension: a kind of its own, a field it adds to rules, and a property of a file and of a link. */
const EXTENSION = {
  kinds: { job: { needsCode: true, schema: { properties: { steps: { type: "array", items: { type: "string" } } }, required: ["steps"] } } },
  fields: { TextRule: { properties: { severity: { enum: ["low", "high"] } } } },
  file: { properties: { domainCode: { type: "string" } } },
  link: { properties: { note: { type: "string" } } },
};
const extended = (extension: object) => loadSchema(repo({ "specs/_schema/project.schema.json": extension }));

test("@spec s-xzcw3hv4hmxz7h7 composes a project's extension with the schema: its kinds, the fields it adds to a kind, the properties of a file and of a link", () => {
  const ours = extended(EXTENSION);
  assert.deepEqual(ours.extension, []);
  assert.deepEqual(ours.check(file({ ...ok, kind: "job", steps: ["open"] })), []);
  assert.notDeepEqual(ours.check(file({ ...ok, kind: "job" })), [], "a job without its steps");
  assert.notDeepEqual(ours.check(file({ ...ok, kind: "task" })), [], "a kind nobody declared");
  assert.deepEqual(ours.check(file({ ...ok, severity: "low" })), []);
  assert.notDeepEqual(ours.check(file({ ...ok, severity: "none" })), [], "a value the added field refuses");
  assert.notDeepEqual(ours.check(file({ ...ok, kind: "section", severity: "low" })), [], "a field added to rules, on a section");
  assert.deepEqual(ours.check({ ...file(ok), domainCode: "AC" }), []);
  assert.deepEqual(ours.check(file({ ...ok, refs: [{ type: "cites", to: NONE, note: "why" }] })), []);
  assert.notDeepEqual(schema.check(file({ ...ok, kind: "job", steps: ["open"] })), [], "the kind, where no extension declares it");
});

test("@spec s-xzcw3hv4hmxz7h7 refuses an extension that does more than add, and then composes nothing", () => {
  const cases: Record<string, object> = {
    "a key the schema of an extension does not hold": { ...EXTENSION, nodes: {} },
    "a kind the SpecSheriff guidelines already have": { kinds: { TextRule: { needsCode: true, schema: {} } } },
    "a kind named rule, the name earlier releases gave TextRule, which the reindex renames": { kinds: { rule: { needsCode: true, schema: {} } } },
    "a kind named domain, the name earlier releases gave header, which the reindex renames": { kinds: { domain: { needsCode: true, schema: {} } } },
    "a kind named record, the name earlier releases gave RecordType, which the reindex renames": { kinds: { record: { needsCode: true, schema: {} } } },
    "a kind with no word on whether it needs code": { kinds: { job: { schema: {} } } },
    "a field the schema already defines": { fields: { TextRule: { properties: { text: { type: "number" } } } } },
    "a field a kind of its own names as the schema does": { kinds: { job: { needsCode: false, schema: { properties: { title: { type: "number" } } } } } },
    "a property a file already has": { file: { properties: { scope: { type: "number" } } } },
  };
  for (const [what, extension] of Object.entries(cases)) {
    const ours = extended(extension);
    assert.notDeepEqual(ours.extension, [], what);
    assert.notDeepEqual(ours.check(file({ ...ok, kind: "job", steps: [] })), [], `${what}: nothing composed`);
  }
});

test("@spec s-eferktypcj7njt5 accepts a list whose members are objects naming the property that holds each one's value", () => {
  const listed = { ...ok, list: { of: "the levels", property: "name", members: [{ name: "core", rank: 1 }, "auxiliary"] } };
  assert.deepEqual(schema.check(file(listed)), []);
});



/** The schema of a repository whose settings choose the given extensions of the guidelines, with the given files beside them. */
const choosing = (names: string[], files: Record<string, unknown> = {}) =>
  loadSchema(repo({ "sheriff.config.json": { code: [], tests: [], extensions: names.map((name) => ({ name, chosen: true, by: OWNER })) }, ...files }));
const header = { ...ok, kind: "header", level: "core", sections: [] };
const consuming = { ...ok, refs: [{ type: "consumes", to: NONE }] };

test("@spec s-xzcw3hv4hmxz7h7 adds the schema of the Domains extension only where the project has chosen it: a domain's header and the consumes link", () => {
  const domains = choosing(["domains"]);
  assert.deepEqual(domains.extension, []);
  assert.deepEqual(domains.check(file(header)), []);
  assert.deepEqual(domains.check(file({ ...ok, kind: "header" })), [], "a header without a level or an index");
  assert.deepEqual(domains.check(file(consuming)), []);
  assert.notDeepEqual(domains.check(file({ ...header, code: "src/bank" })), [], "a header stating where the domain's code is");
  const none = choosing([]);
  assert.notDeepEqual(none.check(file(header)), [], "a header where the Domains extension is not chosen");
  assert.notDeepEqual(none.check(file(consuming)), [], "the link consumes where the Domains extension is not chosen");
});

test("@spec s-xzcw3hv4hmxz7h7 adds the project's extension after the chosen extensions, so that its fields may set conditions for a kind that a chosen extension adds", () => {
  const project = { "specs/_schema/project.schema.json": { fields: { header: { properties: { region: { type: "string" } } } } } };
  const domains = choosing(["domains"], project);
  assert.deepEqual(domains.extension, []);
  assert.deepEqual(domains.check(file({ ...header, region: "eu" })), []);
  assert.notDeepEqual(domains.check(file({ ...header, region: 1 })), [], "a value the added field refuses");
  assert.notDeepEqual(choosing([], project).extension, [], "fields for a kind that no chosen extension adds");
});

/** Two extensions whose names sort one way bytewise and the other way in dictionary order: `B` adds a kind of node, and `a` sets a condition for it. */
const ordered = {
  "specs/_schema/extensions/B.schema.json": { kinds: { job: { needsCode: true, schema: { properties: { steps: { type: "array" } } } } } },
  "specs/_schema/extensions/a.schema.json": { fields: { job: { properties: { owner: { type: "string" } } } } },
};

test("@spec s-xzcw3hv4hmxz7h7 adds the schemas of the chosen extensions in the bytewise order of their names", () => {
  const both = choosing(["a", "B"], ordered);
  assert.deepEqual(both.extension, []);
  assert.deepEqual(both.check(file({ ...ok, kind: "job", steps: [], owner: "x" })), []);
  assert.notDeepEqual(both.check(file({ ...ok, kind: "job", owner: 1 })), [], "the condition that the later extension sets");
});

test("@spec s-xzcw3hv4hmxz7h7 composes the types of link and the definitions that an extension adds", () => {
  const ours = choosing([], { "specs/_schema/project.schema.json": {
    linkTypes: ["follows"],
    $defs: { code: { type: "string", pattern: "^[A-Z]{2}$" } },
    kinds: { job: { needsCode: true, schema: { properties: { code: { $ref: "#/$defs/code" } } } } },
  } });
  assert.deepEqual(ours.extension, []);
  assert.deepEqual(ours.check(file({ ...ok, refs: [{ type: "follows", to: NONE }] })), []);
  assert.deepEqual(ours.check(file({ ...ok, kind: "job", code: "AC" })), []);
  assert.notDeepEqual(ours.check(file({ ...ok, kind: "job", code: "x" })), [], "a value the added definition refuses");
  assert.notDeepEqual(schema.check(file({ ...ok, refs: [{ type: "follows", to: NONE }] })), [], "the type of link, where no extension adds it");
});

test("@spec s-xzcw3hv4hmxz7h7 refuses an extension that adds a name the composed schema already holds, naming its file, and stops composing at it", () => {
  const cases: Record<string, object> = {
    "a kind that a chosen extension adds": { kinds: { header: { needsCode: false, schema: {} } } },
    "a type of link that a chosen extension adds": { linkTypes: ["consumes"] },
    "a type of link of the SpecSheriff guidelines": { linkTypes: ["cites"] },
    "a definition of the SpecSheriff guidelines": { $defs: { sid: { type: "string" } } },
    "a property that a chosen extension gives a kind": { fields: { header: { properties: { level: { type: "number" } } } } },
  };
  for (const [what, extension] of Object.entries(cases)) {
    const ours = choosing(["domains"], { "specs/_schema/project.schema.json": extension });
    assert.deepEqual(ours.extension.map((r) => r.where), ["specs/_schema/project.schema.json"], what);
  }
  const first = choosing(["a", "B"], { ...ordered, "specs/_schema/extensions/B.schema.json": { $defs: { sid: { type: "string" } } } });
  assert.deepEqual(first.extension.map((r) => r.where), ["specs/_schema/extensions/B.schema.json"], "B is refused, and a, which relies on what B would add, is not composed");
});

test("@spec s-bckzdwd35d2nefa accepts a ratio in UML notation and refuses one written in the notation of earlier releases", () => {
  const ratio = (r: string) => file({ ...ok, kind: "term", refs: [{ type: "term-relation", to: NONE, ratio: r }] });
  for (const r of ["1:0..*", "0..*:2", "2:3..5", "0..1:1..*", "1:1"]) assert.deepEqual(schema.check(ratio(r)), [], r);
  for (const r of ["0..N:1", "1:1..N", "1:", "01:1", "1..:1", "*:1"]) assert.notDeepEqual(schema.check(ratio(r)), [], r);
});

/** The schema of a repository that has chosen the RecordType extension. */
const recordtype = choosing(["recordtype"]);
/** A file holding one RecordType with the given schema. */
const rt =(format: object, more: object = {}) => file({ ...ok, kind: "RecordType", schema: format, ...more });
const account = { type: "object", properties: { number: { type: "string", maxLength: 34, description: "The account's number." } }, required: ["number"] };

test("@spec s-eferktypcj7njt5 accepts a RecordType whose schema is an object in JSON Schema form only where the project has chosen the RecordType extension, and refuses the form that earlier releases wrote", () => {
  assert.deepEqual(recordtype.extension, []);
  assert.deepEqual(recordtype.check(rt(account, { identifiedBy: "number" })), []);
  assert.notDeepEqual(choosing([]).check(rt(account)), [], "a RecordType where the RecordType extension is not chosen");
  assert.notDeepEqual(recordtype.check(file({ ...ok, kind: "RecordType", unknown: "refused", fields: [] })), [], "the fields and unknown of earlier releases");
  assert.notDeepEqual(recordtype.check(rt({ type: "object", properties: { a: { minLength: -1 } } })), [], "a schema that JSON Schema 2020-12 refuses");
  assert.notDeepEqual(recordtype.check(rt(account, { identifiedBy: "Number" })), [], "an identifying field that is no field name");
});

test("@spec s-j4t9vusnsajmqdw checks enumSource and identifierOf at any depth within a RecordType's schema, as the schema of the RecordType extension defines them, and every other keyword as JSON Schema 2020-12 does", () => {
  const deep = (field: object) => rt({ type: "object", properties: { lines: { type: "array", items: { type: "object", properties: { x: field } } } } });
  assert.deepEqual(recordtype.check(deep({ enumSource: { from: "parts" } })), []);
  assert.deepEqual(recordtype.check(deep({ enumSource: { from: "kind", kind: "job", gathered: [{ value: NONE, sid: NONE }] } })), []);
  assert.deepEqual(recordtype.check(deep({ identifierOf: NONE })), []);
  assert.notDeepEqual(recordtype.check(deep({ enumSource: { from: "nowhere" } })), [], "a source nobody defines");
  assert.notDeepEqual(recordtype.check(deep({ enumSource: { from: "kind" } })), [], "the sids of no kind named");
  assert.notDeepEqual(recordtype.check(deep({ enumSource: { from: "parts", kind: "job" } })), [], "a kind beside the names of the parts");
  assert.notDeepEqual(recordtype.check(deep({ enum: ["a"], enumSource: { from: "parts" } })), [], "two sources");
  assert.notDeepEqual(recordtype.check(deep({ identifierOf: "account" })), [], "an identifierOf that holds no sid");
  assert.notDeepEqual(recordtype.check(deep({ maxLength: -1 })), [], "a bound that JSON Schema 2020-12 refuses");
});

test("@spec s-dk3zfkbhc3v6xbp refuses an enum within a RecordType's schema that holds a value more than once, at any depth", () => {
  assert.notDeepEqual(recordtype.check(rt({ type: "object", properties: { a: { type: "array", items: { enum: ["x", "x"] } } } })), []);
  assert.deepEqual(recordtype.check(rt({ type: "object", properties: { a: { type: "array", items: { enum: ["x", "y"] } } } })), []);
});

test('@spec s-qg2yqec2cgmcg2w requires "type": "object" at the top level of the schema of each RecordType other than a RecordType variant', () => {
  assert.notDeepEqual(recordtype.check(rt({ properties: { a: { type: "string" } } })), [], "a RecordType without it");
  assert.notDeepEqual(recordtype.check(rt({ type: "array" })), [], "a RecordType of another type");
  assert.deepEqual(recordtype.check(rt({ properties: { a: { type: "string" } } }, { answersTo: { kind: "loan" } })), [], "a RecordType variant without it");
});

test("@spec s-c2r9jndrjbtbsv6 refuses a RecordType variant whose schema holds additionalProperties or unevaluatedProperties at its top level, or whose answersTo gives a field more than one value", () => {
  const variant = (format: object, answersTo: object = { kind: "loan" }) => rt(format, { answersTo });
  assert.deepEqual(recordtype.check(variant({ properties: { rate: { type: "number" } } })), []);
  assert.notDeepEqual(recordtype.check(variant({ properties: { rate: {} }, additionalProperties: false })), [], "additionalProperties");
  assert.notDeepEqual(recordtype.check(variant({ properties: { rate: {} }, unevaluatedProperties: false })), [], "unevaluatedProperties");
  assert.notDeepEqual(recordtype.check(variant({ properties: { rate: {} } }, { kind: ["loan", "gift"] })), [], "two values for one field");
});
