// Node 12.2.1: the proposal is rewritten in the direction the owner accepted on 2026-11-14 («да, подготовь»). One sentence
// says what a RecordType is, where the text first uses the term, and cites node 12.3.2, which defines it. Another says
// what the data models hold: the shared formats, the RecordTypes that no domain first provides (12.3.1). The owner's
// sentence of fix-newform-277.mjs described every exchanged format as kept in the data models, which contradicted 12.3.1,
// and narrowed a RecordType to an exchange, though 12.3.1 and 12.3.2 also use it for storage.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.1"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

let en = swap(n.text, "it consists of the contracts section and those domains.", "it consists of the contracts section, the data models and those domains.");
en +=
  "\n\nA RecordType describes the format of the data that the domains pass to one another or keep in a store (§s-6eb92ddch7shuvu). The data models are the part of the base specification where the shared formats are declared: the RecordTypes that no domain first provides (§s-7vm323mhry2enx3).";
let ru = swap(n.ruText, "она состоит из контрактов и этих доменов.", "она состоит из контрактов, моделей данных и этих доменов.");
ru +=
  "\n\nRecordType описывает формат данных, которые домены передают друг другу или хранят (§s-6eb92ddch7shuvu). Модели данных — это часть базовой спецификации, где объявляются общие форматы: RecordType, которые ни один домен не предоставляет первым (§s-7vm323mhry2enx3).";

const enReason = swap(
  n.reason,
  "That place is the contracts section, since it belongs to no domain.",
  "That place is the contracts section, since it belongs to no domain.\n\nA data format is closer to a schema than to the terms and rules agreed in the contracts section. So the RecordTypes that no domain first provides are kept in a part of their own.",
);
const ruReason = swap(
  n.ruReason,
  "Это контракты, потому что они не принадлежат ни одному домену.",
  "Это контракты, потому что они не принадлежат ни одному домену.\n\nФормат данных ближе к схеме, чем к терминам и правилам, которые согласуют в контрактах. Поэтому RecordType, которые ни один домен не предоставляет первым, хранятся в отдельной части.",
);

n.proposals = [
  {
    where: "текст: первое предложение и новый последний абзац; обоснование: новый абзац после второго",
    en: "Text: " + en + "\n\nReason: " + enReason,
    ru: "Текст: " + ru + "\n\nОбоснование: " + ruReason,
    why: [
      "Первое предложение: среди частей разделённой базовой спецификации названы модели данных, по вашему решению от 13 ноября.",
      "Новый абзац, первая фраза: что такое RecordType и для чего он нужен, там, где текст впервые употребляет этот термин, со ссылкой на 12.3.2, где RecordType определён.",
      "Новый абзац, вторая фраза: что объявляется в моделях данных.",
      "Обоснование, новый абзац: ваш довод, что формат данных ближе к схеме, чем к терминам и правилам контрактов.",
    ].join(" "),
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(en + "\n---\n" + enReason);
