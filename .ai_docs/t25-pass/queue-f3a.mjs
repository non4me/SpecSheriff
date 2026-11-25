// The queue outline after the owner agreed to the direction for 1.5.2: the next question is about a file in a language
// that has no description.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("- ● находка 3: 1.5.2 — закрытый список видов символов, которые несут SpecTag", "- ● находка 3: 1.5.2 — закрытый список видов символов, которые несут SpecTag\n  - ✓ список становится примерами; что считается символом, задаёт описание языка (ваше согласие)\n  - ● файл кода системы на языке без описания — как с ним поступать\n  - ○ черновик 1.5.2, рецензент, показ вам");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: файл на языке без описания — считать кодом без SpecTag?");
fs.writeFileSync(file, s);
console.log("ok");
