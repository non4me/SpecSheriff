// The owner's ruling of 2026-11-08: "the base of the guidelines" confuses the guidelines with the base
// specification, so in the context of the guidelines they are simply the guidelines. Node 2.3 drops it.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["2.3"];

const en = n.text.split("\n\n"), ru = n.ruText.split("\n\n");
if (!en[1].startsWith("The guidelines are divided") || !ru[1].startsWith("Guidelines разделены")) throw new Error("no second paragraph");
if (!en[2].startsWith("The base of the guidelines") || !ru[2].startsWith("База guidelines")) throw new Error("no paragraph on the base");
if (!en[3].startsWith("The appendix of the tools describes") || !ru[3].startsWith("Описание инструментов говорит")) throw new Error("no paragraph on the appendix");

en[2] = "The rules state what is held, what is checked, when, and what a failure costs. They name no technology.";
ru[2] = "Правила говорят, что хранится, что проверяется, когда и чего стоит сбой. Они не называют технологий.";
const list = s => s.slice(s.indexOf(":\n"));
en[3] = "The requirements for the tools stand in the appendix of the tools. It describes how one toolset carries those rules out" + (en[3].includes(":\n") ? list(en[3]) : ":");
ru[3] = "Требования к инструментам стоят в описании инструментов. Оно говорит, как один набор инструментов выполняет эти правила" + (ru[3].includes(":\n") ? list(ru[3]) : ":");
en.splice(1, 1);
ru.splice(1, 1);
n.text = en.join("\n\n");
n.ruText = ru.join("\n\n");
n.title = "The structure of the guidelines";
n.ruTitle = "Структура guidelines";
n.changes = [
  "Заголовок — ваш вариант.",
  "Первый абзац — ваш.",
  "По вашему решению убрано выражение «база guidelines»: в этом контексте говорится просто о guidelines. Абзац, вводивший это название, снят, в двух следующих абзацах слова заменены.",
  "Обоснование — абзацы 1–2 нынешнего обоснования 1.21, дословно.",
  "Сохраняет sid 1.21. Фраза о том, что каждое правило описания инструментов реализует узел, ушла в 2.4.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log("---");
console.log(n.ruText);
