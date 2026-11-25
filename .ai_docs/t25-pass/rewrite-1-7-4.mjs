// Node 1.7.4, rewritten under the owner's ruling of 2026-11-16: every extension relies only on the SpecSheriff
// guidelines and names no other extension, so that any combination of extensions works. The earlier draft, in which
// rules that rely on another extension formed a section of their own, is withdrawn. The node mirrors 1.7.3, which says
// the same of a rule of the guidelines. draft-12-3-8.mjs is pointed at the key 12.7 as well.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-rewrite-1-7-4.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.4"];
const EXT = "s-mbmnsnxenmavu3z";
n.title = "A rule of an extension names no other extension";
n.ruTitle = "Правило расширения не называет других расширений";
n.text = `The text and the reason of a rule of an extension (§${EXT}) name no other extension and cite none of its nodes. Such a rule declares no link to a node of another extension.`;
n.ruText = `Текст и обоснование правила расширения (§${EXT}) не называют других расширений и не ссылаются на их узлы. Такое правило не объявляет связей с узлами другого расширения.`;
n.reason = `A project chooses each extension separately (§${EXT}). When no extension relies on another, every combination of extensions that a project chooses works.`;
n.ruReason = `Проект выбирает каждое расширение отдельно от других (§${EXT}). Когда ни одно расширение не опирается на другое, работает любая комбинация расширений, которую выбирает проект.`;
n.examples = ["A rule of an extension about data formats says that a format is declared in the section of the base specification that describes where its data first appear. In a project that also divides its base specification into domains, that section lies in a domain, and the rule needs no word about domains."];
n.ruExamples = ["Правило расширения о форматах данных говорит, что формат объявляется в разделе базовой спецификации, который описывает, где его данные появляются впервые. В проекте, который ещё и делит базовую спецификацию на домены, этот раздел стоит в домене, и правилу не нужно ни слова о доменах."];
n.changes = ["Новый узел, по вашему решению от 16 ноября: каждое расширение опирается только на guidelines и не называет других расширений, поэтому работает любая комбинация расширений. Узел — зеркало 1.7.3, который говорит то же о правилах самих guidelines. Прежняя редакция, где такие правила стояли в отдельном разделе, отозвана."];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
const re = /(\["1\.7\.4","new",1,"",)"[^"]*","[^"]*","","[^"]*"/;
if (!re.test(h)) throw new Error("row 1.7.4 not found");
h = h.replace(re, (all, head) => `${head}${JSON.stringify(n.title)},${JSON.stringify(n.ruTitle)},"",${JSON.stringify(n.changes[0])}`);
fs.writeFileSync(page, h);

const script = new URL("draft-12-3-8.mjs", import.meta.url);
let js = fs.readFileSync(script, "utf8");
for (const [a, b] of [
  ["// Node 12.1.7 (first written for the key 12.3.8)", "// Node 12.7 (first written for the key 12.3.8)"],
  ['newform.before-12-1-7.json', 'newform.before-12-7.json'],
  ['if (d["12.1.7"]) throw new Error("12.1.7 already drafted");', 'if (d["12.7"]) throw new Error("12.7 already drafted");'],
  ['if (k === "12.1.6") out["12.1.7"] = draft;', 'if (k === "12.6") out["12.7"] = draft;'],
  ['console.log("drafted 12.1.7");', 'console.log("drafted 12.7");'],
]) {
  if (!js.includes(a)) throw new Error(a);
  js = js.replace(a, b);
}
fs.writeFileSync(script, js);
console.log("ok");
