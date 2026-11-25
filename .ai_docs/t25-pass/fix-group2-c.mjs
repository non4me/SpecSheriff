// T25, stage 2, group 2, round c: applies the confirming reviews (review-g2b-a.md to review-g2b-d.md), the reader's
// report on the sentences of round b (english-g2b-fast.md) and the coordinator's rulings of round c.
//
// The script copies tools-drafts.json to tools-drafts.before-group2-c.json before its first run, and rebuilds the
// keys of group 2 from that copy on every run, so that a second run gives the same file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group2-c.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW = (letter) => `specsheriff-rule-reviewer's confirming review, 2026-11-24: review-g2b-${letter}.md; EngStickler's reader, 2026-11-24: english-g2b-fast.md; fix-group2-c.mjs applied the findings and the coordinator's rulings`;
const Q1 = "Q1 of group2-notes.md: while the specification is a draft, the reviewer still judges an Implementation-Needs-No-Change statement, and its findings refuse no commit (recommended B)";
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
  "new:tools-9-no-change-trailer": "a", "proposal:s-nyh9yk22ba6g77q": "a",
  "s-xr5xxa9cxf2mq5u": "b", "new:tools-10-verdict": "b", "new:tools-10-start": "b", "new:tools-10-limit": "b", "new:tools-10-claude": "b", "new:tools-10-codex": "b",
  "new:tools-10-settings": "c", "s-5z5gnu7pahr82xp": "c", "new:tools-8-symbol": "c", "new:tools-8-file-start": "c", "new:tools-8-bindings": "c", "s-zrsc6asgmhv8tnc": "c",
  "s-9rtrj24myzjvshu": "d", "new:tools-7-2-no-node": "d", "new:tools-7-2-outside": "d", "s-utf4mbt7ref8g9c": "d", "new:tools-7-2-rule-test": "d",
  "proposal:s-weuyx98r7c923ab": "d",
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
// Q1, answer B: the proposal for rule 1.6.1 goes, and the nodes that the first review named for B change.
// ---------------------------------------------------------------------------------------------------------------
delete drafts["proposal:s-m4h279nbaqkpa3t"];

// s-vp24dqydygztqbt — "The review of a commit" (review-g2b-a.md, A; Q1 answer B).
{
  const k = "s-vp24dqydygztqbt";
  swap(k, "refuses a commit where the verdict",
    ["The refusal lists each finding of the verdict (§s-68ds99w8wd67aae).",
      "The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv)."],
    ["Отказ перечисляет каждое замечание вердикта (§s-68ds99w8wd67aae).",
      "Отказ перечисляет каждое замечание вердикта (§s-68ds99w8wd67aae). Если коммит оставляет спецификацию черновиком, `sheriff review` не учитывает замечаний об утверждении, что реализацию правила менять не нужно (§s-kgqxg4gunzynwsv)."]);
  setChange(k, "refuses a commit where the verdict", (c) => c + " Последнее предложение — для ответа B на вопрос 1: пока спецификация — черновик, рецензент выносит и суждение об утверждении, что реализацию правила менять не нужно, но по вашему решению по строке 10.1.43a от 2026-11-20 коммит проходит эту проверку молча.");
  swap(k, "On such a commit",
    ["On such a commit, `sheriff review` gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q).",
      "Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q)."],
    ["Для такого коммита `sheriff review` передаёт рецензенту всё, что для этого коммита перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q).",
      "Если `sheriff review` запрашивает вердикт, он передаёт рецензенту всё, что для коммита перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q)."]);
  swap(k, "Where `sheriff review` asks for a verdict, it gives",
    ["It tells the reviewer which of those files the commit changes.", "`sheriff review` tells the reviewer which of those files the commit changes."],
    ["Он сообщает рецензенту, какие из этих файлов меняет коммит.", "`sheriff review` сообщает рецензенту, какие из этих файлов меняет коммит."]);
  const p = P_(k);
  p.reason = text(p.reason, "so `sheriff review` runs it only", "so `sheriff review` runs the reviewer only", `${k} reason`);
  p.ruReason = text(p.ruReason, "поэтому `sheriff review` запускает его только", "поэтому `sheriff review` запускает рецензента только", `${k} ruReason`);
  drafts[k].dependsOn = [Q1];
  drafts[k].stage3 = text(drafts[k].stage3, "review.ts:319 is to give each finding as s-68ds99w8wd67aae describes it.",
    "review.ts:319 is to give each finding as s-68ds99w8wd67aae describes it, and, where the commit leaves the specification a draft, to disregard the findings of the judgement on a statement that a rule's implementation needs no change (answer B to Q1).", `${k} stage3`);
}

