// Drafts the changes to the appendix of the tools that the owner's answers on the base specification call for
// (agree-base.mjs recorded them; follow-on-brief.md lists the changes). Each change to an agreed draft is written as a new
// draft, `proposal:<key of that draft>-bq`, whose `base` names it; a new node gets a `new:` key and a new sid; the node
// on the entry in the bindings file for a file of RuntimeChecks is recorded as removed. No draft is marked as agreed:
// each goes to specsheriff-rule-reviewer first.
// Copies tools-drafts.json to tools-drafts.before-follow-on.json first; when run again, it rebuilds from that copy, so a
// second run gives the same file. It refuses to run if a key that it builds on is missing or not agreed, or if a part
// that it changes no longer says what the script expects.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-follow-on.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const backupText = fs.readFileSync(firstRun ? url : beforeUrl, "utf8");
const before = JSON.parse(backupText);
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";
const fail = (m) => { throw new Error(m); };
const SAME = "Как в согласованной формулировке.";
const NEW = "Новое.";
const P = (en, ru, change = NEW) => ({ kind: "p", en, ru, change });
const L = (en, ru, change = NEW) => ({ kind: "li", en, ru, change });
const X = (en, ru) => ({ en, ru });
const R = (type, to) => ({ type, to });

// ---------------------------------------------------------------- the new sids, checked to be held by no file
const NEW_SID = { refNames: "s-yhe32vrbygjyd66", termDomain: "s-76becsjwmasc2r2", appendixSections: "s-g7auhqvzzbkw644", metaschema: "s-j4t9vusnsajmqdw", recordTypeObject: "s-qg2yqec2cgmcg2w" };
for (const s of Object.values(NEW_SID)) {
  if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(s)) fail(`${s} is not of the form of a sid`);
  if (backupText.includes(s) || fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8").includes(s)) fail(`the new sid ${s} is already held`);
}
// The sids of the base nodes that agree-base.mjs added, which these drafts implement or cite.
const BASE = {
  domainTerm: "s-cb9rbh8q88a84xp", termCited: "s-8p52mzm3y33cf7z", termPlace: "s-qscrdhf6kj57gbx", ref: "s-axjr5ex3p7ys3nd",
  object: "s-c7zj6mraw8w83py", variantTop: "s-gc7uwxtkrnpa2t9", variantsTop: "s-n94dfdsdzue2kur", structure: "s-ujnb23vbw3y8cne",
  tagOutside: "s-69pwmwyrk6efag2",
};

// ---------------------------------------------------------------- helpers on a draft
const entries = {};
function bq(baseKey, question) {
  const b = before[baseKey] ?? fail(`no draft ${baseKey}`);
  if (!b.agreed) fail(`${baseKey} is not agreed`);
  const key = `proposal:${baseKey.replace(/^proposal:/, "").replace(/:/g, "-").replace(/-g\d+$/, "")}-bq`;
  if (before[key]) fail(`${key} already exists`);
  const p = structuredClone(b.proposal);
  for (const x of p.parts) x.change = SAME;
  delete p.titleChange;
  p.reasonChange = SAME;
  p.removed = [];
  delete p.meta;
  delete p.citedInDecisions;
  p.date = DATE;
  entries[key] = { question, base: baseKey, location: b.location, sidValue: b.sidValue, change: "", proposal: p, stage3: "" };
  return key;
}
const parts = (k) => entries[k].proposal.parts;
function at(k, start) {
  const i = parts(k).findIndex((x) => x.en.startsWith(start));
  if (i < 0) fail(`${k}: no part starts with «${start.slice(0, 60)}»`);
  return i;
}
function setPart(k, start, en, ru, change) { const i = at(k, start); parts(k)[i] = { ...parts(k)[i], en, ru, change }; }
function insertAfter(k, start, ...added) { const i = start === null ? -1 : at(k, start); parts(k).splice(i + 1, 0, ...added); }
function removePart(k, start, note) {
  const i = at(k, start);
  const [x] = parts(k).splice(i, 1);
  entries[k].proposal.removed.push(note ?? `Удалено: «${x.ru}».`);
}
function title(k, en, ru) {
  const p = entries[k].proposal;
  p.titleChange = `Было: «${p.ruTitle}».`;
  p.title = en; p.ruTitle = ru;
}
function reason(k, en, ru) {
  const p = entries[k].proposal;
  p.reasonChange = `Было: «${p.ruReason}».`;
  p.reason = en; p.ruReason = ru;
}
function links(k, add = [], remove = []) {
  const p = entries[k].proposal;
  for (const to of remove) { if (!p.refs.some((r) => r.to === to)) fail(`${k}: no link to ${to}`); p.refs = p.refs.filter((r) => r.to !== to); }
  for (const r of add) { if (p.refs.some((x) => x.to === r.to)) fail(`${k}: already links to ${r.to}`); p.refs.push(r); }
}

// ================================================================ 2.9: terms defined in a domain
{
  const k = bq("new:tools-7-1-term-contracts", "None: carries out proposal 2.9 and question 4.6 of the questions about the base specification (rule 3.2, row 10.1.6 and the rule of the Domains extension on a term defined in a domain), which the owner agreed to on 2026-11-25, and the todo of this node");
  insertAfter(k, "`sheriff validate` refuses each term node",
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` makes an exception for a term node whose file is in a domain's folder, `specs/<domain>/`, as the rule on a term defined in a domain allows (§s-cb9rbh8q88a84xp). It checks whether the term belongs in that domain as the node on terms defined in a domain says (§s-76becsjwmasc2r2).",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` делает исключение для узла-термина, файл которого находится в папке домена `specs/<domain>/`, как позволяет правило о термине, определённом в домене (§s-cb9rbh8q88a84xp). Принадлежит ли термин этому домену, он проверяет так, как говорит узел о терминах, определённых в домене (§s-76becsjwmasc2r2).",
      "Новое: строка §s-7kc8dw7zdz63q53 теперь допускает термин и в той части базовой спецификации, где выбранное расширение позволяет определять термины, а правило расширения Domains (§s-cb9rbh8q88a84xp) — в домене. Так исполняется todo этого узла."));
  reason(k, "The contracts section and each domain are kept in folders of their own (§s-zefk589ykh37b8u), so the folder of a term node's file shows which part of the specification holds the node.",
    "Раздел контрактов и каждый домен хранятся каждый в своей папке (§s-zefk589ykh37b8u), поэтому папка файла узла-термина показывает, какая часть спецификации содержит этот узел.");
  delete entries[k].proposal.todos;
  entries[k].proposal.removed.push("Удалено todo от 2026-11-22: правила §s-ypa92gpcj3f5zj8 и §s-7kc8dw7zdz63q53 изменены, и проверка изменена вместе с ними.");
  links(k, [R("cites", "s-tdm3rwsppnuh6dm"), R("cites", BASE.domainTerm), R("cites", NEW_SID.termDomain)]);
  entries[k].change = "Добавлен абзац: если проект выбрал расширение Domains, узел-термин может находиться и в папке домена. Обоснование говорит о папках раздела контрактов и доменов. Todo этого узла выполнено и удалено.";
  entries[k].stage3 = "validate.ts, the check of term nodes outside specs/contracts/, is to accept a term node in the folder of a domain where the Domains extension is chosen. The test “outside contracts” is to cover a term in a domain's folder, with and without the Domains extension.";
}
entries["new:tools-7-1-term-domain"] = {
  question: "None: carries out the two new rows of the table of checks of the Domains extension in proposal 2.9 of the questions about the base specification, which the owner agreed to on 2026-11-25 (question 4.6, option B, keeps the second of them)",
  location: "tools 7.1.3b (new, after “Term nodes outside the contracts section”)",
  sidValue: NEW_SID.termDomain,
  change: "Новый узел: проверки двух новых строк таблицы проверок расширения Domains — где определён термин, в зависимости от того, какие узлы ссылаются на него или связаны с ним.",
  testsFrom: [],
  proposal: {
    title: "Terms defined in a domain",
    ruTitle: "Термины, определённые в домене",
    titleChange: NEW,
    parts: [
      P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` checks where each term node (§s-ypa92gpcj3f5zj8) of the base specification is defined against the nodes that cite it or link to it (§s-cb9rbh8q88a84xp). It refuses each of the following:",
        "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` сверяет, где определён каждый узел-термин (§s-ypa92gpcj3f5zj8) базовой спецификации, с узлами, которые ссылаются на него или связаны с ним (§s-cb9rbh8q88a84xp). Он отвергает каждое из следующего:"),
      L("a term node in a domain's folder, where a node outside that domain and outside the part of the technical appendix named after that domain cites the term or links to it (§s-8p52mzm3y33cf7z);",
        "узел-термин в папке домена, если на этот термин ссылается или с ним связан узел вне этого домена и вне части технического приложения, названной по этому домену (§s-8p52mzm3y33cf7z);"),
      L("a term node in the contracts section (§s-z6tq6a3btnvvwx7) that at least one node cites or links to, where every such node is in the same domain or in the part of the technical appendix named after that domain (§s-qscrdhf6kj57gbx).",
        "узел-термин в разделе контрактов (§s-z6tq6a3btnvvwx7), на который ссылается или с которым связан хотя бы один узел, если каждый такой узел находится в одном и том же домене или в части технического приложения, названной по этому домену (§s-qscrdhf6kj57gbx)."),
      P("A node is in a domain where its file is in the domain's folder, `specs/<domain>/` (§s-zefk589ykh37b8u). A node is in the part of the technical appendix named after a domain where its file is `specs/tech/<domain>.json` (§s-gvafe6bnstwab8b).",
        "Узел находится в домене, если его файл находится в папке домена `specs/<domain>/` (§s-zefk589ykh37b8u). Узел находится в части технического приложения, названной по домену, если его файл — `specs/tech/<domain>.json` (§s-gvafe6bnstwab8b)."),
      P("Each refusal names the term node by its file, its sid and its location (§s-kag2m9tzdnduxdx). A refusal of the first kind also names each node that cites the term or links to it from outside the domain and outside the part of the technical appendix named after the domain. A refusal of the second kind names the domain into which the term is to be moved.",
        "Каждый отказ называет файл, sid и расположение (§s-kag2m9tzdnduxdx) узла-термина. Отказ первого вида называет также каждый узел вне домена и вне части технического приложения, названной по этому домену, который ссылается на термин или связан с ним. Отказ второго вида называет домен, в который нужно перенести термин."),
      P("`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-8p52mzm3y33cf7z, §s-qscrdhf6kj57gbx).",
        "`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-8p52mzm3y33cf7z, §s-qscrdhf6kj57gbx)."),
    ],
    reason: "Where a term is defined follows from which nodes cite it or link to it. So only a check that reads every citation and every link in the specification can tell whether a term is in the part that needs it.",
    ruReason: "Где определён термин, следует из того, какие узлы ссылаются на него или связаны с ним. Поэтому только проверка, которая читает каждую ссылку и каждую связь в спецификации, может сказать, находится ли термин в той части, которой он нужен.",
    reasonChange: NEW,
    examples: [X(
      "The domain `users` defines the term “account”, which only its own rules cite. A commit adds a rule to the domain `requests` that has a `refines` link to that term. `sheriff validate` refuses the term node and names the new rule, until the term is moved to the contracts section. The most likely mistake is to look only at the citations, so that the link from the rule of `requests` goes unnoticed.",
      "Домен `users` определяет термин «account», на который ссылаются только его собственные правила. Коммит добавляет в домен `requests` правило со связью `refines` с этим термином. `sheriff validate` отвергает узел-термин и называет новое правило, пока термин не перенесут в раздел контрактов. Самая вероятная ошибка — смотреть только на ссылки, так что связь от правила `requests` останется незамеченной.")],
    refs: [
      R("implements", BASE.termCited), R("implements", BASE.termPlace),
      R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-ypa92gpcj3f5zj8"), R("cites", BASE.domainTerm), R("cites", "s-z6tq6a3btnvvwx7"),
      R("cites", "s-zefk589ykh37b8u"), R("cites", "s-gvafe6bnstwab8b"), R("cites", "s-kag2m9tzdnduxdx"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "Not in the code yet. validate.ts is to collect, for each term node of the base specification, the nodes of the specification that cite it or link to it, and to refuse the two cases where the Domains extension is chosen. Tests for each case, for a link as well as a citation, and for a project without the Domains extension, are written first and carry this sid.",
};

// ================================================================ 3.4: a `$ref` that names no RecordType
// The agreed node on references between parts of the system (s-ezq8csd433vj6fj) keeps its agreed wording; the check is a
// node of its own, since it can be carried out without the rest of that node.
entries["new:tools-7-1-ref-names"] = {
  question: "None: carries out proposal 3.4 of the questions about the base specification, the new row of table 12.12 under which each `$ref` within a RecordType names a RecordType, which the owner agreed to on 2026-11-25",
  location: "tools 7.1.14a (new, after “A RecordType that refers to a RecordType outside its part of the system”)",
  sidValue: NEW_SID.refNames,
  change: "Новый узел: `$ref` внутри `schema` RecordType, значение которого — не `#` и sid какого-либо RecordType, отвергается в любом проекте. Раньше такой `$ref` отвергал только `sheriff types`, и только если стек перечисляет файл типов (§s-suv42g8r3ra2h6b).",
  testsFrom: [],
  proposal: {
    title: "What a `$ref` within a RecordType names",
    ruTitle: "Что называет `$ref` внутри RecordType",
    titleChange: NEW,
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a `$ref` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu) only where its value is `#` followed by the sid of a RecordType (§s-4npdup7mjkva69y, §s-axjr5ex3p7ys3nd). It refuses any other `$ref`, naming the RecordType that holds it by its sid and quoting the `$ref`.",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает `$ref` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), только если его значение — `#`, за которым следует sid какого-либо RecordType (§s-4npdup7mjkva69y, §s-axjr5ex3p7ys3nd). Любой другой `$ref` он отвергает, называя по sid RecordType, который его содержит, и приводя сам `$ref`."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-axjr5ex3p7ys3nd).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-axjr5ex3p7ys3nd)."),
    ],
    reason: "A `$ref` that names no RecordType does not resolve in the file of RuntimeChecks, so the RuntimeCheck generated from its RecordType fails in the project (§s-e877bnfa559tvk9). `sheriff validate` runs on every change, so it catches such a `$ref` whatever files the stack lists.",
    ruReason: "`$ref`, который не называет RecordType, не разрешается в файле RuntimeChecks, поэтому RuntimeCheck, сгенерированный из его RecordType, не работает в проекте (§s-e877bnfa559tvk9). `sheriff validate` выполняется при каждом изменении, поэтому находит такой `$ref`, какие бы файлы ни перечислял стек.",
    reasonChange: NEW,
    examples: [],
    refs: [R("implements", BASE.ref), R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-6eb92ddch7shuvu"), R("cites", "s-4npdup7mjkva69y"), R("cites", "s-e877bnfa559tvk9")],
    removed: [],
    date: DATE,
  },
  stage3: "validate.ts is to refuse a `$ref` within a RecordType's schema, at any depth, whose value is not `#` followed by a RecordType's sid, in every project, whether or not the stack lists a file of types. A test is written first and carries this sid.",
};

