// Node 1.3.4: the wording checker's findings on the whole node, now that it changes for finding 8, as the agent judged them.
// The title names the topic instead of stating the rule (7.3.1); "and by nobody else" becomes "only" (no definition by
// negation); the citation of 1.3.6 says what that rule allows; TableRule cites 7.5.3 at its first use; "each of those
// approvals names that owner" is cut, since "an approval names whoever gave it" already says so.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-434.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWNER_NAME = "s-t5uw8zfxzhfdg86";
const TABLES = "s-8bf287g7xtvytjz";
const n = d["1.3.4"];
const title = "Who approves a node";
const ruTitle = "Кто одобряет узел";
const text = [
  `Only the owners of a node approve it: at least one of them, or an agent in an owner's name where the rule on approving a wording that states nothing new allows it (§${OWNER_NAME}). An approval names whoever gave it.`,
  `An owner of a \`TableRule\` (§${TABLES}) may approve the whole table at once. Doing so approves every node in its cells that is a draft.`,
].join("\n\n");
const ruText = [
  `Узел одобряют только его ответственные: хотя бы один из них или агент от имени ответственного там, где это позволяет правило об одобрении формулировки, которая не говорит ничего нового (§${OWNER_NAME}). Одобрение называет того, кто его дал.`,
  `Ответственный за \`TableRule\` (§${TABLES}) может одобрить его целиком одним действием. Это действие одобряет каждый узел-черновик в его ячейках.`,
].join("\n\n");
const examples = d["1.3.4~"].examples;
const ruExamples = d["1.3.4~"].ruExamples;
n.proposals = [{
  where: "заголовок, текст и новый пример",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "Находка 8: «один из ответственных» → «хотя бы один из них», по согласованному 2.4; добавлен пример: собственные guidelines проекта могут требовать двух одобрений. Раз узел меняется, по замечаниям проверки формулировок: заголовок называет тему, а не формулирует правило (7.3.1); «и никто другой» → «только» (без отрицания); ссылка на 1.3.6 говорит, что это правило позволяет; TableRule со ссылкой на 7.5.3 при первом упоминании; убрано «и каждое такое одобрение называет этого ответственного» — это уже говорит «одобрение называет того, кто его дал». Обоснование не меняется.",
}];
delete d["1.3.4~"];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
