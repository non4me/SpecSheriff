// Node 7.2.7, "Explaining a term": a new node, the last of subsection 7.2, as the structure that the owner agreed on
// 2026-11-15 provides ("the rule on citing a term"). It brings into the guidelines the owner's rule that a term is
// explained at its first use, which until now only the wording checker applied. Node 7.1 already exempts the terms
// that every reader is given, so 7.2.7 cites 7.1 for them.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-359.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["7.2.7"]) throw new Error("7.2.7 already has a draft");
const goal = d["7.1"].sidValue;
if (!goal) throw new Error("7.1 has no sid");

const draft = {
  from: "",
  sid: "new",
  title: "Explaining a term",
  text: `Where a node first uses a term that its reader may not know, the node explains the term there or cites the node that defines it. This rule covers every term except those that every reader is given (§${goal}).`,
  reason: "A reader who meets a term without its meaning has to guess the meaning, and a wrong guess is then applied as the rule. An explanation helps only where the reader first meets the term, before the guess is made.",
  ruTitle: "Объяснение термина",
  ruText: `Там, где узел впервые употребляет термин, который его читатель может не знать, узел объясняет этот термин или ссылается на узел, который его определяет. Это правило распространяется на все термины, кроме тех, определения которых даны каждому читателю (§${goal}).`,
  ruReason: "Читатель, встретивший термин без его значения, вынужден угадывать значение, и неверная догадка затем применяется как правило. Объяснение помогает только там, где читатель впервые встречает термин, — до того, как он строит догадку.",
  changes: [
    "Новый узел, по согласованной вами 15 ноября структуре раздела 7 («правило о ссылке на термин» в подразделе «Понятность»). До сих пор это было только вашим личным правилом term-explained, которое применял проверяющий.",
    "Исключение для терминов, которые даны каждому читателю, задаёт узел 7.1; здесь на него ссылка.",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "7.2.6") out["7.2.7"] = draft;
}
if (!out["7.2.7"]) throw new Error("7.2.6 not found");
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
fs.copyFileSync(page, new URL("base-structure.before-359.html", import.meta.url));
let html = fs.readFileSync(page, "utf8");
const at = html.indexOf('["7.2.6",');
const close = html.indexOf("\n     ]}", at);
if (at < 0 || close < 0) throw new Error("row 7.2.6 not found");
const row = '["7.2.7","new",0,"","Explaining a term","Объяснение термина","","Новый узел, по вашему решению от 15 ноября.",[],""]';
html = html.slice(0, close) + ",\n      " + row + html.slice(close);
fs.writeFileSync(page, html);
console.log(draft.text);
