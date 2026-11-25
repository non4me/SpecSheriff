// T25, stage 2, group 2, round d: applies the final reviews (review-g2c-a.md and review-g2c-b.md), the reader's report
// on the sentences of round c (english-g2c-fast.md) and the coordinator's rulings of round d.
//
// The script copies tools-drafts.json to tools-drafts.before-group2-d.json before its first run, and rebuilds the
// keys of group 2 from that copy on every run, so that a second run gives the same file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group2-d.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = (letter) => `specsheriff-rule-reviewer's final review, 2026-11-24: review-g2c-${letter}.md; EngStickler's reader, 2026-11-24: english-g2c-fast.md; fix-group2-d.mjs applied the findings and the coordinator's rulings`;
const RULINGS_17 = "по вашим решениям от 2026-11-17 по строкам 10.1.26 и 10.1.26a";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const R = (type, to) => ({ type, to });

const GROUP = [
  "s-vp24dqydygztqbt", "new:tools-7-3-review-code", "new:tools-7-3-review-statement", "new:tools-7-3-review-appendix",
  "new:tools-9-no-change-trailer", "new:tools-10-section", "s-xr5xxa9cxf2mq5u", "new:tools-10-verdict", "new:tools-10-start",
  "new:tools-10-limit", "new:tools-10-claude", "new:tools-10-codex", "new:tools-10-settings", "new:tools-8-section",
  "s-5z5gnu7pahr82xp", "new:tools-8-symbol", "new:tools-8-file-start", "new:tools-8-bindings", "s-zrsc6asgmhv8tnc",
  "s-9rtrj24myzjvshu", "new:tools-7-2-no-node", "new:tools-7-2-outside", "s-utf4mbt7ref8g9c", "new:tools-7-2-rule-test",
  "proposal:s-nyh9yk22ba6g77q", "proposal:s-weuyx98r7c923ab",
];
const REVIEWED = {
  "s-vp24dqydygztqbt": "a", "new:tools-7-3-review-code": "a", "new:tools-7-3-review-statement": "a", "new:tools-7-3-review-appendix": "a",
  "new:tools-10-verdict": "a", "proposal:s-weuyx98r7c923ab": "a",
  "new:tools-10-start": "b", "new:tools-10-codex": "b", "new:tools-10-settings": "b", "s-9rtrj24myzjvshu": "b", "new:tools-7-2-rule-test": "b",
};

// The helpers that change one draft. Each finds a part by a piece of its English, which must be in exactly one part.
const P_ = (key) => {
  if (!drafts[key]) throw new Error(`no draft ${key}`);
  return drafts[key].proposal;
};
const find = (key, needle) => {
  const hits = P_(key).parts.filter((x) => x.en.includes(needle));
  if (hits.length !== 1) throw new Error(`${key}: ${hits.length} parts hold "${needle}"`);
  return hits[0];
};
// Replaces a piece of a part's English and of its Russian; each piece must be in the part.
const swap = (key, needle, [oldEn, newEn], [oldRu, newRu], change) => {
  const x = find(key, needle);
  if (oldEn !== null) {
    if (!x.en.includes(oldEn)) throw new Error(`${key}: the English lacks "${oldEn}"`);
    x.en = x.en.replace(oldEn, newEn);
  }
  if (oldRu !== null) {
    if (!x.ru.includes(oldRu)) throw new Error(`${key}: the Russian lacks "${oldRu}"`);
    x.ru = x.ru.replace(oldRu, newRu);
  }
  if (change !== undefined) x.change = change;
};
const setChange = (key, needle, fn) => {
  const x = find(key, needle);
  x.change = fn(x.change);
};
const text = (s, oldS, newS, what) => {
  if (!s.includes(oldS)) throw new Error(`${what} lacks "${oldS}"`);
  return s.replace(oldS, newS);
};
const addRef = (key, type, to) => {
  const p = P_(key);
  if (!p.refs.some((r) => r.to === to)) p.refs.push(R(type, to));
};
const dropRef = (key, to) => {
  const p = P_(key);
  p.refs = p.refs.filter((r) => r.to !== to);
};

