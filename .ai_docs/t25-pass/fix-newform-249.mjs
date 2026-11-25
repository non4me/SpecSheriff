// Draft 10.2: the owner objected that two items explained what runs only by a citation (2026-11-13: «опять объяснение через
// ссылки … должны быть перечислены непосредственно из текста самого правила»), against the owner's rule "A reference backs a
// statement and never makes it". The two items now say in their own words which checks run; the citations only back them.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.2"];
n.proposals = [
  {
    where: "первый и четвёртый пункты текста",
    en:
      "Text: The SpecSheriff tools run the checks at these moments:\n" +
      "- before an agent's edit is made: the checks that can tell from the edit itself that it would break a rule, and refuse it (§s-83ev4wwesbwnhnp);\n" +
      "- after each edit by an agent: every check in the table of checks (§s-jau82aq9juv9zzh) that needs neither a commit message nor a run of the tests;\n" +
      "- on a commit: every check in that table but the tests and the review of the code;\n" +
      "- on a commit that changes code: also the review of that code, in which an independent reviewer judges whether the code does what the rules it names say, and nothing they do not (§s-nyh9yk22ba6g77q);\n" +
      "- on a push: the tests of the system's code and of a project's own checks, if the specification has the status `approved`.\n\n" +
      "After an agent's edit, the SpecSheriff tools report to the agent what the checks refuse.",
    ru:
      "Текст: Инструменты SpecSheriff запускают проверки в такие моменты:\n" +
      "- до того как правка агента сделана, — проверки, которые по самой правке видят, что она нарушила бы правило, и отклоняют её (§s-83ev4wwesbwnhnp);\n" +
      "- после каждой правки агента — каждая проверка из таблицы проверок (§s-jau82aq9juv9zzh), которой не нужны ни сообщение коммита, ни запуск тестов;\n" +
      "- при коммите — каждая проверка из этой таблицы, кроме тестов и ревью кода;\n" +
      "- при коммите, меняющем код, — ещё и ревью этого кода: независимый рецензент судит, делает ли код то, что говорят названные им правила, и ничего сверх этого (§s-nyh9yk22ba6g77q);\n" +
      "- при push — тесты кода системы и собственных проверок проекта, если спецификация имеет статус `approved`.\n\n" +
      "После правки агента инструменты SpecSheriff сообщают агенту то, что проверки отклоняют.",
    why:
      "По вашему замечанию: ссылка подкрепляет утверждение, но не заменяет его. Первый пункт говорил «проверки, которые её отклоняют» и отсылал к 10.3; теперь он своими словами говорит, какие это проверки. " +
      "Четвёртый пункт говорит, что делает ревью. Во втором и третьем пунктах проверки и так названы своими словами: какие из таблицы проверок и чего им не нужно. " +
      "Перечислять каждую проверку по моментам значило бы повторить таблицу проверок.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.2 proposal set");