// new:tools-7-3-review-code — P1 (review-g2b-a.md, B) and the reader's two fixes.
{
  const k = "new:tools-7-3-review-code";
  swap(k, "`sheriff review` refuses a commit in which",
    ["`sheriff review` refuses a commit in which the independent reviewer (§s-m4h279nbaqkpa3t) finds that the changed code does something that none of its rules states, or leaves out something that they require (§s-zn4vrdpnv9bch62).",
      "`sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62)."],
    [null, null]);
  const x = find(k, "refuses it for a defect");
  x.ru = x.ru.replace(/^[^.]*\(§s-zn4vrdpnv9bch62\)\./, "`sheriff review` отклоняет коммит, если независимый рецензент (§s-m4h279nbaqkpa3t) отклоняет его из-за дефекта в коде, который коммит добавляет или меняет (§s-zn4vrdpnv9bch62).");
  if (!x.ru.startsWith("`sheriff review` отклоняет коммит, если независимый рецензент (§s-m4h279nbaqkpa3t) отклоняет его из-за дефекта")) throw new Error(`${k}: the Russian of P1 was not replaced`);
  x.change += " Первое предложение — рецензента (второе ревью): прежнее читалось так, будто отклоняется любой код с `@spec none` и тест, который что-то «упускает», вопреки пунктам списка и правилу 1.2.7.";
  swap(k, "That is each of the following", ["in full as the commit leaves it", "in full, as the commit leaves it"], [null, null]);
  swap(k, "leaves out something required by a rule", ["that the commit's message names other than in", "that the commit's message names anywhere other than in"], [null, null]);
}

// new:tools-7-3-review-statement — written for answer B to Q1; P2 and P3 merged (review-g2b-a.md, C).
{
  const k = "new:tools-7-3-review-statement";
  const p = P_(k);
  const p0 = find(k, "falsely states");
  p0.en = "`sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule. `sheriff review` refuses a commit on such a finding only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2). Where the commit leaves it a draft, the commit passes this check silently.";
  p0.ru = "`sheriff review` отклоняет коммит, в сообщении которого, по суждению независимого рецензента (§s-m4h279nbaqkpa3t), ложно сказано, что реализацию правила менять не нужно (§s-nudrdn5xvcg262k). Каждое замечание называет правило. `sheriff review` отклоняет коммит по такому замечанию, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2). Если коммит оставляет её черновиком, коммит проходит эту проверку молча.";
  p0.change = "Новое: узел реализует строку 10.1.43a; отказ называет правило, как в её столбце «On failure». Ссылка на правило 1.6.1 при первом упоминании независимого рецензента (рецензент). Коммит отклоняется, пока спецификация одобрена, и проходит молча, пока она черновик, — по вашему решению по этой строке от 2026-11-20. Написано для ответа B на вопрос 1.";
  const p1 = find(k, "by means of a trailer");
  const p2 = find(k, "For each such rule");
  p1.en = "A commit's message states that a rule's implementation needs no change by means of a trailer (§s-7gab4ptjt2khfr5). The reviewer judges the statement about each rule that such a trailer names, whatever the specification's approval status. " + p2.en;
  p1.ru = "Сообщение коммита утверждает, что реализацию правила менять не нужно, с помощью trailer (§s-7gab4ptjt2khfr5). Рецензент судит утверждение о каждом правиле, которое называет такой trailer, каков бы ни был статус одобрения спецификации. " + p2.ru;
  p1.change = "Первое предложение — первого ревью. Второе — второго ревью, для ответа B на вопрос 1: суждение выносится и пока спецификация — черновик, потому что правило 1.6.1 называет его для каждого коммита с таким утверждением, а правило 10.2 велит ревью выносить каждое суждение из этого списка. Два абзаца соединены в один, чтобы «каждое такое правило» не указывало в другой абзац (рецензент). " + p2.change;
  p.parts = p.parts.filter((x) => x !== p2);
  drafts[k].dependsOn = [Q1];
  drafts[k].stage3 = "review.ts makes no judgement on such a statement. reviewInput is to give, for each rule that an `Implementation-Needs-No-Change` trailer names, the rule's wording before and after the commit and every test and piece of code bound to the rule, directly or through implements links, whole as the commit leaves them. SYSTEM_PROMPT is to ask for the judgement, and the findings of this judgement are to refuse no commit that leaves the specification a draft (answer B to Q1). Its tests are written first.";
}

