// Node 1.3.2: the owner withdrew the wording of the third bullet on 2026-11-17 once the agent showed that existing code
// and tests of a rule that has become a draft are no problem («если их наличие не будет проблемой при этом то формулировку
// можно не менять. Писать код для чернового правила по прежнему считается не правильным»): the checks refuse only a
// commit that adds or changes code or tests bound to a draft rule (row 10.1.28a; binding.ts, lines 180 and 205). The
// bullet goes back to its agreed wording, and an example shows the owner's case: a rule that becomes a draft after its
// code and tests exist.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-420.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["1.3.2"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("ru", "- Правило со статусом черновик не требует реализации: для него наличие кода и тестов является не обязательным.", "- Правило со статусом черновик не реализуется: для него не пишут и не меняют ни код, ни тесты.");
swap("en", "- A draft rule does not require implementation: code and tests for it are optional.", "- A draft rule is not implemented: no code or test is written or changed for it.");
const exEn = "Example: A rule that has code and tests is reworded and becomes a draft. Its code and tests stay as they are, and the checks accept them. A commit that changes them is refused until an owner approves the new wording. But not: the rule's code and tests have to be removed because the rule has become a draft.";
const exRu = "Пример: Правило, у которого есть код и тесты, переформулировали, и оно стало черновиком. Его код и тесты остаются как есть, и проверки их принимают. Коммит, который их меняет, отклоняется, пока ответственный не одобрит новую формулировку. Но не так: код и тесты правила приходится удалить, потому что правило стало черновиком.";
swap("en", "\n\nReason: ", `\n\n${exEn}\n\nReason: `);
swap("ru", "\n\nОбоснование: ", `\n\n${exRu}\n\nОбоснование: `);
p.why = p.why.replace(" Третий пункт — ваша формулировка от 17 ноября, дословно: «Правило со статусом черновик не требует реализации: для него наличие кода и тестов является не обязательным».", " Третий пункт остаётся согласованным: вы разрешили его не менять, раз существующие код и тесты правила, ставшего черновиком, не мешают (17 ноября). Добавлен пример именно этого случая.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
