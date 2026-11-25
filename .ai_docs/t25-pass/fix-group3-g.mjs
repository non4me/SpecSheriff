// T25, stage 2, group 3, round g: applies the reviews of round f (review-g3f-a.md, review-g3f-b.md, review-g3f-c.md), the
// reports of EngStickler's readers on it (english-g3f-fast.md, english-g3f-thorough.md) and the coordinator's rulings of
// round g: proposal:new-spec-1-6-runs is deleted, the decisions of rule 1.6.1 go to the nodes they concern, rule 9.4 is
// retitled and the first sentence of rule 1.5.2 is reworded inside their proposals, and rule 10.5 and row 10.1.43 get
// proposals. Copies tools-drafts.json to tools-drafts.before-group3-g.json before its first run, and on every run
// rebuilds the keys of the group from that copy, so a second run gives the same file. Refuses to write where a key outside
// the group would change, and writes english-group3.md and english-group3-changed-g.md.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-g.json", here);
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
const partsOf = (en, ru) => {
  const E = en.split("\n").filter((l) => l.trim());
  const R = ru.split("\n").filter((l) => l.trim());
  if (E.length !== R.length) throw new Error(`the English and the Russian differ in their lines: ${E[0].slice(0, 40)}`);
  return E.map((l, i) => ({ kind: /^\s+- /.test(l) ? "li2" : l.startsWith("- ") ? "li" : "p", en: l.replace(/^\s*- /, ""), ru: R[i].replace(/^\s*- /, ""), change: SAME }));
};
const spec = JSON.parse(fs.readFileSync(new URL("moved/specs/_guidelines/spec.json", here), "utf8"));
const specNode = (sid) => {
  let found;
  const w = (n) => {
    if (n.sid === sid) found = n;
    (n.children || []).forEach(w);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) w(c.node);
  };
  spec.nodes.forEach(w);
  if (!found) throw new Error(`${sid} is not in the moved guidelines`);
  return found;
};

const KEPT = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht",
  "proposal:new-tools-1-settings-g3", "proposal:s-gb8s9657a65hqmv-g3", "proposal:row-10-1-35a",
  "proposal:s-kgbzk2ph9e6jfb4", "proposal:s-m4h279nbaqkpa3t", "proposal:s-nyh9yk22ba6g77q-g3", "proposal:row-10-1-43b",
  "proposal:s-vp24dqydygztqbt", "proposal:new-tools-10-verdict", "new:tools-7-3-review-comments",
  "proposal:new-spec-1-6-checks", "proposal:new-spec-1-6-tests"];
