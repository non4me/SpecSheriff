// 10.15 after the reviewer's report (not ready), with the agent's answers to its doubts: the paragraph that reported the
// lag of generated code is dropped, since a draft is not implemented (1.3.2) and the agreed row 10.1.40 reports no lag of
// a draft's code; the part generated from a node follows the last wording of it that was approved, even if that approval
// was withdrawn; nothing is generated from a node whose approved wording relies on a node never approved, and the tools
// report it. The reviewer's wording of the first paragraph and of the reason is used.
// The script also applies the wording checker's findings to the drafts 13.1 and 13.2, and fixes the English of the
// agreed 10.12, 10.2 and 1.6.1 as EngStickler's readers reported, without changing their meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-466.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const c = d["10.15"];
c.text = "Whatever the SpecSheriff tools and a project's own generators (§s-km4x4s26kv7pjze) generate as part of the system's code (§s-hheus6f395ynqvc), they generate from the nodes' approved wordings (§s-5ah25f6gy99panq). The part generated from each node follows the last wording of that node that was approved, even if that approval has since been withdrawn. Nothing is generated from a node that has never been approved.\n\nWhere the approved wording of a node relies on a node that has never been approved, nothing is generated from the first node either, and the SpecSheriff tools report it by its sid.";
c.ruText = "Всё, что инструменты SpecSheriff и собственные генераторы проекта (§s-km4x4s26kv7pjze) генерируют как часть кода системы (§s-hheus6f395ynqvc), они генерируют из одобренных формулировок узлов (§s-5ah25f6gy99panq). Часть, сгенерированная из каждого узла, следует последней формулировке этого узла, которую одобряли, даже если это одобрение потом отозвали. Из узла, который ни разу не одобряли, ничего не генерируется.\n\nЕсли одобренная формулировка узла опирается на узел, который ни разу не одобряли, из первого узла тоже ничего не генерируется, и инструменты SpecSheriff сообщают об этом по его sid.";
c.reason = "A file of generated code often comes from many nodes, some of them drafts. The rule lets that file take in every approval at once, yet implement only what the nodes' owners have approved (§s-utvqbypzhmgndug).\n\nThe code of a node whose approval has been withdrawn stays as it was, as the code of any rule that has become a draft does. Code generated from a node that relies on an unapproved node would implement that node as well.";
c.ruReason = "Файл сгенерированного кода часто генерируется из многих узлов, часть которых — черновики. Правило позволяет такому файлу сразу отражать каждое одобрение, но реализовывать только то, что одобрили ответственные за узлы (§s-utvqbypzhmgndug).\n\nКод узла, одобрение которого отозвали, остаётся как был, как остаётся код любого правила, ставшего черновиком. Код, сгенерированный из узла, который опирается на неодобренный узел, реализовал бы и его.";
c.changes.push(
  "По отчёту рецензента: первый абзац — его формулировка, с действующими лицами (инструменты SpecSheriff и генераторы проекта) и ссылками на «код системы» и «одобренную формулировку».",
  "Абзац «пока формулировка узла отличается от одобренной, код отстаёт, об этом сообщается» убран: черновик не реализуется (1.3.2), и согласованная строка 10.1.40 об отставании кода черновика не сообщает.",
  "Добавлено: если одобрение отозвали, часть кода остаётся такой, какой её дала последняя одобренная формулировка, — как остаётся код любого правила, ставшего черновиком (пример 1.3.2).",
  "Добавлено: если одобренная формулировка узла опирается на узел, который ни разу не одобряли, из первого узла ничего не генерируется, и инструменты сообщают об этом по sid.",
  "Обоснование — формулировка рецензента и фразы об отзыве и об опоре на неодобренный узел.",
);

