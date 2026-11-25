// The owner of 2026-11-10 on 8.4: «Посредством `schema` новый тип узла может добавить собственные поля, помимо общих для всех узлов перечисленные в гайдлайне SpecSheriff.»
// Their words go in, the participle agreed and "SpecSheriff guidelines" as the term reads. One word is added, «схеме», since agreed 5.1 has the schema as the only description of a node's structure.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.4"];
if (b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "`schema` типа узлов описывает поля, которые его узлы содержат помимо общих для всех узлов.", "Посредством `schema` новый тип узла может добавить собственные поля, помимо общих для всех узлов, перечисленных в схеме SpecSheriff guidelines.");
swap("text", "A kind's `schema` describes the fields its nodes hold beside those every node holds.", "Through its `schema`, a new kind of node may add fields of its own, beyond those the schema of the SpecSheriff guidelines sets for every node.");
b.changes = [...b.changes, "Предложение о `schema` заменено вашими словами. Добавлено одно слово, «схеме»: согласованный 5.1 говорит, что структуру узла описывает только схема."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
