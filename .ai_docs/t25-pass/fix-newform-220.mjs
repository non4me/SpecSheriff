// The fresh reviewer of the rewritten 10.2 "When the checks run" (2026-11-11): the SpecSheriff tools run the checks
// and report (7.3); the list says what the tools do at each moment (the refusals before an edit are not rows of the
// table; at a commit every row but the tests and the review; the review at a commit changing code; at a push the tests
// of the system's code and of a project's own checks, tools node 6); "the review of the code" as agreed 1.6.1 (7.8);
// the checks run after every edit of an agent, as the hook does; the reason excepts the tests.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["10.2"];
if (b.sidValue !== "s-epaw9sgyaajzn8g" || b.agreed) throw new Error("unexpected 10.2");

b.text = "The SpecSheriff tools run the checks at these moments:\n- before an agent's edit is made: the checks that refuse it (§s-83ev4wwesbwnhnp);\n- after each edit of an agent: every check of the table of checks (§s-jau82aq9juv9zzh) that needs neither a commit message nor a run of the tests;\n- at a commit: every check of that table but the tests and the review of the code;\n- at a commit that changes code: also the review of that code (§s-nyh9yk22ba6g77q);\n- at a push: the tests of the system's code and of a project's own checks, if the specification has the status `approved`.\n\nAfter an agent's edit, the SpecSheriff tools report to the agent what the checks refuse.";
b.ruText = "Инструменты SpecSheriff запускают проверки в такие моменты:\n- до того как правка агента сделана, — проверки, которые её отклоняют (§s-83ev4wwesbwnhnp);\n- после каждой правки агента — каждая проверка из таблицы проверок (§s-jau82aq9juv9zzh), которой не нужны ни сообщение коммита, ни запуск тестов;\n- при коммите — каждая проверка из этой таблицы, кроме тестов и ревью кода;\n- при коммите, меняющем код, — ещё и ревью этого кода (§s-nyh9yk22ba6g77q);\n- при push — тесты кода системы и собственных проверок проекта, если спецификация имеет статус `approved`.\n\nПосле правки агента инструменты SpecSheriff сообщают агенту то, что проверки отклоняют.";
b.reason = "Each check but the tests runs at the earliest moment it has all it reads, so a mistake is seen and mended where it is made.";
b.ruReason = "Каждая проверка, кроме тестов, запускается в самый ранний момент, когда у неё есть всё, что она читает, поэтому ошибку видят и исправляют там, где её сделали.";
b.changes.push("По рецензенту: проверки запускают и сообщают об отказах инструменты SpecSheriff (7.3); перечень говорит ровно то, что делают хуки: до правки — отказы 10.3, которые не строки таблицы; после каждой правки — проверки таблицы без сообщения коммита и тестов; при коммите — все строки таблицы, кроме тестов и ревью кода; при коммите, меняющем код, — ревью кода; при push — тесты кода системы и собственных проверок проекта (описание инструментов, узел 6); «ревью кода», как в согласованном 1.6.1; обоснование оговаривает тесты.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
