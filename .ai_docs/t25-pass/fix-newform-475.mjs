// Brings the English of the agreed 1.7.6 into line with its agreed Russian after EngStickler's reader read it
// (2026-11-18). The Russian is unchanged. "withdraw" stays, as for approvals (1.3.7).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-475.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.6"];
const r = [
  ["text", "A node depends on the extension while it:\n- is of a kind, or holds a property or a link of a type, that the extension adds;", "A node depends on the extension while it does any of the following:\n- is of a kind that the extension adds, or holds a property or a link of a type that the extension adds;"],
  ["text", "The procedure that withdraws the choice of an extension refuses while a node depends on the extension.", "The procedure that withdraws the choice of an extension refuses to withdraw it while a node depends on the extension."],
  ["examples", "The procedure refuses and names those nodes by their sids.", "The procedure refuses to withdraw the choice and names those nodes by their sids."],
  ["examples", "and leaves the checks to refuse the next commit.", "and leaves it to the checks to refuse the next commit."],
];
for (const [field, a, b] of r) {
  const v = JSON.stringify(n[field]);
  const ja = JSON.stringify(a).slice(1, -1);
  if (!v.includes(ja)) throw new Error("missing in " + field + ": " + a.slice(0, 50));
  n[field] = JSON.parse(v.split(ja).join(JSON.stringify(b).slice(1, -1)));
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
