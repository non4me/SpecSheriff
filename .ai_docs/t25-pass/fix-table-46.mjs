// Check 10.1.10 of the table of checks, in the new form: its approved words as the text, with their Russian, what it
// touches, its tests, the Russian of tools 7.1.9, and two proposals from the draft: the domain's header leaves the base
// for the Domains extension, and "status" becomes "approval status" (7.8). "Derived from" in place of "produce" is an
// English-only change that follows the agreed Russian and needs no proposal.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.10");
r.en = "The status of each section and domain's header is the one derived from the nodes under it";
r.ru = "Статус каждого раздела и заголовка домена — тот, что дают узлы под ним";
r.about =
  "Затрагивает статус одобрения каждого раздела. Раздел ничего не требует и сам не одобряется: его статус выводится из узлов под ним, на любой глубине, кроме самих разделов (правило 1.3.8). " +
  "Проверка пересчитывает этот статус и отклоняет файл, где у раздела записан другой. Вручную статус раздела не ставит никто, его пишет `sheriff reindex`.";
r.tests = [
  "unit/validate.test.ts: refuses a section or a domain's header whose status is not the one the nodes under it produce",
  "unit/model.test.ts: builds a section's status from the nodes under it that are no section, and a domain's header's from every node of the domain",
];
t.toolsRu["s-agc6fb3vx46pc23"] = {
  title: "Указатели, входящие связи, собранные значения и статусы разделов и заголовков — пересобираются",
  text:
    "`sheriff validate` пересобирает их в памяти и сравнивает с тем, что в коммите:\n\n" +
    "- указатель каждого заголовка домена — по заголовку, каким он сейчас стоит в файлах домена;\n- входящие связи;\n" +
    "- значения, собранные рядом с каждым полем (§s-ju5vcanbjph7mgh);\n- статус каждого раздела и заголовка домена (§s-9kfdycuq34beqvs).",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "\"each section and domain's header\" becomes \"each section\"",
    ru: "«каждого раздела и заголовка домена» становится «каждого раздела»",
    why: "Заголовок домена ушёл в расширение «Домены»: по согласованному 12.1.3 основное правило не называет конкретного расширения. Проверку статуса заголовка добавит само расширение.",
  },
  {
    en: "\"The status\" becomes \"The approval status\"",
    ru: "«Статус» становится «Статус одобрения»",
    why: "Правило 7.8: общее слово стоит вместе с тем, к чему относится. Так же сказано в согласованном 1.3.8: «статус одобрения раздела».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.10 proposals:", r.proposals.length);
