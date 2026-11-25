// The owner of 2026-11-11 accepted the structure of section 10 "The checks and the procedures" from its consolidated
// review: 10.2 (present 5.2) goes whole to a new extension, 12.6 "Adoption of an existing project", which also takes
// parts of 10.4 (present 5.4), of the table 10.1 (present 5.1) and of agreed 1.3.2 (present 1.8); the parts on a
// project's generators go to 12.5; the part on RecordTypes of the reviewer's node (present 5.10) to 12.3; 10.3 (present
// 5.3) is deleted, agreed 1.3.2 and 1.6.1 stating it; a new node "A review that cannot be held refuses the commit"
// leaves 10.9; the section is ordered from the general to the particular. Rows, highlights and draft keys move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);

const table = {
  "10.1": "10.1", "10.12": "10.2", "10.13": "10.3", "10.9": "10.4", "10.4": "10.6", "10.5": "10.7",
  "10.6": "10.8", "10.8": "10.9", "10.7": "10.10", "10.10": "10.11", "10.11": "10.12",
  "10.2": "12.6.1", "10.3": null,
};
const remap = (n) => (n in table ? table[n] : n);

let lines = fs.readFileSync(pagePath, "utf8").split("\n");
const parse = (l) => JSON.parse(l.trim().replace(/,$/, ""));
const group = (prefix) => {
  const start = lines.findIndex((l) => l.trim().startsWith(prefix));
  if (start < 0) throw new Error(`no group ${prefix}`);
  let end = start + 1;
  while (!lines[end].trim().startsWith("]},")) end++;
  return [start, end];
};
const rowsOf = ([start, end]) => lines.slice(start + 1, end).map(parse);
const setRows = ([start, end], rows, indent = "      ") => {
  const out = rows.map((r, i) => indent + JSON.stringify(r) + (i < rows.length - 1 ? "," : ""));
  lines.splice(start + 1, end - start - 1, ...out);
};
const lights = (r) => { if (Array.isArray(r[8])) r[8] = r[8].map(remap).filter(Boolean); return r; };

// Section 10, reordered.
const g10 = group('{ n: "10", en: "The checks and the procedures"');
const old10 = Object.fromEntries(rowsOf(g10).map((r) => [r[0], r]));
const moved = lights(old10["10.2"]);
const order = ["10.1", "10.12", "10.13", "10.9", null, "10.4", "10.5", "10.6", "10.8", "10.7", "10.10", "10.11"];
const rows10 = order.map((from, i) => {
  const to = `10.${i + 1}`;
  if (from === null) return [to, "part", 0, "5.10", "part of 5.10: The reviewer sees only the change and the nodes it names", "уходит сюда: Рецензия, которую нельзя провести, отклоняет коммит", "", "Выделено из 5.10: применяется отдельно от того, что видит рецензент (7.6, 7.7).", [], ""];
  const r = lights([...old10[from]]);
  r[0] = to;
  return r;
});
setRows(g10, rows10);

// Every other row's highlights follow.
lines = lines.map((l) => {
  if (!/^\s*\["[0-9.]+",/.test(l)) return l;
  const indent = l.match(/^\s*/)[0];
  const comma = l.trim().endsWith(",");
  const r = lights(parse(l));
  return indent + JSON.stringify(r) + (comma ? "," : "");
});

// 12.3 takes what the reviewer is given of a RecordType.
const g123 = group('{ n: "12.3",');
setRows(g123, [...rowsOf(g123), ["12.3.13", "part", 0, "5.10", "part of 5.10: The reviewer sees only the change and the nodes it names", "уходит сюда: Что рецензент получает о RecordType"]]);

// 12.5 takes the parts on a project's generators.
const g125 = group('{ n: "12.5",');
setRows(g125, [...rowsOf(g125), ["12.5.3", "part", 0, "5.7", "part of 5.7, 5.10 and 5.12: a project's generators", "уходит сюда: Генераторы проекта: их тесты, рецензия и правка агента"]]);

// 12.6, the extension "Adoption of an existing project", after 12.5.
const [, end125] = group('{ n: "12.5",');
const r1 = [...moved];
r1[0] = "12.6.1";
lines.splice(end125 + 1, 0,
  '     { n: "12.6", en: "Adoption of an existing project", ru: "Адоптация существующего проекта", purpose: "Что действует, пока существующий проект переходит на метод.", rows: [',
  "      " + JSON.stringify(r1) + ",",
  "      " + JSON.stringify(["12.6.2", "part", 0, "5.4", "part of 5.4: The specification's status is its owners' act", "уходит сюда: Спецификацию не одобряют, пока у кода или тестов нет SpecTag"]) + ",",
  "      " + JSON.stringify(["12.6.3", "part", 0, "5.1", "part of 5.1: What is checked, when, and what a failure costs", "уходит сюда: Цена отказа, пока спецификация — черновик, и одобрение спецификации"]) + ",",
  "      " + JSON.stringify(["12.6.4", "part", 0, "1.8", "part of 1.8: What a draft means", "уходит сюда: Код и тесты, написанные до перехода на метод"]),
  "     ]},");
fs.writeFileSync(pagePath, lines.join("\n"));

// The drafts follow their rows.
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  const to = remap(k);
  if (to === null) continue;
  if (out[to]) throw new Error(`two drafts for ${to}`);
  out[to] = v;
}
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");
console.log("section 10:", rows10.map((r) => `${r[0]}=${r[3]}`).join(" "), "| drafts:", Object.keys(out).filter((k) => /^10\.|^12\.6/.test(k)).join(" "));
