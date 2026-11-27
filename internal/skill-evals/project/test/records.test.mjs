import { test } from "node:test";
import assert from "node:assert/strict";
import { archive, createRecord, list } from "../src/records.mjs";

test("@spec {{The title of a record}} creates a record whose title has from 1 to 80 characters", () => {
  const records = [];
  createRecord(records, "a", "");
  createRecord(records, "x".repeat(80), "");
  assert.equal(records.length, 2);
});

test("@spec {{The title of a record}} refuses an empty title and one longer than 80 characters", () => {
  assert.throws(() => createRecord([], "", ""));
  assert.throws(() => createRecord([], "x".repeat(81), ""));
});

test("@spec {{Archiving a record}} takes an archived record out of the list", () => {
  const records = [];
  createRecord(records, "kept", "");
  createRecord(records, "archived", "");
  archive(records, 2);
  assert.deepEqual(list(records).map((r) => r.title), ["kept"]);
});

test("@spec {{The order of the list}} lists the most recently created record first", () => {
  const records = [];
  createRecord(records, "first", "");
  createRecord(records, "second", "");
  assert.deepEqual(list(records).map((r) => r.title), ["second", "first"]);
});
