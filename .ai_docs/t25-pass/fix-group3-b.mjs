// T25, stage 2, group 3, round b: applies the four reviews (review-g3-a.md to review-g3-d.md), the reports of
// EngStickler's readers (english-g3-fast.md, english-g3-thorough.md) and the coordinator's rulings of round b to the
// drafts that propose-group3.mjs wrote. Copies tools-drafts.json to tools-drafts.before-group3-b.json before its first
// run, and on every run rebuilds the keys of the group from that copy, part by part, so a second run gives the same file.
// Adds two proposals: rule 9.4 (s-9j2mmnuuwmx5ksn), which depends on Q1, and rule 8.4 (s-hhnahzmhahf8jht). Checks
// every draft as propose-group3.mjs does, refuses to write where a key outside the group would change, and writes
// english-group3.md and english-group3-changed.md, which lists each sentence of round b written in the author's own
// words rather than a review's.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-b.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = (letter) => `specsheriff-rule-reviewer, 2026-11-24: review-g3-${letter}.md; EngStickler's readers, 2026-11-24: english-g3-fast.md and english-g3-thorough.md; fix-group3-b.mjs applied the findings and the coordinator's rulings`;
const Q1 = "Q1 of group3-notes.md: rewording a comment in a file bound as a whole changes its code (recommended A)";

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
};
const GROUP = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3"];
const NEW_KEYS = ["proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht"];

// Each key of the group, taken from the copy made before round b.
const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round b`);
  entries[key] = JSON.parse(JSON.stringify(drafts[key]));
}

// The sentences of round b written in the author's own words, for english-group3-changed.md.
const OWN = [];
const own = (key, en) => OWN.push({ key, en });

// Helpers that change one part of a draft, found by the start of its English.
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const setPart = (key, start, fields) => Object.assign(parts(key)[at(key, start)], fields);
const removePart = (key, start) => parts(key).splice(at(key, start), 1);
const insertAfter = (key, start, ...added) => parts(key).splice(at(key, start) + 1, 0, ...added);
const insertBefore = (key, start, ...added) => parts(key).splice(at(key, start), 0, ...added);
const addChange = (key, start, note) => {
  const x = parts(key)[at(key, start)];
  x.change = `${x.change} Раунд b: ${note}`;
};
const dropRef = (key, to) => {
  const p = entries[key].proposal;
  const n = p.refs.length;
  p.refs = p.refs.filter((r) => r.to !== to);
  if (p.refs.length === n) throw new Error(`${key}: no link to ${to}`);
};

// Ruling 5 of round b: "makes this check regardless of whether the specification is approved or a draft".
const RULING5 = "по решению координатора (раунд b): «makes this check regardless of whether…», потому что без «regardless of» фразу читали как «проверяет, одобрена ли спецификация» (чтец EngStickler).";

// ---------------------------------------------------------------------------------------------------------------
// s-j9r8z4xdrfkfs47 (review A).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-j9r8z4xdrfkfs47";
  entries[k].review = REVIEW("a");
  setPart(k, "after the commit, the first entries for that setting", {
    en: "after the commit, the first entries for that setting are all those that the commit's parent holds for it, unchanged and in the same order;",
    ru: "после коммита первыми записями для этой настройки остаются все записи для неё, которые содержит родительский коммит, неизменными и в том же порядке;",
  });
  addChange(k, "after the commit, the first entries for that setting", "«all those … for it»: чтец EngStickler прочёл «первые записи» как, возможно, лишь некоторые из записей родителя.");
  own(k, "after the commit, the first entries for that setting are all those that the commit's parent holds for it, unchanged and in the same order;");
  setPart(k, "`sheriff binding` refuses every other change", {
    en: "`sheriff binding` refuses every other change to the entries for a setting that only an owner of the specification changes. The refusal names the setting, each entry concerned and the specification's owners.",
    ru: "Любое другое изменение записей для настройки, которую меняет только ответственный за спецификацию, `sheriff binding` отвергает. Отказ называет настройку, каждую затронутую запись и ответственных за спецификацию.",
  });
  addChange(k, "`sheriff binding` refuses every other change", "два предложения об отказе заменены одним: прежнее условие было сказано через отрицание (рецензент, замечание 2).");
  removePart(k, "The settings that only an owner of the specification changes are the following:");
  removePart(k, "the specification's approval status (§s-qzthyh7yqvfhsa2);");
  removePart(k, "its `strict` flag (§s-q3pfzyaxvpr2zj2);");
  removePart(k, "the extensions of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen");
  dropRef(k, "s-mbmnsnxenmavu3z");
  setPart(k, "`sheriff binding` reads the entries of the commit's parent", {
    en: "`sheriff binding` reads the entries of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv). For a merge commit, the parent is its first parent. `sheriff binding` takes the specification's owners from `project.json` (§s-zefk589ykh37b8u) as the commit leaves it.",
    ru: "Записи родительского коммита `sheriff binding` читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv). Для коммита слияния родитель — его первый родитель. Ответственных за спецификацию `sheriff binding` берёт из `project.json` (§s-zefk589ykh37b8u) в том виде, в каком его оставляет коммит.",
  });
  addChange(k, "`sheriff binding` reads the entries of the commit's parent", "ссылка при первом упоминании `project.json` (рецензент, замечание 1). Абзац со списком настроек убран: он повторял согласованный узел `sheriff settings`, на который ссылается первый абзац (рецензент, замечание 4).");
  setPart(k, "`sheriff binding` makes this check whether", {
    en: "`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).",
  });
  addChange(k, "`sheriff binding` makes this check regardless", RULING5);
  const p = entries[k].proposal;
  p.reason = "Removing, editing or moving an entry already recorded, or recording an entry in the name of a person who is not an owner, could change a setting that only an owner of the specification changes without an act of an owner (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g).";
  p.ruReason = "Удаление, исправление или перестановка уже внесённой записи, как и внесение записи от имени человека, который не является ответственным, могли бы изменить настройку, которую меняет только ответственный за спецификацию, без действия ответственного (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g).";
  p.reasonChange = "Новое: у прежнего узла не было обоснования. Раунд b: формулировка рецензента (замечание 3); прежнее обоснование говорило, что удаление любой прежней записи изменило бы настройку, а это неверно для записи перед последней.";
  entries[k].stage3 = entries[k].stage3.replace("The branch on APPROVAL_RULE in approvals.ts:111-114 goes.", "The branch on APPROVAL_RULE in approvals.ts:97 goes.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-1-extensions-delivered (review A, the coordinator's ruling 1).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-extensions-delivered";
  entries[k].review = REVIEW("a");
  setPart(k, "A command of the SpecSheriff tools that reads the chosen extensions", {
    en: "A command of the SpecSheriff tools that reads the chosen extensions of the guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g) runs only where the installed SpecSheriff plugin delivers each of them (§s-j5qmmdq4m26mdvw). Where the plugin lacks any of them, the command refuses to run. The refusal names each missing extension and the version of the SpecSheriff tools in the plugin. `sheriff reindex` then leaves every file unchanged.",
    ru: "Команда инструментов SpecSheriff, которая читает выбранные расширения guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g), выполняется, только если установленный плагин SpecSheriff поставляет каждое из них (§s-j5qmmdq4m26mdvw). Если плагину недостаёт хотя бы одного из них, команда отказывается выполняться. Отказ называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине. `sheriff reindex` при этом оставляет все файлы неизменными.",
  });
  addChange(k, "A command of the SpecSheriff tools that reads the chosen extensions", "вместо «и останавливается» — «отказывается выполняться» и что называет отказ, формулировкой рецензента: из прежнего текста не было видно, что команда отказывает.");
  setPart(k, "The commands that read the chosen extensions include", {
    en: "The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which compose the schema of the specification with the schema of each chosen extension (§s-xzcw3hv4hmxz7h7). They also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).",
    ru: "Среди команд, которые читают выбранные расширения, — `sheriff validate`, `sheriff binding` и `sheriff reindex`, которые составляют схему спецификации со схемой каждого выбранного расширения (§s-xzcw3hv4hmxz7h7). Среди них и `sheriff guard`, который проверяет правку агента до того, как она сделана (§s-st6td4mua9uqt9z). Плагин поставляет расширение, если файл расширения находится по пути, указанному для каждого расширения guidelines (§s-zefk589ykh37b8u).",
  });
  addChange(k, "The commands that read the chosen extensions include", "назван `sheriff guard`: он читает модель спецификации, а в ней узлы выбранных расширений. Поэтому на машине, где плагину недостаёт выбранного расширения, каждая правка агента отвергается, пока плагин не обновят. Так решает ваше решение по строке 10.1.27c от 2026-11-18: проверки следят, чтобы установленный выпуск поставлял каждое выбранное расширение (решение координатора, раунд b). Коммит с такой машины отвергается в любом случае.");
  own(k, "They also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z).");
  setPart(k, "Each command that reads the chosen extensions makes this check whether", {
    en: "Each command that reads the chosen extensions makes this check regardless of whether the specification is approved or a draft (§s-j5qmmdq4m26mdvw).",
  });
  addChange(k, "Each command that reads the chosen extensions makes this check", RULING5);
  entries[k].proposal.refs.push(R("cites", "s-st6td4mua9uqt9z"));
  entries[k].proposal.examples = [X(
    "A project chooses an extension that a new release of the SpecSheriff plugin delivers. A team member's machine still has an earlier release, which does not deliver it. On that machine, `sheriff validate` refuses to run, naming the extension and the earlier release's version, so the git hook refuses the commit. The most likely mistake is to compose the schema without the missing extension, which lets the command accept, on that machine, a node that the extension's checks would refuse.",
    "Проект выбирает расширение, которое поставляет новый выпуск плагина SpecSheriff. На машине одного из участников команды всё ещё стоит более ранний выпуск, который его не поставляет. На этой машине `sheriff validate` отказывается выполняться и называет расширение и версию более раннего выпуска, поэтому git hook отвергает коммит. Самая вероятная ошибка — составить схему без недостающего расширения: тогда команда на этой машине принимает узел, который отвергли бы проверки расширения.")];
  own(k, "The most likely mistake is to compose the schema without the missing extension, which lets the command accept, on that machine, a node that the extension's checks would refuse.");
  entries[k].stage3 += " sheriff guard (guard.ts) loads the model too, so it is to refuse every edit while a chosen extension is missing.";
}

