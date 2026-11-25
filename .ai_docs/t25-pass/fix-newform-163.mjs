// A fresh reviewer of 2026-11-10 consolidated `review-11-13.md`'s "Section 11", now section 9 "Tests and code", with the day's rulings (its report appended there).
// Applied in one go: drafts for 9.1, 9.3 and 9.9, which stood as moved; 9.7 split into the code (keeps its sid) and the tests (new sid); 9.9 split into the
// implementation (keeps s-6fw72j65jkqrfpf) and the exemption (new sid); every title names its matter (7.4); pairs joined by "or" are lists (7.6); 9.3 keeps only
// what is its own, the rest retold 1.5.2, the test's SpecTag and the schema. The section is ordered general to particular, tests before code, as the reviewer gives:
// 9.1, 9.9A, 9.2, 9.5, 9.4, 9.7B, 9.6, 9.7A, 9.8, 9.3, 9.9B become 9.1 to 9.11. 9.2's text is the reviewer's "if kept"; whether it goes is the owner's doubt.
import fs from "node:fs";
import path from "node:path";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const expect = { "9.2": "s-zg6bvg7jrcpu8vf", "9.4": "s-qxpqtnbgmydusx2", "9.5": "s-8xw4mgvpexyvw5q", "9.6": "s-ezq67wu75updp98", "9.7": "s-9j2mmnuuwmx5ksn", "9.8": "s-ef93u6cnbs2sevr" };
for (const [k, s] of Object.entries(expect)) if (d[k]?.sidValue !== s || d[k].agreed) throw new Error(`unexpected draft ${k}`);
if (d["9.1"] || d["9.3"] || d["9.9"] || d["9.10"]) throw new Error("unexpected drafts for 9.1, 9.3, 9.9");

// Two new sids, drawn as assign-sids.mjs draws them.
const specs = decodeURIComponent(new URL("../../specs/", here).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const taken = new Set(Object.values(d).map((v) => v.sidValue));
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (e.name.endsWith(".json")) for (const m of fs.readFileSync(p, "utf8").matchAll(/"sid":\s*"(s-[a-z0-9]{15})"/g)) taken.add(m[1]);
  }
})(specs);
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const draw = () => { for (;;) { let s = "s-"; for (let i = 0; i < 15; i++) s += ALPHABET[randomInt(ALPHABET.length)]; if (!taken.has(s)) return taken.add(s), s; } };
const sidTests = draw(), sidExempt = draw();

