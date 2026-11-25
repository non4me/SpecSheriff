// The rule reviewer on check 10.1.3: the approved words have no defect; the proposal on the archive is needed, since
// 10.1.4's same words "No two nodes" mean the nodes outside it; an optional reason, proposed apart, since 1.2.2 says why
// a sid never changes, not why one is never shared with an archived node.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.proposals[0].why += " Рецензент: строго «No two nodes» охватывает и архив, но в 10.1.4 те же слова означают только узлы вне архива, и рядом читатель не поймёт, какое прочтение у 10.1.3.";
r.proposals.push({
  en: "Reason: A `supersedes` link names an archived node by its sid. Given to another node, that sid would name two.",
  ru: "Обоснование: Связь `supersedes` называет архивный узел по его sid. Данный другому узлу, этот sid называл бы два узла.",
  why: "Необязательное обоснование. 1.2.2 объясняет, почему sid не меняется, но не почему его нельзя отдать другому узлу, пока архивный узел с ним хранится.",
});
r.noReason = "Своего обоснования сейчас нет; оно предложено ниже, вторым предложением.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 proposals:", r.proposals.length);