// ---------------------------------------------------------------------------------------------------------------
// Q1 is dropped: the rulings already give answer B (review-g2c-a.md, "Q1"). The change notes cite those rulings.
// ---------------------------------------------------------------------------------------------------------------
const B_RULINGS = "принцип «Deterministic checks hold every participant to the contract» не ставит этому суждению условий; правила 1.6.1 (решение от 2026-11-19) и 10.2 (решение от 2026-11-20) велят рецензенту выносить его; правило 10.5 (решение от 2026-11-20) отклоняет коммит без ответа, который можно прочитать; строка 10.1.43a (решение от 2026-11-20) проходит, пока спецификация — черновик";
const B_RULINGS_EN = "the rulings of 2026-11-19 on rule 1.6.1 and of 2026-11-20 on rule 10.2 and row 10.1.43a";

// s-vp24dqydygztqbt — A1 to A3 (review-g2c-a.md, A).
{
  const k = "s-vp24dqydygztqbt";
  swap(k, "refuses a commit where the verdict",
    ["needs no change (§s-kgqxg4gunzynwsv).", "needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists at least one other finding."],
    ["менять не нужно (§s-kgqxg4gunzynwsv).", "менять не нужно (§s-kgqxg4gunzynwsv). В этом случае он отклоняет коммит, только если вердикт перечисляет хотя бы одно другое замечание."]);
  setChange(k, "refuses a commit where the verdict", (c) => text(c, "Последнее предложение — для ответа B на вопрос 1: пока спецификация — черновик, рецензент выносит и суждение об утверждении, что реализацию правила менять не нужно, но по вашему решению по строке 10.1.43a от 2026-11-20 коммит проходит эту проверку молча.",
    "Последние два предложения выполняют уже принятые решения: " + B_RULINGS + ". Поэтому в черновике рецензент судит и такое утверждение, но его замечание не учитывается, а коммит отклоняется только из-за других замечаний (рецензент).", `${k} part 0`));
  swap(k, "asks for a verdict only on a commit",
    ["for which the reviewer makes at least one of the following judgements", "for which the reviewer must make at least one of the following judgements"],
    ["по которому рецензент выносит хотя бы одно из следующих суждений", "по которому рецензент должен вынести хотя бы одно из следующих суждений"]);
  setChange(k, "asks for a verdict only on a commit", (c) => c + " «Должен вынести» — слова правила 10.5 (рецензент).");
  swap(k, "the judgement on each node of the technical appendix",
    ["the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves (§s-4bwa4zepd4nwcv8).",
      "the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8)."],
    ["суждение о каждом узле технического приложения (§s-tj38pvm38nepaf5), который одобряется в коммите (§s-4bwa4zepd4nwcv8).",
      "суждение о каждом узле технического приложения (§s-tj38pvm38nepaf5), который одобряется в коммите и реализует правило базовой спецификации (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8)."]);
  setChange(k, "that the commit approves and that implements", (c) => c + " Узел приложения, который не реализует правило базовой спецификации, ревью не запускает: так суждение совпадает с узлом о нём (рецензент).");
  addRef(k, "cites", "s-5x737t9nee4zgaa");
  const p = P_(k);
  p.reason = text(p.reason, "only on a commit that needs one of its judgements.", "only on a commit that needs one of the reviewer's judgements.", `${k} reason`);
  p.ruReason = text(p.ruReason, "по которому нужно суждение.", "по которому нужно одно из его суждений.", `${k} ruReason`);
  delete drafts[k].dependsOn;
  drafts[k].stage3 = text(drafts[k].stage3, "(answer B to Q1).", `(${B_RULINGS_EN}), and then to refuse the commit only where the verdict lists at least one other finding.`, `${k} stage3`);
}

