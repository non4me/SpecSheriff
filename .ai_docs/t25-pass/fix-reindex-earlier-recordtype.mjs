// Carries out the owner's ruling of 2026-11-21 («ок») on the four cases of an earlier RecordType that have no
// counterpart in JSON Schema: a field required "where it holds a value" becomes an optional property, and a RecordType
// that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own
// list of values is empty is left in its earlier form and named. Applies the corrections that EngStickler's reader found
// in the English of the agreed node "What `sheriff reindex` writes", and EngStickler's forty-sixth batch of corrections
// to the continuation file. Updates INDEX.md and the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-reindex-earlier-recordtype.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const partOf = (p, start) => {
  const x = p.parts.find((y) => y.en.startsWith(start));
  if (!x) throw new Error(`no part starts with: ${start}`);
  return x;
};

// The node on what an earlier release wrote.
const earlier = drafts["new:tools-2-reindex-earlier"];
const e = earlier.proposal;
Object.assign(partOf(e, "a RecordType's `fields` and `unknown` become its `schema`"), {
  en: "a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows: each field becomes a property whose schema is the one that the field's neutral type gives (§s-4npdup7mjkva69y); the field's `text` becomes the property's `description`; each field that the RecordType marks as required is named in the schema's `required`; a field required \"where it holds a value\" becomes an optional property; and `unknown: \"refused\"` becomes `additionalProperties: false`;",
  ru: "`fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu) так: каждое поле становится свойством со схемой, которую даёт нейтральный тип поля (§s-4npdup7mjkva69y); `text` поля становится `description` свойства; каждое поле, которое RecordType отмечает обязательным, называется в `required` схемы; поле, обязательное «где в нём есть значение», становится необязательным свойством; а `unknown: \"refused\"` становится `additionalProperties: false`;",
  change: "Новое: по вашему решению от 19 ноября RecordType описывается JSON Schema 2020-12. Соответствие взято из узлов о нейтральных типах (tools 20) и о том, что порождает RecordType (tools 18). По вашему решению от 21 ноября поле, обязательное «где в нём есть значение», становится необязательным свойством: JSON Schema проверяет значение такого свойства, если оно есть."
});
const sourceItem = partOf(e, "the source of a field's values becomes");
e.parts.splice(e.parts.indexOf(sourceItem) + 1, 0);
const extIdx = e.parts.indexOf(partOf(e, "Where a node of the specification is of a kind"));
e.parts.splice(extIdx, 0, {
  kind: "p",
  en: "`sheriff reindex` leaves in its earlier form a RecordType that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.",
  ru: "RecordType, в котором есть поле типа `variant`, поле, значения которого брались из источника `domains`, или поле с пустым собственным списком значений, `sheriff reindex` оставляет в прежнем виде и называет этот RecordType и каждое такое поле.",
  change: "Новое, по вашему решению от 21 ноября: у этих трёх случаев нет точного соответствия в JSON Schema, и угаданный перенос мог бы незаметно изменить смысл, поэтому такой RecordType переписывает его автор."
});
e.text = render(e.parts, "en");
e.ruText = render(e.parts, "ru");
earlier.rulings = [{
  date: "2026-11-21",
  problem: "Four cases of an earlier RecordType have no exact counterpart in JSON Schema: a field required \"where it holds a value\", a field of the type `variant`, a field whose values came from the source `domains`, which the owner removed, and a field whose own list of values is empty, which an earlier release read as that source.",
  ruling: "The owner agreed («ок») to the agent's proposal: a field required \"where it holds a value\" becomes an optional property, since JSON Schema checks the value of an optional property where it is present. `sheriff reindex` leaves a RecordType that holds any of the other three in its earlier form and names it and each such field, for its author to rewrite, since a guessed mapping could change the meaning unnoticed.",
  type: "textual"
}];
delete earlier.doubt;

// The English of the agreed node "What `sheriff reindex` writes", as EngStickler's reader read it.
const writes = drafts["new:tools-2-reindex-writes"];
const w = writes.proposal;
const fix = (start, en, ru) => { const x = partOf(w, start); x.en = en; if (ru) x.ru = ru; };
fix("the lists `meta.code` and `meta.tests`", "the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;",
  "списки `meta.code` и `meta.tests` каждого узла, построенные по SpecTag, которые связывают с узлом код и тесты (§s-rwqzepmrt77rv35): `meta.code` называет каждый файл кода, в котором есть символ, связанный таким SpecTag, а `meta.tests` — каждый такой тест по его файлу и имени;");
