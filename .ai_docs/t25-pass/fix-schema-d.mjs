// Carries out the owner's remark of 2026-11-21 on "How the schema of the specification is composed" («старайся не
// писать через отрицание -> новое уникальное имя»): the conditions on which the tools accept an extension of the schema,
// and the reason, are stated without negation. Applies an English correction to the node's example and EngStickler's
// twenty-seventh batch of corrections to the continuation file, and updates INDEX.md and the queue outline.
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
fs.writeFileSync(new URL("tools-drafts.before-schema-d.json", here), JSON.stringify(drafts, null, 2) + "\n");

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const node = drafts["s-xzcw3hv4hmxz7h7"];
const c = node.proposal;
const partOf = (start) => {
  const found = c.parts.find((x) => x.en.startsWith(start));
  if (!found) throw new Error(`no part starts with: ${start}`);
  return found;
};
Object.assign(partOf("each kind of node, type of link and definition that it adds"), {
  en: "each kind of node, type of link and definition that it adds has a new name, unique in the schema;",
  ru: "у каждого типа узла, типа связи и определения, которые оно добавляет, новое уникальное имя;",
  change: "Новое: так ни одно расширение не меняет определение, которое дали SpecSheriff guidelines или расширение, добавленное раньше (правило 5.2). По вашему замечанию — без отрицания: было «имя, которого схема ещё не определяет»."
});
Object.assign(partOf("each property that it adds"), {
  en: "each property that it adds to a kind of node, a file or a link is new to that kind, that file or that link;",
  ru: "каждое свойство, которое оно добавляет типу узла, файлу или связи, для них новое;",
  change: "Сейчас код проверяет только это. Новое: сказано, у какого объекта свойство должно быть новым. По вашему замечанию — без отрицания: было «у них ещё нет»."
});
c.text = render(c.parts, "en");
c.ruText = render(c.parts, "ru");
c.reason = swap(c.reason, "An extension adds no name that the schema already defines, so that it changes no definition of the SpecSheriff guidelines or of a chosen extension (§s-xm8rz4uupb73gu5).",
  "An extension adds only new names, so that every definition of the SpecSheriff guidelines and of a chosen extension stays as they give it (§s-xm8rz4uupb73gu5).");
c.reason = swap(c.reason, "No extension is added after a refused one, since it may rely on what the refused one would have added.",
  "The tools stop at a refused extension, since the extensions after it may rely on what it would have added.");
c.ruReason = swap(c.ruReason, "Расширение не добавляет имени, которое схема уже определяет, чтобы оно не меняло ни одного определения SpecSheriff guidelines или выбранного расширения (§s-xm8rz4uupb73gu5).",
  "Расширение добавляет только новые имена, чтобы каждое определение SpecSheriff guidelines и выбранного расширения оставалось таким, каким они его дали (§s-xm8rz4uupb73gu5).");
c.ruReason = swap(c.ruReason, "После отвергнутого расширения не добавляется ни одно, потому что оно может опираться на то, что добавило бы отвергнутое.",
  "Инструменты останавливаются на отвергнутом расширении, потому что следующие за ним могут опираться на то, что добавило бы оно.");
c.reasonChange = "Новое: прежнее обоснование говорило о командах и перешло в новый узел. Это обоснование объясняет порядок, требование нового имени, место расширения проекта и остановку после отказа. Второе и четвёртое предложения теперь без отрицания, по вашему замечанию.";
c.examples[0].en = swap(c.examples[0].en, "To give every RecordType a further field, the project sets that field", "To add a field to every RecordType, the project sets that field");
c.date = "2026-11-21";
node.ownerRemarks = [{ date: "2026-11-21", remark: "«имя, которого схема ещё не определяет - старайся не писать через отрицание -> новое уникальное имя»", done: "fix-schema-d.mjs stated the conditions on an extension of the schema and two sentences of the reason without negation" }];
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["The first draft, \"How the schema of the specification is composed\", has now been shown to the owner together with an example that the reviewer proposed. The owner's answer is to be acted on first, and the second draft is shown after it.",
    "The first of the two drafts, \"How the schema of the specification is composed\", was shown to the owner together with an example that the reviewer proposed. The owner asked for the conditions on an extension of the schema to be stated without negation («новое уникальное имя»). fix-schema-d.mjs rewrote them and two sentences of the reason, and the node has now been shown to the owner again. The owner's answer is to be acted on first, and the second draft is shown after it."],
  ["and both passed the reviewer's second review once propose-schema-c.mjs had applied its fixes.", "and both passed the reviewer's second review once propose-schema-c.mjs had applied the reviewer's fixes."],
  ["what `sheriff reindex` leaves out of the validation, and what the commands do on a refusal.", "what `sheriff reindex` leaves out of the validation, and what the commands do when they refuse an extension of the schema or a file."],
  ["  - A file of the archive is validated by neither node.", "  - Neither node validates a file of the archive."],
  ["since the archive may hold a node in a format that an earlier release wrote. The first draft had contradicted that ruling.", "since the archive may hold a node in a format that an earlier release used. The earliest draft had contradicted that ruling."],
  ["- The second review passed both drafts once propose-schema-c.mjs had applied its fixes:", "- The second review found both drafts ready once propose-schema-c.mjs had applied the reviewer's fixes:"],
  ["since `sheriff.config.json` may record each choice", "since `sheriff.config.json` can record each choice"],
  ["and the project gives every RecordType a further field through `fields`.", "and the project adds a field to every RecordType through `fields` instead."],
  ["  - The reviewer doubts the second paragraph of that node's reason,", "  - The reviewer questions the second paragraph of that node's reason,"],
  ["The schema that stage 1 wrote refers to the composed schema of a node, and so refuses a node in a format that an earlier release wrote.",
    "The schema that stage 1 wrote refers to the schema composed for a node, and so refuses a node in a format that an earlier release used."]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "tools-page-validate/ holds the page showing the draft of \"Validation against the schema before a command\".",
  "tools-page-validate/ holds the page showing the draft of \"Validation against the schema before a command\". fix-schema-d.mjs states without negation, as the owner asked, the conditions on which the tools accept an extension of the schema, and tools-drafts.before-schema-d.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Как составляется схема спецификации»: показан вам вместе с примером",
  "- ● «Как составляется схема спецификации»: условия на расширение — без отрицания, по вашему замечанию; показан вам снова");
o = swap(o, "- схемы выбранных расширений guidelines добавляются по порядку имён, расширение проекта — последним\n",
  "- схемы выбранных расширений guidelines добавляются по порядку имён, расширение проекта — последним\n- каждое добавленное имя — новое и уникальное\n");
fs.writeFileSync(outline, o);
console.log(c.text);
console.log("\n" + c.reason);
console.log(`\nupdated at ${now}`);
