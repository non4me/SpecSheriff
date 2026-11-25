// The build of 2026-11-20 found that the drafts with the sids of the current nodes 1.5 and 2.2 lack the `TextRule.list` that
// those nodes hold, because the format of the drafts had no field for a list. The agreed row 10.1.35 relies on both lists. The
// list of statuses goes to 1.3.1 (s-tgrnpagrb58tya7), whose text now names the statuses, and the list of link types to 6.1
// (s-sn6au3vcr9uy5pm), with the members its agreed text names. Each list only restates the agreed text, so the owner's
// agreement covers it, and the agent reports it in one line.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-add-lists.json", here));
const note = "20 ноября при сборке: восстановлен список, который был у прежнего узла и пропал, потому что в черновиках не было поля для списка. Он только повторяет согласованный текст, поэтому согласование сохраняется.";

const a = nf["1.3.1"];
if (a.list) throw new Error("1.3.1 already holds a list");
if (!a.text.includes("The approval status can be `draft` or `approved`.")) throw new Error("1.3.1: the text no longer names the statuses");
a.list = {
  of: "the values the approval status can take",
  members: ["draft", "approved"],
  declaredIn: { file: "specs/_schema/node.schema.json", declaration: "#/$defs/status" },
};
a.changes.push(note);

const b = nf["6.1"];
if (b.list) throw new Error("6.1 already holds a list");
const members = ["implements", "refines", "constrains", "exempts", "checks", "cites", "term-relation", "uses"];
for (const m of members) if (!b.text.includes("- `" + m + "` —")) throw new Error("6.1: the text does not name " + m);
b.list = {
  of: "the types a link between nodes of the specification can carry",
  members,
  declaredIn: { file: "specs/_schema/node.schema.json", declaration: "#/$defs/ref/properties/type" },
};
b.changes.push(note);

fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log("lists added");
