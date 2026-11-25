// T25, stage 2, group 5, round b: applies the six reports on the drafts of group 5 (review-g5-a.md to review-g5-d.md,
// english-g5-fast.md, english-g5-thorough.md) as fix-brief-group5-b.md says, with the coordinator's rulings 1 to 4.
// Copies tools-drafts.json to tools-drafts.before-group5-b.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails where it does not find the text it replaces. Runs the checks of
// propose-group5.mjs, gives the agreed "What the SpecSheriff tools read in the project's own guidelines" its sid (which
// changes no wording, as the brief asks), and writes english-group5b.md, the English of every changed node.
// It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-b.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = "specsheriff-rule-reviewer, 2026-11-24: review-g5-a.md, review-g5-b.md, review-g5-c.md and review-g5-d.md; EngStickler's readers: english-g5-fast.md and english-g5-thorough.md; fix-group5-b.mjs applied the findings as group5-notes.md, round b, says";

// The sid that the agreed "What the SpecSheriff tools read in the project's own guidelines" receives.
const PROJECT_SID = "s-t9j29hppag2nren";

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
const X = (en, ru) => ({ en, ru });
const problems = [];

const GROUP = ["s-vuujweu57sxsa58", "s-gvafe6bnstwab8b", "s-uxmkwbnpgtjzkgv", "s-3anv9qcmx8pwp2w", "s-c2r9jndrjbtbsv6", "s-5nf87c3e3jg9v7c", "new:tools-7-1-enum-values", "s-ezq8csd433vj6fj"];
const OTHER_CHANGED = ["new:tools-1-project", "proposal:new-tools-1-project-g4"];
const changed = new Set();
const entry = (key) => {
  changed.add(key);
  return drafts[key];
};

// Replaces `from` by `to` once in the field `field` of `obj`, failing where `from` is not there.
const rep = (where, obj, field, from, to) => {
  if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) {
    problems.push(`${where}: "${from.slice(0, 60)}…" not found in ${field}`);
    return;
  }
  obj[field] = obj[field].replace(from, to);
};
// The part of a proposal whose English starts with `start`.
const part = (key, start) => {
  const x = drafts[key].proposal.parts.find((p) => p.en.startsWith(start));
  if (!x) problems.push(`${key}: no part starts with "${start.slice(0, 50)}…"`);
  return x ?? {};
};

// The sentence on how a refusal names a field at depth, the same in items 44 and 46b (review d's DOUBT, the brief).
const POINTER_EN = "It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.";
const POINTER_RU = "Поле он называет указателем JSON Pointer на схему поля внутри `schema` RecordType, например `/properties/accounts/items`.";

// ---------------------------------------------------------------------------------------------------------------
// Item 41: s-vuujweu57sxsa58 (review a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-vuujweu57sxsa58";
  const e = entry(k);
  const p = e.proposal;
  const p1 = part(k, "Where the project has chosen the Domains extension");
  rep(k, p1, "en", "refuses the change where the domains use one another", "refuses the change where domains use one another");
  const p2 = part(k, "A domain uses another domain where");
  p2.en = "One domain uses another where the header of the first (§s-yggv9myedprnaa7) has a `consumes` link to a section of the second. Only a link that the check of `consumes` links accepts is taken into account (§s-p3n666zfjdrrw6a). Domains use one another in a cycle where a chain of domains, each of which uses the next, leads back to its first domain.";
  p2.ru = "Один домен использует другой, если у заголовка первого (§s-yggv9myedprnaa7) есть связь `consumes` с разделом второго. Учитывается только связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a). Домены используют друг друга по кругу, если цепочка доменов, каждый из которых использует следующий, возвращается к своему первому домену.";
  rep(k, p, "reason", "has a link of any type to that domain's node (§s-hr7j7scmfkkjnws). So a check that followed those links would refuse", "has a link of any type to the node of that domain that states it (§s-hr7j7scmfkkjnws). So a check that followed links of every type would refuse");
  rep(k, p, "ruReason", "содержит связь любого типа с узлом этого домена (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по таким связям,", "содержит связь любого типа с тем узлом этого домена, который это утверждает (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям любого типа,");
  const ex = p.examples[0];
  rep(k, ex, "en", "In another project, only the header of `requests` has such a link, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts both domains.", "In another project, only the header of `requests` has a `consumes` link to a section of `users`, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts the change.");
  rep(k, ex, "ru", "В другом проекте такая связь есть только у заголовка `requests`, а правило `users` ссылается на правило `requests`. Там `sheriff validate` принимает оба домена.", "В другом проекте связь `consumes` с разделом `users` есть только у заголовка `requests`, а правило `users` ссылается на правило `requests`. Там `sheriff validate` принимает изменение.");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 42: s-gvafe6bnstwab8b (found ready by review a; the readers' findings; the brief's ruling 3 in stage3).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-gvafe6bnstwab8b";
  const e = entry(k);
  const p = e.proposal;
  const p3 = part(k, "In a file named after a domain,");
  rep(k, p3, "en", "only where the same titles lead to a section of that domain", "only where the titles that lead to it also lead to a section of that domain");
  rep(k, p3, "ru", "только если те же названия ведут к разделу этого домена", "только если названия, которые ведут к нему, ведут и к разделу этого домена");
  rep(k, p, "reason", "A reader looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain.", "To find how a rule of a domain is implemented, a reader looks in the file of the technical appendix named after that domain.");
  rep(k, p, "ruReason", "Читатель ищет, как реализовано правило домена, в файле технического приложения, названном по этому домену.", "Чтобы найти, как реализовано правило домена, читатель смотрит в файл технического приложения, названный по этому домену.");
  const ex = p.examples[0];
  rep(k, ex, "en", "although that section is under “Intake”.", "although the domain's section is under “Intake”.");
  rep(k, ex, "ru", "хотя тот находится под «Intake».", "хотя раздел домена находится под «Intake».");
  rep(k, e, "stage3", "The test at validate.test.ts:315", "In a project without the Domains extension, today's code also refuses a file such as specs/tech/foo.json, since isDomain('base') holds; stage 3 removes that refusal and puts nothing in its place, so the check of rule 1.1.2 without the extension is to be put to the owner before stage 3 changes the code (recorded in the continuation file). The test at validate.test.ts:315");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 43: s-uxmkwbnpgtjzkgv (review a; the readers). The agreed node on what the SpecSheriff tools read in the
