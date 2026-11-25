// Node 7.2.7, after the wording checker: the reason speaks of the rule as a whole, as node 7.4.2 requires, instead of
// grounding the text's two sentences one by one.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-362.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
n.reason = "A reader who meets a word or phrase with a special meaning and finds no explanation at that point reads the rest of the node by a guess at what it means.";
n.ruReason = "Читатель, который встречает слово или выражение со специальным значением и не находит в этом месте объяснения, читает остальной узел, исходя из догадки о том, что оно значит.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
