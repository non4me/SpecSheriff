// The queue outline after the owner confirmed where the file of bindings is located: 1.5.2 is with the reviewer.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● где лежит общий файл: рядом с sheriff.config.json в корне репозитория", "  - ✓ общий файл привязок — в корне репозитория, рядом с sheriff.config.json (ваше решение)\n  - ● черновик 1.5.2 «Как код привязывается к своим правилам» — у рецензента");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: черновик 1.5.2 — покажу после рецензента");
fs.writeFileSync(file, s);
console.log("ok");