// new:tools-7-3-review-code — B1, B2 (review-g2c-a.md, B) and the reader.
{
  const k = "new:tools-7-3-review-code";
  swap(k, "each file that the commit adds or changes and that is bound as a whole;",
    ["each file that the commit adds or changes and that is bound as a whole;", "each file that the commit adds or changes and that is bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);"],
    ["каждый файл, привязанный целиком, который коммит добавляет или меняет;", "каждый файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), который коммит добавляет или меняет;"]);
  setChange(k, "bound as a whole (§s-5qdjyf6t898rsd4", (c) => c + " Ссылки при первом упоминании, как в соседних узлах (рецензент).");
  addRef(k, "cites", "s-5qdjyf6t898rsd4");
  addRef(k, "cites", "s-trwczfskj5zmuft");
  const p = P_(k);
  p.ruTitle = "Суждение о коде, изменённом коммитом";
  p.titleChange = "Русский заголовок: «о коде, который меняет коммит» читалось сначала как код, который меняет коммит сам (рецензент).";
  swap(k, "That is each of the following",
    ["That is each of the following, in full, as the commit leaves it,", "That code consists of the following, each in full, as the commit leaves it,"],
    ["Это каждое из следующего целиком, в том виде, в каком его оставляет коммит,", "Этот код состоит из следующего, каждое целиком в том виде, в каком его оставляет коммит,"]);
  swap(k, "leaves out something required by a rule",
    ["that the commit's message names anywhere other than in an `Implementation-Needs-No-Change` trailer", "that the commit's message names outside an `Implementation-Needs-No-Change` trailer"], [null, null]);
}

// new:tools-7-3-review-statement — C1 (review-g2c-a.md, C) and the reader.
{
  const k = "new:tools-7-3-review-statement";
  swap(k, "falsely states",
    ["`sheriff review` refuses a commit on such a finding only where", "`sheriff review` refuses a commit because of such a finding only where"],
    [null, null]);
  swap(k, "falsely states",
    ["Where the commit leaves it a draft, the commit passes this check silently.", "Where the commit leaves it a draft, `sheriff review` disregards such a finding silently."],
    ["Если коммит оставляет её черновиком, коммит проходит эту проверку молча.", "Если коммит оставляет её черновиком, `sheriff review` молча не учитывает такое замечание."]);
  setChange(k, "falsely states", (c) => text(c, "Коммит отклоняется, пока спецификация одобрена, и проходит молча, пока она черновик, — по вашему решению по этой строке от 2026-11-20. Написано для ответа B на вопрос 1.",
    "Коммит отклоняется, пока спецификация одобрена; пока она черновик, `sheriff review` молча не учитывает такое замечание. Так выполняются уже принятые решения: " + B_RULINGS + ". Последнее предложение — рецензента: тот же глагол, что в узле «The review of a commit».", `${k} part 0`));
  setChange(k, "by means of a trailer", (c) => text(c, "Второе — второго ревью, для ответа B на вопрос 1:", "Второе — второго ревью, по уже принятым решениям:", `${k} part 1`));
  delete drafts[k].dependsOn;
  drafts[k].stage3 = text(drafts[k].stage3, "(answer B to Q1)", `(${B_RULINGS_EN})`, `${k} stage3`);
}

// new:tools-7-3-review-appendix — D1 (review-g2c-a.md, D) and the reader.
{
  const k = "new:tools-7-3-review-appendix";
  const p = P_(k);
  p.ruTitle = "Суждение об узле технического приложения, который одобряется в коммите";
  p.titleChange += " Русский заголовок: «узел…, который одобряет коммит» читалось так, будто узел одобряет коммит (рецензент).";
  swap(k, "Each finding names the node",
    ["`sheriff review` refuses a commit on such a finding whatever", "`sheriff review` refuses a commit because of such a finding whatever"], [null, null]);
  swap(k, "a top-level section of the base specification is a section",
    ["a top-level section of the base specification is a section whose location", "a top-level section of the base specification means a section whose location"], [null, null]);
}

// new:tools-10-verdict — E1 (review-g2c-a.md, E) and the reader.
{
  const k = "new:tools-10-verdict";
  swap(k, "The runner's CLI is given the schema",
    ["The runner's CLI is given the schema of the verdict. It answers with a JSON object that conforms to that schema.",
      "`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema."],
    ["CLI runner получает схему вердикта. Он отвечает JSON-объектом, который соответствует этой схеме.",
      "`sheriff review` передаёт CLI runner схему вердикта. CLI runner отвечает JSON-объектом, который соответствует этой схеме."]);
  setChange(k, "gives the runner's CLI the schema", (c) => text(c, "Последнее предложение — для ответа B на вопрос 1:", "Последнее предложение выполняет уже принятые решения (" + B_RULINGS + "):", `${k} part 1`) + " Первые два предложения называют, кто передаёт схему и кто отвечает (рецензент).");
  const p = P_(k);
  p.reason = text(p.reason, "decide the commit in place of", "decide the outcome of the commit in place of", `${k} reason`);
  delete drafts[k].dependsOn;
  drafts[k].stage3 = text(drafts[k].stage3, "(answer B to Q1)", `(${B_RULINGS_EN})`, `${k} stage3`);
}

