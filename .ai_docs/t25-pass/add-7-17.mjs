// The owner, 2026-11-13: the rule on shortening, agreed as step 1 "Shorten" of the "Writing" section of their global
// CLAUDE.md, goes into the method as well, as a new node right after the node that opens a node's text with its main
// thought (7.6, a part of the present 6.3), not as an addition to it, since node 7.7 keeps apart what is applied apart.
// It applies only to what is written from now on. Its key 7.17 is temporary: the row stands after 7.6 on the page, and
// the node takes its place after 7.6 when the drafts are moved into the specification files. Its sid is drawn now and
// checked unique.
import fs from "node:fs";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["7.17"]) throw new Error("7.17 exists");

const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const taken = new Set();
const scan = (text) => { for (const m of text.matchAll(/s-[2-9a-hjkmnp-z]{15}/g)) taken.add(m[0]); };
scan(fs.readFileSync(draftsPath, "utf8"));
for (const dir of ["../../specs/_guidelines/", "../../specs/_archive/", "../../specs/"]) {
  const url = new URL(dir, here);
  if (!fs.existsSync(url)) continue;
  for (const f of fs.readdirSync(url)) if (f.endsWith(".json")) scan(fs.readFileSync(new URL(f, url), "utf8"));
}
let sid;
do { sid = "s-" + Array.from({ length: 15 }, () => alphabet[randomInt(alphabet.length)]).join(""); } while (taken.has(sid));

const title = "A sentence is as short as its meaning allows";
const ruTitle = "Предложение настолько коротко, насколько позволяет его смысл";
d["7.17"] = {
  from: "",
  sid: "new",
  sidValue: sid,
  title,
  ruTitle,
  text:
    "Each sentence of a node is as short as it can be while keeping all of its meaning, correct grammar and natural wording. " +
    "Shortening keeps every condition and every exception. It never produces any of the following:\n" +
    "- a sentence without a subject or a verb;\n" +
    "- a string of nouns in place of a verb;\n" +
    "- a missing article, preposition or other small word that a careful native writer would use;\n" +
    "- a label or an abbreviation in place of the words it stands for.",
  ruText:
    "Каждое предложение узла настолько коротко, насколько возможно, при условии, что оно сохраняет весь свой смысл, правильную грамматику и естественный оборот. " +
    "Сокращение сохраняет каждое условие и каждое исключение. Оно никогда не даёт ничего из следующего:\n" +
    "- предложения без подлежащего или сказуемого;\n" +
    "- цепочки существительных вместо глагола;\n" +
    "- пропущенного артикля, предлога или другого служебного слова, которое поставил бы аккуратный носитель языка;\n" +
    "- ярлыка или сокращения вместо слов, которые они обозначают.",
  reason:
    "A sentence longer than its meaning requires makes the reader search for its point. " +
    "A sentence shortened until it is ungrammatical can be read in more than one way, and agents then apply the same rule in different ways.",
  ruReason:
    "Предложение длиннее, чем требует его смысл, заставляет читателя искать мысль. " +
    "Предложение, сокращённое до потери грамматики, можно прочесть по-разному, и тогда агенты применяют одно и то же правило по-разному.",
  changes: [
    "Новый узел, по вашему решению от 13 ноября: правило о краткости, согласованное как шаг «Сократи» в вашем CLAUDE.md, входит и в метод. " +
      "Он встаёт сразу после 7.6; в нынешней спецификации это место сразу после 6.3, который в новой форме разделён на 7.5 и 7.6. " +
      "Номер 7.17 временный: при переносе черновиков в файлы спецификации узел займёт место после 7.6. " +
      "Правило применяется только к тому, что пишется дальше; согласованные узлы приводятся к нему при следующем изменении.",
  ],
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const at = lines.findIndex((l) => l.trim().startsWith('["7.6",'));
if (at < 0) throw new Error("row 7.6 not found");
if (!lines[at].trim().endsWith(",")) lines[at] = lines[at] + ",";
lines.splice(at + 1, 0, "      " + JSON.stringify(["7.17", "new", 0, "", title, ruTitle, "", "Новый узел, по вашему решению от 13 ноября; стоит после 7.6, номер временный.", [], ""]) + ",");
fs.writeFileSync(pagePath, lines.join("\n"));
console.log(sid);
