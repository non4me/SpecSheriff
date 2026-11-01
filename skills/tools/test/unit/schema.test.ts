import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { loadSchema } from "../../src/schema.ts";
import { NONE, sid } from "../fixture.ts";
import { REPO } from "../repo.ts";

const schema = loadSchema(REPO);
const ok = { id: "x/1", sid: sid("ok"), kind: "rule", title: "t", status: "", text: "", refs: [] };
const file = (...nodes: object[]) => ({ schemaVersion: 1, scope: "x", section: "x", nodes });

test("s-eferktypcj7njt5 accepts every file of the specification as it stands", () => {
  for (const f of loadSpecification(REPO).files) assert.deepEqual(schema.check(f.data), [], f.path);
});

const refused: Record<string, object> = {
  "a field nobody declared": { ...ok, foo: 1 },
  "an owner on a rule": { ...ok, owner: "a@b.c" },
  "a status other than empty or checked": { ...ok, status: "done" },
  "a sid outside its alphabet": { ...ok, sid: "s-000000000000000" },
  "a ratio on a link that is not a term-relation": { ...ok, refs: [{ type: "cites", to: NONE, ratio: "1:1" }] },
  "a link naming both its ends": { ...ok, refs: [{ type: "cites", to: NONE, from: NONE }] },
  "a comment opening with TODO": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "TODO x" }] } },
  "a comment of a type other than problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "note" }] } },
  "a record node without fields": { ...ok, kind: "record" },
  "a header without its level": { ...ok, kind: "domain" },
  "an archived node without its reason": { ...ok, archived: { date: "2026-10-28" } },
  "a bound on a field of text": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "a", type: { is: "text", minimum: 1 }, required: true, text: "" }] },
  "a bound on how many members a field of text holds": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "a", type: { is: "text", minItems: 1 }, required: true, text: "" }] },
  "a bound on the value of a field of type list of": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minimum: 1 }, required: true, text: "" }] },
  "a bound on how many members a list holds that is no whole number of zero or more": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minItems: -1 }, required: true, text: "" }] },
  "a field of type variant on a data record naming no field choosing its variant": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "context", type: { is: "variant" }, required: "where it holds a value", text: "" }] },
  "a list naming a field with something other than a field name": { ...ok, list: { of: "x", members: ["a"], field: "Not a name" } },
  "a data record holding two fields of type variant": { ...ok, kind: "record", unknown: "refused", fields: [
    { name: "context", type: { is: "variant" }, required: "where it holds a value", text: "" },
    { name: "details", type: { is: "variant" }, required: "where it holds a value", text: "" },
  ] },
};
for (const [what, node] of Object.entries(refused)) {
  test(`s-eferktypcj7njt5 refuses ${what}`, () => {
    assert.notDeepEqual(schema.check(file(node)), []);
  });
}

const accepted: Record<string, object> = {
  "an owner on a section": { ...ok, kind: "section", owner: "a@b.c" },
  "a comment of type problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "problem" }] } },
  "a bound on a whole number": { ...ok, kind: "record", unknown: "kept", fields: [{ name: "a", type: { is: "whole number", minimum: 1 }, required: true, text: "" }] },
  "bounds on how many members a list holds": { ...ok, kind: "record", unknown: "kept", fields: [{ name: "a", type: { is: "list of", of: { is: "text" }, minItems: 1, maxItems: 3 }, required: true, text: "" }] },
  "a field of type date": { ...ok, kind: "record", unknown: "kept", fields: [{ name: "a", type: { is: "date" }, required: true, text: "" }] },
  "a data record holding one field of type variant beside others": { ...ok, kind: "record", unknown: "refused", chosenBy: ["kind"], fields: [
    { name: "kind", type: { is: "one of", values: ["a", "b"] }, required: true, text: "" },
    { name: "context", type: { is: "variant", fields: [{ name: "concerns", type: { is: "text" }, required: true, text: "" }] }, required: "where it holds a value", text: "" },
  ] },
  "a header with its level, code and index": { ...ok, kind: "domain", level: "core", code: null, sections: [] },
  "an archived node with its reason and replacement": { ...ok, archived: { date: "2026-10-28", reason: "r", replacedBy: NONE } },
};
for (const [what, node] of Object.entries(accepted)) {
  test(`s-eferktypcj7njt5 accepts ${what}`, () => {
    assert.deepEqual(schema.check(file(node)), []);
  });
}

test("s-eferktypcj7njt5 names the field that is wrong", () => {
  const [error] = schema.check(file({ ...ok, children: [{ ...ok, status: "done" }] }));
  assert.match(error!, /\/nodes\/0\/children\/0\/status/);
});

test("s-eferktypcj7njt5 names a field nobody declared, and a required field that is missing", () => {
  assert.ok(schema.check(file({ ...ok, foo: 1 })).some((e) => /\/nodes\/0.*"foo"/.test(e)), "the undeclared field");
  const { text: _, ...withoutText } = ok;
  assert.ok(schema.check(file(withoutText)).some((e) => /\/nodes\/0.*"text"/.test(e)), "the missing field");
});
