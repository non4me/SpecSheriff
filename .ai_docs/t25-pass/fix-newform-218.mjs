// The fresh reviewer of 10.3 (2026-11-11), its wording fixes: the SpecSheriff tools are the subject of the refusal
// (7.3, as agreed 1.3.8, 9.6 and 10.12 say); in the Russian of item 1 an approval "в силе", as agreed 1.3.3 and 1.3.5
// render "stands". The doubt on a shell command goes to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["10.3"];
if (b.sidValue !== "s-83ev4wwesbwnhnp" || b.agreed) throw new Error("unexpected 10.3");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "Before an agent's edit is made, it is refused where it would do any of these:", "Before an agent's edit is made, the SpecSheriff tools refuse it where it would do any of these:");
swap("ruText", "Прежде чем правка агента сделана, она отклоняется, если сделала бы что-то из этого:", "Прежде чем правка агента сделана, инструменты SpecSheriff отклоняют её, если она сделала бы что-то из этого:");
swap("ruText", "при формулировке, на которую нет одобрения (§s-5ah25f6gy99panq)", "при формулировке, на которую нет одобрения в силе (§s-5ah25f6gy99panq)");
b.changes.push("По рецензенту: подлежащее отказа — инструменты SpecSheriff (7.3); в русском первого пункта «нет одобрения в силе», как в согласованных 1.3.3 и 1.3.5.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