// new:tools-7-3-review-appendix — three fixes (review-g2b-a.md, D) and the reader's two.
{
  const k = "new:tools-7-3-review-appendix";
  const p = P_(k);
  swap(k, "Each finding names the node",
    ["`sheriff review` refuses such a commit whatever the specification's approval status (§s-qzthyh7yqvfhsa2).",
      "`sheriff review` refuses a commit on such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2)."],
    ["`sheriff review` отклоняет такой коммит, каков бы ни был статус одобрения спецификации (§s-qzthyh7yqvfhsa2).",
      "`sheriff review` отклоняет коммит по такому замечанию, каков бы ни был статус одобрения спецификации (§s-qzthyh7yqvfhsa2)."]);
  const top = find(k, "A top-level section of the base specification");
  top.en = "In the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), a top-level section of the base specification is a section whose location (§s-kag2m9tzdnduxdx) consists of the name of a part, a slash and a single number, such as `base/3` or `requests/2`. For a rule that is in no section (§s-qmmzf9nksfsa3qp), the rules in the same top-level section are the other rules of the same part of the base specification that are in no section either.";
  top.ru = "В правиле о том, что получает рецензент (§s-nyh9yk22ba6g77q), раздел верхнего уровня базовой спецификации — это раздел, расположение (§s-kag2m9tzdnduxdx) которого состоит из имени части, косой черты и одного числа, например `base/3` или `requests/2`. Для правила, которое не входит ни в один раздел (§s-qmmzf9nksfsa3qp), правила того же раздела верхнего уровня — это другие правила той же части базовой спецификации, которые тоже не входят ни в один раздел.";
  top.change = "Новое. Правило 10.4 не говорит, какой раздел считается разделом верхнего уровня. Узел определяет его по расположению, как его вычисляет узел «How a node's location is computed», согласованный 2026-11-24; что передаётся рецензенту, узел не повторяет (рецензент). Второе предложение — о правиле, которое лежит прямо в части, рядом с её разделами. По вашему решению от 2026-11-20 по правилу 10.4 рецензент получает правила того же раздела верхнего уровня, а не всю базовую спецификацию, чтобы не тратить его токены. Поэтому такое правило идёт с другими правилами той же части вне разделов, а не со всей частью; в базовой спецификации без разделов это по-прежнему вся она (второе ревью).";
  p.reason = text(p.reason, "So the reviewer judges every node that this judgement covers, whoever approved it.",
    "So the reviewer judges every node of the technical appendix that implements a rule of the base specification, whoever approved it.", `${k} reason`);
  p.ruReason = text(p.ruReason, "Поэтому рецензент судит каждый узел, который охватывает это суждение, кто бы его ни одобрил.",
    "Так что рецензент судит каждый узел технического приложения, который реализует правило базовой спецификации, кто бы его ни одобрил.", `${k} ruReason`);
  p.reasonChange += " Последнее предложение — второго ревью: «это суждение» не на что было сослаться внутри обоснования.";
  drafts[k].stage3 = text(drafts[k].stage3, "and a rule in no section takes its whole part.", "and a rule in no section takes the other rules of its part that are in no section either.", `${k} stage3`);
  drafts[k].stage3 = text(drafts[k].stage3, "At the move, the ruling of 2026-11-20 on rule 10.4, which counts the whole part for a rule in no section, is recorded in this node's meta.decisions.",
    "At the move, what a rule in no section takes, which follows from the ruling of 2026-11-20 on rule 10.4, is recorded in this node's meta.decisions.", `${k} stage3`);
}

// new:tools-9-no-change-trailer — P2 (review-g2b-a.md, E).
swap("new:tools-9-no-change-trailer", "interpret-trailers --parse",
  ["They read a trailer as such a statement only where", "They read a trailer as a statement that a rule's implementation needs no change only where"],
  ["Trailer они читают как такое утверждение, только если", "Trailer они читают как утверждение, что реализацию правила менять не нужно, только если"]);

