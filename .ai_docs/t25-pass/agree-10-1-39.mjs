// Records the owner's agreement of 2026-11-20 («ок») to "documentation" in place of "documents" in row 10.1.39 of the main
// table of checks, and writes into decisions-out-5.json, in English, the owner's rulings of 2026-11-20 that came after the
// decisions were extracted: the reason for 1.6.1, the example in 7.2.7, the links in 6.4 and this row. build-moved.mjs is
// taught to read decisions-out-5.json as well.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tp = new URL("table-10-1.json", here);
const table = JSON.parse(fs.readFileSync(tp, "utf8"));
fs.copyFileSync(tp, new URL("table-10-1.before-agree-10-1-39.json", here));
let row;
const walk = (o) => { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === "object") { if (o.num === "10.1.39") row = o; Object.values(o).forEach(walk); } };
walk(table.tables);
row.en = swap(row.en, "Each citation in the code, the tests or the documents names", "Each citation in the code, the tests or the documentation names", "row en");
row.ru = swap(row.ru, "Каждая ссылка в коде, тестах или документах называет", "Каждая ссылка в коде, тестах или документации называет", "row ru");
row.change += " 20 ноября вы приняли («ок») «документацию» вместо «документов»: слово «документ» остаётся только в смысле 11.1.2, файла, в котором хранится часть спецификации.";
row.agreed = "2026-11-20";
fs.writeFileSync(tp, JSON.stringify(table, null, 2) + "\n");

const decisions = {
  "1.6.1": [{
    date: "2026-11-20",
    problem: "The reason cited the current rule on the tests on a push while the specification is a draft (s-xhcmchcngykvn2k) for why no test has to pass while the specification is a draft. The new form drops that rule.",
    ruling: "The owner: the reason states the ground itself. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.",
    type: "textual",
  }],
  "7.2.7": [{
    date: "2026-11-20",
    problem: "The rule gave RecordType as its example of a name that means something only within the specification, and cited a node of the RecordType extension, which a rule of the SpecSheriff guidelines does not cite (s-chk5hnzmcpeqj25).",
    ruling: "The owner: the example is SpecTag, a name that the SpecSheriff guidelines define themselves.",
    type: "textual",
  }],
  "6.4": [{
    date: "2026-11-20",
    problem: "Together with the rule that puts the appendix of the tools outside the guidelines (s-a4rbry4hsu34hy8), the rule kept the links from the appendix of the tools from being mirrored in the nodes of the guidelines. The reason for the rule that the appendix implements the guidelines (s-uxtyyen92jygth4) relies on those links.",
    ruling: "The owner: a node of the SpecSheriff guidelines, and a node of an extension that the project has chosen, also hold the links that point at it from the appendix of the tools. The appendix comes with the same release as the guidelines, so these links hold true in every project.",
    type: "textual",
  }],
  "row 10.1.39 of table-10-1": [{
    date: "2026-11-20",
    problem: "The row used \"documents\" for the files of documentation outside the specification, while the rule that a part of the specification can be read on its own (s-k73czmpkazcx7mu) uses \"document\" for a file that holds a part of the specification.",
    ruling: "The owner: the row speaks of the documentation, so that \"document\" keeps only the meaning that rule gives it.",
    type: "textual",
  }],
};
fs.writeFileSync(new URL("decisions-out-5.json", here), JSON.stringify(decisions, null, 2) + "\n");

const bp = new URL("build-moved.mjs", here);
let b = fs.readFileSync(bp, "utf8");
if (!b.includes("for (let i = 1; i <= 5; i++) {")) b = swap(b, "for (let i = 1; i <= 4; i++) {\n  for (const [k, v] of Object.entries(readJson(T + `decisions-out-${i}.json`))) {", "for (let i = 1; i <= 5; i++) {\n  for (const [k, v] of Object.entries(readJson(T + `decisions-out-${i}.json`))) {", "build loop");
fs.writeFileSync(bp, b);
console.log("row 10.1.39 agreed; decisions-out-5.json written");
