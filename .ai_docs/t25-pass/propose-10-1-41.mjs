// Proposes the new wording of row 10.1.41 of the main table of checks, as the owner settled it on 2026-11-20 sentence by
// sentence and as the rule reviewer's fixes bring it into line: the first sentence as accepted, with the clause on tests
// expected to fail and the citation of 9.1; the second sentence naming the `implements` link; the scope as a list that
// also covers removed tests, code and links; the cost; a new reason and an example. Records the follow-ups the reviewer
// found in other nodes, and brings the continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const en = {
  text: [
    "An approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf) is bound to a test that is not marked as skipped or as expected to fail and to code of the system other than tests. Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule.",
    "",
    "The check applies only to the approved rules that a commit includes. A commit includes an approved rule where any of the following happens in that commit:",
    "- the rule's approval is added;",
    "- a test or code bound to the rule before or after the commit changes;",
    "- an `implements` link through which a test or code is bound to the rule is removed.",
  ].join("\n"),
  cost: "refused, naming the rule, while the specification is approved; passes while it is a draft",
  example: "The specification is approved. Code and a test not marked as skipped are bound to node N, which has an `implements` link to rule R. That code changes in a commit, so the commit includes R, and R passes. But not: R is refused because no SpecTag names R itself.",
  reason: "An approved rule committed without its test or its code would let the specification state what the system does not do, and nobody would notice. A test run does not count a skipped test, or a failing test expected to fail, as failed. So a rule whose only test is marked in either way would pass this check and the run of the tests while nothing checks the rule. While the specification is a draft, the work is focused on the specification itself, so an approved rule may still lack its test or its code.",
};
const ru = {
  text: [
    "Одобренное правило, которое код системы (§s-hheus6f395ynqvc) должен реализовывать (§s-6fw72j65jkqrfpf), привязано к тесту, не помеченному как пропускаемый или как ожидаемо падающий, и к коду системы помимо тестов. Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с одобренным правилом, напрямую или через цепочку таких связей, тоже считается привязанным к одобренному правилу.",
    "",
    "Проверка относится только к одобренным правилам, которые входят в коммит. Одобренное правило входит в коммит, если в этом коммите происходит одно из следующего:",
    "- добавляется одобрение правила;",
    "- меняется тест или код, привязанный к правилу до коммита или после него;",
    "- удаляется связь `implements`, через которую тест или код привязан к правилу.",
  ].join("\n"),
  cost: "отклоняется с названием правила, пока спецификация одобрена; проходит, пока она черновик",
  example: "Спецификация одобрена. Код и тест, не помеченный как пропускаемый, привязаны к узлу N, у которого есть связь `implements` с правилом R. Этот код меняется в коммите, поэтому R входит в коммит и проходит проверку. Но не так: R отклоняется, потому что ни один SpecTag не называет само правило R.",
  reason: "Одобренное правило, попавшее в коммит без теста или кода, позволило бы спецификации утверждать то, чего система не делает, и никто бы этого не заметил. Прогон тестов не считает упавшим ни пропущенный тест, ни ожидаемо падающий тест, который падает. Поэтому правило, единственный тест которого помечен так, прошло бы и эту проверку, и прогон тестов, хотя правило ничем не проверяется. Пока спецификация — черновик, работа сосредоточена на самой спецификации, поэтому у одобренного правила может ещё не быть теста или кода.",
};

const draftPath = new URL("draft-10-1-41.json", here);
const d = JSON.parse(fs.readFileSync(draftPath, "utf8"));
d.proposed = { en: en.text, cost: en.cost, example: en.example, reason: en.reason, ru: ru.text, ruCost: ru.cost, ruExample: ru.example, ruReason: ru.reason };
d.note += " The rule reviewer's fixes of 2026-11-20 are applied: the scope as a list in which a commit is not the subject of 'changes', removed tests, code and links included, the change of wording dropped as covered by the added approval (1.3.2), tests expected to fail, the citation of 9.1, the cost 'passes while it is a draft', the reason without 'on a push', and an example.";
fs.writeFileSync(draftPath, JSON.stringify(d, null, 2) + "\n");

const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-propose-10-1-41.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
r.proposals = [{
  en: [`What is checked: ${en.text}`, `On failure: ${en.cost}`, `Example: ${en.example}`, `Reason: ${en.reason}`].join("\n\n"),
  ru: [`Что проверяется: ${ru.text}`, `При непрохождении: ${ru.cost}`, `Пример: ${ru.example}`, `Обоснование: ${ru.reason}`].join("\n\n"),
  why: "Первое предложение — как вы приняли, плюс «или как ожидаемо падающий» и ссылка на 9.1. Второе — со связью implements, засчёт в одну сторону. Охват — списком; «меняется формулировка» убрано, потому что переформулированное правило без нового одобрения — черновик (1.3.2); добавлены удалённые тесты, код и связи. Цена: отклоняется, пока спецификация одобрена; проходит, пока черновик. Обоснование и пример новые. Формулировку проверил рецензент правил.",
}];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "The agent drafted the new wording of the whole row in draft-10-1-41.json and gave it to the rule reviewer; the agent will show the row to the owner once the reviewer has reported.",
  "The agent drafted the new wording of the whole row in draft-10-1-41.json, applied the rule reviewer's fixes, and proposed the row to the owner; propose-10-1-41.mjs holds it as the row's proposal in table-10-1.json. The owner's decision is awaited. The reviewer's fixes, each listed for the owner: tests marked as expected to fail count as skipped, since a failing test so marked does not fail a test run; the scope is a list in which the commit is not the subject of \"changes\"; the change of a rule's wording is dropped from the scope, since an approved rule whose wording changes stays a draft unless its approval is added in the same commit (1.3.2); a test or code bound to the rule before the commit counts, and so does a removed `implements` link, so that a commit that removes a rule's last test does not pass unnoticed; the cost reads \"passes while it is a draft\"; the reason no longer says \"on a push\", since a project chooses where its tests run (1.6.1).\n\nFollow-ups the rule reviewer found for after row 10.1.41, one at a time: node 10.6 (s-qzthyh7yqvfhsa2) shows the owner, before the specification is approved, reports such as \"an approved rule that has no code\", which no check now issues for rules outside a commit, so the approval procedure is to run this check over every approved rule; node 9.2 (s-6fw72j65jkqrfpf) still says \"a rule that implements such a rule\" and \"outside its tests\"; the definition of counting code and tests through a chain of `implements` links is stated in 9.2, in row 10.1.41 and partly in 10.4 and 10.1.43a, and is to get one home, in 1.5.2 (s-kgbzk2ph9e6jfb4); the row needs a `cites` link to s-sn6au3vcr9uy5pm when the drafts are moved into the specification files.", "draft");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "draft-10-1-41.json holds the row's new wording, as the rule reviewer checks it.",
  "draft-10-1-41.json holds the row's new wording with the rule reviewer's fixes, and propose-10-1-41.mjs proposes it to the owner.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: строка целиком у рецензента правил\n",
  "- ✓ рецензент правил проверил строку; его правки внесены\n- сейчас: строка целиком ждёт вашего решения\n- ○ затем: 10.6, 9.2, одно место для засчёта по цепочке implements (1.5.2)\n", "outline");
fs.writeFileSync(outPath, o);
console.log("proposed at", now);
