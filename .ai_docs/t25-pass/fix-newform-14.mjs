// The owner, 2026-11-07: SpecSheriff is not named in the general rules for now, and an exact
// wording the owner gives is used as given. 1.1.3 takes the owner's comment of 22:44 word for word
// (the term spelled "guidelines", as everywhere in the specification): its two sentences open the
// text, its third opens the reason. Everything the agent had added goes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("full-ru.json", here), "utf8"));
let p13;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/1.13")) p13 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);

const n = d["1.1.3"];
if (n.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
const list = p13.text.split("\n\n").slice(1).join("\n\n").replace("- tries to govern anything else;", "- tries to govern anything but how the specification is kept, changed and implemented;");
const ruList = "Правило отбрасывается, если оно:\n\n- пытается регулировать что-либо, кроме того, как спецификация ведётся, меняется и реализуется;\n- утверждает очевидное.";

n.text = "The guidelines say how the specification is built and by which rules it must be written. A particular project may extend the rules of the guidelines but cannot change the basic ones.\n\n" + list;
n.ruText = "Guidelines говорят о том, как спецификация устроена и по каким правилам она должна создаваться. Конкретный проект может расширить правила guidelines, но не может менять базовые.\n\n" + ruList;
n.reason = "If the basic rules are changed, the tools that watch over the guidelines being kept stop working correctly.\n\n" + p13.reason;
n.ruReason = "Если поменять базовые правила, то инструменты, следящие за соблюдением guidelines, перестанут работать корректно.\n\n" + ru["1.13"].reason;
n.changes = [
  "Заголовок — по вашему комментарию: речь здесь не о всей спецификации, а только о guidelines.",
  "Стоит перед узлом о базе, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
  "Первый абзац текста и первая фраза обоснования — ваша формулировка, дословно. SpecSheriff в общих правилах пока не упоминается, по вашему решению.",
  "Второй абзац текста — абзац 2 нынешнего 1.13. Абзац 1 убран: что спецификация описывает систему, говорят 1.1.4 и 1.1.5. Поэтому «anything else» в первом пункте раскрыто: «anything but how the specification is kept, changed and implemented».",
  "Остальное обоснование — нынешнее обоснование 1.13, дословно.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText, "\n---\n", n.ruReason.split("\n\n")[0]);
