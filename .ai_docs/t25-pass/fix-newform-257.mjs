// Node 10.9: the owner accepted the wording of fix-newform-256.mjs (2026-11-14, «ок»). Draft 10.10 is written from current
// node 5.8 (s-pcnyfp7gev7syax), a project's own tools at a commit and at a push, and keeps its sid. The consolidated review
// of 11 November found that its third paragraph refused every commit where the SpecSheriff tools cannot run, while node 12
// of the appendix of the tools lets the commit through when the project's own tools pass and says that no check of
// SpecSheriff ran. The draft states that case. The reason is cut to why the rule exists (7.14).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["10.9"];
a.agreed = "2026-11-14";
a.changes.push("Вы приняли эту формулировку (2026-11-14).");

if (d["10.10"]) throw new Error("draft 10.10 exists");
d["10.10"] = {
  from: "5.8",
  sid: "kept",
  title: "At a commit and at a push, a project's own tools run after the SpecSheriff tools",
  ruTitle: "При коммите и при push собственные инструменты проекта запускаются после инструментов SpecSheriff",
  text:
    "At a commit and at a push, the SpecSheriff tools run their checks first. A project's own tools that run at that moment run after them. " +
    "A project's own checks are not among those tools: they run among the checks of the SpecSheriff tools (§s-2fau85dfyyeq66m).\n\n" +
    "A project's own tools run whatever the checks find. The commit or the push goes through only where the checks and each of the project's own tools pass. " +
    "None of the project's own tools changes what the commit holds.\n\n" +
    "Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. " +
    "Whoever makes it is told that no check of SpecSheriff ran.",
  ruText:
    "При коммите и при push инструменты SpecSheriff сначала запускают свои проверки. Собственные инструменты проекта, которые запускаются в этот момент, запускаются после них. " +
    "Собственные проверки проекта к этим инструментам не относятся: они запускаются среди проверок инструментов SpecSheriff (§s-2fau85dfyyeq66m).\n\n" +
    "Собственные инструменты проекта запускаются, что бы ни нашли проверки. Коммит или push проходит, только если проходят проверки и каждый собственный инструмент проекта. " +
    "Ни один собственный инструмент проекта не меняет содержимого коммита.\n\n" +
    "Там, где инструменты SpecSheriff не могут запуститься, собственные инструменты проекта всё равно запускаются. Тогда коммит или push проходит, если ни один из них не отклонил его. " +
    "Тот, кто его делает, получает сообщение, что ни одна проверка SpecSheriff не запускалась.",
  reason:
    "A project may run tools of its own at a commit or a push, such as a scan that nothing internal reaches a public repository, and taking up the method must not stop them. " +
    "The SpecSheriff tools run first, since a project's tools may extend their checks but never override them. A tool that changed the commit would let through what no check read. " +
    "Where the SpecSheriff tools cannot run, as on a machine without the plugin, the project's own guard still holds, and a team that needs the checks to hold for everyone runs them in CI.",
  ruReason:
    "Проект может запускать при коммите или push свои инструменты, например проверку того, что ничего внутреннего не попадает в публичный репозиторий, и переход на метод не должен их останавливать. " +
    "Инструменты SpecSheriff запускаются первыми, потому что инструменты проекта могут дополнять их проверки, но никогда не отменять. Инструмент, который менял бы коммит, пропустил бы то, чего не читала ни одна проверка. " +
    "Там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина, собственная защита проекта всё равно действует, а команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.",
  changes: [
    "Из нынешнего 5.8, sid сохраняется. Новый третий абзац: что происходит там, где инструменты SpecSheriff не могут запуститься. Нынешний 5.8 в этом случае отклонял бы любой коммит, а описание инструментов (узел 12, s-4mej6ccn7xu3d3p) пропускает его, если прошли инструменты проекта, и сообщает, что проверки SpecSheriff не запускались. Так предложил сводный отчёт рецензента от 11 ноября.",
    "Обоснование сокращено до того, зачем существует правило (7.14); последнее предложение объясняет новый абзац, по принципу о CI.",
  ],
  sidValue: "s-pcnyfp7gev7syax",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.9 agreed; draft 10.10 written");
