// Node 12.3.5, agreed on 2026-11-14: the English alone is brought into line after the EngStickler reader's report.
// "Anywhere in the types of its fields and through `refines`" mixed a place with a means; the depth now goes with the field
// types. "Referring to ..., it would change" now has the condition it needs: "If it referred to ...". The Russian does not
// change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.5"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.text = swap(n.text, "Anywhere in the types of its fields and through `refines`, a RecordType refers only to", "In the types of its fields, at any depth, and through `refines`, a RecordType refers only to");
n.reason = swap(n.reason, "Referring to another domain's RecordType, it would change whenever", "If it referred to another domain's RecordType, it would change whenever");
n.changes.push("Только английский текст, по замечаниям читателя: «Anywhere in the types of its fields» стало «In the types of its fields, at any depth», «Referring to ..., it would change» — «If it referred to ..., it would change». Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.reason);
