// T25, stage 2, group 3, round h, the last before the owner's page: applies review-g3g.md (R1, R2, V1, and E1 as the
// owner's ruling of 2026-11-24 settles it), the coordinator's rulings of round h on the readers' reports on round g, and
// one node for "the files generated from the specification": s-qyjw8xez6t6adc3, the base rule on code generated from
// approved wordings, which s-a8fn72xa782wvbk itself cites. Copies tools-drafts.json to tools-drafts.before-group3-h.json
// before its first run, and on every run rebuilds the keys of the group from that copy, so a second run gives the same
// file. Refuses to write where a key outside the group would change, and writes english-group3.md and
// english-group3-changed-h.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-h.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const SAME = "Как в согласованной формулировке.";
const GEN = "s-qyjw8xez6t6adc3";
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
const swap = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: no ${JSON.stringify(from.slice(0, 70))}`);
  return s.split(from).join(to);
};
const clone = (x) => JSON.parse(JSON.stringify(x));
const KEPT = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht",
  "proposal:new-tools-1-settings-g3", "proposal:s-gb8s9657a65hqmv-g3", "proposal:row-10-1-35a",
  "proposal:s-kgbzk2ph9e6jfb4", "proposal:s-m4h279nbaqkpa3t", "proposal:s-nyh9yk22ba6g77q-g3", "proposal:row-10-1-43b",
  "proposal:s-vp24dqydygztqbt", "proposal:new-tools-10-verdict", "new:tools-7-3-review-comments",
  "proposal:new-spec-1-6-checks", "proposal:new-spec-1-6-tests", "proposal:row-10-1-43", "proposal:s-94k7b6r5kf65udf"];
const ADDED = ["proposal:new-tools-7-3-review-code"];
const entries = {};
for (const k of KEPT) {
  if (!drafts[k]) throw new Error(`${k} is not in the copy`);
  entries[k] = clone(drafts[k]);
}
for (const k of ADDED) if (drafts[k]) throw new Error(`${k} is already in the copy`);
const parts = (k) => entries[k].proposal.parts;
const at = (k, start) => {
  const i = parts(k).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${k}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const edit = (k, start, from, to) => { const x = parts(k)[at(k, start)]; x.en = swap(x.en, from, to, k); };
const RULING_CITED = "ваше решение от 2026-11-24: проверка комментариев не блокирует, а предупреждает («не блокировать, а предупреждать»)";

// ---------------------------------------------------------------------------------------------------------------
// Review R1: row 10.1.43.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:row-10-1-43";
  const x = parts(k)[0];
  x.en = `The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§${GEN}) does what the rules named in the commit say, and nothing they do not`;
  x.ru = `Код системы (§s-hheus6f395ynqvc), который коммит меняет вне файлов, сгенерированных из спецификации (§${GEN}), делает то, что говорят названные в коммите правила, и ничего сверх этого`;
  x.change = swap(x.change, "«The rules that the commit names»: правила называет коммит, а не код.", "«The rules named in the commit»: слова правила 1.6.1. В прежнем «it names» было неясно, называет ли правила код или коммит.", k);
  entries[k].change += " Кроме того, «the rules it names» стало «the rules named in the commit», как в правиле 1.6.1.";
}

// ---------------------------------------------------------------------------------------------------------------
// Review R2: "The judgement on the code that a commit changes", a proposal on group 2's agreed draft.
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["new:tools-7-3-review-code"];
  if (base.agreed !== "2026-11-24") throw new Error("new:tools-7-3-review-code is not agreed");
  const e = {
    question: "None: carries out item 11 of group 2's list of changes outside the group, as rule 1.6.1 and row 10.1.43 now do",
    base: "new:tools-7-3-review-code",
    location: base.location,
    sidValue: base.sidValue,
    change: `Изменено одно предложение: рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы, в том числе его тесты, вне файлов, сгенерированных из спецификации. Почему: эти файлы рецензенту не передают, поэтому коммит, который меняет только их, запускал платный прогон, который может только пропустить (пункт 11 изменений группы 2). Так же их исключают предложения по правилу 1.6.1 и строке 10.1.43, которую этот узел реализует. Остальная формулировка — как вы согласовали 2026-11-24.`,
    proposal: clone(base.proposal),
    proposedDecision: {
      date: "(the date of the owner's answer)",
      problem: "A commit whose only change to code was in the files generated from the specification got a review that could only pass: the reviewer is not given those files (rule 10.4).",
      ruling: "The owner: the reviewer's judgements on code and on comments leave out the files generated from the specification, since that code only restates the specification.",
      type: "textual",
    },
  };
  for (const x of e.proposal.parts) x.change = SAME;
  for (const x of e.proposal.examples || []) delete x.change;
  delete e.proposal.removed;
  const x = e.proposal.parts.find((p) => p.en.startsWith("The reviewer judges the changed code on every commit"));
  x.en = swap(x.en, "The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests.", `The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests, outside the files generated from the specification (§${GEN}).`, "R2");
  x.ru = swap(x.ru, "Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты.", `Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты, вне файлов, сгенерированных из спецификации (§${GEN}).`, "R2");
  x.change = "Было: «…every commit that adds or changes the system's code, including its tests». Добавлено «outside the files generated from the specification»: коммит, который меняет только эти файлы, не запускает суждения о коде (пункт 11 изменений группы 2).";
  e.proposal.reasonChange = SAME;
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: GEN }];
  entries["proposal:new-tools-7-3-review-code"] = e;
}

// ---------------------------------------------------------------------------------------------------------------
// Review V1: the change field of "The review of a commit".
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-vp24dqydygztqbt";
  entries[k].change = swap(entries[k].change, "- пока спецификация — черновик, коммит отклоняется, только если вердикт перечисляет ещё и замечание о коде или об узле, который одобряется в коммите; было «хотя бы одно другое замечание», а замечание о комментарии коммит не отклоняет;",
    "- пока спецификация — черновик, коммит отклоняется, только если вердикт перечисляет замечание о коде или об узле, который одобряется в коммите; было «хотя бы одно другое замечание», а замечание о комментарии коммит не отклоняет;", k);
}

// ---------------------------------------------------------------------------------------------------------------
// Review E1, settled by the owner's ruling of 2026-11-24: option B in rule 10.5, and the first sentence of the verdict.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-94k7b6r5kf65udf";
  const e = entries[k];
  parts(k).splice(0, 1, P(
    "The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement other than the one on comments (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out. Where the commit needs only the judgement on comments, the tools report as a warning why the review could not be carried out.",
    "Инструменты SpecSheriff отклоняют коммит, по которому рецензент должен вынести хотя бы одно суждение, кроме суждения о комментариях (§s-m4h279nbaqkpa3t), если рецензент не дал ответа, который они могут прочитать. В отказе сказано, почему рецензию не удалось провести. Если коммиту нужно только суждение о комментариях, инструменты сообщают как предупреждение, почему рецензию не удалось провести.",
    `Было: «…refuse a commit for which the reviewer must make at least one judgement…». Теперь коммит, которому нужно только суждение о комментариях, не отклоняется, если рецензию не удалось провести: инструменты сообщают об этом как предупреждение. Так требует ${RULING_CITED}.`));
  e.change = `Что изменено:\n- коммит, которому нужно только суждение о комментариях, не отклоняется, если рецензент не дал ответа, который инструменты SpecSheriff могут прочитать; почему рецензию не удалось провести, они сообщают как предупреждение;\n- последний пример: было «Ответ пропускает коммит, но называет замечание», теперь «…называет замечание о коде».\n\nПочему: так требует ${RULING_CITED}. Суждение о комментариях ничего не отклоняет, поэтому и его несостоявшийся прогон коммит не отклоняет. Ответ, который пропускает коммит с замечанием о комментарии, читается (узел «The reviewer's verdict» в предложении группы). Это закрывает и пункт 17 изменений группы 2. Остальная формулировка — как вы согласовали 2026-11-20.`;
  e.question = "None: carries out the owner's ruling of 2026-11-24 that a check of comments warns and does not block, and settles item 17 of group 2's list of changes outside the group";
  e.proposedDecision = {
    date: "2026-11-24",
    problem: "Together with the judgement on comments, this rule refused a commit that changed only a comment whenever the reviewer gave no answer that the tools could read, such as when its run timed out.",
    ruling: "The owner: a check of comments is not to block but to warn («не блокировать, а предупреждать»). So a commit that needs only the judgement on comments is not refused when the review cannot be carried out; the tools report why as a warning.",
    type: "textual",
  };
}
{
  const k = "proposal:new-tools-10-verdict";
  const x = parts(k)[0];
  x.en = "`sheriff review` refuses a commit for which the reviewer must make a judgement other than the one on comments (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf). Where the commit needs only the judgement on comments (§s-7vpsdsy8dpqdy6r), `sheriff review` instead reports as a warning why it could not read a verdict.";
  x.ru = "`sheriff review` отклоняет коммит, по которому рецензент должен вынести суждение, кроме суждения о комментариях (§s-vp24dqydygztqbt), если только runner (§s-xr5xxa9cxf2mq5u) не даёт вердикт, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf). Если коммиту нужно только суждение о комментариях (§s-7vpsdsy8dpqdy6r), `sheriff review` вместо этого сообщает как предупреждение, почему не смог прочитать вердикт.";
  x.change = `Было: «\`sheriff review\` refuses a commit on which it asks for a verdict unless the runner gives a verdict that \`sheriff review\` can read». Теперь коммит, которому нужно только суждение о комментариях, не отклоняется, если вердикт прочитать нельзя: \`sheriff review\` сообщает об этом как предупреждение, как говорит правило 10.5 в предложении группы. Так требует ${RULING_CITED}.`;
  entries[k].change = swap(entries[k].change, "Изменены последний абзац текста, обоснование и пример:", `Изменены первое предложение текста: коммит, которому нужно только суждение о комментариях, не отклоняется, если вердикт прочитать нельзя, — так требует ${RULING_CITED}; а также последний абзац текста, обоснование и пример:`, k);
}

