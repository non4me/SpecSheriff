// Applies the findings of specsheriff-rule-reviewer's first report on "Sids, locations, terms and names of
// RecordTypes, counted" (s-vke5hakwf3uyrjs). The node becomes "Repeated sids, terms and names of RecordTypes"; its check
// of term nodes outside the contracts section becomes a node of its own (s-yauyedny2yzvs4c), as a node may be split
// within its section. Both go back to the reviewer. Corrects the English of the agreed node "A key written more than
// once in one object" as EngStickler's reader proposed, without changing its meaning, and applies EngStickler's
// sixty-third batch of corrections. Every file is written only after every change has been prepared.
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
const termSid = "s-yauyedny2yzvs4c";
const review1 = "specsheriff-rule-reviewer's first report, 2026-11-22: not ready; fix-counted-b.mjs applied its findings, and the node goes back for a second review";

// Repeated sids, terms and names of RecordTypes.
const counted = drafts["s-vke5hakwf3uyrjs"];
const cp = counted.proposal;
cp.title = "Repeated sids, terms and names of RecordTypes";
cp.ruTitle = "Повторяющиеся sid, термины и имена RecordType";
cp.parts = [
  P("`sheriff validate` refuses each of the following, naming the file and the location of every node that holds it, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6):",
    "`sheriff validate` отвергает каждое из перечисленного ниже и называет файл и расположение каждого узла, у которого оно есть, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6):",
    "Было: «`sheriff validate` собирает каждый sid, расположение, термин и имя RecordType и пересчитывает каждое». Теперь узел начинается с того, что отвергается. Узел назван файлом и расположением: два узла с одним sid по sid не различить."),
  L("a sid that more than one node of the specification holds (§s-vsu97qk96ugyh2t);", "sid, который есть больше чем у одного узла спецификации (§s-vsu97qk96ugyh2t);", "Строка 10.1.3. Узел архива больше не хранит sid, поэтому архив не пересчитывается."),
  L("a term (§s-ypa92gpcj3f5zj8) that more than one term node of the specification names, regardless of letter case (§s-bfzm4w6xveq8fbx);", "термин (§s-ypa92gpcj3f5zj8), который назван больше чем в одном узле-термине спецификации, без учёта регистра букв (§s-bfzm4w6xveq8fbx);", "Строка 10.1.7; как было."),
  L("where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), a name that more than one RecordType (§s-7vm323mhry2enx3) has, regardless of letter case (§s-jh85u42agh5k73x).",
    "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — имя, которое есть больше чем у одного RecordType (§s-7vm323mhry2enx3), без учёта регистра букв (§s-jh85u42agh5k73x).",
    "Строка 12.12.1 таблицы проверок расширения RecordType; как было.")
];
cp.text = render(cp.parts, "en");
cp.ruText = render(cp.parts, "ru");
cp.reason = "Nodes that hold the same sid, term or name of a RecordType may be kept in different files or in the cells of a `TableRule`, so only reading every node of the specification finds each repetition.";
cp.ruReason = "Узлы с одним и тем же sid, термином или именем RecordType могут храниться в разных файлах или в ячейках `TableRule`, поэтому каждый повтор находится, только если прочитать все узлы спецификации.";
cp.reasonChange = "Новое, предложено рецензентом: у прежнего узла не было обоснования.";
cp.examples = [{
  en: "A cell of a `TableRule` holds a node copied, with its sid, from a rule in another file. `sheriff validate` refuses that sid and names both nodes. The closest mistake is to compare only the nodes outside cells, which misses this repetition.",
  ru: "В ячейке `TableRule` лежит узел, скопированный вместе с sid из правила в другом файле. `sheriff validate` отвергает этот sid и называет оба узла. Ближайшая ошибка — сравнивать только узлы вне ячеек: тогда этот повтор не найден."
}];
cp.refs = [{ type: "implements", to: "s-vsu97qk96ugyh2t" }, { type: "implements", to: "s-bfzm4w6xveq8fbx" }, { type: "implements", to: "s-jh85u42agh5k73x" }, { type: "cites", to: "s-5fewsp22mmdz7y6" }, { type: "cites", to: "s-ypa92gpcj3f5zj8" }, { type: "cites", to: "s-hzuzn8hbq6q9q4s" }, { type: "cites", to: "s-7vm323mhry2enx3" }];
cp.removed = [...cp.removed, "The check of term nodes outside the contracts section: it moved to the new node \"Term nodes outside the contracts section\" (s-yauyedny2yzvs4c)."];
counted.review = review1;
delete counted.doubt;
counted.stage3 = "The code (skills/tools/src/validate.ts:77-85) still counts the sids of the archive and the locations, and is to stop doing both; it is to count the nodes in the cells of a TableRule, and to name the location of each node as well as its file. The tests of this check carry the SpecTag of s-jau82aq9juv9zzh and are to carry s-vke5hakwf3uyrjs.";

