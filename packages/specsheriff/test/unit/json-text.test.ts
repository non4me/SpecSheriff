import { test } from "node:test";
import assert from "node:assert/strict";
import { keysTwice, mergeKeys } from "../../src/json-text.ts";

test("s-4kd2pave7vm4hmd finds a key an object holds twice, naming the key and both lines", () => {
  const text = '{\n  "a": 1,\n  "b": {\n    "c": 1,\n    "c": 2\n  },\n  "a": 3\n}\n';
  assert.deepEqual(keysTwice(text), [
    { path: "/b", key: "c", lines: [4, 5] },
    { path: "", key: "a", lines: [2, 7] },
  ]);
});

test("s-4kd2pave7vm4hmd finds nothing where every key is held once", () => {
  assert.deepEqual(keysTwice('{"a": [{"a": 1}, {"a": 2}], "b": "a"}'), []);
});

test("s-f5rz6b7dhxejjts merges two lists into one holding the first's members, then the second's the first lacks", () => {
  const { value, merged } = mergeKeys('{\n "l": [1, {"x": 1}],\n "l": [{"x": 1}, 2, 1]\n}');
  assert.deepEqual(value, { l: [1, { x: 1 }, 2] });
  assert.deepEqual(merged, [{ path: "", key: "l", lines: [2, 3] }]);
});

test("s-f5rz6b7dhxejjts merges two objects key by key, each key where it was first written", () => {
  const { value } = mergeKeys('{"o": {"a": 1, "b": [1]}, "o": {"c": 2, "b": [2], "a": 1}}');
  assert.deepEqual(Object.keys((value as any).o), ["a", "b", "c"]);
  assert.deepEqual(value, { o: { a: 1, b: [1, 2], c: 2 } });
});

test("s-f5rz6b7dhxejjts merges two values JSON Schema holds equal into one", () => {
  assert.deepEqual(mergeKeys('{"n": 1, "n": 1.0, "s": "x", "s": "x"}').value, { n: 1, s: "x" });
});

test("s-f5rz6b7dhxejjts refuses two values it cannot merge, naming the key and each one's line and value", () => {
  assert.throws(() => mergeKeys('{\n "s": "x",\n "s": "y"\n}'), (error: Error) => {
    assert.match(error.message, /"s"/);
    assert.match(error.message, /line 2: "x"/);
    assert.match(error.message, /line 3: "y"/);
    return true;
  });
  assert.throws(() => mergeKeys('{"a": [1], "a": {"b": 1}}'), /"a"/);
});

test("s-f5rz6b7dhxejjts keeps text it does not merge exactly as JSON.parse reads it", () => {
  const text = '{"t": "a\\u00e9\\n\\"", "n": -1.5e3, "z": null, "f": false, "e": [], "o": {}}';
  assert.deepEqual(mergeKeys(text).value, JSON.parse(text));
  assert.deepEqual(mergeKeys(text).merged, []);
});

test("s-4kd2pave7vm4hmd refuses text that is not JSON, naming the line", () => {
  assert.throws(() => keysTwice('{\n "a": 1,\n "b" 2\n}'), /line 3/);
});