// ================================================================ 3.5 and 3.6: the fields that a variant adds; the top level of a schema
{
  const k = bq("s-c2r9jndrjbtbsv6", "None: carries out proposals 3.5 and 3.6 of the questions about the base specification (rule 12.6 and rows 12.12.6 and 12.12.7 on the fields that a RecordType variant adds, and the two new rows of table 12.12 on `additionalProperties` and `unevaluatedProperties`), which the owner agreed to on 2026-11-25");
  setPart(k, "it declares at least one field",
    "it adds at least one field (§s-z3dnru6qqdf9m6j, §s-47q37qk27yvt3pa);",
    "он добавляет хотя бы одно поле (§s-z3dnru6qqdf9m6j, §s-47q37qk27yvt3pa);",
    "Было: «он объявляет хотя бы одно поле», как в прежней строке §s-47q37qk27yvt3pa. Какие поля вариант добавляет, говорит правило §s-z3dnru6qqdf9m6j.");
  setPart(k, "Where a RecordType variant fails the first condition",
    "Where a RecordType variant fails the first condition, the refusal names only that condition, since each of the other conditions compares the RecordType variant with its RecordType.",
    "Если вариант RecordType не выполняет первого условия, отказ называет только это условие, потому что каждое из других условий сравнивает вариант RecordType с его RecordType.",
    "Было: «Если вариант RecordType не выполняет первого условия, дальше `sheriff validate` проверяет его только по третьему, потому что каждое из других условий сравнивает вариант RecordType с его RecordType». Третье условие говорит теперь о полях, которые вариант добавляет, а они тоже зависят от его RecordType.");
  setPart(k, "the name of each field that it declares differs",
    "the name of each field that it adds differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType (§s-hrguxwcsdm57vxf);",
    "имя каждого поля, которое он добавляет, отличается от имени каждого поля, которое его RecordType объявляет или получает через `refines` от другого RecordType (§s-hrguxwcsdm57vxf);",
    "Было: «имя каждого поля, которое он объявляет, отличается от имени любого поля, которое его RecordType объявляет или берёт через `refines` из другого RecordType», как в прежней строке §s-hrguxwcsdm57vxf.");
  insertAfter(k, "`sheriff validate` refuses any other RecordType variant",
    P("`sheriff validate` also refuses a RecordType that has at least one RecordType variant and whose `schema` holds `additionalProperties` at its top level (§s-n94dfdsdzue2kur). The refusal names that RecordType by its file, its sid and its location.",
      "`sheriff validate` отвергает также RecordType, у которого есть хотя бы один вариант RecordType и `schema` которого содержит `additionalProperties` на верхнем уровне (§s-n94dfdsdzue2kur). Отказ называет файл, sid и расположение этого RecordType.",
      "Новое: новая строка таблицы 12.12. По JSON Schema 2020-12 `additionalProperties` видит только поля из `properties` своего объекта, поэтому на верхнем уровне RecordType с вариантами оно отвергало бы поля каждого варианта."));
  setPart(k, "When `sheriff validate` validates the files against the schema",
    "When `sheriff validate` validates the files against the schema of the specification, it refuses a RecordType variant whose `answersTo` assigns more than one value to a field (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4). It also refuses there a RecordType variant whose `schema` holds `additionalProperties` or `unevaluatedProperties` at its top level (§s-gc7uwxtkrnpa2t9).",
    "Когда `sheriff validate` проверяет файлы на соответствие схеме спецификации, он отвергает вариант RecordType, у которого `answersTo` даёт полю больше одного значения (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4). Там же он отвергает вариант RecordType, `schema` которого содержит `additionalProperties` или `unevaluatedProperties` на верхнем уровне (§s-gc7uwxtkrnpa2t9).",
    "Добавлено второе предложение: новая строка таблицы 12.12, которую проверяет схема расширения RecordType, как она уже проверяет `answersTo`. Определение варианта подключается через `then` из определения его RecordType, и такое слово на верхнем уровне отвергало бы поля его RecordType.");
  setPart(k, "`sheriff validate` makes these checks regardless",
    "`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk, §s-gc7uwxtkrnpa2t9, §s-n94dfdsdzue2kur).",
    "`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk, §s-gc7uwxtkrnpa2t9, §s-n94dfdsdzue2kur).",
    "Добавлены ссылки на две новые строки таблицы 12.12.");
  links(k, [R("implements", BASE.variantTop), R("implements", BASE.variantsTop)]);
  entries[k].change = "Третье и четвёртое условия говорят о полях, которые вариант добавляет, как правило §s-z3dnru6qqdf9m6j и строки §s-47q37qk27yvt3pa и §s-hrguxwcsdm57vxf. Вариант, который не выполняет первого условия, больше не проверяется по третьему: отказ называет только первое. Добавлены две проверки верхнего уровня `schema`: варианта — по схеме расширения, RecordType с вариантами — в `sheriff validate`.";
  entries[k].stage3 = "validate.ts (variants) is to count as the fields that a variant adds those that it declares and those of each RecordType that it reaches through refines, other than its RecordType and those that its RecordType reaches, and to refuse a RecordType with variants whose schema holds additionalProperties at its top level. The continue at validate.ts:384-386, after a variant fails the first condition, stays. recordtype.schema.json is to refuse additionalProperties and unevaluatedProperties at the top level of the schema of a RecordType that holds answersTo. Tests for each are written first and carry this sid.";
}

// ================================================================ 3.7: `"type": "object"`
entries["new:tools-7-1-recordtype-object"] = {
  question: "None: carries out proposal 3.7 of the questions about the base specification, the new row of table 12.12 under which the `schema` of each RecordType other than a variant holds `\"type\": \"object\"`, which the owner agreed to on 2026-11-25",
  location: "tools 7.1.16a (new, after “What a RecordType variant must agree with”)",
  sidValue: NEW_SID.recordTypeObject,
  change: "Новый узел: схема расширения RecordType требует `\"type\": \"object\"` на верхнем уровне `schema` каждого RecordType, кроме варианта.",
  testsFrom: [],
  proposal: {
    title: "`\"type\": \"object\"` in a RecordType's `schema`",
    ruTitle: "`\"type\": \"object\"` в `schema` RecordType",
    titleChange: NEW,
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the schema of that extension requires the `schema` of each RecordType (§s-6eb92ddch7shuvu) other than a RecordType variant (§s-z3dnru6qqdf9m6j, §s-c2r9jndrjbtbsv6) to hold `\"type\": \"object\"` at its top level (§s-c7zj6mraw8w83py). So, when `sheriff validate` validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7), it refuses a RecordType whose `schema` lacks `\"type\": \"object\"` at its top level.",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), схема этого расширения требует, чтобы `schema` каждого RecordType (§s-6eb92ddch7shuvu), кроме варианта RecordType (§s-z3dnru6qqdf9m6j, §s-c2r9jndrjbtbsv6), содержала `\"type\": \"object\"` на верхнем уровне (§s-c7zj6mraw8w83py). Поэтому, когда `sheriff validate` проверяет файлы на соответствие схеме спецификации (§s-xzcw3hv4hmxz7h7), он отвергает RecordType, `schema` которого не содержит `\"type\": \"object\"` на верхнем уровне."),
    ],
    reason: "A RecordType's `schema` is the RuntimeCheck of its data records (§s-4npdup7mjkva69y). Without `\"type\": \"object\"`, that RuntimeCheck would accept a value that is not an object, such as a string.",
    ruReason: "`schema` RecordType — это RuntimeCheck его записей данных (§s-4npdup7mjkva69y). Без `\"type\": \"object\"` этот RuntimeCheck принял бы значение, которое не является объектом, например строку.",
    reasonChange: NEW,
    examples: [X(
      "A hand-written RecordType `user` has a `schema` that holds `properties` for `name` and `email` and no `type`. `sheriff validate` refuses it. The most likely mistake is to accept it because each of its fields has a schema, so that its RuntimeCheck accepts the string `\"Ann\"` as a user.",
      "У написанного вручную RecordType `user` `schema` содержит `properties` для `name` и `email` и не содержит `type`. `sheriff validate` его отвергает. Самая вероятная ошибка — принять его потому, что у каждого его поля есть схема, так что его RuntimeCheck примет строку `\"Ann\"` как пользователя.")],
    refs: [
      R("implements", BASE.object),
      R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-6eb92ddch7shuvu"), R("cites", "s-z3dnru6qqdf9m6j"), R("cites", "s-c2r9jndrjbtbsv6"), R("cites", "s-xzcw3hv4hmxz7h7"), R("cites", "s-4npdup7mjkva69y"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "recordtype.schema.json is to require \"type\": \"object\" at the top level of the schema of a RecordType that holds no answersTo. The migration already writes it (s-gb8s9657a65hqmv). A test is written first and carries this sid.",
};