// Term nodes outside the contracts section.
const tparts = [P("`sheriff validate` refuses each term node of the specification that is kept outside `specs/contracts/`, the folder of the contracts section (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53).",
  "`sheriff validate` отвергает каждый узел-термин спецификации, который хранится вне `specs/contracts/` — папки раздела контрактов (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53).",
  "Из узла «Sids, locations, terms and names of RecordTypes, counted»: было «для каждого узла-термина ищется часть, в которой он стоит». Теперь сказано, что проверяется.")];
drafts["new:tools-7-1-term-contracts"] = {
  agreed: false,
  from: "s-vke5hakwf3uyrjs",
  location: "tools 7.1.3a (new)",
  sidValue: termSid,
  testsFrom: ["outside contracts"],
  proposal: {
    title: "Term nodes outside the contracts section",
    ruTitle: "Узлы-термины вне раздела контрактов",
    parts: tparts,
    text: tparts[0].en,
    ruText: tparts[0].ru,
    reason: "The contracts section is the only part of the specification kept in `specs/contracts/`, so the folder of a term node's file shows whether the node is in that section.",
    ruReason: "Раздел контрактов — единственная часть спецификации, которая хранится в `specs/contracts/`, поэтому папка файла узла-термина показывает, находится ли узел в этом разделе.",
    reasonChange: "Новое, предложено рецензентом.",
    refs: [{ type: "implements", to: "s-7kc8dw7zdz63q53" }, { type: "cites", to: "s-z6tq6a3btnvvwx7" }, { type: "cites", to: "s-zefk589ykh37b8u" }],
    todos: [{ date: "2026-11-22", text: "Once the owner settles how a domain defines a term that only it needs (the decision of 2026-11-12 on row 10.1.6), this check follows that ruling." }],
    date: "2026-11-22",
    removed: []
  },
  review: "Split out of the node on repeated sids, terms and names as specsheriff-rule-reviewer proposed, to be reviewed a second time"
};

