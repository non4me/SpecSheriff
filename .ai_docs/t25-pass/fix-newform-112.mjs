// The owner's comment of 2026-11-10 on the reason of 8.1 (thread 416af7cf): their wording, word for word, spelling and punctuation put
// right, «Сам раздел правило не является» as «правилом». The selection was the reason alone, so the text of 8.1 stays as agreed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const a = d["8.1"];
if (a.sidValue !== "s-7445ahgjck2aefg") throw new Error("unexpected draft");

a.reason = "Where rules need to be grouped, a section is used. It brings the rules together under a particular logic described in the text of the section itself. A section is not itself a rule.";
a.ruReason = "Там, где правила требуют группировки, используется раздел. Он объединяет правила в рамках определённой логики, описанной в тексте самого раздела. Сам раздел правилом не является.";
const i = a.changes.findIndex(c => c.startsWith("Обоснование сокращено"));
if (i < 0) throw new Error("no line on the reason in changes");
a.changes[i] = "Обоснование — ваша формулировка, из комментария на странице. Нынешнее обоснование 1.3 утверждало, что термин называют в SpecTag, а согласованный 3.3 и 11.5 говорят иное.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(a.ruReason);
