// Node 7.2.7, after the owner's explanation of 2026-11-16: a word has a special meaning only where the specification
// gives it that meaning. That covers a name that means something only within the specification, such as RecordType,
// and a common word that the specification defines more narrowly than its common sense, as the agent proposed and
// the owner agreed to try. A common word used in its common sense is not covered. The title names that subject, and
// the examples use a term of the guidelines and a common word that a project defines narrowly.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-363.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
const goal = d["7.1"].sidValue;
n.title = "Words that the specification defines";
n.ruTitle = "Слова, смысл которых задаёт спецификация";
n.text = [
  `A node explains each word or phrase whose meaning the specification gives and its reader (§${goal}) may not know, or cites the node that defines it. It does so where the word or phrase first appears in the node's text, reason, list members or table cells.`,
  "The specification gives the meaning of:\n- a name that means something only within the specification, such as RecordType;\n- a common word that the specification defines more narrowly than its common sense.",
].join("\n\n");
n.ruText = [
  `Узел объясняет каждое слово или выражение, смысл которого задаёт спецификация и которое его читатель (§${goal}) может не знать, или ссылается на узел, который его определяет. Он делает это там, где слово или выражение впервые встречается в тексте, обосновании, членах списка или ячейках таблицы узла.`,
  "Спецификация задаёт смысл:\n- имени, которое что-то значит только внутри спецификации, например RecordType;\n- обычного слова, которое спецификация определяет уже, чем его обычный смысл.",
].join("\n\n");
n.reason = "A reader who meets such a word and finds no explanation at that point reads the rest of the node by a guess at its meaning. For a common word, that guess is its common sense.";
n.ruReason = "Читатель, который встречает такое слово и не находит в этом месте объяснения, читает остальной узел, исходя из догадки о его смысле. Для обычного слова эта догадка — его обычный смысл.";
n.examples = [
  "A rule requires every test to carry a SpecTag, and cites, right after \"SpecTag\", the node that defines it. The mistake closest to that case: \"SpecTag\" stands bare, and only a node that the reader reaches later defines it.",
  "A project's rule limits each user to a quota of requests, and cites, right after \"quota\", the term that defines a quota as the number of requests a user may send in a day. The mistake closest to that case: \"quota\" stands bare, and the reader takes it in its common sense, a limit of any kind.",
];
n.ruExamples = [
  "Правило требует, чтобы каждый тест нёс SpecTag, и сразу после слова SpecTag ссылается на узел, который его определяет. Ближайшая ошибка: SpecTag стоит без ссылки, и определяет его только узел, до которого читатель дойдёт позже.",
  "Правило проекта ограничивает каждого пользователя квотой запросов и сразу после слова «квота» ссылается на термин, который определяет квоту как число запросов, которые пользователь может отправить за сутки. Ближайшая ошибка: «квота» стоит без ссылки, и читатель понимает её в обычном смысле, как любое ограничение.",
];
n.changes = [
  ...n.changes,
  "По вашему пояснению от 16 ноября: особый смысл у слова есть, только если его задаёт спецификация. Это имя, которое значит что-то только внутри спецификации (RecordType), и, как я предложил и вы согласились попробовать, обычное слово, которое спецификация определяет уже его обычного смысла (квота как число запросов в сутки). Обычное слово в обычном смысле правило не затрагивает. Заголовок и примеры изменены соответственно.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const page = new URL("base-structure.html", import.meta.url);
let html = fs.readFileSync(page, "utf8");
const from = '["7.2.7","new",0,"","Words with a special meaning","Слова со специальным значением"';
if (!html.includes(from)) throw new Error("row 7.2.7 not found");
fs.writeFileSync(page, html.replace(from, '["7.2.7","new",0,"","Words that the specification defines","Слова, смысл которых задаёт спецификация"'));
console.log("ok");
