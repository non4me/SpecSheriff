// The queue outline after the owner's objection: the question is now whether a whole file counts as one symbol where no
// description covers its language.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● файл кода системы на языке без описания — как с ним поступать", "  - ✓ любой код пишется по правилам, значит, его всегда можно пометить SpecTag (ваше замечание)\n  - ● язык без описания: весь файл — один символ, SpecTag в комментарии в начале файла");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: язык без описания — весь файл считается одним символом?");
fs.writeFileSync(file, s);
console.log("ok");
