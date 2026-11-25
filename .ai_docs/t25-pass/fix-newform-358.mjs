// Node 7.3.1, after the second pass of the wording checker: the last sentence of the text can be read in only one
// way, and the reason names whose text it means.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-358.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
const t = d["7.3.1"];
t.text = swap(t.text, "The title names only what sets the node apart within its section.", "The title names only what distinguishes the node from the other nodes of its section.");
t.ruText = swap(t.ruText, "Заголовок называет только то, что отличает узел внутри его раздела.", "Заголовок называет только то, что отличает узел от других узлов его раздела.");
t.reason = swap(t.reason, "the main thought that the text opens with.", "the main thought that the node's text opens with.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