// ---------------------------------------------------------------------------------------------------------------
// s-2x58az67bm6cxq2 (review B; the coordinator's ruling 2: drafted for the recommended answer to Q1).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  entries[k].review = REVIEW("b");
  entries[k].dependsOn = "Q1";
  setPart(k, "The SpecSheriff tools find what a commit adds, changes and removes", {
    en: "The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path.",
    ru: "Инструменты SpecSheriff находят, что коммит добавляет, меняет и удаляет в коде системы (§s-hheus6f395ynqvc), в том числе в его тестах. Они сравнивают каждый файл в том виде, в каком его оставляет коммит, с тем же файлом в родительском коммите. Для коммита слияния родитель — его первый родитель. Первый коммит репозитория сравнивается с пустым репозиторием. Файл, который коммит перемещает или переименовывает, сравнивается с файлом по его прежнему пути.",
  });
  addChange(k, "The SpecSheriff tools find what a commit adds, changes and removes", "добавлено, с чем сравнивается первый коммит репозитория (рецензент); так уже делает diff.ts.");
  setPart(k, "The commit changes a symbol (§s-kgbzk2ph9e6jfb4)", {
    en: parts(k)[at(k, "The commit changes a symbol (§s-kgbzk2ph9e6jfb4)")].en.replace("The commit changes a symbol", "A commit changes a symbol"),
  });
  own(k, parts(k)[at(k, "A commit changes a symbol (§s-kgbzk2ph9e6jfb4)")].en.split(". ")[0] + ".");
  addChange(k, "A commit changes a symbol (§s-kgbzk2ph9e6jfb4)", "«A commit» вместо «The commit»: в абзаце коммит раньше не назван (чтец EngStickler).");
  setPart(k, "A line that the commit removes is read in the commit's parent.", {
    en: "A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. A test is also the same where the commit changes only its name outside its SpecTag (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    ru: "Строка, которую коммит удаляет, читается в родительском коммите. Строка, которую он добавляет, читается в файле в том виде, в каком его оставляет коммит. Символ или тест родителя — тот же, что символ или тест с тем же именем в файле в том виде, в каком его оставляет коммит. Тест остаётся тем же и тогда, когда коммит меняет только его название вне его SpecTag (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
  });
  own(k, "A test is also the same where the commit changes only its name outside its SpecTag (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn). (The reviewer's sentence, with the citation of the SpecTag added at its first use.)");
  addChange(k, "A line that the commit removes is read in the commit's parent.", "два последних предложения (что коммит добавляет и удаляет) заменены предложением рецензента о переименованном тесте; что коммит добавляет и удаляет, теперь говорит отдельный абзац. Ссылка на SpecTag перенесена сюда, к его первому упоминанию (правило 7.2.7).");
  setPart(k, "The commit changes a file bound as a whole", {
    en: "A commit changes a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) where it changes any of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).",
    ru: "Коммит меняет файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), если меняет любую часть текста файла, в том числе комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).",
  });
  addChange(k, "A commit changes a file bound as a whole", "второе и третье предложения удалены (рецензент): что коммит добавляет и удаляет, теперь говорит отдельный абзац, и перемещённый файл больше не считается добавленным. «whitespace» вместо «spacing» (оба чтеца EngStickler). Абзац зависит от вопроса Q1: он написан для рекомендуемого ответа A, при котором правило 9.4 сужается (proposal:s-9j2mmnuuwmx5ksn).");
  own(k, "A commit changes a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) where it changes any of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).");
  setPart(k, "A commit also changes each symbol, file bound as a whole and test whose SpecTags", {
    en: "A commit also changes each symbol, file bound as a whole and test whose SpecTags it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).",
    ru: "Коммит меняет также каждый символ, файл, привязанный целиком, и тест, SpecTag которых он меняет (§s-9j2mmnuuwmx5ksn). Коммит меняет SpecTag символа, файла или теста, если SpecTag привязывает его либо в родительском коммите, либо после коммита, но не в обоих случаях. Два SpecTag одинаковы, только если одинаковы их тексты, в том числе текст после `@spec none` (§s-5z5gnu7pahr82xp).",
  });
  addChange(k, "A commit also changes each symbol, file bound as a whole and test whose SpecTags", "ссылка на SpecTag перенесена в абзац выше, где SpecTag теперь упомянут впервые.");
  setPart(k, "The SpecTags of a file that the bindings file", {
    en: "A commit adds an entry of the bindings file (§s-trwczfskj5zmuft) where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.",
    ru: "Коммит добавляет запись файла привязок (§s-trwczfskj5zmuft), если в родительском коммите нет записи для того же файла. Он меняет запись, SpecTag которой отличаются от SpecTag записи того же файла в родительском коммите.",
  });
  addChange(k, "A commit adds an entry of the bindings file", "первое предложение («SpecTag файла … — это те, которые содержит запись этого файла») вырезано: это уже говорит правило 1.5.2 (рецензент). Ссылка на файл привязок перенесена сюда.");
  setPart(k, "A commit adds or changes each SpecTag on a line", {
    en: "A commit adds or changes each SpecTag of the following kinds:",
    ru: "Коммит добавляет или меняет каждый SpecTag следующих видов:",
  });
  addChange(k, "A commit adds or changes each SpecTag of the following kinds:", "два вида SpecTag — списком, формулировкой рецензента (правила 7.2.2 и 7.3.2).");
  insertAfter(k, "A commit adds or changes each SpecTag of the following kinds:",
    L("a SpecTag on a line that the commit adds;", "SpecTag на строке, которую коммит добавляет;", "Пункт списка (рецензент)."),
    L("a SpecTag in an entry that the commit adds or changes.", "SpecTag в записи, которую коммит добавляет или меняет.", "Пункт списка (рецензент)."),
    P("The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.",
      "Исключение — SpecTag, который привязывает тот же символ, файл или тест с тем же текстом, что и в родительском коммите.",
      "Как было; стоит после списка (рецензент)."));
  insertBefore(k, "A commit leaves unchanged each symbol",
    P("A commit changes only the symbols, files bound as a whole and tests that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.",
      "Коммит меняет только те символы, файлы, привязанные целиком, и тесты, которые есть и в родительском коммите, и в самом коммите. Каждый из них, который есть только в коммите, он добавляет. Каждый, который есть только в родительском коммите, он удаляет.",
      "Новое (рецензент): прежде узел считал добавленное и удалённое тоже «изменённым», и согласованные узлы группы 2, которые говорят «добавляет или меняет», охватывали бы и удалённый код: удаление символа без SpecTag отвергалось бы. Теперь «меняет» — только то, что есть по обе стороны коммита."));
  const p = entries[k].proposal;
  p.reason = "Each check of a commit judges only what the commit adds, changes or removes. A single definition of those changes lets every check judge the same ones.";
  p.ruReason = "Каждая проверка коммита оценивает только то, что коммит добавляет, меняет или удаляет. Единое определение этих изменений позволяет каждой проверке оценивать одни и те же изменения.";
  p.reasonChange = "Новое: у прежнего узла не было обоснования. Раунд b: вырезано «, each with the whole of the code that its SpecTags bind» — неясно, к чему относилось «its» (рецензент); «One account of what that is» заменено на «A single definition of those changes»: «account» читалось двояко (чтец EngStickler).";
  own(k, "A single definition of those changes lets every check judge the same ones.");
  p.refs = p.refs.filter((r) => !(r.type === "cites" && r.to === "s-8xw4mgvpexyvw5q"));
  p.refs.push(R("cites", "s-8xw4mgvpexyvw5q"));
  p.examples[1] = X(
    "A commit rewords a comment in a stylesheet bound by SpecTags at its start. The commit changes the stylesheet, since any change to the text of a file bound as a whole counts. The most likely mistake is to leave the comment out, as the SpecSheriff tools do in a file whose language a description covers.",
    "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла. Коммит меняет таблицу стилей, потому что засчитывается любое изменение текста файла, привязанного целиком. Самая вероятная ошибка — не учитывать комментарий, как это делают инструменты SpecSheriff в файле на языке, для которого есть описание.");
  p.removed.push("Round b: “The SpecTags of a file that the bindings file binds are those that the file's entry holds”: rule 1.5.2 already says it (review B).");
  p.removed.push("Round b: what a commit adds and removes, said of the symbols, tests and files that the commit changes: “changes” now means only what both the parent and the commit hold (review B).");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-changed-line (review B).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-changed-line";
  entries[k].review = REVIEW("b");
  setPart(k, "In a file whose language a description covers", {
    en: "In a file whose language a description covers (§s-33fw3ga4ctd94dq), the SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language, as follows:",
    ru: "В файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), инструменты SpecSheriff решают, какие из строк, которые коммит удаляет или добавляет, меняют код (§s-9j2mmnuuwmx5ksn). Они читают каждую строку как токены языка файла, при этом:",
  });
  addChange(k, "In a file whose language a description covers", "три правила чтения — списком, формулировкой рецензента (правило 7.2.2); строковый литерал на нескольких строках — по частям (рецензент).");
  insertAfter(k, "In a file whose language a description covers",
    L("they leave out comments;", "опускают комментарии;", "Пункт списка (рецензент)."),
    L("they read each string literal, or the part of one on the line, as one token;", "читают каждый строковый литерал или его часть на этой строке как один токен;", "Пункт списка (рецензент)."),
    L("in a test (§s-zrsc6asgmhv8tnc), they leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).", "в тесте (§s-zrsc6asgmhv8tnc) опускают название теста, кроме его SpecTag (§s-8xw4mgvpexyvw5q).", "Пункт списка (рецензент)."));
  setPart(k, "The SpecSheriff tools compare each run of consecutive lines", {
    en: "The SpecSheriff tools compare each run of consecutive lines that the commit removes with the run of lines that it adds in its place. They take the runs from git's comparison of the two versions of the file, made with the Myers algorithm, git's default, whatever git's settings on the machine. They leave out of both runs each line that holds no token, such as a blank line or a line that holds only a comment.",
    ru: "Инструменты SpecSheriff сравнивают каждую серию идущих подряд строк, которые коммит удаляет, с серией строк, которые он добавляет на их место. Серии они берут из сравнения двух версий файла, которое git выполняет алгоритмом Майерса, своим алгоритмом по умолчанию, какими бы ни были настройки git на машине. Из обеих серий они опускают каждую строку без токенов, например пустую строку или строку, в которой есть только комментарий.",
  });
  addChange(k, "The SpecSheriff tools compare each run of consecutive lines", "сказано, каким сравнением получены серии, формулировкой рецензента: настройка git `diff.algorithm` на машине могла бы изменить серии, а значит и результат проверки.");
  const p = entries[k].proposal;
  p.reason = "A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Reading lines as the tokens of their language leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.";
  p.ruReason = "Изменение кода заставляет инструменты SpecSheriff снова сверить этот код с его правилами (§s-9j2mmnuuwmx5ksn). Чтение строк как токенов их языка оставляет в стороне то, что не может изменить то, что делает код, например комментарии и пробельные символы между токенами.";
  p.reasonChange = "Новое. Раунд b: второе предложение — рецензента; прежнее было неверным: вызов, разнесённый на несколько строк, и переименованная локальная переменная засчитываются, хотя не меняют того, что делает код. «whitespace» вместо рецензентского «spacing», как в узле «The code and the tests that a commit changes» (оба чтеца EngStickler).";
  own(k, "Reading lines as the tokens of their language leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.");
  entries[k].stage3 += " diff.ts:49 is to pass --diff-algorithm=myers, so that git's settings on the machine cannot change the runs.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-draft-rule (review B).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-draft-rule";
  entries[k].review = REVIEW("b");
  setPart(k, "`sheriff binding` refuses a commit that adds, changes or removes", {
    en: "`sheriff binding` refuses a commit that adds, changes or removes (§s-2x58az67bm6cxq2) code or a test bound by a SpecTag (§s-8xw4mgvpexyvw5q) that names a draft rule (§s-wpadgy2budcxa3v). It does so regardless of whether the specification is approved or a draft (§s-utvqbypzhmgndug).",
    ru: "`sheriff binding` отвергает коммит, который добавляет, меняет или удаляет (§s-2x58az67bm6cxq2) код или тест, привязанный SpecTag (§s-8xw4mgvpexyvw5q), который называет правило-черновик (§s-wpadgy2budcxa3v). Он делает это независимо от того, одобрена спецификация или она черновик (§s-utvqbypzhmgndug).",
  });
  addChange(k, "`sheriff binding` refuses a commit that adds, changes or removes", "«bound by a SpecTag that names a draft rule» вместо «that a SpecTag naming a draft rule binds» (чтец EngStickler). Второе предложение — рецензента, вместо прежнего третьего абзаца, где «this check» ни к чему не относилось; «regardless of» — по решению координатора (раунд b).");
  insertAfter(k, "`sheriff binding` refuses a commit that adds, changes or removes",
    P("The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names each symbol and each test concerned, with its file and its line, and each other file concerned. Where the commit removes a symbol or a test, its line is read in the commit's parent.",
      "Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он называет также каждый затронутый символ и тест с его файлом и строкой и каждый другой затронутый файл. Если коммит удаляет символ или тест, его строка берётся в родительском коммите.",
      "Было в первом абзаце: «It also names the symbol, the file or the test, with its file and its line». Формулировка рецензента: прежде не было сказано, какую строку называет отказ для удалённого символа. Отказ вынесен в отдельный абзац, чтобы первый абзац не держал пять предложений."));
  setPart(k, "`sheriff binding` reads the SpecTags both in the commit's parent", {
    en: "`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. It takes the rule's approval status from the specification as the commit leaves it. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).",
    ru: "`sheriff binding` читает SpecTag и в родительском коммите, и в том виде, в каком коммит оставляет код и тесты. Статус одобрения правила он берёт из спецификации в том виде, в каком её оставляет коммит. Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).",
  });
  addChange(k, "`sheriff binding` reads the SpecTags both in the commit's parent", "«takes the rule's approval status from» вместо «reads whether a rule is a draft in»: «read whether» по-английски не говорят (чтец EngStickler).");
  own(k, "It takes the rule's approval status from the specification as the commit leaves it.");
  removePart(k, "`sheriff binding` makes this check whether");
}

