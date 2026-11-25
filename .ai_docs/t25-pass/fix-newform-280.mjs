// Node 12.2.1: the reviewer's second report on the proposal (fix-newform-279.mjs) passes it after one cut. The second
// sentence of the reason's second paragraph repeated the text's paragraph on the contracts section and added no thought
// (7.14, and the pairing test), so it is cut.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.2.1"].proposals[0];
const cut = (s, a) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, "");
};

p.en = cut(p.en, " The entities the domains share, and how they work together, are agreed in the contracts section.");
p.ru = cut(p.ru, " Общие для доменов сущности и то, как домены работают вместе, согласуют в контрактах.");
p.why = p.why.replace(
  "Абзац теперь говорит, зачем тому, за что не отвечает ни один домен, место вне доменов, и почему модели данных отделены от контрактов",
  "Абзац теперь говорит, зачем тому, за что не отвечает ни один домен в отдельности, место вне доменов, и почему модели данных отделены от контрактов",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