const DELETED = ["proposal:new-spec-1-6-runs"];
const ADDED = ["proposal:row-10-1-43", "proposal:s-94k7b6r5kf65udf"];
const GEN = "s-qyjw8xez6t6adc3";
const entries = {};
for (const key of KEPT) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round g`);
  entries[key] = clone(drafts[key]);
}
for (const key of DELETED) if (!drafts[key]) throw new Error(`${key} is not in the copy made before round g`);
for (const key of ADDED) if (drafts[key]) throw new Error(`${key} is already in the copy made before round g`);
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const setPart = (key, start, en, ru, change) => { const x = parts(key)[at(key, start)]; x.en = en; x.ru = ru; if (change) x.change = change; };
const GENERATED_DECISION = {
  date: "(the date of the owner's answer)",
  problem: "A commit whose only change to code was in the files generated from the specification got a review that could only pass: the reviewer is not given those files (rule 10.4).",
  ruling: "The owner: the reviewer's judgements on code and on comments leave out the files generated from the specification, since that code only restates the specification.",
  type: "textual",
};

// ---------------------------------------------------------------------------------------------------------------
// "How two versions of code are compared" (review A, findings 1 to 4; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-changed-line";
  const e = entries[k];
  setPart(k, "The SpecSheriff tools compare two versions",
    "Where the SpecSheriff tools have a grammar of a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language. Two versions differ where their trees differ once the following are left out of both:",
    "Где у инструментов SpecSheriff есть грамматика языка файла, они сравнивают две версии символа или файла, привязанного целиком (§s-kgbzk2ph9e6jfb4), или теста (§s-zrsc6asgmhv8tnc) по их синтаксическим деревьям. Каждую версию они разбирают грамматикой tree-sitter для этого языка. Две версии различаются, если различаются их деревья после того, как из обоих исключено следующее:");
  setPart(k, "each comment, other than a first line", "each comment, other than the file's first line where it opens with `#!`;", "каждый комментарий, кроме первой строки файла, начинающейся с `#!`;");
  setPart(k, "A syntax tree holds the kind",
    "A syntax tree holds the kind of each construct of the code, how the constructs nest, and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. A change to whitespace changes the tree only where the grammar makes whitespace part of the syntax, such as the indentation of a line in Python or YAML.",
    "Синтаксическое дерево содержит вид каждой конструкции кода, вложенность конструкций друг в друга и текст каждого токена, например идентификатора или литерала. Поэтому переименование идентификатора меняет дерево, и любая правка внутри строкового литерала тоже. Правка пробельных символов меняет дерево только там, где грамматика делает пробельные символы частью синтаксиса, например отступ строки в Python или YAML.",
    "Новое: что содержит дерево, в том числе вложенность конструкций, от которой зависит отступ в YAML. Переименование меняет код, как вы решили 2026-11-11. Правка пробельных символов меняет код только там, где грамматика делает их частью синтаксиса, как в Python и YAML, а не в TypeScript.");
  setPart(k, "a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in",
    "a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml` or `.yml`, in `.css`, in `.sql`, in `.sh` or in `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON respectively.",
    "файл, привязанный целиком (§s-kgbzk2ph9e6jfb4), имя которого оканчивается на `.yaml` или `.yml`, на `.css`, на `.sql`, на `.sh` или на `.json`, — грамматикой YAML, CSS, SQL, Bash или JSON соответственно.");
  const i = at(k, "In any other file, two versions differ");
  parts(k).splice(i, 0, P("Where the grammar finds a syntax error in either version, the two versions differ where their text differs.",
    "Если грамматика находит синтаксическую ошибку хотя бы в одной из двух версий, версии различаются, если различается их текст.",
    "Новое: в дереве с синтаксической ошибкой вложенность может потеряться, например в шаблоне Helm, сохранённом как `.yaml`. Тогда сравнивается текст, чтобы изменение кода не прошло без проверки."));
  e.proposal.reason = swap(e.proposal.reason, "drops the whitespace that the language gives no meaning.", "drops the whitespace to which the language gives no meaning.", k);
  e.proposal.reason = swap(e.proposal.reason, "Where the SpecSheriff tools have no grammar, comparing", "Where the SpecSheriff tools have no grammar of a file's language, comparing", k);
  e.proposal.ruReason = swap(e.proposal.ruReason, "Где у инструментов SpecSheriff нет грамматики, сравнение", "Где у инструментов SpecSheriff нет грамматики языка файла, сравнение", k);
  const ex = e.proposal.examples[2];
  ex.en = swap(ex.en, "which nests the key in the key above it.", "which nests the key under the key above it.", k);
  e.proposal.refs = e.proposal.refs.filter((r) => !(r.type === "cites" && r.to === "s-9j2mmnuuwmx5ksn"));
}

