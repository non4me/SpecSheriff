// T25, stage 2, group 5, round c: applies the six reports of the follow-up review (review-g5b-a.md to review-g5b-d.md,
// english-g5b-fast.md, english-g5b-thorough.md) as fix-brief-group5-c.md says. Copies tools-drafts.json to
// tools-drafts.before-group5-c.json on its first run and rebuilds from that copy on every run, so that it is idempotent.
// Each patch fails where it does not find the text it replaces. Runs the checks of fix-group5-b.mjs and writes
// english-group5c.md, the English of every changed node. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-c.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW_C = "; specsheriff-rule-reviewer, 2026-11-24, follow-up review: review-g5b-a.md to review-g5b-d.md; EngStickler's readers: english-g5b-fast.md and english-g5b-thorough.md; fix-group5-c.mjs applied the findings as group5-notes.md, round c, says";

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
const R = (type, to) => ({ type, to });
const problems = [];

const GROUP = ["s-vuujweu57sxsa58", "s-gvafe6bnstwab8b", "s-uxmkwbnpgtjzkgv", "s-3anv9qcmx8pwp2w", "s-c2r9jndrjbtbsv6", "s-5nf87c3e3jg9v7c", "new:tools-7-1-enum-values", "s-ezq8csd433vj6fj"];
const changed = new Set();
const entry = (key) => {
  changed.add(key);
  const e = drafts[key];
  e.review = (e.review || "") + REVIEW_C;
  return e;
};
const rep = (where, obj, field, from, to) => {
  if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) {
    problems.push(`${where}: "${from.slice(0, 70)}…" not found in ${field}`);
    return;
  }
  obj[field] = obj[field].replace(from, to);
};
const part = (key, start) => {
  const x = drafts[key].proposal.parts.find((p) => p.en.startsWith(start));
  if (!x) problems.push(`${key}: no part starts with "${start.slice(0, 50)}…"`);
  return x ?? {};
};
const indexOfPart = (key, start) => {
  const i = drafts[key].proposal.parts.findIndex((p) => p.en.startsWith(start));
  if (i < 0) problems.push(`${key}: no part starts with "${start.slice(0, 50)}…"`);
  return i;
};

const TITLE_46A_OLD = "Where the values of a field with `enum` are collected";
const TITLE_46A = "Where the values of a field with `enum` are collected from";