// The English of the agreed node "A key written more than once in one object".
const kp = drafts["s-7zqsstgnuc772ba"].proposal;
kp.parts[0].en = swap(kp.parts[0].en, "Each such refusal adds that `sheriff reindex` merges such values wherever it can keep all of them", "Each such refusal also states that `sheriff reindex` merges such values whenever it can keep all of them");
kp.parts[1].en = swap(kp.parts[1].en, "whose text breaks the syntax of JSON, naming the file and the line at which reading failed.", "whose text is not valid JSON, naming the file and the line at which parsing failed.");
kp.parts[2].en = swap(kp.parts[2].en, "it stops before any check that reads the nodes.", "it stops before it runs any check that reads the nodes.");
kp.text = kp.parts.map((x) => x.en).join("\n\n");
kp.reason = swap(kp.reason, "drops the others without a word", "silently drops the others");
drafts["s-7zqsstgnuc772ba"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by fix-counted-b.mjs; the word order of \"reading as text each file ...\" kept, since the object is long";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["agree-key-twice.mjs marked its draft as agreed", "agree-key-twice.mjs marked the node's draft as agreed"],
  ["In stage 3, the code's list of schema files (schema.ts:14) must also include archive-file.schema.json and extensions/, and the code's message, which says \"twice\" however many times the key is written, is to be corrected.",
    "In stage 3, the list of schema files in the code (schema.ts:14) must also include archive-file.schema.json and extensions/, and the message that the code prints, which says \"twice\" however many times the key is written, must be corrected."]
]) t = swap(t, from, to);
const start = t.indexOf("- The next node to review is \"Sids, locations, terms and names of RecordTypes, counted\" (s-vke5hakwf3uyrjs)");
const end = t.indexOf("\n", start);
if (start < 0) throw new Error("continuation: the bullet on the counting node not found");
t = t.slice(0, start) + `- The next node to be reviewed is "Sids, locations, terms and names of RecordTypes, counted" (s-vke5hakwf3uyrjs), which implements rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1. propose-counted.mjs drafted its new wording; tools-drafts.before-counted.json is a copy of the drafts made before that script ran. specsheriff-rule-reviewer found the draft not ready, and fix-counted-b.mjs applied the findings of its report; tools-drafts.before-counted-b.json is a copy of the drafts made before that script ran. The node is now titled "Repeated sids, terms and names of RecordTypes". It opens with what \`sheriff validate\` refuses and names the file and the location of every node involved, since two nodes that share a sid cannot be told apart by that sid. It covers only the nodes of the specification, including those in the cells of a \`TableRule\`, no longer counts locations, since row 10.1.5 makes that count redundant (the owner, 2026-11-12), and has an example that the reviewer proposed. Its check of term nodes outside the contracts section moved to a new node, "Term nodes outside the contracts section" (s-yauyedny2yzvs4c), which refuses each term node kept outside \`specs/contracts/\`. That new node carries a todo: the owner's procedural decision of 2026-11-12 on row 10.1.6 says that a domain may define a term that only it needs, yet rule 1.7.2 lets no extension contradict rules 3.2 and 10.1.6, so the decision can be carried out only after those two rules are reworded, a question for the owner when the base is next revised. A node in a cell has no title, so no term node or RecordType can be in a cell; node 8.6 allows a term in a cell, and that is to be corrected there. In stage 3 the code is to stop counting the sids in the archive and the locations, to count the nodes in the cells of a \`TableRule\`, and to name the location of each node; the tests of this check are to carry the SpecTag of s-vke5hakwf3uyrjs rather than that of the main table. Both nodes have been passed to specsheriff-rule-reviewer for a second review; once the reviewer has reported, they will be shown to the owner one at a time. fix-counted-b.mjs also corrected the English of the agreed node "A key written more than once in one object" as EngStickler's reader proposed, without changing its meaning.` + t.slice(end);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-counted.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-counted.json is a copy of tools-drafts.json made before that script ran). fix-counted-b.mjs applies the findings of specsheriff-rule-reviewer's first report on that draft and adds the node \"Term nodes outside the contracts section\" (tools-drafts.before-counted-b.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Sid, расположения, термины и имена RecordType, пересчитанные» (строки 10.1.3, 10.1.6, 10.1.7, 12.12.1): черновик у рецензента",
  "- ● «Повторяющиеся sid, термины и имена RecordType» (строки 10.1.3, 10.1.7, 12.12.1) и «Узлы-термины вне раздела контрактов» (строка 10.1.6): у рецензента второй раз");
o = swap(o, "\n\n## ○ Затем:", "\n\n## ○ Вопросы на потом\n\n### ○ Термин, нужный одному домену\n- решение от 12 ноября противоречит правилам 3.2 и 10.1.6 при правиле 1.7.2\n- узел 8.6 допускает термин в ячейке, а у узла в ячейке нет заголовка\n\n## ○ Затем:");

fs.writeFileSync(new URL("tools-drafts.before-counted-b.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