// project's own guidelines gets its sid, so that this node cites it instead of restating it.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-uxmkwbnpgtjzkgv";
  const e = entry(k);
  const p = e.proposal;
  const p1 = part(k, "Where the project has chosen the Domains extension");
  rep(k, p1, "en", "`sheriff validate` accepts the level that a domain's header (§s-yggv9myedprnaa7) contains only where", "`sheriff validate` accepts a domain's header (§s-yggv9myedprnaa7) that contains a level only where");
  rep(k, p1, "en", "A header contains its level in its `level`.", "A header contains a level as the value of its `level`.");
  rep(k, p1, "ru", "`sheriff validate` принимает уровень, который содержит заголовок домена (§s-yggv9myedprnaa7), только если", "`sheriff validate` принимает заголовок домена (§s-yggv9myedprnaa7), который содержит уровень, только если");
  rep(k, p1, "ru", "Заголовок содержит свой уровень в своём `level`.", "Заголовок содержит уровень как значение своего `level`.");
  const p3 = part(k, "The SpecSheriff tools read those levels");
  p3.en = `As with every list in the project's own guidelines, the SpecSheriff tools read the levels in the last approved wording (§s-a8fn72xa782wvbk) of each rule that lists them (§${PROJECT_SID}). So a level that only a draft wording adds is accepted only after that wording is approved.`;
  p3.ru = `Как и любой перечень собственных guidelines проекта, инструменты SpecSheriff читают уровни в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§${PROJECT_SID}). Поэтому уровень, который добавляет только формулировка-черновик, принимается лишь после того, как эту формулировку одобрят.`;
  p3.change = "Новое: какой перечень уровней действует, если правило, которое его перечисляет, — черновик. Так инструменты SpecSheriff читают любой перечень собственных guidelines проекта по согласованному узлу «What the SpecSheriff tools read in the project's own guidelines» (группа 4), на который этот узел ссылается.";
  p.refs = p.refs.filter((r) => !["s-zefk589ykh37b8u", "s-sn6au3vcr9uy5pm", "s-utvqbypzhmgndug"].includes(r.to));
  p.refs.push(R("cites", "s-a8fn72xa782wvbk"), R("cites", PROJECT_SID));
  const ex = p.examples[0];
  rep(k, ex, "en", "and lists `core` and `edge`. ", "and lists `core` and `edge`. `sheriff validate` accepts each header that contains `core` or `edge`, and each header that contains no level. ");
  rep(k, ex, "ru", "и перечисляет `core` и `edge`. ", "и перечисляет `core` и `edge`. `sheriff validate` принимает каждый заголовок, который содержит `core` или `edge`, и каждый заголовок, который не содержит уровня. ");
  rep(k, ex, "en", "The most likely mistake is to read the list in the draft wording.", "The most likely mistake is to take the list from the draft wording.");
  rep(k, ex, "ru", "Самая вероятная ошибка — читать перечень в формулировке-черновике.", "Самая вероятная ошибка — брать перечень из формулировки-черновика.");
  rep(k, e, "stage3", "a rule never approved listing nothing (new:tools-1-project)", `a rule never approved listing nothing (${PROJECT_SID}, the agreed new:tools-1-project)`);
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 44: s-3anv9qcmx8pwp2w (review b; review d's DOUBT on naming a field at depth; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-3anv9qcmx8pwp2w";
  const e = entry(k);
  const p = e.proposal;
  const p2 = part(k, "`sheriff validate` refuses any other field with `identifierOf`");
  rep(k, p2, "en", "The refusal also names the field and the condition that the field fails.", `The refusal also names the field and each condition that the field fails. ${POINTER_EN}`);
  rep(k, p2, "ru", "Отказ называет также само поле и условие, которое поле не выполняет.", `Отказ называет также само поле и каждое условие, которое поле не выполняет. ${POINTER_RU}`);
  p2.change = "Было: «A RecordType reached twice is refused.» Теперь отвергается поле, а отказ называет RecordType, поле и каждое условие, которое поле не выполняет. Поле на любой глубине отказ называет указателем JSON Pointer: так места в схеме называет сама JSON Schema, по которой вы велели строить всё, что касается RecordType.";
  const p3 = part(k, "The chain of identifiers that starts at a field");
  rep(k, p3, "en", "A chain that comes back to a RecordType that it has already passed never ends.", "A chain that goes to the identifying field of the same RecordType a second time never ends.");
  rep(k, p3, "ru", "Цепочка, которая возвращается к RecordType, уже пройденному ею, не кончается никогда.", "Цепочка, которая во второй раз ведёт к идентифицирующему полю одного и того же RecordType, не кончается никогда.");
  p3.change = "Было: «Where that field is itself an identifier, the RecordType it names is followed in the same way… A RecordType reached twice is refused.» Без изменений по смыслу: RecordType, у поля которого цепочка начинается, не считается пройденным, пока цепочка не придёт к его идентифицирующему полю, как и считает код; поэтому поле `parent`, которое ссылается на свой же RecordType, принимается. Цепочка, которая доходит до RecordType без идентифицирующего поля, тоже не кончается полем без `identifierOf`, поэтому поле в её начале отвергается; сейчас код такое поле пропускает.";
  rep(k, p, "reason", "generated from the RecordType (§s-e877bnfa559tvk9)", "generated from the RecordType that holds the field (§s-e877bnfa559tvk9)");
  rep(k, p, "ruReason", "сгенерированные из RecordType (§s-e877bnfa559tvk9)", "сгенерированные из RecordType, который содержит это поле (§s-e877bnfa559tvk9)");
  p.examples = [
    X("The RecordType `statement` has a field `accountId` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of the RecordType `account` names its field `number`, of type `string`. The chain that starts at `accountId` ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other, so their chains never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain, which would accept both fields.",
      "У RecordType `statement` есть поле `accountId`, `identifierOf` которого называет RecordType `account`. `identifiedBy` RecordType `account` называет его поле `number` типа `string`. Цепочка, которая начинается у `accountId`, кончается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, `identifierOf` которого называет другой, поэтому их цепочки не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки: тогда оба поля были бы приняты."),
  ];
  rep(k, e, "stage3", "It is to read `identifierOf`", "A refusal is to name the field by the JSON Pointer to its schema within the RecordType's `schema`. validate.ts:424 already counts as passed only the RecordTypes that the chain goes to, as the node says. It is to read `identifierOf`");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 45: s-c2r9jndrjbtbsv6 (review c, findings 1 to 6; the coordinator's ruling 1; the readers). Rewritten: the
// definitions now come before the list.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-c2r9jndrjbtbsv6";
  const e = entry(k);
  const p = e.proposal;
  p.parts = [
    P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` checks each RecordType variant (§s-z3dnru6qqdf9m6j) against its RecordType.",
      "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` сверяет каждый вариант RecordType (§s-z3dnru6qqdf9m6j) с его RecordType.",
      "Было: «`sheriff validate` checks that each RecordType variant agrees with the RecordType it refines, found by the variant's `refines` link:». Без изменений по смыслу. Новое: проверка выполняется, только если проект выбрал расширение RecordType."),
    P("`sheriff validate` treats as a RecordType variant each RecordType that names, in its `answersTo`, the values that it corresponds to. A RecordType variant's RecordType is the RecordType that has fields that select a variant and to which the RecordType variant has a `refines` link (§s-sn6au3vcr9uy5pm). The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it names none, they are those named in the `chosenBy` of the nearest RecordType up its chain of `refines` links that has a `chosenBy`.",
      "Вариантом RecordType `sheriff validate` считает каждый RecordType, который называет в своём `answersTo` значения, которым он соответствует. RecordType варианта RecordType — это RecordType, у которого есть поля, выбирающие вариант, и с которым у варианта RecordType есть связь `refines` (§s-sn6au3vcr9uy5pm). Поля, которые выбирают вариант RecordType, — те, что RecordType называет в своём `chosenBy`. Если он их не называет, это поля из `chosenBy` ближайшего RecordType выше по цепочке его связей `refines`, у которого есть `chosenBy`.",
      "Было: «found by the variant's `refines` link» и «the nearest RecordType up its `refines` links names as choosing it». Без изменений по смыслу. Сказано, по каким свойствам схемы инструменты SpecSheriff узнают вариант RecordType, его RecordType и поля, которые выбирают вариант: по `answersTo`, `chosenBy` и связям `refines`, как в правиле 12.6. Так код и делает сейчас."),
    P("The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The names of fields are compared character for character. Where no section holds a RecordType, the part of the base specification that holds it (§s-kag2m9tzdnduxdx) is treated as its nearest section.",
      "Поля, которые объявляет RecordType, — это свойства его `schema` (§s-6eb92ddch7shuvu). Имена полей сравниваются посимвольно. Если RecordType не содержится ни в одном разделе, его ближайшим разделом считается часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).",
      "Новое: что такое поля, которые объявляет RecordType, в формате JSON Schema (ваше решение от 2026-11-19) и как сравниваются их имена. Посимвольно — потому что так сравнивает имена свойств JSON Schema, на которую вы велели ориентироваться во всём, что касается RecordType. Последняя фраза закрывает случай RecordType, который не входит ни в один раздел."),
    P("`sheriff validate` accepts a RecordType variant only where all of the following hold:",
      "`sheriff validate` принимает вариант RecordType, только если выполнено всё следующее:",
      "Условия перечислены в порядке строк 12.12.4–12.12.10."),
    L("it has a `refines` link to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);",
      "у него есть связь `refines` ровно с одним RecordType, у которого есть поля, выбирающие вариант (§s-bmyzn6zuds6czqm);",
      "Новое в тексте: строка 12.12.4; сейчас код уже отвергает вариант без связи `refines` с RecordType. «Ровно с одним RecordType, у которого есть поля, выбирающие вариант»: по правилу 12.10 RecordType может уточнять ещё и фрагмент формата, а по правилу 12.6 вариант — вариант одного RecordType."),
    L("it is declared in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the RecordType variant is the nearest section that holds its RecordType;",
      "он объявлен в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайший раздел, который содержит вариант RecordType, — это ближайший раздел, который содержит его RecordType;",
      "Было: «the variant stands in the part of the specification where its value is declared (§s-xfwuvd3funutmsw)». По правилу 12.6 и строке 12.12.5 (ваши решения от 2026-11-16 и 2026-11-19) вариант объявляется там же, где его RecordType, а не там, где объявлено его значение; правило s-xfwuvd3funutmsw — в архиве."),
    L("it declares at least one field (§s-47q37qk27yvt3pa);",
      "он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);",
      "Было: «the variant declares at least one field that no RecordType up its `refines` links holds, the fields their fields of type `variant` hold included». Тип `variant` вы убрали 2026-11-19. Что имя поля варианта отличается от имён полей его RecordType, говорит следующий пункт (строка 12.12.7)."),
    L("the name of each field that it declares differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType (§s-hrguxwcsdm57vxf);",
      "имя каждого поля, которое он объявляет, отличается от имени любого поля, которое его RecordType объявляет или берёт через `refines` из другого RecordType (§s-hrguxwcsdm57vxf);",
      "Новое: строка 12.12.7 и ваше решение от 2026-11-19. Вместе с предыдущим пунктом он заменяет прежний пункт о поле, которого нет ни у одного RecordType выше по связям `refines`."),
    L("the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);",
      "поля, которые называет его `answersTo`, — ровно те поля, которые выбирают вариант его RecordType (§s-swturmy7hmhfvt4);",
      "Было: «the fields the variant answers to are those the nearest RecordType up its `refines` links names as choosing it». Без изменений по смыслу; это строка 12.12.8."),
    L("each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);",
      "каждое значение, которое его `answersTo` называет для поля, — одно из значений этого поля, которые собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);",
      "Было: «each value it answers to is among the values of its choosing field, collected from the field's one source (§s-5nf87c3e3jg9v7c)». Без изменений по смыслу. По строке 12.12.9 и вашему решению от 2026-11-19 значения поля из любого источника — его `enum`; как они собираются, говорит узел «Where the values of a field with `enum` are collected»."),
    L("its `answersTo` differs from the `answersTo` of every other RecordType variant of its RecordType (§s-5z8vjzmc3s983gk).",
      "его `answersTo` отличается от `answersTo` любого другого варианта RecordType его RecordType (§s-5z8vjzmc3s983gk).",
      "Было: «no other variant of the same RecordType answers to the same values». Без изменений по смыслу; это строка 12.12.10 в утвердительной форме."),
    P("`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the RecordType variant fails. For the last condition, it also names each other RecordType variant with the same `answersTo`.",
      "Любой другой вариант RecordType `sheriff validate` отвергает, называя его файл, sid и расположение (§s-kag2m9tzdnduxdx). Отказ также говорит, какие из условий выше вариант RecordType не выполняет. Для последнего условия он называет также каждый другой вариант RecordType с тем же `answersTo`.",
      "Было: «A variant failing any of these is refused.» Новое: что называет отказ."),
    P("When `sheriff validate` validates the files against the schema of the specification, it refuses an `answersTo` that gives a field more than one value (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).",
      "Когда `sheriff validate` проверяет файлы на соответствие схеме спецификации, он отвергает `answersTo`, который даёт полю больше одного значения (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).",
      "Новое: «по одному значению каждого поля» из строки 12.12.8 проверяет схема расширения RecordType, в которой значение каждого поля в `answersTo` — одна строка."),
    P("Where a RecordType variant fails the first condition, `sheriff validate` checks it only against the third, since each of the others compares the RecordType variant with its RecordType.",
      "Если вариант RecordType не выполняет первого условия, из остальных `sheriff validate` проверяет только третье, потому что каждое из других сравнивает вариант RecordType с его RecordType.",
      "Новое: какие условия проверяются у варианта без RecordType. Третье условие ни с чем вариант не сравнивает, поэтому оно проверяется всегда; сейчас код в этом случае не проверяет и его."),
    P("Where a RecordType names nothing in its `chosenBy`, and two RecordTypes equally near up its chain of `refines` links name different fields in theirs, `sheriff validate` refuses each RecordType variant that refines it under the first condition. The refusal names both of those RecordTypes.",
      "Если RecordType ничего не называет в своём `chosenBy`, а два RecordType, одинаково близкие к нему по цепочке его связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отвергает по первому условию каждый вариант RecordType, который его уточняет. Отказ называет оба этих RecordType.",
      "Новое: случай, который правило 12.6 оставляет открытым, решён по строке 12.12.4. У варианта должен быть ровно один RecordType с полями, выбирающими вариант, а здесь таких наборов полей два."),
    P("`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).",
      "`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).",
      "Новое: стоимость строк 12.12.4–12.12.10, «отклоняется», не зависит от статуса одобрения спецификации."),
  ];
  p.reason = "A data record holds the fields of its RecordType together with those of the RecordType variant that corresponds to its values (§s-z3dnru6qqdf9m6j). Only where every RecordType variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).";
  p.ruReason = "Запись данных содержит поля своего RecordType вместе с полями того варианта RecordType, который соответствует её значениям (§s-z3dnru6qqdf9m6j). Только если каждый вариант RecordType согласуется со своим RecordType, у каждой записи данных один набор полей, который могут описать типы и RuntimeCheck, сгенерированные из RecordType (§s-e877bnfa559tvk9).";
  p.examples = [
    X("The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines the fragment of a format named `message`, which declares the field `text`. A RecordType variant in the same section as `notification` refines `notification`, names `email` for `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another RecordType variant names `sms` for `channel` and declares `text`. `sheriff validate` refuses it, since `sms` is not a value of `channel` and `notification` takes `text` from `message`. The most likely mistake is to compare the names of a RecordType variant's fields only with those that `notification` declares in its own `schema`, which overlooks `text`.",
      "RecordType `notification` называет `channel` в своём `chosenBy`, и значения `channel` — `email` и `app`. Он уточняет фрагмент формата с именем `message`, который объявляет поле `text`. Вариант RecordType в том же разделе, что и `notification`, уточняет `notification`, называет в своём `answersTo` для `channel` значение `email` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант RecordType называет для `channel` значение `sms` и объявляет `text`. `sheriff validate` отвергает его, потому что `sms` — не значение `channel`, а `notification` берёт `text` из `message`. Самая вероятная ошибка — сравнивать имена полей варианта RecordType только с теми, которые `notification` объявляет в своём собственном `schema`: так `text` будет пропущено."),
  ];
  p.refs = [
    ...p.refs.filter((r) => r.type === "implements"),
    R("cites", "s-hzuzn8hbq6q9q4s"),
    R("cites", "s-z3dnru6qqdf9m6j"),
    R("cites", "s-sn6au3vcr9uy5pm"),
    R("cites", "s-6eb92ddch7shuvu"),
    R("cites", "s-kag2m9tzdnduxdx"),
    R("cites", "s-5nf87c3e3jg9v7c"),
    R("cites", "s-xzcw3hv4hmxz7h7"),
    R("cites", "s-e877bnfa559tvk9"),
    // The decisions of 2026-10-31 on the node cite both.
    R("cites", "s-xfu2gpzddjnmgks"),
    R("cites", "s-jau82aq9juv9zzh"),
  ];
  rep(k, e, "stage3", "The count of fields of type variant (validate.ts:338-339)", "Where a variant fails the first condition, the `continue` at validate.ts:384-386 is to go, so that the third condition is still checked. Where a RecordType names no chosenBy and two RecordTypes equally near up its refines links name different fields, each variant that refines it is to be refused under the first condition, naming both. The count of fields of type variant (validate.ts:338-339)");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46a: s-5nf87c3e3jg9v7c (review d; the coordinator's ruling 4, the recommended answer to the owner's question;
// the readers). Rewritten.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5nf87c3e3jg9v7c";
  const e = entry(k);
  const p = e.proposal;
  p.parts = [
    P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its source, which is exactly one of the following:",
      "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его источника — ровно одного из следующих:",
      "Было: «`sheriff validate` collects the values of each field of type `one of` from its one source (§s-xfu2gpzddjnmgks), which is one of these:». Значения собирает не только `sheriff validate`: их записывает `sheriff reindex`, и по ним проверяются варианты RecordType, поэтому субъект — инструменты SpecSheriff. Новое: только если проект выбрал расширение RecordType."),
    L("its own list, where the field's schema holds `enum`: the members of that `enum`, in their order;",
      "его собственный перечень, если схема поля содержит `enum`: элементы этого `enum` в их порядке;",
      "Было: «its own list». Без изменений по смыслу; в формате JSON Schema собственный перечень — это `enum` в схеме поля."),
    L("the names of the parts of the base specification (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), where the field's `x-enumSource.from` is `parts`;",
      "имена частей базовой спецификации (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), если `x-enumSource.from` поля — `parts`;",
      "Было: «the names of the domains». По правилам 12.7 и 12.11 (ваше решение от 2026-11-18) источник — имена частей базовой спецификации; что это за части, говорят два следующих абзаца."),
    L("the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).",
      "sid узлов собственного типа в проекте (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля — `kind`: sid каждого узла базовой спецификации, тип которого называет `x-enumSource.kind` поля, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6).",
      "Было: «the sids of the nodes of the NodeKind it names that stand in the base specification». Имя NodeKind вы убрали 2026-11-10. Новое: узлы в ячейках `TableRule` тоже считаются."),
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the parts of the base specification are the domains and the contracts section (§s-z6tq6a3btnvvwx7). The name of each such part is the name of its folder under `specs/` (§s-zefk589ykh37b8u), such as `contracts` or `requests`. A domain's name comes from the domain's header (§s-yggv9myedprnaa7). The name `contracts` comes from the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths.",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), части базовой спецификации — это домены и контракты (§s-z6tq6a3btnvvwx7). Имя каждой такой части — имя её папки в `specs/` (§s-zefk589ykh37b8u), например `contracts` или `requests`. Имя домена приходит из заголовка домена (§s-yggv9myedprnaa7). Имя `contracts` приходит из первого узла верхнего уровня первого файла `specs/contracts/` в порядке кодовых точек путей файлов.",
      "Новое: какие части даёт источник `parts`, если проект выбрал расширение Domains. Имя части — имя её папки, как в расположении узла (правило 8.5) и в примере правила 12.11, где среди значений есть контракты. Из какого узла приходит каждое значение, требует правило 12.9; у контрактов заголовка нет, поэтому значение приходит из их первого узла. Сейчас код собирает имена только по заголовкам доменов и пропускает `contracts`."),
    P("Otherwise, the parts of the base specification are the sections whose location (§s-kag2m9tzdnduxdx) is `base/` or `contracts/` followed by a single number. The name of each such part is the title of its section, and the name comes from that section.",
      "Иначе части базовой спецификации — это разделы, расположение которых (§s-kag2m9tzdnduxdx) — `base/` или `contracts/` и одно число. Имя каждой такой части — название её раздела, и это имя приходит из этого раздела.",
      "Новое — рекомендованный ответ на вопрос, который задан вам вместе с группой: без расширения Domains базовая спецификация делится на разделы (правило 1.1.2, на которое ссылается правило 12.11), поэтому части — её разделы верхнего уровня в `specs/base/` и в `specs/contracts/`, каждый под своим названием. Так же пункт 47 этой группы считает частью системы раздел верхнего уровня `specs/base/`."),
    P("A value collected from the sids comes from the node whose sid it is.",
      "Значение, собранное из sid, приходит из узла, чей это sid.",
      "Новое: из какого узла приходит такое значение (правило 12.9)."),
    P("`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from. It writes the values in the order of those nodes: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).",
      "`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого это значение приходит. Записывает он значения в порядке этих узлов: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в каком их проходит вычисление расположения (§s-ygg5kpcxgzq3m7w).",
      "Новое: что значит «рядом с полем» (правило 12.9) в формате JSON Schema и в каком порядке записываются значения. Порядок — по узлам, из которых приходят значения, как вы решили 2026-11-05 для узла «The type each neutral type of a field gives»."),
    P("In this way, the SpecSheriff tools collect the values of each field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.",
      "Так инструменты SpecSheriff собирают значения каждого поля с `enum` на любой глубине `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.",
      "Новое: на любой глубине, как код и делает сейчас для вложенных полей."),
  ];
  p.reason = "A field's values are written by `sheriff reindex` (§s-ztseyetus7np6br), compared with their source by `sheriff validate` (§s-agc6fb3vx46pc23), and read by the check of RecordType variants and by `sheriff types` (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine.";
  p.ruReason = "Значения поля записывает `sheriff reindex` (§s-ztseyetus7np6br), сравнивает с их источником `sheriff validate` (§s-agc6fb3vx46pc23), а читают проверка вариантов RecordType и `sheriff types` (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные одним способом, они одинаковы для каждого из этих применений и на каждой машине.";
  p.examples = [
    X("In a project that has chosen the Domains extension, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.",
      "В проекте, который выбрал расширение Domains, у RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает в `x-enumSource.gathered` поля `contracts`, `requests` и `users`. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`: это часть базовой спецификации, хотя и не домен."),
    X("In a project without the Domains extension, `specs/base/` holds the top-level sections titled “Requests” and “Users”, and `specs/contracts/` holds the section titled “Contracts”. The field `part` of the same RecordType gets the title of each of those sections, each with the sid of its section. The most likely mistake is to give the field the names of the folders, `base` and `contracts`.",
      "В проекте без расширения Domains в `specs/base/` находятся разделы верхнего уровня «Requests» и «Users», а в `specs/contracts/` — раздел «Contracts». Поле `part` того же RecordType получает название каждого из этих разделов вместе с sid этого раздела. Самая вероятная ошибка — дать полю имена папок, `base` и `contracts`."),
  ];
  p.refs = [
    ...p.refs.filter((r) => r.type === "implements"),
    R("cites", "s-hzuzn8hbq6q9q4s"),
    R("cites", "s-5x737t9nee4zgaa"),
    R("cites", "s-5fewsp22mmdz7y6"),
    R("cites", "s-tdm3rwsppnuh6dm"),
    R("cites", "s-z6tq6a3btnvvwx7"),
    R("cites", "s-zefk589ykh37b8u"),
    R("cites", "s-yggv9myedprnaa7"),
    R("cites", "s-kag2m9tzdnduxdx"),
    R("cites", "s-ju5vcanbjph7mgh"),
    R("cites", "s-ztseyetus7np6br"),
    R("cites", "s-ygg5kpcxgzq3m7w"),
    R("cites", "s-6eb92ddch7shuvu"),
    R("cites", "s-agc6fb3vx46pc23"),
    R("cites", "s-c2r9jndrjbtbsv6"),
    R("cites", "s-a8fn72xa782wvbk"),
  ];
  rep(k, e, "stage3", "The source `parts` is to give the name of each folder of the base specification, contracts and base included, each with the sid of the node that its part opens with; `domainNames` today reads only the domains' headers and leaves contracts out.", "Where the Domains extension is chosen, the source `parts` is to give the name of each domain's folder, each with the sid of its header, and `contracts`, with the sid of the first top-level node of the first file of specs/contracts/; `domainNames` today reads only the domains' headers and leaves contracts out. Without the Domains extension, it is to give the title of each section whose location is base/ or contracts/ followed by a single number, each with that section's sid; this follows the recommended answer to the owner's question in group5-notes.md, and the code follows the owner's answer.");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46b: new:tools-7-1-enum-values (review d; review d's DOUBT; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-enum-values";
  const e = entry(k);
  const p = e.proposal;
  p.title = "Which fields with `enum` `sheriff validate` accepts";
  p.ruTitle = "Какие поля с `enum` принимает `sheriff validate`";
  const l1 = part(k, "its source gives it at least one value");
  l1.en = "its source gives it at least one value when the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);";
  l1.ru = "когда инструменты SpecSheriff собирают его значения, его источник даёт ему хотя бы одно значение (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);";
  const p2 = part(k, "`sheriff validate` refuses any other field with `enum`");
  rep(k, p2, "en", "The refusal also names the field and, where the field fails the second condition, the kind.", `The refusal also names the field, each condition that the field fails and, where the field fails the condition on the kind, the kind. ${POINTER_EN}`);
  rep(k, p2, "ru", "Отказ называет также само поле и, если поле не выполняет второго условия, тип узлов.", `Отказ называет также само поле, каждое условие, которое поле не выполняет, и, если поле не выполняет условия о типе узлов, сам тип. ${POINTER_RU}`);
  p2.change = "Новое: что называет отказ. Поле на любой глубине отказ называет указателем JSON Pointer, так же как узел «An identifier followed to its end».";
  const p3 = part(k, "`sheriff validate` refuses a field whose own `enum`");
  p3.en = "When `sheriff validate` validates the files against the schema of the specification, it refuses a field whose own `enum` holds a value more than once (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value only once.";
  p3.ru = "Когда `sheriff validate` проверяет файлы на соответствие схеме спецификации, он отвергает поле, собственный `enum` которого содержит значение больше одного раза (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` в `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение только один раз.";
  p.reason = "The types and RuntimeChecks of a field are generated from its values (§s-e877bnfa559tvk9). A field with no value, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore put its mistake into the generated code.";
  p.ruReason = "Типы и RuntimeCheck поля генерируются из его значений (§s-e877bnfa559tvk9). Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), перенесло бы свою ошибку в сгенерированный код.";
  p.examples = [
    X("The RecordType of a job's log entry has a field `step` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once `x-enumSource.kind` names `jobStep`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule` because the schema of the SpecSheriff guidelines defines it.",
      "У RecordType записи журнала задачи есть поле `step`, `x-enumSource.from` которого — `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отвергает это поле и называет `TextRule`. Когда `x-enumSource.kind` называет `jobStep` — тип узлов, который добавляет расширение схемы проекта, — а в базовой спецификации есть узел этого типа, поле проходит проверку. Самая вероятная ошибка — принять `TextRule` на том основании, что этот тип узлов определяет схема SpecSheriff guidelines."),
  ];
  p.refs.push(R("cites", "s-mt6auv3jz8m5gzh"));
  rep(k, e, "stage3", "The check is to run only where the RecordType extension is chosen.", "A refusal is to name the field by the JSON Pointer to its schema within the RecordType's `schema`. The check is to run only where the RecordType extension is chosen.");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// Item 47: s-ezq8csd433vj6fj (review b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-ezq8csd433vj6fj";
  const e = entry(k);
  const p = e.proposal;
  p.title = "A RecordType that refers to a RecordType outside its part of the system";
  p.ruTitle = "RecordType, который ссылается на RecordType вне своей части системы";
  const p1 = part(k, "Where the project has chosen the RecordType extension");
  rep(k, p1, "en", "`sheriff validate` accepts a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases", "`sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases");
  rep(k, p1, "ru", "`sheriff validate` принимает ссылку одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях", "`sheriff validate` пропускает без сообщения ссылку одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях");
  const p2 = part(k, "`sheriff validate` reports each RecordType");
  rep(k, p2, "en", "naming it by its sid and naming the RecordType that it refers to", "naming by its sid both that RecordType and the RecordType that it refers to");
  rep(k, p2, "ru", "называя его sid и RecordType, на который он ссылается", "называя по sid и его, и RecordType, на который он ссылается");
  p2.change = "Было: «The report gives the sid of the RecordType that names the other. The change is not refused.» Без изменений по смыслу: по строкам 12.12.15 и 12.12.16 о такой ссылке сообщается по sid узла. Новое: сообщение называет по sid и RecordType, на который ссылаются.";
  const la = part(k, "a schema within its `schema`");
  la.en = "its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);";
  la.ru = "его `schema` (§s-6eb92ddch7shuvu) на любой глубине содержит `$ref`, который указывает на тот RecordType, или `identifierOf`, который его называет (§s-qpdnkejr5xzc6j3);";
  const p4 = part(k, "A fragment of a format is a RecordType of the contracts section.");
  rep(k, p4, "en", "The RecordTypes that no such section holds are treated as belonging to one part of the system.", "The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.");
  rep(k, p4, "ru", "RecordType, которые не содержит ни один такой раздел, считаются относящимися к одной части системы.", "RecordType в `specs/base/`, которые не содержит ни один такой раздел, считаются вместе одной частью системы.");
  p.reason = "A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads all of them finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).";
  p.ruReason = "RecordType может ссылаться на другой RecordType на любой глубине своей `schema` и через свои связи `refines`. Поэтому только проверка, которая читает их все, находит каждую ссылку, нарушающую правило о том, на что может ссылаться RecordType (§s-8ht2hn88cu2qwz9).";
  p.examples = [
    X("In the domain `requests`, the RecordType of a request has a field `address` with a `$ref` to the fragment of a format named `address`. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports the RecordType of a request, naming by its sid both it and the RecordType of a user, and lets the change pass. The most likely mistake is to leave the reference in the field `user` unreported because that field holds only an identifier. To keep a user's identifier without such a reference, the domain `requests` uses a field of type `string`.",
      "В домене `requests` у RecordType заявки есть поле `address` с `$ref` на фрагмент формата с именем `address`. Есть у него и поле `user`, `identifierOf` которого называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType заявки, называя по sid и его, и RecordType пользователя, и пропускает изменение. Самая вероятная ошибка — не сообщать о ссылке в поле `user` потому, что это поле содержит только идентификатор. Чтобы хранить идентификатор пользователя без такой ссылки, домен `requests` использует поле типа `string`."),
  ];
  rep(k, e, "stage3", "reported by the referring RecordType's sid;", "reported, naming by its sid both the referring RecordType and the RecordType referred to;");
  e.review = REVIEW;
}

