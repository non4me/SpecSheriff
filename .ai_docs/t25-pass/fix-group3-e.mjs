// T25, stage 2, group 3, round e: carries out the owner's ruling of 2026-11-24 on Q1 and the principle "Deterministic
// checks hold every participant to the contract" as the owner changed it the same day. An edit to whitespace changes
// code only where the language of the file gives whitespace a meaning; adding, removing or rewording a comment changes
// no code; the reviewer judges each comment that a commit adds or changes, and a finding on it only warns; a change to a
// SpecTag stays a change to the code. Copies tools-drafts.json to tools-drafts.before-group3-e.json before its first
// run, and on every run rebuilds the keys of the group from that copy, so a second run gives the same file. Refuses to
// write where a key outside the group would change, and writes english-group3.md and english-group3-changed-e.md, which
// lists every English sentence that round e adds or rewrites.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3-e.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const newform = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const RULING = "2026-11-24";
const specNode = (sid) => { let found; const w = (n) => { if (n.sid === sid) found = n; (n.children || []).forEach(w); }; JSON.parse(fs.readFileSync(new URL("moved/specs/_guidelines/spec.json", here), "utf8")).nodes.forEach(w); if (!found) throw new Error(sid + " is not in the moved guidelines"); return found; };

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
// The parts of an agreed wording of the new form, which holds its text as plain text: a paragraph per line, "- " a list
// item, "  - " a nested one.
const SAME = "Как в согласованной формулировке.";
const partsOf = (en, ru) => {
  const E = en.split("\n").filter((l) => l.trim());
  const R = ru.split("\n").filter((l) => l.trim());
  if (E.length !== R.length) throw new Error(`the English and the Russian differ in their lines: ${E[0].slice(0, 40)}`);
  return E.map((l, i) => {
    const kind = /^\s+- /.test(l) ? "li2" : l.startsWith("- ") ? "li" : "p";
    const strip = (s) => s.replace(/^\s*- /, "");
    return { kind, en: strip(l), ru: strip(R[i]), change: SAME };
  });
};
const swap = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: no ${JSON.stringify(from.slice(0, 70))}`);
  return s.split(from).join(to);
};
const clone = (x) => JSON.parse(JSON.stringify(x));

// The keys of round d, and the keys that round e adds.
const KEPT = ["s-j9r8z4xdrfkfs47", "new:tools-7-1-extensions-delivered", "s-2x58az67bm6cxq2", "new:tools-7-2-changed-line",
  "new:tools-7-2-draft-rule", "s-t383grkn3q68dpf", "s-5hb9k2e34dgn284", "new:tools-7-2-own-kinds", "s-cdachayybfvg4na",
  "proposal:s-ztseyetus7np6br-g3", "proposal:s-9j2mmnuuwmx5ksn", "proposal:s-hhnahzmhahf8jht",
  "proposal:new-tools-1-settings-g3", "proposal:s-gb8s9657a65hqmv-g3", "proposal:row-10-1-35a"];
const ADDED = ["proposal:s-kgbzk2ph9e6jfb4", "proposal:s-m4h279nbaqkpa3t", "proposal:s-nyh9yk22ba6g77q-g3",
  "proposal:row-10-1-43b", "proposal:s-vp24dqydygztqbt", "proposal:new-tools-10-verdict", "new:tools-7-3-review-comments"];
const S = { row43b: "s-td4e3rdga6azav9", comments: "s-7vpsdsy8dpqdy6r" };
const entries = {};
for (const key of KEPT) {
  if (!drafts[key]) throw new Error(`${key} is not in the copy made before round e`);
  entries[key] = clone(drafts[key]);
}
for (const key of ADDED) if (drafts[key]) throw new Error(`${key} is already in the copy made before round e`);

const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with ${JSON.stringify(start.slice(0, 60))}`);
  return i;
};
const OWNER_RULING = "The owner: whether an edit to formatting changes the code depends on its real effect. An edit to formatting deserves the attention of the reviewer and of a human reviewer only where it affects the logic: indentation in YAML does, indentation in TypeScript does not. Edits to comments are checked for consistency, and a problem with a comment brings a warning, not a refusal. A SpecTag is the exception: it must keep its binding correct.";
const PRINCIPLE_RULING = "The owner agreed on 2026-11-24 to the principle \"Deterministic checks hold every participant to the contract\" as changed that day: on every commit that adds or changes a comment in the code, the independent reviewer judges whether each such comment is consistent with the code that it describes and with the rules that this code implements, and a finding of the reviewer about such a comment is only a warning.";

