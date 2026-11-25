// The fresh reviewer of 9.5 with the full checklist (2026-11-11): the reason still paired with the text's
// paragraphs (✗ 7.14 and the pairing test); its wording fix speaks of the rule as a whole from 1.5.1's premise.
// The change note that said the reason cites 8.1 is corrected. The doubts on the text go to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ef93u6cnbs2sevr" || b.agreed) throw new Error("unexpected 9.5");

b.reason = "The code's behaviour changes only as a consequence of the specification (§s-4gk82vt7zhzp4jt). The message of a commit records which nodes the changed code implements, for whoever reads the history and for the reviewer, who judges the code against them (§s-nyh9yk22ba6g77q).";
b.ruReason = "Поведение кода меняется только вслед за спецификацией (§s-4gk82vt7zhzp4jt). Сообщение коммита фиксирует, какие узлы реализует изменённый код, — для читающего историю и для рецензента, который сверяет код с ними (§s-nyh9yk22ba6g77q).";
b.changes[3] = "По рецензенту: подлежащее — сообщение коммита; два вида SpecTag списком; заголовок новый: прежний повторял текст.";
b.changes[5] = "Обоснование новое и говорит о правиле в целом: поведение кода меняется только вслед за спецификацией (согласованный 1.5.1), поэтому сообщение фиксирует, какие узлы реализует изменённый код, для читающего историю и для рецензента. Прежнее разбирало абзацы текста по одному, что запрещает согласованный 7.14. При переносе узел получит связь cites на s-4gk82vt7zhzp4jt.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
