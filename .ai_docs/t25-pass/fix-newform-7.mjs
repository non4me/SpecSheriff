// The owner's comments of 2026-11-07 on 1.1.2's reason, given with the node's agreement, so the
// agreement stands: "Не ответа а части" — the parts change at different rates, not the answers;
// "guidelines" in place of the selected "Как ведётся спецификация".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.2"];
const rep = (f, a, b) => {
  // Run again, a replacement already made is skipped; a removal is made once its text is gone.
  if (!n[f].includes(a) && (b === "" || n[f].includes(b))) return;
  if (!n[f].includes(a)) throw new Error(`${f}: not found: ${a}`);
  n[f] = n[f].replace(a, b);
};
rep("reason", "The answers change at different rates.", "The parts change at different rates.");
rep("ruReason", "Ответы меняются с разной скоростью.", "Части меняются с разной скоростью.");
rep("reason", "How the specification is kept hardly changes.", "The guidelines hardly change.");
rep("ruReason", "Как ведётся спецификация, почти не меняется.", "Guidelines почти не меняются.");
// In the conversation: each part named by its name, as the guidelines are. "Её бизнес-логикой" would
// read as the specification's, so the business logic is named as the system's.
rep("reason", "What the system does changes with its business logic or its core functionality. How the system is built changes most often.", "The base specification changes with the system's business logic or its core functionality. The technical appendix changes most often.");
rep("ruReason", "Что делает система, меняется вместе с её бизнес-логикой или основной функциональностью. Как система построена, меняется чаще всего.", "Базовая спецификация меняется вместе с бизнес-логикой системы или её основной функциональностью. Техническое приложение меняется чаще всего.");
// "убрать", on the selected first sentence only.
rep("reason", "A reader who knows which question a part answers knows where to look for a rule and where to write one. ", "");
rep("ruReason", "Читатель, который знает, на какой вопрос отвечает часть, знает, где искать правило и где его писать. ", "");
// "убрать — это повторяет мысль выше", on the selected last sentence.
rep("reason", " Held apart, each part changes at its own rate.", "");
rep("ruReason", " Когда части разделены, каждая меняется со своей скоростью.", "");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason, "\n", n.ruReason);
