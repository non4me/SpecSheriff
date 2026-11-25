// The fresh reviewer of the drafted table 10.1 (2026-11-11), its fixes: rows heading for the right part of the
// extension Domains; paragraph 2 saying what a check reads as the commit (staged, or the working tree); one thought
// to a sentence in rows 12, 14, 16, 24, 47, 49, 51 and the reason; the words of agreed nodes (2.4 "uses", 1.3.3
// "while an approval stands", 2.5 in Russian, «находится», «помечен»); rows 9, 10, 46, 62, 63, 65; the ruling that a
// rule of a project's own kind is a rule; the rows of `overrides` (agreed 6.1, 12.1.2). Rows 40 and 41 and the
// project's guidelines' link (agreed 2.3) stay open for the owner.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const row = (n) => { const r = rows.find((r) => r.n === n); if (!r) throw new Error(`no row ${n}`); return r; };
const set = (n, fields, change) => { const r = row(n); Object.assign(r, fields); if (change) r.change = r.change === "без изменений" ? change : `${r.change} ${change}`; };

t.ruTitle = "Таблица проверок и цена непрохождения каждой из них";
t.intro[0].en = "Every check, with what its failure costs, is a row of the tables below. Wherever a row speaks of a rule, a rule of a project's own kind is included.";
t.intro[0].ru = "Каждая проверка вместе с ценой её непрохождения — строка таблиц ниже. Где строка говорит о правиле, правило собственного типа в проекте тоже входит.";
t.intro[0].change += " По рецензенту: «правило» включает правило собственного типа в проекте, по вашему решению от 11 ноября; «отказ» стал «непрохождением», как в согласованном 1.6.1.";
t.intro[1].en = "Each check reads one of these, as the commit being made:\n- at a commit, what is staged;\n- after an agent's edit, the working tree.\n\nIt also reads the history behind it where its row says so. It reads nothing else.";
t.intro[1].ru = "Каждая проверка читает как создаваемый коммит одно из следующего:\n- при коммите — то, что подготовлено к нему (staged);\n- после правки агента — рабочее дерево.\n\nИсторию за ним она читает там, где так сказано в её строке. Больше она ничего не читает.";
t.intro[1].change = "Было «Each check reads the commit being made…»: после правки агента коммита ещё нет. По рецензенту: проверка читает как создаваемый коммит то, что подготовлено к коммиту, или, после правки агента, рабочее дерево (описание инструментов, узел 6); `validate` читает все файлы, а не только разницу.";
t.reason.en = "A person asking whether a commit will go through must find the whole answer in one place. Spread across several rules, the answer comes apart. One rule then ends up contradicting another without anybody seeing it.";
t.reason.ru = "Человек, который спрашивает, пройдёт ли коммит, должен найти весь ответ в одном месте. Разнесённый по нескольким правилам, ответ распадается. Тогда одно правило начинает противоречить другому, а никто этого не видит.";

