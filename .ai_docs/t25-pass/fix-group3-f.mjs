// T25, stage 2, group 3, round f: applies the reviews of round e (review-g3e-a.md, review-g3e-b.md), the reports of
// EngStickler's readers on it (english-g3e-fast.md, english-g3e-thorough.md) and the coordinator's rulings of round f.
// - A symbol, a test or a file bound as a whole changes where its two versions give different syntax trees, comments
//   and a test's name other than its SpecTag left out (review A, finding 1): "A line that changes the code" and
//   s-2x58az67bm6cxq2 are redrafted around this rule.
// - Rule 1.6.1 is split under rule 7.3.3 and brought into line, as items 11 and 12 of group 2's list were deferred to
//   (review B, A2); s-m4h279nbaqkpa3t stays on the reviewer's judgements.
// - The links that round e dropped are restored where a decision of the node cites them (review A, finding 4).
// - The judgement on comments covers every file, the files generated from the specification excepted (review B, F1-F4).
// Copies tools-drafts.json to tools-drafts.before-group3-f.json before its first run, and on every run rebuilds the keys
// of the group from that copy, so a second run gives the same file. Refuses to write where a key outside the group would
// change, and writes english-group3.md and english-group3-changed-f.md.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-f.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const newform = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const SAME = "Как в согласованной формулировке.";

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
const swap = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: no ${JSON.stringify(from.slice(0, 70))}`);
  return s.split(from).join(to);
};
const clone = (x) => JSON.parse(JSON.stringify(x));
const specNode = (sid) => {
  let found;
  const w = (n) => { if (n.sid === sid) found = n; (n.children || []).forEach(w); };
  JSON.parse(fs.readFileSync(new URL("moved/specs/_guidelines/spec.json", here), "utf8")).nodes.forEach(w);
  if (!found) throw new Error(`${sid} is not in the moved guidelines`);
  return found;
};

const KEPT = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht",
  "proposal:new-tools-1-settings-g3", "proposal:s-gb8s9657a65hqmv-g3", "proposal:row-10-1-35a",
  "proposal:s-kgbzk2ph9e6jfb4", "proposal:s-m4h279nbaqkpa3t", "proposal:s-nyh9yk22ba6g77q-g3", "proposal:row-10-1-43b",
  "proposal:s-vp24dqydygztqbt", "proposal:new-tools-10-verdict", "new:tools-7-3-review-comments"];
const ADDED = ["proposal:new-spec-1-6-checks", "proposal:new-spec-1-6-runs", "proposal:new-spec-1-6-tests"];
const S = { checks: "s-5j9s5dstbawdd69", runs: "s-ec6meku7xd34ych", tests: "s-x8uzc8z44pwtd3h" };
const entries = {};
for (const key of KEPT) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round f`);
  entries[key] = clone(drafts[key]);
}
for (const key of ADDED) if (drafts[key]) throw new Error(`${key} is already in the copy made before round f`);
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const OWN = [];

