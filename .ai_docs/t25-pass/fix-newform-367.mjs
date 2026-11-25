// The titles of section 7 become short names for what each node is about, as node 7.3.1 requires. The owner accepted
// every title on the page LWDqvJr3RktvVcxMPGgabD on 2026-11-16 ("меня все устраивает"). Only the titles change, so
// each node keeps the owner's agreement, now dated 2026-11-16.
import fs from "node:fs";

const titles = {
  "7.2.1": ["The subject of a rule", "Субъект правила"],
  "7.2.2": ["The order of the text", "Порядок изложения"],
  "7.2.3": ["General words", "Слова общего значения"],
  "7.2.4": ["Naming", "Образование имён"],
  "7.2.5": ["Definition by negation", "Определение через отрицание"],
  "7.2.6": ["Restricting lists", "Ограничивающие списки"],
  "7.3.2": ["Thoughts and sentences", "Мысль и предложение"],
  "7.3.3": ["The contents of a node", "Состав узла"],
  "7.4.1": ["Counts in prose", "Количества в тексте"],
  "7.4.2": ["The reason", "Обоснование"],
  "7.5.1": ["Superfluous rules", "Лишние правила"],
  "7.5.2": ["The length of a sentence", "Длина предложения"],
  "7.5.3": ["Rules as tables", "Правило в виде таблицы"],
  "7.6.1": ["The language of the specification", "Язык спецификации"],
  "7.6.2": ["Capitals", "Заглавные буквы"],
  "7.6.3": ["Examples", "Примеры"],
};
const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-367.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const page = new URL("base-structure.html", import.meta.url);
fs.copyFileSync(page, new URL("base-structure.before-367.html", import.meta.url));
let html = fs.readFileSync(page, "utf8");
for (const [k, [en, ru]] of Object.entries(titles)) {
  const n = d[k];
  if (!n) throw new Error("no draft " + k);
  n.title = en;
  n.ruTitle = ru;
  n.changes = [...(n.changes || []), `Заголовок стал кратким именем по узлу 7.3.1: «${en}» («${ru}»). Вы приняли его 16 ноября.`];
  n.agreed = "2026-11-16";
  const re = new RegExp(`(\\["${k.replace(/\./g, "\\.")}","[a-z]+",\\d,"[^"]*",)"[^"]*","[^"]*"`);
  if (!re.test(html)) throw new Error("row not found " + k);
  html = html.replace(re, `$1"${en}","${ru}"`);
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
fs.writeFileSync(page, html);
console.log("ok");
