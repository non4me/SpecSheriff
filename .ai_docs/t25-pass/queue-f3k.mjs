// The queue outline after the second review of 1.5.2: the node is shown whole.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● черновик 1.5.2 «Как код привязывается к своим правилам» — у рецензента", "  - ✓ рецензент прочёл черновик второй раз, замечания учтены\n  - ● 1.5.2 «Как код привязывается к своим правилам» — согласование\n  - ○ следом: «символ» → «код, который привязывает SpecTag» в 9.2, 9.4, 9.5, 9.6, 10.4 и строках таблицы; новая строка о файле привязок; принцип");
swap("  - ○ следом: строка 10.1.26\n", "");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: 1.5.2 «Как код привязывается к своим правилам» — согласовываете?");
fs.writeFileSync(file, s);
console.log("ok");
