// Draft 13.2 brought back to the wording of the approved 4.1 on the owner's remark of 2026-11-18: the earlier wording,
// which said what the map is and what it is for, was better, and the term "mind map" should not open the node. The node
// again opens with "the specification seen from above", keeps "holds no fact of its own" and the sentence on why a branch
// opens and closes, and names the mind map only in its example. The changes the owner has already accepted for the
// extension stay: no domains, the approval status, the appendix of the tools among the top-level branches.
// The script also fixes the English of the agreed 13.1 as EngStickler's readers reported, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-468.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const m = d["13.2"];
m.text = "The map is the specification seen from above. It is drawn from the nodes and holds no fact of its own.\n\nThe map shows only the title and the approval status (§s-tgrnpagrb58tya7) of each node, nested as the nodes are nested in the specification. A branch of the map opens and closes, so that a reader goes to the part they came for while the whole stays in view around it.\n\nThe top-level branches of the map stand in this order: the guidelines, the appendix of the tools, the base specification and the technical appendix (§s-qmmzf9nksfsa3qp).";
m.ruText = "Карта — это спецификация, увиденная сверху. Она рисуется из узлов и не содержит собственных фактов.\n\nКарта показывает только заголовок и статус одобрения (§s-tgrnpagrb58tya7) каждого узла, вложенные так же, как узлы вложены в спецификации. Ветка карты раскрывается и сворачивается, поэтому читатель переходит к нужной ему части, а целое остаётся в поле зрения вокруг неё.\n\nВетки верхнего уровня карты стоят в таком порядке: guidelines, описание инструментов, базовая спецификация, техническое приложение (§s-qmmzf9nksfsa3qp).";
m.reason = "A specification is read one rule at a time, yet it has to be understood as a whole. The full text is more than anyone holds at once, and a rule read on its own loses where it is in the specification. Seen from above, the specification shows the shape of everything and the detail of whatever is opened, together with what in it still waits for its owners.";
m.ruReason = "Спецификацию читают по одному правилу, а понимать её нужно целиком. Полный текст больше, чем кто-либо удерживает сразу, а правило, прочитанное отдельно, теряет то, где оно находится в спецификации. Увиденная сверху, спецификация показывает и форму целого, и подробности того, что раскрыто, вместе с тем, что в ней ещё ждёт своих ответственных.";
m.examples = ["Drawn as a mind map, the map opens with its top-level branches. A reader opens the branch of the base specification and one of its sections, and sees the titles of that section's rules, each with its approval status, while the other branches stay closed."];
m.ruExamples = ["Нарисованная как майндмап, карта открывается ветками верхнего уровня. Читатель раскрывает ветку базовой спецификации и один из её разделов и видит заголовки правил этого раздела, у каждого — его статус одобрения, а остальные ветки остаются свёрнутыми."];
m.changes.push("По вашему замечанию 18 ноября (прежняя формулировка лучше, «майндмап» не стоит употреблять сходу): узел снова открывается словами согласованного 4.1 «карта — это спецификация, увиденная сверху», сохраняет «не содержит собственных фактов» и фразу о том, зачем ветка раскрывается и сворачивается; майндмап назван только в примере. Остальное, что уже принято для расширения, остаётся: без доменов, «статус одобрения», описание инструментов среди веток верхнего уровня.");

const e = d["13.1"];
const from = "It shows each link with the sid, the location (§s-kag2m9tzdnduxdx) and the title of the node at the link's other end.";
if (!e.text.includes(from)) throw new Error("13.1: not found");
e.text = e.text.replace(from, "It shows each link with the node at the link's other end: that node's sid, location (§s-kag2m9tzdnduxdx) and title.");
e.changes.push("Только английский текст, по замечанию читателей: sid, расположение и заголовок явно отнесены к узлу на другом конце связи. Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
