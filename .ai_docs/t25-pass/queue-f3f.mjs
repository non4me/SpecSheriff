// The queue outline after the owner's question on why a whole file counts as one symbol.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● 1.5.2 целиком — согласование", "  - ● 1.5.2 целиком — ваш вопрос: зачем считать файл символом");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: файл как один символ — оставить одну фразу в 1.5.2 или менять «символ» в других правилах?");
fs.writeFileSync(file, s);
console.log("ok");
