// Node 4.1: the owner's title of 2026-11-09, «Техническое приложение неотъемлемо связано с базовой спецификацией», and the
// ground taken from their words, opening the reason, in the reviewed wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.1"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
n.title = "The technical appendix is inseparable from the base specification";
n.ruTitle = "Техническое приложение неотъемлемо связано с базовой спецификацией";
swap("reason", "The appendix is no subject area of the system but the way the system is built. Divided as the base is,", "The appendix describes how the base specification's rules are implemented, so it has no meaning on its own. It exists to keep technical detail apart from what the system does. With the appendix divided as the base is,");
swap("ruReason", "Приложение — не предметная область системы, а то, как система строится.", "Приложение описывает, как реализуются правила базовой спецификации, поэтому само по себе смысла не имеет. Оно нужно, чтобы отделить технические подробности от того, что делает система.");
n.changes.push("Заголовок — ваш. Начало обоснования взято из ваших слов о том, зачем нужно приложение, формулировка прошла рецензента.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pagePath = new URL("base-structure.html", here);
let page = fs.readFileSync(pagePath, "utf8");
const rowFrom = '"The technical appendix stands beside the base specification","Техническое приложение стоит рядом с базовой спецификацией"';
if (page.includes(rowFrom)) page = page.replace(rowFrom, `"${n.title}","${n.ruTitle}"`);
else console.log("row title differs: left to the draft");
fs.writeFileSync(pagePath, page);
console.log(n.reason);
console.log("---");
console.log(n.ruReason);
