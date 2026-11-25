// Node 7.2.3, the proposal of fix-newform-380.mjs, after the wording checker. The three examples of what a rule says
// form a list, as node 7.2.2 asks for items of the same kind. "Where it can" put "it" before "a rule", so the clause
// moves to the end of the sentence; the Russian does not change there. "This applies" pointed at a rule named in other
// paragraphs, and could cover the sentence before it alone, so it says "This rule". "a different meaning" could mean one
// different from what the rule intends, so it says "a meaning of their own", as the Russian «к своему смыслу» does.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-381.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swaps = [
  ["For example, a rule says which record a structure describes, when a check is made and what it compares with what, and what a model represents.",
    "For example, a rule says:\n- which record a structure describes;\n- when a check is made and what it compares with what;\n- what a model represents."],
  ["Например, правило говорит, какую запись описывает структура, в какой момент выполняется проверка и что с чем она сравнивает, что представляет модель.",
    "Например, правило говорит:\n- какую запись описывает структура;\n- в какой момент выполняется проверка и что с чем она сравнивает;\n- что представляет модель."],
  ["Where it can, a rule names the concrete thing it means rather than a general word for it.",
    "A rule names the concrete thing it means rather than a general word for it, wherever it can."],
  ["This applies to the node's text, reason, list members and table cells.",
    "This rule applies to a node's text, reason, list members and table cells."],
  ["Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла.",
    "Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла."],
  ["the rule then binds each of them to a different meaning.", "the rule then binds each of them to a meaning of their own."],
];
const swap = (s, a, b) => (s.includes(a) ? s.replace(a, b) : s);
const n = d["7.2.3"], t = d["7.2.3~"], p = n.proposals[0];
for (const [a, b] of swaps) {
  const hit = [p.en, p.ru, t.text, t.ruText, t.reason].some((s) => s.includes(a));
  if (!hit) throw new Error("not found: " + a);
  p.en = swap(p.en, a, b);
  p.ru = swap(p.ru, a, b);
  t.text = swap(t.text, a, b);
  t.ruText = swap(t.ruText, a, b);
  t.reason = swap(t.reason, a, b);
}
p.why = p.why
  .replace("Стало: «Например, правило говорит, какую запись описывает структура, в какой момент выполняется проверка и что с чем она сравнивает, что представляет модель».", "Стало: «Например, правило говорит:», и дальше списком: какую запись описывает структура; в какой момент выполняется проверка и что с чем она сравнивает; что представляет модель.")
  .replace("Новый последний абзац: «Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла».", "Новый последний абзац: «Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла».")
  .replace(" Формулировка та же, что в 7.2.7.", " Слова те же, что в 7.1.");
p.why += " Во втором абзаце поправлен только английский: «Where it can» перенесено в конец предложения, потому что «it» стояло раньше слова «rule», к которому относится; русский текст не меняется.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(p.en);
console.log(p.why);
