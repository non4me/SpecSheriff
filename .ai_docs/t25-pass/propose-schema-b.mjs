// Applies the first review of the draft of "The schema and a project's extension" (s-xzcw3hv4hmxz7h7). The node is split
// in two, as rule 7.3.3 asks: the node keeps its sid for how the schema of the specification is composed, and a new node
// says when the commands validate the files against it. A file of the archive leaves both, by the owner's ruling of
// 2026-11-12 that the main table's row 10.1.2 does not reach the archive. Applies EngStickler's twenty-fifth batch of
// corrections to the continuation file and INDEX.md, and updates the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) s = swap(s, from, to);
  fs.writeFileSync(url, s);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-schema-b.json", here), JSON.stringify(drafts, null, 2) + "\n");

// A paragraph opens each group, and its list follows it.
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};

// The node that keeps the sid: how the schema of the specification is composed.
const composeParts = [
  { kind: "p",
    en: "The SpecSheriff tools compose the schema of the specification (§s-eferktypcj7njt5) from the schema of the SpecSheriff guidelines, adding to it the following extensions of the schema one at a time, in this order:",
    ru: "Инструменты SpecSheriff составляют схему спецификации (§s-eferktypcj7njt5) из схемы SpecSheriff guidelines, добавляя к ней по одному следующие расширения схемы в таком порядке:",
    change: "Было: «`sheriff validate` проверяет каждый файл валидатором JSON Schema по базовой схеме SpecSheriff guidelines, составленной с расширением проекта». Теперь этот узел говорит только о том, как составляется схема. Когда команды проверяют по ней файлы, говорит новый узел, который идёт сразу после этого." },
  { kind: "li",
    en: "the schema of each extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) and that has a schema, in the order in which `sheriff.config.json` lists the chosen extensions;",
    ru: "схему каждого расширения guidelines, которое выбрал проект (§s-9ttvcwpqkehm58g) и у которого есть схема, в том порядке, в каком `sheriff.config.json` перечисляет выбранные расширения;",
    change: "Новое: правило 5.1 добавляет схему каждого выбранного расширения guidelines. Сейчас схема есть у расширений Domains и RecordType, у расширения Views её нет. Порядок задан, чтобы схема и каждый отказ были одинаковы на любой машине." },
  { kind: "li",
    en: "the project's own extension of the schema (§s-xm8rz4uupb73gu5), if the project has one.",
    ru: "собственное расширение схемы проекта (§s-xm8rz4uupb73gu5), если оно у проекта есть.",
    change: "Как было; теперь сказано, что оно добавляется последним." },
  { kind: "p",
    en: "Each extension of the schema adds:",
    ru: "Каждое расширение схемы добавляет:",
    change: "Было: «То, что добавляет расширение, присоединяется к базовой схеме»." },
  { kind: "li",
    en: "each of its kinds of node to the kinds that a node may have, together with the conditions in that kind's `schema`;",
    ru: "каждый свой тип узла — к типам, которые может иметь узел, вместе с условиями из `schema` этого типа;",
    change: "Было: «его NodeKinds присоединяются к NodeKinds, которые может иметь узел»." },
  { kind: "li",
    en: "the conditions that its `fields` set for a kind of node to the conditions on every node of that kind;",
    ru: "условия, которые его `fields` задают для типа узла, — к условиям для каждого узла этого типа;",
    change: "Было: «его условия присоединяются к тем, которым подчиняется каждый узел». Теперь сказано, что условие из `fields` действует для узлов одного типа, как и делает код." },
  { kind: "li",
    en: "each of its types of link to the types that a link may have (§s-sn6au3vcr9uy5pm);",
    ru: "каждый свой тип связи — к типам, которые может иметь связь (§s-sn6au3vcr9uy5pm);",
    change: "Новое: по правилу 6.1 расширение guidelines или собственные guidelines проекта могут определить свои типы связей. Так расширение Domains добавляет связь `consumes`." },
  { kind: "li",
    en: "each of its definitions to those of `node.schema.json`, where a reference `#/$defs/<name>` in any extension of the schema finds that definition;",
    ru: "каждое своё определение — к определениям `node.schema.json`, где это определение находит ссылка `#/$defs/<name>` из любого расширения схемы;",
    change: "Новое: расширение может добавить определения, на которые ссылаются его типы узлов и другие расширения." },
  { kind: "li",
    en: "its properties of a file to those that a file of a part of the specification may hold;",
    ru: "свои свойства файла — к свойствам, которые может иметь файл части спецификации;",
    change: "Было: «его свойства файла и связи присоединяются к тем, которые могут иметь файл и связь»." },
  { kind: "li",
    en: "its properties of a link to those that a link may hold.",
    ru: "свои свойства связи — к свойствам, которые может иметь связь.",
    change: "Как было." },
  { kind: "p",
    en: "The conditions of a kind of node hold for every node of that kind, including a node in a cell of a `TableRule`.",
    ru: "Условия типа узла действуют для каждого узла этого типа, в том числе для узла в ячейке `TableRule`.",
    change: "Новое: сейчас код добавляет эти условия только к узлу части спецификации, и узел в ячейке их обходит." },
  { kind: "p",
    en: "The tools refuse an extension of the schema that:",
    ru: "Инструменты отвергают расширение схемы, которое:",
    change: "Было: «Сначала расширение проверяется по схеме расширения. Эта схема позволяет расширению добавлять только NodeKinds, свойства существующего NodeKind и свойства файла или связи»." },
  { kind: "li",
    en: "is not valid JSON;",
    ru: "не является допустимым JSON;",
    change: "Новое в тексте: код уже так поступает, и тест это проверяет." },
  { kind: "li",
    en: "does not conform to `extension.schema.json` (§s-zefk589ykh37b8u);",
    ru: "не соответствует `extension.schema.json` (§s-zefk589ykh37b8u);",
    change: "Как было: проверка по схеме расширения." },
  { kind: "li",
    en: "adds a kind of node, a type of link or a definition under a name that the schema already holds when that extension is added;",
    ru: "добавляет тип узла, тип связи или определение под именем, которое уже есть в схеме к тому моменту, когда добавляется это расширение;",
    change: "Новое: так ни одно расширение не меняет определение, которое дали SpecSheriff guidelines или расширение, добавленное раньше (правило 5.2)." },
  { kind: "li",
    en: "adds a property that a node of the kind it concerns, a file or a link already holds when that extension is added;",
    ru: "добавляет свойство, которое уже есть у узла того типа, к которому оно относится, у файла или у связи к тому моменту, когда добавляется это расширение;",
    change: "Сейчас код отвергает только такое свойство. Новое: сказано, у какого объекта свойство считается уже имеющимся." },
  { kind: "li",
    en: "sets `fields` for a kind of node that the schema does not hold when that extension is added;",
    ru: "задаёт `fields` для типа узла, которого в схеме нет к тому моменту, когда добавляется это расширение;",
    change: "Новое: так `fields` не может задать условия для типа, которого нет, или для типа из расширения, которое проект не выбрал." },
  { kind: "li",
    en: "does not compose into a valid JSON Schema.",
    ru: "не составляется в допустимую JSON Schema.",
    change: "Новое в тексте: код уже так поступает, и тест это проверяет." },
  { kind: "p",
    en: "The tools add no extension of the schema after the first one that they refuse.",
    ru: "После первого расширения схемы, которое инструменты отвергли, они не добавляют ни одного.",
    change: "Новое: следующее расширение может опираться на то, что добавило бы отвергнутое." }
];
const composeReason = "The extensions of the schema are added in a fixed order, so that the composed schema and every refusal are the same on every machine. An extension adds no name that the schema already holds, so that it changes no definition of the SpecSheriff guidelines or of a chosen extension (§s-xm8rz4uupb73gu5). The project's own extension is added last, since its `fields` may set conditions for a kind that a chosen extension adds. No extension is added after a refused one, since it may rely on what the refused one would have added.";
const composeRuReason = "Расширения схемы добавляются в заданном порядке, чтобы составленная схема и каждый отказ были одинаковы на любой машине. Расширение не добавляет имени, которое в схеме уже есть, чтобы оно не меняло ни одного определения SpecSheriff guidelines или выбранного расширения (§s-xm8rz4uupb73gu5). Собственное расширение проекта добавляется последним, потому что его `fields` могут задавать условия для типа, который добавляет выбранное расширение. После отвергнутого расширения не добавляется ни одно, потому что оно может опираться на то, что добавило бы отвергнутое.";

