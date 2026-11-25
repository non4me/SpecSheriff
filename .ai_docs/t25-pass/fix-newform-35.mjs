// The owner's ruling of 2026-11-08: the node "An entity is declared once" (present 1.37) duplicates 3.2 and
// 3.3 and goes. Its two statements of its own and its reason move into the node on RecordTypes, now 3.4.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const before = JSON.parse(fs.readFileSync(file, "utf8"));
if (before["3.5"]?.sidValue !== "s-7vm323mhry2enx3") throw new Error("3.5 is not the node on RecordTypes");

execFileSync(process.execPath, [fileURLToPath(new URL("remove-node.mjs", here)), "3.4"], { stdio: "inherit" });

const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];
if (n.sidValue !== "s-7vm323mhry2enx3") throw new Error("3.4 is not the node on RecordTypes");
if (!JSON.stringify(d).includes("s-6eb92ddch7shuvu")) throw new Error("the node defining a RecordType is not among the drafts");

n.title = "A RecordType is defined once, in the domain that provides it";
n.ruTitle = "RecordType определяется один раз, в домене, который его предоставляет";
n.text = "An entity's data, where the specification describes them, are defined by one RecordType (§s-6eb92ddch7shuvu). No two RecordTypes share a name.\n\nA RecordType one domain provides to others is described in that domain, as part of its API. Contracts describes a RecordType only where no single domain provides it, as a store more than one domain writes.";
n.ruText = "Данные сущности, если спецификация их описывает, определяются одним RecordType (§s-6eb92ddch7shuvu). Никакие два RecordType не носят одного имени.\n\nRecordType, который один домен предоставляет другим, описывается в этом домене как часть его API. Контракты описывают RecordType, только когда его не предоставляет ни один отдельный домен, — например хранилище, в которое пишут несколько доменов.";
n.reason = "Two definitions of one entity are two places that each answer for it, and the two are changed apart. The duplicate is usually the first visible trace of one domain doing another's work. Another RecordType and the generated code refer to a RecordType by its name, so two with one name cannot be told apart.\n\nNobody answers for a RecordType described away from the domain that provides it: the provider changes what it gives while its description stands elsewhere.";
n.ruReason = "Два определения одной сущности — это два места, каждое из которых за неё отвечает, и меняются они по отдельности. Дубликат обычно становится первым видимым следом того, что один домен делает работу другого. Другой RecordType и сгенерированный код ссылаются на RecordType по имени, поэтому два RecordType с одним именем нельзя различить.\n\nЗа RecordType, описанный вдали от домена, который его предоставляет, никто не отвечает: поставщик меняет то, что даёт, а его описание стоит в другом месте.";
n.changes = [
  "Объединение, по вашему решению: узел «An entity is declared once» (нынешний 1.37) дублировал 3.2 и 3.3 и убран. Сюда перенесены две его фразы, о которых нигде больше не сказано, и его обоснование.",
  "Абзац 2 текста — абзац 4 нынешнего 1.34; «interface» заменён на «API», как в 2.1.",
  "К обоснованию добавлена фраза о том, почему имя должно быть единственным.",
  "Заголовок новый. Сохраняет sid 1.34. Нынешний 1.37 уходит в архив с указанием, что его заменил этот узел; связь implements из таблицы проверок переходит сюда.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(Object.keys(d).filter(k => /^3\./.test(k)).map(k => k + " " + d[k].title).join("\n"));
