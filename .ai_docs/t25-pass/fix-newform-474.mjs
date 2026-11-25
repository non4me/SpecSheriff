// Proposals of one kind that follow from the agreed 1.7.5 and 1.7.6 (2026-11-18), shown to the owner together under the
// owner's rule on many proposals of one kind:
// - 5.1: the schema also includes the schema of each extension the project has chosen;
// - 10.3: an agent's edit is also refused where it would change the record of the chosen extensions other than through
//   the procedures that record it; the reason names choosing an extension;
// - table 10.1: row 10.1.24 says "or of an extension the project has chosen", as the agreed 2.3 does; new row 10.1.27b
//   checks the entries that record a choice, as 10.1.27a checks those of the strict flag; new row 10.1.27c checks that
//   the installed release delivers every chosen extension.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-474.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const CONF = "s-9ttvcwpqkehm58g";
const EXT = "s-mbmnsnxenmavu3z";
const build = (n, f, where, why) => ({
  where,
  en: [`Title: ${n.title}`, `Text: ${f.text ?? n.text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${f.reason ?? n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${f.ruText ?? n.ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason ?? n.ruReason}`].join("\n\n"),
  why,
});
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.split(from).join(to);
};

{
  const n = d["5.1"];
  const f = {
    text: swap(n.text, "That schema is the schema of the SpecSheriff guidelines together with the extension a project's own guidelines add to it (§s-xm8rz4uupb73gu5).", `That schema is the schema of the SpecSheriff guidelines together with the schema of each extension of the guidelines that the project has chosen (§${CONF}) and the extension of the schema that the project's own guidelines add (§s-xm8rz4uupb73gu5).`),
    ruText: swap(n.ruText, "Эта схема — схема SpecSheriff guidelines вместе с расширением, которое к ней добавляют собственные guidelines проекта (§s-xm8rz4uupb73gu5).", `Эта схема — схема SpecSheriff guidelines вместе со схемой каждого расширения guidelines, которое выбрал проект (§${CONF}), и с расширением схемы, которое добавляют собственные guidelines проекта (§s-xm8rz4uupb73gu5).`),
  };
  n.proposals = [build(n, f, "третья фраза текста", "Выполняет согласованные 1.7.5 и 1.7.6: в схему входят схемы выбранных расширений. Тогда узел типа, который добавляет невыбранное расширение, отвергает проверка по схеме.")];
}
{
  const n = d["10.3"];
  const f = {
    text: swap(n.text, "- change the approvals, or the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), other than through the procedures that record or withdraw them.", `- change the approvals, the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its \`strict\` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§${CONF}), other than through the procedures that record or withdraw them.`),
    ruText: swap(n.ruText, "- изменила бы одобрения или записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) или её флаг `strict` (§s-q3pfzyaxvpr2zj2), иначе чем через процедуры, которые их записывают или отзывают.", `- изменила бы одобрения, записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) или её флаг \`strict\` (§s-q3pfzyaxvpr2zj2), или запись о выбранных проектом расширениях (§${CONF}) иначе чем через процедуры, которые их записывают или отзывают.`),
    reason: swap(n.reason, "An agent that could set an approval status, write an approval or set the `strict` flag itself could make a decision that only the owners make.", "An agent that could set an approval status, write an approval, set the `strict` flag or choose an extension itself could make a decision that only the owners make."),
    ruReason: swap(n.ruReason, "Агент, который мог бы сам выставить статус, записать одобрение или задать флаг `strict`, мог бы принять решение, которое принимают только ответственные.", "Агент, который мог бы сам выставить статус, записать одобрение, задать флаг `strict` или выбрать расширение, мог бы принять решение, которое принимают только ответственные."),
  };
  n.proposals = [build(n, f, "третий пункт текста и первая фраза обоснования", "Выполняет согласованный 1.7.5: выбор расширений меняет только ответственный, а агент — только по его просьбе и через процедуру. Правку записи о выборе инструментами редактирования файлов отвергает охрана.")];
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const tfile = new URL("table-10-1.json", here);
fs.copyFileSync(tfile, new URL("table-10-1.before-141.json", here));
const t = JSON.parse(fs.readFileSync(tfile, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const byNum = (num) => { const r = rows.find((x) => x.num === num); if (!r) throw new Error("row " + num); return r; };
const r24 = byNum("10.1.24");
r24.proposals = [{
  en: `Every rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§${CONF})\n\nOn failure: refused`,
  ru: `Каждое правило собственных guidelines проекта уточняет или расширяет правило SpecSheriff guidelines или выбранного проектом расширения (§${CONF})\n\nПри нарушении: отклоняется`,
  why: "Приводит строку к согласованным 2.3 и 1.7.5: собственное правило проекта может уточнять и правило выбранного расширения.",
}];
const r27a = byNum("10.1.27a");
if (rows.some((x) => x.num === "10.1.27b" || x.num === "10.1.27c")) throw new Error("rows 10.1.27b or 10.1.27c already there");
const group = t.tables.find((g) => g.rows.includes(r27a));
const at = group.rows.indexOf(r27a);
let n = Math.max(...rows.map((x) => x.n));
group.rows.splice(at + 1, 0, {
  n: ++n,
  num: "10.1.27b",
  fate: "new",
  en: "Each new entry that records the choice of an extension, or the withdrawal of that choice, names one of the specification's owners as of the commit that adds it. No commit removes or changes such an entry",
  cost: "refused",
  ru: "Каждая новая запись о выборе расширения или об отмене этого выбора называет одного из ответственных за спецификацию, какими их указывает добавивший её коммит. Ни один коммит не удаляет и не меняет такую запись",
  ruCost: "отклоняется",
  change: "Новая строка, по согласованному 1.7.5: записи о выборе расширений проверяются так же, как записи флага strict (10.1.27a).",
  rests: [CONF],
  impl: [],
  about: "Затрагивает каждый коммит, который добавляет, удаляет или меняет запись о выборе расширения. Выбрать расширение или отменить выбор может только ответственный (1.7.5), сам или через агента по своей просьбе.",
  tests: [],
}, {
  n: ++n,
  num: "10.1.27c",
  fate: "new",
  en: "The installed release of the SpecSheriff plugin delivers every extension that the project has chosen",
  cost: "refused, naming the extension",
  ru: "Установленный выпуск плагина SpecSheriff поставляет каждое расширение, которое выбрал проект",
  ruCost: "отклоняется, с названием расширения",
  change: "Новая строка, по согласованным 1.7.1 и 1.7.5: проект выбирает из расширений, которые поставляет плагин.",
  rests: [CONF, EXT],
  impl: [],
  about: "Затрагивает каждый коммит в проекте, который выбрал хотя бы одно расширение. Если выпуск плагина, установленный у участника, не поставляет выбранное расширение, правила этого расширения некому проверить, поэтому коммит отклоняется и проверка называет расширение.",
  tests: [],
});
fs.writeFileSync(tfile, JSON.stringify(t, null, 2) + "\n");
console.log("ok, rows n up to", n);
