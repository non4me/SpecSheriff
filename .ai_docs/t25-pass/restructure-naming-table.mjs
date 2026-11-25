// The owner's decision of 2026-11-16 («предлагаю для 7.2.4 использовать табличный тип узла», then «делай»): node 7.2.4,
// "Naming", is a TableRule instead of a subsection. Its head is what the subsection's first node, "What a name is",
// said: what a name is, what an entity is, and that a name means the same thing in every node; it keeps the sid of the
// agreed 7.2.4. Each row is a principle of naming; the node in its "Rule" cell is numbered 7.2.4.1 to 7.2.4.5 by its
// row, as the checks of the table of checks are; its last two cells, a typical case and the mistake closest to it, are
// examples, which require nothing (node 7.6.3). The row "What a name is made of" splits into "What a name says" and "A
// general word in a name". The page renders a draft's table, and lists the cell nodes indented under the head.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-naming-table.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["7.2.4"]) throw new Error("already a table?");
const GW = "s-me9k7g34jqb4rzn";
const A = "s-9w3u3wn37wksyxd";
const ruled = "по вашему решению от 16 ноября";
const get = (s, label, next) => {
  const i = s.indexOf(label + ": ");
  if (i < 0) throw new Error("no " + label);
  const r = s.slice(i + label.length + 2);
  const j = next ? r.indexOf("\n\n" + next + ": ") : -1;
  return j < 0 ? r : r.slice(0, j);
};

// The head, from 7.2.4.1 and its proposal.
const head = d["7.2.4.1"];
const p = head.proposals[0];
const note = "\n\nThe table gives the principles that a name follows. Its last two columns are examples and require nothing.";
const ruNote = "\n\nВ таблице — принципы, которым следует имя. Два последних столбца — примеры, они ничего не требуют.";
const hText = get(p.en, "Text", "Example") + note;
const hRuText = get(p.ru, "Текст", "Пример") + ruNote;
p.en = ["Title: Naming", "", `Text: ${hText}`, "", `Example: ${get(p.en, "Example", "Reason")}`, "", `Reason: ${get(p.en, "Reason")}`].join("\n");
p.ru = ["Заголовок: Образование имён", "", `Текст: ${hRuText}`, "", `Пример: ${get(p.ru, "Пример", "Обоснование")}`, "", `Обоснование: ${get(p.ru, "Обоснование")}`].join("\n");
p.where = "текст, пример, обоснование и таблица";
p.why = [
  `Узел стал таблицей, типом TableRule, ${ruled}. Заголовок «Naming» («Образование имён») остаётся.`,
  "Текст. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action.» и два абзаца о том, как записывают свойство. Стало: шапка таблицы — определение имени, определение сущности со списком примеров, требование «Имя значит одно и то же в каждом узле, который его использует» и что содержит таблица. Сущность определена в широком значении, по вашему решению; прежнее определение из узла 1.37 при переносе потерялось.",
  "Таблица: столбцы «Принцип», «Правило», «Как правильно», «Ближайшая ошибка». Правило в каждой строке — отдельный узел, 7.2.4.1–7.2.4.5, со своим обоснованием. Абзац об общем слове перешёл в строку «Общее слово в имени», абзацы о свойствах — в строку «Свойства». Принципы из раздела «Naming» skill spec-review перенесены в строки «Придуманные имена», «Что говорит имя» и «Отношения к другим сущностям».",
  "Узел-термин называет сущность, поэтому правила об именах применяются к его заголовку; заголовок правила не называет сущность, поэтому к нему они не применяются, как вы решили 15 ноября. Это показывает пример.",
  "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова.» Стало: «Имя читают в каждом узле, который его использует, вдали от его определения. Читатель правильно применяет эти узлы, только если имя значит одно и то же во всех них.» Пример с полем type перешёл в обоснование строки «Общее слово в имени», слова о ключе и шрифте кода — в обоснование строки «Свойства».",
].join(" ");
head.table = {
  columns: [
    { en: "Principle", ru: "Принцип", holds: "text" },
    { en: "Rule", ru: "Правило", holds: "node" },
    { en: "A typical case", ru: "Как правильно", holds: "text" },
    { en: "The mistake closest to it", ru: "Ближайшая ошибка", holds: "text" },
  ],
  rows: [
    [{ en: "Coined names", ru: "Придуманные имена" }, { node: "7.2.4.1" },
      { en: "SpecTag, the reference that binds code to a node: the word \"tag\" also appears in the specification in the sense of a git tag.", ru: "SpecTag — ссылка, которая связывает код с узлом: слово «tag» встречается в спецификации и в смысле тега git." },
      { en: "NodeArchive for the archive of removed nodes, though the word \"archive\" appears in the specification in no other sense.", ru: "NodeArchive для архива удалённых узлов, хотя слово «archive» в спецификации ни в каком другом смысле не встречается." }],
    [{ en: "What a name says", ru: "Что говорит имя" }, { node: "7.2.4.2" },
      { en: "billingAddress, for the address to which a user's invoices are sent.", ru: "billingAddress — адрес, куда отправляют счета пользователя." },
      { en: "userData, which says only whose the data are.", ru: "userData: такое имя говорит только, чьи это данные." }],
    [{ en: "A general word in a name", ru: "Общее слово в имени" }, { node: "7.2.4.3" },
      { en: "userAction, for a field that holds the action a user took and is used apart from its object.", ru: "userAction — поле с действием пользователя, которое используют отдельно от своего объекта." },
      { en: "action", ru: "action" }],
    [{ en: "Properties", ru: "Свойства" }, { node: "7.2.4.4" },
      { en: "`TextRule.list`; a node's `kind`.", ru: "`TextRule.list`; `kind` узла." },
      { en: "`kind` with no object named.", ru: "`kind` без названного объекта." }],
    [{ en: "Relations to other entities", ru: "Отношения к другим сущностям" }, { node: "7.2.4.5" },
      { en: "\"the owner of a section\"", ru: "«ответственный за раздел»" },
      { en: "SectionOwner, which reads as the name of a new entity.", ru: "SectionOwner: читается как имя новой сущности." }],
  ],
};

