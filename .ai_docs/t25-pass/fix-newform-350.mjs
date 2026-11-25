// Node 7.1, "The goal, the reader and the scope", after the first pass of the wording checker. The first sentence no
// longer uses "reader" before the text explains it. The sentence on what the reader sees says what holds. The reason
// no longer goes through the text's parts one by one or repeats the goal; it says why the node exists as a whole.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-350.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
if (!n) throw new Error("no draft 7.1");

const core = "node, sid, rule, title, text, reason, link, citation, section, specification, guidelines, owner, draft, approved";
n.text = [
  "Every rule of this section serves one goal: whoever applies a node understands it correctly on first reading and with the least effort. Where two rules of this section conflict, whoever writes the node chooses the wording that serves this goal better.",
  "The reader of a node is whoever applies it:\n- for a node of a project's specification, whoever writes tests and code from the node;\n- for a node of the SpecSheriff guidelines, the AI agent that writes a specification in accordance with the node.",
  "The reader learns what a node means only from the specification. The reader sees the whole node and the nodes it links to, but knows the rest of the specification and of the guidelines only in part.",
  "The rules of this section govern only a node's title, text and reason.",
  `Every reader is given the definitions of the core vocabulary: ${core}. A node may use these terms without explaining them.`,
].join("\n\n");
n.reason = "Those who write and check nodes apply the rules of this section alike only when they share one goal, one reader and one scope.";
n.ruText = [
  "Все правила этого раздела служат одной цели: тот, кто применяет узел, понимает его правильно с первого прочтения и с наименьшим усилием. Там, где два правила этого раздела расходятся, автор узла выбирает формулировку, которая лучше служит этой цели.",
  "Читатель узла — тот, кто его применяет:\n- для узла спецификации проекта — тот, кто пишет по этому узлу тесты и код;\n- для узла SpecSheriff guidelines — ИИ-агент, который пишет спецификацию в соответствии с этим узлом.",
  "Что значит узел, читатель узнаёт только из спецификации. Читатель видит весь узел и узлы, на которые тот ссылается, но остальную спецификацию и guidelines знает лишь отчасти.",
  "Правила этого раздела касаются только заголовка, текста и обоснования узла.",
  `Каждому читателю даны определения базового словаря: ${core}. Узел может употреблять эти термины, не объясняя их.`,
].join("\n\n");
n.ruReason = "Те, кто пишет и проверяет узлы, применяют правила этого раздела одинаково, только когда у них одна цель, один читатель и одна область действия.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
