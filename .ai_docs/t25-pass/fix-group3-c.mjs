// T25, stage 2, group 3, round c: applies the confirming reviews (review-g3b-a.md to review-g3b-d.md), the reports of
// EngStickler's readers on round b (english-g3b-fast.md, english-g3b-thorough.md) and the coordinator's rulings of
// round c to the drafts that fix-group3-b.mjs wrote. Copies tools-drafts.json to tools-drafts.before-group3-c.json
// before its first run, and on every run rebuilds the keys of the group from that copy, part by part, so a second run
// gives the same file. Adds three proposals: "Project-wide settings" (proposal:new-tools-1-settings-g3), the node on
// earlier releases (proposal:s-gb8s9657a65hqmv-g3) and a new row 10.1.35a of the main table of checks
// (proposal:row-10-1-35a). Checks every draft as fix-group3-b.mjs does, refuses to write where a key outside the group
// would change, and writes english-group3.md and english-group3-changed-c.md, which lists each sentence of round c
// written in the author's own words.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-c.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = (letter) => `specsheriff-rule-reviewer, 2026-11-24: review-g3-${letter}.md and review-g3b-${letter}.md; EngStickler's readers, 2026-11-24: english-g3-fast/thorough.md and english-g3b-fast/thorough.md; fix-group3-b.mjs and fix-group3-c.mjs applied the findings and the coordinator's rulings`;

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });

const S = {
  changedLine: "s-u6mj5yv8ngnz79v",
  draftRule: "s-w93jfnqynfa47pf",
  delivered: "s-mhsb6fjsq5xn6c9",
  ownKinds: "s-czxaqvaesmu3gru",
  row35a: "s-cgkkksc7efxhcst",
};
const GROUP = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht"];

const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round c`);
  entries[key] = JSON.parse(JSON.stringify(drafts[key]));
}

const OWN = [];
const own = (key, en) => OWN.push({ key, en });

const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const setPart = (key, start, fields) => Object.assign(parts(key)[at(key, start)], fields);
const removePart = (key, start) => parts(key).splice(at(key, start), 1)[0];
const insertAfter = (key, start, ...added) => parts(key).splice(at(key, start) + 1, 0, ...added);
const addChange = (key, start, note) => {
  const x = parts(key)[at(key, start)];
  x.change = `${x.change} Раунд c: ${note}`;
};
const dropRef = (key, to) => {
  const p = entries[key].proposal;
  const n = p.refs.length;
  p.refs = p.refs.filter((r) => r.to !== to);
  if (p.refs.length === n) throw new Error(`${key}: no link to ${to}`);
};
const replaceIn = (key, field, from, to) => {
  const e = entries[key];
  if (!e[field].includes(from)) throw new Error(`${key}.${field}: no ${JSON.stringify(from.slice(0, 60))}`);
  e[field] = e[field].replace(from, to);
};
const SAME = "Как в согласованной формулировке.";

// ---------------------------------------------------------------------------------------------------------------
// s-j9r8z4xdrfkfs47 (review g3b-a).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-j9r8z4xdrfkfs47";
  entries[k].review = REVIEW("a");
  setPart(k, "`sheriff binding` accepts a commit's change to the entries", {
    en: "For a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), `sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) only where both of the following hold:",
    ru: "Для настройки, которую меняет только ответственный за спецификацию (§s-chsfpkgpmfk4fft), `sheriff binding` принимает изменение, которое коммит вносит в записи в `sheriff.config.json` (§s-zefk589ykh37b8u), только если выполнено и то и другое:",
  });
  addChange(k, "For a setting that only an owner of the specification changes", "«only where» вместо «provided that»: список даёт единственные случаи, когда изменение принимается; предложение переставлено, чтобы «only» не читалось при «changes» (рецензент).");
  const p = entries[k].proposal;
  p.ruReason = p.ruReason.replace("Удаление, исправление или перестановка", "Удаление, правка или перестановка");
  p.reasonChange += " Раунд c: «правка» вместо «исправление»: «исправление» значит исправление ошибки, а «editing» — любое изменение (рецензент).";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-1-extensions-delivered (review g3b-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-extensions-delivered";
  entries[k].review = REVIEW("a");
  setPart(k, "The commands that read the chosen extensions include", {
    en: "The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which, as they compose the schema of the specification, add to it the schema of each chosen extension that has one (§s-xzcw3hv4hmxz7h7). The commands that read the chosen extensions also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).",
    ru: "Среди команд, которые читают выбранные расширения, — `sheriff validate`, `sheriff binding` и `sheriff reindex`, которые, составляя схему спецификации, добавляют в неё схему каждого выбранного расширения, у которого она есть (§s-xzcw3hv4hmxz7h7). Среди команд, которые читают выбранные расширения, есть и `sheriff guard`, который проверяет правку агента до того, как она сделана (§s-st6td4mua9uqt9z). Плагин поставляет расширение, если файл расширения находится по пути, указанному для каждого расширения guidelines (§s-zefk589ykh37b8u).",
  });
  addChange(k, "The commands that read the chosen extensions include", "первое предложение — рецензента: схема спецификации — результат сборки, в которую входят схемы выбранных расширений, и схема есть не у каждого расширения (правило 5.1, s-xzcw3hv4hmxz7h7). «The commands that read the chosen extensions also include» вместо «They also include»: оба чтеца прочли «They» и как три команды предыдущего предложения.");
  own(k, "The commands that read the chosen extensions also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z).");
}

