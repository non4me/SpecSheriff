// Drafts the new wording of "The schema and a project's extension" (s-xzcw3hv4hmxz7h7, tools 7.1.2) for the new form of
// the guidelines: the schema is composed from the schema of the guidelines, the schema of each chosen extension of the
// guidelines and the project's extension; a file of the archive has a schema of its own; an extension of the schema adds
// types of link and definitions, and is refused where it repeats a name; the node implements row 10.1.2 of the main table
// of checks rather than the whole table. Writes the draft into tools-drafts.json for specsheriff-rule-reviewer.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-schema.json", here), JSON.stringify(drafts, null, 2) + "\n");

const tools = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8"));
const find = (nodes, sid) => {
  for (const n of nodes ?? []) {
    if (n.sid === sid) return n;
    const hit = find(n.children, sid);
    if (hit) return hit;
  }
};
const current = find(tools.nodes, "s-xzcw3hv4hmxz7h7");

const parts = [
  { kind: "p",
    en: "The SpecSheriff tools validate each file of the specification against its JSON Schema (§s-emrfpzw2d5bgb6x): a file of the archive against `archive-file.schema.json`, and any other file against `section-file.schema.json`. They compose both schemas from the schema of the SpecSheriff guidelines (§s-eferktypcj7njt5) and the following extensions of the schema, added in this order:",
    ru: "Инструменты SpecSheriff проверяют каждый файл спецификации по его JSON Schema (§s-emrfpzw2d5bgb6x): файл архива — по `archive-file.schema.json`, любой другой файл — по `section-file.schema.json`. Обе схемы они составляют из схемы SpecSheriff guidelines (§s-eferktypcj7njt5) и следующих расширений схемы, добавляя их в таком порядке:",
    change: "Было: «`sheriff validate` проверяет каждый файл валидатором JSON Schema по базовой схеме SpecSheriff guidelines, составленной с расширением проекта». Новое: файл архива проверяется по своей схеме; к схеме добавляются и схемы выбранных расширений guidelines. Узел теперь ссылается на строку 10.1.2 основной таблицы проверок, которую он выполняет, а не на всю таблицу." },
  { kind: "li",
    en: "the schema of each extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), if that extension has a schema;",
    ru: "схема каждого расширения guidelines, которое выбрал проект (§s-9ttvcwpqkehm58g), если у этого расширения есть схема;",
    change: "Новое: правило 5.1 добавляет схему каждого выбранного расширения guidelines. Сейчас у расширений Domains и RecordType есть схема, у расширения Views её нет." },
  { kind: "li",
    en: "the project's own extension of the schema (§s-xm8rz4uupb73gu5), if the project has one.",
    ru: "собственное расширение схемы проекта (§s-xm8rz4uupb73gu5), если оно у проекта есть.",
    change: "Как было; теперь сказано, что оно добавляется последним." },
  { kind: "p",
    en: "Each extension of the schema adds:",
    ru: "Каждое расширение схемы добавляет:",
    change: "Было: «То, что добавляет расширение, присоединяется к базовой схеме»." },
  { kind: "li",
    en: "each of its kinds of node to the kinds that a node may have, with the conditions in that kind's `schema`, which hold for every node of the kind, including a node in a cell of a `TableRule` and a node of the archive;",
    ru: "каждый свой тип узла — к типам, которые может иметь узел, вместе с условиями из `schema` этого типа; эти условия действуют для каждого узла этого типа, в том числе для узла в ячейке `TableRule` и для узла архива;",
    change: "Было: «его NodeKinds присоединяются к NodeKinds, которые может иметь узел». Новое: условия типа действуют и для узла в ячейке, и для узла архива. Сейчас код добавляет их только к узлу части спецификации." },
  { kind: "li",
    en: "the conditions that its `fields` set for a kind of node, to the conditions that every node of that kind is held to;",
    ru: "условия, которые его `fields` задают для типа узла, — к условиям, которым подчиняется каждый узел этого типа;",
    change: "Было: «его условия присоединяются к тем, которым подчиняется каждый узел». Теперь сказано, что условие из `fields` действует для узлов одного типа, как и делает код." },
  { kind: "li",
    en: "each of its types of link to the types that a link may have (§s-sn6au3vcr9uy5pm);",
    ru: "каждый свой тип связи — к типам, которые может иметь связь (§s-sn6au3vcr9uy5pm);",
    change: "Новое: по правилу 6.1 расширение guidelines или собственные guidelines проекта могут определить свои типы связей. Так расширение Domains добавляет связь `consumes`." },
  { kind: "li",
    en: "each of its definitions to those of `node.schema.json`, where a reference `#/$defs/<name>` in any extension of the schema finds it;",
    ru: "каждое своё определение — к определениям `node.schema.json`, где его находит ссылка `#/$defs/<name>` из любого расширения схемы;",
    change: "Новое: расширение может добавить определения, на которые ссылаются его типы узлов, а также другие расширения." },
  { kind: "li",
    en: "its properties of a file to those that a file of a part of the specification and a file of the archive may hold;",
    ru: "свои свойства файла — к свойствам, которые может иметь файл части спецификации и файл архива;",
    change: "Было: «свойства файла и связи присоединяются к тем, которые могут иметь файл и связь». Теперь файлов два вида." },
  { kind: "li",
    en: "its properties of a link to those that a link may hold.",
    ru: "свои свойства связи — к свойствам, которые может иметь связь.",
    change: "Как было." },
  { kind: "p",
    en: "The tools refuse an extension of the schema that:",
    ru: "Инструменты отвергают расширение схемы, которое:",
    change: "Было: «Расширение сначала проверяется по схеме расширения. Эта схема позволяет расширению добавлять только NodeKinds, свойства существующего NodeKind и свойства файла или связи»." },
  { kind: "li",
    en: "is not valid JSON;",
    ru: "не является допустимым JSON;",
    change: "Новое в тексте: код уже так поступает, и тест это проверяет." },
  { kind: "li",
    en: "does not conform to `extension.schema.json` (§s-zefk589ykh37b8u);",
    ru: "не соответствует `extension.schema.json` (§s-zefk589ykh37b8u);",
    change: "Как было: проверка по схеме расширения." },
  { kind: "li",
    en: "adds a kind of node, a type of link, a definition or a property under a name that the schema already holds when that extension is added;",
    ru: "добавляет тип узла, тип связи, определение или свойство под именем, которое уже есть в схеме к тому моменту, когда добавляется это расширение;",
    change: "Новое: так ни одно расширение не меняет определение, которое дали SpecSheriff guidelines или расширение, добавленное раньше (правило 5.2). Сейчас код отвергает только свойство, которое уже есть." },
  { kind: "li",
    en: "does not compose into a valid JSON Schema.",
    ru: "не составляется в допустимую JSON Schema.",
    change: "Новое в тексте: код уже так поступает, и тест это проверяет." },
  { kind: "p",
    en: "`sheriff validate` and `sheriff binding` validate the files before they check anything. `sheriff reindex` validates them before it computes anything, once it has merged each key written twice and changed what an earlier release wrote (§s-f5rz6b7dhxejjts). It leaves out of that validation what it writes itself:",
    ru: "`sheriff validate` и `sheriff binding` проверяют файлы, прежде чем проверять что-либо ещё. `sheriff reindex` проверяет их, прежде чем что-либо вычислять, после того как объединил каждый ключ, записанный дважды, и изменил то, что записал более ранний выпуск (§s-f5rz6b7dhxejjts). Из этой проверки он исключает то, что пишет сам:",
    change: "Как было, только собрано в один абзац." },
  { kind: "li",
    en: "the links pointing at a node;",
    ru: "связи, указывающие на узел;",
    change: "Как было." },
  { kind: "li",
    en: "outside the archive, a sid that a node lacks, and every location;",
    ru: "вне архива — sid, которого у узла нет, и каждое расположение;",
    change: "Как было. Узел архива теперь вообще не имеет sid, а своё расположение сохраняет." },
  { kind: "li",
    en: "the status of a section (§s-9kfdycuq34beqvs) and of a domain's header;",
    ru: "статус раздела (§s-9kfdycuq34beqvs) и заголовка домена;",
    change: "Как было, отдельным пунктом." },
  { kind: "li",
    en: "the index of the sections in a domain's header (§s-2r59txnms5serdr);",
    ru: "оглавление разделов в заголовке домена (§s-2r59txnms5serdr);",
    change: "Как было, с ссылкой на правило расширения Domains об оглавлении." },
  { kind: "li",
    en: "the values gathered beside a field (§s-ju5vcanbjph7mgh).",
    ru: "значения, собранные рядом с полем (§s-ju5vcanbjph7mgh).",
    change: "Как было, с ссылкой на правило расширения RecordType о собранных значениях." },
  { kind: "p",
    en: "Where the tools refuse an extension of the schema, or the schema refuses a file, `sheriff validate`, `sheriff binding` and `sheriff reindex` name each such extension or file and every refusal in it. They then check nothing more, and `sheriff reindex` writes no file.",
    ru: "Если инструменты отвергают расширение схемы или схема отвергает файл, `sheriff validate`, `sheriff binding` и `sheriff reindex` называют каждое такое расширение или файл и каждый отказ в нём. После этого они больше ничего не проверяют, а `sheriff reindex` не пишет ни одного файла.",
    change: "Было: так поступали `sheriff binding` и `sheriff reindex`. Теперь сказано и о `sheriff validate`, который уже так поступает с файлами. Отвергнув расширение проекта, `sheriff validate` сейчас проверяет файлы по схеме без него и сообщает о лишних отказах; в этапе 3 он перестанет это делать." }
];

