// The owner's ruling of 2026-11-08 on contracts goes into 3.1: where it stands and when none is needed.
// The Russian of the node takes the plural the agreed 2.1 uses.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.1"];
const swap = (k, a, b) => {
  if (n[k].split(a).length !== 2) throw new Error("no single match in " + k + ": " + a);
  n[k] = n[k].replace(a, b);
};

n.text += "\n\nContracts exists where the rules of the specification share something, such as a term. It stands as a section of its own within the base specification or, for several domains, as a separate document. A specification whose rules share nothing needs none.";
n.reason += "\n\nContracts exists only to agree what the parts of a specification share, so a specification with nothing shared has nothing to put in it. For several domains it stands apart, since it belongs to none of them.";

n.ruTitle = "Общее для доменов согласуется в контрактах";
swap("ruText", "Contracts согласует то, что у доменов общее", "Контракты согласуют то, что у доменов общее");
swap("ruText", "Contracts — не домен. Он не принадлежит ни одному из доменов.", "Контракты — не домен. Они не принадлежат ни одному из доменов.");
n.ruText += "\n\nКонтракты существуют там, где правила спецификации имеют что-то общее, например термин. Они стоят отдельным разделом внутри базовой спецификации или, для нескольких доменов, отдельным документом. Спецификации, правила которой не имеют ничего общего, они не нужны.";
swap("ruReason", "Если держать в contracts только то, что связывает больше одного домена, contracts не отвечает за то", "Если держать в контрактах только то, что связывает больше одного домена, контракты не отвечают за то");
n.ruReason += "\n\nКонтракты нужны только затем, чтобы согласовать общее для частей спецификации, поэтому спецификации, в которой общего нет, нечего в них вносить. Для нескольких доменов они стоят отдельно, потому что не принадлежат ни одному из них.";

n.changes.push("Последний абзац текста и последний абзац обоснования — ваше решение о том, где стоят контракты и когда они не нужны. Рецензент заменил «если нужны» проверяемым признаком: у правил есть что-то общее.");
n.changes.push("В русском тексте contracts стали «контрактами», как в согласованном 2.1.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("3.1 updated");
