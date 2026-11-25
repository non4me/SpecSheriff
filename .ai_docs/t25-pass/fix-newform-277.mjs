// Node 12.2.1: the owner's wording for the paragraph on the data models (2026-11-14): the data models describe the
// format of the data that the domains exchange with one another, as RecordTypes, so that the sentence says what a
// RecordType is and what it is for. The condition of the proposal of fix-newform-275.mjs stays, as a sentence of its
// own: 12.3.1 declares a RecordType in the domain that first provides it, so only a RecordType that no domain first
// provides is declared in the data models. The owner is told this, since without it every exchanged format would
// belong to the data models.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.2.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

p.en = swap(
  p.en,
  "The data models are the part of the base specification where a RecordType is declared when no domain first provides it (§s-7vm323mhry2enx3).",
  "The data models are the part of the base specification that describes, as RecordTypes, the formats of the data that the domains exchange with one another. Only a RecordType that no domain first provides is declared there (§s-7vm323mhry2enx3).",
);
p.ru = swap(
  p.ru,
  "Модели данных — это часть базовой спецификации, в которой объявляется RecordType, если нет домена, который первым его предоставляет (§s-7vm323mhry2enx3).",
  "Модели данных — это часть базовой спецификации, которая описывает формат данных (RecordType), которыми домены обмениваются между собой. Там объявляется только RecordType, который ни один домен не предоставляет первым (§s-7vm323mhry2enx3).",
);
p.why +=
  " Первая фраза нового абзаца — ваша формулировка, дословно: она говорит, что такое RecordType и для чего он нужен. Вторая фраза сохраняет условие из прежнего предложения: по 12.3.1 RecordType, который первым предоставляет домен, объявляется в этом домене.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
