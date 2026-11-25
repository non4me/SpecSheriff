// EngStickler, batch 11: "the files of types" reads two ways, so the draft of "The settings common to a project" says
// which files are meant: those into which `sheriff types` writes the types.
import fs from "node:fs";

const url = new URL("tools-drafts.json", import.meta.url);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const p = drafts["new:tools-1-settings"].proposal;
const en = ["the files of types that `sheriff types` writes", "the files into which `sheriff types` writes the types"];
const ru = ["файлы типов, которые пишет `sheriff types`", "файлы, в которые `sheriff types` записывает типы"];
const swap = (s, [from, to]) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};
const part = p.parts.find((x) => x.en.includes(en[0]));
part.en = swap(part.en, en);
part.ru = swap(part.ru, ru);
p.text = swap(p.text, en);
p.ruText = swap(p.ruText, ru);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log("draft corrected");
