// The build of 2026-11-20 found that three agreed drafts still cite the current rule 5.3 (s-xhcmchcngykvn2k, "Tests at a
// push while the specification is a draft"), which the new form drops: the owner agreed on 2026-11-17 that 1.6.1 states
// its content. In 1.3.2 and 1.3.3 the citation is replaced by one of 1.6.1, a technical replacement that changes no
// meaning, which the agent approves on the owner's behalf and reports. In 1.6.1 the reason cited 5.3 for why no test has
// to pass while the specification is a draft; that reason is lost with 5.3, so a new wording of the sentence is proposed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-fix-cites-5-3.json", here));

const a = nf["1.3.2"];
a.text = swap(a.text, "before a change reaches the project's shared branch (§s-xhcmchcngykvn2k),", "before a change reaches the project's shared branch (§s-m4h279nbaqkpa3t),", "1.3.2 text");
a.ruText = swap(a.ruText, "до того, как изменение попадёт в общую ветку проекта (§s-xhcmchcngykvn2k),", "до того, как изменение попадёт в общую ветку проекта (§s-m4h279nbaqkpa3t),", "1.3.2 ruText");
a.changes.push("20 ноября при сборке: ссылка на прежний 5.3, который уходит в архив, заменена ссылкой на 1.6.1, где теперь сказано то же. Смысл не меняется, согласование сохраняется.");

const b = nf["1.3.3"];
b.reason = swap(b.reason, "before a change reaches the project's shared branch (§s-xhcmchcngykvn2k)", "before a change reaches the project's shared branch (§s-m4h279nbaqkpa3t)", "1.3.3 reason");
b.ruReason = swap(b.ruReason, "до того, как изменение попадёт в общую ветку проекта (§s-xhcmchcngykvn2k)", "до того, как изменение попадёт в общую ветку проекта (§s-m4h279nbaqkpa3t)", "1.3.3 ruReason");
b.changes.push("20 ноября при сборке: ссылка на прежний 5.3, который уходит в архив, заменена ссылкой на 1.6.1, где теперь сказано то же. Смысл не меняется, согласование сохраняется.");

const n = nf["1.6.1"];
if (n.proposals?.length) throw new Error("1.6.1 already holds a proposal");
const enReason = swap(n.reason, "While the specification is a draft, no test has to pass, for the reason given in §s-xhcmchcngykvn2k.",
  "While the specification is a draft, the work is focused on the specification itself, so no test has to pass.", "1.6.1 reason");
const ruReason = swap(n.ruReason, "Пока спецификация — черновик, ни один тест не обязан проходить, по причине, которую даёт §s-xhcmchcngykvn2k.",
  "Пока спецификация — черновик, работа сосредоточена на самой спецификации, поэтому ни один тест не обязан проходить.", "1.6.1 ruReason");
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${n.text}`, ...(n.examples || []).map(e => `Example: ${e}`), `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${n.ruText}`, ...(n.ruExamples || []).map(e => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Прежний 5.3 о тестах при push в черновике уходит в архив: его содержание вы согласовали в 1.6.1 17 ноября. Обоснование 1.6.1 ссылалось на 5.3 за причиной, почему в черновике тесты не обязаны проходить; теперь причина сказана здесь же, теми словами, что в обоснованиях согласованных строк 10.1.40 и 10.1.41. Текст и пример не меняются.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log("done at", now);