// ================================================================ 4.1: the kind in the fingerprint
{
  const k = bq("new:tools-11-fingerprint", "None: carries out question 4.1 of the questions about the base specification, option A, under which a node's kind is part of the wording that an approval covers (s-5ah25f6gy99panq); the owner agreed to it on 2026-11-25");
  setPart(k, "its `location`, its `sid`, its `kind` and its `status`",
    "its `location`, its `sid` and its `status`;",
    "его `location`, `sid` и `status`;",
    "Было: «его `location`, `sid`, `kind` и `status`». Тип узла входит теперь в формулировку, которую покрывает одобрение (§s-5ah25f6gy99panq).");
  insertAfter(k, "in a `TableRule` (§s-5fewsp22mmdz7y6), each cell",
    P("The object holds the node's `kind`, except where the kind is `TextRule` or its earlier name, `rule`. So an approval recorded before the kind became part of the wording stays in force for a rule of that kind. A change of a node's kind to or from `TextRule` still changes the fingerprint.",
      "Объект содержит `kind` узла, кроме случая, когда тип — `TextRule` или его прежнее имя `rule`. Поэтому одобрение, записанное до того, как тип вошёл в формулировку, остаётся в силе для правила этого типа. Смена типа узла на `TextRule` или с `TextRule` всё равно меняет отпечаток.",
      "Новое. Правило §s-5ah25f6gy99panq оставляет этому узлу выбор: без `TextRule` в отпечатке заново одобряются только термины, RecordType и `TableRule`, а правила этого типа сохраняют одобрение."));
  insertAfter(k, "a `TextRule.list.jsonSchema` or a `TextRule.list.valueList`",
    L("the node's `kind`: `RecordType` as `recordType` and `header` as `domain`;",
      "`kind` узла: `RecordType` как `recordType`, `header` как `domain`;",
      "Новое: прежние выпуски писали эти типы под прежними именами. `TextRule` здесь не назван, так как объект не содержит `kind` узла этого типа."));
  entries[k].change = "Тип узла входит в отпечаток, кроме типа `TextRule` (и его прежнего имени `rule`), и записывается под прежними именами, отдельным пунктом рядом с именем типа в источнике значений поля. Так одобрения правил типа `TextRule`, записанные до этого выпуска, остаются в силе.";
  entries[k].stage3 = "model.ts fingerprint: NOT_WORDING is to keep `kind` unless it is TextRule, and EARLIER_KINDS is to apply to the node's own kind. Tests are written first and carry this sid: a change of kind changes the fingerprint, and a TextRule keeps the fingerprint that an earlier release computed.";
}