// ---------------------------------------------------------------------------------------------------------------
// s-2x58az67bm6cxq2 (review g3b-b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  entries[k].review = REVIEW("b");
  const p = entries[k].proposal;
  p.title = "What a commit adds, changes and removes in the code and the tests";
  p.ruTitle = "Что коммит добавляет, меняет и удаляет в коде и тестах";
  p.titleChange += " Раунд c: заголовок рецензента — узел определяет также, что коммит добавляет, удаляет и оставляет неизменным.";
  // The paragraph on what a commit changes, adds and removes follows the first paragraph (the reviewer), and names
  // the symbols, the files bound as a whole and the tests with their citations, at their first use.
  const both = removePart(k, "A commit changes only the symbols, files bound as a whole and tests");
  both.en = "A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.";
  both.ru = "Коммит меняет только те символы (§s-kgbzk2ph9e6jfb4), файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), и тесты (§s-zrsc6asgmhv8tnc), которые есть и в родительском коммите, и в самом коммите. Каждый из них, который есть только в коммите, он добавляет. Каждый, который есть только в родительском коммите, он удаляет.";
  both.change += " Раунд c: абзац перенесён сразу за первый, чтобы читатель не принял добавленный символ за изменённый (рецензент); ссылки на символ, файл, привязанный целиком, и тест перенесены сюда, к их первому упоминанию.";
  insertAfter(k, "The SpecSheriff tools find what a commit adds, changes and removes", both);
  setPart(k, "A commit changes a symbol (§s-kgbzk2ph9e6jfb4)", {
    en: "A commit changes a symbol or a test where a line of that symbol or test changes the code (§s-u6mj5yv8ngnz79v). The lines of a symbol or a test run from its first line to its last, including its decorators. A line that changes the code changes every symbol and every test that holds it, so a change in a nested symbol also changes each symbol that encloses it.",
    ru: "Коммит меняет символ или тест, если строка этого символа или теста меняет код (§s-u6mj5yv8ngnz79v). Строки символа или теста идут от его первой строки до последней, включая его декораторы. Строка, которая меняет код, меняет каждый символ и каждый тест, в которых она находится, поэтому изменение во вложенном символе меняет и каждый символ, в который он вложен.",
  });
  addChange(k, "A commit changes a symbol or a test where a line", "«a line of that symbol or test» вместо «one of its lines»: оба чтеца прочли «its» и как строки коммита. Строки теста тоже включают его декораторы (рецензент): иначе добавление `@pytest.mark.skip` не меняло бы теста, и строка 10.1.41 к нему не применялась бы.");
  own(k, "A commit changes a symbol or a test where a line of that symbol or test changes the code (§s-u6mj5yv8ngnz79v).");
  setPart(k, "A line that the commit removes is read in the commit's parent.", {
    en: "A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    ru: "Строка, которую коммит удаляет, читается в родительском коммите. Строка, которую он добавляет, читается в файле в том виде, в каком его оставляет коммит. Символ или тест родителя — тот же, что символ или тест с тем же именем в файле в том виде, в каком его оставляет коммит. Тест, который коммит переименовывает вне его SpecTag и больше никак не меняет, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
  });
  addChange(k, "A line that the commit removes is read in the commit's parent.", "предложение о переименованном тесте переписано: оба чтеца не знали, с чем тест «тот же» и меняет ли коммит в тесте что-то, кроме имени.");
  own(k, "A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).");
  setPart(k, "A commit changes a file bound as a whole", {
    en: "A commit changes a file bound as a whole where it changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).",
    ru: "Коммит меняет файл, привязанный целиком, если меняет любую часть текста файла, в том числе комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).",
  });
  addChange(k, "A commit changes a file bound as a whole", "«any part of the file's text» вместо «any of the file's text» (чтец EngStickler: «text» неисчисляемое); ссылки на файл, привязанный целиком, перенесены во второй абзац. По ответу A на вопрос Q1 засчитываются и пробельные символы, вопреки вашему решению от 2026-11-11 для таких файлов; это названо в вопросе.");
  own(k, "A commit changes a file bound as a whole where it changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).");
  p.reason = "The checks of a commit judge code and tests according to whether the commit adds, changes, removes or leaves them unchanged. A single definition of each of these lets every check judge the same code and tests in the same way.";
  p.ruReason = "Проверки коммита оценивают код и тесты в зависимости от того, добавляет ли их коммит, меняет, удаляет или оставляет неизменными. Единое определение каждого из этих случаев позволяет каждой проверке одинаково оценивать одни и те же код и тесты.";
  p.reasonChange += " Раунд c: обоснование рецензента; прежнее первое предложение было неверным: s-3xx2eukc8gtd2tx и s-8wp7xm7g3u8gscq оценивают и то, что коммит оставляет неизменным.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-changed-line (ready in review g3b-b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-changed-line";
  entries[k].review = REVIEW("b");
  const p = entries[k].proposal;
  p.reason = "A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.";
  p.ruReason = "Изменение кода заставляет инструменты SpecSheriff снова сверить этот код с его правилами (§s-9j2mmnuuwmx5ksn). Чтение каждой строки как токенов языка её файла оставляет в стороне то, что не может изменить то, что делает код, например комментарии и пробельные символы между токенами.";
  p.reasonChange += " Раунд c: «the language of its file» вместо «their language»: язык есть у файла, а не у строк (оба чтеца EngStickler).";
  own(k, "Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-draft-rule (review g3b-b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-draft-rule";
  entries[k].review = REVIEW("b");
  setPart(k, "The refusal names the rule by its file", {
    en: "The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names each symbol (§s-kgbzk2ph9e6jfb4) and each test concerned, with its file and its line, and each other file concerned. Where the commit removes a symbol or a test, its line is read in the commit's parent.",
    ru: "Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он называет также каждый затронутый символ (§s-kgbzk2ph9e6jfb4) и тест с его файлом и строкой и каждый другой затронутый файл. Если коммит удаляет символ или тест, его строка берётся в родительском коммите.",
  });
  addChange(k, "The refusal names the rule by its file", "ссылка на символ при первом упоминании (рецензент, правило 7.2.7).");
  entries[k].proposal.refs.push(R("cites", "s-kgbzk2ph9e6jfb4"));
  setPart(k, "`sheriff binding` reads the SpecTags both in the commit's parent", {
    en: "`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).",
    ru: "`sheriff binding` читает SpecTag и в родительском коммите, и в том виде, в каком коммит оставляет код и тесты. Статус одобрения каждого правила, которое называют эти SpecTag, он берёт из спецификации в том виде, в каком её оставляет коммит. Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).",
  });
  addChange(k, "`sheriff binding` reads the SpecTags both in the commit's parent", "«each rule that those SpecTags name» вместо «the rule's»: в абзаце правило раньше не названо (оба чтеца EngStickler).");
  own(k, "It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it.");
}

