// Node 12.3.1: the owner wants the node to open with what a RecordType is, as the owner's own wording did, so that a
// reader knows what it is about (2026-11-14). The owner's sentence «RecordType — это формат данных» comes back as the
// first sentence, with the statement that a domain's RecordTypes are its API, and the title goes back to the owner's
// "RecordType". The definition then has one home, this node: node 12.3.2 is to cite it instead of defining a RecordType
// again. The reason gains a sentence on why a domain's RecordTypes are its API.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

p.en = swap(p.en, "Title: Where a RecordType is declared\n\nText: ", "Title: RecordType\n\nText: A RecordType (§s-6eb92ddch7shuvu) is a data format. A domain's RecordTypes describe the data that the domain creates and keeps in its store, and they are its API: other domains take that data, whole or in part.\n\n");
p.en = swap(p.en, "Reason: Two definitions", "Reason: Other domains see a domain only through the data it offers, so the RecordTypes of that data are the domain's API.\n\nTwo definitions");
p.ru = swap(p.ru, "Заголовок: Где объявляется RecordType\n\nТекст: ", "Заголовок: RecordType\n\nТекст: RecordType (§s-6eb92ddch7shuvu) — это формат данных. RecordType домена описывают данные, которые домен создаёт и хранит в своём хранилище, и служат его API: другие домены берут эти данные целиком или частично.\n\n");
p.ru = swap(p.ru, "Обоснование: Два определения", "Обоснование: Другие домены видят домен только через данные, которые он предлагает, поэтому RecordType этих данных — это API домена.\n\nДва определения");
p.why = "See fix-newform-282.mjs to fix-newform-286.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
