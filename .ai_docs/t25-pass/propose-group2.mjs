// T25, stage 2, group 2: drafts the new wordings of the nodes of items 20 to 26 of the order in stage2-inventory.md:
// the review of a commit and who runs the reviewer, the SpecTag and how code and tests carry it, the SpecTags on the
// system's code and on the tests, and the bindings file. They implement rows 10.1.25a, 10.1.26, 10.1.26a, 10.1.26b,
// 10.1.28, 10.1.31, 10.1.43 and 10.1.43a of the main table of checks. Copies tools-drafts.json to
// tools-drafts.before-group2.json first, checks every draft (citations against links, the Russian citing the same sids,
// no citation by location outside backticks, new sids unique, link targets existing), and only then writes. It also
// writes english-group2.md, the English of every node of the group, for EngStickler's readers. It touches no other file.
// Run again, it rebuilds the keys of this group from the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group2.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";

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
      P("On such a commit, `sheriff review` gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which it leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). It names to the reviewer each of those files that the commit changes.",
        "Для такого коммита `sheriff review` передаёт рецензенту всё, что для этого коммита перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q). Файлы, сгенерированные из спецификации, которые он исключает из изменения коммита, — это файлы, которые записывает `sheriff types` (§s-a8fn72xa782wvbk). Каждый из этих файлов, который коммит меняет, он называет рецензенту.",
        "Было: список того, что получает runner. Что получает рецензент, теперь перечисляет согласованное правило 10.4, и узел его не повторяет. Остаётся то, что добавляет описание инструментов: какие файлы считаются сгенерированными. Раньше код исключал только файлы типов и RuntimeCheck; теперь исключаются все файлы, которые пишет `sheriff types`, в том числе файлы собственных генераторов проекта (согласованный узел «What `sheriff types` generates»). Каждый изменённый символ целиком и критерии отказа перенесены в узел о суждении о коде."),
    ],
    reason: "Each run of the reviewer costs the person who commits (§" + S.settings + "), so `sheriff review` runs it only on a commit for which a judgement is due.",
    ruReason: "Каждый запуск рецензента оплачивает тот, кто делает коммит (§" + S.settings + "), поэтому `sheriff review` запускает его только для коммита, по которому нужно суждение.",
    reasonChange: "Было: обоснование о SpecTag и о том, почему символ судится целиком. Оно относится к суждению о коде и перенесено в его узел. Новое обоснование говорит, почему ревью идёт только там, где нужно суждение.",
    examples: [X(
      "A commit changes only the wording of a draft rule. It changes no code, holds no statement that a rule's implementation needs no change, and approves no node. So `sheriff review` runs no reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the person who commits pay for a run that has nothing to judge.",
      "Коммит меняет только формулировку правила-черновика. Он не меняет кода, не содержит утверждения, что реализацию правила менять не нужно, и не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить.")],
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
  testsFrom: [
    "gives the runner the nodes with their reasons and each changed symbol whole with the tags that bind it",
    "gives the runner only the symbols of the system's code, telling a symbol with no tag from one whose tag names no node",
  ],
  dependsOn: ["proposal:s-nyh9yk22ba6g77q"],
  proposal: {
    title: "The judgement on the code that a commit changes",
    ruTitle: "Суждение о коде, который меняет коммит",
    parts: [
      P("`sheriff review` refuses a commit in which the reviewer finds that the changed code does something that its rules do not say, or leaves out something that they require (§s-zn4vrdpnv9bch62). Each finding names the rule, the file and the line.",
        "`sheriff review` отклоняет коммит, если рецензент находит, что изменённый код делает то, чего не говорят его правила, или упускает то, чего они требуют (§s-zn4vrdpnv9bch62). Каждое замечание называет правило, файл и строку.",
        "Новое: узел вынесен из «The review of a commit» и реализует строку 10.1.43. Отказ называет правило и строку, как требует столбец «On failure» этой строки."),
      P("The reviewer makes this judgement on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what every review gives (§s-vp24dqydygztqbt), `sheriff review` gives the reviewer the changed code. That is each of the following, whole as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:",
        "Рецензент выносит это суждение при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты. Помимо того, что получает каждое ревью (§s-vp24dqydygztqbt), `sheriff review` передаёт рецензенту изменённый код. Это каждое из следующего целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag (§s-8xw4mgvpexyvw5q), которые его привязывают:",
        "Было: «каждый символ кода системы вне его тестов, который меняет коммит». По правилу 9.1 тесты входят в код системы, поэтому рецензент судит и изменённые тесты, как говорит todo строки 10.1.43. Слова «вне его тестов» убраны, как вы просили 2026-11-20."),
      L("each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);",
        "каждый символ (§s-kgbzk2ph9e6jfb4), код которого коммит добавляет или меняет (§s-2x58az67bm6cxq2);",
        AS_WAS),
      L("each file bound as a whole that the commit adds or changes;",
        "каждый файл, привязанный целиком, который коммит добавляет или меняет;",
        "Новое: по правилу 1.5.2 код привязывается и файлом целиком, и изменение в любом месте такого файла — изменение кода, который привязывают его SpecTag."),
      L("each test that the commit adds or changes, together with the wording (§s-nyh9yk22ba6g77q) of the rule that its SpecTag names.",
        "каждый тест, который коммит добавляет или меняет, вместе с формулировкой (§s-nyh9yk22ba6g77q) правила, которое называет его SpecTag.",
        "Новое: изменённый тест вместе с формулировкой его правила. Правило 10.4 сейчас не передаёт правило, к которому привязаны только тесты («не считая тестов»). Этот пункт опирается на предложение по правилу 10.4 — см. вопрос 1."),
      P("The reviewer refuses the commit where any of the following holds:",
        "Рецензент отклоняет коммит, если выполнено что-либо из следующего:",
        "Было два списка: для коммита и для изменённого символа. Теперь один список, потому что код судится по правилам, которые называют его SpecTag."),
      L("a changed symbol or file does something, or a changed test checks something, that no rule its SpecTags name states;",
        "изменённый символ или файл делает, или изменённый тест проверяет, то, чего не утверждает ни одно правило, которое называют его SpecTag;",
        "Было: «изменённый символ делает то, чего не утверждает ни один узел, который называют его SpecTag». Добавлены файлы и тесты."),
      L("the changed code other than tests leaves out something required by a rule that the commit's message or a SpecTag on that code names;",
        "изменённый код помимо тестов упускает то, чего требует правило, которое называет сообщение коммита или SpecTag на этом коде;",
        "Было: «код упускает то, чего требует названный узел»."),
      L("a changed symbol or file carries a SpecTag naming a rule that it does not implement;",
        "у изменённого символа или файла есть SpecTag, который называет правило, которое он не реализует;",
        "Как было; добавлены файлы."),
      L("a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t).",
        "у изменённого символа или файла есть `@spec none` (§s-5z5gnu7pahr82xp), но он реализует логику системы (§s-2jcmb9xe9d64t2t).",
        "Было: «SpecTag, который не называет узла, при том что символ реализует логику системы». SpecTag назван своей формой `@spec none`; что такое логика системы и технический код, определяет правило 1.2.7."),
      P("A finding on code that carries `@spec none` but implements the system's logic names as its rule the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4).",
        "Замечание о коде, у которого есть `@spec none`, но который реализует логику системы, называет своим правилом правило о том, как код привязывается к своим правилам (§s-kgbzk2ph9e6jfb4).",
        "Было: «Замечание последнего вида называет своим узлом правило, что у каждого символа есть SpecTag». Теперь замечание названо прямо, а не «последним видом» из другого абзаца."),
    ],
    reason: "A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be told only by reading it.",
    ruReason: "SpecTag показывает только, какое правило должен реализовывать код. Делает ли код только то, что говорит это правило, в том числе в неизменённых строках рядом с изменением, можно узнать, только прочитав его.",
    reasonChange: "Из обоснования прежнего узла: проверки видят, что SpecTag называет существующий узел, но не что символ делает сказанное узлом, и поэтому символ судится целиком. Сокращено до одной мысли.",
    examples: [X(
      "A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names states the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email passes.",
      "Коммит меняет одну строку функции `close`, SpecTag которой называет правило: счёт можно закрыть, только если его баланс равен нулю. Неизменённая строка той же функции ещё и отправляет владельцу счёта письмо. Рецензент получает функцию целиком и находит, что письма не утверждает ни одно правило, которое называет её SpecTag. `sheriff review` отклоняет коммит, называя правило и эту строку. Самая вероятная ошибка — передать рецензенту только изменённую строку: тогда письмо проходит.")],
    refs: [R("implements", "s-zn4vrdpnv9bch62"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-vp24dqydygztqbt"), R("cites", "s-8xw4mgvpexyvw5q"),
      R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-nyh9yk22ba6g77q"), R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-2jcmb9xe9d64t2t")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:83-90 gives the runner only the changed symbols of files read as code. It is to give also each changed file bound as a whole and each changed test, whole, with its file, its lines and its SpecTag, and the wording of the rule that the SpecTag of a changed test names (option A of Q1). review.ts:52-65 (SYSTEM_PROMPT) is to name the refusals of this node, a changed test included, and to call the SpecTag that names no node `@spec none`. The tests at gates.test.ts:384 and :397 are to carry " + S.reviewCode + ", and the test at :397 is to expect the changed tests in the input.",
});

