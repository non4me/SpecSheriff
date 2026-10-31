import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { loadSchema } from "../../src/schema.ts";
import { REPO } from "../repo.ts";

const schema = loadSchema(REPO);
const ok = { id: "x/1", sid: "s-aaaaaaaaaaaaaaa", kind: "rule", title: "t", status: "", text: "", refs: [] };
const file = (...nodes: object[]) => ({ schemaVersion: 1, scope: "x", section: "x", nodes });

test("s-eferktypcj7njt5 accepts every file of the specification as it stands", () => {
  for (const f of loadSpecification(REPO).files) assert.deepEqual(schema.check(f.data), [], f.path);
});

const refused: Record<string, object> = {
  "a field nobody declared": { ...ok, foo: 1 },
  "an owner on a rule": { ...ok, owner: "a@b.c" },
  "a status other than empty or checked": { ...ok, status: "done" },
  "a sid outside its alphabet": { ...ok, sid: "s-000000000000000" },
  "a ratio on a link that is not a term-relation": { ...ok, refs: [{ type: "cites", to: "s-aaaaaaaaaaaaaab", ratio: "1:1" }] },
  "a link naming both its ends": { ...ok, refs: [{ type: "cites", to: "s-aaaaaaaaaaaaaab", from: "s-aaaaaaaaaaaaaab" }] },
  "a comment opening with TODO": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "TODO x" }] } },
  "a comment of a type other than problem": { ...ok, meta: { comments: [{ date: "2026-10-28", by: "a", text: "x", type: "note" }] } },
  "a record node without fields": { ...ok, kind: "record" },
  "a header without its level": { ...ok, kind: "domain" },
  "an archived node without its reason": { ...ok, archived: { date: "2026-10-28" } },
  "a bound on a field of text": { ...ok, kind: "record", unknown: "refused", fields: [{ name: "a", type: { is: "text", minimum: 1 }, required: true, text: "" }] },
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
  "a header with its level, code and index": { ...ok, kind: "domain", level: "core", code: null, sections: [] },
  "an archived node with its reason and replacement": { ...ok, archived: { date: "2026-10-28", reason: "r", replacedBy: "s-aaaaaaaaaaaaaab" } },
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
