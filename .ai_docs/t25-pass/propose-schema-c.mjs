// Applies the second review of the two drafts split from "The schema and a project's extension", which passed both
// after these fixes. "How the schema of the specification is composed": the refusals become a list of what the tools
// accept, the chosen extensions are added in the bytewise order of their names, two citations are added, and the
// example the reviewer proposed is put to the owner. "Validation against the schema before a command": only the files
// that the repository keeps are validated, the composed schema is named, and the location is cited; the reviewer's
// doubt about the second paragraph of its reason, which the owner agreed to, is kept for the owner. Applies
// EngStickler's twenty-sixth batch of corrections to the continuation file and INDEX.md, and updates the queue outline.
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
fs.writeFileSync(new URL("tools-drafts.before-schema-c.json", here), JSON.stringify(drafts, null, 2) + "\n");

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const partOf = (p, start) => {
  const found = p.parts.find((x) => x.en.startsWith(start));
  if (!found) throw new Error(`no part starts with: ${start}`);
  return found;
};

// "How the schema of the specification is composed".
const compose = drafts["s-xzcw3hv4hmxz7h7"];
const c = compose.proposal;
Object.assign(partOf(c, "the schema of each extension of the guidelines"), {
  en: "the schema of each extension of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-9ttvcwpqkehm58g) and that has a schema, in the bytewise order of the extensions' names;",
  ru: "схему каждого расширения guidelines (§s-mbmnsnxenmavu3z), которое выбрал проект (§s-9ttvcwpqkehm58g) и у которого есть схема, в побайтовом порядке имён расширений;",
  change: "Новое: правило 5.1 добавляет схему каждого выбранного расширения guidelines. Сейчас схема есть у расширений Domains и RecordType, у расширения Views её нет. Порядок задан, чтобы схема и каждый отказ были одинаковы на любой машине. Порядок имён, а не записей в `sheriff.config.json`, потому что там может быть по записи на каждый выбор и каждый отказ от расширения."
});
Object.assign(partOf(c, "The conditions of a kind of node"), {
  en: "The conditions set for a kind of node apply to every node of that kind, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).",
  ru: "Условия, заданные для типа узла, действуют для каждого узла этого типа, в том числе для узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6)."
});
const refusal = c.parts.findIndex((x) => x.en.startsWith("The tools refuse an extension of the schema that:"));
c.parts.splice(refusal, c.parts.length - refusal,
  { kind: "p",
    en: "The tools accept an extension of the schema only if, when that extension is added:",
    ru: "Инструменты принимают расширение схемы, только если в момент его добавления:",
    change: "Было: «Сначала расширение проверяется по схеме расширения. Эта схема позволяет расширению добавлять только NodeKinds, свойства существующего NodeKind и свойства файла или связи». Теперь перечислено, что нужно, чтобы расширение приняли: расширение, принятое по ошибке, никто бы не заметил." },
  { kind: "li", en: "it is valid JSON;", ru: "оно является допустимым JSON;",
    change: "Новое в тексте: код уже отвергает расширение, которое не является JSON, и тест это проверяет." },
  { kind: "li", en: "it conforms to `extension.schema.json` (§s-zefk589ykh37b8u);", ru: "оно соответствует `extension.schema.json` (§s-zefk589ykh37b8u);",
    change: "Как было: проверка по схеме расширения." },
  { kind: "li",
    en: "each kind of node, type of link and definition that it adds has a name that the schema does not yet define;",
    ru: "у каждого типа узла, типа связи и определения, которые оно добавляет, имя, которого схема ещё не определяет;",
    change: "Новое: так ни одно расширение не меняет определение, которое дали SpecSheriff guidelines или расширение, добавленное раньше (правило 5.2)." },
  { kind: "li",
    en: "each property that it adds to a kind of node, a file or a link is one that the kind, the file or the link does not yet hold;",
    ru: "каждого свойства, которое оно добавляет типу узла, файлу или связи, у них ещё нет;",
    change: "Сейчас код проверяет только это. Новое: сказано, у какого объекта свойство считается уже имеющимся." },
  { kind: "li",
    en: "each kind of node for which it sets `fields` is one that the schema already defines;",
    ru: "каждый тип узла, для которого оно задаёт `fields`, схема уже определяет;",
    change: "Новое: так `fields` не задаёт условий для типа, которого нет, или для типа из расширения, которое проект не выбрал." },
  { kind: "li", en: "it composes into a valid JSON Schema.", ru: "оно составляется в допустимую JSON Schema.",
    change: "Новое в тексте: код уже так поступает, и тест это проверяет." },
  { kind: "p",
    en: "The tools refuse any other extension of the schema. They stop composing the schema at the first extension that they refuse.",
    ru: "Любое другое расширение схемы инструменты отвергают. На первом отвергнутом расширении они прекращают составлять схему.",
    change: "Новое: следующее расширение может опираться на то, что добавило бы отвергнутое." }
);
c.text = render(c.parts, "en");
c.ruText = render(c.parts, "ru");
c.reason = swap(c.reason, "An extension adds no name that the schema already holds,", "An extension adds no name that the schema already defines,");
c.ruReason = swap(c.ruReason, "Расширение не добавляет имени, которое в схеме уже есть,", "Расширение не добавляет имени, которое схема уже определяет,");
c.examples = [{
  en: "A project that has chosen the RecordType extension declares `RecordType` in `kinds` of its own extension of the schema. The SpecSheriff tools refuse that extension, since the schema of the RecordType extension already defines that kind of node. To give every RecordType a further field, the project sets that field in `fields`, under `RecordType`.",
  ru: "Проект, выбравший расширение RecordType, объявляет `RecordType` в `kinds` своего расширения схемы. Инструменты SpecSheriff отвергают это расширение, потому что схема расширения RecordType уже определяет этот тип узла. Чтобы дать каждому RecordType ещё одно поле, проект задаёт это поле в `fields`, под ключом `RecordType`.",
  change: "Предложил рецензент. Пример показывает, что расширение проекта не может объявить заново тип узла из выбранного расширения guidelines и как дать такому типу ещё одно поле. Он хранится в `examples`, отдельно от текста."
}];
c.refs = [
  { type: "implements", to: "s-emrfpzw2d5bgb6x" },
  { type: "implements", to: "s-eferktypcj7njt5" },
  { type: "implements", to: "s-xm8rz4uupb73gu5" },
  { type: "cites", to: "s-mbmnsnxenmavu3z" },
  { type: "cites", to: "s-9ttvcwpqkehm58g" },
  { type: "cites", to: "s-sn6au3vcr9uy5pm" },
  { type: "cites", to: "s-5fewsp22mmdz7y6" },
  { type: "cites", to: "s-zefk589ykh37b8u" }
];
c.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its second report, once propose-schema-c.mjs applied its fixes; the example it proposed is put to the owner";