// ---------------------------------------------------------------------------------------------------------------
// s-t383grkn3q68dpf (review g3b-c; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-t383grkn3q68dpf";
  entries[k].review = REVIEW("c");
  setPart(k, "`sheriff binding` compares each list regardless", {
    en: "`sheriff binding` compares the entries of a node's `meta.code` and `meta.tests` regardless of their order. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-tqdmk6jakx97wra).",
    ru: "`sheriff binding` сравнивает записи `meta.code` и `meta.tests` узла без учёта их порядка. Он проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Эту проверку он выполняет независимо от того, одобрена спецификация или она черновик (§s-tqdmk6jakx97wra).",
  });
  addChange(k, "`sheriff binding` compares the entries of a node's", "первое предложение — рецензента: «list» стояло без того, к чему относится, а списки названы в другом абзаце (правило 7.2.3).");
  entries[k].proposal.examples = [X(
    "Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to take into account only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.",
    "Правило R реализуют функция `render` в `src/page.ts` и файл `src/texts.json`, который файл привязок привязывает к R. `meta.code` правила R называет оба файла, и `sheriff binding` его принимает. Самая вероятная ошибка — учитывать только SpecTag над символами: тогда `sheriff binding` отверг бы этот `meta.code` за то, что он называет `src/texts.json`.")];
  own(k, "The most likely mistake is to take into account only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.");
}

