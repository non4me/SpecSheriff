// The owner, 2026-11-09: the node on what is missing today is removed. The present 6.3 then splits, by s-6j8ystpj2yzcchq and the
// owner's leave to split within a section: one thought to a sentence, and a text opening with its main thought. The sid stays with
// the second, which the node on what is applied together cites. The two take numbers 7.4 and 7.5, so nothing after them moves.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const everything = JSON.stringify(d) + fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8");
const A = "23456789abcdefghjkmnpqrstuvwxyz";
let SID;
do { SID = "s-" + Array.from(crypto.randomBytes(15), b => A[b % A.length]).join(""); } while (everything.includes(SID));

if (d["7.4"].sidValue !== "s-5wuv4sycvg6ase8") throw new Error("7.4 is another node");
d["7.4"] = {
  from: "6.3", sid: "new", title: "One thought to a sentence", ruTitle: "Одна мысль в предложении",
  text: "Each sentence of a node states one thought: a statement that can be agreed with or disputed on its own. Where one part of a sentence could hold while another does not, the parts are two thoughts.",
  reason: "A sentence holding several thoughts is read in several ways. Each reader takes a different clause for the requirement and the rest for an aside.",
  ruText: "Каждое предложение узла утверждает одну мысль: утверждение, с которым можно согласиться или поспорить отдельно. Если одна часть предложения может быть верной, а другая нет, это две мысли.",
  ruReason: "Предложение из нескольких мыслей читается по-разному. Каждый читатель принимает за требование другую его часть, а остальное — за попутное замечание.",
  changes: [
    "Нынешний 6.3 разделён на два узла: это требование выполняется без требования начинать текст с главной мысли.",
    "Заголовок — первая половина нынешнего заголовка 6.3.",
    "Текст и обоснование — первые абзацы нынешнего 6.3, дословно.",
    "Новый sid: `s-juucyammgq4shq8` остаётся у 7.5, на него ссылается 7.6.",
  ],
  sidValue: SID,
};
d["7.5"] = {
  from: "6.3", sid: "kept", title: "A node's text opens with its main thought", ruTitle: "Текст узла начинается с главной мысли",
  text: "A node's text opens with its main thought in a short sentence. Its qualifications follow. More than one qualification of one kind, such as conditions, exceptions or steps, stands as a bulleted list in the text. Reasoning, in which one thing follows from another, is written as sentences.\n\nSo not “the system refuses a request whose token has expired or names a removed user”, but “The system refuses a request in each of these cases:”, followed by the cases as a list.",
  reason: "A main thought stated first, in a short sentence, tells the reader at once what the node requires. What follows then reads as narrowing it, not as further requirements. Set as a list, qualifications of one kind are read alike, and none is lost among the clauses. Reasoning holds only as a chain, each step following from the one before, and a list would cut the links between them.",
  ruText: "Текст узла начинается с главной мысли в коротком предложении. Уточнения идут после неё. Если уточнений одного рода больше одного, например условий, исключений или шагов, они стоят в тексте маркированным списком. Рассуждение, где одно следует из другого, пишется предложениями.\n\nПоэтому не «система отклоняет запрос, у которого истёк токен или который называет удалённого пользователя», а «Система отклоняет запрос в каждом из этих случаев:», и затем случаи списком.",
  ruReason: "Главная мысль, сказанная первой в коротком предложении, сразу говорит читателю, чего требует узел. Всё дальнейшее читается как её сужение, а не как новые требования. В списке уточнения одного рода читаются одинаково, и ни одно не теряется среди оборотов. Рассуждение держится только как цепочка, где каждый шаг следует из предыдущего, а список разорвал бы связи между ними.",
  changes: [
    "Вторая часть нынешнего 6.3. Текст и обоснование дословно, заголовок новый.",
    "Сохраняет sid 6.3, на него ссылается 7.6. Здесь остаётся решение от 2026-11-06.",
  ],
  sidValue: "s-juucyammgq4shq8",
};
d["7.3"].changes = d["7.3"].changes.map(c => c.replace("Абзац о свойствах ушёл в 7.4.", "Абзац о свойствах убран по вашему решению."));
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
lines.forEach((line, i) => {
  const t = line.trim();
  if (!isRow(t)) return;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  let out = row;
  if (Array.isArray(row[8])) row[8] = row[8].filter(x => x !== "7.4");
  if (row[0] === "7.4") out = ["7.4", "split", 0, "6.3", "One thought to a sentence, the main one first", "Одна мысль в предложении, главная — первой"];
  if (row[0] === "7.5") out = ["7.5", "part", 0, "6.3", "part of 6.3: One thought to a sentence, the main one first", "уходит сюда: Текст узла начинается с главной мысли"];
  lines[i] = line.slice(0, line.indexOf("[")) + JSON.stringify(out) + (comma ? "," : "");
});
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("new sid of 7.4:", SID);
