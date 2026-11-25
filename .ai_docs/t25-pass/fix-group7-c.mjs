// T25, stage 2, group 7, round c: applies the follow-up review (review-g7b-a.md to review-g7b-d.md) and the findings of
// EngStickler's readers (english-g7b-fast.md, english-g7b-thorough.md), with the main session's decisions in
// fix-brief-group7-c.md. It moves the sentence on `format` out of item 53 into the new node "The validator of the
// RuntimeChecks". On its first run it copies tools-drafts.json to tools-drafts.before-group7-c.json; on every run it
// rebuilds the keys of the group from that copy, checks every draft as fix-group7-b.mjs does, and writes
// tools-drafts.json and english-group7c.md. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group7-c.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";

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
const NEW = "Новое.";
const AS_AGREED = "Как в согласованной формулировке.";

// The sids that this round adds, each generated with the alphabet of rule 1.2.2 and checked below to be held nowhere else.
const SID = { validator: "s-axxezge5duzemgs" };
const GROUP = [
  "s-k4nqjr96ux7a5m7", "new:tools-5-export", "new:tools-5-show", "s-rpv4fkdqqguptqd", "new:tools-4-diagram", "s-pvzms7d8kxb8dk2",
  "s-suv42g8r3ra2h6b", "s-nk8td3ez58gahc4", "s-4npdup7mjkva69y", "proposal:s-f5rz6b7dhxejjts-g7", "proposal:s-3anv9qcmx8pwp2w-g7",
  "proposal:s-ezq8csd433vj6fj-g7", "proposal:s-gb8s9657a65hqmv-g7", "proposal:s-dbk2vyeg8z5jxna-g7", "new:tools-17-bindings-entry",
  "proposal:new-tools-1-settings-g7", "proposal:s-vp24dqydygztqbt-g7",
];
const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round b in the copy`);
  entries[key] = structuredClone(drafts[key]);
}
const changed = new Set();
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with: ${start}`);
  return i;
};
const rep = (key, start, ...replacement) => {
  parts(key).splice(at(key, start), 1, ...replacement);
  changed.add(key);
};
const ins = (key, afterStart, ...added) => {
  parts(key).splice(at(key, afterStart) + 1, 0, ...added);
  changed.add(key);
};
const del = (key, start) => {
  parts(key).splice(at(key, start), 1);
  changed.add(key);
};
const set = (key, fields) => {
  Object.assign(entries[key].proposal, fields);
  changed.add(key);
};
const refsAdd = (key, ...refs) => {
  for (const r of refs) if (!entries[key].proposal.refs.some((x) => x.to === r.to)) entries[key].proposal.refs.push(r);
  changed.add(key);
};
// Replaces words in a string that must hold them, so that a draft changed since this script was written is caught.
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: does not hold: ${from}`);
  return s.split(from).join(to);
};
// Replaces words in one language of a part, keeping the part's other fields.
const swapPart = (key, start, lang, from, to) => {
  const x = parts(key)[at(key, start)];
  x[lang] = swap(x[lang], from, to, `${key}, the part “${start}”, ${lang}`);
  changed.add(key);
};
const swapExample = (key, i, lang, from, to) => {
  const x = entries[key].proposal.examples[i];
  x[lang] = swap(x[lang], from, to, `${key}, example ${i + 1}, ${lang}`);
  changed.add(key);
};
const swapField = (key, field, from, to) => {
  entries[key][field] = swap(entries[key][field], from, to, `${key}, ${field}`);
  changed.add(key);
};

// ---------------------------------------------------------------------------------------------------------------
// Item 51: how a node is written in Markdown (review g7b-a, findings 1 and 2; the fast reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-k4nqjr96ux7a5m7";
  rep(k, "`sheriff guide` leaves out",
    P("`sheriff guide` leaves out each node's metadata, the value of the node's `meta` (§s-jk8v3srrved7ram).",
      "`sheriff guide` опускает метаданные каждого узла — значение его `meta` (§s-jk8v3srrved7ram).",
      "Было: «`sheriff guide` writes each node of the guidelines as the export does, except its metadata.» Без изменений по смыслу; сказано, что метаданные узла — это значение его `meta`. Согласованный узел о `sheriff guide` говорит это сам, и этот узел на него ссылается."));
  rep(k, "The following values are written",
    P("The following values are written in a form of their own instead of as JSON:",
      "Следующие значения записываются не в виде JSON, а в особом виде:",
      "Было: «These values are written otherwise:». Без изменений по смыслу."));
  rep(k, "In a cell of these tables:",
    P("In a cell of the table of a `TextRule.list` and of a table of a `TableRule`:",
      "В ячейке таблицы `TextRule.list` и таблицы `TableRule`:",
      "Было: «A cell holding a list or an object holds it as JSON on one line, a `|` escaped.» Без изменений по смыслу."));
  swapExample(k, 0, "en", "prints the node of one of its rows under the node's location. With it, `sheriff show` prints",
    "prints the node of one of its rows under a heading that holds the node's location. Along with the node, `sheriff show` prints");
  swapExample(k, 0, "ru", "печатает узел одной из её строк под расположением этого узла. Вместе с ним `sheriff show` печатает",
    "печатает узел одной из её строк под заголовком, в котором расположение этого узла. Вместе с узлом `sheriff show` печатает");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 51: writing the human-readable export (review g7b-a, finding 3; the thorough reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-5-export";
  swapPart(k, "`sheriff markdown` writes one Markdown file", "en", "takes from the plugin (§s-bsya3febm6u64ab).", "takes from the plugin (§s-bsya3febm6u64ab, §s-zefk589ykh37b8u).");
  swapPart(k, "`sheriff markdown` writes one Markdown file", "ru", "берёт из плагина (§s-bsya3febm6u64ab).", "берёт из плагина (§s-bsya3febm6u64ab, §s-zefk589ykh37b8u).");
  set(k, { reason: swap(entries[k].proposal.reason, "A person reads in the export the whole specification of the project,", "In the export, a person reads the project's whole specification,", `${k}, the reason`) });
}

// ---------------------------------------------------------------------------------------------------------------
// Item 51: printing one node (the fast reader; the main session's decision on review g7b-a).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-5-show";
  swapPart(k, "`sheriff show` prints", "en", "`sheriff show` prints to its standard output one node, written", "`sheriff show` prints one node to its standard output, written");
  swapPart(k, "`sheriff show` prints", "ru", "`sheriff show` печатает в свой стандартный вывод один узел так,", "`sheriff show` печатает один узел в свой стандартный вывод так,");
  const x = parts(k)[at(k, "`sheriff show` looks for the node")];
  x.en += " `sheriff show` refuses to run without an argument.";
  x.ru += " Без аргумента `sheriff show` отказывается работать.";
  x.change += " Без аргумента команда отказывается работать — так делает код (cli.ts).";
  entries[k].stage3 += " cli.ts already refuses to run sheriff show without an argument.";
}

// ---------------------------------------------------------------------------------------------------------------
// The list of commands: the citations that rule 7.2.7 requires (review g7b-a, findings 4 and 5).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:s-f5rz6b7dhxejjts-g7";
  rep(k, "`sheriff review`:",
    L("`sheriff review`: asks the independent reviewer (§s-m4h279nbaqkpa3t) for its verdict on a commit (§s-4kd2pave7vm4hmd);",
      "`sheriff review` — запрашивает вердикт независимого рецензента (§s-m4h279nbaqkpa3t) по коммиту (§s-4kd2pave7vm4hmd);",
      "Ссылка по правилу 7.2.7 там, где узел впервые называет независимого рецензента (правило 1.6.1). Остальное — как в согласованной формулировке."));
  rep(k, "`sheriff types`:",
    L("`sheriff types`: generates parts of the system's code (§s-hheus6f395ynqvc) from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), for example the types and RuntimeChecks (§s-e877bnfa559tvk9) for the RecordTypes (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk);",
      "`sheriff types` — порождает части кода системы (§s-hheus6f395ynqvc) из одобренных формулировок узлов (§s-qyjw8xez6t6adc3), например типы и RuntimeChecks (§s-e877bnfa559tvk9) для RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk);",
      "Ссылки по правилу 7.2.7 там, где узел впервые называет код системы (правило 9.1), одобренные формулировки (правило 10.15), RuntimeChecks (правило 12.3) и RecordType (правило 12.1). Остальное — как в согласованной формулировке."));
  rep(k, "`sheriff json`:",
    L("`sheriff json`: prints as JSON the model of the specification, which a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze) reads (§s-w6gybeqn2ttydqx);",
      "`sheriff json` — печатает в JSON модель спецификации, которую читает собственная проверка (§s-2fau85dfyyeq66m) или генератор проекта (§s-km4x4s26kv7pjze, §s-w6gybeqn2ttydqx);",
      "Ссылки по правилу 7.2.7 там, где узел впервые называет собственную проверку проекта (правило 10.8) и собственный генератор проекта (правило 10.9). Остальное — как в согласованной формулировке."));
  swapPart(k, "`sheriff todos`:", "ru", "вместе с её узлом", "вместе с его узлом");
  refsAdd(k, R("cites", "s-m4h279nbaqkpa3t"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-qyjw8xez6t6adc3"), R("cites", "s-2fau85dfyyeq66m"), R("cites", "s-km4x4s26kv7pjze"));
  entries[k].change = "Технически: строки о `sheriff show` и `sheriff markdown` ссылаются теперь на новые узлы этих команд, «Printing one node» и «Writing the human-readable export», на которые группа разделила узел о том, что экспорт, руководство и `sheriff show` пишут об узле. Ссылка на прежний узел, который теперь говорит только, как узел записывается в Markdown, из этого узла ушла. По правилу 7.2.7 добавлены ссылки там, где узел впервые называет: независимого рецензента (правило 1.6.1) — в строке о `sheriff review`; код системы (правило 9.1), одобренные формулировки (правило 10.15), RuntimeChecks (правило 12.3) и RecordType (правило 12.1) — в строке о `sheriff types`; собственную проверку проекта (правило 10.8) и собственный генератор проекта (правило 10.9) — в строке о `sheriff json`; todo (правило 1.2.5) — в строке о `sheriff todos`; статус одобрения спецификации (правило 10.6), флаг `strict` (правило 10.7) и расширения guidelines (правило 1.7.1) — в строке о `sheriff settings`; SpecTag (правило 9.3) — в строке о `sheriff untagged`. Остальная формулировка — как вы согласовали.";
}

// ---------------------------------------------------------------------------------------------------------------
// Item 52: building the map (review g7b-b, findings 1 to 3; the thorough reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-rpv4fkdqqguptqd";
  rep(k, "The web page draws the map with markmap",
    P("`sheriff map` builds an outline in Markdown from the nodes. It writes that outline only into the web page itself. The web page draws the map from the outline with markmap.",
      "`sheriff map` строит из узлов план в Markdown. Он записывает этот план только в саму веб-страницу. Веб-страница рисует карту по этому плану с помощью markmap.",
      "Было: «The web page draws it with markmap, from an outline in markdown that the command builds and keeps nowhere.» Без изменений по смыслу; «keeps nowhere» уточнено: план записан только в саму страницу (generated.ts). Убрано «Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is»: это говорит правило 10.14."),
    P("The page holds markmap and every library that markmap needs, each with its licence notice. The page loads nothing from the network.",
      "Страница содержит markmap и все библиотеки, которые нужны markmap, каждую с её лицензионным уведомлением. Страница ничего не загружает из сети.",
      "Было: «The page carries markmap and every library it needs, each with its licence notice. It loads nothing from the network.» Без изменений по смыслу."));
  {
    const x = parts(k)[at(k, "The outline has the following top-level branches")];
    x.en = "The root of the outline, labelled `Specification`, represents no node. " + x.en;
    x.ru = "Корень плана, подписанный `Specification`, не представляет узла. " + swap(x.ru, "У структуры есть", "У плана есть", `${k}, the branches, ru`);
    x.change += " Новое: сказано, чем подписан корень плана, — так делает код (generated.ts).";
  }
  rep(k, "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch",
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch `Base specification` takes the domains row by row, from the top row of the diagram of the domains (§s-jzm6qw992j3bnxt) to its row `No level`. It takes the domains of each row in the order in which the diagram places them.",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), ветвь `Base specification` берёт домены линия за линией, от верхней линии схемы доменов (§s-jzm6qw992j3bnxt) до её линии `No level`. Домены каждой линии она берёт в том порядке, в каком их ставит схема.",
      parts(k)[at(k, "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch")].change));
  swapPart(k, "In the outline, `sheriff map` writes", "ru", "В структуре `sheriff map` записывает", "В плане `sheriff map` записывает");
  swapExample(k, 0, "en", "at the level `services`, where `billing` uses `accounts`.", "at the level `services`, and `billing` uses `accounts`.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 52: drawing the diagram of the domains (review g7b-b, findings 1 to 3; both readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-4-diagram";
  rep(k, "They take the domains of each row in this order",
    P("The SpecSheriff tools take the domains of each row in this order (§s-uw9n84edf7cbe9n):",
      "Домены каждой линии инструменты SpecSheriff берут в таком порядке (§s-uw9n84edf7cbe9n):", NEW));
  rep(k, "last, each domain not yet placed",
    L("finally, each domain not yet placed, which is left only where domains of the row use one another in a cycle (§s-bncp7gtyaukur8e).",
      "наконец — каждый ещё не поставленный домен; такой домен остаётся, только если домены линии пользуются друг другом по кругу (§s-bncp7gtyaukur8e).",
      parts(k)[at(k, "last, each domain not yet placed")].change));
  rep(k, "This order takes into account only",
    P("Where the steps above leave a choice between several domains, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.",
      "Где описанные шаги оставляют выбор между несколькими доменами, инструменты SpecSheriff берут их в алфавитном порядке имён. Имена они сравнивают символ за символом, по кодовым точкам символов.",
      parts(k)[at(k, "This order takes into account only")].change));
  set(k, {
    reason: "The rule on the order of the domains in a row (§s-uw9n84edf7cbe9n) leaves its harder cases to the appendix of the tools (§s-a4rbry4hsu34hy8). This node settles them, together with how the rows are labelled, so that the same headers give the same diagram on every machine.",
    ruReason: "Правило о порядке доменов в линии (§s-uw9n84edf7cbe9n) оставляет свои более сложные случаи описанию инструментов (§s-a4rbry4hsu34hy8). Этот узел решает их, а также то, как подписаны линии, так что из одних и тех же заголовков на любой машине получается одна и та же схема.",
  });
  refsAdd(k, R("cites", "s-a4rbry4hsu34hy8"));
}

// ---------------------------------------------------------------------------------------------------------------
// Item 53: the sentence on `format` moves to a node of its own (review g7b-c, findings 1 to 3; both readers).
// ---------------------------------------------------------------------------------------------------------------
const FORMAT = {
  en: "The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion.",
  ru: "Валидатор JSON Schema, который техническое приложение называет для RuntimeChecks (§s-e877bnfa559tvk9), считает `format` утверждением.",
};
{
  const k = "s-pvzms7d8kxb8dk2";
  const f = parts(k)[at(k, "The JSON Schema validator")];
  if (f.en !== FORMAT.en || f.ru !== FORMAT.ru) throw new Error(`${k}: the sentence on \`format\` differs from the one this script moves`);
  del(k, "The JSON Schema validator");
  {
    const x = parts(k)[at(k, "The list of those files is")];
    x.en = swap(x.en, "That rule is the one that has an `implements` link to", "That rule is the one that has both a `TextRule.list` and an `implements` link to", `${k}, en`);
    x.ru = swap(x.ru, "Это то правило, у которого есть связь `implements` с", "Это то правило, у которого есть и `TextRule.list`, и связь `implements` с", `${k}, ru`);
    x.change += " Правило со списком — то, у которого есть и `TextRule.list`, и связь `implements`: в разделе о стеке правило 12.3 может реализовать и правило без списка, например правило о валидаторе.";
  }
  rep(k, "The check of generated copies refuses",
    P("The check of generated copies refuses a list that names a file with any other extension, and anything else that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).",
      "Проверка порождённых копий отвергает список, в котором есть файл с любым другим расширением имени, и всё остальное, из-за чего `sheriff types` не может ничего записать (§s-dbk2vyeg8z5jxna).",
      parts(k)[at(k, "The check of generated copies refuses")].change));
  set(k, {
    reason: "Where the generated code goes concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu).",
    ruReason: "Куда записывается сгенерированный код — выбор, который касается всей системы, поэтому техническое приложение описывает его в своём разделе о стеке (§s-mm2de262g3jkapu).",
    reasonChange: "Было: три абзаца, которые объясняли текст по порядку, в том числе что инструменты так же читают уровни доменов. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2), и ссылается на правило 4.2, по которому выбор, касающийся всей системы, описывается в разделе технического приложения о стеке.",
  });
  refsAdd(k, R("cites", "s-mm2de262g3jkapu"));
  entries[k].proposal.removed.push("“The JSON Schema validator that the technical appendix names for the RuntimeChecks treats `format` as an assertion.”: a requirement on the project's validator, not on where the files are written; it is moved unchanged into the new node “The validator of the RuntimeChecks”.");
}

