// Node 3.4 "RecordType": the second paragraph of the text is the owner's wording of 2026-11-09, word for word in
// Russian with its commas put right; the English follows it.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "A domain that takes data from another domain uses the RecordType they come in. It defines a RecordType of its own only where it changes the structure of those data. RecordType names are unique across the specification.", "A domain receiving data in the format of a RecordType may pass that RecordType on, changing only the values and not the structure. The name of the RecordType then does not change. Or the domain may pass on to the next domains its own variant of the RecordType under a new name. RecordType names are unique across the specification.");
n.ruText = swap(n.ruText, "Домен, который получает данные от другого домена, использует тот RecordType, в котором они пришли. Свой RecordType он определяет, только если меняет структуру этих данных. Имена RecordType уникальны во всей спецификации.", "Получая данные в формате RecordType, домен может передать его дальше, не меняя структуры, а только значения. При этом имя RecordType не меняется. Или домен может передать следующим свой вариант RecordType с новым именем. Имена RecordType уникальны во всей спецификации.");
n.changes.push("Абзац 2 — ваша формулировка, дословно, расставлены только запятые; английский текст следует за ней.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[1]);
console.log("---");
console.log(n.ruText.split("\n\n")[1]);
