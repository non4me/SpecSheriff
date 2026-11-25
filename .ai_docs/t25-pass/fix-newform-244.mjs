// Node 10.8, agreed on 2026-11-13: the one reading of its English after the agreement. Tests do not implement the system,
// so "the tests that implement the system" read as a calque of the owner's «тестах, реализующих систему»; the English now
// says the code that implements the system and the tests of that code. "Is used" becomes "appears"; "among them" becomes
// "including". The English alone changes.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.8"];
n.title = "A SpecTag appears only in the system's code and its tests";
n.text = "A SpecTag appears only in the code that implements the system and in the tests of that code.";
n.reason =
  "A SpecTag binds a rule to the code that implements it and to the tests written for it (§s-8xw4mgvpexyvw5q). " +
  "The repository's own tools, including a project's own checks, are not the system's code (§s-hheus6f395ynqvc).";
n.changes.push("Английский прочитан один раз после согласования: тесты систему не «реализуют», поэтому «the code that implements the system and the tests of that code»; «is used» → «appears». Смысл не менялся.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
