// The owner deleted 9.1 on decisions (2026-11-10), so section 9 holds only work put off: its title follows, "Work put off" / «Отложенная работа», as the reviewer of
// review-8-10.md proposed should 9.1 go. A section has no approval of its own; this carries out the owner's deletion and is reported in one line.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const page = fs.readFileSync(pagePath, "utf8");
const from = `{ n: "9", en: "Decisions and work put off", ru: "Решения и отложенная работа", purpose: "Что хранится на узле рядом с его правилом: принятые решения и работа на потом.",`;
const to = `{ n: "9", en: "Work put off", ru: "Отложенная работа", purpose: "Где хранится работа, отложенная на потом, и как увидеть её всю.",`;
if (page.split(from).length !== 2) throw new Error("section 9 heading is not there exactly once");
fs.writeFileSync(pagePath, page.replace(from, to));
console.log("section 9: Work put off");
