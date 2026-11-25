// The rule reviewer on the head of 10.1: the table holds the checks made after an agent's edit, at a commit and at a
// push, not those refusing an edit before it is made; "It reads nothing else" forbade what rows read (the guidelines
// and their schema, the commit's message, the commit a push sends); the reason owed why a check reads only its commit.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
Object.assign(t.head, {
  text:
    "Every check the SpecSheriff tools make after an agent's edit, at a commit or at a push stands in a row of this table. " +
    "Where a row speaks of a rule, a rule of a project's own kind is included.\n\n" +
    "Each check of this table reads, as its commit, one of these:\n" +
    "- after an agent's edit, the working tree;\n" +
    "- at a commit, what is staged;\n" +
    "- at a push, the commit each pushed ref points to.\n\n" +
    "Beside its commit, a check reads only these:\n" +
    "- the SpecSheriff guidelines and their schema (§s-bsya3febm6u64ab);\n" +
    "- where its row says so, the history behind the commit and the commit's message.",
  ruText:
    "Каждая проверка, которую инструменты SpecSheriff делают после правки агента, при коммите или при пуше, стоит в строке этой таблицы. " +
    "Где строка говорит о правиле, правило собственного типа в проекте тоже входит.\n\n" +
    "Каждая проверка этой таблицы читает как свой коммит одно из следующего:\n" +
    "- после правки агента — рабочее дерево;\n" +
    "- при коммите — то, что подготовлено к нему (staged);\n" +
    "- при пуше — коммит, на который указывает каждая отправляемая ссылка.\n\n" +
    "Кроме своего коммита проверка читает только это:\n" +
    "- guidelines SpecSheriff и их схему (§s-bsya3febm6u64ab);\n" +
    "- там, где так сказано в её строке, — историю за коммитом и сообщение коммита.",
  reason:
    "Whoever asks whether a commit will go through must get one answer, whenever and wherever it is asked. " +
    "An answer spread across several rules, or drawn from whatever else lies on the machine, comes apart without anybody seeing it.",
  ruReason:
    "Тот, кто спрашивает, пройдёт ли коммит, должен получать один ответ, когда и где бы он ни спросил. " +
    "Ответ, разнесённый по нескольким правилам или взятый из того, что ещё лежит на машине, распадается, и никто этого не видит.",
  examples:
    "An agent edits a node and does not stage its file. After the edit, the checks read the edited node. " +
    "At the commit, they read the node as staged, without the edit.",
  ruExamples:
    "Агент правит узел и не добавляет его файл в staged. После правки проверки читают узел с правкой. " +
    "При коммите они читают узел в том виде, в каком он подготовлен к коммиту, без правки.",
});
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("head revised");
