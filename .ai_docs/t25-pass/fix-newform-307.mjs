// Node 12.3.2, agreed on 2026-11-14: the English alone is brought into line after the EngStickler reader's report. "In
// neutral words" did not say neutral to what; "what it means" could refer to the type; "the field that identifies it"
// named the RecordType where its records are meant. The Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.2"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.text = swap(n.text, "with the field's type in neutral words,", "with the field's type in technology-neutral terms,");
n.text = swap(n.text, "whether the field is required and what it means;", "whether the field is required and what the field means;");
n.text = swap(n.text, "by an identifier, the field that identifies it.", "by an identifier, the field that identifies its records.");
n.changes.push("Только английский текст, по замечаниям читателя: уточнены «нейтральные» слова, к чему относится «что оно означает» и что именно идентифицирует поле. Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