add("new:tools-7-3-review-statement", {
  from: "s-vp24dqydygztqbt",
  location: "tools 7.3.4b (new, after \"The judgement on the code that a commit changes\")",
  sidValue: S.reviewStatement,
  testsFrom: ["match no test"],
  proposal: {
    title: "The judgement on a statement that a rule's implementation needs no change",
    ruTitle: "Суждение об утверждении, что реализацию правила менять не нужно",
    parts: [
      P("`sheriff review` refuses a commit whose message, in the reviewer's judgement, falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule. `sheriff review` refuses such a commit only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2). Where the commit leaves it a draft, the commit passes this check silently.",
        "`sheriff review` отклоняет коммит, в сообщении которого, по суждению рецензента, ложно сказано, что реализацию правила менять не нужно (§s-nudrdn5xvcg262k). Каждое замечание называет правило. `sheriff review` отклоняет такой коммит, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2). Если коммит оставляет её черновиком, коммит проходит эту проверку молча.",
        "Новое: узел реализует строку 10.1.43a. Отказ — как в её столбце «On failure»: коммит отклоняется с названием правила, пока спецификация одобрена, и проходит, пока она черновик. «Молча» — по вашему решению по этой строке от 2026-11-20: пока спецификация — черновик, каждая проверка полноты реализации молчит."),
      P("A commit's message makes such a statement by a trailer (§" + S.trailer + "). The reviewer makes this judgement for each rule that such a trailer names, whatever the specification's approval status.",
        "Сообщение коммита делает такое утверждение с помощью trailer (§" + S.trailer + "). Рецензент выносит это суждение для каждого правила, которое называет такой trailer, каков бы ни был статус одобрения спецификации.",
        "Новое. Что суждение выносится и тогда, когда спецификация — черновик, следует из правил 1.6.1 и 10.2: список суждений в 1.6.1 называет его для каждого коммита с таким утверждением, а ревью выносит каждое суждение, которое называет этот список."),
      P("For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule as the commit leaves them, each whole, with its file, its lines and its SpecTags. They are the tests and the code whose SpecTags name the rule, or name a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the rule, directly or through a chain of such links (§s-6fw72j65jkqrfpf).",
        "Для каждого такого правила `sheriff review` передаёт рецензенту тесты и код, привязанные к правилу, в том виде, в каком их оставляет коммит, каждый целиком, с его файлом, строками и SpecTag. Это тесты и код, SpecTag которых называют правило или узел, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом, напрямую или через цепочку таких связей (§s-6fw72j65jkqrfpf).",
        "Новое. Что получает рецензент для такого правила, перечисляет правило 10.4; узел добавляет, как инструменты находят эти тесты и код и что каждый передаётся целиком, как при суждении о коде."),
    ],
    reason: "Whether a rule's tests and code still fit its new wording depends on what the wording changed, and on all of them, including those that the commit leaves as they were.",
    ruReason: "Подходят ли тесты и код правила к его новой формулировке, зависит от того, что в формулировке изменилось, и от всех этих тестов и кода, в том числе тех, которые коммит оставляет как были.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit corrects a misspelt word in the text of an approved rule and changes none of its tests or code. Its message ends with the trailer `Implementation-Needs-No-Change: s-…`, which names the rule. The reviewer is given both wordings of the rule, its tests and its code, and finds that they do what the new wording says. The commit passes. The most likely mistake is to give the reviewer only the code that the commit changes, which here is none, so that the statement is judged against nothing.",
      "Коммит исправляет опечатку в тексте одобренного правила и не меняет ни его тестов, ни кода. Его сообщение заканчивается trailer `Implementation-Needs-No-Change: s-…`, который называет это правило. Рецензент получает обе формулировки правила, его тесты и код и находит, что они делают то, что говорит новая формулировка. Коммит проходит. Самая вероятная ошибка — передать рецензенту только код, который меняет коммит, а здесь его нет: тогда утверждение не с чем сверить.")],
    refs: [R("implements", "s-nudrdn5xvcg262k"), R("cites", "s-qzthyh7yqvfhsa2"), R("cites", S.trailer), R("cites", "s-sn6au3vcr9uy5pm"), R("cites", "s-6fw72j65jkqrfpf")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts makes no judgement on such a statement. reviewInput is to give, for each rule that an `Implementation-Needs-No-Change` trailer names, the rule's wording before and after the commit and every test and piece of code bound to the rule, directly or through implements links, whole as the commit leaves them. SYSTEM_PROMPT is to ask for the judgement, and review() is to drop its findings where the commit leaves the specification a draft. Its tests are written first.",
});

