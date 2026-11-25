// Check 10.1.16 is agreed in the owner's words (2026-11-13, «да»). Check 10.1.17 in the new form: its approved words as the
// text, with their Russian, what it touches, its tests, the Russian of tools 7.1.10, and one proposal: the domain's header
// gone to the Domains extension, and "of the specification" as in the agreed checks before it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.17");
r.en = r.was.split(" | ")[0];
r.ru = "Ни один одобренный узел и ни один раздел или заголовок домена не пишет трёх слов или больше подряд заглавными буквами вне имени, процитированного из кода";
r.about =
  "Затрагивает заголовок, текст и обоснование каждого одобренного узла спецификации и каждого раздела. Фраза заглавными буквами — три слова подряд и больше — отклоняется: " +
  "выделять нужно формулировкой (правило 7.13). Одно или два слова заглавными допустимы (REST API); имена из кода и всё в кавычках не учитываются. " +
  "Черновик проверка не трогает: пока узел правят, заглавные могут стоять временно.";
r.tests = [
  "unit/validate.test.ts: refuses an approved node, and any section or header, setting three words or more running in capitals, two words and a quoted name left out",
  "unit/validate.test.ts: refuses three words or more running in capitals, letters beyond ASCII included, two words left out",
];
t.toolsRu["s-e2vdhfsndy5stq9"] = {
  title: "Слова, идущие подряд заглавными буквами",
  text:
    "`sheriff validate` читает заголовок, текст и обоснование каждого одобренного узла, каждого раздела и заголовка домена и ищет три слова или больше подряд, написанных заглавными.\n\n" +
    "- Каждое такое слово — из двух знаков или больше.\n- Слова разделены только пробелами или табуляциями.\n- Всё, что в обратных или двойных кавычках, не учитывается.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "No approved node of the specification, and no section, sets three or more consecutive words in capitals outside a name quoted from the code",
    ru: "Ни один одобренный узел спецификации и ни один раздел не пишет трёх слов или больше подряд заглавными буквами вне имени, процитированного из кода",
    why:
      "Заголовок домена ушёл в расширение «Домены» (12.1.3). «Узел спецификации» — как в согласованных проверках выше: архивный узел хранит свою последнюю формулировку как есть.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.17 proposals:", r.proposals.length);
