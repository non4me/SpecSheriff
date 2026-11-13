import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { loadSchema } from "../../src/schema.ts";
import { NONE, repo, sid } from "../fixture.ts";
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
  "a RecordType without fields": { ...ok, kind: "RecordType" },
  "a header without its level": { ...ok, kind: "header" },
  "an archived node without its reason": { ...ok, archived: { date: "2026-10-28" } },
  "a bound on a field of text": { ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "a", type: { is: "text", minimum: 1 }, required: true, text: "" }] },
  "a bound on how many members a field of text holds": { ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "a", type: { is: "text", minItems: 1 }, required: true, text: "" }] },
  "a bound on the value of a field of type list of": { ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minimum: 1 }, required: true, text: "" }] },
  "a bound on how many members a list holds that is no whole number of zero or more": { ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minItems: -1 }, required: true, text: "" }] },
  "a field of type variant on a RecordType naming no field choosing its variant": { ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "context", type: { is: "variant" }, required: "where it holds a value", text: "" }] },
  "a list naming a field with something other than a field name": { ...ok, list: { of: "x", members: ["a"], field: "Not a name" } },
  "a RecordType holding two fields of type variant": { ...ok, kind: "RecordType", unknown: "refused", fields: [
    { name: "context", type: { is: "variant" }, required: "where it holds a value", text: "" },
    { name: "details", type: { is: "variant" }, required: "where it holds a value", text: "" },
  ] },
};
for (const [what, node] of Object.entries(refused)) {
  test(`@spec s-eferktypcj7njt5 refuses ${what}`, () => {
    assert.notDeepEqual(schema.check(file(node)), []);
  });
}

const accepted: Record<string, object> = {
  "owners on a section": { ...ok, kind: "section", owners: ["a@b.c", "d@e.f"] },
  "a comment of type problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "problem" }] } },
  "a bound on a whole number": { ...ok, kind: "RecordType", unknown: "kept", fields: [{ name: "a", type: { is: "whole number", minimum: 1 }, required: true, text: "" }] },
  "bounds on how many members a list holds": { ...ok, kind: "RecordType", unknown: "kept", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minItems: 1, maxItems: 3 }, required: true, text: "" }] },
  "a field of type date": { ...ok, kind: "RecordType", unknown: "kept", fields: [{ name: "a", type: { is: "date" }, required: true, text: "" }] },
  "a RecordType holding one field of type variant beside others": { ...ok, kind: "RecordType", unknown: "refused", chosenBy: ["kind"], fields: [
    { name: "kind", type: { is: "one of", values: ["a", "b"] }, required: true, text: "" },
    { name: "context", type: { is: "variant", fields: [{ name: "concerns", type: { is: "text" }, required: true, text: "" }] }, required: "where it holds a value", text: "" },
  ] },
  "a header with its level, code and index": { ...ok, kind: "header", level: "core", code: null, sections: [] },
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

test("@spec s-eferktypcj7njt5 takes a field of type one of naming its source, with the values gathered beside it, and refuses one naming two sources", () => {
  const event = (type: object, more: object = {}) => ({ ...ok, kind: "RecordType", unknown: "refused", fields: [{ name: "kind", type, required: true, text: "", ...more }] });
  assert.deepEqual(schema.check(file(event({ is: "one of", from: "domains" }, { gathered: [{ value: "paid", sid: NONE }] }))), []);
  assert.deepEqual(schema.check(file(event({ is: "one of", from: "kindSids", kind: "TextRule" }))), []);
  assert.notDeepEqual(schema.check(file(event({ is: "one of", values: ["a"], from: "domains" }))), [], "two sources");
  assert.notDeepEqual(schema.check(file(event({ is: "one of", from: "kindSids" }))), [], "the sids of no kind named");
});
