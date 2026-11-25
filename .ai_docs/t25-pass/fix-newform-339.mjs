// Node 12.4.3, the proposal of fix-newform-338.mjs, after the reviewer's report. The text names who places the domains
// (the SpecSheriff tools, on each row of the diagram of the domains), says what the alphabetical order sorts (the names), and
// says that an unlinked domain neither uses nor is used by another domain of the row, which the example needs. "Consuming
// domain" becomes "a domain that uses". The sentence on the map goes: the map's own rule is to cite this node. The reviewer
// found "as close to them as possible" open when a domain has several sources or several users, and proposed spelling out a
// placement procedure; the agent keeps the owner's simpler wording and leaves those cases to the appendix of the tools,
// which the owner is to confirm. The reason now says why the rule exists, and the example has one thought per sentence.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
const p = n.proposals[0];
p.en = [
  "Title: " + n.title,
  "",
  "Text: The SpecSheriff tools place the domains of each row of the diagram of the domains in this order:",
  "",
  "- first, in the alphabetical order of their names, the domains that neither use nor are used by another domain of the row;",
  "- then the other domains, each to the right of every domain of the row that it uses and as close to them as possible.",
  "",
  "Where this leaves a choice, the alphabetical order of the names decides. How the tools place a domain that uses several domains of the row, or one that several domains of the row use, is set out in the appendix of the tools.",
  "",
  "Reason: Within a row of the diagram, every link then points one way and stays short, so the connections can be read at a glance.",
  "",
  "Examples: Accounts, billing and requests are domains at the same level. Requests uses accounts, and billing has no link with either of them. The row is billing, accounts, requests. Billing comes first, since it has no link in the row. Requests comes right after accounts, which it uses.",
].join("\n");
p.ru = [
  "Заголовок: " + n.ruTitle,
  "",
  "Текст: Инструменты SpecSheriff выстраивают домены каждой линии схемы доменов в таком порядке:",
  "",
  "- сначала, в алфавитном порядке имён, — домены, которые ни сами не пользуются другими доменами этой линии, ни используются ими;",
  "- затем — остальные домены: каждый справа от всех доменов этой линии, которыми он пользуется, и как можно ближе к ним.",
  "",
  "Где это оставляет выбор, решает алфавитный порядок имён. Как инструменты располагают домен, который пользуется несколькими доменами линии или которым пользуются несколько доменов линии, определяет описание инструментов.",
  "",
  "Обоснование: Тогда в линии схемы все связи направлены в одну сторону и остаются короткими, поэтому их видно с одного взгляда.",
  "",
  "Примеры: accounts, billing и requests — домены одного уровня. requests пользуется accounts, а billing не связан ни с одним из них. Линия: billing, accounts, requests. billing идёт первым, потому что у него нет связей в линии. requests идёт сразу за accounts, которым он пользуется.",
].join("\n");
p.why = "Ваш порядок и четыре уточнения, после рецензента: названо, кто выстраивает домены; сказано, что сортируется по алфавиту — имена; фраза о карте убрана — правило карты будет ссылаться на этот узел; сложные случаи «как можно ближе» отданы описанию инструментов.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
