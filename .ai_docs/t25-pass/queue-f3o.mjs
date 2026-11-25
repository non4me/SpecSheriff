// The queue outline after the owner accepted the proposals that follow from 1.5.2: the principle is next.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● «символ» → «код, который привязывает SpecTag» в 9.2, 9.4, 9.5, 9.6, 10.4, 10.1 и пяти строках таблицы; новая строка 10.1.26b\n  - ○ следом: принцип «Rule, test and code bound by the sid»", "  - ✓ «символ» → «код, который привязывает SpecTag» в 9.2, 9.4, 9.5, 9.6, 10.4, 10.1 и пяти строках таблицы; новая строка 10.1.26b — приняты\n  - ● принцип «Rule, test and code bound by the sid»: «код привязан к правилу» вместо «у каждого символа есть SpecTag»");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: принцип — «этот код и каждый тест привязаны к правилу SpecTag»?");
fs.writeFileSync(file, s);
console.log("ok");
