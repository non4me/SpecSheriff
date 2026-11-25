// Node 12.3.5, agreed: the owner agreed to it on 2026-11-14 once its examples keep only the owner's own wording («в
// примерах оставь только мою формулировку без своих интерпритаций о пользователе. И после этого пункт согласован»). The
// examples about a user and a request go; the owner's example of a consuming domain stays, in the owner's words.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.5"];
n.examples = ["A consuming domain may describe in its rules, especially in its technical appendix, what it does with the data of a given RecordType that it takes as input."];
n.ruExamples = ["Домен-потребитель может в своих правилах, особенно в техническом приложении, описывать, что он делает с данными того или иного RecordType, которые использует на входе."];
n.agreed = "2026-11-14";
n.changes.push("Примеры: оставлен только ваш, вашими словами. Вы согласовали эту формулировку 14 ноября («пункт согласован»).");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(["Title: " + n.title, "", "Text: " + n.text, "", "Reason: " + n.reason, "", "Example: " + n.examples[0]].join("\n"));