// ---------------------------------------------------------------------------------------------------------------
// "A line that changes the code" becomes the node on comparing two versions by their syntax trees (review A, finding 1;
// the coordinator's ruling 1). Its key and its sid stay.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-changed-line";
  const e = entries[k];
  e.proposal.title = "How two versions of code are compared";
  e.proposal.ruTitle = "Как сравниваются две версии кода";
  e.proposal.parts = [
    P("The SpecSheriff tools compare two versions of a symbol (§s-kgbzk2ph9e6jfb4), a test (§s-zrsc6asgmhv8tnc) or a file bound as a whole by their syntax trees (§s-9j2mmnuuwmx5ksn). They parse each version with the tree-sitter grammar of its file's language. Two versions differ where their trees differ once the following are left out of both:",
      "Инструменты SpecSheriff сравнивают две версии символа (§s-kgbzk2ph9e6jfb4), теста (§s-zrsc6asgmhv8tnc) или файла, привязанного целиком, по их синтаксическим деревьям (§s-9j2mmnuuwmx5ksn). Каждую версию они разбирают грамматикой tree-sitter для языка её файла. Две версии различаются, если различаются их деревья после того, как из обоих исключено следующее:",
      "Новое: по вашему решению от 2026-11-24 правка меняет код только там, где влияет на логику. Синтаксическое дерево меняется именно от таких правок: перенос строк в TypeScript его не меняет, отступ в YAML меняет."),
    L("each comment, other than a first line of the file that opens with `#!`;",
      "каждый комментарий, кроме первой строки файла, начинающейся с `#!`;",
      "Новое: по правилу 9.4 комментарий не меняет кода. Первая строка, начинающаяся с `#!`, называет интерпретатор файла, поэтому её правка меняет то, что делает код."),
    L("in a test, the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).",
      "в тесте — название теста, кроме его SpecTag (§s-8xw4mgvpexyvw5q).",
      "Новое: по правилу 9.4 переименование теста при прежнем SpecTag его не меняет."),
    P("A syntax tree holds the kind of each of its nodes and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. Whitespace changes the tree only where the grammar makes it part of the syntax, such as the indentation of a line in Python or YAML.",
      "Синтаксическое дерево содержит вид каждого своего узла и текст каждого токена, например идентификатора или литерала. Поэтому переименование идентификатора меняет дерево, и любая правка внутри строкового литерала тоже. Пробельные символы меняют дерево только там, где грамматика делает их частью синтаксиса, например отступ строки в Python или YAML.",
      "Новое: что содержит дерево. Переименование меняет код, как вы решили 2026-11-11. Пробельные символы меняют код только там, где грамматика делает их частью синтаксиса, как в Python и YAML, а не в TypeScript."),
    P("The SpecSheriff tools parse the following files with a grammar:",
      "Грамматикой инструменты SpecSheriff разбирают следующие файлы:",
      "Новое: для каких файлов у инструментов SpecSheriff есть грамматика."),
    L("a file whose language a description covers (§s-33fw3ga4ctd94dq), with the grammar of its language;",
      "файл на языке, для которого есть описание (§s-33fw3ga4ctd94dq), — грамматикой этого языка;",
      "Новое: файлы, символы которых инструменты SpecSheriff определяют."),
    L("a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON.",
      "файл, привязанный целиком (§s-kgbzk2ph9e6jfb4), имя которого оканчивается на `.yaml`, `.yml`, `.css`, `.sql`, `.sh` или `.json`, — грамматикой YAML, CSS, SQL, Bash или JSON.",
      "Новое, по вашему решению от 2026-11-24: правка комментария или пробельных символов, не влияющих на логику, не меняет код и в файле, привязанном целиком. Форматы — те, что чаще всего привязывают целиком: настройки, таблицы стилей, запросы и скрипты."),
    P("In any other file, two versions differ where their text differs.",
      "В любом другом файле две версии различаются, если различается их текст.",
      "Новое: где грамматики нет, засчитывается каждая правка, как требует правило 9.4 в предложении группы."),
  ];
  e.proposal.reason = "A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace that the language gives no meaning. So comparing trees counts exactly the edits that can matter. Where the SpecSheriff tools have no grammar, comparing the text counts every edit, so that no change to the code passes unchecked.";
  e.proposal.ruReason = "Изменение кода заставляет инструменты SpecSheriff снова сверить этот код с его правилами (§s-9j2mmnuuwmx5ksn). Синтаксическое дерево сохраняет всё, что может изменить то, что делает код, и отбрасывает пробельные символы, которым язык не придаёт значения. Поэтому сравнение деревьев засчитывает ровно те правки, которые могут иметь значение. Где у инструментов SpecSheriff нет грамматики, сравнение текста засчитывает каждую правку, чтобы ни одно изменение кода не прошло без проверки.";
  e.proposal.reasonChange = "Новое.";
  e.proposal.examples = [
    { en: "A commit re-wraps the call `send(to, subject, body);` onto three lines and adds a comment above it. Both versions give the same syntax tree, so the commit changes no code. The most likely mistake is to compare the lines, which counts the re-wrapped call as a change.",
      ru: "Коммит переносит вызов `send(to, subject, body);` на три строки и добавляет над ним комментарий. Обе версии дают одно и то же синтаксическое дерево, поэтому коммит код не меняет. Самая вероятная ошибка — сравнивать строки: тогда перенесённый вызов засчитывается как изменение." },
    { en: "A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. With the test's name left out, both versions give the same tree, so the commit leaves the test unchanged. The most likely mistake is to keep the test's name in the tree, which counts the renamed test as changed.",
      ru: "Коммит переименовывает тест `@spec s-… refuses an empty name` в `@spec s-… refuses a blank name` и больше ничего в нём не меняет. Без названия теста обе версии дают одно и то же дерево, поэтому коммит оставляет тест неизменным. Самая вероятная ошибка — оставлять название теста в дереве: тогда переименованный тест засчитывается как изменённый." },
    { en: "A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key in the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions give different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.",
      ru: "Коммит увеличивает на два пробела отступ ключа `retries` в файле YAML, привязанном целиком, и тем вкладывает этот ключ в ключ выше. Грамматика YAML делает отступ частью синтаксиса, поэтому две версии дают разные деревья, и коммит меняет файл. Самая вероятная ошибка — сравнивать только токены: тогда вложенный ключ проходит как неизменённый." },
  ];
  e.proposal.refs = [{ type: "implements", to: "s-9j2mmnuuwmx5ksn" }, { type: "cites", to: "s-kgbzk2ph9e6jfb4" }, { type: "cites", to: "s-zrsc6asgmhv8tnc" },
    { type: "cites", to: "s-8xw4mgvpexyvw5q" }, { type: "cites", to: "s-33fw3ga4ctd94dq" }];
  e.stage3 = "diff.ts:130-190 (codeChanges) pairs the removed lines of a file with its added lines and forgives a name renamed throughout (diff.ts:176-188); both go. diff.ts:146 and :160 count every line holding `@spec` as changed; they go, since s-2x58az67bm6cxq2 counts a change to a SpecTag by its text. binding.ts:42-51 (testLines) counts any line of a test as changed; it goes. normalize (diff.ts:78) strips `//`, `/*…*/` and `#` in a file that no description covers; it goes. The SpecSheriff tools are to parse both versions of each symbol, test and file bound as a whole with tree-sitter (the grammars of TypeScript, JavaScript and Python, and of YAML, CSS, SQL, Bash and JSON for a file bound as a whole with the matching extension) and to compare the trees with comments, other than a first line opening with `#!`, and a test's name other than its SpecTag left out. In any other file, the text is compared. The tests at binding.test.ts:42, :49, :56, :69 and :79 are to carry s-u6mj5yv8ngnz79v. Tests for a re-wrapped call, a renamed test, a re-indented YAML key, a reworded CSS comment, `a:hover` against `a :hover` in CSS, `x=1` against `x = 1` in Bash and a changed shebang are written first.";
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// "What a commit adds, changes and removes in the code and the tests": rests on the syntax trees.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  const e = entries[k];
  const i2 = at(k, "A commit changes a symbol or a test where a line");
  parts(k)[i2] = P("A commit changes a symbol, a test or a file bound as a whole where its two versions give different syntax trees (§s-u6mj5yv8ngnz79v). The tree of a symbol or a test spans it from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.",
    "Коммит меняет символ, тест или файл, привязанный целиком, если две его версии дают разные синтаксические деревья (§s-u6mj5yv8ngnz79v). Дерево символа или теста охватывает его от первой строки до последней, включая его декораторы. Поэтому изменение во вложенном символе меняет и каждый символ, в который он вложен.",
    "Было: «A changed line counts for the symbol it stands in. A change anywhere in a symbol is a change of the whole symbol». Теперь символ, тест или файл, привязанный целиком, меняется, если две его версии дают разные синтаксические деревья (узел «How two versions of code are compared»): так правка форматирования меняет код только там, где влияет на логику, как вы решили 2026-11-24. Дерево символа охватывает его декораторы: иначе добавление `@pytest.mark.skip` не меняло бы теста. SpecTag над символом привязывает и вложенные символы (правило 1.5.2).");
  const i3 = at(k, "A line that the commit removes is read in the commit's parent.");
  parts(k)[i3] = P("A symbol or a test of the commit's parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    "Символ или тест родительского коммита — тот же, что символ или тест с тем же именем в файле в том виде, в каком его оставляет коммит. Тест, который коммит переименовывает, сохраняя его SpecTag и больше ничего в нём не меняя, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    "Новое: какие версии символа или теста сравниваются. Переименованный тест с прежним SpecTag остаётся тем же тестом по правилу 9.4.");
  parts(k).splice(at(k, "A commit changes a file bound as a whole where"), 1);
  const ex0 = e.proposal.examples[0];
  ex0.en = swap(ex0.en, "The deleted line is read in the commit's parent, where it is in `close`, so the commit changes `close`.", "The version of `close` in the commit's parent holds that line, so the two versions give different syntax trees, and the commit changes `close`.", k);
  ex0.ru = swap(ex0.ru, "Удалённая строка читается в родительском коммите, где она находится в `close`, поэтому коммит меняет `close`.", "Версия `close` в родительском коммите содержит эту строку, поэтому две версии дают разные синтаксические деревья, и коммит меняет `close`.", k);
  const ex1 = e.proposal.examples[1];
  ex1.en = "A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools parse both versions with the grammar of CSS and leave the comment out of both trees. The trees are the same, so the commit does not change the stylesheet's code. The most likely mistake is to count any change to the text of a file bound as a whole as a change to its code.";
  ex1.ru = "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff разбирают обе версии грамматикой CSS и исключают комментарий из обоих деревьев. Деревья одинаковы, поэтому коммит не меняет кода таблицы стилей. Самая вероятная ошибка — считать любое изменение текста файла, привязанного целиком, изменением его кода.";
  e.stage3 = swap(e.stage3, "counting a line of such a file as changed where s-u6mj5yv8ngnz79v says, and a change to an entry's SpecTags as a change to its file.", "comparing two versions of such a file as s-u6mj5yv8ngnz79v says, and counting a change to an entry's SpecTags as a change to its file.", k);
  e.stage3 = swap(e.stage3, "It is to count a change to the SpecTags of a symbol, a file or a test only where their texts differ", "It is to compare two versions of a symbol, a test or a file by their syntax trees, as s-u6mj5yv8ngnz79v says, and to count a change to the SpecTags of a symbol, a file or a test only where their texts differ", k);
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 9.4: the readers' findings.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-9j2mmnuuwmx5ksn";
  const x = parts(k)[at(k, "In a file whose comments and whitespace the checks")];
  x.en = swap(x.en, "cannot tell from its code", "cannot tell apart from its code", k);
  const ex = entries[k].proposal.examples[0];
  ex.en = "A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. By contrast, a commit that indents a key of a YAML file further, which nests the key in the key above it, changes the code.";
  ex.ru = "Коммит меняет отступы блока кода TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому код он не меняет. Напротив, коммит, который увеличивает отступ ключа в файле YAML и тем вкладывает этот ключ в ключ выше, код меняет.";
  ex.change = "Новый пример: граница, которую провело ваше решение от 2026-11-24.";
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.5.2: the link that its decision of 2026-11-04 cites is restored; the exception reads one way only.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-kgbzk2ph9e6jfb4";
  const e = entries[k];
  const x = parts(k)[at(k, "A SpecTag before a symbol binds")];
  x.en = swap(x.en, "The only exception is an edit to a comment or to whitespace that changes no code (§s-9j2mmnuuwmx5ksn).", "The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment, or to whitespace that does not affect what the code does.", k);
  x.ru = swap(x.ru, "Единственное исключение — правка комментария или пробельных символов, которая код не меняет (§s-9j2mmnuuwmx5ksn).", "Единственное исключение — правка, которая код не меняет (§s-9j2mmnuuwmx5ksn): правка комментария или пробельных символов, не влияющих на то, что делает код.", k);
  x.change = "Было: «Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag». Добавлено предложение: исключение — правка, которая по правилу 9.4 код не меняет, то есть правка комментария или пробельных символов, не влияющих на то, что делает код. Так решили вы 2026-11-24; без исключения это правило противоречило бы правилу 9.4.";
  const moved = specNode("s-kgbzk2ph9e6jfb4");
  e.proposal.refs = [...moved.refs.filter((r) => r.to), { type: "cites", to: "s-9j2mmnuuwmx5ksn" }];
  e.proposal.citedInDecisions = ["s-qzthyh7yqvfhsa2"];
  if (!JSON.stringify(moved.meta?.decisions || []).includes("s-qzthyh7yqvfhsa2")) throw new Error("rule 1.5.2: no decision cites s-qzthyh7yqvfhsa2");
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.6.1, split under rule 7.3.3 (review B, A1 and A2; the coordinator's ruling 2). s-m4h279nbaqkpa3t keeps the
// reviewer's judgements, which rule 10.2 cites; three new nodes take the other requirements.
// ---------------------------------------------------------------------------------------------------------------
const nf161 = newform["1.6.1"];
const QUESTION_SPLIT = "None: carries out rule 7.3.3 and items 11 and 12 of group 2's list of changes outside the group, which fell due when rule 1.6.1 changed";
{
  const k = "proposal:s-m4h279nbaqkpa3t";
  const e = entries[k];
  e.location = "spec 1.6.2 (in rule 1.6.1's place, after the new rule on what the checks enforce)";
  e.proposal.title = "What the independent reviewer judges";
  e.proposal.ruTitle = "О чём судит независимый рецензент";
  e.proposal.titleChange = "Было: «What the checks enforce, and when they run». Узел разделён по правилу 7.3.3, и в нём остались только суждения рецензента; заголовок называет их.";
  e.proposal.parts = [
    P("In the review of a commit, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):",
      "При ревью коммита независимый рецензент судит о следующем (§s-nyh9yk22ba6g77q):",
      "Было: «In the review, an independent reviewer judges the following». «Of a commit»: после разделения узел начинается с этого предложения, и ревью в нём раньше не названо."),
    L("on every commit that changes code other than the files generated from the specification: whether that code does what the rules named in the commit say and does nothing that they do not say;",
      "при каждом коммите, меняющем код, кроме файлов, сгенерированных из спецификации, — делает ли этот код то, что говорят названные в коммите правила, и ничего сверх этого;",
      "Было: «on every commit that changes code». Исключены файлы, сгенерированные из спецификации: их рецензенту не передают (правило 10.4), и коммит, который меняет только их, получал ревью, которое может только пропустить (пункт 11 изменений группы 2)."),
    L("on every commit that adds or changes a comment in the code or in a test, other than in the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that this code implements or that this test is written from;",
      "при каждом коммите, который добавляет или меняет комментарий в коде или в тесте, кроме файлов, сгенерированных из спецификации, — согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует или по которым написан этот тест;",
      "Новое: суждение, которое 2026-11-24 с вашего согласия добавил принцип «Deterministic checks hold every participant to the contract». «Or that this test is written from»: тест не реализует правило, а написан по нему (правило 10.10). Сгенерированные файлы исключены, как в первом пункте. Замечание о комментарии только предупреждает: это говорит строка 10.1.43b."),
    L("on a commit whose message states that a rule's implementation needs no change: whether that statement is true;",
      "при коммите, в сообщении которого сказано, что реализацию правила менять не нужно, — верно ли это утверждение;", SAME),
    L("on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification (§s-5x737t9nee4zgaa): whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.",
      "при коммите, в котором одобряется узел технического приложения (§s-qmmzf9nksfsa3qp), если у узла есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации (§s-5x737t9nee4zgaa), — уточняет ли узел реализуемые им правила базовой спецификации и не противоречит ли он ни одному правилу базовой спецификации.",
      "Как в согласованной формулировке, со ссылкой на базовую спецификацию при её первом упоминании (правило 7.2.7)."),
  ];
  e.proposal.reason = "No script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification. So these judgements are made by an independent reviewer. Code generated from the specification only restates it, so the reviewer has nothing to judge there.";
  e.proposal.ruReason = "Скриптом не решить, делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли реализацию правила не нужно менять и согласуется ли узел технического приложения с базовой спецификацией. Поэтому эти суждения выносит независимый рецензент. Код, сгенерированный из спецификации, только повторяет её, поэтому рецензенту в нём нечего оценивать.";
  e.proposal.reasonChange = "Обоснование — о суждениях рецензента в целом, как требует правило 7.4.2: первое предложение взято из согласованного обоснования, где оно было третьим, с добавленным суждением о комментарии; второе и третье новые.";
  e.proposal.examples = [];
  e.proposal.refs = [{ type: "cites", to: "s-nyh9yk22ba6g77q" }, { type: "cites", to: "s-qmmzf9nksfsa3qp" }, { type: "cites", to: "s-sn6au3vcr9uy5pm" }, { type: "cites", to: "s-5x737t9nee4zgaa" }];
  e.change = "Правило 1.6.1 разделено на четыре узла по правилу 7.3.3: каждый держит требование, которое выполняется отдельно. Этот узел, с прежним sid, держит суждения рецензента, на которые ссылается правило 10.2. Три других — новые узлы рядом с ним: что держат проверки, когда они запускаются при коммите и при правках агента, когда должны проходить тесты. Так велит пункт 12 изменений группы 2, отложенный до следующего изменения этого правила.\n\nЧто изменено в этом узле:\n- заголовок называет суждения рецензента;\n- первое предложение: «при ревью коммита»;\n- добавлено суждение о комментарии, которое с вашего согласия 2026-11-24 добавил принцип «Deterministic checks hold every participant to the contract»; тест в нём не реализует правило, а написан по нему (правило 10.10);\n- из обоих суждений о коде и комментариях исключены файлы, сгенерированные из спецификации (пункт 11 изменений группы 2);\n- ссылка на базовую спецификацию при первом упоминании (правило 7.2.7);\n- обоснование — о суждениях в целом.\n\nЦена, которую вы приняли: коммит, который меняет только комментарии, тоже запускает платный прогон рецензента. Остальная формулировка — как вы согласовали 2026-11-20.";
  OWN.push(k);
}
const splitPart = (key, sid, location, title, ruTitle, ps, reason, ruReason, reasonChange, examples, refs, change) => {
  entries[key] = {
    question: QUESTION_SPLIT, location, sidValue: sid, change,
    proposal: { title, ruTitle, titleChange: "Новое: узел выделен из правила 1.6.1 по правилу 7.3.3.", parts: ps, reason, ruReason, reasonChange, examples, refs },
  };
  OWN.push(key);
};
splitPart("proposal:new-spec-1-6-checks", S.checks, "spec 1.6.1 (new, split from rule 1.6.1, before it)",
  "What the checks enforce", "Что держат проверки",
  [P("The following are checked mechanically:", "Механически проверяется следующее:",
    "Было: «Two things are checked mechanically:». Счёт в прозе убран по правилу 7.4.1 (пункт 12 изменений группы 2)."),
  L("that the specification conforms to the rules of the guidelines that the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp), lists;",
    "что спецификация соответствует тем правилам guidelines, которые перечислены в основной таблице проверок (§s-jau82aq9juv9zzh) или в таблице проверок расширения (§s-gpzs5fcxvp6jkrp);",
    "Как в согласованной формулировке, со ссылками на обе таблицы при их первом упоминании (правило 7.2.7)."),
  L("that the specification and the code still agree with each other.", "что спецификация и код по-прежнему согласованы между собой.", SAME),
  P(`Every check except the review (§s-m4h279nbaqkpa3t) is deterministic.`, `Каждая проверка детерминирована, кроме ревью (§s-m4h279nbaqkpa3t).`,
    "Как в согласованной формулировке, со ссылкой на узел о суждениях рецензента."),
  P("A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).",
    "Непройденная проверка отклоняет изменение, если таблица, в которой она перечислена, не говорит иного (§s-jau82aq9juv9zzh).", SAME)],
  "Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again.",
  "Каждая проверка, кроме ревью, двоична, поэтому отказ ни от кого не требует суждения. Проверку, которая иногда отклоняет по причине, которую никто не может воспроизвести, обходят при первой возможности и больше ей не доверяют.",
  "Как в согласованной формулировке: первые два предложения согласованного обоснования правила 1.6.1.",
  [],
  [{ type: "cites", to: "s-jau82aq9juv9zzh" }, { type: "cites", to: "s-gpzs5fcxvp6jkrp" }, { type: "cites", to: "s-m4h279nbaqkpa3t" }],
  "Новый узел выделен из правила 1.6.1 по правилу 7.3.3 (пункт 12 изменений группы 2): что проверяется механически, что каждая проверка, кроме ревью, детерминирована, и что непройденная проверка отклоняет изменение, если таблица не говорит иного.\n\nЧто изменено:\n- «Two things are checked mechanically» стало «The following are checked mechanically»: счёт в прозе убран (правило 7.4.1);\n- ссылки на основную таблицу проверок, на таблицу проверок расширения и на узел о суждениях рецензента при их первом упоминании (правило 7.2.7).\n\nОбоснование — первые два предложения согласованного обоснования правила 1.6.1, без изменений. Остальная формулировка — как вы согласовали 2026-11-20.");
splitPart("proposal:new-spec-1-6-runs", S.runs, "spec 1.6.3 (new, split from rule 1.6.1)",
  "The checks on a commit and on an agent's edits", "Проверки при коммите и при правках агента",
  [P("The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp).",
    "Проверки запускаются, когда делается коммит. Там, где спецификацию, тесты или код пишет агент, они запускаются ещё и после каждой его правки (§s-epaw9sgyaajzn8g). Некоторые его правки отклоняются ещё до того, как они сделаны (§s-83ev4wwesbwnhnp).", SAME)],
  "A check that runs after each of an agent's edits finds a mistake at the moment it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.",
  "Проверка, которая запускается после каждой правки агента, находит ошибку в тот момент, когда её сделали. Порядок теста и кода виден только при правках, потому что коммит содержит тест и код вместе.",
  "Второй абзац согласованного обоснования правила 1.6.1. Первое предложение переписано: «Run after each of an agent's edits» читалось как повеление.",
  [],
  [{ type: "cites", to: "s-epaw9sgyaajzn8g" }, { type: "cites", to: "s-83ev4wwesbwnhnp" }],
  "Новый узел выделен из правила 1.6.1 по правилу 7.3.3 (пункт 12 изменений группы 2): когда запускаются проверки — при коммите и после каждой правки агента. Текст — как вы согласовали 2026-11-20. Обоснование — второй абзац согласованного обоснования; его первое предложение переписано, потому что «Run after each of an agent's edits» читалось как повеление.");
splitPart("proposal:new-spec-1-6-tests", S.tests, "spec 1.6.4 (new, split from rule 1.6.1)",
  "When the tests must pass", "Когда должны проходить тесты",
  [P("As long as the specification has the status `approved`, the tests of the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.",
    "Пока спецификация имеет статус `approved`, тесты кода системы (§s-hheus6f395ynqvc) и собственных проверок (§s-2fau85dfyyeq66m) и генераторов (§s-km4x4s26kv7pjze) проекта должны пройти до того, как изменение попадёт в общую ветку проекта. Где запускаются тесты, например при каждом push или на общем сервере перед слиянием, называют собственные guidelines проекта (§s-u7tw6m8npxmv5tu).",
    "Как в согласованной формулировке, со ссылками на код системы и на собственные проверки и генераторы проекта при их первом упоминании (правило 7.2.7).")],
  nf161.reason.split("\n").filter((l) => l.trim()).slice(-1)[0],
  nf161.ruReason.split("\n").filter((l) => l.trim()).slice(-1)[0],
  "Как в согласованной формулировке: третий абзац согласованного обоснования правила 1.6.1.",
  nf161.examples.map((en, j) => ({ en, ru: nf161.ruExamples[j] })),
  [{ type: "cites", to: "s-hheus6f395ynqvc" }, { type: "cites", to: "s-2fau85dfyyeq66m" }, { type: "cites", to: "s-km4x4s26kv7pjze" }, { type: "cites", to: "s-u7tw6m8npxmv5tu" }],
  "Новый узел выделен из правила 1.6.1 по правилу 7.3.3 (пункт 12 изменений группы 2): когда должны проходить тесты и где их запускают. Добавлены ссылки на код системы и на собственные проверки и генераторы проекта при их первом упоминании (правило 7.2.7). Обоснование — третий абзац согласованного обоснования, пример — согласованный пример правила 1.6.1, без изменений. Остальная формулировка — как вы согласовали 2026-11-20.");

// ---------------------------------------------------------------------------------------------------------------
// Rule 10.4: the comment directly above a symbol (review B, B1); the links that its decisions cite stay.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-nyh9yk22ba6g77q-g3";
  const e = entries[k];
  const base = drafts["proposal:s-nyh9yk22ba6g77q"].proposal;
  e.proposal.refs = clone(base.refs);
  e.proposal.citedInDecisions = clone(base.citedInDecisions);
  const x = parts(k)[at(k, "the wording of each rule that a SpecTag")];
  x.en = swap(x.en, "binds to code or a test that the commit adds or changes, or in which the commit adds or changes a comment;", "binds to code or a test that the commit adds or changes, or that holds, or lies directly below, a comment that the commit adds or changes;", k);
  x.ru = swap(x.ru, "привязывает к коду или тесту, добавленному или изменённому коммитом либо такому, в котором коммит добавляет или меняет комментарий;", "привязывает к коду или тесту, добавленному или изменённому коммитом либо такому, в котором или непосредственно под которым стоит комментарий, добавленный или изменённый коммитом;", k);
  x.change = "Было: «…к коду или тесту, добавленному или изменённому коммитом». Добавлены код и тест, в которых или непосредственно под которыми стоит комментарий, добавленный или изменённый коммитом: по правилу 9.4 такой коммит кода не меняет, а чтобы оценить комментарий, рецензенту нужны правила этого кода (правило 1.6.1). Комментарий к символу стоит над ним (узел «How a symbol carries its SpecTags»), поэтому сказано и «непосредственно под которым».";
  e.change = swap(e.change, "Изменён один пункт: рецензент получает и формулировку каждого правила, которое SpecTag привязывает к коду или тесту, где коммит добавляет или меняет комментарий.", "Изменён один пункт: рецензент получает и формулировку каждого правила, которое SpecTag привязывает к коду или тесту, в котором или непосредственно под которым стоит комментарий, добавленный или изменённый коммитом.", k);
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// Row 10.1.43b (review B, C1).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:row-10-1-43b";
  const x = parts(k)[0];
  x.en = "Each comment that a commit adds or changes in the code or in a test, other than in the files generated from the specification, is consistent with the code that it describes and with the rules that this code implements or that this test is written from";
  x.ru = "Каждый комментарий, который коммит добавляет или меняет в коде или в тесте, кроме файлов, сгенерированных из спецификации, согласуется с кодом, который он описывает, и с правилами, которые этот код реализует или по которым написан этот тест";
  x.change = "Новая строка; без точки в конце, как у других строк таблицы. Тест не реализует правило, а написан по нему (правило 10.10). Файлы, сгенерированные из спецификации, исключены, как в правиле о суждениях рецензента. Почему строка нужна, сказано выше.";
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// "The review of a commit" (review B, D1 and D2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-vp24dqydygztqbt";
  const e = entries[k];
  const x = parts(k)[0];
  x.en = swap(x.en, "In that case, it refuses the commit only where the verdict lists at least one other finding.", "In that case, it refuses the commit only where the verdict also lists a finding on code or on a node that the commit approves.", k);
  x.ru = swap(x.ru, "В этом случае он отклоняет коммит, только если вердикт перечисляет хотя бы одно другое замечание.", "В этом случае он отклоняет коммит, только если вердикт перечисляет ещё и замечание о коде или об узле, который одобряется в коммите.", k);
  x.change = "Было: «In that case, it refuses the commit only where the verdict lists at least one other finding». Теперь — только замечание о коде или об узле, который одобряется в коммите: замечание о комментарии тоже «другое», но по принципу «Deterministic checks hold every participant to the contract» оно коммит не отклоняет.";
  const ex = e.proposal.examples[0];
  ex.en = swap(ex.en, "It changes no code, its message contains no statement that a rule's implementation needs no change, and it approves no node.", "It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node.", k);
  ex.ru = swap(ex.ru, "Он не меняет кода, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла.", "Он не меняет ни кода, ни комментариев в коде, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла.", k);
  ex.change = "Было: «It changes no code, …». Добавлено «and no comment in the code»: суждение о комментарии — четвёртое основание запустить рецензента.";
  e.change = "Что изменено:\n- в список суждений, для которых `sheriff review` запрашивает вердикт, добавлено суждение о комментарии (новый узел «The judgement on a comment that a commit adds or changes»);\n- пока спецификация — черновик, коммит отклоняется, только если вердикт перечисляет ещё и замечание о коде или об узле, который одобряется в коммите; было «хотя бы одно другое замечание», а замечание о комментарии коммит не отклоняет;\n- в примере названо и четвёртое основание запустить рецензента: коммит не меняет комментариев в коде.\n\nПочему: по предложению по правилу 1.6.1 рецензент выносит суждение о комментарии при каждом коммите, который добавляет или меняет комментарий, и по принципу «Deterministic checks hold every participant to the contract» его замечание только предупреждает. Цена, которую вы приняли 2026-11-24: коммит, который меняет только комментарии, тоже запускает платный прогон рецензента. Остальная формулировка — как вы согласовали 2026-11-24.";
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// "The reviewer's verdict" (review B, E1; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:new-tools-10-verdict";
  const e = entries[k];
  const i = at(k, "`sheriff review` reads a verdict only from an answer");
  parts(k).splice(i, 1,
    P("`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and that does one of the following:",
      "`sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта и делает одно из следующего:",
      "Было: «…conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one». Теперь вердикт, который пропускает коммит, может перечислять замечания о комментариях: по принципу «Deterministic checks hold every participant to the contract» такое замечание только предупреждает. Два условия — списком (правило 7.2.2)."),
    L("passes the commit and lists only findings that belong to the judgement on comments (§s-7vpsdsy8dpqdy6r), if it lists any;",
      "пропускает коммит и перечисляет только замечания, относящиеся к суждению о комментариях (§s-7vpsdsy8dpqdy6r), если перечисляет какие-либо;",
      "Новое: пропуск с замечаниями о комментариях — читаемый вердикт."),
    L("refuses the commit and lists at least one finding that belongs to another judgement.",
      "отклоняет коммит и перечисляет хотя бы одно замечание, относящееся к другому суждению.",
      "Было: «…or refuses it with at least one». Теперь хотя бы одно замечание другого суждения: из-за замечания о комментарии коммит не отклоняется."));
  e.proposal.reason = swap(e.proposal.reason, "such as a pass that lists a finding on code,", "such as a verdict that passes the commit and lists a finding on code,", k);
  e.proposal.ruReason = swap(e.proposal.ruReason, "например пропуска с замечанием о коде,", "например вердикта, который пропускает коммит с замечанием о коде,", k);
  e.proposal.reasonChange = "Было: «such as a pass that lists a finding». Теперь «a verdict that passes the commit and lists a finding on code»: вердикт, который пропускает коммит с замечанием о комментарии, читается.";
  e.change = "Изменены последний абзац текста, обоснование и пример: вердикт, который пропускает коммит, может перечислять замечания о комментариях, а вердикт, который отклоняет коммит, перечисляет хотя бы одно замечание другого суждения. Ответ, который не делает ни того ни другого, не читается. Почему: по принципу «Deterministic checks hold every participant to the contract», который вы изменили 2026-11-24, замечание рецензента о комментарии только предупреждает, и рецензент не отклоняет коммит из-за него. Остальная формулировка — как вы согласовали 2026-11-24.";
  OWN.push(k);
}