// ---------------------------------------------------------------------------------------------------------------
// Rule 9.4: proposal:s-9j2mmnuuwmx5ksn, rewritten for the ruling.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-9j2mmnuuwmx5ksn";
  const e = entries[k];
  delete e.dependsOn;
  e.question = "None: carries out the owner's ruling of 2026-11-24 on edits to comments and to whitespace";
  e.proposal.parts = [
    P("A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds.",
      "Изменение SpecTag (§s-8xw4mgvpexyvw5q) считается изменением теста или кода, который этот SpecTag привязывает.",
      "Первое предложение согласованной формулировки; добавлена только ссылка на SpecTag при его первом упоминании (правило 7.2.7)."),
    P("As long as the SpecTag stays the same, none of the following changes the test or the code:",
      "Пока SpecTag остаётся прежним, ни тест, ни код не меняет ничто из следующего:",
      "Было: «Ни тест, ни код не меняет переформулировка названия теста или комментариев в коде и тестах, при прежнем SpecTag». Теперь это список, в который по вашему решению от 2026-11-24 вошли также добавление и удаление комментария и правка пробельных символов, не влияющих на код."),
    L("renaming a test;", "переименование теста;", "Как в согласованной формулировке; пункт списка."),
    L("adding, removing or rewording a comment;", "добавление, удаление или переформулировка комментария;",
      "Было: «переформулировка … комментариев в коде и тестах». По вашему решению от 2026-11-24 комментарий не меняет кода, что бы с ним ни делали. Соответствие комментария коду и правилам оценивает рецензент, и его замечание только предупреждает (правило 1.6.1)."),
    L("changing whitespace that, in the language of its file, does not affect what the code does.",
      "правка пробельных символов, которые в языке файла не влияют на то, что делает код.",
      "Новое, по вашему решению от 2026-11-24: правка форматирования меняет код только там, где влияет на логику, например отступы в YAML, но не в TypeScript."),
    P("In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell from its code, every edit changes the code.",
      "В файле, комментарии и пробельные символы которого проверки (§s-jau82aq9juv9zzh) не могут отличить от кода, каждая правка меняет код.",
      "Новое: где проверки не могут отличить комментарий или пробельные символы от кода, они засчитывают каждую правку, чтобы не пропустить изменение кода. Ваше решение от 2026-11-24 этого не запрещает."),
  ];
  e.proposal.reasonChange = "Как в согласованной формулировке.";
  e.proposal.examples = [{
    en: "A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged.",
    ru: "Коммит меняет отступы блока кода TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому код он не меняет. Но не так: коммит, который увеличивает отступ ключа в файле YAML и тем переносит этот ключ под ключ выше, код не меняет.",
    change: "Новый пример: граница, которую провело ваше решение от 2026-11-24.",
  }];
  e.proposal.refs = [{ type: "cites", to: "s-8xw4mgvpexyvw5q" }, { type: "cites", to: "s-jau82aq9juv9zzh" }];
  e.change = "Что изменено:\n- второе предложение стало списком того, что при прежнем SpecTag не меняет ни тест, ни код;\n- в список вошли добавление и удаление комментария, а не только его переформулировка, и правка пробельных символов, которые в языке файла не влияют на то, что делает код;\n- новое предложение: в файле, где проверки не могут отличить комментарии и пробельные символы от кода, каждая правка меняет код;\n- в первом, согласованном предложении добавлена ссылка на SpecTag при его первом упоминании (правило 7.2.7);\n- новый пример.\n\nПочему: так решили вы 2026-11-24. Правка форматирования считается изменением только там, где влияет на логику: отступы в YAML — да, в TypeScript — нет. Правки комментариев проверяет рецензент, и его замечание предупреждает, но коммит не отклоняет (принцип «Deterministic checks hold every participant to the contract» и предложение по правилу 1.6.1). SpecTag — исключение: его изменение остаётся изменением кода. Последнее предложение — правило по умолчанию для файла, язык которого инструменты SpecSheriff не читают: так ни одно изменение кода не проходит без проверки. Обоснование — как вы согласовали 2026-11-17.";
  e.proposedDecision = {
    date: RULING,
    problem: "Rule 1.5.2 counted a change anywhere in a file bound as a whole as a change to its code. This rule exempted a reworded comment, and the ruling of 2026-11-11 exempted whitespace within a line, so for such a file the two rules could not both hold.",
    ruling: OWNER_RULING,
    type: "textual",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.5.2: a new proposal, from the agreed wording of 2026-11-17.
// ---------------------------------------------------------------------------------------------------------------
{
  const nf = newform["1.5.2"];
  if (nf.sidValue !== "s-kgbzk2ph9e6jfb4" || nf.agreed !== "2026-11-17") throw new Error("rule 1.5.2 is not as agreed on 2026-11-17");
  const ps = partsOf(nf.text, nf.ruText);
  const i = ps.findIndex((x) => x.en.startsWith("A SpecTag before a symbol binds"));
  ps[i].en = swap(ps[i].en, "A change anywhere in a file bound as a whole is a change to the code its SpecTags bind.", "A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit to a comment or to whitespace that changes no code (§s-9j2mmnuuwmx5ksn).", "1.5.2");
  ps[i].ru = swap(ps[i].ru, "Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag.", "Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag. Единственное исключение — правка комментария или пробельных символов, которая код не меняет (§s-9j2mmnuuwmx5ksn).", "1.5.2");
  ps[i].change = "Было: «Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag». Добавлено предложение: исключение — правка комментария или пробельных символов, которая по правилу 9.4 код не меняет; так решили вы 2026-11-24. Без исключения это правило противоречило бы правилу 9.4.";
  entries["proposal:s-kgbzk2ph9e6jfb4"] = {
    question: "None: carries out the owner's ruling of 2026-11-24 on edits to comments and to whitespace",
    location: "spec 1.5.2",
    sidValue: "s-kgbzk2ph9e6jfb4",
    change: "Изменено одно предложение: из «изменения в любом месте» файла, привязанного целиком, исключена правка комментария или пробельных символов, которая по правилу 9.4 код не меняет. Почему: по вашему решению от 2026-11-24 правка форматирования меняет код только там, где влияет на логику, а правка комментария кода не меняет. Это говорит правило 9.4 для всех файлов, и предложение ссылается на него, чтобы два правила не противоречили друг другу. Остальная формулировка — как вы согласовали 2026-11-17.",
    proposal: {
      title: nf.title, ruTitle: nf.ruTitle, parts: ps, reason: nf.reason, ruReason: nf.ruReason, reasonChange: SAME,
      examples: nf.examples.map((en, j) => ({ en, ru: nf.ruExamples[j] })),
      // The agreed node in moved/ holds a cites link to s-qzthyh7yqvfhsa2 that no citation matches; the proposal drops it.
      refs: [...specNode("s-kgbzk2ph9e6jfb4").refs.filter((r) => r.to && r.to !== "s-qzthyh7yqvfhsa2"), { type: "cites", to: "s-9j2mmnuuwmx5ksn" }],
    },
    proposedDecision: {
      date: RULING,
      problem: "This rule counted a change anywhere in a file bound as a whole as a change to its code, including an edit to a comment or to whitespace, while rule 9.4 says that such an edit changes no code.",
      ruling: OWNER_RULING,
      type: "textual",
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 1.6.1: a new proposal, from the agreed wording of 2026-11-20, adding the judgement on comments.
// ---------------------------------------------------------------------------------------------------------------
{
  const nf = newform["1.6.1"];
  if (nf.sidValue !== "s-m4h279nbaqkpa3t" || nf.agreed !== "2026-11-20") throw new Error("rule 1.6.1 is not as agreed on 2026-11-20");
  const ps = partsOf(nf.text, nf.ruText);
  const i = ps.findIndex((x) => x.en.startsWith("on every commit that changes code:"));
  if (i < 0) throw new Error("rule 1.6.1: no judgement on code");
  ps.splice(i + 1, 0, L(
    "on every commit that adds or changes a comment in the code or in a test: whether each such comment is consistent with the code that it describes and with the rules that this code implements;",
    "при каждом коммите, который добавляет или меняет комментарий в коде или в тесте, — согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует;",
    "Новое: суждение, которое 2026-11-24 с вашего согласия добавил принцип «Deterministic checks hold every participant to the contract». Замечание о комментарии только предупреждает: это говорит строка 10.1.43b, как требует последнее предложение этого правила."));
  const reason = swap(nf.reason, "no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change,", "no script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change,", "1.6.1 reason");
  const ruReason = swap(nf.ruReason, "скриптом не решить, делает ли код только то, что говорят его правила, действительно ли", "скриптом не решить, делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли", "1.6.1 reason");
  entries["proposal:s-m4h279nbaqkpa3t"] = {
    question: "None: carries out the principle \"Deterministic checks hold every participant to the contract\", which the owner changed on 2026-11-24",
    location: "spec 1.6.1",
    sidValue: "s-m4h279nbaqkpa3t",
    change: "Добавлено одно суждение рецензента: при каждом коммите, который добавляет или меняет комментарий в коде или в тесте, — согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует. В обосновании к тому, чего скриптом не решить, добавлено, согласуется ли комментарий с кодом и его правилами. Почему: 2026-11-24 вы согласились добавить это суждение в принцип «Deterministic checks hold every participant to the contract». Замечание рецензента о комментарии только предупреждает: это говорит новая строка 10.1.43b, потому что по последнему предложению этого правила непройденная проверка отклоняет изменение, если таблица не говорит иного. Цена, которую вы приняли: коммит, который меняет только комментарии, тоже запускает платный прогон рецензента. Остальная формулировка — как вы согласовали 2026-11-20.",
    proposal: {
      title: nf.title, ruTitle: nf.ruTitle, parts: ps, reason, ruReason,
      reasonChange: "В перечень того, чего скриптом не решить, добавлено, согласуется ли комментарий с кодом и его правилами. Остальное — как в согласованной формулировке.",
      examples: (nf.examples || []).map((en, j) => ({ en, ru: nf.ruExamples[j] })),
      refs: specNode("s-m4h279nbaqkpa3t").refs.filter((r) => r.to),
    },
    proposedDecision: {
      date: RULING,
      problem: "The list of the reviewer's judgements held none on comments. Once rewording a comment no longer counts as a change to the code, nothing would judge whether a comment still matches its code and its rules.",
      ruling: PRINCIPLE_RULING,
      type: "textual",
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rule 10.4: a proposal on the wording agreed in group 2 (proposal:s-nyh9yk22ba6g77q).
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["proposal:s-nyh9yk22ba6g77q"];
  if (base.agreed !== "2026-11-24") throw new Error("the proposal on rule 10.4 is not agreed");
  const e = {
    question: "None: carries out rule 1.6.1 as this group proposes it (s-m4h279nbaqkpa3t)",
    base: "proposal:s-nyh9yk22ba6g77q",
    location: "spec 10.4",
    sidValue: "s-nyh9yk22ba6g77q",
    change: "Изменён один пункт: рецензент получает и формулировку каждого правила, которое SpecTag привязывает к коду или тесту, где коммит добавляет или меняет комментарий. В обоснование добавлено суждение о комментарии. Почему: по предложению по правилу 1.6.1 рецензент оценивает каждый комментарий, который коммит добавляет или меняет, на соответствие коду и правилам, которые этот код реализует. Коммит, который меняет только комментарий, по правилу 9.4 кода не меняет, поэтому прежний пункт не дал бы рецензенту этих правил. Остальная формулировка — как вы согласовали 2026-11-24.",
    proposal: clone(base.proposal),
  };
  for (const x of e.proposal.parts) x.change = SAME;
  delete e.proposal.meta;
  const x = e.proposal.parts.find((p) => p.en.startsWith("the wording of each rule that a SpecTag"));
  x.en = swap(x.en, "binds to code or a test that the commit adds or changes;", "binds to code or a test that the commit adds or changes, or in which the commit adds or changes a comment;", "10.4");
  x.ru = swap(x.ru, "привязывает к коду или тесту, добавленному или изменённому коммитом;", "привязывает к коду или тесту, добавленному или изменённому коммитом либо такому, в котором коммит добавляет или меняет комментарий;", "10.4");
  x.change = "Было: «…к коду или тесту, добавленному или изменённому коммитом». Добавлены код и тест, в которых коммит добавляет или меняет комментарий: по правилу 9.4 такой коммит кода не меняет, а чтобы оценить комментарий, рецензенту нужны правила этого кода (правило 1.6.1).";
  e.proposal.reason = swap(e.proposal.reason, "whether code does only what its rules say, whether a rule's", "whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's", "10.4 reason");
  e.proposal.ruReason = swap(e.proposal.ruReason, "делает ли код только то, что говорят его правила; действительно ли", "делает ли код только то, что говорят его правила; согласуется ли комментарий с кодом и его правилами; действительно ли", "10.4 reason");
  e.proposal.reasonChange = "К перечню суждений добавлено, согласуется ли комментарий с кодом и его правилами. Остальное — как в согласованной формулировке.";
  for (const ex of e.proposal.examples || []) delete ex.change;
  // The agreed proposal holds cites links to s-vsh384ybt4w25a2 and s-km4x4s26kv7pjze that no citation matches; this one drops them.
  e.proposal.refs = e.proposal.refs.filter((r) => !["s-vsh384ybt4w25a2", "s-km4x4s26kv7pjze"].includes(r.to));
  entries["proposal:s-nyh9yk22ba6g77q-g3"] = e;
}

// ---------------------------------------------------------------------------------------------------------------
// A new row of the main table of checks: 10.1.43b, the judgement on comments.
// ---------------------------------------------------------------------------------------------------------------
entries["proposal:row-10-1-43b"] = {
  question: "None: carries out the principle \"Deterministic checks hold every participant to the contract\", which the owner changed on 2026-11-24",
  location: "spec 10.1.43b (new row of the main table of checks, after row 10.1.43a)",
  sidValue: S.row43b,
  kind: "cell",
  cost: { en: "reported as a warning, naming the file and the line of the comment", ru: "сообщается как предупреждение с указанием файла и строки комментария" },
  change: `Новая строка основной таблицы проверок после строки 10.1.43a. Почему: 2026-11-24 вы согласились, что рецензент оценивает каждый комментарий, который коммит добавляет или меняет, и что его замечание о комментарии только предупреждает (принцип «Deterministic checks hold every participant to the contract»). Каждое другое суждение рецензента названо строкой таблицы: 10.1.43, 10.1.43a и 10.1.25a. По правилу 1.6.1 непройденная проверка отклоняет изменение, если таблица не говорит иного, поэтому столбец «On failure» говорит, что замечание сообщается как предупреждение. Так таблица уже говорит о проверках, которые только сообщают: «reported by the node's sid». Новую строку реализует новый узел описания инструментов «The judgement on a comment that a commit adds or changes» (${S.comments}).`,
  proposal: {
    parts: [P("Each comment that a commit adds or changes in the code or in a test is consistent with the code that it describes and with the rules that this code implements",
      "Каждый комментарий, который коммит добавляет или меняет в коде или в тесте, согласуется с кодом, который он описывает, и с правилами, которые этот код реализует",
      "Новая строка; без точки в конце, как у других строк таблицы. Почему она нужна, сказано выше.")],
    refs: [{ type: "checks", to: "s-m4h279nbaqkpa3t" }, { type: "checks", to: "s-nyh9yk22ba6g77q" }],
  },
  proposedDecision: {
    date: RULING,
    problem: "No row of the table stated the reviewer's judgement on comments, or that a finding on a comment only warns.",
    ruling: PRINCIPLE_RULING,
    type: "textual",
  },
};

// ---------------------------------------------------------------------------------------------------------------
// "The review of a commit": a proposal on the draft agreed in group 2.
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["s-vp24dqydygztqbt"];
  if (base.agreed !== "2026-11-24") throw new Error("s-vp24dqydygztqbt is not agreed");
  const e = {
    question: "None: carries out rule 1.6.1 as this group proposes it (s-m4h279nbaqkpa3t)",
    base: "s-vp24dqydygztqbt",
    location: "tools 7.3.4",
    sidValue: "s-vp24dqydygztqbt",
    change: "Добавлен один пункт списка: `sheriff review` запрашивает вердикт и на коммите, который добавляет или меняет комментарий, — для суждения о комментарии (новый узел «The judgement on a comment that a commit adds or changes»). Почему: по предложению по правилу 1.6.1 рецензент выносит это суждение при каждом таком коммите. Цена, которую вы приняли 2026-11-24: коммит, который меняет только комментарии, тоже запускает платный прогон рецензента. Остальная формулировка — как вы согласовали 2026-11-24.",
    proposal: clone(base.proposal),
  };
  for (const x of e.proposal.parts) x.change = SAME;
  for (const ex of e.proposal.examples || []) delete ex.change;
  delete e.proposal.removed;
  const i = e.proposal.parts.findIndex((x) => x.en.startsWith("the judgement on the code that the commit adds or changes"));
  e.proposal.parts.splice(i + 1, 0, L(`the judgement on each comment that the commit adds or changes (§${S.comments});`,
    `суждение о каждом комментарии, который коммит добавляет или меняет (§${S.comments});`,
    "Новый пункт: суждение о комментарии, которое добавляет предложение по правилу 1.6.1."));
  e.proposal.reasonChange = SAME;
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: S.comments }];
  entries["proposal:s-vp24dqydygztqbt"] = e;
}

// ---------------------------------------------------------------------------------------------------------------
// "The reviewer's verdict": a proposal on the draft agreed in group 2.
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["new:tools-10-verdict"];
  if (base.agreed !== "2026-11-24") throw new Error("new:tools-10-verdict is not agreed");
  const e = {
    question: "None: carries out the principle \"Deterministic checks hold every participant to the contract\", which the owner changed on 2026-11-24",
    base: "new:tools-10-verdict",
    location: "tools 10.2",
    sidValue: "s-68ds99w8wd67aae",
    stage3: "The schema of the verdict is to let a finding name the judgement on comments. review.ts is to read a verdict that passes the commit and lists findings on comments only, and to refuse to read one that passes it with any other finding.",
    change: "Изменены последнее предложение текста, обоснование и пример: вердикт, который пропускает коммит, может перечислять замечания о комментариях. Почему: по принципу «Deterministic checks hold every participant to the contract», который вы изменили 2026-11-24, замечание рецензента о комментарии только предупреждает, и рецензент не отклоняет коммит из-за него. Остальная формулировка — как вы согласовали 2026-11-24.",
    proposal: clone(base.proposal),
  };
  for (const x of e.proposal.parts) x.change = SAME;
  delete e.proposal.removed;
  const i = e.proposal.parts.findIndex((x) => x.en.startsWith("`sheriff review` reads a verdict only from an answer"));
  const was = e.proposal.parts[i];
  if (was.en !== "`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.") throw new Error("the verdict's last paragraph is not as agreed");
  e.proposal.parts.splice(i, 1, P(
    `\`sheriff review\` reads a verdict only from an answer that conforms to the schema of the verdict. A verdict that passes the commit lists no finding other than findings on comments (§${S.comments}). A verdict that refuses the commit lists at least one finding that is not on a comment.`,
    `\`sheriff review\` читает вердикт только из ответа, который соответствует схеме вердикта. Вердикт, который пропускает коммит, не перечисляет замечаний, кроме замечаний о комментариях (§${S.comments}). Вердикт, который отклоняет коммит, перечисляет хотя бы одно замечание не о комментарии.`,
    "Было: «…соответствует схеме вердикта и либо пропускает коммит без замечаний, либо отклоняет его хотя бы с одним замечанием». Теперь вердикт, который пропускает коммит, может перечислять замечания о комментариях: по принципу «Deterministic checks hold every participant to the contract» такое замечание только предупреждает. Предложение разбито на три, по одной мысли в каждом (правило 7.3.2)."));
  e.proposal.reason = swap(e.proposal.reason, "such as a pass that lists a finding,", "such as a pass that lists a finding on code,", "verdict reason");
  e.proposal.ruReason = swap(e.proposal.ruReason, "например пропуска с замечанием,", "например пропуска с замечанием о коде,", "verdict reason");
  e.proposal.reasonChange = "Было: «such as a pass that lists a finding». Теперь «a finding on code»: пропуск с замечанием о комментарии — читаемый вердикт.";
  const ex = e.proposal.examples[0];
  ex.en = swap(ex.en, "passes the commit and lists one finding.", "passes the commit and lists one finding on code.", "verdict example");
  ex.ru = swap(ex.ru, "пропускает коммит и перечисляет одно замечание.", "пропускает коммит и перечисляет одно замечание о коде.", "verdict example");
  ex.change = "Было: «…и перечисляет одно замечание». Теперь «одно замечание о коде»: пропуск с замечанием о комментарии — читаемый вердикт.";
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: S.comments }];
  entries["proposal:new-tools-10-verdict"] = e;
}