add("new:tools-7-3-review-appendix", {
  from: "s-vp24dqydygztqbt",
  location: "tools 7.3.4c (new, after \"The judgement on a statement that a rule's implementation needs no change\")",
  sidValue: S.reviewAppendix,
  testsFrom: ["match no test"],
  proposal: {
    title: "The judgement on an approved node of the technical appendix",
    ruTitle: "Суждение об одобренном узле технического приложения",
    parts: [
      P("`sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the reviewer finds any of the following in that node (§s-4p9amamvp2bry7b):",
        "`sheriff review` отклоняет коммит, который одобряет узел технического приложения (§s-tj38pvm38nepaf5), если рецензент находит в этом узле что-либо из следующего (§s-4p9amamvp2bry7b):",
        "Новое: узел реализует строку 10.1.25a."),
      L("it contradicts a rule of the base specification (§s-5x737t9nee4zgaa);",
        "он противоречит правилу базовой спецификации (§s-5x737t9nee4zgaa);",
        "Новое, как в строке 10.1.25a."),
      L("it implements a rule of the base specification without refining it.",
        "он реализует правило базовой спецификации, не уточняя его.",
        "Новое, как в строке 10.1.25a."),
      P("Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses such a commit whatever the specification's approval status (§s-qzthyh7yqvfhsa2).",
        "Каждое замечание называет узел и правило базовой спецификации, которого оно касается. `sheriff review` отклоняет такой коммит, каков бы ни был статус одобрения спецификации (§s-qzthyh7yqvfhsa2).",
        "Новое. Отказ называет узел и правило, как требует столбец «On failure». Отказ при любом статусе — по вашему решению по строке 10.1.25a от 2026-11-20: узел, противоречащий базовой спецификации, — дефект и в черновике."),
      P("The reviewer makes this judgement for each node of the technical appendix for which all of the following hold:",
        "Рецензент выносит это суждение для каждого узла технического приложения, для которого выполнено всё следующее:",
        "Новое."),
      L("the commit adds an entry that approves the node to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb), whoever made the approval;",
        "коммит добавляет в `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) запись, которая одобряет узел, кто бы ни сделал это одобрение;",
        "Новое. «Кто бы ни сделал одобрение» — по вашему решению по правилу 1.3.6 от 2026-11-19: рецензент судит каждый такой узел, одобрение которого есть в коммите, кто бы его ни одобрил."),
      L("the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.",
        "у узла есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации.",
        "Новое, как в строке 10.1.25a."),
      P("For each such node, `sheriff review` gives the reviewer the rules of the base specification that the rule on what the reviewer is given lists for it (§s-nyh9yk22ba6g77q). That list names the rules in the same top-level section of the base specification as a rule that the node implements. A top-level section of the base specification is one whose location (§s-kag2m9tzdnduxdx) is a part's name, a slash and one number, such as `base/3` or `requests/2`.",
        "Для каждого такого узла `sheriff review` передаёт рецензенту правила базовой спецификации, которые для него перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q). Этот перечень называет правила того же раздела верхнего уровня базовой спецификации, что и правило, которое реализует узел. Раздел верхнего уровня базовой спецификации — это раздел, расположение (§s-kag2m9tzdnduxdx) которого — имя части, косая черта и одно число, например `base/3` или `requests/2`.",
        "Новое. Правило 10.4 не говорит, какой раздел считается разделом верхнего уровня. Узел определяет его по расположению, как его вычисляет узел «How a node's location is computed», который вы согласовали 2026-11-24."),
    ],
    reason: "An approval holds only the email address that git's configuration gave when the approval was made (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own. So the reviewer judges every such node whose approval a commit adds.",
    ruReason: "Одобрение содержит только email, который дала конфигурация git, когда одобрение делали (§s-v4qus7raqnwzneb). Поэтому одобрение, которое агент делает от имени ответственного (§s-t5uw8zfxzhfdg86), выглядит так же, как одобрение самого ответственного. Поэтому рецензент судит каждый такой узел, одобрение которого добавляет коммит.",
    reasonChange: "Новое.",
    examples: [X(
      "An agent implementing an approved rule that an idle session expires adds a node of the technical appendix that sets the idle limit at 30 minutes. The node has an `implements` link to that rule, and the agent approves it on the owner's behalf. Another rule of the same top-level section keeps a session open while a file is being uploaded, which the node's limit breaks during a long upload. `sheriff review` refuses the commit, naming the node and that rule. The most likely mistake is to skip the review because an agent, not an owner, approved the node.",
      "Агент, который реализует одобренное правило о том, что неактивная сессия истекает, добавляет узел технического приложения, который задаёт предел неактивности в 30 минут. У узла есть связь `implements` с этим правилом, и агент одобряет его от имени ответственного. Другое правило того же раздела верхнего уровня оставляет сессию открытой, пока загружается файл, а предел из узла нарушает это во время долгой загрузки. `sheriff review` отклоняет коммит, называя узел и это правило. Самая вероятная ошибка — пропустить ревью, потому что узел одобрил агент, а не ответственный.")],
    refs: [R("implements", "s-4p9amamvp2bry7b"), R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-5x737t9nee4zgaa"), R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-v4qus7raqnwzneb"), R("cites", "s-sn6au3vcr9uy5pm"), R("cites", "s-nyh9yk22ba6g77q"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-t5uw8zfxzhfdg86")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts makes no judgement on an approved node of the technical appendix. reviewInput is to find, among the approvals that the commit adds (addedApprovals in approvals.ts), each node of the technical appendix with an implements link to a rule of the base specification, and to give its wording and the rules that s-nyh9yk22ba6g77q lists for it, the top-level section taken from the location. SYSTEM_PROMPT is to ask for the judgement. Its tests are written first.",
});

// The statement that a rule's implementation needs no change, which rows 10.1.40 and 10.1.43a let a message make.
add("new:tools-9-no-change-trailer", {
  location: "tools 9 (new, after the new section \"SpecTags in the code and the tests\")",
  sidValue: S.trailer,
  testsFrom: ["match no test"],
  proposal: {
    title: "How a commit message states that a rule's implementation needs no change",
    ruTitle: "Как сообщение коммита утверждает, что реализацию правила менять не нужно",
    parts: [
      P("A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) by the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule. The message holds one such trailer for each such rule.",
        "Сообщение коммита утверждает, что реализацию правила менять не нужно (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k), с помощью trailer `Implementation-Needs-No-Change: <sid>`, где `<sid>` — sid этого правила. Для каждого такого правила сообщение содержит по одному такому trailer.",
        "Новое. По вашему решению от 2026-11-19 утверждение хранится в одном месте — в trailer сообщения коммита, и при изменённой формулировке, и при изменённых тестах; имя trailer и его значения — техническое решение агента при изменении описания инструментов. Имя повторяет слова строк 10.1.40 и 10.1.43a: «реализацию правила менять не нужно»."),
      P("The SpecSheriff tools read the trailers of a message as `git interpret-trailers --parse` reads them. They read a trailer with that key as such a statement only where its value is a single sid.",
        "Инструменты SpecSheriff читают trailer сообщения так, как их читает `git interpret-trailers --parse`. Trailer с этим ключом они читают как такое утверждение, только если его значение — один sid.",
        "Новое: так инструменты SpecSheriff читают trailer так же, как git."),
    ],
    reason: "A trailer is the form that git itself gives a statement about a commit, so git and other tools read it without parsing the message's prose.",
    ruReason: "Trailer — это форма, которую сам git даёт утверждению о коммите, поэтому git и другие инструменты читают его, не разбирая текст сообщения.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit changes the text of an approved rule only to correct a misspelt word. Its message ends with the line `Implementation-Needs-No-Change: s-…`, which names the rule. The most likely mistake is to write the statement into the message's prose, such as “the code needs no change for s-…”, which the SpecSheriff tools do not read.",
      "Коммит меняет текст одобренного правила только для того, чтобы исправить опечатку. Его сообщение заканчивается строкой `Implementation-Needs-No-Change: s-…`, которая называет это правило. Самая вероятная ошибка — написать утверждение в тексте сообщения, например «для s-… код менять не нужно»: инструменты SpecSheriff не читают такой текст как утверждение.")],
    refs: [R("implements", "s-ddd2e96uke4y83j"), R("implements", "s-nudrdn5xvcg262k")],
    removed: [],
    date: DATE,
  },
  stage3: "No code reads such a trailer. message.ts is to read the trailers of a message as git interpret-trailers --parse does, and the judgement on such a statement (" + S.reviewStatement + ") and the check of tests and code that lag behind a rule (s-txbwsthdqhvyzd2, item 37) are to read this one. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 21: "Who runs the reviewer" (s-xr5xxa9cxf2mq5u), split into a section and seven nodes, as "The commands" was.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-10-section", {
  location: "tools 10 (new section, in place of the node \"Who runs the reviewer\")",
  kind: "section",
  sidValue: S.reviewerSection,
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
  testsFrom: [
    "the build writes beside each plugin's release the agent whose runner its tools take",
    "takes the runner of the plugin whose tools run unless the settings name one",
  ],
  proposal: {
    title: "Which runner runs the reviewer",
    ruTitle: "Какой runner запускает рецензента",
    titleChange: "Было: «Who runs the reviewer». Узел разделён по правилу 7.3.3, и прежнее название теперь носит новый раздел. Этот узел говорит только о том, какой runner запускается.",
    parts: [
      P("`sheriff review` hands the reviewer's input to a runner, which is an agent's CLI started for the run (§" + S.start + "). The runner is `claude` (§" + S.claude + ") or `codex` (§" + S.codex + ").",
        "`sheriff review` передаёт входные данные рецензента runner — CLI агента, который запускается для этого прогона (§" + S.start + "). Runner — это `claude` (§" + S.claude + ") или `codex` (§" + S.codex + ").",
        "Было: «`sheriff review` передаёт входные данные рецензента runner». Как устроен каждый runner, теперь говорят отдельные узлы раздела."),
      P("`sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). Where `review.runner` is not set, it runs the runner of the SpecSheriff plugin whose tools run `sheriff review`. The file `agent`, which the build writes beside `release`, names that runner:",
        "`sheriff review` запускает тот runner, который называет `review.runner` в `sheriff.config.json` (§s-zefk589ykh37b8u). Если `review.runner` не задан, он запускает runner того плагина SpecSheriff, чьи инструменты запускают `sheriff review`. Этот runner называет файл `agent`, который сборка записывает рядом с `release`:",
        AS_WAS),
      L("`claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);",
        "`claude` — для плагина для Claude Code (§s-zh2vcr3xjumppg5);",
        AS_WAS),
      L("`codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).",
        "`codex` — для плагина для Codex CLI (§s-2pdy9gw2jrjvfb4).",
        AS_WAS),
      P("SpecSheriff tools that hold no such file take `claude`.",
        "Инструменты SpecSheriff, у которых нет такого файла, берут `claude`.",
        "Как было; «Tools» заменено на «SpecSheriff tools»."),
      P("The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`, which sets the time limit of a run (§" + S.limit + ").",
        "Общие для всего проекта настройки рецензента в `sheriff.config.json` — это `review.runner` и `review.minutes`, который задаёт предел времени прогона (§" + S.limit + ").",
        "Как было. Что `sheriff review` не берёт из этого файла модель и effort, теперь сказано без отрицания в узле о настройках каждого runner, а предел времени — в своём узле."),
    ],
    reason: "A user with one agent has no other agent to run, so the runner follows the plugin that the user has. A project that wants one reviewer for everyone names it in `review.runner`.",
    ruReason: "У пользователя с одним агентом нет другого агента для запуска, поэтому runner следует за плагином, который есть у пользователя. Проект, которому нужен один рецензент для всех, называет его в `review.runner`.",
    reasonChange: "Из прежнего обоснования здесь оставлен только абзац о выборе runner. Остальные абзацы перенесены в узлы, к которым они относятся, и сокращены там.",
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", S.start), R("cites", S.claude), R("cites", S.codex), R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-zh2vcr3xjumppg5"), R("cites", "s-2pdy9gw2jrjvfb4"), R("cites", S.limit)],
    removed: [
      "The `implements` link to “What the reviewer is given” (s-nyh9yk22ba6g77q): “How a runner is started” (" + S.start + ") now implements it, since that node keeps the session that made the change from the runner.",
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
  testsFrom: [
    "refuses a review that cannot be held, and says why",
    "holds the Claude Code CLI's answer to the schema of the verdict",
    "reads an answer that passes with a finding, or refuses with none, as one that cannot be read",
  ],
  proposal: {
    title: "The reviewer's verdict",
    ruTitle: "Вердикт рецензента",
    parts: [
      P("`sheriff review` refuses a commit where the runner gives no verdict that `sheriff review` can read (§s-94k7b6r5kf65udf). The refusal says why no verdict could be read, for example that the runner is not installed or that the run went beyond its time limit (§" + S.limit + ").",
        "`sheriff review` отклоняет коммит, если runner не даёт вердикта, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf). Отказ говорит, почему вердикт прочитать не удалось: например, что runner не установлен или что прогон вышел за предел времени (§" + S.limit + ").",
        "Было: «`sheriff review` читает как ответ, который нельзя прочитать (§10.4): …». Отказ коммита без читаемого ответа теперь требует правило 10.5, и узел ссылается на него, а не на 10.4. Примеры причин — из примеров правила 10.5."),
      P("The runner's CLI is given the schema of the verdict. It answers with a JSON object held to that schema. The verdict passes or refuses the commit and lists its findings. Each finding names the sids of the nodes that it concerns and the problem, and, where it concerns code, the file and the line.",
        "CLI runner получает схему вердикта. Он отвечает JSON-объектом, который соответствует этой схеме. Вердикт пропускает или отклоняет коммит и перечисляет свои замечания. Каждое замечание называет sid узлов, которых оно касается, и проблему, а если оно касается кода, то ещё файл и строку.",
        "Было: «каждое замечание с его узлом, файлом, строкой и проблемой». Замечание о ложном утверждении не касается строки кода, а замечание об узле технического приложения называет и узел, и правило базовой спецификации. Поэтому замечание называет sid каждого узла, которого оно касается, а файл и строку — только если оно касается кода."),
      P("`sheriff review` treats each of the following as a verdict that cannot be read:",
        "Вердиктом, который нельзя прочитать, `sheriff review` считает каждое из следующего:",
        AS_WAS),
      L("an answer that is not held to the schema of the verdict;",
        "ответ, который не соответствует схеме вердикта;",
        "Новое в тексте; код так и делает (review.ts:297)."),
      L("a verdict that passes the commit with a finding;",
        "вердикт, который пропускает коммит с замечанием;",
        AS_WAS),
      L("a verdict that refuses the commit with none.",
        "вердикт, который отклоняет коммит без замечаний.",
        AS_WAS),
    ],
    reason: "`sheriff review` lets a commit through only on a verdict whose meaning it need not guess. An answer held to the schema and consistent with itself can be read without guessing.",
    ruReason: "`sheriff review` пропускает коммит только по вердикту, смысл которого не приходится угадывать. Ответ, который соответствует схеме и не противоречит себе, можно прочитать без догадок.",
    reasonChange: "Из прежнего обоснования: CLI, связанный схемой вердикта, отвечает в форме, которую `sheriff review` может прочитать, а ответ, противоречащий себе, оставляет открытым, что имел в виду рецензент. Сведено к одной мысли.",
    examples: [X(
      "The runner answers with a verdict that passes the commit and lists one finding. `sheriff review` reads it as a verdict that cannot be read and refuses the commit. The most likely mistake is to pass the commit and drop the finding, which decides for the reviewer what it meant.",
      "Runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание. `sheriff review` считает его вердиктом, который нельзя прочитать, и отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так инструмент решает за рецензента, что тот имел в виду.")],
    refs: [R("implements", "s-94k7b6r5kf65udf"), R("cites", S.limit)],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:208-224 (VERDICT_SCHEMA) is to give each finding `nodes`, a list of sids, and `problem`, with `file` and `line` null where the finding concerns no code; Codex's --output-schema requires every property, so each is required and may be null. readVerdict (review.ts:286-302) and the refusal (review.ts:319) follow it. The tests at gates.test.ts:264, :357 and :362 are to carry " + S.verdict + ".",
});

add("new:tools-10-start", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.3 (new)",
  sidValue: S.start,
  testsFrom: [
    "hands a runner only the variables of the environment it needs, none an agent or git sets",
    "starts the program an npm command script starts, with the arguments it gives",
  ],
  proposal: {
    title: "How a runner is started",
    ruTitle: "Как запускается runner",
    parts: [
      P("`sheriff review` starts a runner apart from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:",
        "`sheriff review` запускает runner отдельно от сессии, в которой сделано изменение, чтобы runner ничего не получил из этой сессии (§s-nyh9yk22ba6g77q). Он запускает runner:",
        "Было: «Runner запускается:». Новое — цель, которую требует правило 10.4: рецензент ничего не получает из сессии."),
      L("with none of the user's settings, memory or hooks;", "без настроек, памяти и хуков пользователя;", AS_WAS),
      L("with a system prompt of its own;", "со своим системным промптом;", AS_WAS),
      L("in an empty working directory;", "в пустом рабочем каталоге;", AS_WAS),
      L("with every tool that its command line can turn off turned off;", "с выключенным каждым инструментом, который можно выключить из его командной строки;", AS_WAS),
      L("as a program, never through a shell.", "как программу, никогда — через shell.", AS_WAS),
      P("A CLI that npm installs on Windows as a command script is started as the program that the script starts, with the arguments that the script gives it.",
        "CLI, который npm устанавливает в Windows как командный скрипт, запускается как программа, которую запускает этот скрипт, с аргументами, которые скрипт ей передаёт.",
        "Как было; уточнено, что программа запускается с аргументами, которые даёт скрипт."),
      P("The runner's environment holds only the variables that the list of this node allows. They name:",
        "Окружение runner содержит только переменные, которые допускает список этого узла. Они задают:",
        "Как было; переменные теперь названы через список этого узла."),
      L("the search path of programs, the folders of the operating system and of the user, and the user's name;",
        "путь поиска программ, папки операционной системы и пользователя и имя пользователя;", AS_WAS),
      L("the locale;", "локаль;", AS_WAS),
      L("a proxy, the hosts that it skips and the certificates to trust;", "прокси, хосты, которые он пропускает, и сертификаты, которым следует доверять;", AS_WAS),
      L("where the runner's CLI keeps its sign-in, the sign-in itself, and the provider serving the model.",
        "где CLI runner хранит данные входа, сами данные входа и провайдера, который обслуживает модель.", AS_WAS),
    ],
    list: {
      of: "the variables that a runner's environment may hold, each matched whatever its case, where a name that ends in `*` matches every name that begins with what comes before the `*`",
      ruOf: "переменные, которые может содержать окружение runner; каждая сравнивается без учёта регистра, а имя, которое оканчивается на `*`, совпадает с каждым именем, которое начинается с того, что стоит перед `*`",
      membersFrom: "s-xr5xxa9cxf2mq5u",
      valueList: { file: "skills/tools/src/review.ts", symbol: "ALLOWED" },
      change: "Список перенесён из прежнего узла, его члены — как были. Было: `declaredIn`. По todo строки 10.1.35 список ссылается на объявление в коде через `TextRule.list.valueList`. «standing for» заменено на «matches».",
    },
    reason: "The runner judges the change by the rules alone (§s-nyh9yk22ba6g77q), so nothing from the session that made the change may reach it.",
    ruReason: "Runner судит изменение только по правилам (§s-nyh9yk22ba6g77q), поэтому ничто из сессии, в которой сделано изменение, не должно до него дойти.",
    reasonChange: "Из прежнего обоснования: runner судит код только по узлам, поэтому способ запуска не даёт ему ничего из сессии, которая писала код. Почему окружение задаётся списком того, что проходит, теперь показывает пример.",
    examples: [X(
      "An agent's session sets variables of its own, and a git hook sets `GIT_DIR` to the repository. Neither is in the list, so neither reaches the runner, which therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to strip a list of known variables instead, which misses each variable that a new release of an agent adds.",
      "Сессия агента задаёт свои переменные, а git-хук задаёт `GIT_DIR` на репозиторий. Их нет в списке, поэтому ни одна из них не доходит до runner, и он не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — вместо этого убирать список известных переменных: так пропускается каждая переменная, которую добавляет новый выпуск агента.")],
    refs: [R("implements", "s-nyh9yk22ba6g77q")],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code beyond the list's valueList (row 10.1.35's todo). The tests at gates.test.ts:371 and :377 are to carry " + S.start + ".",
});

add("new:tools-10-limit", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.4 (new)",
  sidValue: S.limit,
  testsFrom: ["reads the reviewer's runner and time limit from the project's settings, twenty minutes unless set"],
  proposal: {
    title: "The time limit of a run",
    ruTitle: "Предел времени прогона",
    parts: [
      P("`sheriff review` ends a run of the reviewer that is still going after the number of minutes that `review.minutes` in `sheriff.config.json` gives (§s-zefk589ykh37b8u). It ends the run together with every process that the runner has started. Unless `review.minutes` is set, the limit is twenty minutes.",
        "`sheriff review` завершает прогон рецензента, который ещё идёт по истечении числа минут, которое задаёт `review.minutes` в `sheriff.config.json` (§s-zefk589ykh37b8u). Он завершает прогон вместе с каждым процессом, который запустил runner. Если `review.minutes` не задан, предел — двадцать минут.",
        "Было: «`review.minutes` — время, после которого прогон завершается. Если не задано, оно равно двадцати минутам». Новое: прогон завершается вместе с каждым процессом, который запустил runner. Так закрывается todo от 2026-11-06: в Windows предел завершал Node и оставлял работать запущенный им Codex, который продолжал тратить деньги."),
    ],
    reason: "A process left running after the limit would go on costing the person who commits. The limit is long, so that it ends a run that hangs rather than one that reads a large change.",
    ruReason: "Процесс, оставшийся работать после предела, продолжал бы стоить денег тому, кто делает коммит. Предел длинный, чтобы он завершал зависший прогон, а не прогон, который читает большое изменение.",
    reasonChange: "Из прежнего обоснования: предел длинный, потому что он завершает зависший прогон, а не торопит прогон, который читает большое изменение. Новое: зачем завершать и процессы, которые запустил runner.",
    refs: [R("implements", "s-94k7b6r5kf65udf"), R("cites", "s-zefk589ykh37b8u")],
    removed: [],
    date: DATE,
  },
  stage3: "review.ts:179-191 (runCli) ends only the process that spawnSync started. On Windows an npm-installed Codex CLI starts the native Codex as a child, which outlives the limit (the agent's todo of 2026-11-06 on s-xr5xxa9cxf2mq5u). runCli is to end the whole tree of processes that the runner started; its test is written first and seen failing, and the todo is removed once the test passes.",
});