const n = {};
n["9.1"] = {
  from: "3.1", sid: "kept", sidValue: "s-hheus6f395ynqvc",
  title: "What counts as the system's code", ruTitle: "Что считается кодом системы",
  text: "The system's code is the code implementing the specification outside its guidelines, and the tests verifying that code. The implementing code includes code written by hand and code generated from the specification's nodes.\n\nThe repository's configuration, its own tools and the tests of those tools are not the system's code. A project's own checks and generators are among those tools (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze). Whether a file is the system's code is decided by where it lives.",
  ruText: "Код системы — это код, реализующий спецификацию вне её guidelines, и тесты, проверяющие этот код. Реализующий код включает код, написанный вручную, и код, сгенерированный из узлов спецификации.\n\nКонфигурация репозитория, его собственные инструменты и тесты этих инструментов кодом системы не являются. Собственные проверки и генераторы проекта входят в число этих инструментов (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze). Относится ли файл к коду системы, решает то, где он лежит.",
  reason: "The rules binding code to the specification need a line between the system's code and what serves the work on the system. A rule counts as implemented only by its code and a passing test together (§s-6fw72j65jkqrfpf), so the tests are on the side of the code. Where a file lives is the same to every check, so it draws that line.",
  ruReason: "Правилам, связывающим код со спецификацией, нужна граница между кодом системы и тем, что обслуживает работу над системой. Правило считается реализованным только своим кодом вместе с проходящим тестом (§s-6fw72j65jkqrfpf), поэтому тесты находятся на стороне кода. Место файла одинаково для каждой проверки, поэтому оно и проводит эту границу.",
  changes: ["Заголовок новый: говорит, о чём узел.", "Текст и обоснование нынешнего 3.1 приведены рецензентом к правилам раздела 7.", "Рядом со ссылкой на собственные генераторы проекта добавлена ссылка на собственные проверки: первая говорит только о генераторах.", "Обоснование сокращено, но говорит, зачем нужна граница и почему тесты на стороне кода.", "Сохраняет sid нынешнего 3.1."],
};
n["9.2"] = {
  from: "3.6", sid: "kept", sidValue: "s-6fw72j65jkqrfpf",
  title: "The implementation of an approved rule", ruTitle: "Реализация одобренного правила",
  text: `While the specification is approved, every approved rule is implemented. So is every approved node of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2). Such a rule or node is implemented when both hold:\n- a symbol of the system's code carries its SpecTag;\n- a test carries its SpecTag and passes.\n\nA SpecTag or a test naming a rule that implements such a rule or node counts for it. The implementing rule may implement it directly or through rules that implement those in turn.\n\nThe requirement to be implemented does not hold for:\n- the rules of the SpecSheriff guidelines;\n- the rules of the project's own guidelines;\n- the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);\n- a rule or node exempted from being implemented (§${sidExempt}).`,
  ruText: `Пока спецификация одобрена, каждое одобренное правило реализовано. Так же и каждый одобренный узел собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2). Такое правило или узел реализованы, когда выполняется и то, и другое:\n- символ кода системы связан с ним SpecTag;\n- тест связан с ним SpecTag и проходит.\n\nSpecTag или тест, называющие правило, которое реализует такое правило или узел, засчитываются ему. Реализующее правило может реализовывать его напрямую или через цепочку правил, в которой каждое реализует предыдущее.\n\nТребование быть реализованным не распространяется на:\n- правила SpecSheriff guidelines;\n- правила собственных guidelines проекта;\n- описания недостатков в техническом долге (§s-2r7k2aeyusgy6fw);\n- правило или узел, освобождённые от реализации (§${sidExempt}).`,
  reason: "An approved rule the system's code does not carry out leaves the specification stating what does not hold of the system. Only a symbol and a passing test together show by a check that the code does what the rule says. The guidelines and the technical debt state nothing the system's code must do.",
  ruReason: "Одобренное правило, которого код системы не выполняет, оставляет спецификацию утверждать то, что о системе неверно. Только символ и проходящий тест вместе показывают проверкой, что код делает то, что говорит правило. Guidelines и технический долг не говорят ничего, что должен делать код системы.",
  changes: ["Нынешний 3.6 разделён: здесь реализация одобренного правила, освобождение от реализации — отдельный узел 9.11.", "Добавлено «пока спецификация одобрена»: без этого текст противоречил согласованному 1.3.2.", "«Правила технического долга» → «описания недостатков в техническом долге», по согласованному 4.4.", "«NodeKind» → «собственный тип в проекте», по вашему решению; исключения списком.", "Заголовок новый: говорит, о чём узел.", "Сохраняет sid нынешнего 3.6."],
};
n["9.3"] = Object.assign(d["9.2"], {
  title: "Reading a top-level section before its implementation", ruTitle: "Чтение раздела верхнего уровня до его реализации",
  text: "One of the owners of a top-level section of the base specification reads it whole before its implementation begins.",
  ruText: "Один из ответственных за раздел верхнего уровня базовой спецификации прочитывает его целиком до начала его реализации.",
});
n["9.3"].changes = [...n["9.3"].changes, "По рецензенту: у правила появилось подлежащее, один из ответственных; «проверяется» → «прочитывает», чтобы не путать с проверкой коммита рецензентом. Заголовок больше не повторяет текст."];
n["9.4"] = Object.assign(d["9.5"], {
  title: "A test's SpecTag", ruTitle: "SpecTag теста",
  text: "Every test of the system's code carries the SpecTag of the node it is written from, where a run of the tests reports it. That node is one of these:\n- a rule;\n- a node of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2).\n\nFor a test's reference to its rule (§s-nrjxfvpkq3m8hzm), such a node of a project's own kind counts as a rule.",
  ruText: "Каждый тест кода системы связан SpecTag с узлом, из которого он написан, и SpecTag стоит там, где о нём сообщает запуск тестов. Этот узел — одно из следующего:\n- правило;\n- узел собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2).\n\nДля ссылки теста на своё правило (§s-nrjxfvpkq3m8hzm) такой узел собственного типа считается правилом.",
  reason: "A test verifies that the code carries out what a node requires. A term only introduces an entity, so it holds no behaviour to verify. A section requires nothing (§s-7445ahgjck2aefg). Reported by a run of the tests, the SpecTags make the run itself a report of which rules are verified.",
  ruReason: "Тест проверяет, что код выполняет то, что требует узел. Термин только вводит сущность, поэтому в нём нет поведения, которое можно проверить. Раздел ничего не требует (§s-7445ahgjck2aefg). Когда о SpecTag сообщает запуск тестов, сам запуск становится отчётом о том, какие правила проверены.",
});
n["9.4"].changes = [...n["9.4"].changes, "По рецензенту: «каждый тест кода системы», потому что тесты собственных инструментов SpecTag не несут; где стоит SpecTag теста, перенесено сюда из нынешнего 3.3; два вида узла списком.", "Узел собственного типа — только тот, которому требуется имплементация кода, и для ссылки теста на своё правило он считается правилом, как требует согласованный 1.4.2.", "Обоснование ссылается на 8.1, где сказано, что раздел ничего не требует. Заголовок новый."];
n["9.5"] = Object.assign(d["9.4"], {
  title: "A test for code a commit changes", ruTitle: "Тест для кода, который меняет коммит",
  text: "A rule has at least one test where a commit adds or changes the code written for it. So does a node of a project's own kind that requires an implementation in code. Code generated from a node needs no test of its own.",
  ruText: "У правила есть хотя бы один тест, если коммит добавляет или меняет код, написанный для него. Так же и у узла собственного типа в проекте, которому требуется имплементация кода. Коду, сгенерированному из узла, собственный тест не нужен.",
  reason: "A rule whose code has no test is carried out on trust. A change to that code is when a test costs least to write. Code generated from a node is already held by every commit to what the node produces (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
  ruReason: "Правило, у кода которого нет теста, выполняется на доверии. Изменение этого кода — момент, когда тест дешевле всего написать. Код, сгенерированный из узла, и так каждый коммит держит в соответствии с тем, что даёт узел (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
});
n["9.5"].changes = n["9.5"].changes.map((c) => c.replace("К ссылке на 11.1 добавлена ссылка на 11.2, где сказано об ожидании.", "К ссылке на 10.1 добавлена ссылка на 10.2, где сказано об ожидании."));
n["9.5"].changes.push("По рецензенту: слова 8.3, «требуется имплементация кода»; из обоснования убрано «отклоняется там, где его делают»: это требование, а обоснование требований не ставит. Заголовок новый.");
n["9.6"] = {
  from: "3.4", sid: "new", sidValue: sidTests,
  title: "Which tests must name an approved node", ruTitle: "Какие тесты обязаны называть одобренный узел",
  text: "A test a commit adds or changes carries the SpecTag of an approved node it is written from (§s-8xw4mgvpexyvw5q). Rewriting a test's reference to its node into another form that names the same node changes no test.",
  ruText: "Тест, который коммит добавляет или меняет, связан SpecTag с одобренным узлом, из которого он написан (§s-8xw4mgvpexyvw5q). Переписать ссылку теста на его узел в другую форму, называющую тот же узел, — не значит изменить тест.",
  reason: "A rule under revision is a draft while the tests written against its earlier wording still stand. So only a test a commit adds or changes must name an approved node. A reference rewritten into another form names the same node, so it holds the test to nothing new.",
  ruReason: "Правило на пересмотре остаётся черновиком, пока стоят тесты, написанные по его прежней формулировке. Поэтому называть одобренный узел обязан только тест, который коммит добавляет или меняет. Ссылка, переписанная в другую форму, называет тот же узел, поэтому не предъявляет к тесту ничего нового.",
  changes: ["Новый узел: рецензент выделил тесты из узла о том, что обязано называть одобренный узел, потому что символ и тест проверяются порознь.", "Текст — абзац 4 нынешнего 3.4; ссылка на SpecTag теста ведёт в 9.4.", "Обоснование — о тестах из обоснования нынешнего 3.4.", "Новый sid."],
};
n["9.7"] = Object.assign(d["9.6"], {
  title: "The SpecTag of technical code", ruTitle: "SpecTag технического кода",
  text: "A symbol of technical code (§s-2jcmb9xe9d64t2t) carries a SpecTag that names no node and gives its reason.",
  ruText: "На символе технического кода (§s-2jcmb9xe9d64t2t) стоит SpecTag, который не называет никакого узла и даёт свою причину.",
  reason: "Technical code exists because of how the system is built, not because of what it does. So there is no rule for its SpecTag to name. Demanding one teaches people to attach whichever sid is nearest. A SpecTag naming no node keeps 'nobody gave it a SpecTag' apart from 'there is nothing for a SpecTag to name'.",
  ruReason: "Технический код существует из-за того, как построена система, а не из-за того, что она делает. Поэтому у его SpecTag нет правила, которое тот мог бы назвать. Требование такого правила приучает ставить ближайший попавшийся sid. SpecTag, не называющий узла, отделяет «никто не поставил ему SpecTag» от «SpecTag нечего называть».",
});
n["9.7"].changes = [...n["9.7"].changes, "По решению о пересказе: согласованный 1.2.7 уже определяет технический код с этими примерами, а 1.5.2 требует SpecTag, который об этом говорит. Здесь осталась только форма такого SpecTag. Заголовок новый."];
n["9.8"] = Object.assign(d["9.7"], {
  title: "Which code must name an approved node", ruTitle: "Какой код обязан называть одобренный узел",
  text: "Only a symbol whose code a commit changes must name an approved node. A change to its SpecTags is a change to its code. These change no code:\n- rewording the rest of its comments;\n- moving a citation onto another sid;\n- renaming an identifier everywhere it is spelled.",
  ruText: "Называть одобренный узел обязан только символ, код которого коммит меняет. Изменение его SpecTag — это изменение его кода. Код не меняют:\n- переформулировка остальных его комментариев;\n- перенос ссылки на другой sid;\n- переименование идентификатора везде, где он написан.",
  reason: "A rule under revision is a draft while the code written against its earlier wording still stands. So only code a commit changes can be held to an approved node. A SpecTag counts as code because it decides which node the code is held to.",
  ruReason: "Правило на пересмотре остаётся черновиком, пока стоит код, написанный по его прежней формулировке. Поэтому к одобренному узлу можно привязать только код, который меняет коммит. SpecTag считается кодом, потому что он решает, какому узлу должен соответствовать код.",
});
n["9.8"].changes = ["Текст — абзац 3 нынешнего 3.5 и вторая фраза абзаца 2 нынешнего 3.4; три случая, которые не меняют кода, списком.", "Узел разделён рецензентом: символ и тест проверяются порознь. Здесь код, тесты — в 9.6.", "Обоснование — о коде из обоснования нынешнего 3.5.", "Заголовок новый: прежний повторял текст."];
n["9.9"] = Object.assign(d["9.8"], {
  title: "The nodes a commit's message names", ruTitle: "Узлы, которые называет сообщение коммита",
  text: "The message of every commit that changes code names, by its sid, each approved node whose implementation the commit adds or changes. This covers:\n- a node whose text has just changed;\n- an existing node the code contradicted.\n\nOutside the tests, every SpecTag on a symbol the commit adds or changes is one of these:\n- a SpecTag naming a node the commit's message names;\n- the SpecTag that names no node (§s-ezq67wu75updp98).\n\nThe message names no section.",
  ruText: "Сообщение каждого коммита, меняющего код, называет по sid каждый одобренный узел, реализацию которого коммит добавляет или меняет. Сюда входят:\n- узел, текст которого только что изменился;\n- существующий узел, которому код противоречил.\n\nВне тестов каждый SpecTag на символе, который коммит добавляет или меняет, — одно из следующего:\n- SpecTag, называющий узел, который называет сообщение коммита;\n- SpecTag, не называющий никакого узла (§s-ezq67wu75updp98).\n\nСообщение не называет ни одного раздела.",
  reason: "The message tells the reader of the history and the reviewer (§s-nyh9yk22ba6g77q) which nodes a change to the code carries out. Checked against the SpecTags on the changed code, it cannot leave one out. A section requires nothing (§s-7445ahgjck2aefg), so no change carries one out.",
  ruReason: "Сообщение говорит читающему историю и рецензенту (§s-nyh9yk22ba6g77q), какие узлы выполняет изменение кода. Сверенное со SpecTag на изменённом коде, оно не может пропустить ни одного из них. Раздел ничего не требует (§s-7445ahgjck2aefg), поэтому никакое изменение его не выполняет.",
});
n["9.9"].changes = [...n["9.9"].changes, "По рецензенту: подлежащее — сообщение коммита; два вида SpecTag списком; обоснование говорит, зачем сообщение сверяется со SpecTag, и ссылается на 8.1. Заголовок новый: прежний повторял текст."];
n["9.10"] = {
  from: "3.3", sid: "kept", sidValue: "s-rwqzepmrt77rv35",
  title: "A node's lists of its code and its tests", ruTitle: "Списки кода и тестов узла",
  text: "A node's `meta.code` and `meta.tests` are written by hand. They list exactly the code and the tests that carry the node's SpecTag.",
  ruText: "`meta.code` и `meta.tests` узла пишутся вручную. Они перечисляют ровно тот код и те тесты, которые связаны SpecTag с этим узлом.",
  reason: "A reader who has a node open sees from these lists what implements it and what tests it. A list that differed from the SpecTags would mislead that reader.",
  ruReason: "Читатель, открывший узел, видит из этих списков, что его реализует и что его проверяет. Список, расходящийся со SpecTag, вводил бы этого читателя в заблуждение.",
  changes: ["Заголовок новый: говорит, о чём узел.", "По вашему решению о пересказе убрано то, что уже сказано в другом месте: SpecTag на коде (1.5.2), SpecTag на тесте (9.4) и описание списков, которое держит схема. «Три» убрано: в тексте нет количеств (7.12).", "Осталось своё: списки пишутся вручную и перечисляют ровно то, что связано SpecTag с узлом.", "Сохраняет sid нынешнего 3.3."],
};
n["9.11"] = {
  from: "3.6", sid: "new", sidValue: sidExempt,
  title: "Exempting a rule from being implemented", ruTitle: "Освобождение правила от реализации",
  text: "A node of the project's own guidelines exempts a rule, or a node of a project's own kind, from being implemented. It does so by a link of type `exempts` (§s-sn6au3vcr9uy5pm) to one of these:\n- that rule or node;\n- a section it is in.\n\nThe exempting node gives the reason in its own text.",
  ruText: "Узел собственных guidelines проекта освобождает от реализации правило или узел собственного типа в проекте. Он делает это связью типа `exempts` (§s-sn6au3vcr9uy5pm), ведущей к одному из следующего:\n- к этому правилу или узлу;\n- к разделу, в котором оно находится.\n\nОсвобождающий узел приводит причину в своём собственном тексте.",
  reason: "A rule the system's code cannot carry out, or that no test can verify, would be reported for as long as it stands. Made a node, the exemption and its reason are approved as any node is (§s-67vekyup7y8smap).",
  ruReason: "Правило, которое код системы не может выполнить или которое не может проверить ни один тест, было бы в отчёте, пока оно существует. Будучи узлом, освобождение вместе с причиной одобряется так же, как любой узел (§s-67vekyup7y8smap).",
  changes: ["Новый узел: абзац 4 нынешнего 3.6 об освобождении от реализации, выделенный рецензентом.", "Цели связи `exempts` списком; кто одобряет освобождение — ссылкой на 1.3.4.", "Заголовок новый.", "Новый sid."],
};

