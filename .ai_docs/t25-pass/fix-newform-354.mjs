// Node 7.1, after specsheriff-rule-reviewer. The readers are divided as node 7.5.1 divides the rules: a node that
// describes the system, and a node that governs how the specification is kept and implemented. What the reader knows
// becomes a list of what the writer assumes, so that it binds the writer. The scope no longer contradicts the rules of
// the section that name other parts of a node, and it leaves out the citations. The word "core", which the owner
// rejected on 2026-10-29, is gone. The reason names those who write or review nodes.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-354.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
const terms = "node, sid, rule, title, text, reason, link, citation, section, specification, guidelines, owner, draft, approved";
n.text = [
  "Whoever writes a node words it so that whoever applies the node understands it correctly on first reading, with the least effort. The other rules of this section serve this goal. Where two of them conflict, the writer chooses the wording that serves the goal better.",
  "The reader of a node is whoever applies it:\n- for a node that describes the system, whoever writes tests and code from the node;\n- for a node that governs how the specification is kept and implemented, whoever writes the specification, the tests or the code in accordance with the node.",
  "Whoever writes a node assumes that its reader:\n- learns what the node means only from the specification;\n- sees the whole node and can read the nodes it links to;\n- knows the rest of the specification only in part.",
  "Each other rule of this section applies to the parts of a node that it names. A rule that names none applies to the node's title, text, reason, list members and table cells, apart from the citations among them.",
  `A node may use the following terms without explaining them, since every reader is given their definitions: ${terms}.`,
].join("\n\n");
n.reason = "Those who write or review nodes apply the rules of this section alike only when they share the goal, the reader and the scope that this node sets out.";
n.ruText = [
  "Автор узла формулирует его так, чтобы тот, кто применяет узел, понял его правильно с первого прочтения и с наименьшим усилием. Остальные правила этого раздела служат этой цели. Там, где два из них противоречат друг другу, автор выбирает формулировку, которая лучше служит цели.",
  "Читатель узла — тот, кто его применяет:\n- для узла, который описывает систему, — тот, кто пишет по этому узлу тесты и код;\n- для узла, который говорит, как ведётся и реализуется спецификация, — тот, кто в соответствии с этим узлом пишет спецификацию, тесты или код.",
  "Автор узла исходит из того, что читатель узла:\n- узнаёт, что значит узел, только из спецификации;\n- видит весь узел и может прочесть узлы, к которым ведут его связи;\n- остальную спецификацию знает лишь отчасти.",
  "Каждое из остальных правил этого раздела распространяется на те части узла, которые оно называет. Правило, которое не называет ни одной, распространяется на заголовок, текст, обоснование, члены списка и ячейки таблицы узла, кроме ссылок в них.",
  `Узел может употреблять следующие термины, не объясняя их, поскольку их определения даны каждому читателю: ${terms}.`,
].join("\n\n");
n.ruReason = "Те, кто пишет или рецензирует узлы, применяют правила этого раздела одинаково, только когда у них общие цель, читатель и область действия, которые задаёт этот узел.";
n.changes = [
  "Новый узел, по вашему решению от 15 ноября: цель, читатель, область действия и термины, которые читатель знает, — то, что вы приняли, когда обсуждали проверку формулировок.",
  "Ссылки не входят в область действия, по вашему решению: это техническая информация. Примеры стоят в отдельном свойстве `examples` (7.6.3), поэтому правила, которые называют только заголовок, текст и обоснование, их и так не касаются. Решение уйдёт в meta.decisions узла.",
  "По замечаниям рецензента: читатели разделены так же, как 7.5.1 делит правила; то, что читатель знает, стало списком того, из чего исходит автор; область действия больше не спорит с правилами раздела о примерах, именах, таблицах и языке; слова «core» и «базовый» убраны, потому что вы отклонили «core» 29 октября, а «базовый» читается как «базовая спецификация».",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
