// Nodes 12.4.1 and 12.4.2, after the reviewer's report on the proposal for 12.4.1. A domain's level and the diagram are
// applied separately: whoever writes a domain's header applies the level, and only whatever draws the diagram applies the
// layout. So the paragraph on the diagram leaves the proposal for 12.4.1 and becomes a new node 12.4.2, "The diagram of the
// domains", to be reviewed after 12.4.1. The proposal for 12.4.1 keeps the owner's definition of a level and gains the
// sentences that 1.40 had and the draft lost: the list of levels runs from the top of the hierarchy down, and a level's
// number is its place in that list. The section's purpose line names both the hierarchy and the diagram.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

// A new sid, checked against every file of the specification and the drafts.
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const root = path.resolve(new URL("../../specs", here).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const texts = [fs.readFileSync(file, "utf8")];
const walk = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(json|jsonl)$/.test(e.name)) texts.push(fs.readFileSync(p, "utf8"));
  }
};
walk(root);
let sid;
do {
  sid = "s-" + Array.from({ length: 15 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
} while (texts.some(t => t.includes(sid)));

const n = d["12.4.1"];
const p = n.proposals[0];
p.where = "заголовок, текст; абзац о схеме уходит в новый узел 12.4.2";
p.en = [
  "Title: A domain's level in the hierarchy",
  "",
  "Text: A domain's level is an optional property of the domain that shows its position in the hierarchy relative to the other domains. A domain's header may name one of the levels that the specification's owners list in the project's own guidelines (§s-u7tw6m8npxmv5tu). That list runs from the top of the hierarchy down. A level's number is its place in that list.",
  "",
  "By default, the levels are assigned from the general to the particular. The narrower a domain's responsibility, the lower its level.",
  "",
  "Reason: " + n.reason,
].join("\n");
p.ru = [
  "Заголовок: Уровень домена в иерархии",
  "",
  "Текст: Уровень — это опциональное свойство домена, показывающее, как в иерархии он расположен по отношению к другим доменам. Заголовок домена может называть один из уровней, которые ответственные за спецификацию перечисляют в собственных guidelines проекта (§s-u7tw6m8npxmv5tu). Этот список идёт от вершины иерархии вниз. Номер уровня — это его место в этом списке.",
  "",
  "По умолчанию уровни присваиваются от общего к частному. Чем меньше ответственность домена, тем ниже его уровень.",
  "",
  "Обоснование: " + n.ruReason,
].join("\n");
p.why = "По вашей просьбе от 14 ноября: узел согласуется заново под новое название раздела 12.4 «Домены: иерархия». Текст начинается с вашего определения уровня. Абзац о схеме вынесен в узел 12.4.2: уровень и схема применяются по отдельности.";

// 12.4.2: the paragraph on the diagram, as agreed on 2026-11-09, with the owner's sentence on visualization opening it.
d["12.4.2"] = {
  from: "1.40",
  sid: "new",
  title: "The diagram of the domains",
  text: "The domains' levels are needed for visualization: to draw a diagram that shows how the domains are connected. The smaller a level's number, the higher its domains appear on the diagram. Domains of the same level are placed in one row. The domains are arranged in a single sequence, each after every domain it uses (§s-yggv9myedprnaa7) and as close as possible before the domains that use it. Where this leaves a choice, they are ordered by name. The domains of each level keep this order in their row.",
  reason: "In complex systems it is important to see the architecture of the whole solution: how the domains are connected.",
  ruTitle: "Схема доменов",
  ruText: "Уровни доменов нужны для визуализации: чтобы можно было построить схему, на которой видно, как домены связаны между собой. Чем меньше номер уровня, тем выше на схеме расположен домен. Домены одного уровня выстраиваются в одну линию. Домены выстраиваются в один порядок: каждый стоит после всех доменов, которыми пользуется (§s-yggv9myedprnaa7), и как можно ближе перед доменами, которые пользуются им. Если остаётся выбор, они идут в порядке своих имён. Домены каждого уровня сохраняют этот порядок в своей линии.",
  ruReason: "В сложных системах важно видеть архитектуру всего решения: как домены связаны между собой.",
  changes: [
    "Новый узел: абзац о схеме из 12.4.1, согласованный 9 ноября, и ваша фраза о визуализации из того же узла. Рецензент нашёл, что уровень и схема применяются по отдельности.",
    "Ещё не прошёл рецензента: покажу после 12.4.1. Открытые вопросы рецензента: кто строит схему, где на ней домен без уровня, и порядок доменов — списком.",
  ],
  sidValue: sid,
};
const ordered = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "12.4.2") continue;
  ordered[k] = v;
  if (k === "12.4.1") ordered["12.4.2"] = d["12.4.2"];
}
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

// The page: the row of 12.4.2 and the section's purpose line.
const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const swap = (a, b) => {
  if (!page.includes(a)) throw new Error("not found: " + a);
  page = page.replace(a, b);
};
swap(`{ n: "12.4", en: "Domains: hierarchy", ru: "Домены: иерархия", purpose: "Как домены показываются на схеме.",`,
  `{ n: "12.4", en: "Domains: hierarchy", ru: "Домены: иерархия", purpose: "Место каждого домена в иерархии доменов и схема, которая эту иерархию показывает.",`);
swap(`["12.4.1","split",0,"1.40","Every domain stands at a level","Каждый домен стоит на своём уровне"]`,
  `["12.4.1","split",0,"1.40","Every domain stands at a level","Каждый домен стоит на своём уровне"],\n      ["12.4.2","new",0,"","The diagram of the domains","Схема доменов","","",[],""]`);
fs.writeFileSync(pageFile, page);
console.log("12.4.2 sid:", sid);
