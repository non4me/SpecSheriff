// Two changes after the owner agreed to 10.7 and 9.5 on 2026-11-17.
// - Node 10.7, agreed: EngStickler's readers read its English; only the English wording is corrected, its meaning and its
//   Russian unchanged.
// - Node 10.6, agreed: a proposal that carries out 10.7. While the strict flag is on, the approval procedure refuses in the
//   cases 10.7 names, so the second paragraph of the text says so, the second example says the flag is off, and the last
//   paragraph of the reason holds only while the flag is off. Shown to the owner without the reviewer, as a change that
//   carries out a decision already made.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-431.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const FLAG = "s-q3pfzyaxvpr2zj2";
const swapIn = (obj, field, from, to) => {
  const v = obj[field];
  if (Array.isArray(v)) {
    const i = v.findIndex((x) => x.includes(from));
    if (i < 0) throw new Error(`${field}: not found: ${from}`);
    v[i] = v[i].replace(from, to);
    return;
  }
  if (!v.includes(from)) throw new Error(`${field}: not found: ${from}`);
  obj[field] = v.replace(from, to);
};

// 10.7: English only.
const f = d["10.7"];
swapIn(f, "text", "Only the latest such entry sets the `strict` flag.", "Only the latest such entry determines the `strict` flag.");
swapIn(f, "text", "The following procedures refuse to act while a check that the `strict` flag makes stricter would refuse a commit or a push that changed nothing, were the specification approved and the flag on:\n- the procedure that turns the `strict` flag on;\n- while the `strict` flag is on, the procedure that approves the specification", "The following procedures refuse to run while a check that the `strict` flag makes stricter would refuse a commit or a push that changes nothing, if the specification were approved and the flag were on:\n- the procedure that turns the `strict` flag on;\n- the procedure that approves the specification, while the `strict` flag is on");
swapIn(f, "examples", "code that is outside a commit and carries no SpecTag then makes the checks refuse that commit. A commit made with the hooks bypassed has added a file without SpecTags.", "code that a commit does not change and that carries no SpecTag makes the checks refuse the commit. An earlier commit, made with the git hooks bypassed, added a file whose symbols carry no SpecTags.");
swapIn(f, "examples", "so that, while the flag is on, it refuses a commit where it otherwise only reports.", "so that, while the flag is on, it refuses a commit in a case where it would otherwise only report.");
swapIn(f, "reason", "for example, a project whose code is all bound to its rules and has to stay so.", "for example, a project all of whose code is bound to its rules and has to stay that way.");
f.changes.push("17 ноября, после согласования: читатели EngStickler прочитали английский текст; исправлен только английский, смысл и русский текст не менялись.");

// 10.6: a proposal.
const n = d["10.6"];
const t = n.text.split("\n\n");
const rt = n.ruText.split("\n\n");
t[1] += ` While the specification's \`strict\` flag is on, the procedure refuses to record the approval in the cases that the rule on that flag names (§${FLAG}).`;
rt[1] += ` Пока флаг \`strict\` спецификации включён, процедура отказывается записать одобрение в тех случаях, которые называет правило об этом флаге (§${FLAG}).`;
const ex = [...n.examples];
const rex = [...n.ruExamples];
ex[1] = `The specification's strict flag is off. ${ex[1]}`;
rex[1] = `Флаг strict спецификации выключен. ${rex[1]}`;
const r = n.reason.split("\n\n");
const rr = n.ruReason.split("\n\n");
r[r.length - 1] = r[r.length - 1].replace("Such code therefore does not block the approval.", "While the `strict` flag is off, such code therefore does not block the approval.");
rr[rr.length - 1] = rr[rr.length - 1].replace("Поэтому такой код одобрению не мешает.", "Поэтому, пока флаг `strict` выключен, такой код одобрению не мешает.");
if (r[r.length - 1] === n.reason.split("\n\n").pop() || rr[rr.length - 1] === n.ruReason.split("\n\n").pop()) throw new Error("10.6: the reason was not changed");
n.proposals = [{
  where: "второй абзац текста, второй пример и последний абзац обоснования",
  en: [`Title: ${n.title}`, `Text: ${t.join("\n\n")}`, ...ex.map((e) => `Example: ${e}`), `Reason: ${r.join("\n\n")}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${rt.join("\n\n")}`, ...rex.map((e) => `Пример: ${e}`), `Обоснование: ${rr.join("\n\n")}`].join("\n\n"),
  why: "Выполняет согласованный 10.7: пока флаг strict включён, процедура одобрения отказывает в случаях, которые называет 10.7. Поэтому во второй абзац текста добавлено одно предложение со ссылкой на 10.7; во второй пример — что флаг выключен; в последний абзац обоснования — что код без SpecTag не мешает одобрению, пока флаг выключен. Остальное не меняется.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
