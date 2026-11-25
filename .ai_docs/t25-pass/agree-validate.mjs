// Records the owner's agreement of 2026-11-21 («ок») to "Validation against the schema before a command works on the
// files" (new:tools-7-1-validate), with the second paragraph of its reason kept, and writes english-validate.md, its
// English text, for EngStickler's reader. Applies the corrections that EngStickler's reader found in the English of the
// agreed node "How the schema of the specification is composed", none of which changes its meaning, and EngStickler's
// twenty-ninth batch of corrections to the continuation file and INDEX.md. Updates the queue outline.
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
fs.writeFileSync(new URL("tools-drafts.before-agree-validate.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const fixPart = (p, start, en, ru) => {
  const found = p.parts.find((x) => x.en.startsWith(start));
  if (!found) throw new Error(`no part starts with: ${start}`);
  found.en = en;
  if (ru) found.ru = ru;
};

// The agreement to "Validation against the schema before a command works on the files".
const validate = drafts["new:tools-7-1-validate"];
validate.agreed = "2026-11-21";
validate.rulings = [
  { date: "2026-11-21",
    problem: "specsheriff-rule-reviewer proposed replacing the second paragraph of the reason, which the owner had agreed to in the approved node \"The schema and a project's extension\", with one sentence saying that `sheriff reindex` validates each file in the form in which the command is about to write it. That sentence is inexact, since the validation leaves out what the command writes itself.",
    ruling: "The owner agreed to the node with the paragraph kept («ок»).",
    type: "textual" }
];
const v = validate.proposal;
fs.writeFileSync(new URL("english-validate.md", here), [
  "# \"Validation against the schema before a command works on the files\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", v.title, "", "## Text", "", v.text, "", "## Reason", "", v.reason, ""
].join("\n"));

// The English of "How the schema of the specification is composed", as EngStickler's reader read it.
const compose = drafts["s-xzcw3hv4hmxz7h7"];
const c = compose.proposal;
fixPart(c, "The SpecSheriff tools compose the schema of the specification",
  "The SpecSheriff tools compose the schema of the specification (§s-eferktypcj7njt5). They start from the schema of the SpecSheriff guidelines and add the following extensions of the schema to the composed schema one at a time, in this order:",
  "Инструменты SpecSheriff составляют схему спецификации (§s-eferktypcj7njt5). Они начинают со схемы SpecSheriff guidelines и добавляют к составляемой схеме по одному следующие расширения схемы в таком порядке:");
fixPart(c, "the schema of each extension of the guidelines",
  "the schema of each extension of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-9ttvcwpqkehm58g), if that extension has a schema, in the bytewise order of the extensions' names;",
  "схему каждого расширения guidelines (§s-mbmnsnxenmavu3z), которое выбрал проект (§s-9ttvcwpqkehm58g), если у этого расширения есть схема, в побайтовом порядке имён расширений;");
fixPart(c, "each of its definitions",
  "each of its definitions to those of `node.schema.json`, so that a reference `#/$defs/<name>` in any extension of the schema resolves to that definition;",
  "каждое своё определение — к определениям `node.schema.json`, так что ссылка `#/$defs/<name>` из любого расширения схемы указывает на это определение;");
fixPart(c, "its properties of a file",
  "the properties that it defines for a file, to those that a file of a part of the specification may hold;",
  "свойства, которые оно задаёт для файла, — к свойствам, которые может иметь файл части спецификации;");
fixPart(c, "its properties of a link",
  "the properties that it defines for a link, to those that a link may hold.",
  "свойства, которые оно задаёт для связи, — к свойствам, которые может иметь связь.");
fixPart(c, "each kind of node for which it sets `fields`",
  "each kind of node for which its `fields` set conditions is one that the schema already defines;",
  "каждый тип узла, для которого его `fields` задают условия, схема уже определяет;");
fixPart(c, "it composes into a valid JSON Schema.",
  "the schema composed with it is a valid JSON Schema.",
  "схема, составленная вместе с ним, — допустимая JSON Schema.");
c.text = render(c.parts, "en");
c.ruText = render(c.parts, "ru");
c.reason = swap(c.reason, "stays as they give it (§s-xm8rz4uupb73gu5)", "stays as the SpecSheriff guidelines or the chosen extension define it (§s-xm8rz4uupb73gu5)");
c.ruReason = swap(c.ruReason, "оставалось таким, каким они его дали (§s-xm8rz4uupb73gu5)", "оставалось таким, каким его определяют SpecSheriff guidelines или выбранное расширение (§s-xm8rz4uupb73gu5)");
const ex = c.examples[0];
ex.en = swap(ex.en, "A project that has chosen the RecordType extension declares `RecordType` in `kinds` of its own extension of the schema.",
  "A project that has chosen the RecordType extension of the guidelines declares `RecordType` in the `kinds` of its own extension of the schema.");
ex.en = swap(ex.en, "the project sets that field in `fields`, under `RecordType`.", "the project declares that field in `fields`, under `RecordType`.");
ex.ru = swap(ex.ru, "Проект, выбравший расширение RecordType,", "Проект, выбравший расширение guidelines RecordType,");
ex.ru = swap(ex.ru, "проект задаёт это поле в `fields`", "проект объявляет это поле в `fields`");
compose.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by agree-validate.mjs; \"is new to that kind, that file or that link\" kept, since the reader's alternative was a negation, which the owner asked to avoid, and \"a file of a part of the specification\" kept, since \"Where the files are\" uses that name";
fs.writeFileSync(new URL("english-schema.md", here), [
  "# \"How the schema of the specification is composed\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", c.title, "", "## Text", "", c.text, "", "## Reason", "", c.reason, "", "## Example", "", ex.en, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  [`The next node is "The schema and a project's extension" (s-xzcw3hv4hmxz7h7). On the advice of specsheriff-rule-reviewer, the agent has split it into two drafts, and the reviewer's second review found both ready to be shown to the owner once the fixes it asked for were made. The owner asked for the conditions on an extension of the schema in the first draft to be stated positively («новое уникальное имя»), and fix-schema-d.mjs rewrote them and two sentences of the node's reason. On 2026-11-21 the owner agreed to that first node, "How the schema of the specification is composed", together with the example that the reviewer proposed. The second node, "Validation against the schema before a command works on the files", has now been shown to the owner, and the owner's answer is to be acted on first.`,
    `The fourth node under review, "The schema and a project's extension" (s-xzcw3hv4hmxz7h7), was split in two on the advice of specsheriff-rule-reviewer. On 2026-11-21 the owner agreed to both of the resulting nodes: "How the schema of the specification is composed", together with the example that the reviewer proposed, and "Validation against the schema before a command works on the files". The next node is "A removed node and the archive" (s-j4webte36gkraju), and specsheriff-rule-reviewer reviews its rewritten draft before the node is shown to the owner.`],
  ["which is inexact, since the validation leaves out", "which is inexact, since the validation leaves out"],
  ["validates each file in the form in which it is about to write it, which is inexact,", "validates each file in the form in which the command is about to write it, which is inexact,"],
  ["- fix-schema-d.mjs carried out the owner's remark on negation in the first node,", "- fix-schema-d.mjs acted on the owner's remark on negation in the first node,"],
  ["  - it carried out the same remark in the second node: \"the sid that it gives a node\" replaces \"a sid that a node lacks\", the commands' refusal ends with",
    "  - it acted on the same remark in the second node: \"the sid that it gives a node\" replaces \"a sid that a node lacks\", the sentence on what the commands do when they refuse ends with"],
  ["  - it renamed the second node \"Validation against the schema before a command works on the files\",", "  - it renamed the second node to \"Validation against the schema before a command works on the files\","],
  ["tools-drafts.before-agree-schema.json keeps the drafts as they were before agree-schema.mjs ran. https://claude.ai/artifact/M9yq5v8anHRfkCqg4g2xub shows the first node.",
    `tools-drafts.before-agree-schema.json keeps the drafts as they were before agree-schema.mjs ran. The page at https://claude.ai/artifact/M9yq5v8anHRfkCqg4g2xub shows the first node.
- On 2026-11-21 the owner agreed to the second node too («ок»), with the second paragraph of its reason kept. agree-validate.mjs then did the following:
  - it marked the draft as agreed, recorded the agreement in it, and wrote english-validate.md, the English text of the agreed node, for EngStickler's reader;
  - it corrected the English of the first node as EngStickler's reader proposed, without a change of meaning, and kept "is new to that kind, that file or that link", since the reader's alternative was a negation.
  tools-drafts.before-agree-validate.json keeps the drafts as they were before agree-validate.mjs ran. The page at https://claude.ai/artifact/YSg6dL4e94MAj7au1ZyHsS shows the second node.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "agree-schema.mjs records the owner's agreement to \"How the schema of the specification is composed\",", "agree-schema.mjs records the owner's agreement to the node \"How the schema of the specification is composed\",");
s = swap(s, "tools-drafts.before-agree-schema.json is tools-drafts.json as it was before agree-schema.mjs ran.",
  "tools-drafts.before-agree-schema.json is tools-drafts.json as it was before agree-schema.mjs ran. agree-validate.mjs records the owner's agreement to the node \"Validation against the schema before a command works on the files\", writes english-validate.md, its English text, for EngStickler's reader, and corrects the English of the first node; tools-drafts.before-agree-validate.json is tools-drafts.json as it was before agree-validate.mjs ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:",
  "\n\n### ✓ «Проверка по схеме, прежде чем команда работает с файлами» — согласован\n- проверяются только файлы, которые хранит репозиторий; при отказе команда останавливается\n\n## ● В работе:");
o = swap(o, "- ● «Проверка по схеме, прежде чем команда работает с файлами»: показан вам",
  "- ✓ «Проверка по схеме, прежде чем команда работает с файлами» — согласован\n- ● «Удалённый узел и архив»: черновик пишется и пойдёт рецензенту");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ «Проверка по схеме, прежде чем команда работает с файлами» — новый узел\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
fs.writeFileSync(outline, o);
console.log(c.text);
console.log(`\nupdated at ${now}`);
