// Node 12.4.3, agreed on 2026-11-14: a new proposal from the owner's own wording of 2026-11-14 («Домены одного уровня
// выстраиваются на одной линии согласно следующего порядка: - сначала по алфавиту те домены которые не связаны с другими -
// далее домены которые связаны между собой, так что бы домен консьюмер был максимально близко к домену источнику справа от
// него») and the four clarifications the owner agreed to («да, согласен»): "linked" means a `consumes` link with a domain
// of the same row; a consumer stands to the right of every source it uses; where the links leave a choice, the
// alphabetical order decides; the map orders its domains by the same rule. The map has a branch per level, so it applies
// the rule within each branch. The list of all the domains goes, and with it "So each domain comes in the list after every
// domain it uses", which the second item now says within a row. The order changes from the one the tools build today.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
n.proposals = [
  {
    where: "текст, обоснование и пример — по вашей формулировке и четырём уточнениям",
    en: [
      "Title: " + n.title,
      "",
      "Text: The domains at the same level are placed in their row in this order:",
      "",
      "- first, in alphabetical order, the domains that have no `consumes` link with another domain of the row;",
      "- then the domains linked to one another: each consuming domain is placed to the right of every domain of the row that it uses, as close to them as possible; where the links leave a choice, the alphabetical order decides.",
      "",
      "Only the links between the domains of a row count for the order within it. The map of the specification places the domains of each level's branch in the same order.",
      "",
      "Reason: Read from left to right, a row then shows first the domains that stand apart, and then each domain next to the domains it uses. Computed from the links alone, the order cannot disagree with them, so the diagram of the domains and the map of the specification show the domains in the same order.",
      "",
      "Examples: Accounts, billing and requests are domains at the same level. Requests uses accounts, and billing has no link with either of them. The row is billing, accounts, requests: billing comes first as a domain with no link in the row, and requests comes right after accounts, which it uses.",
    ].join("\n"),
    ru: [
      "Заголовок: " + n.ruTitle,
      "",
      "Текст: Домены одного уровня выстраиваются на своей линии в таком порядке:",
      "",
      "- сначала, по алфавиту, — домены, не связанные связью `consumes` ни с одним другим доменом этой линии;",
      "- затем — домены, связанные между собой: каждый домен-потребитель стоит справа от всех доменов этой линии, которыми он пользуется, как можно ближе к ним; где связи оставляют выбор, решает алфавит.",
      "",
      "Порядок внутри линии учитывает только связи между доменами этой линии. Карта спецификации располагает домены в ветке каждого уровня в том же порядке.",
      "",
      "Обоснование: Тогда линия, прочитанная слева направо, показывает сначала обособленные домены, а затем каждый домен рядом с доменами, которыми он пользуется. Порядок вычисляется только из связей, поэтому не расходится с ними, и схема доменов и карта спецификации показывают домены в одном порядке.",
      "",
      "Примеры: accounts, billing и requests — домены одного уровня. requests пользуется accounts, а billing не связан ни с одним из них. Линия такая: billing, accounts, requests — billing первым как домен без связей в линии, а requests сразу справа от accounts, которым он пользуется.",
    ].join("\n"),
    why: "Ваша формулировка от 14 ноября и четыре уточнения, с которыми вы согласились. Порядок меняется по сравнению с тем, что инструменты строят сейчас: инструменты и их тесты будут исправлены на шаге правки инструментов.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.4.3 proposal rewritten");
