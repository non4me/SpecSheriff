// Node 7.2.1, after specsheriff-rule-reviewer. A rule may require an action or a property, and the old "subject"
// covered both, so the text now says what a rule names in each case. "Another system" is gone, since a rule about what
// lies outside the system has no place in the specification (node 7.5.1). The reason holds for an actor without code,
// such as an operator or the owner. The Russian avoids «исполнитель», which is the owner's word for an assignee, and
// the Russian title keeps "must". The paragraph on the technical debt follows the wording of node 1.2.3.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-373.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const debt = "s-2r7k2aeyusgy6fw";
n.ruTitle = "Кто должен действовать";
n.text = [
  "A rule that requires an action names the actor and says what that actor must do. An actor may be, for example, a person, a role, a part of the system or a tool. A rule that requires a property names the thing that must have it, such as a record or a node.",
  `A description of a shortcoming in the technical debt (§${debt}) also names an actor. The description says what that actor does while the shortcoming persists.`,
].join("\n\n");
n.ruText = [
  "Правило, требующее действия, называет того, кто должен действовать, и говорит, что он должен делать. Действовать может, например, человек, роль, часть системы или инструмент. Правило, требующее свойства, называет то, что должно им обладать, например запись или узел.",
  `Описание недостатка в техническом долге (§${debt}) тоже называет того, кто действует. Описание говорит, что он делает, пока недостаток существует.`,
].join("\n\n");
n.reason = "Where a rule names no actor, nobody knows who must meet it. Nobody can then be shown to have broken it.";
n.ruReason = "Если правило не называет того, кто действует, никто не знает, кто должен его соблюдать. Тогда нельзя и показать, кто его нарушил.";
n.ruExamples = ["Правило гласит: «Оператор одобряет каждый возврат сверх лимита». Ближайшая ошибка: «Каждый возврат сверх лимита одобряется» — не сказано, кто его одобряет."];
n.changes = [
  n.changes[0],
  "По вашему замечанию от 16 ноября, что правило звучит слишком абстрактно: «subject» читалось и как подлежащее, и как тема, а «binds» — абстрактно. Теперь правило различает правило, требующее действия (оно называет того, кто действует, и что он должен делать), и правило, требующее свойства (оно называет то, что должно им обладать). Пример показывает пассив, против которого направлено правило. Заголовок «Who must act» («Кто должен действовать») вы приняли вместе с этой правкой.",
  "По замечаниям рецензента: «another system» убрано, потому что правило о том, что лежит вне системы, не описывает систему (7.5.1); обоснование подходит и к оператору или ответственному, у которых нет кода; в русском тексте нет слова «исполнитель», которое у вас означает assignee; абзац о техническом долге следует формулировке 1.2.3.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const page = new URL("base-structure.html", import.meta.url);
const html = fs.readFileSync(page, "utf8");
const from = "\"Who must act\",\"Кто действует\"";
if (!html.includes(from)) throw new Error("row 7.2.1 not found");
fs.writeFileSync(page, html.replace(from, "\"Who must act\",\"Кто должен действовать\""));

const cfgPath = "D:/SpecSheriff/.claude/vt/checker-v3.json";
const cfg = fs.readFileSync(cfgPath, "utf8");
const a = "each sentence of the text names the subject that must act and says what it must do.";
if (!cfg.includes(a)) throw new Error("checker test not found");
fs.writeFileSync(cfgPath, cfg.replace(a, "each sentence of the text that requires an action names the actor and says what that actor must do, and that each sentence that requires a property names the thing that must have it."));

const rulesPath = "D:/SpecSheriff/.claude/vt/rules.md";
const rules = fs.readFileSync(rulesPath, "utf8");
const r = "A rule binds a subject (§s-3dgt5c94jr55j3z), and";
if (!rules.includes(r)) throw new Error("rules sentence not found");
fs.writeFileSync(rulesPath, rules.replace(r, "A rule names who must act, or what must have a property (§s-3dgt5c94jr55j3z), and"));
console.log("ok");
