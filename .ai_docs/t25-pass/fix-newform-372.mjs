// Node 7.2.1, after the second pass of the wording checker: the reason states its two consequences in two sentences,
// and the paragraph on the technical debt names the description instead of referring to it with "It".
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-372.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "names an actor. It says what that actor does", "names an actor. The description says what that actor does");
n.ruText = swap(n.ruText, "называет исполнителя. Оно говорит, что этот исполнитель делает", "называет исполнителя. Описание говорит, что этот исполнитель делает");
n.reason = "Where a rule names no actor, nobody is responsible for meeting it. No test can then show whose code breaks the rule.";
n.ruReason = "Там, где правило не называет исполнителя, никто не отвечает за его соблюдение. Тогда и ни один тест не покажет, чей код нарушает правило.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
