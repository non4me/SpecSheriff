// Brings the outline of the queue map up to date on 21 November: a new day starts with only what was done on it, and
// stage 2 shows the questions of the inventory settled and node 12.3a, "A RecordType is a rule", with the reviewer.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const p = new URL("queue-outline.md", here);
fs.copyFileSync(p, new URL("queue-outline.before-2026-11-21.md", here));
let s = fs.readFileSync(p, "utf8");
const done = s.indexOf("## ✓ Сделано сегодня");
const work = s.indexOf("## ● В работе:");
if (done < 0 || work < done) throw new Error("the outline's branches are not where they were");
s = s.slice(0, done) + [
  "## ✓ Сделано сегодня",
  "",
  "### ✓ RecordType — правило: вы выбрали вариант А",
  "- назначение и формат данных — в одном узле базовой спецификации",
  "- его SpecTag несут сгенерированный код и хотя бы один тест",
  "",
  "",
].join("\n") + s.slice(work);
const from = "### ● этап 2: описание инструментов — по одному узлу с вами\n- ● перечень узлов описания, которые затрагивает новая форма\n- ○ затем узлы по одному\n";
if (!s.includes(from)) throw new Error("stage 2 is not where it was");
s = s.replace(from, () => [
  "### ● этап 2: описание инструментов — по одному узлу с вами",
  "- ✓ перечень узлов описания, которые затрагивает новая форма",
  "- ✓ вопросы из перечня: связи из описания в 6.4, «документация», RecordType — правило",
  "- ● новый узел 12.3a «RecordType — правило»: у рецензента, затем вам",
  "- ○ затем узлы описания по одному, начиная с «Где лежат файлы»",
  "",
].join("\n"));
fs.writeFileSync(p, s);
console.log("outline updated");