// ---------------------------------------------------------------------------------------------------------------
// A new node of the appendix of the tools: the judgement on a comment.
// ---------------------------------------------------------------------------------------------------------------
entries["new:tools-7-3-review-comments"] = {
  location: "tools 7.3.4d (new, after \"The judgement on a node of the technical appendix that a commit approves\")",
  sidValue: S.comments,
  from: undefined,
  testsFrom: [],
  stage3: "No code asks the reviewer about comments. review.ts is to ask for a verdict on every commit that adds a line holding part of a comment that the SpecSheriff tools leave out when they read a line of code, to give the reviewer each symbol, test or file bound as a whole that holds such a comment, and to report each finding on a comment as a warning without refusing the commit. Its tests are written first.",
  proposal: {
    title: "The judgement on a comment that a commit adds or changes",
    ruTitle: "Суждение о комментарии, который коммит добавляет или меняет",
    parts: [
      P(`\`sheriff review\` reports as a warning each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§${S.row43b}). It refuses no commit because of such a finding. Each such finding names the file, the line and the problem.`,
        `\`sheriff review\` сообщает как предупреждение каждое замечание независимого рецензента (§s-m4h279nbaqkpa3t) о комментарии, который коммит добавляет или меняет (§${S.row43b}). Из-за такого замечания он не отклоняет ни одного коммита. Каждое такое замечание называет файл, строку и проблему.`,
        "Новое: строка 10.1.43b и принцип «Deterministic checks hold every participant to the contract», который вы изменили 2026-11-24: замечание о комментарии только предупреждает."),
      P("The reviewer judges the comments that the SpecSheriff tools leave out when they read a line of code (§s-u6mj5yv8ngnz79v). A commit adds or changes such a comment where it adds a line that holds part of the comment. The reviewer judges the text of a comment other than its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).",
        "Рецензент оценивает комментарии, которые инструменты SpecSheriff не учитывают, когда читают строку кода (§s-u6mj5yv8ngnz79v). Коммит добавляет или меняет такой комментарий, если добавляет строку, в которой есть часть этого комментария. Рецензент оценивает текст комментария без его SpecTag (§s-8xw4mgvpexyvw5q), потому что изменение SpecTag — это изменение кода (§s-9j2mmnuuwmx5ksn).",
        "Новое: какие комментарии оценивает рецензент. В файле, который инструменты SpecSheriff не читают как токены, каждая правка меняет код, и её оценивает суждение о коде. SpecTag в комментарии оценивают проверки, потому что по правилу 9.4 его изменение — изменение кода."),
      P("The reviewer makes this judgement on every commit that adds or changes such a comment, including a commit that changes no code. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer each symbol (§s-kgbzk2ph9e6jfb4), test or file bound as a whole that holds such a comment. Each is given in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it.",
        "Рецензент выносит это суждение при каждом коммите, который добавляет или меняет такой комментарий, в том числе при коммите, который не меняет кода. Кроме того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт ему каждый символ (§s-kgbzk2ph9e6jfb4), тест или файл, привязанный целиком, в котором стоит такой комментарий. Каждый передаётся целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag, которые его привязывают.",
        "Новое: когда выносится суждение и что получает рецензент. Комментарий судят по коду, который он описывает, поэтому рецензент получает этот код целиком, как в суждении о коде."),
      P("The reviewer finds a problem with a comment where either of the following holds:",
        "Рецензент находит проблему в комментарии, если выполнено одно из следующего:",
        "Новое: что значит, что комментарий согласуется с кодом и правилами, словами принципа."),
      L("the comment states something that the code it describes does not do;", "комментарий говорит то, чего не делает код, который он описывает;", "Новое: несоответствие коду."),
      L("the comment contradicts a rule that a SpecTag on that code names.", "комментарий противоречит правилу, которое называет SpecTag на этом коде.", "Новое: несоответствие правилам, которые реализует код."),
    ],
    reason: "A comment that no longer matches its code misleads whoever reads the code next, and only reading both can show the mismatch. A comment does not change what the system does, so a problem with one is worth a warning but not a refused commit.",
    ruReason: "Комментарий, который больше не соответствует своему коду, вводит в заблуждение следующего читателя кода, и показать несоответствие может только чтение того и другого. Комментарий не меняет того, что делает система, поэтому проблема в нём стоит предупреждения, но не отклонённого коммита.",
    reasonChange: "Новое.",
    examples: [{
      en: "A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as for a defect in the code.",
      ru: "Коммит меняет только комментарий над `roundPrice`: теперь он говорит, что функция округляет половины вверх, а она округляет их до ближайшего чётного. `sheriff review` сообщает замечание рецензента как предупреждение и пропускает коммит. Самая вероятная ошибка — отклонить коммит, как при дефекте в коде.",
    }],
    refs: [{ type: "implements", to: S.row43b }, { type: "cites", to: "s-m4h279nbaqkpa3t" }, { type: "cites", to: "s-u6mj5yv8ngnz79v" },
      { type: "cites", to: "s-8xw4mgvpexyvw5q" }, { type: "cites", to: "s-9j2mmnuuwmx5ksn" }, { type: "cites", to: "s-vp24dqydygztqbt" },
      { type: "cites", to: "s-kgbzk2ph9e6jfb4" }],
  },
};
delete entries["new:tools-7-3-review-comments"].from;

