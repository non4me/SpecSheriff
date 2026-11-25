// Adds to the draft of "The settings a project shares" the entries that set the specification's approval status and its
// `strict` flag, which the owner placed in `sheriff.config.json` on 2026-11-21, beside the extensions that the project has
// chosen, each entry naming the owner who made it; and gives the draft its links.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const draft = drafts["new:tools-1-settings"];
const p = draft.proposal;

const i = p.parts.findIndex((q) => q.kind === "li" && q.en.startsWith("the extensions of the guidelines that the project has chosen"));
if (i < 0) throw new Error("item not found");
p.parts[i] = {
  kind: "li",
  en: "the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), each entry naming the owner of the specification who made it;",
  ru: "записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и расширения guidelines, выбранные проектом (§s-9ttvcwpqkehm58g); каждая запись называет ответственного за спецификацию, который её сделал;",
  change: "Новое. По вашему решению от 21 ноября записи статуса одобрения спецификации и флага `strict` хранятся здесь, рядом с выбором расширений. Что каждая запись называет ответственного, требуют правила 10.6 и 10.7 и строка 10.1.27b; выбор расширения тоже записывается записью ответственного, как решено 18 ноября."
};

function compose(parts, lang) {
  const out = [];
  for (let k = 0; k < parts.length; k++) {
    const q = parts[k];
    const v = q[lang];
    if (q.kind === "li") out.push(`- ${v}`);
    else out.push(v);
    const next = parts[k + 1];
    if (!next) break;
    const sameBlock = (q.kind === "li" && next.kind === "li") || (q.kind === "p" && next.kind === "li");
    out.push(sameBlock ? "\n" : "\n\n");
  }
  return out.join("");
}
if (p.parts.some((q) => q.kind !== "p" && q.kind !== "li")) throw new Error("unexpected kind of part");
p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");

const implementsSet = ["s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g"];
const cited = [...new Set([...`${p.text}\n${p.reason}`.matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)].map((m) => m[1]))];
p.refs = [
  ...implementsSet.map((to) => ({ type: "implements", to })),
  ...cited.filter((to) => !implementsSet.includes(to)).map((to) => ({ type: "cites", to }))
];
p.reviewed = "pending";
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log(p.text, "\nlinks:", p.refs.map((r) => r.type[0] + ":" + r.to).join(" "));
