// The owner, 2026-11-09: within the section, as many nodes as the rules call for. Each requirement carried out rightly without
// the others of its node (s-6j8ystpj2yzcchq) stands on its own: 6.2 becomes two nodes, and the node on outgoing links gives the
// requirement on citations a node of its own. The incoming links stay one node, its exceptions being qualifications. The
// reviewer's fixes owed to it from review-6.md are applied here.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const SID_RATIO = "s-bckzdwd35d2nefa";
const SID_OUTGOING = "s-yku67x4mehbmv6f";

const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const PART_22 = "part of 2.2: A link carries its type";
const PART_21 = "part of 2.1: Outgoing links are written, incoming links are built";
const out = [];
for (const line of fs.readFileSync(pagePath, "utf8").split("\n")) {
  const t = line.trim();
  if (!isRow(t)) { out.push(line); continue; }
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  const was = row[0];
  if (Array.isArray(row[8])) {
    row[8] = row[8].map(x => x === "6.3" ? (was === "1.2.2" ? "6.5" : "6.4") : x === "6.4" ? "6.6" : x);
  }
  if (was === "6.2") row[5] = "уходит сюда: Какие связи соединяют два термина";
  if (was === "6.3") row[0] = "6.4";
  if (was === "6.4") row[0] = "6.6";
  const indent = line.slice(0, line.indexOf("["));
  out.push(indent + JSON.stringify(row) + (comma ? "," : ""));
  if (was === "6.2") out.push(indent + JSON.stringify(["6.3", "part", 0, "2.2", PART_22, "уходит сюда: Как записывается соотношение"]) + ",");
  if (was === "6.3") out.push(indent + JSON.stringify(["6.5", "part", 0, "2.1", PART_21, "уходит сюда: Ссылке нужна связь"]) + ",");
}
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const terms = d["6.2"], outgoing = d["6.3"], incoming = d["6.4"];
const two = s => { const i = s.indexOf("\n\n"); if (i < 0) throw new Error("no second paragraph"); return [s.slice(0, i), s.slice(i + 2)]; };
const [textA, textB] = two(terms.text);
const [ruTextA, ruTextB] = two(terms.ruText);
const [whyA, whyB] = two(terms.reason);
const [ruWhyA, ruWhyB] = two(terms.ruReason);

d["6.2"] = {
  from: "2.2", sid: "new", title: "Which links bind two terms", ruTitle: "Какие связи соединяют два термина",
  text: textA, reason: whyA, ruText: ruTextA, ruReason: ruWhyA,
  changes: [
    "По вашему решению вынесен из 6.1. Текст — предпоследний абзац прежнего 6.1, дословно.",
    "Заголовок и обоснование новые, обоснование — в формулировке рецензента.",
    "При переносе в файлы узел получит исходящую связь `refines` к 6.1, а строка таблицы проверок о двух терминах — связь `implements` с ним.",
  ],
  sidValue: terms.sidValue,
};
d["6.3"] = {
  from: "2.2", sid: "new", title: "How a ratio is written", ruTitle: "Как записывается соотношение",
  text: textB, reason: whyB, ruText: ruTextB, ruReason: ruWhyB,
  changes: [
    "По вашему решению вынесен из 6.1. Текст — последний абзац прежнего 6.1, дословно.",
    "Заголовок и обоснование новые, обоснование — в формулировке рецензента.",
    "При переносе в файлы узел получит исходящую связь `refines` к 6.1, потому что слово «соотношение» там определяется здесь.",
  ],
  sidValue: SID_RATIO,
};

const opening = "A node declares the links it makes, each naming the node it points at. ";
const ruOpening = "Узел объявляет связи, которые он делает, и каждая называет узел, на который указывает. ";
if (!outgoing.text.startsWith(opening) || !outgoing.ruText.startsWith(ruOpening)) throw new Error("the outgoing node does not open as expected");
const citation = outgoing.text.slice(outgoing.text.indexOf("A citation is"));
const ruCitation = outgoing.ruText.slice(outgoing.ruText.indexOf("Ссылка — это"));
const firstWhy = "A link says how a node bears on another, so that node declares it.";
const ruFirstWhy = "Связь говорит, как узел относится к другому узлу, поэтому её объявляет этот узел.";
if (!outgoing.reason.startsWith(firstWhy + " ") || !outgoing.ruReason.startsWith(ruFirstWhy + " ")) throw new Error("the outgoing reason does not open as expected");