const node = drafts["s-xzcw3hv4hmxz7h7"];
Object.assign(node.proposal, {
  title: "How the schema of the specification is composed",
  ruTitle: "Как составляется схема спецификации",
  titleChange: "Было: «The schema and a project's extension». Узел разделён на два, и этот теперь говорит только о том, как составляется схема.",
  parts: composeParts,
  text: render(composeParts, "en"),
  ruText: render(composeParts, "ru"),
  reason: composeReason,
  ruReason: composeRuReason,
  reasonChange: "Новое: прежнее обоснование говорило о командах и перешло в новый узел. Это обоснование объясняет порядок, отказ при повторном имени, место расширения проекта и остановку после отказа.",
  removed: [
    "«валидатором JSON Schema»: проверка по JSON Schema и так делается валидатором.",
    "«Эта схема позволяет расширению добавлять только NodeKinds, свойства существующего NodeKind и свойства файла или связи.» Что расширение может добавить, теперь говорит список «Каждое расширение схемы добавляет», а допустимую форму расширения задаёт `extension.schema.json`.",
    "Абзацы о том, когда `sheriff validate`, `sheriff binding` и `sheriff reindex` проверяют файлы по схеме, что `sheriff reindex` исключает из проверки и что команды делают при отказе, вместе с их обоснованием. Они перешли в новый узел «Проверка по схеме до работы команды»."
  ],
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: the first report found the draft not ready; propose-schema-b.mjs split the node and applied the report",
  refs: [
    { type: "implements", to: "s-emrfpzw2d5bgb6x" },
    { type: "implements", to: "s-eferktypcj7njt5" },
    { type: "implements", to: "s-xm8rz4uupb73gu5" },
    { type: "cites", to: "s-9ttvcwpqkehm58g" },
    { type: "cites", to: "s-sn6au3vcr9uy5pm" },
    { type: "cites", to: "s-zefk589ykh37b8u" }
  ]
});
node.testsFrom = ["unit/schema.test.ts", "unit/validate.test.ts"];

