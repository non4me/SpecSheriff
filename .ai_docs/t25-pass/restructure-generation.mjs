// The owner's ruling of 2026-11-17 on finding 5 about the extensions: the rules on code generated from the nodes return
// to section 10 of the SpecSheriff guidelines, and section 13 becomes the extension for the views of the specification,
// the kinds of additional documentation generated from the nodes. On 2026-11-11 the rules on generated code had been moved
// into an extension by mistake; the owner had meant the views.
// - "A project's own generators join the shared one" (s-km4x4s26kv7pjze, present 5.6) becomes 10.9, after 10.8 on a
//   project's own checks; 10.9 to 10.13 become 10.10 to 10.14.
// - The draft 13.1, "Code generated from the nodes waits for their approval", becomes 10.15, after 10.14 on generated
//   copies, as the exception to it for code; 10.14 becomes 10.16.
// - The planned row 13.3, the parts of 5.7, 5.10 and 5.12 on a project's generators, is dropped. The owner ruled on
//   2026-11-13 that a project's own check counts as code of the rule that lists it, so the shared checks hold its code and
//   tests; a project's own generator is held the same way once 10.9 says so. 10.4 already speaks of generated files in
//   general.
// - Rows 60 and 61 of table 10.1 stay in the table instead of leaving for the extension.
// The wording of no node changes here.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const map = { "10.9": "10.10", "10.10": "10.11", "10.11": "10.12", "10.12": "10.13", "10.13": "10.14", "10.14": "10.16", "13.1": "10.15" };

const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-generation.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (v.table) for (const row of v.table.rows) for (const cell of row) if (cell.node && map[cell.node]) cell.node = map[cell.node];
  out[map[k] ?? k] = v;
}
const moved = out["10.15"];
moved.changes.push("Перенесён из расширения «Генерация кода из узлов» в раздел 10 guidelines, сразу после правила о сгенерированных копиях, как исключение из него для кода (вы, 17 ноября: генерация кода остаётся в guidelines). Формулировка пока прежняя; ссылка на 12.3 будет заменена общими словами.");
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
fs.copyFileSync(page, new URL("base-structure.before-generation.html", here));
let h = fs.readFileSync(page, "utf8");

const cut = (from, to) => {
  const start = h.indexOf(from);
  const end = h.indexOf(to, start);
  if (start < 0 || end < 0) throw new Error(`not found: ${from}`);
  return [start, end];
};
const rowsOf = (start, end) => {
  const rows = {};
  for (const line of h.slice(start, end).split("\n")) {
    const m = line.match(/^      \["(\d+\.\d+)",(.*?),?\s*$/);
    if (m) rows[m[1]] = m[2].replace(/\]$/, "");
  }
  return rows;
};

const [s13, e13] = cut('    { n: "13", en:', '    { n: "14", en:');
const rows13 = rowsOf(s13, e13);
const [s10, e10] = cut('    { n: "10", en:', '    { n: "11", en:');
const head10 = h.slice(s10, h.indexOf("\n", s10) + 1);
const rows10 = rowsOf(s10, e10);
for (const k of ["13.1", "13.2"]) if (!rows13[k]) throw new Error(`no row ${k}`);

const order = [
  ["10.1", "10.1"], ["10.2", "10.2"], ["10.3", "10.3"], ["10.4", "10.4"], ["10.5", "10.5"], ["10.6", "10.6"], ["10.7", "10.7"], ["10.8", "10.8"],
  ["13.2", "10.9"], ["10.9", "10.10"], ["10.10", "10.11"], ["10.11", "10.12"], ["10.12", "10.13"], ["10.13", "10.14"], ["13.1", "10.15"], ["10.14", "10.16"],
];
const body10 = order.map(([old, now]) => {
  const rest = old.startsWith("13.") ? rows13[old] : rows10[old];
  if (!rest) throw new Error(`no row ${old}`);
  return `      ["${now}",${rest}]`;
});
const section10 = head10 + body10.join(",\n") + "\n    ]},\n";

const section13 = [
  '    { n: "13", en: "Views of the specification", ru: "Представления спецификации", purpose: "Расширение: дополнительная документация, которую генерируют из узлов, — читаемый экспорт, майндмап, схемы. Его правила говорят, что показывает каждое представление; как его строят инструменты SpecSheriff, остаётся в описании инструментов.", rows: [',
  '      ["13.1","new",0,"","The readable export","Читаемый экспорт","","Черновик предстоит: что показывает читаемый экспорт. Как его пишут инструменты, говорит узел описания инструментов «What the export, the guide and `sheriff show` write of a node».",[],""],',
  '      ["13.2","new",0,"","The map of the specification","Карта спецификации","","Черновик предстоит: что показывает майндмап спецификации. Как его строят инструменты, говорит узел описания инструментов «Building the map».",[],""]',
  "    ]},",
  "",
].join("\n");

// Section 13 comes after section 10, so it is replaced first and the offsets of section 10 stay valid.
h = h.slice(0, s13) + section13 + h.slice(e13);
h = h.slice(0, s10) + section10 + h.slice(e10);
fs.writeFileSync(page, h);

const tableFile = new URL("table-10-1.json", here);
fs.copyFileSync(tableFile, new URL("table-10-1.before-generation.json", here));
const t = JSON.parse(fs.readFileSync(tableFile, "utf8"));
let back = 0;
for (const g of t.tables) for (const r of g.rows ?? []) if ((r.n === 60 || r.n === 61) && r.fate === "to 13 Generation") {
  r.fate = "stays";
  r.change = "Остаётся в таблице: генерация кода возвращается в guidelines (вы, 17 ноября).";
  back++;
}
if (back !== 2) throw new Error(`rows returned: ${back}`);
fs.writeFileSync(tableFile, JSON.stringify(t, null, 2) + "\n");
console.log("renamed", Object.keys(map).filter((k) => d[k]).length, "drafts; sections 10 and 13 rewritten; rows 60 and 61 stay");