// The new node, after the entry in the bindings file.
entries["new:tools-17-validator"] = {
  location: "tools 17b (new, after “The entry in the bindings file for a file of RuntimeChecks”)",
  from: "s-pvzms7d8kxb8dk2",
  sidValue: SID.validator,
  testsFrom: ["match no test"],
  proposal: {
    title: "The validator of the RuntimeChecks",
    ruTitle: "Валидатор RuntimeChecks",
    parts: [
      P("The JSON Schema validator that the technical appendix (§s-tj38pvm38nepaf5) names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion.",
        "Валидатор JSON Schema, который техническое приложение (§s-tj38pvm38nepaf5) называет для RuntimeChecks (§s-e877bnfa559tvk9), считает `format` утверждением.",
        "Было в узле «Where the types and RuntimeChecks generated from the RecordTypes are written»: «Those RuntimeChecks are run by the JSON Schema validator the technical appendix names. That validator asserts `format` rather than taking it as a note.» Без изменений по смыслу. Это требование к валидатору проекта, а не к тому, куда записываются файлы, поэтому оно стало отдельным узлом. Добавлена ссылка по правилу 7.2.7 там, где узел впервые называет техническое приложение."),
    ],
    reason: "A validator that treats `format` only as an annotation accepts a date that is no date.",
    ruReason: "Валидатор, который считает `format` только аннотацией, пропускает дату, которая датой не является.",
    reasonChange: NEW,
    examples: [],
    refs: [R("implements", "s-e877bnfa559tvk9"), R("cites", "s-tj38pvm38nepaf5")],
    removed: [],
    date: DATE,
  },
  stage3: "No code of the SpecSheriff tools carries this node out: they do not run the RuntimeChecks. A project configures the validator that its technical appendix names so that it asserts `format`. Question 8 for the base specification is to decide whether rule 12.3 states this requirement, and so where this node finally belongs. No test of the SpecSheriff tools is written for it.",
};
changed.add("new:tools-17-validator");

