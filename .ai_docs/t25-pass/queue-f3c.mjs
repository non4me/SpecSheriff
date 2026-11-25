// The queue outline after the owner's ruling on where a SpecTag stands: the draft of 1.5.2 is with the reviewer.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● язык без описания: весь файл — один символ, SpecTag в комментарии в начале файла\n  - ○ черновик 1.5.2, рецензент, показ вам", "  - ✓ SpecTag — перед символом, если его можно определить; иначе комментарием в начале файла; файл без комментариев — связь только от правила (ваше решение)\n  - ● черновик 1.5.2 — у рецензента\n  - ○ следом: 9.7 (список кода вручную для файла без комментариев), строка 10.1.26");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: черновик 1.5.2 — покажу после рецензента");
fs.writeFileSync(file, s);
console.log("ok");