// The proposal for s-weuyx98r7c923ab — F1 and F3 (review-g2c-a.md, F).
{
  const k = "proposal:s-weuyx98r7c923ab";
  const x = P_(k).parts[0];
  x.en = text(x.en, "`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-9rtrj24myzjvshu).",
    "`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-3xx2eukc8gtd2tx), including the tests.", `${k} en`);
  x.ru = text(x.ru, "`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-9rtrj24myzjvshu).",
    "`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), включая тесты, который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-3xx2eukc8gtd2tx).", `${k} ru`);
  x.change += " Тесты названы явно («including the tests» в конце предложения вместо предложенного рецензентом «tests included», которого избегают согласованные черновики), и ссылка ведёт на узел о коде и тестах за пределами коммита: признак привязки из узла «SpecTags on the system's code other than tests» к тестам не подходит, потому что у теста SpecTag стоит в названии или в пометке (рецензент).";
  dropRef(k, "s-9rtrj24myzjvshu");
  addRef(k, "cites", "s-3xx2eukc8gtd2tx");
  P_(k).examples = [{
    en: "An old function carries the SpecTag `@spec s-…`, which names a section, and no other SpecTag. `sheriff untagged` lists the function with its file, since that SpecTag binds nothing. The most likely mistake is to list only code that carries no SpecTag at all, so that the function is missing from the list that the warning points to.",
    ru: "У старой функции есть SpecTag `@spec s-…`, который называет раздел, и больше никакого SpecTag. `sheriff untagged` перечисляет эту функцию с её файлом, потому что этот SpecTag ничего не привязывает. Самая вероятная ошибка — перечислять только код, у которого нет SpecTag совсем: тогда функции нет в перечне, на который указывает предупреждение.",
  }];
  drafts[k].stage3 = text(drafts[k].stage3, "It is to list each symbol and each file to be bound as a whole, in code that no SpecTag binds, by the same test as s-9rtrj24myzjvshu applies.",
    "It is to list each symbol, each file to be bound as a whole and each test that no SpecTag binds, as s-3xx2eukc8gtd2tx counts them, whether or not the commit changes them.", `${k} stage3`);
}

