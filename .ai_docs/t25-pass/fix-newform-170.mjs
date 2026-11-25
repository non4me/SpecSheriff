// 9.4: «Так же и у узла собственного типа…» follows the owner's wording of the same construction in 9.2 (fix-newform-165.mjs), «То же самое распространяется и на…»,
// "The same holds for…"; its list of changes no longer says the text is carried over word for word, the reviewer having changed it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-qxpqtnbgmydusx2" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "So does a node of a project's own kind that requires an implementation in code.", "The same holds for a node of a project's own kind that requires an implementation in code.");
swap("ruText", "Так же и у узла собственного типа в проекте, которому требуется имплементация кода.", "То же самое распространяется и на узел собственного типа в проекте, которому требуется имплементация кода.");
const at = b.changes.indexOf("Текст — абзац 3 нынешнего 3.4, дословно.");
if (at < 0) throw new Error("no change line on the text's source");
b.changes[at] = "Текст взят из абзаца 3 нынешнего 3.4.";
b.changes.push("«То же самое распространяется и на узел собственного типа…», как вы сказали о том же в 9.2.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
