// Writes group5-ru.json: the Russian of what the drafts of group 5 hold only in English and the owner's page shows in its
// Russian parts. These are the stage-3 notes, the removed passages, the note in a location and the approved nodes of
// tools.json that the drafts replace. Each entry keeps the English it renders, so gen-group5-page.mjs refuses a Russian
// that a changed draft has made out of date. It is build-group4-ru.mjs adapted to group 5.
//
// The script adds only the entries that group5-ru.json lacks, and reports each entry whose English has changed since.
// Such an entry is corrected here and in group5-ru.json, which from then on holds the Russian that the page shows.
// Usage: node build-group5-ru.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
const outUrl = new URL("group5-ru.json", here);
const out = fs.existsSync(outUrl) ? read("group5-ru.json") : {};

const STAGE3 = {
  "s-vuujweu57sxsa58": "validate.ts:257-269 (domains) строит, какой домен какой использует, по связям consumes, которые он принимает, а findCycle (validate.ts:272-293) отвергает первый найденный круг и называет его домены, соединённые стрелками, в specs/; это и говорит узел. Проверка должна выполняться, только если выбрано расширение Domains; isDomain (model.ts:244) считает доменом каждую часть, кроме _guidelines, contracts, tech и _archive, в том числе base. Тест в validate.test.ts:323 должен нести s-vuujweu57sxsa58 вместо s-jau82aq9juv9zzh; сначала пишется тест, в котором ссылка между правилами двух доменов не образует круга, и проверяется, что он проходит по верной причине. Решение узла остаётся на нём.",
  "s-gvafe6bnstwab8b": "validate.ts:446-452 (appendices) отвергает каждый узел верхнего уровня файла specs/tech/, кроме stack.json и debt.json, если имя файла — не имя домена. Проверка должна выполняться, только если выбрано расширение Domains, отвергать такой файл один раз и называть его, а каждый раздел под первым узлом верхнего уровня файла, названного по домену, сравнивать с разделами домена по названиям, которые к нему ведут. isDomain (model.ts:244) считает `base` доменом, поэтому specs/tech/base.json сейчас проходит; с расширением Domains его нужно отвергать, потому что ни один домен не называется `base` (s-zefk589ykh37b8u). В проекте без расширения Domains нынешний код тоже отвергает файл вроде specs/tech/foo.json, потому что isDomain('base') истинно. Стадия 3 убирает этот отказ и ничего не ставит на его место, поэтому проверку правила 1.1.2 без расширения нужно предложить вам до того, как стадия 3 изменит код; это записано в файле продолжения. Тест в validate.test.ts:315 должен нести s-gvafe6bnstwab8b; сначала пишется тест для раздела, название которого в домене стоит в другом месте. Решение узла остаётся на нём.",
  "s-uxmkwbnpgtjzkgv": "validate.ts:247-248 отвергает заголовок, уровня которого нет в перечне, в том числе заголовок без уровня, потому что header.level тогда undefined. Код должен принимать заголовок без уровня и выполнять проверку, только если выбрано расширение Domains. levelsOf (model.ts:231-240) берёт перечень последнего правила project.json, которое уточняет s-nkyty4dy9x2v2a4, в том виде, в каком его хранит файл. Он должен брать элементы каждого такого правила в том порядке, в каком идут эти правила, каждое — в его последней одобренной формулировке, а правило, которое ни разу не одобряли, ничего не перечисляет (s-t9j29hppag2nren, согласованный узел new:tools-1-project). Тест в validate.test.ts:290 должен нести s-uxmkwbnpgtjzkgv; сначала пишутся тесты для заголовка без уровня и для уровня, который добавляет только формулировка-черновик.",
  "s-3anv9qcmx8pwp2w": "validate.ts:413-440 читает поле типа `identifier of` и его `record` в прежних `fields`. Отказ должен называть поле указателем JSON Pointer на его схему внутри `schema` RecordType. validate.ts:424 уже считает пройденными только те RecordType, к которым ведёт цепочка, как и говорит узел. Код должен читать `identifierOf` в каждой схеме внутри `schema` RecordType на любой глубине и брать идентифицирующее поле из `identifiedBy` среди полей, объявленных в `schema.properties` или взятых через refines. В validate.ts:427 (`if (!next) break`) цикл к тому же останавливается и ничего не отвергает, если identifierOf не называет ни одного RecordType; там тоже нужно отвергать поле, с которого начинается цепочка. В validate.ts:425-434 цикл молча останавливается, если цепочка доходит до RecordType без идентифицирующего поля; нужно отвергать и поле в начале такой цепочки, потому что цепочка не заканчивается полем без identifierOf. validate.ts:423 отвергает, если identifierOf не называет ни одного RecordType или у названного RecordType нет identifiedBy; он должен также отвергать поле, если identifiedBy не называет ни одного из полей этого RecordType. validate.ts:419 отвергает identifiedBy, который не называет ни одного из полей RecordType, даже если на этот RecordType не ссылается ни одно поле. Ни одна строка таблицы 12.12 такой проверки не перечисляет, поэтому она уходит; это записано среди изменений вне группы. Проверка должна выполняться, только если выбрано расширение RecordType. Тесты в validate.test.ts:406 и :427 сначала переписываются для формы JSON Schema и должны нести s-3anv9qcmx8pwp2w; вторая половина :406 уходит вместе с отказом в :419. Решения узла остаются на нём.",
  "s-c2r9jndrjbtbsv6": "validate.ts:310-411 (variants) берёт RecordType варианта по его первой связи refines с RecordType (refined), а поля, выбирающие вариант, — из ближайшего chosenBy вверх по цепочке. Он сравнивает значение со значениями, объявленными в собственном перечне поля или в перечне домена, привязывает вариант к части, которая объявляет значение, считает своими поля, которых нет ни у одного RecordType выше по цепочке, считает поля типа variant и группирует варианты с одинаковым answersTo по RecordType, который называет chosenBy. Код должен узнавать вариант по answersTo; брать его RecordType из единственной связи refines с RecordType, у которого есть поля, выбирающие вариант, и отвергать вариант без такой связи или с несколькими такими связями; сравнивать ближайший раздел, который содержит вариант, с ближайшим разделом, который содержит его RecordType; читать поля из properties в `schema`, включая взятые через refines, и сравнивать их имена посимвольно; брать значения так, как их собирает s-5nf87c3e3jg9v7c; группировать варианты с одинаковым answersTo по их RecordType. Если вариант не выполняет первого условия, `continue` в validate.ts:384-386 должен уйти, чтобы третье условие всё равно проверялось. Если у RecordType нет chosenBy, а RecordType с chosenBy, к которым от него ведёт наименьшее число связей refines, называют разные поля, каждый вариант, который его уточняет, нужно отвергать по первому условию и называть каждый из этих RecordType. Поля, выбирающие вариант, ищутся по всем связям refines RecordType, включая связи с фрагментом формата. Подсчёт полей типа variant (validate.ts:338-339) и часть, которая объявляет значение (validate.ts:404), уходят. Проверка должна выполняться, только если выбрано расширение RecordType. Тесты в validate.test.ts:333 и :343 сначала переписываются для формы JSON Schema и должны нести s-c2r9jndrjbtbsv6. Тесты в :349, :369, :373, :396 и :437, которые касаются поля типа variant, перечней доменов и части, которая объявляет значение, уходят или переписываются для строк 12.12.5, 12.12.7 и 12.12.10. Сначала пишутся тесты для варианта, который уточняет ещё и фрагмент формата, для варианта, объявленного в другом разделе, и для имени поля, взятого через refines. Решения узла остаются на нём.",
  "s-5nf87c3e3jg9v7c": "values.ts:43-69 (gather) читает поля типа `one of` в прежних `fields`, с источниками `domains`, `domainNames` и `kindSids`. Код должен читать `enum` и `x-enumSource` в каждой схеме внутри `schema` RecordType на любой глубине. Если выбрано расширение Domains, источник `parts` должен давать имя папки каждого домена, каждое с sid его заголовка, и `contracts` с sid первого узла верхнего уровня первого файла specs/contracts/; `domainNames` сейчас читает только заголовки доменов и пропускает контракты. Без расширения Domains он должен давать `contracts` с sid первого узла верхнего уровня первого файла specs/contracts/ и название каждого раздела, расположение которого — base/ и одно число, с sid этого раздела. Это ответ А, который рекомендован в вопросе к вам в конце страницы, а код последует вашему ответу. Источник `kind` должен брать узлы этого типа в базовой спецификации, включая узлы в ячейках. Источник `domains` и его перечни уходят (validate.ts:341-353, values.ts:51-56), потому что s-gzfq3x8hesj227e в архиве. gather уже упорядочивает значения по узлам, из которых они приходят, в том порядке, в каком читается спецификация. Тесты для каждого источника, для контрактов среди частей и для узла этого типа в ячейке пишутся первыми и несут s-5nf87c3e3jg9v7c. Тест в validate.test.ts:514 переходит к новому узлу s-dk3zfkbhc3v6xbp. Решения узла остаются на нём.",
  "new:tools-7-1-enum-values": "validate.ts:357-367 отвергает поле типа `one of` без значений, а validate.ts:374 — тип, которого нет ни среди BASE_KINDS, ни среди типов проекта. Код должен читать форму JSON Schema на любой глубине, считать значения источника так, как их собирает s-5nf87c3e3jg9v7c, и принимать только тип, который расширение схемы проекта добавляет в своём поле `kinds`; сейчас он принимает типы SpecSheriff guidelines. Значение, записанное дважды в собственном enum поля, отвергает recordtype.schema.json (uniqueItems для enum), когда файлы проверяются по схеме; тест на это пишется первым и несёт s-dk3zfkbhc3v6xbp. Тесты в validate.test.ts:417 и :514 сначала переписываются для формы JSON Schema и несут s-dk3zfkbhc3v6xbp; первая половина :514, о перечне домена, уходит. Отказ для значения, объявленного больше одного раза (validate.ts:354-356), уходит: повтор значения в собственном `enum` поля отвергает схема, а строка 12.12.11 собранные значения не учитывает, поэтому значение, собранное дважды, не отвергается. Отказ должен называть поле указателем JSON Pointer на его схему внутри `schema` RecordType. Проверка должна выполняться, только если выбрано расширение RecordType.",
  "s-ezq8csd433vj6fj": "Эту проверку не делает никакой код: файл продолжения его не нашёл (2026-11-14), и ничто в skills/tools/src не ссылается на s-ezq8csd433vj6fj или s-5yvpn4zhuqmv5bq. Её нужно написать в validate.ts, сначала тесты. О `$ref` и `identifierOf` на любой глубине и о связи refines, каждая из которых ведёт к RecordType другого домена, сообщается, и сообщение называет по sid и ссылающийся RecordType, и RecordType, на который он ссылается. О фрагменте формата, который ссылается на RecordType вне контрактов, тоже сообщается. Ссылки внутри одной части и на фрагменты проходят. Без расширения Domains о ссылке между двумя разделами specs/base/ с расположениями base/1 и base/2 сообщается. О находке сообщается с reported: true, и код завершения остаётся нулевым. Проверка должна выполняться, только если выбрано расширение RecordType.",
};

