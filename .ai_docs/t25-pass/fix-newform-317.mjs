// Node 12.3.3, agreed on 2026-11-14: the English alone is brought into line after the EngStickler reader's report.
// "Written alongside" did not say who writes; "by hand" says that a type or a RuntimeCheck is not written by a person next
// to the RecordType, which is what the Russian «пишутся рядом» means. The Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.3"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.text = swap(n.text, "and never written alongside them.", "and never written by hand alongside them.");
n.reason = swap(n.reason, "A type or a RuntimeCheck written alongside a RecordType", "A type or a RuntimeCheck written by hand alongside a RecordType");
n.changes.push("Только английский текст, по замечанию читателя: «written alongside» стало «written by hand alongside», в тексте и в обосновании. Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.reason);
