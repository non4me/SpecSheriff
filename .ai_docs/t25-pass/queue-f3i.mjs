// The queue outline after the owner's ruling for one registry file.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● третий способ: один общий файл-реестр или файл-спутник — минусы реестра, насколько они критичны", "  - ✓ третий способ: один общий файл привязок; проверки на каждом коммите проходят по нему; JSON назван в guidelines, проект расширяет список (ваше решение)\n  - ● где лежит общий файл: рядом с sheriff.config.json в корне репозитория");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: общий файл привязок — в корне, рядом с sheriff.config.json?");
fs.writeFileSync(file, s);
console.log("ok");
