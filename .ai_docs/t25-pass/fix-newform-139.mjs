// The owner's comment of 2026-11-10 on 8.4: the last paragraph, on what a node of a kind with `needsCode` true or false requires, goes; `needsCode` is said above.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.4"];
if (b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected draft");

const dropLast = (field, opening) => {
  const parts = b[field].split("\n\n");
  if (!parts[parts.length - 1].startsWith(opening)) throw new Error(`${field}: the last paragraph is not the one expected`);
  b[field] = parts.slice(0, -1).join("\n\n");
};
dropLast("text", "An approved node of a kind whose `needsCode` is true");
dropLast("ruText", "Одобренному узлу типа, у которого `needsCode` равен true");
const at = b.changes.findIndex((c) => c.startsWith("Рецензент сверил текст с инструментами."));
if (at < 0) throw new Error("the reviewer's change line was not found");
b.changes[at] = "Добавлен `TextRule.list.property`: без него проверка отклоняет список, члены которого объекты.";
b.changes = [...b.changes, "Последний абзац убран по вашему комментарию: о `needsCode` сказано выше."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n\n").length, "paragraphs");
console.log(b.ruText);