// ---------------------------------------------------------------------------------------------------------------
// "What a commit adds, changes and removes in the code and the tests" (review A, findings 5 to 9; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  const e = entries[k];
  const p0 = parts(k)[at(k, "The SpecSheriff tools find what a commit adds")];
  p0.en += " A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, whatever git's settings on the machine.";
  p0.ru += " Строка, которую коммит добавляет или удаляет, — это строка, которую git показывает добавленной или удалённой, когда сравнивает две версии файла алгоритмом Майерса, принятым в git по умолчанию, при любых настройках git на машине.";
  p0.change += " Последнее предложение: какую строку коммит добавляет или удаляет, решает сравнение git алгоритмом Майерса при любых настройках машины, чтобы проверка давала один и тот же результат на каждой машине (принцип «Deterministic checks hold every participant to the contract»).";
  setPart(k, "A commit changes a symbol, a test or a file bound as a whole where",
    "A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test runs from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.",
    "Коммит меняет символ, тест или файл, привязанный целиком, если две его версии различаются (§s-u6mj5yv8ngnz79v). Символ или тест занимает строки от своей первой до последней, включая его декораторы. Поэтому изменение во вложенном символе меняет и каждый символ, в который он вложен.",
    "Было: «A changed line counts for the symbol it stands in. A change anywhere in a symbol is a change of the whole symbol». Теперь символ, тест или файл, привязанный целиком, меняется, если две его версии различаются (узел «How two versions of code are compared»): так правка форматирования меняет код только там, где влияет на логику, как вы решили 2026-11-24. Символ охватывает свои декораторы: иначе добавление `@pytest.mark.skip` не меняло бы теста. SpecTag над символом привязывает и вложенные символы (правило 1.5.2).");
  setPart(k, "A symbol or a test of the commit's parent is the same",
    "A symbol or a test in the commit's parent is the same as the one with the same name, nested in symbols with the same names, in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    "Символ или тест в родительском коммите — тот, что с тем же именем и вложен в символы с теми же именами, в файле в том виде, в каком его оставляет коммит. Тест, который коммит переименовывает, сохраняя его SpecTag и больше ничего в нём не меняя, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).",
    "Новое: какие версии символа или теста сравниваются; вложенные символы с одним именем, такие как `A.close` и `B.close`, различаются по символам, в которые они вложены. Переименованный тест с прежним SpecTag остаётся тем же тестом по правилу 9.4.");
  const ex0 = e.proposal.examples[0];
  ex0.en = swap(ex0.en, "A commit deletes one line inside the function `close` and changes nothing else in it.", "A commit deletes the line `log(id);` inside the function `close` and changes nothing else in it.", k);
  ex0.en = swap(ex0.en, "The version of `close` in the commit's parent holds that line,", "The version of `close` in the commit's parent contains that line,", k);
  ex0.ru = swap(ex0.ru, "Коммит удаляет одну строку внутри функции `close`", "Коммит удаляет строку `log(id);` внутри функции `close`", k);
  e.proposal.removed = e.proposal.removed.map((r) => r.replace("“A line that changes the code” (s-u6mj5yv8ngnz79v)", "“How two versions of code are compared” (s-u6mj5yv8ngnz79v)"));
  if (!e.proposal.removed.some((r) => r.includes("“How two versions of code are compared”"))) throw new Error(`${k}: the removed sentence on the old title is not found`);
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 9.4: the title (review A, finding 10; the coordinator's ruling 2) and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-9j2mmnuuwmx5ksn";
  const e = entries[k];
  e.proposal.title = "Which edits change a test or code";
  e.proposal.ruTitle = "Какие правки меняют тест или код";
  e.proposal.titleChange = "Было: «A change to a SpecTag». Узел говорит теперь и о пробельных символах, и о файлах, где комментарий не отличить от кода, и это не изменения SpecTag; заголовок называет, о чём узел (правило 7.3.1).";
  const ex = e.proposal.examples[0];
  ex.en = swap(ex.en, "and changes nothing else, so it changes no code.", "and changes nothing else, so the commit changes no code.", k);
  ex.en = swap(ex.en, "which nests the key in the key above it,", "which nests the key under the key above it,", k);
  e.change = swap(e.change, "Что изменено:\n", "Что изменено:\n- заголовок: было «A change to a SpecTag», теперь «Which edits change a test or code», потому что узел говорит не только о SpecTag (правило 7.3.1);\n", k);
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.5.2 (review A, findings 11 and 12; the coordinator's ruling 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-kgbzk2ph9e6jfb4";
  const e = entries[k];
  setPart(k, "The system's code (§s-hheus6f395ynqvc) outside its tests is bound",
    parts(k)[at(k, "The system's code (§s-hheus6f395ynqvc) outside its tests is bound")].en.replace("The system's code (§s-hheus6f395ynqvc) outside its tests is bound", "The system's code (§s-hheus6f395ynqvc) other than tests is bound"),
    parts(k)[at(k, "The system's code (§s-hheus6f395ynqvc) outside its tests is bound")].ru.replace("Код системы (§s-hheus6f395ynqvc) вне его тестов привязан", "Код системы (§s-hheus6f395ynqvc) помимо тестов привязан"),
    "Было: «The system's code outside its tests is bound…». «Other than tests»: код, кроме тестов, называют простыми словами (правило «Code other than tests is referred to in plain words»), раз узел меняется.");
  const x = parts(k)[at(k, "A SpecTag before a symbol binds")];
  x.en = swap(x.en, "an edit to a comment, or to whitespace that does not affect what the code does.", "an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.", k);
  x.ru = swap(x.ru, "правка комментария или пробельных символов, не влияющих на то, что делает код.", "правка комментария, оставляющая его SpecTag прежними, или пробельных символов, не влияющих на то, что делает код.", k);
  x.change = "Было: «Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag». Добавлено предложение: исключение — правка, которая по правилу 9.4 код не меняет, то есть правка комментария, оставляющая его SpecTag прежними, или пробельных символов, не влияющих на то, что делает код. Так решили вы 2026-11-24; без исключения это правило противоречило бы правилу 9.4. SpecTag в начале файла стоят в комментарии, поэтому сказано, что они остаются прежними.";
  e.change = "Что изменено:\n- добавлено одно предложение: из «изменения в любом месте» файла, привязанного целиком, исключена правка, которая по правилу 9.4 код не меняет, — правка комментария, оставляющая его SpecTag прежними, или пробельных символов, не влияющих на то, что делает код;\n- первое предложение: «The system's code outside its tests» стало «The system's code other than tests», потому что код, кроме тестов, называют простыми словами, а узел меняется.\n\nПочему: по вашему решению от 2026-11-24 правка форматирования меняет код только там, где влияет на логику, а правка комментария кода не меняет. Это говорит правило 9.4 для всех файлов, и новое предложение ссылается на него, чтобы два правила не противоречили друг другу. Связи узла не меняются. Остальная формулировка — как вы согласовали 2026-11-17.";
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.6.1's split: proposal:new-spec-1-6-runs is deleted (review B, C1; the coordinator's ruling 1); the decisions
// go to the nodes they concern (review B, A2); the judgement on code names the system's code and cites the generated
// files (review B, A1); the readers.
// ---------------------------------------------------------------------------------------------------------------
const d161 = specNode("s-m4h279nbaqkpa3t").meta.decisions;
const decisionsOn = (dates) => d161.filter((d) => dates.some(([date, start]) => d.date === date && d.problem.startsWith(start))).map(clone);
{
  const k = "proposal:s-m4h279nbaqkpa3t";
  const e = entries[k];
  setPart(k, "on every commit that changes code other than the files",
    `on every commit that changes the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§${GEN}): whether that code does what the rules named in the commit say and does nothing that they do not say;`,
    `при каждом коммите, меняющем код системы (§s-hheus6f395ynqvc) вне файлов, сгенерированных из спецификации (§${GEN}), — делает ли этот код то, что говорят названные в коммите правила, и ничего сверх этого;`,
    "Было: «on every commit that changes code». Теперь — код системы вне файлов, сгенерированных из спецификации, как в согласованном узле о суждении о коде: их рецензенту не передают (правило 10.4), и коммит, который меняет только их, получал ревью, которое может только пропустить (пункт 11 изменений группы 2).");
  setPart(k, "on every commit that adds or changes a comment",
    "on every commit that adds or changes a comment in the code or in a test outside the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that the code implements or that the test is written from;",
    "при каждом коммите, который добавляет или меняет комментарий в коде или в тесте вне файлов, сгенерированных из спецификации, — согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует или по которым написан этот тест;");
  e.proposal.reason = swap(e.proposal.reason, "Code generated from the specification only restates it,", "Code generated from the specification only restates the specification,", k);
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: "s-hheus6f395ynqvc" }, { type: "cites", to: GEN }];
  e.proposal.meta = { decisions: decisionsOn([["2026-11-19", "Who verifies"], ["2026-11-19", "Who checks a node"], ["2026-11-20", "The node did not say which approved nodes"]]) };
  e.proposedDecisions = [e.proposedDecision, GENERATED_DECISION];
  delete e.proposedDecision;
  e.change = swap(e.change, "Правило 1.6.1 разделено на четыре узла по правилу 7.3.3: каждый держит требование, которое выполняется отдельно. Этот узел, с прежним sid, держит суждения рецензента, на которые ссылается правило 10.2. Три других — новые узлы рядом с ним: что держат проверки, когда они запускаются при коммите и при правках агента, когда должны проходить тесты.",
    "Правило 1.6.1 разделено по правилу 7.3.3: каждая часть держит требование, которое выполняется отдельно. Этот узел, с прежним sid, держит суждения рецензента, на которые ссылается правило 10.2. Два других — новые узлы рядом с ним: что держат проверки и когда должны проходить тесты. Предложения о том, когда запускаются проверки (при коммите, после каждой правки агента и до неё), из правила 1.6.1 убраны: их уже говорят правила 10.2 и 10.3, и узел, который только повторял бы их, не нужен.", k);
  e.change = swap(e.change, "- из обоих суждений о коде и комментариях исключены файлы, сгенерированные из спецификации (пункт 11 изменений группы 2);",
    "- из обоих суждений о коде и комментариях исключены файлы, сгенерированные из спецификации, со ссылкой на узел о них (пункт 11 изменений группы 2);\n- суждение о коде говорит «код системы», как согласованный узел о суждении о коде;", k);
  e.change = swap(e.change, "- обоснование — о суждениях в целом.", "- обоснование — о суждениях в целом;\n- решения правила разнесены по узлам, к которым они относятся: здесь остались решения о суждениях рецензента.", k);
}
{
  const k = "proposal:new-spec-1-6-checks";
  entries[k].proposal.meta = { decisions: decisionsOn([["2026-11-08", "The node said that the checks"], ["2026-11-18", "The node named only the main table"]]) };
  entries[k].change += "\n\nРешения правила 1.6.1 от 2026-11-08 и 2026-11-18 (о таблице проверок расширения) перенесены сюда: они о том, что держат проверки.";
}
{
  const k = "proposal:new-spec-1-6-tests";
  entries[k].proposal.meta = { decisions: decisionsOn([["2026-11-17", "The node did not say when the tests"], ["2026-11-18", "The node did not require the tests"], ["2026-11-20", "The reason cited"]]) };
  entries[k].change += "\n\nРешения правила 1.6.1 от 2026-11-17, от 2026-11-18 (о генераторах) и от 2026-11-20 (об обосновании) перенесены сюда: они о тестах.";
}
{
  const moved = d161.length;
  const placed = ["proposal:s-m4h279nbaqkpa3t", "proposal:new-spec-1-6-checks", "proposal:new-spec-1-6-tests"].reduce((n, k) => n + entries[k].proposal.meta.decisions.length, 0);
  if (moved !== placed) throw new Error(`rule 1.6.1 has ${moved} decisions, and ${placed} were placed`);
}

