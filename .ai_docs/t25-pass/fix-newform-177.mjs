// The owner's comment of 2026-11-10 on 9.4, on «по-прежнему называет тот же узел»: «остается прежним», so «а его SpecTag остаётся прежним», "and its SpecTag
// stays the same". A rewritten form of the SpecTag now counts as a change; the tools step follows (the check forgives a rewritten reference today).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "а его SpecTag по-прежнему называет тот же узел.", "а его SpecTag остаётся прежним.");
swap("text", "and its SpecTag still names the same node.", "and its SpecTag stays the same.");
b.changes = [...b.changes, "По вашему комментарию: «а его SpecTag остаётся прежним»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