// ---------------------------------------------------------------------------------------------------------------
// One node for "the files generated from the specification" (the coordinator's ruling 3).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-3-review-comments";
  for (const x of parts(k)) { x.en = x.en.split("(§s-a8fn72xa782wvbk)").join(`(§${GEN})`); x.ru = x.ru.split("(§s-a8fn72xa782wvbk)").join(`(§${GEN})`); }
  entries[k].proposal.refs = entries[k].proposal.refs.map((r) => (r.to === "s-a8fn72xa782wvbk" ? { ...r, to: GEN } : r));
}

// ---------------------------------------------------------------------------------------------------------------
// The readers (the coordinator's ruling 4).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  edit(k, "A commit changes a symbol, a test or a file bound as a whole where", "A symbol or a test runs from its first line", "A symbol or a test extends from its first line");
  edit(k, "The SpecSheriff tools find what a commit adds", "whatever git's settings on the machine.", "however git is configured on the machine.");
  const ex0 = entries[k].proposal.examples[0];
  ex0.en = swap(ex0.en, "give different syntax trees", "produce different syntax trees", k);
}
{
  const k = "new:tools-7-2-changed-line";
  const e = entries[k];
  edit(k, "Where the SpecSheriff tools have a grammar of a file's language", "Where the SpecSheriff tools have a grammar of a file's language", "Where the SpecSheriff tools have a grammar for a file's language");
  edit(k, "each comment, other than the file's first line", "other than the file's first line where it opens with `#!`;", "other than the file's first line when that line starts with `#!`;");
  e.proposal.reason = swap(e.proposal.reason, "no grammar of a file's language", "no grammar for a file's language", k);
  e.proposal.reason = swap(e.proposal.reason, "So comparing trees counts exactly the edits that can matter.", "So comparing trees treats as changes exactly the edits that can matter.", k);
  e.proposal.reason = swap(e.proposal.reason, "comparing the text counts every edit,", "comparing the text treats every edit as a change,", k);
  const [ex1, ex2, ex3] = e.proposal.examples;
  ex1.en = swap(ex1.en, "Both versions give the same syntax tree", "Both versions produce the same syntax tree", k);
  ex2.en = swap(ex2.en, "both versions give the same tree", "both versions produce the same tree", k);
  ex3.en = swap(ex3.en, "the two versions give different trees", "the two versions produce different trees", k);
}
{
  const k = "proposal:s-kgbzk2ph9e6jfb4";
  edit(k, "The system's code (§s-hheus6f395ynqvc) other than tests is bound", "other than tests is bound to the rules it implements by SpecTags (§s-8xw4mgvpexyvw5q).", "other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements.");
}
{
  const k = "proposal:s-m4h279nbaqkpa3t";
  for (const x of parts(k)) if (x.kind === "li") x.en = x.en.replace(/^on (every|a) commit/, "for $1 commit");
  if (parts(k).filter((x) => x.kind === "li" && x.en.startsWith("for ")).length !== 4) throw new Error(`${k}: not four judgements starting with "for"`);
  entries[k].change = swap(entries[k].change, "- обоснование — о суждениях в целом;", "- в английском тексте каждое суждение начинается с «for», как в принципе «Deterministic checks hold every participant to the contract»;\n- обоснование — о суждениях в целом;", k);
}