d["6.4"] = {
  from: "2.1", sid: "new", title: "Outgoing links are written", ruTitle: "Исходящие связи пишутся",
  text: opening.trim(), reason: firstWhy, ruText: ruOpening.trim(), ruReason: ruFirstWhy,
  changes: [
    "Заголовок — первая половина нынешнего заголовка 2.1; вторая, «incoming links are built», уходит в 6.6.",
    "Текст — первая фраза нынешнего 2.1, дословно. Требование о ссылках выполняется без неё и вынесено в 6.5.",
    "Обоснование — одна фраза из правок рецензента: нынешнее обоснование об этом требовании не говорило.",
    "Новый sid: на этот узел ссылается только 6.6.",
  ],
  sidValue: SID_OUTGOING,
};
d["6.5"] = {
  from: "2.1", sid: "new", title: "A citation needs a link", ruTitle: "Ссылке нужна связь",
  text: "A node declares at least one link naming each other node it cites. " + citation,
  reason: outgoing.reason.slice(firstWhy.length + 1),
  ruText: "Узел объявляет хотя бы одну связь, называющую каждый другой узел, на который он ссылается. " + ruCitation,
  ruReason: outgoing.ruReason.slice(ruFirstWhy.length + 1),
  changes: [
    "Заголовок новый: узел выделен из нынешнего 2.1.",
    "Первая фраза называет подлежащее, потому что стоит теперь первой. Было: «For every other node it cites, it declares at least one link naming that node».",
    "В списке исключений вместо указателя и собранных значений, которые относятся к расширению, сказано «values built from other nodes».",
    "Последняя фраза новая: об узле архива в нынешнем 2.1 говорили слова «is held to neither», которые относились к обоим правилам.",
    "Обоснование — абзацы 2–4 нынешнего обоснования, сокращённые рецензентом.",
    "Нынешний sid 2.1 остаётся у 6.6, этот узел получает `s-cxtt6jvhqcey2k9`. Сюда перейдут ссылки на правило о ссылке: из 6.1 о типе `cites`, из проверки связей в tools.json, из решений в tools.json 2 и 6 и из CLAUDE.md, а также тест чтения ссылок. Таблица проверок получит связь implements с 6.5, и её решение от 2026-11-04 о расположении в тексте, оформленном как код, перейдёт сюда.",
  ],
  sidValue: outgoing.sidValue,
};

const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("missing: " + a); return s.replace(a, b); };
incoming.text = swap(incoming.text, "(§s-cxtt6jvhqcey2k9)", `(§${SID_OUTGOING})`);
incoming.ruText = swap(incoming.ruText, "(§s-cxtt6jvhqcey2k9)", `(§${SID_OUTGOING})`);
incoming.text = swap(incoming.text, "A node of the archive is held neither to this rule nor to §s-cxtt6jvhqcey2k9: it holds no link pointing at it, and none it declares is built into another node.", "A node of the archive holds no link pointing at it. No link it declares is built into another node.");
incoming.ruText = swap(incoming.ruText, "На узел архива не распространяется ни это правило, ни §s-cxtt6jvhqcey2k9: он не держит ни одной связи, которая указывает на него, и ни одна из объявленных им связей не встраивается в другой узел.", "Узел архива не содержит связей, которые указывают на него. Ни одна из объявленных им связей не встраивается в другой узел.");
incoming.reason = swap(incoming.reason, " The end each entry names tells the direction.", "");
incoming.ruReason = swap(incoming.ruReason, " Конец, который называет каждая запись, говорит о направлении.", "");
incoming.changes = [
  "Заголовок — вторая половина нынешнего заголовка 2.1.",
  "Текст — абзацы 2–4 нынешнего 2.1. В первой фразе «the node» стало «a node», а «in the same list» дополнено словами «as the links it declares» со ссылкой на 6.4.",
  "Абзац об архиве стал двумя фразами: в нём больше нет слов «is held to neither», относившихся к двум правилам.",
  "Обоснование — абзацы 1, 4 и 5 нынешнего обоснования, без фразы о конце записи, которую убрал рецензент.",
  "Сохраняет sid 2.1: на эту часть указывают шесть тестов из семи — перестройка входящих связей, архив и связи SpecSheriff guidelines.",
];
d["6.6"] = incoming;

fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(Object.keys(d).filter(k => k.startsWith("6.")).sort().map(k => `${k} ${d[k].title} ${d[k].sidValue}`).join("\n"));
