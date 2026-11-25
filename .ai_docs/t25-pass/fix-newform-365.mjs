// Node 7.2.7, after the second review by specsheriff-rule-reviewer. "That the specification defines" is the phrase
// node 7.2.4 uses for any defined name, so this node speaks of a word "that takes its meaning from the
// specification". "Common sense" means good judgement, so the node says "everyday meaning". The second kind of word
// covers any meaning that differs from the everyday one, a narrower one among them. The opening sentence is split,
// RecordType is cited, the exception is worded as the reviewer proposed, and the reason speaks of the rule as a whole.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-365.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
const goal = d["7.1"].sidValue;
const recordType = "s-7vm323mhry2enx3";
n.title = "Words that take their meaning from the specification";
n.text = [
  "A node explains each word or phrase that takes its meaning from the specification, or cites the node that defines it. The explanation or the citation stands where the node first uses that word or phrase. This applies to the node's text, reason, list members and table cells.",
  `A word or phrase takes its meaning from the specification where it is either:\n- a name that means something only within the specification, such as RecordType (§${recordType});\n- a common word or phrase to which the specification gives a meaning that differs from its everyday one, such as a narrower one.`,
  `The exception is the words whose definitions every reader is given (§${goal}).`,
].join("\n\n");
n.ruText = [
  "Узел объясняет каждое слово или выражение, смысл которого задаёт спецификация, или ссылается на узел, который его определяет. Объяснение или ссылка стоит там, где узел впервые употребляет это слово или выражение. Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла.",
  `Смысл слову или выражению задаёт спецификация, если это:\n- имя, которое что-то значит только внутри спецификации, например RecordType (§${recordType});\n- обычное слово или выражение, которому спецификация придаёт смысл, отличный от обычного, например более узкий.`,
  `Исключение — слова, определения которых даны каждому читателю (§${goal}).`,
].join("\n\n");
n.reason = "Where a word that takes its meaning from the specification stands unexplained, the reader gives it whatever meaning they know or guess. Nothing shows that meaning to be wrong, so the node is applied in a sense its writer never meant.";
n.ruReason = "Где слово, смысл которого задаёт спецификация, стоит без объяснения, читатель понимает его так, как знает или угадывает. Ничто не показывает, что это неверно, и узел применяют не так, как задумал автор.";
n.examples[1] = "A project's rule limits each user to a quota of requests, and cites, right after \"quota\", the term that defines a quota as the number of requests a user may send per day. The mistake closest to that case: \"quota\" stands bare, and the reader takes it in its everyday meaning, a limit of any kind.";
n.changes = [
  n.changes[0],
  "По вашему пояснению от 16 ноября: правило касается только слов, смысл которых задаёт спецификация. Это имя, которое значит что-то только внутри спецификации (RecordType), и обычное слово, которому спецификация придаёт смысл, отличный от обычного. Вы согласились попробовать узкий смысл («квота» как число запросов в сутки); рецензент предложил охватить и любой иной смысл, например «пользователь», куда спецификация включает и ботов. Обычное слово в обычном смысле правило не затрагивает.",
  "По замечаниям рецензента: «term» в методе — вид узла, поэтому правило говорит о «слове или выражении»; английская фраза «that the specification defines» совпадала с фразой узла 7.2.4 и заменена на «that takes its meaning from the specification»; «common sense» значит «здравый смысл» и заменено на «everyday meaning»; правило называет части узла, к которым относится, и потому не касается заголовка; объяснение или ссылка стоит при первом употреблении; обоснование говорит о правиле целиком.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const page = new URL("base-structure.html", import.meta.url);
const html = fs.readFileSync(page, "utf8");
const from = '["7.2.7","new",0,"","Words that the specification defines",';
if (!html.includes(from)) throw new Error("row 7.2.7 not found");
fs.writeFileSync(page, html.replace(from, '["7.2.7","new",0,"","Words that take their meaning from the specification",'));
console.log("ok");
