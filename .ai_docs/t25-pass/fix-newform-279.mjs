// Node 12.2.1: the reviewer's findings on the proposal of fix-newform-278.mjs, applied before the owner sees it.
// - Text, new paragraph: "the shared formats" dropped (7.5, 7.8): a RecordType that one domain provides to others is shared
//   too. The English says "structure", as 12.3.2 does; the Russian keeps the owner's «формат» and says «хранят в хранилище»,
//   as 12.3.2 does. A sentence says that a specification with no such RecordType has no data models, as 3.1 says of the
//   contracts section.
// - Reason: the agreed second paragraph said that the contracts section is the one place for what the domains share, which
//   the data models make untrue. It is merged with the new paragraph into one: why what no single domain is responsible
//   for is kept outside the domains, and why the data models are kept apart from the contracts section. "Closer to a
//   schema" is replaced with how a RecordType differs from the terms and rules of the contracts section.
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
  "\n\nA RecordType describes the structure of the data that the domains pass to one another or keep in a store (§s-6eb92ddch7shuvu). The data models are the part of the base specification where the RecordTypes that no domain first provides are declared (§s-7vm323mhry2enx3). A specification with no such RecordType has no data models.";
let ru = swap(n.ruText, "она состоит из контрактов и этих доменов.", "она состоит из контрактов, моделей данных и этих доменов.");
ru +=
  "\n\nRecordType описывает формат данных, которые домены передают друг другу или хранят в хранилище (§s-6eb92ddch7shuvu). Модели данных — это часть базовой спецификации, где объявляются RecordType, которые ни один домен не предоставляет первым (§s-7vm323mhry2enx3). В спецификации, где таких RecordType нет, моделей данных нет.";

const enReason = swap(
  n.reason,
  "Once there are domains, the entities they share and how they work together need one place where they are agreed. That place is the contracts section, since it belongs to no domain.",
  "Once there are domains, what no single domain is responsible for needs a place outside every domain. The entities the domains share, and how they work together, are agreed in the contracts section. The data models are kept apart from the contracts section because a RecordType describes data field by field, unlike the terms and rules agreed there.",
);
const ruReason = swap(
  n.ruReason,
  "Когда появляются домены, общим для них сущностям и тому, как они работают вместе, нужно одно место, где их согласуют. Это контракты, потому что они не принадлежат ни одному домену.",
  "Когда появляются домены, тому, за что не отвечает ни один домен в отдельности, нужно место вне доменов. Общие для доменов сущности и то, как домены работают вместе, согласуют в контрактах. Модели данных отделены от контрактов, потому что RecordType описывает данные поле за полем, а не так, как записаны термины и правила, которые там согласуют.",
);

n.proposals = [
  {
    where: "текст: первое предложение и новый последний абзац; обоснование: второй абзац",
    en: "Text: " + en + "\n\nReason: " + enReason,
    ru: "Текст: " + ru + "\n\nОбоснование: " + ruReason,
    why: [
      "Первое предложение текста: среди частей разделённой базовой спецификации названы модели данных, по вашему решению от 13 ноября.",
      "Новый абзац текста, первая фраза: что такое RecordType и для чего он нужен, там, где текст впервые употребляет этот термин, со ссылкой на 12.3.2, где RecordType определён; «хранят в хранилище», как в 12.3.2.",
      "Вторая фраза: что объявляется в моделях данных. Слова «общие форматы» убраны: RecordType, который один домен предоставляет другим, тоже общий.",
      "Третья фраза: если таких RecordType нет, нет и моделей данных, так же как нет контрактов, когда у разделов нет ничего общего (3.1).",
      "Обоснование, второй абзац: согласованная фраза «одно место — контракты» с появлением моделей данных перестала быть верной. Абзац теперь говорит, зачем тому, за что не отвечает ни один домен, место вне доменов, и почему модели данных отделены от контрактов: RecordType описывает данные поле за полем, а не так, как записаны термины и правила.",
    ].join(" "),
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(en + "\n---\n" + enReason);