set(2, { en: "Every file of the specification and of its archive matches its schema", ru: "Каждый файл спецификации и её архива соответствует своей схеме" }, "По рецензенту: назван файл чего (7.8).");
set(6, { ru: "Каждый узел термина находится в contracts" }, "В русском «находится», по вашей поправке от 5 ноября.");
set(9, { en: "Every node outside the SpecSheriff guidelines a project uses, a section left out, is approved only while an approval stands for its present wording", ru: "Каждый узел вне SpecSheriff guidelines, которые использует проект, кроме раздела, одобрен, только пока в силе одобрение его нынешней формулировки" }, "По рецензенту: «uses», как в согласованных 2.4 и 1.3.7; «пока в силе одобрение нынешней формулировки», как в согласованном 1.3.3, вместо «отпечатка», который нигде не объяснён.");
set(10, { en: "Each approval added in a commit names one of the owners of its node, as that commit holds them", ru: "Каждое одобрение, добавленное в коммите, называет одного из ответственных за его узел, какими их держит этот коммит" }, "«Recorded» стало «added»: проверяются только одобрения, которые добавляет коммит.");
set(12, { en: "A node removed in a commit, outside the SpecSheriff guidelines a project uses, is deleted where it is a section or no approval of it was ever given. Otherwise it stands in the archive with the reason for its removal", ru: "Узел, удалённый из спецификации в коммите, вне SpecSheriff guidelines, которые использует проект, удаляется окончательно, если это раздел или если одобрение ему ни разу не давалось. Иначе он находится в архиве с причиной своего удаления" }, "Две фразы вместо одной (7.5); «uses» и русский — слова согласованного 2.5.");
set(14, { en: "A node citing another holds a link to it. A link of type `cites` stands only where its node cites the node it names and holds no link of another type to it", ru: "Узел, ссылающийся на другой, держит связь с ним. Связь типа `cites` стоит, только если её узел ссылается на узел, который она называет, и не держит к нему связи другого типа" }, "Две фразы вместо одной (7.5).");
set(16, { en: "A `term-relation` or a `uses` link binds two terms. No other type of link, `cites` included, binds two terms", ru: "Связь `term-relation` или `uses` связывает два термина. Никакой другой тип связи, включая `cites`, не связывает двух терминов" }, "Две фразы вместо одной (7.5).");
for (const n of [20, 23, 25]) set(n, { fate: "to 12.2 Domains" }, "По рецензенту: в 12.2 «Домены: деление на домены».");
set(22, { fate: "to 12.4 Domains" }, "По рецензенту: в 12.4 «Домены: уровни».");
set(24, { en: "An `exempts` link goes from a node of the project's own guidelines to a rule or a section. The text of a node holding an `exempts` link cites that link's target", ru: "Связь `exempts` идёт от узла собственных guidelines проекта к правилу или разделу. Текст узла со связью `exempts` ссылается на цель этой связи" }, "Две фразы: иначе «на которые ссылается текст» относилось бы к одному разделу.");
set(44, { ru: "Каждый символ кода системы вне его тестов связан SpecTag с правилом, которое он реализует, или, если он не реализует логики системы, помечен SpecTag, который говорит об этом" }, "В русском «помечен» вместо «несёт», по вашей поправке.");
set(46, { en: "A commit in which the specification goes back to draft holds a withdrawal, by one of the specification's owners, of the approval of the rule stating that the specification is approved", ru: "Коммит, в котором спецификация возвращается в черновик, содержит сделанный одним из ответственных за спецификацию отзыв одобрения правила, утверждающего, что спецификация одобрена" }, "По рецензенту: коммит содержит отзыв, а не человека; правило утверждает, что спецификация одобрена, а не одобряет её.");
set(47, { en: "Every SpecTag names a rule that exists. A SpecTag on a symbol changed in a commit names an approved rule", ru: "Каждый SpecTag называет существующее правило. SpecTag на символе, изменённом в коммите, называет одобренное правило" }, "Две фразы вместо одной (7.5).");
set(49, { en: "Every test of the system's code carries the SpecTag of a rule that exists. A test of the system's code added or changed in a commit carries the SpecTag of an approved rule", ru: "Каждый тест кода системы связан SpecTag с существующим правилом. Тест кода системы, добавленный или изменённый в коммите, связан SpecTag с одобренным правилом" }, "Две фразы вместо одной (7.5).");
set(51, { en: "Every test of a project's own check carries the SpecTag of the rule listing that check. A test of a project's own check added or changed in a commit carries the SpecTag of an approved rule", ru: "Каждый тест собственной проверки проекта связан SpecTag с правилом, которое перечисляет эту проверку. Тест собственной проверки проекта, добавленный или изменённый в коммите, связан SpecTag с одобренным правилом" }, "Две фразы вместо одной (7.5).");
set(62, { en: "The tests and the code of a rule do not lag behind its text, nor its code behind its tests, as the history of the repository shows", ru: "Тесты и код правила не отстают от его текста, а код — от его тестов, как показывает история репозитория" }, "По рецензенту: строка говорит, что должно выполняться, а не называет сбой (7.3).");
set(63, { en: "An approved rule the system's code must implement (§s-6fw72j65jkqrfpf) is bound to a symbol of the system's code outside its tests and to a test not marked as skipped", cost: "reported by the rule's sid while the specification is approved", ru: "Одобренное правило, которое код системы должен реализовывать (§s-6fw72j65jkqrfpf), связано с символом кода системы вне его тестов и с тестом, не помеченным как пропускаемый", ruCost: "сообщается по sid правила, пока спецификация одобрена" }, "По рецензенту: коммит не видит, проходит ли тест, — это делает строка о тестах при push; проверка ищет тест, не помеченный как пропускаемый.");
set(65, { en: "The code changed in a commit does what the rules it names say, and nothing they do not", cost: "refused, naming the rule and the line", ru: "Код, изменённый в коммите, делает то, что говорят названные им правила, и ничего сверх этого", ruCost: "отклоняется с указанием правила и строки" }, "По рецензенту: назван код, изменённый в коммите (7.8); «узел» стал «правилом» и в цене.");

// The rows of `overrides`, after the row of `exempts`.
const t1 = t.tables.find((g) => g.rows.some((r) => r.n === 24));
const at = t1.rows.findIndex((r) => r.n === 24);
t1.rows.splice(at + 1, 0,
  { n: 67, was: "", en: "An `overrides` link goes from a node of an extension of the guidelines to a main rule", cost: "refused", ru: "Связь `overrides` идёт от узла расширения guidelines к основному правилу", ruCost: "отклоняется", fate: "stays", change: "Новая строка, по согласованным 6.1 и 12.1.2.", rests: ["s-sn6au3vcr9uy5pm", "s-e6stjaxkn44ys4m"] },
  { n: 68, was: "", en: "No node of a project's own guidelines holds an `overrides` link", cost: "refused", ru: "Ни один узел собственных guidelines проекта не держит связи `overrides`", ruCost: "отклоняется", fate: "stays", change: "Новая строка, по согласованному 12.1.2.", rests: ["s-e6stjaxkn44ys4m"] });

t.doubts = [
  "Строка 40 (раздел технического приложения стоит под заголовком раздела верхнего уровня базы) противоречит согласованному 1.1.2: приложение следует структуре базы, только «если она разделена» и «там, где они пересекаются»; проверить по ней нечего. Рекомендую удалить строку.",
  "Строка 41 требует, чтобы правило описания инструментов реализовало (`implements`) правило guidelines, а согласованный 2.2 говорит «связано с». Рекомендую привести строку к 2.2 или 2.2 к строке — нужно ваше решение.",
  "Строка о собственных guidelines проекта: согласованный 2.3 говорит «уточняют или расширяют», а типа связи «расширяет» нет, и инструменты принимают `implements`. Рекомендую в строке оставить только `refines` и привести к этому 2.3.",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("rows", t.tables.flatMap((g) => g.rows).length);
