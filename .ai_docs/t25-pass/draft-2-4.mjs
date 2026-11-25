// Node 2.4, new: a rule of the SpecSheriff guidelines or of an extension requires only the minimum every project needs,
// and a project's own guidelines only make it stricter or more specific, by the owner's ruling of 2026-11-16. It stands
// beside 2.3, which holds a project's own guidelines to refining and extending. The drafts 2.4 and 2.5 become 2.5 and
// 2.6, on the page as well, and every row that lights them up follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-2-4.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["2.6"]) throw new Error("2.6 already exists");
const map = { "2.4": "2.5", "2.5": "2.6" };
const EXT = "s-mbmnsnxenmavu3z", OWN = "s-u7tw6m8npxmv5tu";
const draft = {
  from: "",
  sid: "new",
  title: "The minimum a rule of the guidelines requires",
  text: `A rule of the SpecSheriff guidelines (§${OWN}), or of an extension of the guidelines (§${EXT}), requires only what every project that uses it needs. A project's own guidelines make such a rule stricter or more specific where the project needs it. Where a project has to make a choice, the rule says that the project's own guidelines make it, and makes none for them.`,
  reason: `A project's own guidelines cannot weaken a rule they build on (§${OWN}). A rule that required more than some project needs would leave that project no way to use the SpecSheriff guidelines. A rule that requires the minimum holds in every project, and each project adds what it needs.`,
  examples: ["A rule requires that a node be approved by at least one of its owners. A project's own guidelines may require two approvals. The most likely mistake is a rule that requires two approvals, which a project with a single owner cannot meet."],
  ruTitle: "Минимум, которого требует правило guidelines",
  ruText: `Правило SpecSheriff guidelines (§${OWN}) или расширения guidelines (§${EXT}) требует только того, что нужно каждому проекту, который его использует. Собственные guidelines проекта делают такое правило строже или конкретнее там, где это нужно проекту. Там, где проекту нужно сделать выбор, правило говорит, что выбор делают собственные guidelines проекта, и не делает его за них.`,
  ruReason: `Собственные guidelines проекта не могут ослабить правило, на которое опираются (§${OWN}). Правило, которое требует больше, чем нужно какому-то проекту, не оставило бы этому проекту способа использовать SpecSheriff guidelines. Правило, которое требует минимума, действует в каждом проекте, а каждый проект добавляет то, что нужно ему.`,
  ruExamples: ["Правило требует, чтобы узел одобрил хотя бы один из его ответственных. Собственные guidelines проекта могут требовать двух одобрений. Самая вероятная ошибка — правило, которое требует двух одобрений: проект с одним ответственным не может его выполнить."],
  changes: ["Новый узел, по вашему решению от 16 ноября: общее правило требует только минимума, нужного каждому проекту, а собственные guidelines проекта только ужесточают или конкретизируют его. Стоит рядом с 2.3, который держит собственные guidelines проекта в этих границах. Прежние 2.4 и 2.5 стали 2.5 и 2.6."],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[map[k] ?? k] = v;
  if (k === "2.3") out["2.4"] = draft;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
fs.copyFileSync(page, new URL("base-structure.before-2-4.html", import.meta.url));
let h = fs.readFileSync(page, "utf8");
const s = h.indexOf("const parts = [");
const e = h.indexOf("\n  ];", s);
let parts = h.slice(s, e);
// Rows of section 2 renumbered, from the last to the first so that no number is renamed twice.
for (const k of ["2.5", "2.4"]) parts = parts.replace(`      ["${k}",`, `      ["${map[k]}",`);
// Every row's list of the rows it lights up follows the new numbers.
parts = parts.replace(/\[((?:"[0-9.]+",?)+)\],/g, (all, inner) => `[${inner.replace(/"(2\.[45])"/g, (m, k) => `"${map[k]}"`)}],`);
const row23 = parts.indexOf('      ["2.3",');
const end23 = parts.indexOf("\n", row23);
const line = parts.slice(row23, end23);
const row = `      ["2.4","new",0,"",${JSON.stringify(draft.title)},${JSON.stringify(draft.ruTitle)},"",${JSON.stringify(draft.changes[0])},[],""]`;
parts = parts.slice(0, row23) + (line.endsWith(",") ? line : line + ",") + "\n" + row + "," + parts.slice(end23).replace(/^\n/, "\n");
h = h.slice(0, s) + parts + h.slice(e);
fs.writeFileSync(page, h);
console.log("drafted 2.4");