// The cell nodes, numbered by their rows.
const coined = d["7.2.4.2"], says = d["7.2.4.3"], props = d["7.2.4.4"], rel = d["7.2.4.5"];
for (const n of [coined, says, props, rel]) { delete n.examples; delete n.ruExamples; }
const cellNote = (n) => n.changes.push(`Узел стал ячейкой «Правило» в строке таблицы 7.2.4, ${ruled}; его пример перешёл в столбцы «Как правильно» и «Ближайшая ошибка». Заголовка у узла в ячейке нет: его называют строка и столбец.`);
[coined, props, rel].forEach(cellNote);
const general = {
  from: "", sid: "new",
  title: "A general word in a name", ruTitle: "Общее слово в имени",
  text: `A general word (§${GW}) forms a name (§${A}) only when it is joined with what it applies to.`,
  ruText: `Общее слово (§${GW}) образует имя (§${A}), только когда оно соединено с тем, к чему относится.`,
  reason: "A general word standing alone in a name means whatever the context of each node suggests. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third.",
  ruReason: "Общее слово, стоящее в имени одно, значит то, что подскажет контекст каждого узла. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем.",
  changes: [`Новый узел в ячейке «Правило» таблицы 7.2.4, ${ruled}: второе предложение прежнего «Из чего состоит имя», то есть первый абзац согласованного 7.2.4 об общем слове, в редакции без отрицания. Пример с полем type взят из обоснования согласованного 7.2.4.`],
};
Object.assign(says, {
  title: "What a name says", ruTitle: "Что говорит имя",
  text: `A name (§${A}) says what its entity is, by how the entity is used or by what it holds.`,
  ruText: `Имя (§${A}) говорит, что такое его сущность: как её используют или что она содержит.`,
  reason: "A name that does not say what it names fits many meanings. In each node that uses such a name, it means whatever that node's context suggests.",
  ruReason: "Имя, которое не говорит, что оно называет, подходит под многие значения. В каждом узле, который использует такое имя, оно значит то, что подскажет контекст этого узла.",
});
says.changes.push(`Узел стал ячейкой «Правило» в строке «Что говорит имя» таблицы 7.2.4, ${ruled}; предложение об общем слове перешло в отдельную строку «Общее слово в имени», а примеры — в столбцы таблицы.`);

const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "7.2.4.1") {
    out["7.2.4"] = head;
    out["7.2.4.1"] = coined;
    out["7.2.4.2"] = says;
    out["7.2.4.3"] = general;
    out["7.2.4.4"] = props;
    out["7.2.4.5"] = rel;
  } else if (["7.2.4.2", "7.2.4.3", "7.2.4.4", "7.2.4.5", "7.2.4.1~"].includes(k)) continue;
  else out[k] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