// ---------------------------------------------------------------------------------------------------------------
// Who runs the reviewer (review-g2b-b.md).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-xr5xxa9cxf2mq5u";
  swap(k, "hands everything that the independent reviewer is given",
    ["`sheriff review` hands everything that the independent reviewer is given (§s-nyh9yk22ba6g77q) to a runner.",
      "`sheriff review` hands everything that the independent reviewer (§s-m4h279nbaqkpa3t) is given (§s-nyh9yk22ba6g77q) to a runner."],
    [null, null]);
  const x = find(k, "hands everything that the independent reviewer (§s-m4h279nbaqkpa3t)");
  x.ru = x.ru.replace(/^[^.]*\(§s-nyh9yk22ba6g77q\)\./, "`sheriff review` передаёт runner всё, что получает (§s-nyh9yk22ba6g77q) независимый рецензент (§s-m4h279nbaqkpa3t).");
  if (!x.ru.startsWith("`sheriff review` передаёт runner всё, что получает (§s-nyh9yk22ba6g77q) независимый")) throw new Error(`${k}: the Russian of P1 was not replaced`);
  x.change += " Ссылка на правило 1.6.1 при первом упоминании независимого рецензента (второе ревью).";
  swap(k, "SpecSheriff tools that have no such file", ["SpecSheriff tools that have no such file use `claude`.", "SpecSheriff tools that have no file `agent` use `claude`."], [null, null]);
  const y = find(k, "no file `agent` use");
  y.ru = "Инструменты SpecSheriff, у которых нет файла `agent`, берут `claude`.";
  y.change += " «Такого файла» указывало в другой абзац; файл назван (второе ревью).";
  addRef(k, "cites", "s-m4h279nbaqkpa3t");
}
{
  const k = "new:tools-10-verdict";
  swap(k, "The runner's CLI is given the schema",
    ["The verdict passes or refuses the commit and lists its findings.", "The verdict passes or refuses the commit. It lists its findings."],
    ["Вердикт пропускает или отклоняет коммит и перечисляет свои замечания.", "Вердикт пропускает или отклоняет коммит. Он перечисляет свои замечания."]);
  swap(k, "The runner's CLI is given the schema",
    ["where the problem lies at a line, that line.", "where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt)."],
    ["если проблема находится в определённой строке — эту строку.", "если проблема находится в определённой строке — эту строку. Каждое замечание называет и суждение, к которому оно относится (§s-vp24dqydygztqbt)."]);
  setChange(k, "The runner's CLI is given the schema", (c) => c + " Предложение о вердикте разделено на два (второе ревью). Последнее предложение — для ответа B на вопрос 1: пока спецификация — черновик, `sheriff review` не учитывает замечаний суждения об утверждении, что реализацию правила менять не нужно (узел «The review of a commit»), и должен знать, к какому суждению относится каждое замечание.");
  const p = P_(k);
  p.reason = text(p.reason, "decide the commit in place of the reviewer.", "decide the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).", `${k} reason`);
  p.ruReason = text(p.ruReason, "о коммите решал бы `sheriff review`, а не рецензент.", "о коммите решал бы `sheriff review`, а не независимый рецензент (§s-m4h279nbaqkpa3t).", `${k} ruReason`);
  p.reasonChange += " Ссылка на правило 1.6.1 (второе ревью).";
  addRef(k, "cites", "s-m4h279nbaqkpa3t");
  drafts[k].dependsOn = [Q1];
  drafts[k].stage3 = text(drafts[k].stage3, "with `file` and `line` null where", "with `judgement`, the judgement that the finding belongs to (answer B to Q1), and with `file` and `line` null where", `${k} stage3`);
}
{
  const k = "new:tools-10-start";
  swap(k, "with none of the user's settings, memory or hooks;",
    ["with none of the user's settings, memory or hooks;", "with only the credentials from what its CLI keeps for the user;"],
    ["без настроек, памяти и хуков пользователя;", "только с данными входа из того, что его CLI хранит для пользователя;"],
    "Было: «без настроек, памяти и хуков пользователя». Перечень того, чего runner не берёт, заменён тем, что он берёт, по правилу 7.2.6: так в ревью не попадает и то, чего прежний перечень не называл, — серверы MCP, slash-команды пользователя и то, что добавит новый выпуск CLI. Код уже передаёт `--setting-sources \"\"`, `--strict-mcp-config` и `--disable-slash-commands` (второе ревью).");
  swap(k, "with a system prompt of its own;",
    ["with a system prompt of its own;", "with a system prompt that `sheriff review` writes for it;"],
    ["со своим системным промптом;", "с системным промптом, который для него пишет `sheriff review`;"],
    "Было: «со своим системным промптом» — читалось и как собственный промпт CLI по умолчанию. Код заменяет промпт CLI промптом, который пишет `sheriff review` (review.ts:135) (второе ревью).");
  swap(k, "with every tool turned off",
    ["with every tool turned off that its command-line options can turn off;", "with its tools turned off, as far as its command-line options allow;"], [null, null]);
  drafts[k].stage3 = (drafts[k].stage3 || "") + " The test written from this node is to show that nothing from what the runner's CLI keeps for the user, other than the credentials, reaches the run; for `claude`, the code passes `--setting-sources \"\"`, `--strict-mcp-config` and `--disable-slash-commands`, and whether those are enough is to be checked by that test.";
}
{
  const k = "new:tools-10-claude";
  const p = P_(k);
  p.ruReason = "В режиме print CLI отвечает один раз и завершается, без сессии, которая могла бы перенести в ревью прежний разговор (§s-m4h279nbaqkpa3t).";
  p.reasonChange += " Русский текст приведён к английскому (второе ревью).";
}
{
  const k = "new:tools-10-codex";
  const x = find(k, "It requests the model");
  x.en = "The runner `codex` requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where `specsheriff.review.codexModel` is empty, it leaves the choice of the model to Codex.";
  x.ru = "Runner `codex` запрашивает модель и effort, которые задают настройки этого runner (§s-tnz9zgqx8c629a7). Если `specsheriff.review.codexModel` пуст, он оставляет выбор модели за Codex.";
  x.change += " Абзац начинается с названия runner, а не с «Он», и «не запрашивает модели» сказано без отрицания (второе ревью).";
  const p = P_(k);
  p.reason = "Codex offers no way to run without its own home and tools, so the runner restricts both.";
  p.ruReason = "Codex не предлагает прогона без своего домашнего каталога и инструментов, поэтому runner ограничивает и то и другое.";
  p.reasonChange += " Часть после двоеточия, которая повторяла текст, вырезана (второе ревью).";
}

