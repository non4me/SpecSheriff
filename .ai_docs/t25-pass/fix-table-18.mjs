// Check 10.1.2, as it comes up: what it touches, its tests, and the Russian of the tools node implementing it (7.1.2).
// No reason of its own is proposed: the rule it guards, agreed 5.1, says why, and its reason is shown beside it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.about =
  "Затрагивает каждый файл спецификации и её архива: его форму сверяют со схемой SpecSheriff guidelines вместе с расширением проекта, а само расширение — со схемой расширения. " +
  "Все остальные проверки и команды рассчитаны на эту форму, поэтому файл другой формы отклоняется до них, с указанием, что в нём не так.";
r.tests = [
  "unit/validate.test.ts: refuses a file that does not match its schema",
  "unit/validate.test.ts: refuses an extension the schema of an extension refuses, naming it, and takes a project's extension as no copy of the schema",
  "unit/validate.test.ts: refuses an extension that is no JSON, or whose kind's schema is no JSON Schema, naming it rather than failing on it",
  "unit/schema.test.ts: composes a project's extension with the schema: its kinds, the fields it adds to a kind, the properties of a file and of a link",
  "unit/schema.test.ts: refuses an extension that does more than add, and then composes nothing",
  "unit/binding.test.ts: sheriff binding refuses a file the schema refuses before it checks anything, naming the file and every refusal in it",
  "unit/binding.test.ts: sheriff binding refuses where the schema of an extension refuses the project's extension, naming it, and checks nothing more",
  "unit/reindex.test.ts: the reindex refuses a file the schema refuses, naming the file and every refusal in it, and then writes no file",
  "unit/reindex.test.ts: the reindex refuses a sid that is not one, since only a sid a node lacks is left out of the validation",
  "unit/reindex.test.ts: the reindex validates once it has changed what an earlier release wrote, and leaves out what it writes itself",
  "unit/reindex.test.ts: the reindex refuses where the schema of an extension refuses the project's extension, naming it, and then writes no file",
  "e2e/commands.test.ts: sheriff reindex and sheriff binding refuse a file the schema refuses, naming it, rather than fail on it",
];
r.noReason = "Своего обоснования не предлагаю: зачем эта проверка, говорит обоснование согласованного 5.1, которое она охраняет, — оно показано ниже.";
t.toolsRu["s-xzcw3hv4hmxz7h7"] = {
  title: "Схема и расширение проекта",
  text:
    "`sheriff validate` проверяет каждый файл валидатором JSON Schema по базовой схеме SpecSheriff guidelines, составленной вместе с расширением проекта (§s-eferktypcj7njt5).\n\n" +
    "Сначала проверяется само расширение — по схеме расширения. Эта схема позволяет расширению добавлять только NodeKind, свойства существующего NodeKind и свойства файла или связи.\n\n" +
    "Добавленное расширением входит в базовую схему:\n" +
    "- его NodeKind — в типы, которые может иметь узел;\n" +
    "- его условия — в те, которым подчиняется каждый узел;\n" +
    "- его свойства файла и связи — в те, что могут быть у файла и у связи.\n\n" +
    "`sheriff binding` проверяет каждый файл по той же схеме, прежде чем проверять что-либо ещё.\n\n" +
    "`sheriff reindex` проверяет каждый файл после того, как слил каждый ключ, записанный дважды, и изменил то, что записал прежний выпуск, как говорит §s-f5rz6b7dhxejjts. Он делает это прежде, чем что-либо вычислять. Из этой проверки он исключает только то, что пишет сам:\n" +
    "- связи, указывающие на узел;\n" +
    "- вне архива — sid, которого у узла нет, все location, индекс разделов в заголовке домена, значения, собранные рядом с полем, и статус раздела и заголовка домена.\n\n" +
    "Если схема отклоняет файл или схема расширения отклоняет расширение проекта, каждая из этих двух команд называет файл или расширение и каждую причину отказа в нём. Дальше она ничего не проверяет. `sheriff reindex` тогда не пишет ни одного файла.",
  reason:
    "Каждая команда рассчитана на ту форму, которую схема задаёт файлу. Только проверка по схеме называет, где файл отходит от этой формы и что там не так. `sheriff reindex` строит каждый файл из всех остальных, поэтому если записать только часть, файлы разошлись бы между собой.\n\n" +
    "Ключ, записанный дважды, сливается первым, потому что файл, прочитанный без слияния, хранит только последнее значение. То, что записал прежний выпуск, меняется первым, потому что схема отвергает его старые имена. То, что `sheriff reindex` пишет сам, исключается, потому что в узле, написанном вручную, этого нет, пока команда не запущена.",
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.2 prepared");
