// T25, stage 2, group 6: drafts the new wordings of the nodes of items 48 to 50 of the order in stage2-inventory.md:
// how an approval is recorded (tools 11), split into a section and four nodes (the record, the fingerprint, approving
// a node, withdrawing an approval); the nodes that the appendix needs for the settings that only an owner of the
// specification changes (their entries, approving the specification, turning the `strict` flag on, withdrawing the
// choice of an extension); and setting a repository up and taking SpecSheriff out of it (tools 3).
// Copies tools-drafts.json to tools-drafts.before-group6.json first, checks every draft (citations against links, the
// Russian citing the same sids, no citation by location outside backticks, link targets existing, the new sids
// unique, no key outside the group changed), and only then writes. It also writes english-group6.md, the English of
// every node of the group, for EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of
// this group from the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group6.json", here);
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
const X = (en, ru) => ({ en, ru });
const NEW = "Новое.";

// The sids of the new nodes of the group.
const SID = {
  section: "s-e75g25ajrm2kqj5",
  fingerprint: "s-f5brvuuu6xmkj6t",
  approve: "s-upkur92ry6332y5",
  withdraw: "s-xybjqp2rxh8gszf",
  entries: "s-d3nkw9b6mn98vuw",
  approveSpec: "s-m59dqwkw2e96wne",
  strict: "s-nxgkp988mej79eg",
  extensionOff: "s-n4ny597qdv9c9bu",
};

const entries = {};
// The sids that the decisions moved into a new node in stage 3 cite, which its links must keep.
const movedDecisionsCite = {};
const add = (key, e, cite = []) => {
  entries[key] = e;
  movedDecisionsCite[key] = cite;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 48: "How an approval is recorded" (s-v4qus7raqnwzneb), tools 11, split under rule 7.3.3 into a section and
// four nodes.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-11-section", {
  location: "tools 11 (new section, in place of the node “How an approval is recorded”)",
  kind: "section",
  sidValue: SID.section,
  order: ["s-v4qus7raqnwzneb", SID.fingerprint, SID.approve, SID.withdraw],
  proposal: {
    title: "The approvals of nodes",
    ruTitle: "Одобрения узлов",
    parts: [
      P("How the SpecSheriff tools record the approval of a node (§s-67vekyup7y8smap) and the withdrawal of that approval (§s-fpq35tf3pehgk64), and how they tell whether an approval is in force.",
        "Как инструменты SpecSheriff записывают одобрение узла (§s-67vekyup7y8smap) и отзыв этого одобрения (§s-fpq35tf3pehgk64) и как определяют, в силе ли одобрение.",
        "Новое: раздел на месте узла «How an approval is recorded», который разделён по правилу 7.3.3, как прежде узлы «The commands» и «Who runs the reviewer». Название взято из строки таблицы «Where the files are», которая называет файл одобрений «The approvals of nodes»."),
    ],
    refs: [R("cites", "s-67vekyup7y8smap"), R("cites", "s-fpq35tf3pehgk64")],
    removed: [],
    date: DATE,
  },
});

