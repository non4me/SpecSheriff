// Corrects the English of the agreed "Where the files are" (s-zefk589ykh37b8u) after EngStickler's reader read it,
// without changing its meaning, and writes english-tools-1.md again.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const draft = drafts["s-zefk589ykh37b8u"];
const p = draft.proposal;
if (draft.agreed !== "2026-11-21") throw new Error("unexpected state");

function compose(parts, lang) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const q = parts[i];
    const v = q[lang];
    if (q.kind === "th") out.push(`| ${v.join(" | ")} |\n|${v.map(() => "---").join("|")}|`);
    else if (q.kind === "tr") out.push(`| ${v.join(" | ")} |`);
    else if (q.kind === "li") out.push(`- ${v}`);
    else out.push(v);
    const next = parts[i + 1];
    if (!next) break;
    const sameBlock = (q.kind === "th" || q.kind === "tr") && next.kind === "tr" || (q.kind === "li" && next.kind === "li") || (q.kind === "p" && next.kind === "li");
    out.push(sameBlock ? "\n" : "\n\n");
  }
  return out.join("");
}
const first = (q) => (Array.isArray(q.en) ? q.en[0] : q.en);
const part = (start) => {
  const q = p.parts.find((x) => first(x).startsWith(start));
  if (!q) throw new Error("part not found: " + start);
  return q;
};
const swap = (q, lang, col, from, to) => {
  const v = col === null ? q[lang] : q[lang][col];
  if (!v.includes(from)) throw new Error(`not found in ${lang}: ${from}`);
  if (col === null) q[lang] = v.replace(from, to); else q[lang][col] = v.replace(from, to);
};

swap(part("Each domain"), "en", 1, "nor the name of any other directory that this table names", "nor the name of any directory that this table names");
swap(part("Each domain"), "ru", 1, "не имя другой папки в `specs/`", "не имя папки в `specs/`");
swap(part("The settings of the SpecSheriff tools"), "en", 0, "that the project shares, among them", "that are common to the whole project, among them");
const views = part("The map");
views.en[1] = "`specs/_viewer/` for the map and `md-version/` for the export, both of which git ignores";
views.ru[1] = "`specs/_viewer/` — для карты, `md-version/` — для экспорта; git игнорирует обе папки";
const shared = part("The files that every project shares");
swap(shared, "en", null, "The files that every project shares come with", "The files common to every project come with");
swap(shared, "en", null, "In that repository, the tools read the files there:", "In that repository, the tools read the files at those paths:");
swap(shared, "ru", null, "В этом репозитории инструменты читают файлы там:", "В этом репозитории инструменты читают файлы по этим путям:");
const schema = part("The schema of the SpecSheriff guidelines");
swap(schema, "en", 0, "for the file of a part of the specification", "for a file of a part of the specification");
swap(schema, "en", 0, "whether an extension of the guidelines or the project adds it", "whether it is added by an extension of the guidelines or by the project");
const closing = p.parts[p.parts.length - 1];
closing.en = "`<name>` is the extension's name, which `sheriff.config.json` uses to list the extension once the project has chosen it.";
closing.ru = "`<name>` — имя расширения, под которым `sheriff.config.json` указывает это расширение, когда проект его выбрал.";
p.reason = p.reason.replace("wherever an installation has put the plugin", "wherever the plugin is installed");
p.ruReason = p.ruReason.replace("куда бы установка ни положила плагин", "куда бы ни был установлен плагин");
if (!p.reason.includes("wherever the plugin is installed")) throw new Error("reason not changed");

p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");
draft.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-tools-1-english.mjs";
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-tools-1.md", here), [
  "# \"Where the files are\" (s-zefk589ykh37b8u), the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
console.log("English of the agreed node corrected");
