// The queue outline after the owner's answer on a file that allows no comment: 1.5.2 is shown whole.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● файл без комментариев: связь только от правила или SpecTag рядом с файлом\n  - ○ следом: 9.7 (список кода вручную для файла без комментариев), строка 10.1.26", "  - ✓ файл без комментариев: SpecTag хранятся вне файла, место задаёт описание инструментов (ваше решение)\n  - ● 1.5.2 целиком — согласование\n  - ○ следом: строка 10.1.26");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: 1.5.2 «SpecTag в коде системы» — согласовываете?");
fs.writeFileSync(file, s);
console.log("ok");
