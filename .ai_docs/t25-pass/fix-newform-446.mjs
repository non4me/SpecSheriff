// Node 1.5.2: the owner's wording of 2026-11-17 for the second way of binding replaces "the file's first comment": the
// SpecTags stand in the area that allows a comment, as near the start of the file as possible, where the file's symbols
// cannot be identified. The agent added "the checks" to the condition, as in the first way, and used "identify" in both.
// The paragraph on what each way binds and the first example follow the new wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-446.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["1.5.2"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("en", "- by a SpecTag directly before each symbol, where the checks (§s-jau82aq9juv9zzh) can tell the file's symbols apart;", "- by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;");
swap("en", "- by SpecTags in the file's first comment, where the checks cannot tell them apart;", "- by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;");
swap("en", "SpecTags in a file's first comment, and an entry in the file of bindings, bind the whole file.", "SpecTags at the start of a file, and an entry in the file of bindings, bind the whole file.");
swap("en", "A file of styles whose symbols the checks cannot tell apart has its SpecTag in its first comment.", "A file of styles whose symbols the checks cannot identify has its SpecTag in a comment at its start.");
swap("ru", "- SpecTag непосредственно перед каждым символом, если проверки (§s-jau82aq9juv9zzh) могут различить символы файла;", "- SpecTag непосредственно перед каждым символом, если проверки (§s-jau82aq9juv9zzh) могут определить символы файла;");
swap("ru", "- SpecTag в первом комментарии файла, если проверки не могут их различить;", "- SpecTag в области, допускающей размещение комментария, как можно ближе к началу файла, если проверки не могут определить символы файла;");
swap("ru", "SpecTag в первом комментарии файла и запись в файле привязок привязывают весь файл.", "SpecTag в начале файла и запись в файле привязок привязывают весь файл.");
swap("ru", "У файла стилей, символы которого проверки не различают, SpecTag стоит в первом комментарии.", "У файла стилей, символы которого проверки не могут определить, SpecTag стоит в комментарии в начале файла.");
p.why = `${p.why} Второй способ — в вашей формулировке от 17 ноября, с добавленным «проверки», как в первом способе.`;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