// ---------------------------------------------------------------------------------------------------------------
// "The judgement on a comment that a commit adds or changes" (review B, F1-F4; the coordinator's ruling 4; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-3-review-comments";
  const e = entries[k];
  e.proposal.parts = [
    P("`sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts.",
      "`sheriff review` сообщает каждое замечание независимого рецензента (§s-m4h279nbaqkpa3t) о комментарии, который коммит добавляет или меняет (§s-td4e3rdga6azav9), только как предупреждение. Каждое такое замечание называет файл, строку и проблему, а также каждое правило, которому комментарий противоречит.",
      "Новое: строка 10.1.43b и принцип «Deterministic checks hold every participant to the contract», который вы изменили 2026-11-24: замечание о комментарии только предупреждает."),
    P("The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc), other than in the files generated from the specification (§s-a8fn72xa782wvbk). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are what the SpecSheriff tools leave out of the trees. In any other file, the reviewer itself tells the comments apart from the code.",
      "Рецензент оценивает комментарии в коде системы (§s-hheus6f395ynqvc), кроме файлов, сгенерированных из спецификации (§s-a8fn72xa782wvbk). В файле, синтаксические деревья которого строят инструменты SpecSheriff (§s-u6mj5yv8ngnz79v), комментарии — это то, что инструменты SpecSheriff в деревья не включают. В любом другом файле рецензент сам отличает комментарии от кода.",
      "Новое: какие комментарии оценивает рецензент. Принцип не делает исключений, поэтому оцениваются и комментарии в файле, который инструменты SpecSheriff не разбирают: там их отличает сам рецензент. Сгенерированные файлы исключены, как в правиле о суждениях рецензента."),
    P("A commit adds or changes a comment where the commit adds a line that holds part of the comment. It also changes a comment where it removes a line that held part of the comment and leaves the rest of the comment in place. The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).",
      "Коммит добавляет или меняет комментарий, если добавляет строку, в которой есть часть комментария. Коммит меняет комментарий и тогда, когда удаляет строку, в которой была часть комментария, а остальную его часть оставляет на месте. Рецензент оценивает текст комментария, кроме его SpecTag (§s-8xw4mgvpexyvw5q), потому что изменение SpecTag — это изменение кода (§s-9j2mmnuuwmx5ksn).",
      "Новое: когда коммит добавляет или меняет комментарий, в том числе удалением одной из его строк. SpecTag в комментарии оценивают проверки, потому что по правилу 9.4 его изменение — изменение кода."),
    P("The reviewer makes the judgement on comments on every commit that adds or changes one, including a commit that changes no code. Besides what it gives the reviewer in every review (§s-vp24dqydygztqbt), `sheriff review` gives the reviewer the code that each such comment describes. That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:",
      "Суждение о комментариях рецензент выносит при каждом коммите, который добавляет или меняет комментарий, в том числе при коммите, который не меняет кода. Кроме того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт ему код, который описывает каждый такой комментарий. Этот код — следующее, целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag, которые его привязывают:",
      "Новое: когда выносится суждение и что получает рецензент. Комментарий судят по коду, который он описывает, поэтому рецензент получает этот код целиком, как в суждении о коде."),
    L("for a comment in a file bound as a whole: that file;", "для комментария в файле, привязанном целиком, — этот файл;", "Новое: в файле, привязанном целиком, нет символов, поэтому рецензент получает файл."),
    L("for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): that symbol or test;",
      "для комментария в символе (§s-kgbzk2ph9e6jfb4) или тесте либо непосредственно над ним (§s-33fw3ga4ctd94dq) — этот символ или тест;",
      "Новое: комментарий к символу стоит над ним (узел «How a symbol carries its SpecTags»), поэтому рецензент получает и символ под комментарием."),
    L("for any other comment: the symbol or the test that follows it, or the whole file where none follows it.",
      "для любого другого комментария — символ или тест, который идёт после него, или весь файл, если после него ничего нет.",
      "Новое: для комментария между символами рецензент получает следующий символ или тест, а весь файл — только если за комментарием ничего нет: так рецензент получает код, который комментарий скорее всего описывает, и не получает лишнего."),
    P("The reviewer finds a problem with a comment where either of the following holds:",
      "Рецензент находит проблему в комментарии, если выполнено одно из следующего:",
      "Новое: что значит, что комментарий согласуется с кодом и правилами, словами принципа."),
    L("the comment states something that the code it describes does not do;", "комментарий говорит то, чего не делает код, который он описывает;", "Новое: несоответствие коду."),
    L("the comment contradicts a rule that a SpecTag on that code names.", "комментарий противоречит правилу, которое называет SpecTag на этом коде.", "Новое: несоответствие правилам, которые реализует код или по которым написан тест."),
  ];
  e.proposal.reason = "A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch. A comment does not change what the system does, so a problem with one warrants a warning, but not a refusal of the commit.";
  e.proposal.ruReason = "Комментарий, который больше не соответствует своему коду, вводит в заблуждение следующего читателя кода. Увидеть несоответствие может только тот, кто читает и комментарий, и код. Комментарий не меняет того, что делает система, поэтому проблема в нём стоит предупреждения, но не отклонения коммита.";
  const ex = e.proposal.examples[0];
  ex.en = swap(ex.en, "The most likely mistake is to refuse the commit, as for a defect in the code.", "The most likely mistake is to refuse the commit, as `sheriff review` does for a defect in the code.", k);
  ex.ru = swap(ex.ru, "Самая вероятная ошибка — отклонить коммит, как при дефекте в коде.", "Самая вероятная ошибка — отклонить коммит, как `sheriff review` делает при дефекте в коде.", k);
  e.proposal.refs = [{ type: "implements", to: "s-td4e3rdga6azav9" }, { type: "cites", to: "s-m4h279nbaqkpa3t" }, { type: "cites", to: "s-hheus6f395ynqvc" },
    { type: "cites", to: "s-a8fn72xa782wvbk" }, { type: "cites", to: "s-u6mj5yv8ngnz79v" }, { type: "cites", to: "s-8xw4mgvpexyvw5q" },
    { type: "cites", to: "s-9j2mmnuuwmx5ksn" }, { type: "cites", to: "s-vp24dqydygztqbt" }, { type: "cites", to: "s-kgbzk2ph9e6jfb4" },
    { type: "cites", to: "s-33fw3ga4ctd94dq" }];
  e.stage3 = "No code asks the reviewer about comments. review.ts is to ask for a verdict on every commit that adds or changes a comment in the system's code other than the files that `sheriff types` writes, where a commit changes a comment as this node says: in a file whose syntax trees the SpecSheriff tools build, a comment left out of the trees; in any other file, every changed line, for the reviewer to tell comment from code. It is to give the reviewer the code that each such comment describes, as this node lists it, and to report each finding on a comment as a warning without refusing the commit. Its tests are written first.";
  OWN.push(k);
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
for (const d of [...Object.values(drafts), ...Object.values(entries)]) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
const HISTORY = /[Рр]аунд|[Рр]ецензент[аеуы]? (раунда|предложил)|чтец|[Кк]оординатор|EngStickler|review-g3|\bQ1\b|владел/;
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const decided = new Set(p.citedInDecisions || []);
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !decided.has(to)) problems.push(`${key}: cites link to ${to} that nothing in the node cites`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (e.kind !== "cell" && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  if (e.kind === "cell" && (!e.cost?.en || !e.cost?.ru)) problems.push(`${key}: a row without its cost`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  const spec = key.startsWith("proposal:") && /^spec /.test(e.location || "");
  const newExamples = key.startsWith("new:") ? (p.examples || []) : (p.examples || []).filter((x) => x.change);
  const mistake = spec ? /The most likely mistake is|By contrast,/ : /The most likely mistake is/;
  const mistakeRu = spec ? /Самая вероятная ошибка|Напротив,/ : /Самая вероятная ошибка/;
  if (!newExamples.every((x) => mistake.test(x.en) && mistakeRu.test(x.ru))) problems.push(`${key}: an example without its most likely mistake or its contrast`);
  if (/But not:|Но не так:/.test(en + ru)) problems.push(`${key}: an example says "But not:"`);
  if (key.startsWith("proposal:") && (!e.question || !e.change)) problems.push(`${key}: a proposal without its question or its Russian change`);
  for (const s of [e.change, p.titleChange, p.reasonChange, ...p.parts.map((x) => x.change), ...(p.examples || []).map((x) => x.change)]) if (s && HISTORY.test(s)) problems.push(`${key}: a change field names a round, a reviewer or Q1: ${s.match(HISTORY)[0]}`);
  if (e.dependsOn) problems.push(`${key}: depends on ${e.dependsOn}`);
  if (/владел|несёт|несут/.test(ru)) problems.push(`${key}: the Russian says «владелец» or «несёт»`);
  const checked = OWN.includes(key) ? [...p.parts.filter((x) => !/^Как в согласованной формулировке\.?$/.test(x.change)).map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)] : [];
  for (const sentence of checked.filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n").replace(/SpecSheriff tools/g, "SST");
  for (const bad of [/closest mistake/i, /outside its tests/, / included\b/, /\bstands?\b/, /\bthe tools\b(?! of)/, /makes this check whether/, /\bspacing\b/, /provided that/, /renames outside/, /But not:/, /\ba pass\b/]) {
    if (bad.test(phrase)) problems.push(`${key}: the English holds ${bad}`);
  }
}
// Every agreed sentence of rule 1.6.1 is in one of the four nodes that the split gives, word for word, unless it is one
// of those that the proposals list as changed.
{
  const sentences = (t) => t.split("\n").filter((l) => l.trim()).map((l) => l.replace(/^\s*- /, "")).flatMap((l) => l.split(/(?<=\.)\s+(?=[A-Z`])/));
  const agreed = [...sentences(nf161.text), ...sentences(nf161.reason)];
  const now = ["proposal:s-m4h279nbaqkpa3t", "proposal:new-spec-1-6-checks", "proposal:new-spec-1-6-runs", "proposal:new-spec-1-6-tests"].map((k) => `${entries[k].proposal.text}\n${entries[k].proposal.reason}`).join("\n");
  const CHANGED = ["Two things are checked mechanically:", "that the specification conforms to the rules of the guidelines", "Every check except the review is deterministic.",
    "In the review, an independent reviewer judges the following", "on every commit that changes code:", "on a commit in which a node of the technical appendix",
    "As long as the specification has the status `approved`", "The review needs a reviewer, because", "Run after each of an agent's edits"];
  for (const s of agreed) if (!now.includes(s) && !CHANGED.some((c) => s.startsWith(c))) problems.push(`rule 1.6.1: the agreed sentence is lost: ${s.slice(0, 70)}`);
}
// A proposal built on an agreed wording keeps every part that its change does not touch.
const keeps = (key, baseParts, changedStarts) => {
  const base = baseParts.map((x) => x.en);
  const now = entries[key].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${key} differs from its agreed wording beyond the parts it changes: ${gone.map((g) => g.slice(0, 40)).join(" | ")}`);
};
keeps("proposal:s-nyh9yk22ba6g77q-g3", drafts["proposal:s-nyh9yk22ba6g77q"].proposal.parts, ["the wording of each rule that a SpecTag"]);
keeps("proposal:s-vp24dqydygztqbt", drafts["s-vp24dqydygztqbt"].proposal.parts, ["`sheriff review` refuses a commit where the verdict"]);
keeps("proposal:new-tools-10-verdict", drafts["new:tools-10-verdict"].proposal.parts, ["`sheriff review` reads a verdict only from an answer"]);

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

const header = (key, e) => {
  const p = e.proposal;
  const out = [`## ${key} — ${p.title ?? "a new row of the main table of checks"}`, ""];
  if (e.kind === "cell") out.push(`A proposal: a new row of the main table of checks, placed ${/after row ([\d.a-z]+)/.exec(e.location)?.[0] ?? ""}. Its "On failure" cell reads: ${e.cost.en}.`, "");
  else if (key.startsWith("proposal:new-spec-")) out.push(`A proposal: a new node of the base specification, split from rule 1.6.1 (${e.location}).`, "");
  else if (key.startsWith("proposal:")) out.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.`, "");
  return out;
};
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-f.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for agreed nodes, for new nodes of the base specification and for new rows of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-f.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(...header(key, e));
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));

// Every English sentence that round f adds or rewrites: in each key, each title, part, reason or example whose English
// differs from what round e left, and every key that round f adds, in full.
const changed = [
  "# T25, group 3, round f: the English that round f adds or rewrites",
  "",
  "Each item below differs from what round e left, or belongs to a key that round f adds. Each is in the author's own words, unless the notes of round f say that it is in a reviewer's.",
  "fix-group3-f.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const old = before[key]?.proposal;
  const items = [];
  if (p.title && p.title !== old?.title) items.push(`Title: ${p.title}`);
  const oldEn = new Set((old?.parts || []).map((x) => x.en));
  for (const x of p.parts) if (!oldEn.has(x.en)) items.push(x.en);
  if (p.reason && p.reason !== old?.reason) items.push(`Reason: ${p.reason}`);
  const oldEx = new Set((old?.examples || []).map((x) => x.en));
  for (const x of p.examples || []) if (!oldEx.has(x.en)) items.push(`Example: ${x.en}`);
  if (!items.length) continue;
  changed.push(`## ${key} — ${p.title ?? "a new row of the main table of checks"}`, "");
  for (const it of items) changed.push(`- ${it}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed-f.md", here), changed.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
