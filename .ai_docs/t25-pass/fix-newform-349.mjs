// Node 7.1, "The goal, the reader and the scope": a new node, the first of section 7, as the owner agreed on
// 2026-11-15. It states the goal that every rule on how a node is written serves, the reader that the goal is about,
// the parts of a node that those rules govern, and the core vocabulary that every reader is given.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-349.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["7.1"]) throw new Error("7.1 already has a draft");

const core = "node, sid, rule, title, text, reason, link, citation, section, specification, guidelines, owner, draft, approved";
const draft = {
  from: "",
  sid: "new",
  title: "The goal, the reader and the scope",
  text: [
    "Every rule of this section serves one goal: the reader of a node understands it correctly on first reading and with the least effort. Where two rules of this section conflict, whoever writes the node chooses the wording that the reader understands correctly with less effort.",
    "The reader of a node is whoever applies it:\n- for a node of a project's specification, whoever writes tests and code from the node;\n- for a node of the SpecSheriff guidelines, the AI agent that writes a specification in accordance with the node.",
    "The reader sees the whole node, the nodes it links to and nothing outside the specification. The reader knows the rest of the specification and of the guidelines only in part.",
    "The rules of this section govern only a node's title, text and reason.",
    `Every reader is given the definitions of the terms of the core vocabulary: ${core}. A node may use these terms without explaining them.`,
  ].join("\n\n"),
  reason: [
    "Each other rule of this section is a means to this goal. Whoever applies those rules needs to know the goal, whom it serves and which parts of a node it governs, so these are stated once, here, for all of them.",
    "Some rules of this section pull in different directions, such as brevity and the statement of every condition, and the goal decides between them.",
  ].join("\n\n"),
  ruTitle: "Цель, читатель и область действия",
  ruText: [
    "Все правила этого раздела служат одной цели: читатель узла понимает его правильно с первого прочтения и с наименьшим усилием. Там, где два правила этого раздела расходятся, автор узла выбирает формулировку, которую читатель поймёт правильно с меньшим усилием.",
    "Читатель узла — тот, кто его применяет:\n- для узла спецификации проекта — тот, кто пишет по этому узлу тесты и код;\n- для узла SpecSheriff guidelines — ИИ-агент, который пишет спецификацию в соответствии с этим узлом.",
    "Читатель видит весь узел, узлы, на которые тот ссылается, и ничего за пределами спецификации. Остальную спецификацию и guidelines читатель знает лишь отчасти.",
    "Правила этого раздела касаются только заголовка, текста и обоснования узла.",
    `Каждому читателю даны определения терминов базового словаря: ${core}. Узел может употреблять эти термины, не объясняя их.`,
  ].join("\n\n"),
  ruReason: [
    "Каждое из остальных правил этого раздела — средство достичь этой цели. Тому, кто их применяет, нужно знать цель, кому она служит и какие части узла эти правила регулируют, поэтому всё это сказано один раз, здесь, для всех них.",
    "Некоторые правила этого раздела тянут в разные стороны, например краткость и указание каждого условия, и выбор между ними определяет цель.",
  ].join("\n\n"),
  changes: [
    "Новый узел, по вашему решению от 15 ноября: цель, читатель, область действия и базовый словарь, которые вы приняли, когда обсуждали проверку формулировок.",
    "Ссылки и примеры не входят в область действия правил раздела, по вашему решению: ссылки — техническая информация, а примеры пишутся так, чтобы их точнее всего понял ИИ-агент. Это решение уйдёт в meta.decisions узла.",
  ],
};
// The new key goes first among the drafts of section 7, so that the drafts stay in the order of the page.
const out = {};
let placed = false;
for (const [k, v] of Object.entries(d)) {
  if (!placed && /^7\./.test(k)) { out["7.1"] = draft; placed = true; }
  out[k] = v;
}
if (!placed) out["7.1"] = draft;
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log(draft.text + "\n\n" + draft.reason);
