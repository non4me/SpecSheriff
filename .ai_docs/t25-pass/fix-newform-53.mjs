// The owner's scheme of 2026-11-09, in the reviewed wording. Group A: the rules every project shares stop naming domains,
// which carries out the owner's ruling and keeps their agreement. Group B: 3.1 rewritten for sections, waiting for the
// owner. Group C: the part 13 becomes the extensions of the guidelines, with three new nodes heading it.
import fs from "node:fs";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const read = p => fs.readFileSync(new URL(p, here), "utf8");
const draftsPath = new URL("newform.json", here);
const pagePath = new URL("base-structure.html", here);
const d = JSON.parse(read("newform.json"));

const swap = (n, field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`not found in ${field}: ${from}`);
  n[field] = n[field].replace(from, to);
};
const note = "По вашему решению основные правила не называют домены: упоминание убрано, смысл правила тот же.";

const groupA = {
  "1.1.2": [["text", "as sections and domains.", "as sections."], ["ruText", "в виде разделов и доменов.", "в виде разделов."]],
  "1.1.5": [["text", "how each domain is built", "how each part of the system is built"], ["ruText", "как построен каждый домен", "как построена каждая часть системы"]],
  "1.1.6": [["reason", "Owners of domains and sections divide the reading", "Owners of sections divide the reading"], ["ruReason", "Ответственные за домены и разделы делят чтение", "Ответственные за разделы делят чтение"]],
  "1.3.1": [["text", "a section or a domain, and a rule each have one.", "a section and a rule each have one."], ["ruText", "у раздела или домена и у правила.", "у раздела и у правила."]],
  "1.3.2": [
    ["text", "The specification, a section, a domain or a rule that is not approved", "The specification, a section or a rule that is not approved"],
    ["ruText", "Спецификация, раздел, домен или правило, которые", "Спецификация, раздел или правило, которые"],
    ["text", "For a section or a domain, the status indicates", "For a section, the status indicates"],
    ["ruText", "Для раздела или домена статус является", "Для раздела статус является"],
    ["reason", "The status of a section or a domain shows", "The status of a section shows"],
    ["ruReason", "Статус раздела или домена сразу показывает", "Статус раздела сразу показывает"],
    ["reason", "A status of their own for sections, domains and nodes", "A status of their own for sections and nodes"],
    ["ruReason", "Самостоятельный статус у разделов и доменов и узлов", "Самостоятельный статус у разделов и узлов"],
  ],
  "1.3.3": [
    ["text", "The specification, a section, a domain and a rule have", "The specification, a section and a rule have"],
    ["ruText", "Спецификация, раздел, домен или правило имеют", "Спецификация, раздел или правило имеют"],
    ["text", "A section or a domain is approved while", "A section is approved while"],
    ["ruText", "Раздел или домен одобрен, пока", "Раздел одобрен, пока"],
    ["reason", "A section or a domain requires nothing of its own", "A section requires nothing of its own"],
    ["ruReason", "Раздел или домен сам ничего не требует", "Раздел сам ничего не требует"],
  ],
  "2.3": [["text", "such as the specification's owners or the list of levels its domains stand at.", "such as the specification's owners."], ["ruText", "например ответственные за спецификацию или список уровней, на которых стоят его домены.", "например ответственные за спецификацию."]],
  "3.2": [
    ["text", "Where a domain needs terms of its own", "Where a section needs terms of its own"],
    ["ruText", "Если домену необходимы собственные термины", "Если разделу необходимы собственные термины"],
    ["reason", "Where a domain coins its own words", "Where a section coins its own words"],
    ["ruReason", "Когда домен придумывает собственные слова", "Когда раздел придумывает собственные слова"],
  ],
};
for (const [k, swaps] of Object.entries(groupA)) {
  for (const [f, a, b] of swaps) swap(d[k], f, a, b);
  d[k].changes.push(note);
}

