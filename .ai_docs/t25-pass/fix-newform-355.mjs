// Node 7.1: the item of the writer's assumptions that set two facts side by side becomes two items, as the wording
// checker asked under node 7.3.2.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-355.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "- sees the whole node and can read the nodes it links to;", "- sees the whole node;\n- can read the nodes it links to;");
n.ruText = swap(n.ruText, "- видит весь узел и может прочесть узлы, к которым ведут его связи;", "- видит весь узел;\n- может прочесть узлы, к которым ведут его связи;");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
