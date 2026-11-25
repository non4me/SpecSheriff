// Drafts the new wording of "A key written twice in one object" (s-7zqsstgnuc772ba), which implements row 10.1.1
// (s-d5cgda5bdsn7bzy). The row now names the files of the specification, of its archive and of its schema, and the
// agreed node "Keys written more than once" (s-w5wg69pvvhedsws) has `sheriff reindex` merge such keys where it can.
// The node implements the row, as the agreed drafts of this stage do. Applies EngStickler's sixtieth batch of
// corrections to the continuation file. Every file is written only after every change has been prepared.
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
const render = (parts, key) => parts.map((x) => x[key]).join("\n\n");
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const parts = [
  P("`sheriff validate` reads as text each file of the specification, of its archive and of the project's extension of the schema (§s-xm8rz4uupb73gu5), and finds each object that holds one key more than once. It refuses each such key, naming the file, the key and the line of each value.",
    "`sheriff validate` читает как текст каждый файл спецификации, её архива и расширения схемы проекта (§s-xm8rz4uupb73gu5) и находит каждый объект, в котором один ключ записан больше одного раза. Каждый такой ключ он отвергает, называя файл, ключ и строку каждого значения.",
    "Было: «`sheriff validate` читает каждый файл, который проверяет, как текст и считает ключи каждого объекта». Теперь названы файлы, как в строке 10.1.1, и сказано, что делает проверка с найденным ключом: так делает код, и это проверяют тесты."),
  P("The refusal says that `sheriff reindex` merges the values of such a key where both can be kept (§s-w5wg69pvvhedsws).",
    "Отказ говорит, что `sheriff reindex` объединяет значения такого ключа там, где можно сохранить оба (§s-w5wg69pvvhedsws).",
    "Новое: согласованный узел «Keys written more than once» объединяет такие ключи; отказ подсказывает, как исправить файл."),
  P("`sheriff validate` also refuses a file whose text is not JSON, naming the file and the line at which reading it failed.",
    "`sheriff validate` также отвергает файл, текст которого не JSON, называя файл и строку, на которой чтение не удалось.",
    "Новое в тексте: так делает код, и это проверяет тест.")
];
drafts["s-7zqsstgnuc772ba"] = {
  agreed: false,
  location: "tools 7.1.1",
  sidValue: "s-7zqsstgnuc772ba",
  testsFrom: ["s-7zqsstgnuc772ba"],
  proposal: {
    title: "A key written more than once in one object",
    ruTitle: "Ключ, записанный больше одного раза в одном объекте",
    parts,
    text: render(parts, "en"),
    ruText: render(parts, "ru"),
    reason: "A JSON parser keeps one of the values written under a key and drops the others without a word, so only the file's text shows a key written more than once.",
    ruReason: "Парсер JSON оставляет одно из значений, записанных под ключом, и молча отбрасывает остальные, поэтому ключ, записанный больше одного раза, виден только в тексте файла.",
    reasonChange: "Как было; «twice» заменено на «more than once», как в согласованном узле о слиянии.",
    refs: [{ type: "implements", to: "s-d5cgda5bdsn7bzy" }, { type: "implements", to: "s-eferktypcj7njt5" }, { type: "cites", to: "s-xm8rz4uupb73gu5" }, { type: "cites", to: "s-w5wg69pvvhedsws" }],
    removed: ["The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.1 (s-d5cgda5bdsn7bzy), as the agreed drafts of this stage implement their rows."],
    date: "2026-11-22"
  }
};

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["agree-commands-section.mjs recorded in the section's draft that agreement and the order,", "agree-commands-section.mjs recorded that agreement and that order in the section's draft,"],
  ["and \"Checks made by the other commands\" takes the name `sheriff commit-message` by a technical replacement.", "and \"Checks made by the other commands\" names `sheriff commit-message` in place of `sheriff message`, as a technical replacement."],
  ["- The next node to review is \"A key written twice in one object\" (s-7zqsstgnuc772ba), which implements row 10.1.1. The agent reads it, the row and the code, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.",
    "- The next node to review is \"A key written twice in one object\" (s-7zqsstgnuc772ba), which implements row 10.1.1 (s-d5cgda5bdsn7bzy). propose-key-twice.mjs drafted its new wording, titled \"A key written more than once in one object\": it names the files that row 10.1.1 names, says what the check refuses and names, says that the refusal points to `sheriff reindex`, which merges such keys where it can, and states the refusal of a file that is not JSON, which the code and a test already make. The node implements row 10.1.1 instead of the whole main table of checks, as the agreed drafts of this stage implement their rows. tools-drafts.before-key-twice.json is a copy of the drafts made before that script ran. The draft has been passed to specsheriff-rule-reviewer; after its report, the node is shown to the owner."]
]) t = swap(t, from, to);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-checks-section.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-checks-section.json is a copy of tools-drafts.json made before that script ran). propose-key-twice.mjs drafts the new wording of \"A key written twice in one object\" (tools-drafts.before-key-twice.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Ключ, записанный дважды в одном объекте» (строка 10.1.1): агент читает узел и пишет черновик",
  "- ● «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1): черновик у рецензента");

fs.writeFileSync(new URL("tools-drafts.before-key-twice.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(drafts["s-7zqsstgnuc772ba"].proposal.text + `\n\nupdated at ${now}`);
