// Draft 10.8: the reviewer's report of 2026-11-13, taken into one final wording.
// - "Code of the rule" was undefined; 1.4.1 and 9.3 speak of code that implements a rule, so the text says "is considered
//   code that implements the rule listing the check", worded like agreed 9.4 ("is considered").
// - The reason: one thought to a sentence (7.5); "bound to its rule" gave 9.3's word a second meaning and named no rule
//   (7.8); "held by" becomes "applies to" (7.17).
// - An example, as node 7.16 lets a node hold.
// The reviewer's doubt on check 10.1.28a (it finds a rule's code by SpecTag, which a check's code lacks) is put to the
// owner separately, after this node.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.8"];
n.title = "The code of a project's own check implements the rule listing it";
n.ruTitle = "Код собственной проверки проекта реализует правило, которое её перечисляет";
n.text =
  "The code of a project's own check is considered code that implements the rule listing the check (§s-2fau85dfyyeq66m). " +
  "The check's tests are considered tests of that rule.";
n.ruText =
  "Код собственной проверки проекта считается кодом, который реализует правило, перечисляющее эту проверку (§s-2fau85dfyyeq66m). " +
  "Тесты проверки считаются тестами этого правила.";
n.reason =
  "A project's own check is not the system's code, so its code has no SpecTag (§s-hheus6f395ynqvc). " +
  "Because its code and tests are considered those of the rule listing it, every requirement on a rule's code and tests applies to them.";
n.ruReason =
  "Собственная проверка проекта не относится к коду системы, поэтому у её кода нет SpecTag (§s-hheus6f395ynqvc). " +
  "Раз её код и тесты считаются кодом и тестами правила, которое её перечисляет, к ним применяются все требования к коду и тестам правила.";
n.examples = [
  "A rule lists a check that every `page` node names its users. The check's tests carry the SpecTag of that rule, not of the rule requiring a page to name its users.",
];
n.ruExamples = [
  "Правило перечисляет проверку того, что каждый узел `page` называет своих пользователей. У тестов проверки SpecTag этого правила, а не правила, которое требует этого от страницы.",
];
n.changes.push(
  "Правки ревьюера: «код правила» → «считается кодом, который реализует правило» (слова 1.4.1 и 9.3, оборот как в согласованном 9.4); обоснование — одна мысль в предложении; добавлен пример.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruTitle, "\n", n.ruText);