const IMPL = (rows) => `Связь \`implements\` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует ${rows}.`;
const REMOVED = {
  "s-vuujweu57sxsa58": [IMPL("строку 11.3.4 (s-bncp7gtyaukur8e) таблицы проверок расширения Domains")],
  "s-gvafe6bnstwab8b": [IMPL("строку 11.3.5 (s-vghy37e3p2325ah) таблицы проверок расширения Domains")],
  "s-uxmkwbnpgtjzkgv": [IMPL("строку 11.3.6 (s-j3v4y4d3sbmdgfp) таблицы проверок расширения Domains")],
  "s-3anv9qcmx8pwp2w": [
    IMPL("строки 12.12.2 (s-qpdnkejr5xzc6j3) и 12.12.3 (s-cqys6wqrnfzu5ac) таблицы проверок расширения RecordType"),
    "Слова «A field of type `identifier of`»: по вашему решению от 2026-11-19 поле ссылается на RecordType через `identifierOf`, слово SpecSheriff.",
  ],
  "s-c2r9jndrjbtbsv6": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh). Она становится связью `cites`, потому что решение от 2026-10-31 по этому узлу ссылается на эту таблицу: узел реализует строки 12.12.4–12.12.10 таблицы проверок расширения RecordType.",
    "Связь `implements` с узлом «Where a value is declared» (s-xfwuvd3funutmsw): это правило в архиве, а вариант теперь объявляется в том же разделе, что и его RecordType (s-z3dnru6qqdf9m6j, строка 12.12.5).",
    "Пункт, который держал вариант в той части спецификации, где объявлено его значение: его заменил пункт о разделе (строка 12.12.5).",
    "Пункт, который разрешал не больше одного поля типа `variant` вдоль связей `refines`, и поля, которые такое поле содержит: тип `variant` вы убрали 2026-11-19 (s-z3dnru6qqdf9m6j).",
  ],
  "s-5nf87c3e3jg9v7c": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел говорит, как инструменты SpecSheriff собирают значения, а проверку строк 12.12.11–12.12.13 делает новый узел «Fields with `enum` that `sheriff validate` accepts» (s-dk3zfkbhc3v6xbp).",
    "Связь `implements` с узлом «How a domain's added values find their field» (s-gzfq3x8hesj227e): это правило в архиве, и замены у него нет.",
    "Источник «the members of each `TextRule.list` a rule of a domain adds to it» и четыре отказа, связанные с такими перечнями: этот источник вы убрали 2026-11-16 (s-xfu2gpzddjnmgks).",
    "Источник «the names of the domains»: 2026-11-18 вы заменили его именами частей базовой спецификации (s-gqavjzcmubg5pvk).",
    "Отказы для поля без значений и для типа, которого нет в схеме: они перешли в узел «Fields with `enum` that `sheriff validate` accepts» (s-dk3zfkbhc3v6xbp).",
    "Имя NodeKind, которое вы убрали 2026-11-10 (s-vsh384ybt4w25a2).",
  ],
  "s-ezq8csd433vj6fj": [
    IMPL("строки 12.12.15 (s-rpkq8y79fwg5k92) и 12.12.16 (s-hn9m9dhxaazjn3y) таблицы проверок расширения RecordType"),
    "Связь `implements` с узлом «A domain uses another domain's RecordTypes only from the sections it declares» (s-5yvpn4zhuqmv5bq): это правило в архиве, и его заменило правило «What a RecordType may refer to» (s-8ht2hn88cu2qwz9).",
    "Чтение связей `consumes` заголовка домена: по s-8ht2hn88cu2qwz9 RecordType не ссылается ни на один RecordType другой части системы, что бы ни говорили эти связи (ваше решение от 2026-11-14).",
  ],
};

