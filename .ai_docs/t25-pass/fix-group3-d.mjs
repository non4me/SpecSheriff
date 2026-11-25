// T25, stage 2, group 3, round d: applies the final reviews (review-g3c-a.md, review-g3c-b.md), the reports of
// EngStickler's readers on round c (english-g3c-fast.md, english-g3c-thorough.md) and the coordinator's rulings of round d
// to the drafts that fix-group3-c.mjs wrote. Copies tools-drafts.json to tools-drafts.before-group3-d.json before its
// first run, and on every run rebuilds the keys of the group from that copy, part by part, so a second run gives the same
// file. Checks every draft as fix-group3-c.mjs does, refuses to write where a key outside the group would change, and
// writes english-group3.md and english-group3-changed-d.md, which lists each sentence of round d written in the author's
// own words.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-d.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const REVIEW_D = (letter) => `specsheriff-rule-reviewer, 2026-11-24: final review review-g3c-${letter}.md; EngStickler's readers, 2026-11-24: english-g3c-fast/thorough.md; fix-group3-d.mjs applied the findings and the coordinator's rulings`;

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
const L2 = (en, ru, change) => ({ kind: "li2", en, ru, change });

const GROUP = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht",
  "proposal:new-tools-1-settings-g3", "proposal:s-gb8s9657a65hqmv-g3", "proposal:row-10-1-35a"];

const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round d`);
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
const addChange = (key, start, note) => {
  const x = parts(key)[at(key, start)];
  x.change = `${x.change} Раунд d: ${note}`;
};
const swap = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: no ${JSON.stringify(from.slice(0, 60))}`);
  return s.split(from).join(to);
};

// ---------------------------------------------------------------------------------------------------------------
// The keys that the final review g3c-a found ready: only the record of the review changes.
// ---------------------------------------------------------------------------------------------------------------
for (const k of ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "new:tools-7-2-changed-line", "proposal:s-9j2mmnuuwmx5ksn"]) entries[k].review = REVIEW_D("a");
for (const k of ["s-t383grkn3q68dpf", "s-cdachayybfvg4na"]) entries[k].review = REVIEW_D("b");

// ---------------------------------------------------------------------------------------------------------------
// s-2x58az67bm6cxq2 (ready in review g3c-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  entries[k].review = REVIEW_D("a");
  const x = parts(k)[at(k, "A line that the commit removes is read in the commit's parent.")];
  x.en = swap(x.en, "A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test", "A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test", k);
  x.ru = swap(x.ru, "Тест, который коммит переименовывает вне его SpecTag и больше никак не меняет, тоже остаётся тем же тестом", "Тест, который коммит переименовывает, сохраняя его SpecTag и больше ничего в нём не меняя, тоже остаётся тем же тестом", k);
  addChange(k, "A line that the commit removes is read in the commit's parent.", "«keeping its SpecTag» вместо «outside its SpecTag»: «rename outside X» по-английски не говорят, и у теста на Python SpecTag стоит в пометке, а не в названии (оба чтеца EngStickler).");
  own(k, "A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).");
  setPart(k, "A commit changes a file bound as a whole", {
    en: "A commit changes a file bound as a whole where the commit changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).",
  });
  addChange(k, "A commit changes a file bound as a whole", "«where the commit changes» вместо «where it changes»: «it» читалось и как файл (чтец EngStickler).");
  own(k, "A commit changes a file bound as a whole where the commit changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).");
}

// The location of "A line that changes the code" names the node it follows by that node's title before round b.
{
  const k = "new:tools-7-2-changed-line";
  entries[k].location = swap(entries[k].location, "after \"The code and the tests that a commit changes\"", "after \"What a commit adds, changes and removes in the code and the tests\"", k);
}