// The new node: when the commands validate the files against the schema.
const validateParts = [
  { kind: "p",
    en: "`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of a part of the specification against `section-file.schema.json` (§s-emrfpzw2d5bgb6x), composed as §s-xzcw3hv4hmxz7h7 says. They validate the files at these points:",
    ru: "`sheriff validate`, `sheriff binding` и `sheriff reindex` проверяют каждый файл части спецификации по `section-file.schema.json` (§s-emrfpzw2d5bgb6x), составленной так, как говорит §s-xzcw3hv4hmxz7h7. Они проверяют файлы в такие моменты:",
    change: "Из узла «The schema and a project's extension». Было: «`sheriff validate` проверяет каждый файл валидатором JSON Schema по базовой схеме…». Файл архива здесь больше не назван: по вашему решению от 12 ноября строка 10.1.2 не доходит до архива, потому что архив может хранить узел в формате прежнего выпуска. Как проверяется архив, скажет узел «A removed node and the archive», следующий по очереди." },
  { kind: "li",
    en: "`sheriff validate`, before any check that reads their nodes;",
    ru: "`sheriff validate` — до любой проверки, которая читает их узлы;",
    change: "Уточнено: раньше сказано «прежде всего», но проверка дважды записанного ключа и проверка копии guidelines идут раньше, они не читают узлов." },
  { kind: "li",
    en: "`sheriff binding`, before it checks anything;",
    ru: "`sheriff binding` — прежде, чем что-либо проверять;",
    change: "Как было." },
  { kind: "li",
    en: "`sheriff reindex`, before it computes anything.",
    ru: "`sheriff reindex` — прежде, чем что-либо вычислять.",
    change: "Как было." },
  { kind: "p",
    en: "Before that validation, `sheriff reindex` merges each key written twice and changes what an earlier release wrote (§s-f5rz6b7dhxejjts). It leaves out of the validation only what it writes itself:",
    ru: "До этой проверки `sheriff reindex` объединяет каждый ключ, записанный дважды, и изменяет то, что записал более ранний выпуск (§s-f5rz6b7dhxejjts). Из проверки он исключает только то, что пишет сам:",
    change: "Как было, только два предложения вместо одного." },
  { kind: "li",
    en: "the links pointing at a node;",
    ru: "связи, указывающие на узел;",
    change: "Как было." },
  { kind: "li",
    en: "a sid that a node lacks, and every location;",
    ru: "sid, которого у узла нет, и каждое расположение;",
    change: "Было: «вне архива — …». Оговорка не нужна: файл архива здесь не проверяется." },
  { kind: "li",
    en: "the status of a section (§s-9kfdycuq34beqvs) and of a domain's header (§s-yggv9myedprnaa7);",
    ru: "статус раздела (§s-9kfdycuq34beqvs) и заголовка домена (§s-yggv9myedprnaa7);",
    change: "Как было, отдельным пунктом." },
  { kind: "li",
    en: "the index of the sections in a domain's header (§s-2r59txnms5serdr);",
    ru: "оглавление разделов в заголовке домена (§s-2r59txnms5serdr);",
    change: "Как было, со ссылкой на правило расширения Domains об оглавлении." },
  { kind: "li",
    en: "the values gathered beside a field (§s-ju5vcanbjph7mgh).",
    ru: "значения, собранные рядом с полем (§s-ju5vcanbjph7mgh).",
    change: "Как было, со ссылкой на правило расширения RecordType о собранных значениях." },
  { kind: "p",
    en: "Where the SpecSheriff tools refuse an extension of the schema (§s-xzcw3hv4hmxz7h7), or the schema refuses a file, `sheriff validate`, `sheriff binding` and `sheriff reindex` name that extension or each such file, with every refusal in it. They then check nothing more. `sheriff reindex` then writes no file.",
    ru: "Если инструменты SpecSheriff отвергают расширение схемы (§s-xzcw3hv4hmxz7h7) или схема отвергает файл, `sheriff validate`, `sheriff binding` и `sheriff reindex` называют это расширение или каждый такой файл и каждый отказ в нём. После этого они больше ничего не проверяют. `sheriff reindex` тогда не пишет ни одного файла.",
    change: "Было: так поступали `sheriff binding` и `sheriff reindex`. Теперь сказано и о `sheriff validate`, который уже так поступает с файлами. Отвергнув расширение проекта, `sheriff validate` сейчас проверяет файлы по схеме без него и сообщает о лишних отказах; в этапе 3 он перестанет это делать." }
];
const validateReason = [
  "Each command is written for the shape that the schema gives a file. Only a validation against the schema names where a file departs from that shape and what is wrong there. `sheriff reindex` builds each file from all the files, so writing only some of them would leave the files disagreeing with one another.",
  "A key written twice is merged first, since a file read without the merge holds only its last value. What an earlier release wrote is changed first, since the schema refuses its old names. What `sheriff reindex` writes itself is left out, since a node written by hand lacks it until the command runs."
].join("\n\n");
const validateRuReason = [
  "Каждая команда написана для того вида файла, который задаёт схема. Только проверка по схеме называет, где файл отступает от этого вида и что там не так. `sheriff reindex` строит каждый файл из всех файлов, поэтому если записать лишь некоторые из них, файлы разойдутся друг с другом.",
  "Ключ, записанный дважды, объединяется первым, потому что файл, прочитанный без объединения, хранит только последнее значение. То, что записал более ранний выпуск, изменяется первым, потому что схема отвергает его старые имена. То, что `sheriff reindex` пишет сам, исключается, потому что в узле, написанном вручную, этого нет, пока команда не запущена."
].join("\n\n");
drafts["new:tools-7-1-validate"] = {
  location: "tools 7.1.3 (new, after \"How the schema of the specification is composed\")",
  agreed: false,
  proposal: {
    title: "Validation against the schema before a command",
    ruTitle: "Проверка по схеме до работы команды",
    parts: validateParts,
    text: render(validateParts, "en"),
    ruText: render(validateParts, "ru"),
    reason: validateReason,
    ruReason: validateRuReason,
    reasonChange: "Как было в узле «The schema and a project's extension», с уточнением «из всех файлов».",
    removed: [],
    date: "2026-11-21",
    reviewed: "not yet reviewed as a node of its own",
    refs: [
      { type: "implements", to: "s-emrfpzw2d5bgb6x" },
      { type: "implements", to: "s-eferktypcj7njt5" },
      { type: "cites", to: "s-xzcw3hv4hmxz7h7" },
      { type: "cites", to: "s-f5rz6b7dhxejjts" },
      { type: "cites", to: "s-9kfdycuq34beqvs" },
      { type: "cites", to: "s-yggv9myedprnaa7" },
      { type: "cites", to: "s-2r59txnms5serdr" },
      { type: "cites", to: "s-ju5vcanbjph7mgh" }
    ]
  },
  from: "s-xzcw3hv4hmxz7h7",
  testsFrom: ["e2e/commands.test.ts", "unit/binding.test.ts", "unit/reindex.test.ts"]
};
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file: EngStickler's twenty-fifth batch, and the state of the fourth node.
edit("../t25-one-thought.md", [
  ["The owner agreed on 2026-11-21 to the first three nodes under review.", "On 2026-11-21 the owner agreed to the first three nodes under review."],
  ["The third is the new node \"What the SpecSheriff tools read in the project's own guidelines\", which keeps the list of the project's own tools that rewrite files in `project.json`.",
    "The third is the new node \"What the SpecSheriff tools read in the project's own guidelines\", under which the list of the project's own tools that rewrite files is kept in `project.json`."],
  ["The next node is \"The schema and a project's extension\" (s-xzcw3hv4hmxz7h7), and specsheriff-rule-reviewer reviews its rewritten draft before the node is shown to the owner.",
    "The next node is \"The schema and a project's extension\" (s-xzcw3hv4hmxz7h7). On the reviewer's advice, the agent has split it into two drafts, which specsheriff-rule-reviewer is reviewing before they are shown to the owner."],
  ["that a project registers its own tools for a hook in a form that the hook can read without the SpecSheriff tools. A list in `project.json` cannot be read without the SpecSheriff tools,",
    "that a project registers its own tools for a hook in a format that the hook can read without the SpecSheriff tools. The hook cannot read a list in `project.json` without the SpecSheriff tools,"],
  ["If the SpecSheriff tools cannot run, the hook then runs all the project's own tools in the bytewise order of their names, as it does now. No check required by the SpecSheriff guidelines runs in that case anyway.",
    "If the SpecSheriff tools cannot run, the hook runs all the project's own tools in the bytewise order of their names, as it does now. In that case, no check required by the SpecSheriff guidelines runs at all."],
  ["- The owner agreed to the node on 2026-11-21 on those terms («ок»).", "- On 2026-11-21 the owner agreed to the node as the agent recommended («ок»)."],
  [`- The fourth node is "The schema and a project's extension" (s-xzcw3hv4hmxz7h7, tools 7.1.2). propose-schema.mjs drafted its new wording, under the new title "The schema and its extensions", and fix-schema-page-data.mjs added what the page tools-page-schema/index.html needs: the Russian rendering of the approved wording and the list of what the draft removes. The draft does the following:
  - it composes the schema from the schema of the SpecSheriff guidelines, then the schema of each extension of the guidelines that the project has chosen, then the project's own extension of the schema;
  - it has a file of the archive validated against \`archive-file.schema.json\`;
  - it lets an extension of the schema add types of link and definitions, and has the tools refuse an extension that adds a name that the schema already holds;
  - it holds a node in a cell and a node of the archive to the conditions of its kind;
  - it implements row 10.1.2 of the main table of checks rather than the whole table, as the agent decided for every check of the appendix.
- In stage 3, \`sheriff validate\` is to stop validating the files against a schema composed without the project's extension once it has refused that extension, as \`sheriff binding\` and \`sheriff reindex\` already do. tools-drafts.before-schema.json keeps the drafts as they were before propose-schema.mjs ran. specsheriff-rule-reviewer is reviewing the draft.`,
    `- The fourth node is "The schema and a project's extension" (s-xzcw3hv4hmxz7h7, tools 7.1.2). propose-schema.mjs drafted its new wording, and fix-schema-page-data.mjs added to the draft the Russian rendering of the node's approved wording, which the page tools-page-schema/index.html shows. tools-drafts.before-schema.json keeps the drafts as they were before propose-schema.mjs ran.
- specsheriff-rule-reviewer found that first draft not ready, and propose-schema-b.mjs revised it:
  - The node is split in two, as rule 7.3.3 asks, since its two parts can each be implemented without the other. The node keeps its sid for how the schema of the specification is composed, under the new title "How the schema of the specification is composed". The new node "Validation against the schema before a command" (the draft "new:tools-7-1-validate", tools 7.1.3) says when \`sheriff validate\`, \`sheriff binding\` and \`sheriff reindex\` validate the files, what \`sheriff reindex\` leaves out of the validation, and what the commands do on a refusal.
  - The schema is composed from the schema of the SpecSheriff guidelines, then the schema of each extension of the guidelines that the project has chosen, in the order in which \`sheriff.config.json\` lists those extensions, then the project's own extension of the schema. The tools add no extension of the schema after the first one that they refuse.
  - An extension of the schema may add types of link and definitions of the schema. The tools refuse an extension that adds a name that the schema already holds, or that sets \`fields\` for a kind of node that the schema does not yet hold.
  - The conditions of a kind of node hold for a node in a cell of a \`TableRule\` too.
  - A file of the archive is validated by neither node. On 2026-11-12 the owner ruled that row 10.1.2 of the main table of checks does not reach the archive, since the archive may hold a node in a format that an earlier release wrote. The first draft had broken that ruling.
  - Both nodes implement row 10.1.2 rather than the whole main table of checks. The agent decided this for every node of the appendix that carries out a check.
  - tools-drafts.before-schema-b.json keeps the drafts as they were before propose-schema-b.mjs ran, and specsheriff-rule-reviewer is reviewing both drafts.
- Still to be done for these nodes:
  - In stage 3, \`sheriff validate\` is to stop validating the files against a schema composed without the project's extension once it has refused that extension, as \`sheriff binding\` and \`sheriff reindex\` already do.
  - When "A removed node and the archive" (s-j4webte36gkraju) is reviewed, it is to say how a file of the archive is validated. By the owner's ruling of 2026-11-12, \`archive-file.schema.json\` in moved/specs/_schema/ is then to describe only what the SpecSheriff tools read from the archive. The schema that stage 1 wrote refers to the composed schema of a node, and so refuses a node in a format that an earlier release wrote.
  - Row 12.12.11 of the table of checks of the RecordType extension (s-upj45kydz8727be) is carried out by the composed schema. It is to be implemented by "Where the values of a field of type \`one of\` are collected" (s-5nf87c3e3jg9v7c) when that node is reviewed, as stage2-inventory.md proposes.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-schema-page-data.mjs adds to that draft the Russian rendering of the approved wording and the list of what the draft removes, and tools-page-schema/ holds the page showing the draft. state-schema.mjs records in the continuation file that the draft is with the reviewer.",
  "fix-schema-page-data.mjs adds to the draft of that node the Russian rendering of the node's approved wording and the list of what the draft removes from that wording, and tools-page-schema/ holds the page showing the draft. state-schema.mjs records in the continuation file that specsheriff-rule-reviewer is reviewing the draft. propose-schema-b.mjs applies the reviewer's first report: it splits the node into \"How the schema of the specification is composed\" and the new node \"Validation against the schema before a command\", and tools-drafts.before-schema-b.json is tools-drafts.json as it was before that script ran. gen-tools-node-page.mjs takes, in a draft's `testsFrom`, one test file or several.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Схема и расширение проекта» → «Схема и её расширения»: черновик у рецензента",
  "- ● «Схема и расширение проекта»: по совету рецензента разделён на два узла — «Как составляется схема спецификации» и «Проверка по схеме до работы команды»; оба у рецензента");
fs.writeFileSync(outline, o);
console.log(`drafts, continuation file, INDEX.md and outline updated at ${now}`);
