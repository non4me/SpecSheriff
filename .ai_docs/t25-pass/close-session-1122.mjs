// Closes the session of 2026-11-21/22. The owner ended it and asked for a new way of working in the next session: the
// continuation file now opens with that step and with a plan to put to the owner. Corrects the English of the agreed
// node "Term nodes outside the contracts section" as EngStickler's reader proposed, without changing its meaning, and
// applies EngStickler's sixty-seventh batch of corrections. Every file is written only after every change is prepared.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";

// The English of the agreed node "Term nodes outside the contracts section".
const b = drafts["new:tools-7-1-term-contracts"];
const bp = b.proposal;
bp.parts[0].en = "`sheriff validate` refuses each term node (§s-ypa92gpcj3f5zj8) of the specification whose file is outside `specs/contracts/`, the folder of the contracts section (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53). The refusal names the node's file and its location in the specification (§s-kag2m9tzdnduxdx).";
bp.text = bp.parts[0].en;
bp.todos = [{ date: "2026-11-22", text: "The owner decided on 2026-11-12 that a term needed by only one domain is to be defined in that domain (§s-7kc8dw7zdz63q53). Once the rules that place every term in the contracts section (§s-ypa92gpcj3f5zj8, §s-7kc8dw7zdz63q53) are changed to allow it, this check is to be changed to match them." }];
b.englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by close-session-1122.mjs";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "**The next session continues** stage 2", `**The next session starts by changing the way of working.** On 2026-11-22 the owner ended the session and said that the review had not been efficient: the owner had seen the same wordings several times with small changes, and T25 had taken almost a week (the owner: «сессию закрывай и в следующей нужно будет поменять подход к работе - текущий очень не эффективен… ты должен показывать мне уже полностью готовую решеную с рецентзентом и всеми кем нужно формулировку прошедшую все нужные проверки»). Two rules in .claude/vt/rules.md now govern how a node is shown: "Only a finished wording is shown, once", and "The English of a node is read before the node is shown". The first step of the next session is to put to the owner a new plan for the rest of stage 2, and then to carry it out:
- the 55 items of the order in stage2-inventory.md that remain, from item 9 on, are grouped by section of the appendix of the tools, into about eight groups;
- for each group, the agent drafts every node, has specsheriff-rule-reviewer review the drafts until every node passes, has EngStickler's readers read their English and makes the corrections, and settles every question that the specification or the code can settle;
- the owner then sees one page per group, with every node in its final wording and one list of the questions that only the owner can answer, and agrees to the group with one answer;
- a node whose change only carries out a decision already made, such as a renamed command, a removed term or a row that the node now implements, is changed without being shown, and the group's page lists that change in one line;
- the agent sends no message between two such pages.

**The next session continues** stage 2`);
for (const [from, to] of [
  ["The owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain.", "The owner decided on 2026-11-12 that a term needed by only one domain is to be defined in that domain."],
  ["- The next node to be reviewed is \"Locations computed anew\" (s-stxmhq3hgfndvn6), item 9 of the order in stage2-inventory.md, which implements row 10.1.5. It touches open problem P2 of the inventory: which locations the check computes, including those of a domain's header, of the files of contracts and of a node in a cell of a `TableRule`. On 2026-11-22, items 1 to 8 of the 63 in that order had been reviewed:",
    "- The next node to be reviewed is \"Locations computed anew\" (s-stxmhq3hgfndvn6), which implements row 10.1.5; it is item 9 of the order in stage2-inventory.md. It bears on open problem P2 of stage2-inventory.md: which locations the check of row 10.1.5 computes, including those of a domain's header, of the nodes in the files of the contracts section and of a node in a cell of a `TableRule`. As of 2026-11-22, items 1 to 8 of the 63 items in that order had been reviewed:"]
]) t = swap(t, from, to);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-counted-english.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-counted-english.json is a copy of tools-drafts.json made before that script ran). close-session-1122.mjs closes the session of 2026-11-22: it opens the continuation file with the new way of working that the owner asked for, and corrects the English of \"Term nodes outside the contracts section\" (tools-drafts.before-close-1122.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ○ Вопросы на потом", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Новый порядок работы — первое в следующей сессии\n- оставшиеся 55 пунктов — около восьми групп по разделам описания инструментов\n- вам показывается только готовое: рецензент, чтецы, всё, что можно решить без вас\n- одна страница и один ответ на группу; без промежуточных сообщений\n\n## ○ Вопросы на потом");

fs.writeFileSync(new URL("tools-drafts.before-close-1122.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