// ---------------------------------------------------------------------------------------------------------------
// Four fixes from the fast reader's report on english-group3-changed-h.md (the coordinator).
// ---------------------------------------------------------------------------------------------------------------
{
  const v = parts("proposal:new-tools-10-verdict")[0];
  v.en = swap(v.en, "`sheriff review` instead reports as a warning why it could not read a verdict.", "`sheriff review` instead issues a warning that says why it could not read a verdict.", "verdict");
  v.ru = swap(v.ru, "`sheriff review` вместо этого сообщает как предупреждение, почему не смог прочитать вердикт.", "`sheriff review` вместо этого выдаёт предупреждение, в котором сказано, почему он не смог прочитать вердикт.", "verdict");
  const r = parts("proposal:s-94k7b6r5kf65udf")[0];
  r.en = swap(r.en, "the tools report as a warning why the review could not be carried out.", "the tools issue a warning that says why the review could not be carried out.", "10.5");
  r.ru = swap(r.ru, "инструменты сообщают как предупреждение, почему рецензию не удалось провести.", "инструменты выдают предупреждение, в котором сказано, почему рецензию не удалось провести.", "10.5");
  const c = entries["proposal:new-tools-7-3-review-code"].proposal.parts.find((p) => p.en.startsWith("The reviewer judges the changed code on every commit"));
  c.en = swap(c.en, "the changed code other than the files generated from the specification.", "the changed code outside the files generated from the specification.", "R2");
  c.ru = swap(c.ru, "изменённый код, кроме файлов, сгенерированных из спецификации.", "изменённый код вне файлов, сгенерированных из спецификации.", "R2");
  c.change += " Во втором предложении «other than the files» стало «outside the files», как в первом.";
  const k = parts("new:tools-7-3-review-comments")[at("new:tools-7-3-review-comments", "The reviewer judges the comments in the system's code")];
  k.en = swap(k.en, "the parts of the file that the SpecSheriff tools leave out of the trees as comments.", "the parts of the file that the SpecSheriff tools treat as comments and leave out of the trees.", "comments");
  k.ru = swap(k.ru, "те части файла, которые инструменты SpecSheriff не включают в деревья как комментарии.", "те части файла, которые инструменты SpecSheriff считают комментариями и не включают в деревья.", "comments");
  const e = entries["new:tools-7-2-changed-line"].proposal;
  e.reason = swap(e.reason, "treats as changes exactly the edits that can matter.", "treats as changes exactly the edits that can affect what the code does.", "changed-line");
  e.ruReason = swap(e.ruReason, "засчитывает ровно те правки, которые могут иметь значение.", "засчитывает ровно те правки, которые могут повлиять на то, что делает код.", "changed-line");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const HISTORY = /[Рр]аунд|чтец|[Кк]оординатор|EngStickler|review-g3|\bQ1\b|владел/;
for (const [k, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const decided = new Set([...(p.citedInDecisions || []), ...(JSON.stringify(p.meta?.decisions || []).match(/s-[2-9a-hjkmnp-z]{15}/g) || [])]);
  const linked = new Map(p.refs.filter((r) => r.to).map((r) => [r.to, r.type]));
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${k}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !decided.has(to)) problems.push(`${k}: a cites link to ${to} that nothing cites`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${k}: the Russian lacks ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${k}: the Russian cites ${s} alone`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${k}: a part lacks en, ru or change`);
  for (const s of [e.change, p.titleChange, p.reasonChange, ...p.parts.map((x) => x.change), ...(p.examples || []).map((x) => x.change)]) if (s && HISTORY.test(s)) problems.push(`${k}: a change field holds ${s.match(HISTORY)[0]}`);
  if (/владел(?!ьцу счёта)|несёт/.test(ru)) problems.push(`${k}: the Russian says «владелец» or «несёт»`);
  if (/files generated from the specification \(§s-a8fn72xa782wvbk\)/.test(en)) problems.push(`${k}: the generated files cite s-a8fn72xa782wvbk`);
  if (/files generated from the specification \(§(?!s-qyjw8xez6t6adc3)/.test(en)) problems.push(`${k}: the generated files cite another node`);
  for (const bad of [/\bruns from its first line/, /whatever git's settings/, /grammar of a file's language/, /counts (exactly|every edit)/, /\bgive (the same|different)/, /where it opens with `#!`/, /is bound to the rules it implements by SpecTags/]) if (bad.test(en)) problems.push(`${k}: the English still holds ${bad}`);
}
const keeps = (k, baseParts, changedStarts) => {
  const gone = baseParts.map((x) => x.en).filter((x) => !entries[k].proposal.parts.map((y) => y.en).includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${k} differs from its agreed wording beyond the parts it changes: ${gone.map((g) => g.slice(0, 40)).join(" | ")}`);
};
keeps("proposal:new-tools-7-3-review-code", drafts["new:tools-7-3-review-code"].proposal.parts, ["The reviewer judges the changed code on every commit"]);
keeps("proposal:new-tools-10-verdict", drafts["new:tools-10-verdict"].proposal.parts, ["`sheriff review` refuses a commit on which it asks", "`sheriff review` reads a verdict only from an answer"]);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [k, e] of Object.entries(entries)) drafts[k] = e;
for (const k of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (k in entries) continue;
  if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) {
    console.error(`a key outside the group differs from the copy: ${k}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const md = ["# T25, group 3: the English of every node", "", "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-h.mjs.", "fix-group3-h.mjs writes this file; edit the script, not this file.", ""];
for (const [k, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${k} — ${p.title ?? `row ${/10\.1\.\d+[a-z]?/.exec(e.location)[0]} of the main table of checks`}`, "");
  if (e.kind === "cell") md.push(`Its "On failure" cell reads: ${e.cost.en}.`, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${p.examples.length > 1 ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));
const changed = ["# T25, group 3, round h: the English that round h adds or rewrites", "", "Each item differs from what round g left, or belongs to the key that round h adds. The notes of round h say which are in a reviewer's words.", ""];
for (const [k, e] of Object.entries(entries)) {
  const p = e.proposal;
  const old = before[k]?.proposal;
  const items = [];
  const oldEn = new Set((old?.parts || []).map((x) => x.en));
  for (const x of p.parts) if (!oldEn.has(x.en) && (old || x.change !== SAME)) items.push(x.en);
  if (old && p.reason !== old.reason) items.push(`Reason: ${p.reason}`);
  const oldEx = new Set((old?.examples || []).map((x) => x.en));
  for (const x of p.examples || []) if (old && !oldEx.has(x.en)) items.push(`Example: ${x.en}`);
  if (!items.length) continue;
  changed.push(`## ${k} — ${p.title ?? "a row of the main table of checks"}`, "", ...items.map((it) => `- ${it}`), "");
}
fs.writeFileSync(new URL("english-group3-changed-h.md", here), changed.join("\n"));
console.log(`wrote ${Object.keys(entries).length} drafts`);