// ---------------------------------------------------------------------------------------------------------------
// s-t383grkn3q68dpf (review C, fix A by the coordinator's ruling 4).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-t383grkn3q68dpf";
  entries[k].review = REVIEW("c");
  setPart(k, "`sheriff binding` refuses each node whose `meta.code` or `meta.tests`", {
    en: "`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that `sheriff reindex` would write there (§s-ztseyetus7np6br) from the SpecTags (§s-8xw4mgvpexyvw5q) as the commit leaves the code and the tests (§s-tqdmk6jakx97wra). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives that list.",
    ru: "`sheriff binding` отвергает каждый узел, `meta.code` или `meta.tests` (§s-rwqzepmrt77rv35) которого отличается от списка, который `sheriff reindex` записал бы туда (§s-ztseyetus7np6br) по SpecTag (§s-8xw4mgvpexyvw5q) в том виде, в каком коммит оставляет код и тесты (§s-tqdmk6jakx97wra). Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и приводит этот список.",
  });
  addChange(k, "`sheriff binding` refuses each node whose `meta.code` or `meta.tests`", "исправление A рецензента (решение координатора, раунд b): узел сравнивает каждый список с тем, что записал бы `sheriff reindex`, а что содержат списки, говорит одно место — предложение по узлу «What `sheriff reindex` writes». Прежние абзацы о списках сужали их до кода системы и оставляли вне списков код и тесты собственных проверок и генераторов проекта, которые по вашему решению от 2026-11-13 считаются кодом правила, которое их перечисляет.");
  removePart(k, "For a node, the SpecTags that name it produce the following lists:");
  removePart(k, "`meta.code`: an entry naming only the file");
  removePart(k, "`meta.tests`: each test of the system's code");
  removePart(k, "A SpecTag binds code in a file where it is placed");
  removePart(k, "above a symbol of the file");
  removePart(k, "at the start of the file");
  removePart(k, "in the file's entry in the bindings file");
  setPart(k, "`sheriff binding` compares each list regardless", {
    en: "`sheriff binding` compares each list regardless of the order of its entries. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-tqdmk6jakx97wra).",
  });
  addChange(k, "`sheriff binding` compares each list regardless", RULING5);
  for (const to of ["s-hheus6f395ynqvc", "s-zrsc6asgmhv8tnc", "s-33fw3ga4ctd94dq", "s-5qdjyf6t898rsd4", "s-trwczfskj5zmuft"]) dropRef(k, to);
  const p = entries[k].proposal;
  p.reason = "`sheriff reindex` writes a node's `meta.code` and `meta.tests` from the SpecTags (§s-ztseyetus7np6br), but a person may edit them by hand or commit without running it. A list that differs from the SpecTags would show a reader code or tests that are not bound to the node, or would hide some that are.";
  p.ruReason = "`sheriff reindex` пишет `meta.code` и `meta.tests` узла по SpecTag (§s-ztseyetus7np6br), но человек может изменить их вручную или сделать коммит, не запустив его. Список, который отличается от SpecTag, показал бы читателю код или тесты, не привязанные к узлу, или скрыл бы привязанные.";
  p.reasonChange = "Новое: у прежнего узла не было обоснования. Раунд b: «не привязанные к узлу» вместо «не реализуют узел»: тест ничего не реализует, он написан для узла (рецензент, замечание 2).";
  p.examples = [X(
    "Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to count only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.",
    "Правило R реализуют функция `render` в `src/page.ts` и файл `src/texts.json`, который файл привязок привязывает к R. `meta.code` правила R называет оба файла, и `sheriff binding` его принимает. Самая вероятная ошибка — считать только SpecTag над символами: тогда `sheriff binding` отверг бы этот `meta.code` за то, что он называет `src/texts.json`.")];
  own(k, "The most likely mistake is to count only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.");
  p.removed.push("Round b: the paragraphs that listed what the SpecTags produce for `meta.code` and `meta.tests`, and the places of a SpecTag: the node compares with what `sheriff reindex` would write (review C, fix A), and `proposal:s-ztseyetus7np6br-g3` defines both lists.");
  entries[k].stage3 = "Today neither command builds the lists from all the SpecTags: reindex.ts builds neither list, since reindex.ts:283-330 only rename tests inside meta.tests, and binding.ts:215-254 builds them only from the SpecTags above symbols and compares the symbols that an entry of meta.code names (binding.ts:240-249). binding.ts:72-73 reads only the files that the code and tests globs match. Both commands are to read also the files of each of the project's own checks and generators, the SpecTags at the start of a file and the entries of sheriff.bindings.json, and to build the lists as proposal:s-ztseyetus7np6br-g3 defines them; the comparison of symbols goes, and node.schema.json drops `symbols` from meta.code. binding.ts is to judge the nodes of the files that the repository keeps, including those in cells; judgedHere reads writesSpecSheriffGuidelines, which goes. The test at binding.test.ts:125 is to carry s-t383grkn3q68dpf; the tests at :132 and :138 go with the comparison of symbols.";
}

