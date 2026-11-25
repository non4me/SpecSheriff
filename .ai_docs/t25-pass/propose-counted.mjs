// Drafts the new wording of "Sids, locations, terms and names of RecordTypes, counted" (s-vke5hakwf3uyrjs), which
// implements rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1. An archived node holds no sid, the main table no longer checks
// that no two nodes share a location (the owner, 2026-11-12), and the uniqueness of RecordType names is now row 12.12.1
// of the RecordType extension. Applies EngStickler's sixty-second batch of corrections to the continuation file.
// Every file is written only after every change has been prepared.
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
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const parts = [
  P("`sheriff validate` counts the sids, the terms and the names of RecordTypes that the nodes of the specification hold, the nodes in the cells of a `TableRule` included (§s-5fewsp22mmdz7y6). It refuses each of the following, naming every node that holds it:",
    "`sheriff validate` пересчитывает sid, термины и имена RecordType, которые есть у узлов спецификации, в том числе у узлов в ячейках `TableRule` (§s-5fewsp22mmdz7y6). Он отвергает каждое из следующего, называя каждый узел, у которого это есть:",
    "Было: «`sheriff validate` собирает каждый sid, расположение, термин и имя RecordType и пересчитывает каждое». Теперь сказано, что пересчитываются только узлы спецификации, в том числе узлы в ячейках, и что отвергается."),
  L("a sid that more than one node holds (§s-vsu97qk96ugyh2t);", "sid, который есть больше чем у одного узла (§s-vsu97qk96ugyh2t);", "Строка 10.1.3. Узел архива больше не хранит sid, поэтому архив не пересчитывается."),
  L("a term that more than one term node names, letter case aside (§s-bfzm4w6xveq8fbx);", "термин, который называет больше чем один узел-термин, без учёта регистра букв (§s-bfzm4w6xveq8fbx);", "Строка 10.1.7; как было."),
  L("where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), a name that more than one RecordType has, letter case aside (§s-jh85u42agh5k73x).",
    "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — имя, которое есть больше чем у одного RecordType, без учёта регистра букв (§s-jh85u42agh5k73x).",
    "Строка 12.12.1 таблицы проверок расширения RecordType; как было."),
  P("`sheriff validate` also refuses each term node of the specification that is outside the contracts section (§s-7kc8dw7zdz63q53).",
    "`sheriff validate` также отвергает каждый узел-термин спецификации, который находится вне раздела контрактов (§s-7kc8dw7zdz63q53).",
    "Строка 10.1.6. Было: «для каждого узла-термина ищется часть, в которой он стоит»; теперь сказано, что проверяется.")
];
drafts["s-vke5hakwf3uyrjs"] = {
  agreed: false,
  location: "tools 7.1.3",
  sidValue: "s-vke5hakwf3uyrjs",
  testsFrom: ["s-vke5hakwf3uyrjs"],
  proposal: {
    title: "Sids, terms and names of RecordTypes, counted",
    ruTitle: "Пересчёт sid, терминов и имён RecordType",
    parts,
    text: render(parts, "en"),
    ruText: render(parts, "ru"),
    reason: "A sid, a term and the name of a RecordType each stand for one node, so a second node that holds the same one makes every citation of it ambiguous. Letter case is set aside for a term and a name, since a reader takes two words that differ only in case for one word.",
    ruReason: "Sid, термин и имя RecordType обозначают каждый один узел, поэтому второй узел с тем же значением делает неоднозначной каждую ссылку на него. Для термина и имени регистр букв не учитывается, потому что читатель принимает два слова, различающиеся только регистром, за одно.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    refs: [{ type: "implements", to: "s-vsu97qk96ugyh2t" }, { type: "implements", to: "s-7kc8dw7zdz63q53" }, { type: "implements", to: "s-bfzm4w6xveq8fbx" }, { type: "implements", to: "s-jh85u42agh5k73x" }, { type: "cites", to: "s-5fewsp22mmdz7y6" }, { type: "cites", to: "s-hzuzn8hbq6q9q4s" }],
    removed: [
      "Counting locations: no row asks for it any longer. Row 10.1.5 (s-tvxhtjbj7mmpmnx) checks each node's location, which makes the check that no two nodes share a location redundant (the owner, 2026-11-12).",
      "Counting the sids of the archive: an archived node holds no sid (s-f2b5zvc565s242f).",
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements its rows, as the agreed drafts of this stage do."
    ],
    date: "2026-11-22"
  },
  doubt: "The owner's procedural decision of 2026-11-12 on row 10.1.6 says that the Domains extension lets a term that one domain needs be defined in that domain, yet no rule of the staged Domains extension says so; the draft follows row 10.1.6 as written.",
  stage3: "The code (skills/tools/src/validate.ts:79-85) still counts the sids of the archive and the locations, and is to stop doing both; it is also to count the nodes in the cells of a TableRule."
};

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["specsheriff-rule-reviewer found the draft ready once its fixes were made, and fix-key-twice-b.mjs made them, with the reviewer's recommended answers to three doubts;",
    "specsheriff-rule-reviewer found the draft ready to be shown to the owner once the fixes it asked for were made, and fix-key-twice-b.mjs made them, taking the answers that the reviewer recommended to three open questions;"],
  ["Every such refusal adds a fixed note that `sheriff reindex` merges such values wherever it can keep all of them.", "The message of every such refusal ends with the same note: `sheriff reindex` merges such values whenever it can keep all of them."],
  ["It says that `sheriff validate` refuses a file whose text breaks the syntax of JSON,", "It says that `sheriff validate` refuses a file whose text is not valid JSON,"],
  ["In stage 3, the code's list of schema files (schema.ts:14) also needs archive-file.schema.json and extensions/, and its message, which says \"twice\" whatever the count, is to be corrected.",
    "In stage 3, the code's list of schema files (schema.ts:14) must also include archive-file.schema.json and extensions/, and the code's message, which says \"twice\" however many times the key is written, is to be corrected."],
  ["- The next node to review is \"Sids, locations, terms and names of RecordTypes, counted\" (s-vke5hakwf3uyrjs), which implements rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1. The agent reads it, its rows and its code, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.",
    "- The next node to review is \"Sids, locations, terms and names of RecordTypes, counted\" (s-vke5hakwf3uyrjs), which implements rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1. propose-counted.mjs drafted its new wording, titled \"Sids, terms and names of RecordTypes, counted\": it counts only the nodes of the specification, the nodes in the cells of a `TableRule` included, and no longer counts locations, since row 10.1.5 makes that redundant (the owner, 2026-11-12). It names what is refused, and counts the names of RecordTypes only where the project has chosen the RecordType extension. One doubt goes with the draft: the owner's procedural decision of 2026-11-12 on row 10.1.6 says that the Domains extension lets a term be defined in the one domain that needs it, yet no rule of the staged Domains extension says so. In stage 3 the code is to stop counting the sids of the archive and the locations, and to count the nodes in cells. tools-drafts.before-counted.json is a copy of the drafts made before that script ran. The draft has been passed to specsheriff-rule-reviewer for review; once the reviewer reports, the node is to be shown to the owner."]
]) t = swap(t, from, to);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-key-twice-b.mjs applies specsheriff-rule-reviewer's findings to that draft", "fix-key-twice-b.mjs applies specsheriff-rule-reviewer's findings to the draft of \"A key written twice in one object\"");
s = swap(s, "(tools-drafts.before-agree-key-twice.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-key-twice.json is a copy of tools-drafts.json made before that script ran). propose-counted.mjs drafts the new wording of \"Sids, locations, terms and names of RecordTypes, counted\" (tools-drafts.before-counted.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "(строки 10.1.3, 10.1.6, 10.1.7, 12.12.1): агент читает узел", "(строки 10.1.3, 10.1.6, 10.1.7, 12.12.1): черновик у рецензента");

fs.writeFileSync(new URL("tools-drafts.before-counted.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(drafts["s-vke5hakwf3uyrjs"].proposal.text + `\n\nupdated at ${now}`);
