// Node 7.2.7, after specsheriff-rule-reviewer. "Term" is a kind of node in the method, so the rule speaks of a word or
// phrase with a special meaning. The rule names the parts of a node it applies to, which leaves the title out, as the
// owner's rule term-explained does. Both the explanation and the citation stand where the word first appears. The
// sentence that repeated node 7.1 is gone; 7.1 is cited at "its reader". The reason states one thought per sentence.
// The example is the one the reviewer proposed.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-361.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
const goal = d["7.1"].sidValue;
n.title = "Words with a special meaning";
n.ruTitle = "Слова со специальным значением";
n.text = `A node explains each word or phrase with a special meaning that its reader (§${goal}) may not know, or cites the node that defines it. It does so where the word or phrase first appears in the node's text, reason, list members or table cells.`;
n.ruText = `Узел объясняет каждое слово или выражение со специальным значением, которое его читатель (§${goal}) может не знать, или ссылается на узел, который его определяет. Он делает это там, где слово или выражение впервые встречается в тексте, обосновании, членах списка или ячейках таблицы узла.`;
n.reason = "A reader who meets an unexplained word or phrase with a special meaning guesses what it means. The reader then applies the node by that guess. An explanation further on comes only after the guess has been made.";
n.ruReason = "Читатель, встретивший слово или выражение со специальным значением без объяснения, додумывает, что оно значит. Затем он применяет узел по этой догадке. Объяснение, данное дальше, приходит уже после того, как догадка сделана.";
n.examples = ["A text refuses \"a request beyond its user's quota\", and cites, right after \"quota\", the term that defines it. The mistake closest to that case: \"quota\" stands bare in the text, and only the reason explains it."];
n.ruExamples = ["Текст отклоняет «запрос сверх квоты его пользователя» и сразу после слова «квота» ссылается на термин, который её определяет. Ближайшая ошибка: «квота» стоит в тексте без пояснения, и объясняет её только обоснование."];
n.changes = [
  ...n.changes.filter((c) => !c.startsWith("Исключение для терминов")),
  "По замечаниям рецензента: «term» в методе — это вид узла, поэтому правило говорит о «слове или выражении со специальным значением»; правило называет части узла, к которым относится, и тем самым не касается заголовка, как и ваше правило term-explained; объяснение и ссылка стоят там, где слово впервые встречается; второе предложение, повторявшее 7.1, убрано, а на 7.1 теперь ссылка при слове «читатель»; пример предложил рецензент.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
