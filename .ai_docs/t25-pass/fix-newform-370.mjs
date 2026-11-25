// Node 7.2.1 becomes "Who must act", as the owner agreed on 2026-11-16: "subject" could mean the grammatical subject,
// the topic or the one who acts, and "binds" was abstract. The rule now names the actor, lists the kinds of actor,
// and shows in an example the passive sentence it is meant to prevent. The reason says what a rule without an actor
// costs. The example names an operator, as examples in the SpecSheriff guidelines name only what any system has.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-370.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const debt = "s-2r7k2aeyusgy6fw";
n.title = "Who must act";
n.ruTitle = "Кто действует";
n.text = [
  "A rule names the actor that must do what it requires: a person, a role, a part of the system or a tool. The rule then says what that actor must do.",
  `Where the technical debt (§${debt}) describes a shortcoming, the description too names an actor, and says what that actor does while the shortcoming persists.`,
].join("\n\n");
n.ruText = [
  "Правило называет того, кто должен выполнить его требование: человека, роль, часть системы или инструмент. Затем правило говорит, что этот исполнитель должен делать.",
  `Там, где технический долг (§${debt}) описывает недостаток, описание тоже называет исполнителя и говорит, что он делает, пока недостаток существует.`,
].join("\n\n");
n.reason = "Where a rule names no actor, nobody is responsible for meeting it, and no test can show whose code breaks it.";
n.ruReason = "Там, где правило не называет исполнителя, никто не отвечает за его соблюдение, и ни один тест не покажет, чей код его нарушает.";
n.examples = ["A rule says: \"The operator approves each refund above the limit.\" The mistake closest to that case: \"Each refund above the limit is approved\", which does not say who approves it."];
n.ruExamples = ["Правило гласит: «Оператор одобряет каждый возврат сверх лимита». Ближайшая ошибка: «Каждый возврат сверх лимита одобряется» — не сказано, кто его одобряет."];
n.changes = [
  ...n.changes,
  "По вашему замечанию от 16 ноября, что правило звучит слишком абстрактно: «subject» читалось и как подлежащее, и как тема, а «binds» — абстрактно. Теперь правило называет исполнителя, перечисляет, кем он бывает, и показывает в примере пассив, против которого направлено. Заголовок «Who must act» («Кто действует») вы приняли вместе с этой правкой.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const page = new URL("base-structure.html", import.meta.url);
const html = fs.readFileSync(page, "utf8");
const from = "\"The subject of a rule\",\"Субъект правила\"";
if (!html.includes(from)) throw new Error("row 7.2.1 not found");
fs.writeFileSync(page, html.replace(from, "\"Who must act\",\"Кто действует\""));
console.log("ok");
