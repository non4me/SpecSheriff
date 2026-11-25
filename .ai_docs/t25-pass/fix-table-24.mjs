// Check 10.1.3, as it comes up, in the form the owner ruled on 2026-11-12: its approved words as the text, a change as
// a proposal apart; what it touches, its test and the Russian of the tools node implementing it (7.1.3).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.en = "No two nodes share a sid";
r.ru = "Никакие два узла не имеют одного sid";
r.change = "Одобренная формулировка, как она стоит в spec.json, без изменений. Ниже — одно предложение.";
r.about =
  "Затрагивает sid каждого узла — и в спецификации, и в архиве. " +
  "sid — единственный способ сослаться на узел, поэтому два узла с одним sid сделали бы двусмысленной каждую ссылку на него: в связях, в коде, в тестах и в коммитах.";
r.noReason = "Своего обоснования не предлагаю: зачем sid должен быть постоянным и единственным, говорит обоснование согласованного 1.2.2, которое проверка охраняет, — оно показано ниже.";
r.proposals = [
  {
    en: "No two nodes, those of the archive included, share a sid",
    ru: "Никакие два узла, включая узлы архива, не имеют одного sid",
    why: "Инструменты уже считают и sid архива (validate.ts:80), а текст этого не говорит. Если новый узел получит sid архивного, на него укажут старые связи `supersedes`, ссылки в истории и в коммитах. Для location такого нет: 10.1.4 считает только узлы спецификации, и это верно, потому что location архивного узла ни на что не указывает.",
  },
];
r.tests = ["unit/validate.test.ts: refuses two nodes sharing a sid, and two sharing a location"];
t.toolsRu["s-vke5hakwf3uyrjs"] = {
  title: "Sid, location, термины и имена RecordType — подсчёт",
  text:
    "`sheriff validate` собирает каждый sid, location, термин и имя RecordType и подсчитывает, сколько раз встречается каждое.\n\n" +
    "- Термин и имя RecordType подсчитываются в нижнем регистре.\n" +
    "- Для каждого узла-термина определяется часть спецификации, в которой он стоит.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 prepared");