// ---------------------------------------------------------------------------------------------------------------
// Item 41: s-vuujweu57sxsa58 (review b-a's CUT; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-vuujweu57sxsa58";
  const p = entry(k).proposal;
  const p1 = part(k, "Where the project has chosen the Domains extension");
  rep(k, p1, "en", "`sheriff validate` refuses the change where domains use one another in a cycle (§s-bncp7gtyaukur8e).", "`sheriff validate` refuses a change after which domains use one another in a cycle (§s-bncp7gtyaukur8e).");
  rep(k, p1, "ru", "`sheriff validate` отвергает изменение, если домены используют друг друга по кругу (§s-bncp7gtyaukur8e).", "`sheriff validate` отвергает изменение, после которого домены используют друг друга по кругу (§s-bncp7gtyaukur8e).");
  const p2 = part(k, "One domain uses another where");
  rep(k, p2, "en", " Only a link that the check of `consumes` links accepts is taken into account (§s-p3n666zfjdrrw6a).", "");
  rep(k, p2, "ru", " Учитывается только связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a).", "");
  rep(k, p2, "en", "leads back to its first domain.", "leads back to the domain that it starts from.");
  rep(k, p2, "ru", "возвращается к своему первому домену.", "возвращается к домену, с которого начинается.");
  rep(k, p2, "change", " Уточнено, что считается только связь `consumes`, которую принимает согласованный узел «`consumes` links»: связь, которую он отвергает, не делает один домен пользователем другого.", "");
  p.refs = p.refs.filter((r) => r.to !== "s-p3n666zfjdrrw6a");
  rep(k, p, "reason", "A node that relies on what another domain states has a link of any type to the node of that domain that states it (§s-hr7j7scmfkkjnws).", "A node that relies on what another domain states links to the node of that domain that states it, by a link of any type (§s-hr7j7scmfkkjnws).");
  rep(k, p, "ruReason", "содержит связь любого типа с тем узлом этого домена, который это утверждает (§s-hr7j7scmfkkjnws).", "связан с тем узлом этого домена, который это утверждает, связью любого типа (§s-hr7j7scmfkkjnws).");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 42: s-gvafe6bnstwab8b (ready; the readers' finding on where the titles start).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-gvafe6bnstwab8b";
  entry(k);
  const p4 = part(k, "The first top-level node of a file named after a domain");
  rep(k, p4, "en", "In the domain, the titles that lead to a section start at a section that is", "In the domain, the titles that lead to a section start with the title of a section that is");
  rep(k, p4, "ru", "В домене названия, которые ведут к разделу, начинаются с раздела, который является", "В домене названия, которые ведут к разделу, начинаются с названия раздела, который является");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 43: s-uxmkwbnpgtjzkgv (review b-a's Russian fix; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-uxmkwbnpgtjzkgv";
  const p = entry(k).proposal;
  const p1 = part(k, "Where the project has chosen the Domains extension");
  rep(k, p1, "en", "A header contains a level as the value of its `level`.", "A header contains a level as the value of its property `level`.");
  rep(k, p1, "ru", "Заголовок содержит уровень как значение своего `level`.", "Заголовок содержит уровень как значение своего свойства `level`.");
  const p3 = part(k, "As with every list in the project's own guidelines");
  rep(k, p3, "ru", "Как и любой перечень собственных guidelines проекта, инструменты SpecSheriff читают уровни в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren).", "Инструменты SpecSheriff читают уровни так же, как любой перечень собственных guidelines проекта: в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren).");
  rep(k, p, "reason", "The order of the levels in their list sets the order of the rows", "The order of the levels in the list of levels sets the order of the rows");
  rep(k, p, "ruReason", "Порядок уровней в их перечне задаёт порядок рядов", "Порядок уровней в перечне уровней задаёт порядок рядов");
  const ex = p.examples[0];
  rep(k, ex, "en", "A team member adds `platform` to its list, so the rule becomes a draft.", "A team member adds `platform` to that rule's list, so the rule becomes a draft.");
  rep(k, ex, "ru", "Участник команды добавляет в его перечень `platform`, и правило становится черновиком.", "Участник команды добавляет в перечень этого правила `platform`, и правило становится черновиком.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 44: s-3anv9qcmx8pwp2w (ready; review b-b's nits; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-3anv9qcmx8pwp2w";
  const e = entry(k);
  const p = e.proposal;
  const p4 = part(k, "A RecordType's fields here are those");
  rep(k, p4, "ru", "в своём `schema` (§s-6eb92ddch7shuvu)", "в своей `schema` (§s-6eb92ddch7shuvu)");
  const ex = p.examples[0];
  rep(k, ex, "en", "names the other, so their chains never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain, which would accept both fields.", "names the other, so the chains that start at those fields never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain and so accept both fields.");
  rep(k, ex, "ru", "называет другой, поэтому их цепочки не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки: тогда оба поля были бы приняты.", "называет другой, поэтому цепочки, которые начинаются у этих полей, не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки и так принять оба поля.");
  rep(k, e, "stage3", "In validate.ts:425-434 the loop stops quietly", "At validate.ts:427 (`if (!next) break`) the loop also stops without refusing anything where an identifierOf names no RecordType; the field where the chain starts is to be refused there too. In validate.ts:425-434 the loop stops quietly");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 45: s-c2r9jndrjbtbsv6 (review b-c's findings 1 to 5; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-c2r9jndrjbtbsv6";
  const e = entry(k);
  const p = e.proposal;
  const p1 = part(k, "Where the project has chosen the RecordType extension");
  rep(k, p1, "en", "against its RecordType.", "against its RecordType (§s-7vm323mhry2enx3).");
  rep(k, p1, "ru", "с его RecordType.", "с его RecordType (§s-7vm323mhry2enx3).");
  const p2 = part(k, "`sheriff validate` treats as a RecordType variant");
  rep(k, p2, "en", "The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it names none, they are those named in the `chosenBy` of the nearest RecordType up its chain of `refines` links that has a `chosenBy`.", "The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it has no `chosenBy`, they are those named in the `chosenBy` of the RecordType that has a `chosenBy` and that it reaches through the fewest `refines` links.");
  rep(k, p2, "ru", "Если он их не называет, это поля из `chosenBy` ближайшего RecordType выше по цепочке его связей `refines`, у которого есть `chosenBy`.", "Если у него нет `chosenBy`, это поля из `chosenBy` того RecordType с `chosenBy`, к которому от него ведёт наименьшее число связей `refines`.");
  rep(k, p2, "change", "Без изменений по смыслу. Сказано, по каким свойствам схемы инструменты SpecSheriff узнают вариант RecordType, его RecordType и поля, которые выбирают вариант: по `answersTo`, `chosenBy` и связям `refines`, как в правиле 12.6. Так код и делает сейчас.", "Новое: RecordType варианта — тот из уточняемых им RecordType, у которого есть поля, выбирающие вариант. Код сейчас берёт первую связь `refines`. Сказано, по каким свойствам схемы инструменты SpecSheriff узнают вариант RecordType, его RecordType и поля, которые выбирают вариант: по `answersTo`, `chosenBy` и связям `refines`, как в правиле 12.6.");
  const p3 = part(k, "The fields that a RecordType declares are the properties");
  rep(k, p3, "en", "Where no section holds a RecordType, the part of the base specification that holds it (§s-kag2m9tzdnduxdx) is treated as its nearest section.", "Where no section holds a RecordType, the part of the specification that its location names (§s-kag2m9tzdnduxdx) is treated as its nearest section.");
  rep(k, p3, "ru", "его ближайшим разделом считается часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).", "его ближайшим разделом считается часть спецификации, которую называет его расположение (§s-kag2m9tzdnduxdx).");
  const pa = part(k, "When `sheriff validate` validates the files against the schema of the specification, it refuses an `answersTo`");
  rep(k, pa, "en", "it refuses an `answersTo` that gives a field more than one value", "it refuses a RecordType variant whose `answersTo` gives a field more than one value");
  rep(k, pa, "ru", "он отвергает `answersTo`, который даёт полю больше одного значения", "он отвергает вариант RecordType, у которого `answersTo` даёт полю больше одного значения");
  const pf = part(k, "Where a RecordType variant fails the first condition");
  pf.en = "Where a RecordType variant fails the first condition, `sheriff validate` checks it further only against the third, since each of the remaining conditions compares the RecordType variant with its RecordType.";
  pf.ru = "Если вариант RecordType не выполняет первого условия, дальше `sheriff validate` проверяет его только по третьему, потому что каждое из остальных условий сравнивает вариант RecordType с его RecordType.";
  const pt = part(k, "Where a RecordType names nothing in its `chosenBy`");
  pt.en = "Where a RecordType has no `chosenBy`, and two RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in theirs, `sheriff validate` refuses, under the first condition, each RecordType variant that refines it. The refusal names both of those RecordTypes.";
  pt.ru = "Если у RecordType нет `chosenBy`, а два RecordType с `chosenBy`, к которым от него ведёт наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отвергает по первому условию каждый вариант RecordType, который его уточняет. Отказ называет оба этих RecordType.";
  rep(k, p, "reason", "together with those of the RecordType variant that corresponds to its values", "together with those of the RecordType variant that corresponds to the data record's values");
  rep(k, p, "ruReason", "вместе с полями того варианта RecordType, который соответствует её значениям", "вместе с полями того варианта RecordType, который соответствует значениям этой записи данных");
  const ex = p.examples[0];
  rep(k, ex, "en", "It refines the fragment of a format named `message`, which declares the field `text`.", "It refines `message`, a fragment of a format that declares the field `text`.");
  rep(k, ex, "ru", "Он уточняет фрагмент формата с именем `message`, который объявляет поле `text`.", "Он уточняет `message` — фрагмент формата, который объявляет поле `text`.");
  rep(k, ex, "en", "Another RecordType variant names `sms`", "Another RecordType variant of `notification` names `sms`");
  rep(k, ex, "ru", "Другой вариант RecordType называет", "Другой вариант RecordType `notification` называет");
  const l6 = part(k, "each value that its `answersTo` names for a field");
  rep(k, l6, "change", `«${TITLE_46A_OLD}»`, `«${TITLE_46A}»`);
  p.refs.push(R("cites", "s-7vm323mhry2enx3"));
  rep(k, e, "stage3", "Where a RecordType names no chosenBy and two RecordTypes equally near up its refines links name different fields, each variant that refines it is to be refused under the first condition, naming both.", "Where a RecordType has no chosenBy and the RecordTypes with a chosenBy that it reaches through the fewest refines links are two that name different fields, each variant that refines it is to be refused under the first condition, naming both; the search for the selecting fields goes through all of a RecordType's refines links, those to a fragment of a format included.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46a: s-5nf87c3e3jg9v7c (review b-d's WORDING FIXES 1 to 3; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5nf87c3e3jg9v7c";
  const e = entry(k);
  const p = e.proposal;
  p.title = TITLE_46A;
  rep(k, p, "titleChange", "Поле типа `one of` теперь — поле с `enum`", "Поле типа `one of` теперь — поле с `enum`, а в конце добавлено «from»: название говорит, из какого источника собираются значения, а не где");
  const p2 = part(k, "Where the project has chosen the Domains extension");
  rep(k, p2, "en", " A domain's name comes from the domain's header (§s-yggv9myedprnaa7). The name `contracts` comes from the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths.", "");
  rep(k, p2, "ru", " Имя домена приходит из заголовка домена (§s-yggv9myedprnaa7). Имя `contracts` приходит из первого узла верхнего уровня первого файла `specs/contracts/` в порядке кодовых точек путей файлов.", "");
  p2.change = "Новое: какие части даёт источник `parts`, если проект выбрал расширение Domains. Имя части — имя её папки, как в расположении узла (правило 8.5) и в примере правила 12.11, где среди значений есть контракты. Сейчас код собирает имена только по заголовкам доменов и пропускает `contracts`.";
  const p3 = part(k, "Otherwise, the parts of the base specification are the sections");
  rep(k, p3, "en", "The name of each such part is the title of its section, and the name comes from that section.", "The name of each such part is the title of its section.");
  rep(k, p3, "ru", "Имя каждой такой части — название её раздела, и это имя приходит из этого раздела.", "Имя каждой такой части — название её раздела.");
  const i4 = indexOfPart(k, "A value collected from the sids comes from");
  const i5 = indexOfPart(k, "`sheriff reindex` writes each value collected");
  const i6 = indexOfPart(k, "In this way, the SpecSheriff tools collect");
  if (i4 >= 0 && i5 === i4 + 1 && i6 === i5 + 1) {
    p.parts.splice(i4, 3,
      P("`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from:",
        "`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого это значение приходит:",
        "Новое: что значит «рядом с полем» (правило 12.9) в формате JSON Schema, и из какого узла приходит каждое значение, которое правило 12.9 записывает вместе с узлом."),
      L("for a domain's name, the domain's header (§s-yggv9myedprnaa7);",
        "для имени домена — заголовка домена (§s-yggv9myedprnaa7);",
        "Новое: для домена — заголовок, узел, которым открывается домен (правило 8.5)."),
      L("for the name `contracts`, the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths;",
        "для имени `contracts` — первого узла верхнего уровня первого файла `specs/contracts/` в порядке кодовых точек путей файлов;",
        "Новое: у контрактов заголовка нет, поэтому значение приходит из их первого узла в том порядке, в каком инструменты SpecSheriff вычисляют расположения. Сейчас код `contracts` пропускает."),
      L("for the title of a section, that section;",
        "для названия раздела — этого раздела;",
        "Новое — по рекомендованному ответу A на вопрос, который задан вам вместе с группой."),
      L("for a sid, the node whose sid it is.",
        "для sid — узла, чей это sid.",
        "Новое: значение, собранное из sid, приходит из узла, чей это sid."),
      P("`sheriff reindex` writes the values in the order of the nodes that they come from: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).",
        "Значения `sheriff reindex` записывает в порядке узлов, из которых они приходят: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в каком их проходит вычисление расположения (§s-ygg5kpcxgzq3m7w).",
        "Новое: порядок — по узлам, из которых приходят значения, как вы решили 2026-11-05 для узла «The type each neutral type of a field gives»."),
      P("The SpecSheriff tools collect the values of a field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.",
        "Значения поля с `enum` инструменты SpecSheriff собирают на любой глубине `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.",
        "Новое: на любой глубине, как код и делает сейчас для вложенных полей."));
  } else problems.push(`${k}: the paragraphs to replace are not where round b put them`);
  p.reason = "A field's values are used by `sheriff reindex`, `sheriff validate`, the check of RecordType variants and `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine.";
  p.ruReason = "Значения поля используют `sheriff reindex`, `sheriff validate`, проверка вариантов RecordType и `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные одним способом, они одинаковы для каждого из этих применений и на каждой машине.";
  const ex2 = p.examples[1];
  rep(k, ex2, "en", "The field `part` of the same RecordType gets the title of each of those sections, each with the sid of its section.", "The field `part` of the RecordType of an audit log entry, whose `x-enumSource.from` is `parts`, gets the title of each of those sections, each with the sid of its section.");
  rep(k, ex2, "ru", "Поле `part` того же RecordType получает название каждого из этих разделов вместе с sid этого раздела.", "Поле `part` RecordType записи журнала аудита, `x-enumSource.from` которого — `parts`, получает название каждого из этих разделов вместе с sid этого раздела.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46b: new:tools-7-1-enum-values (ready; review b-d's FIX 1 in stage3; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-enum-values";
  const e = entry(k);
  const p = e.proposal;
  p.title = "Fields with `enum` that `sheriff validate` accepts";
  p.ruTitle = "Поля с `enum`, которые принимает `sheriff validate`";
  rep(k, e, "location", `after “${TITLE_46A_OLD}”`, `after “${TITLE_46A}”`);
  const l1 = part(k, "its source gives it at least one value");
  rep(k, l1, "change", `«${TITLE_46A_OLD}»`, `«${TITLE_46A}»`);
  rep(k, p, "reason", "would therefore put its mistake into the generated code.", "would therefore pass its mistake on to the generated code.");
  const ex = p.examples[0];
  rep(k, ex, "en", "The RecordType of a job's log entry", "The RecordType of an entry of the job log");
  rep(k, ex, "ru", "У RecordType записи журнала задачи", "У RecordType записи журнала задач");
  rep(k, e, "stage3", "A refusal is to name the field by the JSON Pointer", "The refusal of a value declared more than once (validate.ts:354-356) goes: the schema refuses a value repeated in a field's own `enum`, and row 12.12.11 does not count the gathered values, so a value gathered twice is not refused. A refusal is to name the field by the JSON Pointer");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 47: s-ezq8csd433vj6fj (review b-b's three fixes and its nit; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-ezq8csd433vj6fj";
  const e = entry(k);
  const p = e.proposal;
  const p1 = part(k, "Where the project has chosen the RecordType extension");
  rep(k, p1, "en", "`sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases", "`sheriff validate` leaves a reference from one RecordType (§s-7vm323mhry2enx3) to another unreported only in the following cases");
  rep(k, p1, "change", "Узел теперь говорит, какие ссылки принимаются, по строкам 12.12.15 и 12.12.16.", "Узел теперь говорит, какие ссылки проходят без сообщения, по строкам 12.12.15 и 12.12.16.");
  const l1 = part(k, "from a RecordType outside the contracts section");
  rep(k, l1, "en", "to a RecordType of the same part of the system or to a fragment of a format", "to a RecordType of its own part of the system or to a fragment of a format");
  rep(k, l1, "ru", "на RecordType той же части системы или на фрагмент формата", "на RecordType своей части системы или на фрагмент формата");
  const p2 = part(k, "`sheriff validate` reports each RecordType");
  rep(k, p2, "en", "naming by its sid both that RecordType and the RecordType that it refers to (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).", "naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).");
  rep(k, p2, "ru", "называя по sid и его, и RecordType, на который он ссылается (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).", "называя по sid его и каждый RecordType, на который он ссылается такой ссылкой (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).");
  rep(k, p2, "change", "Новое: сообщение называет по sid и RecordType, на который ссылаются.", "Новое: сообщение называет по sid и каждый RecordType, на который ссылаются.");
  const p4 = part(k, "A fragment of a format is a RecordType of the contracts section.");
  rep(k, p4, "en", "A fragment of a format is a RecordType of the contracts section.", "A fragment of a format is a RecordType in the contracts section.");
  rep(k, p, "reason", "So only a check that reads all of them finds each reference", "So only a check that reads a RecordType's whole `schema` and all its `refines` links finds each reference");
  rep(k, p, "ruReason", "Поэтому только проверка, которая читает их все, находит каждую ссылку", "Поэтому только проверка, которая читает всю `schema` RecordType и все его связи `refines`, находит каждую ссылку");
  const ex = p.examples[0];
  rep(k, ex, "en", "has a field `address` with a `$ref` to the fragment of a format named `address`.", "has a field `address` with a `$ref` to `address`, a fragment of a format.");
  rep(k, ex, "ru", "есть поле `address` с `$ref` на фрагмент формата с именем `address`.", "есть поле `address` с `$ref` на `address` — фрагмент формата.");
  rep(k, ex, "en", "`sheriff validate` reports the RecordType of a request, naming by its sid both it and the RecordType of a user, and lets the change pass.", "`sheriff validate` reports the RecordType of a request, naming it and the RecordType of a user, each by its sid, and lets the change pass.");
  rep(k, ex, "ru", "`sheriff validate` сообщает о RecordType заявки, называя по sid и его, и RecordType пользователя, и пропускает изменение.", "`sheriff validate` сообщает о RecordType заявки, называя по sid его и RecordType пользователя, и пропускает изменение.");
  rep(k, ex, "en", "To keep a user's identifier without such a reference, the domain `requests` uses a field of type `string`.", "To store a user's identifier without such a reference, the field `user` would have the type `string` and no `identifierOf`.");
  rep(k, ex, "ru", "Чтобы хранить идентификатор пользователя без такой ссылки, домен `requests` использует поле типа `string`.", "Чтобы хранить идентификатор пользователя без такой ссылки, у поля `user` был бы тип `string` и не было бы `identifierOf`.");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes (as in fix-group5-b.mjs).
// ---------------------------------------------------------------------------------------------------------------
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = DATE;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(key)?.meta?.decisions ?? [])));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s)) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (ticks(p.title) !== ticks(p.ruTitle)) problems.push(`${key}: the code in backticks differs between the titles`);
  if (/`sheriff validate` (refuses|accepts|reports|checks|leaves)/.test(p.text) && !/regardless of whether the specification is approved or a draft/.test(p.text)) problems.push(`${key}: a check that does not say whether it runs while the specification is a draft`);
  const own = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join(" ");
  for (const sentence of own.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/each value only once/g, "EVOO");
  for (const b of [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, / included\b/, /\bstands?\b/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts?\b/, /\bcounted\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bruns this check\b/, /equally near/, /\bput its mistake\b/]) {
    if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  }
  if (key === "s-c2r9jndrjbtbsv6") {
    const left = [p.text, p.reason, ...p.examples.map((x) => x.en)].join(" ").replace(/RecordType variants?/g, "").replace(/select a variant/g, "");
    if (/\bvariants?\b/.test(left)) problems.push(`${key}: a bare "variant" remains`);
  }
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + p.reasonChange;
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const md = [
  "# T25, group 5, round c: the English of every changed node",
  "",
  "This file holds the English of every node of group 5 that round c changed, as `tools-drafts.json` holds it after fix-group5-c.mjs has run.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group5-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP.filter((k) => changed.has(k))) {
  const e = drafts[key];
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${p.examples.length > 1 ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group5c.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