add("s-v4qus7raqnwzneb", {
  location: "tools 11.1",
  sidValue: "s-v4qus7raqnwzneb",
  testsFrom: [
    "appends one line per node, naming its sid, its fingerprint and, as by, who approves it, and sets it approved",
    "keeps the approvals one JSON object to a line, appended",
    "reads the confirmations an earlier release wrote, each owner as by, where the approvals stand in no file of their own yet",
  ],
  proposal: {
    title: "How an approval is recorded",
    ruTitle: "Как записывается одобрение",
    parts: [
      P("`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records each approval (§s-67vekyup7y8smap) of a wording of a node (§s-5ah25f6gy99panq), and each withdrawal of such an approval (§s-fpq35tf3pehgk64), in a line of its own. Each line is appended to the end of the file (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Each line is the text that `JSON.stringify` writes, with no whitespace, for an object that holds only the following keys, in this order:",
        "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) записывает каждое одобрение (§s-67vekyup7y8smap) формулировки узла (§s-5ah25f6gy99panq) и каждый отзыв такого одобрения (§s-fpq35tf3pehgk64) отдельной строкой. Каждая строка добавляется в конец файла (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Каждая строка — это текст, который `JSON.stringify` пишет без пробелов для объекта, где есть только следующие ключи, в этом порядке:",
        "Было: «`sheriff approve <sid>...` appends to `specs/_approvals.jsonl` one line per node. The line holds the node's sid, the fingerprint of its wording and, as `by`, the email git is configured with.» Теперь узел описывает саму запись, а что делают `sheriff approve` и отзыв одобрения, говорят новые узлы этого раздела. Вид строки задан точно, вместе с порядком ключей, как её пишет код (approvals.ts). Путь к файлу дан ссылкой на «Where the files are», где теперь собраны все пути."),
      L("`sid`, the sid of the node;",
        "`sid` — sid узла;",
        "Без изменений по смыслу."),
      L("`fingerprint`, the fingerprint of the wording that the line approves, or whose approval the line withdraws (§s-f5brvuuu6xmkj6t);",
        "`fingerprint` — отпечаток формулировки, которую строка одобряет или одобрение которой строка отзывает (§s-f5brvuuu6xmkj6t);",
        "Без изменений по смыслу. Как вычисляется отпечаток, теперь говорит отдельный узел этого раздела."),
      L("`withdrawn`, whose value is `true`, only in a line that withdraws an approval;",
        "`withdrawn` со значением `true` — только в строке, которая отзывает одобрение;",
        "Было: «The line holds the node's sid, that wording's fingerprint, `withdrawn: true` and, as `by`, the email git is configured with.» Без изменений по смыслу."),
      L("`by`, the email address that git's configuration sets for whoever approves or withdraws.",
        "`by` — адрес электронной почты того, кто одобряет или отзывает, заданный в конфигурации git.",
        "Было: «as `by`, the email git is configured with» и «An owner is named by an email.» Без изменений по смыслу."),
      P("A line names whoever approves or withdraws only by that email address. So an approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) has the same form as the owner's own approval.",
        "Строка называет того, кто одобряет или отзывает, только этим адресом. Поэтому одобрение, которое агент делает от имени ответственного (§s-t5uw8zfxzhfdg86), имеет тот же вид, что и одобрение самого ответственного.",
        "Новое: по правилу 1.3.6 агент в некоторых случаях одобряет узел от имени ответственного (ваше решение от 2026-11-19). Согласованный узел «The judgement on a node of the technical appendix that a commit approves» опирается на то, что такое одобрение выглядит так же, как одобрение самого ответственного, и ссылается за этим на этот узел."),
      P("A line that holds no `withdrawn` is an approval. An approval of a wording of a node is in force where the latest line for the node's sid and that wording's fingerprint is an approval. The latest line is the last one in the file.",
        "Строка без `withdrawn` — это одобрение. Одобрение формулировки узла в силе, если самая поздняя строка для sid узла и отпечатка этой формулировки — одобрение. Самая поздняя строка — последняя в файле.",
        "Было: «An approval stands for a wording of a node where the latest line for that node and that wording's fingerprint is an approval. The latest line is the one standing last in `specs/_approvals.jsonl`.» Без изменений по смыслу; «stands» заменено на «is in force», как в согласованных строке 10.1.8 и узле «An approved node with no approval in force»."),
      P("A node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws it.",
        "Последнее одобрение узла — последняя строка для sid узла, которая является одобрением, независимо от того, отзывает ли его более поздняя строка.",
        "Новое: определение последнего одобрения узла, на которое опираются согласованные узлы «What `sheriff types` generates» и «An approved rule whose tests or code lag behind it»."),
    ],
    reason: "An approval is recorded apart from its node, so that nobody can make a node approved by editing the node. Lines are only ever appended to the file, so that every approval stays on record with whoever gave it.",
    ruReason: "Одобрение записывается отдельно от узла, чтобы никто не мог сделать узел одобренным, правя сам узел. Строки в файл только добавляются, чтобы каждое одобрение оставалось в записи вместе с тем, кто его дал.",
    reasonChange: "Было: шесть абзацев обоснования, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем узел нужен в целом (правило 7.4.2). Сказанное о слиянии по union осталось в узле «Setting a repository up and taking SpecSheriff out of it», о `SHA-256` и о том, что входит в отпечаток, — в узле об отпечатке, об отзыве — в узле об отзыве одобрения.",
    examples: [
      X("Rule R was approved with the wording whose fingerprint is F1, then reworded and approved with the fingerprint F2. Someone then withdrew R's approval, which appended a withdrawal for F1 and then one for F2. No approval of R's wording is in force, so R is a draft, and R's last approval is the line that approved F2. The most likely mistake is to treat R as approved because a line in the file approves its current wording, although a later line withdraws that approval.",
        "Правило R одобрили с формулировкой, отпечаток которой F1, затем переформулировали и одобрили с отпечатком F2. Потом кто-то отозвал одобрение R, что добавило строку отзыва для F1, а за ней — для F2. Ни одно одобрение формулировки R не в силе, поэтому R — черновик, а последнее одобрение R — строка, одобрившая F2. Самая вероятная ошибка — считать R одобренным, потому что в файле есть строка, одобряющая его нынешнюю формулировку, хотя более поздняя строка отзывает это одобрение."),
    ],
    refs: [
      R("implements", "s-67vekyup7y8smap"),
      R("implements", "s-9g7jj8z4yf9kq93"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-5ah25f6gy99panq"),
      R("cites", "s-fpq35tf3pehgk64"),
      R("cites", SID.approve),
      R("cites", SID.withdraw),
      R("cites", SID.fingerprint),
      R("cites", "s-t5uw8zfxzhfdg86"),
      R("cites", "s-7unxytshhc4md54"),
    ],
    removed: [
      "The paragraphs on `sheriff approve` and on `sheriff approve --withdraw`: they moved to “Approving a node” (s-upkur92ry6332y5) and “Withdrawing the approval of a node” (s-xybjqp2rxh8gszf), split under rule 7.3.3.",
      "The paragraphs on the fingerprint and the earlier forms that it keeps: they moved to “The fingerprint of a node's wording” (s-f5brvuuu6xmkj6t).",
      "The refusal to approve, or to withdraw the approval of, the rule that approves the specification: the owner replaced that rule with entries in `sheriff.config.json` on 2026-11-13 (rule 10.6), described in “The entries of the settings that only an owner changes” (s-d3nkw9b6mn98vuw).",
      "The `implements` link to “The specification's approval status” (s-qzthyh7yqvfhsa2): no rule approves the specification any more.",
      "The `implements` link to “What an approval covers” (s-5ah25f6gy99panq), which becomes a `cites` link: “The fingerprint of a node's wording” implements that rule.",
      "The `cites` links to “How a section's approval status is determined” (s-9kfdycuq34beqvs) and “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): they went with the paragraphs of the reason that cited them.",
      "The name NodeKind (question X4).",
    ],
    date: DATE,
  },
  stage3: "approvals.ts keeps the record as the node says: parseApprovals, latest and stands (stands to be named for an approval in force). A function for a node's last approval, the last line for its sid without withdrawn, is to be added, and types.ts and message.ts are to use it. The tests at approve.test.ts:30, :131 and :141 keep this sid; the other tests of approve.test.ts and the e2e test at commands.test.ts:67 move to s-upkur92ry6332y5 and s-xybjqp2rxh8gszf, and the tests of the fingerprint in model.test.ts and the test at reindex.test.ts:205 move to s-f5brvuuu6xmkj6t. Of the node's decisions, the one of 2026-11-05 (the reason under its earlier key) and the one of 2026-11-06 on the empty list of a field whose values the domains add move to s-f5brvuuu6xmkj6t; the one of 2026-10-31 and the one of 2026-11-06 on withdrawing the approval of each wording move to s-xybjqp2rxh8gszf; the others stay. A test for a node's last approval is written first.",
});

add("new:tools-11-fingerprint", {
  location: "tools 11.2 (new)",
  from: "s-v4qus7raqnwzneb",
  sidValue: SID.fingerprint,
  testsFrom: [
    "fingerprints a node's wording and the values its kind adds, not its owners or what the reindex builds",
    "keeps the reason under its earlier name in the fingerprint, so an approval given before the rename stands",
    "leaves the values gathered beside a field out of the fingerprint",
    "fingerprints a field taking the values the domains add as earlier releases wrote it, so an approval given before the reindex rewrote it stands",
    "keeps an approval through the renaming of the kind a field's values come from",
  ],
  proposal: {
    title: "The fingerprint of a node's wording",
    ruTitle: "Отпечаток формулировки узла",
    parts: [
      P("The fingerprint of a node's wording (§s-5ah25f6gy99panq) is the SHA-256 hash of the UTF-8 bytes of one string, written as 64 lowercase hexadecimal digits. That string is the text that `JSON.stringify` writes, with no whitespace, for an object built from the node. In that text, the keys of each object are sorted by their UTF-16 code units, and each list keeps its order.",
        "Отпечаток формулировки узла (§s-5ah25f6gy99panq) — это хеш SHA-256 от байтов UTF-8 одной строки, записанный 64 шестнадцатеричными цифрами в нижнем регистре. Эта строка — текст, который `JSON.stringify` пишет без пробелов для объекта, построенного из узла. В этом тексте ключи каждого объекта упорядочены по их кодовым единицам UTF-16, а каждый список сохраняет свой порядок.",
        "Было: «The fingerprint is a SHA-256 hash of one canonical string. … In the string: the keys of an object are sorted; a list keeps its own order.» Без изменений по смыслу; теперь сказано точно, как строится строка и как записывается хеш, как это делает код (model.ts)."),
      P("The object holds every property of the node except the following:",
        "Объект содержит каждое свойство узла, кроме следующих:",
        "Было: «The string holds the node's title, text and reason and the values its NodeKind adds beside them. It holds neither the owners a node names nor what the reindex builds.» Теперь перечислено то, что в строку не входит, по правилу 7.2.6: свойство, которое по ошибке выпало бы из строки, осталось бы незамеченным, потому что его изменение не делало бы узел черновиком. Так в строку входят и примеры узла, как требует правило 1.3.5 (ваше решение от 2026-11-14). Имя NodeKind убрано (ваше решение от 2026-11-10)."),
      L("its `location`, its `sid`, its `kind` and its `status`;",
        "его `location`, `sid`, `kind` и `status`;",
        "Новое в перечне: по правилу 1.3.5 эти свойства не входят в формулировку, и код их уже исключает (model.ts)."),
      L("its links and its `meta`;",
        "его связи и его `meta`;",
        "Новое в перечне: одобрение переживает изменение связей и метаданных узла (правило 1.3.5), и код их уже исключает."),
      L("the nodes under it;",
        "узлы под ним;",
        "Новое в перечне: так делает код."),
      L("the values gathered beside a field (§s-ju5vcanbjph7mgh), which `sheriff reindex` builds from other nodes (§s-ztseyetus7np6br);",
        "значения, собранные рядом с полем (§s-ju5vcanbjph7mgh), которые `sheriff reindex` строит из других узлов (§s-ztseyetus7np6br);",
        "Было: «It holds neither … nor what the reindex builds.» Без изменений по смыслу; названо, что именно строит `sheriff reindex` в узле, у которого есть отпечаток. Ответственных узел сам не содержит: их называют разделы, у которых отпечатка нет."),
      L("the `archived` field of a node of the archive (§s-f2b5zvc565s242f);",
        "поле `archived` узла архива (§s-f2b5zvc565s242f);",
        "Новое в перечне: так делает код, поэтому у узла архива тот же отпечаток, что и у удалённого узла, который он хранит."),
      L("in a `TableRule` (§s-5fewsp22mmdz7y6), each cell that holds a node, since that node has a fingerprint of its own.",
        "в `TableRule` (§s-5fewsp22mmdz7y6) — каждая ячейка, в которой находится узел, потому что у этого узла свой отпечаток.",
        "Новое: по правилу 8.6 ячейка содержит либо текст, который входит в формулировку `TableRule`, либо узел со своим одобрением."),
      P("For a node in a cell of a `TableRule`, the object also holds the key `cell`. Its value is an object that holds the following, which are part of the node's wording:",
        "Для узла в ячейке `TableRule` объект содержит ещё ключ `cell`. Его значение — объект со следующими ключами, которые входят в формулировку узла:",
        "Новое: по правилу 1.3.5 формулировка узла в ячейке включает текстовые ячейки его строки и заголовки его столбца и группы (ваше решение от 2026-11-14)."),
      L("`column`, the heading of the node's column;",
        "`column` — заголовок столбца узла;",
        "Новое, по правилу 1.3.5."),
      L("`group`, the heading of the node's group, which is `null` where the table's rows are not grouped;",
        "`group` — заголовок группы узла, равный `null`, если строки таблицы не сгруппированы;",
        "Новое, по правилу 1.3.5. Значение `null` — так схема записывает заголовок группы в таблице без групп."),
      L("`row`, an object that holds the text of each cell of the node's row that holds text, under the key of that cell's column.",
        "`row` — объект, который содержит текст каждой ячейки строки узла, в которой находится текст, под ключом столбца этой ячейки.",
        "Новое, по правилу 1.3.5."),
      P("The following names, which `sheriff reindex` changes in what an earlier release wrote (§s-gb8s9657a65hqmv), appear in the object as the earlier release wrote them:",
        "Следующие имена, которые `sheriff reindex` меняет в записанном прежним выпуском (§s-gb8s9657a65hqmv), входят в объект в том виде, в каком их записал прежний выпуск:",
        "Было: «In that string the reason stands under the key `rationale`, the name earlier releases gave it.» Теперь так же записаны все переименованные ключи и типы узлов, которые входят в объект: согласованный узел «What `sheriff reindex` changes in what an earlier release wrote» требует, чтобы переименованный ключ и переименованный тип узла оставляли отпечаток прежним. Остальные его переименования касаются свойств, которых в объекте нет, а другое изменение вида узла, например `fields` RecordType, ставшие его `schema`, делает узел черновиком."),
      L("the node's `reason`, under the key `rationale`;",
        "`reason` узла — под ключом `rationale`;",
        "Без изменений."),
      L("a `TextRule.list.jsonSchema` or a `TextRule.list.valueList` (§s-eferktypcj7njt5), in a list that holds only one of them, under the key `declaredIn`, with its `pointer` or its `symbol` under the key `declaration`;",
        "`TextRule.list.jsonSchema` или `TextRule.list.valueList` (§s-eferktypcj7njt5) в списке, где есть только одно из них, — под ключом `declaredIn`, а его `pointer` или `symbol` — под ключом `declaration`;",
        "Новое: `sheriff reindex` переименовывает `TextRule.list.declaredIn` в `jsonSchema` или `valueList` (ваше решение от 2026-11-13 по строке 10.1.35), а внутри — `declaration` в `pointer` или `symbol`. Список, где есть оба свойства, прежний выпуск записать не мог, поэтому он входит в объект как есть."),
      L("the name of a kind of node whose nodes' sids are a field's values: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`.",
        "имя типа узлов, sid узлов которого служат значениями поля: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.",
        "Без изменений по смыслу: так код уже сохраняет одобрения при переименовании типов узлов (model.ts)."),
      P("For a field whose values come from the source `domains` (§s-gb8s9657a65hqmv), earlier releases wrote an empty list of its own values under the key `values`. Where such a field has no list of its own values, it appears in the object with that empty list.",
        "Для поля, значения которого берутся из источника `domains` (§s-gb8s9657a65hqmv), прежние выпуски записывали пустой собственный список значений под ключом `values`. Если у такого поля нет собственного списка значений, оно входит в объект с этим пустым списком.",
        "Было: «Earlier releases gave a field of type `one of` an empty list of its own values where the domains add its values. In that string such a field stands in that form.» Без изменений по смыслу (ваше решение от 2026-11-06). Поле названо так, как его называет согласованный узел о записанном прежним выпуском: такой RecordType `sheriff reindex` оставляет без изменений, поэтому его одобрение должно остаться в силе."),
    ],
    reason: "An approval records a wording by its fingerprint, so that a change to that wording, and to nothing else, leaves the node without an approval in force (§s-5ah25f6gy99panq). A string built the same way everywhere gives every machine and every release the same fingerprint for the same wording.",
    ruReason: "Одобрение записывает формулировку её отпечатком, чтобы изменение этой формулировки, и только оно, оставляло узел без одобрения в силе (§s-5ah25f6gy99panq). Строка, которая везде строится одинаково, даёт один и тот же отпечаток одной и той же формулировки на каждой машине и в каждом выпуске.",
    reasonChange: "Было: «SHA-256 is a hash every language provides. … The owners a node names say who reads its wording, not what the wording is. What the reindex builds is no one's wording. A fingerprint changes with the name and value of every key in its string. A release writing the wording in another form would otherwise make a draft every node approved before it, though no wording changed.» Теперь обоснование говорит, зачем нужен отпечаток в целом (правило 7.4.2); почему исключено каждое свойство, следует из правила 1.3.5.",
    examples: [
      X("A rule is approved, and an edit adds an example to it. The rule's fingerprint changes, so no approval of its new wording is in force, and `sheriff reindex` makes the rule a draft. A later edit adds a link to the rule and moves it to another section, and its fingerprint stays the same. The most likely mistake is to leave the examples out of the object, so that the rule stays approved with an example that no owner has read.",
        "Правило одобрено, и правка добавляет в него пример. Отпечаток правила меняется, поэтому одобрение его новой формулировки не в силе, и `sheriff reindex` делает правило черновиком. Более поздняя правка добавляет правилу связь и переносит его в другой раздел, и его отпечаток остаётся прежним. Самая вероятная ошибка — не включать примеры в объект: тогда правило остаётся одобренным с примером, которого не читал ни один ответственный."),
      X("Each row of a `TableRule` holds a rule and the text of what a failure of that rule costs. The cost in one row changes from `refused` to `reported`. The fingerprint of the rule in that row changes, since the text cells of its row are part of its wording, and the fingerprint of the `TableRule` changes too. The most likely mistake is to build the object of the rule from its own properties alone, so that the rule stays approved with a cost that no owner has approved.",
        "Каждая строка `TableRule` содержит правило и текст о том, чего стоит нарушение этого правила. Стоимость в одной строке меняется с `refused` на `reported`. Отпечаток правила в этой строке меняется, потому что текстовые ячейки его строки входят в его формулировку, и отпечаток `TableRule` тоже меняется. Самая вероятная ошибка — строить объект правила только из его собственных свойств: тогда правило остаётся одобренным со стоимостью, которую не одобрял ни один ответственный."),
    ],
    refs: [
      R("implements", "s-5ah25f6gy99panq"),
      R("implements", "s-5fewsp22mmdz7y6"),
      R("cites", "s-ju5vcanbjph7mgh"),
      R("cites", "s-ztseyetus7np6br"),
      R("cites", "s-f2b5zvc565s242f"),
      R("cites", "s-gb8s9657a65hqmv"),
      R("cites", "s-eferktypcj7njt5"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "model.ts fingerprint keeps its SHA-256 of JSON.stringify of the sorted object. NOT_WORDING is to leave out location, sid, kind, status, refs, meta, children and archived; owner, owners and sections may stay, since no node that holds them has a fingerprint. Only the values gathered beside a field (x-enumSource.gathered, and the gathered of an earlier release) are to be left out, not every key named gathered. A TableRule is to lose each cell that holds a node, and a node in a cell is to gain cell, with column, group and row. A TextRule.list that holds only one of jsonSchema and valueList is to have it under declaredIn, with pointer or symbol under declaration. EARLIER_KINDS is also to apply to x-enumSource.kind. Tests for the examples, a TableRule, a node in a cell and the renamed keys of a list are written first; the tests of model.test.ts and reindex.test.ts:205 named in testsFrom carry this sid.",
}, ["s-5ah25f6gy99panq"]);

add("new:tools-11-approve", {
  location: "tools 11.3 (new)",
  from: "s-v4qus7raqnwzneb",
  sidValue: SID.approve,
  testsFrom: [
    "sheriff approve approves as the email git is configured with, and refuses where that is none of the node's owners",
    "refuses a node of the SpecSheriff guidelines outside the repository they are written in, approving or withdrawing, and writes nothing",
    "appends nothing where the latest line for the node and that wording is already an approval, and only sets the status",
    "refuses a section and a domain's header, whose status is built, approving or withdrawing",
    "refuses a sid no node holds, and a node no owner is named for",
  ],
  proposal: {
    title: "Approving a node",
    ruTitle: "Одобрение узла",
    parts: [
      P("`sheriff approve <sid>...` approves each node that it names (§s-67vekyup7y8smap). For each such node, it appends to `specs/_approvals.jsonl` an approval of the node's current wording (§s-v4qus7raqnwzneb), which names whoever runs the command.",
        "`sheriff approve <sid>...` одобряет каждый узел, который он называет (§s-67vekyup7y8smap). Для каждого такого узла он добавляет в `specs/_approvals.jsonl` одобрение нынешней формулировки узла (§s-v4qus7raqnwzneb), которое называет того, кто запустил команду.",
        "Было: «`sheriff approve <sid>...` appends to `specs/_approvals.jsonl` one line per node.» Без изменений по смыслу; что содержит строка, говорит узел «How an approval is recorded»."),
      P("`sheriff approve` then sets the node's status to `approved`. Where an approval of the node's current wording is already in force, it appends nothing and only sets the status.",
        "Затем `sheriff approve` ставит узлу статус `approved`. Если одобрение нынешней формулировки узла уже в силе, он ничего не добавляет и только ставит статус.",
        "Было: «It sets the node's status to `approved`. Where the latest line for the node and that fingerprint is already an approval, it appends nothing and only sets the status.» Без изменений по смыслу."),
      P("Where a node that `sheriff approve` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command also approves each node in the table's cells for which no approval of its current wording is in force. It appends these approvals after that of the `TableRule`, in the order of the table's rows.",
        "Если узел, который называет `sheriff approve`, — `TableRule` (§s-5fewsp22mmdz7y6), команда одобряет и каждый узел в ячейках таблицы, для нынешней формулировки которого нет одобрения в силе. Эти одобрения она добавляет после одобрения `TableRule`, в порядке строк таблицы.",
        "Новое: по правилу 1.3.4 ответственный за `TableRule` может одобрить всю таблицу сразу; это одобряет каждый узел-черновик в её ячейках, и каждое такое одобрение называет этого ответственного (ваше решение от 2026-11-14)."),
      P("`sheriff approve` refuses each of the following:",
        "`sheriff approve` отвергает каждое из следующего:",
        "Было: «It refuses:». Без изменений."),
      L("a sid that names no node in the files that the repository keeps;",
        "sid, который не называет ни одного узла в файлах, которые хранит репозиторий;",
        "Было: «a node of the SpecSheriff guidelines the project takes». Теперь отказ касается и узла выбранного расширения: по правилу 2.5 проект использует расширения в том виде, в каком их содержит плагин, и они одобрены там, где пишутся (ваше решение от 2026-11-18). Новое в тексте: отказ для sid, который не называет ни одного узла, — так делает код (approvals.ts)."),
      L("a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br);",
        "раздел, а также заголовок домена, если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu): их статус одобрения `sheriff reindex` выводит из других узлов (§s-ztseyetus7np6br);",
        "Было: «a section and a domain's header». Без изменений по смыслу; заголовок домена есть, только если проект выбрал расширение Domains."),
      L("a node none of whose owners (§s-6sk8uet75dmq5qz) is whoever runs the command.",
        "узел, ни один из ответственных за который (§s-6sk8uet75dmq5qz) не является тем, кто запустил команду.",
        "Было: «a node none of whose owners is the one approving, naming its owners». Без изменений по смыслу. Убран пункт «the rule that approves the specification, unless the one approving is one of the specification's owners»: правило, одобряющее спецификацию, вы заменили записями в `sheriff.config.json` (правило 10.6, ваше решение от 2026-11-13)."),
      P("In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin rather than from the files that the repository keeps (§s-bsya3febm6u64ab).",
        "В проекте, который не является самим SpecSheriff, узлы SpecSheriff guidelines и выбранного расширения (§s-9ttvcwpqkehm58g) приходят с плагином, а не из файлов, которые хранит репозиторий (§s-bsya3febm6u64ab).",
        "Новое в тексте: так первый отказ охватывает узлы SpecSheriff guidelines и выбранных расширений, которые одобрены там, где пишутся (правило 2.5)."),
      P("Each refusal names the sid concerned. The refusal of a node whose owners do not include whoever runs the command also names those owners.",
        "Каждый отказ называет соответствующий sid. Отказ для узла, среди ответственных за который нет того, кто запустил команду, называет и этих ответственных.",
        "Было: «…, naming its owners». Без изменений по смыслу."),
      P("Where `sheriff approve` refuses any node that the run names, it records nothing. Where git's configuration sets no email address, `sheriff approve` refuses to run.",
        "Если `sheriff approve` отвергает хотя бы один узел, который называет запуск, он ничего не записывает. Если конфигурация git не задаёт адрес электронной почты, `sheriff approve` отказывается работать.",
        "Новое в тексте: запуск записывает всё или ничего, а без адреса в git команда не работает, — так делает код (approvals.ts, cli.ts)."),
      P("After it records the approvals, `sheriff approve` runs `sheriff reindex` (§s-ztseyetus7np6br), which derives the approval status of each section anew.",
        "Записав одобрения, `sheriff approve` запускает `sheriff reindex` (§s-ztseyetus7np6br), который заново выводит статус одобрения каждого раздела.",
        "Новое в тексте: так делает код (cli.ts). Иначе статус раздела расходился бы с узлами под ним, и проверка строки 10.1.10 отвергла бы следующий коммит."),
    ],
    reason: "Recording every approval through one command lets the SpecSheriff tools check, before an approval is recorded, that whoever gives it is an owner of the node (§s-67vekyup7y8smap).",
    ruReason: "Когда каждое одобрение записывается одной командой, инструменты SpecSheriff могут ещё до записи проверить, что тот, кто его даёт, — ответственный за узел (§s-67vekyup7y8smap).",
    reasonChange: "Было: «A section's and a header's status is built (§s-9kfdycuq34beqvs), so nobody approves them. No edit of the approvals passes the guard (§s-83ev4wwesbwnhnp), so a line once appended can be taken out only through git. The commands therefore refuse what no line may record.» Теперь обоснование говорит, зачем нужна команда в целом (правило 7.4.2).",
    examples: [
      X("A rule of a project's base specification is a `TableRule`, each row of which holds one state of a request as a node. An owner adds two rows, whose nodes are drafts, and runs `sheriff approve` with the table's sid. `sheriff approve` appends an approval of the table's new wording and one approval for the node in each new row. The most likely mistake is to approve only the table, so that the nodes of the new rows stay drafts.",
        "Правило базовой спецификации проекта — `TableRule`, каждая строка которой содержит одно состояние заявки как узел. Ответственный добавляет две строки, узлы которых — черновики, и запускает `sheriff approve` с sid таблицы. `sheriff approve` добавляет одобрение новой формулировки таблицы и по одному одобрению для узла в каждой новой строке. Самая вероятная ошибка — одобрить только таблицу: тогда узлы новых строк остаются черновиками."),
    ],
    refs: [
      R("implements", "s-67vekyup7y8smap"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", "s-bsya3febm6u64ab"),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yccuyqbypzzx2gu"),
      R("cites", "s-ztseyetus7np6br"),
      R("cites", "s-6sk8uet75dmq5qz"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "approvals.ts approve: the branch on APPROVAL_RULE goes, and so does model.ts APPROVAL_RULE where nothing else reads it. The refusal of a node of the SpecSheriff guidelines becomes the refusal of a sid that no node of the files that the repository keeps holds, saying for a node of the guidelines or of a chosen extension that such a node is approved only where it is written. Approving a TableRule also appends an approval for each node in its cells that has no approval of its current wording in force, in the order of the rows. Tests for the TableRule and for a node of a chosen extension are written first and carry this sid, with the tests named in testsFrom.",
});

add("new:tools-11-withdraw", {
  location: "tools 11.4 (new)",
  from: "s-v4qus7raqnwzneb",
  sidValue: SID.withdraw,
  testsFrom: [
    "lets anyone withdraw an approval by a line of its own naming them as by, makes the node a draft, and the latest line decides",
    "withdraws the approval of each wording of the node for which one stands, whether the node holds that wording or not, a line for each, and appends nothing where none stands",
  ],
  proposal: {
    title: "Withdrawing the approval of a node",
    ruTitle: "Отзыв одобрения узла",
    parts: [
      P("`sheriff approve --withdraw <sid>...` withdraws the approval of each node that it names (§s-fpq35tf3pehgk64). For each wording (§s-5ah25f6gy99panq) of such a node whose approval is in force, whether the node holds that wording or not, it appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb). Each such line names whoever runs the command.",
        "`sheriff approve --withdraw <sid>...` отзывает одобрение каждого узла, который он называет (§s-fpq35tf3pehgk64). Для каждой формулировки (§s-5ah25f6gy99panq) такого узла, одобрение которой в силе, — есть ли эта формулировка в узле или нет, — он добавляет в `specs/_approvals.jsonl` строку, которая отзывает это одобрение (§s-v4qus7raqnwzneb). Каждая такая строка называет того, кто запустил команду.",
        "Было: «`sheriff approve --withdraw <sid>...` withdraws the approval of each wording of the node for which one stands, whether the node holds that wording or not. For each such wording it appends a line.» Без изменений по смыслу (ваше решение от 2026-11-06)."),
      P("`sheriff approve --withdraw` then sets the node's status to `draft`. Where no approval of any wording of the node is in force, it appends nothing and only sets the status.",
        "Затем `sheriff approve --withdraw` ставит узлу статус `draft`. Если ни одно одобрение ни одной формулировки узла не в силе, он ничего не добавляет и только ставит статус.",
        "Было: «It makes the node a draft. Where no approval stands for any wording of the node, it appends nothing.» Без изменений по смыслу."),
      P("`sheriff approve --withdraw` records a withdrawal by whoever runs it, whether or not that person is an owner of the node. It refuses each of the following:",
        "`sheriff approve --withdraw` записывает отзыв того, кто его запустил, — ответственный этот человек за узел или нет. Он отвергает каждое из следующего:",
        "Было: «Anyone may withdraw an approval. `sheriff approve --withdraw` refuses:». Без изменений по смыслу (ваше решение от 2026-10-31)."),
      L("a sid that names no node in the files that the repository keeps;",
        "sid, который не называет ни одного узла в файлах, которые хранит репозиторий;",
        "Было: «a node of the SpecSheriff guidelines the project takes». По правилу 1.3.7 никто в проекте не отзывает и одобрение узла выбранного расширения (ваше решение от 2026-11-18). Новое в тексте: отказ для sid, который не называет ни одного узла, — так делает код (approvals.ts)."),
      L("a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br).",
        "раздел, а также заголовок домена, если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu): их статус одобрения `sheriff reindex` выводит из других узлов (§s-ztseyetus7np6br).",
        "Было: «a section and a domain's header». Без изменений по смыслу. Убран пункт о правиле, одобряющем спецификацию: его заменили записи в `sheriff.config.json` (правило 10.6), и по вашему решению от 2026-11-13 правило 1.3.7 больше не делает для него исключения."),
      P("In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin rather than from the files that the repository keeps (§s-bsya3febm6u64ab).",
        "В проекте, который не является самим SpecSheriff, узлы SpecSheriff guidelines и выбранного расширения (§s-9ttvcwpqkehm58g) приходят с плагином, а не из файлов, которые хранит репозиторий (§s-bsya3febm6u64ab).",
        "Новое в тексте: так первый отказ охватывает узлы SpecSheriff guidelines и выбранных расширений, одобрение которых по правилу 1.3.7 в проекте никто не отзывает."),
      P("Each refusal names the sid concerned. Where `sheriff approve --withdraw` refuses any node that the run names, it records nothing. After it records the withdrawals, it runs `sheriff reindex` (§s-ztseyetus7np6br).",
        "Каждый отказ называет соответствующий sid. Если `sheriff approve --withdraw` отвергает хотя бы один узел, который называет запуск, он ничего не записывает. Записав отзывы, он запускает `sheriff reindex` (§s-ztseyetus7np6br).",
        "Новое в тексте: так делает код (approvals.ts, cli.ts)."),
    ],
    reason: "A withdrawal takes back the approval of the node, not only that of the wording that the node holds now (§s-fpq35tf3pehgk64). An approval left in force for an earlier wording would let an edit that restores that wording make the node approved again without any owner approving it.",
    ruReason: "Отзыв забирает одобрение узла, а не только одобрение формулировки, которая в нём сейчас (§s-fpq35tf3pehgk64). Одобрение, оставленное в силе для прежней формулировки, позволило бы правке, которая возвращает эту формулировку, снова сделать узел одобренным, хотя ни один ответственный его не одобрял.",
    reasonChange: "Было: «A withdrawal takes back the node's approval, not that of one of its wordings (§s-5ah25f6gy99panq). An approval left standing for an earlier wording would let an edit restore that wording with the status `approved`. With the latest line deciding, a withdrawal cannot be undone by typing a status back.» Без изменений по смыслу. Последнее предложение убрано: оно объясняет запись одобрений, о которой говорит узел «How an approval is recorded». Ссылка теперь ведёт на правило 1.3.7, которое говорит об отзыве одобрения узла.",
    examples: [
      X("Rule R was approved, reworded and approved again, so an approval of each of its wordings is in force. A developer who is not an owner of R finds R wrong and runs `sheriff approve --withdraw` with R's sid. The command appends a withdrawal for each of those wordings, and R becomes a draft. The most likely mistake is to withdraw only the approval of R's current wording, so that an edit that restores R's earlier wording makes R approved again.",
        "Правило R одобрили, переформулировали и одобрили снова, поэтому в силе одобрение каждой из его формулировок. Разработчик, который не является ответственным за R, считает R ошибочным и запускает `sheriff approve --withdraw` с sid R. Команда добавляет отзыв для каждой из этих формулировок, и R становится черновиком. Самая вероятная ошибка — отозвать только одобрение нынешней формулировки R: тогда правка, которая возвращает прежнюю формулировку R, снова делает R одобренным."),
    ],
    refs: [
      R("implements", "s-fpq35tf3pehgk64"),
      R("cites", "s-5ah25f6gy99panq"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", "s-bsya3febm6u64ab"),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yccuyqbypzzx2gu"),
      R("cites", "s-ztseyetus7np6br"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "approvals.ts approve with withdraw: the branch on APPROVAL_RULE goes; the refusal of a node of the SpecSheriff guidelines also covers a node of a chosen extension, as for approving. The tests named in testsFrom carry this sid; a test for a node of a chosen extension is written first.",
}, ["s-5ah25f6gy99panq"]);

// ---------------------------------------------------------------------------------------------------------------
// Item 48, continued: the nodes that the appendix needs for the settings that only an owner of the specification
// changes (s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2), placed after the agreed node on `sheriff settings`.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-2-entries", {
  location: "tools 2.10a (new, after “The settings that only an owner of the specification changes”)",
  sidValue: SID.entries,
  testsFrom: ["match no test"],
  proposal: {
    title: "The entries of the settings that only an owner changes",
    ruTitle: "Записи настроек, которые меняет только ответственный",
    parts: [
      P("`sheriff.config.json` (§s-zefk589ykh37b8u) keeps the entries of each setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft) in a list of its own, under its own key:",
        "`sheriff.config.json` (§s-zefk589ykh37b8u) хранит записи каждой настройки, которую меняет только ответственный за спецификацию (§s-chsfpkgpmfk4fft), в отдельном списке под отдельным ключом:",
        "Новое: согласованные узлы «Project-wide settings» и «The settings that only an owner of the specification changes» говорят, что эти записи хранит `sheriff.config.json`, но ни один узел не задавал вид записей."),
      L("`approvalStatus`, for the specification's approval status (§s-qzthyh7yqvfhsa2): each entry holds `status`, whose value is `approved` or `draft`, and `by`;",
        "`approvalStatus` — для статуса одобрения спецификации (§s-qzthyh7yqvfhsa2): каждая запись содержит `status` со значением `approved` или `draft` и `by`;",
        NEW),
      L("`strict`, for the specification's `strict` flag (§s-q3pfzyaxvpr2zj2): each entry holds `on`, whose value is `true` or `false`, and `by`;",
        "`strict` — для флага `strict` спецификации (§s-q3pfzyaxvpr2zj2): каждая запись содержит `on` со значением `true` или `false` и `by`;",
        NEW),
      L("`extensions`, for the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g): each entry holds `name`, the name of an extension (§s-zefk589ykh37b8u), `chosen`, whose value is `true` or `false`, and `by`.",
        "`extensions` — для расширений guidelines, которые выбрал проект (§s-9ttvcwpqkehm58g): каждая запись содержит `name` — имя расширения (§s-zefk589ykh37b8u), `chosen` со значением `true` или `false` и `by`.",
        NEW),
      P("The value of an entry's `by` is the email address by which `sheriff settings` names the owner who made the change. An entry holds only the keys given above for its list.",
        "Значение `by` записи — адрес электронной почты, которым `sheriff settings` называет ответственного, сделавшего изменение. Запись содержит только ключи, названные выше для её списка.",
        "Новое: запись не содержит ничего, что зависит от времени её создания, например даты. Почему — сказано в обосновании."),
      P("`sheriff settings` appends each entry to the end of its list, and a commit keeps the entries of its parent first (§s-j9r8z4xdrfkfs47). So the last entry of a list is the latest.",
        "`sheriff settings` добавляет каждую запись в конец её списка, а коммит оставляет записи родительского коммита первыми (§s-j9r8z4xdrfkfs47). Поэтому последняя запись списка — самая поздняя.",
        "Новое: правила 10.6 и 10.7 и согласованный узел о `sheriff settings` говорят о самой поздней записи, но ни один узел не говорил, что это последняя запись в `sheriff.config.json`."),
      P("The specification's approval status and its `strict` flag have the values that the last entry of their lists sets. The project has chosen exactly those extensions for which the last entry of `extensions` that names the extension sets `chosen` to `true`.",
        "Статус одобрения спецификации и её флаг `strict` имеют значения, которые задаёт последняя запись их списков. Проект выбрал ровно те расширения, для которых последняя запись `extensions`, называющая расширение, ставит `chosen` в `true`.",
        "Новое: по правилам 10.6, 10.7 и 1.7.5 значение каждой настройки задаёт самая поздняя запись."),
      P("Where `approvalStatus` holds no entry, no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93). Where `strict` holds no entry, the flag has the default value that the schema of `sheriff.config.json` sets (§s-zefk589ykh37b8u).",
        "Если в `approvalStatus` нет ни одной записи, ни один ответственный не одобрял спецификацию, поэтому она черновик (§s-9g7jj8z4yf9kq93). Если в `strict` нет ни одной записи, флаг имеет значение по умолчанию, которое задаёт схема `sheriff.config.json` (§s-zefk589ykh37b8u).",
        "Новое: по вашему решению от 2026-11-17 значение флага `strict` по умолчанию задаёт только схема, а по правилу 1.3.3 спецификация одобрена, только если ответственный её одобрил."),
      P("`sheriff settings` records an entry only where the entry changes the value of its setting. Otherwise it records nothing and says that the setting already has that value.",
        "`sheriff settings` вносит запись, только если запись меняет значение своей настройки. Иначе она ничего не вносит и сообщает, что настройка уже имеет это значение.",
        "Новое: иначе повторный запуск добавлял бы записи, которые ничего не меняют."),
    ],
    reason: "The entries keep every change that an owner made to these settings, each with whoever made it, while the last entry of each list gives its setting a value. `sheriff reindex` writes an entry in place of the rule by which an earlier release approved the specification (§s-gb8s9657a65hqmv). An entry holds nothing that depends on when it is written, so that this entry has the same text whenever it is written.",
    ruReason: "Записи хранят каждое изменение этих настроек ответственным вместе с тем, кто его сделал, а значение каждой настройки задаёт последняя запись её списка. `sheriff reindex` пишет запись вместо правила, которым прежний выпуск одобрял спецификацию (§s-gb8s9657a65hqmv). Запись не содержит ничего, что зависит от времени её создания, чтобы эта запись имела один и тот же текст, когда бы её ни написали.",
    reasonChange: NEW,
    examples: [
      X("`approvalStatus` holds `{\"status\": \"approved\", \"by\": \"a@example.com\"}` followed by `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. The specification is a draft, since the last entry returns it to draft. The most likely mistake is to treat the specification as approved because one of the entries approves it.",
        "`approvalStatus` содержит `{\"status\": \"approved\", \"by\": \"a@example.com\"}`, а за ней `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. Спецификация — черновик, потому что последняя запись возвращает её в черновик. Самая вероятная ошибка — считать спецификацию одобренной, потому что одна из записей её одобряет."),
    ],
    refs: [
      R("implements", "s-qzthyh7yqvfhsa2"),
      R("implements", "s-q3pfzyaxvpr2zj2"),
      R("implements", "s-9ttvcwpqkehm58g"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-chsfpkgpmfk4fft"),
      R("cites", "s-j9r8z4xdrfkfs47"),
      R("cites", "s-9g7jj8z4yf9kq93"),
      R("cites", "s-gb8s9657a65hqmv"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "No code reads or writes these entries. config.ts (KEYS) is to accept approvalStatus, strict and extensions, each a list of entries of the form that the node gives, and config.schema.json, still to be added to moved/specs/_schema/, is to describe them and the default value of strict. model.ts (approvalRule, specificationApproved) is to take the approval status from the last entry of approvalStatus, the strict flag from the last entry of strict or the schema's default, and the chosen extensions from the last entry of extensions for each name. sheriff settings, which does not exist yet, appends each entry to the end of its list and records nothing where the value would not change. Tests are written first.",
});

add("new:tools-2-approve-spec", {
  location: "tools 2.10b (new, after “The entries of the settings that only an owner changes”)",
  sidValue: SID.approveSpec,
  testsFrom: ["match no test"],
  proposal: {
    title: "Approving the specification",
    ruTitle: "Одобрение спецификации",
    parts: [
      P("Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before an approval (§s-qzthyh7yqvfhsa2): the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd).",
        "Прежде чем `sheriff settings` вносит запись, которая одобряет спецификацию (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), она выполняет каждую проверку, которую правило о статусе одобрения спецификации требует перед одобрением (§s-qzthyh7yqvfhsa2): проверки, которые делают `sheriff validate`, `sheriff binding` и `sheriff citations` (§s-4kd2pave7vm4hmd).",
        "Новое: правило 10.6 требует перед одобрением выполнить все проверки, кроме ревью и проверок, которым нужно сообщение коммита или запуск тестов (ваше решение от 2026-11-20). Сообщение коммита читает только `sheriff commit-message`, ревью делает `sheriff review`, а тесты запускает хук pre-push; все остальные проверки основной таблицы проверок и таблиц проверок расширений делают эти три команды."),
      P("These checks read the specification as approved, whatever the entries in `sheriff.config.json` set. They judge the files in the working tree as one commit that adds the following:",
        "Эти проверки считают спецификацию одобренной, что бы ни задавали записи в `sheriff.config.json`. Файлы рабочего дерева они оценивают как один коммит, который добавляет следующее:",
        "Новое: правило 10.6 требует выполнять эти проверки так, как если бы спецификация была одобрена и один коммит добавил всю спецификацию и весь код системы."),
      L("each node of the specification in the files that the repository keeps;",
        "каждый узел спецификации в файлах, которые хранит репозиторий;",
        "Новое, по правилу 10.6."),
      L("the approval in force of each approved node (§s-v4qus7raqnwzneb);",
        "действующее одобрение каждого одобренного узла (§s-v4qus7raqnwzneb);",
        "Новое: одобренный узел, который добавляет коммит, приходит вместе со своим одобрением. Иначе проверка одобренного правила без кода или теста (строка 10.1.41) не включила бы в коммит правило, у которого нет ни кода, ни тестов, а правило 10.6 называет такое правило среди того, что видит ответственный."),
      L("all of the system's code (§s-hheus6f395ynqvc), including its tests.",
        "весь код системы (§s-hheus6f395ynqvc), включая его тесты.",
        "Новое, по правилу 10.6."),
      P("The checks treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that commit. The project's own checks receive the model of the specification (§s-w6gybeqn2ttydqx) that the node on such checks gives for this run (§s-7pk89t8z6wymmj9).",
        "Всё остальное, что хранит репозиторий, например архив (§s-f2b5zvc565s242f), остальные строки `specs/_approvals.jsonl` и записи в `sheriff.config.json`, проверки считают не изменённым этим коммитом. Собственные проверки проекта получают ту модель спецификации (§s-w6gybeqn2ttydqx), которую для этого запуска называет узел о таких проверках (§s-7pk89t8z6wymmj9).",
        "Новое: архив, строки одобрений и записи — не узлы спецификации и не код, поэтому коммит их не добавляет. Иначе проверка архива отвергла бы каждый узел архива как добавленный без удалённого узла, а проверка записей — каждую запись ответственного, который им больше не является. Какую модель получают собственные проверки проекта, уже говорит согласованный узел «How a project's own check is run»."),
      P("`sheriff settings` also names each node from which `sheriff types` would generate nothing, because the node's approved wording relies on a node that has never been approved (§s-f8fmudceuyaj942). It finds these nodes as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file.",
        "`sheriff settings` также называет каждый узел, из которого `sheriff types` ничего бы не сгенерировала, потому что одобренная формулировка узла опирается на узел, который ни разу не был одобрен (§s-f8fmudceuyaj942). Эти узлы она находит так же, как `sheriff types` (§s-a8fn72xa782wvbk), но не пишет ни одного файла.",
        "Новое: строка 10.1.39b входит в проверки, которые правило 10.6 выполняет перед одобрением, но её отчёт даёт `sheriff types`, которая пишет файлы. Поэтому `sheriff settings` получает этот отчёт, ничего не записывая."),
      P("`sheriff settings` shows the owner who approves the specification every refusal, warning and report that these checks give. Where they give none, it records the entry. Otherwise, it records the entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).",
        "`sheriff settings` показывает ответственному, который одобряет спецификацию, каждый отказ, предупреждение и отчёт этих проверок. Если их нет, она вносит запись. Иначе она вносит запись только после того, как ответственный подтвердит одобрение, как говорит узел о `sheriff settings` (§s-chsfpkgpmfk4fft).",
        "Новое, по правилу 10.6: ответственный видит, чего не хватает, и одобряет спецификацию сознательно (ваши решения от 2026-11-17 и 2026-11-20)."),
      P("While the `strict` flag (§s-q3pfzyaxvpr2zj2) is on, `sheriff settings` first makes the checks that the flag makes stricter, as it does before it turns the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit that changes nothing, `sheriff settings` refuses to record the approval and makes no other check. That refusal is the one that `sheriff settings` gives before it turns the flag on.",
        "Пока флаг `strict` (§s-q3pfzyaxvpr2zj2) включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, так же как перед включением флага (§s-nxgkp988mej79eg). Если хотя бы одна из них отвергла бы коммит, который ничего не меняет, `sheriff settings` отказывается вносить одобрение и других проверок не выполняет. Этот отказ — тот же, который `sheriff settings` даёт перед включением флага.",
        "Новое, по правилу 10.7: пока флаг включён, процедура одобрения отказывается работать в тех же случаях, что и процедура включения флага (ваше решение от 2026-11-17)."),
      P("`sheriff settings` records an entry that returns the specification to draft without running any check.",
        "Запись, которая возвращает спецификацию в черновик, `sheriff settings` вносит, не выполняя никаких проверок.",
        "Новое: правило 10.6 требует проверок только перед одобрением."),
    ],
    reason: "The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack (§s-qzthyh7yqvfhsa2). Judging one commit that adds the whole specification and all of the code, they show the owner every such gap before the owner approves the specification.",
    ruReason: "Проверки при коммите оценивают только то, что содержит коммит, поэтому никогда не показывают всего, чего ещё не хватает спецификации и коду (§s-qzthyh7yqvfhsa2). Оценивая один коммит, который добавляет всю спецификацию и весь код, они показывают ответственному каждый такой пробел до того, как он одобрит спецификацию.",
    reasonChange: NEW,
    examples: [
      X("The specification is a draft, and its `strict` flag is off. An approved rule R has neither code nor a test, and no SpecTag binds an old function. The agent runs `sheriff settings status approved` with no terminal attached. `sheriff settings` names R, saying that R lacks code and a test, names the function, and records nothing. The owner agrees, and the agent runs the command again with `--confirm`. The most likely mistake is to read R's approval as one that the commit's parent already holds. R is then not among the rules that the commit includes, and the owner never sees what R lacks.",
        "Спецификация — черновик, флаг `strict` выключен. У одобренного правила R нет ни кода, ни теста, а старую функцию не связывает ни один SpecTag. Агент запускает `sheriff settings status approved` без терминала. `sheriff settings` называет R, сообщая, что у R нет кода и теста, называет функцию и ничего не вносит. Ответственный соглашается, и агент запускает команду снова с `--confirm`. Самая вероятная ошибка — считать одобрение R тем, что уже есть в родительском коммите. Тогда R не входит в правила, которые включает коммит, и ответственный так и не видит, чего R недостаёт."),
    ],
    refs: [
      R("implements", "s-qzthyh7yqvfhsa2"),
      R("implements", "s-q3pfzyaxvpr2zj2"),
      R("implements", "s-epaw9sgyaajzn8g"),
      R("cites", "s-chsfpkgpmfk4fft"),
      R("cites", SID.entries),
      R("cites", "s-4kd2pave7vm4hmd"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-f2b5zvc565s242f"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-7pk89t8z6wymmj9"),
      R("cites", "s-f8fmudceuyaj942"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", SID.strict),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "sheriff settings does not exist yet. Its status approved is to run the checks of validate.ts, binding.ts and citationsOutside against a virtual commit whose parent holds the archive, the lines of specs/_approvals.jsonl other than the approvals in force, and the entries of sheriff.config.json, and none of the nodes, the approvals in force or the system's code and tests, with the specification read as approved. It obtains the report of row 10.1.39b from the generation in memory that s-dbk2vyeg8z5jxna already uses, shows every refusal, warning and report, and records the entry only on the owner's confirmation in a terminal or with --confirm. While the strict flag is on, it first runs what s-nxgkp988mej79eg runs. Its tests are written first.",
});

add("new:tools-2-strict", {
  location: "tools 2.10c (new, after “Approving the specification”)",
  sidValue: SID.strict,
  testsFrom: ["match no test"],
  proposal: {
    title: "Turning the `strict` flag on",
    ruTitle: "Включение флага `strict`",
    parts: [
      P("`sheriff settings` refuses to turn the `strict` flag on (§s-q3pfzyaxvpr2zj2) where a check that the flag makes stricter would refuse a commit or a push that changes nothing, if the specification were approved and the flag were on. The refusal names, for each check that would refuse, the command that lists what that check finds (§s-chsfpkgpmfk4fft). Where no such check would refuse, `sheriff settings` records the entry that turns the flag on (§s-d3nkw9b6mn98vuw).",
        "`sheriff settings` отказывается включить флаг `strict` (§s-q3pfzyaxvpr2zj2), если проверка, которую флаг делает строже, отвергла бы коммит или push, который ничего не меняет, будь спецификация одобрена, а флаг включён. Отказ называет для каждой проверки, которая отвергла бы такой коммит, команду, перечисляющую то, что эта проверка находит (§s-chsfpkgpmfk4fft). Если ни одна такая проверка его не отвергла бы, `sheriff settings` вносит запись, которая включает флаг (§s-d3nkw9b6mn98vuw).",
        "Новое, по правилу 10.7 (ваше решение от 2026-11-17). Какие команды называет отказ, говорит согласованный узел о `sheriff settings`."),
      P("The checks that the `strict` flag makes stricter, and the cases in which each would refuse such a commit, are the following:",
        "Проверки, которые флаг `strict` делает строже, и случаи, в которых каждая из них отвергла бы такой коммит, — следующие:",
        NEW),
      L("the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds, where `sheriff untagged` would list any code (§s-weuyx98r7c923ab);",
        "проверка кода и тестов вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q), — если `sheriff untagged` перечислила бы хоть какой-то код (§s-weuyx98r7c923ab);",
        "Новое: по правилу 9.5 при одобренной спецификации и включённом флаге коммит отвергается, если код вне коммита не связан ни одним SpecTag, а коммит, который ничего не меняет, оставляет вне себя весь код системы."),
      L("each of the project's own checks (§s-2fau85dfyyeq66m), which the rule that lists it may make stricter (§s-q3pfzyaxvpr2zj2), where it refuses the change when `sheriff validate --strict` runs it (§s-7pk89t8z6wymmj9).",
        "каждая собственная проверка проекта (§s-2fau85dfyyeq66m), которую правило, перечисляющее её, может сделать строже (§s-q3pfzyaxvpr2zj2), — если она отвергает изменение, когда её запускает `sheriff validate --strict` (§s-7pk89t8z6wymmj9).",
        "Новое: по правилу 10.7 правило собственных guidelines проекта может сделать строже любую проверку, а инструменты SpecSheriff не знают, какую именно. Поэтому они запускают каждую собственную проверку так, как согласованный узел о таких проверках требует перед включением флага."),
      P("`sheriff settings` records an entry that turns the `strict` flag off without running any check.",
        "Запись, которая выключает флаг `strict`, `sheriff settings` вносит, не выполняя никаких проверок.",
        "Новое: правило 10.7 требует проверок только перед включением флага."),
    ],
    reason: "The flag lets the owners make the checks stricter by an act of their own without stopping all work when they do (§s-q3pfzyaxvpr2zj2). Turned on while such a check would refuse a commit that changes nothing, the flag would make every commit fail until that check passed.",
    ruReason: "Флаг позволяет ответственным сделать проверки строже собственным действием, не останавливая при этом всю работу (§s-q3pfzyaxvpr2zj2). Включённый, пока такая проверка отвергла бы коммит, который ничего не меняет, флаг заставил бы отвергать каждый коммит, пока эта проверка не пройдёт.",
    reasonChange: NEW,
    examples: [
      X("The specification is a draft, and no SpecTag binds two functions of an old file. An owner runs `sheriff settings strict on`. `sheriff settings` refuses to turn the flag on and names `sheriff untagged`, which lists those functions. The most likely mistake is to turn the flag on because the specification is a draft. The first commit after the specification is approved is then refused for code that it does not change.",
        "Спецификация — черновик, и две функции старого файла не связывает ни один SpecTag. Ответственный запускает `sheriff settings strict on`. `sheriff settings` отказывается включить флаг и называет `sheriff untagged`, которая перечисляет эти функции. Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда первый коммит после одобрения спецификации отвергается из-за кода, которого он не меняет."),
    ],
    refs: [
      R("implements", "s-q3pfzyaxvpr2zj2"),
      R("cites", SID.entries),
      R("cites", "s-chsfpkgpmfk4fft"),
      R("cites", "s-8xw4mgvpexyvw5q"),
      R("cites", "s-3xx2eukc8gtd2tx"),
      R("cites", "s-weuyx98r7c923ab"),
      R("cites", "s-2fau85dfyyeq66m"),
      R("cites", "s-7pk89t8z6wymmj9"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "sheriff settings does not exist yet. Its strict on is to list the code that sheriff untagged lists and to run the project's own checks as sheriff validate --strict runs them (validate.ts), refusing and naming sheriff untagged or sheriff validate --strict for each that finds anything; its strict off records the entry at once. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 49: the node that the appendix needs for withdrawing the choice of an extension (s-j8y62pa9hzz6nwx). Choosing
// an extension is in the agreed node on `sheriff settings` (s-chsfpkgpmfk4fft), and its entries in the node above.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-2-extension-off", {
  location: "tools 2.10d (new, after “Turning the `strict` flag on”)",
  sidValue: SID.extensionOff,
  testsFrom: ["match no test"],
  proposal: {
    title: "Withdrawing the choice of an extension",
    ruTitle: "Отзыв выбора расширения",
    parts: [
      P("`sheriff settings` refuses to record an entry that withdraws the choice of an extension of the guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw) while a node depends on that extension (§s-j8y62pa9hzz6nwx). The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx). Where no node depends on the extension, `sheriff settings` records the entry.",
        "`sheriff settings` отказывается вносить запись, которая отзывает выбор расширения guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw), пока от этого расширения зависит какой-нибудь узел (§s-j8y62pa9hzz6nwx). Отказ называет каждый такой узел по его файлу, sid и расположению (§s-kag2m9tzdnduxdx). Если от расширения не зависит ни один узел, `sheriff settings` вносит запись.",
        "Новое, по правилу 1.7.6 (ваше решение от 2026-11-18)."),
      P("A node other than the extension's own nodes depends on the extension where any of the following holds:",
        "Узел, который не входит в само расширение, зависит от расширения, если выполнено что-нибудь из следующего:",
        "Новое: правило 1.7.6 называет, через что узел зависит от расширения, а этот узел говорит, где инструменты SpecSheriff находят каждое из этого: в схеме расширения и в его файле."),
      L("the node's kind is one that the `kinds` of the extension's schema (§s-zefk589ykh37b8u) add;",
        "тип узла — один из тех, что добавляют `kinds` схемы расширения (§s-zefk589ykh37b8u);",
        "Новое: узел типа, который добавляет расширение, по правилу 1.7.6."),
      L("the node holds a property that the `fields` of the extension's schema add to the node's kind;",
        "у узла есть свойство, которое `fields` схемы расширения добавляют типу узла;",
        "Новое: свойство, которое добавляет расширение, по правилу 1.7.6."),
      L("the node has a link whose type is one of the `linkTypes` of the extension's schema;",
        "у узла есть связь, тип которой — один из `linkTypes` схемы расширения;",
        "Новое: связь типа, который добавляет расширение, по правилу 1.7.6."),
      L("the node has a link that holds a property that the `link` of the extension's schema adds;",
        "у узла есть связь со свойством, которое добавляет `link` схемы расширения;",
        "Новое: свойство связи схема расширения добавляет так же, как тип связи (согласованный узел «How the schema of the specification is composed»), и по правилу 1.7.6 узел с таким свойством тоже зависит от расширения."),
      L("the node has a link to a node in the extension's file.",
        "у узла есть связь с узлом из файла расширения.",
        "Новое: связь с узлом расширения, по правилу 1.7.6."),
      P("`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft.",
        "`sheriff settings` проверяет каждый узел в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Эту проверку она выполняет независимо от того, одобрена спецификация или она черновик.",
        "Новое: по правилам 1.7.3 и 1.7.4 узлы SpecSheriff guidelines и других расширений от расширения не зависят, поэтому проверяются только узлы, которые хранит репозиторий. Правило 1.7.6 не зависит от статуса одобрения спецификации."),
    ],
    reason: "Withdrawn while a node still depends on it, an extension would leave that node relying on rules and definitions that no longer hold in the project (§s-j8y62pa9hzz6nwx). Everything that an extension adds to the specification is either declared in its schema or held in its file, so those two show every node that depends on it.",
    ruReason: "Если отозвать выбор расширения, пока от него ещё зависит узел, этот узел будет опираться на правила и определения, которые в проекте больше не действуют (§s-j8y62pa9hzz6nwx). Всё, что расширение добавляет в спецификацию, либо объявлено в его схеме, либо содержится в его файле, поэтому эти два места показывают каждый узел, который от него зависит.",
    reasonChange: NEW,
    examples: [
      X("The project has chosen the RecordType extension, whose name is `recordtype`, and its base specification holds a RecordType. An owner runs `sheriff settings extension recordtype off`. `sheriff settings` refuses and names the RecordType by its file, its sid and its location. The most likely mistake is to look only for links to the extension's nodes, so that a node of a kind that the extension adds goes unnoticed.",
        "Проект выбрал расширение RecordType, имя которого `recordtype`, и его базовая спецификация содержит RecordType. Ответственный запускает `sheriff settings extension recordtype off`. `sheriff settings` отказывается и называет этот RecordType по его файлу, sid и расположению. Самая вероятная ошибка — искать только связи с узлами расширения: тогда узел типа, который добавляет расширение, остаётся незамеченным."),
    ],
    refs: [
      R("implements", "s-j8y62pa9hzz6nwx"),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", SID.entries),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-5fewsp22mmdz7y6"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "sheriff settings does not exist yet. Its extension <name> off is to read kinds, fields, linkTypes and link from guidelines/_schema/extensions/<name>.schema.json, where the extension has a schema, and the sids of the extension's nodes from guidelines/extensions/<name>.json (in the repository where the SpecSheriff guidelines are written, from specs/), and to refuse while a node of the files that the repository keeps, other than the extension's own, has such a kind, property, type of link or property of a link, or a link to one of those sids. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 50: "Setting a repository up and taking SpecSheriff out of it" (s-7unxytshhc4md54), tools 3.
// ---------------------------------------------------------------------------------------------------------------
const SAME = "Без изменений.";
add("s-7unxytshhc4md54", {
  location: "tools 3",
  sidValue: "s-7unxytshhc4md54",
  testsFrom: [
    "sheriff init writes the git hooks and turns them on, declares the marketplace and the plugin, and starts the settings and the project's guidelines",
    "sheriff init stages each hook it holds with the executable mode",
    "sheriff init refuses an agent it does not know, naming the two it takes",
    "sheriff init writes, as a draft, the rule that approves the specification, whatever code the repository keeps",
    "sheriff init has git merge the approvals by union",
    "sheriff remove takes out what sheriff init writes for both agents, keeps specs/ naming it, stages nothing, and run again changes nothing",
    "sheriff init names each hook the repository ran from elsewhere before, and sheriff remove each folder of the project's own tools it leaves",
  ],
  proposal: {
    title: "Setting a repository up and taking SpecSheriff out of it",
    ruTitle: "Настройка репозитория и удаление из него SpecSheriff",
    parts: [
      P("`sheriff init` sets a repository up for the SpecSheriff tools. With the git hooks, it does the following:",
        "`sheriff init` настраивает репозиторий для инструментов SpecSheriff. С git-хуками он делает следующее:",
        SAME),
      L("it writes them into `.githooks/` (§s-4mej6ccn7xu3d3p);",
        "записывает их в `.githooks/` (§s-4mej6ccn7xu3d3p);",
        SAME),
      L("it stages with the executable mode, 100755, each hook there that holds what it would write and that git's index does not already hold with that mode, naming each one;",
        "добавляет в стейджинг с исполняемым режимом 100755 каждый хук там, который содержит то, что он записал бы, и которого индекс git ещё не содержит с этим режимом, называя каждый;",
        SAME),
      L("where it cannot stage a hook, it names the hook and says how to stage it as executable;",
        "если не может добавить хук в стейджинг, называет его и говорит, как добавить его в стейджинг исполняемым;",
        SAME),
      L("it turns the hooks on by setting git's `core.hooksPath` to `.githooks`.",
        "включает хуки, задавая в git `core.hooksPath` равным `.githooks`.",
        "Было: «it turns them on». Без изменений по смыслу; названа настройка git, которую потом снимает `sheriff remove`."),
      P("`sheriff init` writes for the agent that the option `--agent` names, `claude` or `codex`, and for `claude` where the option is not given:",
        "`sheriff init` пишет для агента, которого называет параметр `--agent`, `claude` или `codex`, а без этого параметра — для `claude`:",
        "Было: «…, taking `claude` where the option is not given». Без изменений по смыслу."),
      L("for `claude`, it adds the marketplace and the plugin to `.claude/settings.json` as a project declares them (§s-zh2vcr3xjumppg5), keeping any other key there;",
        "для `claude` — добавляет marketplace и плагин в `.claude/settings.json` так, как их объявляет проект (§s-zh2vcr3xjumppg5), сохраняя там все остальные ключи;",
        SAME),
      L("for `codex`, it writes the agent's hooks for Codex into `.codex/hooks.json` (§s-n76wt2bkqdmh78x), keeping any other hook there.",
        "для `codex` — записывает хуки агента для Codex в `.codex/hooks.json` (§s-n76wt2bkqdmh78x), сохраняя там все остальные хуки.",
        SAME),
      P("`sheriff init` refuses any other name of an agent, naming the agents for which it writes.",
        "Любое другое имя агента `sheriff init` отвергает, называя агентов, для которых он пишет.",
        "Было: «It refuses another name, naming the two it takes.» Без изменений по смыслу. Убран счёт («the two»): по правилу 7.4.1 узел не называет числа того, что содержит объявление в коде (`AGENTS` в init.ts)."),
      P("`sheriff init` has git merge the approvals (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state that `git check-attr merge specs/_approvals.jsonl` reports for the merge attribute of the approvals:",
        "`sheriff init` настраивает git так, чтобы одобрения (§s-v4qus7raqnwzneb) сливались по union. Что делает `sheriff init`, зависит от состояния, которое `git check-attr merge specs/_approvals.jsonl` сообщает для атрибута слияния одобрений:",
        SAME),
      L("where git reports the attribute as unspecified, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to the `.gitattributes` at the repository's root, and writes that file where it is missing;",
        "если git сообщает, что атрибут не задан, `sheriff init` добавляет строку `specs/_approvals.jsonl merge=union` в `.gitattributes` в корне репозитория, а если этого файла нет, создаёт его;",
        SAME),
      L("where git reports `union`, `sheriff init` appends nothing;",
        "если git сообщает `union`, `sheriff init` ничего не добавляет;",
        SAME),
      L("where git reports any other state of that attribute, `sheriff init` appends nothing and names that state.",
        "если git сообщает любое другое состояние этого атрибута, `sheriff init` ничего не добавляет и называет это состояние.",
        SAME),
      P("Outside a git repository, `sheriff init` appends the line unless the file already holds it, spacing and line endings aside. The appended line starts a line of its own and ends as the file's lines end.",
        "Вне репозитория git `sheriff init` добавляет строку, если файл её ещё не содержит, без учёта пробелов и концов строк. Добавленная строка начинается с новой строки и заканчивается так же, как строки файла.",
        SAME),
      P("Where they are missing, `sheriff init` writes these files (§s-zefk589ykh37b8u):",
        "Если следующих файлов нет, `sheriff init` их пишет (§s-zefk589ykh37b8u):",
        "Без изменений по смыслу; пути файлов дан ссылкой на «Where the files are»."),
      L("a `sheriff.config.json` that holds only `code` and `tests`, each an empty list of glob patterns;",
        "`sheriff.config.json`, который содержит только `code` и `tests`, каждый — пустой список glob-шаблонов;",
        "Было: «a `sheriff.config.json` naming no file as code or tests». Без изменений по смыслу. Записей настроек, которые меняет только ответственный, `sheriff init` не пишет: спецификацию одобряет, флаг `strict` включает и расширения выбирает только ответственный (правила 10.6, 10.7 и 1.7.5)."),
      L("a `specs/_guidelines/project.json` whose top node is a section that names, as the specification's owner (§s-t9j29hppag2nren), the email address set in git's configuration.",
        "`specs/_guidelines/project.json`, верхний узел которого — раздел, называющий ответственным за спецификацию (§s-t9j29hppag2nren) адрес электронной почты, заданный в конфигурации git.",
        "Было: «That `project.json` names the email git is configured with as the specification's owner.» Без изменений по смыслу; ответственных за спецификацию называет верхний узел `project.json`, как говорит согласованный узел «What the SpecSheriff tools read in the project's own guidelines»."),
      P("That section holds, as a draft, a rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). The rule's title is “When the tests run”. Its text is “The tests run on every push.” Its `TextRule.list` (§s-eferktypcj7njt5) lists `push` (§s-b6qdtghnyha3fhk), and the list's `of` is “the moments at which the tests run”.",
        "Этот раздел содержит черновик правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Название правила — «When the tests run». Его текст — «The tests run on every push.». Его `TextRule.list` (§s-eferktypcj7njt5) перечисляет `push` (§s-b6qdtghnyha3fhk), а `of` этого списка — «the moments at which the tests run».",
        "Было: «It also holds, as a draft, the rule \"The specification is approved\", refining §s-qzthyh7yqvfhsa2, whose text is \"This project's specification is approved.\"» Это правило вы заменили записями в `sheriff.config.json` (правило 10.6, ваше решение от 2026-11-13), поэтому `sheriff init` его больше не пишет. Вместо него `sheriff init` пишет черновик правила о том, когда запускаются тесты. Почему: по правилу 1.6.4 собственные guidelines проекта называют, где запускаются тесты, а по строке 10.1.18 каждый раздел содержит правило, так что раздел без правила отвергался бы уже при первом коммите. Сами инструменты SpecSheriff запускают тесты только при push (узел «Running the tests before a push»), поэтому черновик называет `push`. Название и `of` говорят о моменте запуска тестов, как согласованные строка 10.1.44 и узел «Running the tests before a push». Правило пишется черновиком, как прежде правило об одобрении: одобряет его ответственный, а пока оно черновик, инструменты SpecSheriff считают, что оно ничего не перечисляет."),
      P("Where git's configuration sets no email address, `sheriff init` writes no `project.json` and says how to set that address.",
        "Если конфигурация git не задаёт адрес электронной почты, `sheriff init` не пишет `project.json` и говорит, как задать этот адрес.",
        "Новое в тексте: так делает код (init.ts)."),
      P("`sheriff init` replaces a hook or a declaration that holds what an earlier release of `sheriff init` wrote, and names each. It leaves as it is any other file that differs from what it would write, and names that file. So, run again, `sheriff init` changes nothing (§s-jsqxdx47wkkj7gp).",
        "`sheriff init` заменяет хук или объявление, которые содержат то, что писал прежний выпуск `sheriff init`, и называет каждое. Любой другой файл, который отличается от того, что он записал бы, он оставляет как есть и называет. Поэтому при повторном запуске `sheriff init` ничего не меняет (§s-jsqxdx47wkkj7gp).",
        "Было: «It replaces no other file that differs from what it would write, and names each one instead.» Без изменений по смыслу; сказано через то, что команда делает, а не через то, чего она не делает."),
      P("A hook or a declaration holds what an earlier release wrote where, line endings aside, it equals one of the texts that the earlier releases wrote. The SpecSheriff tools keep those texts.",
        "Хук или объявление содержит то, что писал прежний выпуск, если без учёта концов строк совпадает с одним из текстов, которые писали прежние выпуски. Эти тексты хранят инструменты SpecSheriff.",
        "Без изменений."),
      P("Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder that `core.hooksPath` named, `sheriff init` names each hook found there, apart from git's samples. It says that each one no longer runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).",
        "Если раньше хуки репозитория запускались из другого места — из `.git/hooks/` или из другой папки, которую называл `core.hooksPath`, — `sheriff init` называет каждый найденный там хук, кроме образцов git. Он говорит, что каждый из них больше не запускается, пока его не переместят в `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).",
        SAME),
      P("`sheriff remove` takes out of a repository what `sheriff init` writes outside `specs/`, for each agent for which `sheriff init` writes:",
        "`sheriff remove` убирает из репозитория то, что `sheriff init` пишет вне `specs/`, для каждого агента, для которого пишет `sheriff init`:",
        "Было: «…, for both agents:». Без изменений по смыслу. Убран счёт («both»), по правилу 7.4.1."),
      L("each git hook, the marketplace and the plugin in `.claude/settings.json`, and the agent's hooks for Codex in `.codex/hooks.json`, where each holds what `sheriff init` writes now or wrote in an earlier release;",
        "каждый git-хук, marketplace и плагин в `.claude/settings.json` и хуки агента для Codex в `.codex/hooks.json`, если каждое из них содержит то, что `sheriff init` пишет сейчас или писал в прежнем выпуске;",
        SAME),
      L("each line of the `.gitattributes` at the repository's root that is the line that `sheriff init` appends there, spacing and line endings aside;",
        "каждую строку `.gitattributes` в корне репозитория, которая без учёта пробелов и концов строк совпадает со строкой, которую туда добавляет `sheriff init`;",
        SAME),
      L("`core.hooksPath`, where it names `.githooks`;",
        "`core.hooksPath`, если он называет `.githooks`;",
        SAME),
      L("a key of `.claude/settings.json` or of `.codex/hooks.json` that is left holding nothing, and either file where it is left holding no key;",
        "ключ `.claude/settings.json` или `.codex/hooks.json`, в котором ничего не осталось, и любой из этих файлов, в котором не осталось ни одного ключа;",
        SAME),
      L("`.gitattributes`, where it is left holding nothing but blank lines;",
        "`.gitattributes`, если в нём остались только пустые строки;",
        SAME),
      L("`.githooks/`, `.claude/` or `.codex/`, where it is left empty;",
        "`.githooks/`, `.claude/` или `.codex/`, если папка осталась пустой;",
        SAME),
      L("`sheriff.config.json`, whatever it holds, including the entries of the settings that only an owner of the specification changes (§s-d3nkw9b6mn98vuw).",
        "`sheriff.config.json`, что бы он ни содержал, в том числе записи настроек, которые меняет только ответственный за спецификацию (§s-d3nkw9b6mn98vuw).",
        "Было: «`sheriff.config.json`, whatever it holds». Без изменений по смыслу; теперь сказано, что вместе с файлом уходят и записи ответственных: они нужны только инструментам SpecSheriff и остаются в истории git."),
      P("`sheriff remove` leaves each hook and declaration that differs from what `sheriff init` writes, and names it. It leaves `specs/` and the bindings file (§s-trwczfskj5zmuft) as they are, and names each of them. It names each folder `.githooks/<hook>.d/` that it leaves, and says that the project's own tools in it (§s-n4m5zvh96yb299p) no longer run.",
        "Каждый хук и каждое объявление, которые отличаются от того, что пишет `sheriff init`, `sheriff remove` оставляет и называет. `specs/` и файл привязок (§s-trwczfskj5zmuft) он оставляет как есть и называет каждый из них. Он называет каждую оставленную папку `.githooks/<hook>.d/` и говорит, что собственные инструменты проекта в ней (§s-n4m5zvh96yb299p) больше не запускаются.",
        "Было: «It leaves `specs/` as it is, naming it.» Новое: `sheriff remove` оставляет и файл привязок `sheriff.bindings.json`, называя его. Этот файл содержит SpecTag файлов, формат которых не допускает комментариев, то есть принадлежит коду проекта так же, как SpecTag в комментариях, которых `sheriff remove` тоже не трогает; `sheriff init` этот файл не пишет."),
      P("`sheriff remove` stages nothing. Run again, it changes nothing.",
        "`sheriff remove` ничего не добавляет в стейджинг. При повторном запуске он ничего не меняет.",
        SAME),
    ],
    reason: "Taking up the method and taking it out are each one command, so that nobody has to know every file and setting that the SpecSheriff tools need. What `sheriff init` writes reaches every clone through git, so the checks run alike for everyone who works on the project (§s-epaw9sgyaajzn8g). Each command changes only what serves the SpecSheriff tools, and leaves the rest of the repository to the project.",
    ruReason: "Принять метод и отказаться от него можно каждое одной командой, чтобы никому не нужно было знать все файлы и настройки, которые нужны инструментам SpecSheriff. То, что пишет `sheriff init`, попадает в каждый клон через git, поэтому проверки работают одинаково для всех, кто работает над проектом (§s-epaw9sgyaajzn8g). Каждая из команд меняет только то, что служит инструментам SpecSheriff, а остальное в репозитории оставляет проекту.",
    reasonChange: "Было: одиннадцать абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем узел нужен в целом (правило 7.4.2). Объяснения исполняемого режима хуков, слияния одобрений по union и нового черновика правила в `project.json` перенесены в примеры; решения, на которых они основаны, остаются в `meta.decisions` узла. Убран абзац о правиле, одобрявшем спецификацию: его больше нет.",
    examples: [
      X("A project on Windows runs `sheriff init`. Git there takes no executable mode from a file, so `sheriff init` stages each hook that it wrote with the mode 100755 and names it. The most likely mistake is to make the hooks executable on disk only: git on Windows does not record that mode, so a clone on Linux or macOS runs none of the hooks.",
        "Проект на Windows запускает `sheriff init`. Там git не берёт исполняемый режим из файла, поэтому `sheriff init` добавляет каждый записанный хук в стейджинг с режимом 100755 и называет его. Самая вероятная ошибка — сделать хуки исполняемыми только на диске: git на Windows этот режим не записывает, и клон на Linux или macOS не запускает ни одного хука."),
      X("Two branches each approve a node, and each appends a line to `specs/_approvals.jsonl`. Since `sheriff init` had git merge that file by union, the merge keeps both lines and puts the line of the branch being merged last. Without the union merge, git raises a conflict there. The most likely mistake is to resolve that conflict by keeping the lines of one branch, which loses the approval made on the other branch.",
        "Две ветки одобряют по узлу, и каждая добавляет строку в `specs/_approvals.jsonl`. Поскольку `sheriff init` настроил git сливать этот файл по union, слияние сохраняет обе строки и ставит строку вливаемой ветки последней. Без слияния по union git сообщает там о конфликте. Самая вероятная ошибка — разрешить этот конфликт, оставив строки одной ветки: так теряется одобрение, сделанное в другой ветке."),
      X("The owner runs `sheriff init` in a new repository. `project.json` then holds a section that names the owner and holds, as a draft, the rule on when the tests run. So the first commit passes the check that every section contains a rule (§s-exxuckgakfxkycp). The most likely mistake is to write the section alone, which that check refuses.",
        "Ответственный запускает `sheriff init` в новом репозитории. Тогда `project.json` содержит раздел, который называет ответственного и содержит черновик правила о том, когда запускаются тесты. Поэтому первый коммит проходит проверку того, что каждый раздел содержит правило (§s-exxuckgakfxkycp). Самая вероятная ошибка — записать один раздел, который эта проверка отвергает."),
    ],
    refs: [
      R("implements", "s-epaw9sgyaajzn8g"),
      R("implements", "s-jsqxdx47wkkj7gp"),
      R("implements", "s-6sk8uet75dmq5qz"),
      R("cites", "s-4mej6ccn7xu3d3p"),
      R("cites", "s-zh2vcr3xjumppg5"),
      R("cites", "s-n76wt2bkqdmh78x"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-t9j29hppag2nren"),
      R("cites", "s-x8uzc8z44pwtd3h"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-b6qdtghnyha3fhk"),
      R("cites", "s-n4m5zvh96yb299p"),
      R("cites", SID.entries),
      R("cites", "s-trwczfskj5zmuft"),
      R("cites", "s-exxuckgakfxkycp"),
      R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-pcnyfp7gev7syax"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements “When the checks run” (s-epaw9sgyaajzn8g), which now says when the checks run (question X2).",
      "The `implements` link to “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): `sheriff init` sets up the hooks that check an agent's edit, which is one of the moments of s-epaw9sgyaajzn8g; the check itself is “An edit judged before it is made” (s-st6td4mua9uqt9z).",
      "The `implements` link to “The specification's approval status” (s-qzthyh7yqvfhsa2), which becomes a `cites` link kept for the decisions of 2026-11-05 and 2026-11-06 that cite that rule: `sheriff init` no longer writes the rule that approved the specification.",
      "The `cites` link to “Only a node's owners approve it” (s-67vekyup7y8smap): the reason no longer explains why the rule that approved the specification was written as a draft.",
      "The rule “The specification is approved” that `sheriff init` wrote into `project.json`, and the paragraph of the reason on it: the owner replaced that rule with entries in `sheriff.config.json` on 2026-11-13 (rule 10.6).",
      "“for both agents” and “the two it takes”: counts of what a declaration in the code holds (rule 7.4.1), as the continuation file records.",
      "The paragraphs of the reason that explained the text paragraph by paragraph (rule 7.4.2): the executable mode and the union merge are explained by examples now.",
    ],
    date: DATE,
  },
  stage3: "init.ts: approvalRuleNode (model.ts) goes; sheriff init writes into project.json, under the section that names the owner, a draft TextRule with the title “When the tests run”, the text “The tests run on every push.”, a refines link to s-x8uzc8z44pwtd3h and a TextRule.list whose of is “the moments at which the tests run” and whose only member is push. The refusal of an unknown agent names the agents of AGENTS without counting them. sheriff remove leaves sheriff.bindings.json and names it. The test at e2e/init.test.ts:248 is rewritten first for the new rule, a test for the bindings file left by sheriff remove is written first, and the names of the tests at :112 and :159 lose their counts.",
});

// ---------------------------------------------------------------------------------------------------------------
// Two proposals on agreed drafts that the subject of the group exposes, as group 4 proposed one on the node that its
// checks relied on. Each is one complete new wording, built from the agreed draft named in `base`: every part that
// does not change keeps its agreed wording, and its `change` says so.
// ---------------------------------------------------------------------------------------------------------------
const AS_AGREED = "Как в согласованной формулировке.";
const fromBase = (baseKey) => {
  const base = drafts[baseKey];
  if (!base || !base.agreed) throw new Error(`${baseKey}: no agreed draft to build a proposal on`);
  return { base, parts: base.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: AS_AGREED })) };
};
const at = (parts, start) => {
  const i = parts.findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`no part starts with: ${start}`);
  return i;
};

// 1. "What `sheriff reindex` changes in what an earlier release wrote" (s-gb8s9657a65hqmv): the migration that replaces
// the rule which approved the specification also writes the draft rule on when the tests run, where `project.json`
// would otherwise hold no rule that refines rule 1.6.4.
{
  const { base, parts } = fromBase("proposal:s-gb8s9657a65hqmv-g3");
  parts[at(parts, "`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`")] = L(
    "`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;",
    "`TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, а его ключ `declaration` — `pointer`, если указывает в другое место JSON Schema;",
    "Добавлено: ключ `declaration` внутри становится `pointer`. По вашим решениям от 2026-11-13 по строке 10.1.35 `jsonSchema` состоит из `file` и `pointer`, так что без этого переименования схема отвергла бы переписанный список. Узел «The fingerprint of a node's wording» записывает `pointer` под прежним именем `declaration`, чтобы одобрение правила со списком оставалось в силе.");
  parts[at(parts, "`TextRule.list.declaredIn` becomes `TextRule.list.valueList`")] = L(
    "`TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;",
    "`TextRule.list.declaredIn` становится `TextRule.list.valueList`, а его ключ `declaration` — `symbol`, если называет объявление в коде;",
    "Добавлено: ключ `declaration` внутри становится `symbol`, потому что по вашим решениям от 2026-11-13 по строке 10.1.35 `valueList` состоит из `file` и `symbol`. Отпечаток записывает `symbol` под прежним именем, как и `pointer`.");
  const bare = at(parts, "in each file that `sheriff.config.json` names as tests");
  parts[bare] = L(
    "in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.",
    "в каждом файле, который `sheriff.config.json` называет тестами кода системы (§s-hheus6f395ynqvc) или собственной проверки (§s-2fau85dfyyeq66m) или генератора (§s-km4x4s26kv7pjze) проекта, перед каждым голым sid ставится `@spec `.",
    "Как в согласованной формулировке; добавлены ссылки на правила, которые определяют код системы и собственные проверки и генераторы проекта, там, где узел впервые их называет (правило 7.2.7).");
  const archived = at(parts, "that rule is moved to the archive");
  parts.splice(archived + 1, 0, L(
    "where `project.json` then holds no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run that `sheriff init` writes (§s-7unxytshhc4md54) is added under its top node;",
    "если после этого в `project.json` нет правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под его верхний узел добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);",
    "Новое. Правило, которым прежний выпуск одобрял спецификацию, уходит в архив, и раздел `project.json`, где оно было единственным правилом, остался бы без правила; проверка строки 10.1.18 отвергла бы такой раздел уже при первом коммите после обновления. Так случилось бы и с `project.json` этого репозитория. Кроме того, при прежнем выпуске хук pre-push запускал тесты, пока спецификация одобрена, а по правилу 1.6.4 теперь тесты при push запускаются, только если собственные guidelines проекта называют push. Поэтому при переносе `sheriff reindex` пишет то же правило-черновик, что и `sheriff init`, с `push`. Это сценарий, а не ручной шаг в заметках к выпуску, по вашему правилу «What can run as a deterministic process is automated». Правило пишется только при переносе, поэтому второй запуск ничего не меняет (правило 10.13), а правило, которое проект потом удалит сам, не появится снова."));
  const extension = at(parts, "Where a node of the specification is of a kind, or holds a link of a type, that an extension");
  parts[extension] = P(
    "Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.",
    "Если узел спецификации — того типа или со связью того типа, которые добавляет расширение guidelines (§s-mbmnsnxenmavu3z), а проекту ещё предстоит выбрать это расширение (§s-9ttvcwpqkehm58g), `sheriff reindex` называет это расширение.",
    "Как в согласованной формулировке; добавлена ссылка на определение расширения guidelines там, где узел впервые его называет (правило 7.2.7).");
  parts.splice(extension + 1, 0, P(
    "`sheriff reindex` names the rule on when the tests run that it adds, since the SpecSheriff tools read that rule only after an owner approves it (§s-t9j29hppag2nren).",
    "`sheriff reindex` называет правило о том, когда запускаются тесты, которое он добавляет, потому что инструменты SpecSheriff читают это правило только после того, как его одобрит ответственный (§s-t9j29hppag2nren).",
    "Новое: правило-черновик ничего не перечисляет, пока его не одобрят (согласованный узел «What the SpecSheriff tools read in the project's own guidelines»), поэтому тесты при push снова запускаются, только когда ответственный его одобрит. `sheriff reindex` называет правило, чтобы ответственный это увидел."));
  const fingerprint = at(parts, "A renamed key and a renamed kind of node leave a node's fingerprint unchanged");
  parts.splice(fingerprint, 1,
    P("A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).",
      "Переименованный ключ и переименованный тип узла оставляют прежним отпечаток узла (§s-f5brvuuu6xmkj6t), поэтому одобрение формулировки узла остаётся в силе (§s-v4qus7raqnwzneb).",
      "Было: «A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb).» Без изменений по смыслу. Ссылка за отпечатком ведёт теперь на узел «The fingerprint of a node's wording», куда группа 6 переносит то, как отпечаток вычисляется; ссылка на узел «How an approval is recorded» осталась за тем, что одобрение остаётся в силе."),
    P("`sheriff reindex` names each file that it rewrites because an earlier release wrote that file differently, including the files of the specification.",
      "`sheriff reindex` называет каждый файл, который он переписывает потому, что прежний выпуск записал этот файл иначе, в том числе файлы спецификации.",
      "Было: «`sheriff reindex` names each file that it changes in this way, including the files of the specification.» Без изменений по смыслу. «In this way» указывало назад на переименования из предыдущего предложения, хотя речь шла обо всех изменениях узла; теперь это сказано прямо, как требует правило о словах, которые указывают назад."));
  const refs = base.proposal.refs.map((r) => ({ ...r }));
  for (const to of ["s-mbmnsnxenmavu3z", "s-x8uzc8z44pwtd3h", "s-7unxytshhc4md54", "s-t9j29hppag2nren", "s-f5brvuuu6xmkj6t", "s-hheus6f395ynqvc", "s-2fau85dfyyeq66m", "s-km4x4s26kv7pjze"]) refs.push(R("cites", to));
  add("proposal:s-gb8s9657a65hqmv-g6", {
    question: "None: carries out rule 1.6.4 and row 10.1.18 for a project that an earlier release set up, as `sheriff init` now does (group 6), and brings two sentences into line with the rules on citations and on words that point back",
    base: "proposal:s-gb8s9657a65hqmv-g3",
    location: base.location,
    sidValue: base.sidValue,
    change: "Добавлен пункт: если после переноса в архив правила, которым прежний выпуск одобрял спецификацию, в `project.json` нет правила, которое уточняет правило 1.6.4 о том, когда тесты должны проходить, `sheriff reindex` добавляет то же правило-черновик о моменте запуска тестов с `push`, что пишет `sheriff init`, и называет его. Почему: иначе раздел `project.json`, где правило об одобрении было единственным (так в этом репозитории), остался бы без правила, и строка 10.1.18 отвергла бы первый коммит после обновления; а проект, у которого при прежнем выпуске хук pre-push запускал тесты, потерял бы это молча. Сценарий вместо ручного шага — по вашему правилу «What can run as a deterministic process is automated». Ещё добавлены переименования ключа `declaration` внутри `jsonSchema` и `valueList` в `pointer` и `symbol` (ваши решения от 2026-11-13 по строке 10.1.35), на которые опирается узел об отпечатке. Ссылка за отпечатком ведёт на новый узел «The fingerprint of a node's wording». Добавлены ссылки при первом упоминании расширения guidelines, кода системы и собственных проверок и генераторов проекта (правило 7.2.7), а «in this way» в последнем абзаце заменено прямыми словами. Остальная формулировка — как вы согласовали.",
    proposal: {
      title: base.proposal.title,
      ruTitle: base.proposal.ruTitle,
      parts,
      reason: base.proposal.reason,
      ruReason: base.proposal.ruReason,
      reasonChange: AS_AGREED,
      refs,
      removed: [],
      date: DATE,
    },
    stage3: "reindex.ts, where it replaces the approved rule of project.json that refines s-qzthyh7yqvfhsa2 with an entry (the item of s-gb8s9657a65hqmv), is then to add under the top node of project.json the draft rule that sheriff init writes (s-7unxytshhc4md54), with a new sid, where project.json holds no rule with a refines link to s-x8uzc8z44pwtd3h, and to name that rule. It is also to rename the key declaration inside TextRule.list.jsonSchema and TextRule.list.valueList to pointer and symbol. Tests for both, and for a second run that changes nothing, are written first. In this repository and in the saloon, the first sheriff reindex of the release then writes the rule, which the owner approves.",
  });
}

// 2. "How a project's own check is run" (s-7pk89t8z6wymmj9): the rule that lists a check may make its failure refuse
// while the `strict` flag is on, as rule 10.7 and its second example say.
{
  const { base, parts } = fromBase("s-7pk89t8z6wymmj9");
  const listing = at(parts, "In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names");
  parts.splice(listing, 1,
    P("In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.",
      "В своём `TextRule.list` (§s-eferktypcj7njt5) правило, которое `sheriff.config.json` называет для проверки, перечисляет её как элемент, значение которого (§s-5hb9k2e34dgn284) — имя проверки. Это правило `sheriff validate` читает в его последней одобренной формулировке (§s-a8fn72xa782wvbk). Если в этой формулировке в правиле нет элемента, значение которого — имя проверки, `sheriff validate` отвергает изменение. Отказ называет проверку и правило и говорит, что последняя одобренная формулировка правила эту проверку не перечисляет.",
      "Как в согласованной формулировке; предложение об `onFailure` перенесено в следующий абзац, который теперь говорит обо всех его значениях."),
    P("Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where that member's `onFailure` is `reportedUnlessStrict`, `sheriff validate` reports the check's failure while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off, and refuses the change while the flag is on. It reads the flag in the model of the specification that it gives the check.",
      "Если этот элемент — объект, у которого `onFailure` равно `reported`, правило говорит, что о неудаче проверки только сообщается. Если `onFailure` этого элемента равно `reportedUnlessStrict`, `sheriff validate` сообщает о неудаче проверки, пока флаг `strict` спецификации (§s-q3pfzyaxvpr2zj2) выключен, и отвергает изменение, пока флаг включён. Флаг он читает в модели спецификации, которую передаёт проверке.",
      "Первое предложение — как в согласованной формулировке. Новое: значение `reportedUnlessStrict`. Почему: по правилу 10.7 правило собственных guidelines проекта может сделать проверку строже, пока флаг `strict` включён, и его второй пример — именно собственная проверка, которая при включённом флаге отвергает коммит там, где иначе только сообщила бы. Прежде правило, перечисляющее проверку, не могло этого сказать: `sheriff validate` брал «сообщить или отвергнуть» только из `onFailure`. Решает по-прежнему это правило, а не инструменты SpecSheriff, как вы постановили 2026-11-04 по правилу 10.8; поэтому проверка с `reported` и при включённом флаге только сообщает. Флаг берётся из модели, которую получает проверка, чтобы `sheriff validate --strict` и запуск перед включением флага отвергали такую неудачу."));
  const settings = at(parts, "Before `sheriff settings` records an approval of the specification");
  parts[settings] = P(
    "Before `sheriff settings` records an approval of the specification (§s-m59dqwkw2e96wne), it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on (§s-nxgkp988mej79eg), it runs the project's own checks as `sheriff validate --strict` runs them.",
    "Прежде чем внести одобрение спецификации (§s-m59dqwkw2e96wne), `sheriff settings` запускает собственные проверки проекта (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). Она передаёт им модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают записи в `sheriff.config.json`. Прежде чем включить флаг `strict` (§s-nxgkp988mej79eg), `sheriff settings` запускает собственные проверки проекта так, как их запускает `sheriff validate --strict`.",
    "Как в согласованной формулировке; ссылки ведут теперь и на узлы группы 6 о процедурах одобрения спецификации и включения флага, которые эти запуски описывают целиком, а ссылка на правило 10.7 перенесена к первому упоминанию флага выше.");
  const refs = base.proposal.refs.map((r) => (r.to === "s-q3pfzyaxvpr2zj2" ? R("implements", r.to) : { ...r }));
  for (const to of [SID.approveSpec, SID.strict]) refs.push(R("cites", to));
  add("proposal:s-7pk89t8z6wymmj9-g6", {
    question: "None: carries out rule 10.7 and its second example, under the owner's ruling of 2026-11-04 on rule 10.8 that the rule listing a check decides whether its failure is refused or reported",
    base: "s-7pk89t8z6wymmj9",
    location: base.location,
    sidValue: base.sidValue,
    change: "Добавлено значение `onFailure`: `reportedUnlessStrict` — о неудаче проверки сообщается, пока флаг `strict` выключен, а при включённом флаге `sheriff validate` отвергает изменение. Флаг берётся из модели, которую получает проверка, так что `sheriff validate --strict` и запуск перед включением флага такую неудачу отвергают. Почему: правило 10.7 позволяет правилу собственных guidelines проекта сделать проверку строже, пока флаг включён, и его второй пример описывает именно такую собственную проверку; прежде это нельзя было выразить. Решает правило, которое перечисляет проверку, а не инструменты SpecSheriff, как вы постановили 2026-11-04 по правилу 10.8: проверка с `reported` и при включённом флаге только сообщает, как говорит стоимость строки 10.1.37. Абзац о списке разделён: всё об `onFailure` — в одном абзаце. Ссылки на правило 10.7 и на узлы о процедурах `sheriff settings` поставлены там, где узел впервые о них говорит. Добавлен пример. Остальная формулировка — как вы согласовали.",
    proposal: {
      title: base.proposal.title,
      ruTitle: base.proposal.ruTitle,
      parts,
      reason: base.proposal.reason,
      ruReason: base.proposal.ruReason,
      reasonChange: AS_AGREED,
      examples: [
        ...base.proposal.examples.map((x) => ({ ...x })),
        X("The member of the check `spelling` is `{\"name\": \"spelling\", \"onFailure\": \"reportedUnlessStrict\"}`. While the `strict` flag is off, `sheriff validate` reports each misspelt word, and the commit passes. An owner runs `sheriff settings strict on`, and the check fails when `sheriff validate --strict` runs it, so `sheriff settings` refuses to turn the flag on and names `sheriff validate --strict`. The most likely mistake is to read the flag from the entries in `sheriff.config.json` rather than from the model that the check receives. The flag is then turned on, and the next commit is refused.",
          "Элемент проверки `spelling` — `{\"name\": \"spelling\", \"onFailure\": \"reportedUnlessStrict\"}`. Пока флаг `strict` выключен, `sheriff validate` сообщает о каждом слове с опечаткой, и коммит проходит. Ответственный запускает `sheriff settings strict on`, и проверка не проходит, когда её запускает `sheriff validate --strict`, поэтому `sheriff settings` отказывается включить флаг и называет `sheriff validate --strict`. Самая вероятная ошибка — читать флаг из записей в `sheriff.config.json`, а не из модели, которую получает проверка. Тогда флаг включается, и следующий коммит отвергается."),
      ],
      refs,
      removed: [],
      date: DATE,
    },
    stage3: "validate.ts (projectChecks) is to read onFailure: reportedUnlessStrict as reported where the model that it gives the check has the strict flag off, and as refused where the flag is on, including under sheriff validate --strict. The schema of the members of the listing rule, if node.schema.json or the project's extension gives one, is to admit the value. A test for each of the two cases is written first and carries s-7pk89t8z6wymmj9.",
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// The nodes a link may point to: the new form, the appendix of the tools, the sids the drafts give.
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
for (const e of Object.values(entries)) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (drafts[e.base]?.sidValue !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}
for (const sid of entries["new:tools-11-section"].order) if (!Object.values(entries).some((e) => e.sidValue === sid)) problems.push(`the section orders ${sid}, which no draft of the group gives`);

// The new sids: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
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
  if (new Set(Object.values(SID)).size !== Object.values(SID).length) problems.push("two new nodes share a sid");
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const isSection = e.kind === "section";
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  // A `cites` link that a decision of the node still cites stays (the brief, "Citations"): the decisions that the node
  // keeps in tools.json, and those that move into a new node in stage 3.
  const decisions = JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? []);
  const citedByDecisions = new Set([...citedIn(decisions), ...(movedDecisionsCite[key] || [])]);
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
  if (!isSection && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  // Each part says the same in both languages as far as code goes: the same text in backticks.
  for (const x of p.parts) {
    // Each distinct piece of code appears in both languages; the Russian may say «он» where the English repeats a command.
    const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  }
  for (const x of p.examples || []) {
    const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  }
  if (!isSection && !key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!isSection && !e.stage3) problems.push(`${key}: no stage3`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}
// The phrases the agreed drafts avoid. The fingerprint node names `declaredIn` as the name an earlier release wrote.
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/];
  if (key !== "new:tools-11-fingerprint" && key !== "proposal:s-gb8s9657a65hqmv-g6") bad.push(/\bdeclaredIn\b/);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "");
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
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
// No key outside the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group6.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 6: the English of every node",
  "",
  "This file holds the final English of every node of group 6 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group6.mjs: the drafts of items 48 to 50 of the appendix of the tools, which describe how an approval is recorded, the settings that only an owner of the specification changes, and setting a repository up and taking SpecSheriff out of it. It also holds the two proposals of the group, each a complete new wording of an agreed draft that the group's subject exposes.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group6.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("new:")) md.push(`A new ${e.kind === "section" ? "section" : "node"}, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed draft \`${e.base}\`, the node ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group6.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
