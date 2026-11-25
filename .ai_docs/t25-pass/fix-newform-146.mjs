// The owner of 2026-11-10 on 1.3.8's title: «Как строится статус одобрения раздела» -> «Как определяется статус одобрения раздела».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.3.8"];
if (b.sidValue !== "s-9kfdycuq34beqvs" || b.ruTitle !== "Как строится статус одобрения раздела") throw new Error("unexpected draft");
b.ruTitle = "Как определяется статус одобрения раздела";
b.title = "How a section's approval status is determined";
b.changes = [...b.changes, "Заголовок ваш: «Как определяется статус одобрения раздела»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
