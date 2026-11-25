// Section 10 by its consolidated review (2026-11-11), 10.2 and 10.3, the wording fixes only (their doubts go to the
// owner): 10.2's reason names what "every other" applies to (7.8); 10.3's title says "checked", since "judged" names
// the review (1.6.1), its second item says "a rule, a rule of a project's own kind included" (the owner's ruling) and
// "while", its third item leaves the generators to the extension 12.5, and its reason keeps why the edit is checked
// where it is made, the retelling of 1.3.4 and 1.3.6 cut.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const two = d["10.2"], three = d["10.3"];
if (two.sidValue !== "s-epaw9sgyaajzn8g" || three.sidValue !== "s-83ev4wwesbwnhnp") throw new Error("unexpected drafts");

const swap = (b, field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${b.sidValue} ${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap(two, "reason", "rather than at the commit among every other.", "rather than at the commit among every other refusal.");
swap(two, "ruReason", "а не при коммите среди всех остальных.", "а не при коммите среди всех остальных отказов.");
two.changes.push("По сводному отчёту рецензента 11 ноября: в обосновании «среди всех остальных» стало «среди всех остальных отказов» (7.8).");

three.title = "An agent's edit is checked before it is made";
three.ruTitle = "Правку агента проверяют до того, как она сделана";
swap(three, "text", "- change the code written for a rule, or for a node of a project's own kind that needs code (§s-vsh384ybt4w25a2), that no test carries the SpecTag of (§s-rah8b37kytb682y);", "- change the code written for a rule, a rule of a project's own kind included (§s-vsh384ybt4w25a2), while no test carries that rule's SpecTag (§s-rah8b37kytb682y);");
swap(three, "text", "- change the code of a project's own check or generator while no test carries the SpecTag of the rule listing it (§s-sfjka4zc4rhfu67);", "- change the code of a project's own check while no test carries the SpecTag of the rule listing it (§s-sfjka4zc4rhfu67);");
swap(three, "ruText", "- изменила бы код, написанный для правила или для узла собственного типа в проекте, нуждающегося в коде (§s-vsh384ybt4w25a2), если ни один тест не использует его SpecTag (§s-rah8b37kytb682y);", "- изменила бы код, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни один тест не связан SpecTag с этим правилом (§s-rah8b37kytb682y);");
swap(three, "ruText", "- изменила бы код собственной проверки или генератора проекта, пока ни один тест не использует SpecTag правила, которое его перечисляет (§s-sfjka4zc4rhfu67);", "- изменила бы код собственной проверки проекта, пока ни один тест не связан SpecTag с правилом, которое её перечисляет (§s-sfjka4zc4rhfu67);");
three.reason = "An agent that could set a status, or write an approval itself, could approve what none of the node's owners agreed to. Every later check takes the approvals as given, so they can be held only where they are written.\n\nA commit holds a test and its code together whichever was written first, so the order of the work can be held only where the edits are made.";
three.ruReason = "Агент, который мог бы выставить статус или сам записать одобрение, мог бы одобрить то, с чем не согласился ни один из ответственных за узел. Каждая следующая проверка принимает одобрения как данность, поэтому удержать их можно только там, где их пишут.\n\nКоммит держит тест и его код вместе, что бы ни было написано первым, поэтому порядок работы можно удержать только там, где делаются правки.";
three.changes.push("По сводному отчёту рецензента 11 ноября: заголовок «checked» вместо «judged» (так 1.6.1 называет рецензию); второй пункт — «правило, в том числе правило собственного типа», по вашему решению, и «пока»; из третьего пункта генераторы ушли в расширение 12.5; из обоснования ушли пересказ 1.3.4 и 1.3.6 и абзац о процедуре одобрения.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