// The page.
const page = new URL("base-structure.html", here);
fs.copyFileSync(page, new URL("base-structure.before-naming-table.html", here));
let h = fs.readFileSync(page, "utf8");
const swap = (x, y) => {
  if (!h.includes(x)) throw new Error("page: not found " + x.slice(0, 70));
  h = h.replace(x, y);
};
const start = h.indexOf('     ]},\n     { n: "7.2.4", sub: true');
const end = h.indexOf('     ]},\n     { rows: [\n', start);
if (start < 0 || end < 0) throw new Error("page: subsection block");
h = h.slice(0, start) +
  `      ["7.2.4","part",0,"6.10","Naming","Образование имён"]\n` +
  `     ]},\n     { sub: true, rows: [\n` +
  `      ["7.2.4.1","new",0,"","Coined names","Придуманные имена","","Ячейка «Правило» таблицы 7.2.4: принцип из skill spec-review.",[],""],\n` +
  `      ["7.2.4.2","new",0,"","What a name says","Что говорит имя","","Ячейка «Правило» таблицы 7.2.4: принцип из skill spec-review.",[],""],\n` +
  `      ["7.2.4.3","new",0,"","A general word in a name","Общее слово в имени","","Ячейка «Правило» таблицы 7.2.4: абзац об общем слове из 7.2.4.",[],""],\n` +
  `      ["7.2.4.4","new",0,"","Properties","Свойства","","Ячейка «Правило» таблицы 7.2.4: абзацы о свойствах из 7.2.4 и принцип из skill spec-review.",[],""],\n` +
  `      ["7.2.4.5","new",0,"","Relations to other entities","Отношения к другим сущностям","","Ячейка «Правило» таблицы 7.2.4: принцип из skill spec-review.",[],""]\n` +
  h.slice(end);
// A draft's table, under its proposals: the head of each column, and each cell's text or, for a node, the node's text.
swap(`        body.append(grid, rg, eg, pr, el("span", "full-h", "что изменилось против нынешнего узла"), ch);`,
  `        const tb = el("div", "");
        if (dr.table) for (const lang of ["en", "ru"]) {
          tb.append(el("span", "full-h", (lang === "en" ? "EN" : "RU") + " · таблица" + (dr.agreed ? " (в предложении)" : "")));
          const t = el("table", "draft-table"), hr = t.insertRow();
          for (const c of dr.table.columns) { const th = document.createElement("th"); th.textContent = c[lang]; hr.append(th); }
          for (const row of dr.table.rows) {
            const tr = t.insertRow();
            for (const cell of row) {
              const td = tr.insertCell();
              if (cell.node) { const nd = drafted[cell.node]; td.append(el("span", "n", cell.node + " "), cited("full-tx", nd ? (lang === "en" ? nd.text : nd.ruText) : "нет черновика " + cell.node)); }
              else td.append(cited("full-tx", cell[lang]));
            }
          }
          tb.append(t);
        }
        body.append(grid, rg, eg, pr, tb, el("span", "full-h", "что изменилось против нынешнего узла"), ch);`);
swap(`  .group-head.sub, ol.nodes.sub { margin-left: 22px; }\n`,
  `  .group-head.sub, ol.nodes.sub { margin-left: 22px; }\n  table.draft-table { border-collapse: collapse; width: 100%; margin: 4px 0 10px; font-size: 0.92em; }\n  table.draft-table th, table.draft-table td { border: 1px solid var(--rule); padding: 4px 6px; vertical-align: top; text-align: left; }\n`);
fs.writeFileSync(page, h);

const ap = new URL("apply-newform.mjs", here);
let s = fs.readFileSync(ap, "utf8");
if (!s.includes("table: d.table")) {
  s = s.replace("    proposals: d.proposals,\n", "    proposals: d.proposals,\n    table: d.table,\n");
  fs.writeFileSync(ap, s);
}

const cfgPath = "D:/SpecSheriff/.claude/vt/checker-v3.json";
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const words = cfg.groups.find((g) => g.id === "words");
if (!words.rules.includes("7.2.4")) words.rules.splice(words.rules.indexOf("7.2.4.1"), 0, "7.2.4");
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + "\n");
console.log("7.2.4 is a TableRule with cells 7.2.4.1–7.2.4.5");
