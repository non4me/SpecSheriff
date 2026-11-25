// The queue outline after the reviewer's report on 1.5.2: the question about a file that does not support comments.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● черновик 1.5.2 — у рецензента", "  - ✓ черновик 1.5.2 — рецензент прочёл: связь только от правила ломает 9.2, 9.5, 9.6, 9.7, 10.4 и принцип\n  - ● файл без комментариев: связь только от правила или SpecTag рядом с файлом");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: файл без комментариев — SpecTag хранить рядом с файлом?");
fs.writeFileSync(file, s);
console.log("ok");