// Q1 covers every file bound as a whole (review g3c-a, Q1's scope): the reason that the proposal on rule 9.4 gives says so.
{
  const k = "proposal:s-9j2mmnuuwmx5ksn";
  entries[k].change = swap(entries[k].change, "Для файла, привязанного SpecTag в начале, — таблицы стилей, файла SQL, YAML или shell — оба правила сразу выполняться не могут: инструменты SpecSheriff отличают комментарий и пробелы между токенами от кода только в языке, для которого у них есть описание.", "Для файла, привязанного целиком, — например, таблицы стилей, файла SQL, YAML или shell со SpecTag в начале — оба правила сразу выполняться не могут: инструменты SpecSheriff отличают комментарий и пробелы между токенами от кода только в языке, для которого у них есть описание. В файле JSON, привязанном записью в файле привязок, комментариев нет, но правка одних пробельных символов в нём по правилу 1.5.2 тоже меняет код, вопреки вашему решению от 2026-11-11.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-draft-rule (ready in review g3c-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-draft-rule";
  entries[k].review = REVIEW_D("a");
  const x = parts(k)[at(k, "`sheriff binding` reads the SpecTags both in the commit's parent")];
  x.en = swap(x.en, "It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it.", "From the specification as the commit leaves it, `sheriff binding` takes the approval status of each rule that those SpecTags name.", k);
  addChange(k, "`sheriff binding` reads the SpecTags both in the commit's parent", "«From the specification as the commit leaves it» перенесено в начало предложения: после «name» оно читалось как дополнение этого глагола (оба чтеца EngStickler).");
  own(k, "From the specification as the commit leaves it, `sheriff binding` takes the approval status of each rule that those SpecTags name.");
}

// ---------------------------------------------------------------------------------------------------------------
// s-5hb9k2e34dgn284 (ready in review g3c-b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5hb9k2e34dgn284";
  entries[k].review = REVIEW_D("b");
  // The two sentences below are the coordinator's wording after the readers' reports on round d
  // (english-g3d-fast.md, english-g3d-thorough.md).
  const r = parts(k)[at(k, "`sheriff binding` refuses every other `TextRule.list`")];
  r.en = swap(r.en, "Where the file, the place or the symbol to which the list points cannot be found, the refusal names the one that is missing.", "Where the file to which the list points, the place in it or the symbol cannot be found, the refusal names the one that cannot be found.", k);
  r.ru = swap(r.ru, "Если файл, место или символ, на которые указывает список, не найдены, отказ называет то, чего нет.", "Если не найдены файл, на который указывает список, место в нём или символ, отказ называет то, что не найдено.", k);
  const v = parts(k)[at(k, "Each member of a list gives one of the list's values.")];
  v.en = swap(v.en, "For a member that is an object, the value is the value of the property that `TextRule.list.property` names.", "The value of a member that is an object is the value of the member's property that `TextRule.list.property` names.", k);
  v.ru = swap(v.ru, "Для элемента, который является объектом, значение — значение того свойства, которое называет `TextRule.list.property`.", "Значение элемента, который является объектом, — значение того его свойства, которое называет `TextRule.list.property`.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-own-kinds (review g3c-b, findings 1 and 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-own-kinds";
  entries[k].review = REVIEW_D("b");
  const c2 = parts(k)[at(k, "each member of the `TextRule.list` of those rules gives")];
  c2.ru = swap(c2.ru, "даёт своему типу тот же", "даёт своему типу узлов тот же", k);
  addChange(k, "each member of the `TextRule.list` of those rules gives", "«своему типу узлов»: по вашему решению от 2026-11-10 «тип» всегда с объектом (рецензент).");
  const p2 = parts(k)[at(k, "`sheriff binding` refuses a commit after which a kind or a member fails")];
  p2.ru = swap(p2.ru, "тип или элемент", "тип узлов или элемент", k);
  addChange(k, "`sheriff binding` refuses a commit after which a kind or a member fails", "«тип узлов или элемент» (рецензент).");
  const p3 = parts(k)[at(k, "A member names a kind by its property")];
  p3.en = swap(p3.en, "A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na).", "A member names a kind by the property that `TextRule.list.property` names (§s-hhnahzmhahf8jht).", k);
  p3.ru = swap(p3.ru, "Элемент называет тип своим свойством, которое называет `TextRule.list.property` (§s-cdachayybfvg4na).", "Элемент называет тип узлов тем своим свойством, которое называет `TextRule.list.property` (§s-hhnahzmhahf8jht).", k);
  p3.ru = swap(p3.ru, "`sheriff binding` сравнивает типы с элементами", "`sheriff binding` сравнивает типы узлов с элементами", k);
  addChange(k, "A member names a kind by the property", "первое предложение — рецензента: «by the property», как в двух других узлах после раунда c, и ссылка на правило 8.4, которое это говорит, а не на «An object in a list»; «тип узлов» (рецензент).");
  const ex = entries[k].proposal.examples[0];
  ex.ru = swap(ex.ru, "добавляет тип `procedure`", "добавляет тип узлов `procedure`", k);
  ex.ru = swap(ex.ru, "собственные типы проекта", "собственные типы узлов проекта", k);
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-hhnahzmhahf8jht (review g3c-b, finding 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-hhnahzmhahf8jht";
  entries[k].review = REVIEW_D("b");
  const ex = entries[k].proposal.examples[0];
  ex.ru = swap(ex.ru, "Проект добавляет тип `procedure`", "Проект добавляет тип узлов `procedure`", k);
  entries[k].change = swap(entries[k].change, "- добавлен пример.", "- добавлен пример; в его русском тексте «тип узлов», как требует ваше решение от 2026-11-10.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:row-10-1-35a (review g3c-b, finding 3).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:row-10-1-35a";
  entries[k].review = REVIEW_D("b");
  const r = parts(k)[0];
  r.en = swap(r.en, "is listed, with the same `needsCode`, in the rules", "is listed, with the `needsCode` that the extension gives it, in the rules", k);
  r.ru = swap(r.ru, "перечислен, с тем же `needsCode`, в правилах", "перечислен, с тем `needsCode`, который ему даёт расширение, в правилах", k);
  r.change += " Раунд d: «with the `needsCode` that the extension gives it»: «the same» не называло, с чем сравнивается значение (рецензент).";
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:new-tools-1-settings-g3 (review g3c-a).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:new-tools-1-settings-g3";
  entries[k].review = REVIEW_D("a");
  const i = at(k, "To find the SpecTags");
  const old = parts(k)[i];
  parts(k).splice(i, 1,
    P("To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:",
      "Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые привязывают код и тесты к их правилам, инструменты SpecSheriff читают только следующие файлы:",
      "Было: «…читают только файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`, и файлы, в которые `sheriff types` записывает типы». Добавлен файл привязок: по правилу 1.5.2 каждая его запись содержит SpecTag своего файла, а слово «только» не давало инструментам SpecSheriff его читать. Три вида файлов — списком (правило 7.2.2)."),
    L("the files that match the glob patterns for code or for tests in `sheriff.config.json`;",
      "файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`;",
      "Как в согласованной формулировке; пункт списка."),
    L("the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2);",
      "файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2);",
      "Как в согласованной формулировке; пункт списка."),
    L("the bindings file (§s-trwczfskj5zmuft).",
      "файл привязок (§s-trwczfskj5zmuft).",
      "Новый пункт: каждая запись файла привязок содержит SpecTag своего файла (правило 1.5.2)."),
    P("A file that matches both a pattern for code and a pattern for tests is read as a test.",
      "Файл, который соответствует и шаблону кода, и шаблону тестов, читается как тест.",
      "Как в согласованной формулировке; отдельный абзац после списка."));
  entries[k].change = swap(entries[k].change, "Остальная формулировка — как вы согласовали 2026-11-21.", "Изменённое предложение разбито на вводную фразу и список из трёх видов файлов (правило 7.2.2), а последнее предложение абзаца стало отдельным абзацем. Остальная формулировка — как вы согласовали 2026-11-21.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-gb8s9657a65hqmv-g3 (review g3c-b, findings 4 and 5; the coordinator's ruling: a mechanical split of the
// agreed items, the same words).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-gb8s9657a65hqmv-g3";
  entries[k].review = REVIEW_D("b");
  const SPLIT = "Как в согласованной формулировке; пункт, который объединял несколько переименований, разделён, теми же словами (правило 7.3.2).";
  const replace = (start, ...added) => { const i = at(k, start); parts(k).splice(i, 1, ...added); };
  replace("a node's key `id` becomes `location`",
    L("a node's key `id` becomes `location`;", "ключ узла `id` становится `location`;", SPLIT),
    L("a node's key `rationale` becomes `reason`;", "ключ узла `rationale` становится `reason`;", SPLIT));
  replace("the kinds of node `record` and `recordType`",
    L("the kinds of node `record` and `recordType` become `RecordType`;", "типы узлов `record` и `recordType` становятся `RecordType`;", SPLIT),
    L("the kind of node `rule` becomes `TextRule`;", "тип узлов `rule` становится `TextRule`;", SPLIT + " Подлежащее «the kind of node» повторено, чтобы отдельный пункт был полным."),
    L("the kind of node `domain` becomes `header`;", "тип узлов `domain` становится `header`;", SPLIT + " Подлежащее повторено так же."));
  replace("a node's status `\"\"` becomes `draft`",
    L("a node's status `\"\"` becomes `draft`;", "статус узла `\"\"` становится `draft`;", SPLIT),
    L("a node's status `checked` becomes `approved`;", "статус узла `checked` становится `approved`;", SPLIT + " Подлежащее «a node's status» повторено."));
  replace("a RecordType's `fields` and `unknown` become its `schema`",
    L("a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:", "`fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu) так:", "Как в согласованной формулировке; шаги — вложенным списком, теми же словами (правила 7.2.2 и 7.3.2)."),
    L2("each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);", "каждое поле становится свойством со схемой, которую даёт нейтральный тип поля (§s-4npdup7mjkva69y);", "Шаг вложенного списка, теми же словами."),
    L2("the field's `text` becomes the property's `description`;", "`text` поля становится `description` свойства;", "Шаг вложенного списка, теми же словами."),
    L2("each field that the RecordType marks as required is listed in the schema's `required`;", "каждое поле, которое RecordType отмечает обязательным, называется в `required` схемы;", "Шаг вложенного списка, теми же словами."),
    L2("a field that is required only \"where it holds a value\" becomes an optional property;", "поле, обязательное «где в нём есть значение», становится необязательным свойством;", "Шаг вложенного списка, теми же словами."),
    L2("`unknown: \"refused\"` becomes `additionalProperties: false`;", "`unknown: \"refused\"` становится `additionalProperties: false`;", "Шаг вложенного списка, теми же словами, без последнего «and» («а»)."));
  replace("`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`",
    L("`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;", "`specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`;", SPLIT),
    L("the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;", "ключ `owner` каждой строки `specs/_confirmations.jsonl` становится `by`;", SPLIT + " «its lines» заменено тем, на что оно указывало, — «each line of `specs/_confirmations.jsonl`», — чтобы отдельный пункт был полным."));
  entries[k].change = swap(entries[k].change, "Остальная формулировка — как вы согласовали.", "Удаление `declaredIn` — не переименование: одобренное правило, из списка которого `sheriff reindex` его удаляет, становится черновиком, и `sheriff reindex` его называет. В этом репозитории и в saloon такого списка нет. Кроме того, согласованные пункты, которые объединяли несколько переименований, разделены по одному, а пункт о RecordType — вложенным списком, теми же словами (правила 7.2.2 и 7.3.2). Остальная формулировка — как вы согласовали.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// The final record of what changed (the coordinator, round d): the owner sees only the final wording, so each change
// field compares it with the approved or agreed wording, or says why a new part exists, and names no round, review,
// reviewer or reader. The history of the rounds is kept in group3-notes.md and in the copies made before each round.
// ---------------------------------------------------------------------------------------------------------------
const FINAL = {
  "s-j9r8z4xdrfkfs47": {
    parts: [
      ["For a setting that only an owner", "Было: «`sheriff binding` следит за переходом спецификации из черновика в одобренную и обратно; он читает правило, которое одобряет спецификацию, в `project.json`». Теперь `sheriff binding` принимает изменение записей настройки, которую меняет только ответственный, лишь при двух условиях ниже. Почему: по вашему решению по строке 10.1.27 от 2026-11-13 статус одобрения задают записи ответственного, и ни один коммит не удаляет и не меняет такую запись. По решениям по строкам 10.1.27a (2026-11-17) и 10.1.27b (2026-11-18) так же проверяются записи флага `strict` и записи о выборе расширения и его отзыве."],
      ["after the commit, the first entries", "Новое: так проверка находит запись, которую коммит удаляет, меняет или переставляет. Настройку определяет последняя запись (правила 10.6 и 10.7), поэтому запись, вставленная перед прежними или переставленная, изменила бы настройку так же, как удалённая."],
      ["each entry that follows them", "Новое: строки 10.1.27, 10.1.27a и 10.1.27b требуют, чтобы новую запись сделал ответственный. Запись называет человека по адресу электронной почты, как её записывает `sheriff settings` (согласованный узел «The settings that only an owner of the specification changes»)."],
      ["`sheriff binding` refuses every other change", "Было: коммит, который возвращает спецификацию в черновик, проходит, только если добавляет отзыв одобрения правила одним из ответственных. Теперь отвергается любое другое изменение записей, и отказ называет настройку, каждую затронутую запись и ответственных. Почему: правило в `project.json` и отзыв его одобрения вы заменили записями в `sheriff.config.json` (правило 10.6, ваше решение от 2026-11-13)."],
      ["`sheriff binding` reads the entries of the commit's parent", "Было: «It takes the specification before a commit as the commit's first parent holds it, read as `sheriff reindex` would rewrite it». Теперь так читаются записи родителя. Ссылка ведёт на согласованный узел о том, что `sheriff reindex` меняет в написанном прежним выпуском: он заменяет правило, одобрявшее спецификацию, записью, и эта запись поэтому считается записью родителя, а не новой. Ответственные берутся из `project.json`, каким его оставляет коммит."],
      ["`sheriff binding` makes this check regardless", "Новое: в столбце «On failure» строк 10.1.27, 10.1.27a и 10.1.27b стоит «refused» без условий. Код и тесты без SpecTag вне коммита, о которых одобренный узел сообщал, пока спецификация — черновик, теперь обрабатывает согласованный узел «Code and tests outside the commit that no SpecTag binds»."],
    ],
    reason: "Новое: у одобренного узла обоснования не было.",
  },
  "new:tools-7-1-extensions-delivered": {
    parts: [
      ["A command of the SpecSheriff tools that reads", "Новое: строка 10.1.27c и ваше решение по ней от 2026-11-18: проверки следят, чтобы установленный выпуск плагина поставлял каждое выбранное расширение. Так ловится выбор, записанный при более раннем выпуске плагина у участника команды или правкой `sheriff.config.json` вручную. Версия названа, чтобы человек знал, что плагин нужно обновить."],
      ["The commands that read the chosen extensions include", "Новое: какие команды читают выбранные расширения. Среди них `sheriff guard`: он читает модель спецификации, поэтому на машине, где плагину недостаёт выбранного расширения, каждая правка агента отвергается, пока плагин не обновят (то же решение от 2026-11-18)."],
      ["Each command that reads the chosen extensions makes", "Новое: в столбце «On failure» строки 10.1.27c стоит «refused, naming the extension» без условий."],
    ],
    reason: "Новое.",
  },
  "s-2x58az67bm6cxq2": {
    title: "Было: «The symbols a commit changes». Узел определяет теперь, что коммит добавляет, меняет, удаляет и оставляет неизменным, и не только в символах, но и в тестах, в файлах, привязанных целиком, и в SpecTag: на это опираются согласованные узлы группы 2.",
    parts: [
      ["The SpecSheriff tools find what a commit adds", "Было: «`sheriff binding` finds which symbols of the system's code outside its tests the commit changes». Действующее лицо — инструменты SpecSheriff: на узел опираются `sheriff binding`, `sheriff review` и `sheriff commit-message`. Узел охватывает и тесты, а слова «outside its tests» убраны, как вы просили 2026-11-20. Сказано, с чем сравнивается первый коммит репозитория."],
      ["A commit changes only the symbols", "Новое: «меняет» — только то, что есть и в родителе коммита, и в коммите. Иначе согласованные узлы группы 2, которые говорят «добавляет или меняет», охватывали бы и удалённый код, и удаление символа без SpecTag отвергалось бы."],
      ["A commit changes a symbol or a test where", "Было: «A changed line counts for the symbol it stands in. A change anywhere in a symbol is a change of the whole symbol». Какая строка меняет код, теперь говорит отдельный узел «A line that changes the code»: это отдельное требование (правило 7.3.3), и по вашему решению по правилу 9.4 от 2026-11-11 описание инструментов точно говорит, как они читают изменение. Строки теста включают его декораторы: иначе добавление `@pytest.mark.skip` не меняло бы теста. SpecTag над символом привязывает и вложенные в него символы (правило 1.5.2)."],
      ["A line that the commit removes", "Новое: удаление строк внутри символа меняет символ, а удаление всего символа учитывается как удаление. Это нужно узлу «The code and the tests of a draft rule» (строка 10.1.28a) и строке 10.1.41 (ваше решение от 2026-11-20). Переименованный тест с прежним SpecTag остаётся тем же тестом по правилу 9.4."],
      ["A commit changes a file bound as a whole", "Новое: по правилу 1.5.2 (ваше решение от 2026-11-17) изменение в любом месте файла, привязанного целиком, — изменение его кода, а комментарий в таком файле инструменты SpecSheriff от кода не отличают. Абзац написан для рекомендуемого ответа A на вопрос 1, при котором исключение правила 9.4 для комментариев сужается (proposal:s-9j2mmnuuwmx5ksn). При этом ответе засчитываются и пробельные символы, вопреки вашему решению от 2026-11-11 для таких файлов; вопрос это называет."],
      ["A commit also changes each symbol", "Было: «A line holding a SpecTag, before the commit or after it, counts for the symbol the SpecTag marks». Теперь изменение SpecTag определяется по его тексту, а не по строке: по правилу 9.4 и вашему решению по нему от 2026-11-10 SpecTag должен оставаться тем же, так что переформатированный комментарий вокруг неизменного SpecTag ничего не меняет."],
      ["A commit adds an entry of the bindings file", "Новое: изменение записи в файле привязок — изменение SpecTag её файла и поэтому его кода (правило 9.4). Согласованный узел «SpecTags on the system's code other than tests» отвергает запись, которую коммит добавляет или меняет, а этот абзац говорит, какие это записи."],
      ["A commit adds or changes each SpecTag", "Новое: согласованный узел «SpecTags on the system's code other than tests» отвергает SpecTag, который коммит добавляет или меняет, а здесь сказано, какие это SpecTag. Два вида — списком (правило 7.2.2)."],
      ["a SpecTag on a line that the commit adds", "Новое: первый из двух видов SpecTag, названных выше."],
      ["a SpecTag in an entry that the commit adds", "Новое: второй из двух видов SpecTag, названных выше."],
      ["The exception is a SpecTag that binds", "Новое: переформатированный комментарий вокруг прежнего SpecTag этот SpecTag не добавляет и не меняет."],
      ["A commit leaves unchanged each symbol", "Новое: на «оставляет неизменным» опирается согласованный узел «Code and tests outside the commit that no SpecTag binds»."],
    ],
    reason: "Новое: у одобренного узла обоснования не было.",
  },
  "new:tools-7-2-changed-line": {
    parts: [
      ["In a file whose language a description covers", "Новое: по вашему решению по правилу 9.4 от 2026-11-11 описание инструментов точно говорит, как они читают изменение; пробелы внутри строки по тому же решению не считаются."],
      ["they leave out comments", "Новое: по правилу 9.4 переформулировка комментариев не меняет кода; с комментарием опускается и sid ссылки в нём."],
      ["they read each string literal", "Новое: строковый литерал — один токен, поэтому изменение его текста, в том числе пробелов в нём, меняет код. Строка документации Python — тоже строковый литерал."],
      ["in a test (§s-zrsc6asgmhv8tnc)", "Новое: по правилу 9.4 переименование теста при прежнем SpecTag его не меняет."],
      ["The SpecSheriff tools compare each run", "Новое: строки сравниваются только внутри участка, который заменяет сравнение git, и алгоритм назван, чтобы настройка git на машине не меняла результат. Строка без токенов не меняет код."],
      ["Where the two runs hold the same number", "Новое в тексте узла; так уже делает код."],
      ["the tokens of the two lines differ", "Новое в тексте узла: переименование идентификатора меняет токены и поэтому код. Вы убрали это исключение из правила 9.4 2026-11-11."],
      ["in Python, the indentation", "Новое в тексте узла: по вашему решению по правилу 9.4 от 2026-11-11 отступ строки Python считается, потому что он определяет блок, в котором стоит строка."],
      ["Where the two runs hold different numbers", "Новое в тексте узла; так уже делает код."],
    ],
    reason: "Новое.",
  },
  "new:tools-7-2-draft-rule": {
    parts: [
      ["`sheriff binding` refuses a commit that adds", "Новое: строка 10.1.28a и ваши решения по ней. По решению от 2026-11-13 ни один коммит не добавляет и не меняет код или тест правила-черновика, а по решению от 2026-11-17 это код, который привязывает SpecTag, а не только символ. Удаление тоже отвергается: по принципу «Nothing unapproved is implemented» и правилу 1.3.2 правило-черновик не реализуется, а удаление его кода меняет то, что делает система."],
      ["The refusal names the rule", "Новое: что называет отказ."],
      ["`sheriff binding` reads the SpecTags both", "Новое: SpecTag родителя коммита читаются, чтобы отвергался и коммит, который удаляет код правила-черновика или переносит его SpecTag на другое правило. Статус правила берётся из спецификации после коммита, поэтому правило можно удалить или одобрить вместе с его кодом."],
    ],
    reason: "Новое.",
  },
  "s-t383grkn3q68dpf": {
    parts: [
      ["`sheriff binding` refuses each node whose", "Было: «`sheriff binding` collects the SpecTags on the code and on the tests across the repository, and compares them with each node's `meta.code` and `meta.tests`». Теперь узел говорит, что отвергается и что называет отказ, и сравнивает каждый список с тем, что записал бы `sheriff reindex` (строка 10.1.34). Что содержат списки, говорит одно место — proposal:s-ztseyetus7np6br-g3. Поэтому код собственных проверок и генераторов проекта, который по вашему решению от 2026-11-13 считается кодом правила, их перечисляющего, остаётся в списках."],
      ["`sheriff binding` compares the entries", "Новое: какие узлы проверяются, как в узлах группы 1. Узлы SpecSheriff guidelines и расширений из плагина сюда не входят: по правилу 9.7 их списки называют код и тесты репозитория, где пишутся guidelines. В столбце «On failure» строки 10.1.34 стоит «refused» без условий."],
    ],
    reason: "Новое: у одобренного узла обоснования не было.",
  },
  "s-5hb9k2e34dgn284": {
    parts: [
      ["`sheriff binding` accepts a `TextRule.list`", "Было: «`sheriff binding` compares the members of each list a node holds with the declaration the list names in the code, the schema or the settings». По вашим решениям по строке 10.1.35 от 2026-11-13 `TextRule.list.declaredIn` заменяют свойства `jsonSchema` и `valueList`, и проверка идёт от списка к схеме или к символу. Согласованный узел о том, что `sheriff reindex` меняет в написанном прежним выпуском, переписывает `declaredIn` в эти свойства."],
      ["where the list has a `TextRule.list.jsonSchema`", "Новое: первое предложение строки 10.1.35. JSON Schema описывает формат значений, а не перечисляет их, поэтому каждое значение проверяется по схеме (решение от 2026-11-13). Версия 2020-12 — та, по которой инструменты SpecSheriff уже проверяют файлы спецификации."],
      ["where the schema at that place holds", "Новое: второе предложение строки 10.1.35, сказанное утвердительно; перечисление засчитывается и через `$ref`."],
      ["where the list has a `TextRule.list.valueList`", "Новое: третье предложение строки 10.1.35."],
      ["`sheriff binding` refuses every other `TextRule.list`", "Новое: что называет отказ, в том числе когда не найдены файл, на который указывает список, место в нём или символ."],
      ["Each member of a list gives one", "Было: «A member that is an object is compared by the property the list names». Теперь сказано, какое значение даёт каждый элемент. Элемент-объект без этого свойства отвергает только узел «An object in a list», а список тогда не проверяется, чтобы одно нарушение отвергалось один раз."],
      ["A symbol declares the text", "Новое в тексте узла; так уже делает код (binding.ts, функция `declaration`). Сравнение с ключами JSON-объекта уходит, как говорит todo строки 10.1.35."],
      ["`sheriff binding` checks the list of each node", "Новое: какие узлы проверяются, как в узлах группы 1; строка 10.1.35 проверяет каждый список, у которого есть `jsonSchema` или `valueList`, в каком бы файле он ни был. В столбце «On failure» строки 10.1.35 стоит «refused» без условий."],
    ],
    reason: "Новое: у одобренного узла обоснования не было.",
  },
  "new:tools-7-2-own-kinds": {
    parts: [
      ["`sheriff binding` accepts the kinds of node", "Новое: узел вынесен из «A list and its declaration» и реализует строку 10.1.35a (proposal:row-10-1-35a). По вашему решению по правилу 8.4 от 2026-11-10 проверка сравнивает имя и `needsCode` каждого нового типа узлов, а код сейчас сравнивает только имена. Списки находятся по связи `refines`, как их читает согласованный узел «What the SpecSheriff tools read in the project's own guidelines»."],
      ["taken together, the members", "Новое: тип узлов, которого не перечисляет ни одно правило, отвергается, потому что правила 8.3 и 8.4 требуют правила, которое его перечисляет. Тип узлов, перечисленный дважды с тем же `needsCode`, не нарушает ни правила 8.4, ни решения от 2026-11-10."],
      ["each member of the `TextRule.list` of those rules gives", "Новое: сравнивается и `needsCode`, по решению от 2026-11-10."],
      ["each member of the `TextRule.list` of those rules names", "Новое: правило 8.4 перечисляет только типы узлов, которые добавляет расширение схемы проекта."],
      ["`sheriff binding` refuses a commit after which", "Новое: что называет отказ."],
      ["A member names a kind by the property", "Новое: как элемент называет тип узлов и даёт его `needsCode`, говорит правило 8.4. Элемент-объект без свойства отвергает узел «An object in a list», и тогда список не сравнивается, чтобы одно нарушение отвергалось один раз. В столбце «On failure» строки 10.1.35a стоит «refused»."],
    ],
    reason: "Новое.",
  },
  "s-cdachayybfvg4na": {
    parts: [
      ["`sheriff validate` checks each node", "Новое: какие узлы проверяются, как в узлах группы 1. В столбце «On failure» строки 10.1.36 стоит «refused» без условий."],
    ],
    reason: "Новое: у одобренного узла обоснования не было.",
  },
  "proposal:s-9j2mmnuuwmx5ksn": {
    parts: [
      ["A change to a SpecTag", "В первом предложении добавлена только ссылка на SpecTag при его первом упоминании (правило 7.2.7). Во втором «комментариев в коде и тестах» сужено до «комментариев в тестах или в файле, символы которого проверки могут определить» — словами правила 1.5.2, по рекомендуемому ответу A на вопрос 1. В файле, привязанном целиком, любое изменение текста — изменение кода, как говорит правило 1.5.2."],
    ],
  },
  "proposal:s-ztseyetus7np6br-g3": {
    parts: [
      ["the list `meta.code` of each node", "Было: «списки `meta.code` и `meta.tests` каждого узла, построенные по SpecTag, которые связывают с узлом код и тесты: `meta.code` называет каждый файл кода, в котором есть символ, связанный таким SpecTag, а `meta.tests` — каждый такой тест по его файлу и имени». По строке 10.1.34 (ваше решение от 2026-11-17) `meta.code` ссылается на каждый файл, который привязывает SpecTag, называющий узел. По правилу 1.5.2 код привязывают не только SpecTag над символом, но и SpecTag в начале файла и запись в файле привязок, и оба способа привязывают файл целиком. Теперь `meta.code` называет каждый файл, кроме файла тестов: тесты тоже код (правило 9.1), а код собственных проверок и генераторов проекта по вашему решению от 2026-11-13 считается кодом правила, которое их перечисляет. Пункт разделён на два, о `meta.code` и о `meta.tests` (правило 7.3.2). Ссылка на SpecTag при первом упоминании (правило 7.2.7)."],
      ["the list `meta.tests` of each node", "Вынесено из прежнего пункта о `meta.code` и `meta.tests`; смысл прежний. «объявляет» вместо «связывает», как говорит узел о том, как тест объявляет SpecTag."],
    ],
  },
  "proposal:row-10-1-35a": {
    parts: [
      ["Each kind of node that the project's extension", "Новая строка; без точки в конце, как у других строк таблицы. Почему она нужна, сказано выше."],
    ],
  },
  "proposal:s-hhnahzmhahf8jht": {
    parts: [
      ["A rule in the project's own guidelines", "Убрано последнее предложение: «`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON-схемы»; почему, сказано выше. Добавлена ссылка на `TextRule.list.members` при первом упоминании (правило 7.2.7). В русском — «собственных guidelines проекта», как в английском: «guidelines проекта» значит все guidelines проекта (правило 2.3)."],
      ["At each commit, a check verifies", "Английский текст — как в согласованной формулировке. В русском — «собственными guidelines проекта», как в английском (правило 2.3)."],
    ],
    reason: "Первое предложение — как в согласованной формулировке. Второе новое: прежнее («поэтому эти типы перечисляет правило») пересказывало второй абзац текста (правило 7.4.2).",
  },
  "proposal:s-gb8s9657a65hqmv-g3": {
    parts: [
      ["`TextRule.list.declaredIn` is removed where", "Новое: прежний выпуск связывал список собственных типов узлов проекта с полем `kinds` через `declaredIn`. Поле `kinds` не содержит схемы для имени типа узлов, а по предложению по правилу 8.4 инструменты SpecSheriff находят этот список по связи `refines`, так что `declaredIn` такого списка удаляется, а не становится `jsonSchema`."],
      ["`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`", "Было: «…где указывает в JSON Schema». «В любое другое место»: случай поля `kinds` теперь в пункте выше."],
    ],
  },
};
for (const [key, f] of Object.entries(FINAL)) {
  const p = entries[key].proposal;
  if (f.title) p.titleChange = f.title;
  for (const [start, change] of f.parts) parts(key)[at(key, start)].change = change;
  if (f.reason) p.reasonChange = f.reason;
  // A draft of the appendix of the tools has every part's change written here, so none keeps an earlier round's note.
  if (!key.startsWith("proposal:")) for (const x of p.parts) if (!f.parts.some(([start]) => x.en.startsWith(start))) {
    if (!(key === "s-cdachayybfvg4na" && x.en.startsWith("`sheriff validate` accepts a member"))) throw new Error(`${key}: no final change for the part ${x.en.slice(0, 50)}`);
  }
}
// Removed passages that only an intermediate draft held are not removals from the approved wording.
for (const key of ["s-2x58az67bm6cxq2", "s-t383grkn3q68dpf"]) entries[key].proposal.removed = entries[key].proposal.removed.filter((r) => !r.startsWith("Round b:"));
// The Russian list of what a proposal changes and why names no round and no reviewer either.
entries["proposal:s-9j2mmnuuwmx5ksn"].change = swap(swap(entries["proposal:s-9j2mmnuuwmx5ksn"].change, "- добавлен пример (рецензент).", "- добавлен пример.", "9.4"), "Это вопрос Q1;", "Это вопрос 1 в конце страницы;", "9.4");
entries["proposal:s-ztseyetus7np6br-g3"].change = swap(entries["proposal:s-ztseyetus7np6br-g3"].change, "В раунде b пункт о `meta.code` перестал сужать список до файлов кода:", "Пункт о `meta.code` не сужает список до файлов кода:", "ztseyetus");
entries["proposal:s-gb8s9657a65hqmv-g3"].change = swap(entries["proposal:s-gb8s9657a65hqmv-g3"].change, "разделены по одному, а пункт о RecordType — вложенным списком, теми же словами (правила 7.2.2 и 7.3.2).", "разделены по одному, а пункт о RecordType — вложенным списком, теми же словами (правила 7.2.2 и 7.3.2); где отдельному пункту не хватало подлежащего, оно повторено.", "gb8s");
// A change field names no round, review or reviewer; the Russian of a wording says «ответственный», never «владелец»
// (terms-ru.md). A wording may name the reviewer that the SpecSheriff tools run, so only the change fields are checked
// for that word.
const HISTORY = /[Рр]аунд|[Рр]ецензент|чтец|[Кк]оординатор|EngStickler|review-g3|\bQ1\b|владел/;
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const changesOf = [e.change, p.titleChange, p.reasonChange, ...p.parts.map((x) => x.change), ...(p.examples || []).map((x) => x.change)];
  for (const s of changesOf) if (s && HISTORY.test(s)) throw new Error(`${key}: a change field still names a round, a review or a reviewer: ${s.match(HISTORY)[0]} in ${s.slice(0, 80)}`);
  const ruOfNode = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)];
  for (const s of ruOfNode) if (s && /владел/.test(s)) throw new Error(`${key}: the Russian says «владелец»`);
}

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
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

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
  const mistake = SPEC_PROPOSAL(key, e) ? /The most likely mistake is|But not:/ : /The most likely mistake is/;
  const mistakeRu = SPEC_PROPOSAL(key, e) ? /Самая вероятная ошибка|Но не так:/ : /Самая вероятная ошибка/;
  if (!(p.examples || []).every((x) => mistake.test(x.en) && mistakeRu.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  if (key.startsWith("proposal:") && (!e.question || !e.change)) problems.push(`${key}: a proposal without its question or its Russian change`);
  const checked = key.startsWith("proposal:") ? [...p.parts.filter((x) => !AGREED_SAME.test(x.change)).map((x) => x.en), ...(p.examples || []).map((x) => x.en)] : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)];
  for (const sentence of checked.filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /makes this check whether/, /\bspacing\b/, /provided that/, /They also include/, /renames outside/]) {
    if (bad.test(phrase.replace(/SpecSheriff tools/g, "SST"))) problems.push(`${key}: the English holds ${bad}`);
  }
  if (!key.startsWith("proposal:s-gb8s") && /\bdeclaredIn\b/.test(phrase)) problems.push(`${key}: the English holds declaredIn`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ/.test(ruAll)) problems.push(`${key}: the Russian says «несёт»`);
}
// Each proposal built on an agreed draft keeps every part that its change does not touch; a split agreed part keeps its words.
const keeps = (key, baseKey, changedStarts) => {
  const base = drafts[baseKey].proposal.parts.map((x) => x.en);
  const now = entries[key].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${key} differs from ${baseKey} beyond the parts it changes: ${gone.map((g) => g.slice(0, 40)).join(" | ")}`);
};
keeps("proposal:s-ztseyetus7np6br-g3", "proposal:s-ztseyetus7np6br", ["the lists `meta.code` and `meta.tests`"]);
keeps("proposal:new-tools-1-settings-g3", "new:tools-1-settings", ["To find the SpecTags"]);
keeps("proposal:s-gb8s9657a65hqmv-g3", "new:tools-2-reindex-earlier", ["a node's key `id`", "the kinds of node", "a node's status", "a RecordType's `fields`", "`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`", "`specs/_confirmations.jsonl`"]);
// The mechanical split keeps every word of the agreed English, but for the joining "and", the repeated subjects and the
// antecedent written out.
{
  const words = (s) => s.toLowerCase().replace(/[;:,.]/g, " ").split(/\s+/).filter(Boolean);
  const base = drafts["new:tools-2-reindex-earlier"].proposal.parts;
  const now = entries["proposal:s-gb8s9657a65hqmv-g3"].proposal.parts;
  const ALLOWED_EXTRA = new Set(["the", "kind", "of", "node", "a", "node's", "status", "each", "line", "`specs/_confirmations.jsonl`"]);
  for (const start of ["a node's key `id`", "the kinds of node", "a node's status", "a RecordType's `fields`", "`specs/_confirmations.jsonl`"]) {
    const was = words(base.find((x) => x.en.startsWith(start)).en);
    const i = now.findIndex((x) => x.en.startsWith(start.replace("the kinds of node", "the kinds of node")));
    let j = i + 1;
    while (j < now.length && (now[j].kind === "li2" || /^(a node's key `rationale`|the kind of node `|a node's status `checked`|the key `owner` in each line)/.test(now[j].en))) j++;
    const isNow = now.slice(i, j).flatMap((x) => words(x.en));
    const missing = was.filter((w) => !isNow.includes(w) && w !== "and" && w !== "its" && w !== "lines");
    const extra = isNow.filter((w) => !was.includes(w) && !ALLOWED_EXTRA.has(w));
    if (missing.length || extra.length) problems.push(`the split of "${start}" changes words: missing ${missing.join(" ")}; extra ${extra.join(" ")}`);
  }
}

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

const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-d.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for agreed nodes and for a new row of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-d.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title ?? "a new row of the main table of checks"}`, "");
  if (e.kind === "cell") md.push(`A proposal: a new row of the main table of checks, placed after row 10.1.35. Its "On failure" cell reads: ${e.cost.en}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.${e.dependsOn ? ` It depends on ${e.dependsOn}.` : ""}`, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));

const changed = [
  "# T25, group 3, round d: the sentences written in the author's own words",
  "",
  "Each sentence below was written in round d by fix-group3-d.mjs in the author's own words, not in a review's. Every other change of round d uses the wording of a final review, or splits agreed items of `proposal:s-gb8s9657a65hqmv-g3` with the same words.",
  "fix-group3-d.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of [...new Set(OWN.map((o) => o.key))]) {
  changed.push(`## ${key} — ${entries[key].proposal.title}`, "");
  for (const o of OWN.filter((x) => x.key === key)) changed.push(`- ${o.en}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed-d.md", here), changed.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