// ---------------------------------------------------------------------------------------------------------------
// The settings of each runner, the bindings file and the test's SpecTag (review-g2b-c.md).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-10-settings";
  swap(k, "takes the model and the reasoning effort only from",
    ["An empty `specsheriff.review.codexModel` means the model that Codex chooses for the signed-in account.",
      "Where a setting is empty, the runner requests no value for it, so the runner's CLI uses a value of its own. An empty `specsheriff.review.codexModel`, for example, means the model that Codex chooses for the signed-in account."],
    ["Пустой `specsheriff.review.codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.",
      "Если настройка пуста, runner не запрашивает для неё значения, поэтому CLI runner использует собственное значение. Например, пустой `specsheriff.review.codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход."]);
  setChange(k, "takes the model and the reasoning effort only from", (c) => c + " Новое: что значит любая пустая настройка, а не только `codexModel`, — обобщено правило, которое вы согласовали для `codexModel` (второе ревью).");
  const x = find(k, "counts as confirmed");
  x.en = "A setting that the user's git configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) ask only for a setting that this configuration lacks. They write a setting into a user's git configuration only with the value that this user gives in reply. Where the user answers with the default, they write it like any other value.";
  x.ru = "Настройка, которая есть в конфигурации git пользователя, пустая или нет, считается подтверждённой. Хуки агента (§s-477gtdrkw34dzxw) и skill каждого плагина SpecSheriff (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) спрашивают только о настройке, которой в этой конфигурации нет. Они записывают настройку в конфигурацию git пользователя только со значением, которое этот пользователь дал в ответ. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение.";
  x.change += " Последнее предложение, которое только отсылало к другим узлам, вырезано, а его ссылки перенесены во второе предложение; «конфигурация» названа конфигурацией git пользователя (второе ревью).";
  swap(k, "Where the configuration lacks a setting",
    ["Where the configuration lacks a setting of the runner in use,", "Where the user's git configuration lacks a setting of the runner in use,"],
    ["Если в конфигурации нет настройки runner, который запускается,", "Если в конфигурации git пользователя нет настройки runner, который запускается,"]);
  setChange(k, "Where the user's git configuration lacks", (c) => c + " «Конфигурация» названа конфигурацией git пользователя: правило 9.1 называет конфигурацией репозитория другое (второе ревью).");
  const p = P_(k);
  p.reason = "A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So that user alone controls the models and the reasoning efforts that the reviewer runs with.";
  p.ruReason = "Прогон рецензента (§s-m4h279nbaqkpa3t) оплачивает пользователь, который делает коммит, из своей учётной записи. Поэтому только этот пользователь распоряжается моделями и effort, с которыми работает рецензент.";
  p.reasonChange += " Третье предложение, которое повторяло последний абзац текста, вырезано (второе ревью).";
  const ex = p.examples[0];
  ex.en = text(ex.en, "every review that the runner `claude` makes on that machine runs with that model", "every review made with the runner `claude` on that machine runs with that model", `${k} example`);
  drafts[k].stage3 = text(drafts[k].stage3, "No change to the code.", "review.ts:125-127 and :240 are to pass no flag for an empty setting, where they now pass `--model \"\"`, `--fallback-model \"\"`, `--effort \"\"` and `model_reasoning_effort=''`.", `${k} stage3`);
}
swap("new:tools-8-bindings", "accepts an entry in the bindings file",
  ["It refuses any other entry, naming its path.", "At every commit, whether the specification is approved or a draft, it refuses any other entry, naming its path."],
  ["Любую другую запись он отвергает, называя её путь.", "При каждом коммите, независимо от того, одобрена спецификация или она черновик, любую другую запись он отвергает, называя её путь."]);
setChange("new:tools-8-bindings", "accepts an entry in the bindings file", (c) => c + " Что проверка идёт при каждом коммите и в черновике, теперь сказано, как в соседних узлах проверок привязки: столбец «On failure» строки 10.1.26b — «refused» без исключений (второе ревью).");
swap("s-zrsc6asgmhv8tnc", "Where the mark holds anything other than one SpecTag",
  ["Where the mark holds anything other than one SpecTag, the plugin", "Where the mark holds anything other than one SpecTag `@spec <sid>`, the plugin"],
  ["Если пометка содержит что-либо, кроме одного SpecTag, плагин", "Если пометка содержит что-либо, кроме одного SpecTag `@spec <sid>`, плагин"]);
setChange("s-zrsc6asgmhv8tnc", "anything other than one SpecTag `@spec <sid>`", (c) => c + " «Один SpecTag `@spec <sid>`»: плагин отвергает и `@spec none` (TAG, __init__.py:13) (второе ревью).");