// ---------------------------------------------------------------------------------------------------------------
// s-5hb9k2e34dgn284 (review g3b-d; the coordinator's ruling 3; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5hb9k2e34dgn284";
  entries[k].review = REVIEW("d");
  setPart(k, "`sheriff binding` refuses every other `TextRule.list`", {
    en: "`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file, the place or the symbol to which the list points cannot be found, the refusal names the one that is missing.",
    ru: "`sheriff binding` отвергает любой другой `TextRule.list`, называя файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и каждое затронутое значение. Если файл, место или символ, на которые указывает список, не найдены, отказ называет то, чего нет.",
  });
  addChange(k, "`sheriff binding` refuses every other `TextRule.list`", "«names the one that is missing» вместо «names it»: у «it» не было одного антецедента (оба чтеца EngStickler).");
  own(k, "Where the file, the place or the symbol to which the list points cannot be found, the refusal names the one that is missing.");
  setPart(k, "Each member of a list gives one of the list's values.", {
    en: "Each member of a list gives one of the list's values. For a member that is an object, the value is the value of the property that `TextRule.list.property` names. `sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na).",
    ru: "Каждый элемент списка даёт одно из значений списка. Для элемента, который является объектом, значение — значение того свойства, которое называет `TextRule.list.property`. `sheriff binding` проверяет список, только если каждый его элемент, который является объектом, содержит это свойство, чего требует проверка объекта в списке (§s-cdachayybfvg4na).",
  });
  addChange(k, "Each member of a list gives one of the list's values.", "«the value of the property that … names» вместо «the value of its property that … names»: притяжательное с ограничительным придаточным носитель не напишет (чтец EngStickler).");
  own(k, "For a member that is an object, the value is the value of the property that `TextRule.list.property` names.");
  setPart(k, "`sheriff binding` checks the list of each node of the specification", {
    en: "`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).",
    ru: "`sheriff binding` проверяет список каждого узла спецификации в файлах, которые хранит репозиторий, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6). `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-f5mm7tagez38ffz).",
  });
  addChange(k, "`sheriff binding` checks the list of each node of the specification", "исключение списков собственных типов узлов убрано (рецензент; решение координатора, раунд c): строка 10.1.35 проверяет каждый список с `jsonSchema`, а исключение оставляло без проверки список правила вне `project.json`. Список собственных типов, который прежний выпуск написал с `declaredIn`, указывающим на поле `kinds`, теряет это свойство при `sheriff reindex` (proposal:s-gb8s9657a65hqmv-g3), так что проверять в нём по схеме нечего.");
  dropRef(k, "s-vsh384ybt4w25a2");
  dropRef(k, S.ownKinds);
  const ex = entries[k].proposal.examples[0];
  ex.en = ex.en.replace("Its `TextRule.list.jsonSchema` points to", "The rule's `TextRule.list.jsonSchema` points to");
  ex.ru = ex.ru.replace("Его `TextRule.list.jsonSchema` указывает на", "`TextRule.list.jsonSchema` этого правила указывает на");
  own(k, "The rule's `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`.");
  replaceIn(k, "stage3", ", for s-cdachayybfvg4na to refuse, and the lists of the rules that refine s-vsh384ybt4w25a2 to " + S.ownKinds + ".", ", for s-cdachayybfvg4na to refuse.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-own-kinds (review g3b-d; the coordinator's ruling 3: the new row 10.1.35a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-own-kinds";
  entries[k].review = REVIEW("d");
  setPart(k, "`sheriff binding` accepts the kinds of node", {
    en: parts(k)[at(k, "`sheriff binding` accepts the kinds of node")].en.replace("§s-f5mm7tagez38ffz", "§" + S.row35a),
    ru: parts(k)[at(k, "`sheriff binding` accepts the kinds of node")].ru.replace("§s-f5mm7tagez38ffz", "§" + S.row35a),
  });
  addChange(k, "`sheriff binding` accepts the kinds of node", "узел реализует новую строку 10.1.35a (proposal:row-10-1-35a) вместо строки 10.1.35, текст которой этой проверки не описывает (рецензент; решение координатора, раунд c).");
  setPart(k, "each such member gives its kind the same `needsCode`", {
    en: "each member of the `TextRule.list` of those rules gives its kind the same `needsCode` as the field `kinds` gives it;",
    ru: "каждый элемент `TextRule.list` этих правил даёт своему типу тот же `needsCode`, что и поле `kinds`;",
  });
  addChange(k, "each member of the `TextRule.list` of those rules gives", "«each member of the `TextRule.list` of those rules» вместо «each such member»: можно было прочесть как «элемент для одного из этих типов», и тогда третье условие ничего не говорило бы (рецензент).");
  setPart(k, "each such member names one of those kinds.", {
    en: "each member of the `TextRule.list` of those rules names one of those kinds.",
    ru: "каждый элемент `TextRule.list` этих правил называет один из этих типов.",
  });
  addChange(k, "each member of the `TextRule.list` of those rules names", "то же (рецензент).");
  setPart(k, "A member names a kind by its property", {
    en: "A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na). It gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` compares the kinds with the members only where each member that is an object holds the property that `TextRule.list.property` names, which the check of an object in a list requires (§s-cdachayybfvg4na). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§" + S.row35a + ").",
    ru: "Элемент называет тип своим свойством, которое называет `TextRule.list.property` (§s-cdachayybfvg4na). `needsCode` типа он даёт своим свойством `needsCode`. `sheriff binding` сравнивает типы с элементами, только если каждый элемент, который является объектом, содержит свойство, которое называет `TextRule.list.property`, чего требует проверка объекта в списке (§s-cdachayybfvg4na). `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§" + S.row35a + ").",
  });
  addChange(k, "A member names a kind by its property", "третье предложение — рецензента: элемент-объект без свойства отвергался дважды, здесь и узлом «An object in a list»; узел о списке оставляет этот случай тому узлу. Последнее предложение ссылается на новую строку 10.1.35a.");
  const p = entries[k].proposal;
  p.refs = p.refs.map((r) => (r.type === "implements" && r.to === "s-f5mm7tagez38ffz" ? R("implements", S.row35a) : r));
  p.reason = "A project's own kind of node is declared in the extension of the schema, which nobody approves, but listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with what an owner has approved.";
  p.ruReason = "Собственный тип узлов проекта объявляется в расширении схемы, которое никто не одобряет, но перечисляется в правиле, которое одобряет ответственный (§s-hhnahzmhahf8jht). Сравнение того и другого удерживает объявление каждого типа, в том числе то, требуется ли его узлам имплементация в коде, в соответствии с одобренным ответственным.";
  p.reasonChange += " Раунд c: «keeps the declaration of each kind, including whether …»: прежде «keeps each kind, and whether …» читалось до конца предложения как «сохраняет каждый тип» (чтец EngStickler).";
  own(k, "Comparing the two keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with what an owner has approved.");
  const ex = p.examples[0];
  ex.en = ex.en.replace("The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do.", "The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do.");
  ex.ru = ex.ru.replace("Тогда правило говорило бы, что узлам типа `procedure` код не требуется, а схема — что требуется.", "Тогда коммит прошёл бы, хотя правило говорит, что узлам типа `procedure` код не требуется, а схема — что требуется.");
  own(k, "The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do.");
  entries[k].stage3 += " A member that is an object and lacks its property is left to s-cdachayybfvg4na, so that the list is not compared. The node implements row 10.1.35a (proposal:row-10-1-35a), which impl.json is to map to it.";
}

