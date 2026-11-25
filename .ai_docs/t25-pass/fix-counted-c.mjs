// Applies the findings of specsheriff-rule-reviewer's second report on "Duplicate sids, terms and names of RecordTypes"
// (s-vke5hakwf3uyrjs) and "Term nodes outside the contracts section" (s-yauyedny2yzvs4c), with the reviewer's
// recommended answers to its two open questions: the words about cells apply only to sids, and the refusal of a term
// node names its file and location. Applies EngStickler's sixty-fourth batch of corrections to the continuation file.
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
const review2 = "specsheriff-rule-reviewer's second report, 2026-11-22: passes after its fixes; fix-counted-c.mjs made them, with the reviewer's recommended answer to its open question";

// Duplicate sids, terms and names of RecordTypes.
const a = drafts["s-vke5hakwf3uyrjs"];
const ap = a.proposal;
ap.title = "Duplicate sids, terms and names of RecordTypes";
ap.parts[0].en = "`sheriff validate` refuses each of the following, naming the file and the location (§s-kag2m9tzdnduxdx) of every node that holds it:";
ap.parts[0].ru = "`sheriff validate` отвергает каждое из перечисленного ниже и называет файл и расположение (§s-kag2m9tzdnduxdx) каждого узла, у которого оно есть:";
ap.parts[1].en = "a sid that more than one node of the specification holds, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6, §s-vsu97qk96ugyh2t);";
ap.parts[1].ru = "sid, который есть больше чем у одного узла спецификации, в том числе у узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6, §s-vsu97qk96ugyh2t);";
ap.parts[1].change += " Узлы в ячейках упомянуты только здесь: у узла в ячейке нет заголовка, а значит, нет ни термина, ни имени.";
ap.text = render(ap.parts, "en");
ap.ruText = render(ap.parts, "ru");
ap.reason = "Nodes that hold the same sid, term or name of a RecordType may be kept in different files, so only reading every node of the specification finds each repetition.";
ap.ruReason = "Узлы с одним и тем же sid, термином или именем RecordType могут храниться в разных файлах, поэтому каждый повтор находится, только если прочитать все узлы спецификации.";
ap.examples = [{
  en: "A cell of a `TableRule` holds a node whose sid was copied from a rule in another file. `sheriff validate` refuses that sid and names both nodes. The closest mistake is to compare only the nodes outside cells, which misses this repetition.",
  ru: "В ячейке `TableRule` лежит узел, sid которого скопирован из правила в другом файле. `sheriff validate` отвергает этот sid и называет оба узла. Ближайшая ошибка — сравнивать только узлы вне ячеек: тогда этот повтор пропускается."
}];
if (!ap.refs.some((r) => r.to === "s-kag2m9tzdnduxdx")) ap.refs.push({ type: "cites", to: "s-kag2m9tzdnduxdx" });
a.review = review2;

