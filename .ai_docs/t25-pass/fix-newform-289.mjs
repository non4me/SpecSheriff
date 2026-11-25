// Node 12.3.1: the owner asked whether a variant of a shared data structure belongs in the contracts section, in the
// document of the shared data structures (2026-11-14). It does: a domain reading a shared structure needs all its variants,
// so the whole shared format stays in one place. The values that select those variants are then declared there too, so
// the domains no longer add values to a field of a shared structure, which current nodes 1.28 and 1.29 allow. With that,
// the exception for a variant goes, and the shared data structure is declared together with its variants.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(
  p.en,
  [
    "It is declared in the only domain where data in its format first appears, with two exceptions:",
    "- a data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address, is declared once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7);",
    "- a variant of a shared data structure, selected by a value that a domain adds, is declared in that domain (§s-z3dnru6qqdf9m6j).",
  ].join("\n"),
  "It is declared in the only domain where data in its format first appears. The exception is a data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address: it is declared once, together with its variants, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7).",
);
p.ru = swap(
  p.ru,
  [
    "Он объявляется в том единственном домене, в котором впервые появляются данные в его формате, кроме двух случаев:",
    "- структура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес, объявляется один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7);",
    "- вариант общей структуры данных, который выбирает значение, добавленное доменом, объявляется в этом домене (§s-z3dnru6qqdf9m6j).",
  ].join("\n"),
  "Он объявляется в том единственном домене, в котором впервые появляются данные в его формате. Исключение — структура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес: она объявляется один раз вместе со своими вариантами — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7).",
);
p.why = "See fix-newform-282.mjs to fix-newform-289.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru.split("\n\nОбоснование:")[0]);