const n31 = d["3.1"];
n31.title = "What the sections share is agreed in contracts";
n31.ruTitle = "Общее для разделов согласуется в контрактах";
n31.text = "Contracts agrees what the sections of the specification share:\n\n- the terminology;\n- the rules that bind more than one top-level section.\n\nWhat only one section needs, that section holds itself, except a term (§s-ypa92gpcj3f5zj8).\n\nContracts exists where the rules of the specification share something, such as a term. It stands as a section of its own within the base specification. A specification with no term and nothing else shared needs none.";
n31.ruText = "Контракты согласуют то, что у разделов спецификации общее:\n\n- терминологию;\n- правила, которые связывают больше одного раздела верхнего уровня.\n\nТо, что нужно только одному разделу, этот раздел держит сам, кроме термина (§s-ypa92gpcj3f5zj8).\n\nКонтракты существуют там, где правила спецификации имеют что-то общее, например термин. Они являются отдельным разделом внутри базовой спецификации. Спецификации, в которой нет ни терминов, ни другого общего, они не нужны.";
n31.reason = "Sections that coin their own words, or their own rules for one matter, stop understanding one another.\n\nHolding in contracts only what binds more than one section keeps contracts from answering for what a single section defines.\n\nContracts exists only to agree what the parts of a specification share, so a specification with nothing shared has nothing to put in it. It stands apart since it belongs to none of the others.";
n31.ruReason = "Разделы, которые придумывают собственные слова или собственные правила для одного и того же, перестают понимать друг друга.\n\nЕсли держать в контрактах только то, что связывает больше одного раздела, контракты не отвечают за то, что определяет отдельный раздел.\n\nКонтракты нужны только затем, чтобы согласовать общее для частей спецификации, поэтому спецификации, в которой общего нет, нечего в них вносить. Они выделены в отдельный раздел, потому что не принадлежат ни одному из остальных.";
n31.changes.push("По вашей схеме узел говорит о разделах, а не о доменах. Соглашения об API домена, фраза о том, что контракты не домен, RecordType домена и отдельный документ при нескольких доменах переходят в расширение. Формулировка прошла рецензента.");
delete n31.agreed;

const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const taken = new Set((read("../../specs/_guidelines/spec.json") + read("../../specs/_guidelines/tools.json") + read("../../specs/_guidelines/project.json") + read("newform.json")).match(/s-[23456789a-hjkmnp-z]{15}/g));
const draw = () => {
  for (;;) {
    let s = "s-";
    for (let i = 0; i < 15; i++) s += ALPHABET[randomInt(ALPHABET.length)];
    if (!taken.has(s)) { taken.add(s); return s; }
  }
};
const fresh = (title, ruTitle, text, reason, ruText, ruReason) => ({ from: "", sid: "new", title, text, reason, ruTitle, ruText, ruReason, changes: ["Новый узел, по вашей схеме расширений. Формулировка прошла рецензента."], sidValue: draw() });
const added = {
  "13.1.1": fresh("What an extension of the guidelines is", "Что такое расширение guidelines",
    "An extension of the guidelines is a named set of rules of the SpecSheriff guidelines beyond those every project shares. It is delivered with the SpecSheriff plugin, together with the SpecSheriff tools that carry its rules out.\n\nA project uses an extension only by its own choice.",
    "Not every system needs every rule. Rules a project does not use only lengthen what its agent reads, so they are kept apart from the rules every project shares. The rules of an extension are carried out by tools, so the two are delivered together.",
    "Расширение guidelines — это именованный набор правил SpecSheriff guidelines сверх тех, что общие для всех проектов. Оно поставляется вместе с плагином SpecSheriff и с инструментами SpecSheriff, которые выполняют его правила.\n\nПроект использует расширение только по своему выбору.",
    "Не каждой системе нужны все правила. Правила, которыми проект не пользуется, только удлиняют то, что читает его агент, поэтому они отделены от правил, общих для всех проектов. Правила расширения выполняются инструментами, поэтому их поставляют вместе."),
  "13.1.2": fresh("An extension of the guidelines may change a rule outside the extensions", "Расширение guidelines может изменить правило вне расширений",
    "An extension of the guidelines may change a rule outside the extensions. Its node stating the change holds a link of type `overrides` to that rule. The change holds only in a project using that extension. The SpecSheriff tools show that link among the rule's incoming links.\n\nA project's own guidelines hold no such link.",
    "An extension brings the tools that follow the change, so they keep working. A project cannot be sure of that, so it only refines or extends. The link lets whoever reads the changed rule see that it holds otherwise where the extension is used.",
    "Расширение guidelines может изменить правило вне расширений. Его узел, задающий изменение, содержит связь типа `overrides` к этому правилу. Изменение действует только в проекте, который использует это расширение. Инструменты SpecSheriff показывают эту связь среди входящих связей правила.\n\nСобственные guidelines проекта такой связи не содержат.",
    "Расширение приносит инструменты, которые следуют за изменением, поэтому они продолжают работать. Проект не может быть в этом уверен, поэтому он только уточняет или расширяет. Связь позволяет тому, кто читает изменённое правило, увидеть, что там, где используется расширение, оно действует иначе."),
  "13.1.3": fresh("A rule outside the extensions names no particular extension", "Правило вне расширений не называет конкретных расширений",
    "The text and the reason of a rule outside the extensions name no particular extension and cite none of its nodes. Such a rule declares no link to a node of an extension.",
    "An extension may disappear or stand as a draft, so a rule depending on it would be left wrong.",
    "Текст и обоснование правила вне расширений не называют конкретных расширений и не цитируют их узлы. Такое правило не объявляет связей с узлами расширения.",
    "Расширение может исчезнуть или быть черновиком, поэтому правило, которое от него зависит, оказалось бы неверным."),
};

