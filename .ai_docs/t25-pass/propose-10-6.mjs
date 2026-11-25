// Proposes the new wording of node 10.6 (s-qzthyh7yqvfhsa2) with the rule reviewer's fixes of 2026-11-20: before the
// specification is approved, the approval procedure runs every check except the review and the checks that need a commit
// message or a run of the tests, as if the specification were approved and one commit added the whole specification and
// all of the system's code, and shows the owner what they find. The first paragraph of the text stays; the reason's first
// paragraph cites 1.6.1 instead of the node that goes to the archive; its last paragraph is rewritten.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.6"];
if (n.sidValue !== "s-qzthyh7yqvfhsa2" || n.proposals?.length) throw new Error("10.6 is not ready for a proposal");
const d = JSON.parse(fs.readFileSync(new URL("draft-10-6.json", here), "utf8")).agreed;

const text2 = [
  "Before the approval procedure records an approval of the specification, it runs the checks listed in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension. It leaves out the review and the checks that need a commit message or a run of the tests. It runs the others as if the specification were approved and one commit added the whole specification and all of the system's code (§s-hheus6f395ynqvc). It shows the approving owner what they find, for example a symbol without a SpecTag (§s-8xw4mgvpexyvw5q) or an approved rule that has no test or no code. If the checks find anything, the procedure records the approval only after the owner confirms the approval. While the specification's `strict` flag is on, the procedure refuses to record the approval in the cases that the rule on that flag names (§s-q3pfzyaxvpr2zj2).",
].join("");
const ruText2 = "Прежде чем процедура одобрения запишет одобрение спецификации, она запускает проверки из основной таблицы проверок (§s-jau82aq9juv9zzh) или из таблицы проверок расширения. Ревью и проверки, которым нужны сообщение коммита или запуск тестов, она не запускает. Остальные она запускает так, как если бы спецификация была одобрена, а один коммит добавил всю спецификацию и весь код системы (§s-hheus6f395ynqvc). Найденное она показывает одобряющему ответственному: например, символ без SpecTag (§s-8xw4mgvpexyvw5q) или одобренное правило, у которого нет теста или кода. Если проверки что-то нашли, процедура записывает одобрение, только когда ответственный его подтвердит. Пока флаг `strict` спецификации включён, процедура отказывается записать одобрение в тех случаях, которые называет правило об этом флаге (§s-q3pfzyaxvpr2zj2).";
const reason4 = "The owners base their decision on what they see. Old code without a SpecTag may still work correctly, so while the `strict` flag is off, such code does not block the approval. The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack. Seeing what is missing, the owners approve the specification deliberately rather than by oversight.";
const ruReason4 = "Ответственные решают по тому, что видят. Старый код без SpecTag может работать правильно, поэтому, пока флаг `strict` выключен, такой код одобрению не мешает. Проверки при коммите судят только о том, что в нём есть, поэтому никогда не показывают всего, чего ещё не хватает спецификации и коду. Видя, чего не хватает, ответственные одобряют спецификацию осознанно, а не по недосмотру.";

const enText = swap(n.text, d.text2, text2, "text");
const ruText = swap(n.ruText, d.ruText2, ruText2, "ruText");
let enReason = swap(n.reason, d.reason4, reason4, "reason");
enReason = swap(enReason, "before a change reaches the project's shared branch (§s-xhcmchcngykvn2k).", "before a change reaches the project's shared branch (§s-m4h279nbaqkpa3t).", "reason cite");
let ruReason = swap(n.ruReason, d.ruReason4, ruReason4, "ruReason");
ruReason = swap(ruReason, "до того, как изменение попадёт в общую ветку проекта (§s-xhcmchcngykvn2k).", "до того, как изменение попадёт в общую ветку проекта (§s-m4h279nbaqkpa3t).", "ruReason cite");

fs.copyFileSync(nfPath, new URL("newform.before-propose-10-6.json", here));
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, ...(n.examples || []).map(e => `Example: ${e}`), `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...(n.ruExamples || []).map(e => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Следует из ваших решений 19 и 20 ноября: проверки читают только коммит, а в черновике проверки законченности молчат. Перед одобрением процедура запускает все проверки, кроме ревью и тех, которым нужны сообщение коммита или запуск тестов, — так, будто спецификация одобрена, а один коммит добавил всю спецификацию и весь код, — и показывает найденное. Последний абзац обоснования переписан; в первом ссылка на узел, который уходит в архив, заменена ссылкой на 1.6.1. Первый абзац текста не меняется. Формулировку проверил рецензент правил.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* proposing to the owner the new wording of node 10\.6[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new wording of node 10.6 (s-qzthyh7yqvfhsa2), held as the proposal in the draft of 10.6 in newform.json and written by propose-10-6.mjs after the rule reviewer's report. In it, before the specification is approved, the approval procedure runs every check except the review and the checks that need a commit message or a run of the tests, as if the specification were approved and one commit added the whole specification and all of the system's code, and shows the owner what they find. The reviewer's further findings: node 10.2 does not list the approval procedure among the moments at which the checks run; the node \"The hooks\" (s-477gtdrkw34dzxw) of the appendix of the tools is to say what the checks read in that run; a lag of tests and code behind a rule's wording that is left while the specification is a draft is shown by no check, at the approval or later, since no deterministic check judges a lag by meaning; the reason of 10.6 goes through its text paragraph by paragraph, a structure that the agreed reason already had.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "rule-draft-checks.mjs carries out the owner's decision", "draft-10-6.json holds the first draft of node 10.6, and propose-10-6.mjs proposes its new wording after the rule reviewer's report. rule-draft-checks.mjs carries out the owner's decision", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- перед одобрением спецификации процедура показывает, что найдут проверки во всей спецификации и во всём коде\n- черновик формулировки — у рецензента правил\n",
  "- перед одобрением процедура запускает проверки по всей спецификации и всему коду, как будто спецификация одобрена\n- кроме ревью и проверок, которым нужны сообщение коммита или запуск тестов\n- рецензент правил проверил; ждёт вашего решения\n", "outline");
fs.writeFileSync(outPath, o);
console.log(n.proposals[0].ru);
