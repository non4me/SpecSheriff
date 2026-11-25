// The owner's refined wordings of 2026-11-07 (in the conversation), taken word for word; only spelling
// and punctuation are put right. 1.1.2: the guidelines say how the specification is kept and
// implemented. 1.1.3: a project may extend the rules of the guidelines but cannot change them, and
// the reason names the tools that check the format and the implementation. 1.1.4: the owner's three
// sentences stand in place of its first sentence; the sentences after it stay until the owner says
// otherwise. 7.4's list item follows 1.1.2.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("full-ru.json", here), "utf8"));
let p16;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/1.16")) p16 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);
const rep = (n, f, a, b) => {
  if (d[n][f].includes(b) && !d[n][f].includes(a)) return;
  if (!d[n][f].includes(a)) throw new Error(`${n}.${f}: not found: ${a}`);
  d[n][f] = d[n][f].replace(a, b);
};

// 1.1.2
rep("1.1.2", "text", "- the guidelines say how the specification is kept, changed and implemented;", "- the guidelines say how the specification is kept and implemented;");
rep("1.1.2", "ruText", "- guidelines говорят, как спецификация ведётся, меняется и реализуется;", "- guidelines говорят, как спецификация ведётся и реализуется;");
if (!d["1.1.2"].changes.some(c => c.includes("ведётся и реализуется"))) d["1.1.2"].changes.push("Пункт о guidelines — ваша уточнённая формулировка: «как спецификация ведётся и реализуется».");

// 1.1.3
rep("1.1.3", "text", "A particular project may extend the rules of the guidelines but cannot change the basic ones.", "A particular project may extend the rules of the guidelines but cannot change them.");
rep("1.1.3", "ruText", "Конкретный проект может расширить правила guidelines, но не может менять базовые.", "Конкретный проект может расширить правила guidelines, но не может их менять.");
d["1.1.3"].reason = "If the rules of the guidelines are changed, the tools that check the format and the implementation against the guidelines will stop working correctly.";
d["1.1.3"].ruReason = "Если поменять правила guidelines, то инструменты, следящие за соответствием формата и реализации в соответствии с guidelines, перестанут работать корректно.";
d["1.1.3"].changes[2] = "Текст и обоснование — ваша формулировка, дословно, с уточнениями от 7 ноября: проект не может менять правила guidelines; инструменты следят за соответствием формата и реализации. SpecSheriff в общих правилах пока не упоминается, по вашему решению.";

// 1.1.4
const owner = "A rule of the base specification states what the system does. Leaving out technical detail, it describes only the business logic that is to be implemented. It may also hold any further information needed to understand the rule exactly, with all its nuances and edge cases.";
const ruOwner = "Правило базовой спецификации говорит, что делает система. Опуская технические подробности, оно описывает только бизнес-логику, которую требуется реализовать. Здесь же может быть любая дополнительная информация, необходимая для точного понимания правила со всеми нюансами и крайними случаями.";
const after = s => s.replace(/^[^.]*\.\s*/, "");
d["1.1.4"].text = owner + " " + after(p16.text);
d["1.1.4"].ruText = ruOwner + " " + after(ru["1.16"].text);
d["1.1.4"].changes = [
  "Заголовок — ваш, из комментария.",
  "Текст: первая фраза нынешнего 1.16 заменена вашими тремя фразами, дословно. Исправлены только написание («бизнес-логику», «требуется», «может», «нюансами») и пунктуация; во второй фразе «и описывает» стало «оно описывает». Остальной текст — нынешний 1.16, дословно.",
  "Обоснование — нынешнее 1.16, кроме начала первой фразы: ваша правка «Это позволяет реализовать спецификацию на другом техническом стеке».",
];

// 7.4 follows 1.1.2.
rep("7.4", "text", "anything but how the specification is kept, changed and implemented;", "anything but how the specification is kept and implemented;");
rep("7.4", "ruText", "кроме того, как спецификация ведётся, меняется и реализуется;", "кроме того, как спецификация ведётся и реализуется;");
d["7.4"].changes[2] = "Текст — абзац 2 нынешнего 1.13. «Anything else» в первом пункте раскрыто словами 1.1.2: «anything but how the specification is kept and implemented», потому что абзац 1, на который оно опиралось, здесь не стоит.";

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(d["1.1.4"].ruText);