// The text: a paragraph opens each group, and its list follows it.
const render = (key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};

const reason = [
  "Each command is written for the shape that the schema gives a file. Only a validation against the schema names where a file departs from that shape and what is wrong there. `sheriff reindex` builds each file from all the files, so writing only some of them would leave the files disagreeing with one another.",
  "An extension of the schema adds only names that the schema does not yet hold, so that it changes no definition of the SpecSheriff guidelines or of a chosen extension (§s-xm8rz4uupb73gu5). The project's own extension is added last, so that where it repeats a name of a chosen extension, the refusal names the project's extension, which the project can correct. The conditions of a kind hold wherever a node of that kind stands, so that a node in a cell or in the archive is held to them as well.",
  "A key written twice is merged first, since a file read without the merge holds only its last value. What an earlier release wrote is changed first, since the schema refuses its old names. What `sheriff reindex` writes itself is left out, since a node written by hand lacks it until the command runs."
].join("\n\n");
const ruReason = [
  "Каждая команда написана для того вида файла, который задаёт схема. Только проверка по схеме называет, где файл отступает от этого вида и что там не так. `sheriff reindex` строит каждый файл из всех файлов, поэтому если записать лишь некоторые из них, файлы разойдутся друг с другом.",
  "Расширение схемы добавляет только имена, которых в схеме ещё нет, чтобы оно не меняло ни одного определения SpecSheriff guidelines или выбранного расширения (§s-xm8rz4uupb73gu5). Собственное расширение проекта добавляется последним, чтобы там, где оно повторяет имя выбранного расширения, отказ называл расширение проекта, которое проект может исправить. Условия типа узла действуют везде, где стоит узел этого типа, чтобы им подчинялся и узел в ячейке, и узел архива.",
  "Ключ, записанный дважды, объединяется первым, потому что файл, прочитанный без объединения, хранит только последнее значение. То, что записал более ранний выпуск, изменяется первым, потому что схема отвергает его старые имена. То, что `sheriff reindex` пишет сам, исключается, потому что в узле, написанном вручную, этого нет, пока команда не запущена."
].join("\n\n");

