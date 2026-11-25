// Table 10.1, after the owner agreed to 1.5.2 on 2026-11-17: rows 10.1.26, 10.1.28a, 10.1.34, 10.1.41 and 10.1.42 speak
// of the code that a SpecTag binds instead of a symbol, and a new row 10.1.26b checks that every entry in the bindings
// file names a file that exists.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-136.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const BIND = "s-kgbzk2ph9e6jfb4";
const SYSCODE = "s-hheus6f395ynqvc";
const WHY = "Выполняет согласованный 1.5.2 и ваше решение 17 ноября: проверка говорит о коде, который привязывает SpecTag, а не о символе.";
const byNum = (num) => {
  const r = rows.find((x) => x.num === num);
  if (!r) throw new Error(`row ${num} not found`);
  return r;
};
const propose = (num, en, ru, why = WHY) => {
  const r = byNum(num);
  r.proposals = [{ en, ru, why }];
};
propose("10.1.26",
  `The system's implementing code (§${SYSCODE}) is bound by SpecTags in one of the ways that §${BIND} names: each symbol that the checks can identify, by a SpecTag directly before it; any other file, by SpecTags at its start or by an entry in the bindings file. Each SpecTag names a rule that the code it binds implements, or says that the code implements none`,
  `Реализующий код системы (§${SYSCODE}) привязан SpecTag одним из способов, которые называет §${BIND}: каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним; любой другой файл — SpecTag в его начале или записью в файле привязок. Каждый SpecTag называет правило, которое реализует привязанный им код, или говорит, что этот код не реализует никакого правила`);
propose("10.1.28a",
  "A draft rule is not implemented: no commit adds or changes code or a test that its SpecTag binds",
  "Правило-черновик не реализуют: ни один коммит не добавляет и не меняет код или тест, которые привязывает его SpecTag");
propose("10.1.34",
  "A node's `meta.code` refers to every file of code that the node's SpecTag binds, and to no other file. Its `meta.tests` refers to every file of tests that holds a test with the node's SpecTag, and to no other file",
  "`meta.code` узла ссылается на все файлы кода, которые привязывает SpecTag этого узла, и ни на какие другие. `meta.tests` узла ссылается на все файлы тестов, где есть тест с его SpecTag, и ни на какие другие",
  "Выполняет согласованный 1.5.2: файл JSON SpecTag не содержит, его SpecTag хранит запись в файле привязок, а сам файл привязок содержит SpecTag других файлов. Поэтому «где есть SpecTag» → «которые привязывает SpecTag».");
propose("10.1.41",
  "An approved rule that the system's code must implement (§s-6fw72j65jkqrfpf) is bound to code of the system outside its tests and to a test not marked as skipped. Code or a test bound to a rule that implements it, directly or through a chain of `implements` links, also counts as bound to it",
  "Одобренное правило, которое код системы должен реализовывать (§s-6fw72j65jkqrfpf), привязано к коду системы вне его тестов и к тесту, не помеченному как пропускаемый. Код или тест, привязанный к правилу, которое его реализует напрямую или через цепочку связей `implements`, тоже считается привязанным к нему");
propose("10.1.42",
  "The message of a commit names, by its sid, each node to which a SpecTag binds code added or changed in that commit, not counting the tests",
  "Сообщение коммита называет по sid каждый узел, к которому SpecTag привязывает код, добавленный или изменённый в этом коммите, не считая тестов");

if (rows.some((x) => x.num === "10.1.26b")) throw new Error("row 10.1.26b is already there");
const r26a = byNum("10.1.26a");
const group = t.tables.find((g) => g.rows.includes(r26a));
group.rows.splice(group.rows.indexOf(r26a) + 1, 0, {
  n: Math.max(...rows.map((x) => x.n)) + 1,
  num: "10.1.26b",
  fate: "new",
  en: "Each entry in the bindings file names a file that exists",
  cost: "refused",
  ru: "Каждая запись в файле привязок называет существующий файл",
  ruCost: "отклоняется",
  change: "Новая строка, по согласованному 1.5.2: при каждом коммите проверки проходят по файлу привязок и убеждаются, что каждый названный в нём файл существует, — так ловится перенесённый или переименованный файл (ваше решение 17 ноября).",
  rests: [BIND],
  impl: [],
  about: "Затрагивает каждый коммит. Запись о файле, который перенесли или переименовали, ничего не привязывала бы, а сам файл остался бы без привязки.",
  tests: [],
});
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