// ---------------------------------------------------------------------------------------------------------------
// The sid of the agreed "What the SpecSheriff tools read in the project's own guidelines": no wording changes.
// ---------------------------------------------------------------------------------------------------------------
for (const k of OTHER_CHANGED) {
  const e = entry(k);
  if (!e) problems.push(`${k}: no such key`);
  else if (e.sidValue && e.sidValue !== PROJECT_SID) problems.push(`${k} already has the sid ${e.sidValue}`);
  else e.sidValue = PROJECT_SID;
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
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

// The new sid: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(PROJECT_SID)) problems.push(`the sid ${PROJECT_SID} is not of the form of a sid`);
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  if (texts.some((t) => t.includes(PROJECT_SID))) problems.push(`the sid ${PROJECT_SID} is already held`);
}

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
  if (/`sheriff validate` (refuses|accepts|reports|checks|lets)/.test(p.text) && !/regardless of whether the specification is approved or a draft/.test(p.text)) problems.push(`${key}: a check that does not say whether it runs while the specification is a draft`);
  const own = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join(" ");
  for (const sentence of own.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, / included\b/, /\bstands?\b/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts?\b/, /\bcounted\b/, /\bpoints? at\b/, /\bonly once\b(?! within| in| per)/, /type `one of`/, /`identifier of`/, /\bruns this check\b/]) {
    if (b.test(plain.replace(/each value only once/g, "EVOO"))) problems.push(`${key}: the English holds ${b}`);
  }
  // A RecordType variant is never a bare "variant" in the node on variants (rule 7.2.4.3, the owner's ruling of 2026-11-05).
  if (key === "s-c2r9jndrjbtbsv6") {
    const left = [p.text, p.reason, ...p.examples.map((x) => x.en)].join(" ").replace(/RecordType variants?/g, "").replace(/select a variant/g, "");
    if (/variants?/.test(left)) problems.push(`${key}: a bare "variant" remains: ${left.match(/.{0,40}variants?.{0,20}/)[0]}`);
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
const allowed = new Set([...GROUP, ...OTHER_CHANGED]);
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (allowed.has(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
// The agreed node that gets its sid changes in nothing else.
for (const key of OTHER_CHANGED) {
  const { sidValue, ...rest } = drafts[key];
  const { sidValue: _old, ...was } = before[key];
  if (JSON.stringify(rest) !== JSON.stringify(was)) {
    console.error(`${key} changed in more than its sid`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group5b.md: the English of every changed node of the group.
const md = [
  "# T25, group 5, round b: the English of every changed node",
  "",
  "This file holds the English of every node of group 5 that round b changed, as `tools-drafts.json` holds it after fix-group5-b.mjs. Every node of the group changed in round b.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group5-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${p.examples.length > 1 ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group5b.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
