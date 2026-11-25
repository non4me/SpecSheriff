// Node 12.2.5 is agreed (fix-newform-274.mjs). Node 12.2.1, agreed on 2026-11-08: a proposal carrying out the owner's
// decision 5 of 2026-11-13, that the RecordTypes leave the contracts section and form a part of their own, the data
// models. The decision moves the RecordTypes that were declared in the contracts section, those that no domain first
// provides (12.3.1); a RecordType that a domain first provides stays in that domain.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.1"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

let en = swap(n.text, "it consists of the contracts section and those domains.", "it consists of the contracts section, the data models and those domains.");
en += "\n\nThe data models are the part of the base specification where a RecordType is declared when no domain first provides it (§s-7vm323mhry2enx3).";
let ru = swap(n.ruText, "она состоит из контрактов и этих доменов.", "она состоит из контрактов, моделей данных и этих доменов.");
ru += "\n\nМодели данных — это часть базовой спецификации, в которой объявляется RecordType, если нет домена, который первым его предоставляет (§s-7vm323mhry2enx3).";

const enReason = swap(
  n.reason,
  "That place is the contracts section, since it belongs to no domain.",
  "That place is the contracts section, since it belongs to no domain.\n\nA RecordType describes the structure of data, which is closer to a schema than to the terms and rules agreed in the contracts section. So the RecordTypes that no domain first provides are kept in a part of their own.",
);
const ruReason = swap(
  n.ruReason,
  "Это контракты, потому что они не принадлежат ни одному домену.",
  "Это контракты, потому что они не принадлежат ни одному домену.\n\nRecordType описывает структуру данных, а она ближе к схеме, чем к терминам и правилам, которые согласуют в контрактах. Поэтому RecordType, которые не предоставляет первым ни один домен, хранятся в отдельной части.",
);

n.proposals = [
  {
    where: "текст: первое предложение и новый последний абзац; обоснование: новый абзац после второго",
    en: "Text: " + en + "\n\nReason: " + enReason,
    ru: "Текст: " + ru + "\n\nОбоснование: " + ruReason,
    why:
      "По вашему решению от 13 ноября о моделях данных: RecordType уходят из контрактов в отдельную часть базовой спецификации. Первое предложение называет эту часть среди частей разделённой базовой спецификации, новый абзац говорит, что это за часть. RecordType, который первым предоставляет домен, остаётся в этом домене (12.3.1): решение касается тех RecordType, что объявлялись в контрактах. Новый абзац обоснования — ваш довод: RecordType ближе к схеме, чем к термину.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.1 proposal set");
