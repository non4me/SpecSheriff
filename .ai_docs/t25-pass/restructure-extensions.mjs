// The owner's decision of 2026-11-16: the Domains extension is split into two extensions, Domains and RecordType;
// RecordType stands on its own, with a section of its own for a project that also uses Domains; the rules about
// extensions in general move into section 1; each extension becomes a section of its own, numbered from 11, so that
// section 11, left empty when its content moved into part 12, is filled again.
// This script renames the drafts' keys in newform.json and rewrites the structure of the page that shows the base
// specification. The wording of no node changes here: the drafts that must now be reworded are shown to the owner later.
import fs from "node:fs";

const map = {
  "12.1.1": "1.7.1", "12.1.2": "1.7.2", "12.1.3": "1.7.3",
  "12.2.1": "11.1.1", "12.2.2": "11.1.2", "12.2.3": "11.1.3", "12.2.4": "11.1.4", "12.2.5": "11.1.5",
  "12.4.1": "11.2.1", "12.4.2": "11.2.2", "12.4.3": "11.2.3",
  "12.3.1": "12.1.1", "12.3.2": "12.1.2", "12.3.3": "12.1.3", "12.3.4": "12.1.4", "12.3.6": "12.1.5",
  "12.3.7": "12.1.6", "12.3.8": "12.1.7", "12.3.12": "12.1.8", "12.3.13": "12.1.9", "12.3.14": "12.1.10",
  "12.3.15": "12.1.11",
  "12.3.5": "12.2.2", "12.3.11": "12.2.3", "12.3.9": "12.2.4", "12.3.10": "12.2.5",
  "12.5.1": "13.1", "12.5.2": "13.2", "12.5.3": "13.3",
  "12.6.1": "14.1", "12.6.2": "14.2", "12.6.3": "14.3", "12.6.4": "14.4",
};

// The drafts: each key renamed in place, so that their order stays as it was.
const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-extensions.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (v.table) for (const row of v.table.rows) for (const cell of row) if (cell.node && map[cell.node]) cell.node = map[cell.node];
  out[map[k] ?? k] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

// The page: its rows for part 12, keyed by their old numbers.
const page = new URL("base-structure.html", import.meta.url);
fs.copyFileSync(page, new URL("base-structure.before-extensions.html", import.meta.url));
let h = fs.readFileSync(page, "utf8");
const start = h.indexOf('    { n: "12", en: "Extensions of the guidelines"');
const end = h.indexOf("\n  ];", start);
if (start < 0 || end < 0) throw new Error("part 12 not found on the page");
const rows = {};
for (const line of h.slice(start, end).split("\n")) {
  const m = line.match(/^      \["(12\.[0-9.]+)",/);
  if (m) rows[m[1]] = line.replace(/,\s*$/, "").replace(`["${m[1]}",`, "");
}
const row = (old) => {
  if (!rows[old]) throw new Error(`no row ${old}`);
  return `      ["${map[old]}",${rows[old]}`;
};
const list = (olds, extra = []) => [...olds.map(row), ...extra].join(",\n");
const group = (n, en, ru, purpose, body) => `     { n: "${n}", en: "${en}", ru: "${ru}", purpose: "${purpose}", rows: [\n${body}\n     ]},`;

const part = [
  `    { n: "11", en: "Domains", ru: "Домены", purpose: "Расширение: деление базовой спецификации на домены и их иерархия.", groups: [`,
  group("11.1", "Decomposition", "Декомпозиция", "Что такое домен и как он описывает себя.", list(["12.2.1", "12.2.2", "12.2.3", "12.2.4", "12.2.5"])),
  group("11.2", "Hierarchy", "Иерархия", "Место каждого домена в иерархии доменов и схема, которая эту иерархию показывает.", list(["12.4.1", "12.4.2", "12.4.3"])),
  "    ]},",
  `    { n: "12", en: "RecordType", ru: "RecordType", purpose: "Расширение: формат данных, которые одна часть системы передаёт другой или хранит. Не требует доменов.", groups: [`,
  group("12.1", "RecordType", "RecordType", "Что такое RecordType и как он описывает данные, с доменами или без них.", list(["12.3.1", "12.3.2", "12.3.3", "12.3.4", "12.3.6", "12.3.7", "12.3.8", "12.3.12", "12.3.13", "12.3.14", "12.3.15"])),
  group("12.2", "RecordType in a specification divided into domains", "RecordType в спецификации, разделённой на домены", "Действует, только если проект использует и расширение «Домены».", list(["12.3.5", "12.3.11", "12.3.9", "12.3.10"], [
    `      ["12.2.1","part",0,"1.34","part of 12.1.1: A domain's RecordType and the fragments of a format in the contracts section","уходит сюда: RecordType домена и фрагменты формата в контрактах","","Выделяется из 12.1.1 по вашему решению от 16 ноября: RecordType не зависит от доменов, а правила о доменах — отдельный раздел.",[],""]`,
  ]).replace(/^(.*12\.2\.2.*)$/m, "$1")),
  "    ]},",
  `    { n: "13", en: "Generation of code from the nodes", ru: "Генерация кода из узлов", purpose: "Расширение: код, который генерируется из узлов, и собственные генераторы проекта.", rows: [`,
  list(["12.5.1", "12.5.2", "12.5.3"]),
  "    ]},",
  `    { n: "14", en: "Adoption of an existing project", ru: "Адоптация существующего проекта", purpose: "Расширение: что действует, пока существующий проект переходит на метод.", rows: [`,
  list(["12.6.1", "12.6.2", "12.6.3", "12.6.4"]),
  "    ]},",
].join("\n");
// In section 12.2 the new row 12.2.1 goes first.
const fixed = part.replace(/(     \{ n: "12\.2"[^\n]*\n)((?:      \["12\.2\.[2-5]"[^\n]*\n)+)(      \["12\.2\.1"[^\n]*)\n/, (all, head, moved, first) => `${head}${first},\n${moved.replace(/,\n$/, "\n")}`);
h = h.slice(0, start) + fixed + h.slice(end);

// Section 1: the rules about extensions in general, as subsection 1.7.
const g16 = h.indexOf('     { n: "1.6", en: "The checks"');
const g16end = h.indexOf("\n     ]},", g16) + "\n     ]},".length;
if (g16 < 0 || g16end < g16) throw new Error("group 1.6 not found");
const ext = [
  `     { n: "1.7", en: "Extensions of the guidelines", ru: "Расширения guidelines", purpose: "Что верно для любого расширения и как одно расширение опирается на другое.", rows: [`,
  ["12.1.1", "12.1.2", "12.1.3"].map((o) => row(o).replace(/^(      \["1\.7\.\d","[a-z]+",)0,/, "$11,")).join(",\n") + ",",
  `      ["1.7.4","new",1,"","An extension may rely on another extension","Расширение может опираться на другое расширение","","Новый узел, по вашему решению от 16 ноября: расширение называет то, на которое опирается, и его правила о нём действуют, только если проект использует оба.",[],""]`,
  "     ]},",
].join("\n");
h = h.slice(0, g16end) + "\n" + ext + h.slice(g16end);
fs.writeFileSync(page, h);
console.log("renamed", Object.keys(map).filter((k) => d[k]).length, "drafts; page rewritten");
