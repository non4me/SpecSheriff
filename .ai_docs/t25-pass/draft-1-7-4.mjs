// Node 1.7.4, new: how one extension of the guidelines relies on another, after the owner's decision of 2026-11-16
// that RecordType is an extension of its own that relies on Domains without requiring it. The node names no
// particular extension, as 1.7.3 requires of a rule of the guidelines, so it has no example.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-1-7-4.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["1.7.4"]) throw new Error("1.7.4 already drafted");
const EXT = "s-mbmnsnxenmavu3z";
const draft = {
  from: "",
  sid: "new",
  title: "Dependencies between extensions",
  text: `An extension of the guidelines (§${EXT}) may rely on another extension. Its rules that rely on the other extension form a section of their own, and that section names the other extension. The rules of that section apply only in a project that uses both extensions. The other rules of the extension apply in any project that uses it.`,
  reason: `A project chooses each extension on its own (§${EXT}). When the rules of an extension that rely on another extension form a section of their own, a project can use the extension without the other one, and none of the rules it applies refers to rules it does not use.`,
  ruTitle: "Зависимости между расширениями",
  ruText: `Расширение guidelines (§${EXT}) может опираться на другое расширение. Его правила, которые опираются на другое расширение, образуют отдельный раздел, и этот раздел называет это другое расширение. Правила этого раздела действуют только в проекте, который использует оба расширения. Остальные правила расширения действуют в любом проекте, который его использует.`,
  ruReason: `Проект выбирает каждое расширение сам (§${EXT}). Когда правила расширения, которые опираются на другое расширение, образуют отдельный раздел, проект может использовать это расширение без другого, и ни одно правило, которое он применяет, не ссылается на правила, которых он не использует.`,
  changes: ["Новый узел, по вашему решению от 16 ноября: «RecordType» — отдельное расширение, которое учитывает «Домены», но не требует их. Узел не называет конкретных расширений, как требует 1.7.3, поэтому примера у него нет."],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "1.7.3") out["1.7.4"] = draft;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log("drafted 1.7.4");