// The extension on domains moves down one group, so that what holds of every extension comes first.
const renum = s => { const m = String(s).match(/^13\.(\d)\.(\d+)$/); return m ? `13.${Number(m[1]) + 1}.${m[2]}` : s; };
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;
Object.assign(next, added);
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");

const lines = read("base-structure.html").split("\n");
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  row[0] = renum(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].map(renum);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
const replaceLine = (start, text) => {
  const i = lines.findIndex(l => l.trim().startsWith(start));
  if (i < 0) throw new Error("no line: " + start);
  lines[i] = text;
  return i;
};
replaceLine('{ n: "13.3", en: "Levels"', '     { n: "13.4", en: "Domains: levels", ru: "Домены: уровни", purpose: "Как домены показываются на схеме.", rows: [');
replaceLine('{ n: "13.2", en: "RecordType"', '     { n: "13.3", en: "Domains: RecordType", ru: "Домены: RecordType", purpose: "Формат данных, которыми домены обмениваются между собой.", rows: [');
replaceLine('{ n: "13.1", en: "Division into domains"', '     { n: "13.2", en: "Domains: division", ru: "Домены: деление на домены", purpose: "Что такое домен и как он описывает себя.", rows: [');
const head = replaceLine('{ n: "13", en: "Extension: domains"', '    { n: "13", en: "Extensions of the guidelines", ru: "Расширения guidelines", purpose: "Правила, которые проект использует только по своему выбору. Первое расширение — «Домены».", groups: [');
const newRow = (k, comma) => "      " + JSON.stringify([k, "new", 0, "", added[k].title, added[k].ruTitle, "", "", [], ""]) + (comma ? "," : "");
lines.splice(head + 1, 0,
  '     { n: "13.1", en: "What an extension is", ru: "Что такое расширение", purpose: "Что верно для любого расширения.", rows: [',
  newRow("13.1.1", true), newRow("13.1.2", true), newRow("13.1.3", false),
  "     ]},");
fs.writeFileSync(pagePath, lines.join("\n"));
for (const k of Object.keys(added)) console.log(k, added[k].sidValue, added[k].title);
console.log("3.1:", next["3.1"].title, "| agreed:", next["3.1"].agreed);
