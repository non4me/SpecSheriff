// T25, stage 2, group 2, round b: applies the five reviews (review-g2-a.md to review-g2-e.md), the reports of
// EngStickler's readers (english-g2-{a,b,c}-{fast,thorough}.md) and the coordinator's rulings to the drafts of items
// 20 to 26, which propose-group2.mjs wrote. Each draft of the group is written here in full, in its round-b wording.
// Copies tools-drafts.json to tools-drafts.before-group2-b.json before its first run, and rebuilds the keys of the group
// from that copy on every run, so a second run gives the same file. Checks every draft as propose-group2.mjs does, and
// only then writes. Also records each node's «Оценка» from group2-assessments.json, and writes english-group2.md and
// english-group2-changed.md, which lists each sentence of round b that is not a review's own wording.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group2-b.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = (letter) => `specsheriff-rule-reviewer, 2026-11-24: review-g2-${letter}.md; EngStickler's readers, 2026-11-24: english-g2-a/b/c-fast/thorough.md; fix-group2-b.mjs applied the findings and the coordinator's rulings`;
const Q1 = "Q1 of group2-notes.md: while the specification is a draft, the reviewer makes no judgement on an Implementation-Needs-No-Change statement (recommended A)";
const Q2 = "Q2 of group2-notes.md: code or a test that the commit leaves unchanged, whose SpecTags bind nothing, is handled as rule 9.5 handles code without a SpecTag (recommended B)";

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
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });

// The sids of the new nodes, checked below to be unique across specs/, moved/ and tools-drafts.json.
const SID = {
  reviewCode: "s-rd9nftptjuz6bwv",
  reviewStatement: "s-kgqxg4gunzynwsv",
  reviewAppendix: "s-4bwa4zepd4nwcv8",
  trailer: "s-7gab4ptjt2khfr5",
  reviewerSection: "s-v36s7dm8s3yewtr",
  verdict: "s-68ds99w8wd67aae",
  start: "s-avvnasjhsfkgajh",
  limit: "s-wgedv32rdaqca9k",
  claude: "s-3wh8uhgn9jr2k74",
  codex: "s-u2n5hwwqkb6zk4z",
  settings: "s-tnz9zgqx8c629a7",
  specTagSection: "s-6c4hyyrnprekk32",
  symbol: "s-33fw3ga4ctd94dq",
  fileStart: "s-5qdjyf6t898rsd4",
  bindings: "s-trwczfskj5zmuft",
  noNode: "s-36x8amvunmv2kp5",
  outside: "s-3xx2eukc8gtd2tx",
  ruleTest: "s-8wp7xm7g3u8gscq",
};
const S = SID;

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};
const AS_WAS = "Как было.";

// ---------------------------------------------------------------------------------------------------------------
// Item 20: "The review of a commit" (s-vp24dqydygztqbt), rows 10.1.25a, 10.1.43 and 10.1.43a, split in four:
// what every review does, and one node for each of the reviewer's judgements.
// ---------------------------------------------------------------------------------------------------------------
add("s-vp24dqydygztqbt", {
  location: "tools 7.3.4",
  sidValue: "s-vp24dqydygztqbt",
  review: REVIEW("a"),
  dependsOn: ["proposal:s-m4h279nbaqkpa3t"],
  testsFrom: [
    "asks no review of a commit that changes no code",
    "leaves the files generated from the specification out of the change the reviewer is given",
    "names each file left out to the reviewer",
    "passes where the reviewer passes, and refuses naming the rule and the line of each finding",
  ],
  proposal: {
    title: "The review of a commit",
    ruTitle: "Ревью коммита",
    parts: [
      P("`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§" + S.verdict + ").",
        "`sheriff review` отклоняет коммит, если его отклоняет вердикт независимого рецензента (§s-m4h279nbaqkpa3t). Отказ перечисляет каждое замечание вердикта (§" + S.verdict + ").",
        "Было: «`sheriff review` даёт runner судить каждый коммит, который меняет код системы». Теперь узел начинается с того, что отклоняется и что называет отказ, как согласованные узлы. Что содержит вердикт и каждое его замечание, говорит новый узел «The reviewer's verdict»."),
      P("`sheriff review` asks for a verdict only on a commit for which the reviewer makes at least one of the following judgements (§s-epaw9sgyaajzn8g):",
        "`sheriff review` запрашивает вердикт только для коммита, по которому рецензент выносит хотя бы одно из следующих суждений (§s-epaw9sgyaajzn8g):",
        "Было: ревью только коммита, который меняет код системы. По правилу 10.2 и списку суждений в правиле 1.6.1, которые вы согласовали 2026-11-20, ревью идёт при каждом коммите, для которого этот список называет хотя бы одно суждение. Каждое суждение теперь описывает свой узел: узел разделён по правилу 7.3.3, потому что каждое суждение выносится без других, как строки 10.1.43, 10.1.43a и 10.1.25a."),
      L("the judgement on the code that the commit adds or changes (§" + S.reviewCode + ");",
        "суждение о коде, который коммит добавляет или меняет (§" + S.reviewCode + ");",
        "Пункт списка суждений; см. абзац выше."),
      L("the judgement on each statement in the commit's message that a rule's implementation needs no change (§" + S.reviewStatement + ");",
        "суждение о каждом утверждении в сообщении коммита, что реализацию правила менять не нужно (§" + S.reviewStatement + ");",
        "Новое: второе суждение из списка правила 1.6.1."),
      L("the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves (§" + S.reviewAppendix + ").",
        "суждение о каждом узле технического приложения (§s-tj38pvm38nepaf5), который одобряется в коммите (§" + S.reviewAppendix + ").",
        "Новое: третье суждение из списка правила 1.6.1."),
      P("On such a commit, `sheriff review` gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). It tells the reviewer which of those files the commit changes.",
        "Для такого коммита `sheriff review` передаёт рецензенту всё, что для этого коммита перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q). Файлы, сгенерированные из спецификации, которые `sheriff review` исключает из изменения коммита, — это файлы, которые записывает `sheriff types` (§s-a8fn72xa782wvbk). Он сообщает рецензенту, какие из этих файлов меняет коммит.",
        "Было: список того, что получает runner. Что получает рецензент, теперь перечисляет согласованное правило 10.4, и узел его не повторяет. Остаётся то, что добавляет описание инструментов: какие файлы считаются сгенерированными. Раньше код исключал только файлы типов и RuntimeCheck; теперь исключаются все файлы, которые пишет `sheriff types`, в том числе файлы собственных генераторов проекта (согласованный узел «What `sheriff types` generates»). Каждый изменённый символ целиком и критерии отказа перенесены в узел о суждении о коде."),
    ],
    reason: "Each run of the reviewer is paid for by the user who commits (§" + S.settings + "), so `sheriff review` runs it only on a commit that needs one of its judgements.",
    ruReason: "Каждый запуск рецензента оплачивает тот, кто делает коммит (§" + S.settings + "), поэтому `sheriff review` запускает его только для коммита, по которому нужно суждение.",
    reasonChange: "Было: обоснование о SpecTag и о том, почему символ судится целиком. Оно относится к суждению о коде и перенесено в его узел. Новое обоснование говорит, почему ревью идёт только там, где нужно суждение.",
    examples: [X(
      "A commit changes only the wording of a draft rule. It changes no code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.",
      "Коммит меняет только формулировку правила-черновика. Он не меняет кода, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить.")],
    refs: [R("implements", "s-nyh9yk22ba6g77q"), R("implements", "s-epaw9sgyaajzn8g"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", S.verdict),
      R("cites", S.reviewCode), R("cites", S.reviewStatement), R("cites", "s-tj38pvm38nepaf5"), R("cites", S.reviewAppendix),
      R("cites", "s-a8fn72xa782wvbk"), R("cites", S.settings)],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): each judgement's node implements its row (10.1.43, 10.1.43a, 10.1.25a).",
      "The `implements` link to “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) and the citations of “The symbols a commit changes” (s-2x58az67bm6cxq2) and “What is considered the system's code” (s-hheus6f395ynqvc): they moved with the judgement on the code to s-" + S.reviewCode.slice(2) + ".",
      "The citation of “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): the verdict is described by “The reviewer's verdict” (" + S.verdict + "), in the new section “Who runs the reviewer” (" + S.reviewerSection + ").",
      "`RecordType.fields` and the values of a project's own NodeKind: the wording that the reviewer is given is now defined by s-nyh9yk22ba6g77q, a RecordType's `schema` included as a field its kind adds.",
    ],
    date: DATE,
  },
  stage3: "review.ts:68-73 (changesCode) and review.ts:306 run the review only on a commit that changes code. It is to run on every commit for which one of the judgements is due: also on a commit whose message holds an `Implementation-Needs-No-Change` trailer (" + S.trailer + "), and on one that adds an approval of a node of the technical appendix with an implements link to a rule of the base specification. review.ts:106-108 leaves out only typeFiles(spec).paths; it is to leave out every file that sheriff types writes, those of the project's own generators included, and review.ts:115-118 is to name only those of them that the commit changes. review.ts:319 is to give each finding as " + S.verdict + " describes it. The tests at gates.test.ts:227, :240, :256 and :273 are to carry s-vp24dqydygztqbt. At the move, the decisions of 2026-11-05 on judging a symbol whole go to " + S.reviewCode + ".",
});