// ---------------------------------------------------------------------------------------------------------------
// review-g2c-b.md: the cut in the codex node, the settings fix, the DOUBT on s-9rtrj24myzjvshu and the rule-test fix.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-10-codex";
  swap(k, "The runner `codex` requests the model",
    [" Where `specsheriff.review.codexModel` is empty, it leaves the choice of the model to Codex.", ""],
    [" Если `specsheriff.review.codexModel` пуст, он оставляет выбор модели за Codex.", ""],
    "Как было; настройки теперь описывает свой узел. Абзац начинается с названия runner, а не с «Он». Предложение о пустом `codexModel` вырезано: узел о настройках каждого runner говорит это для каждой настройки, с этим же примером (рецензент).");
  const p = P_(k);
  p.reason = text(p.reason, "without its own home and tools", "without its own home directory and tools", `${k} reason`);
}
{
  const k = "new:tools-10-settings";
  swap(k, "Where a setting is empty",
    ["Where a setting is empty, the runner requests no value for it, so the runner's CLI uses a value of its own.", "Where a setting is empty, the runner leaves the choice of the setting's value to its CLI."],
    ["Если настройка пуста, runner не запрашивает для неё значения, поэтому CLI runner использует собственное значение.", "Если настройка пуста, runner оставляет выбор её значения за своим CLI."]);
  setChange(k, "Where a setting is empty", (c) => c + " Сказано без отрицания: runner оставляет выбор значения своему CLI (рецензент).");
}
{
  const k = "s-9rtrj24myzjvshu";
  swap(k, "code that carries `@spec none` together with another SpecTag.",
    ["code that carries `@spec none` together with another SpecTag.", "a SpecTag on code that carries `@spec none` together with another SpecTag."],
    ["код, у которого есть `@spec none` вместе с другим SpecTag.", "SpecTag кода, у которого есть `@spec none` вместе с другим SpecTag."],
    "Новое: у кода, который не реализует никакого правила, `@spec none` — единственный SpecTag, как говорит узел «The form of a SpecTag». Отвергается каждый SpecTag такого кода, так что неизменённый код с `@spec none` и SpecTag правила тоже ничего не привязывает и получает результат правила 9.5, " + RULINGS_17 + " (рецензент).");
  swap(k, "a text that opens with `@spec`",
    ["where a SpecTag may stand, a text that opens with `@spec` but has none of the forms", "where a SpecTag may be placed, text that begins with `@spec` but matches none of the forms"], [null, null]);
  drafts[k].stage3 = text(drafts[k].stage3, "and code carrying `@spec none` beside another SpecTag.", "and each SpecTag on code carrying `@spec none` beside another SpecTag.", `${k} stage3`);
}
{
  const k = "s-5z5gnu7pahr82xp";
  drafts[k].stage3 = text(drafts[k].stage3, "Code carrying `@spec none` beside another SpecTag is to be refused (s-9rtrj24myzjvshu).",
    "Each SpecTag on code carrying `@spec none` beside another SpecTag is to be refused (s-9rtrj24myzjvshu).", `${k} stage3`);
}
{
  const k = "new:tools-7-2-rule-test";
  swap(k, "accepts a commit that adds or changes code bound to a rule",
    [" It takes the tests as the commit leaves them.", ""], [" Тесты он берёт в том виде, в каком их оставляет коммит.", ""]);
  const p = P_(k);
  const old = find(k, "In this check, a test is taken into account");
  const i = p.parts.indexOf(old);
  const CH = "Новое в тексте. Строка 10.1.31 требует только, чтобы был тест с SpecTag правила; пропущенный тест и тест, который ожидаемо падает, учитывает строка 10.1.41, которая называет их вместе. Две оговорки одного вида записаны списком (рецензент).";
  p.parts.splice(i, 1,
    { kind: "p", en: "In this check, `sheriff binding` takes into account each test as the commit leaves it, including:", ru: "В этой проверке `sheriff binding` засчитывает каждый тест в том виде, в каком его оставляет коммит, в том числе:", change: CH },
    { kind: "li", en: "a test that the commit leaves unchanged;", ru: "тест, который коммит оставляет неизменным;", change: "Пункт списка; см. абзац выше." },
    { kind: "li", en: "a test marked as skipped or as expected to fail.", ru: "тест, помеченный как пропускаемый или как ожидаемо падающий.", change: "Пункт списка; см. абзац выше." },
    { kind: "p", en: "`sheriff binding` runs this check whether the specification is approved or a draft.", ru: "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик.", change: "Новое в тексте: проверка идёт и в черновике, по вашему решению от 2026-11-20." });
}

// new:tools-7-2-no-node — the reader's "stand", fixed wherever the group's English uses it.
{
  const k = "new:tools-7-2-no-node";
  const p = P_(k);
  p.reason = text(p.reason, "wherever that SpecTag stands.", "wherever that SpecTag is placed.", `${k} reason`);
}

// ---------------------------------------------------------------------------------------------------------------
// Every key of the group: its review, no dependence on a question, and its rendered text.
// ---------------------------------------------------------------------------------------------------------------
for (const key of GROUP) {
  const e = drafts[key];
  if (!e) throw new Error(`no draft ${key}`);
  if (REVIEWED[key]) e.review = REVIEW(REVIEWED[key]);
  if (e.dependsOn) {
    e.dependsOn = e.dependsOn.filter((x) => !/^Q[12] of group2-notes\.md/.test(x));
    if (!e.dependsOn.length) delete e.dependsOn;
  }
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
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
const changedKeys = GROUP.filter((k) => JSON.stringify(before[k]?.proposal) !== JSON.stringify(drafts[k].proposal));
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
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
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /held to/, /sign-in\b/, /person who commits/, /makes? (this|a|the) check/, /asks? for (the|no) model/]) {
    if (bad.test(en)) problems.push(`${key}: the English holds ${bad}`);
  }
  if (/несёт|несут|несущ/.test(ru)) problems.push(`${key}: the Russian says «несёт»`);
  if (/вопрос[а-я]* [12]\b|\bQ[12]\b/.test(JSON.stringify({ ...e, assessment: undefined }))) problems.push(`${key}: still mentions Q1 or Q2`);
  if (changedKeys.includes(key)) {
    for (const sentence of [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
      const words = sentence.split(/\s+/).filter(Boolean).length;
      if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
    }
  }
}