// ---------------------------------------------------------------------------------------------------------------
// Item 53: the entry in the bindings file (review g7b-c, finding 4; the thorough reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-17-bindings-entry";
  set(k, {
    title: "The entry in the bindings file for a file of RuntimeChecks",
    reason: "The code generated from a RecordType is bound to it (§s-ktfstpv8rurznrp), so each RecordType's RuntimeChecks can be found starting from it, as its types can.",
    ruReason: "Код, сгенерированный из RecordType, привязан к нему (§s-ktfstpv8rurznrp), поэтому RuntimeChecks каждого RecordType можно найти, начиная с него, так же, как его типы.",
  });
}
// The new title, and the same preposition in the group's own notes on that entry.
for (const k of GROUP) {
  const e = entries[k];
  const fix = (s) => s.replace(/The entry of the bindings file for a file of RuntimeChecks/g, "The entry in the bindings file for a file of RuntimeChecks")
    .replace(/\b(the|an) entry of the bindings file\b/g, "$1 entry in the bindings file");
  for (const f of ["change", "question", "stage3"]) if (typeof e[f] === "string" && fix(e[f]) !== e[f]) { e[f] = fix(e[f]); changed.add(k); }
  for (const x of e.proposal.parts) {
    if (x.change === AS_AGREED) continue;
    for (const f of ["en", "change"]) if (fix(x[f]) !== x[f]) { x[f] = fix(x[f]); changed.add(k); }
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Item 54: what is generated from a RecordType (review g7b-c, finding 5; both readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-suv42g8r3ra2h6b";
  swapPart(k, "The fields of a type and of a definition", "en", "They take no RecordType twice.", "They take each RecordType only the first time that they reach it.");
  swapPart(k, "The fields of a type and of a definition", "ru", "Ни один RecordType они не берут дважды.", "Каждый RecordType они берут, только когда доходят до него впервые.");
  swapPart(k, "A definition is the RecordType's own `schema`", "ru", "Определение — это собственная `schema` RecordType,", "Определение строится из собственной `schema` RecordType,");
  {
    const x = parts(k)[at(k, "A definition is the RecordType's own `schema`")];
    x.change = swap(x.change, "Теперь определение — это сама `schema` RecordType", "Теперь определение строится из самой `schema` RecordType", `${k}, change`);
  }
  swapPart(k, "A definition is the RecordType's own `schema`", "en", "A definition is the RecordType's own `schema`,", "A definition is built from the RecordType's own `schema`,");
  swapExample(k, 0, "en", "The fragment of a format `address` declares", "The fragment of a format named `address` declares");
  swapExample(k, 0, "ru", "Фрагмент формата `address` объявляет", "Фрагмент формата с именем `address` объявляет");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 55: a RecordType that its variants refine (review g7b-d, F1 to F5 and the nits; both readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-nk8td3ez58gahc4";
  rep(k, "For a RecordType that has RecordType variants",
    P("For a RecordType (§s-7vm323mhry2enx3) that has RecordType variants (§s-z3dnru6qqdf9m6j), `sheriff types` writes a definition and a type that also describe the fields of each variant. In every other respect, it writes them as it writes those of any RecordType (§s-suv42g8r3ra2h6b).",
      "Для RecordType (§s-7vm323mhry2enx3), у которого есть варианты RecordType (§s-z3dnru6qqdf9m6j), `sheriff types` пишет определение и тип, которые описывают и поля каждого варианта. Во всём остальном он пишет их так же, как определение и тип любого RecordType (§s-suv42g8r3ra2h6b).",
      "Было: «A RecordType that variants refine is written as the union of its members.» Без изменений по смыслу; добавлена ссылка по правилу 7.2.7 там, где узел впервые называет RecordType (правило 12.1)."),
    P("The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes each variant in its last approved wording (§s-a8fn72xa782wvbk), in the order in which it takes the RecordTypes. It leaves out a variant that has never been approved. Where it leaves out every variant of a RecordType, it writes the RecordType's definition and type as it writes those of any RecordType.",
      "Варианты такого RecordType — это те варианты RecordType, чей RecordType — он, как это определяет проверка вариантов RecordType (§s-c2r9jndrjbtbsv6). `sheriff types` берёт каждый вариант в его последней одобренной формулировке (§s-a8fn72xa782wvbk), в том порядке, в каком берёт RecordType. Вариант, который ни разу не одобряли, он пропускает. Если он пропускает все варианты RecordType, он пишет определение и тип этого RecordType так же, как определение и тип любого RecordType.",
      "Было: «Its variants are RecordTypes each answering to values of its choosing fields.» Что такое вариант RecordType и чей он, теперь говорит согласованный узел «What a RecordType variant must agree with», а из какой формулировки генерировать, — согласованный узел о `sheriff types`; этот узел на них ссылается. Новое: вариант, который ни разу не одобряли, в определение и тип не входит, а если не входит ни один вариант, RecordType пишется как любой другой. Так черновик варианта не меняет код, сгенерированный из его RecordType."));
  swapPart(k, "In a file of RuntimeChecks (§s-e877bnfa559tvk9)", "en", "also holds a pair of `if` and `then` for each", "also holds an `if` and `then` pair for each");
  rep(k, "`then` is",
    L("`then` is `{\"$ref\": \"#<sid>\"}`, with the sid of the variant, so that it points to the variant's definition.",
      "`then` — это `{\"$ref\": \"#<sid>\"}` с sid варианта, так что он указывает на определение варианта.", NEW));
  ins(k, "`then` is",
    P("Where the RecordType's `schema` holds no `allOf`, the definition holds an `allOf` with only these pairs.",
      "Если `schema` RecordType не содержит `allOf`, определение содержит `allOf` только с этими парами.",
      "Новое: в `schema` RecordType может не быть `allOf`, и тогда пары стоят в новом `allOf`."));
  rep(k, "where a combination of values of the fields that select a variant",
    L("where a combination of values of the fields that select a variant has no variant, a type for the combinations that have no variant; its name is the name of the RecordType's type followed by `Other`.",
      "если у какого-то сочетания значений полей, выбирающих вариант, нет варианта, — тип для сочетаний, у которых нет варианта; имя этого типа — имя типа RecordType, за которым следует `Other`.",
      parts(k)[at(k, "where a combination of values of the fields that select a variant")].change));
  {
    const x = parts(k)[at(k, "The type for the combinations that have no variant holds")];
    x.en = swap(x.en, "The type for the combinations that have no variant holds the RecordType's fields.",
      "The type for the combinations that have no variant is written right after the union. It holds the RecordType's fields.", `${k}, en`);
    x.ru = swap(x.ru, "Тип для сочетаний, у которых нет варианта, содержит поля RecordType.",
      "Тип для сочетаний, у которых нет варианта, пишется сразу после объединения. Он содержит поля RecordType.", `${k}, ru`);
    x.change += " Новое: сказано, где пишется этот тип, — так делает код (types.ts).";
  }
  swapExample(k, 0, "en", "correspond to `email` and `sms`, and the first declares the guaranteed field `address`. Its definition holds a pair of `if` and `then` for each of them,",
    "correspond to `email` and `sms`; the first declares the guaranteed field `address`, and the second the guaranteed field `phone`. Its definition holds an `if` and `then` pair for each of them,");
  swapExample(k, 0, "ru", "соответствуют `email` и `sms`, и первый объявляет гарантированное поле `address`.",
    "соответствуют `email` и `sms`; первый объявляет гарантированное поле `address`, а второй — гарантированное поле `phone`.");
  refsAdd(k, R("cites", "s-7vm323mhry2enx3"));
  swapField(k, "stage3", "a variant that has never been approved is left out of the pairs and of the union, as s-a8fn72xa782wvbk leaves out a node never approved;",
    "a variant that has never been approved is left out of the pairs and of the union, as s-a8fn72xa782wvbk leaves out a node never approved, and where every variant is left out the RecordType's definition and type are written as those of any RecordType;");
  swapField(k, "stage3", "the Other member where a combination has no variant.",
    "the Other member where a combination has no variant, written right after the union, as types.ts already does.");
  swapField(k, "stage3", "holds allOf and a test for a variant never approved are written first;",
    "holds allOf, a test for a variant never approved and a test for a RecordType none of whose variants has ever been approved are written first;");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 56: the type that the schema of a field gives (review g7b-d, G1 to G5 and the nits; both readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4npdup7mjkva69y";
  swapPart(k, "Within a RecordType's `schema`", "en", "Within a RecordType's `schema` (§s-6eb92ddch7shuvu),", "Within a RecordType's `schema` (§s-7vm323mhry2enx3, §s-6eb92ddch7shuvu),");
  swapPart(k, "Within a RecordType's `schema`", "ru", "Внутри `schema` RecordType (§s-6eb92ddch7shuvu)", "Внутри `schema` RecordType (§s-7vm323mhry2enx3, §s-6eb92ddch7shuvu)");
  {
    const x = parts(k)[at(k, "Within a RecordType's `schema`")];
    x.change += " Добавлена ссылка по правилу 7.2.7 там, где узел впервые называет RecordType (правило 12.1).";
  }
  swapPart(k, "| Field's schema |", "en", "what the field at the end of its chain of identifiers gives", "what the field at the end of the field's chain of identifiers gives");
  swapPart(k, "| Field's schema |", "ru", "то, что даёт поле в конце его цепочки идентификаторов", "то, что даёт поле в конце цепочки идентификаторов этого поля");
  swapPart(k, "A field's schema falls under", "en", "a value in angle brackets means any value", "a value in angle brackets stands for any value");
  swapPart(k, "A field with `identifierOf`", "en", "gives what `{}` gives.", "gives the same type as `{}`.");
  swapPart(k, "A field with `identifierOf`", "ru", "даёт то же, что `{}`.", "даёт тот же тип, что `{}`.");
  rep(k, "In Python, `Literal` holds only",
    P("In Python, `Literal` holds only a string, a whole number, `true`, `false` or `null`, so a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`. In `Literal`, `true`, `false` and `null` are written `True`, `False` and `None`.",
      "На Python `Literal` содержит только строку, целое число, `true`, `false` или `null`, поэтому `const` с любым другим значением или `enum`, который содержит любое другое значение, даёт тот же тип, что `{}`. В `Literal` значения `true`, `false` и `null` пишутся как `True`, `False` и `None`.",
      "Новое: так новые строки таблицы дают тип и там, где Python может выразить его только отчасти: `Literal` не принимает дробного числа, списка или объекта (PEP 586)."),
    P("An `allOf` gives a `TypedDict` of its own in Python only where each of its members gives a `TypedDict` in Python, and otherwise gives the same type as `{}`. That `TypedDict` holds the fields of the members, in the order of the members. A field that several members declare has the type that the last of them gives, as a field that a RecordType takes through `refines` does (§s-suv42g8r3ra2h6b). Such a field is required where the `required` of any of these members lists it.",
      "`allOf` даёт на Python собственный `TypedDict`, только если каждый его элемент даёт на Python `TypedDict`, а иначе даёт тот же тип, что `{}`. Этот `TypedDict` содержит поля элементов, в порядке элементов. У поля, которое объявляют несколько элементов, тот тип, который даёт последний из них, — так же, как у поля, которое RecordType берёт через `refines` (§s-suv42g8r3ra2h6b). Такое поле обязательно, если его перечисляет `required` хотя бы одного из этих элементов.",
      "Новое: на Python нет пересечения типов, поэтому `allOf` даёт `TypedDict` с полями всех элементов. Поле, которое объявляют несколько элементов, обязательно так же, как гарантированное поле, которое объявляют несколько RecordType."));
  rep(k, "In Python, each object written inline",
    P("In Python, each object written inline and each `allOf` that gives a `TypedDict` is written as a `TypedDict` of its own. Such a `TypedDict` is written only if a type uses it. It is written once, after every type that `sheriff types` writes for the RecordType whose `schema` holds it. It has the SpecTag (§s-5z5gnu7pahr82xp) of that RecordType. Its name begins with the name of that RecordType's type. One part follows for each step from that `schema` down to it, each with its first letter changed to uppercase:",
      "На Python каждый объект, записанный на месте, и каждый `allOf`, который даёт `TypedDict`, пишется как отдельный `TypedDict`. Такой `TypedDict` пишется, только если им пользуется какой-либо тип. Он пишется один раз — после всех типов, которые `sheriff types` пишет для того RecordType, `schema` которого его содержит. У него SpecTag (§s-5z5gnu7pahr82xp) этого RecordType. Его имя начинается с имени типа этого RecordType. За ним идёт по одной части на каждый шаг от этой `schema` вниз до него, каждая с первой буквой, сделанной заглавной:",
      "Новое: Python не может записать объектный тип на месте, поэтому такой тип получает собственное имя, построенное по пути к нему, как прежде тип объекта поля типа `variant`. Поля RecordType входят и в типы его вариантов и уточняющих RecordType, поэтому такой `TypedDict` пишется один раз, после всех типов этого RecordType. Элемент `allOf`, поля которого содержит общий `TypedDict`, отдельного `TypedDict` не получает: им не пользуется ни один тип."));
  refsAdd(k, R("cites", "s-7vm323mhry2enx3"), R("cites", "s-5z5gnu7pahr82xp"));
  set(k, { reason: swap(entries[k].proposal.reason, "JSON Schema is the standard for which every language has a validator.", "JSON Schema is a standard with a validator in every language.", `${k}, the reason`) });
  swapField(k, "stage3", "give const its literal,", "give const its literal, and in Python a const or an enum whose value Literal cannot hold the type of {}, with True, False and None for true, false and null;");
  swapField(k, "stage3", "a merged TypedDict in Python where every member gives an object type,",
    "a merged TypedDict in Python where every member gives a TypedDict, a field that several members declare being required where any of their required lists it,");
  swapField(k, "stage3", "a TypedDict of its own in Python, named and placed as the node says, with the RecordType's SpecTag;",
    "a TypedDict of its own in Python, written only where a type uses it, once after every type written for its RecordType, with the RecordType's SpecTag and a name that begins with the name of the RecordType's type (types.ts today names it after the type that uses it and writes it after that type);");
}

// ---------------------------------------------------------------------------------------------------------------
// The proposals: an example copied unchanged from the base is marked as agreed (review g7b-c, finding 6), and a
// title that item 55 changed is given as it now reads.
// ---------------------------------------------------------------------------------------------------------------
for (const k of GROUP.filter((x) => x.startsWith("proposal:"))) {
  const e = entries[k];
  const base = drafts[e.base].proposal;
  (e.proposal.examples || []).forEach((x, i) => {
    const b = (base.examples || [])[i];
    if (b && b.en === x.en && b.ru === x.ru && x.change !== AS_AGREED) {
      x.change = AS_AGREED;
      changed.add(k);
    }
  });
}
swapField("proposal:s-gb8s9657a65hqmv-g7", "change", "(узел «A RecordType its variants refine»)", "(узел «A RecordType that its variants refine»)");

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const sidOf = (baseKey) => drafts[baseKey].sidValue ?? (/^s-[2-9a-hjkmnp-z]{15}$/.test(baseKey) ? baseKey : undefined);
const problems = [];
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const e of Object.values(entries)) if (e.sidValue) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (sidOf(e.base) !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  const all = texts.join("\n");
  for (const sid of Object.values(SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
}
const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  let citedByDecisions;
  if (key.startsWith("proposal:")) {
    const bp = drafts[e.base].proposal;
    const baseEn = [bp.title, render(bp.parts, "en"), bp.reason, ...(bp.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
    const baseCited = new Set(citedIn(baseEn));
    citedByDecisions = new Set(bp.refs.filter((r) => r.type === "cites" && !baseCited.has(r.to)).map((r) => r.to));
  } else {
    citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])));
  }
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s)) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const x of p.parts) if (x.change !== AS_AGREED && ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (!key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  if (changed.has(key)) {
    const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
    for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
      const words = sentence.split(/\s+/).filter(Boolean).length;
      if (words > 30) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
    }
  }
  // "In every other respect" (item 55) and "stands for any value" (item 56) are the readers' words, which the main
  // session chose.
  const bad = [/closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /\beach other\b/, /\bentry of the bindings file\b/];
  if (key !== "proposal:s-gb8s9657a65hqmv-g7") bad.push(/\bdeclaredIn\b/);
  const allowed = (s) => s.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/Appendix of the tools/g, "AOT")
    .replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/In every other respect/g, "IEOR").replace(/stands for any value/g, "SFAV");
  // The agreed sentences of a proposal's base are checked when the owner agreed to them.
  const own = key.startsWith("proposal:") ? p.parts.filter((x) => x.change !== AS_AGREED).map((x) => x.en).join("\n") : en;
  for (const b of bad) if (b.test(allowed(own))) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  // On the map, the outline is «план» throughout; «структура» renders only the reason's "structure".
  if (key === "s-rpv4fkdqqguptqd" && /структур/.test(ruAll.replace(/показывает структуру, которой у узлов уже нет/, ""))) problems.push(`${key}: the Russian calls the outline «структура»`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + JSON.stringify((p.examples || []).map((x) => x.change ?? "")) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  // The node on the review of a commit names its own subject, the reviewer of a commit, and the list of commands cites
  // the independent reviewer.
  const history = /[Рр]аунд|рецензент|review-g|\bround\b|групп[аыеу] [1-7]/;
  if (history.test(changes.replace(/независим\S* рецензент\S*/g, "").replace(key === "proposal:s-vp24dqydygztqbt-g7" ? /рецензент\S*/g : /^$/, ""))) problems.push(`${key}: a change field tells the history of the rounds or names a group`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const md = [
  "# T25, group 7, round c: the English of every node that round c changes",
  "",
  "This file holds the final English of every node and proposal of group 7 that round c changes or adds, as `tools-drafts.json` holds it after fix-group7-c.mjs, each in full: the drafts of items 51 to 56 of the appendix of the tools, the new node “The validator of the RuntimeChecks” moved out of item 53, and the proposals to change agreed drafts.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group7-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  if (!changed.has(key)) continue;
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("new:")) md.push(`A new node, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed draft \`${e.base}\`${e.sidValue ? `, the node ${e.sidValue}` : ""}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
  for (const t of p.todos || []) md.push(`**Todo (${t.date}):** ${t.text}`, "");
}
fs.writeFileSync(new URL("english-group7c.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts; changed in round c: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 30 words, to look at:\n${longSentences.join("\n")}`);