// ---------------------------------------------------------------------------------------------------------------
// "A line that changes the code": the formats bound as a whole whose comments and whitespace the tools read, and the
// default for any other file.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-2-changed-line";
  const e = entries[k];
  const ps = e.proposal.parts;
  const i0 = at(k, "In a file whose language a description covers");
  ps.splice(i0, 1,
    P("The SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language in each of the following files:",
      "Инструменты SpecSheriff решают, какие из строк, которые коммит удаляет или добавляет, меняют код (§s-9j2mmnuuwmx5ksn). Каждую строку они читают как токены языка файла в каждом из следующих файлов:",
      "Новое: узел вынесен из «What a commit adds, changes and removes in the code and the tests». По вашему решению по правилу 9.4 от 2026-11-11 описание инструментов точно говорит, как они читают изменение. Файлы, в которых строка читается как токены, — списком (правило 7.2.2)."),
    L("a file whose language a description covers (§s-33fw3ga4ctd94dq);",
      "файл на языке, для которого есть описание (§s-33fw3ga4ctd94dq);",
      "Новое: файлы, символы которых инструменты SpecSheriff определяют."),
    L("a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`.",
      "файл, привязанный целиком (§s-kgbzk2ph9e6jfb4), имя которого оканчивается на `.yaml`, `.yml`, `.css`, `.sql`, `.sh` или `.json`.",
      "Новое, по вашему решению от 2026-11-24: правка комментария или пробельных символов, не влияющих на логику, не меняет код и в файле, привязанном целиком. Для этого инструментам SpecSheriff нужно знать, как в формате файла пишутся комментарии и где пробельные символы значимы; грамматики tree-sitter для этих форматов это дают. Форматы — те, что чаще всего привязывают целиком: настройки, таблицы стилей, запросы и скрипты."),
    P("They parse such a file bound as a whole with the tree-sitter grammar of its format: YAML, CSS, SQL, Bash or JSON. They read the tokens of a line as follows:",
      "Такой файл, привязанный целиком, они разбирают грамматикой tree-sitter для его формата: YAML, CSS, SQL, Bash или JSON. Токены строки они читают так:",
      "Новое: по какой грамматике читается файл, привязанный целиком, и вводная фраза к правилам чтения токенов."));
  parts(k)[at(k, "they leave out comments")].change = "Новое: по правилу 9.4 добавление, удаление или переформулировка комментария не меняет кода; с комментарием опускается и sid ссылки в нём.";
  const w = at(k, "in Python, the indentation of the two lines differs.");
  ps[w] = L("the whitespace of the two lines differs where the file's language gives whitespace a meaning, such as the indentation of a line in Python or YAML.",
    "различаются пробельные символы двух строк там, где язык файла придаёт им значение, например отступ строки в Python или YAML.",
    "Новое в тексте узла: по вашему решению от 2026-11-24 правка пробельных символов меняет код только там, где влияет на логику, например отступы в YAML, но не в TypeScript. Для Python так решили вы 2026-11-11: отступ определяет блок, в котором стоит строка.");
  ps.push(P("In any other file, every line that the commit removes or adds changes the code.",
    "В любом другом файле каждая строка, которую коммит удаляет или добавляет, меняет код.",
    "Новое: в файле, комментарии и пробельные символы которого инструменты SpecSheriff не могут отличить от кода, засчитывается каждая правка, как требует правило 9.4 в этом предложении группы."));
  e.proposal.reason = swap(e.proposal.reason, "such as comments and the whitespace between tokens.", "such as comments and whitespace to which the language gives no meaning.", k);
  e.proposal.ruReason = swap(e.proposal.ruReason, "например комментарии и пробельные символы между токенами.", "например комментарии и пробельные символы, которым язык не придаёт значения.", k);
  e.proposal.reasonChange = "Новое.";
  e.proposal.examples.push({
    en: "A commit indents the key `retries` in a YAML file bound as a whole by two more spaces, which moves the key under the key above it. The line holds the same tokens as before, but its indentation, to which YAML gives a meaning, differs, so the line changes the code. The most likely mistake is to leave out all whitespace, as in TypeScript, which lets the moved key pass as unchanged.",
    ru: "Коммит увеличивает на два пробела отступ ключа `retries` в файле YAML, привязанном целиком, и тем переносит этот ключ под ключ выше. Токены строки прежние, но её отступ, которому YAML придаёт значение, другой, поэтому строка меняет код. Самая вероятная ошибка — опускать все пробельные символы, как в TypeScript: тогда перенесённый ключ проходит как неизменённый.",
  });
  e.proposal.refs = [...e.proposal.refs, { type: "cites", to: "s-kgbzk2ph9e6jfb4" }];
  e.stage3 = swap(e.stage3, "normalize (diff.ts:78) strips `//`, `/*…*/` and `#` in a file that no description covers; it is no longer used there, since such a file is bound as a whole and every change to it counts.", "normalize (diff.ts:78) strips `//`, `/*…*/` and `#` in a file that no description covers; it goes. A file bound as a whole whose name ends in .yaml, .yml, .css, .sql, .sh or .json is to be parsed with the tree-sitter grammar of its format, its comments left out and its whitespace compared where the format gives it a meaning; in any other file, every changed line counts. Tests for a re-indented YAML key, a reworded CSS comment and a reformatted JSON file are written first.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// "What a commit adds, changes and removes in the code and the tests": a file bound as a whole changes where a line of it
// changes the code.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2x58az67bm6cxq2";
  const e = entries[k];
  delete e.dependsOn;
  const x = parts(k)[at(k, "A commit changes a file bound as a whole")];
  x.en = "A commit changes a file bound as a whole where a line of that file changes the code (§s-u6mj5yv8ngnz79v).";
  x.ru = "Коммит меняет файл, привязанный целиком, если строка этого файла меняет код (§s-u6mj5yv8ngnz79v).";
  x.change = "Новое: по вашему решению от 2026-11-24 правка комментария или пробельных символов, не влияющих на логику, не меняет код и в файле, привязанном целиком (правила 9.4 и 1.5.2 в предложениях группы). Какая строка меняет код, говорит узел «A line that changes the code»; в файле, который инструменты SpecSheriff не читают как токены, код меняет каждая строка.";
  const ex = e.proposal.examples[1];
  if (!ex.en.startsWith("A commit rewords a comment in a stylesheet")) throw new Error(`${k}: example 2 is not the one on a stylesheet`);
  ex.en = "A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools read the stylesheet's lines with the grammar of CSS and leave out the comment, so the commit leaves the stylesheet unchanged. The most likely mistake is to count any change to the text of a file bound as a whole, which makes a reworded comment a change to the code.";
  ex.ru = "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff читают строки таблицы стилей по грамматике CSS и опускают комментарий, поэтому коммит оставляет таблицу стилей неизменной. Самая вероятная ошибка — засчитывать любое изменение текста файла, привязанного целиком: тогда переформулированный комментарий становится изменением кода.";
  e.stage3 = swap(e.stage3, "counting any change of their text and an entry's SpecTags as the file's.", "counting a line of such a file as changed where s-u6mj5yv8ngnz79v says, and a change to an entry's SpecTags as a change to its file.", k);
}

