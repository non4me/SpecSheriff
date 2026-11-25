// Drafts of the extension "Views of the specification" (section 13), under the plan the owner accepted on 2026-11-17:
// the views are the kinds of additional documentation generated from the nodes, and the extension's rules say what each
// view shows, while the appendix of the tools says how the SpecSheriff tools build it.
// - 13.1 "The human-readable export" is new; it states what the appendix of the tools (s-k4nqjr96ux7a5m7) already makes
//   the export write.
// - 13.2 "The map of the specification" takes the present 4.1 (s-zu8ne3wq84zchc4), which the move of 2026-11-11 had
//   taken out of the guidelines; it is reworded in general terms, since the extension names no domain (1.7.4), and the
//   order of the domains stays in the Domains extension (11.2.3).
import fs from "node:fs";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-draft-13-views.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["13.1"] || d["13.2"]) throw new Error("13.1 or 13.2 already drafted");

const taken = fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8") + JSON.stringify(d);
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
let sid;
do sid = "s-" + Array.from({ length: 15 }, () => alphabet[randomInt(alphabet.length)]).join(""); while (taken.includes(sid));

d["13.1"] = {
  from: "",
  sid: "new",
  title: "The human-readable export",
  ruTitle: "Читаемый экспорт",
  text: "The human-readable export writes the specification as a document that a person reads, for example in Markdown. It writes every node with every value its file holds for it. Each link names the node at its other end by its sid, its location and its title.\n\nThe export keeps the tree of the specification: each node's children follow it, one level deeper.",
  ruText: "Читаемый экспорт записывает спецификацию в виде документа, который читает человек, например в Markdown. Он записывает каждый узел со всеми значениями, которые хранит для него файл. Каждая связь называет узел на другом конце его sid, расположением и заголовком.\n\nЭкспорт сохраняет дерево спецификации: дочерние узлы идут после своего узла, на уровень глубже.",
  reason: "A person reads the specification in the export, since the files that a schema checks are hard to read. A value that the export left out would be one its reader never learns of. A sid alone tells a reader nothing of the node it names.",
  ruReason: "Человек читает спецификацию в экспорте, потому что файлы, которые проверяет схема, читать трудно. Значение, которое экспорт пропустил бы, его читатель так и не узнал бы. Один sid ничего не говорит читателю об узле, который он называет.",
  examples: ["A reviewer outside the team reads the export of a rule and sees its reason, the decisions taken on it, and the title of every rule it links to, without opening the specification's files."],
  ruExamples: ["Рецензент со стороны читает экспорт правила и видит его обоснование, решения, принятые по нему, и заголовок каждого правила, с которым оно связано, не открывая файлов спецификации."],
  changes: [
    "Новый узел расширения «Представления спецификации» (план, который вы приняли 17 ноября). Говорит, что показывает читаемый экспорт; как его пишут инструменты, говорит узел описания инструментов «What the export, the guide and `sheriff show` write of a node», который теперь будет реализовывать этот узел.",
  ],
  sidValue: sid,
};
d["13.2"] = {
  from: "4.1",
  sid: "kept",
  title: "The map of the specification",
  ruTitle: "Карта спецификации",
  text: "The map is a mind map of the specification, drawn from the nodes each time it is built. It shows the structure of the specification and the status of each node, and holds no fact of its own.\n\nA branch opens and closes, so that a reader goes to the part they came for while the whole stays in view around it.\n\nThe branches stand in this order: the guidelines first, then the base specification, and the technical appendix last.",
  ruText: "Карта — это майндмап спецификации, который рисуется из узлов при каждой сборке. Она показывает структуру спецификации и статус каждого узла и не содержит собственных фактов.\n\nВетка раскрывается и сворачивается, поэтому читатель переходит к нужной ему части, а целое остаётся в поле зрения вокруг неё.\n\nВетки стоят в таком порядке: сначала guidelines, затем базовая спецификация, последним — техническое приложение.",
  reason: "A specification is read one rule at a time and has to be understood as a whole. The full text is more than anyone holds at once, and an extract loses where the rule sits. A mind map shows the shape of everything and the detail of whatever is opened.\n\nDrawn from the nodes at each build, the map cannot disagree with them, as a diagram kept apart from them would. The statuses on the map tell which parts of the specification wait for their owners, while the whole stays in view.",
  ruReason: "Спецификацию читают по одному правилу, а понимать её нужно целиком. Полный текст больше, чем кто-либо удерживает сразу, а выдержка теряет место правила. Майндмап показывает и форму целого, и подробности того, что раскрыто.\n\nНарисованная из узлов при каждой сборке, карта не может разойтись с ними, как разошлась бы схема, которую ведут отдельно. Статусы на карте показывают, какие части спецификации ждут своих ответственных, а целое остаётся в поле зрения.",
  changes: [
    "Возвращён из описания инструментов, куда его увёл перенос 11 ноября, в расширение «Представления спецификации» (план, который вы приняли 17 ноября). sid нынешнего 4.1 сохранён: его реализует узел описания инструментов «Building the map».",
    "Заголовок — несколько слов о предмете узла.",
    "Текст: убраны домены и контракты — расширение не называет доменов (1.7.4). Порядок веток — guidelines, базовая спецификация, техническое приложение; порядок доменов внутри базовой спецификации задаёт расширение «Домены» (11.2.3).",
    "«Структура — домен, части под ним, правила… рисуется из вложенности, заголовков и уровня домена» убрано: это говорит о доменах, а что карта рисуется из узлов, уже сказано.",
    "Обоснование сокращено: убраны фразы об уровнях и порядке доменов, остальное — по смыслу прежнего.",
  ],
  sidValue: "s-zu8ne3wq84zchc4",
};
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", here);
fs.copyFileSync(page, new URL("base-structure.before-draft-13-views.html", here));
let h = fs.readFileSync(page, "utf8");
const from = h.indexOf('      ["13.2","new",0,"","The map of the specification"');
const to = h.indexOf("\n", from);
if (from < 0) throw new Error("row 13.2 not found");
h = h.slice(0, from) + '      ["13.2","move",0,"4.1","The map is a mindmap of the specification","Карта — майндмап спецификации","","Возвращается из описания инструментов, куда его увёл перенос 11 ноября."]' + h.slice(to);
fs.writeFileSync(page, h);
console.log("ok", sid);
