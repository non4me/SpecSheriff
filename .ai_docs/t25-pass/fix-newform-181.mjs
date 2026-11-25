// The owner of 2026-11-10 on 9.4's reason: «Новое название при прежнем SpecTag не меняет того, что тест проверяет» → «Новая формулировка в названии теста при
// прежнем SpecTag не считается изменением самого теста» (a doubled space dropped); the English follows.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruReason", "Новое название при прежнем SpecTag не меняет того, что тест проверяет.", "Новая формулировка в названии теста при прежнем SpecTag не считается изменением самого теста.");
swap("reason", "A new name with the same SpecTag does not change what the test verifies.", "A new wording in a test's name with the same SpecTag does not count as a change to the test itself.");
b.changes = [...b.changes, "По вашим словам, в обосновании: «Новая формулировка в названии теста при прежнем SpecTag не считается изменением самого теста»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
console.log(b.ruReason);
