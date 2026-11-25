// Restructures section 7, "How a rule is written", as the owner agreed on 2026-11-15: a first node "The goal, the
// reader and the scope", then five subsections. The nodes are only moved; their wording is unchanged.
// Node 7.15 moves to the end of section 10, whose procedures write the specification.
// It renumbers the drafts in newform.json, rewrites section 7 on the structure page, lets a section of that page
// hold nodes of its own before its subsections, and renumbers the rules in the checker's configuration and test cases.
// Each file it changes is first copied to a backup with ".before-restructure7" in its name.
// Run from the repository's root: node .ai_docs/t25-pass/restructure-7.mjs
import fs from "node:fs";

const moves = {
  "7.3": "7.2.1", "7.6": "7.2.2", "7.8": "7.2.3", "7.9": "7.2.4", "7.10": "7.2.5", "7.11": "7.2.6",
  "7.4": "7.3.1", "7.5": "7.3.2", "7.7": "7.3.3",
  "7.12": "7.4.1", "7.14": "7.4.2",
  "7.2": "7.5.1", "7.17": "7.5.2", "7.18": "7.5.3",
  "7.1": "7.6.1", "7.13": "7.6.2", "7.16": "7.6.3",
  "7.15": "10.13",
};
const backup = (path) => {
  const to = path.replace(/(\.[a-z]+)$/, ".before-restructure7$1");
  if (!fs.existsSync(to)) fs.copyFileSync(path, to);
};
const save = (path, text) => { backup(path); fs.writeFileSync(path, text); };

// The drafts, under their new numbers.
const draftsPath = ".ai_docs/t25-pass/newform.json";
const drafts = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const renamed = {};
for (const [k, v] of Object.entries(drafts)) renamed[moves[k] ?? k] = v;
save(draftsPath, JSON.stringify(renamed, null, 2) + "\n");

// The structure page: section 7 rewritten, row by row, and 7.15 moved to section 10.
const pagePath = ".ai_docs/t25-pass/base-structure.html";
let page = fs.readFileSync(pagePath, "utf8");
const start = page.indexOf('    { n: "7", en: "How a rule is written"');
const end = page.indexOf('    { n: "8", en: "Kinds of node and their location"');
if (start < 0 || end < 0) throw new Error("section 7 not found on the page");
const rows = {};
for (const line of page.slice(start, end).split("\n")) {
  const m = /^\s*\["(7\.\d+)",/.exec(line);
  if (m) rows[m[1]] = line.trim().replace(/,$/, "");
}
const row = (old) => {
  if (!rows[old]) throw new Error("no row " + old);
  return rows[old].replace(`["${old}",`, `["${moves[old]}",`);
};
const group = (n, en, ru, purpose, olds) =>
  `     { n: "${n}", en: "${en}", ru: "${ru}", purpose: "${purpose}", rows: [\n` + olds.map((o) => "      " + o).join(",\n") + "\n     ]}";
const r718 = '["7.5.3","new",0,"","A rule is made a table only where it is needed","Правило делают таблицей только там, где это нужно","","",[],""]';
const section7 = [
  '    { n: "7", en: "How a rule is written", ru: "Как пишется правило", purpose: "Как пишется узел спецификации.", rows: [',
  '      ["7.1","new",0,"","The goal, the reader and the scope","Цель, читатель и область действия","","Новый узел, по вашему решению от 15 ноября.",[],""]',
  "    ], groups: [",
  [
    group("7.2", "Understandability", "Понятность", "Как читатель с первого прочтения понимает правило так, как оно задумано.", ["7.3", "7.6", "7.8", "7.9", "7.10", "7.11"].map(row)),
    group("7.3", "One thing per unit", "Одно на единицу текста", "Одна мысль в предложении и одно требование в узле.", ["7.4", "7.5", "7.7"].map(row)),
    group("7.4", "One place for each statement", "У каждого утверждения одно место", "Каждое утверждение стоит в одном месте и не повторяется.", ["7.12", "7.14"].map(row)),
    group("7.5", "Brevity without loss of meaning", "Краткость без потери смысла", "Ни лишнего правила, ни лишнего предложения, ни лишнего слова.", [...["7.2", "7.17"].map(row), r718]),
    group("7.6", "Conventions of form", "Соглашения о форме", "Язык, заглавные буквы и примеры.", ["7.1", "7.13", "7.16"].map(row)),
  ].join(",\n"),
  "    ]},",
  "",
].join("\n");
page = page.slice(0, start) + section7 + page.slice(end);
const last10 = page.indexOf('      ["10.12",');
const close10 = page.indexOf("\n    ]},", last10);
if (last10 < 0 || close10 < 0) throw new Error("section 10 not found on the page");
page = page.slice(0, close10) + ",\n      " + row("7.15") + page.slice(close10);
// A section may hold nodes of its own before its subsections.
const both = "[...(p.rows || []), ...(p.groups || []).flatMap(g => g.rows)]";
const replaceOnce = (from, to) => {
  if (page.split(from).length !== 2) throw new Error("expected exactly one: " + from);
  page = page.replace(from, to);
};
replaceOnce("for (const r of (p.groups ? p.groups.flatMap(g => g.rows) : p.rows))", `for (const r of ${both})`);
replaceOnce("for (const g of p.groups || [{ rows: p.rows }])", "for (const g of [...(p.rows ? [{ rows: p.rows }] : []), ...(p.groups || [])])");
replaceOnce("const rowsOf = p => p.groups ? p.groups.flatMap(g => g.rows) : p.rows;", `const rowsOf = p => ${both};`);
save(pagePath, page);

// The checker: its groups, its rulings and the script's rule, under the new numbers.
const renumber = (text) => text.replace(/\b7\.\d+\b(?!\.\d)/g, (n) => moves[n] ?? n);
const configPath = ".claude/vt/checker-v3.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
for (const g of config.groups) {
  g.rules = g.rules.map((r) => moves[r] ?? r);
  if (g.rulings) g.rulings = g.rulings.map(renumber);
  g.test = renumber(g.test);
}
save(configPath, JSON.stringify(config, null, 2) + "\n");
const lintPath = ".claude/vt/wording-lint.mjs";
save(lintPath, fs.readFileSync(lintPath, "utf8").split('"7.13"').join('"7.6.2"').replace("// - 7.13:", "// - 7.6.2:"));
const casesPath = ".ai_docs/t25-pass/checker-cases.json";
const cases = JSON.parse(fs.readFileSync(casesPath, "utf8"));
for (const c of cases) if (moves[c.rule]) c.rule = moves[c.rule];
save(casesPath, JSON.stringify(cases, null, 2) + "\n");
console.log("ok");
