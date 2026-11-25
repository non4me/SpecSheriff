// Gathers the four English reviews into english-review.json for the owner: each finding with its node's title and
// whether the node is agreed, the agent's own verdict where it departs from the reviewer, and the group of findings
// that recur across the specification, so that the owner decides a recurring calque once.
import fs from "node:fs";

const scratch = "C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/3be21311-8f41-49eb-9b17-38aeeec170fd/scratchpad/";
const here = new URL(".", import.meta.url);
const drafts = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const table = JSON.parse(fs.readFileSync(new URL("table-10-1.json", here), "utf8"));
const rows = Object.fromEntries(table.tables.flatMap((g) => g.rows).filter((r) => r.num).map((r) => [r.num, r]));

// The agent's own verdicts, by batch and index: not an error in English, or a proposal adjusted to keep the meaning.
const drop = { A: { 1: "«basic structure» — обычное английское выражение.", 13: "«A particular project» — естественно." }, C: { 47: "«letter for letter» — устойчивое выражение, как «word for word»." }, D: { 46: "«at these moments» — естественно.", 94: "«as the history of the repository shows» — естественно." }, B: { 68: "«the linking node is how the linked one is carried out» — естественный оборот; «shows how» меняет смысл." } };
const adjust = {
  A: {
    57: ["Code changes only as a result of a change to the specification", "«after» теряет причинность: код меняется не просто после, а вследствие изменения спецификации."],
    58: ["only as a result of a change to the specification, not by editing the code directly", "«after» теряет причинность."],
  },
  C: { 28: ["changes only as a result of a change to the specification", "«after» теряет причинность."] },
};
const groups = [
  ["holds", "«holds» в значении «содержит» → «contains». В спецификации «hold» значит ещё и «быть верным» (a reason holds), и два смысла путаются.", (f) => /\bhold(s|ing)?\b/.test(f.was) && /contain/.test(f.proposed)],
  ["stands", "«stands in / on» в значении «находится» → «is in», «is kept in», «is set out in». По-английски «stand in» значит «замещать».", (f) => /\bstand(s|ing)?\b/.test(f.was) && !/\bstand(s|ing)?\b/.test(f.proposed)],
  ["carries", "«carries out» о правилах → «implements».", (f) => /carr(y|ies|ied)\b[^.]*\bout\b/.test(f.was) && /implement|enforce/.test(f.proposed)],
  ["answers", "«answers for» → «is accountable for» / «is responsible for».", (f) => /answers? for/.test(f.was)],
  ["push", "«at a push / at a commit» → «on a push». Решить одну форму на всю спецификацию.", (f) => /at a (push|commit)/.test(f.was)],
  ["sonot", "Безглагольное «So not X, but Y» в правилах о том, как писать узел → «So a rule says not X but Y».", (f) => /\bSo (not|never)\b/.test(f.was)],
  ["truth", "«the one source of truth» → «the single source of truth», устойчивое выражение.", (f) => /one source of truth/.test(f.was)],
  ["contracts", "«contracts» как имя части с глаголом в единственном числе («Contracts agrees») → «the contracts section». Решение на всю спецификацию.", (f) => /contracts section/.test(f.proposed)],
  ["absolute", "Абсолютные обороты «a section left out», «… included» → «except …», «including …».", (f) => /(left out|included)\b/.test(f.was) && /(except|including|unless)/.test(f.proposed)],
  ["produce", "«what … produce» о построенных значениях → «derived from».", (f) => /produce/.test(f.was) && /derived/.test(f.proposed)],
];

const out = [];
for (const b of ["A", "B", "C", "D"]) {
  const list = JSON.parse(fs.readFileSync(`${scratch}english-review-${b}.json`, "utf8"));
  list.forEach((f, i) => {
    const num = f.num;
    const d = drafts[num];
    const r = rows[num];
    const title = num === "10.1 (head)" ? table.head.title : d ? (typeof d.title === "string" && !d.title.startsWith("=") ? d.title : "") : r ? r.en : "";
    const agreed = num === "10.1 (head)" ? !!table.head.agreed : d ? !!d.agreed : r ? !!r.agreed : false;
    const x = { ...f, batch: b, i, title, agreed };
    if (drop[b]?.[i]) { x.verdict = "drop"; x.note = drop[b][i]; }
    if (adjust[b]?.[i]) { x.proposed = adjust[b][i][0]; x.verdict = "adjusted"; x.note = adjust[b][i][1]; }
    const g = groups.find(([, , test]) => test(f));
    if (g && x.verdict !== "drop") x.group = g[0];
    out.push(x);
  });
}
const meta = { groups: groups.map(([id, text]) => ({ id, text, count: out.filter((f) => f.group === id).length })) };
fs.writeFileSync(new URL("english-review.json", here), JSON.stringify({ meta, findings: out }, null, 2) + "\n");
console.log("findings", out.length, "dropped", out.filter((f) => f.verdict === "drop").length, "adjusted", out.filter((f) => f.verdict === "adjusted").length);
for (const g of meta.groups) console.log(g.id, g.count);