const LOCATION = {
  "new:tools-7-1-enum-values": "tools 7.1.18a (новый узел, после «Where the values of a field with `enum` are collected from»)",
};

const APPROVED = {
  "s-vuujweu57sxsa58": {
    ruTitle: "Никакой циклической зависимости между доменами",
    ru: "`sheriff validate` обходит домены по связям `consumes`: от заголовка каждого домена к доменам, разделы которых он называет. Если обход возвращается к домену, который уже прошёл, проверка отвергает изменение. Она называет домены вдоль этого круга.",
  },
  "s-gvafe6bnstwab8b": {
    ruTitle: "Файл технического приложения, названный по домену",
    ru: "`sheriff validate` ищет среди доменов имя каждого файла технического приложения, кроме `stack.json` и `debt.json`.",
  },
  "s-uxmkwbnpgtjzkgv": {
    ruTitle: "Уровень заголовка",
    ru: "`sheriff validate` ищет уровень, который называет каждый заголовок, в перечне, который содержат собственные guidelines проекта.",
  },
  "s-3anv9qcmx8pwp2w": {
    ruTitle: "Идентификатор, прослеженный до конца",
    ru: "`sheriff validate` ищет RecordType, который называет каждое поле типа `identifier of`. Среди полей этого RecordType он ищет то, которое RecordType называет идентифицирующим его.\n\n- Если это поле само — идентификатор, RecordType, который оно называет, прослеживается так же, пока не встретится поле другого типа.\n- RecordType, к которому прошли дважды, отвергается.",
  },
  "s-c2r9jndrjbtbsv6": {
    ruTitle: "С чем должен согласовываться вариант RecordType",
    ru: "`sheriff validate` проверяет, что каждый вариант RecordType согласуется с RecordType, который он уточняет и который находится по связи `refines` варианта:\n\n- поля, на которые отвечает вариант, — те, которые ближайший RecordType выше по его связям `refines` называет выбирающими его;\n- каждое значение, на которое он отвечает, есть среди значений его выбирающего поля, собранных из единственного источника поля (§s-5nf87c3e3jg9v7c);\n- вариант находится в той части спецификации, где объявлено его значение (§s-xfwuvd3funutmsw);\n- вариант объявляет хотя бы одно поле, которого нет ни у одного RecordType выше по его связям `refines`, включая поля, которые содержат их поля типа `variant`;\n- вдоль этих связей находится не больше одного поля типа `variant`;\n- ни один другой вариант того же RecordType не отвечает на те же значения.\n\nВариант, который не выполняет хотя бы одно из этих условий, отвергается.",
  },
  "s-5nf87c3e3jg9v7c": {
    ruTitle: "Где собираются значения поля типа `one of`",
    ru: "`sheriff validate` собирает значения каждого поля типа `one of` из его единственного источника (§s-xfu2gpzddjnmgks), и этот источник — одно из следующего:\n\n- его собственный перечень;\n- элементы каждого `TextRule.list`, который добавляет к нему правило домена. Каждый такой перечень находится по связи `refines` его правила, которая ведёт к RecordType контрактов, содержащему это поле. Перечень называет это поле (§s-gzfq3x8hesj227e);\n- имена доменов;\n- sid узлов того NodeKind, который поле называет, находящихся в базовой спецификации.\n\nОн отвергает:\n\n- поле без значений;\n- значение, найденное в двух перечнях, которые правила доменов добавляют к полю;\n- перечень домена, правило которого не уточняет ни одного RecordType контрактов;\n- перечень домена, который называет поле, которого нет у RecordType, уточняемого его правилом;\n- перечень домена, который называет поле с другим источником;\n- названный NodeKind, которого нет в схеме.",
  },
  "s-ezq8csd433vj6fj": {
    ruTitle: "RecordType используемого домена — только из объявленных разделов",
    ru: "Использующий домен берёт RecordType используемого домена только из тех разделов, которые заголовок его домена называет в своих связях `consumes`. Иначе `sheriff validate` сообщает об этом (§s-5yvpn4zhuqmv5bq).\n\n- RecordType называет другой RecordType типом поля или своей связью `refines`.\n- Сообщение даёт sid RecordType, который называет другой. Изменение не отвергается.",
  },
};

