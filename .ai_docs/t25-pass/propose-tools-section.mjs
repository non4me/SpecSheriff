// Drafts the new wording of the section "The tools" (s-qtq7t32yfqj2yzw), the top section of the appendix of the tools.
// Its text names "the base of the guidelines", a term the owner removed (s-a4rbry4hsu34hy8), and it does not mention
// the extensions of the guidelines or what a project's own guidelines add. The change carries out the owner's decision
// with a wording of its own, so it is shown to the owner as a proposal, without the reviewer's check.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const en = "How the SpecSheriff tools carry out the SpecSheriff guidelines, the extensions of the guidelines (§s-mbmnsnxenmavu3z), and the checks and code generators that a project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze).";
const ru = "Как инструменты SpecSheriff выполняют SpecSheriff guidelines, расширения guidelines (§s-mbmnsnxenmavu3z), а также проверки и генераторы кода, которые добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze).";
drafts["s-qtq7t32yfqj2yzw"] = {
  agreed: false,
  location: "tools (the top section of the appendix)",
  sidValue: "s-qtq7t32yfqj2yzw",
  proposal: {
    title: "The tools",
    ruTitle: "Инструменты",
    parts: [{ kind: "p", en, ru, change: "Было: «How the SpecSheriff tools carry out the base of the guidelines». Термин «base of the guidelines» вы убрали; инструменты теперь выполняют и выбранные расширения, и собственные проверки и генераторы проекта." }],
    text: en,
    ruText: ru,
    refs: [{ type: "cites", to: "s-mbmnsnxenmavu3z" }, { type: "cites", to: "s-2fau85dfyyeq66m" }, { type: "cites", to: "s-km4x4s26kv7pjze" }],
    date: "2026-11-22",
    removed: []
  },
  kind: "section",
  shownAs: "a proposal that carries out the owner's removal of \"the base of the guidelines\", without the reviewer's check"
};

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The agent reads it, the rules it implements and the code it describes, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.",
  "It is the top section of the appendix, and its text names \"the base of the guidelines\", a term that the owner removed. propose-tools-section.mjs drafted its new wording: \"How the SpecSheriff tools carry out the SpecSheriff guidelines, the extensions of the guidelines, and the checks and code generators that a project's own guidelines add.\" The change carries out the owner's decision with a wording of its own, so it is shown to the owner as a proposal, without specsheriff-rule-reviewer's check; tools-drafts.before-tools-section.json is a copy of the drafts made before that script ran. Whatever the owner answers is to be acted on before the review continues. The next node is \"How each check is made\" (s-4kd2pave7vm4hmd), together with its three sections.");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-commands-section.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-commands-section.json is a copy of tools-drafts.json made before that script ran). propose-tools-section.mjs drafts the new wording of the section \"The tools\" (tools-drafts.before-tools-section.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «The tools»: агент читает узел и пишет черновик", "- ● раздел «Инструменты»: новая формулировка показана вам\n- ○ «Как выполняется каждая проверка» и три его раздела");
o = swap(o, "\n\n## ○ Затем:", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Новая формулировка раздела «Инструменты»\n- вместо убранного термина «base of the guidelines»\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
fs.writeFileSync(new URL("tools-drafts.before-tools-section.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`updated at ${now}`);
