// Check 10.1.8 of the table of checks, in the new form: its approved words as the text, with their Russian, what it
// touches, its test, the Russian of tools 7.1.5, and three proposals. The draft's earlier changes (the domain's header
// gone to the Domains extension; "uses"; the words of agreed 1.3.3 in place of "fingerprint") become proposals 1 and 2.
// Proposal 3 follows the agreed 10.1.3 to 10.1.7: an archived node has no sid, so no approval can be looked up for it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.8");
r.en = r.was.split(" | ")[0];
r.ru =
  "Каждый узел вне SpecSheriff guidelines, которые берёт проект, кроме раздела и заголовка домена, одобрен только там, где последняя запись для него и отпечатка его формулировки — одобрение";
r.about =
  "Затрагивает каждый одобренный узел спецификации, кроме узлов SpecSheriff guidelines и разделов. Статус «одобрен» держится, только пока в силе одобрение его нынешней формулировки: " +
  "узел, формулировку которого изменили без нового одобрения, проверка не даёт записать как одобренный.";
r.tests = ["unit/validate.test.ts: refuses an approved node no approval stands for"];
t.toolsRu["s-95w92rnjuv3sst8"] = {
  title: "Одобрение одобренного узла",
  text:
    "`sheriff validate` ищет каждый одобренный узел в одобрениях. Последняя строка для sid узла и отпечатка его формулировки должна быть одобрением. Не рассматриваются:\n\n" +
    "- узлы SpecSheriff guidelines, которые берёт проект;\n- раздел и заголовок домена.\n\n" +
    "`sheriff validate` ищет того, кого называет строка одобрения, среди ответственных за её узел — такими, какими их хранит коммит. " +
    "Так делается для каждого одобрения, которое коммит добавляет к одобрениям своего родителя. Одобрения родителя читаются так, как их переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts).",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "\"a project takes, but a section and a domain's header,\" becomes \"a project uses, except a section,\"",
    ru: "«которые берёт проект, кроме раздела и заголовка домена,» становится «которые использует проект, кроме раздела,»",
    why:
      "Заголовок домена ушёл в расширение «Домены»: по согласованному 12.1.3 основное правило не называет конкретного расширения. «Использует» — как в согласованных 2.4 и 1.3.7.",
  },
  {
    en: "\"is approved only where the latest record for it and its wording's fingerprint is an approval\" becomes \"is approved only while an approval of its current wording is in force\"",
    ru: "«одобрен только там, где последняя запись для него и отпечатка его формулировки — одобрение» становится «одобрен, только пока в силе одобрение его нынешней формулировки»",
    why: "Слова согласованного 1.3.3. «Отпечаток» нигде в базе не объяснён: это устройство инструментов, ему место в описании инструментов (7.1.5).",
  },
  {
    en: "\"Every node outside\" becomes \"Every node of the specification outside\"",
    ru: "«Каждый узел вне» становится «Каждый узел спецификации вне»",
    why:
      "Как в согласованных 10.1.3–10.1.7. У архивного узла нет sid, поэтому одобрение для него найти нельзя, и без этих слов проверка отклоняла бы каждый архивный узел. Инструменты и сейчас смотрят только узлы спецификации.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.8 proposals:", r.proposals.length);
