// Three proposals of one kind, each bringing an agreed node into line with 10.7, agreed on 2026-11-17, shown together under
// the owner's rule on many proposals of one kind:
// - 1.3.3: approval decides whether the checks take into account code outside the commit without a SpecTag (a warning or,
//   with the strict flag on, a refusal), not only whether they warn;
// - 10.1: the reason says that such code is reported, or refused while the strict flag is on;
// - 10.3: the agent's edit is refused where it would change the entries that set the specification's approval status or
//   its strict flag other than through the procedures that record them; the reason names the flag.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-432.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const T95 = "s-kkbqcb9xrpaepwn";
const FLAG = "s-q3pfzyaxvpr2zj2";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const build = (n, f, where, why) => ({
  where,
  en: [`Title: ${n.title}`, `Text: ${f.text ?? n.text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${f.reason ?? n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${f.ruText ?? n.ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason ?? n.ruReason}`].join("\n\n"),
  why,
});
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};

{
  const n = d["1.3.3"];
  const f = {
    reason: swap(n.reason, `and whether the checks warn about code that is outside the commit and carries no SpecTag (§${T95}).`, `and whether the checks take into account code that is outside the commit and carries no SpecTag (§${T95}).`),
    ruReason: swap(n.ruReason, `и предупреждают ли проверки о коде за пределами коммита без SpecTag (§${T95}).`, `и учитывают ли проверки код за пределами коммита без SpecTag (§${T95}).`),
  };
  n.proposals = [build(n, f, "первое предложение обоснования", "Выполняет согласованный 10.7: при включённом флаге strict такой код не предупреждает, а отклоняет коммит. Поэтому «предупреждают ли проверки о коде…» заменено на «учитывают ли проверки код…». Остальное не меняется.")];
}

{
  const n = d["10.1"];
  const f = {
    reason: swap(n.reason, `A symbol or a test without a SpecTag that a commit leaves alone is reported for the reason §${T95} gives.`, `A symbol or a test without a SpecTag that a commit leaves alone is reported, or refused while the specification's \`strict\` flag is on, for the reasons §${T95} and §${FLAG} give.`),
    ruReason: swap(n.ruReason, `Символ или тест без SpecTag, которые коммит не трогает, сообщаются по причине, которую даёт §${T95}.`, `Символ или тест без SpecTag, которые коммит не трогает, сообщаются, а пока флаг \`strict\` спецификации включён, отклоняются, по причинам, которые дают §${T95} и §${FLAG}.`),
  };
  n.proposals = [build(n, f, "одно предложение обоснования", "Выполняет согласованные 9.5 и 10.7: пока флаг strict включён, такой код не сообщается, а отклоняет коммит. В предложение обоснования добавлено «а пока флаг strict спецификации включён, отклоняются» и ссылка на 10.7. Остальное не меняется.")];
}

{
  const n = d["10.3"];
  const f = {
    text: swap(n.text, "- change the approvals other than through the procedure that records an approval or withdraws one.", `- change the approvals, or the entries that set the specification's approval status (§${APPROVAL}) or its \`strict\` flag (§${FLAG}), other than through the procedures that record or withdraw them.`),
    ruText: swap(n.ruText, "- изменила бы одобрения иначе, чем через процедуру, которая записывает одобрение или отзывает его.", `- изменила бы одобрения или записи, которые задают статус одобрения спецификации (§${APPROVAL}) или её флаг \`strict\` (§${FLAG}), иначе чем через процедуры, которые их записывают или отзывают.`),
    reason: swap(n.reason, "An agent that could set a status, or write an approval itself, could approve what none of the node's owners agreed to.", "An agent that could set a status, write an approval or set the `strict` flag itself could make a decision that only the owners make."),
    ruReason: swap(n.ruReason, n.ruReason.split(". ")[0] + ".", "Агент, который мог бы сам выставить статус, записать одобрение или задать флаг `strict`, мог бы принять решение, которое принимают только ответственные."),
  };
  n.proposals = [build(n, f, "третий пункт текста и первое предложение обоснования", "Выполняет согласованный 10.7: записи флага strict, как и одобрения и записи о статусе спецификации, меняются только через их процедуры. Третий пункт называет теперь и записи о статусе одобрения спецификации (10.6), и записи флага strict (10.7); первое предложение обоснования говорит о решении, которое принимают только ответственные, вместо одного одобрения. Остальное не меняется.")];
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(d["10.3"].ruReason.split(". ")[0]);