add("new:tools-10-claude", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.5 (new)",
  sidValue: S.claude,
  testsFrom: ["starts the Claude Code CLI in print mode with no tools, settings, memory or session"],
  proposal: {
    title: "The runner `claude`",
    ruTitle: "Runner `claude`",
    parts: [
      P("The runner `claude` is the Claude Code CLI in print mode. It asks for the model and the reasoning effort that the settings of the runner give (§" + S.settings + "). Where that model is overloaded or not offered, it falls back to the fallback model that those settings give.",
        "Runner `claude` — это Claude Code CLI в режиме print. Он запрашивает модель и effort, которые задают настройки этого runner (§" + S.settings + "). Если эта модель перегружена или недоступна, он переходит на резервную модель, которую задают эти настройки.",
        "Как было; настройки теперь описывает свой узел."),
    ],
    reason: "Print mode answers once and exits, with no session around it to carry anything over.",
    ruReason: "Режим print отвечает один раз и завершается, без сессии вокруг, которая могла бы что-то перенести.",
    reasonChange: "Из прежнего обоснования: режим print и `codex exec` отвечают один раз и завершаются, без сессии вокруг.",
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", S.settings)],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code. The test at gates.test.ts:281 is to carry " + S.claude + ".",
});

add("new:tools-10-codex", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.6 (new)",
  sidValue: S.codex,
  testsFrom: [
    "starts the Codex CLI in codex exec, read-only and unkept, with no skill",
    "runs the Codex CLI in an empty directory with a Codex home of its own",
  ],
  proposal: {
    title: "The runner `codex`",
    ruTitle: "Runner `codex`",
    parts: [
      P("The runner `codex` is the Codex CLI in `codex exec`, with a Codex home of its own. That home is made in a temporary directory for the run and deleted after it. It holds a copy of the user's sign-in and nothing else.",
        "Runner `codex` — это Codex CLI в режиме `codex exec` со своим домашним каталогом Codex. Этот каталог создаётся во временной папке на время прогона и удаляется после него. В нём есть копия данных входа пользователя, и больше ничего.",
        AS_WAS),
      P("The runner `codex` runs with:", "Runner `codex` работает:", AS_WAS),
      L("its sandbox read-only;", "с песочницей только для чтения;", AS_WAS),
      L("its session not kept;", "без сохранения сессии;", AS_WAS),
      L("no skill offered.", "без предложенных skill.", AS_WAS),
      P("It asks for the model and the reasoning effort that the settings of the runner give (§" + S.settings + "). Where the model is empty, it asks for no model.",
        "Он запрашивает модель и effort, которые задают настройки этого runner (§" + S.settings + "). Если модель пуста, он не запрашивает модели.",
        "Как было; настройки теперь описывает свой узел."),
    ],
    reason: "Codex offers no run without a home and tools of its own, so the runner confines both: the home holds only the sign-in, and the sandbox lets nothing be written.",
    ruReason: "Codex не предлагает прогона без своего домашнего каталога и инструментов, поэтому runner ограничивает и то и другое: в домашнем каталоге есть только данные входа, а песочница не даёт ничего записать.",
    reasonChange: "Из прежнего обоснования: Codex не предлагает прогона без инструментов, поэтому runner выключает каждый инструмент, до которого достаёт настройка, а его песочница не даёт ничего записать.",
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", S.settings)],
    removed: [],
    date: DATE,
  },
  stage3: "No change to the code. The tests at gates.test.ts:293 and :317 are to carry " + S.codex + ".",
});

