// The proposal for 9.5: now that the owner has agreed to 10.7, under which the approval procedure refuses while the strict
// flag is on and such code remains, the sentence of the reason saying that the owners may approve the specification after
// seeing the reports on such code holds only while the flag is off, and says so.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-430.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["9.5"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("en", "The owners may approve the specification after seeing the reports on such code", "While the strict flag is off, the owners may approve the specification after seeing the reports on such code");
swap("ru", "Ответственные могут одобрить спецификацию, увидев сообщения о таком коде", "Пока флаг strict выключен, ответственные могут одобрить спецификацию, увидев сообщения о таком коде");
p.where = "текст, пример и одно предложение обоснования";
p.why = p.why.replace("Обоснование не меняется.", "В обосновании одно предложение уточнено: одобрить спецификацию при коде без SpecTag ответственные могут, пока флаг strict выключен (согласованный 10.7).");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