// Each node's «Оценка», as group2-assessments.json holds it.
const assessments = JSON.parse(fs.readFileSync(new URL("group2-assessments.json", here), "utf8"));
const CRITERIA = ["согласованность", "целостность", "целесообразность", "избыточность", "недостаточность"];
for (const key of GROUP) {
  const a = assessments[key];
  if (!a) { problems.push(`${key}: no «Оценка» in group2-assessments.json`); continue; }
  for (const c of CRITERIA) if (typeof a.lines?.[c] !== "string") problems.push(`${key}: the «Оценка» lacks ${c}`);
  drafts[key].assessment = { source: a.source, verdict: a.verdict, lines: a.lines, note: a.note ?? "" };
}
for (const key of Object.keys(assessments)) if (!GROUP.includes(key)) problems.push(`group2-assessments.json names ${key}, which is no draft of the group`);

// Only the keys of the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) problems.push(`${key}, outside the group, changed`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
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
  "This file holds the final English of every node of group 2 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group2-d.mjs (round d): the drafts of the appendix of the tools, the proposal for rule 10.4 and the proposal for \"The list of code that no SpecTag binds\".",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its list and its examples.",
  "fix-group2-d.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP) md.push(`## ${key} — ${drafts[key].proposal.title}`, "", ...englishOf(drafts[key].proposal));
fs.writeFileSync(new URL("english-group2.md", here), md.join("\n"));

// english-group2-changed-d.md: each sentence of round d that is neither in the node's English after round c nor
// word for word in a final review.
const norm = (s) => s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
const sentences = (s) => (s || "").split("\n").map((l) => l.replace(/^\s*-\s+/, "")).flatMap((l) => l.split(/(?<=[.;:])\s+(?=[`A-Z“"(])/)).map(norm).filter(Boolean);
const englishText = (p) => p ? [p.title, p.text, p.reason, p.list?.of, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n") : "";
const reviews = norm(["a", "b"].map((l) => fs.readFileSync(new URL(`review-g2c-${l}.md`, here), "utf8")).join("\n")
  .split("\n").map((l) => l.replace(/^\s*>\s?/, "").replace(/^\s*-\s+/, "").replace(/^\s*-?\s*EN:\s*/, "")).join(" "));
const earlier = (key) => before[key]?.proposal ?? (key === "proposal:s-weuyx98r7c923ab" ? drafts["new:tools-2-untagged"].proposal : undefined);
const changedMd = [
  "# T25, group 2, round d: the sentences written in the author's own words",
  "",
  "Each sentence below is in the English of a node after round d, is not in that node's English after round c, and is not word for word in review-g2c-a.md or review-g2c-b.md. So it is the author's own wording: a reader's correction, or a fix that a review described without giving its English. fix-group2-d.mjs writes this file.",
  "",
];
const ownKeys = [];
for (const key of GROUP) {
  const old = new Set(sentences(englishText(earlier(key))));
  const own = sentences(englishText(drafts[key].proposal)).filter((s) => !old.has(s) && !reviews.includes(s.replace(/;$/, "")) && !reviews.includes(s));
  if (!own.length) continue;
  ownKeys.push(key);
  changedMd.push(`## ${key} — ${drafts[key].proposal.title}`, "", ...own.map((s) => `- ${s}`), "");
}
fs.writeFileSync(new URL("english-group2-changed-d.md", here), changedMd.join("\n"));

console.log(`changed in round d: ${changedKeys.join(", ")}`);
console.log(`\nnodes with sentences in the author's own words (english-group2-changed-d.md): ${ownKeys.join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words in the changed nodes, to look at:\n${longSentences.join("\n")}`);
