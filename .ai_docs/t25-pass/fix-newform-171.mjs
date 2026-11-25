// The owner of 2026-11-10 retitled agreed 9.1: "What is considered a system's code", entered as "What is considered the system's code", the article that of the
// text's defined phrase and no question mark, a title naming its matter; the Russian «Что считается кодом системы» already says it. A changed title makes the node a
// draft until the owner agrees again.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.1"];
if (b.sidValue !== "s-hheus6f395ynqvc" || !b.agreed || b.title !== "What counts as the system's code") throw new Error("unexpected draft");
b.title = "What is considered the system's code";
delete b.agreed;
b.changes = [...b.changes, "Английский заголовок ваш: «What is considered the system's code». Артикль the, как в определении в тексте; русский заголовок не меняется."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