drafts["s-xzcw3hv4hmxz7h7"] = {
  location: "tools 7.1.2",
  title: current.title,
  text: current.text,
  reason: current.reason,
  refs: current.refs.filter((r) => r.to),
  agreed: false,
  proposal: {
    title: "The schema and its extensions",
    ruTitle: "Схема и её расширения",
    titleChange: "Было: «The schema and a project's extension». Теперь расширений схемы несколько: схемы выбранных расширений guidelines и расширение проекта.",
    parts,
    text: render("en"),
    ruText: render("ru"),
    reason,
    ruReason,
    reasonChange: "Первый и третий абзацы — как было, с уточнением «из всех файлов». Второй абзац новый: почему имя нельзя повторить, почему расширение проекта добавляется последним и почему условия типа действуют для узла в ячейке и в архиве.",
    removed: [
      { en: "with a JSON Schema validator", ru: "«валидатором JSON Schema»", why: "Проверка по JSON Schema и так делается валидатором." },
      { en: "That schema lets an extension add only NodeKinds, properties of an existing NodeKind, and properties of a file or of a link.", ru: "«Эта схема позволяет расширению добавлять только NodeKinds, свойства существующего NodeKind и свойства файла или связи.»", why: "Что расширение может добавить, теперь говорит список «Каждое расширение схемы добавляет», а `extension.schema.json` задаёт допустимую форму." }
    ],
    date: "2026-11-21",
    refs: [
      { type: "implements", to: "s-emrfpzw2d5bgb6x" },
      { type: "implements", to: "s-eferktypcj7njt5" },
      { type: "implements", to: "s-xm8rz4uupb73gu5" },
      { type: "cites", to: "s-9ttvcwpqkehm58g" },
      { type: "cites", to: "s-sn6au3vcr9uy5pm" },
      { type: "cites", to: "s-zefk589ykh37b8u" },
      { type: "cites", to: "s-f5rz6b7dhxejjts" },
      { type: "cites", to: "s-9kfdycuq34beqvs" },
      { type: "cites", to: "s-2r59txnms5serdr" },
      { type: "cites", to: "s-ju5vcanbjph7mgh" }
    ]
  }
};
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(drafts["s-xzcw3hv4hmxz7h7"].proposal.text);
console.log("\nREASON:\n" + reason);
