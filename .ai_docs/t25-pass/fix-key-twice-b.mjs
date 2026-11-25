// Applies the findings of specsheriff-rule-reviewer's report on "A key written more than once in one object"
// (s-7zqsstgnuc772ba), with the reviewer's recommended answers to its three doubts: the node covers the files of the
// schema that the repository keeps, as row 10.1.1 does; every refusal adds a fixed note on `sheriff reindex`; and
// `sheriff validate` stops after such a refusal, as the code does. As a technical replacement, the agreed node
// "Validation against the schema before a command works on the files" says "more than once" where it said "twice".
// Applies EngStickler's sixty-first batch of corrections. Every file is written only after every change is prepared.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const render = (parts, key) => parts.map((x) => x[key]).join("\n\n");

const node = drafts["s-7zqsstgnuc772ba"];
const p = node.proposal;
p.parts = [
  P("`sheriff validate` refuses each key written more than once in one object, naming the file, the key and the line number of each of its values. Each such refusal adds that `sheriff reindex` merges such values wherever it can keep all of them (§s-w5wg69pvvhedsws).",
    "`sheriff validate` отвергает каждый ключ, записанный больше одного раза в одном объекте, называя файл, ключ и номер строки каждого его значения. Каждый такой отказ добавляет, что `sheriff reindex` объединяет такие значения везде, где может сохранить их все (§s-w5wg69pvvhedsws).",
    "Было: «`sheriff validate` читает каждый файл, который проверяет, как текст и считает ключи каждого объекта». Теперь узел начинается с того, что отвергается и что называет отказ: так делает код, и это проверяют тесты. Подсказка о `sheriff reindex` — новое: согласованный узел о слиянии объединяет такие ключи."),
  P("`sheriff validate` finds a key written more than once by reading as text each file of the specification, of its archive (§s-f2b5zvc565s242f) and of its schema (§s-eferktypcj7njt5) that the repository keeps, the project's extension of the schema included (§s-xm8rz4uupb73gu5). It refuses each of these files whose text breaks the syntax of JSON, naming the file and the line at which reading failed.",
    "`sheriff validate` находит ключ, записанный больше одного раза, читая как текст каждый файл спецификации, её архива (§s-f2b5zvc565s242f) и её схемы (§s-eferktypcj7njt5), который хранит репозиторий, в том числе расширение схемы проекта (§s-xm8rz4uupb73gu5). Каждый из этих файлов, текст которого нарушает синтаксис JSON, он отвергает, называя файл и строку, на которой чтение не удалось.",
    "Файлы названы так, как в строке 10.1.1, и как их читает код. Отказ файлу, который не JSON, — новое в тексте: так делает код, и это проверяет тест."),
  P("Where `sheriff validate` refuses a key or a file, it stops before any check that reads the nodes.",
    "Если `sheriff validate` отверг ключ или файл, он останавливается до любой проверки, которая читает узлы.",
    "Новое в тексте: так делает код.")
];
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.refs = [{ type: "implements", to: "s-d5cgda5bdsn7bzy" }, { type: "implements", to: "s-eferktypcj7njt5" }, { type: "cites", to: "s-w5wg69pvvhedsws" }, { type: "cites", to: "s-f2b5zvc565s242f" }, { type: "cites", to: "s-xm8rz4uupb73gu5" }];
p.removed = ["The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.1 (s-d5cgda5bdsn7bzy), as the agreed drafts of this stage implement their rows. The link to s-eferktypcj7njt5 was `cites` and is now `implements`."];
node.review = "specsheriff-rule-reviewer, 2026-11-22: passes after its fixes; fix-key-twice-b.mjs made them, with the reviewer's recommended answers to its three doubts";
node.stage3 = "The code's list of schema files (skills/tools/src/schema.ts:14) also needs archive-file.schema.json and extensions/; its message says \"twice\" whatever the count; it also names the object's JSON pointer, which the node does not ask for.";

// A technical replacement in the agreed node on validation against the schema.
const v = drafts["new:tools-7-1-validate"].proposal;
v.parts[4].en = swap(v.parts[4].en, "merges each key written twice", "merges each key written more than once");
v.parts[4].ru = swap(v.parts[4].ru, "объединяет каждый ключ, записанный дважды,", "объединяет каждый ключ, записанный больше одного раза,");
v.text = swap(v.text, "merges each key written twice", "merges each key written more than once");
v.ruText = swap(v.ruText, "объединяет каждый ключ, записанный дважды,", "объединяет каждый ключ, записанный больше одного раза,");
v.reason = swap(v.reason, "A key written twice is merged first", "A key written more than once is merged first");
drafts["new:tools-7-1-validate"].technical = [...(drafts["new:tools-7-1-validate"].technical ?? []), "2026-11-22: \"written twice\" became \"written more than once\", as in the agreed node on merging such keys (fix-key-twice-b.mjs)."];

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const start = t.indexOf("- The next node to review is \"A key written twice in one object\" (s-7zqsstgnuc772ba)");
const end = t.indexOf("\n", start);
if (start < 0) throw new Error("continuation: the bullet on row 10.1.1 not found");
t = t.slice(0, start) + `- The next node to review is "A key written twice in one object" (s-7zqsstgnuc772ba), which implements row 10.1.1 (s-d5cgda5bdsn7bzy). propose-key-twice.mjs drafted its new wording, with the title "A key written more than once in one object"; tools-drafts.before-key-twice.json is a copy of the drafts made before that script ran. specsheriff-rule-reviewer found the draft ready once its fixes were made, and fix-key-twice-b.mjs made them, with the reviewer's recommended answers to three doubts; tools-drafts.before-key-twice-b.json is a copy of the drafts made before that script ran. The node now opens with what \`sheriff validate\` refuses and what the refusal names. Every such refusal adds a fixed note that \`sheriff reindex\` merges such values wherever it can keep all of them. The node covers each file of the specification, of its archive and of its schema that the repository keeps, as row 10.1.1 does. It says that \`sheriff validate\` refuses a file whose text breaks the syntax of JSON, and that it stops before any check that reads the nodes; the code already does both. The node implements row 10.1.1 instead of the whole main table of checks, as the agreed drafts of this stage implement their rows. As a technical replacement, the agreed node "Validation against the schema before a command works on the files" now says "more than once" where it said "twice". In stage 3, the code's list of schema files (schema.ts:14) also needs archive-file.schema.json and extensions/, and its message, which says "twice" whatever the count, is to be corrected. The node will be shown to the owner now, and whatever the owner answers is to be acted on before the review continues.` + t.slice(end);
t = swap(t, "and \"Checks made by the other commands\" names `sheriff commit-message` in place of `sheriff message`, as a technical replacement.",
  "and \"Checks made by the other commands\" is to name `sheriff commit-message` instead of `sheriff message`, as a technical replacement.");

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-key-twice.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-key-twice.json is a copy of tools-drafts.json made before that script ran). fix-key-twice-b.mjs applies specsheriff-rule-reviewer's findings to that draft (tools-drafts.before-key-twice-b.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1): черновик у рецензента",
  "- ● «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1): показан вам");
o = swap(o, "\n\n## ○ Затем:", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Согласие с узлом о строке 10.1.1\n- что отвергает sheriff validate, какие файлы читает, подсказка о sheriff reindex\n\n## ○ Затем:");

fs.writeFileSync(new URL("tools-drafts.before-key-twice-b.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(p.ruText + `\n\nupdated at ${now}`);
