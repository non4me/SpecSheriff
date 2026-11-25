// The inventory of stage 2 found that the agreed 6.4 (s-bpdqd9v72wg7vsz) and the agreed 2.1 (s-a4rbry4hsu34hy8) together
// keep the links that the appendix of the tools makes to the guidelines from being mirrored in the guidelines, since 2.1
// puts the appendix outside the guidelines. The reason of the agreed 2.2 (s-uxtyyen92jygth4) relies on those links. The
// plugin carries the appendix with the guidelines (skills/tools/src/spec-files.ts), so those links read the same in every
// project on a release. Proposes that a node of the guidelines, and a node of a chosen extension, also hold the links that
// point at it from the appendix of the tools.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-propose-6-4.json", here));
const n = nf["6.4"];
if (n.proposals?.length) throw new Error("6.4 already holds a proposal");

const enText = swap(n.text,
  "A node of the SpecSheriff guidelines holds only the links pointing at it from the SpecSheriff guidelines. A node of an extension that the project has chosen (§s-9ttvcwpqkehm58g) holds only the links pointing at it from that extension.",
  "A node of the SpecSheriff guidelines holds only the links pointing at it from the SpecSheriff guidelines and from the appendix of the tools (§s-a4rbry4hsu34hy8). A node of an extension that the project has chosen (§s-9ttvcwpqkehm58g) holds only the links pointing at it from that extension and from the appendix of the tools.", "6.4 text");
const ruText = swap(n.ruText,
  "Узел SpecSheriff guidelines содержит только те связи, которые указывают на него из SpecSheriff guidelines. Узел выбранного проектом расширения (§s-9ttvcwpqkehm58g) содержит только те связи, которые указывают на него из этого расширения.",
  "Узел SpecSheriff guidelines содержит только те связи, которые указывают на него из SpecSheriff guidelines и из описания инструментов (§s-a4rbry4hsu34hy8). Узел выбранного проектом расширения (§s-9ttvcwpqkehm58g) содержит только те связи, которые указывают на него из этого расширения и из описания инструментов.", "6.4 ruText");
const enReason = swap(n.reason,
  "If they listed the links one project makes to them, the list would hold true of that project alone.",
  "If they listed the links one project makes to them, the list would hold true of that project alone. The appendix of the tools comes with the same release, so the links it makes to them hold true in every project.", "6.4 reason");
const ruReason = swap(n.ruReason,
  "Список в них связей, которые делает к ним один проект, был бы верен только для этого проекта.",
  "Список в них связей, которые делает к ним один проект, был бы верен только для этого проекта. Описание инструментов приходит с тем же релизом, поэтому связи, которые оно делает к ним, верны в каждом проекте.", "6.4 ruReason");

n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Согласованный 2.1 выводит описание инструментов за пределы guidelines, а 6.4 разрешает узлу guidelines держать только связи из самих guidelines. Вместе они запрещают строить в узлах guidelines 152 входящие связи из описания инструментов, на которые опирается обоснование согласованного 2.2: правило описания находят, когда меняется правило, которое оно реализует. Плагин поставляет описание инструментов вместе с guidelines, поэтому эти связи одинаковы в каждом проекте, и довод 6.4 против них не действует.",
  cites: ["s-a4rbry4hsu34hy8"],
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log("proposed");
