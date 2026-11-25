// Drafts row 11.3.7 of table 11.3, the table of checks of the Domains extension: the check, missing so far, that a
// domain divided into several documents keeps one section in each document, as 11.1.2 allows its owners to divide it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-11-3.json", here);
fs.copyFileSync(file, new URL("table-11-3.before-11-3-7.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
if (rows.some((r) => r.num === "11.3.7")) throw new Error("row 11.3.7 exists already");
rows.push({
  n: 22.5,
  num: "11.3.7",
  was: "",
  en: "",
  cost: "refused",
  ru: "",
  ruCost: "отклоняется",
  fate: "new",
  change: "Новая строка. 11.1.2 позволяет ответственным за домен разделить его на документы, по одному на раздел, а ни одна строка этого не проверяла.",
  rests: ["s-k73czmpkazcx7mu"],
  about: "Затрагивает каждый домен, разделённый на несколько документов. Каждый раздел такого домена можно загрузить в контекстное окно его собственным документом, без остальных (11.1.2).",
  proposals: [{
    en: "Where a domain is kept in several documents, every document except the one with the domain's header holds one section of the domain",
    ru: "Если домен хранится в нескольких документах, каждый из них, кроме документа с заголовком домена, содержит один раздел домена",
    why: "11.1.2 позволяет разделить документ домена на документы, по одному на раздел. Документ с заголовком стоит особняком: спецификация домена открывается заголовком (11.1.3), а заголовок — не раздел.",
  }],
});
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("row 11.3.7 drafted");