// Term nodes outside the contracts section.
const b = drafts["new:tools-7-1-term-contracts"];
const bp = b.proposal;
bp.parts[0].en = "`sheriff validate` refuses each term node (§s-ypa92gpcj3f5zj8) of the specification that is kept outside `specs/contracts/`, the folder of the contracts section (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53). The refusal names the node's file and location (§s-kag2m9tzdnduxdx).";
bp.parts[0].ru = "`sheriff validate` отвергает каждый узел-термин (§s-ypa92gpcj3f5zj8) спецификации, который хранится вне `specs/contracts/` — папки раздела контрактов (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53). Отказ называет файл и расположение этого узла (§s-kag2m9tzdnduxdx).";
bp.parts[0].change += " Что называет отказ — предложено рецензентом: так делает код.";
bp.text = bp.parts[0].en;
bp.ruText = bp.parts[0].ru;
bp.todos = [{ date: "2026-11-22", text: "The owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain (§s-7kc8dw7zdz63q53). Once the rules that place every term in the contracts section (§s-ypa92gpcj3f5zj8, §s-7kc8dw7zdz63q53) allow that, this check follows them." }];
for (const to of ["s-ypa92gpcj3f5zj8", "s-kag2m9tzdnduxdx"]) if (!bp.refs.some((r) => r.to === to)) bp.refs.push({ type: "cites", to });
b.review = review2;

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const start = t.indexOf("- The next node to be reviewed is \"Sids, locations, terms and names of RecordTypes, counted\" (s-vke5hakwf3uyrjs)");
const end = t.indexOf("\n", start);
if (start < 0) throw new Error("continuation: the bullet on the counting node not found");
t = t.slice(0, start) + `- The next node to be reviewed is "Sids, locations, terms and names of RecordTypes, counted" (s-vke5hakwf3uyrjs), which implements rows 10.1.3, 10.1.6 and 10.1.7 of the main table of checks and row 12.12.1 of the table of checks of the RecordType extension. propose-counted.mjs drafted its new wording; tools-drafts.before-counted.json is a copy of the drafts made before that script ran. specsheriff-rule-reviewer found that draft not ready, and fix-counted-b.mjs applied the findings of its report; tools-drafts.before-counted-b.json is a copy of the drafts made before that script ran. Its check of term nodes outside the contracts section moved to a new node, "Term nodes outside the contracts section" (s-yauyedny2yzvs4c). The reviewer's second report found both nodes ready to be shown to the owner once its fixes were made, and fix-counted-c.mjs made them; tools-drafts.before-counted-c.json is a copy of the drafts made before that script ran.
  - The first node is now titled "Duplicate sids, terms and names of RecordTypes". It opens with what \`sheriff validate\` refuses, and says that the refusal names the file and the location of every node that holds the same value, since two nodes that share a sid cannot be told apart by that sid. It covers only the nodes of the specification. Of the nodes in the cells of a \`TableRule\`, it covers only their sids, since a node in a cell has no title and so no term or name. It no longer checks locations for repetition: the owner ruled on 2026-11-12 that row 10.1.5 makes that check redundant. It has an example that the reviewer proposed. It is being shown to the owner now.
  - The second node requires \`sheriff validate\` to refuse each term node kept outside \`specs/contracts/\`, naming the node's file and location. It carries a todo: the owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain, yet rule 1.7.2 lets no extension contradict rules 3.2 and 10.1.6 of the SpecSheriff guidelines, so those two rules are to be reworded first, a question to put to the owner when they are next revised. It is to be shown to the owner after the first node.
  - Node 8.6 of the SpecSheriff guidelines allows a term in a cell, although a node in a cell has no title; that is to be corrected in node 8.6.
  - In stage 3 the code is to stop counting the sids in the archive, to stop checking locations for repetition, to count the sids of the nodes in the cells of a \`TableRule\`, and to name the location of each node; the tests of this check are to carry the SpecTag of s-vke5hakwf3uyrjs rather than that of the main table of checks.
  fix-counted-b.mjs also corrected the English of the agreed node "A key written more than once in one object" as EngStickler's reader proposed, without changing its meaning.` + t.slice(end);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-counted-b.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-counted-b.json is a copy of tools-drafts.json made before that script ran). fix-counted-c.mjs applies the findings of the reviewer's second report on both nodes (tools-drafts.before-counted-c.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Повторяющиеся sid, термины и имена RecordType» (строки 10.1.3, 10.1.7, 12.12.1) и «Узлы-термины вне раздела контрактов» (строка 10.1.6): у рецензента второй раз",
  "- ● «Повторяющиеся sid, термины и имена RecordType» (строки 10.1.3, 10.1.7, 12.12.1): показан вам\n- ○ «Узлы-термины вне раздела контрактов» (строка 10.1.6)");
o = swap(o, "\n\n## ○ Вопросы на потом", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Согласие с узлом о повторяющихся sid, терминах и именах\n- что отвергается и что называет отказ\n\n## ○ Вопросы на потом");

fs.writeFileSync(new URL("tools-drafts.before-counted-c.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(ap.ruText + "\nREASON: " + ap.ruReason + `\n\nupdated at ${now}`);
