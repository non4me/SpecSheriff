// The owner of 2026-11-11 on 9.4: "the very test or code" becomes "the very test or symbol of code", so that
// a change to a SpecTag changes the symbol it marks and not the file it stands in (the reviewer's ✗ on 7.8).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "the very test or code in which it is present.", "the very test or symbol of code in which it is present.");
swap("ruText", "изменением самого теста или кода, в котором он присутствует.", "изменением самого теста или символа кода, в котором он присутствует.");
b.changes.push("По вашему выбору в первой фразе «кода» стало «символа кода»: изменённым считается символ, над которым стоит SpecTag, а не весь файл. Слово потерялось при слиянии узлов: в нынешнем 3.5 было «изменение его SpecTag — изменение его кода», где «его» значило символ.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n" + b.ruText);