add("new:tools-10-settings", {
  from: "s-xr5xxa9cxf2mq5u",
  location: "tools 10.7 (new)",
  sidValue: S.settings,
  testsFrom: [
    "reads each runner's settings from the user's git configuration, an empty one confirmed",
    "runs the reviewer at the settings read, and with every review held at a default names each setting",
  ],
  proposal: {
    title: "The settings of each runner",
    ruTitle: "Настройки каждого runner",
    parts: [
      P("`sheriff review` reads the settings of each runner from the git configuration of the user who commits:",
        "`sheriff review` читает настройки каждого runner из конфигурации git пользователя, который делает коммит:",
        AS_WAS),
      L("`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§" + S.claude + ");",
        "`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` и `specsheriff.review.claudeEffort` — для runner `claude` (§" + S.claude + ");",
        AS_WAS),
      L("`specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§" + S.codex + ").",
        "`specsheriff.review.codexModel` и `specsheriff.review.codexEffort` — для runner `codex` (§" + S.codex + ").",
        AS_WAS),
      P("`sheriff review` takes the model and the reasoning effort only from these settings. An empty `codexModel` means the model that Codex chooses for the signed-in account.",
        "`sheriff review` берёт модель и effort только из этих настроек. Пустой `codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.",
        "Было: «`sheriff review` не берёт из этого файла ни модели, ни effort». Теперь сказано, откуда он их берёт. «stands for» заменено на «означает»."),
      P("A setting that the configuration holds, empty or not, is confirmed. The hooks and the skills of each SpecSheriff plugin ask only for a setting that the configuration lacks. They write a setting only as the user whose configuration it is answers. Where the user answers with the default, they write it like any other value. The session start (§s-477gtdrkw34dzxw) and the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.",
        "Настройка, которая есть в конфигурации, пустая или нет, считается подтверждённой. Хуки и skill каждого плагина SpecSheriff спрашивают только о настройке, которой в конфигурации нет. Они записывают настройку только так, как ответил пользователь, чья это конфигурация. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение. Когда спрашивается каждая настройка, говорят начало сессии (§s-477gtdrkw34dzxw) и skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).",
        "Как было; «не спрашивают ни о какой настройке, которая есть в конфигурации» сказано без отрицания."),
      P("The defaults are:", "Значения по умолчанию:", AS_WAS),
      L("for the runner `claude`, the model `opus` at the reasoning effort `high`, falling back to `sonnet`;",
        "для runner `claude` — модель `opus` с effort `high` и резервной моделью `sonnet`;", AS_WAS),
      L("for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.",
        "для runner `codex` — модель, которую выбирает Codex, с effort `high`.", AS_WAS),
      P("Where the configuration lacks a setting of the runner that runs, `sheriff review` takes that setting's default. With every review that runs at a default, `sheriff review` names each setting whose default it took, and how the user confirms that setting.",
        "Если в конфигурации нет настройки runner, который запускается, `sheriff review` берёт значение этой настройки по умолчанию. При каждом ревью, которое идёт со значением по умолчанию, `sheriff review` называет каждую настройку, значение которой по умолчанию он взял, и то, как пользователь её подтверждает.",
        "Как было; «With every review held so» переписано яснее."),
    ],
    reason: "A run of the reviewer is paid for by the user who commits, from their own account. So it runs at the models and the efforts that this user has confirmed on their machine. Until the user confirms them, each review tells the user what it ran at.",
    ruReason: "Прогон рецензента оплачивает пользователь, который делает коммит, из своей учётной записи. Поэтому прогон идёт на моделях и с effort, которые этот пользователь подтвердил на своей машине. Пока пользователь их не подтвердил, каждое ревью сообщает ему, на чём оно шло.",
    reasonChange: "Прежнее обоснование было длинным, по абзацу почти на каждое предложение текста. Оставлена главная мысль: прогон оплачивает пользователь, поэтому настройки его, и подтверждает их он. Почему выбраны именно эти значения по умолчанию, записано в решении узла от 2026-11-02. Почему настройки хранятся в конфигурации git пользователя, показывает пример.",
    examples: [X(
      "A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every project on that machine runs the reviewer at that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.",
      "Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С тех пор каждый проект на этой машине запускает рецензента на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда за выбор одного человека платит каждый, кто делает коммит.")],
    refs: [R("implements", "s-m4h279nbaqkpa3t"), R("cites", S.claude), R("cites", S.codex), R("cites", "s-477gtdrkw34dzxw"),
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
  testsFrom: ["match no test"],
  proposal: {
    title: "The form of a SpecTag",
    ruTitle: "Форма SpecTag",
    titleChange: "Было: «The SpecTag, and how a symbol carries it». Узел разделён по правилу 7.3.3: как SpecTag записываются у символа, в начале файла, в файле привязок и у теста, говорят отдельные узлы нового раздела. Этот узел говорит только о форме SpecTag.",
    parts: [
      P("A SpecTag (§s-8xw4mgvpexyvw5q) is written in one of these forms:",
        "SpecTag (§s-8xw4mgvpexyvw5q) записывается в одной из этих форм:",
        "Было: «SpecTag — это текст `@spec <sid>` или `@spec none` с причиной». Теперь формы перечислены списком."),
      L("`@spec <sid>`, where `<sid>` is the sid of a rule that the code implements or that the test is written from (§s-sfjka4zc4rhfu67);",
        "`@spec <sid>`, где `<sid>` — sid правила, которое реализует код или из которого написан тест (§s-sfjka4zc4rhfu67);",
        "Как было; что называет sid, — по правилу 10.10."),
      L("`@spec none`, followed by a space and by what the technology the system is built with requires of the code (§s-2jcmb9xe9d64t2t).",
        "`@spec none`, затем пробел и то, что требует от кода технология, на которой построена система (§s-2jcmb9xe9d64t2t).",
        "Было: «`@spec none` с причиной, по которой символ не несёт SpecTag». Это сомнение D2 из обзора 11-13: годился любой непустой текст. Правило 1.2.7, которое вы согласовали 2026-11-08, определяет технический код как код, который не реализует логики системы и которого требует технология, на которой она построена. Поэтому после `@spec none` пишется, чего требует технология."),
      P("A rule here is a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2), including a node in a cell of a `TableRule`.",
        "Правилом здесь считается узел типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp) либо узел собственного типа в проекте (§s-vsh384ybt4w25a2), в том числе узел в ячейке `TableRule`.",
        "Новое: те же типы, что в согласованном узле «`exempts` links». Термин больше не допускается: тест ссылается на правило (правило 1.4.2), а SpecTag кода называет правило, которое код реализует (строка 10.1.26)."),
      P("Code that implements several rules carries a SpecTag for each of them. Code that implements no rule carries `@spec none` as its only SpecTag. A test carries a SpecTag only in the form `@spec <sid>` (§s-nrjxfvpkq3m8hzm).",
        "У кода, который реализует несколько правил, есть SpecTag для каждого из них. У кода, который не реализует никакого правила, единственный SpecTag — `@spec none`. У теста SpecTag бывает только в форме `@spec <sid>` (§s-nrjxfvpkq3m8hzm).",
        "Было: «Символ, реализующий несколько правил, несёт несколько SpecTag. Форма `@spec none` стоит только на символе». Теперь — о коде, а не о символе, потому что код может быть привязан и файлом целиком (правило 1.5.2). Новое: `@spec none` — единственный SpecTag такого кода; тест ссылается только на правило (правило 1.4.2)."),
    ],
    reason: "One fixed form lets the SpecSheriff tools find every SpecTag by its text, in any language. That includes the SpecTag that marks technical code (§s-2jcmb9xe9d64t2t), so that such code stays visible.",
    ruReason: "Одна неизменная форма позволяет инструментам SpecSheriff находить каждый SpecTag по тексту на любом языке. Это относится и к SpecTag, который помечает технический код (§s-2jcmb9xe9d64t2t), чтобы такой код оставался на виду.",
    reasonChange: "Прежнее обоснование говорило о комментарии над символом и о парсере; оно перенесено в узел «How a symbol carries its SpecTags». Новое обоснование — о форме.",
    examples: [X(
      "A function that a web framework calls to register the routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers the routes`. The most likely mistake is `@spec none helper`, which does not say what requires the code.",
      "У функции, которую веб-фреймворк вызывает, чтобы зарегистрировать маршруты, и в которой нет логики системы, есть SpecTag `@spec none the web framework requires a function that registers the routes`. Самая вероятная ошибка — `@spec none helper`: он не говорит, что требует этот код.")],
    refs: [R("implements", "s-8xw4mgvpexyvw5q"), R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-sfjka4zc4rhfu67"), R("cites", "s-2jcmb9xe9d64t2t"),
      R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-nrjxfvpkq3m8hzm")],
    removed: [
      "The `implements` link to “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): it is retargeted to “The SpecTag” (s-8xw4mgvpexyvw5q), which now defines what a SpecTag is, as the continuation file says.",
      "The citation of the main table of checks (s-jau82aq9juv9zzh) and of “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc): the paragraphs that cited them moved to “How a symbol carries its SpecTags” (" + S.symbol + "), and the test's SpecTag is its own node of the new section.",
      "How a symbol carries its SpecTags, the parser and the descriptions of the languages: they moved to “How a symbol carries its SpecTags” (" + S.symbol + ").",
    ],
    date: DATE,
  },
  stage3: "code.ts:63 (TAG) accepts any text after `@spec none`, and the reviewer judges whether it says what the technology requires (" + S.reviewCode + "). `@spec none` with no text is to be refused with a message that names the form, not as a SpecTag that shares its line. Code carrying `@spec none` beside another SpecTag is to be refused (s-9rtrj24myzjvshu). At the move, this node's decisions of 2026-09-22, 2026-10-08 and 2026-10-27 go to " + S.symbol + ", and the decision of 2026-10-27 of the former 3.3 is recorded here and in s-zrsc6asgmhv8tnc, as the continuation file says.",
});

add("new:tools-8-symbol", {
  from: "s-5z5gnu7pahr82xp",
  location: "tools 8.2 (new)",
  sidValue: S.symbol,
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
      P("In a file whose language a description covers, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above it, above its decorators where it has any. That comment is:",
        "В файле на языке, который охватывает описание, SpecTag (§s-5z5gnu7pahr82xp) символа (§s-kgbzk2ph9e6jfb4) — это строки комментария непосредственно над ним, над его декораторами, если они есть. Этот комментарий:",
        "Как было; новое — что это относится к файлу на языке, который охватывает описание."),
      L("in TypeScript and JavaScript, the symbol's doc comment;", "в TypeScript и JavaScript — документирующий комментарий символа;", AS_WAS),
      L("in Python, a comment line.", "в Python — строка комментария.", AS_WAS),
      P("Only the delimiters of the comment may share a SpecTag's line.",
        "Строку SpecTag может делить с ним только ограничитель комментария.",
        AS_WAS),
      P("Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag binds the whole run.",
        "Если у первого в ряду реэкспортов, между которыми нет пустой строки, есть `@spec none`, этот SpecTag привязывает весь ряд.",
        AS_WAS),
      P("The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They use the parser alone, with no program and no type checker.",
        "Символ, над которым стоит SpecTag, инструменты SpecSheriff находят, разбирая файл с помощью tree-sitter и грамматики языка файла. Они используют только парсер, без программы и без проверки типов.",
        AS_WAS),
      P("A description of each language names what counts in it as a symbol and as a test. The descriptions are the files in the folder `languages/` of the SpecSheriff tools. TypeScript, JavaScript and Python are described.",
        "Описание каждого языка называет, что в нём считается символом и что тестом. Описания — это файлы в папке `languages/` инструментов SpecSheriff. Описаны TypeScript, JavaScript и Python.",
        "Как было; новое — где лежат описания."),
    ],
    reason: "A SpecTag sits where a reader of the symbol already looks. There a parser, unlike a scan of the text, can tell which symbol the SpecTag binds, and gives the same answer for the same file every time.",
    ruReason: "SpecTag стоит там, куда уже смотрит читатель символа. Там парсер, в отличие от поиска по тексту, может определить, какой символ привязывает SpecTag, и каждый раз даёт один и тот же ответ для одного и того же файла.",
    reasonChange: "Из прежнего обоснования: комментарий над символом — там, где читатель уже смотрит; поиск по тексту не видит, к чему прикреплён SpecTag, а парсер видит и отвечает одинаково. Сокращено.",
    examples: [X(
      "In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function, so that the SpecTag is above no symbol and binds nothing.",
      "В TypeScript `/** @spec s-… */` непосредственно над `export function close()` привязывает функцию и каждый вложенный в неё символ. Самая вероятная ошибка — пустая строка между комментарием и функцией: тогда SpecTag не стоит ни над каким символом и ничего не привязывает.")],
    refs: [R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-5z5gnu7pahr82xp")],
    removed: [],
    date: DATE,
  },
  stage3: "code.ts:195-208 applies the SpecTags of the first re-export of a run to the rest, whatever those SpecTags are; it is to do so only for `@spec none`, as the decision of 2026-10-08 says. The tests at code.test.ts:9-47 are to carry " + S.symbol + ".",
});

add("new:tools-8-file-start", {
  from: "s-5z5gnu7pahr82xp",
  location: "tools 8.3 (new)",
  sidValue: S.fileStart,
  testsFrom: ["reads nothing of a file in a language no description covers"],
  proposal: {
    title: "SpecTags at the start of a file",
    ruTitle: "SpecTag в начале файла",
    parts: [
      P("A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start where all of the following hold (§s-kgbzk2ph9e6jfb4):",
        "У файла кода системы (§s-hheus6f395ynqvc) помимо тестов SpecTag (§s-5z5gnu7pahr82xp) записываются в начале файла, если выполнено всё следующее (§s-kgbzk2ph9e6jfb4):",
        "Новое: по правилу 1.5.2, которое вы согласовали 2026-11-17, SpecTag ставятся в начале файла, если проверки не могут определить символы файла."),
      L("the SpecSheriff tools cannot identify the file's symbols, because no description covers its language (§" + S.symbol + ");",
        "инструменты SpecSheriff не могут определить символы файла, потому что его язык не охватывает ни одно описание (§" + S.symbol + ");",
        "Новое; слова правила 1.5.2."),
      L("the file's format allows comments (§" + S.bindings + ").",
        "формат файла допускает комментарии (§" + S.bindings + ").",
        "Новое; файл, формат которого не допускает комментариев, привязывается записью в файле привязок."),
      P("The SpecTags of such a file are on the lines that come before its first line holding a letter or a digit outside a SpecTag. The file's first line is not counted, so that a line that the format requires first, such as an XML declaration, may come before them.",
        "SpecTag такого файла стоят в строках, которые идут до его первой строки с буквой или цифрой вне SpecTag. Первая строка файла при этом не учитывается, чтобы перед ними могла стоять строка, которую формат требует первой, например объявление XML.",
        "Новое. Инструменты SpecSheriff не могут разобрать такой файл, поэтому его начало определено без разбора: по строкам до первой буквы или цифры вне SpecTag. Так в строке со SpecTag, кроме него, могут быть только знаки, которые не являются ни буквами, ни цифрами, например ограничители комментария."),
      P("The text that follows `@spec none` runs to the end of its line, less any characters at its end that are neither letters nor digits.",
        "Текст после `@spec none` идёт до конца строки, без знаков в её конце, которые не являются ни буквами, ни цифрами.",
        "Новое: так ограничитель комментария в конце строки, например `*/` или `-->`, не попадает в текст."),
    ],
    reason: "The lines before a file's content can be told apart in any language without parsing. So the SpecTags of a file that the SpecSheriff tools cannot parse are kept there.",
    ruReason: "Строки перед содержимым файла можно отличить на любом языке без разбора. Поэтому SpecTag файла, который инструменты SpecSheriff не могут разобрать, хранятся там.",
    reasonChange: "Новое.",
    examples: [X(
      "A stylesheet starts with `/* @spec s-… */`, followed by its rules. An XML file starts with its declaration, `<?xml version=\"1.0\"?>`, followed by `<!-- @spec s-… -->`. The most likely mistake is to put the SpecTag after a licence comment at the start of the file. The words of the licence then come first, and the SpecTag binds nothing.",
      "Таблица стилей начинается с `/* @spec s-… */`, за которым идут её правила. Файл XML начинается со своего объявления `<?xml version=\"1.0\"?>`, за которым идёт `<!-- @spec s-… -->`. Самая вероятная ошибка — поставить SpecTag после комментария с лицензией в начале файла. Тогда первыми идут слова лицензии, и SpecTag ничего не привязывает.")],
    refs: [R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", S.symbol), R("cites", S.bindings)],
    removed: [],
    date: DATE,
  },
  stage3: "code.ts:122-125 (readCode) reads nothing of a file in a language that no description covers, and binding.ts reads no such file. They are to read the SpecTags at the start of each such file that the glob patterns for code match and whose format allows comments. The test at code.test.ts:78 is to expect those SpecTags and to carry " + S.fileStart + "; the other tests are written first.",
});

add("new:tools-8-bindings", {
  location: "tools 8.4 (new)",
  sidValue: S.bindings,
  testsFrom: ["match no test"],
  proposal: {
    title: "The bindings file",
    ruTitle: "Файл привязок",
    parts: [
      P("`sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the repository keeps as the commit leaves it (§s-ffkv5qnqvet7bga). It refuses any other entry, naming its path.",
        "`sheriff binding` принимает запись в файле привязок (§s-kgbzk2ph9e6jfb4) `sheriff.bindings.json` (§s-zefk589ykh37b8u), только если путь записи называет файл, который репозиторий хранит в том виде, в каком его оставляет коммит (§s-ffkv5qnqvet7bga). Любую другую запись он отвергает, называя её путь.",
        "Новое: узел реализует строку 10.1.26b; ни один узел описания инструментов прежде не упоминал файл привязок (stage2-inventory.md, пункт 26). По вашему решению по этой строке от 2026-11-17 проверка при каждом коммите ловит перенесённый или переименованный файл."),
      P("The bindings file holds a JSON object. Each key of the object is the path of a file from the root of the repository, with forward slashes. The value of each key is the list of the SpecTags (§s-5z5gnu7pahr82xp) of that file, each a string.",
        "Файл привязок содержит JSON-объект. Каждый ключ объекта — путь к файлу от корня репозитория с прямыми косыми чертами. Значение каждого ключа — список SpecTag (§s-5z5gnu7pahr82xp) этого файла, каждый — строка.",
        "Новое: форма файла привязок — техническое решение агента. Имя файла вы согласовали в узле «Where the files are»."),
      P("An entry binds a file of the system's code other than tests whose format allows no comments. Such a format is JSON, in a file whose name ends in `.json`, or a format whose files match the glob patterns that the project's own guidelines list for it (§s-u7tw6m8npxmv5tu).",
        "Запись привязывает файл кода системы помимо тестов, формат которого не допускает комментариев. Такой формат — JSON в файле, имя которого оканчивается на `.json`, или формат, файлам которого соответствуют glob-шаблоны, которые для него перечисляют собственные guidelines проекта (§s-u7tw6m8npxmv5tu).",
        "Новое: как инструменты SpecSheriff узнают формат без комментариев — по правилу 1.5.2 и согласованному узлу о том, что они читают в собственных guidelines проекта."),
      P("The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of that form.",
        "Инструменты SpecSheriff отвергают `sheriff.bindings.json`, если он не является корректным JSON или не содержит объекта такой формы.",
        "Новое, как для `sheriff.config.json` в согласованном узле «Project-wide settings»."),
    ],
    reason: "An entry names its file only by the file's path, and the path stays the same when the file is moved or renamed. So only a check of every entry against the repository shows that a file has lost its SpecTags.",
    ruReason: "Запись называет свой файл только по пути, а путь остаётся прежним, когда файл переносят или переименовывают. Поэтому только проверка каждой записи по репозиторию показывает, что файл потерял свои SpecTag.",
    reasonChange: "Новое.",
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
  testsFrom: ["s-zrsc6asgmhv8tnc", "skills/pytest-specsheriff/tests/test_plugin.py"],
  proposal: {
    title: "How a test declares the rule it is written from",
    ruTitle: "Как тест объявляет правило, из которого он написан",
    titleChange: "Было: «How a test declares the node it is written from». Тест ссылается на правило (правило 1.4.2), а не на любой узел.",
    parts: [
      P("A test declares the SpecTag (§s-5z5gnu7pahr82xp) of the rule it is written from (§s-nrjxfvpkq3m8hzm):",
        "Тест объявляет SpecTag (§s-5z5gnu7pahr82xp) правила, из которого он написан (§s-nrjxfvpkq3m8hzm):",
        "Было: «Тест объявляет свой SpecTag». Теперь сказано, чей это SpecTag: правила, из которого написан тест."),
      L("in TypeScript and JavaScript, by opening its name with it, as in `test(\"@spec s-… what it checks\", …)`;",
        "в TypeScript и JavaScript — начиная им своё название, как в `test(\"@spec s-… what it checks\", …)`;",
        AS_WAS),
      L("in Python, by a mark on the test, `@pytest.mark.spec(\"@spec s-…\")`;",
        "в Python — пометкой на тесте `@pytest.mark.spec(\"@spec s-…\")`;",
        AS_WAS),
      L("in a further language, as the description of that language says (§" + S.symbol + ").",
        "в другом языке — так, как говорит описание этого языка (§" + S.symbol + ").",
        AS_WAS),
      P("A test declares one SpecTag.", "Тест объявляет один SpecTag.", "Новое в тексте; так делает код."),
      P("The plugin for pytest of the SpecSheriff tools, `pytest-specsheriff`, registers the mark. It puts the test's SpecTag at the start of the name that a run reports for the test.",
        "Плагин для pytest инструментов SpecSheriff, `pytest-specsheriff`, регистрирует пометку. Он ставит SpecTag теста в начало названия, которое прогон сообщает для этого теста.",
        AS_WAS),
      P("The plugin stops the run with an error that names the test where the mark holds anything other than one SpecTag. Where the mark holds a bare sid (§s-gb8s9657a65hqmv), the error also names `sheriff reindex`, which writes the SpecTag.",
        "Плагин останавливает прогон с ошибкой, которая называет тест, если пометка содержит что-либо, кроме одного SpecTag. Если пометка содержит голый sid (§s-gb8s9657a65hqmv), ошибка называет ещё и `sheriff reindex`, который записывает SpecTag.",
        "Новое в тексте; так делает плагин (тесты в test_plugin.py)."),
    ],
    reason: "A run of the tests reports each test by its name, so the SpecTag stands where that report shows it. The name of a Python function cannot hold a SpecTag, so the plugin for pytest moves the SpecTag from the mark into the name that the run reports.",
    ruReason: "Прогон тестов сообщает о каждом тесте по его названию, поэтому SpecTag стоит там, где его показывает этот отчёт. Название функции в Python не может содержать SpecTag, поэтому плагин для pytest переносит SpecTag из пометки в название, которое сообщает прогон.",
    reasonChange: "Как было, сокращено до одной мысли о том, где отчёт прогона показывает SpecTag.",
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
  testsFrom: ["refuses a symbol of the system's code carrying no tag", "refuses a tag that stands on no symbol"],
  proposal: {
    title: "SpecTags on the system's code other than tests",
    ruTitle: "SpecTag в коде системы помимо тестов",
    titleChange: "Было: «SpecTags on the system's code». Код системы включает тесты (правило 9.1), а узел, как строка 10.1.26, говорит о коде помимо тестов; тесты проверяет узел «The SpecTags the tests carry».",
    parts: [
      P("`sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) other than tests (§s-k6dzuajejrw4cej):",
        "`sheriff binding` отвергает в коде системы (§s-hheus6f395ynqvc) помимо тестов каждое из следующего (§s-k6dzuajejrw4cej):",
        "Было: «`sheriff binding` читает SpecTag каждого символа кода системы». Теперь узел начинается с того, что отвергается, и реализует строку 10.1.26: код привязан одним из способов правила 1.5.2, и каждый SpecTag называет правило или говорит, что код не реализует никакого."),
      L("a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;",
        "символ (§s-kgbzk2ph9e6jfb4), который не привязывает ни один SpecTag (§s-5z5gnu7pahr82xp);",
        "Было: символ без SpecTag. Вложенный символ привязывает и SpecTag символа, в который он вложен (правило 1.5.2)."),
      L("a file that is to be bound as a whole (§" + S.fileStart + ", §" + S.bindings + ") and that no SpecTag binds;",
        "файл, который должен быть привязан целиком (§" + S.fileStart + ", §" + S.bindings + "), но который не привязывает ни один SpecTag;",
        "Новое: по правилу 1.5.2 файл, символы которого проверки не могут определить, привязывается SpecTag в начале или записью в файле привязок."),
      L("in a file whose language a description covers (§" + S.symbol + "), a SpecTag outside the comment directly above a symbol;",
        "в файле на языке, который охватывает описание (§" + S.symbol + "), SpecTag вне комментария непосредственно над символом;",
        "Было в коде (code.ts), но не в тексте узла. По вашему решению по строке 10.1.26 от 2026-11-13 эта строка проверяет и то, где стоят SpecTag."),
      L("in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;",
        "в таком файле SpecTag, который делит строку с чем-либо, кроме ограничителей комментария;",
        "Было в коде (code.ts), но не в тексте узла, по той же причине."),
      L("in a file bound by SpecTags at its start, a SpecTag on a line after its start;",
        "в файле, привязанном SpecTag в начале, SpecTag на строке после его начала;",
        "Новое, по той же причине."),
      L("an entry in the bindings file (§" + S.bindings + ") for a file that is not part of the system's code other than tests, or whose format allows comments;",
        "запись в файле привязок (§" + S.bindings + ") для файла, который не относится к коду системы помимо тестов или формат которого допускает комментарии;",
        "Новое: по правилу 1.5.2 запись в файле привязок — только для файла, формат которого не допускает комментариев."),
      L("a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);",
        "SpecTag, sid которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом (§s-5z5gnu7pahr82xp);",
        "Новое: прежде инструменты спрашивали только, существует ли узел (binding.ts:179). Строка 10.1.26 требует, чтобы SpecTag называл правило; какие узлы считаются правилами, говорит узел «The form of a SpecTag». SpecTag, sid которого не называет никакого узла, отвергает узел «A SpecTag that names no node»."),
      L("code that carries `@spec none` together with a SpecTag that names a rule.",
        "код, у которого есть `@spec none` вместе с SpecTag, который называет правило.",
        "Новое: такой код одновременно говорит, что реализует правило и что не реализует никакого."),
      P("The refusal names the file, and the symbol and the line where there are any.",
        "Отказ называет файл, а также символ и строку, если они есть.",
        "Новое: что называет отказ."),
      P("`sheriff binding` makes this check whether the specification is approved or a draft. For code that the commit leaves unchanged (§s-2x58az67bm6cxq2) and that no SpecTag binds, the check of code and tests outside the commit applies instead (§" + S.outside + ").",
        "`sheriff binding` выполняет эту проверку, одобрена ли спецификация или она черновик. Для кода, который коммит оставляет неизменным (§s-2x58az67bm6cxq2) и который не привязывает ни один SpecTag, вместо неё действует проверка кода и тестов за пределами коммита (§" + S.outside + ").",
        "Было: пока коммит оставляет спецификацию черновиком, символ без SpecTag, который коммит не меняет, сообщается, а не отвергается. По правилу 9.5, которое вы согласовали 2026-11-17, и по столбцу «On failure» строки 10.1.26 такой код теперь обрабатывает отдельный узел «Code and tests outside the commit that carry no SpecTag». Что проверка идёт и в черновике — по вашему решению от 2026-11-20: проверки того, что новый код привязан к правилам, идут и тогда."),
    ],
    reason: "A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code under it is then as unbound as code with no SpecTag.",
    ruReason: "SpecTag, который нельзя отнести к одному символу или одному файлу или который называет узел, который никакой код не может реализовать, ничего не привязывает. Код под ним тогда так же не привязан, как код без SpecTag.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A function carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which binds the function to no rule.",
      "У функции есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу.")],
    refs: [R("implements", "s-k6dzuajejrw4cej"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", S.symbol), R("cites", "s-5z5gnu7pahr82xp"), R("cites", S.fileStart),
      R("cites", S.bindings), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-2x58az67bm6cxq2"), R("cites", S.outside)],
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
  stage3: "binding.ts:167-184 refuses a top-level symbol without a SpecTag and the problems that code.ts finds. It is to refuse also a file to be bound as a whole that no SpecTag binds, a SpecTag after the start of such a file, an entry in the bindings file for a file that is not code other than tests or whose format allows comments, a SpecTag whose node is of no kind listed in s-5z5gnu7pahr82xp, and code carrying `@spec none` beside another SpecTag. binding.ts:171-173 (the draft report) moves to " + S.outside + ", and binding.ts:180 (a draft node on a changed symbol) to row 10.1.28a (s-2x58az67bm6cxq2). The tests at binding.test.ts:23 and :95 are to carry s-9rtrj24myzjvshu; the tests of the new refusals are written first.",
});

add("new:tools-7-2-no-node", {
  from: "s-9rtrj24myzjvshu",
  location: "tools 7.2.2a (new, after \"SpecTags on the system's code other than tests\")",
  sidValue: S.noNode,
  testsFrom: ["refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes"],
  proposal: {
    title: "A SpecTag that names no node",
    ruTitle: "SpecTag, который не называет ни одного узла",
    parts: [
      P("`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx). It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including its tests and the bindings file (§" + S.bindings + "). It refuses any other such SpecTag, naming the file, the line and the sid (§s-w4g56n2bs753rt3).",
        "`sheriff binding` принимает SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp), только если его sid называет узел модели спецификации (§s-w6gybeqn2ttydqx). Он проверяет каждый такой SpecTag в коде системы (§s-hheus6f395ynqvc), в том числе в его тестах и в файле привязок (§" + S.bindings + "). Любой другой такой SpecTag он отвергает, называя файл, строку и sid (§s-w4g56n2bs753rt3).",
        "Новое: узел вынесен из «SpecTags on the system's code» и реализует строку 10.1.28. По вашему решению по этой строке от 2026-11-13 она проверяет только, существует ли правило; что правило-черновик не реализуется, проверяет строка 10.1.28a."),
      P("It refuses such a SpecTag whether or not the commit changes the code or the test that the SpecTag is on, and whether the specification is approved or a draft.",
        "Он отвергает такой SpecTag, меняет ли коммит код или тест, на котором стоит SpecTag, или нет, и одобрена ли спецификация или она черновик.",
        "Новое в тексте; так делает код (binding.ts:179 и :201). Столбец «On failure» строки 10.1.28 — «refused», без исключений."),
    ],
    reason: "A SpecTag whose sid names no node binds its code or test to nothing, whether the sid was mistyped or its node was removed. A removed node leaves such SpecTags in code that the commit removing the node does not touch, so every SpecTag is looked up at every commit.",
    ruReason: "SpecTag, sid которого не называет ни одного узла, привязывает свой код или тест ни к чему, опечатан ли sid или его узел удалён. Удалённый узел оставляет такие SpecTag в коде, которого не касается коммит, удаляющий узел, поэтому каждый SpecTag проверяется при каждом коммите.",
    reasonChange: "Новое.",
    examples: [X(
      "A rule is removed, while a function elsewhere still carries its SpecTag. The commit that removes the rule changes no code, and `sheriff binding` refuses the SpecTag on the function. The most likely mistake is to look up only the SpecTags on code that the commit changes, which lets the SpecTag pass until someone edits the function.",
      "Правило удаляют, а у функции в другом месте всё ещё есть его SpecTag. Коммит, удаляющий правило, не меняет кода, и `sheriff binding` отвергает SpecTag у функции. Самая вероятная ошибка — проверять только SpecTag кода, который меняет коммит: тогда SpecTag проходит, пока кто-нибудь не изменит функцию.")],
    refs: [R("implements", "s-w4g56n2bs753rt3"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-hheus6f395ynqvc"), R("cites", S.bindings), R("cites", "s-w6gybeqn2ttydqx")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:179 and :201 refuse a SpecTag naming no node on code and on tests; the entries of the bindings file are to be read too. The check of citations outside the specification (binding.ts:519-537, s-m8nmfsxkcfu7cjp) also refuses such a sid, and is to leave SpecTags to this node, so that one SpecTag is refused once (item 35). The part of binding.test.ts:29 on a SpecTag naming no node is to carry " + S.noNode + "; its part on a draft node goes to row 10.1.28a.",
});

add("new:tools-7-2-outside", {
  from: "s-j9r8z4xdrfkfs47",
  location: "tools 7.2.2b (new, after \"A SpecTag that names no node\")",
  sidValue: S.outside,
  testsFrom: [
    "while the commit leaves the specification a draft reports an untagged symbol a commit leaves alone",
    "in draft mode reports a test carrying no SpecTag that a commit leaves alone",
  ],
  proposal: {
    title: "Code and tests outside the commit that carry no SpecTag",
    ruTitle: "Код и тесты за пределами коммита без SpecTag",
    parts: [
      P("`sheriff binding` gives the warning and the refusal that the rule on code and tests without a SpecTag requires (§s-kkbqcb9xrpaepwn) for each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2):",
        "`sheriff binding` выдаёт предупреждение и отказ, которых требует правило о коде и тестах без SpecTag (§s-kkbqcb9xrpaepwn), для каждого из следующего, что коммит оставляет неизменным (§s-2x58az67bm6cxq2):",
        "Новое: узел реализует правило 9.5, которое вы согласовали 2026-11-17, и столбец «On failure» строк 10.1.26 и 10.1.26a. Прежде такой код сообщал узел «From a draft to an approved specification, and back», пока спецификация — черновик; правило 9.5 больше не зависит только от черновика."),
      L("a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§" + S.fileStart + ", §" + S.bindings + ") of the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-5z5gnu7pahr82xp) binds;",
        "символ (§s-kgbzk2ph9e6jfb4) или файл, который должен быть привязан целиком (§" + S.fileStart + ", §" + S.bindings + "), кода системы (§s-hheus6f395ynqvc), который не привязывает ни один SpecTag (§s-5z5gnu7pahr82xp);",
        "Новое; файлы, привязанные целиком, — по правилу 1.5.2."),
      L("a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc).",
        "тест кода системы, который не объявляет SpecTag (§s-zrsc6asgmhv8tnc).",
        "Новое; правило 9.5 говорит о коде, включая тесты."),
      P("It reads the specification's approval status and its `strict` flag from the latest entries in `sheriff.config.json` that set them, as the commit leaves that file (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).",
        "Статус одобрения спецификации и её флаг `strict` он читает из последних записей `sheriff.config.json`, которые их задают, в том виде, в каком коммит оставляет этот файл (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).",
        "Новое: откуда читаются статус и флаг. «В том виде, в каком коммит оставляет файл» — как в прежнем узле («пока коммит оставляет спецификацию черновиком»)."),
      P("The warning and the refusal name `sheriff untagged`, which lists such code by file and symbol (§s-weuyx98r7c923ab).",
        "Предупреждение и отказ называют `sheriff untagged`, который перечисляет такой код по файлам и символам (§s-weuyx98r7c923ab).",
        "Новое: команда, которую требует назвать правило 9.5, — `sheriff untagged` из согласованного узла «The list of code that carries no SpecTag»."),
    ],
    reason: "The approval status and the `strict` flag decide what such code costs, and a commit may change either of them. So they are read as the commit leaves them.",
    ruReason: "Статус одобрения и флаг `strict` определяют, чего стоит такой код, а коммит может изменить любой из них. Поэтому они читаются в том виде, в каком их оставляет коммит.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit adds the entry that approves the specification while its `strict` flag is off, and old code elsewhere carries no SpecTag. The commit is judged by the specification as the commit leaves it, approved, so the commit passes with the warning, which names `sheriff untagged`. The most likely mistake is to judge the commit by the status before it, a draft, so that the commit that approves the specification passes without the warning.",
      "Коммит добавляет запись, которая одобряет спецификацию, при выключенном флаге `strict`, а у старого кода в другом месте нет SpecTag. Коммит оценивается по спецификации в том виде, в каком он её оставляет, — одобренной, поэтому коммит проходит с предупреждением, которое называет `sheriff untagged`. Самая вероятная ошибка — оценивать коммит по статусу до него, черновику: тогда коммит, который одобряет спецификацию, проходит без предупреждения.")],
    refs: [R("implements", "s-kkbqcb9xrpaepwn"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", S.fileStart), R("cites", S.bindings),
      R("cites", "s-hheus6f395ynqvc"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-zrsc6asgmhv8tnc"), R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-q3pfzyaxvpr2zj2"), R("cites", "s-weuyx98r7c923ab")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:171-173 and :190-197 report each such symbol and test while the specification is a draft and refuse them while it is approved. They are to pass silently while it is a draft, to give one warning for all of them while it is approved and the strict flag is off, naming sheriff untagged, and to refuse while the flag is on. The status and the flag are to be read from the entries in sheriff.config.json, not from the rule in project.json (binding.ts:138-162). The tests at binding.test.ts:444 and :574 are rewritten first for this node and carry " + S.outside + ".",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 25: "The SpecTags the tests carry" (s-utf4mbt7ref8g9c), rows 10.1.26a and 10.1.31, split in two.
// ---------------------------------------------------------------------------------------------------------------
add("s-utf4mbt7ref8g9c", {
  location: "tools 7.2.4",
  sidValue: "s-utf4mbt7ref8g9c",
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
      P("`sheriff binding` refuses each test of the system's code (§s-hheus6f395ynqvc) that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag where the description of its language places it (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp). The refusal names the test, its file and its line.",
        "`sheriff binding` отвергает каждый тест кода системы (§s-hheus6f395ynqvc), который коммит добавляет или меняет (§s-2x58az67bm6cxq2) и который не объявляет SpecTag там, где его ставит описание языка теста (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp). Отказ называет тест, его файл и строку.",
        "Было: «`sheriff binding` читает каждый тест на SpecTag, который у него есть». Теперь узел начинается с того, что отвергается, и реализует строку 10.1.26a."),
      P("It also refuses each test, changed or not, whose SpecTag (§s-5z5gnu7pahr82xp) names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule.",
        "Он отвергает и каждый тест, изменённый или нет, SpecTag (§s-5z5gnu7pahr82xp) которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом.",
        "Было: «SpecTag теста сверяется с правилами, терминами и узлами собственного NodeKind проекта». Термин больше не допускается: тест ссылается на правило (правило 1.4.2). Какие узлы — правила, говорит узел «The form of a SpecTag». SpecTag, sid которого не называет никакого узла, отвергает узел «A SpecTag that names no node». Что тест, который меняет коммит, называет одобренное правило, проверяет строка 10.1.28a (пункт 29)."),
      P("A test whose name or mark holds a bare sid (§s-gb8s9657a65hqmv) declares no SpecTag. Its refusal names `sheriff reindex`, which writes the SpecTag.",
        "Тест, название или пометка которого содержит голый sid (§s-gb8s9657a65hqmv), не объявляет SpecTag. Отказ по нему называет `sheriff reindex`, который записывает SpecTag.",
        "Как было. Убрано: тест, единственное изменение которого ставит `@spec ` перед голым sid, больше не считается неизменённым. По правилу 9.4 и вашему решению по нему от 2026-11-10 SpecTag должен оставаться тем же, а не только называть тот же узел."),
      P("`sheriff binding` reads the tests in each file that the glob patterns for tests in `sheriff.config.json` match, where a description covers the file's language (§" + S.symbol + "). For a test that the commit leaves unchanged and that declares no SpecTag, the check of code and tests outside the commit applies instead (§" + S.outside + "). `sheriff binding` makes this check whether the specification is approved or a draft.",
        "`sheriff binding` читает тесты в каждом файле, которому соответствуют glob-шаблоны тестов в `sheriff.config.json`, если язык файла охватывает описание (§" + S.symbol + "). Для теста, который коммит оставляет неизменным и который не объявляет SpecTag, вместо этой проверки действует проверка кода и тестов за пределами коммита (§" + S.outside + "). `sheriff binding` выполняет эту проверку, одобрена ли спецификация или она черновик.",
        "Было: пока коммит оставляет спецификацию черновиком, тест без SpecTag, который коммит не меняет, сообщается, а не отвергается. Теперь такой тест обрабатывает узел о коде и тестах за пределами коммита, по правилу 9.5. Убраны два последних пункта о тестах собственных проверок и генераторов проекта: по вашему решению по правилу 10.10 от 2026-11-13 эти требования сняты. Пункт о SpecTag изменённых символов перенесён в узел «A test for each rule whose code a commit changes»."),
    ],
    reason: "A test counts toward the rule that its SpecTag names when the SpecSheriff tools judge whether that rule is implemented (§s-6fw72j65jkqrfpf). A test with no SpecTag, or with one that names a section or a term, counts toward no rule.",
    ruReason: "Тест засчитывается правилу, которое называет его SpecTag, когда инструменты SpecSheriff решают, реализовано ли это правило (§s-6fw72j65jkqrfpf). Тест без SpecTag или с SpecTag, который называет раздел или термин, не засчитывается ни одному правилу.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A test opens its name with `@spec s-…`, where the sid is that of the term `request`. `sheriff binding` refuses the test, since a term is not a rule. The most likely mistake is to accept the test because the term exists, as an earlier release did.",
      "Название теста начинается с `@spec s-…`, где sid — sid термина `request`. `sheriff binding` отвергает тест, потому что термин — не правило. Самая вероятная ошибка — принять тест, потому что термин существует, как это делал прежний выпуск.")],
    refs: [R("implements", "s-ay6wntm2dxcgpnp"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-gb8s9657a65hqmv"), R("cites", S.symbol), R("cites", S.outside),
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
  stage3: "binding.ts:202 accepts a test naming a term and refuses one naming a TableRule or a RecordType; it is to accept only the kinds listed in s-5z5gnu7pahr82xp. binding.ts:42-51 (testLines) and code.ts:277 (onlySpecTagged) are to stop counting a test whose only change puts `@spec ` before a bare sid as unchanged (s-9j2mmnuuwmx5ksn), and binding.test.ts:561 is rewritten first. binding.ts:363-384 (projectToolTests) is removed with binding.test.ts:426, since the ruling of 2026-11-13 on s-sfjka4zc4rhfu67 removed those requirements. binding.ts:190-197 (the draft report) moves to " + S.outside + ". The tests at binding.test.ts:101, :253 and :554 and code.test.ts:56 carry s-utf4mbt7ref8g9c, the first two rewritten for the kinds of this node.",
});

add("new:tools-7-2-rule-test", {
  from: "s-utf4mbt7ref8g9c",
  location: "tools 7.2.4a (new, after \"The SpecTags the tests carry\")",
  sidValue: S.ruleTest,
  testsFrom: ["refuses a rule whose code a commit adds or changes with no test carrying its sid"],
  proposal: {
    title: "A test for each rule whose code a commit changes",
    ruTitle: "Тест для каждого правила, код которого меняет коммит",
    parts: [
      P("`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-m82tz4mp3f9r3fg). It takes the tests as the commit leaves them. It refuses any other such commit, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
        "`sheriff binding` принимает коммит, который добавляет или меняет код, привязанный к правилу (§s-5z5gnu7pahr82xp), только если какой-либо тест кода системы (§s-hheus6f395ynqvc) объявляет SpecTag этого правила (§s-m82tz4mp3f9r3fg). Тесты он берёт в том виде, в каком их оставляет коммит. Любой другой такой коммит он отклоняет, называя правило по его файлу, sid и расположению (§s-kag2m9tzdnduxdx).",
        "Новое: узел вынесен из «The SpecTags the tests carry» и реализует строку 10.1.31. Что называет отказ — новое."),
      P("The code here is each symbol and each file bound as a whole, other than tests, that the commit adds or changes (§s-2x58az67bm6cxq2). A rule is bound to such code where one of the code's SpecTags names the rule.",
        "Код здесь — это каждый символ и каждый файл, привязанный целиком, помимо тестов, которые коммит добавляет или меняет (§s-2x58az67bm6cxq2). Правило привязано к такому коду, если его называет один из SpecTag этого кода.",
        "Новое в тексте; так делает код (binding.ts:181 и :210-212). Файлы, привязанные целиком, — новое, по правилу 1.5.2."),
      P("A test counts here whether or not the commit changes it, including a test marked as skipped. `sheriff binding` makes this check whether the specification is approved or a draft.",
        "Тест здесь засчитывается, меняет ли его коммит или нет, в том числе тест, помеченный как пропускаемый. `sheriff binding` выполняет эту проверку, одобрена ли спецификация или она черновик.",
        "Новое в тексте. Строка 10.1.31 требует только, чтобы был тест с SpecTag правила; пропущенный тест учитывает строка 10.1.41."),
    ],
    reason: "A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.",
    ruReason: "Тест правила пишется раньше его кода (§s-rah8b37kytb682y). Поэтому код, добавленный или изменённый для правила, которое не называет ни один тест, написан раньше теста этого правила или без него.",
    reasonChange: "Новое.",
    examples: [X(
      "A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, which refuses a commit whose test was committed earlier.",
      "Коммит добавляет функцию, SpecTag которой называет правило, и ни один тест в репозитории не объявляет SpecTag этого правила. `sheriff binding` отклоняет коммит и называет правило. Самая вероятная ошибка — искать тест только среди тестов, которые меняет коммит: тогда отклоняется коммит, тест которого был закоммичен раньше.")],
    refs: [R("implements", "s-m82tz4mp3f9r3fg"), R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-rah8b37kytb682y")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:181 counts a changed symbol's SpecTag only for a TextRule or a project's own kind that needs code (coded). It is to count every kind listed in s-5z5gnu7pahr82xp, files bound as a whole and the entries of the bindings file; binding.ts:210-212 then refuses as now. The test at binding.test.ts:116 is to carry " + S.ruleTest + ".",
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal for rule 10.4 (s-nyh9yk22ba6g77q), which the judgement on the code needs: question Q1.
// ---------------------------------------------------------------------------------------------------------------
add("proposal:s-nyh9yk22ba6g77q", {
  question: "Q1: whether the reviewer is also given the wording of each rule to which a SpecTag binds a test that the commit adds or changes",
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
      L("the commit's change, less the files generated from the specification;", "изменение коммита, кроме файлов, сгенерированных из спецификации;", "Как в согласованной формулировке."),
      L("the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;",
        "формулировку каждого правила или термина (§s-khqsmy6mhejkrhg), которые называет сообщение коммита;",
        "Как в согласованной формулировке; добавлена ссылка на правило 3.3 при первом упоминании термина (правило 7.2.7)."),
      L("the wording of each rule to which a SpecTag (§s-8xw4mgvpexyvw5q) binds code or a test that the commit adds or changes;",
        "формулировку каждого правила, к которому SpecTag (§s-8xw4mgvpexyvw5q) привязывает код или тест, добавленный или изменённый коммитом;",
        "Было: «…привязывает код, добавленный или изменённый коммитом, не считая тестов». По правилу 9.1 тесты входят в код системы, и правило 1.6.1 велит рецензенту судить, делает ли изменённый код то, что говорят правила, названные в коммите. Чтобы судить изменённый тест, рецензенту нужна формулировка правила, которое называет SpecTag теста. Пока спецификация одобрена, это правило рецензент и так получает: по строке 10.1.40 при изменении тестов правила меняется и его код, или сообщение утверждает, что реализацию менять не нужно. Лишняя стоимость возникает только, пока спецификация — черновик. См. вопрос 1."),
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
      P("A node's wording here is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).",
        "Формулировка узла здесь — его заголовок, текст, обоснование, примеры и поля, которые добавляет его тип, как их покрывает одобрение (§s-5ah25f6gy99panq).",
        "Как в согласованной формулировке."),
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
  cost: {
    en: "In a review while the specification is approved, nothing: the rule of a changed test is then given anyway. While it is a draft, the wording of the rule of each test that a commit changes without that rule's code.",
    ru: "Пока спецификация одобрена — ничего: правило изменённого теста тогда передаётся и так. Пока она черновик — формулировка правила каждого теста, который коммит меняет без кода этого правила.",
  },
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
for (const m of backupText.matchAll(sidRe)) known.add(m[0]);
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
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/]) {
    if (bad.test(en)) problems.push(`${key}: the English holds ${bad}`);
  }
  if (/несёт|несут|несущ/.test([p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n"))) problems.push(`${key}: the Russian says «несёт»`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group2.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 2: the English of every node",
  "",
  "This file holds the final English of every node of group 2 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group2.mjs: the drafts of the appendix of the tools and the proposal for rule 10.4.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its list and its examples.",
  "propose-group2.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "", `**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  if (p.list) md.push("**List of:**", "", p.list.of, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group2.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