// ---------------------------------------------------------------------------------------------------------------
// Q1 is settled: no field names it.
// ---------------------------------------------------------------------------------------------------------------
for (const [key, e] of Object.entries(entries)) {
  if (e.dependsOn) throw new Error(`${key} still depends on ${e.dependsOn}`);
  const fields = [e.question, e.change, e.proposal.titleChange, e.proposal.reasonChange, ...e.proposal.parts.map((x) => x.change), ...(e.proposal.examples || []).map((x) => x.change)];
  for (const s of fields) if (s && /\bQ1\b|вопрос(у|а|ом)? 1\b|ответ(у|а|ом)? A\b|рекомендуем/.test(s)) throw new Error(`${key}: a field still names Q1: ${s.slice(0, 90)}`);
}
// The removed passages of a draft cite no Q1 either; s-2x58az67bm6cxq2's change field of its first part names the
// ruling of 2026-11-20, which stays.

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
const HISTORY = /[Рр]аунд|[Рр]ецензент[аеуы]? (раунда|предложил)|чтец|[Кк]оординатор|EngStickler|review-g3|владел/;
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
  const spec = key.startsWith("proposal:") && /^spec /.test(e.location || "");
  // An example of an agreed wording keeps its words; only a new or changed example must name its most likely mistake.
  const newExamples = key.startsWith("new:") ? (p.examples || []) : (p.examples || []).filter((x) => x.change);
  const mistake = spec ? /The most likely mistake is|But not:/ : /The most likely mistake is/;
  const mistakeRu = spec ? /Самая вероятная ошибка|Но не так:/ : /Самая вероятная ошибка/;
  if (!newExamples.every((x) => mistake.test(x.en) && mistakeRu.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  if (key.startsWith("proposal:") && (!e.question || !e.change)) problems.push(`${key}: a proposal without its question or its Russian change`);
  for (const s of [e.change, p.titleChange, p.reasonChange, ...p.parts.map((x) => x.change), ...(p.examples || []).map((x) => x.change)]) if (s && HISTORY.test(s)) problems.push(`${key}: a change field names a round or a reviewer: ${s.match(HISTORY)[0]}`);
  if (/владел|несёт|несут/.test(ru)) problems.push(`${key}: the Russian says «владелец» or «несёт»`);
  const checked = key.startsWith("proposal:") ? [...p.parts.filter((x) => x.change !== SAME && !/^Как в согласованной формулировке/.test(x.change)).map((x) => x.en), ...(p.examples || []).filter((x) => x.change).map((x) => x.en)] : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)];
  for (const sentence of checked.filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const phrase = checked.join("\n");
  for (const bad of [/stands for/, /closest mistake/i, /outside its tests/, / included\b/, /\bstands?\b/, /\bthe tools\b(?! of)/, /makes this check whether/, /\bspacing\b/, /provided that/, /renames outside/]) {
    if (bad.test(phrase.replace(/SpecSheriff tools/g, "SST"))) problems.push(`${key}: the English holds ${bad}`);
  }
}
// A proposal built on an agreed wording keeps every part that its change does not touch.
const keeps = (key, baseParts, changedStarts) => {
  const base = baseParts.map((x) => x.en);
  const now = entries[key].proposal.parts.map((x) => x.en);
  const gone = base.filter((x) => !now.includes(x));
  if (gone.length !== changedStarts.length || !gone.every((g, i) => g.startsWith(changedStarts[i]))) problems.push(`${key} differs from its agreed wording beyond the parts it changes: ${gone.map((g) => g.slice(0, 40)).join(" | ")}`);
};
keeps("proposal:s-kgbzk2ph9e6jfb4", partsOf(newform["1.5.2"].text, newform["1.5.2"].ruText), ["A SpecTag before a symbol binds"]);
keeps("proposal:s-m4h279nbaqkpa3t", partsOf(newform["1.6.1"].text, newform["1.6.1"].ruText), []);
keeps("proposal:s-nyh9yk22ba6g77q-g3", drafts["proposal:s-nyh9yk22ba6g77q"].proposal.parts, ["the wording of each rule that a SpecTag"]);
keeps("proposal:s-vp24dqydygztqbt", drafts["s-vp24dqydygztqbt"].proposal.parts, []);
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
  else if (key.startsWith("proposal:")) out.push(`A proposal: the complete new wording of the agreed node ${e.base ? `under \`${e.base}\`` : e.sidValue}.`, "");
  return out;
};
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-e.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposals for agreed nodes and for new rows of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group3-e.mjs writes this file; edit the script, not this file.",
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

// Every English sentence that round e adds or rewrites: a new key in full, and in a key of round d each part, reason or
// example whose English differs from the copy.
const changed = [
  "# T25, group 3, round e: the English that round e adds or rewrites",
  "",
  "Each item below was written in round e by fix-group3-e.mjs in the author's own words: every part, reason and example whose English differs from what round d left, and every key that round e adds, in full.",
  "fix-group3-e.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const old = before[key]?.proposal;
  const items = [];
  if (!old) {
    if (e.base || newform[Object.keys(newform).find((n) => newform[n].sidValue === e.sidValue)]) {
      const agreed = e.base ? drafts[e.base] && before[e.base].proposal : null;
      const agreedEn = new Set(agreed ? agreed.parts.map((x) => x.en) : partsOf(newform[Object.keys(newform).find((n) => newform[n].sidValue === e.sidValue)].text, newform[Object.keys(newform).find((n) => newform[n].sidValue === e.sidValue)].ruText).map((x) => x.en));
      for (const x of p.parts) if (!agreedEn.has(x.en)) items.push(x.en);
      const agreedReason = agreed ? agreed.reason : newform[Object.keys(newform).find((n) => newform[n].sidValue === e.sidValue)].reason;
      if (p.reason !== agreedReason) items.push(`Reason: ${p.reason}`);
      for (const x of p.examples || []) if (x.change) items.push(`Example: ${x.en}`);
    } else {
      for (const x of p.parts) items.push(x.en);
      if (p.reason) items.push(`Reason: ${p.reason}`);
      for (const x of p.examples || []) items.push(`Example: ${x.en}`);
    }
  } else {
    const oldEn = new Set(old.parts.map((x) => x.en));
    for (const x of p.parts) if (!oldEn.has(x.en)) items.push(x.en);
    if (p.reason !== old.reason) items.push(`Reason: ${p.reason}`);
    const oldEx = new Set((old.examples || []).map((x) => x.en));
    for (const x of p.examples || []) if (!oldEx.has(x.en)) items.push(`Example: ${x.en}`);
  }
  if (!items.length) continue;
  changed.push(`## ${key} — ${p.title ?? "a new row of the main table of checks"}`, "");
  for (const it of items) changed.push(`- ${it}`);
  if (e.kind === "cell") changed.push(`- On failure: ${e.cost.en}`);
  changed.push("");
}
fs.writeFileSync(new URL("english-group3-changed-e.md", here), changed.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
