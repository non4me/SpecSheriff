// Node 12.3.1: the owner dictated a new first paragraph (2026-11-14): «RecordType (§…) — это формат данных относящийся к
// его API. RecordType домена описывают данные, которые домен возвращает и хранит в своём хранилище, другие домены могут
// использовать эти данные целиком или частично.» The agent assessed it before writing it, and proposes three fixes, shown
// to the owner with their reasons:
// - «его API»: «его» has no antecedent in the sentence, a domain not yet being named; «API домена».
// - «возвращает» reads as the answer to a request, while domains offer their data, as paragraph 3 and the reason say; the
//   owner's own earlier word was «выдаваемых», so «выдаёт».
// - The comma joined two thoughts; they become two sentences.
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
  "A RecordType (§s-6eb92ddch7shuvu) is a data format. A domain's RecordTypes describe the data that the domain creates and keeps in its store, and they are its API: other domains take that data, whole or in part.",
  "A RecordType (§s-6eb92ddch7shuvu) is a data format that forms part of a domain's API. A domain's RecordTypes describe the data that the domain outputs and keeps in its store. Other domains may use that data, whole or in part.",
);
p.ru = swap(
  p.ru,
  "RecordType (§s-6eb92ddch7shuvu) — это формат данных. RecordType домена описывают данные, которые домен создаёт и хранит в своём хранилище, и служат его API: другие домены берут эти данные целиком или частично.",
  "RecordType (§s-6eb92ddch7shuvu) — это формат данных, относящийся к API домена. RecordType домена описывают данные, которые домен выдаёт и хранит в своём хранилище. Другие домены могут использовать эти данные целиком или частично.",
);
p.why = "See fix-newform-282.mjs to fix-newform-291.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1 paragraph 1 in the owner's wording, with three fixes");
