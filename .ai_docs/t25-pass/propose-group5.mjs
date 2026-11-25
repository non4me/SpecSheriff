// T25, stage 2, group 5: drafts the new wordings of the nodes of items 41 to 47 of the order in stage2-inventory.md,
// the checks of the tables of checks of the Domains extension (table 11.3) and of the RecordType extension (table 12.12):
// domains that use one another in a cycle (row 11.3.4), the sections of the technical appendix matched to the domains
// (row 11.3.5), the level in a domain's header (row 11.3.6), an identifier followed to its end (rows 12.12.2 and
// 12.12.3), what a RecordType variant must agree with (rows 12.12.4 to 12.12.10), where the values of a field with
// `enum` are collected, the values and the source of such a field (rows 12.12.11 to 12.12.13, a node split from the
// one before it), and a RecordType that refers outside its part of the system (rows 12.12.15 and 12.12.16).
// Copies tools-drafts.json to tools-drafts.before-group5.json first, checks every draft (citations against links, the
// Russian citing the same sids, no citation by location outside backticks, link targets existing, the new sid unique,
// no key outside the group changed), and only then writes. It also writes english-group5.md, the English of every node
// of the group, for EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of this group from
// the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";

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
const NO_REASON = "Новое: у одобренного узла обоснования не было.";

// The rows of the tables of checks of the extensions that the group implements.
const ROW = {
  r11_3_4: "s-bncp7gtyaukur8e",
  r11_3_5: "s-vghy37e3p2325ah",
  r11_3_6: "s-j3v4y4d3sbmdgfp",
  r12_12_2: "s-qpdnkejr5xzc6j3",
  r12_12_3: "s-cqys6wqrnfzu5ac",
  r12_12_4: "s-bmyzn6zuds6czqm",
  r12_12_5: "s-vtpxwqe7ncmn5bz",
  r12_12_6: "s-47q37qk27yvt3pa",
  r12_12_7: "s-hrguxwcsdm57vxf",
  r12_12_8: "s-swturmy7hmhfvt4",
  r12_12_9: "s-27aycne77epeaq6",
  r12_12_10: "s-5z8vjzmc3s983gk",
  r12_12_11: "s-upj45kydz8727be",
  r12_12_12: "s-buug8n5eh7tdnsv",
  r12_12_13: "s-hcgmz4v5avbj3nt",
  r12_12_15: "s-rpkq8y79fwg5k92",
  r12_12_16: "s-hn9m9dhxaazjn3y",
};
// The sid of the one new node of the group, split from "Where the values of a field with `enum` are collected".
const NEW_SID = "s-dk3zfkbhc3v6xbp";

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};
const MAIN_TABLE = (rows) => `The \`implements\` link to the main table of checks (s-jau82aq9juv9zzh): the node implements ${rows}.`;

