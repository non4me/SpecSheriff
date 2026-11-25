// The reviewer's report on section 6 after the split. The section runs in the owner's order: what a link is, outgoing links and
// citations, incoming links, and last the two nodes particular to terms, which lean on citations and on reading from the other
// end. Wording fixes follow, each checked against validate.ts, model.ts and the schema's comment on a ratio.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const SID_OUTGOING = "s-yku67x4mehbmv6f";
const SID_RATIO = "s-bckzdwd35d2nefa";
const map = { "6.2": "6.5", "6.3": "6.6", "6.4": "6.2", "6.5": "6.3", "6.6": "6.4" };
const renum = s => map[s] ?? s;

const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const six = [];
lines.forEach((line, i) => {
  const t = line.trim();
  if (!isRow(t)) return;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  if (/^6\.\d+$/.test(row[0])) { row[0] = renum(row[0]); six.push({ i, row, comma, indent: line.slice(0, line.indexOf("[")) }); return; }
  if (Array.isArray(row[8])) row[8] = row[8].map(renum);
  lines[i] = line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
});
if (six.length !== 6) throw new Error("section 6 holds " + six.length + " rows");
const lastComma = six[5].comma;
const sorted = six.map(s => s.row).sort((a, b) => a[0].localeCompare(b[0]));
six.forEach((s, k) => { lines[s.i] = s.indent + JSON.stringify(sorted[k]) + (k === 5 ? (lastComma ? "," : "") : ","); });
fs.writeFileSync(pagePath, lines.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const old = { terms: d["6.2"], ratio: d["6.3"], outgoing: d["6.4"], citation: d["6.5"], incoming: d["6.6"] };
const swap = (o, field, a, b) => { if (!o[field].includes(a)) throw new Error(`missing in ${field}: ${a}`); o[field] = o[field].replace(a, b); };

// Outgoing links.
swap(old.outgoing, "reason", "so that node declares it", "so the linking node declares it");
swap(old.outgoing, "ruReason", "поэтому её объявляет этот узел", "поэтому её объявляет связывающий узел");
old.outgoing.changes = [
  "Заголовок — первая половина нынешнего заголовка 2.1; вторая, «incoming links are built», уходит в 6.4.",
  "Текст — первая фраза нынешнего 2.1, дословно. Требование о ссылках выполняется без неё и вынесено в 6.3.",
  "Обоснование — одна новая фраза: нынешнее обоснование об этом требовании не говорило.",
  "Новый sid: из спецификации на этот узел ссылается только 6.4. При переносе таблица проверок и узел tools.json «Outgoing links and citations» получат связь `implements` с ним.",
];

// A citation needs a link.
swap(old.citation, "text", "A node declares at least one link naming each other node it cites.", "A node declares at least one link to every other node it cites.");
swap(old.citation, "ruText", "Узел объявляет хотя бы одну связь, называющую каждый другой узел, на который он ссылается.", "Узел объявляет хотя бы одну связь с каждым другим узлом, на который он ссылается.");
swap(old.citation, "reason", "A value built from other nodes copies what they hold.", "A node's links already name the nodes they point at. A node under it declares its own links. A value built from other nodes copies what they hold.");
swap(old.citation, "ruReason", "Значение, построенное из других узлов, копирует то, что они содержат.", "Связи узла и так называют узлы, на которые указывают. Узел под ним объявляет собственные связи. Значение, построенное из других узлов, копирует то, что они содержат.");
old.citation.changes = [
  "Заголовок новый: узел выделен из нынешнего 2.1.",
  "Первая фраза называет подлежащее, потому что стоит теперь первой. Было: «For every other node it cites, it declares at least one link naming that node».",
  "В списке исключений вместо указателя и собранных значений, которые относятся к расширению, сказано «values built from other nodes».",
  "Последняя фраза новая: об узле архива в нынешнем 2.1 говорили слова «is held to neither», которые относились к обоим правилам.",
  "Обоснование — абзацы 2–4 нынешнего обоснования, сокращённые рецензентом, и две новые фразы о связях узла и об узлах под ним, которых обоснование не объясняло.",
  "Этот узел получает `s-cxtt6jvhqcey2k9`, нынешний sid 2.1 остаётся у 6.4. Сюда перейдут ссылки на правило о ссылке: из 6.1 о типе `cites`, из проверки связей в tools.json, из решений в tools.json 2 и 6 и из CLAUDE.md, а также тест чтения ссылок. Таблица проверок и узел tools.json «Outgoing links and citations» получат связь `implements` с ним.",
  "Сюда перейдут решения нынешнего 2.1 от 2026-10-26 и 2026-11-04.",
];

// Incoming links: the main thought first, what the built entry does to a ratio, the ground restored.
old.incoming.text = old.incoming.text.replace(/^[^\n]*/, `The links pointing at a node are rebuilt from the links the nodes declare: every such entry is removed first and built again. They are never written by hand. They stand in the same list as the links the node declares (§${SID_OUTGOING}). Each names the node it comes from and is read from this node's end, which reverses a ratio (§${SID_RATIO}).`);
old.incoming.ruText = old.incoming.ruText.replace(/^[^\n]*/, `Связи, которые указывают на узел, перестраиваются из связей, которые объявляют узлы: каждая такая запись сначала удаляется и строится заново. Их никогда не пишут вручную. Они стоят в том же списке, что и связи, которые узел объявляет (§${SID_OUTGOING}). Каждая называет узел, из которого исходит, и читается с конца этого узла, отчего соотношение становится обратным (§${SID_RATIO}).`);
swap(old.incoming, "ruText", "Узел SpecSheriff guidelines держит только", "Узел SpecSheriff guidelines содержит только");
swap(old.incoming, "reason", "from where it stands.", "from where it stands. The end each entry names tells the direction.");
swap(old.incoming, "ruReason", "с того места, где он стоит.", "с того места, где он стоит. Конец, который называет каждая запись, говорит о направлении.");
old.incoming.changes = [
  "Заголовок — вторая половина нынешнего заголовка 2.1.",
  "Текст — абзацы 2–4 нынешнего 2.1. Главная мысль, что связи перестраиваются и не пишутся вручную, теперь стоит первой. В первой фразе о списке «the node» стало «a node», а «in the same list» дополнено словами «as the links the node declares» со ссылкой на 6.2.",
  "Добавлено, что при чтении с этого конца соотношение становится обратным, со ссылкой на 6.6: инструмент так и строит запись.",
  "Абзац об архиве стал двумя фразами: в нём больше нет слов «is held to neither», относившихся к двум правилам.",
  "Обоснование — абзацы 1, 4 и 5 нынешнего обоснования, дословно.",
  "Сохраняет sid 2.1: на эту часть указывают шесть тестов из семи — перестройка входящих связей, архив и связи SpecSheriff guidelines. Здесь остаются решения нынешнего 2.1 от 2026-10-30.",
];

// Which links bind two terms.
swap(old.terms, "text", "No other type does, `cites` included:", "No other type binds two terms of the specification, `cites` included:");
swap(old.terms, "ruText", "Никакой другой тип этого не делает, включая `cites`:", "Никакой другой тип не соединяет два термина спецификации, включая `cites`:");
swap(old.terms, "reason", "so these two types link terms alone", "so `term-relation` and `uses` link terms alone");
swap(old.terms, "ruReason", "поэтому эти типы связывают только термины", "поэтому `term-relation` и `uses` связывают только термины");
old.terms.changes = [
  "По вашему решению вынесен из 6.1. Текст — предпоследний абзац прежнего 6.1.",
  "Вторая фраза теперь говорит о двух терминах спецификации: термин, заменивший другой, связан с ним типом `supersedes`, а заменённый термин уже в архиве.",
  "Заголовок и обоснование новые, обоснование — в формулировке рецензента.",
  "При переносе в файлы узел получит исходящую связь `refines` к 6.1, а строка таблицы проверок о двух терминах — связь `implements` с ним.",
];

// How a ratio is written.
swap(old.ratio, "text", "A ratio is the multiplicity of each end in the usual notation: 1,", "A ratio is the multiplicity of each end: 1,");
swap(old.ratio, "ruText", "Соотношение — это кратность каждого конца в обычной записи: 1,", "Соотношение — это кратность каждого конца: 1,");
swap(old.ratio, "reason", "because one end cannot say whether the other may be absent", "because neither end's multiplicity follows from the other's");
swap(old.ratio, "ruReason", "потому что один конец не скажет, может ли отсутствовать другой", "потому что кратность одного конца не следует из кратности другого");
old.ratio.changes = [
  "По вашему решению вынесен из 6.1. Текст — последний абзац прежнего 6.1, без слов «in the usual notation»: в UML та же кратность пишется иначе, через `*`.",
  "Заголовок и обоснование новые, обоснование — в формулировке рецензента.",
  "При переносе в файлы узел получит исходящую связь `refines` к 6.1, потому что слово «соотношение» там определяется здесь. На него ссылается 6.4.",
];

d["6.1"].changes = d["6.1"].changes.map(c => c.replace("вынесены в 6.2", "вынесены в 6.5 и 6.6"));
d["6.2"] = old.outgoing;
d["6.3"] = old.citation;
d["6.4"] = old.incoming;
d["6.5"] = old.terms;
d["6.6"] = old.ratio;
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(Object.keys(d).filter(k => k.startsWith("6.")).sort().map(k => `${k} ${d[k].title} ${d[k].sidValue}`).join("\n"));