// ---------------------------------------------------------------------------------------------------------------
// s-cdachayybfvg4na (ready in review g3b-d; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-cdachayybfvg4na";
  entries[k].review = REVIEW("d");
  const p = entries[k].proposal;
  p.reason = "The value of a member that is an object is the value of the property that `TextRule.list.property` names. `sheriff binding` compares that value with the schema or the symbol to which the list points (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.";
  p.ruReason = "Значение элемента, который является объектом, — значение того свойства, которое называет `TextRule.list.property`. `sheriff binding` сравнивает это значение со схемой или символом, на которые указывает список (§s-5hb9k2e34dgn284), поэтому у элемента без этого свойства нет значения для сравнения.";
  p.reasonChange += " Раунд c: «the value of the property that … names» вместо «the value of its property that … names» (чтец EngStickler).";
  own(k, "The value of a member that is an object is the value of the property that `TextRule.list.property` names.");
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-ztseyetus7np6br-g3: ready in review g3b-c; unchanged but for the record of the review.
// ---------------------------------------------------------------------------------------------------------------
entries["proposal:s-ztseyetus7np6br-g3"].review = REVIEW("c");

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-9j2mmnuuwmx5ksn (review g3b-b; the coordinator's rulings 1 and 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-9j2mmnuuwmx5ksn";
  const e = entries[k];
  e.review = "specsheriff-rule-reviewer, 2026-11-24: review-g3b-b.md; EngStickler's readers, 2026-11-24: english-g3b-fast/thorough.md; fix-group3-c.mjs applied the findings and the coordinator's rulings";
  e.question = "Q1: whether rewording a comment, or changing only whitespace, in a file bound as a whole changes its code (recommended A: it does, and rule 9.4 exempts a reworded comment only in tests and in a file whose symbols the checks can identify)";
  setPart(k, "A change to a SpecTag is considered", {
    en: "A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds. Renaming a test, or rewording the comments in the tests or in a file whose symbols the checks can identify (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same.",
    ru: "Изменение SpecTag (§s-8xw4mgvpexyvw5q) считается изменением теста или кода, который этот SpecTag привязывает. Ни тест, ни код не меняет переформулировка названия теста или комментариев в тестах или в файле, символы которого проверки могут определить (§s-kgbzk2ph9e6jfb4), при прежнем SpecTag.",
    change: "В первом предложении добавлена только ссылка на SpecTag при его первом упоминании (правило 7.2.7; рецензент). Во втором «комментариев в коде и тестах» сужено до «комментариев в тестах или в файле, символы которого проверки могут определить» — словами правила 1.5.2 (рецензент; решение координатора, раунд c), по рекомендуемому ответу A на вопрос Q1. В файле, привязанном целиком, любое изменение текста — изменение кода, как говорит правило 1.5.2.",
  });
  e.proposal.refs = [R("cites", "s-8xw4mgvpexyvw5q"), R("cites", "s-kgbzk2ph9e6jfb4")];
  e.proposal.examples = [X(
    "A commit rewords a comment inside a function bound by a SpecTag directly above it, and changes nothing else, so it does not change the function. But not: a commit that rewords a comment in a stylesheet bound by SpecTags at its start leaves the stylesheet unchanged.",
    "Коммит переформулирует комментарий внутри функции, привязанной SpecTag непосредственно над ней, и больше ничего не меняет, поэтому функцию он не меняет. Но не так: коммит, который переформулирует комментарий в таблице стилей, привязанной SpecTag в начале файла, оставляет таблицу стилей неизменной.")];
  e.change = "Что изменено:\n- во втором предложении «комментариев в коде и тестах» сужено до «комментариев в тестах или в файле, символы которого проверки могут определить», словами правила 1.5.2;\n- в первом, согласованном предложении добавлена ссылка на SpecTag при его первом упоминании: этого требует правило 7.2.7;\n- добавлен пример (рецензент).\n\nПочему: правило 1.5.2 (ваше решение от 2026-11-17) говорит, что изменение в любом месте файла, привязанного целиком, — изменение кода, который привязывают его SpecTag. Правило 9.4 (ваше решение от 2026-11-11) говорит, что переформулировка комментариев не меняет кода, а по решению того же дня не считаются и пробелы внутри строки. Для файла, привязанного SpecTag в начале, — таблицы стилей, файла SQL, YAML или shell — оба правила сразу выполняться не могут: инструменты SpecSheriff отличают комментарий и пробелы между токенами от кода только в языке, для которого у них есть описание. Это вопрос Q1; предложение написано для рекомендуемого ответа A, при котором остаётся правило 1.5.2, а исключение для комментариев действует там, где проверки могут определить символы файла. Тесты всегда написаны на языке, для которого есть описание (узел о том, как тест объявляет SpecTag), поэтому для них исключение остаётся как было. Обоснование — как вы согласовали.";
  own(k, "Renaming a test, or rewording the comments in the tests or in a file whose symbols the checks can identify (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same. (The reviewer's words for the narrowed scope, set into the agreed sentence.)");
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-hhnahzmhahf8jht (review g3b-d; the coordinator's rulings 1 and 3).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-hhnahzmhahf8jht";
  const e = entries[k];
  e.review = "specsheriff-rule-reviewer, 2026-11-24: review-g3b-d.md; EngStickler's readers, 2026-11-24: english-g3b-fast/thorough.md; fix-group3-c.mjs applied the findings and the coordinator's rulings";
  setPart(k, "A rule in the project's own guidelines refines", {
    en: "A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` (§s-eferktypcj7njt5) holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name.",
    ru: "Правило в собственных guidelines проекта уточняет правило о собственных типах узлов (§s-vsh384ybt4w25a2). `TextRule.list.members` (§s-eferktypcj7njt5) этого правила содержит каждый добавленный тип узла с его `needsCode`. `TextRule.list.property` этого правила называет ключ с именем типа узла.",
  });
  addChange(k, "A rule in the project's own guidelines refines", "ссылка на `TextRule.list.members` при первом упоминании (правило 7.2.7; рецензент). В русском «собственных guidelines проекта», как в английском: «guidelines проекта» значит все guidelines проекта (правило 2.3; рецензент).");
  setPart(k, "At each commit, a check verifies", {
    ru: "При каждом коммите проверка сверяет согласованность новых типов узлов по имени и `needsCode` между JSON-схемой и собственными guidelines проекта (§s-jau82aq9juv9zzh).",
    change: "Как в согласованной формулировке. Раунд c: в русском «собственными guidelines проекта», как в английском (рецензент).",
  });
  e.proposal.refs.push(R("cites", "s-eferktypcj7njt5"));
  const p = e.proposal;
  p.reason = "Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so this rule subjects each such kind, and whether its nodes require an implementation in code, to an owner's approval.";
  p.ruReason = "Только проект знает, выполняются ли узлы типа, который он добавляет, кодом, инструментами или людьми. Расширение схемы никто не одобряет, поэтому по этому правилу каждый такой тип и то, требуется ли его узлам имплементация в коде, одобряет ответственный.";
  p.reasonChange = "Первое предложение — как в согласованной формулировке. Второе — рецензента: прежнее («поэтому эти типы перечисляет правило») пересказывало второй абзац текста, и обоснование не проходило проверку на пересказ.";
  p.examples = [X(
    "A project adds the kind `procedure` for the steps that an operator carries out by hand. Its extension of the schema declares `\"procedure\": {\"needsCode\": false, \"schema\": {}}` in the field `kinds`. The rule of the project's own guidelines that refines the rule on a project's own kinds of node has `TextRule.list.property` set to `name`, and its `TextRule.list.members` holds `{\"name\": \"procedure\", \"needsCode\": false}`. The most likely mistake is to declare the kind only in the extension of the schema, which nobody approves.",
    "Проект добавляет тип `procedure` для шагов, которые оператор выполняет вручную. Его расширение схемы объявляет `\"procedure\": {\"needsCode\": false, \"schema\": {}}` в поле `kinds`. У правила собственных guidelines проекта, которое уточняет правило о собственных типах узлов, `TextRule.list.property` — `name`, а его `TextRule.list.members` содержит `{\"name\": \"procedure\", \"needsCode\": false}`. Самая вероятная ошибка — объявить тип только в расширении схемы, которое никто не одобряет.")];
  e.change = "Что изменено:\n- убрано предложение «`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON-схемы»;\n- ссылка на `TextRule.list.members` при первом упоминании (правило 7.2.7);\n- в русском «собственных guidelines проекта» в двух местах, как в английском: «guidelines проекта» значит все guidelines проекта (правило 2.3);\n- второе предложение обоснования новое: прежнее пересказывало второй абзац текста (правило 7.4.2);\n- добавлен пример.\n\nПочему убрано предложение: по вашим решениям от 2026-11-13 по строке 10.1.35 `declaredIn` заменяют свойства `jsonSchema` и `valueList`, а `jsonSchema` значит, что каждое значение списка корректно относительно схемы в указанном месте. Поле `kinds` не содержит схемы для имени типа, поэтому предложение обещало бы проверку, которую не делает ни один инструмент. Инструменты SpecSheriff находят список по связи `refines` правила (новый узел группы 3 «The list of a project's own kinds of node»).\n\nВместе с этим предложением вы согласуете:\n- новую строку 10.1.35a основной таблицы проверок (proposal:row-10-1-35a), которая называет проверку из этого правила; строка 10.1.35 теряет связь `checks` с этим правилом — это изменение связи, формулировку оно не меняет;\n- пункт в узле о том, что `sheriff reindex` меняет в написанном прежним выпуском (proposal:s-gb8s9657a65hqmv-g3): `declaredIn`, указывающий на поле `kinds`, удаляется.\n\nКогда вы согласуете это предложение, в `meta.decisions` правила записывается новое решение вместо решения от 2026-11-10 о `declaredIn`. Остальная формулировка — как вы согласовали 2026-11-10.";
}

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's ruling 3: proposal:new-tools-1-settings-g3 (review g3b-c, finding 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const agreed = drafts["new:tools-1-settings"];
  const ps = agreed.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: SAME }));
  const i = ps.findIndex((x) => x.en.startsWith("To find the SpecTags"));
  if (i < 0) throw new Error("new:tools-1-settings: the paragraph on where SpecTags are read was not found");
  ps[i] = P("To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the files that match the glob patterns for code or for tests in `sheriff.config.json`, the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2), and the bindings file (§s-trwczfskj5zmuft). A file that matches both a pattern for code and a pattern for tests is read as a test.",
    "Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые привязывают код и тесты к их правилам, инструменты SpecSheriff читают только файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`, файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2), и файл привязок (§s-trwczfskj5zmuft). Файл, который соответствует и шаблону кода, и шаблону тестов, читается как тест.",
    "Было: «…читают только файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`, и файлы, в которые `sheriff types` записывает типы». Добавлен файл привязок (рецензент): по правилу 1.5.2 каждая его запись содержит SpecTag своего файла, а слово «только» не давало инструментам его читать. Второе предложение — как в согласованной формулировке.");
  entries["proposal:new-tools-1-settings-g3"] = {
    question: "None: carries out rule 1.5.2, under which each entry of the bindings file holds its file's SpecTags",
    base: "new:tools-1-settings",
    location: agreed.location,
    review: "fix-group3-c.mjs, from review-g3b-c.md (finding 2) and the coordinator's ruling 3 of round c; not yet reviewed",
    change: "Изменено одно предложение: инструменты SpecSheriff, чтобы найти SpecTag, читают теперь и файл привязок. По правилу 1.5.2 (ваше решение от 2026-11-17) каждая запись файла привязок называет существующий файл и содержит его SpecTag; это определяют и согласованные узлы группы 2 «The bindings file» и «SpecTags on the system's code other than tests». Согласованный узел говорил, что инструменты читают «только» файлы по glob-шаблонам и файлы типов, и тогда файл, привязанный записью в файле привязок, не попадал бы ни в `meta.code` (узел «A node's `meta.code` and `meta.tests`»), ни в какую другую проверку. Остальная формулировка — как вы согласовали 2026-11-21.",
    proposal: {
      title: agreed.proposal.title,
      ruTitle: agreed.proposal.ruTitle,
      parts: ps,
      reason: agreed.proposal.reason,
      ruReason: agreed.proposal.ruReason,
      reasonChange: SAME,
      refs: [...agreed.proposal.refs, R("cites", "s-trwczfskj5zmuft")],
      removed: [],
      date: DATE,
    },
    stage3: "config.ts and binding.ts read SpecTags only from the files that the code and tests globs match and from the files of the generated types; no code reads sheriff.bindings.json yet (s-trwczfskj5zmuft). They are to read its entries as the SpecTags of their files.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's ruling 3: proposal:s-gb8s9657a65hqmv-g3 (review g3b-d).
// ---------------------------------------------------------------------------------------------------------------
{
  const agreed = drafts["new:tools-2-reindex-earlier"];
  if (agreed.sidValue !== "s-gb8s9657a65hqmv") throw new Error("new:tools-2-reindex-earlier is not s-gb8s9657a65hqmv");
  const ps = agreed.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: SAME }));
  const i = ps.findIndex((x) => x.en.startsWith("`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`"));
  if (i < 0) throw new Error("new:tools-2-reindex-earlier: the item on jsonSchema was not found");
  ps[i] = L("`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to any other place in a JSON Schema;",
    "`TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, если указывает в другое место JSON Schema;",
    "Было: «…где указывает в JSON Schema». «В другое место»: случай поля `kinds` теперь в пункте выше (рецензент).");
  ps.splice(i, 0, L("`TextRule.list.declaredIn` is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);",
    "`TextRule.list.declaredIn` удаляется, если указывает на поле `kinds` расширения схемы проекта (§s-xm8rz4uupb73gu5);",
    "Новое (рецензент): список собственных типов узлов проекта прежний выпуск связывал с полем `kinds` через `declaredIn`. Поле `kinds` не содержит схемы для имени типа, и по предложению по правилу 8.4 инструменты находят этот список по связи `refines`, так что `declaredIn` такого списка удаляется, а не становится `jsonSchema`."));
  entries["proposal:s-gb8s9657a65hqmv-g3"] = {
    question: "None: carries out the owner's rulings of 2026-11-13 on row 10.1.35, together with the proposal for rule 8.4",
    base: "new:tools-2-reindex-earlier",
    location: agreed.location,
    sidValue: "s-gb8s9657a65hqmv",
    review: "fix-group3-c.mjs, from review-g3b-d.md and the coordinator's ruling 3 of round c; not yet reviewed",
    change: "Добавлен один пункт, и следующий за ним уточнён. `declaredIn`, который указывает на поле `kinds` расширения схемы проекта, `sheriff reindex` удаляет, а не переписывает в `jsonSchema`; любой другой `declaredIn`, указывающий в JSON Schema, становится `jsonSchema`, как вы согласовали 2026-11-21. Почему: по вашим решениям от 2026-11-13 по строке 10.1.35 `jsonSchema` значит, что каждое значение списка корректно относительно схемы в указанном месте, а поле `kinds` такой схемы не содержит. Список собственных типов узлов инструменты находят по связи `refines` (предложение по правилу 8.4 и новый узел «The list of a project's own kinds of node»). Иначе узел «A list and its declaration» проверял бы такой список по схеме, которой нет. Остальная формулировка — как вы согласовали.",
    proposal: {
      title: agreed.proposal.title,
      ruTitle: agreed.proposal.ruTitle,
      parts: ps,
      reason: agreed.proposal.reason,
      ruReason: agreed.proposal.ruReason,
      reasonChange: SAME,
      refs: [...agreed.proposal.refs, R("cites", "s-xm8rz4uupb73gu5")],
      removed: [],
      date: DATE,
    },
    stage3: "reindex.ts is to remove a TextRule.list.declaredIn that points to the field `kinds` of specs/_schema/project.schema.json, and to rewrite any other declaredIn as the agreed node says. Its tests are written first.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's ruling 3: proposal:row-10-1-35a, a new row of the main table of checks (review g3b-d).
// ---------------------------------------------------------------------------------------------------------------
entries["proposal:row-10-1-35a"] = {
  question: "None: carries out rule 8.4 (s-hhnahzmhahf8jht) and the owner's ruling of 2026-11-10 on it, so that a row of the main table of checks states that check",
  location: "spec 10.1.35a (new row of the main table of checks, after row 10.1.35)",
  sidValue: S.row35a,
  kind: "cell",
  cost: { en: "refused", ru: "отвергается" },
  review: "fix-group3-c.mjs, from review-g3b-d.md and the coordinator's ruling 3 of round c; not yet reviewed",
  change: "Новая строка основной таблицы проверок после строки 10.1.35. Правило 8.4 говорит, что при каждом коммите проверка сверяет имя и `needsCode` каждого нового типа узлов (ваше решение от 2026-11-10), но ни одна строка таблицы эту проверку не называет: у строки 10.1.35 есть связь `checks` с правилом 8.4, а её текст говорит только о проверке значений списка по JSON Schema. Таблица же говорит о себе, что содержит полный перечень проверок. Строка 10.1.35 теряет связь `checks` с правилом 8.4; это изменение связи, формулировку оно не меняет. Новую строку реализует узел описания инструментов «The list of a project's own kinds of node» (s-czxaqvaesmu3gru).",
  proposal: {
    title: null,
    ruTitle: null,
    parts: [P("Each kind of node that the project's extension of the schema (§s-xm8rz4uupb73gu5) adds is listed, with the same `needsCode`, in the rules of the project's own guidelines that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). Each kind that those rules list is one that the extension adds",
      "Каждый тип узлов, который добавляет расширение схемы проекта (§s-xm8rz4uupb73gu5), перечислен, с тем же `needsCode`, в правилах собственных guidelines проекта, которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2). Каждый тип, который перечисляют эти правила, добавлен этим расширением",
      "Новая строка, формулировкой рецензента; без точки в конце, как у других строк таблицы.")],
    reason: null,
    ruReason: null,
    refs: [R("checks", "s-hhnahzmhahf8jht"), R("cites", "s-xm8rz4uupb73gu5"), R("cites", "s-vsh384ybt4w25a2")],
    removed: [],
    date: DATE,
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
const targets = new Set();
const collect = (data) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8")));
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const d of Object.values(entries)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

// The new row's sid is unique across specs/, moved/ and the drafts before this script.
{
  const known = new Set();
  const sidRe = /s-[2-9a-hjkmnp-z]{15}/g;
  const walkDir = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walkDir(p);
      else if (e.name.endsWith(".json") || e.name.endsWith(".jsonl")) for (const m of fs.readFileSync(p, "utf8").matchAll(sidRe)) known.add(m[0]);
    }
  };
  walkDir(path.join(root, "specs"));
  walkDir(path.join(root, ".ai_docs/t25-pass/moved"));
  for (const m of backupText.matchAll(sidRe)) known.add(m[0]);
  if (known.has(S.row35a) && !before["proposal:row-10-1-35a"]) problems.push(`new sid ${S.row35a} is already in use`);
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
const AGREED_SAME = /^Как в согласованной формулировке/;
const SPEC_PROPOSAL = (key, e) => key.startsWith("proposal:") && /^spec /.test(e.location || "");

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (e.kind !== "cell" && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  if (e.kind === "cell" && (!e.cost?.en || !e.cost?.ru)) problems.push(`${key}: a row without its cost`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  // An example of the appendix names its most likely mistake; one of a rule of the guidelines may use "But not:".
  const mistake = SPEC_PROPOSAL(key, e) ? /The most likely mistake is|But not:/ : /The most likely mistake is/;
  const mistakeRu = SPEC_PROPOSAL(key, e) ? /Самая вероятная ошибка|Но не так:/ : /Самая вероятная ошибка/;
  if (!(p.examples || []).every((x) => mistake.test(x.en) && mistakeRu.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  if (key.startsWith("proposal:") && !e.question) problems.push(`${key}: a proposal without its question`);
  if (key.startsWith("proposal:") && !e.change) problems.push(`${key}: a proposal without its Russian change`);
  const checked = key.startsWith("proposal:") ? [...p.parts.filter((x) => !AGREED_SAME.test(x.change)).map((x) => x.en), ...(p.examples || []).map((x) => x.en)] : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)];
  for (const sentence of checked.filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /makes this check whether/, /\bspacing\b/, /provided that/, /They also include/]) {
    if (bad.test(phrase.replace(/SpecSheriff tools/g, "SST"))) problems.push(`${key}: the English holds ${bad}`);
  }
  if (!key.startsWith("proposal:s-gb8s") && /\bdeclaredIn\b/.test(phrase)) problems.push(`${key}: the English holds declaredIn`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ/.test(ruAll)) problems.push(`${key}: the Russian says «несёт»`);
}
// Each proposal built on an agreed draft keeps every part that its change does not touch.
const keeps = (key, baseKey, changedStarts) => {
  const base = drafts[baseKey].proposal.parts.map((x) => x.en);
  const now = entries[key].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${key} differs from ${baseKey} beyond the parts it changes`);
};
keeps("proposal:s-ztseyetus7np6br-g3", "proposal:s-ztseyetus7np6br", ["the lists `meta.code` and `meta.tests`"]);
keeps("proposal:new-tools-1-settings-g3", "new:tools-1-settings", ["To find the SpecTags"]);
keeps("proposal:s-gb8s9657a65hqmv-g3", "new:tools-2-reindex-earlier", ["`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`"]);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group3.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-c.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for agreed nodes and for a new row of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title ?? "a new row of the main table of checks"}`, "");
  if (e.kind === "cell") md.push(`A proposal: a new row of the main table of checks, ${e.location.replace(/^spec /, "")}. On failure: ${e.cost.en}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.${e.dependsOn ? ` It depends on ${e.dependsOn}.` : ""}`, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));

// english-group3-changed-c.md: each sentence of round c in the author's own words, and each new text of round c.
const changed = [
  "# T25, group 3, round c: the sentences written in the author's own words",
  "",
  "Each sentence below was written in round c by fix-group3-c.mjs in the author's own words, not in a review's. Every other change of round c uses the wording of a review, or of an EngStickler reader. The texts of the three new proposals of round c (`proposal:new-tools-1-settings-g3`, `proposal:s-gb8s9657a65hqmv-g3`, `proposal:row-10-1-35a`) are reviewers' wordings set into agreed nodes; they are in `english-group3.md`.",
  "fix-group3-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of [...new Set(OWN.map((o) => o.key))]) {
  changed.push(`## ${key} — ${entries[key].proposal.title}`, "");
  for (const o of OWN.filter((x) => x.key === key)) changed.push(`- ${o.en}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed-c.md", here), changed.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
