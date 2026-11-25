// Drafts 13.1 and 13.2 after the reviewer's report: its wording fixes for both, the cut of what 10.14 already says, the
// restored restriction of the agreed 4.1 that the map shows only the title and the approval status of each node, the
// appendix of the tools placed after the guidelines on the map, and an example for 13.2. The script also fixes the English
// of the agreed 10.14 as EngStickler's readers reported, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-467.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const e = d["13.1"];
e.text = "The human-readable export is the specification written for a person to read, for example in Markdown. It contains every node with every value that the node's file holds for that node. It shows each link with the sid, the location (§s-kag2m9tzdnduxdx) and the title of the node at the link's other end.\n\nThe export keeps the order and the nesting of the nodes: each node is followed by its children, nested under it.";
e.ruText = "Читаемый экспорт — это спецификация, записанная для чтения человеком, например в Markdown. Он содержит каждый узел со всеми значениями, которые хранит для этого узла его файл. Каждую связь он показывает с sid, расположением (§s-kag2m9tzdnduxdx) и заголовком узла на другом конце этой связи.\n\nЭкспорт сохраняет порядок и вложенность узлов: за каждым узлом идут вложенные в него дочерние узлы.";
e.reason = "The files that a schema checks are hard for a person to read. The export lets a person read everything those files hold, and see where each link leads, without opening them.";
e.ruReason = "Файлы, которые проверяет схема, человеку читать трудно. Экспорт позволяет человеку прочитать всё, что хранят эти файлы, и увидеть, куда ведёт каждая связь, не открывая их.";
e.examples = ["A person outside the team reads a rule in the export and sees its reason, the decisions taken on it, and the title of every node it links to, without opening the specification's files."];
e.ruExamples = ["Человек со стороны читает правило в экспорте и видит его обоснование, решения, принятые по нему, и заголовок каждого узла, с которым оно связано, не открывая файлов спецификации."];
e.changes.push("По отчёту рецензента: экспорт — это спецификация, записанная для чтения человеком (а не «записывает документ»); ссылка на «расположение»; «порядок и вложенность узлов» вместо «на уровень глубже»; обоснование и пример — его формулировки («человек со стороны», потому что «рецензент» в guidelines — независимый рецензент кода).");

const m = d["13.2"];
m.text = "The map is a mind map of the specification, generated from its nodes. It shows only the title and the approval status (§s-tgrnpagrb58tya7) of each node, nested as the nodes are in the specification.\n\nA reader can open and close each branch of the map. Its top-level branches stand in this order: the guidelines, the appendix of the tools, the base specification and the technical appendix (§s-qmmzf9nksfsa3qp).";
m.ruText = "Карта — это майндмап спецификации, сгенерированный из её узлов. Она показывает только заголовок и статус одобрения (§s-tgrnpagrb58tya7) каждого узла, вложенные так же, как узлы в спецификации.\n\nЧитатель может раскрыть и свернуть каждую ветку карты. Её ветки верхнего уровня стоят в таком порядке: guidelines, описание инструментов, базовая спецификация, техническое приложение (§s-qmmzf9nksfsa3qp).";
m.reason = "A specification is read one rule at a time, yet it has to be understood as a whole. A rule read on its own loses where it is in the specification, while the full text is more than anyone holds at once. The map lets a reader open the part they came for while the whole, with what in it still waits for its owners, stays in view.";
m.ruReason = "Спецификацию читают по одному правилу, а понимать её нужно целиком. Правило, прочитанное отдельно, теряет то, где оно находится в спецификации, а полный текст больше, чем кто-либо удерживает сразу. Карта позволяет читателю раскрыть часть, за которой он пришёл, а целое, вместе с тем, что в нём ещё ждёт своих ответственных, остаётся в поле зрения.";
m.examples = ["A reader opens the branch of the base specification and one of its sections, and sees the titles of that section's rules, each with its approval status, while the other branches stay closed."];
m.ruExamples = ["Читатель раскрывает ветку базовой спецификации и один из её разделов и видит заголовки правил этого раздела, у каждого — его статус одобрения, а остальные ветки остаются свёрнутыми."];
m.changes.push(
  "По отчёту рецензента: «статус одобрения» — ваш термин; ссылки на «статус одобрения» и на части спецификации; «читатель может раскрыть и свернуть каждую ветку карты».",
  "Возвращено ограничение согласованного 4.1 «и ничего больше»: карта показывает только заголовок и статус одобрения каждого узла, вложенные так же, как узлы. На нём держится тест инструментов.",
  "Убрано «при каждой сборке» и «всё берётся из узлов», а из обоснования — абзац о том, что карта не расходится с узлами: это уже говорит 10.14.",
  "Добавлено описание инструментов на втором месте среди веток верхнего уровня: по 2.1 оно не часть guidelines, а инструменты сейчас ставят его под guidelines.",
  "Порядок доменов на карте будет задавать узел описания инструментов «Building the map», ссылаясь на 11.2.3; расширения guidelines этого не касаются.",
  "Пример новый: читатель раскрывает раздел.",
);

const t = d["10.14"];
if (!t.text.includes("regenerate whatever is generated from the nodes")) throw new Error("10.14: not found");
t.text = t.text.replace("regenerate whatever is generated from the nodes", "regenerate everything that is generated from the nodes");
t.changes.push("Только английский текст, по замечанию читателей: «everything that is generated». Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
