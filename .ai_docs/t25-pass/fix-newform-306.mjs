// Node 12.3.3, not yet agreed: a proposal carrying out the owner's ruling of 2026-11-14 that a domain must not break its own
// format, with a check built on that rule. A domain writes into its store only data records that conform to their
// RecordType, and the RuntimeCheck generated from that RecordType refuses any other. The owner's explanation that a reader
// takes only the fields it needs is for the agent, not for the rule, so it is not written into the node.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.3"];

const en = [
  "Title: Data records conform to their RecordType",
  "",
  "Text: A domain writes into its store only data records that conform to their RecordType. The RuntimeCheck generated from that RecordType refuses a record that does not.",
  "",
  "The implementation's types and RuntimeChecks are generated from the RecordTypes (§s-6eb92ddch7shuvu) and never written alongside them. Which mechanism performs the RuntimeChecks is described in the technical appendix.",
  "",
  "Reason: The domains that read a domain's data rely on its format. A record that breaks the format is stopped before it is written, so no reader meets it.",
  "",
  "Written alongside the description, a type or a RuntimeCheck is a second copy of the same structure and drifts from it. Generated from the description, they cannot disagree with it.",
].join("\n");
const ru = [
  "Заголовок: Записи данных соответствуют своему RecordType",
  "",
  "Текст: Домен записывает в своё хранилище только записи данных, которые соответствуют их RecordType. Запись, которая не соответствует, отклоняет RuntimeCheck, сгенерированный из этого RecordType.",
  "",
  "Типы и RuntimeChecks реализации генерируются из RecordType (§s-6eb92ddch7shuvu) и никогда не пишутся рядом с ними. Каким механизмом выполняются RuntimeChecks, описано в техническом приложении.",
  "",
  "Обоснование: Домены, которые читают данные домена, полагаются на его формат. Запись, нарушающая формат, останавливается до того, как попадёт в хранилище, и ни один читатель её не встретит.",
  "",
  "Тип или RuntimeCheck, написанный рядом с описанием, — вторая копия той же структуры и отстаёт от неё. Сгенерированные, они с описанием разойтись не могут.",
].join("\n");
n.proposals = [
  {
    where: "заголовок, новый первый абзац текста, новый первый абзац обоснования",
    en,
    ru,
    why: "По вашему решению от 14 ноября: правило, что домен не нарушает свой формат, и проверка на его основе — RuntimeCheck, который уже генерируется из RecordType.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.3 proposal set");