// ---------------------------------------------------------------------------------------------------------------
// s-5hb9k2e34dgn284 (review D).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5hb9k2e34dgn284";
  entries[k].review = REVIEW("d");
  setPart(k, "where the schema at that place holds the keyword `enum`", {
    en: "where the schema at that place holds the keyword `enum`, directly or through `$ref`, each value of that `enum` is one of the list's values;",
    ru: "если схема в этом месте содержит ключевое слово `enum`, напрямую или через `$ref`, каждое значение этого `enum` — одно из значений списка;",
  });
  addChange(k, "where the schema at that place holds the keyword `enum`", "«напрямую или через `$ref`» (рецензент): строка 10.1.35 говорит «gives an exact enumeration», а схема даёт перечисление и через ссылку.");
  setPart(k, "`sheriff binding` refuses every other `TextRule.list`", {
    en: "`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file, the place or the symbol to which the list points cannot be found, the refusal names it.",
    ru: "`sheriff binding` отвергает любой другой `TextRule.list`, называя файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и каждое затронутое значение. Если файл, место или символ, на которые указывает список, не найдены, отказ называет их.",
  });
  addChange(k, "`sheriff binding` refuses every other `TextRule.list`", "«to which the list points»: какой файл, прежде не было сказано (чтец EngStickler).");
  own(k, "Where the file, the place or the symbol to which the list points cannot be found, the refusal names it.");
  setPart(k, "Each member of a list gives one of its values.", {
    en: "Each member of a list gives one of the list's values. For a member that is an object, the value is the value of its property that `TextRule.list.property` names. `sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na).",
    ru: "Каждый элемент списка даёт одно из значений списка. Для элемента, который является объектом, значение — значение его свойства, которое называет `TextRule.list.property`. `sheriff binding` проверяет список, только если каждый его элемент, который является объектом, содержит это свойство, чего требует проверка объекта в списке (§s-cdachayybfvg4na).",
  });
  addChange(k, "Each member of a list gives one of the list's values.", "«one of the list's values» вместо «one of its values» (рецензент). «the value of its property»: значение элемента — значение свойства, а не само свойство (чтец EngStickler). Третье предложение — рецензента: прежде не было сказано, что делает `sheriff binding` со списком, у элемента-объекта которого нет свойства, и он отвергал бы такой список ещё раз.");
  own(k, "For a member that is an object, the value is the value of its property that `TextRule.list.property` names.");
  setPart(k, "`sheriff binding` checks the list of each node of the specification", {
    en: "`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The lists of a project's own kinds of node (§s-vsh384ybt4w25a2) are checked only by the check of those lists (§" + S.ownKinds + "). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).",
    ru: "`sheriff binding` проверяет список каждого узла спецификации в файлах, которые хранит репозиторий, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Списки собственных типов узлов проекта (§s-vsh384ybt4w25a2) проверяет только проверка этих списков (§" + S.ownKinds + "). `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-f5mm7tagez38ffz).",
  });
  addChange(k, "`sheriff binding` checks the list of each node of the specification", "второе предложение — рецензента: узел не проверяет, проверяет проверка. " + RULING5);
  const p = entries[k].proposal;
  p.reason = "A rule's list and the schema or the code that declares the same values are written separately, so either can gain or lose a value unnoticed. Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.";
  p.ruReason = "Список правила и схема или код, которые объявляют те же значения, пишутся отдельно, поэтому в любом из них значение может незаметно появиться или пропасть. Сравнение при каждом коммите удерживает значения, которые принимает система, в соответствии с теми, что утверждает правило.";
  p.reasonChange = "Новое: у прежнего узла не было обоснования. Раунд b: «в соответствии с теми» вместо «в границах тех» — проверка действует в обе стороны (рецензент); «keeps … in line with» вместо «holds … to», которое о наборе значений не говорят (чтец EngStickler).";
  own(k, "Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.");
  p.examples = [X(
    "A rule lists the states of a request: `open`, `done` and `cancelled`. Its `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` refuses the list and names `held`, a value of the `enum` that the list does not hold. The most likely mistake is to check only that each value of the list is valid against the schema. All three are, so a state that the schema accepts and the rule does not state would pass.",
    "Правило перечисляет состояния запроса: `open`, `done` и `cancelled`. Его `TextRule.list.jsonSchema` указывает на `#/properties/state` в `schema/request.schema.json`, и схема в этом месте содержит `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` отвергает список и называет `held` — значение `enum`, которого нет в списке. Самая вероятная ошибка — проверять только, что каждое значение списка корректно относительно схемы. Это верно для всех трёх, поэтому состояние, которое схема принимает, а правило не утверждает, прошло бы.")];
  own(k, "Its `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`.");
  entries[k].stage3 = entries[k].stage3.replace("and a value of an enum there that the list does not hold is to be refused.", "and a value of an enum there, reached directly or through $ref, that the list does not hold is to be refused.");
  entries[k].stage3 = entries[k].stage3.replace("A member that lacks its property is to be left to s-cdachayybfvg4na,", "A list with a member that is an object and lacks its property is to be left unchecked, for s-cdachayybfvg4na to refuse,");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-7-2-own-kinds (review D).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-own-kinds";
  entries[k].review = REVIEW("d");
  setPart(k, "taken together, the lists of the rules that refine", {
    en: "taken together, the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rules in the project's own guidelines (§s-u7tw6m8npxmv5tu) that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) include a member for each of those kinds;",
    ru: "элементы `TextRule.list` (§s-eferktypcj7njt5) правил собственных guidelines проекта (§s-u7tw6m8npxmv5tu), которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2), вместе содержат элемент для каждого из этих типов;",
  });
  addChange(k, "taken together, the members of the `TextRule.list`", "формулировка рецензента: только правила собственных guidelines проекта, как в правиле 8.4 и в согласованном узле о том, что инструменты читают в guidelines проекта; «exactly one» убрано — тип, перечисленный дважды с тем же `needsCode`, не нарушает ни правила 8.4, ни решения от 2026-11-10; ссылка на `TextRule.list` при первом упоминании.");
  setPart(k, "each member of those lists names one of those kinds.", {
    en: "each such member names one of those kinds.",
    ru: "каждый такой элемент называет один из этих типов.",
  });
  addChange(k, "each such member names one of those kinds.", "формулировка рецензента.");
  setPart(k, "`sheriff binding` refuses a commit after which a kind or a member fails", {
    en: "`sheriff binding` refuses a commit after which a kind or a member fails one of the conditions above. The refusal names each such kind or member. For a member, it also names the rule that lists the member, by that rule's file, sid and location (§s-kag2m9tzdnduxdx).",
    ru: "`sheriff binding` отвергает коммит, после которого тип или элемент не выполняет одно из условий выше. Отказ называет каждый такой тип или элемент. Для элемента он называет также правило, которое перечисляет этот элемент, — файл, sid и расположение этого правила (§s-kag2m9tzdnduxdx).",
  });
  addChange(k, "`sheriff binding` refuses a commit after which a kind or a member fails", "формулировка рецензента: «by its file…» читалось как «правило перечисляет элемент по его файлу» (рецензент и чтец EngStickler).");
  setPart(k, "A member names a kind by its property", {
    en: "A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na). It gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).",
    ru: "Элемент называет тип своим свойством, которое называет `TextRule.list.property` (§s-cdachayybfvg4na). `needsCode` типа он даёт своим свойством `needsCode`. `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-f5mm7tagez38ffz).",
  });
  addChange(k, "A member names a kind by its property", "два предложения вместо одного с двумя мыслями (рецензент, правило 7.3.2). " + RULING5);
  entries[k].proposal.refs.push(R("cites", "s-eferktypcj7njt5"), R("cites", "s-u7tw6m8npxmv5tu"));
  const p = entries[k].proposal;
  p.reason = "A project's own kind of node is declared in the extension of the schema, which nobody approves, but listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two keeps each kind, and whether its nodes require an implementation in code, in line with what an owner has approved.";
  p.ruReason = "Собственный тип узлов проекта объявляется в расширении схемы, которое никто не одобряет, но перечисляется в правиле, которое одобряет ответственный (§s-hhnahzmhahf8jht). Сравнение того и другого удерживает каждый тип, а также то, требуется ли его узлам имплементация в коде, в соответствии с одобренным ответственным.";
  p.reasonChange = "Новое. Раунд b: «but listed», «но перечисляется» и «в соответствии с одобренным» (рецензент); «keeps … in line with» вместо «holds … to» (чтец EngStickler).";
  own(k, "Comparing the two keeps each kind, and whether its nodes require an implementation in code, in line with what an owner has approved.");
  p.examples = [X(
    "The project's extension of the schema adds the kind `procedure` with `needsCode: true`, and the rule that lists the project's own kinds lists `procedure` with `needsCode: false`. `sheriff binding` refuses the commit and names `procedure`. The most likely mistake is to compare only the names of the kinds. The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do.",
    "Расширение схемы проекта добавляет тип `procedure` с `needsCode: true`, а правило, которое перечисляет собственные типы проекта, перечисляет `procedure` с `needsCode: false`. `sheriff binding` отвергает коммит и называет `procedure`. Самая вероятная ошибка — сравнивать только имена типов. Тогда правило говорило бы, что узлам типа `procedure` код не требуется, а схема — что требуется.")];
  own(k, "The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do.");
  entries[k].stage3 = entries[k].stage3.replace("It is to compare the members of the lists of the rules of project.json that refine s-vsh384ybt4w25a2, taken together,", "It is to compare the members of the lists of the rules of project.json that refine s-vsh384ybt4w25a2, taken together and only there,");
  entries[k].stage3 = entries[k].stage3.replace("name by name and needsCode by needsCode, and to refuse a kind that no member lists.", "name by name and needsCode by needsCode, to refuse a kind that no member lists, and to accept a kind listed twice with the same needsCode.");
}

