// The owner, 2026-11-18: a domain's header contains a level rather than names it, and row 11.3.6 says that
// the header may contain one of the levels if the project's own guidelines define any. Replaces the
// proposal for 11.3.6 with the owner's wording, and renames "names" to "contains" for a level in the
// agreed 11.2.1 and 11.2.2, which remain agreed.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 80)); return s.split(a).join(b); };

const t = read("table-11-3.json");
const r = t.tables[0].rows.find((x) => x.num === "11.3.6");
r.proposals = [{
  en: "A domain's header may contain one of the levels, if the project's own guidelines define levels",
  ru: "Заголовок домена может содержать один из уровней, если такие определены в собственных guidelines проекта",
  why: "Ваша формулировка (18 ноября): заголовок уровень содержит, а не называет; уровень необязателен (ваше решение от 8 ноября, согласованный 11.2.1). Проверка отклоняет заголовок, который содержит уровень не из списка собственных guidelines проекта или содержит уровень, когда список не задан. Заголовок без уровня проходит.",
}];
r.decisions = [{ date: "2026-11-18", problem: "How the check on a domain's level is worded.", ruling: "The owner: a domain's header contains a level rather than names it; it may contain one of the levels, if the project's own guidelines define levels, since a level is optional." }];
write("table-11-3.json", t);

const nf = read("newform.json");
const note = "18 ноября, по вашему слову: заголовок уровень «содержит», а не «называет». Смысл не меняется, согласование сохраняется.";
const a = nf["11.2.1"];
a.text = swap(a.text, "A domain's header may name one of the levels", "A domain's header may contain one of the levels");
a.ruText = swap(a.ruText, "Заголовок домена может называть один из уровней", "Заголовок домена может содержать один из уровней");
a.changes.push(note);
const b = nf["11.2.2"];
b.text = swap(b.text, "domains whose header names no level", "domains whose header contains no level");
const ruBefore = b.ruText;
b.ruText = b.ruText.replace(/заголов\S* которых не назван\S* уровень|в заголовке которых уровень не назван|заголовок которых не называет уровн\S*/, (m) => (m.startsWith("в заголовке") ? "в заголовке которых нет уровня" : "в заголовке которых нет уровня"));
b.changes.push(note);
write("newform.json", nf);
console.log("11.2.2 RU changed:", b.ruText !== ruBefore, "|", b.ruText.split("\n").find((l) => /уровн/.test(l) && /ряд/.test(l)));
