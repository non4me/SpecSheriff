// The rule reviewer's second pass on the head of 10.1: the reason names what differs between machines and binds the
// one answer to that commit; the guidelines are read as the project uses them; a push reads the commit each pushed
// ref names; the Russian keeps "SpecSheriff guidelines" and "push"; examples are a list, as 7.16 holds them.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const h = t.head;
const swap = (field, from, to) => {
  if (h[field].split(from).length !== 2) throw new Error(`${field}: ${from}`);
  h[field] = h[field].replace(from, to);
};
swap("text", "- at a push, the commit each pushed ref points to.", "- at a push, the commit each pushed ref names.");
swap("text", "- the SpecSheriff guidelines and their schema (§s-bsya3febm6u64ab);", "- the SpecSheriff guidelines and their schema, as the project uses them (§s-bsya3febm6u64ab);");
swap("ruText", "при пуше, стоит", "при push, стоит");
swap("ruText", "- при пуше — коммит, на который указывает каждая отправляемая ссылка.", "- при push — коммит, который называет каждая отправляемая git-ссылка (ref).");
swap("ruText", "- guidelines SpecSheriff и их схему (§s-bsya3febm6u64ab);", "- SpecSheriff guidelines и их схему в том виде, в каком их использует проект (§s-bsya3febm6u64ab);");
h.reason =
  "Whoever asks whether a commit will go through must get one answer for that commit, wherever and whenever it is asked. " +
  "An answer spread across several rules, or drawn from what differs from one machine to another, comes apart without anybody seeing it.";
h.ruReason =
  "Тот, кто спрашивает, пройдёт ли коммит, должен получать для этого коммита один ответ, где и когда бы он ни спросил. " +
  "Ответ, разнесённый по нескольким правилам или взятый из того, что различается от машины к машине, распадается, и никто этого не видит.";
if (typeof h.examples === "string") h.examples = [h.examples];
if (typeof h.ruExamples === "string") h.ruExamples = [h.ruExamples];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(h.text + "\n---\n" + h.ruText + "\n---\n" + h.reason);
