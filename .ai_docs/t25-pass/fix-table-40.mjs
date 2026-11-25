// Check 10.1.6 is agreed with its proposal, for the base without domains (the owner, 2026-11-12: «Данная формулировка
// согласована, но только для случая когда мы работаем без доменов»). The extension that adds domains is to widen the rule:
// a term that more than one domain uses is defined in the contracts section, and a term that only one domain uses is
// defined in that domain. Check 10.1.7 gets one proposal like that of 10.1.6: an archived term node no longer holds its
// name against a new term.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const six = rows.find((x) => x.num === "10.1.6");
const [text] = six.proposals;
six.en = text.en;
six.ru = text.ru;
delete six.proposals;
six.agreed = "2026-11-12";
six.change =
  "Английский «is in the contracts section» вместо «stands in contracts», по смыслу русского. «Of the specification» добавлено по вашему решению (2026-11-12): " +
  "архивный узел-термин лежит в архиве. Согласовано для базы без доменов. Расширение для доменов расширит правило: термин, который нужен нескольким доменам, " +
  "определяется в contracts, а термин, который нужен одному домену, — в самом домене.";

const seven = rows.find((x) => x.num === "10.1.7");
seven.about =
  "Затрагивает имя каждого узла-термина спецификации. Термин определяется один раз (правило 3.2), поэтому два узла с одним именем — это один термин, определённый дважды. " +
  "Регистр букв не учитывается: «User» и «user» — одно имя. Архивный узел-термин имя не занимает: позже новый термин может взять это имя.";
seven.tests = [
  "unit/validate.test.ts: refuses two term nodes naming one term, and two RecordTypes sharing a name",
  "unit/validate.test.ts: refuses two term nodes, or two RecordTypes, whose names differ only in the case of their letters",
];
seven.proposals = [
  {
    en: "No two term nodes of the specification name the same term, regardless of letter case",
    ru: "Никакие два узла термина в спецификации не называют одного и того же термина, без учёта регистра букв",
    why:
      "Как в согласованных 10.1.3, 10.1.5 и 10.1.6. Удалённый термин лежит в архиве, и новый термин может взять его имя; без слов «в спецификации» проверка отклонила бы это. " +
      "Инструменты и сейчас считают имена терминов только у узлов спецификации (validate.ts).",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.6 agreed:", six.en, "| 10.1.7 proposals:", seven.proposals.length);