// ================================================================ 4.2: the node on the technical appendix split in two
{
  const k = bq("s-gvafe6bnstwab8b", "None: carries out question 4.2 of the questions about the base specification, option A: row 11.3.5 checks only the names of the files of the technical appendix, and a new row of the main table checks the sections in every project; the owner agreed to it on 2026-11-25");
  title(k, "Files of the technical appendix named after the domains", "Файлы технического приложения, названные по доменам");
  for (const start of ["In a file named after a domain", "The first top-level node of a file named after a domain"]) {
    removePart(k, start, `Перенесено в новый узел §s-g7auhqvzzbkw644, где говорится о любом проекте: «${parts(k)[at(k, start)].ru}».`);
  }
  reason(k, "A reader looks for the implementation of a domain's rules in the file of the technical appendix named after that domain (§s-vj7ercem526zd6v). A JSON file under `specs/tech/` that is named after no domain and is not the file of the stack or of the technical debt holds an implementation that the reader will not find.",
    "Реализацию правил домена читатель ищет в файле технического приложения, названном по этому домену (§s-vj7ercem526zd6v). Файл JSON в `specs/tech/`, который не назван ни по одному домену и не является файлом стека или технического долга, содержит реализацию, которую читатель не найдёт.");
  entries[k].proposal.removed.push(`Пример перенесён в новый узел §s-g7auhqvzzbkw644: «${entries[k].proposal.examples[0].ru}»`);
  entries[k].proposal.examples = [];
  links(k, [], ["s-kag2m9tzdnduxdx", "s-ygg5kpcxgzq3m7w", "s-yggv9myedprnaa7"]);
  entries[k].change = "Узел разделён по вопросу 4.2: здесь остаются имена файлов в `specs/tech/`, которые проверяет суженная строка §s-vghy37e3p2325ah. Абзацы о разделах под первым узлом верхнего уровня файла и пример перенесены в новый узел §s-g7auhqvzzbkw644, который проверяет новую строку основной таблицы в любом проекте.";
  entries[k].stage3 = "validate.ts (appendices) keeps here only the refusal of a JSON file under specs/tech/ named after no domain, where the Domains extension is chosen. The comparison of the sections moves to s-g7auhqvzzbkw644. The test on a section standing under a name that no domain has is split between the two nodes.";
}
entries["new:tools-7-1-appendix-sections"] = {
  question: "None: carries out question 4.2 of the questions about the base specification, option A, the new row of the main table on the structure of the technical appendix in every project; the owner agreed to it on 2026-11-25",
  location: "tools 7.1.22a (new, split from “Sections of the technical appendix matched to the domains”, after it)",
  sidValue: NEW_SID.appendixSections,
  from: "s-gvafe6bnstwab8b",
  change: "Новый узел, выделенный из §s-gvafe6bnstwab8b: сопоставление разделов технического приложения с разделами базовой спецификации действует теперь в любом проекте, а не только с расширением Domains.",
  testsFrom: ["refuses a section of the technical appendix standing under a name no domain has, the stack's and the technical debt's aside"],
  proposal: {
    title: "Sections of the technical appendix matched to the base specification",
    ruTitle: "Разделы технического приложения, сопоставленные с базовой спецификацией",
    titleChange: "Новое; по заголовку узла, из которого выделен этот, — «Разделы технического приложения, сопоставленные с доменами».",
    parts: [
      P("`sheriff validate` accepts each section of the technical appendix (§s-tj38pvm38nepaf5) only where its path of titles is also the path of titles of a section of the base specification (§s-qmmzf9nksfsa3qp, §s-ujnb23vbw3y8cne). It leaves out the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, which hold the stack section and the technical debt section (§s-vj7ercem526zd6v).",
        "`sheriff validate` принимает каждый раздел технического приложения (§s-tj38pvm38nepaf5), только если его путь заголовков — это и путь заголовков какого-либо раздела базовой спецификации (§s-qmmzf9nksfsa3qp, §s-ujnb23vbw3y8cne). Он пропускает разделы `specs/tech/stack.json` и `specs/tech/debt.json`, которые содержат раздел стека и раздел технического долга (§s-vj7ercem526zd6v).",
        "Было в §s-gvafe6bnstwab8b: «В файле, названном по домену, `sheriff validate` принимает каждый раздел под первым узлом верхнего уровня файла, только если названия, которые ведут к нему, ведут и к разделу этого домена». Теперь — в любом проекте и для любого файла технического приложения, как требует новая строка основной таблицы, и под её именем «путь заголовков»."),
      P("The path of titles of a section is the titles of the sections that hold it, from the top down, followed by the section's own title. In each file of the technical appendix, each top-level node after the first is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w).",
        "Путь заголовков раздела — это названия разделов, которые его содержат, сверху вниз, а за ними название самого раздела. В каждом файле технического приложения каждый узел верхнего уровня после первого считается узлом под первым, как при вычислении расположения (§s-ygg5kpcxgzq3m7w).",
        "Было в §s-gvafe6bnstwab8b: «Названия, которые ведут к разделу, — это названия разделов, которые его содержат…»; теперь это путь заголовков, как в новой строке. Второе предложение перенесено из следующего абзаца и говорит теперь о каждом файле технического приложения, а не только о файле, названном по папке."),
      P("Where a file of the technical appendix, `specs/tech/<folder>.json`, is named after a folder of the base specification (§s-5x737t9nee4zgaa), its first top-level node represents that folder. So the path of titles of a section of that file starts below that node, and `sheriff validate` looks for the section with the same path of titles in that folder.",
        "Если файл технического приложения назван по папке базовой спецификации (§s-5x737t9nee4zgaa) — `specs/tech/<folder>.json`, — его первый узел верхнего уровня представляет эту папку. Поэтому путь заголовков раздела этого файла начинается ниже этого узла. Раздел базовой спецификации с тем же путём заголовков находится в этой папке.",
        "Было в §s-gvafe6bnstwab8b: «Первый узел верхнего уровня файла, названного по домену, представляет сам домен…». Теперь — файл, названный по любой папке базовой спецификации, как в новой строке основной таблицы."),
      P("In a folder of the base specification, the path of titles of a section starts with the title of a section that is a top-level node of one of the folder's files. Where the folder is a domain's (§s-tdm3rwsppnuh6dm), it may also start with the title of a child of that domain's header (§s-yggv9myedprnaa7).",
        "В папке базовой спецификации путь заголовков раздела начинается с заголовка раздела, который является узлом верхнего уровня одного из файлов этой папки. Если это папка домена (§s-tdm3rwsppnuh6dm), он может начинаться и с заголовка узла, вложенного в заголовок этого домена (§s-yggv9myedprnaa7).",
        "Было в §s-gvafe6bnstwab8b: «В домене названия, которые ведут к разделу, начинаются с названия раздела, который является узлом верхнего уровня одного из файлов домена или дочерним узлом заголовка домена». Теперь — для любой папки, а заголовок домена — для папки домена."),
      P("`sheriff validate` refuses any other section of the technical appendix, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and giving its title.",
        "Любой другой раздел технического приложения `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) раздела, а также его заголовок.",
        "Как в согласованной формулировке §s-gvafe6bnstwab8b, для любого раздела технического приложения."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-ujnb23vbw3y8cne).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-ujnb23vbw3y8cne).",
        "Как в согласованной формулировке §s-gvafe6bnstwab8b, со ссылкой на новую строку."),
    ],
    reason: "To find how a rule is implemented, a reader looks in the technical appendix and follows the same path of titles that leads to the rule in the base specification (§s-vj7ercem526zd6v). A section that matches no section of the base specification holds an implementation that the reader will not find.",
    ruReason: "Чтобы найти, как реализовано правило, читатель смотрит в техническое приложение и идёт по тому же пути заголовков, который ведёт к правилу в базовой спецификации (§s-vj7ercem526zd6v). Раздел, который не совпадает ни с одним разделом базовой спецификации, содержит реализацию, которую читатель не найдёт.",
    reasonChange: "Было в §s-gvafe6bnstwab8b: «Чтобы найти, как реализовано правило домена, читатель смотрит в файл технического приложения, названный по этому домену…». Теперь — о любом проекте.",
    examples: [X(
      "The domain `requests` has a section titled “Intake”, which holds a section titled “Validation”. In `specs/tech/requests.json`, the file's first top-level node holds a section titled “Intake”, which holds a section titled “Validation”, and `sheriff validate` accepts both. Another section titled “Validation” is directly under the file's first top-level node, and `sheriff validate` refuses it. The most likely mistake is to accept that section because the domain has a section titled “Validation”, although the domain's section is under “Intake”.",
      "У домена `requests` есть раздел «Intake», который содержит раздел «Validation». В `specs/tech/requests.json` первый узел верхнего уровня файла содержит раздел «Intake», а тот — раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится прямо под первым узлом верхнего уровня файла, и `sheriff validate` его отвергает. Самая вероятная ошибка — принять этот раздел потому, что в домене есть раздел «Validation», хотя раздел домена находится под «Intake».")],
    refs: [
      R("implements", BASE.structure),
      R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-qmmzf9nksfsa3qp"), R("cites", "s-vj7ercem526zd6v"), R("cites", "s-5x737t9nee4zgaa"),
      R("cites", "s-ygg5kpcxgzq3m7w"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-kag2m9tzdnduxdx"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "validate.ts (appendices) is to compare each section of the technical appendix, outside specs/tech/stack.json and specs/tech/debt.json, with the sections of the base specification by its path of titles, in every project; in a file named after a folder of the base specification, below its first top-level node and against that folder. The part of the test of s-gvafe6bnstwab8b on the sections moves here and carries this sid; a test for a project without the Domains extension is written first.",
};

// ================================================================ 4.3 and 4.4: code outside every symbol; JSON Schema
{
  const k = bq("new:tools-8-symbol", "None: carries out questions 4.3, option A, and 4.4, option B, of the questions about the base specification (rule 1.5.2 and row 10.1.26), which the owner agreed to on 2026-11-25");
  title(k, "SpecTags in a file whose language is described", "SpecTag в файле на описанном языке");
  insertAfter(k, "in Python, one or more comment lines.",
    P("A JSON file is in JSON Schema where its top-level object's `$schema` is `https://json-schema.org/draft/2020-12/schema`. In JSON Schema, which allows no comments, the symbols of a file are the definitions under the `$defs` of its top-level object. In place of a comment above it, a definition's SpecTags are whole lines of the string in its `$comment` (§s-kgbzk2ph9e6jfb4). The `$schema` of the top-level object is considered the file's import.",
      "Файл JSON написан на JSON Schema, если `$schema` его объекта верхнего уровня — `https://json-schema.org/draft/2020-12/schema`. В JSON Schema, где комментарии не допускаются, символы файла — это определения в `$defs` его объекта верхнего уровня. Вместо комментария над определением его SpecTag — это целые строки текста в его `$comment` (§s-kgbzk2ph9e6jfb4). `$schema` объекта верхнего уровня считается импортом файла.",
      "Новое по вопросу 4.4, вариант Б: правило §s-kgbzk2ph9e6jfb4 привязывает каждый символ файла без комментариев SpecTag в свойстве символа для комментария, например в `$comment` JSON Schema."));
  insertAfter(k, "Only the delimiters of the comment may share",
    P("In a file of the system's code (§s-hheus6f395ynqvc) other than tests, the code outside every symbol, other than its imports, is bound by the SpecTags in the file's first comment (§s-kgbzk2ph9e6jfb4). Those SpecTags bind that code only where the comment comes before any code and is not directly above a symbol. In JSON Schema, those SpecTags are whole lines of the `$comment` of the file's top-level object.",
      "В файле кода системы (§s-hheus6f395ynqvc) помимо тестов код вне всех символов, кроме импортов, привязывают SpecTag в первом комментарии файла (§s-kgbzk2ph9e6jfb4). Эти SpecTag привязывают такой код, только если комментарий стоит раньше любого кода и не находится непосредственно над символом. В JSON Schema такие SpecTag — это целые строки `$comment` объекта верхнего уровня файла.",
      "Новое по вопросам 4.3, вариант А, и 4.4, вариант Б: такой код привязывают SpecTag в начале файла; правило §s-kgbzk2ph9e6jfb4 привязывает так только код помимо тестов. Комментарий непосредственно над первым символом по-прежнему относится к этому символу."),
    P("A shebang, a first line that opens with `#!`, may come before that comment.",
      "Перед этим комментарием может стоять shebang — первая строка, которая начинается с `#!`.",
      "Новое: исключение для такой строки уже есть в §s-5qdjyf6t898rsd4 и §s-u6mj5yv8ngnz79v; без него у точки входа на TypeScript, которая начинается с `#!/usr/bin/env node`, SpecTag никогда не стояли бы раньше любого кода."),
    P("In Python, a run of comment lines with no blank line between them is one comment.",
      "В Python ряд строк комментария без пустой строки между ними — это один комментарий.",
      "Новое: как в согласованном пункте «в Python — одна или несколько строк комментария», это действует и для первого комментария файла."),
    P("In JSON Schema, the keys of the top-level object other than the definitions under `$defs`, that is `$schema`, `$defs` itself and `$comment`, are not code outside every symbol. So a file of RuntimeChecks (§s-suv42g8r3ra2h6b) has no code outside its symbols and needs no `$comment` on its top-level object.",
      "В JSON Schema ключи объекта верхнего уровня, кроме определений в `$defs`, — то есть `$schema`, сам `$defs` и `$comment` — не являются кодом вне всех символов. Поэтому в файле RuntimeChecks (§s-suv42g8r3ra2h6b) нет кода вне его символов, и `$comment` у его объекта верхнего уровня не нужен.",
      "Новое: файл RuntimeChecks, который пишет `sheriff types`, содержит на верхнем уровне только `$schema` и `$defs`, поэтому ему не нужен SpecTag верхнего уровня."));
  setPart(k, "The description of each language names",
    "The description of each language names what is considered a symbol, an import and a test in that language. TypeScript, JavaScript, Python and JSON Schema are described.",
    "Описание каждого языка называет, что в нём считается символом, что импортом и что тестом. Описаны TypeScript, JavaScript, Python и JSON Schema.",
    "Было: «Описание каждого языка называет, что в нём считается символом и что тестом. Описаны TypeScript, JavaScript и Python». Добавлены импорты (вопрос 4.3: код вне всех символов, кроме импортов) и JSON Schema (вопрос 4.4).");
  links(k, [R("cites", "s-hheus6f395ynqvc"), R("cites", "s-suv42g8r3ra2h6b")]);
  entries[k].change = "Узел говорит теперь и о SpecTag, которые привязывают код вне всех символов в файле помимо тестов (в первом комментарии файла, после возможного shebang, а в JSON Schema — в `$comment` объекта верхнего уровня), и о JSON Schema как об описанном языке, символы которого — определения в `$defs`, а SpecTag — целые строки их `$comment`. Описание языка называет и импорты; в JSON Schema импорт — только `$schema`. Ряд строк комментария в Python — один комментарий. Заголовок охватывает теперь весь узел.";
  entries[k].stage3 = "languages/ is to describe JSON Schema (a JSON file whose $schema is that of draft 2020-12): its symbols are the definitions under $defs, their SpecTags whole lines of their $comment, and $schema its import, with $defs and $comment no code outside every symbol; each description is to name what is considered an import. code.ts is to read the SpecTags of the code outside every symbol, in a file other than tests, from the file's first comment where that comment precedes any code other than a shebang and is not directly above a symbol, a run of Python comment lines counting as one comment, and in JSON Schema from the top-level $comment. Tests for each are written first and carry this sid.";
}
{
  const k = bq("s-2x58az67bm6cxq2", "None: carries out question 4.3 of the questions about the base specification, option A (rule 1.5.2 and row 10.1.26), which the owner agreed to on 2026-11-25");
  insertAfter(k, "A commit changes a symbol, a test or a file bound as a whole where",
    P("In each file of the system's code other than tests, if a description covers the file's language (§s-33fw3ga4ctd94dq), the SpecSheriff tools treat the code outside every symbol, other than imports, as one more symbol of that file. That symbol holds that code alone. A finding names it by the file alone.",
      "В каждом файле кода системы помимо тестов, если язык файла охватывает описание (§s-33fw3ga4ctd94dq), инструменты SpecSheriff считают код вне всех символов, кроме импортов, ещё одним символом этого файла. В этот символ входит только этот код. Находка называет его только по файлу.",
      "Новое по вопросу 4.3, вариант А: такой код привязывают SpecTag в начале файла (§s-kgbzk2ph9e6jfb4), и коммит добавляет, меняет и удаляет его так же, как символ. Тестовые файлы исключены: правило §s-kgbzk2ph9e6jfb4 привязывает так только код помимо тестов."));
  links(k, [R("cites", "s-33fw3ga4ctd94dq")]);
  entries[k].change = "Добавлен абзац: в файле кода системы помимо тестов инструменты SpecSheriff считают код вне всех символов, кроме импортов, ещё одним символом файла, в который входит только этот код, поэтому коммит добавляет, меняет и удаляет его так же, как символ.";
  entries[k].stage3 = "binding.ts (readCommit) is to compare the code outside every symbol of a file, imports aside, between the two versions as it compares a symbol. A test is written first and carries this sid.";
}
{
  const k = bq("proposal:s-weuyx98r7c923ab", "None: carries out question 4.3 of the questions about the base specification, option A (rule 1.5.2 and row 10.1.26), which the owner agreed to on 2026-11-25");
  insertAfter(k, "`sheriff untagged` lists",
    P("`sheriff untagged` names the code outside every symbol of a file, which the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), by the file's name alone.",
      "Код файла вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), `sheriff untagged` называет только именем файла.",
      "Новое по вопросу 4.3, вариант А: такой код тоже должен быть привязан SpecTag в начале файла."));
  links(k, [R("cites", "s-2x58az67bm6cxq2")]);
  entries[k].change = "Добавлено предложение: код вне всех символов перечисляется под именем файла.";
  entries[k].stage3 = "sheriff untagged is to list the code outside every symbol of a file that no SpecTag binds, under the file's name. A test is written first and carries this sid.";
}
{
  const k = bq("s-9rtrj24myzjvshu", "None: carries out questions 4.3, option A, and 4.4, option B, of the questions about the base specification (rule 1.5.2 and row 10.1.26), which the owner agreed to on 2026-11-25");
  insertAfter(k, "a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag",
    L("in a file whose language a description covers (§s-33fw3ga4ctd94dq), the code outside every symbol, other than imports (§s-2x58az67bm6cxq2), that no SpecTag binds;",
      "в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), код вне всех символов, кроме импортов (§s-2x58az67bm6cxq2), который не привязывает ни один SpecTag;",
      "Новое по вопросу 4.3, вариант А: такой код привязывают SpecTag в начале файла."));
  setPart(k, "in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment",
    "in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment, or in JSON Schema in the `$comment` of any object, other than one that holds the SpecTags of a symbol or of the code outside every symbol;",
    "в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), SpecTag в любом комментарии, а в JSON Schema — в `$comment` любого объекта, кроме тех, что содержат SpecTag символа или кода вне всех символов;",
    "Было: «…SpecTag в любом комментарии, кроме комментария непосредственно над символом». Добавлены SpecTag кода вне всех символов (вопрос 4.3) и `$comment` JSON Schema (вопрос 4.4).");
  setPart(k, "an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part",
    "an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, for a file whose format allows comments, or for a file whose language a description covers;",
    "запись в файле привязок (§s-trwczfskj5zmuft) для файла, который не относится к коду системы помимо тестов, для файла, формат которого допускает комментарии, или для файла на языке, для которого есть описание;",
    "Было: «…для файла, который не относится к коду системы помимо тестов или формат которого допускает комментарии». По вопросу 4.4, вариант Б, файл привязок служит только файлу без комментариев, символы которого проверки не могут определить; файл на JSON Schema привязывается через `$comment`.");
  entries[k].change = "Добавлен пункт о коде вне всех символов, который не привязан ни одним SpecTag (вопрос 4.3). SpecTag на своём месте — это и SpecTag кода вне всех символов, а в JSON Schema — в `$comment` (вопрос 4.4). Запись в файле привязок для файла на описанном языке отвергается (вопрос 4.4).";
  entries[k].stage3 = "binding.ts is to refuse, in what the commit adds or changes, code outside every symbol that no SpecTag binds, to accept the SpecTags of that code in the file's first comment and in the top-level $comment of a file in JSON Schema, to accept a definition's SpecTags in its $comment, and to refuse an entry in sheriff.bindings.json for a file whose language a description covers. Tests for each are written first and carry this sid.";
}
{
  const k = bq("proposal:new-tools-7-3-review-code", "None: carries out question 4.3 of the questions about the base specification, option A (rule 1.5.2 and row 10.1.26), which the owner agreed to on 2026-11-25");
  insertAfter(k, "each test that the commit adds or changes.",
    P("Where the commit adds or changes the code outside every symbol of a file, which the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), `sheriff review` gives the reviewer that code in the same way.",
      "Если коммит добавляет или меняет код файла вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), `sheriff review` передаёт рецензенту этот код так же.",
      "Новое по вопросу 4.3, вариант А: рецензент получает и такой код, если коммит его добавляет или меняет, вместе с SpecTag в начале файла."));
  entries[k].change = "Добавлено предложение: рецензент получает и код файла вне всех символов, который коммит добавляет или меняет.";
  entries[k].stage3 = "review.ts is to give the reviewer the code outside every symbol of a file where the commit adds or changes it, with the SpecTags at the file's start. A test is written first and carries this sid.";
}
{
  const k = bq("s-suv42g8r3ra2h6b", "None: carries out question 4.4 of the questions about the base specification, option B, under which each definition of a file of RuntimeChecks is bound by a SpecTag in its `$comment`; the owner agreed to it on 2026-11-25");
  setPart(k, "Each type has the SpecTag",
    "Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has that SpecTag as the first line of its `$comment`, before any text of the `$comment` of the RecordType's `schema`. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).",
    "У каждого типа есть SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) с sid его RecordType (§s-ktfstpv8rurznrp) в комментарии прямо над ним (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` на TypeScript и `# @spec <sid>` на Python. У каждого определения этот SpecTag — первая строка его `$comment`, перед любым текстом `$comment` из `schema` RecordType. У каждого определения `$anchor` — это sid его RecordType, по которому на него указывает `$ref` в другом определении (§s-4npdup7mjkva69y).",
    "Добавлено второе предложение по вопросу 4.4, вариант Б: каждое определение привязано к своему RecordType SpecTag в своём `$comment`, а не записью в файле привязок для всего файла.");
  insertAfter(k, "A file of RuntimeChecks holds one JSON Schema document",
    P("`sheriff types` writes a file of RuntimeChecks only where the file holds at least one definition.",
      "Файл RuntimeChecks `sheriff types` записывает, только если в нём есть хотя бы одно определение.",
      "Новое: правило было в удаляемом узле §s-h5rfyy9j8nnhx62, и ни один другой узел его не говорит."));
  entries[k].change = "Добавлено предложение: SpecTag RecordType — первая строка `$comment` каждого определения, перед текстом `$comment` из `schema` RecordType. Сюда перенесено из удаляемого узла §s-h5rfyy9j8nnhx62 правило: файл RuntimeChecks записывается, только если в нём есть хотя бы одно определение.";
  entries[k].stage3 = "types.ts is to write each definition's $comment with the SpecTag of its RecordType as its first line, followed by the text of the $comment of the RecordType's schema, if any, and to write no entry in sheriff.bindings.json. A test is written first and carries this sid.";
}
{
  const k = bq("proposal:s-dbk2vyeg8z5jxna-g7", "None: carries out question 4.4 of the questions about the base specification, option B: the entry in the bindings file for a file of RuntimeChecks is no longer written; the owner agreed to it on 2026-11-25");
  removePart(k, "`sheriff binding` also refuses the bindings file", null);
  entries[k].proposal.removed[0] = `Удалено по вопросу 4.4, вариант Б, вместе с узлом §s-h5rfyy9j8nnhx62: ${entries[k].proposal.removed[0]}`;
  links(k, [], ["s-trwczfskj5zmuft", "s-h5rfyy9j8nnhx62"]);
  entries[k].change = "Удалён абзац о записи в файле привязок для файла RuntimeChecks: по вопросу 4.4, вариант Б, каждое определение привязано SpecTag в своём `$comment`, а сравнение сгенерированного файла с тем, что генерирует `sheriff types`, охватывает и эти SpecTag.";
  entries[k].stage3 = "binding.ts generatedCopies is not to compare an entry of sheriff.bindings.json for a file of RuntimeChecks; the agreed draft's note on that comparison lapses.";
}
// The node on the entry in the bindings file, recorded as removed
{
  const baseKey = "new:tools-17-bindings-entry";
  const b = before[baseKey] ?? fail(`no draft ${baseKey}`);
  if (!b.agreed) fail(`${baseKey} is not agreed`);
  entries["proposal:new-tools-17-bindings-entry-bq"] = {
    question: "None: carries out question 4.4 of the questions about the base specification, option B: each definition of a file of RuntimeChecks is bound by a SpecTag in its `$comment`, so no entry in the bindings file is written for that file; the owner agreed to it on 2026-11-25",
    base: baseKey,
    location: b.location,
    sidValue: b.sidValue,
    removal: {
      date: DATE,
      reason: "Under question 4.4, option B, each definition of a file of RuntimeChecks is bound by a SpecTag in its `$comment` (s-suv42g8r3ra2h6b), so `sheriff types` writes no entry in the bindings file for that file.",
      replacedBy: "s-suv42g8r3ra2h6b",
      archived: false,
      note: "The node was agreed on 2026-11-25 but never approved in specs/, so it is deleted rather than archived.",
    },
    change: "Узел удаляется по вопросу 4.4, вариант Б: каждое определение файла RuntimeChecks привязано SpecTag в своём `$comment` (§s-suv42g8r3ra2h6b), и запись в файле привязок для такого файла не пишется. Вместе с узлом уходит и правило «файл RuntimeChecks пишется, только если в нём есть хотя бы одно определение»; его больше не говорит ни один узел, поэтому оно добавлено в §s-suv42g8r3ra2h6b. Узел ни разу не был одобрен в `specs/`, поэтому он удаляется, а не переносится в архив.",
    proposal: { title: b.proposal.title, ruTitle: b.proposal.ruTitle, parts: [], removed: [`Удалён весь узел: «${b.proposal.ruText}»`], refs: [], date: DATE, text: "", ruText: "" },
    stage3: "types.ts writes no entry in sheriff.bindings.json for a file of RuntimeChecks; the tests of this node are not written.",
  };
}

// ================================================================ 4.5: a SpecTag outside the system's code
{
  const k = bq("s-m8nmfsxkcfu7cjp", "None: carries out question 4.5 of the questions about the base specification, option B, under which a row checks that a SpecTag outside the system's code names a rule of the guidelines (rule 10.10); the owner agreed to it on 2026-11-25");
  title(k, "A citation or a SpecTag outside the specification", "Ссылка или SpecTag за пределами спецификации");
  insertAfter(k, "Each refusal names the file, the line and the refused text.",
    P("`sheriff citations` also refuses each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) that is outside the system's code (§s-hheus6f395ynqvc) and whose sid names a node that is not a rule of the guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2). The refusal names the file, the line and the SpecTag.",
      "`sheriff citations` отвергает также каждый SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp), который стоит вне кода системы (§s-hheus6f395ynqvc) и sid которого называет узел, не являющийся правилом guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2). Отказ называет файл, строку и этот SpecTag.",
      "Новое по вопросу 4.5, вариант Б: правило §s-sfjka4zc4rhfu67 ограничивает только то, что называет SpecTag вне кода системы, а новая строка основной таблицы это проверяет."));
  setPart(k, "`sheriff citations` makes this check regardless",
    "`sheriff citations` makes these checks regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq, §s-69pwmwyrk6efag2).",
    "`sheriff citations` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-e84nggntkrcyumq, §s-69pwmwyrk6efag2).",
    "Было: «`sheriff citations` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-e84nggntkrcyumq)». Теперь — «эти проверки», и ссылка на новую строку.");
  reason(k, "Outside the specification, a citation or a SpecTag comes with no link to the node that it names (§s-cxtt6jvhqcey2k9). So a sid that names no node, a SpecTag that names anything but a rule of the guidelines (§s-sfjka4zc4rhfu67), or a number in place of a sid would mislead every reader, and no other check would notice it.",
    "За пределами спецификации у ссылки или SpecTag нет связи с узлом, который они называют (§s-cxtt6jvhqcey2k9). Поэтому sid, который не называет ни одного узла, SpecTag, который называет что-либо кроме правила guidelines (§s-sfjka4zc4rhfu67), или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.");
  links(k, [R("implements", BASE.tagOutside), R("cites", "s-sfjka4zc4rhfu67")]);
  entries[k].change = "Добавлен абзац: SpecTag вне кода системы, который называет что-либо кроме правила guidelines, отвергается. Обоснование говорит и о таком SpecTag. Заголовок охватывает теперь и SpecTag; последний абзац говорит «эти проверки».";
  entries[k].stage3 = "binding.ts (citationsOutside) is to refuse, in a file outside the system's code, a SpecTag whose sid names a node that is not a rule of the guidelines. A test is written first and carries this sid.";
}

// ================================================================ 4.7: the metaschema
entries["new:tools-7-1-metaschema"] = {
  question: "None: carries out question 4.7 of the questions about the base specification, which decision R8 of the page on RecordType and JSON Schema (accepted by the owner on 2026-11-19) settles: SpecSheriff's own keywords within a RecordType's `schema` are declared in a vocabulary of its own",
  location: "tools 7.1.18b (new, after “Fields with `enum` that `sheriff validate` accepts”)",
  sidValue: NEW_SID.metaschema,
  change: "Новый узел: метасхема, которая объявляет через `$vocabulary` необязательный словарь SpecSheriff с `identifierOf` и `enumSource`, её файл и `$id`, URI словаря и ссылка на неё из схемы расширения RecordType вместо метасхемы JSON Schema 2020-12.",
  testsFrom: [],
  proposal: {
    title: "The meta-schema of a RecordType's `schema`",
    ruTitle: "Метасхема `schema` RecordType",
    titleChange: NEW,
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the schema of that extension validates the `schema` of each RecordType (§s-6eb92ddch7shuvu) against a meta-schema of SpecSheriff's own, to which it refers by a `$ref`. The SpecSheriff tools provide that meta-schema together with that schema, in the file `specs/_schema/extensions/recordtype-meta.schema.json`, whose `$id` is `recordtype-meta.schema.json`.",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), схема этого расширения проверяет `schema` каждого RecordType (§s-6eb92ddch7shuvu) по собственной метасхеме SpecSheriff, на которую ссылается через `$ref`. Инструменты SpecSheriff поставляют эту метасхему вместе с этой схемой в файле `specs/_schema/extensions/recordtype-meta.schema.json`, `$id` которого — `recordtype-meta.schema.json`."),
      P("The meta-schema's `$vocabulary` declares the vocabularies of JSON Schema 2020-12 and a vocabulary of SpecSheriff's own, `urn:specsheriff:vocabulary:recordtype`, which holds the keywords `identifierOf` and `enumSource` (§s-4npdup7mjkva69y, §s-5nf87c3e3jg9v7c). The meta-schema checks these keywords at any depth within a RecordType's `schema`.",
        "`$vocabulary` метасхемы объявляет словари JSON Schema 2020-12 и собственный словарь SpecSheriff `urn:specsheriff:vocabulary:recordtype`, который содержит ключевые слова `identifierOf` и `enumSource` (§s-4npdup7mjkva69y, §s-5nf87c3e3jg9v7c). Метасхема проверяет эти ключевые слова на любой глубине `schema` RecordType."),
      P("`$vocabulary` marks SpecSheriff's vocabulary as not required, with `false`, so that a JSON Schema tool that does not know that vocabulary can still read a RecordType's `schema`.",
        "`$vocabulary` отмечает словарь SpecSheriff как необязательный значением `false`, чтобы инструмент JSON Schema, который не знает этого словаря, всё равно мог прочитать `schema` RecordType."),
      P("The meta-schema checks the value of each of these keywords as the schema of the RecordType extension defines it, and every other keyword as JSON Schema 2020-12 does.",
        "Метасхема проверяет значение каждого из этих ключевых слов так, как его определяет схема расширения RecordType, а каждое другое ключевое слово — так, как это делает JSON Schema 2020-12."),
    ],
    reason: "The next version of JSON Schema is to refuse a keyword that no declared vocabulary defines. Declared in a vocabulary of SpecSheriff's own, `identifierOf` and `enumSource` stay valid keywords of a RecordType's `schema` without the prefix `x-`.",
    ruReason: "Следующая версия JSON Schema будет отвергать ключевое слово, которого не определяет ни один объявленный словарь. Объявленные в собственном словаре SpecSheriff, `identifierOf` и `enumSource` остаются допустимыми ключевыми словами `schema` RecordType без приставки `x-`.",
    reasonChange: NEW,
    examples: [X(
      "A JSON Schema tool that has loaded the meta-schema reads the `schema` of a RecordType whose field `part` holds `enumSource`, and reports no unknown keyword. The most likely mistake is to leave the schema of the RecordType extension referring to the meta-schema of JSON Schema 2020-12, under which no declared vocabulary defines `enumSource`.",
      "Инструмент JSON Schema, загрузивший метасхему, читает `schema` RecordType, у поля `part` которого есть `enumSource`, и не сообщает о неизвестном ключевом слове. Самая вероятная ошибка — оставить в схеме расширения RecordType ссылку на метасхему JSON Schema 2020-12, при которой `enumSource` не определяет ни один объявленный словарь.")],
    refs: [R("implements", "s-6eb92ddch7shuvu"), R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-4npdup7mjkva69y"), R("cites", "s-5nf87c3e3jg9v7c")],
    meta: { decisions: [{
      date: "2026-11-19",
      problem: "Which convention SpecSheriff's own keywords within a RecordType's `schema` follow: `identifierOf` had no prefix, while the keyword that names the source of a field's values had the prefix `x-` of OpenAPI.",
      ruling: "The owner accepted the page on RecordType and JSON Schema, whose decision R8 chose a vocabulary of SpecSheriff's own, declared through `$vocabulary`. On 2026-11-25 the questions about the base specification applied that decision: `x-enumSource` became `enumSource`, declared with `identifierOf` in that vocabulary.",
      type: "textual",
    }] },
    removed: [],
    date: DATE,
  },
  stage3: "The meta-schema is to be written as specs/_schema/extensions/recordtype-meta.schema.json, with $id recordtype-meta.schema.json and $schema https://json-schema.org/draft/2020-12/schema, its $vocabulary declaring the vocabularies of draft 2020-12 as true and urn:specsheriff:vocabulary:recordtype as false, and checking identifierOf and enumSource at any depth; recordtype.schema.json is to $ref it in place of https://json-schema.org/draft/2020-12/schema for a RecordType's schema, and to name enumSource where it names x-enumSource. A test is written first and carries this sid.",
};

// ================================================================ nodes outside the list that the drafts above require to change
{
  const k = bq("new:tools-7-2-outside", "None: carries out question 4.3 of the questions about the base specification, option A: the agreed node on SpecTags on the system's code (s-9rtrj24myzjvshu) hands this check the code outside every symbol of a file that the commit leaves unchanged; the owner agreed to it on 2026-11-25");
  setPart(k, "in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol",
    "in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4), the code outside every symbol of a file (§s-2x58az67bm6cxq2) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that no SpecTag binds (§s-9rtrj24myzjvshu);",
    "в коде системы (§s-hheus6f395ynqvc), кроме тестов, — символ (§s-kgbzk2ph9e6jfb4), код файла вне всех символов (§s-2x58az67bm6cxq2) или файл, который должен быть привязан целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), если его не привязывает ни один SpecTag (§s-9rtrj24myzjvshu);",
    "Было: «…символ (§s-kgbzk2ph9e6jfb4) или файл, который должен быть привязан целиком…». Добавлен код файла вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2): §s-9rtrj24myzjvshu передаёт этой проверке такой код, если коммит его не меняет.");
  entries[k].change = "Первый пункт называет и код файла вне всех символов, кроме тестов, который не привязан ни одним SpecTag (вопрос 4.3, вариант А).";
  entries[k].stage3 = "binding.ts is to count, among the unchanged code that no SpecTag binds, the code outside every symbol of a file other than tests, imports aside. A test is written first and carries this sid.";
}
{
  const k = bq("new:tools-7-2-changed-line", "None: carries out question 4.4 of the questions about the base specification, option B: a definition of a file in JSON Schema carries its SpecTags in its `$comment`, which JSON Schema 2020-12 makes a comment; the owner agreed to it on 2026-11-25");
  insertAfter(k, "each comment, other than the file's first line",
    L("in a file in JSON Schema (§s-33fw3ga4ctd94dq), the text of each `$comment`, other than the SpecTags in it;",
      "в файле на JSON Schema (§s-33fw3ga4ctd94dq) — текст каждого `$comment`, кроме SpecTag в нём;",
      "Новое по вопросу 4.4, вариант Б: JSON Schema 2020-12 Core (§8.3) делает `$comment` комментарием, а грамматика JSON видит в нём строку. Без этого пункта правка текста `$comment` меняла бы определение, хотя код не изменился. Изменение SpecTag по-прежнему засчитывает §s-2x58az67bm6cxq2."));
  entries[k].change = "Добавлен пункт: в файле на JSON Schema из сравниваемых деревьев исключается текст каждого `$comment`, кроме SpecTag в нём.";
  entries[k].stage3 = "diff.ts is to leave out of the trees of a file in JSON Schema the text of each $comment, keeping the SpecTags in it. A test is written first and carries this sid.";
}
{
  const k = bq("s-qqs2svksmjct753", "None: carries out question 4.3 of the questions about the base specification, option A: the code outside every symbol of a file is bound by SpecTags at the file's start, so a commit that changes it must name the rules that those SpecTags name; the owner agreed to it on 2026-11-25");
  setPart(k, "In this check, the code means the symbols",
    "In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4), the code outside every symbol that the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.",
    "В этой проверке код — это символы (§s-kgbzk2ph9e6jfb4), код вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), и файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), в коде системы (§s-hheus6f395ynqvc), кроме тестов. Их SpecTag `sheriff commit-message` читает в том виде, в каком их оставляет коммит.",
    "Было: «…код — это символы (§s-kgbzk2ph9e6jfb4) и файлы, привязанные целиком…». Добавлен код вне всех символов: символ здесь — именованная единица кода, и без этого коммит, который меняет только такой код, не называл бы правил из SpecTag в начале файла.");
  entries[k].change = "В этой проверке код включает теперь и код вне всех символов, который инструменты SpecSheriff считают ещё одним символом (вопрос 4.3, вариант А).";
  entries[k].stage3 = "message.ts (changedTags) is to count the code outside every symbol that the commit adds or changes, with the SpecTags at the file's start. A test is written first and carries this sid.";
}
{
  const k = bq("s-nk8td3ez58gahc4", "None: carries out question 4.4 of the questions about the base specification, option B, under which each definition of a file of RuntimeChecks carries a SpecTag in its `$comment`; the owner agreed to it on 2026-11-25");
  setPart(k, "The union is written",
    "The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union[\"<member>\", …]` in Python. The union has the SpecTag (§s-5z5gnu7pahr82xp) of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type has the SpecTag of the variant, and the type for the combinations that have no variant has the SpecTag of the RecordType. A variant's definition has the SpecTag of the variant as the first line of its `$comment`, as the definition of any RecordType does (§s-suv42g8r3ra2h6b).",
    "Объединение пишется как `export type <name> = <member> | …` на TypeScript и как `<name> = Union[\"<member>\", …]` на Python. У объединения есть SpecTag (§s-5z5gnu7pahr82xp) RecordType. У каждого члена есть SpecTag того RecordType, из которого он получен: у типа варианта есть SpecTag варианта, а у типа для сочетаний, у которых нет варианта, — SpecTag RecordType. У определения варианта SpecTag варианта — первая строка его `$comment`, как у определения любого RecordType (§s-suv42g8r3ra2h6b).",
    "Добавлено последнее предложение по вопросу 4.4, вариант Б: узел говорил, какой SpecTag у типа варианта, но не говорил, какой у его определения.");
  entries[k].change = "Добавлено предложение: у определения варианта SpecTag варианта — первая строка его `$comment`.";
  entries[k].stage3 = "types.ts is to write the SpecTag of the variant as the first line of the $comment of the variant's definition. A test is written first and carries this sid.";
}

// ================================================================ round c: the second review and EngStickler's fast reader (fix-brief-fo-c.md)
function once(k, s, a, b) {
  if (typeof s !== "string" || s.split(a).length !== 2) fail(`${k}: expected once «${String(a).slice(0, 70)}»`);
  return s.replace(a, () => b);
}
// Replaces passages in a part. A part that was as agreed records what it said; a part already new keeps its note.
function rp(k, start, pairs, note) {
  const x = parts(k)[at(k, start)];
  const oldRu = x.ru;
  for (const [ef, et, rf, rt] of pairs) { x.en = once(k, x.en, ef, et); x.ru = once(k, x.ru, rf, rt); }
  if (note) x.change = note;
  else if (x.change === SAME) x.change = `Было: «${oldRu}».`;
}
function rr(k, ef, et, rf, rt) {
  const p = entries[k].proposal;
  const oldRu = p.ruReason;
  p.reason = once(k, p.reason, ef, et);
  p.ruReason = once(k, p.ruReason, rf, rt);
  if (p.reasonChange === SAME) p.reasonChange = `Было: «${oldRu}».`;
}
{
  // s-yhe32vrbygjyd66
  const k = "new:tools-7-1-ref-names";
  const p = entries[k].proposal;
  p.reason = "A `$ref` that names no RecordType leaves `sheriff types` unable to generate any file (§s-suv42g8r3ra2h6b). `sheriff validate` runs on every change, so it finds such a `$ref` even in a project whose stack lists no file of types or RuntimeChecks.";
  p.ruReason = "`$ref`, который не называет RecordType, не даёт `sheriff types` сгенерировать ни одного файла (§s-suv42g8r3ra2h6b). `sheriff validate` выполняется при каждом изменении, поэтому находит такой `$ref` даже в проекте, стек которого не перечисляет ни файла типов, ни файла RuntimeChecks.";
  links(k, [R("cites", "s-suv42g8r3ra2h6b")], ["s-e877bnfa559tvk9"]);
}
{
  // s-c2r9jndrjbtbsv6
  const k = "proposal:s-c2r9jndrjbtbsv6-bq";
  links(k, [], ["s-xfu2gpzddjnmgks", "s-jau82aq9juv9zzh"]);
  rp(k, "When `sheriff validate` validates the files against the schema", [["It also refuses there a RecordType variant", "At the same step, it also refuses a RecordType variant", "Там же он отвергает вариант RecordType", "На том же шаге он отвергает также вариант RecordType"]]);
}
{
  // s-g7auhqvzzbkw644
  const k = "new:tools-7-1-appendix-sections";
  rp(k, "`sheriff validate` accepts each section of the technical appendix", [[
    "It leaves out the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, which hold the stack section and the technical debt section (§s-vj7ercem526zd6v).",
    "It skips the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, the files that hold the stack section and the technical debt section (§s-vj7ercem526zd6v).",
    "Он пропускает разделы `specs/tech/stack.json` и `specs/tech/debt.json`, которые содержат раздел стека и раздел технического долга (§s-vj7ercem526zd6v).",
    "Он пропускает разделы `specs/tech/stack.json` и `specs/tech/debt.json` — файлов, которые содержат раздел стека и раздел технического долга (§s-vj7ercem526zd6v)."]]);
  rp(k, "The path of titles of a section is", [[
    "The path of titles of a section is the titles of the sections that hold it, from the top down, followed by the section's own title.",
    "The path of titles of a section consists of the titles of the sections that hold it, from the top down, followed by the section's own title.",
    "Путь заголовков раздела — это названия разделов, которые его содержат, сверху вниз, а за ними название самого раздела.",
    "Путь заголовков раздела — это заголовки разделов, которые его содержат, сверху вниз, а за ними заголовок самого раздела."]]);
  rp(k, "Where a file of the technical appendix, `specs/tech/<folder>.json`", [[
    "and `sheriff validate` looks for the section with the same path of titles in that folder.",
    "and `sheriff validate` looks for the section with the same path of titles in that folder. `sheriff validate` also skips that node itself.",
    "Поэтому путь заголовков раздела этого файла начинается ниже этого узла. Раздел базовой спецификации с тем же путём заголовков находится в этой папке.",
    "Поэтому путь заголовков раздела этого файла начинается ниже этого узла, и `sheriff validate` ищет раздел с тем же путём заголовков в этой папке. Сам этот узел `sheriff validate` тоже пропускает."]]);
}
{
  // s-33fw3ga4ctd94dq
  const k = "proposal:new-tools-8-symbol-bq";
  rp(k, "In a file whose language is described in the folder", [[
    "directly above the symbol, above its decorators where it has any",
    "directly above the symbol or, where the symbol has decorators, directly above its first decorator",
    "непосредственно над символом, над его декораторами, если они есть",
    "непосредственно над символом или, если у символа есть декораторы, непосредственно над его первым декоратором"]]);
  setPart(k, "A JSON file is in JSON Schema where",
    "A JSON file is written in JSON Schema if its top-level object's `$schema` is `https://json-schema.org/draft/2020-12/schema`. In JSON Schema, whose JSON syntax allows no comments, the symbols of a file are the definitions under the `$defs` of its top-level object. A definition's SpecTags are whole lines of the string in its `$comment`, in place of a comment above the definition (§s-kgbzk2ph9e6jfb4). The `$schema` of the top-level object is considered the file's import.",
    "Файл JSON написан на JSON Schema, если `$schema` его объекта верхнего уровня — `https://json-schema.org/draft/2020-12/schema`. В JSON Schema, синтаксис JSON которой не допускает комментариев, символы файла — это определения в `$defs` его объекта верхнего уровня. SpecTag определения — это целые строки текста в его `$comment`, вместо комментария над определением (§s-kgbzk2ph9e6jfb4). `$schema` объекта верхнего уровня считается импортом файла.",
    parts(k)[at(k, "A JSON file is in JSON Schema where")].change);
  rp(k, "Only the delimiters of the comment may share", [[
    "Only the delimiters of the comment may share a SpecTag's line.",
    "Only the delimiters of the comment may share a SpecTag's line. In JSON Schema, a SpecTag's line is a line of the string in the `$comment`.",
    "Делить строку с SpecTag могут только ограничители комментария.",
    "Делить строку с SpecTag могут только ограничители комментария. В JSON Schema строка SpecTag — это строка текста в `$comment`."]]);
  setPart(k, "A shebang, a first line that opens with",
    "A shebang, a first line that opens with `#!`, may come before the file's first comment. In Python, where a shebang has the form of a comment, the file's first comment is the first comment after the shebang.",
    "Перед первым комментарием файла может стоять shebang — первая строка, которая начинается с `#!`. В Python, где shebang имеет вид комментария, первый комментарий файла — это первый комментарий после shebang.",
    parts(k)[at(k, "A shebang, a first line that opens with")].change);
  rp(k, "In JSON Schema, the keys of the top-level object", [[
    "In JSON Schema, the keys of the top-level object other than the definitions under `$defs`, that is `$schema`, `$defs` itself and `$comment`, are not code outside every symbol.",
    "In JSON Schema, the code outside every symbol consists of each key of the top-level object, with its value, except `$schema`, `$defs` and `$comment`.",
    "В JSON Schema ключи объекта верхнего уровня, кроме определений в `$defs`, — то есть `$schema`, сам `$defs` и `$comment` — не являются кодом вне всех символов.",
    "В JSON Schema код вне всех символов — это каждый ключ объекта верхнего уровня вместе с его значением, кроме `$schema`, `$defs` и `$comment`."]]);
  rp(k, "The SpecSheriff tools find the symbol that a SpecTag is above", [[
    "the symbol that a SpecTag is above", "the symbol that a SpecTag binds",
    "Символ, над которым стоит SpecTag,", "Символ, который привязывает SpecTag,"]]);
}
{
  // s-2x58az67bm6cxq2
  const k = "proposal:s-2x58az67bm6cxq2-bq";
  rp(k, "A commit also changes each symbol, file bound as a whole and test whose SpecTags", [[
    "A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both.",
    "A commit changes the SpecTags of a symbol, file or test where at least one SpecTag binds it in the commit's parent but not after the commit, or after the commit but not in its parent.",
    "Коммит меняет SpecTag символа, файла или теста, если SpecTag привязывает его либо в родительском коммите, либо после коммита, но не в обоих случаях.",
    "Коммит меняет SpecTag символа, файла или теста, если хотя бы один SpecTag привязывает его в родительском коммите, но не после коммита, или после коммита, но не в его родительском коммите."]]);
  rp(k, "The exception is a SpecTag that binds", [[
    "The exception is a SpecTag that binds", "Neither kind includes a SpecTag that binds",
    "Исключение — SpecTag, который привязывает", "Ни один из этих видов не включает SpecTag, который привязывает"]]);
}
{
  // s-rd9nftptjuz6bwv
  const k = "proposal:new-tools-7-3-review-code-bq";
  rp(k, "the changed code other than tests leaves out something", [[
    "or that the commit's message names outside an `Implementation-Needs-No-Change` trailer", "or by a rule that the commit's message names anywhere other than in an `Implementation-Needs-No-Change` trailer",
    "называет иначе, чем в trailer `Implementation-Needs-No-Change`", "называет где угодно, кроме trailer `Implementation-Needs-No-Change`"]]);
}
{
  // s-suv42g8r3ra2h6b: the sentence on an empty file of RuntimeChecks goes with the bindings entry
  const k = "proposal:s-suv42g8r3ra2h6b-bq";
  parts(k).splice(at(k, "`sheriff types` writes a file of RuntimeChecks only where"), 1);
  entries[k].change = "Добавлено предложение: SpecTag RecordType — первая строка `$comment` каждого определения, перед текстом `$comment` из `schema` RecordType.";
  entries["proposal:new-tools-17-bindings-entry-bq"].change = "Узел удаляется по вопросу 4.4, вариант Б: каждое определение файла RuntimeChecks привязано SpecTag в своём `$comment` (§s-suv42g8r3ra2h6b), и запись в файле привязок для такого файла не пишется. Вместе с записью отпадает и правило о том, что пустой файл RuntimeChecks не пишется: оно было нужно только для того, чтобы не появлялась запись без SpecTag. Узел ни разу не был одобрен в `specs/`, поэтому он удаляется, а не переносится в архив.";
}
{
  // s-j4t9vusnsajmqdw
  const k = "new:tools-7-1-metaschema";
  rp(k, "Where the project has chosen the RecordType extension", [[
    "The SpecSheriff tools provide that meta-schema together with that schema, in the file `specs/_schema/extensions/recordtype-meta.schema.json`, whose `$id` is `recordtype-meta.schema.json`.",
    "The SpecSheriff tools keep that meta-schema in the file `recordtype-meta.schema.json`, in the same folder as that schema (§s-zefk589ykh37b8u). The meta-schema's `$id` is `recordtype-meta.schema.json`.",
    "Инструменты SpecSheriff поставляют эту метасхему вместе с этой схемой в файле `specs/_schema/extensions/recordtype-meta.schema.json`, `$id` которого — `recordtype-meta.schema.json`.",
    "Инструменты SpecSheriff хранят эту метасхему в файле `recordtype-meta.schema.json` в той же папке, что и эту схему (§s-zefk589ykh37b8u). `$id` метасхемы — `recordtype-meta.schema.json`."]], NEW);
  rp(k, "The meta-schema's `$vocabulary` declares", [
    ["`urn:specsheriff:vocabulary:recordtype`", "`https://github.com/non4me/SpecSheriff/vocab/recordtype`", "`urn:specsheriff:vocabulary:recordtype`", "`https://github.com/non4me/SpecSheriff/vocab/recordtype`"],
    [" The meta-schema checks these keywords at any depth within a RecordType's `schema`.", "", " Метасхема проверяет эти ключевые слова на любой глубине `schema` RecordType.", ""]], NEW);
  setPart(k, "`$vocabulary` marks SpecSheriff's vocabulary",
    "The meta-schema's `$vocabulary` marks SpecSheriff's vocabulary as optional by giving it the value `false`. So a JSON Schema tool that takes the meta-schema as the meta-schema of a RecordType's `schema`, but does not know that vocabulary, still processes that `schema`.",
    "`$vocabulary` метасхемы отмечает словарь SpecSheriff как необязательный значением `false`. Поэтому инструмент JSON Schema, который берёт эту метасхему как метасхему `schema` RecordType, но не знает этого словаря, всё равно обрабатывает эту `schema`.",
    NEW);
  rp(k, "The meta-schema checks the value of each of these keywords", [[
    "The meta-schema checks the value of each of these keywords", "At any depth within a RecordType's `schema`, the meta-schema checks the value of each of these keywords",
    "Метасхема проверяет значение каждого из этих ключевых слов", "На любой глубине `schema` RecordType метасхема проверяет значение каждого из этих ключевых слов"]], NEW);
  const p = entries[k].proposal;
  p.reason = once(k, p.reason, "The next version of JSON Schema is to refuse a keyword", "The JSON Schema project has announced that its next release will refuse a keyword");
  p.ruReason = once(k, p.ruReason, "Следующая версия JSON Schema будет отвергать ключевое слово", "Проект JSON Schema объявил, что его следующий выпуск будет отвергать ключевое слово");
  links(k, [R("cites", "s-zefk589ykh37b8u")]);
  entries[k].stage3 = once(k, entries[k].stage3, "urn:specsheriff:vocabulary:recordtype", "https://github.com/non4me/SpecSheriff/vocab/recordtype");
  entries[k].change = "Новый узел: метасхема, которая объявляет через `$vocabulary` необязательный словарь SpecSheriff с `identifierOf` и `enumSource`, её файл и `$id`, URI словаря и ссылка на неё из схемы расширения RecordType вместо метасхемы JSON Schema 2020-12.";
}
{
  // s-zefk589ykh37b8u: the file of the meta-schema in the list of the files of the extension schemas (decision 4.7)
  const k = bq("s-zefk589ykh37b8u", "None: carries out question 4.7 of the questions about the base specification, which decision R8 of the page on RecordType and JSON Schema settles: the meta-schema of a RecordType's `schema` (s-j4t9vusnsajmqdw) is a file of its own beside the schema of the RecordType extension");
  entries[k].sidValue = "s-zefk589ykh37b8u";
  const row = "The schema of each extension of the guidelines that has one";
  const i = parts(k).findIndex((x) => x.kind === "tr" && x.en[0] === row);
  if (i < 0) fail(`${k}: no row «${row}»`);
  const r = parts(k)[i];
  const added = {
    kind: "tr",
    en: ["The meta-schema of a RecordType's `schema` (§s-j4t9vusnsajmqdw)", "`guidelines/_schema/extensions/recordtype-meta.schema.json`", "`specs/_schema/extensions/recordtype-meta.schema.json`"],
    ru: ["Метасхема `schema` RecordType (§s-j4t9vusnsajmqdw)", "`guidelines/_schema/extensions/recordtype-meta.schema.json`", "`specs/_schema/extensions/recordtype-meta.schema.json`"],
    change: "Новая строка по вопросу 4.7: метасхема `schema` RecordType — отдельный файл рядом со схемой расширения RecordType.",
  };
  parts(k).splice(i + 1, 0, added);
  const line = (cells) => `| ${cells.join(" | ")} |`;
  const p = entries[k].proposal;
  p.text = once(k, p.text, `${line(r.en)}\n`, `${line(r.en)}\n${line(added.en)}\n`);
  p.ruText = once(k, p.ruText, `${line(r.ru)}\n`, `${line(r.ru)}\n${line(added.ru)}\n`);
  links(k, [R("cites", NEW_SID.metaschema)]);
  entries[k].change = "В список файлов схем расширений добавлена строка: метасхема `schema` RecordType (§s-j4t9vusnsajmqdw) в `guidelines/_schema/extensions/recordtype-meta.schema.json` в папке инструментов SpecSheriff и в `specs/_schema/extensions/recordtype-meta.schema.json` в этом репозитории.";
  entries[k].stage3 = "copy-assets and the build of the tools are to place recordtype-meta.schema.json beside recordtype.schema.json in guidelines/_schema/extensions/ and specs/_schema/extensions/.";
}
{
  // s-u6mj5yv8ngnz79v
  const k = "proposal:new-tools-7-2-changed-line-bq";
  setPart(k, "in a file in JSON Schema (§s-33fw3ga4ctd94dq), the text of each `$comment`",
    "in a file in JSON Schema (§s-33fw3ga4ctd94dq), each `$comment`, other than the SpecTags in it;",
    "в файле на JSON Schema (§s-33fw3ga4ctd94dq) — каждый `$comment`, кроме SpecTag в нём;",
    parts(k)[at(k, "in a file in JSON Schema (§s-33fw3ga4ctd94dq), the text of each `$comment`")].change);
  entries[k].change = "Добавлен пункт: в файле на JSON Schema из сравниваемых деревьев исключается каждый `$comment`, кроме SpecTag в нём.";
  entries[k].stage3 = "diff.ts is to leave out of the trees of a file in JSON Schema each $comment key with its value, except the SpecTags in it. A test is written first and carries this sid.";
}
{
  // s-76becsjwmasc2r2
  const k = "new:tools-7-1-term-domain";
  setPart(k, "Where the project has chosen the Domains extension",
    "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` compares the place where each term node (§s-ypa92gpcj3f5zj8) of the base specification is defined with the places of the nodes that cite it or link to it (§s-cb9rbh8q88a84xp). It refuses each of the following:",
    "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` сравнивает место, где определён каждый узел-термин (§s-ypa92gpcj3f5zj8) базовой спецификации, с местами узлов, которые ссылаются на него или связаны с ним (§s-cb9rbh8q88a84xp). Он отвергает каждое из следующего:",
    NEW);
  rp(k, "a term node in the contracts section", [[
    "where every such node is in the same domain or in the part", "where all such nodes are in a single domain or in the part",
    "находится в одном и том же домене или в части", "находится в одном и том же домене или в части"]], NEW);
  const p = entries[k].proposal;
  p.reason = once(k, p.reason, "Where a term is defined follows from which nodes cite it or link to it.", "The place where a term is defined is determined by which nodes cite it or link to it.");
  p.ruReason = once(k, p.ruReason, "Где определён термин, следует из того, какие узлы ссылаются на него или связаны с ним.", "Место, где определён термин, следует из того, какие узлы ссылаются на него или связаны с ним.");
}
{
  // s-gvafe6bnstwab8b
  const k = "proposal:s-gvafe6bnstwab8b-bq";
  rp(k, "Where the project has chosen the Domains extension", [["a JSON file under `specs/tech/`", "a JSON file at any depth in `specs/tech/`", "файл JSON в `specs/tech/`", "файл JSON на любой глубине в `specs/tech/`"]]);
  rp(k, "`sheriff validate` refuses any other JSON file under", [["any other JSON file under `specs/tech/`", "any other JSON file at any depth in `specs/tech/`", "Любой другой файл JSON в `specs/tech/`", "Любой другой файл JSON на любой глубине в `specs/tech/`"]]);
  const p = entries[k].proposal;
  p.reason = once(k, p.reason, "A JSON file under `specs/tech/`", "A JSON file at any depth in `specs/tech/`");
  p.ruReason = once(k, p.ruReason, "Файл JSON в `specs/tech/`", "Файл JSON на любой глубине в `specs/tech/`");
}
{
  // s-m8nmfsxkcfu7cjp
  const k = "proposal:s-m8nmfsxkcfu7cjp-bq";
  const p = entries[k].proposal;
  p.reason = once(k, p.reason, "no other check would notice it.", "no other check would notice any of them.");
  p.ruReason = once(k, p.ruReason, "и ни одна другая проверка этого бы не заметила.", "и ни одна другая проверка не заметила бы ни одного из них.");
}
{
  // s-qqs2svksmjct753
  const k = "proposal:s-qqs2svksmjct753-bq";
  setPart(k, "In this check, the code means the symbols",
    "This check counts as code the following parts of the system's code (§s-hheus6f395ynqvc), other than tests: the symbols (§s-kgbzk2ph9e6jfb4), the code outside every symbol that the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft). `sheriff commit-message` reads their SpecTags as the commit leaves them.",
    "Кодом эта проверка считает символы (§s-kgbzk2ph9e6jfb4), код вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), и файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), в коде системы (§s-hheus6f395ynqvc), кроме тестов. Их SpecTag `sheriff commit-message` читает в том виде, в каком их оставляет коммит.",
    parts(k)[at(k, "In this check, the code means the symbols")].change);
  rp(k, "For a merge commit, `sheriff commit-message` counts", [[
    "only the code that the merge adds or changes relative to each of its parents", "only the code that differs from its version in every parent of the merge",
    "только код, который слияние добавляет или меняет относительно каждого из своих родителей", "только код, который отличается от своей версии в каждом родителе слияния"]]);
}
{
  // s-nk8td3ez58gahc4
  const k = "proposal:s-nk8td3ez58gahc4-bq";
  rr(k, "in the form that each language has for fields that depend on the value of another field", "with the construct that each language provides for fields that depend on the value of another field",
    "в той форме, которая есть в каждом языке для полей, зависящих от значения другого поля", "с помощью той конструкции, которую каждый язык даёт для полей, зависящих от значения другого поля");
}

// ================================================================ the checks
const problems = [];
const longSentences = [];
const targets = new Set();
{
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c?.node) walk(c.node);
  };
  read("../../specs/_guidelines/tools.json").nodes.forEach(walk);
  read("moved/specs/_guidelines/spec.json").nodes.forEach(walk);
  for (const f of fs.readdirSync(new URL("moved/specs/_guidelines/extensions/", here))) read(`moved/specs/_guidelines/extensions/${f}`).nodes.forEach(walk);
  for (const [k, d] of Object.entries(before)) { const s = d?.sidValue || (k.startsWith("s-") ? k : null); if (s) targets.add(s); }
  Object.values(NEW_SID).forEach((s) => targets.add(s));
}
function read(f) { return JSON.parse(fs.readFileSync(new URL(f, here), "utf8")); }
const toolsNodes = new Map();
{ const walk = (n) => { if (n.sid) toolsNodes.set(n.sid, n); (n.children || []).forEach(walk); }; read("../../specs/_guidelines/tools.json").nodes.forEach(walk); }
const render = (ps, key) => { const out = []; for (const x of ps) out.push(x.kind === "p" ? (out.length ? "\n" : "") + x[key] : `- ${x[key]}`); return out.join("\n"); };
const citedIn = (s) => [...String(s ?? "").matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const bare = (s) => String(s ?? "").match(/s-[2-9a-hjkmnp-z]{15}/g) || [];
const ticks = (s) => [...new Set([...String(s ?? "").matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
function baseChain(k) { const out = []; let b = entries[k]?.base ?? null; while (b && before[b]) { out.push(before[b]); b = before[b].base; } return out; }
for (const [k, e] of Object.entries(entries)) {
  const p = e.proposal;
  if (e.removal) continue;
  // A draft whose text holds tables keeps the text that the script edits by hand; any other is rendered from its parts.
  if (!p.parts.some((x) => x.kind === "tr" || x.kind === "th")) {
    p.text = render(p.parts, "en");
    p.ruText = render(p.parts, "ru");
  }
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  const cited = new Set(citedIn(en));
  const decided = new Set([
    ...bare(JSON.stringify(p.meta?.decisions || [])),
    ...baseChain(k).flatMap((b) => [...bare(JSON.stringify(b.proposal?.meta?.decisions || [])), ...(b.proposal?.citedInDecisions || []), ...(b.keptForDecisions || [])]),
    ...bare(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions || [])),
  ]);
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${k}: a link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${k}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${k}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${k}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !decided.has(to)) problems.push(`${k}: a cites link to ${to} that nothing cites`);
  if (![...linked.values()].includes("implements")) problems.push(`${k}: no implements link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${k}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${k}: the Russian cites ${s}, the English does not`);
  for (const x of p.parts) {
    if (!x.en || !x.ru || !x.change) problems.push(`${k}: a part lacks en, ru or change`);
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${k}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}`);
  }
  if (ticks(p.reason) !== ticks(p.ruReason)) problems.push(`${k}: the code in backticks differs in the reason`);
  if (ticks(p.title) !== ticks(p.ruTitle)) problems.push(`${k}: the code in backticks differs in the title`);
  for (const x of p.examples || []) {
    if (!/The most likely mistake is/.test(x.en) || !/Самая вероятная ошибка/.test(x.ru)) problems.push(`${k}: an example without its most likely mistake`);
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${k}: the code in backticks differs in an example`);
  }
  if (!e.change) problems.push(`${k}: no change field`);
  if (!e.stage3) problems.push(`${k}: no stage3 note`);
  if (/[Рр]аунд|рецензент[а-я]* групп|review-g|\bround\b/.test(JSON.stringify([e.change, p.parts.map((x) => x.change), p.titleChange, p.reasonChange]))) problems.push(`${k}: a change field tells the history of the work`);
  const own = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join(" ").replace(/`[^`]*`/g, "code");
  for (const s of own.split(/(?<=[.;:])\s+|\n/)) { const n = s.split(/\s+/).filter(Boolean).length; if (n > 25) longSentences.push(`${k}: ${n} words: ${s.slice(0, 100)}…`); }
}
// Every other draft that cites the removed node.
for (const [k, d] of Object.entries(before)) {
  if (entries[`proposal:${k.replace(/^proposal:/, "").replace(/:/g, "-").replace(/-g\d+$/, "")}-bq`]) continue;
  if (d.sidValue !== "s-h5rfyy9j8nnhx62" && (d.proposal?.refs || []).some((r) => r.to === "s-h5rfyy9j8nnhx62")) problems.push(`${k} still links to the removed node s-h5rfyy9j8nnhx62`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

for (const [k, e] of Object.entries(entries)) { if (before[k]) fail(`${k} already exists`); drafts[k] = e; }
for (const k of Object.keys(before)) if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) fail(`an existing key changed: ${k}`);
if (firstRun) fs.writeFileSync(beforeUrl, backupText);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`wrote ${Object.keys(entries).length} drafts, none agreed:`);
for (const [k, e] of Object.entries(entries)) console.log(`- ${k}${e.base ? ` (base ${e.base})` : ""}: ${e.removal ? "removal" : e.proposal.title}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