// ---------------------------------------------------------------------------------------------------------------
// s-cdachayybfvg4na (review D).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-cdachayybfvg4na";
  entries[k].review = REVIEW("d");
  setPart(k, "`sheriff validate` checks each node of the specification", {
    en: "`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-yuu4ccgch68yzxb).",
  });
  addChange(k, "`sheriff validate` checks each node of the specification", RULING5);
  const p = entries[k].proposal;
  p.reason = "The value of a member that is an object is the value of its property that `TextRule.list.property` names. `sheriff binding` compares that value with the schema or the symbol to which the list points (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.";
  p.ruReason = "Значение элемента, который является объектом, — значение его свойства, которое называет `TextRule.list.property`. `sheriff binding` сравнивает это значение со схемой или символом, на которые указывает список (§s-5hb9k2e34dgn284), поэтому у элемента без этого свойства нет значения для сравнения.";
  p.reasonChange = "Новое: у прежнего узла не было обоснования. Раунд b: «`sheriff binding` compares that value with the schema or the symbol to which the list points» вместо «The list's declaration is compared with that value» — узел о списке больше не говорит об объявлении (рецензент); «the value of its property» (чтец EngStickler).";
  own(k, "The value of a member that is an object is the value of its property that `TextRule.list.property` names.");
  p.examples = [X(
    "A rule lists the roles of a user as objects, and its `TextRule.list.property` is `name`. One member is `{\"title\": \"operator\"}`. `sheriff validate` refuses that member and names `name`. The most likely mistake is to take the member's only property as its value.",
    "Правило перечисляет роли пользователя как объекты, и его `TextRule.list.property` — `name`. Один из элементов — `{\"title\": \"operator\"}`. `sheriff validate` отвергает этот элемент и называет `name`. Самая вероятная ошибка — считать значением элемента его единственное свойство.")];
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-ztseyetus7np6br-g3 (review C, finding 4; the coordinator's ruling 4).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-ztseyetus7np6br-g3";
  entries[k].review = REVIEW("c");
  setPart(k, "the list `meta.code` of each node", {
    en: "the list `meta.code` of each node (§s-rwqzepmrt77rv35), naming each file, other than a test file, that holds code bound by a SpecTag (§s-8xw4mgvpexyvw5q) naming the node, including a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);",
    ru: "список `meta.code` каждого узла (§s-rwqzepmrt77rv35), который называет каждый файл, кроме файла тестов, где есть код, привязанный SpecTag (§s-8xw4mgvpexyvw5q), который называет этот узел, в том числе файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);",
  });
  addChange(k, "the list `meta.code` of each node", "«each file, other than a test file» вместо «each code file»: тесты тоже код (правило 9.1), а список не сужается до кода системы, так что в нём остаются код собственных проверок и генераторов проекта, который по вашему решению от 2026-11-13 считается кодом правила, которое их перечисляет (рецензент, замечание 4; решение координатора). Ссылка на SpecTag при первом упоминании (правило 7.2.7). Определение обоих списков теперь только здесь: узел «A node's `meta.code` and `meta.tests`» сравнивает с тем, что записал бы `sheriff reindex`.");
  setPart(k, "the list `meta.tests` of each node", {
    en: "the list `meta.tests` of each node, naming each test that declares a SpecTag naming the node (§s-zrsc6asgmhv8tnc), by its file and its name;",
    ru: "список `meta.tests` каждого узла, который называет каждый тест, который объявляет SpecTag, называющий этот узел (§s-zrsc6asgmhv8tnc), по его файлу и имени;",
  });
  addChange(k, "the list `meta.tests` of each node", "«declares» вместо «binds», как в узле о том, как тест объявляет SpecTag (рецензент, замечание 4).");
  entries[k].proposal.refs.push(R("cites", "s-8xw4mgvpexyvw5q"), R("cites", "s-zrsc6asgmhv8tnc"));
  entries[k].change = entries[k].change.replace("Остальная формулировка — как вы согласовали в группе 1.", "В раунде b пункт о `meta.code` перестал сужать список до файлов кода: он называет каждый файл, кроме файла тестов, так что код собственных проверок и генераторов проекта остаётся в списке (ваше решение от 2026-11-13); пункт о `meta.tests` говорит «объявляет», как узел о том, как тест объявляет SpecTag. Остальная формулировка — как вы согласовали в группе 1.");
  entries[k].stage3 = "Today reindex.ts builds neither list: reindex.ts:283-330 only rename tests inside meta.tests. It is to build meta.code and meta.tests as this node defines them, from the SpecTags in every file that the SpecSheriff tools read for SpecTags, those of the project's own checks and generators included, from the SpecTags at the start of a file and from the entries of sheriff.bindings.json, an entry of meta.code naming only the file. Its tests are written first.";
}

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's ruling 2: Q1, drafted for its recommended answer A. Rule 9.4 narrows its exemption for comments.
// ---------------------------------------------------------------------------------------------------------------
entries["proposal:s-9j2mmnuuwmx5ksn"] = {
  question: "Q1: whether rewording a comment in a file bound as a whole changes its code (recommended A: it does, and rule 9.4 exempts a reworded comment only in tests and in code bound by a SpecTag before each symbol)",
  dependsOn: "Q1",
  location: "spec 9.4",
  sidValue: "s-9j2mmnuuwmx5ksn",
  review: "fix-group3-b.mjs, from review-g3-b.md (point 2) and the coordinator's ruling 2 of round b; not yet reviewed",
  change: "Изменён только конец второго предложения: «комментариев в коде и тестах» стало «комментариев в тестах или в коде, привязанном SpecTag перед каждым символом». Правило 1.5.2 (ваше решение от 2026-11-17) говорит, что изменение в любом месте файла, привязанного целиком, — изменение кода, который привязывают его SpecTag. Правило 9.4 (ваше решение от 2026-11-11) говорит, что переформулировка комментариев не меняет кода. Для файла, привязанного SpecTag в начале, — таблицы стилей, файла SQL, YAML или shell — оба правила сразу выполняться не могут: инструменты SpecSheriff отличают комментарий от кода только в языке, для которого у них есть описание. Это вопрос Q1; предложение написано для рекомендуемого ответа A, при котором остаётся правило 1.5.2, а исключение для комментариев действует там, где инструменты различают комментарии. Тесты всегда написаны на языке, для которого есть описание (узел о том, как тест объявляет SpecTag), поэтому для них исключение остаётся как было. Обоснование — как вы согласовали.",
  proposal: {
    title: "A change to a SpecTag",
    ruTitle: "Изменение SpecTag",
    parts: [
      P("A change to a SpecTag is considered a change to the test or the code that the SpecTag binds. Renaming a test, or rewording the comments in the tests or in code bound by a SpecTag before each symbol (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same.",
        "Изменение SpecTag считается изменением теста или кода, который этот SpecTag привязывает. Ни тест, ни код не меняет переформулировка названия теста или комментариев в тестах или в коде, привязанном SpecTag перед каждым символом (§s-kgbzk2ph9e6jfb4), при прежнем SpecTag.",
        "Первое предложение — как в согласованной формулировке. Во втором «комментариев в коде и тестах» сужено до «комментариев в тестах или в коде, привязанном SpecTag перед каждым символом» — по рекомендуемому ответу A на вопрос Q1. В файле, привязанном целиком, любое изменение текста — изменение кода, как говорит правило 1.5.2, на которое ссылается новая часть предложения."),
    ],
    reason: "Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.",
    ruReason: "Изменённые тест и код заново сверяются с правилами, названными в их SpecTag. Это правило проводит границу между правкой теста или кода, которая может повлиять на эту сверку, и правкой, которая не может.",
    reasonChange: "Как в согласованной формулировке.",
    refs: [R("cites", "s-kgbzk2ph9e6jfb4")],
    removed: [],
    date: DATE,
  },
};
own("proposal:s-9j2mmnuuwmx5ksn", "Renaming a test, or rewording the comments in the tests or in code bound by a SpecTag before each symbol (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same.");

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's ruling 3: rule 8.4 loses its sentence on `declaredIn` (review D, Q1 of that review).
// ---------------------------------------------------------------------------------------------------------------
entries["proposal:s-hhnahzmhahf8jht"] = {
  question: "None: carries out the owner's rulings of 2026-11-13 on row 10.1.35",
  location: "spec 8.4",
  sidValue: "s-hhnahzmhahf8jht",
  review: "fix-group3-b.mjs, from review-g3-d.md (its Q1) and the coordinator's ruling 3 of round b; not yet reviewed",
  change: "Убрано одно предложение: «`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON-схемы». По вашим решениям от 2026-11-13 по строке 10.1.35 `declaredIn` заменяют свойства `jsonSchema` и `valueList`, а `jsonSchema` значит, что каждое значение списка корректно относительно схемы в указанном месте. Поле `kinds` не содержит схемы для имени типа, поэтому предложение обещало бы проверку, которую не делает ни один инструмент. Инструменты SpecSheriff находят список по связи `refines` правила (новый узел группы 3 «The list of a project's own kinds of node»), так что предложение больше не нужно. Остальная формулировка — как вы согласовали 2026-11-10.",
  proposal: {
    title: "How a project's own kind of node is declared and checked",
    ruTitle: "Как собственный тип узлов объявляется и проверяется",
    parts: [
      P("A project adds a new kind of node to its JSON Schema, in the field `kinds` (§s-xm8rz4uupb73gu5).\nThrough its `schema`, a new kind of node may add fields of its own, beyond those the schema of the SpecSheriff guidelines sets for every node.\nA kind's `needsCode` says whether its nodes require an implementation in code.",
        "Проект добавляет новый тип узлов в свою JSON-схему, в поле `kinds` (§s-xm8rz4uupb73gu5).\nПосредством `schema` новый тип узла может добавить собственные поля, помимо общих для всех узлов, перечисленных в схеме SpecSheriff guidelines.\n`needsCode` типа узлов говорит, требуется ли его узлам имплементация кода.",
        "Как в согласованной формулировке."),
      P("A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name.",
        "Правило в guidelines проекта уточняет правило о собственных типах узлов (§s-vsh384ybt4w25a2). `TextRule.list.members` этого правила содержит каждый добавленный тип узла с его `needsCode`. `TextRule.list.property` этого правила называет ключ с именем типа узла.",
        "Убрано последнее предложение: «`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON-схемы». См. общее описание изменения."),
      P("At each commit, a check verifies that the JSON Schema and the project's own guidelines agree on the name and `needsCode` of each new kind of node (§s-jau82aq9juv9zzh).",
        "При каждом коммите проверка сверяет согласованность новых типов узлов по имени и `needsCode` между JSON-схемой и guidelines проекта (§s-jau82aq9juv9zzh).",
        "Как в согласованной формулировке."),
    ],
    reason: "Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so a rule lists those kinds.",
    ruReason: "Только проект знает, выполняются ли узлы типа, который он добавляет, кодом, инструментами или людьми. Расширение схемы никто не одобряет, поэтому эти типы узлов перечисляет правило.",
    reasonChange: "Как в согласованной формулировке.",
    refs: [R("cites", "s-xm8rz4uupb73gu5"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-jau82aq9juv9zzh")],
    removed: ["“That rule's `TextRule.list.declaredIn` refers to the field `kinds` of the JSON Schema”: the owner replaced `declaredIn` on 2026-11-13 (row 10.1.35), the field `kinds` holds no schema for a kind's name, and the SpecSheriff tools find the list by its `refines` link (" + S.ownKinds + ")."],
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
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
const AGREED_SAME = /^Как в согласованной формулировке/;

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
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const checked = key.startsWith("proposal:") ? p.parts.filter((x) => !AGREED_SAME.test(x.change)).map((x) => x.en) : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)];
  for (const sentence of checked.filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /makes this check whether/, /\bspacing\b/]) {
    if (bad.test(phrase.replace(/SpecSheriff tools/g, "SST"))) problems.push(`${key}: the English holds ${bad}`);
  }
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ/.test(ruAll)) problems.push(`${key}: the Russian says «несёт»`);
}
// The proposals for agreed nodes keep every part that their change does not touch.
{
  const base = drafts["proposal:s-ztseyetus7np6br"].proposal.parts.map((x) => x.en);
  const now = entries["proposal:s-ztseyetus7np6br-g3"].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== 1 || !gone[0].startsWith("the lists `meta.code` and `meta.tests`")) problems.push("proposal:s-ztseyetus7np6br-g3 differs from the agreed wording beyond its items on meta.code and meta.tests");
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

// english-group3.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-b.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for the agreed \"What `sheriff reindex` writes\" and for rules 9.4 and 8.4.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.${e.dependsOn ? ` It depends on ${e.dependsOn}.` : ""}`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));

// english-group3-changed.md: each sentence of round b in the author's own words, for the readers and the confirming review.
const changed = [
  "# T25, group 3, round b: the sentences written in the author's own words",
  "",
  "Each sentence below was written in round b by fix-group3-b.mjs in the author's own words, not in a review's or a reader's. Every other change of round b uses the wording of a review or of an EngStickler reader, or the coordinator's phrase \"makes this check regardless of whether the specification is approved or a draft\".",
  "fix-group3-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of [...new Set(OWN.map((o) => o.key))]) {
  changed.push(`## ${key} — ${entries[key].proposal.title}`, "");
  for (const o of OWN.filter((x) => x.key === key)) changed.push(`- ${o.en}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed.md", here), changed.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
