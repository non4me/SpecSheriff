// Node 12.4.1, agreed on 2026-11-09: a proposal to agree it again in light of the new title of section 12.4, "Domains:
// hierarchy" («Домены: иерархия»), as the owner asked on 2026-11-14 («и текст для 12.4.1 - тоже нужно будет
// пересогласовать»). The text now opens with what a level is, a domain's place in the hierarchy of the domains. The default
// order of the levels comes next, and the diagram the levels are used for comes last. The sentences on the diagram and the
// reason are kept word for word.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.1"];

const en = [
  "Title: A domain's level in the hierarchy",
  "",
  "Text: A domain's level is its place in the hierarchy of the domains. A level is optional. A domain's header may name one of the levels that the specification's owners list in the project's own guidelines (§s-u7tw6m8npxmv5tu).",
  "",
  "By default, the levels are assigned from the general to the particular. The narrower a domain's responsibility, the lower its level.",
  "",
  "The levels are used to draw a diagram that shows how the domains are connected. The smaller a level's number, the higher its domains appear on the diagram. Domains of the same level are placed in one row. The domains are arranged in a single sequence, each after every domain it uses (§s-yggv9myedprnaa7) and as close as possible before the domains that use it. Where this leaves a choice, they are ordered by name. The domains of each level keep this order in their row.",
  "",
  "Reason: " + n.reason,
].join("\n");
const ru = [
  "Заголовок: Уровень домена в иерархии",
  "",
  "Текст: Уровень домена — это его место в иерархии доменов. Уровень опционален. Заголовок домена может называть один из уровней, которые ответственные за спецификацию перечисляют в собственных guidelines проекта (§s-u7tw6m8npxmv5tu).",
  "",
  "По умолчанию уровни присваиваются от общего к частному. Чем меньше ответственность домена, тем ниже его уровень.",
  "",
  "Уровни нужны, чтобы построить схему, на которой видно, как домены связаны между собой. Чем меньше номер уровня, тем выше на схеме расположен домен. Домены одного уровня выстраиваются в одну линию. Домены выстраиваются в один порядок: каждый стоит после всех доменов, которыми пользуется (§s-yggv9myedprnaa7), и как можно ближе перед доменами, которые пользуются им. Если остаётся выбор, они идут в порядке своих имён. Домены каждого уровня сохраняют этот порядок в своей линии.",
  "",
  "Обоснование: " + n.ruReason,
].join("\n");
n.proposals = [
  {
    where: "заголовок, первый абзац текста, порядок абзацев",
    en,
    ru,
    why: "По вашей просьбе от 14 ноября: узел согласуется заново под новое название раздела 12.4 «Домены: иерархия». Текст начинается с того, что такое уровень: место домена в иерархии.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(en);