// The drafts: section 9's keys replaced, in the new order, where the first of them stood.
const out = {};
let placed = false;
for (const [k, v] of Object.entries(d)) {
  if (/^9\.\d+$/.test(k)) {
    if (!placed) { for (let i = 1; i <= 11; i++) out[`9.${i}`] = n[`9.${i}`]; placed = true; }
    continue;
  }
  out[k] = v;
}
if (Object.keys(out).length !== Object.keys(d).length + 5) throw new Error("drafts miscounted");
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");

// The page: section 9's rows rebuilt in the new order; highlights naming old numbers follow.
const map = { "9.1": "9.1", "9.2": "9.3", "9.3": "9.10", "9.4": "9.5", "9.5": "9.4", "9.6": "9.7", "9.7": "9.8", "9.8": "9.9", "9.9": "9.2" };
const isRow = (s) => /^\["[0-9.]+","(split|part|move|same|new)"/.test(s);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const old = {};
let first = -1, last = -1, indent = "";
lines.forEach((l, i) => {
  const s = l.trim();
  const m = s.match(/^\["(9\.\d+)",/);
  if (m) { old[m[1]] = JSON.parse(s.replace(/,$/, "")); if (first < 0) { first = i; indent = l.slice(0, l.indexOf("[")); } last = i; }
});
if (Object.keys(old).length !== 9 || last - first !== 8) throw new Error("unexpected section 9 rows");
const r = (k, num, type, ru, more) => { const row = [...old[k]]; row[0] = num; if (type) row[1] = type; if (ru) row[5] = ru; if (more) more(row); if (Array.isArray(row[8])) row[8] = row[8].map((h) => map[h] ?? h); return row; };
const rows = [
  r("9.1", "9.1"),
  r("9.9", "9.2", "split"),
  r("9.2", "9.3", null, "уходит сюда: Чтение раздела верхнего уровня до его реализации"),
  r("9.5", "9.4", null, null, (row) => { row[4] = "A test's SpecTag"; row[5] = "SpecTag теста"; }),
  r("9.4", "9.5", null, "уходит сюда: Тест для кода, который меняет коммит"),
  ["9.6", "part", 0, "3.4", "part of 3.4: The test comes before the code", "уходит сюда: Какие тесты обязаны называть одобренный узел"],
  r("9.6", "9.7", null, "уходит сюда: SpecTag технического кода"),
  r("9.7", "9.8", null, "уходит сюда: Какой код обязан называть одобренный узел"),
  r("9.8", "9.9", null, "уходит сюда: Узлы, которые называет сообщение коммита"),
  r("9.3", "9.10"),
  ["9.11", "part", 0, "3.6", "part of 3.6: An approved rule is implemented or exempted", "уходит сюда: Освобождение правила от реализации"],
];
const rowsBlock = rows.map((row) => indent + JSON.stringify(row) + ",");
lines.splice(first, 9, ...rowsBlock);
for (let i = 0; i < lines.length; i++) {
  if (i >= first && i < first + rows.length) continue;
  const s = lines[i].trim();
  if (!isRow(s)) continue;
  const comma = s.endsWith(",");
  const row = JSON.parse(comma ? s.slice(0, -1) : s);
  if (!Array.isArray(row[8]) || !row[8].some((h) => map[h] && map[h] !== h)) continue;
  row[8] = row[8].map((h) => map[h] ?? h);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
fs.writeFileSync(pagePath, lines.join("\n"));
for (let i = 1; i <= 11; i++) console.log(`9.${i}`, out[`9.${i}`].sidValue, out[`9.${i}`].title);