// ---------------------------------------------------------------------------------------------------------------
// The binding checks (review-g2b-d.md), and Q2, settled by the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-9rtrj24myzjvshu";
  const x = find(k, "refuses each of the following in the system's code");
  x.en = "`sheriff binding` refuses each of the following that the commit adds or changes (§s-2x58az67bm6cxq2) in the system's code (§s-hheus6f395ynqvc), other than tests, or in the bindings file (§s-trwczfskj5zmuft), whether the specification is approved or a draft (§s-k6dzuajejrw4cej):";
  x.ru = "`sheriff binding` отвергает каждое из следующего, что коммит добавляет или меняет (§s-2x58az67bm6cxq2) в коде системы (§s-hheus6f395ynqvc), помимо тестов, или в файле привязок (§s-trwczfskj5zmuft), независимо от того, одобрена спецификация или она черновик (§s-k6dzuajejrw4cej):";
  x.change = "Было: «`sheriff binding` читает SpecTag каждого символа кода системы». Теперь узел начинается с того, что отвергается, и реализует строку 10.1.26: код привязан одним из способов правила 1.5.2, и каждый SpecTag называет правило или говорит, что код не реализует никакого. Что проверка идёт и в черновике — по вашему решению от 2026-11-20. Отвергается только то, что коммит добавляет или меняет: для кода, который коммит не меняет, " + RULINGS_17 + " результат — тот, который даёт правило 9.5. Файл привязок назван отдельно: его запись не относится к коду системы (правило 9.1), и иначе пункт о записи не срабатывал бы никогда. Сказано «что коммит добавляет или меняет», а не «в коде, который коммит меняет», чтобы отвергался и SpecTag, добавленный не над символом (второе ревью).";
  swap(k, "a SpecTag in any comment other than", [null, null],
    ["в файле на языке, который охватывает описание (§s-33fw3ga4ctd94dq),", "в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq),"]);
  setChange(k, "a SpecTag in any comment other than", (c) => c + " Русский текст поправлен: «на языке, который охватывает описание» читалось в обе стороны (второе ревью).");
  swap(k, "but has neither form of a SpecTag", ["but has neither form of a SpecTag (§s-5z5gnu7pahr82xp)", "but has none of the forms of a SpecTag (§s-5z5gnu7pahr82xp)"], [null, null]);
  swap(k, "The refusal names the file",
    ["The refusal names the file, and the symbol and the line where they apply.", "The refusal names the file and, where it concerns a symbol or a line, that symbol or line."],
    ["Отказ называет файл, а также символ и строку, если они есть.", "Отказ называет файл, а если он касается символа или строки — этот символ или строку."]);
  setChange(k, "A SpecTag or an entry of a kind", () => "Было: пока коммит оставляет спецификацию черновиком, символ без SpecTag, который коммит не меняет, сообщается, а не отвергается. Теперь, " + RULINGS_17 + ", неизменённый код, SpecTag которого ничего не привязывает, обрабатывается так же, как код без SpecTag: по правилу 9.5, к которому столбец «On failure» этих строк отсылает код, который коммит не меняет.");
  // The removed passage that names the node on code and tests outside the commit takes that node's new title.
  const removed = P_(k).removed;
  const r1 = removed.findIndex((r) => r.includes("“Code and tests outside the commit that carry no SpecTag”"));
  if (r1 < 0) throw new Error(`${k}: no removed passage names the old title`);
  removed[r1] = removed[r1].replace("“Code and tests outside the commit that carry no SpecTag”", "“Code and tests outside the commit that no SpecTag binds”");
  drafts[k].stage3 = text(drafts[k].stage3, "It is to refuse only in code that the commit adds or changes (answer B to Q2):",
    "It is to refuse only what the commit adds or changes in the system's code or in the bindings file, a SpecTag added outside any symbol included (the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a):", `${k} stage3`);
}
{
  const k = "new:tools-7-2-no-node";
  swap(k, "the commit changes the code or the test that the SpecTag binds;",
    ["the commit changes the code or the test that the SpecTag binds;", "the commit changes the code or the test that the SpecTag is meant to bind;"],
    ["меняет ли коммит код или тест, привязанный этим SpecTag;", "меняет ли коммит код или тест, который этот SpecTag должен привязывать;"],
    "Пункт списка условий (первое ревью). «Должен привязывать»: по правилу 9.3 и обоснованию узла SpecTag, который не называет ни одного узла, ничего не привязывает (второе ревью).");
}
{
  const k = "new:tools-7-2-outside";
  const p = P_(k);
  p.title = "Code and tests outside the commit that no SpecTag binds";
  p.ruTitle = "Код и тесты за пределами коммита, которые не привязывает ни один SpecTag";
  p.titleChange = "Было: «Code and tests outside the commit that carry no SpecTag». Узел охватывает и код, SpecTag которого ничего не привязывают, и тест, SpecTag которого называет не правило (второе ревью).";
  setChange(k, "in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol", (c) => text(c, "при ответе B на вопрос 2 неизменённый код", RULINGS_17 + " неизменённый код", `${k} part 1`));
  setChange(k, "a test of the system's code that declares no SpecTag", (c) => text(c, "Тест, SpecTag которого называет не правило, — при ответе B на вопрос 2.", "Тест, SpecTag которого называет не правило, — по вашему решению от 2026-11-17 по строке 10.1.26a.", `${k} part 2`));
  setChange(k, "treats each of the following that the commit leaves unchanged", (c) => c + " Узел выполняет для неизменённого кода проверки строк 10.1.26 и 10.1.26a, поэтому у него есть связи `implements` и с ними (второе ревью).");
  addRef(k, "implements", "s-k6dzuajejrw4cej");
  addRef(k, "implements", "s-ay6wntm2dxcgpnp");
  drafts[k].stage3 = text(drafts[k].stage3, "Under answer B to Q2 the same holds", "By the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, the same holds", `${k} stage3`);
}
{
  const k = "s-utf4mbt7ref8g9c";
  setChange(k, "and whose SpecTag names a node of the model", (c) => text(c, ", при ответе B на вопрос 2.", ", по вашему решению от 2026-11-17 по строке 10.1.26a.", `${k} part 2`));
  setChange(k, "reads the tests in each file", (c) => text(c, "а при ответе B на вопрос 2 — и тест", "а по вашему решению от 2026-11-17 по строке 10.1.26a — и тест", `${k} part 5`));
  drafts[k].stage3 = text(drafts[k].stage3, "(answer B to Q2)", "(the owner's ruling of 2026-11-17 on row 10.1.26a)", `${k} stage3`);
}
{
  const k = "new:tools-7-2-rule-test";
  swap(k, "accepts a commit that adds or changes code bound to a rule",
    ["declares that rule's SpecTag (§s-m82tz4mp3f9r3fg)", "declares that rule's SpecTag (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg)"],
    ["объявляет SpecTag этого правила (§s-m82tz4mp3f9r3fg)", "объявляет SpecTag этого правила (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg)"]);
  swap(k, "accepts a commit that adds or changes code bound to a rule", [null, null], ["он отклоняет, называя правило", "он отвергает, называя правило"]);
  setChange(k, "accepts a commit that adds or changes code bound to a rule", (c) => c + " «Объявляет» ссылается на узел о том, где тест объявляет SpecTag, чтобы не засчитывался тест, SpecTag которого стоит, например, в середине названия; «отвергает», как в соседних узлах (второе ревью).");
  const x = find(k, "In this check, the code is each symbol");
  x.en = "In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests. A rule is bound to such code where one of the code's SpecTags names the rule.";
  x.ru = "В этой проверке код — это символы (§s-kgbzk2ph9e6jfb4) и файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет (§s-2x58az67bm6cxq2), кроме тестов. Правило привязано к такому коду, если его называет один из SpecTag этого кода.";
  x.change += " Русский: «В этой проверке», как в английском (второе ревью).";
  const y = find(k, "In this check, a test counts");
  y.en = text(y.en, "In this check, a test counts whether or not the commit changes it. A test marked as skipped or as expected to fail counts too.",
    "In this check, a test is taken into account whether or not the commit changes it. A test marked as skipped or as expected to fail is taken into account too.", `${k} part 2`);
  y.ru = text(y.ru, "Тест здесь засчитывается, меняет ли его коммит или нет.", "В этой проверке тест засчитывается независимо от того, меняет ли его коммит.", `${k} part 2 ru`);
  y.change += " Русский: «В этой проверке», как в английском (второе ревью).";
  const ex = P_(k).examples[0];
  ex.ru = text(ex.ru, "`sheriff binding` отклоняет коммит и называет правило.", "`sheriff binding` отвергает коммит и называет правило.", `${k} example`);
  ex.ru = text(ex.ru, "тогда отклоняется коммит, тест которого", "тогда отвергается коммит, тест которого", `${k} example`);
  addRef(k, "cites", "s-zrsc6asgmhv8tnc");
}