add("new:tools-7-3-review-code", {
  from: "s-vp24dqydygztqbt",
  location: "tools 7.3.4a (new, after \"The review of a commit\")",
  sidValue: S.reviewCode,
  review: REVIEW("a"),
  testsFrom: [
    "gives the runner the nodes with their reasons and each changed symbol whole with the tags that bind it",
    "gives the runner only the symbols of the system's code, telling a symbol with no tag from one whose tag names no node",
  ],
  dependsOn: ["proposal:s-nyh9yk22ba6g77q"],
  proposal: {
    title: "The judgement on the code that a commit changes",
    ruTitle: "Суждение о коде, который меняет коммит",
    parts: [
      P("`sheriff review` refuses a commit in which the independent reviewer (§s-m4h279nbaqkpa3t) finds that the changed code does something that none of its rules states, or leaves out something that they require (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.",
        "`sheriff review` отклоняет коммит, если независимый рецензент (§s-m4h279nbaqkpa3t) находит, что изменённый код делает то, чего не говорят его правила, или упускает то, чего они требуют (§s-zn4vrdpnv9bch62). Каждое замечание называет правило, которого оно касается, файл и строку.",
        "Новое: узел вынесен из «The review of a commit» и реализует строку 10.1.43. Отказ называет правило и строку, как требует столбец «On failure» этой строки. Ссылка на правило 1.6.1 при первом упоминании независимого рецензента (рецензент)."),
      P("The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code other than the files generated from the specification. That is each of the following, in full as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:",
        "Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты. Помимо того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт рецензенту изменённый код, кроме файлов, сгенерированных из спецификации. Это каждое из следующего целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag (§s-8xw4mgvpexyvw5q), которые его привязывают:",
        "Было: «каждый символ кода системы вне его тестов, который меняет коммит». По правилу 9.1 тесты входят в код системы, поэтому рецензент судит и изменённые тесты, как говорит todo строки 10.1.43. Слова «вне его тестов» убраны, как вы просили 2026-11-20. Сгенерированные файлы исключены, как в правиле 10.4 и в узле «The review of a commit» (рецензент)."),
      L("each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);",
        "каждый символ (§s-kgbzk2ph9e6jfb4), код которого коммит добавляет или меняет (§s-2x58az67bm6cxq2);",
        AS_WAS),
      L("each file that the commit adds or changes and that is bound as a whole;",
        "каждый файл, привязанный целиком, который коммит добавляет или меняет;",
        "Новое: по правилу 1.5.2 код привязывается и файлом целиком, и изменение в любом месте такого файла — изменение кода, который привязывают его SpecTag."),
      L("each test that the commit adds or changes.",
        "каждый тест, который коммит добавляет или меняет.",
        "Новое: изменённый тест. Формулировку правила, которое называет его SpecTag, рецензенту передаёт правило 10.4 в предложенной формулировке (рецензент)."),
      P("The reviewer refuses the commit where any of the following holds:",
        "Рецензент отклоняет коммит, если выполнено что-либо из следующего:",
        "Было два списка: для коммита и для изменённого символа. Теперь один список, потому что код судится по правилам, которые называют его SpecTag."),
      L("a changed symbol or file whose SpecTags name rules does something that none of those rules states;",
        "изменённый символ или файл, SpecTag которого называют правила, делает то, чего не утверждает ни одно из этих правил;",
        "Было: «изменённый символ делает то, чего не утверждает ни один узел, который называют его SpecTag». Добавлены файлы; символ с `@spec none` этот пункт не задевает (рецензент)."),
      L("a changed test checks something that the rule its SpecTag names does not state;",
        "изменённый тест проверяет то, чего не утверждает правило, которое называет его SpecTag;",
        "Новое: изменённый тест, как говорит todo строки 10.1.43 (рецензент)."),
      L("the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names other than in an `Implementation-Needs-No-Change` trailer (§" + S.trailer + ");",
        "изменённый код помимо тестов упускает то, чего требует правило, которое называет SpecTag на этом коде или которое сообщение коммита называет иначе, чем в trailer `Implementation-Needs-No-Change` (§" + S.trailer + ");",
        "Было: «код упускает то, чего требует названный узел». Правило, названное только в trailer, судит узел о таком утверждении, по вашему решению от 2026-11-19 (рецензент)."),
      L("a changed symbol or file carries a SpecTag naming a rule that it does not implement;",
        "у изменённого символа или файла есть SpecTag, который называет правило, которое этот символ или файл не реализует;",
        "Как было; добавлены файлы."),
      L("a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);",
        "у изменённого символа или файла есть `@spec none` (§s-5z5gnu7pahr82xp), но он реализует логику системы (§s-2jcmb9xe9d64t2t);",
        "Было: «SpecTag, который не называет узла, при том что символ реализует логику системы». SpecTag назван своей формой `@spec none`; что такое логика системы и технический код, определяет правило 1.2.7."),
      L("a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).",
        "у изменённого символа или файла есть `@spec none`, текст которого не говорит, чего от него требует технология, на которой построена система (§s-5z5gnu7pahr82xp).",
        "Новое: требование к тексту после `@spec none` из узла «The form of a SpecTag» проверяет рецензент (рецензент узла 8.1)."),
      P("A finding on code that carries `@spec none` names the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4) as the rule that it concerns.",
        "Замечание о коде, у которого есть `@spec none`, называет правилом, которого оно касается, правило о том, как код привязывается к своим правилам (§s-kgbzk2ph9e6jfb4).",
        "Было: «Замечание последнего вида называет своим узлом правило, что у каждого символа есть SpecTag». Теперь замечание названо прямо, а не «последним видом» из другого абзаца, и предложение охватывает оба вида замечаний о `@spec none`."),
    ],
    reason: "A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be judged only by reading it.",
    ruReason: "SpecTag показывает только, какое правило должен реализовывать код. Делает ли код только то, что говорит это правило, в том числе в неизменённых строках рядом с изменением, можно узнать, только прочитав его.",
    reasonChange: "Из обоснования прежнего узла: проверки видят, что SpecTag называет существующий узел, но не что символ делает сказанное узлом, и поэтому символ судится целиком. Сокращено до одной мысли.",
    examples: [X(
      "A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names says anything about the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email goes unnoticed.",
      "Коммит меняет одну строку функции `close`, SpecTag которой называет правило: счёт можно закрыть, только если его баланс равен нулю. Неизменённая строка той же функции ещё и отправляет владельцу счёта письмо. Рецензент получает функцию целиком и находит, что о письме не говорит ни одно правило, которое называет её SpecTag. `sheriff review` отклоняет коммит, называя правило и эту строку. Самая вероятная ошибка — передать рецензенту только изменённую строку: тогда письмо проходит незамеченным.")],
    refs: [R("implements", "s-zn4vrdpnv9bch62"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-vp24dqydygztqbt"),
      R("cites", "s-8xw4mgvpexyvw5q"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", "s-2x58az67bm6cxq2"), R("cites", S.trailer),
      R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-2jcmb9xe9d64t2t")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:83-90 gives the runner only the changed symbols of files read as code, and gives the changed symbols of the generated type files whole, because binding.ts:62-64 reads those files as code; it is to leave out every file that sheriff types writes. It is to give also each changed file bound as a whole and each changed test, whole, with its file, its lines and its SpecTag; the wording of the rule that a changed test's SpecTag names comes with rule 10.4 as proposed. review.ts:52-65 (SYSTEM_PROMPT) is to name the refusals of this node, the changed test and the text after `@spec none` included, and to call the SpecTag that names no node `@spec none`. The tests at gates.test.ts:384 and :397 are to carry " + S.reviewCode + ", and the test at :397 is to expect the changed tests in the input.",
});

add("new:tools-7-3-review-statement", {
  from: "s-vp24dqydygztqbt",
  location: "tools 7.3.4b (new, after \"The judgement on the code that a commit changes\")",
  sidValue: S.reviewStatement,
  review: REVIEW("a"),
  testsFrom: ["match no test"],
  dependsOn: ["proposal:s-m4h279nbaqkpa3t"],
  proposal: {
    title: "The judgement on a statement that a rule's implementation needs no change",
    ruTitle: "Суждение об утверждении, что реализацию правила менять не нужно",
    parts: [
      P("`sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule.",
        "`sheriff review` отклоняет коммит, в сообщении которого, по суждению независимого рецензента (§s-m4h279nbaqkpa3t), ложно сказано, что реализацию правила менять не нужно (§s-nudrdn5xvcg262k). Каждое замечание называет правило.",
        "Новое: узел реализует строку 10.1.43a; отказ называет правило, как в её столбце «On failure». Ссылка на правило 1.6.1 при первом упоминании независимого рецензента (рецензент). Предложения о том, что пока спецификация — черновик, коммит проходит молча, больше нет: при ответе A на вопрос 1 суждение тогда не выносится."),
      P("A commit's message states that a rule's implementation needs no change by means of a trailer (§" + S.trailer + "). The reviewer makes this judgement for each rule that such a trailer names, only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2).",
        "Сообщение коммита утверждает, что реализацию правила менять не нужно, с помощью trailer (§" + S.trailer + "). Рецензент выносит это суждение для каждого правила, которое называет такой trailer, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2).",
        "Первое предложение — рецензента. Второе написано для ответа A на вопрос 1: пока спецификация — черновик, рецензент такого суждения не выносит, а пункт правила 1.6.1 получает слова «пока спецификация одобрена» (предложение к правилу 1.6.1)."),
      P("For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each in full, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q).",
        "Для каждого такого правила `sheriff review` передаёт рецензенту тесты и код, привязанные к правилу (§s-6fw72j65jkqrfpf), в том виде, в каком их оставляет коммит, каждый целиком, с его файлом, строками и SpecTag (§s-8xw4mgvpexyvw5q).",
        "Новое. Что получает рецензент для такого правила, перечисляет правило 10.4; узел добавляет, что каждый тест и каждый фрагмент кода передаётся целиком, как при суждении о коде. Как к правилу привязаны тесты и код, говорит правило 9.2, и узел этого не повторяет (рецензент)."),
    ],
    reason: "Whether a rule's tests and code fit its wording after the commit can be judged only by reading all of them, including those that the commit leaves as they were.",
    ruReason: "Подходят ли тесты и код правила к его формулировке после коммита, можно узнать, только прочитав их все, в том числе те, которые коммит оставляет как были.",
    reasonChange: "Новое (рецензент): обоснование охватывает и коммит, который меняет только тесты, где новой формулировки нет.",
    examples: [X(
      "The specification is approved, and a commit corrects a misspelt word in the text of an approved rule without changing its tests or code. Its message ends with the trailer `Implementation-Needs-No-Change: s-…`, which names the rule. The reviewer is given the rule's wording before the commit and after it, its tests and its code, and finds that they fit the new wording. The commit passes. The most likely mistake is to give the reviewer only the code that the commit changes, and here there is none, so that the statement is judged against nothing.",
      "Спецификация одобрена, и коммит исправляет опечатку в тексте одобренного правила, не меняя ни его тестов, ни кода. Его сообщение заканчивается trailer `Implementation-Needs-No-Change: s-…`, который называет это правило. Рецензент получает формулировку правила до коммита и после него, его тесты и код и находит, что они подходят к новой формулировке. Коммит проходит. Самая вероятная ошибка — передать рецензенту только код, который меняет коммит, а здесь его нет: тогда утверждение не с чем сверить.")],
    refs: [R("implements", "s-nudrdn5xvcg262k"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-qzthyh7yqvfhsa2"), R("cites", S.trailer),
      R("cites", "s-6fw72j65jkqrfpf"), R("cites", "s-8xw4mgvpexyvw5q")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts makes no judgement on such a statement. reviewInput is to give, for each rule that an `Implementation-Needs-No-Change` trailer names, the rule's wording before and after the commit and every test and piece of code bound to the rule, directly or through implements links, whole as the commit leaves them, and only where the commit leaves the specification approved (answer A to Q1). SYSTEM_PROMPT is to ask for the judgement. Its tests are written first.",
});

add("new:tools-7-3-review-appendix", {
  from: "s-vp24dqydygztqbt",
  location: "tools 7.3.4c (new, after \"The judgement on a statement that a rule's implementation needs no change\")",
  sidValue: S.reviewAppendix,
  review: REVIEW("a"),
  testsFrom: ["match no test"],
  proposal: {
    title: "The judgement on a node of the technical appendix that a commit approves",
    ruTitle: "Суждение об узле технического приложения, который одобряет коммит",
    titleChange: "Было: «The judgement on an approved node of the technical appendix». Читатель EngStickler понял «одобренный узел» как любой уже одобренный узел; узел говорит об узле, который одобряет коммит.",
    parts: [
      P("`sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the independent reviewer (§s-m4h279nbaqkpa3t) finds that any of the following is true of that node (§s-4p9amamvp2bry7b):",
        "`sheriff review` отклоняет коммит, который одобряет узел технического приложения (§s-tj38pvm38nepaf5), если независимый рецензент (§s-m4h279nbaqkpa3t) находит, что об этом узле верно что-либо из следующего (§s-4p9amamvp2bry7b):",
        "Новое: узел реализует строку 10.1.25a. Ссылка на правило 1.6.1 при первом упоминании независимого рецензента (рецензент)."),
      L("the node contradicts a rule of the base specification (§s-5x737t9nee4zgaa);",
        "он противоречит правилу базовой спецификации (§s-5x737t9nee4zgaa);",
        "Новое, как в строке 10.1.25a."),
      L("the node implements a rule of the base specification without refining that rule.",
        "он реализует правило базовой спецификации, не уточняя это правило.",
        "Новое, как в строке 10.1.25a."),
      P("Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses such a commit whatever the specification's approval status (§s-qzthyh7yqvfhsa2).",
        "Каждое замечание называет узел и правило базовой спецификации, которого оно касается. `sheriff review` отклоняет такой коммит, каков бы ни был статус одобрения спецификации (§s-qzthyh7yqvfhsa2).",
        "Новое. Отказ называет узел и правило, как требует столбец «On failure». Отказ при любом статусе — по вашему решению по строке 10.1.25a от 2026-11-20: узел, противоречащий базовой спецификации, — дефект и в черновике."),
      P("The reviewer judges each node of the technical appendix for which all of the following hold:",
        "Рецензент судит каждый узел технического приложения, для которого выполнено всё следующее:",
        "Новое (формулировка рецензента)."),
      L("the commit adds to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) an entry that approves the node, whoever made the approval;",
        "коммит добавляет в `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) запись, которая одобряет узел, кто бы ни сделал это одобрение;",
        "Новое. «Кто бы ни сделал одобрение» — по вашему решению по правилу 1.3.6 от 2026-11-19: рецензент судит каждый такой узел, одобрение которого есть в коммите, кто бы его ни одобрил."),
      L("the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.",
        "у узла есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации.",
        "Новое, как в строке 10.1.25a."),
      P("A top-level section of the base specification, in the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), is a section whose location (§s-kag2m9tzdnduxdx) is the name of a part, a slash and a single number, such as `base/3` or `requests/2`. For a rule that is in no section (§s-qmmzf9nksfsa3qp), the top-level section is the whole part of the base specification that the rule is in.",
        "Раздел верхнего уровня базовой спецификации в правиле о том, что получает рецензент (§s-nyh9yk22ba6g77q), — это раздел, расположение (§s-kag2m9tzdnduxdx) которого — имя части, косая черта и одно число, например `base/3` или `requests/2`. Для правила, которое не входит ни в один раздел (§s-qmmzf9nksfsa3qp), разделом верхнего уровня считается вся часть базовой спецификации, в которой это правило находится.",
        "Новое. Правило 10.4 не говорит, какой раздел считается разделом верхнего уровня. Узел определяет его по расположению, как его вычисляет узел «How a node's location is computed», согласованный 2026-11-24; что передаётся рецензенту, узел не повторяет (рецензент). Второе предложение — для базовой спецификации, не разделённой на разделы (правило 1.1.2): вся часть, по вашему решению от 2026-11-20 по правилу 10.4, которое отклонило передачу рецензенту только реализуемых и связанных с ними правил."),
    ],
    reason: "An approval names whoever made it only by the email address that git was configured with (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own approval. So the reviewer judges every node that this judgement covers, whoever approved it.",
    ruReason: "Одобрение указывает, кто его сделал, только через email, с которым был настроен git (§s-v4qus7raqnwzneb). Поэтому одобрение, которое агент делает от имени ответственного (§s-t5uw8zfxzhfdg86), выглядит так же, как одобрение самого ответственного. Поэтому рецензент судит каждый узел, который охватывает это суждение, кто бы его ни одобрил.",
    reasonChange: "Новое. Первое предложение — рецензента: запись одобрения содержит и sid, и отпечаток формулировки, а только через email она называет того, кто одобрил.",
    examples: [X(
      "An agent that is implementing an approved rule saying that an idle session expires adds a node of the technical appendix that sets the idle limit to 30 minutes. The node has an `implements` link to that rule, and the agent approves it on the owner's behalf. Another rule of the same top-level section keeps a session open while a file is being uploaded, which the node's limit breaks during a long upload. `sheriff review` refuses the commit, naming the node and that rule. The most likely mistake is to give the reviewer only the rule that the node implements, so that the contradiction with the rule on uploads goes unnoticed.",
      "Агент, который реализует одобренное правило о том, что неактивная сессия истекает, добавляет узел технического приложения, который задаёт предел неактивности в 30 минут. У узла есть связь `implements` с этим правилом, и агент одобряет его от имени ответственного. Другое правило того же раздела верхнего уровня оставляет сессию открытой, пока загружается файл, а предел из узла нарушает это во время долгой загрузки. `sheriff review` отклоняет коммит, называя узел и это правило. Самая вероятная ошибка — передать рецензенту только правило, которое реализует узел: тогда противоречие с правилом о загрузке проходит незамеченным.")],
    refs: [R("implements", "s-4p9amamvp2bry7b"), R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-5x737t9nee4zgaa"),
      R("cites", "s-qzthyh7yqvfhsa2"), R("cites", "s-v4qus7raqnwzneb"), R("cites", "s-sn6au3vcr9uy5pm"), R("cites", "s-nyh9yk22ba6g77q"),
      R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-qmmzf9nksfsa3qp"), R("cites", "s-t5uw8zfxzhfdg86")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts makes no judgement on such a node. reviewInput is to find, among the approvals that the commit adds (addedApprovals in approvals.ts), each node of the technical appendix with an implements link to a rule of the base specification, and to give its wording and the rules that s-nyh9yk22ba6g77q lists for it; the top-level section is taken from the location, and a rule in no section takes its whole part. SYSTEM_PROMPT is to ask for the judgement. Its tests are written first. At the move, the ruling of 2026-11-20 on rule 10.4, which counts the whole part for a rule in no section, is recorded in this node's meta.decisions.",
});

// The statement that a rule's implementation needs no change, which rows 10.1.40 and 10.1.43a let a message make.
add("new:tools-9-no-change-trailer", {
  location: "tools 9 (new, after the new section \"SpecTags in the code and the tests\")",
  sidValue: S.trailer,
  review: REVIEW("a"),
  testsFrom: ["match no test"],
  proposal: {
    title: "How a commit message states that a rule's implementation needs no change",
    ruTitle: "Как сообщение коммита утверждает, что реализацию правила менять не нужно",
    parts: [
      P("A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) with the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule. The message contains one such trailer for each rule about which it makes that statement.",
        "Сообщение коммита утверждает, что реализацию правила менять не нужно (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k), с помощью trailer `Implementation-Needs-No-Change: <sid>`, где `<sid>` — sid этого правила. Для каждого такого правила сообщение содержит по одному такому trailer.",
        "Новое. По вашему решению от 2026-11-19 утверждение хранится в одном месте — в trailer сообщения коммита, и при изменённой формулировке, и при изменённых тестах; имя trailer и его значения — техническое решение агента при изменении описания инструментов. Имя повторяет слова строк 10.1.40 и 10.1.43a: «реализацию правила менять не нужно»."),
      P("The SpecSheriff tools read the trailers of a message as `git interpret-trailers --parse` reads them. They read a trailer as such a statement only where its key is spelt exactly `Implementation-Needs-No-Change` and its value is a single sid.",
        "Инструменты SpecSheriff читают trailer сообщения так, как их читает `git interpret-trailers --parse`. Trailer они читают как такое утверждение, только если его ключ написан в точности как `Implementation-Needs-No-Change`, а его значение — один sid.",
        "Новое: так инструменты SpecSheriff читают trailer так же, как git. Ключ сравнивается в точности, с учётом регистра: документация git этого не определяет (рецензент)."),
    ],
    reason: "A trailer is the form that git itself provides for a statement about a commit, so git and other tools read it without parsing the message's prose.",
    ruReason: "Trailer — это форма, которую сам git даёт утверждению о коммите, поэтому git и другие инструменты читают его, не разбирая текст сообщения.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit changes the text of an approved rule only to correct a misspelt word. Its message ends with the line `Implementation-Needs-No-Change: s-…`, which names the rule. The most likely mistake is to write the statement in the message's prose, such as “the code needs no change for s-…”, which the SpecSheriff tools do not read as such a statement.",
      "Коммит меняет текст одобренного правила только для того, чтобы исправить опечатку. Его сообщение заканчивается строкой `Implementation-Needs-No-Change: s-…`, которая называет это правило. Самая вероятная ошибка — написать утверждение в тексте сообщения, например «для s-… код менять не нужно»: инструменты SpecSheriff не читают такой текст как утверждение.")],
    refs: [R("implements", "s-ddd2e96uke4y83j"), R("implements", "s-nudrdn5xvcg262k")],
    removed: [],
    date: DATE,
  },
  stage3: "No code reads such a trailer. message.ts is to read the trailers of a message as git interpret-trailers --parse does, and to compare the key exactly; the judgement on such a statement (" + S.reviewStatement + ") and the check of tests and code that lag behind a rule (s-txbwsthdqhvyzd2, item 37) are to read this one. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 21: "Who runs the reviewer" (s-xr5xxa9cxf2mq5u), split into a section and seven nodes, as "The commands" was.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-10-section", {
  location: "tools 10 (new section, in place of the node \"Who runs the reviewer\")",
  kind: "section",
  sidValue: S.reviewerSection,
  review: REVIEW("b"),
  order: ["s-xr5xxa9cxf2mq5u", S.verdict, S.start, S.limit, S.claude, S.codex, S.settings],
  proposal: {
    title: "Who runs the reviewer",
    ruTitle: "Кто запускает рецензента",
    parts: [
      P("How `sheriff review` runs the independent reviewer (§s-m4h279nbaqkpa3t), and how it reads the reviewer's verdict.",
        "Как `sheriff review` запускает независимого рецензента (§s-m4h279nbaqkpa3t) и как читает его вердикт.",
        "Новое: раздел на месте узла «Who runs the reviewer», который разделён по правилу 7.3.3, как прежде узел «The commands». Название — прежнее название узла."),
    ],
    refs: [R("cites", "s-m4h279nbaqkpa3t")],
    removed: [],
    date: DATE,
  },
});

add("s-xr5xxa9cxf2mq5u", {
  location: "tools 10.1",
  sidValue: "s-xr5xxa9cxf2mq5u",
  review: REVIEW("b"),
  testsFrom: [
    "the build writes beside each plugin's release the agent whose runner its tools take",
    "takes the runner of the plugin whose tools run unless the settings name one",
  ],
  proposal: {
    title: "Which runner runs the reviewer",
    ruTitle: "Какой runner запускает рецензента",
    titleChange: "Было: «Who runs the reviewer». Узел разделён по правилу 7.3.3, и прежнее название теперь носит новый раздел. Этот узел говорит только о том, какой runner запускается.",
    parts: [
      P("`sheriff review` hands everything that the independent reviewer is given (§s-nyh9yk22ba6g77q) to a runner. A runner is an agent's CLI that `sheriff review` starts for each review (§" + S.start + "). The runner is `claude` (§" + S.claude + ") or `codex` (§" + S.codex + ").",
        "`sheriff review` передаёт runner всё, что получает независимый рецензент (§s-nyh9yk22ba6g77q). Runner — это CLI агента, который `sheriff review` запускает для каждого ревью (§" + S.start + "). Runner — `claude` (§" + S.claude + ") или `codex` (§" + S.codex + ").",
        "Было: «`sheriff review` передаёт входные данные рецензента runner». Что такое входные данные рецензента, теперь сказано ссылкой на правило 10.4; как устроен каждый runner, говорят отдельные узлы раздела (рецензент)."),
      P("`sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). The default of `review.runner` is the runner of the SpecSheriff plugin whose tools run `sheriff review`. The build of each SpecSheriff plugin writes the file `agent` into the folder of the plugin's SpecSheriff tools. That file names the plugin's runner:",
        "`sheriff review` запускает тот runner, который называет `review.runner` в `sheriff.config.json` (§s-zefk589ykh37b8u). По умолчанию `review.runner` — это runner того плагина SpecSheriff, чьи инструменты запускают `sheriff review`. Сборка каждого плагина SpecSheriff записывает файл `agent` в папку инструментов SpecSheriff этого плагина. Этот файл называет runner плагина:",
        "Как было; значение по умолчанию названо прямо, а файл `agent` — без слова `release`, которое читалось как ветка (рецензент)."),
      L("`claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);",
        "`claude` — для плагина для Claude Code (§s-zh2vcr3xjumppg5);",
        AS_WAS),
      L("`codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).",
        "`codex` — для плагина для Codex CLI (§s-2pdy9gw2jrjvfb4).",
        AS_WAS),
      P("SpecSheriff tools that have no such file use `claude`.",
        "Инструменты SpecSheriff, у которых нет такого файла, берут `claude`.",
        "Как было; «Tools» заменено на «SpecSheriff tools»."),
      P("The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`. `review.minutes` sets the time limit of a run of the reviewer (§" + S.limit + ").",
        "Общие для всего проекта настройки рецензента в `sheriff.config.json` — это `review.runner` и `review.minutes`. `review.minutes` задаёт предел времени прогона рецензента (§" + S.limit + ").",
        "Как было. Что `sheriff review` берёт модель и effort только из настроек на машине пользователя, теперь говорит узел о настройках каждого runner, а предел времени — свой узел."),
    ],
    reason: "A user with one agent has no other agent to run, so the default runner is that of the plugin that the user has installed. A project that wants one runner for everyone names it in `review.runner`.",
    ruReason: "У пользователя с одним агентом нет другого агента для запуска, поэтому runner по умолчанию — это runner плагина, который есть у пользователя. Проект, которому нужен один runner для всех, называет его в `review.runner`.",
    reasonChange: "Из прежнего обоснования здесь оставлен только абзац о выборе runner. Остальные абзацы перенесены в узлы, к которым они относятся, и сокращены там. «Один рецензент для всех» заменено на «один runner для всех»: `review.runner` называет runner (рецензент).",
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", "s-nyh9yk22ba6g77q"), R("cites", S.start), R("cites", S.claude), R("cites", S.codex),
      R("cites", "s-zefk589ykh37b8u"), R("cites", "s-zh2vcr3xjumppg5"), R("cites", "s-2pdy9gw2jrjvfb4"), R("cites", S.limit)],
    removed: [
      "The `implements` link to “What the reviewer is given” (s-nyh9yk22ba6g77q): “How a runner is started” (" + S.start + ") now implements it, since that node keeps the session that made the change from the runner. This node still cites the rule.",
      "The citation of “What the reviewer is given” (s-nyh9yk22ba6g77q) for an answer that cannot be read: “The reviewer's verdict” (" + S.verdict + ") implements “A commit whose review cannot be carried out is refused” (s-94k7b6r5kf65udf), which now states it.",
      "The citations of “The hooks” (s-477gtdrkw34dzxw) and of the plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4) for when a setting is asked for: they moved with the settings to “The settings of each runner” (" + S.settings + ").",
      "The list of the variables of a runner's environment: it moved to “How a runner is started” (" + S.start + ").",
    ],
    date: DATE,
  },
  stage3: "No change to the code. The tests at codex.test.ts:73 and config.test.ts:45 keep s-xr5xxa9cxf2mq5u; the part of config.test.ts:27 on review.minutes is to carry " + S.limit + ". The owner's todo of 2026-10-27 (other runners) stays on this node; the agent's todo of 2026-11-06 (the tree of processes) moves to " + S.limit + " at the move. The node's decisions go at the move to the nodes they concern: 2026-10-27, 2026-10-31 and 2026-11-02 (the runner codex) stay here; 2026-11-02 (the user's consent to what a run costs) goes to " + S.settings + "; 2026-11-05 goes to " + S.start + " and " + S.verdict + ".",
});

add("new:tools-10-verdict", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.2 (new)",
  sidValue: S.verdict,
  review: REVIEW("b"),
  testsFrom: [
    "refuses a review that cannot be held, and says why",
    "holds the Claude Code CLI's answer to the schema of the verdict",
    "reads an answer that passes with a finding, or refuses with none, as one that cannot be read",
  ],
  proposal: {
    title: "The reviewer's verdict",
    ruTitle: "Вердикт рецензента",
    parts: [
      P("`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).",
        "`sheriff review` отклоняет коммит, по которому запрашивает вердикт (§s-vp24dqydygztqbt), если только runner (§s-xr5xxa9cxf2mq5u) не даёт вердикт, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf).",
        "Было: «`sheriff review` читает как ответ, который нельзя прочитать (§10.4): …». Отказ коммита без читаемого ответа теперь требует правило 10.5, и узел ссылается на него, а не на 10.4. Отказ касается только коммита, по которому вердикт запрашивается. Что отказ говорит причину, уже говорит правило 10.5, и узел этого не повторяет (рецензент)."),
      P("The runner's CLI is given the schema of the verdict. It answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit and lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line.",
        "CLI runner получает схему вердикта. Он отвечает JSON-объектом, который соответствует этой схеме. Вердикт пропускает или отклоняет коммит и перечисляет свои замечания. Каждое замечание называет sid узлов, которых оно касается, и проблему. Замечание, которое касается кода, называет также файл, а если проблема находится в определённой строке — эту строку.",
        "Было: «каждое замечание с его узлом, файлом, строкой и проблемой». Замечание о ложном утверждении не касается строки кода, а замечание об узле технического приложения называет и узел, и правило базовой спецификации. Поэтому замечание называет sid каждого узла, которого оно касается; файл — если оно касается кода, а строку — если проблема в определённой строке (рецензент)."),
      P("`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.",
        "`sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта и либо пропускает коммит без замечаний, либо отклоняет его хотя бы с одним замечанием.",
        "Было: «`sheriff review` читает как ответ, который нельзя прочитать: ответ, который пропускает коммит с замечанием; ответ, который отклоняет коммит без замечаний». Теперь сказано, какой ответ читается, а не какой нет, как в вашем решении по правилу 10.5 от 2026-11-14 (рецензент)."),
    ],
    reason: "A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the commit in place of the reviewer.",
    ruReason: "Если бы `sheriff review` приходилось угадывать смысл вердикта, например пропуска с замечанием, о коммите решал бы `sheriff review`, а не рецензент.",
    reasonChange: "Новое (рецензент): обоснование называет проблему, которую решает правило, — `sheriff review` решал бы вместо рецензента.",
    examples: [X(
      "The runner answers with a verdict that passes the commit and lists one finding. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.",
      "Runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание. Этот ответ — не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так инструмент решает за рецензента, что тот имел в виду.")],
    refs: [R("implements", "s-94k7b6r5kf65udf"), R("cites", "s-vp24dqydygztqbt"), R("cites", "s-xr5xxa9cxf2mq5u")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:208-224 (VERDICT_SCHEMA) is to give each finding `nodes`, a list of sids, and `problem`, with `file` and `line` null where the finding concerns no code or no line; Codex's --output-schema requires every property, so each is required and may be null. readVerdict (review.ts:286-302) and the refusal (review.ts:319) follow it. The tests at gates.test.ts:264, :357 and :362 are to carry " + S.verdict + ".",
});

add("new:tools-10-start", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.3 (new)",
  sidValue: S.start,
  review: REVIEW("b"),
  testsFrom: [
    "hands a runner only the variables of the environment it needs, none an agent or git sets",
    "starts the program an npm command script starts, with the arguments it gives",
  ],
  proposal: {
    title: "How a runner is started",
    ruTitle: "Как запускается runner",
    parts: [
      P("`sheriff review` starts a runner (§s-xr5xxa9cxf2mq5u) separately from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:",
        "`sheriff review` запускает runner (§s-xr5xxa9cxf2mq5u) отдельно от сессии, в которой сделано изменение, чтобы runner ничего не получил из этой сессии (§s-nyh9yk22ba6g77q). Он запускает runner:",
        "Было: «Runner запускается:». Новое — цель, которую требует правило 10.4: рецензент ничего не получает из сессии. Ссылка на узел о runner при первом упоминании (рецензент)."),
      L("with none of the user's settings, memory or hooks;", "без настроек, памяти и хуков пользователя;", AS_WAS),
      L("with a system prompt of its own;", "со своим системным промптом;", AS_WAS),
      L("in an empty working directory;", "в пустом рабочем каталоге;", AS_WAS),
      L("with every tool turned off that its command-line options can turn off;", "с выключенным каждым инструментом, который можно выключить из его командной строки;", "Как было; английский текст поправлен, смысл тот же."),
      L("as a program, never through a shell.", "как программу, никогда — через shell.", AS_WAS),
      P("A CLI that npm installs on Windows as a command script is started as the program that the script starts, with the arguments that the script gives it.",
        "CLI, который npm устанавливает в Windows как командный скрипт, запускается как программа, которую запускает этот скрипт, с аргументами, которые скрипт ей передаёт.",
        "Как было; уточнено, что программа запускается с аргументами, которые даёт скрипт."),
      P("The runner's environment holds only the variables that the list of this node allows and, for the runner `codex`, the variable that names its own Codex home (§" + S.codex + "). The variables of the list hold:",
        "Окружение runner содержит только переменные, которые допускает список этого узла, и, для runner `codex`, переменную, которая задаёт его собственный домашний каталог Codex (§" + S.codex + "). Переменные списка задают:",
        "Как было; переменные названы через список этого узла. Новое: переменная `CODEX_HOME` для runner `codex`, которую задаёт `sheriff review` (review.ts:269), как требует узел о runner `codex` (рецензент)."),
      L("the search path for programs, the folders of the operating system and of the user, and the user's name;",
        "путь поиска программ, папки операционной системы и пользователя и имя пользователя;", AS_WAS),
      L("the locale;", "локаль;", AS_WAS),
      L("a proxy, the hosts to reach without it, and the certificates to trust;", "прокси, хосты, к которым обращаются в обход него, и сертификаты, которым следует доверять;", "Как было; «хосты, которые он пропускает» читалось как хосты, которые прокси пропускает через себя (рецензент)."),
      L("where the runner's CLI keeps its credentials, the credentials themselves, and the provider serving the model.",
        "где CLI runner хранит данные входа, сами данные входа и провайдера, который обслуживает модель.", AS_WAS),
    ],
    list: {
      of: "the variables that a runner's environment may hold, each matched regardless of case, where a name that ends in `*` matches every name that begins with what comes before the `*`",
      ruOf: "переменные, которые может содержать окружение runner; каждая сравнивается без учёта регистра, а имя, которое оканчивается на `*`, совпадает с каждым именем, которое начинается с того, что стоит перед `*`",
      membersFrom: "s-xr5xxa9cxf2mq5u",
      valueList: { file: "skills/tools/src/review.ts", symbol: "ALLOWED" },
      change: "Список перенесён из прежнего узла, его члены — как были. Было: `declaredIn`. По todo строки 10.1.35 список ссылается на объявление в коде через `TextRule.list.valueList`. «standing for» заменено на «matches».",
    },
    reason: "Anything that reaches the runner from the session that made the change, such as the user's memory or the repository through git's variables, lets it judge by more than the rules (§s-nyh9yk22ba6g77q). A shell between `sheriff review` and the runner would read the runner's arguments, such as the schema of the verdict, by its own syntax and could change them.",
    ruReason: "Всё, что доходит до runner из сессии, в которой сделано изменение, например память пользователя или репозиторий через переменные git, позволяет ему судить не только по правилам (§s-nyh9yk22ba6g77q). Shell между `sheriff review` и runner читал бы аргументы runner, например схему вердикта, по своему синтаксису и мог бы их изменить.",
    reasonChange: "Новое (рецензент): обоснование не предписывает, а объясняет, и говорит, почему runner запускается не через shell.",
    examples: [X(
      "Claude Code sets `CLAUDECODE` for its session, and git sets `GIT_DIR` to the repository for each hook it runs. Neither variable is in the list, so neither reaches the runner. The runner therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to remove only the variables on a list of known ones, which misses each variable that a new release of an agent adds.",
      "Claude Code задаёт для своей сессии `CLAUDECODE`, а git задаёт `GIT_DIR` на репозиторий для каждого хука, который запускает. Ни одной из этих переменных нет в списке, поэтому ни одна не доходит до runner. Значит, runner не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — убирать только переменные из списка известных: так пропускается каждая переменная, которую добавляет новый выпуск агента.")],
    refs: [R("implements", "s-nyh9yk22ba6g77q"), R("cites", "s-xr5xxa9cxf2mq5u"), R("cites", S.codex)],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code beyond the list's valueList (row 10.1.35's todo). The tests at gates.test.ts:371 and :377 are to carry " + S.start + ".",
});

add("new:tools-10-limit", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.4 (new)",
  sidValue: S.limit,
  review: REVIEW("b"),
  testsFrom: ["reads the reviewer's runner and time limit from the project's settings, twenty minutes unless set"],
  proposal: {
    title: "The time limit of a run",
    ruTitle: "Предел времени прогона",
    parts: [
      P("`sheriff review` ends a run of the independent reviewer (§s-m4h279nbaqkpa3t) that is still running after the number of minutes that `review.minutes` in `sheriff.config.json` specifies (§s-zefk589ykh37b8u). The default of `review.minutes` is twenty. `sheriff review` ends the run together with every process that the runner (§s-xr5xxa9cxf2mq5u) has started, directly or through another process.",
        "`sheriff review` завершает прогон независимого рецензента (§s-m4h279nbaqkpa3t), который ещё идёт по истечении числа минут, которое задаёт `review.minutes` в `sheriff.config.json` (§s-zefk589ykh37b8u). По умолчанию `review.minutes` равен двадцати. `sheriff review` завершает прогон вместе с каждым процессом, который runner (§s-xr5xxa9cxf2mq5u) запустил сам или через другой процесс.",
        "Было: «`review.minutes` — время, после которого прогон завершается. Если не задано, оно равно двадцати минутам». Новое: прогон завершается вместе с каждым процессом, который runner запустил сам или через другой процесс. Так закрывается todo от 2026-11-06: в Windows предел завершал Node и оставлял работать запущенный им Codex, который продолжал тратить деньги. Значение по умолчанию названо прямо (рецензент)."),
    ],
    reason: "A run of the reviewer that hangs, together with the processes it has started, keeps running at the expense of the user who commits until it is ended. The default time limit is long, so that it ends a run that hangs rather than one that reads a large change.",
    ruReason: "Зависший прогон рецензента вместе с запущенными им процессами продолжает стоить денег тому, кто делает коммит, пока его не завершат. Предел времени по умолчанию длинный, чтобы он завершал зависший прогон, а не прогон, который читает большое изменение.",
    reasonChange: "Новое (рецензент): обоснование говорит, зачем у прогона вообще есть предел времени, и почему он длинный.",
    refs: [R("implements", "s-94k7b6r5kf65udf"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-xr5xxa9cxf2mq5u")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:179-191 (runCli) ends only the process that spawnSync started. On Windows an npm-installed Codex CLI starts the native Codex as a child, which outlives the limit (the agent's todo of 2026-11-06 on s-xr5xxa9cxf2mq5u). runCli is to end the whole tree of processes that the runner started; its test is written first and seen failing, and the todo is removed once the test passes.",
});

add("new:tools-10-claude", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.5 (new)",
  sidValue: S.claude,
  review: REVIEW("c"),
  testsFrom: ["starts the Claude Code CLI in print mode with no tools, settings, memory or session"],
  proposal: {
    title: "The runner `claude`",
    ruTitle: "Runner `claude`",
    parts: [
      P("The runner `claude` (§s-xr5xxa9cxf2mq5u) is the Claude Code CLI in print mode. It runs with its session not kept. It requests the model and the reasoning effort that the settings of the runner specify (§" + S.settings + "). Where that model is overloaded or unavailable, it falls back to the fallback model that those settings specify.",
        "Runner `claude` (§s-xr5xxa9cxf2mq5u) — это Claude Code CLI в режиме print. Он работает без сохранения сессии. Он запрашивает модель и effort, которые задают настройки этого runner (§" + S.settings + "). Если эта модель перегружена или недоступна, он переходит на резервную модель, которую задают эти настройки.",
        "Как было; настройки теперь описывает свой узел. Новое: «Он работает без сохранения сессии» — код это уже делает (review.ts:132), и о runner `codex` вы согласовали то же предложение. Ссылка на узел о runner (рецензент)."),
    ],
    reason: "In print mode, the CLI answers once and exits, with no session that could carry an earlier conversation into the review (§s-m4h279nbaqkpa3t).",
    ruReason: "В режиме print CLI отвечает один раз и завершается, и вокруг него нет сессии, которая могла бы перенести в ревью прежний разговор (§s-m4h279nbaqkpa3t).",
    reasonChange: "Из прежнего обоснования: режим print и `codex exec` отвечают один раз и завершаются, без сессии вокруг. Теперь сказано, что именно сессия могла бы перенести (рецензент).",
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", "s-xr5xxa9cxf2mq5u"), R("cites", S.settings)],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code. The test at gates.test.ts:281 is to carry " + S.claude + ".",
});

add("new:tools-10-codex", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.6 (new)",
  sidValue: S.codex,
  review: REVIEW("c"),
  testsFrom: [
    "starts the Codex CLI in codex exec, read-only and unkept, with no skill",
    "runs the Codex CLI in an empty directory with a Codex home of its own",
  ],
  proposal: {
    title: "The runner `codex`",
    ruTitle: "Runner `codex`",
    parts: [
      P("The runner `codex` (§s-xr5xxa9cxf2mq5u) is the Codex CLI run as `codex exec`, with a Codex home of its own. That home is created in a temporary directory for the run and deleted after it. It holds only a copy of the user's credentials.",
        "Runner `codex` (§s-xr5xxa9cxf2mq5u) — это Codex CLI, запущенный как `codex exec`, со своим домашним каталогом Codex. Этот каталог создаётся во временной папке на время прогона и удаляется после него. В нём есть только копия данных входа пользователя.",
        "Как было; ссылка на узел о runner (рецензент). Согласованное «В нём есть копия данных входа пользователя, и больше ничего» сказано без отрицания: «только копия» (рецензент)."),
      P("The runner `codex` runs with:", "Runner `codex` работает:", AS_WAS),
      L("its sandbox read-only;", "с песочницей только для чтения;", AS_WAS),
      L("its session not kept;", "без сохранения сессии;", AS_WAS),
      L("no skill offered.", "без предложенных skill.", AS_WAS),
      P("It requests the model and the reasoning effort that the settings of the runner specify (§" + S.settings + "). Where `specsheriff.review.codexModel` is empty, it requests no model.",
        "Он запрашивает модель и effort, которые задают настройки этого runner (§" + S.settings + "). Если `specsheriff.review.codexModel` пуст, он не запрашивает модели.",
        "Как было; настройки теперь описывает свой узел. «Если модель пуста» — теперь названа сама настройка."),
    ],
    reason: "Codex offers no run without its own home and tools, so the runner restricts both: the home holds only the credentials, and the sandbox lets no tool write anything.",
    ruReason: "Codex не предлагает прогона без своего домашнего каталога и инструментов, поэтому runner ограничивает и то и другое: в домашнем каталоге есть только данные входа, а песочница не даёт ничего записать.",
    reasonChange: "Из прежнего обоснования: Codex не предлагает прогона без инструментов, поэтому runner выключает каждый инструмент, до которого достаёт настройка, а его песочница не даёт ничего записать.",
    examples: [X(
      "`sheriff review` makes a temporary directory, copies the user's `auth.json` into it, and starts `codex exec` with `CODEX_HOME` set to that directory, so the user's own configuration and skills stay out of the run. The most likely mistake is to leave `CODEX_HOME` at the user's own Codex home, which brings that configuration and those skills into the review.",
      "`sheriff review` создаёт временный каталог, копирует в него `auth.json` пользователя и запускает `codex exec` с `CODEX_HOME`, указывающим на этот каталог, поэтому собственная конфигурация и skill пользователя в прогон не попадают. Самая вероятная ошибка — оставить `CODEX_HOME` на собственном домашнем каталоге Codex пользователя: тогда эта конфигурация и эти skill попадают в ревью.")],
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", "s-xr5xxa9cxf2mq5u"), R("cites", S.settings)],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code. The tests at gates.test.ts:293 and :317 are to carry " + S.codex + ".",
});

add("new:tools-10-settings", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.7 (new)",
  sidValue: S.settings,
  review: REVIEW("c"),
  testsFrom: [
    "reads each runner's settings from the user's git configuration, an empty one confirmed",
    "runs the reviewer at the settings read, and with every review held at a default names each setting",
  ],
  proposal: {
    title: "The settings of each runner",
    ruTitle: "Настройки каждого runner",
    parts: [
      P("`sheriff review` reads the settings of each runner (§s-xr5xxa9cxf2mq5u) from the git configuration of the user who commits:",
        "`sheriff review` читает настройки каждого runner (§s-xr5xxa9cxf2mq5u) из конфигурации git пользователя, который делает коммит:",
        "Как было; ссылка на узел о runner (рецензент)."),
      L("`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§" + S.claude + ");",
        "`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` и `specsheriff.review.claudeEffort` — для runner `claude` (§" + S.claude + ");",
        AS_WAS),
      L("`specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§" + S.codex + ").",
        "`specsheriff.review.codexModel` и `specsheriff.review.codexEffort` — для runner `codex` (§" + S.codex + ").",
        AS_WAS),
      P("`sheriff review` takes the model and the reasoning effort only from these settings and their defaults. An empty `specsheriff.review.codexModel` means the model that Codex chooses for the signed-in account.",
        "`sheriff review` берёт модель и effort только из этих настроек и их значений по умолчанию. Пустой `specsheriff.review.codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.",
        "Было: «`sheriff review` не берёт из этого файла ни модели, ни effort». Теперь сказано, откуда он их берёт, с их значениями по умолчанию. «stands for» заменено на «означает». Настройка названа полным ключом (рецензент)."),
      P("A setting that the configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin ask only for a setting that the configuration lacks. They write a setting only with the value that the user whose configuration it is gives in answer. Where the user answers with the default, they write it like any other value. The nodes on the session start (§s-477gtdrkw34dzxw) and on the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.",
        "Настройка, которая есть в конфигурации, пустая или нет, считается подтверждённой. Хуки агента (§s-477gtdrkw34dzxw) и skill каждого плагина SpecSheriff спрашивают только о настройке, которой в конфигурации нет. Они записывают настройку только так, как ответил пользователь, чья это конфигурация. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение. Когда спрашивается каждая настройка, говорят начало сессии (§s-477gtdrkw34dzxw) и skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).",
        "Как было; «не спрашивают ни о какой настройке, которая есть в конфигурации» сказано без отрицания. «Хуки каждого плагина» заменено на «хуки агента»: плагин для Codex хуков не объявляет, они лежат в проекте (рецензент)."),
      P("The defaults are:", "Значения по умолчанию:", AS_WAS),
      L("for the runner `claude`, the model `opus` at the reasoning effort `high`, with `sonnet` as the fallback model;",
        "для runner `claude` — модель `opus` с effort `high` и резервной моделью `sonnet`;", AS_WAS),
      L("for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.",
        "для runner `codex` — модель, которую выбирает Codex, с effort `high`.", AS_WAS),
      P("Where the configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default. In every review (§s-m4h279nbaqkpa3t) that runs with a default setting, `sheriff review` names each setting whose default it took, and says how the user confirms that setting.",
        "Если в конфигурации нет настройки runner, который запускается, `sheriff review` берёт значение этой настройки по умолчанию. При каждом ревью (§s-m4h279nbaqkpa3t), которое идёт со значением по умолчанию, `sheriff review` называет каждую настройку, значение которой по умолчанию он взял, и то, как пользователь её подтверждает.",
        "Как было; «With every review held so» переписано яснее. Ссылка на правило 1.6.1 при первом упоминании ревью (рецензент)."),
    ],
    reason: "A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So it runs with the models and the reasoning efforts that this user has confirmed on their machine. Until the user confirms them, each review tells the user which settings it ran with.",
    ruReason: "Прогон рецензента (§s-m4h279nbaqkpa3t) оплачивает пользователь, который делает коммит, из своей учётной записи. Поэтому прогон идёт на моделях и с effort, которые этот пользователь подтвердил на своей машине. Пока пользователь их не подтвердил, каждое ревью сообщает ему, на чём оно шло.",
    reasonChange: "Прежнее обоснование было длинным, по абзацу почти на каждое предложение текста. Оставлена главная мысль: прогон оплачивает пользователь, поэтому настройки его, и подтверждает их он. Почему выбраны именно эти значения по умолчанию, записано в решении узла от 2026-11-02. Почему настройки хранятся в конфигурации git пользователя, показывает пример.",
    examples: [X(
      "A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every review that the runner `claude` makes on that machine runs with that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.",
      "Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С тех пор каждое ревью, которое runner `claude` выполняет на этой машине, идёт на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда за выбор одного человека платит каждый, кто делает коммит.")],
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", "s-xr5xxa9cxf2mq5u"), R("cites", S.claude), R("cites", S.codex), R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-zh2vcr3xjumppg5"), R("cites", "s-2pdy9gw2jrjvfb4")],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code. The tests at gates.test.ts:169 and :186 are to carry " + S.settings + ".",
});

// ---------------------------------------------------------------------------------------------------------------
// Items 22, 24 and 26: "The SpecTag, and how a symbol carries it" (s-5z5gnu7pahr82xp) and "How a test declares the
// node it is written from" (s-zrsc6asgmhv8tnc), in a new section with the nodes on files bound as a whole.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-8-section", {
  location: "tools 8 (new section, in place of the node \"The SpecTag, and how a symbol carries it\")",
  kind: "section",
  sidValue: S.specTagSection,
  review: REVIEW("c"),
  order: ["s-5z5gnu7pahr82xp", S.symbol, S.fileStart, S.bindings, "s-zrsc6asgmhv8tnc"],
  proposal: {
    title: "SpecTags in the code and the tests",
    ruTitle: "SpecTag в коде и тестах",
    parts: [
      P("How the system's code (§s-hheus6f395ynqvc) and its tests carry SpecTags (§s-8xw4mgvpexyvw5q), and how the SpecSheriff tools read them.",
        "Как у кода системы (§s-hheus6f395ynqvc) и его тестов записываются SpecTag (§s-8xw4mgvpexyvw5q) и как инструменты SpecSheriff их читают.",
        "Новое: раздел на месте узла «The SpecTag, and how a symbol carries it», который разделён по правилу 7.3.3, как прежде узел «The commands». По правилу 1.5.2, которое вы согласовали 2026-11-17, код привязывается и SpecTag в начале файла, и записью в файле привязок."),
    ],
    refs: [R("cites", "s-hheus6f395ynqvc"), R("cites", "s-8xw4mgvpexyvw5q")],
    removed: [],
    date: DATE,
  },
});

add("s-5z5gnu7pahr82xp", {
  location: "tools 8.1",
  sidValue: "s-5z5gnu7pahr82xp",
  review: REVIEW("c"),
  testsFrom: ["match no test"],
  proposal: {
    title: "The form of a SpecTag",
    ruTitle: "Форма SpecTag",
    titleChange: "Было: «The SpecTag, and how a symbol carries it». Узел разделён по правилу 7.3.3: как SpecTag записываются у символа, в начале файла, в файле привязок и у теста, говорят отдельные узлы нового раздела. Этот узел говорит только о форме SpecTag.",
    parts: [
      P("A SpecTag (§s-8xw4mgvpexyvw5q) is written in one of these forms:",
        "SpecTag (§s-8xw4mgvpexyvw5q) записывается в одной из этих форм:",
        "Было: «SpecTag — это текст `@spec <sid>` или `@spec none` с причиной». Теперь формы перечислены списком."),
      L("`@spec <sid>`, where `<sid>` is the sid of a rule that the code carrying the SpecTag implements, or that the test carrying it is written from (§s-sfjka4zc4rhfu67);",
        "`@spec <sid>`, где `<sid>` — sid правила, которое реализует код с этим SpecTag или из которого написан тест с этим SpecTag (§s-sfjka4zc4rhfu67);",
        "Как было; что называет sid, — по правилу 10.10. «Код» и «тест» теперь названы через SpecTag, который у них есть (рецензент)."),
      L("`@spec none`, followed by a space and a statement of what the technology that the system is built with requires of the code that carries the SpecTag (§s-2jcmb9xe9d64t2t).",
        "`@spec none`, затем пробел и то, что требует от кода с этим SpecTag технология, на которой построена система (§s-2jcmb9xe9d64t2t).",
        "Было: «`@spec none` с причиной, по которой символ не несёт SpecTag». Это сомнение D2 из обзора 11-13: годился любой непустой текст. Правило 1.2.7, которое вы согласовали 2026-11-08, определяет технический код как код, который не реализует логики системы и которого требует технология, на которой она построена. Поэтому после `@spec none` пишется, чего требует технология. Проверяет это рецензент (узел о суждении о коде)."),
      P("The rule that a SpecTag `@spec <sid>` names is a node of one of these kinds, including one in a cell of a `TableRule`:",
        "Правило, которое называет SpecTag `@spec <sid>`, — это узел одного из этих типов, в том числе в ячейке `TableRule`:",
        "Новое: те же типы, что в согласованном узле «`exempts` links», кроме собственного типа, узлы которого не требуют реализации в коде, — по вашему решению D3 от 2026-11-10: тест пишется для правила или для узла собственного типа, который требует реализации в коде. Термин больше не допускается: тест ссылается на правило (правило 1.4.2), а SpecTag кода называет правило, которое код реализует (строка 10.1.26). Типы — списком (рецензент)."),
      L("`TextRule`;", "`TextRule`;", "Пункт списка типов."),
      L("`TableRule` (§s-5fewsp22mmdz7y6);", "`TableRule` (§s-5fewsp22mmdz7y6);", "Пункт списка типов."),
      L("`RecordType` (§s-ktfstpv8rurznrp);", "`RecordType` (§s-ktfstpv8rurznrp);", "Пункт списка типов; RecordType — правило по правилу 12.3a, которое вы согласовали 2026-11-21."),
      L("a project's own kind whose nodes require an implementation in code (§s-vsh384ybt4w25a2).", "собственный тип проекта, узлы которого требуют реализации в коде (§s-vsh384ybt4w25a2).", "Пункт списка типов; по решению D3 от 2026-11-10."),
      P("Code that implements several rules carries a SpecTag for each of them. Code that implements no rule carries `@spec none` as its only SpecTag. A test carries a SpecTag only in the form `@spec <sid>` (§s-nrjxfvpkq3m8hzm).",
        "У кода, который реализует несколько правил, есть SpecTag для каждого из них. У кода, который не реализует никакого правила, единственный SpecTag — `@spec none`. У теста SpecTag бывает только в форме `@spec <sid>` (§s-nrjxfvpkq3m8hzm).",
        "Было: «Символ, реализующий несколько правил, несёт несколько SpecTag. Форма `@spec none` стоит только на символе». Теперь — о коде, а не о символе, потому что код может быть привязан и файлом целиком (правило 1.5.2). Новое: `@spec none` — единственный SpecTag такого кода; тест ссылается только на правило (правило 1.4.2)."),
    ],
    reason: "Fixed forms, each opening with `@spec`, let the SpecSheriff tools find every SpecTag by its text, in a file in any language. What follows `@spec none` says why the code needs no rule, so that whoever reads the code can tell whether it is technical code (§s-2jcmb9xe9d64t2t).",
    ruReason: "Неизменные формы, каждая из которых начинается с `@spec`, позволяют инструментам SpecSheriff находить каждый SpecTag по его тексту в файле на любом языке. То, что следует за `@spec none`, говорит, почему коду не нужно правило, чтобы тот, кто читает код, мог понять, технический ли это код (§s-2jcmb9xe9d64t2t).",
    reasonChange: "Прежнее обоснование говорило о комментарии над символом и о парсере; оно перенесено в узел «How a symbol carries its SpecTags». Новое обоснование — о формах и о тексте после `@spec none` (рецензент).",
    examples: [X(
      "A function that a web framework calls to register routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers routes`. The most likely mistake is `@spec none helper`, which does not say what the technology requires of the code.",
      "У функции, которую веб-фреймворк вызывает, чтобы зарегистрировать маршруты, и в которой нет логики системы, есть SpecTag `@spec none the web framework requires a function that registers routes`. Самая вероятная ошибка — `@spec none helper`: он не говорит, что требует от кода технология.")],
    refs: [R("implements", "s-8xw4mgvpexyvw5q"), R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-sfjka4zc4rhfu67"), R("cites", "s-2jcmb9xe9d64t2t"),
      R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-nrjxfvpkq3m8hzm")],
    removed: [
      "The `implements` link to “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): it is retargeted to “The SpecTag” (s-8xw4mgvpexyvw5q), which now defines what a SpecTag is, as the continuation file says.",
      "The citation of the main table of checks (s-jau82aq9juv9zzh) and of “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc): the paragraphs that cited them moved to “How a symbol carries its SpecTags” (" + S.symbol + "), and the test's SpecTag is its own node of the new section.",
      "How a symbol carries its SpecTags, the parser and the descriptions of the languages: they moved to “How a symbol carries its SpecTags” (" + S.symbol + ").",
    ],
    date: DATE,
  },
  stage3: "code.ts:63 (TAG) accepts any text after `@spec none`, and the reviewer judges whether it says what the technology requires (" + S.reviewCode + "). A text that opens with `@spec` and has neither form, such as `@spec none` with no text, is to be refused with a message that names the forms (s-9rtrj24myzjvshu). Code carrying `@spec none` beside another SpecTag is to be refused (s-9rtrj24myzjvshu). binding.ts:136 (coded) and :202 are to accept as a rule a project's own kind only where its `needsCode` is true. At the move, this node's decisions of 2026-09-22, 2026-10-08 and 2026-10-27 go to " + S.symbol + ", and the decision of 2026-10-27 of the former 3.3 is recorded here and in s-zrsc6asgmhv8tnc, as the continuation file says.",
});

add("new:tools-8-symbol", {
  from: "s-5z5gnu7pahr82xp",
  location: "tools 8.2 (new)",
  sidValue: S.symbol,
  review: REVIEW("d"),
  testsFrom: [
    "reads a tag in the doc comment directly above a TypeScript symbol",
    "finds a symbol carrying no tag, and a tag not directly above a symbol",
    "refuses a tag sharing its line with anything but the comment's delimiters",
    "covers a member by the tag of the class it stands in",
    "lets the first of a run of re-exports say for the whole run that it implements no rule",
    "reads a Python tag in the comment lines above a symbol's decorators",
  ],
  proposal: {
    title: "How a symbol carries its SpecTags",
    ruTitle: "Как SpecTag записываются у символа",
    parts: [
      P("In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol, above its decorators where it has any. That comment is:",
        "В файле на языке, описанном в папке `languages/` инструментов SpecSheriff, SpecTag (§s-5z5gnu7pahr82xp) символа (§s-kgbzk2ph9e6jfb4) — это строки комментария непосредственно над символом, над его декораторами, если они есть. Этот комментарий:",
        "Как было; новое — что это относится к файлу на языке, описанном в папке `languages/` (рецензент)."),
      L("in TypeScript and JavaScript, the symbol's doc comment;", "в TypeScript и JavaScript — документирующий комментарий символа;", AS_WAS),
      L("in Python, one or more comment lines.", "в Python — одна или несколько строк комментария.", "Было: «строка комментария». Код читает каждую строку комментария непосредственно над символом, а символу, привязанному к двум правилам, нужны две строки (рецензент)."),
      P("Only the delimiters of the comment may share a SpecTag's line.",
        "Делить строку с SpecTag могут только ограничители комментария.",
        "Как было; русский текст поправлен: в английском — ограничители во множественном числе (рецензент)."),
      P("Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own.",
        "Если у первого в ряду реэкспортов, между которыми нет пустой строки, есть `@spec none`, этот SpecTag привязывает и каждый следующий реэкспорт ряда, у которого нет своего SpecTag.",
        "Было: «…этот SpecTag привязывает весь ряд». Теперь сказано, что реэкспорт со своим SpecTag сохраняет свой, как в code.ts:199 (рецензент)."),
      P("The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They parse each file on its own, with the parser alone and no type checker.",
        "Символ, над которым стоит SpecTag, инструменты SpecSheriff находят, разбирая файл с помощью tree-sitter и грамматики языка файла. Они разбирают каждый файл отдельно, только парсером и без проверки типов.",
        "Было: «Они используют только парсер, без программы и без проверки типов». «Без программы» было непонятно; по решению от 2026-09-22 каждый файл разбирается отдельно (рецензент)."),
      P("The description of each language names what counts in that language as a symbol and as a test. TypeScript, JavaScript and Python are described.",
        "Описание каждого языка называет, что в нём считается символом и что тестом. Описаны TypeScript, JavaScript и Python.",
        "Как было; где лежат описания, теперь сказано в первом абзаце (рецензент)."),
    ],
    reason: "A SpecTag sits where a reader of the symbol's code already looks. There, a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time.",
    ruReason: "SpecTag стоит там, куда уже смотрит читатель символа. Там парсер, в отличие от поиска по тексту, определяет, какой символ привязывает SpecTag, — одинаково для одного и того же файла каждый раз.",
    reasonChange: "Из прежнего обоснования: комментарий над символом — там, где читатель уже смотрит; поиск по тексту не видит, к чему прикреплён SpecTag, а парсер видит и отвечает одинаково. Сокращено; второе предложение — одна мысль (рецензент).",
    examples: [X(
      "In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function: the SpecTag is then directly above no symbol and binds nothing.",
      "В TypeScript `/** @spec s-… */` непосредственно над `export function close()` привязывает функцию и каждый вложенный в неё символ. Самая вероятная ошибка — пустая строка между комментарием и функцией: тогда SpecTag не стоит непосредственно ни над каким символом и ничего не привязывает.")],
    refs: [R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-5z5gnu7pahr82xp")],
    removed: [],
    date: DATE,
  },
  stage3: "code.ts:195-208 applies the SpecTags of the first re-export of a run to the later re-exports that carry none, whatever those SpecTags are; it is to do so only for `@spec none`, as the decision of 2026-10-08 says. The tests at code.test.ts:9-47 are to carry " + S.symbol + ".",
});

add("new:tools-8-file-start", {
  from: "s-5z5gnu7pahr82xp",
  location: "tools 8.3 (new)",
  sidValue: S.fileStart,
  review: REVIEW("d"),
  testsFrom: ["reads nothing of a file in a language no description covers"],
  proposal: {
    title: "SpecTags at the start of a file",
    ruTitle: "SpecTag в начале файла",
    parts: [
      P("A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start (§s-kgbzk2ph9e6jfb4) where all of the following hold:",
        "У файла кода системы (§s-hheus6f395ynqvc) помимо тестов SpecTag (§s-5z5gnu7pahr82xp) записываются в начале файла (§s-kgbzk2ph9e6jfb4), если выполнено всё следующее:",
        "Новое: по правилу 1.5.2, которое вы согласовали 2026-11-17, SpecTag ставятся в начале файла, если проверки не могут определить символы файла."),
      L("the SpecSheriff tools cannot identify the file's symbols, because no description covers its language (§" + S.symbol + ");",
        "инструменты SpecSheriff не могут определить символы файла, потому что его язык не охватывает ни одно описание (§" + S.symbol + ");",
        "Новое; слова правила 1.5.2."),
      L("the file's format allows comments (§" + S.bindings + ").",
        "формат файла допускает комментарии (§" + S.bindings + ").",
        "Новое; файл, формат которого не допускает комментариев, привязывается записью в файле привязок."),
      P("The SpecTags at the start of a file are on the lines that come before the first of its lines that holds a letter or a digit outside a SpecTag. The file's first line is not counted where it opens with `#!` or `<?`, so that a shebang or a declaration that the format requires to come first, such as an XML declaration, may come before them.",
        "SpecTag в начале файла стоят в строках, которые идут до первой его строки с буквой или цифрой вне SpecTag. Первая строка файла не учитывается, если она начинается с `#!` или `<?`, чтобы перед ними могли стоять shebang или объявление, которое формат требует первым, например объявление XML.",
        "Новое. Инструменты SpecSheriff не могут разобрать такой файл, поэтому его начало определено без разбора: по строкам до первой буквы или цифры вне SpecTag. Первая строка не учитывается, только если она начинается с `#!` или `<?`: иначе перед SpecTag могла бы стоять строка содержимого, что расходится с правилом 1.5.2 («как можно ближе к началу, насколько позволяет формат»). Цена: формат, чья обязательная первая строка начинается иначе, например `%!PS`, не может нести SpecTag в начале (рецензент)."),
      P("In a file bound by SpecTags at its start, the text that follows `@spec none` runs to the end of its line, excluding any characters at its end that are neither letters nor digits.",
        "В файле, привязанном SpecTag в начале, текст после `@spec none` идёт до конца строки, без знаков в её конце, которые не являются ни буквами, ни цифрами.",
        "Новое: так ограничитель комментария в конце строки, например `*/` или `-->`, не попадает в текст. Правило ограничено файлами, привязанными SpecTag в начале (рецензент)."),
    ],
    reason: "The lines before a file's content can be identified in any language without parsing. So the SpecTags of a file that the SpecSheriff tools cannot parse are kept there.",
    ruReason: "Строки перед содержимым файла можно отличить на любом языке без разбора. Поэтому SpecTag файла, который инструменты SpecSheriff не могут разобрать, хранятся там.",
    reasonChange: "Новое.",
    examples: [X(
      "A stylesheet starts with `/* @spec s-… */`, followed by the stylesheet's content. An XML file starts with its declaration, `<?xml version=\"1.0\"?>`, followed by `<!-- @spec s-… -->`. The most likely mistake is to put the SpecTag after a licence comment at the start of the file. The words of the licence then come first, and the SpecTag binds nothing.",
      "Таблица стилей начинается с `/* @spec s-… */`, за которым идёт её содержимое. Файл XML начинается со своего объявления `<?xml version=\"1.0\"?>`, за которым идёт `<!-- @spec s-… -->`. Самая вероятная ошибка — поставить SpecTag после комментария с лицензией в начале файла. Тогда первыми идут слова лицензии, и SpecTag ничего не привязывает.")],
    refs: [R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", S.symbol), R("cites", S.bindings)],
    removed: [],
    date: DATE,
  },
  stage3: "code.ts:122-125 (readCode) reads nothing of a file in a language that no description covers, and binding.ts reads no such file. They are to read the SpecTags at the start of each such file that the glob patterns for code match and whose format allows comments, the first line skipped only where it opens with `#!` or `<?`. The test at code.test.ts:78 is to expect those SpecTags and to carry " + S.fileStart + "; the other tests are written first.",
});

add("new:tools-8-bindings", {
  location: "tools 8.4 (new)",
  sidValue: S.bindings,
  review: REVIEW("d"),
  testsFrom: ["match no test"],
  proposal: {
    title: "The bindings file",
    ruTitle: "Файл привязок",
    parts: [
      P("`sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the commit leaves in the repository (§s-ffkv5qnqvet7bga). It refuses any other entry, naming its path.",
        "`sheriff binding` принимает запись в файле привязок (§s-kgbzk2ph9e6jfb4) `sheriff.bindings.json` (§s-zefk589ykh37b8u), только если путь записи называет файл, который репозиторий хранит в том виде, в каком его оставляет коммит (§s-ffkv5qnqvet7bga). Любую другую запись он отвергает, называя её путь.",
        "Новое: узел реализует строку 10.1.26b; ни один узел описания инструментов прежде не упоминал файл привязок (stage2-inventory.md, пункт 26). По вашему решению по этой строке от 2026-11-17 проверка при каждом коммите ловит перенесённый или переименованный файл."),
      P("The bindings file holds a JSON object. Each key of the object is the path of a file relative to the root of the repository, with forward slashes. The value of each key is the list of the SpecTags (§s-5z5gnu7pahr82xp) of that file, each a string. The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of this form.",
        "Файл привязок содержит JSON-объект. Каждый ключ объекта — путь к файлу от корня репозитория с прямыми косыми чертами. Значение каждого ключа — список SpecTag (§s-5z5gnu7pahr82xp) этого файла, каждый — строка. Инструменты SpecSheriff отвергают `sheriff.bindings.json`, если он не является корректным JSON или не содержит объекта такой формы.",
        "Новое: форма файла привязок — техническое решение агента. Имя файла вы согласовали в узле «Where the files are». Отказ для файла не той формы стоит теперь в том же абзаце, что и сама форма (рецензент)."),
      P("The SpecSheriff tools treat a file's format as allowing no comments where the file's name ends in `.json`, or where the file matches the glob patterns that the project's own guidelines (§s-u7tw6m8npxmv5tu) list for such formats.",
        "Инструменты SpecSheriff считают, что формат файла не допускает комментариев, если имя файла оканчивается на `.json` или если файл соответствует glob-шаблонам, которые собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют для таких форматов.",
        "Новое: как инструменты SpecSheriff узнают формат без комментариев — по правилу 1.5.2 и согласованному узлу о том, что они читают в собственных guidelines проекта. Что запись привязывает такой файл, говорит правило 1.5.2, и узел этого не повторяет (рецензент)."),
    ],
    reason: "An entry keeps the path it names when its file is moved or renamed. So only a check of every entry against the repository shows that a file has lost its SpecTags.",
    ruReason: "Запись сохраняет путь, который она называет, когда её файл переносят или переименовывают. Поэтому только проверка каждой записи по репозиторию показывает, что файл потерял свои SpecTag.",
    reasonChange: "Новое. Первое предложение — рецензента: меняется путь файла, а путь в записи остаётся прежним.",
    examples: [X(
      "`src/ui/texts.json` holds the texts that a user interface shows, and the bindings file holds the entry `\"src/ui/texts.json\": [\"@spec s-…\"]`. The most likely mistake is to rename the file to `src/ui/labels.json` and leave the entry as it was. `sheriff binding` then refuses the entry, and the renamed file carries no SpecTag.",
      "`src/ui/texts.json` содержит тексты, которые показывает пользовательский интерфейс, а файл привязок содержит запись `\"src/ui/texts.json\": [\"@spec s-…\"]`. Самая вероятная ошибка — переименовать файл в `src/ui/labels.json` и оставить запись прежней. Тогда `sheriff binding` отвергает запись, а у переименованного файла нет SpecTag.")],
    refs: [R("implements", "s-ffkv5qnqvet7bga"), R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-u7tw6m8npxmv5tu")],
    removed: [],
    date: DATE,
  },
  stage3: "No code reads sheriff.bindings.json. binding.ts, reindex.ts (which builds meta.code from the SpecTags, s-rwqzepmrt77rv35) and message.ts (s-ef93u6cnbs2sevr) are to read its entries as the SpecTags of their files. sheriff binding is to refuse an entry whose path names no file, and a file that is not valid JSON or does not hold an object of this form. Its tests are written first.",
});

add("s-zrsc6asgmhv8tnc", {
  location: "tools 8.5 (moved from tools 9 into the new section)",
  sidValue: "s-zrsc6asgmhv8tnc",
  review: REVIEW("d"),
  testsFrom: ["s-zrsc6asgmhv8tnc", "skills/pytest-specsheriff/tests/test_plugin.py"],
  proposal: {
    title: "How a test declares the rule it is written from",
    ruTitle: "Как тест объявляет правило, из которого он написан",
    titleChange: "Было: «How a test declares the node it is written from». Тест ссылается на правило (правило 1.4.2), а не на любой узел.",
    parts: [
      P("A test declares the SpecTag (§s-5z5gnu7pahr82xp) of the rule it is written from (§s-nrjxfvpkq3m8hzm):",
        "Тест объявляет SpecTag (§s-5z5gnu7pahr82xp) правила, из которого он написан (§s-nrjxfvpkq3m8hzm):",
        "Было: «Тест объявляет свой SpecTag». Теперь сказано, чей это SpecTag: правила, из которого написан тест."),
      L("in TypeScript and JavaScript, by starting its name with the SpecTag, as in `test(\"@spec s-… what it checks\", …)`;",
        "в TypeScript и JavaScript — начиная им своё название, как в `test(\"@spec s-… what it checks\", …)`;",
        "Как было; английский текст поправлен, смысл тот же."),
      L("in Python, by a mark on the test, `@pytest.mark.spec(\"@spec s-…\")`;",
        "в Python — пометкой на тесте `@pytest.mark.spec(\"@spec s-…\")`;",
        AS_WAS),
      L("in any other language, as the description of that language says (§" + S.symbol + ").",
        "в другом языке — так, как говорит описание этого языка (§" + S.symbol + ").",
        "Как было; английский текст поправлен, смысл тот же."),
      P("A test declares one SpecTag.", "Тест объявляет один SpecTag.", "Новое в тексте; так делает код."),
      P("The SpecSheriff tools' plugin for pytest, `pytest-specsheriff`, registers the mark. It puts the test's SpecTag at the start of the name that a run reports for the test.",
        "Плагин для pytest инструментов SpecSheriff, `pytest-specsheriff`, регистрирует пометку. Он ставит SpecTag теста в начало названия, которое прогон сообщает для этого теста.",
        "Как было; английский текст поправлен, смысл тот же."),
      P("Where the mark holds anything other than one SpecTag, the plugin stops the run with an error that names the test. Where the mark holds a bare sid (§s-gb8s9657a65hqmv), the error also names `sheriff reindex`, which writes the SpecTag.",
        "Если пометка содержит что-либо, кроме одного SpecTag, плагин останавливает прогон с ошибкой, которая называет тест. Если пометка содержит голый sid (§s-gb8s9657a65hqmv), ошибка называет ещё и `sheriff reindex`, который записывает SpecTag.",
        "Новое в тексте; так делает плагин (тесты в test_plugin.py). Условие стоит первым, чтобы «где» не относилось к тесту (рецензент)."),
    ],
    reason: "A test run reports each test by its name, so the SpecTag is placed where that report shows it.",
    ruReason: "Прогон тестов сообщает о каждом тесте по его названию, поэтому SpecTag стоит там, где его показывает этот отчёт.",
    reasonChange: "Как было, сокращено до одной мысли. Почему в Python SpecTag стоит в пометке, записано в решении от 2026-10-27 (рецензент).",
    examples: [X(
      "In TypeScript, `test(\"@spec s-… refuses an empty name\", …)` declares the SpecTag of the rule it is written from. The most likely mistake is to put the SpecTag only in the name of the `describe` block that holds the tests. That block is not a test, so no test in it declares a SpecTag.",
      "В TypeScript `test(\"@spec s-… refuses an empty name\", …)` объявляет SpecTag правила, из которого написан тест. Самая вероятная ошибка — поставить SpecTag только в название блока `describe`, в котором лежат тесты. Этот блок — не тест, поэтому ни один тест в нём не объявляет SpecTag.")],
    refs: [R("implements", "s-nrjxfvpkq3m8hzm"), R("implements", "s-8xw4mgvpexyvw5q"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", S.symbol), R("cites", "s-gb8s9657a65hqmv")],
    removed: [
      "The `implements` links to “A node's lists of its code and its tests” (s-rwqzepmrt77rv35) and “The test comes before the code” (s-rah8b37kytb682y): they are retargeted to “A test's reference to its rule” (s-nrjxfvpkq3m8hzm) and “The SpecTag” (s-8xw4mgvpexyvw5q), which now require where a test's reference stands, as the inventory says.",
    ],
    date: DATE,
  },
  stage3: "No change to the code. The tests of the plugin in test_plugin.py carry no SpecTag in their mark; they are to carry s-zrsc6asgmhv8tnc. The decision of 2026-10-27 of the former 3.3 is recorded here at the move.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 23: "SpecTags on the system's code" (s-9rtrj24myzjvshu), rows 10.1.26 and 10.1.28, with the node that rule
// 9.5 needs for code and tests outside the commit.
// ---------------------------------------------------------------------------------------------------------------
add("s-9rtrj24myzjvshu", {
  location: "tools 7.2.2",
  sidValue: "s-9rtrj24myzjvshu",
  review: REVIEW("d"),
  dependsOn: [Q2],
  testsFrom: ["refuses a symbol of the system's code carrying no tag", "refuses a tag that stands on no symbol"],
  proposal: {
    title: "SpecTags on the system's code other than tests",
    ruTitle: "SpecTag в коде системы помимо тестов",
    titleChange: "Было: «SpecTags on the system's code». Код системы включает тесты (правило 9.1), а узел, как строка 10.1.26, говорит о коде помимо тестов; тесты проверяет узел «The SpecTags the tests carry».",
    parts: [
      P("`sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests, whether the specification is approved or a draft (§s-k6dzuajejrw4cej):",
        "`sheriff binding` отвергает в коде системы (§s-hheus6f395ynqvc), который коммит добавляет или меняет (§s-2x58az67bm6cxq2), помимо тестов, каждое из следующего, независимо от того, одобрена спецификация или она черновик (§s-k6dzuajejrw4cej):",
        "Было: «`sheriff binding` читает SpecTag каждого символа кода системы». Теперь узел начинается с того, что отвергается, и реализует строку 10.1.26: код привязан одним из способов правила 1.5.2, и каждый SpecTag называет правило или говорит, что код не реализует никакого. Что проверка идёт и в черновике — по вашему решению от 2026-11-20; это сказано в первой фразе (рецензент). Отвергается только код, который коммит добавляет или меняет: такой ответ рекомендован в вопросе 2."),
      L("a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;",
        "символ (§s-kgbzk2ph9e6jfb4), который не привязывает ни один SpecTag (§s-5z5gnu7pahr82xp);",
        "Было: символ без SpecTag. Вложенный символ привязывает и SpecTag символа, в который он вложен (правило 1.5.2)."),
      L("a file that is to be bound as a whole (§" + S.fileStart + ", §" + S.bindings + ") and that no SpecTag binds;",
        "файл, который должен быть привязан целиком (§" + S.fileStart + ", §" + S.bindings + "), но который не привязывает ни один SpecTag;",
        "Новое: по правилу 1.5.2 файл, символы которого проверки не могут определить, привязывается SpecTag в начале или записью в файле привязок."),
      L("in a file whose language a description covers (§" + S.symbol + "), a SpecTag in any comment other than the one directly above a symbol;",
        "в файле на языке, который охватывает описание (§" + S.symbol + "), SpecTag в любом комментарии, кроме комментария непосредственно над символом;",
        "Было в коде (code.ts), но не в тексте узла. По вашему решению по строке 10.1.26 от 2026-11-13 эта строка проверяет и то, где стоят SpecTag. «В любом комментарии» — чтобы `@spec` в строковом литерале не отвергался (рецензент)."),
      L("in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;",
        "в таком файле SpecTag, который делит строку с чем-либо, кроме ограничителей комментария;",
        "Было в коде (code.ts), но не в тексте узла, по той же причине."),
      L("in a file to be bound by SpecTags at its start (§" + S.fileStart + "), a SpecTag on a line after that start;",
        "в файле, который должен быть привязан SpecTag в начале (§" + S.fileStart + "), SpecTag на строке после этого начала;",
        "Новое, по той же причине. «Который должен быть привязан» — чтобы пункт охватывал и файл, единственный SpecTag которого стоит не на месте (рецензент)."),
      L("where a SpecTag may stand, a text that opens with `@spec` but has neither form of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;",
        "там, где может стоять SpecTag, текст, который начинается с `@spec`, но не имеет ни одной из форм SpecTag (§s-5z5gnu7pahr82xp), например `@spec none` без текста после него;",
        "Новое: формы SpecTag задаёт узел «The form of a SpecTag», и текст, не имеющий ни одной из них, отвергается (рецензент)."),
      L("an entry in the bindings file (§" + S.bindings + ") for a file that is not part of the system's code other than tests, or whose format allows comments;",
        "запись в файле привязок (§" + S.bindings + ") для файла, который не относится к коду системы помимо тестов или формат которого допускает комментарии;",
        "Новое: по правилу 1.5.2 запись в файле привязок — только для файла, формат которого не допускает комментариев."),
      L("a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);",
        "SpecTag, sid которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом (§s-5z5gnu7pahr82xp);",
        "Новое: прежде инструменты спрашивали только, существует ли узел (binding.ts:179). Строка 10.1.26 требует, чтобы SpecTag называл правило; какие узлы считаются правилами, говорит узел «The form of a SpecTag». SpecTag, sid которого не называет никакого узла, отвергает узел «A SpecTag that names no node»."),
      L("code that carries `@spec none` together with another SpecTag.",
        "код, у которого есть `@spec none` вместе с другим SpecTag.",
        "Новое: у кода, который не реализует никакого правила, `@spec none` — единственный SpecTag, как говорит узел «The form of a SpecTag» (рецензент)."),
      P("The refusal names the file, and the symbol and the line where they apply.",
        "Отказ называет файл, а также символ и строку, если они есть.",
        "Новое: что называет отказ."),
      P("A SpecTag or an entry of a kind that this list refuses binds nothing. Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§" + S.outside + ").",
        "SpecTag или запись того вида, который отвергает этот список, ничего не привязывает. Код, который коммит оставляет неизменным и который не привязывает ни один SpecTag, обрабатывает проверка кода и тестов за пределами коммита (§" + S.outside + ").",
        "Было: пока коммит оставляет спецификацию черновиком, символ без SpecTag, который коммит не меняет, сообщается, а не отвергается. Теперь, при ответе B на вопрос 2, неизменённый код, SpecTag которого ничего не привязывает, обрабатывается так же, как код без SpecTag: по правилу 9.5 и по столбцу «On failure» строки 10.1.26, который отсылает неизменённый код к правилу 9.5."),
    ],
    reason: "A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code that it is meant to bind is then as unbound as code with no SpecTag.",
    ruReason: "SpecTag, который нельзя отнести к одному символу или одному файлу или который называет узел, который никакой код не может реализовать, ничего не привязывает. Код, который он должен привязывать, тогда так же не привязан, как код без SpecTag.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.",
      "Коммит добавляет функцию, у которой есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу.")],
    refs: [R("implements", "s-k6dzuajejrw4cej"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", S.symbol),
      R("cites", "s-5z5gnu7pahr82xp"), R("cites", S.fileStart), R("cites", S.bindings), R("cites", "s-w6gybeqn2ttydqx"), R("cites", S.outside)],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.26 (s-k6dzuajejrw4cej).",
      "The `implements` link to “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) and the citation of “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): code outside the commit is now handled by “Code and tests outside the commit that carry no SpecTag” (" + S.outside + ").",
      "The `implements` link to “What is considered the system's code” (s-hheus6f395ynqvc): the node relies on that rule and cites it.",
      "The citation of “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc) and the sentence on the tests: the tests are checked by “The SpecTags the tests carry” (s-utf4mbt7ref8g9c).",
      "“The sid of a SpecTag is looked up among the nodes”: it moved to “A SpecTag that names no node” (" + S.noNode + "), which implements row 10.1.28.",
      "“That of a SpecTag on a changed symbol is looked up among the approved ones”: it is row 10.1.28a (s-wpadgy2budcxa3v), which item 29, “The symbols a commit changes” (s-2x58az67bm6cxq2), takes up for code and tests alike.",
      "“The repository's configuration, its own tools and their tests are not the system's code”: rule 9.1 (s-hheus6f395ynqvc) states it, and the agreed node “Project-wide settings” says which files the SpecSheriff tools read for SpecTags.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:167-184 refuses a top-level symbol without a SpecTag in any commit, and code.ts reports a misplaced SpecTag in any file. It is to refuse only in code that the commit adds or changes (answer B to Q2): a symbol or a file to be bound as a whole that no SpecTag binds, a misplaced SpecTag, a text opening with `@spec` that has neither form, an entry in the bindings file for a file that is not code other than tests or whose format allows comments, a SpecTag whose node is of no kind listed in s-5z5gnu7pahr82xp, and code carrying `@spec none` beside another SpecTag. Unchanged code with any of these goes to " + S.outside + ". binding.ts:171-173 (the draft report) moves to " + S.outside + ", and binding.ts:180 (a draft node on a changed symbol) to row 10.1.28a (s-2x58az67bm6cxq2). The tests at binding.test.ts:23 and :95 are to carry s-9rtrj24myzjvshu; the tests of the new refusals are written first.",
});

add("new:tools-7-2-no-node", {
  from: "s-9rtrj24myzjvshu",
  location: "tools 7.2.2a (new, after \"SpecTags on the system's code other than tests\")",
  sidValue: S.noNode,
  review: REVIEW("e"),
  testsFrom: ["refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes"],
  proposal: {
    title: "A SpecTag that names no node",
    ruTitle: "SpecTag, который не называет ни одного узла",
    parts: [
      P("`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) as the commit leaves it. It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including the tests, and in the bindings file (§" + S.bindings + "). It refuses a SpecTag whose sid names no node of that model, naming the file, the line and the sid (§s-w4g56n2bs753rt3).",
        "`sheriff binding` принимает SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp), только если его sid называет узел модели спецификации (§s-w6gybeqn2ttydqx) в том виде, в каком её оставляет коммит. Он проверяет каждый такой SpecTag в коде системы (§s-hheus6f395ynqvc), в том числе в тестах, а также в файле привязок (§" + S.bindings + "). SpecTag, sid которого не называет ни одного узла этой модели, он отвергает, называя файл, строку и sid (§s-w4g56n2bs753rt3).",
        "Новое: узел вынесен из «SpecTags on the system's code» и реализует строку 10.1.28. По вашему решению по этой строке от 2026-11-13 она проверяет только, существует ли правило; что правило-черновик не реализуется, проверяет строка 10.1.28a. Модель берётся в том виде, в каком её оставляет коммит, а файл привязок назван отдельно от кода системы: по правилу 9.1 конфигурация к коду системы не относится (рецензент)."),
      P("`sheriff binding` refuses a SpecTag whose sid names no node at every commit, whether or not:",
        "`sheriff binding` отвергает SpecTag, sid которого не называет ни одного узла, при каждом коммите независимо от того:",
        "Новое в тексте; так делает код (binding.ts:179 и :201). Столбец «On failure» строки 10.1.28 — «refused», без исключений. Условия — списком (рецензент)."),
      L("the commit changes the code or the test that the SpecTag binds;", "меняет ли коммит код или тест, привязанный этим SpecTag;", "Пункт списка условий (рецензент)."),
      L("the specification is approved.", "одобрена ли спецификация.", "Пункт списка условий (рецензент)."),
    ],
    reason: "Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag stands.",
    ruReason: "После удаления узла каждый SpecTag, который его называет, привязывает свой код или тест ни к чему, где бы этот SpecTag ни стоял.",
    reasonChange: "Новое (рецензент): одна мысль, без пересказа абзацев текста.",
    examples: [X(
      "A rule is removed, while a function elsewhere still carries its SpecTag. The commit that removes the rule changes no code, and `sheriff binding` refuses the SpecTag on the function. The most likely mistake is to look up only the SpecTags on code that the commit changes, which lets the SpecTag pass until someone edits the function.",
      "Правило удаляют, а у функции в другом месте всё ещё есть его SpecTag. Коммит, удаляющий правило, не меняет кода, и `sheriff binding` отвергает SpecTag у функции. Самая вероятная ошибка — проверять только SpecTag кода, который меняет коммит: тогда SpecTag проходит, пока кто-нибудь не изменит функцию.")],
    refs: [R("implements", "s-w4g56n2bs753rt3"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-hheus6f395ynqvc"), R("cites", S.bindings)],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:179 and :201 refuse a SpecTag naming no node on code and on tests; the entries of the bindings file are to be read too. The check of citations outside the specification (binding.ts:519-537, s-m8nmfsxkcfu7cjp) also refuses such a sid. It is to leave to this node only the SpecTags in the system's code, its tests and the bindings file, so that one SpecTag is refused once, and it keeps the SpecTags in the repository's own tools (rule 10.10; item 35). The part of binding.test.ts:29 on a SpecTag naming no node is to carry " + S.noNode + "; its part on a draft node goes to row 10.1.28a.",
});

add("new:tools-7-2-outside", {
  from: "s-j9r8z4xdrfkfs47",
  location: "tools 7.2.2b (new, after \"A SpecTag that names no node\")",
  sidValue: S.outside,
  review: REVIEW("e"),
  dependsOn: [Q2],
  testsFrom: [
    "while the commit leaves the specification a draft reports an untagged symbol a commit leaves alone",
    "in draft mode reports a test carrying no SpecTag that a commit leaves alone",
  ],
  proposal: {
    title: "Code and tests outside the commit that carry no SpecTag",
    ruTitle: "Код и тесты без SpecTag за пределами коммита",
    titleChange: "Было «Код и тесты за пределами коммита без SpecTag»: «коммита без SpecTag» читалось как коммит без SpecTag (рецензент). Английское название — как было.",
    parts: [
      P("`sheriff binding` treats each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2) as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):",
        "`sheriff binding` обрабатывает каждое из следующего, что коммит оставляет неизменным (§s-2x58az67bm6cxq2), так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах без SpecTag (§s-5z5gnu7pahr82xp):",
        "Новое: узел реализует правило 9.5, которое вы согласовали 2026-11-17, и столбец «On failure» строк 10.1.26 и 10.1.26a. Прежде такой код сообщал узел «From a draft to an approved specification, and back», пока спецификация — черновик; правило 9.5 больше не зависит только от черновика. «Выдаёт предупреждение и отказ для каждого» читалось как предупреждение на каждый символ, а правило 9.5 даёт одно предупреждение на весь такой код (рецензент)."),
      L("in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§" + S.fileStart + ", §" + S.bindings + ") that no SpecTag binds (§s-9rtrj24myzjvshu);",
        "в коде системы (§s-hheus6f395ynqvc), кроме тестов, — символ (§s-kgbzk2ph9e6jfb4) или файл, который должен быть привязан целиком (§" + S.fileStart + ", §" + S.bindings + "), если его не привязывает ни один SpecTag (§s-9rtrj24myzjvshu);",
        "Новое (рецензент); тесты исключены, как в узле «SpecTags on the system's code other than tests». Ссылка на этот узел говорит, какие SpecTag ничего не привязывают: при ответе B на вопрос 2 неизменённый код с такими SpecTag обрабатывается здесь."),
      L("a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc), or whose SpecTag names a node that is not a rule (§s-utf4mbt7ref8g9c).",
        "тест кода системы, который не объявляет SpecTag (§s-zrsc6asgmhv8tnc) или SpecTag которого называет узел, не являющийся правилом (§s-utf4mbt7ref8g9c).",
        "Новое; правило 9.5 говорит о коде, включая тесты. Тест, SpecTag которого называет не правило, — при ответе B на вопрос 2."),
      P("`sheriff binding` takes the specification's approval status and its `strict` flag as the commit leaves them (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).",
        "Статус одобрения спецификации и её флаг `strict` `sheriff binding` берёт в том виде, в каком их оставляет коммит (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).",
        "Новое: как читаются статус и флаг. «Из последних записей в `sheriff.config.json`» убрано: это уже говорят правила 10.6 и 10.7 и узел «Project-wide settings». Что предупреждение и отказ называют `sheriff untagged`, уже говорит согласованный узел «The list of code that carries no SpecTag», и узел этого не повторяет (рецензент)."),
    ],
    reason: "The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal. The commit itself may change either of them.",
    ruReason: "Статус одобрения и флаг `strict` определяют, чего стоит коммиту код без SpecTag за пределами коммита: ничего, предупреждения или отказа. Сам коммит может изменить любой из них.",
    reasonChange: "Новое (рецензент): «такой код» указывал в текст, а второе предложение пересказывало второй абзац.",
    examples: [X(
      "A commit adds the entry that approves the specification while its `strict` flag is off, and old code elsewhere carries no SpecTag. The commit is judged against the specification as the commit leaves it, approved, so the commit passes with the warning. The most likely mistake is to judge the commit by the status before it, a draft, which lets the commit that approves the specification pass without the warning.",
      "Коммит добавляет запись, которая одобряет спецификацию, при выключенном флаге `strict`, а у старого кода в другом месте нет SpecTag. Коммит оценивается по спецификации в том виде, в каком он её оставляет, — одобренной, поэтому коммит проходит с предупреждением. Самая вероятная ошибка — оценивать коммит по статусу до него, черновику: тогда коммит, который одобряет спецификацию, проходит без предупреждения.")],
    refs: [R("implements", "s-kkbqcb9xrpaepwn"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", S.fileStart), R("cites", S.bindings), R("cites", "s-9rtrj24myzjvshu"), R("cites", "s-zrsc6asgmhv8tnc"), R("cites", "s-utf4mbt7ref8g9c"),
      R("cites", "s-qzthyh7yqvfhsa2"), R("cites", "s-q3pfzyaxvpr2zj2")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:171-173 and :190-197 report each such symbol and test while the specification is a draft and refuse them while it is approved. They are to pass silently while it is a draft, to give one warning for all of them while it is approved and the strict flag is off, naming sheriff untagged (s-weuyx98r7c923ab), and to refuse while the flag is on. Under answer B to Q2 the same holds for unchanged code whose SpecTags bind nothing and for an unchanged test whose SpecTag names no rule. The status and the flag are to be read from the entries in sheriff.config.json, not from the rule in project.json (binding.ts:138-162). The tests at binding.test.ts:444 and :574 are rewritten first for this node and carry " + S.outside + ".",
});

add("s-utf4mbt7ref8g9c", {
  location: "tools 7.2.4",
  sidValue: "s-utf4mbt7ref8g9c",
  review: REVIEW("e"),
  dependsOn: [Q2],
  testsFrom: [
    "s-utf4mbt7ref8g9c reads a test carrying a bare sid as carrying no SpecTag",
    "reads a sid a test carries bare, opening its name or as its mark, as no SpecTag",
    "refuses a test carrying no sid or the sid of no node",
    "refuses a test carrying the sid of a node that is neither a rule nor a term",
  ],
  proposal: {
    title: "The SpecTags the tests carry",
    ruTitle: "SpecTag, которые есть у тестов",
    parts: [
      P("`sheriff binding` refuses each of the following tests of the system's code (§s-hheus6f395ynqvc), whether the specification is approved or a draft:",
        "`sheriff binding` отвергает каждый из следующих тестов кода системы (§s-hheus6f395ynqvc) независимо от того, одобрена ли спецификация:",
        "Было: «`sheriff binding` читает каждый тест на SpecTag, который у него есть». Теперь узел начинается с того, что отвергается, и реализует строку 10.1.26a. Два абзаца стали одним абзацем со списком, а то, что проверка идёт и в черновике, сказано в первой фразе (рецензент)."),
      L("a test that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag (§s-5z5gnu7pahr82xp) in the place set for the test's language (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);",
        "тест, который коммит добавляет или меняет (§s-2x58az67bm6cxq2) и который не объявляет SpecTag (§s-5z5gnu7pahr82xp) в месте, установленном для языка этого теста (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);",
        "Было: «…там, где его ставит описание языка теста». Место для TypeScript, JavaScript и Python задаёт узел «How a test declares the rule it is written from», а описание языка говорит только, что считается тестом (рецензент)."),
      L("a test that the commit adds or changes and whose SpecTag names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp).",
        "тест, который коммит добавляет или меняет и SpecTag которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом (§s-5z5gnu7pahr82xp).",
        "Было: «SpecTag теста сверяется с правилами, терминами и узлами собственного NodeKind проекта». Термин больше не допускается: тест ссылается на правило (правило 1.4.2). Какие узлы — правила, говорит узел «The form of a SpecTag». SpecTag, sid которого не называет никакого узла, отвергает узел «A SpecTag that names no node». Что тест, который меняет коммит, называет одобренное правило, проверяет строка 10.1.28a (пункт 29). Только изменённый тест: неизменённый обрабатывает узел о коде и тестах за пределами коммита, при ответе B на вопрос 2."),
      P("Each refusal names the test, its file and its line.",
        "Каждый отказ называет тест, его файл и строку.",
        "Новое: что называет каждый отказ (рецензент)."),
      P("A test whose name or mark holds a bare sid (§s-gb8s9657a65hqmv) declares no SpecTag. The refusal of such a test names `sheriff reindex`, which writes the SpecTag.",
        "Тест, название или пометка которого содержит голый sid (§s-gb8s9657a65hqmv), не объявляет SpecTag. Отказ по такому тесту называет `sheriff reindex`, который записывает SpecTag.",
        "Как было. Убрано: тест, единственное изменение которого ставит `@spec ` перед голым sid, больше не считается неизменённым. По правилу 9.4 и вашему решению по нему от 2026-11-10 SpecTag должен оставаться тем же, а не только называть тот же узел."),
      P("`sheriff binding` reads the tests in each file that the glob patterns for tests in `sheriff.config.json` match, where a description covers the file's language (§" + S.symbol + "). For a test that the commit leaves unchanged and that declares no SpecTag, or whose SpecTag names a node that is not a rule, the check of code and tests outside the commit applies instead (§" + S.outside + ").",
        "`sheriff binding` читает тесты в каждом файле, которому соответствуют glob-шаблоны тестов в `sheriff.config.json`, если для языка файла есть описание (§" + S.symbol + "). Для теста, который коммит оставляет неизменным и который не объявляет SpecTag или SpecTag которого называет узел, не являющийся правилом, вместо этой проверки действует проверка кода и тестов за пределами коммита (§" + S.outside + ").",
        "Было: пока коммит оставляет спецификацию черновиком, тест без SpecTag, который коммит не меняет, сообщается, а не отвергается. Теперь такой тест обрабатывает узел о коде и тестах за пределами коммита, по правилу 9.5, а при ответе B на вопрос 2 — и тест, SpecTag которого называет не правило. Убраны два последних пункта о тестах собственных проверок и генераторов проекта: по вашему решению по правилу 10.10 от 2026-11-13 эти требования сняты. Пункт о SpecTag изменённых символов перенесён в узел «A test for each rule whose code a commit changes». Русский текст поправлен: «если язык файла охватывает описание» читалось наоборот (рецензент)."),
    ],
    reason: "A test counts toward the rule that its SpecTag names when the SpecSheriff tools judge whether that rule is implemented (§s-6fw72j65jkqrfpf). A test with no SpecTag, or with one that names a section or a term, counts toward no rule.",
    ruReason: "Тест засчитывается правилу, которое называет его SpecTag, когда инструменты SpecSheriff решают, реализовано ли это правило (§s-6fw72j65jkqrfpf). Тест без SpecTag или с SpecTag, который называет раздел или термин, не засчитывается ни одному правилу.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A commit adds a test that opens its name with `@spec s-…`, where the sid is that of the term `request`. `sheriff binding` refuses the test, since a term is not a rule. The most likely mistake is to accept the test because the term exists.",
      "Коммит добавляет тест, название которого начинается с `@spec s-…`, где sid — sid термина `request`. `sheriff binding` отвергает тест, потому что термин — не правило. Самая вероятная ошибка — принять тест, потому что термин существует.")],
    refs: [R("implements", "s-ay6wntm2dxcgpnp"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-zrsc6asgmhv8tnc"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-gb8s9657a65hqmv"), R("cites", S.symbol), R("cites", S.outside),
      R("cites", "s-6fw72j65jkqrfpf")],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.26a (s-ay6wntm2dxcgpnp).",
      "The `implements` link to “Where a SpecTag may appear” (s-sfjka4zc4rhfu67) and the two items on the tests of a project's own checks and generators: the owner removed those requirements on 2026-11-13, and that rule no longer requires them.",
      "The `implements` link to “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): the lists are checked by “A node's `meta.code` and `meta.tests`” (s-t383grkn3q68dpf), item 30.",
      "The `implements` link to “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) and the citation of “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): a test outside the commit is handled by " + S.outside + ".",
      "The citations of “The test comes before the code” (s-rah8b37kytb682y) and “The commands” (s-f5rz6b7dhxejjts), with the item that exempted a test whose only change puts `@spec ` before a bare sid: under rule 9.4 (s-9j2mmnuuwmx5ksn) such a change is a change to the test.",
      "The item on the SpecTags of the changed symbols looked up among the tests: it is row 10.1.31, which “A test for each rule whose code a commit changes” (" + S.ruleTest + ") implements.",
      "“That of a test whose text the commit changes is resolved against the approved ones”: it is row 10.1.28a (s-wpadgy2budcxa3v), item 29.",
      "The name NodeKind, which the owner removed on 2026-11-10 (s-vsh384ybt4w25a2).",
    ],
    date: DATE,
  },
  stage3: "binding.ts:202 accepts a test naming a term and refuses one naming a TableRule or a RecordType; it is to accept only the kinds listed in s-5z5gnu7pahr82xp, and to refuse only a test that the commit adds or changes (answer B to Q2), leaving an unchanged one to " + S.outside + ". binding.ts:42-51 (testLines) and code.ts:277 (onlySpecTagged) are to stop counting a test whose only change puts `@spec ` before a bare sid as unchanged (s-9j2mmnuuwmx5ksn), and binding.test.ts:561 is rewritten first. binding.ts:363-384 (projectToolTests) is removed with binding.test.ts:426, since the ruling of 2026-11-13 on s-sfjka4zc4rhfu67 removed those requirements. binding.ts:190-197 (the draft report) moves to " + S.outside + ". The tests at binding.test.ts:101, :253 and :554 and code.test.ts:56 carry s-utf4mbt7ref8g9c, the first two rewritten for the kinds of this node.",
});

add("new:tools-7-2-rule-test", {
  from: "s-utf4mbt7ref8g9c",
  location: "tools 7.2.4a (new, after \"The SpecTags the tests carry\")",
  sidValue: S.ruleTest,
  review: REVIEW("e"),
  testsFrom: ["refuses a rule whose code a commit adds or changes with no test carrying its sid"],
  proposal: {
    title: "A test for each rule whose code a commit changes",
    ruTitle: "Тест для каждого правила, код которого меняет коммит",
    parts: [
      P("`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-m82tz4mp3f9r3fg). It takes the tests as the commit leaves them. It refuses any commit that does not meet this condition, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
        "`sheriff binding` принимает коммит, который добавляет или меняет код, привязанный к правилу (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), только если какой-либо тест кода системы (§s-hheus6f395ynqvc) объявляет SpecTag этого правила (§s-m82tz4mp3f9r3fg). Тесты он берёт в том виде, в каком их оставляет коммит. Любой коммит, который этому условию не отвечает, он отклоняет, называя правило по его файлу, sid и расположению (§s-kag2m9tzdnduxdx).",
        "Новое: узел вынесен из «The SpecTags the tests carry» и реализует строку 10.1.31. Что называет отказ — новое. Ссылка на правило 1.5.2 при первом упоминании привязки (рецензент)."),
      P("In this check, the code is each symbol (§s-kgbzk2ph9e6jfb4) and each file bound as a whole (§" + S.fileStart + ", §" + S.bindings + ") that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests. A rule is bound to such code where one of the code's SpecTags names the rule.",
        "Код здесь — это каждый символ (§s-kgbzk2ph9e6jfb4) и каждый файл, привязанный целиком (§" + S.fileStart + ", §" + S.bindings + "), которые коммит добавляет или меняет (§s-2x58az67bm6cxq2), кроме тестов. Правило привязано к такому коду, если его называет один из SpecTag этого кода.",
        "Новое в тексте; так делает код (binding.ts:181 и :210-212). Файлы, привязанные целиком, — новое, по правилу 1.5.2. Ссылки при первом упоминании; русское придаточное больше не относится к тестам (рецензент)."),
      P("In this check, a test counts whether or not the commit changes it. A test marked as skipped or as expected to fail counts too. `sheriff binding` runs this check whether the specification is approved or a draft.",
        "Тест здесь засчитывается, меняет ли его коммит или нет. Тест, помеченный как пропускаемый или как ожидаемо падающий, тоже засчитывается. `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик.",
        "Новое в тексте. Строка 10.1.31 требует только, чтобы был тест с SpecTag правила; пропущенный тест и тест, который ожидаемо падает, учитывает строка 10.1.41, которая называет их вместе (рецензент)."),
    ],
    reason: "A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.",
    ruReason: "Тест правила пишется раньше его кода (§s-rah8b37kytb682y). Поэтому код, добавленный или изменённый для правила, которое не называет ни один тест, написан раньше теста этого правила или без него.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, in which case `sheriff binding` refuses a commit whose test was committed earlier.",
      "Коммит добавляет функцию, SpecTag которой называет правило, и ни один тест в репозитории не объявляет SpecTag этого правила. `sheriff binding` отклоняет коммит и называет правило. Самая вероятная ошибка — искать тест только среди тестов, которые меняет коммит: тогда отклоняется коммит, тест которого был закоммичен раньше.")],
    refs: [R("implements", "s-m82tz4mp3f9r3fg"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", S.fileStart), R("cites", S.bindings), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-rah8b37kytb682y")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:181 counts a changed symbol's SpecTag only for a TextRule or a project's own kind that needs code (coded). It is to count every kind listed in s-5z5gnu7pahr82xp, files bound as a whole and the entries of the bindings file; binding.ts:210-212 then refuses as now, a skipped test or one expected to fail counting. The test at binding.test.ts:116 is to carry " + S.ruleTest + ".",
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal for rule 10.4 (s-nyh9yk22ba6g77q), which carries out rules 1.6.1 and 9.1 and the agreed reason of 10.4
// (the coordinator's ruling on review-g2-a.md), and the proposal for rule 1.6.1 (s-m4h279nbaqkpa3t), which Q1 asks for.
// ---------------------------------------------------------------------------------------------------------------
add("proposal:s-nyh9yk22ba6g77q", {
  question: "None: carries out rules 1.6.1 and 9.1 and the agreed reason of 10.4, shown to the owner as a proposal (the coordinator's ruling on review-g2-a.md)",
  review: REVIEW("a"),
  location: "spec 10.4",
  sidValue: "s-nyh9yk22ba6g77q",
  proposal: {
    title: "What the reviewer is given",
    ruTitle: "Что получает рецензент",
    parts: [
      P("The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:",
        "Инструменты SpecSheriff передают независимому рецензенту (§s-m4h279nbaqkpa3t) коммита следующее:",
        "Как в согласованной формулировке; добавлена ссылка на правило 1.6.1 при первом упоминании независимого рецензента (правило 7.2.7)."),
      L("the commit's message;", "сообщение коммита;", "Как в согласованной формулировке."),
      L("the commit's change, excluding the files generated from the specification;", "изменение коммита, кроме файлов, сгенерированных из спецификации;", "Как в согласованной формулировке; английский текст поправлен, смысл тот же."),
      L("the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;",
        "формулировку каждого правила или термина (§s-khqsmy6mhejkrhg), которые называет сообщение коммита;",
        "Как в согласованной формулировке; добавлена ссылка на правило 3.3 при первом упоминании термина (правило 7.2.7)."),
      L("the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes;",
        "формулировку каждого правила, которое SpecTag (§s-8xw4mgvpexyvw5q) привязывает к коду или тесту, добавленному или изменённому коммитом;",
        "Было: «…привязывает код, добавленный или изменённый коммитом, не считая тестов». По правилу 9.1 тесты входят в код системы, и правило 1.6.1 велит рецензенту судить, делает ли изменённый код то, что говорят правила, названные в коммите. Чтобы судить изменённый тест, рецензенту нужна формулировка правила, которое называет SpecTag теста. Пока спецификация одобрена, это правило рецензент и так получает: по строке 10.1.40 при изменении тестов правила меняется и его код, или сообщение утверждает, что реализацию менять не нужно. Лишняя стоимость возникает только, пока спецификация — черновик. Изменение выполняет правила 1.6.1 и 9.1 и согласованное обоснование самого правила 10.4: рецензенту показывают то, что нужно для каждого суждения."),
      L("for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;",
        "для каждого правила, реализация которого, согласно сообщению коммита, не требует изменений: формулировку правила в том виде, в каком она была до коммита и в каком стала после него, а также тесты и код, привязанные к правилу напрямую или через цепочку связей `implements` (§s-sn6au3vcr9uy5pm), в том виде, в каком они стали после коммита;",
        "Как в согласованной формулировке; ссылка на правило 6.1 перенесена сюда, к первому упоминанию связи `implements` (правило 7.2.7)."),
      L("for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):",
        "для каждого узла технического приложения (§s-qmmzf9nksfsa3qp), который одобрен в коммите и имеет связь `implements` с правилом базовой спецификации (§s-5x737t9nee4zgaa):",
        "Как в согласованной формулировке; добавлена ссылка на правило 1.1.4 при первом упоминании базовой спецификации (правило 7.2.7)."),
      L2("the node's wording;", "формулировку узла;", "Как в согласованной формулировке."),
      L2("the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.",
        "формулировку каждого правила базовой спецификации, которое узел реализует, которое связано с таким правилом связью в любую сторону или которое входит в тот же раздел верхнего уровня базовой спецификации, что и такое правило.",
        "Как в согласованной формулировке."),
      P("In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).",
        "Формулировка узла здесь — его заголовок, текст, обоснование, примеры и поля, которые добавляет его тип, как их покрывает одобрение (§s-5ah25f6gy99panq).",
        "Как в согласованной формулировке; английский текст поправлен, смысл тот же."),
      P("The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.",
        "Ничего из сессии, в которой было сделано изменение, инструменты SpecSheriff рецензенту не передают. О каждом файле, не вошедшем в изменение, они сообщают рецензенту, что он сгенерирован из спецификации. То, что правило требует от сгенерированного кода, рецензент считает выполненным этим кодом.",
        "Как в согласованной формулировке."),
    ],
    reason: "The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.",
    ruReason: "Рецензент выносит суждения, которых не может вынести ни одна детерминированная проверка: делает ли код только то, что говорят его правила; действительно ли реализацию правила не нужно менять; согласуется ли одобренный узел технического приложения с базовой спецификацией. Решать он может только по тому, что ему показали. Получив то, что нужно для каждого суждения, и ничего о намерениях автора изменения, он судит только по правилам.",
    reasonChange: "Как в согласованной формулировке.",
    refs: [R("refines", "s-jau82aq9juv9zzh"), R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-khqsmy6mhejkrhg"), R("cites", "s-8xw4mgvpexyvw5q"),
      R("cites", "s-sn6au3vcr9uy5pm"), R("cites", "s-qmmzf9nksfsa3qp"), R("cites", "s-5x737t9nee4zgaa"), R("cites", "s-5ah25f6gy99panq"),
      R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-km4x4s26kv7pjze")],
    citedInDecisions: ["s-vsh384ybt4w25a2", "s-km4x4s26kv7pjze"],
    removed: [],
    date: DATE,
  },
});

add("proposal:s-m4h279nbaqkpa3t", {
  question: Q1,
  location: "spec 1.6.1",
  sidValue: "s-m4h279nbaqkpa3t",
  review: "None yet: written in round b for the recommended answer A to Q1 (review-g2-a.md, Q2); the agent's own assessment, a reviewer to confirm",
  dependsOn: [Q1],
  proposal: (() => {
    const nf = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"))["1.6.1"];
    const oldEn = "- on a commit whose message states that a rule's implementation needs no change: whether that statement is true;";
    const oldRu = "- при коммите, в сообщении которого сказано, что реализацию правила менять не нужно, — верно ли это утверждение;";
    const newEn = "- on a commit whose message states that a rule's implementation needs no change, while the specification is approved (§s-qzthyh7yqvfhsa2): whether that statement is true;";
    const newRu = "- при коммите, в сообщении которого сказано, что реализацию правила менять не нужно, пока спецификация одобрена (§s-qzthyh7yqvfhsa2), — верно ли это утверждение;";
    if (!nf.text.includes(oldEn) || !nf.ruText.includes(oldRu)) throw new Error("1.6.1: the agreed item is not where it was");
    // The parts: one per paragraph or list item of the agreed text, so that render() gives it back unchanged.
    const split = (s) => s.split("\n").filter((l) => l !== "");
    const en = split(nf.text.replace(oldEn, newEn));
    const ru = split(nf.ruText.replace(oldRu, newRu));
    if (en.length !== ru.length) throw new Error("1.6.1: the English and the Russian differ in their parts");
    const CHANGE = "Было: «при коммите, в сообщении которого сказано, что реализацию правила менять не нужно, — верно ли это утверждение». Добавлено «пока спецификация одобрена» — ответ A на вопрос 1. Пока спецификация — черновик, строка 10.1.43a проходит молча, как и строка 10.1.40, которую такое утверждение заменяет. Суждение тогда ничего не решает, а тот, кто делает коммит, платит за него, и по правилу 10.5 коммит отклоняется, если рецензент недоступен. Правило 10.2 ссылается на этот список и меняется вместе с ним. Тот же пункт принципа «Deterministic checks hold every participant to the contract» в docs/principles.md получает те же слова.";
    const parts = en.map((x, i) => {
      const li = x.startsWith("- ");
      const strip = (y) => (li ? y.slice(2) : y);
      return { kind: li ? "li" : "p", en: strip(x), ru: strip(ru[i]), change: x === newEn ? CHANGE : "Как в согласованной формулировке." };
    });
    return {
      title: nf.title, ruTitle: nf.ruTitle, parts,
      reason: nf.reason, ruReason: nf.ruReason, reasonChange: "Как в согласованной формулировке.",
      examples: nf.examples.map((x, i) => X(x, nf.ruExamples[i])),
      refs: [...nf.cites.map((to) => R("cites", to)), R("cites", "s-qzthyh7yqvfhsa2")],
      removed: [],
      date: DATE,
    };
  })(),
});

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// Every sid in specs/, in moved/ and in the drafts as they were before this script.
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
// The drafts before group 2 was first written, since the drafts after round a already hold the group's new sids.
for (const m of fs.readFileSync(new URL("tools-drafts.before-group2.json", here), "utf8").matchAll(sidRe)) known.add(m[0]);
for (const [name, sid] of Object.entries(SID)) if (known.has(sid)) problems.push(`new sid ${sid} (${name}) is already in use`);
if (new Set(Object.values(SID)).size !== Object.values(SID).length) problems.push("two new nodes share a sid");

// The nodes a link may point at: the new form, the appendix of the tools, the sids the drafts give.
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNode = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") (targets.add(n.sid), into?.set(n.sid, n));
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNode);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const sid of Object.values(SID)) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  if (p.list?.membersFrom) {
    const from = toolsNode.get(p.list.membersFrom);
    if (!from?.list) problems.push(`${key}: ${p.list.membersFrom} holds no list`);
    else p.list.members = from.list.members;
    delete p.list.membersFrom;
  }
  const en = [p.title, p.text, p.reason, p.list?.of, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, p.list?.ruOf, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    linked.set(r.to, r.type);
  }
  const inDecisions = new Set(p.citedInDecisions || []);
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !inDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (e.kind !== "section" && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  for (const sentence of [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}
// The phrases the agreed drafts avoid.
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /held to/, /sign-in\b/, /person who commits/, /makes? (this|a|the) check/, /asks? for (the|no) model/]) {
    if (bad.test(en)) problems.push(`${key}: the English holds ${bad}`);
  }
  if (/несёт|несут|несущ/.test([p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n"))) problems.push(`${key}: the Russian says «несёт»`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

// Each node's «Оценка» from its review, as group2-assessments.json holds it.
const assessments = JSON.parse(fs.readFileSync(new URL("group2-assessments.json", here), "utf8"));
const CRITERIA = ["согласованность", "целостность", "целесообразность", "избыточность", "недостаточность"];
for (const key of Object.keys(entries)) {
  const a = assessments[key];
  if (!a) { problems.push(`${key}: no «Оценка» in group2-assessments.json`); continue; }
  for (const c of CRITERIA) if (typeof a.lines?.[c] !== "string") problems.push(`${key}: the «Оценка» lacks ${c}`);
  entries[key].assessment = { source: a.source, verdict: a.verdict, lines: a.lines, note: a.note ?? "" };
}
for (const key of Object.keys(assessments)) if (!entries[key]) problems.push(`group2-assessments.json names ${key}, which is no draft of the group`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group2.md: the English of every node of the group, for EngStickler's readers.
const englishOf = (p) => {
  const out = [`**Title:** ${p.title}`, "", "**Text:**", "", p.text, ""];
  if (p.reason) out.push("**Reason:**", "", p.reason, "");
  if (p.list) out.push("**List of:**", "", p.list.of, "");
  for (const [i, x] of (p.examples || []).entries()) out.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
  return out;
};
const md = [
  "# T25, group 2: the English of every node",
  "",
  "This file holds the final English of every node of group 2 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group2-b.mjs (round b): the drafts of the appendix of the tools and the proposals for rules 10.4 and 1.6.1.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its list and its examples.",
  "fix-group2-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) md.push(`## ${key} — ${e.proposal.title}`, "", ...englishOf(e.proposal));
fs.writeFileSync(new URL("english-group2.md", here), md.join("\n"));

// english-group2-changed.md: each sentence of round b that is neither in the node's English after round a, with only
// the coordinator's rulings on recurring phrases applied to it, nor a review's own wording.
const RULINGS = [
  [/held to (that|the) schema/g, "that conforms to $1 schema"], [/\bsign-in\b/g, "credentials"], [/the person who commits/g, "the user who commits"],
  [/\bmakes this check\b/g, "runs this check"], [/\basks for (the|a|no) model\b/g, "requests $1 model"], [/\bask for (the|a|no) model\b/g, "request $1 model"],
];
const norm = (s) => s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
const sentences = (s) => (s || "").split("\n").map((l) => l.replace(/^\s*-\s+/, "")).flatMap((l) => l.split(/(?<=[.;:])\s+(?=[`A-Z“"(])/)).map(norm).filter(Boolean);
const englishText = (p) => p ? [p.title, p.text, p.reason, p.list?.of, ...(p.examples || []).map((x) => (typeof x === "string" ? x : x.en))].filter(Boolean).join("\n") : "";
// A proposal that round a did not write is compared with the agreed node in newform.json.
const newform = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const earlier = (key, e) => before[key]?.proposal ?? Object.values(newform).find((n) => n.sidValue === e.sidValue);
const reviews = norm(["a", "b", "c", "d", "e"].map((l) => fs.readFileSync(new URL(`review-g2-${l}.md`, here), "utf8")).join("\n")
  .split("\n").map((l) => l.replace(/^\s*>\s?/, "").replace(/^\s*-\s+/, "")).join(" "));
const changedMd = [
  "# T25, group 2, round b: the sentences written in the author's own words",
  "",
  "Each sentence below is in the English of a node after round b, is not in that node's English after round a (with only the coordinator's rulings on recurring phrases applied), and is not word for word in any of review-g2-a.md to review-g2-e.md. So it is the author's own wording: a fix from EngStickler's readers, a fix made to carry out a ruling, or a fix that a review described without giving its English. The proposal for rule 1.6.1 is compared with the agreed node in newform.json. fix-group2-b.mjs writes this file.",
  "",
];
const ownKeys = [];
for (const [key, e] of Object.entries(entries)) {
  const old = new Set(sentences(englishText(earlier(key, e))).map((s) => RULINGS.reduce((x, [a, b]) => x.replace(a, b), s)));
  const own = sentences(englishText(e.proposal)).filter((s) => !old.has(s) && !reviews.includes(s.replace(/;$/, "")) && !reviews.includes(s));
  if (!own.length) continue;
  ownKeys.push(key);
  changedMd.push(`## ${key} — ${e.proposal.title}`, "", ...own.map((s) => `- ${s}`), "");
}
fs.writeFileSync(new URL("english-group2-changed.md", here), changedMd.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
console.log(`\nnodes with sentences in the author's own words (english-group2-changed.md): ${ownKeys.join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
