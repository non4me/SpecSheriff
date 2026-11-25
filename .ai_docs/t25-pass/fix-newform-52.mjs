// Node 3.4 "RecordType": the owner agreed on 2026-11-09 to "a RecordType of its own with a different structure" in
// the second paragraph, in the reviewed wording: "variant" names the RecordType variant of s-z3dnru6qqdf9m6j, and a
// copy of one structure under a new name stays barred.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "Or the domain may pass on to the next domains its own variant of the RecordType under a new name.", "Or the domain may pass on to the next domains a RecordType of its own with a different structure, under a new name.");
n.ruText = swap(n.ruText, "Или домен может передать следующим свой вариант RecordType с новым именем.", "Или домен может передать следующим свой RecordType с другой структурой и новым именем.");
n.changes.push("Абзац 2, по вашему решению: вместо «свой вариант RecordType с новым именем» — «свой RecordType с другой структурой и новым именем». Формулировка прошла рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[1]);
console.log("---");
console.log(n.ruText.split("\n\n")[1]);
console.log("---");
const d121 = d["12.1"];
console.log("12.1 reason is", typeof d121.reason === "string" && d121.reason.startsWith("=") ? d121.reason : "written in the draft", "| holds the citation:", /s-5yvpn4zhuqmv5bq/.test(d121.reason));
