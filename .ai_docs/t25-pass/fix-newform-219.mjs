// The owner of 2026-11-11 on 10.2: its title began with "Where" and told nothing; the rule answers when which checks
// run, so it becomes the list of the moments (agreed 1.6.1 states them in short as a commandment and cites this node),
// titled by that matter.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["10.2"];
if (b.sidValue !== "s-epaw9sgyaajzn8g" || b.agreed) throw new Error("unexpected 10.2");

b.title = "When the checks run";
b.ruTitle = "Когда запускаются проверки";
b.text = "The checks of the table of checks (§s-jau82aq9juv9zzh) run at these moments:\n- before an agent's edit is made: the checks that refuse it (§s-83ev4wwesbwnhnp);\n- after each edit of an agent writing the specification, the tests or the code: every check that needs neither a commit message nor a run of the tests;\n- at a commit: every check, and at a commit that changes code, also the review (§s-nyh9yk22ba6g77q);\n- at a push: the tests of the system's code, if the specification has the status `approved`.\n\nAfter an agent's edit, the checks report to the agent what they refuse.";
b.ruText = "Проверки из таблицы проверок (§s-jau82aq9juv9zzh) запускаются в такие моменты:\n- до того как правка агента сделана — проверки, которые её отклоняют (§s-83ev4wwesbwnhnp);\n- после каждой правки агента, который пишет спецификацию, тесты или код, — каждая проверка, которой не нужны ни сообщение коммита, ни запуск тестов;\n- при коммите — каждая проверка, а при коммите, меняющем код, ещё и рецензия (§s-nyh9yk22ba6g77q);\n- при push — тесты кода системы, если спецификация имеет статус `approved`.\n\nПосле правки агента проверки сообщают ему, что они отклоняют.";
b.reason = "Each check runs at the earliest moment it has all it reads, so a mistake is seen where it is made. An agent told of a refusal at its edit mends it there, rather than at the commit among every other refusal.";
b.ruReason = "Каждая проверка запускается в самый ранний момент, когда у неё есть всё, что она читает, поэтому ошибку видно там, где её сделали. Агент, которому сообщили об отказе при его правке, исправляет его там, а не при коммите среди всех остальных отказов.";
b.changes.push("По вашему решению от 11 ноября узел стал перечнем моментов, в которые запускаются проверки: до правки агента, после каждой его правки, при коммите, при push. Заголовок говорит, о чём правило: «When the checks run» / «Когда запускаются проверки», а не «Где пишет агент…». Согласованный 1.6.1 говорит о моментах коротко и ссылается на этот узел. При переносе узел получит связи cites на s-jau82aq9juv9zzh, s-83ev4wwesbwnhnp и s-nyh9yk22ba6g77q.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