// The approved nodes of tools.json, by sid.
const tools = read("../../specs/_guidelines/tools.json");
const nodeOf = new Map();
const walk = (n) => {
  if (n.sid) nodeOf.set(n.sid, n);
  (n.children || []).forEach(walk);
};
tools.nodes.forEach(walk);

const stale = [];
const put = (section, key, entry) => {
  out[section] ??= {};
  const have = out[section][key];
  if (!have) out[section][key] = entry;
  else if (JSON.stringify({ ...have, ru: undefined, ruTitle: undefined }) !== JSON.stringify({ ...entry, ru: undefined, ruTitle: undefined })) stale.push(`${section} ${key}`);
};
for (const [k, ru] of Object.entries(STAGE3)) put("stage3", k, { en: drafts[k].stage3, ru });
for (const [k, list] of Object.entries(REMOVED)) {
  const en = drafts[k].proposal.removed;
  if (en.length !== list.length) throw new Error(`${k}: ${en.length} removed passages, ${list.length} in Russian`);
  out.removed ??= {};
  const have = out.removed[k];
  if (!have) out.removed[k] = en.map((e, i) => ({ en: e, ru: list[i] }));
  else en.forEach((e, i) => { if (have[i]?.en !== e) stale.push(`removed ${k} [${i}]`); });
}
for (const [k, ru] of Object.entries(LOCATION)) put("location", k, { en: drafts[k].location, ru });
for (const [sid, a] of Object.entries(APPROVED)) {
  const n = nodeOf.get(sid);
  if (!n) throw new Error(`${sid} is not in tools.json`);
  put("approved", sid, { title: n.title, en: n.text, ruTitle: a.ruTitle, ru: a.ru });
}
fs.writeFileSync(outUrl, JSON.stringify(out, null, 2) + "\n");
console.log("group5-ru.json written");
if (stale.length) console.log(`out of date, to correct here and in group5-ru.json:\n${stale.join("\n")}`);
