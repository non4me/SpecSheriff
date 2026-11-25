// Node 1.7.5, new: no two extensions of the guidelines change the same rule of the guidelines or define a type of link
// with the same name, so that a combination of extensions holds no contradiction. It comes from the first concern of
// specsheriff-rule-reviewer on 1.7.4, which the owner agreed to on 2026-11-16; the wording checker found that this
// requirement can be implemented apart from 1.7.4, so it is a node of its own.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-1-7-5.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["1.7.5"]) throw new Error("1.7.5 already drafted");
const EXT = "s-mbmnsnxenmavu3z", CHANGE = "s-e6stjaxkn44ys4m", LINKS = "s-sn6au3vcr9uy5pm";
const draft = {
  from: "",
  sid: "new",
  title: "Overlap between extensions",
  text: `At most one extension of the guidelines:\n- changes a given rule of the SpecSheriff guidelines (§${CHANGE});\n- defines a type of link with a given name (§${LINKS}).`,
  reason: `A project chooses each extension of the guidelines separately (§${EXT}). Two extensions that changed the same rule, or defined types of link with the same name, would contradict each other in a project that uses both.`,
  ruTitle: "Пересечение расширений",
  ruText: `Не более чем одно расширение guidelines:\n- меняет данное правило SpecSheriff guidelines (§${CHANGE});\n- определяет тип связи с данным именем (§${LINKS}).`,
  ruReason: `Проект выбирает каждое расширение guidelines отдельно от других (§${EXT}). Два расширения, которые меняют одно и то же правило или определяют типы связей с одним именем, противоречили бы друг другу в проекте, который использует оба.`,
  changes: ["Новый узел, из первого замечания рецензента к 1.7.4, который вы согласовали 16 ноября: если два расширения меняют одно правило или определяют одноимённые типы связей, их комбинация противоречит сама себе. Проверка формулировок показала, что это требование выполняется отдельно от 1.7.4, поэтому оно — отдельный узел."],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "1.7.4") out["1.7.5"] = draft;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
const at = h.indexOf('      ["1.7.4",');
const lineEnd = h.indexOf("\n", at);
if (at < 0) throw new Error("row 1.7.4 not found");
const row = `      ["1.7.5","new",1,"",${JSON.stringify(draft.title)},${JSON.stringify(draft.ruTitle)},"",${JSON.stringify(draft.changes[0])},[],""]`;
const line = h.slice(at, lineEnd);
h = h.slice(0, at) + (line.endsWith(",") ? line : line + ",") + "\n" + row + h.slice(lineEnd);
fs.writeFileSync(page, h);
console.log("drafted 1.7.5");