// "Validation against the schema before a command".
const validate = drafts["new:tools-7-1-validate"];
const v = validate.proposal;
Object.assign(v.parts[0], {
  en: "`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of a part of the specification that the repository keeps (§s-emrfpzw2d5bgb6x). The schema they use is `section-file.schema.json`, composed with the extensions of the schema (§s-xzcw3hv4hmxz7h7). They validate the files at these points:",
  ru: "`sheriff validate`, `sheriff binding` и `sheriff reindex` проверяют каждый файл части спецификации, который хранит репозиторий (§s-emrfpzw2d5bgb6x). Они проверяют по `section-file.schema.json`, составленной с расширениями схемы (§s-xzcw3hv4hmxz7h7). Файлы они проверяют в такие моменты:",
  change: "Из узла «The schema and a project's extension». Было: «`sheriff validate` проверяет каждый файл валидатором JSON Schema по базовой схеме…». Новое: проверяются только файлы, которые хранит репозиторий, а не guidelines и расширения, которые проект берёт из плагина. Файл архива здесь больше не назван: по вашему решению от 12 ноября строка 10.1.2 не распространяется на архив, потому что архив может хранить узел в формате прежнего выпуска. Как проверяется архив, скажет узел «A removed node and the archive», следующий по очереди."
});
Object.assign(partOf(v, "a sid that a node lacks"), {
  en: "a sid that a node lacks, and every location (§s-kag2m9tzdnduxdx);",
  ru: "sid, которого у узла нет, и каждое расположение (§s-kag2m9tzdnduxdx);"
});
v.text = render(v.parts, "en");
v.ruText = render(v.parts, "ru");
v.refs.push({ type: "cites", to: "s-kag2m9tzdnduxdx" });
v.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its second report, once propose-schema-c.mjs applied its fixes; one doubt on the reason put to the owner";
validate.doubt = {
  en: "The reviewer finds that the second paragraph of the reason, which the owner agreed to in the approved node, restates the paragraph on what `sheriff reindex` does clause by clause. It proposes instead: \"`sheriff reindex` validates each file in the form in which it is about to write it, since a file written by hand may hold a key written twice or a name from an earlier release, and lacks what the command computes.\"",
  ru: "Рецензент считает, что второй абзац обоснования, который вы согласовали в одобренном узле, пересказывает абзац о `sheriff reindex` по частям. Он предлагает вместо него: «`sheriff reindex` проверяет каждый файл в том виде, в каком собирается его записать, потому что в файле, написанном вручную, может быть ключ, записанный дважды, или имя прежнего выпуска, и нет того, что вычисляет команда»."
};
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file: EngStickler's twenty-sixth batch, and the state of the two nodes.
edit("../t25-one-thought.md", [
  ["under which the list of the project's own tools that rewrite files is kept in `project.json`.",
    "which covers the list of the project's own tools that rewrite files, kept in `project.json`."],
  ["On the reviewer's advice, the agent has split it into two drafts, which specsheriff-rule-reviewer is reviewing before they are shown to the owner.",
    "On the advice of specsheriff-rule-reviewer, the agent has split it into two drafts, and both passed the reviewer's second review once propose-schema-c.mjs had applied its fixes. The first draft, \"How the schema of the specification is composed\", has now been shown to the owner together with an example that the reviewer proposed. The owner's answer is to be acted on first, and the second draft is shown after it."],
  ["  - The node is split in two, as rule 7.3.3 asks, since its two parts can each be implemented without the other. The node keeps its sid for how the schema of the specification is composed, under the new title",
    "  - The node is split in two, as rule 7.3.3 calls for, since its two parts can each be implemented without the other. The node keeps its sid and now covers only how the schema of the specification is composed, under the new title"],
  ["  - An extension of the schema may add types of link and definitions of the schema. The tools refuse an extension that adds a name that the schema already holds, or that sets `fields` for a kind of node that the schema does not yet hold.\n  - The conditions of a kind of node hold for a node in a cell of a `TableRule` too.",
    "  - An extension of the schema may add types of link and definitions to the schema. The tools refuse an extension that adds a name that the schema already defines, or that sets `fields` for a kind of node that the schema does not yet define.\n  - The conditions that apply to a kind of node also apply to a node in a cell of a `TableRule`."],
  ["does not reach the archive, since the archive may hold a node in a format that an earlier release wrote. The first draft had broken that ruling.",
    "does not apply to the archive, since the archive may hold a node in a format that an earlier release wrote. The first draft had contradicted that ruling."],
  ["The agent decided this for every node of the appendix that carries out a check.", "The agent made the same decision for every node of the appendix that carries out a check."],
  ["  - tools-drafts.before-schema-b.json keeps the drafts as they were before propose-schema-b.mjs ran, and specsheriff-rule-reviewer is reviewing both drafts.",
    `  - tools-drafts.before-schema-b.json keeps the drafts as they were before propose-schema-b.mjs ran.
- The second review passed both drafts once propose-schema-c.mjs had applied its fixes:
  - In "How the schema of the specification is composed", the list of what the tools refuse became a list of what they accept, as rule 7.2.6 requires. The chosen extensions of the guidelines are added in the bytewise order of their names, since \`sheriff.config.json\` may record each choice of an extension and each withdrawal of one. The node now cites the definition of an extension of the guidelines and the rule on a \`TableRule\`.
  - The reviewer proposed an example for that node: a project's extension that declares \`RecordType\` again is refused, and the project gives every RecordType a further field through \`fields\`. gen-tools-node-page.mjs now shows a draft's examples, and the example is put to the owner together with the node.
  - In "Validation against the schema before a command", the commands validate only the files that the repository keeps, so that the SpecSheriff guidelines and the extensions that come with the plugin are not validated in a project. The node now names the composed schema and cites the rule on a node's location.
  - The reviewer doubts the second paragraph of that node's reason, which the owner agreed to in the approved node. The draft keeps the paragraph, and the reviewer's alternative is put to the owner together with the node.
  - tools-drafts.before-schema-c.json keeps the drafts as they were before propose-schema-c.mjs ran. tools-page-schema/index.html and tools-page-validate/index.html show the two drafts.`],
  ["  - When \"A removed node and the archive\" (s-j4webte36gkraju) is reviewed, it is to say how a file of the archive is validated. By the owner's ruling of 2026-11-12,",
    "  - When \"A removed node and the archive\" (s-j4webte36gkraju) is reviewed, that node is to say how a file of the archive is validated. Under the owner's ruling of 2026-11-12,"],
  ["It is to be implemented by \"Where the values of a field of type `one of` are collected\"", "That row is to be implemented by \"Where the values of a field of type `one of` are collected\""]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-schema-b.mjs applies the reviewer's first report:", "propose-schema-b.mjs applies the findings of the reviewer's first report:");
s = swap(s, "gen-tools-node-page.mjs takes, in a draft's `testsFrom`, one test file or several.",
  "gen-tools-node-page.mjs accepts one test file or several in the `testsFrom` field of a draft, and shows a draft's examples. propose-schema-c.mjs applies the findings of the reviewer's second report on both drafts, which passed it, and tools-drafts.before-schema-c.json is tools-drafts.json as it was before that script ran. tools-page-validate/ holds the page showing the draft of \"Validation against the schema before a command\".");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Схема и расширение проекта»: по совету рецензента разделён на два узла — «Как составляется схема спецификации» и «Проверка по схеме до работы команды»; оба у рецензента",
  "- ● «Схема и расширение проекта» разделён на два узла; оба прошли рецензента со второго раза\n- ● «Как составляется схема спецификации»: показан вам вместе с примером\n- ○ «Проверка по схеме до работы команды»: после него");
o = swap(o, "## ○ Затем:",
  "## ◐ Ждёт вашего решения\n\n### ◐ «Как составляется схема спецификации» — узел и пример\n- схемы выбранных расширений guidelines добавляются по порядку имён, расширение проекта — последним\n- пример: расширение проекта не может заново объявить RecordType, но может дать ему поле через fields\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(c.text);
console.log("\n" + v.text);
console.log(`\nupdated at ${now}`);