// ---------------------------------------------------------------------------------------------------------------
// Row 10.1.43b (review B, E1; the readers) and row 10.1.43 (the coordinator's ruling 3).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:row-10-1-43b";
  const e = entries[k];
  const x = parts(k)[0];
  x.en = `Each comment that a commit adds or changes in the code or in a test outside the files generated from the specification (§${GEN}) is consistent with the code that it describes and with the rules that the code implements or that the test is written from`;
  x.ru = `Каждый комментарий, который коммит добавляет или меняет в коде или в тесте вне файлов, сгенерированных из спецификации (§${GEN}), согласуется с кодом, который он описывает, и с правилами, которые этот код реализует или по которым написан этот тест`;
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: GEN }];
  e.proposedDecisions = [e.proposedDecision, GENERATED_DECISION];
  delete e.proposedDecision;
}
{
  const cell = specNode("s-zn4vrdpnv9bch62");
  const row = JSON.parse(fs.readFileSync(new URL("table-10-1.json", here), "utf8")).tables.flatMap((g) => g.rows).find((r) => r.num === "10.1.43");
  if (row.en !== "The code changed in a commit does what the rules it names say, and nothing they do not") throw new Error("row 10.1.43 is not as agreed");
  entries["proposal:row-10-1-43"] = {
    question: "None: carries out item 11 of group 2's list of changes outside the group, which rule 1.6.1 now carries out",
    location: "spec 10.1.43",
    sidValue: "s-zn4vrdpnv9bch62",
    kind: "cell",
    cost: { en: row.cost, ru: row.ruCost },
    change: "Изменена строка 10.1.43: суждение о коде говорит о коде системы вне файлов, сгенерированных из спецификации, как предложение по правилу 1.6.1 и согласованный узел о суждении о коде. Почему: эти файлы рецензенту не передают (правило 10.4), поэтому коммит, который меняет только их, получал ревью, которое может только пропустить (пункт 11 изменений группы 2). Столбец «On failure» — как вы согласовали 2026-11-13.",
    proposal: {
      parts: [P(`The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§${GEN}) does what the rules that the commit names say, and nothing they do not`,
        `Код системы (§s-hheus6f395ynqvc), который коммит меняет вне файлов, сгенерированных из спецификации (§${GEN}), делает то, что говорят названные коммитом правила, и ничего сверх этого`,
        "Было: «The code changed in a commit does what the rules it names say, and nothing they do not». Теперь — код системы вне файлов, сгенерированных из спецификации, со ссылками на оба понятия при первом упоминании (правило 7.2.7). «The rules that the commit names»: правила называет коммит, а не код.")],
      refs: [...(cell.refs || []).filter((r) => r.to), { type: "cites", to: "s-hheus6f395ynqvc" }, { type: "cites", to: GEN }],
    },
    proposedDecision: GENERATED_DECISION,
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 10.5: its last example (review C, C1; the coordinator's ruling 3). This settles item 17 of group 2's list.
// ---------------------------------------------------------------------------------------------------------------
{
  const nf = Object.values(newform).find((v) => v.sidValue === "s-94k7b6r5kf65udf");
  if (nf.agreed !== "2026-11-20") throw new Error("rule 10.5 is not as agreed on 2026-11-20");
  const moved = specNode("s-94k7b6r5kf65udf");
  const examples = nf.examples.map((en, j) => ({ en, ru: nf.ruExamples[j] }));
  const last = examples[examples.length - 1];
  if (last.en !== "The answer passes the commit but reports a finding.") throw new Error("rule 10.5: the last example is not as agreed");
  last.en = "The answer passes the commit but reports a finding on code.";
  last.ru = "Ответ пропускает коммит, но называет замечание о коде.";
  last.change = "Было: «The answer passes the commit but reports a finding». Теперь «a finding on code»: ответ, который пропускает коммит с замечанием о комментарии, — читаемый вердикт.";
  entries["proposal:s-94k7b6r5kf65udf"] = {
    question: "None: carries out the principle \"Deterministic checks hold every participant to the contract\", which the owner changed on 2026-11-24, and settles item 17 of group 2's list of changes outside the group",
    location: "spec 10.5",
    sidValue: "s-94k7b6r5kf65udf",
    change: "Изменён только последний пример: было «Ответ пропускает коммит, но называет замечание», теперь «…называет замечание о коде». Почему: по принципу «Deterministic checks hold every participant to the contract», который вы изменили 2026-11-24, замечание рецензента о комментарии только предупреждает, поэтому ответ, который пропускает коммит с таким замечанием, читается (узел «The reviewer's verdict» в предложении группы). Это закрывает и пункт 17 изменений группы 2. Остальная формулировка — как вы согласовали 2026-11-20.",
    proposal: {
      title: nf.title, ruTitle: nf.ruTitle, parts: partsOf(nf.text, nf.ruText), reason: nf.reason, ruReason: nf.ruReason, reasonChange: SAME,
      examples, refs: (moved.refs || []).filter((r) => r.to),
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 10.4 (review C, A1).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-nyh9yk22ba6g77q-g3";
  const e = entries[k];
  const x = parts(k)[at(k, "the wording of each rule that a SpecTag")];
  x.en = swap(x.en, "or that holds, or lies directly below, a comment that the commit adds or changes;", "or that is described by a comment that the commit adds or changes;", k);
  x.ru = swap(x.ru, "либо такому, в котором или непосредственно под которым стоит комментарий, добавленный или изменённый коммитом;", "либо описанному комментарием, который коммит добавляет или меняет;", k);
  x.change = "Было: «…к коду или тесту, добавленному или изменённому коммитом». Добавлены код и тест, которые описывает комментарий, добавленный или изменённый коммитом: по правилу 9.4 такой коммит кода не меняет, а чтобы оценить комментарий, рецензенту нужны правила этого кода (правило 1.6.1). Какой код описывает комментарий, говорит узел «The judgement on a comment that a commit adds or changes».";
  e.change = swap(e.change, "к коду или тесту, в котором или непосредственно под которым стоит комментарий, добавленный или изменённый коммитом.", "к коду или тесту, который описывает комментарий, добавленный или изменённый коммитом.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// "The review of a commit" and "The reviewer's verdict" (the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-vp24dqydygztqbt";
  const x = parts(k)[0];
  x.en = swap(x.en, "In that case, it refuses the commit only where the verdict also lists a finding on code or on a node that the commit approves.", "In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.", k);
  x.ru = swap(x.ru, "В этом случае он отклоняет коммит, только если вердикт перечисляет ещё и замечание о коде или об узле, который одобряется в коммите.", "В этом случае он отклоняет коммит, только если вердикт перечисляет замечание о коде или об узле, который одобряется в коммите.", k);
}
{
  const k = "proposal:new-tools-10-verdict";
  setPart(k, "refuses the commit and lists at least one finding",
    "refuses the commit and lists at least one finding that belongs to a judgement other than the one on comments.",
    "отклоняет коммит и перечисляет хотя бы одно замечание, относящееся к суждению, отличному от суждения о комментариях.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The judgement on a comment that a commit adds or changes" (review C, D1 to D7; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-3-review-comments";
  const e = entries[k];
  const p0 = parts(k)[at(k, "`sheriff review` reports each finding")];
  p0.en = swap(p0.en, "on a comment that the commit adds or changes", "on a comment that a commit adds or changes", k);
  setPart(k, "The reviewer judges the comments in the system's code",
    "The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-a8fn72xa782wvbk). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are the parts of the file that the SpecSheriff tools leave out of the trees as comments. In any other file, the reviewer itself tells the comments apart from the code.",
    "Рецензент оценивает комментарии в коде системы (§s-hheus6f395ynqvc) вне файлов, сгенерированных из спецификации (§s-a8fn72xa782wvbk). В файле, синтаксические деревья которого строят инструменты SpecSheriff (§s-u6mj5yv8ngnz79v), комментарии — это те части файла, которые инструменты SpecSheriff не включают в деревья как комментарии. В любом другом файле рецензент сам отличает комментарии от кода.");
  setPart(k, "A commit adds or changes a comment where the commit adds a line",
    "A commit adds or changes a comment where, with whitespace left out, the comment's text differs from the text of every comment in the same file in the commit's parent (§s-2x58az67bm6cxq2). The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).",
    "Коммит добавляет или меняет комментарий, если без учёта пробельных символов текст комментария отличается от текста каждого комментария того же файла в родителе коммита (§s-2x58az67bm6cxq2). Рецензент оценивает текст комментария, кроме его SpecTag (§s-8xw4mgvpexyvw5q), потому что изменение SpecTag — это изменение кода (§s-9j2mmnuuwmx5ksn).",
    "Новое: когда коммит добавляет или меняет комментарий — по его тексту без пробельных символов, чтобы смена отступа в TypeScript или перенос функции вместе с её комментарием не запускали платный прогон рецензента (ваше решение от 2026-11-24: «отступы в ts — нет»). SpecTag в комментарии оценивают проверки, потому что по правилу 9.4 его изменение — изменение кода.");
  setPart(k, "The reviewer makes the judgement on comments",
    "The reviewer judges comments on every commit that adds or changes a comment, including a commit that changes no code. `sheriff review` gives the reviewer the code that each such comment describes, in addition to what it gives the reviewer in every review (§s-vp24dqydygztqbt). That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:",
    "Комментарии рецензент оценивает при каждом коммите, который добавляет или меняет комментарий, в том числе при коммите, который не меняет кода. `sheriff review` передаёт рецензенту код, который описывает каждый такой комментарий, в дополнение к тому, что передаёт ему при каждом ревью (§s-vp24dqydygztqbt). Этот код — следующее, целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag, которые его привязывают:");
  setPart(k, "for a comment in a file bound as a whole", "for a comment in a file bound as a whole (§s-kgbzk2ph9e6jfb4): that file;", "для комментария в файле, привязанном целиком (§s-kgbzk2ph9e6jfb4), — этот файл;");
  setPart(k, "for a comment in a symbol",
    "for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): the innermost such symbol or test;",
    "для комментария в символе (§s-kgbzk2ph9e6jfb4) или тесте либо непосредственно над символом или тестом (§s-33fw3ga4ctd94dq) — самый внутренний из таких символов или тестов;",
    "Новое: комментарий к символу стоит над ним (узел «How a symbol carries its SpecTags»), поэтому рецензент получает и символ под комментарием. Для комментария во вложенном символе — самый внутренний символ, чтобы было ясно, какой из символов передаётся.");
  setPart(k, "for any other comment",
    "for any other comment: the symbol or the test that follows it, or the whole file where no symbol or test follows it.",
    "для любого другого комментария — символ или тест, который идёт после него, или весь файл, если после него нет ни символа, ни теста.");
  setPart(k, "The reviewer finds a problem with a comment", "The reviewer finds a problem with a comment only where either of the following holds:", "Рецензент находит проблему в комментарии, только если выполнено одно из следующего:");
  e.proposal.reason = swap(e.proposal.reason, "so a problem with one warrants", "so a problem with a comment warrants", k);
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: "s-2x58az67bm6cxq2" }];
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
collect(spec);
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8")));
for (const [k, d] of [...Object.entries(drafts), ...Object.entries(entries)]) if (d && typeof d.sidValue === "string" && !DELETED.includes(k)) targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
targets.delete(drafts["proposal:new-spec-1-6-runs"].sidValue);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const HISTORY = /[Рр]аунд|[Рр]ецензент[аеуы]? (раунда|предложил)|чтец|[Кк]оординатор|EngStickler|review-g3|\bQ1\b|владел/;
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const decided = new Set([...(p.citedInDecisions || []), ...citedIn(JSON.stringify(p.meta?.decisions || []).replace(/(s-[2-9a-hjkmnp-z]{15})/g, "§$1"))]);
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
  if (en.includes(drafts["proposal:new-spec-1-6-runs"].sidValue)) problems.push(`${key}: cites the deleted node`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (e.kind !== "cell" && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  if (e.kind === "cell" && (!e.cost?.en || !e.cost?.ru)) problems.push(`${key}: a row without its cost`);
  const specKey = key.startsWith("proposal:") && /^spec /.test(e.location || "");
  const newExamples = key.startsWith("new:") ? (p.examples || []) : (p.examples || []).filter((x) => x.change);
  const shortExample = (x) => specKey && x.en.split(/\s+/).length < 15;
  if (!newExamples.every((x) => shortExample(x) || (/The most likely mistake is|By contrast,/.test(x.en) && /Самая вероятная ошибка|Напротив,/.test(x.ru)))) problems.push(`${key}: an example without its most likely mistake or its contrast`);
  if (key.startsWith("proposal:") && (!e.question || !e.change)) problems.push(`${key}: a proposal without its question or its Russian change`);
  for (const s of [e.change, p.titleChange, p.reasonChange, ...p.parts.map((x) => x.change), ...(p.examples || []).map((x) => x.change)]) if (s && HISTORY.test(s)) problems.push(`${key}: a change field names a round, a reviewer or Q1: ${s.match(HISTORY)[0]}`);
  if (e.dependsOn) problems.push(`${key}: depends on ${e.dependsOn}`);
  if (/владел|несёт|несут/.test(ru)) problems.push(`${key}: the Russian says «владелец» or «несёт»`);
  const own = JSON.stringify(before[key]?.proposal?.parts) !== JSON.stringify(p.parts) || !before[key];
  const checked = own ? p.parts.filter((x) => x.change !== SAME && !(before[key]?.proposal?.parts || []).some((y) => y.en === x.en)).map((x) => x.en) : [];
  for (const sentence of checked.join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n").replace(/SpecSheriff tools/g, "SST");
  for (const bad of [/\bstands?\b/, /\bthe tools\b(?! of)/, /\bspacing\b/, /provided that/, /But not:/, /\ba pass\b/, /other than in the files/]) if (bad.test(phrase)) problems.push(`${key}: the English holds ${bad}`);
}
const keeps = (key, baseParts, changedStarts) => {
  const base = baseParts.map((x) => x.en);
  const now = entries[key].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${key} differs from its agreed wording beyond the parts it changes: ${gone.map((g) => g.slice(0, 40)).join(" | ")}`);
};
keeps("proposal:s-94k7b6r5kf65udf", partsOf(Object.values(newform).find((v) => v.sidValue === "s-94k7b6r5kf65udf").text, Object.values(newform).find((v) => v.sidValue === "s-94k7b6r5kf65udf").ruText), []);
keeps("proposal:s-nyh9yk22ba6g77q-g3", drafts["proposal:s-nyh9yk22ba6g77q"].proposal.parts, ["the wording of each rule that a SpecTag"]);
keeps("proposal:s-vp24dqydygztqbt", drafts["s-vp24dqydygztqbt"].proposal.parts, ["`sheriff review` refuses a commit where the verdict"]);
keeps("proposal:new-tools-10-verdict", drafts["new:tools-10-verdict"].proposal.parts, ["`sheriff review` reads a verdict only from an answer"]);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const key of DELETED) delete drafts[key];
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries || DELETED.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const header = (key, e) => {
  const p = e.proposal;
  const out = [`## ${key} — ${p.title ?? (e.location.startsWith("spec 10.1.43 ") || e.location === "spec 10.1.43" ? "row 10.1.43 of the main table of checks" : "a new row of the main table of checks")}`, ""];
  if (e.kind === "cell") out.push(`A proposal: ${e.location === "spec 10.1.43" ? "a new wording of row 10.1.43" : `a new row of the main table of checks, placed ${/after row ([\d.a-z]+)/.exec(e.location)?.[0] ?? ""}`}. Its "On failure" cell reads: ${e.cost.en}.`, "");
  else if (key.startsWith("proposal:new-spec-")) out.push(`A proposal: a new node of the base specification, split from rule 1.6.1 (${e.location}).`, "");
  else if (key.startsWith("proposal:")) out.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.`, "");
  return out;
};
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-g.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for agreed nodes, for new nodes of the base specification and for rows of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-g.mjs writes this file; edit the script, not this file.",
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

const changed = [
  "# T25, group 3, round g: the English that round g adds or rewrites",
  "",
  "Each item below differs from what round f left, or belongs to a key that round g adds. Each is in the author's own words, unless the notes of round g say that it is in a reviewer's.",
  "fix-group3-g.mjs writes this file; edit the script, not this file.",
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
  changed.push(`## ${key} — ${p.title ?? "a row of the main table of checks"}`, "");
  for (const it of items) changed.push(`- ${it}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed-g.md", here), changed.join("\n"));
console.log(`wrote ${Object.keys(entries).length} drafts; deleted ${DELETED.join(", ")}`);
if (longSentences.length) console.log(`\nnew sentences over 25 words, to look at:\n${longSentences.join("\n")}`);
