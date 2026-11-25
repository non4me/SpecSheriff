// The owner ruled on 2026-11-18 that a domain's header carries the index only where the domain has
// sections, since a small domain may have none. Narrows row 11.3.2 accordingly and records the matching
// proposal for the agreed 11.1.3. Also corrects the English of the owner's account of a header kept
// with row 11.3.1, as EngStickler's reader recommended.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-11-3.json");
const rows = t.tables[0].rows;
const r1 = rows.find((r) => r.num === "11.3.1");
r1.decisions[0].ruling = "The owner: a domain's header is the auxiliary part of the domain that holds information about the domain itself, such as a brief description, the level assigned to the domain and a list of the titles of its sections.";
const r2 = rows.find((r) => r.num === "11.3.2");
r2.en = "The header of each domain that has sections carries the index computed from those sections";
r2.ru = "Заголовок каждого домена, у которого есть разделы, содержит указатель, вычисленный из этих разделов";
r2.change += " По вашему решению от 18 ноября указатель обязателен, только если у домена есть разделы: маленький домен может их не иметь.";
r2.decisions = [{ date: "2026-11-18", problem: "Whether every domain's header carries an index of sections.", ruling: "The owner: the index is required where the domain has sections; a small domain may have none." }];
write("table-11-3.json", t);

const nf = read("newform.json");
const n = nf["11.1.3"];
n.proposals = [{
  en: "Where the domain has sections, the header also carries their index (§s-2r59txnms5serdr).",
  ru: "Если у домена есть разделы, заголовок несёт ещё и их указатель (§s-2r59txnms5serdr).",
  replaces: { en: "The header also carries the index of the domain's sections (§s-2r59txnms5serdr).", ru: "Ещё заголовок несёт указатель разделов домена (§s-2r59txnms5serdr)." },
  why: "По вашему решению от 18 ноября указатель обязателен, только если у домена есть разделы.",
}];
if (!n.text.includes(n.proposals[0].replaces.en) || !n.ruText.includes(n.proposals[0].replaces.ru)) throw new Error("11.1.3 does not hold the sentence to replace");
write("newform.json", nf);
console.log("11.3.2:", r2.en);