const v = d["13.2"];
v.text = "The map is a mind map of the specification. It is drawn from the nodes each time it is built.\n\nThe map shows the structure of the specification and the status of each node. Everything it shows comes from the nodes.\n\nEach branch opens and closes. The branches stand in the following order: the guidelines first, then the base specification, and the technical appendix last.";
v.ruText = "Карта — это майндмап спецификации. Она рисуется из узлов при каждой сборке.\n\nКарта показывает структуру спецификации и статус каждого узла. Всё, что она показывает, берётся из узлов.\n\nКаждая ветка раскрывается и сворачивается. Ветки стоят в следующем порядке: сначала guidelines, затем базовая спецификация, последним — техническое приложение.";
v.reason = "A specification is read one rule at a time, yet it has to be understood as a whole. An extract of a rule loses where the rule sits, while the full text is more than anyone holds at once. A branch that opens shows the detail a reader came for, while the whole stays in view around it.\n\nDrawn from the nodes at each build, the map cannot disagree with them, as a diagram kept apart from them would. The statuses on the map tell which parts of the specification wait for their owners.";
v.ruReason = "Спецификацию читают по одному правилу, а понимать её нужно целиком. Выдержка из правила теряет, где правило стоит, а полный текст больше, чем кто-либо удерживает сразу. Раскрытая ветка показывает подробности, за которыми пришёл читатель, а целое остаётся в поле зрения вокруг неё.\n\nНарисованная из узлов при каждой сборке, карта не может разойтись с ними, как разошлась бы схема, которую ведут отдельно. Статусы на карте показывают, какие части спецификации ждут своих ответственных.";
v.changes.push("По замечаниям проверки формулировок: одна мысль на фразу; «зачем ветка раскрывается» перенесено в обоснование; «не содержит собственных фактов» сказано утвердительно: «всё, что она показывает, берётся из узлов».");

const e = d["13.1"];
e.text = "The human-readable export writes the specification as a document that a person reads, for example in Markdown. It writes every node with every value that the node's file holds for the node. Each link names the node at its other end by that node's sid, location and title.\n\nThe export keeps the tree of the specification: each node is followed by its children, one level deeper.";
e.ruText = "Читаемый экспорт записывает спецификацию в виде документа, который читает человек, например в Markdown. Он записывает каждый узел со всеми значениями, которые хранит для узла его файл. Каждая связь называет узел на другом конце его sid, расположением и заголовком.\n\nЭкспорт сохраняет дерево спецификации: за каждым узлом идут его дочерние узлы, на уровень глубже.";
e.reason = "A person reads the specification in the export, since the files that a schema checks are hard to read. A reader of the export never learns of a value that the export leaves out, and a sid alone tells a reader nothing of the node it names.";
e.ruReason = "Человек читает спецификацию в экспорте, потому что файлы, которые проверяет схема, читать трудно. О значении, которое экспорт пропускает, его читатель не узнает, а один sid ничего не говорит читателю об узле, который он называет.";
e.changes.push("По замечаниям проверки формулировок: «файл узла хранит для узла», «за каждым узлом идут его дочерние узлы», обоснование короче.");

const swap = (key, field, from, to) => {
  if (!d[key][field].includes(from)) throw new Error(`${key} ${field}: not found: ${from}`);
  d[key][field] = d[key][field].split(from).join(to);
};
swap("10.12", "text", "and the project's other own tools, none of which changes a file;", "and the rest of the project's own tools, none of which changes a file;");
swap("10.12", "text", "Whoever makes it is told", "Whoever makes the commit or the push is told");
swap("10.2", "text", "and nothing they do not", "and nothing that they do not say");
swap("10.2", "text", "while the specification has the status `approved`", "as long as the specification has the status `approved`");
swap("1.6.1", "text", "and nothing they do not", "and nothing that they do not say");
swap("1.6.1", "text", "While the specification has the status `approved`,", "As long as the specification has the status `approved`,");
swap("1.6.1", "reason", "The order of the test and the code", "The order in which the test and the code are written");
swap("1.6.1", "reason", "since a suite takes longer", "since a test suite takes longer");
for (const k of ["10.12", "10.2", "1.6.1"]) d[k].changes.push("Только английский текст, по замечаниям читателей. Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
