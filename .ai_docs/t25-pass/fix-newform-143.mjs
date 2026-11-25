// The owner of 2026-11-10: section 10 repeated part of 1.3, so what it says anew moves into 1.3 and section 10 goes. 10.1 becomes 1.3.5 What an approval covers,
// 10.3 becomes 1.3.6, 10.4 becomes 1.3.7 and 10.2 becomes 1.3.8, approving before withdrawing; 1.3.5 and 1.3.6 lose what 1.3.2 and 1.3.3 already say.
// Sections 11 to 14 become 10 to 13: page rows, section headings, highlights and draft keys. Notes in prose keep their numbers, many already of other numberings.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const moved = { "10.1": "1.3.5", "10.3": "1.3.6", "10.4": "1.3.7", "10.2": "1.3.8" };
const map = (num) => {
  if (moved[num]) return moved[num];
  const m = num.match(/^(1[1-4])((?:\.\d+)*)$/);
  return m ? `${Number(m[1]) - 1}${m[2]}` : num;
};
if (d["1.3.5"] || !d["10.1"] || !d["10.2"] || !d["10.3"] || !d["10.4"] || d["14.1.1"]?.agreed === undefined) throw new Error("unexpected drafts");

// The four drafts, trimmed of what agreed 1.3.1 to 1.3.4 already say.
const a = d["10.1"], s = d["10.3"], g = d["10.4"], w = d["10.2"];
Object.assign(a, {
  title: "What an approval covers",
  ruTitle: "Что покрывает одобрение",
  text: "An approval covers a node's present wording. That wording is its title, text and reason, and the values the node's kind adds beside them, such as `TextRule.list`. A change to that wording made by an owner also makes the node a draft.\n\nThe approval status stays as it is through a change to:\n\n- the node's links or its metadata;\n- who its owners are;\n- what is built into it from other nodes;\n- where it is in the specification.",
  ruText: "Одобрение покрывает нынешнюю формулировку узла. Эта формулировка — его заголовок, текст и обоснование, а также значения, которые тип узла добавляет к ним, например `TextRule.list`. Изменение этой формулировки, сделанное ответственным, тоже делает узел черновиком.\n\nСтатус одобрения остаётся прежним при изменении:\n\n- связей узла или его метаданных;\n- того, кто его ответственные;\n- того, что встроено в него из других узлов;\n- того, где он находится в спецификации.",
  changes: [
    "Перенесён из раздела 10 по вашему решению, раздел 10 убран.",
    "Оставлено только то, чего нет в 1.3.1–1.3.4: что входит в формулировку, что изменение ответственным не исключение и какие изменения статус не сбрасывают.",
    "Убрано, что изменение формулировки делает узел черновиком: это говорит 1.3.2. Убрано, что правило не относится к разделу: это говорит 1.3.3.",
    "Заголовок новый.",
    "Обоснование новое: почему одобрение теряет силу только при изменении формулировки.",
    "Список значений статуса (`draft`, `approved`) при переносе перейдёт в 1.3.1, от вашего имени.",
    "`NodeKind` заменён на «тип узла».",
    "Сохраняет sid нынешнего 1.5.",
  ],
});
Object.assign(s, {
  text: "The SpecSheriff tools build a section's approval status from every node under it, at any depth, that is no section. They build it anew after every change to the specification. Nobody writes it by hand.",
  ruText: "Инструменты SpecSheriff строят статус одобрения раздела из всех узлов под ним, на любой глубине, кроме разделов. Они строят его заново после каждого изменения спецификации. Вручную его никто не пишет.",
  changes: [
    "Перенесён из раздела 10 по вашему решению.",
    "Оставлено только то, чего нет в 1.3.3: статус раздела строят инструменты, из узлов на любой глубине, и вручную его никто не пишет.",
    "Убрано, когда раздел одобрен: это говорит 1.3.3.",
    "Статус заголовка домена уходит в часть 13 отдельным узлом.",
    "Сохраняет sid нынешнего 1.6.",
  ],
});
g.changes = ["Перенесён из раздела 10 по вашему решению.", ...g.changes.map((c) => c.replace("это говорит 10.2", "это говорит 1.3.8"))];
w.changes = ["Перенесён из раздела 10 по вашему решению.", ...w.changes.map((c) => c.replace("Из 10.1 сюда перешло", "Из 1.3.5 сюда перешло"))];
const e = d["8.3"];
e.changes = e.changes.map((c) => c.replace("в 11.4, 11.5, 13.12", "в 10.4, 10.5, 12.12"));

// The drafts under their new keys, the four moved ones after 1.3.4.
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (moved[k]) continue;
  out[map(k)] = v;
  if (k === "1.3.4") for (const from of ["10.1", "10.3", "10.4", "10.2"]) out[moved[from]] = d[from];
}
if (Object.keys(out).length !== Object.keys(d).length) throw new Error("a draft was lost");
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");

// The page.
const isRow = (t) => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
let lines = fs.readFileSync(pagePath, "utf8").split("\n");
const start = lines.findIndex((l) => l.trim().startsWith('{ n: "10", en: "Status and approval"'));
const end = lines.findIndex((l, i) => i > start && l.trim() === "]},");
if (start < 0 || end - start !== 5) throw new Error("unexpected section 10 on the page");
lines.splice(start, end - start + 1);
const at = lines.findIndex((l) => l.trim().startsWith('["1.3.4",'));
if (at < 0 || lines[at + 1].trim() !== "]},") throw new Error("unexpected section 1.3 on the page");
const indent = lines[at].slice(0, lines[at].indexOf("["));
const rows = [
  ["1.3.5", "split", 1, "1.5", "What a node's status says", "Что говорит статус узла", "", "Перенесён из раздела 10 по вашему решению: осталось то, чего нет в 1.3.1–1.3.4.", ["1.3.2", "1.3.3", "1.3.8"], ""],
  ["1.3.6", "split", 1, "1.6", "The status of a section and of a domain's header", "Статус раздела и заголовка домена", "", "Перенесён из раздела 10 по вашему решению. Статус заголовка домена уходит в часть 13.", ["1.3.3"], ""],
  ["1.3.7", "part", 1, "1.7", "part of 1.7: Only its owners approve a node", "уходит сюда: Агент одобряет от имени ответственного формулировку, которая не говорит ничего нового", "", "Перенесён из раздела 10 по вашему решению.", ["1.3.4"], ""],
  ["1.3.8", "part", 1, "1.5", "part of 1.5: What a node's status says", "уходит сюда: Кто может отозвать одобрение", "", "Перенесён из раздела 10 по вашему решению.", ["1.3.5"], ""],
];
lines.splice(at + 1, 0, ...rows.map((r) => indent + JSON.stringify(r) + ","));
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (isRow(t)) {
    const comma = t.endsWith(",");
    const row = JSON.parse(comma ? t.slice(0, -1) : t);
    row[0] = map(row[0]);
    if (Array.isArray(row[8])) row[8] = row[8].map(map);
    lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
  } else {
    const m = t.match(/^\{ n: "([0-9.]+)"/);
    if (m && map(m[1]) !== m[1]) lines[i] = lines[i].replace(`{ n: "${m[1]}"`, `{ n: "${map(m[1])}"`);
  }
}
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("moved into 1.3:", ["1.3.5", "1.3.6", "1.3.7", "1.3.8"].map((k) => out[k].title).join(" | "));
console.log("sections now:", [...lines.join("\n").matchAll(/\{ n: "(\d+)", en: "([^"]+)"/g)].map((m) => m[1] + " " + m[2]).join("; "));
