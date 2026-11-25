// Node 1.3.7: the owner accepted the proposal of fix-newform-239.mjs (2026-11-13, «ок»), so the node is agreed again in
// that wording. Node 10.6, agreed the same day: the one reading of its English after the agreement. The fixes change only
// the English; the Russian title follows the English one.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["1.3.7"];
const p = a.proposals[0];
const part = (s, label) => s.split("\n\n").find((x) => x.startsWith(label)).slice(label.length).trim();
a.text = part(p.en, "Text:");
a.reason = part(p.en, "Reason:");
a.ruText = part(p.ru, "Текст:");
a.ruReason = part(p.ru, "Обоснование:");
delete a.proposals;
a.agreed = "2026-11-13";
a.changes.push(
  "Вы приняли предложение (2026-11-13): ушло второе исключение — правило собственных guidelines проекта, которое говорит, что спецификация одобрена, — и предложение обоснования о нём, по согласованному 10.6. Связь на 10.6 убирается при переносе.",
);

const n = d["10.6"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`missing in ${field}: ${from}`);
  n[field] = n[field].replace(from, to);
};
n.title = "The specification's approval status is set by its owners";
n.ruTitle = "Статус одобрения спецификации задают её ответственные";
swap("text", "approves the specification or puts it back to draft.", "approves the specification or returns it to draft.");
swap("text", "That owner records each such act in an entry of its own, which names that owner.", "That owner records each such act in a separate entry, which names that owner.");
swap("reason", "decides how strictly the checks hold its code and tests", "determines how strictly the checks apply to its code and tests");
swap("reason", "So its owners decide it, both ways, by an act of their own.", "So its owners decide it, in both directions, by an act of their own.");
swap("reason", "They may need to put it back to draft for any reason.", "They may need to return it to draft for any reason.");
swap("reason", "While the specification changes at its core, as when another version of it is adopted", "While the specification is changing fundamentally, for example when another version of it is adopted");
swap("reason", "apart from agreeing to any rule.", "separate from agreeing to any rule.");
n.changes.push(
  "Английский прочитан один раз после согласования: «puts it back» → «returns it», «decides» → «determines», «hold» → «apply to», «at its core» → «fundamentally» (core — прежнее имя guidelines), «of its own» → «separate», «apart from» → «separate from»; заголовок «is its owners' act» → «is set by its owners». Смысл не менялся.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(a.text, "\n---\n", n.title, "\n", n.text);