// The agreed "The list of code that carries no SpecTag" (s-weuyx98r7c923ab), changed to carry out the rulings of
// 2026-11-17, in review D's wording (review-g2b-d.md, "For the owner").
{
  const agreed = drafts["new:tools-2-untagged"].proposal;
  const sentence2 = "The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn).";
  const sentence2Ru = "Проверка кода без SpecTag называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).";
  if (!agreed.parts[0].en.endsWith(sentence2) || !agreed.parts[0].ru.endsWith(sentence2Ru)) throw new Error("the agreed node on sheriff untagged changed");
  drafts["proposal:s-weuyx98r7c923ab"] = {
    question: "None: carries out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, shown to the owner as a proposal (the coordinator's ruling on review-g2b-d.md)",
    location: "tools 2.11",
    sidValue: "s-weuyx98r7c923ab",
    proposal: {
      title: "The list of code that no SpecTag binds",
      ruTitle: "Перечень кода, который не привязывает ни один SpecTag",
      titleChange: "Было: «The list of code that carries no SpecTag» («Перечень кода без SpecTag»). Предупреждение по правилу 9.5, которое называет эту команду, касается теперь и кода, SpecTag которого ничего не привязывают (второе ревью).",
      parts: [{
        kind: "p",
        en: "`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-9rtrj24myzjvshu). " + sentence2,
        ru: "`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-9rtrj24myzjvshu). " + sentence2Ru,
        change: "Было: «…код системы, у которого нет SpecTag». " + RULINGS_17 + " для кода, который коммит не меняет, результат — тот, который даёт правило 9.5, и это касается и кода, SpecTag которого ничего не привязывают: стоят не на месте, называют не правило или стоят рядом с `@spec none`. Предупреждение по правилу 9.5 называет эту команду, поэтому команда перечисляет и такой код. Формулировка — второго ревью. Второе предложение — как в согласованной формулировке.",
      }],
      reason: agreed.reason,
      ruReason: agreed.ruReason,
      reasonChange: "Как в согласованной формулировке.",
      refs: [...agreed.refs.map((r) => ({ ...r })), R("cites", "s-9rtrj24myzjvshu")],
      removed: [],
      date: DATE,
    },
    stage3: "sheriff untagged does not exist yet (item 6 of the commands). It is to list each symbol and each file to be bound as a whole, in code that no SpecTag binds, by the same test as s-9rtrj24myzjvshu applies.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Every key of the group: its review, no dependence on Q2, and its rendered text.
// ---------------------------------------------------------------------------------------------------------------
for (const key of GROUP) {
  const e = drafts[key];
  if (!e) throw new Error(`no draft ${key}`);
  if (REVIEWED[key]) e.review = REVIEW(REVIEWED[key]);
  if (e.dependsOn) {
    e.dependsOn = e.dependsOn.filter((x) => !x.startsWith("Q2 of group2-notes.md"));
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
  if (/вопрос[а-я]* 2|Q2/.test(JSON.stringify({ ...e, assessment: undefined }))) problems.push(`${key}: still mentions Q2`);
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

// Only the keys of the group may differ from the copy, and the proposal for rule 1.6.1 is gone.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key) || key === "proposal:s-m4h279nbaqkpa3t") continue;
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
  "This file holds the final English of every node of group 2 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group2-c.mjs (round c): the drafts of the appendix of the tools, the proposal for rule 10.4 and the proposal for \"The list of code that no SpecTag binds\".",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its list and its examples.",
  "fix-group2-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP) md.push(`## ${key} — ${drafts[key].proposal.title}`, "", ...englishOf(drafts[key].proposal));
fs.writeFileSync(new URL("english-group2.md", here), md.join("\n"));

// english-group2-changed-c.md: each sentence of round c that is neither in the node's English after round b nor
// word for word in a confirming review.
const norm = (s) => s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
const sentences = (s) => (s || "").split("\n").map((l) => l.replace(/^\s*-\s+/, "")).flatMap((l) => l.split(/(?<=[.;:])\s+(?=[`A-Z“"(])/)).map(norm).filter(Boolean);
const englishText = (p) => p ? [p.title, p.text, p.reason, p.list?.of, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n") : "";
const reviews = norm(["a", "b", "c", "d"].map((l) => fs.readFileSync(new URL(`review-g2b-${l}.md`, here), "utf8")).join("\n")
  .split("\n").map((l) => l.replace(/^\s*>\s?/, "").replace(/^\s*-\s+/, "").replace(/^\s*-?\s*EN:\s*/, "")).join(" "));
const earlier = (key) => before[key]?.proposal ?? (key === "proposal:s-weuyx98r7c923ab" ? drafts["new:tools-2-untagged"].proposal : undefined);
const changedMd = [
  "# T25, group 2, round c: the sentences written in the author's own words",
  "",
  "Each sentence below is in the English of a node after round c, is not in that node's English after round b, and is not word for word in any of review-g2b-a.md to review-g2b-d.md. So it is the author's own wording: a reader's correction, a sentence written for answer B to Q1, or a fix that a review described without giving its English. The proposal for \"The list of code that no SpecTag binds\" is compared with the agreed node. fix-group2-c.mjs writes this file.",
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
fs.writeFileSync(new URL("english-group2-changed-c.md", here), changedMd.join("\n"));

console.log(`changed in round c: ${changedKeys.join(", ")}`);
console.log(`\nnodes with sentences in the author's own words (english-group2-changed-c.md): ${ownKeys.join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words in the changed nodes, to look at:\n${longSentences.join("\n")}`);
