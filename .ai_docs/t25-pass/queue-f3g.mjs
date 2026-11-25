// The queue outline after the owner's ruling that 1.5.2 describes the ways of binding, and the question about a file
// beside each file without comments.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● 1.5.2 целиком — ваш вопрос: зачем считать файл символом", "  - ✓ правила говорят о привязке правил к коду; 1.5.2 описывает три способа привязки (ваше решение)\n  - ● третий способ: один общий файл-реестр или файл-спутник рядом с каждым таким файлом\n  - ○ черновик 1.5.2 и термин вместо «символа» в 9.2, 9.4, 9.5, 9.6, 10.4 и строках таблицы");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: файл-спутник рядом с файлом без комментариев?");
fs.writeFileSync(file, s);
console.log("ok");
