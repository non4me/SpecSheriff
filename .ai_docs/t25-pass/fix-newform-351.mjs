// Node 7.1, after the second pass of the wording checker: the first paragraph opens with a requirement on whoever
// writes a node, rather than with a statement of what the rules serve, which read as a reason placed in the text.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-351.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text,
  "Every rule of this section serves one goal: whoever applies a node understands it correctly on first reading and with the least effort. Where two rules of this section conflict, whoever writes the node chooses the wording that serves this goal better.",
  "Whoever writes a node words it so that whoever applies the node understands it correctly on first reading, with the least effort. The other rules of this section serve this goal. Where two of them conflict, the writer chooses the wording that serves the goal better.");
n.ruText = swap(n.ruText,
  "Все правила этого раздела служат одной цели: тот, кто применяет узел, понимает его правильно с первого прочтения и с наименьшим усилием. Там, где два правила этого раздела расходятся, автор узла выбирает формулировку, которая лучше служит этой цели.",
  "Автор узла формулирует его так, чтобы тот, кто применяет узел, понял его правильно с первого прочтения и с наименьшим усилием. Остальные правила этого раздела служат этой цели. Там, где два из них расходятся, автор выбирает формулировку, которая лучше служит цели.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
