// Check 10.1.19 is agreed (the owner, 2026-11-13: «согласовано»). Its English was read once in its final wording; the one
// fix that changes only the English is "the node the link names", as agreed 10.1.13 says. The owner asked that the code
// added for its second sentence work exactly as the agent explained it, so that becomes a todo for the tools step.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.19");
r.en = r.en.replace("cites the node that link names", "cites the node the link names");
r.agreed = "2026-11-13";
r.todos = [
  {
    date: "2026-11-13",
    by: "the owner",
    text:
      "At the tools step, `sheriff validate` (tools 7.1.12, s-qvgzubkrafadqgf) checks the second sentence as the agent explained it to the owner: " +
      "for every node that declares an `exempts` link, it looks for `§<the target's sid>` in that node's text, and refuses the node where the citation is missing. " +
      "A citation in the node's title or reason does not count, since 9.7 names the text. The test is written first and seen failing.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| agreed", r.agreed, "|", r.en);
