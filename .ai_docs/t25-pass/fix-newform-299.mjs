// Node 12.3.1: the owner agreed to the proposal on 2026-11-14 («согласовано»), in the wording that fix-newform-282.mjs to
// fix-newform-298.mjs wrote. The node takes that wording, its examples included, and the proposal is cleared.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.1"];
const p = n.proposals[0];
const part = (s, head, next) => {
  const from = s.indexOf(head);
  const to = next ? s.indexOf(next) : s.length;
  if (from < 0 || to < 0) throw new Error("12.3.1 proposal does not split at " + head);
  return s.slice(from + head.length, to).replace(/\n+$/, "");
};
n.title = part(p.en, "Title: ", "\n\nText: ");
n.text = part(p.en, "Text: ", "\n\nReason: ");
n.reason = part(p.en, "Reason: ", "\n\nExamples: ");
n.examples = [part(p.en, "Examples: ")];
n.ruTitle = part(p.ru, "Заголовок: ", "\n\nТекст: ");
n.ruText = part(p.ru, "Текст: ", "\n\nОбоснование: ");
n.ruReason = part(p.ru, "Обоснование: ", "\n\nПримеры: ");
n.ruExamples = [part(p.ru, "Примеры: ")];
delete n.proposals;
n.agreed = "2026-11-14";
n.changes.push(
  "Вы согласовали новую формулировку (2026-11-14) после обсуждения моделей данных: RecordType — формат данных, относящийся к API домена; у данных одного формата один RecordType, он объявляется в единственном домене, где такие данные появляются впервые; исключение — фрагмент формата, который объявляется в контрактах и который может переиспользовать любой домен; имена RecordType уникальны. Абзац о связях consumes вернулся в узел 1.39, который остаётся отдельным.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1 agreed:\n" + n.text + "\n---\n" + n.reason + "\n---\n" + n.examples[0]);
