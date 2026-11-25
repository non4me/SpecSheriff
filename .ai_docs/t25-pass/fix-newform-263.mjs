// Node 1.3.4, agreed on 2026-11-08: a proposal. It carries out the owner's decision of 2026-11-14 («для любого TableRule»):
// any TableRule, not only the table of checks, may be approved as a whole in one act, which approves every draft node in
// its cells. The base says "in one act"; the command that does it belongs to the appendix of the tools.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.3.4"];
n.proposals = [
  {
    where: "новый второй абзац текста и новое предложение обоснования",
    en:
      "Text: " + n.text + "\n\n" +
      "An owner of a `TableRule` may approve it as a whole in one act. That act approves every node in its cells that is a draft, and each of those approvals names that owner.\n\n" +
      "Reason: " + n.reason + " " +
      "The requirements in a table are read and agreed side by side, so approving them one by one would only repeat a single agreement.",
    ru:
      "Текст: " + n.ruText + "\n\n" +
      "Ответственный за `TableRule` может одобрить его целиком одним действием. Это действие одобряет каждый узел-черновик в его ячейках, и каждое такое одобрение называет этого ответственного.\n\n" +
      "Обоснование: " + n.ruReason + " " +
      "Требования таблицы читают и согласуют рядом друг с другом, поэтому одобрять их по одному значило бы лишь повторять одно и то же согласие.",
    why:
      "По вашему решению от 14 ноября: одобрение одной командой — для любого `TableRule`, а не только для таблицы проверок. В базе сказано «одним действием»; какая команда это делает, скажет описание инструментов.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("1.3.4 proposal set");