// ---------------------------------------------------------------------------------------------------------------
// Item 41: "No circular dependency between the domains" (s-vuujweu57sxsa58), row 11.3.4.
// ---------------------------------------------------------------------------------------------------------------
add("s-vuujweu57sxsa58", {
  location: "tools 7.1.13",
  sidValue: "s-vuujweu57sxsa58",
  testsFrom: ["refuses domains using one another in a cycle"],
  proposal: {
    title: "Domains that use one another in a cycle",
    ruTitle: "Домены, которые используют друг друга по кругу",
    titleChange: "Было: «No circular dependency between the domains». Название теперь говорит словами правила 11.1.3 и строки 11.3.4: домены «используют» друг друга, а не «зависят» друг от друга.",
    parts: [
      P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` refuses the change where the domains use one another in a cycle (§s-bncp7gtyaukur8e). The refusal names the domains of one such cycle, in the order in which each uses the next.",
        "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` отвергает изменение, если домены используют друг друга по кругу (§s-bncp7gtyaukur8e). Отказ называет домены одного такого круга в том порядке, в каком каждый из них использует следующий.",
        "Было: «Where the walk comes back to a domain it has already passed, the check refuses the change. It names the domains along that circle.» Без изменений по смыслу. Узел теперь начинается с того, что отвергает команда и что называет отказ, как другие узлы проверок. Новое: проверка выполняется, только если проект выбрал расширение Domains, потому что строка 11.3.4 — в таблице проверок этого расширения."),
      P("A domain uses another domain where its header (§s-yggv9myedprnaa7) has a `consumes` link to a section of the other domain. Only a link that the check of `consumes` links accepts is counted (§s-p3n666zfjdrrw6a). The domains use one another in a cycle where a chain of domains, each of which uses the next, leads back to its first domain.",
        "Домен использует другой домен, если у его заголовка (§s-yggv9myedprnaa7) есть связь `consumes` с разделом другого домена. Учитывается только связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a). Домены используют друг друга по кругу, если цепочка доменов, каждый из которых использует следующий, возвращается к своему первому домену.",
        "Было: «`sheriff validate` walks the domains along the `consumes` links, from each domain's header to the domains whose sections it names.» Без изменений по смыслу: круг по-прежнему ищется только по связям `consumes` заголовков (ваше решение от 2026-10-30 по строке 11.3.4). Уточнено, что считается только связь `consumes`, которую принимает согласованный узел «`consumes` links»: связь, которую он отвергает, не делает один домен пользователем другого."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-bncp7gtyaukur8e).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-bncp7gtyaukur8e).",
        "Новое: стоимость строки 11.3.4, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "Only the `consumes` links of the domains' headers state which domain uses which (§s-yggv9myedprnaa7). A node that relies on what another domain states has a link of any type to that domain's node (§s-hr7j7scmfkkjnws). So a check that followed those links would refuse domains that do not use one another.",
    ruReason: "Только связи `consumes` заголовков доменов говорят, какой домен какой использует (§s-yggv9myedprnaa7). Узел, который опирается на то, что утверждает другой домен, содержит связь любого типа с узлом этого домена (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по таким связям, отвергала бы домены, которые друг друга не используют.",
    reasonChange: NO_REASON,
    examples: [
      X("The header of the domain `requests` has a `consumes` link to a section of the domain `users`. The header of `users` has such a link to a section of `requests`. `sheriff validate` refuses the change and names `requests` and `users`. In another project, only the header of `requests` has such a link, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts both domains. The most likely mistake is to treat that citation as a use of `requests` by `users`.",
        "У заголовка домена `requests` есть связь `consumes` с разделом домена `users`. У заголовка `users` есть такая связь с разделом `requests`. `sheriff validate` отвергает изменение и называет `requests` и `users`. В другом проекте такая связь есть только у заголовка `requests`, а правило `users` ссылается на правило `requests`. Там `sheriff validate` принимает оба домена. Самая вероятная ошибка — считать эту ссылку тем, что `users` использует `requests`."),
    ],
    refs: [
      R("implements", ROW.r11_3_4),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-p3n666zfjdrrw6a"),
      R("cites", "s-hr7j7scmfkkjnws"),
    ],
    removed: [MAIN_TABLE("row 11.3.4 (s-bncp7gtyaukur8e) of the table of checks of the Domains extension")],
    date: DATE,
  },
  stage3: "validate.ts:257-269 (domains) builds which domain uses which from the consumes links that it accepts, and findCycle (validate.ts:272-293) refuses the first cycle that it finds, naming its domains joined by arrows, at specs/; this is what the node says. The check is to run only where the Domains extension is chosen; isDomain (model.ts:244) treats every part other than _guidelines, contracts, tech and _archive as a domain, base included. The test at validate.test.ts:323 is to carry s-vuujweu57sxsa58 in place of s-jau82aq9juv9zzh; a test in which a citation between rules of two domains makes no cycle is written first and seen to pass for the right reason. The decision of the node stays on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 42: "A file of the technical appendix named after a domain" (s-gvafe6bnstwab8b), row 11.3.5.
// ---------------------------------------------------------------------------------------------------------------
add("s-gvafe6bnstwab8b", {
  location: "tools 7.1.22",
  sidValue: "s-gvafe6bnstwab8b",
  testsFrom: ["refuses a section of the technical appendix standing under a name no domain has, the stack's and the technical debt's aside"],
  proposal: {
    title: "Sections of the technical appendix matched to the domains",
    ruTitle: "Разделы технического приложения, сопоставленные с доменами",
    titleChange: "Было: «A file of the technical appendix named after a domain». По строке 11.3.5 и вашему решению от 2026-11-18 с доменом сопоставляется не только файл, но и каждый раздел технического приложения — по названию и по месту в структуре.",
    parts: [
      P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a JSON file under `specs/tech/` only where it is one of the following (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):",
        "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает файл JSON в `specs/tech/`, только если это один из следующих файлов (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):",
        "Было: «`sheriff validate` looks up among the domains the name of each file of the technical appendix but `stack.json` and `debt.json`.» Без изменений по смыслу. Узел теперь начинается с того, что принимает команда. Новое: проверка выполняется, только если проект выбрал расширение Domains, потому что строка 11.3.5 — в таблице проверок этого расширения."),
      L("`specs/tech/stack.json` or `specs/tech/debt.json`;",
        "`specs/tech/stack.json` или `specs/tech/debt.json`;",
        "Было: «but `stack.json` and `debt.json`». Без изменений по смыслу: у раздела стека и у раздела технического долга нет пары в базовой спецификации (строка 11.3.5)."),
      L("a file named after a domain, `specs/tech/<domain>.json`, where `<domain>` is the name of a domain.",
        "файл, названный по домену, — `specs/tech/<domain>.json`, где `<domain>` — имя домена.",
        "Без изменений по смыслу. Путь — тот, который даёт согласованный узел «Where the files are» для раздела технического приложения, который реализует домен."),
      P("`sheriff validate` refuses any other file of the technical appendix (§s-tj38pvm38nepaf5), naming the file.",
        "Любой другой файл технического приложения (§s-tj38pvm38nepaf5) `sheriff validate` отвергает и называет этот файл.",
        "Новое: что называет отказ. Сейчас код отвергает по отдельности каждый узел верхнего уровня такого файла; теперь отказ называет сам файл."),
      P("In a file named after a domain, `sheriff validate` accepts each section below the file's first top-level node only where the same titles lead to a section of that domain (§s-vghy37e3p2325ah). The titles that lead to a section are those of the sections that hold it, from the top down, followed by the section's own title. `sheriff validate` refuses any other section of the file, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title.",
        "В файле, названном по домену, `sheriff validate` принимает каждый раздел под первым узлом верхнего уровня файла, только если те же названия ведут к разделу этого домена (§s-vghy37e3p2325ah). Названия, которые ведут к разделу, — это названия разделов, которые его содержат, сверху вниз, а за ними название самого раздела. Любой другой раздел этого файла `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) раздела, а также его название.",
        "Новое: по строке 11.3.5 каждый раздел технического приложения, кроме раздела стека и раздела технического долга, совпадает с доменом или разделом базовой спецификации по имени и по месту в структуре. Вы пояснили 2026-11-18, что структура технического приложения повторяет структуру базовой спецификации, вместе с доменами и их разделами, насколько это нужно. Имя раздела — его название; место в структуре — названия разделов, которые его содержат. Проверка идёт в одну сторону, как вы и решили: у раздела домена может не быть пары в техническом приложении."),
      P("The first top-level node of a file named after a domain represents the domain itself, so the titles that lead to a section of that file start below that node. Each further top-level node of the file is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w). In the domain, the titles that lead to a section start at a section that is a top-level node of one of the domain's files or a child of the domain's header (§s-yggv9myedprnaa7).",
        "Первый узел верхнего уровня файла, названного по домену, представляет сам домен, поэтому названия, которые ведут к разделу этого файла, начинаются ниже этого узла. Каждый следующий узел верхнего уровня файла считается узлом под первым, как при вычислении расположения (§s-ygg5kpcxgzq3m7w). В домене названия, которые ведут к разделу, начинаются с раздела, который является узлом верхнего уровня одного из файлов домена или дочерним узлом заголовка домена (§s-yggv9myedprnaa7).",
        "Новое: с какого узла начинаются названия, которые ведут к разделу, в файле технического приложения и в домене. Так же эти узлы упорядочивает согласованный узел «How a node's location is computed»."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-vghy37e3p2325ah).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-vghy37e3p2325ah).",
        "Новое: стоимость строки 11.3.5, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "A reader looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain. There the reader follows the same titles that lead to the rule in the domain (§s-vj7ercem526zd6v). A section of that file that matches no section of the domain holds an implementation that such a reader does not find.",
    ruReason: "Читатель ищет, как реализовано правило домена, в файле технического приложения, названном по этому домену. Там читатель идёт по тем же названиям, которые ведут к правилу в домене (§s-vj7ercem526zd6v). Раздел этого файла, который не совпадает ни с одним разделом домена, содержит реализацию, которую такой читатель не находит.",
    reasonChange: NO_REASON,
    examples: [
      X("The domain `requests` has a section titled “Intake”, which holds a section titled “Validation”. In `specs/tech/requests.json`, the file's first top-level node holds a section titled “Intake”, which holds a section titled “Validation”, and `sheriff validate` accepts both. Another section titled “Validation” is directly under the file's first top-level node, and `sheriff validate` refuses it. The most likely mistake is to accept that section because the domain has a section titled “Validation”, although that section is under “Intake”.",
        "У домена `requests` есть раздел «Intake», который содержит раздел «Validation». В `specs/tech/requests.json` первый узел верхнего уровня файла содержит раздел «Intake», а тот — раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится прямо под первым узлом верхнего уровня файла, и `sheriff validate` его отвергает. Самая вероятная ошибка — принять этот раздел потому, что в домене есть раздел «Validation», хотя тот находится под «Intake»."),
    ],
    refs: [
      R("implements", ROW.r11_3_5),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-tj38pvm38nepaf5"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-vj7ercem526zd6v"),
    ],
    removed: [MAIN_TABLE("row 11.3.5 (s-vghy37e3p2325ah) of the table of checks of the Domains extension")],
    date: DATE,
  },
  stage3: "validate.ts:446-452 (appendices) refuses each top-level node of a file of specs/tech/, other than stack.json and debt.json, whose name is no domain's. It is to run only where the Domains extension is chosen, to refuse such a file once, naming it, and to compare each section below the first top-level node of a file named after a domain with the domain's sections by the titles that lead to it. isDomain (model.ts:244) counts `base` as a domain, so specs/tech/base.json passes today; with the Domains extension it is to be refused, since no domain is named `base` (s-zefk589ykh37b8u). The test at validate.test.ts:315 is to carry s-gvafe6bnstwab8b; a test for a section whose title the domain has at another place is written first. The decision of the node stays on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 43: "A header's level" (s-uxmkwbnpgtjzkgv), row 11.3.6.
// ---------------------------------------------------------------------------------------------------------------
add("s-uxmkwbnpgtjzkgv", {
  location: "tools 7.1.15",
  sidValue: "s-uxmkwbnpgtjzkgv",
  testsFrom: ["refuses a level the project's own guidelines do not list"],
  proposal: {
    title: "The level in a domain's header",
    ruTitle: "Уровень в заголовке домена",
    titleChange: "Было: «A header's level». Уточнено, что речь о заголовке домена.",
    parts: [
      P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts the level that a domain's header (§s-yggv9myedprnaa7) contains only where the project's own guidelines (§s-u7tw6m8npxmv5tu) list that level (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). A header contains its level in its `level`.",
        "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает уровень, который содержит заголовок домена (§s-yggv9myedprnaa7), только если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют этот уровень (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). Заголовок содержит свой уровень в своём `level`.",
        "Было: «`sheriff validate` looks up the level each header names in the list the project's own guidelines hold.» По строке 11.3.6 в вашей формулировке от 2026-11-18 заголовок уровень не называет, а содержит. Новое: проверка выполняется, только если проект выбрал расширение Domains, в котором находятся правила об уровнях."),
      P("`sheriff validate` refuses any other header that contains a level, naming the header by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the level. A header that contains no level passes this check.",
        "Любой другой заголовок, который содержит уровень, `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) заголовка, а также уровень. Заголовок, который не содержит уровня, эту проверку проходит.",
        "Новое: что называет отказ. Уровень необязателен (правило 11.2.1, ваше решение от 2026-11-09), поэтому заголовок без уровня проходит; сейчас код такой заголовок отвергает. Если собственные guidelines не перечисляют уровней, заголовок с уровнем отвергается, как вы и описали проверку 2026-11-18."),
      P("The SpecSheriff tools read those levels in the last approved wording of each rule of `project.json` (§s-zefk589ykh37b8u) with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on a domain's level (§s-nkyty4dy9x2v2a4). A draft rule is not implemented (§s-utvqbypzhmgndug), so a level that only a draft wording adds is listed only after that wording is approved.",
        "Инструменты SpecSheriff читают эти уровни в последней одобренной формулировке каждого правила `project.json` (§s-zefk589ykh37b8u), у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом об уровне домена (§s-nkyty4dy9x2v2a4). Правило-черновик не реализуется (§s-utvqbypzhmgndug), поэтому уровень, который добавляет только формулировка-черновик, перечислен лишь после того, как эту формулировку одобрят.",
        "Новое: так инструменты SpecSheriff читают любой перечень `project.json` по согласованному узлу «What the SpecSheriff tools read in the project's own guidelines» (группа 4). У этого узла ещё нет sid, поэтому здесь сказано, что из этого следует для уровней."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-j3v4y4d3sbmdgfp).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-j3v4y4d3sbmdgfp).",
        "Новое: стоимость строки 11.3.6, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "The diagram of the domains places each domain in the row of its level (§s-4azsb49pj6sech8). The order of the levels in their list sets the order of the rows (§s-nkyty4dy9x2v2a4). So a level outside that list has no row.",
    ruReason: "Диаграмма доменов помещает каждый домен в ряд его уровня (§s-4azsb49pj6sech8). Порядок уровней в их перечне задаёт порядок рядов (§s-nkyty4dy9x2v2a4). Поэтому у уровня вне этого перечня ряда нет.",
    reasonChange: NO_REASON,
    examples: [
      X("An approved rule of `project.json` refines the rule on a domain's level and lists `core` and `edge`. A team member adds `platform` to its list, so the rule becomes a draft. Until the new wording is approved, `sheriff validate` refuses each header that contains `platform`, naming `platform`. The most likely mistake is to read the list in the draft wording.",
        "Одобренное правило `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. Участник команды добавляет в его перечень `platform`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff validate` отвергает каждый заголовок, который содержит `platform`, и называет `platform`. Самая вероятная ошибка — читать перечень в формулировке-черновике."),
    ],
    refs: [
      R("implements", ROW.r11_3_6),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-nkyty4dy9x2v2a4"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-utvqbypzhmgndug"),
      R("cites", "s-4azsb49pj6sech8"),
    ],
    removed: [MAIN_TABLE("row 11.3.6 (s-j3v4y4d3sbmdgfp) of the table of checks of the Domains extension")],
    date: DATE,
  },
  stage3: "validate.ts:247-248 refuses a header whose level is not in the list, a header without a level included, since header.level is then undefined. It is to accept a header without a level and to run only where the Domains extension is chosen. levelsOf (model.ts:231-240) takes the list of the last rule of project.json that refines s-nkyty4dy9x2v2a4, as its file holds it; it is to take the members of every such rule, in the order in which those rules appear, each in its last approved wording, a rule never approved listing nothing (new:tools-1-project). The test at validate.test.ts:290 is to carry s-uxmkwbnpgtjzkgv; tests for a header without a level and for a level that only a draft wording adds are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 44: "An identifier followed to its end" (s-3anv9qcmx8pwp2w), rows 12.12.2 and 12.12.3.
// ---------------------------------------------------------------------------------------------------------------
add("s-3anv9qcmx8pwp2w", {
  location: "tools 7.1.17",
  sidValue: "s-3anv9qcmx8pwp2w",
  testsFrom: [
    "refuses an identifier of a RecordType that names no field identifying it among its fields",
    "refuses identifiers that lead, from one identifying field to the next, back to a RecordType already passed",
  ],
  proposal: {
    title: "An identifier followed to its end",
    ruTitle: "Идентификатор, прослеженный до конца",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `identifierOf` (§s-qpdnkejr5xzc6j3), только если выполнены оба условия:",
        "Было: «`sheriff validate` looks up the RecordType that each field of type `identifier of` names.» Поле типа `identifier of` теперь — поле с `identifierOf`, словом SpecSheriff (ваше решение от 2026-11-19, что всё о RecordType следует JSON Schema 2020-12). Узел теперь начинается с того, что принимает команда. Новое: проверка выполняется, только если проект выбрал расширение RecordType."),
      L("its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);",
        "его `identifierOf` называет RecordType (§s-7vm323mhry2enx3), который в своём `identifiedBy` называет одно из своих полей полем, идентифицирующим его записи данных (§s-6eb92ddch7shuvu);",
        "Было: «Among the fields of that RecordType, it looks up the one the RecordType names as identifying it.» Без изменений по смыслу; это строка 12.12.2."),
      L("the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).",
        "цепочка идентификаторов, которая начинается у этого поля, заканчивается полем без `identifierOf` (§s-cqys6wqrnfzu5ac).",
        "Было: «Where that field is itself an identifier, the RecordType it names is followed in the same way, until a field of another type is reached. A RecordType reached twice is refused.» Без изменений по смыслу; это строка 12.12.3 в её словах."),
      P("`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and the condition that the field fails.",
        "Любое другое поле с `identifierOf` `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) RecordType, который его содержит. Отказ называет также само поле и условие, которое поле не выполняет.",
        "Было: «A RecordType reached twice is refused.» Теперь отвергается поле, а отказ называет RecordType, поле и невыполненное условие."),
      P("The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain that comes back to a RecordType that it has already passed never ends.",
        "Цепочка идентификаторов, которая начинается у поля, ведёт к полю, которое идентифицирует записи данных RecordType, названного в `identifierOf` этого поля. Если у того поля тоже есть `identifierOf`, цепочка продолжается так же. Цепочка, которая возвращается к RecordType, уже пройденному ею, не кончается никогда.",
        "Было: «Where that field is itself an identifier, the RecordType it names is followed in the same way…» Без изменений по смыслу. Цепочка, которая доходит до RecordType без идентифицирующего поля, тоже не кончается полем без `identifierOf`, поэтому поле в её начале отвергается; сейчас код такое поле пропускает."),
      P("A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.",
        "Поля RecordType здесь — те, что он объявляет в своём `schema` (§s-6eb92ddch7shuvu), и те, что он берёт через `refines` (§s-sn6au3vcr9uy5pm) из другого RecordType. `sheriff validate` выполняет эту проверку везде, где `schema` RecordType содержит `identifierOf`, на любой глубине, например в схеме элементов списка.",
        "Было: поля RecordType — его `fields`. По вашему решению от 2026-11-19 формат RecordType — объект JSON Schema в его `schema`. Поля, взятые через `refines`, тоже считаются, как в правиле 12.6; проверка идёт на любой глубине. И то и другое код делает уже сейчас."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).",
        "Новое: стоимость строк 12.12.2 и 12.12.3, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.",
    ruReason: "Поле с `identifierOf` получает свой тип от поля в конце своей цепочки идентификаторов (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). Поэтому типы и RuntimeCheck, сгенерированные из RecordType (§s-e877bnfa559tvk9), могут дать полю тип, только если у этой цепочки есть конец.",
    reasonChange: NO_REASON,
    examples: [
      X("The RecordType `statement` has a field `account` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of `account` names its field `number`, of type `string`. That chain ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other, so their chains never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain, which accepts both of them.",
        "У RecordType `statement` есть поле `account`, `identifierOf` которого называет RecordType `account`. `identifiedBy` RecordType `account` называет его поле `number` типа `string`. Эта цепочка кончается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, `identifierOf` которого называет другой, поэтому их цепочки не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки: тогда оба поля были бы приняты."),
    ],
    refs: [
      R("implements", ROW.r12_12_2),
      R("implements", ROW.r12_12_3),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-e877bnfa559tvk9"),
      // The decisions of 2026-10-31 on the node cite it.
      R("cites", "s-xfu2gpzddjnmgks"),
    ],
    removed: [
      MAIN_TABLE("rows 12.12.2 (s-qpdnkejr5xzc6j3) and 12.12.3 (s-cqys6wqrnfzu5ac) of the table of checks of the RecordType extension"),
      "“A field of type `identifier of`”: since the owner's ruling of 2026-11-19 a field refers to a RecordType by `identifierOf`, a keyword of SpecSheriff.",
    ],
    date: DATE,
  },
  stage3: "validate.ts:413-440 reads a field of type `identifier of` and its `record` in the former `fields`. It is to read `identifierOf` in each schema within a RecordType's `schema`, at any depth, and to take the identifying field from `identifiedBy` among the fields declared in `schema.properties` or taken through refines. In validate.ts:425-434 the loop stops quietly where the chain reaches a RecordType without an identifying field; it is to refuse the field at the start of that chain too, since the chain does not end in a field without identifierOf. validate.ts:419 refuses an identifiedBy that names none of the RecordType's fields even where no field refers to that RecordType; no row of table 12.12 lists that check, so it goes (see the notes, changes outside the group). The check is to run only where the RecordType extension is chosen. The tests at validate.test.ts:406 and :427 are rewritten first for the JSON Schema form and are to carry s-3anv9qcmx8pwp2w; the second half of :406 goes with the refusal at :419. The decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 45: "What a RecordType variant must agree with" (s-c2r9jndrjbtbsv6), rows 12.12.4 to 12.12.10.
// ---------------------------------------------------------------------------------------------------------------
add("s-c2r9jndrjbtbsv6", {
  location: "tools 7.1.16",
  sidValue: "s-c2r9jndrjbtbsv6",
  testsFrom: [
    "refuses a RecordType variant answering to a value its choosing field does not declare, or declaring no field of its own",
    "refuses a RecordType variant answering to a value its choosing field declares in no list of values",
  ],
  proposal: {
    title: "What a RecordType variant must agree with",
    ruTitle: "С чем должен согласовываться вариант RecordType",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a RecordType variant (§s-z3dnru6qqdf9m6j) only where all of the following hold:",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает вариант RecordType (§s-z3dnru6qqdf9m6j), только если выполнено всё следующее:",
        "Было: «`sheriff validate` checks that each RecordType variant agrees with the RecordType it refines, found by the variant's `refines` link:». Узел теперь начинается с того, что принимает команда, и перечисляет условия строк 12.12.4–12.12.10 в их порядке. Новое: проверка выполняется, только если проект выбрал расширение RecordType."),
      L("it has a `refines` link (§s-sn6au3vcr9uy5pm) to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);",
        "у него есть связь `refines` (§s-sn6au3vcr9uy5pm) ровно с одним RecordType, у которого есть поля, выбирающие вариант (§s-bmyzn6zuds6czqm);",
        "Новое в тексте: строка 12.12.4; сейчас код уже отвергает вариант без связи `refines` с RecordType. «Ровно с одним RecordType, у которого есть поля, выбирающие вариант»: по правилу 12.10 RecordType может уточнять ещё и фрагмент формата, а по правилу 12.6 вариант — вариант одного RecordType."),
      L("it is declared in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the variant is the nearest section that holds its RecordType;",
        "он объявлен в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайший раздел, который содержит вариант, — это ближайший раздел, который содержит его RecordType;",
        "Было: «the variant stands in the part of the specification where its value is declared (§s-xfwuvd3funutmsw)». По правилу 12.6 и строке 12.12.5 (ваши решения от 2026-11-16 и 2026-11-19) вариант объявляется там же, где его RecordType, а не там, где объявлено его значение; правило s-xfwuvd3funutmsw — в архиве."),
      L("it declares at least one field (§s-47q37qk27yvt3pa);",
        "он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);",
        "Было: «the variant declares at least one field that no RecordType up its `refines` links holds, the fields their fields of type `variant` hold included». Тип `variant` вы убрали 2026-11-19. Что имя поля варианта отличается от имён полей его RecordType, говорит следующий пункт (строка 12.12.7)."),
      L("the name of each field that it declares differs from the name of every field of its RecordType (§s-hrguxwcsdm57vxf);",
        "имя каждого поля, которое он объявляет, отличается от имени любого поля его RecordType (§s-hrguxwcsdm57vxf);",
        "Новое: строка 12.12.7 и ваше решение от 2026-11-19. Вместе с предыдущим пунктом он заменяет прежний пункт о поле, которого нет ни у одного RecordType выше по связям `refines`."),
      L("the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);",
        "поля, которые называет его `answersTo`, — ровно те поля, которые выбирают вариант его RecordType (§s-swturmy7hmhfvt4);",
        "Было: «the fields the variant answers to are those the nearest RecordType up its `refines` links names as choosing it». Без изменений по смыслу; это строка 12.12.8."),
      L("each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);",
        "каждое значение, которое его `answersTo` называет для поля, — одно из значений этого поля в том виде, в каком их собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);",
        "Было: «each value it answers to is among the values of its choosing field, collected from the field's one source (§s-5nf87c3e3jg9v7c)». Без изменений по смыслу. По строке 12.12.9 и вашему решению от 2026-11-19 значения поля из любого источника — его `enum`; как они собираются, говорит узел «Where the values of a field with `enum` are collected»."),
      L("its `answersTo` differs from the `answersTo` of every other variant of its RecordType (§s-5z8vjzmc3s983gk).",
        "его `answersTo` отличается от `answersTo` любого другого варианта его RecordType (§s-5z8vjzmc3s983gk).",
        "Было: «no other variant of the same RecordType answers to the same values». Без изменений по смыслу; это строка 12.12.10 в утвердительной форме."),
      P("`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the variant fails. For the last condition, it also names each other variant with the same `answersTo`.",
        "Любой другой вариант RecordType `sheriff validate` отвергает, называя его файл, sid и расположение (§s-kag2m9tzdnduxdx). Отказ также говорит, какое из условий выше вариант не выполняет. Для последнего условия он называет также каждый другой вариант с тем же `answersTo`.",
        "Было: «A variant failing any of these is refused.» Новое: что называет отказ."),
      P("A variant that fails the first condition is refused for that reason alone, since each of the other conditions compares the variant with its RecordType.",
        "Вариант, который не выполняет первого условия, отвергается только по этой причине, потому что каждое из остальных условий сравнивает вариант с его RecordType.",
        "Новое: в каком случае остальные условия не проверяются. Так код и делает сейчас."),
      P("A RecordType variant is a RecordType that names, in its `answersTo`, the values that it corresponds to (§s-z3dnru6qqdf9m6j). A variant's RecordType is the RecordType that has fields that select a variant and to which the variant has a `refines` link. The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it names none, they are those that the nearest RecordType up its `refines` links names in its `chosenBy`.",
        "Вариант RecordType — это RecordType, который называет в своём `answersTo` значения, которым он соответствует (§s-z3dnru6qqdf9m6j). RecordType варианта — это RecordType, у которого есть поля, выбирающие вариант, и с которым у варианта есть связь `refines`. Поля, которые выбирают вариант RecordType, — те, что RecordType называет в своём `chosenBy`. Если он их не называет, это те, что называет в своём `chosenBy` ближайший RecordType выше по его связям `refines`.",
        "Новое: как инструменты SpecSheriff узнают вариант, его RecordType и поля, которые выбирают вариант, — по свойствам `answersTo` и `chosenBy` в схеме расширения RecordType и по правилу 12.6. Так код и делает сейчас."),
      P("The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The fields of a RecordType are those that it declares and those that it takes through `refines` from another RecordType. The names of fields are compared character for character. Where no section holds a RecordType, the part of the base specification that holds it (§s-kag2m9tzdnduxdx) is treated as its nearest section.",
        "Поля, которые объявляет RecordType, — это свойства его `schema` (§s-6eb92ddch7shuvu). Поля RecordType — те, что он объявляет, и те, что он берёт через `refines` из другого RecordType. Имена полей сравниваются посимвольно. Если RecordType не содержится ни в одном разделе, его ближайшим разделом считается часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).",
        "Новое: что такое поля RecordType в формате JSON Schema (ваше решение от 2026-11-19) и как сравниваются их имена. Посимвольно — потому что так сравнивает имена свойств JSON Schema, на которую вы велели ориентироваться во всём, что касается RecordType. Последняя фраза закрывает случай RecordType, который не входит ни в один раздел."),
      P("`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).",
        "`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).",
        "Новое: стоимость строк 12.12.4–12.12.10, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "A data record holds the fields of its RecordType together with those of the variant whose values it holds (§s-z3dnru6qqdf9m6j). Only where every variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).",
    ruReason: "Запись данных содержит поля своего RecordType вместе с полями того варианта, значения которого она содержит (§s-z3dnru6qqdf9m6j). Только если каждый вариант согласуется со своим RecordType, у каждой записи данных один набор полей, который могут описать типы и RuntimeCheck, сгенерированные из RecordType (§s-e877bnfa559tvk9).",
    reasonChange: NO_REASON,
    examples: [
      X("The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines the fragment of a format `message`, which declares the field `text`. A variant in the same section refines `notification`, names `email` for `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another variant names `sms` for `channel` and declares `text`, and `sheriff validate` refuses it for both reasons. The most likely mistake is to compare the names of a variant's fields only with those that `notification` declares itself, which misses `text`.",
        "RecordType `notification` называет `channel` в своём `chosenBy`, и значения `channel` — `email` и `app`. Он уточняет фрагмент формата `message`, который объявляет поле `text`. Вариант в том же разделе уточняет `notification`, называет в своём `answersTo` для `channel` значение `email` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант называет для `channel` значение `sms` и объявляет `text`, и `sheriff validate` отвергает его по обеим причинам. Самая вероятная ошибка — сравнивать имена полей варианта только с теми, которые `notification` объявляет сам: так `text` будет пропущено."),
    ],
    refs: [
      R("implements", ROW.r12_12_4),
      R("implements", ROW.r12_12_5),
      R("implements", ROW.r12_12_6),
      R("implements", ROW.r12_12_7),
      R("implements", ROW.r12_12_8),
      R("implements", ROW.r12_12_9),
      R("implements", ROW.r12_12_10),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-z3dnru6qqdf9m6j"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-5nf87c3e3jg9v7c"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-e877bnfa559tvk9"),
      // The decisions of 2026-10-31 on the node cite both.
      R("cites", "s-xfu2gpzddjnmgks"),
      R("cites", "s-jau82aq9juv9zzh"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh), which becomes a `cites` link, since a decision of 2026-10-31 on the node cites that table: the node implements rows 12.12.4 to 12.12.10 of the table of checks of the RecordType extension.",
      "The `implements` link to “Where a value is declared” (s-xfwuvd3funutmsw): that rule is in the archive, and a variant is now declared in the same section as its RecordType (s-z3dnru6qqdf9m6j, row 12.12.5).",
      "The item that held a variant to the part of the specification where its value is declared: replaced by the item on the section (row 12.12.5).",
      "The item that allowed at most one field of type `variant` along the `refines` links, and the fields that such a field holds: the owner dropped the type `variant` on 2026-11-19 (s-z3dnru6qqdf9m6j).",
    ],
    date: DATE,
  },
  stage3: "validate.ts:310-411 (variants) takes a variant's RecordType from its first refines link to a RecordType (refined), the selecting fields from the nearest chosenBy up the chain, compares a value with the values declared in the field's own list or in a domain's list, holds the variant to the part that declares the value, counts as its own the fields that no RecordType up the chain holds, counts the fields of type variant, and groups the variants with the same answersTo by the RecordType that names chosenBy. It is to recognise a variant by answersTo; to take its RecordType from the one refines link to a RecordType that has fields that select a variant, and to refuse a variant without such a link or with several; to compare the nearest section that holds the variant with the nearest section that holds its RecordType; to read the fields from the properties of `schema`, those taken through refines included, compared character for character; to take the values as s-5nf87c3e3jg9v7c collects them; and to group the variants with the same answersTo by their RecordType. The count of fields of type variant (validate.ts:338-339) and the part that declares a value (validate.ts:404) go. The check is to run only where the RecordType extension is chosen. The tests at validate.test.ts:333 and :343 are rewritten first for the JSON Schema form and are to carry s-c2r9jndrjbtbsv6; the tests at :349, :369, :373, :396 and :437, which concern the field of type variant, the lists of the domains and the part that declares a value, go or are rewritten for rows 12.12.5, 12.12.7 and 12.12.10. Tests for a variant that also refines a fragment of a format, for one declared in another section, and for a field name taken through refines are written first. The decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 46: "Where the values of a field of type `one of` are collected" (s-5nf87c3e3jg9v7c), split in two: how the
// values are collected (rules 12.7, 12.8 and 12.11), and the check of rows 12.12.11 to 12.12.13 (a new node).
// ---------------------------------------------------------------------------------------------------------------
add("s-5nf87c3e3jg9v7c", {
  location: "tools 7.1.18",
  sidValue: "s-5nf87c3e3jg9v7c",
  testsFrom: [],
  proposal: {
    title: "Where the values of a field with `enum` are collected",
    ruTitle: "Откуда собираются значения поля с `enum`",
    titleChange: "Было: «Where the values of a field of type `one of` are collected». Поле типа `one of` теперь — поле с `enum` (правило 12.7, ваше решение от 2026-11-19, что всё о RecordType следует JSON Schema 2020-12).",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its one source:",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его единственного источника:",
        "Было: «`sheriff validate` collects the values of each field of type `one of` from its one source (§s-xfu2gpzddjnmgks), which is one of these:». Значения собирает не только `sheriff validate`: их записывает `sheriff reindex`, и по ним проверяются варианты RecordType, поэтому субъект — инструменты SpecSheriff. Новое: только если проект выбрал расширение RecordType."),
      L("its own list: the members of the field's `enum`, in their order;",
        "его собственный перечень — элементы `enum` поля в их порядке;",
        "Было: «its own list». Без изменений по смыслу; в формате JSON Schema собственный перечень — это `enum` поля."),
      L("the names of the parts of the base specification (§s-gqavjzcmubg5pvk), where the field's `x-enumSource.from` is `parts`: the name of each folder under `specs/` that holds a part of the base specification (§s-zefk589ykh37b8u);",
        "имена частей базовой спецификации (§s-gqavjzcmubg5pvk), если `x-enumSource.from` поля — `parts`: имя каждой папки в `specs/`, в которой хранится часть базовой спецификации (§s-zefk589ykh37b8u);",
        "Было: «the names of the domains». По правилам 12.7 и 12.11 (ваше решение от 2026-11-18) источник — имена частей базовой спецификации. Часть называется по своей папке, как в расположении узла (правило 8.5 и согласованный узел «How a node's location is computed»)."),
      L("the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).",
        "sid узлов собственного типа проекта (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля — `kind`: sid каждого узла базовой спецификации, тип которого называет `x-enumSource.kind` поля, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6).",
        "Было: «the sids of the nodes of the NodeKind it names that stand in the base specification». Имя NodeKind вы убрали 2026-11-10. Новое: узлы в ячейках `TableRule` тоже считаются."),
      P("The folders that hold the parts of the base specification are `specs/contracts/` and either `specs/base/` or the folder of each domain. A value collected from the names of the parts comes from the node that its part opens with. For a domain, that node is its header (§s-yggv9myedprnaa7). For any other part, it is the first top-level node of the first of the part's files in the code-point order of their paths. A value collected from the sids comes from the node whose sid it is.",
        "Папки, в которых хранятся части базовой спецификации, — `specs/contracts/` и либо `specs/base/`, либо папка каждого домена. Значение, собранное из имён частей, приходит из узла, которым открывается его часть. Для домена этот узел — его заголовок (§s-yggv9myedprnaa7). Для любой другой части это первый узел верхнего уровня первого из её файлов в порядке кодовых точек их путей. Значение, собранное из sid, приходит из узла, чей это sid.",
        "Новое: из какого узла приходит каждое собранное значение (правило 12.9). У частей `contracts` и `base` заголовка нет, поэтому значение приходит из первого их узла в том порядке, в каком инструменты SpecSheriff вычисляют расположения. Сейчас код собирает имена только по заголовкам доменов и пропускает `contracts`, хотя пример правила 12.11 называет его среди значений."),
      P("The values collected from the names of the parts or from the sids are the values gathered beside the field (§s-ju5vcanbjph7mgh). `sheriff reindex` writes each of them into the field's `x-enumSource.gathered` (§s-ztseyetus7np6br), together with the sid of the node that it comes from. It writes them in the order of those nodes: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).",
        "Значения, собранные из имён частей или из sid, — это значения, собранные рядом с полем (§s-ju5vcanbjph7mgh). `sheriff reindex` записывает каждое из них в `x-enumSource.gathered` поля (§s-ztseyetus7np6br) вместе с sid узла, из которого оно приходит. Записывает он их в порядке этих узлов: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в каком их проходит вычисление расположения (§s-ygg5kpcxgzq3m7w).",
        "Новое: что значит «рядом с полем» в формате JSON Schema и в каком порядке записываются значения. Порядок — по узлам, из которых приходят значения, как вы решили 2026-11-05 для узла «The type each neutral type of a field gives»."),
      P("The SpecSheriff tools collect in this way the values of each field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.",
        "Так инструменты SpecSheriff собирают значения каждого поля с `enum` на любой глубине `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.",
        "Новое: на любой глубине, как код и делает сейчас для вложенных полей."),
    ],
    reason: "`sheriff reindex` writes the gathered values beside the field (§s-ztseyetus7np6br), and `sheriff validate` compares them with what their source gives (§s-agc6fb3vx46pc23). The check of RecordType variants and the generated types also rely on a field's values (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in one way, the values are the same for each of them and on every machine.",
    ruReason: "`sheriff reindex` записывает собранные значения рядом с полем (§s-ztseyetus7np6br), а `sheriff validate` сравнивает их с тем, что даёт их источник (§s-agc6fb3vx46pc23). На значения поля опираются также проверка вариантов RecordType и сгенерированные типы (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные одним способом, значения одинаковы для каждого из них и на каждой машине.",
    reasonChange: NO_REASON,
    examples: [
      X("In a base specification divided into domains, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.",
        "В базовой спецификации, разделённой на домены, у RecordType записи audit log есть поле `part`, `x-enumSource.from` которого — `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает в `x-enumSource.gathered` поля `contracts`, `requests` и `users`. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`: это часть базовой спецификации, хотя и не домен."),
    ],
    refs: [
      R("implements", "s-xfu2gpzddjnmgks"),
      R("implements", "s-gqavjzcmubg5pvk"),
      R("implements", "s-mt6auv3jz8m5gzh"),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-ju5vcanbjph7mgh"),
      R("cites", "s-ztseyetus7np6br"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-agc6fb3vx46pc23"),
      R("cites", "s-c2r9jndrjbtbsv6"),
      R("cites", "s-a8fn72xa782wvbk"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node says how the SpecSheriff tools collect the values, and the check of rows 12.12.11 to 12.12.13 is the new node “The values and the source of a field with `enum`” (s-dk3zfkbhc3v6xbp).",
      "The `implements` link to “How a domain's added values find their field” (s-gzfq3x8hesj227e): that rule is in the archive with no replacement.",
      "The source “the members of each `TextRule.list` a rule of a domain adds to it” and the four refusals about such lists: the owner removed that source on 2026-11-16 (s-xfu2gpzddjnmgks).",
      "The source “the names of the domains”: the owner replaced it on 2026-11-18 with the names of the parts of the base specification (s-gqavjzcmubg5pvk).",
      "The refusals of a field holding no value and of a kind that the schema does not hold: they moved to “The values and the source of a field with `enum`” (s-dk3zfkbhc3v6xbp).",
      "The name NodeKind, which the owner removed on 2026-11-10 (s-vsh384ybt4w25a2).",
    ],
    date: DATE,
  },
  stage3: "values.ts:43-69 (gather) reads the fields of type `one of` in the former `fields`, with the sources `domains`, `domainNames` and `kindSids`. It is to read `enum` and `x-enumSource` in each schema within a RecordType's `schema`, at any depth. The source `parts` is to give the name of each folder of the base specification, contracts and base included, each with the sid of the node that its part opens with; `domainNames` today reads only the domains' headers and leaves contracts out. The source `kind` is to take the nodes of that kind in the base specification, the nodes in cells included. The source `domains` and its lists go (validate.ts:341-353, values.ts:51-56), since s-gzfq3x8hesj227e is in the archive. gather already orders the values by the nodes they come from, in the order in which the specification reads them. Tests for each source, for contracts among the parts and for a node of the kind in a cell are written first and carry s-5nf87c3e3jg9v7c. The test at validate.test.ts:514 moves to the new node s-dk3zfkbhc3v6xbp. The decisions of the node stay on it.",
});

add("new:tools-7-1-enum-values", {
  from: "s-5nf87c3e3jg9v7c",
  location: "tools 7.1.18a (new, after “Where the values of a field with `enum` are collected”)",
  sidValue: NEW_SID,
  testsFrom: [
    "refuses a field of type one of holding no value, in its own list or in a list of a domain",
    "refuses a domain's list naming a field holding its own list, and a field naming a kind the schema does not hold",
  ],
  proposal: {
    title: "The values and the source of a field with `enum`",
    ruTitle: "Значения и источник поля с `enum`",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `enum` (§s-xfu2gpzddjnmgks) only where both of the following hold:",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `enum` (§s-xfu2gpzddjnmgks), только если выполнены оба условия:",
        "Из узла «Where the values of a field of type `one of` are collected»: отказы, которые в нём остались после того, как вы убрали перечни, которые добавляют домены (2026-11-16), и имена доменов как источник (2026-11-18). Это отдельный узел по правилу 7.3.3: то, как собираются значения, нужно и `sheriff reindex`, и проверке вариантов RecordType, без этих отказов. Отказы, которые касались перечней доменов, убраны вместе с ними."),
      L("its source gives it at least one value, as the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);",
        "его источник даёт ему хотя бы одно значение в том виде, в каком инструменты SpecSheriff собирают его значения (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);",
        "Было: «It refuses: a field holding no value». Без изменений по смыслу; это строка 12.12.12. Значения считаются так, как их собирает узел «Where the values of a field with `enum` are collected»."),
      L("where its `x-enumSource.from` is `kind`, its `x-enumSource.kind` names one of the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).",
        "если его `x-enumSource.from` — `kind`, его `x-enumSource.kind` называет один из типов узлов, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).",
        "Было: «a NodeKind named that the schema does not hold». По строке 12.12.13 и правилу 12.8 значения — sid узлов собственного типа проекта, поэтому тип узлов SpecSheriff guidelines, например `TextRule`, не подходит; сейчас код его принимает. Имя NodeKind вы убрали 2026-11-10."),
      P("`sheriff validate` refuses any other field with `enum`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and, where the field fails the second condition, the kind.",
        "Любое другое поле с `enum` `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) RecordType, который его содержит. Отказ называет также само поле и, если поле не выполняет второго условия, тип узлов.",
        "Новое: что называет отказ."),
      P("`sheriff validate` refuses a field whose own `enum` holds a value more than once when it validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value once.",
        "Поле, собственный `enum` которого содержит значение больше одного раза, `sheriff validate` отвергает, когда проверяет файлы на соответствие схеме спецификации (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` в `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение один раз.",
        "Новое: строка 12.12.11. Повтор значения в собственном `enum` уже отвергает схема расширения RecordType, поэтому узел говорит, что это делает проверка по схеме. Собранные значения хранятся в `x-enumSource.gathered`, а не в `enum`, поэтому они не считаются, как и говорит строка."),
      P("`sheriff validate` checks each field with `enum` at any depth within the `schema` of each RecordType in the files that the repository keeps. It makes these checks regardless of whether the specification is approved or a draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).",
        "`sheriff validate` проверяет каждое поле с `enum` на любой глубине `schema` каждого RecordType в файлах, которые хранит репозиторий. Эти проверки он выполняет независимо от того, одобрена спецификация или она черновик (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).",
        "Новое: какие поля проверяются, и что стоимость строк 12.12.11–12.12.13, «отклоняется», не зависит от статуса одобрения спецификации."),
    ],
    reason: "The types and RuntimeChecks generated for a field accept only the field's values (§s-e877bnfa559tvk9). So a field that has no value, or whose source names a kind that no node can have, admits no data record.",
    ruReason: "Типы и RuntimeCheck, сгенерированные для поля, принимают только значения этого поля (§s-e877bnfa559tvk9). Поэтому поле, у которого нет значения или источник которого называет тип, которого не может быть ни у одного узла, не допускает ни одной записи данных.",
    reasonChange: "Новое.",
    examples: [
      X("The RecordType of a step of a job has a field `chapter` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once the field names `chapter`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule`, since the schema of the SpecSheriff guidelines defines that kind.",
        "У RecordType шага задачи есть поле `chapter`, `x-enumSource.from` которого — `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отвергает это поле и называет `TextRule`. Когда поле называет `chapter`, тип узлов, который добавляет расширение схемы проекта, а в базовой спецификации есть узел этого типа, поле проходит проверку. Самая вероятная ошибка — принять `TextRule` потому, что этот тип узлов определяет схема SpecSheriff guidelines."),
    ],
    refs: [
      R("implements", ROW.r12_12_11),
      R("implements", ROW.r12_12_12),
      R("implements", ROW.r12_12_13),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-xfu2gpzddjnmgks"),
      R("cites", "s-5nf87c3e3jg9v7c"),
      R("cites", "s-xm8rz4uupb73gu5"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-xzcw3hv4hmxz7h7"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-e877bnfa559tvk9"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "validate.ts:357-367 refuses a field of type `one of` holding no value, and validate.ts:374 a kind that is neither one of BASE_KINDS nor one of the project's kinds. It is to read the JSON Schema form at any depth, to count a source's values as s-5nf87c3e3jg9v7c collects them, and to accept only a kind that the project's extension of the schema adds in its field `kinds`: it accepts the kinds of the SpecSheriff guidelines today. A value written twice in a field's own enum is refused by recordtype.schema.json (uniqueItems on enum) when the files are validated against the schema; a test of that is written first and carries s-dk3zfkbhc3v6xbp. The tests at validate.test.ts:417 and :514 are rewritten first for the JSON Schema form and carry s-dk3zfkbhc3v6xbp; the first half of :514, on a domain's list, goes. The check is to run only where the RecordType extension is chosen.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 47: "A used domain's RecordType, only from the declared sections" (s-ezq8csd433vj6fj), rows 12.12.15, 12.12.16.
// ---------------------------------------------------------------------------------------------------------------
add("s-ezq8csd433vj6fj", {
  location: "tools 7.1.14",
  sidValue: "s-ezq8csd433vj6fj",
  testsFrom: [],
  proposal: {
    title: "A RecordType that refers outside its part of the system",
    ruTitle: "RecordType, который ссылается за пределы своей части системы",
    titleChange: "Было: «A used domain's RecordType, only from the declared sections». Правило, которое узел реализовывал (s-5yvpn4zhuqmv5bq), в архиве; его заменило правило 12.10, по которому RecordType ссылается только на RecordType своей части системы и на фрагменты формата.",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает ссылку одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):",
        "Было: «A using domain takes a RecordType of a used domain only from the sections its domain's header names in its `consumes` links. Otherwise `sheriff validate` reports it (§s-5yvpn4zhuqmv5bq).» Правило s-5yvpn4zhuqmv5bq в архиве; его заменило правило 12.10 (ваше решение от 2026-11-14): RecordType ссылается только на RecordType своей части системы и на фрагменты формата, что бы ни говорили связи `consumes`. Узел теперь говорит, какие ссылки принимаются, по строкам 12.12.15 и 12.12.16. Новое: проверка выполняется, только если проект выбрал расширение RecordType."),
      L("from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of the same part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);",
        "от RecordType вне контрактов (§s-z6tq6a3btnvvwx7) — на RecordType той же части системы или на фрагмент формата (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);",
        "Новое: строка 12.12.15."),
      L("from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).",
        "от фрагмента формата — на другой фрагмент формата (§s-hn9m9dhxaazjn3y).",
        "Новое: строка 12.12.16 (ваше решение от 2026-11-19)."),
      P("`sheriff validate` reports each RecordType that holds any other reference, naming it by its sid and naming the RecordType that it refers to (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.",
        "О каждом RecordType, который содержит любую другую ссылку, `sheriff validate` сообщает, называя его sid и RecordType, на который он ссылается (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). Изменение при этом проходит.",
        "Было: «The report gives the sid of the RecordType that names the other. The change is not refused.» Без изменений по смыслу: по строкам 12.12.15 и 12.12.16 о такой ссылке сообщается по sid узла."),
      P("A RecordType refers to another RecordType in either of these ways:",
        "RecordType ссылается на другой RecordType одним из этих способов:",
        "Было: «A RecordType names another by a field's type or by its `refines` link.» Без изменений по смыслу."),
      L("a schema within its `schema` (§s-6eb92ddch7shuvu), at any depth, holds a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);",
        "схема в его `schema` (§s-6eb92ddch7shuvu) на любой глубине содержит `$ref`, который указывает на тот RecordType, или `identifierOf`, который его называет (§s-qpdnkejr5xzc6j3);",
        "Было: «by a field's type». В формате JSON Schema тип поля ссылается на RecordType через `$ref` или `identifierOf` (ваше решение от 2026-11-19). Новое: на любой глубине, как требует правило 12.10."),
      L("it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.",
        "у него есть связь `refines` (§s-sn6au3vcr9uy5pm) с тем RecordType.",
        "Было: «or by its `refines` link». Без изменений по смыслу."),
      P("A fragment of a format is a RecordType of the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes that no such section holds are treated as belonging to one part of the system.",
        "Фрагмент формата — это RecordType в контрактах. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), часть системы, к которой относится RecordType, — это домен, в файлах которого он находится. Иначе это раздел `specs/base/`, который содержит RecordType и расположение (§s-kag2m9tzdnduxdx) которого — `base/` и одно число. RecordType, которые не содержит ни один такой раздел, считаются относящимися к одной части системы.",
        "Новое: что такое фрагмент формата и часть системы для инструментов SpecSheriff. Фрагменты объявляются только в контрактах (правило 12.1, ваше решение от 2026-11-16). Часть системы в спецификации — домен или раздел верхнего уровня базовой спецификации (правило 12.1, ваши решения от 2026-11-19)."),
      P("`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).",
        "`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).",
        "Новое: стоимость строк 12.12.15 и 12.12.16, «сообщается по sid узла», не зависит от статуса одобрения спецификации."),
    ],
    reason: "A RecordType that refers to the RecordType of another part of the system changes whenever that part changes that RecordType, though nothing in its own part has changed (§s-8ht2hn88cu2qwz9). A field with `identifierOf` is such a reference too, since it takes its type from the RecordType that it names (§s-6eb92ddch7shuvu).",
    ruReason: "RecordType, который ссылается на RecordType другой части системы, меняется всякий раз, когда та часть меняет этот RecordType, хотя в его собственной части ничего не изменилось (§s-8ht2hn88cu2qwz9). Поле с `identifierOf` — тоже такая ссылка, потому что оно получает свой тип от RecordType, который оно называет (§s-6eb92ddch7shuvu).",
    reasonChange: NO_REASON,
    examples: [
      X("In the domain `requests`, the RecordType of a request has a field `address` with a `$ref` to the fragment of a format `address`. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports the RecordType of a request by its sid, names the RecordType of a user, and lets the change pass. The most likely mistake is to leave the field `user` unreported because it holds only an identifier. The domain `requests` can keep a user's identifier in a field of type `string`, which refers to no RecordType.",
        "В домене `requests` у RecordType заявки есть поле `address` с `$ref` на фрагмент формата `address`. Есть у него и поле `user`, `identifierOf` которого называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType заявки по его sid, называет RecordType пользователя и пропускает изменение. Самая вероятная ошибка — не сообщать о поле `user` потому, что оно содержит только идентификатор. Домен `requests` может хранить идентификатор пользователя в поле типа `string`, которое ни на какой RecordType не ссылается."),
    ],
    refs: [
      R("implements", ROW.r12_12_15),
      R("implements", ROW.r12_12_16),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-8ht2hn88cu2qwz9"),
      R("cites", "s-z6tq6a3btnvvwx7"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-qpdnkejr5xzc6j3"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-kag2m9tzdnduxdx"),
    ],
    removed: [
      MAIN_TABLE("rows 12.12.15 (s-rpkq8y79fwg5k92) and 12.12.16 (s-hn9m9dhxaazjn3y) of the table of checks of the RecordType extension"),
      "The `implements` link to “A domain uses another domain's RecordTypes only from the sections it declares” (s-5yvpn4zhuqmv5bq): that rule is in the archive, and “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) replaces it.",
      "The reading of the `consumes` links of a domain's header: under s-8ht2hn88cu2qwz9 a RecordType refers to no RecordType of another part of the system, whatever those links say (the owner, 2026-11-14).",
    ],
    date: DATE,
  },
  stage3: "No code makes this check: the continuation file found none (2026-11-14), and nothing in skills/tools/src cites s-ezq8csd433vj6fj or s-5yvpn4zhuqmv5bq. It is to be written in validate.ts, its tests first: a `$ref` and an `identifierOf`, at any depth, and a refines link, each to a RecordType of another domain, reported by the referring RecordType's sid; a fragment of a format that refers to a RecordType outside the contracts section, reported; references within one part and to fragments, passing; without the Domains extension, a reference between two sections of specs/base/ whose locations are base/1 and base/2, reported. The finding is reported, with reported: true, and leaves the exit status at zero. The check is to run only where the RecordType extension is chosen.",
});

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// The nodes a link may point to: the new form, the appendix of the tools, the sids the drafts give.
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
for (const e of Object.values(entries)) targets.add(e.sidValue);
for (const sid of Object.values(ROW)) if (!targets.has(sid)) problems.push(`row ${sid} names no known node`);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (!e.from || !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}

// The new sid: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(NEW_SID)) problems.push(`the new sid ${NEW_SID} is not of the form of a sid`);
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
  if (texts.some((t) => t.includes(NEW_SID))) problems.push(`the new sid ${NEW_SID} is already held`);
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  // A `cites` link that a decision of the node still cites stays (the brief, "Citations").
  const decisions = JSON.stringify(toolsNodes.get(key)?.meta?.decisions ?? []);
  const citedByDecisions = new Set(citedIn(decisions));
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
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  // Each part says the same in both languages as far as code goes: the same text in backticks.
  for (const x of p.parts) {
    const ticks = (s) => [...s.matchAll(/`[^`]*`/g)].map((m) => m[0]).sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  }
  for (const x of p.examples || []) {
    const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  }
  // Each node of a check says whether it runs while the specification is a draft.
  if (/`sheriff validate` (refuses|accepts|reports)/.test(p.text) && !/regardless of whether the specification is approved or a draft/.test(p.text)) problems.push(`${key}: a check that does not say whether it runs while the specification is a draft`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}
// The phrases the agreed drafts avoid.
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/];
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + p.reasonChange;
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
// No key outside the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group5.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 5: the English of every node",
  "",
  "This file holds the final English of every node of group 5 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group5.mjs: the drafts of items 41 to 47 of the appendix of the tools, which make the checks of the tables of checks of the Domains extension and of the RecordType extension, and the node split from item 46.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group5.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group5.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
