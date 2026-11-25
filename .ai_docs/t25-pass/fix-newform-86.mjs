// Section 7 in the order general to particular, as the owner ruled for the base and the reviewer proposed for this section: whether
// a rule belongs comes before how it is worded, a qualification is introduced before the exception that is one, the general case
// before its particular, and the rules on a reason stand together. Then the draft of 7.1 with the reviewer's fixes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const map = { "7.1": "7.1", "7.4": "7.2", "7.2": "7.3", "7.3": "7.4", "7.6": "7.5", "7.7": "7.6", "7.5": "7.7", "7.14": "7.8", "7.8": "7.9", "7.13": "7.10", "7.12": "7.11", "7.15": "7.12", "7.10": "7.13", "7.9": "7.14", "7.11": "7.15" };
const renum = s => map[s] ?? s;

const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const seven = [];
lines.forEach((line, i) => {
  const t = line.trim();
  if (!isRow(t)) return;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  if (Array.isArray(row[8])) row[8] = row[8].map(renum);
  if (/^7\.\d+$/.test(row[0])) { row[0] = renum(row[0]); seven.push({ i, row, comma, indent: line.slice(0, line.indexOf("[")) }); return; }
  lines[i] = line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
});
if (seven.length !== 15) throw new Error("section 7 holds " + seven.length + " rows");
const lastComma = seven[14].comma;
const num = r => Number(r[0].split(".")[1]);
const sorted = seven.map(s => s.row).sort((a, b) => num(a) - num(b));
seven.forEach((s, k) => { lines[s.i] = s.indent + JSON.stringify(sorted[k]) + (k === 14 ? (lastComma ? "," : "") : ","); });
fs.writeFileSync(pagePath, lines.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;

next["7.1"] = {
  from: "6.1", sid: "kept", title: "=6.1", ruTitle: "Спецификация пишется по-английски",
  text: "=6.1",
  reason: "A specification that mixes two languages, in its nodes or in what is generated from them and read in their place, loses the line between what it states and what is an aside.\n\nThe language is English because a project's guidelines include the SpecSheriff guidelines, and those are written in English. A project takes them as they are written and never changes them (§s-efe2cmw9asrbt2g). So a project's own nodes in another language would mix two languages in one specification.\n\nA quotation must match what it quotes letter for letter.",
  ruText: "Каждый узел спецификации написан на английском. Так же написано всё, что генерируется из узлов. Цитата, например имя из кода или текст, который система показывает пользователям, сохраняет язык того, что цитирует.",
  ruReason: "Спецификация, смешивающая два языка в узлах или в том, что генерируется из них и читается вместо них, теряет границу между тем, что она утверждает, и тем, что сказано попутно.\n\nЯзык — английский, потому что guidelines проекта включают SpecSheriff guidelines, а они написаны на английском. Проект берёт их такими, как они написаны, и никогда не меняет (§s-efe2cmw9asrbt2g). Поэтому собственные узлы проекта на другом языке смешали бы в одной спецификации два языка.\n\nЦитата должна совпадать с тем, что она цитирует, буква в букву.",
  changes: [
    "Текст и заголовок нынешнего 6.1 не менялись.",
    "Обоснование: ссылка перенесена на узел, который говорит, что проект не меняет guidelines (1.1.3). Прежний узел теперь говорит только о том, что проект не делает их копий (2.4).",
    "Обоснование: по замечанию рецензента убраны две фразы, не дающие основания правилу: о языке, который читатели знают чаще всего, и о том, что цитата стоит отдельно от окружающих слов.",
  ],
  sidValue: "s-7anvune6h4f6mbr",
};
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");
console.log(Object.keys(next).filter(k => k.startsWith("7.")).sort((a, b) => Number(a.split(".")[1]) - Number(b.split(".")[1])).join(" "));