fix("the approval status of each section", "the approval status of each section (§s-9kfdycuq34beqvs) and of each domain's header (§s-yggv9myedprnaa7), each derived from the nodes under that section or header;",
  "статус одобрения каждого раздела (§s-9kfdycuq34beqvs) и каждого заголовка домена (§s-yggv9myedprnaa7), выведенный из узлов под этим разделом или заголовком;");
fix("where the project has chosen the RecordType extension", "where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).");
fix("In the files that the repository keeps", "In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.",
  "В файлах, которые хранит репозиторий, одобренный узел, статус одобрения которого задаётся одобрениями, остаётся одобренным, пока в силе одобрение его нынешней формулировки (§s-v4qus7raqnwzneb). Каждый остальной такой узел `sheriff reindex` делает черновиком и называет.");
fix("`sheriff reindex` writes only the files", "`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.",
  "`sheriff reindex` пишет только файлы, которые хранит репозиторий. Файл он пишет, только когда текст, который он записал бы, отличается от текста файла. Он называет каждый файл, который пишет.");
fix("It writes each file as", "`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order that the file already has them.",
  "`sheriff reindex` пишет каждый файл так, как `JSON.stringify` пишет данные файла с отступом в два пробела, с переводом строки в конце, ставя `location` и `sid` каждого узла первыми, а все остальные ключи — в том порядке, в каком они уже стоят в файле.");
w.text = render(w.parts, "en");
w.ruText = render(w.parts, "ru");
w.reason = "What the SpecSheriff tools can compute from the specification, the code and the tests, the tools write themselves, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).";
writes.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-reindex-earlier-recordtype.mjs; \"names\" and \"the files that the repository keeps\" kept, since the appendix of the tools and the agreed nodes use them throughout";
fs.writeFileSync(new URL("english-reindex-writes.md", here), [
  "# \"What `sheriff reindex` writes\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", w.title, "", "## Text", "", w.text, "", "## Reason", "", w.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["On the same day the owner agreed to the next node, \"What `sheriff reindex` writes\" («ок»). agree-reindex-writes.mjs marked its draft as agreed",
    "On the same day the owner agreed to the wording of the next node, \"What `sheriff reindex` writes\" («ок»). agree-reindex-writes.mjs marked the draft of that node as agreed"],
  ["It also corrected the English of the node that lists the commands as EngStickler's reader proposed, without a change of meaning.", "It also corrected the English of the node that lists the commands in the way that EngStickler's reader proposed, without changing its meaning."],
  ["The page at https://claude.ai/artifact/M37puc7Bx97q32pNm1onK6 shows the node. The next node, \"What `sheriff reindex` changes in what an earlier release wrote\", has now been shown to the owner together with the question of the four cases of an earlier RecordType, and the owner's answer is to be acted on first.",
    "The page at https://claude.ai/artifact/M37puc7Bx97q32pNm1onK6 shows the node \"What `sheriff reindex` writes\".\n- The next node, \"What `sheriff reindex` changes in what an earlier release wrote\", was shown to the owner, and the question about the four cases of a RecordType as an earlier release wrote it was put to the owner with it. On 2026-11-21 the owner agreed («ок») to the agent's proposal: a field required \"where it holds a value\" becomes an optional property, and `sheriff reindex` leaves a RecordType that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own list of values is empty in its earlier form, and names it and each such field for its author to rewrite. fix-reindex-earlier-recordtype.mjs wrote that into the draft and recorded the ruling in it. It also corrected the English of the agreed node \"What `sheriff reindex` writes\" as EngStickler's reader proposed, without changing its meaning. tools-drafts.before-reindex-earlier-recordtype.json keeps the drafts as they were before that script ran. The revised node has now been shown to the owner, and the owner's answer is to be acted on first."]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and agree-reindex-writes-b.mjs finishes the part of that script that stopped on a sentence of this index.",
  "and agree-reindex-writes-b.mjs finishes the part of that script that stopped on a sentence of this index. fix-reindex-earlier-recordtype.mjs writes the owner's ruling on the four cases of an earlier RecordType into the node on what an earlier release wrote, and corrects the English of \"What `sheriff reindex` writes\"; tools-drafts.before-reindex-earlier-recordtype.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ Четыре случая прежних RecordType без соответствия в JSON Schema\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Четыре случая прежних RecordType — решено\n- «обязательно, где есть значение» — необязательное свойство\n- variant, источник domains и пустой список — reindex называет, автор переписывает\n\n## ● В работе:");
o = swap(o, "- ● «Что sheriff reindex меняет в записанном прежним выпуском»: показан вам с вопросом о четырёх случаях RecordType",
  "- ● «Что sheriff reindex меняет в записанном прежним выпуском»: с вашим решением о RecordType показан вам снова");
fs.writeFileSync(outline, o);
console.log(e.text + `\n\nupdated at ${now}`);
