// The reasons of the cell nodes 7.2.4.1 to 7.2.4.5, agreed on 2026-11-16: fixes to the English alone, after
// EngStickler's readers read them; the Russian, and so the agreed meaning, does not change.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-394.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (k, a, b) => {
  if (!d[k].reason.includes(a)) throw new Error(`${k}: ${a}`);
  d[k].reason = d[k].reason.replace(a, b);
};
swap("7.2.4.1", "suggests to the reader a special meaning that is not there.", "suggests a special meaning to the reader that is not there.");
swap("7.2.4.2", "fits many meanings.", "admits many meanings.");
swap("7.2.4.3", "A general word standing alone in a name means", "A name that consists only of a general word means");
swap("7.2.4.3", "A field called type, for example,", "A field called `type`, for example,");
swap("7.2.4.3", "and the kind of error in a third.", "and the kind of error in a third log.");
swap("7.2.4.4", "from the ordinary word it may be.", "from the ordinary word it may coincide with.");
swap("7.2.4.5", "A name coined to express one relation of an entity", "A name coined to express a relation that an entity has to another entity");
for (const k of ["7.2.4.1", "7.2.4.2", "7.2.4.3", "7.2.4.4", "7.2.4.5"]) d[k].changes.push("После согласования, по замечаниям читателей EngStickler, поправлен только английский текст обоснования; русский текст и смысл не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
