// Node 2.1, agreed on 2026-11-09: a single, complete new wording proposed to the owner. It carries out the owner's decision
// of 2026-11-13 that the appendix of the tools leaves the guidelines and becomes a document of its own: it describes one
// implementation of the guidelines and changes as often as a technical appendix does, while the guidelines hardly change.
// What is checked, when, and what a failure costs stays in the rules of the guidelines.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.1"];
n.proposals = [
  {
    where: "заголовок, текст и обоснование целиком",
    en:
      "Title: The guidelines and the appendix of the tools\n\n" +
      "Text: The guidelines consist of the rules for keeping the specification and implementing it. They state what is stored, what is checked, when, and what a failure costs.\n\n" +
      "How one toolset carries out these rules is described in a separate document, the appendix of the tools. It is not part of the guidelines. It describes:\n\n" +
      "- the toolset's commands;\n- its hooks;\n- where it keeps the files;\n- how it reads code;\n- who runs its reviewer.\n\n" +
      "Reason: The tools can change while the rule they carry out stays the same, so the appendix of the tools is kept apart from the rules. " +
      "The guidelines hardly change, while the appendix of the tools changes with every release of the tools, as a technical appendix does.",
    ru:
      "Заголовок: Guidelines и описание инструментов\n\n" +
      "Текст: Guidelines состоят из правил ведения и реализации спецификации. Они говорят, что хранится, что проверяется, когда и чего стоит сбой.\n\n" +
      "Как один набор инструментов выполняет эти правила, говорит отдельный документ — описание инструментов. В guidelines оно не входит. Оно описывает:\n\n" +
      "- команды набора инструментов;\n- его хуки;\n- где он хранит файлы;\n- как он читает код;\n- кто запускает его рецензента.\n\n" +
      "Обоснование: Инструменты могут меняться, а правило, которое они выполняют, остаётся, поэтому описание инструментов стоит отдельно от правил. " +
      "Guidelines почти не меняются, а описание инструментов меняется с каждым выпуском инструментов, как техническое приложение.",
    why:
      "По вашему решению от 13 ноября: описание инструментов выходит из guidelines и становится отдельным документом. " +
      "Что проверяется, когда и чего стоит сбой, остаётся в правилах guidelines. " +
      "Список того, что описывает описание инструментов, прежний. Второе предложение обоснования — довод из принципа «Три документа, три скорости изменения».",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.1 proposal set");
