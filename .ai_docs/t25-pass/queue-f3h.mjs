// The queue outline after the owner asked for the drawbacks of one registry file.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● третий способ: один общий файл-реестр или файл-спутник рядом с каждым таким файлом", "  - ● третий способ: один общий файл-реестр или файл-спутник — минусы реестра, насколько они критичны");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: третий способ — один общий файл?");
fs.writeFileSync(file, s);
console.log("ok");
