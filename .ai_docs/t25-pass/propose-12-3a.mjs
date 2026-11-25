// Carries out the owner's ruling of 2026-11-21 («Согласен с вариантом А»): a RecordType is a rule. Adds the draft of a
// new node of the RecordType extension, placed after 12.3 (s-e877bnfa559tvk9), since it names the code that 12.3
// generates; adds its row to the structure page; records the ruling in decisions-out-5.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
if (nf["12.3a"]) throw new Error("12.3a already exists");
fs.copyFileSync(nfPath, new URL("newform.before-propose-12-3a.json", here));
const node = {
  from: "",
  sid: "new",
  title: "A RecordType is a rule",
  text: "A RecordType (§s-7vm323mhry2enx3) is a rule of the section that declares it. The code that implements it is the types and RuntimeChecks generated from it (§s-e877bnfa559tvk9). A test bound to it checks that a part of the system refuses to output or store a data record that does not conform to it (§s-wxcmpbvy9bzkfj9).",
  reason: "A RecordType's format is a requirement on the data that a part of the system outputs and stores. Bound to its code and its test like any other rule, a RecordType shows which code and which tests a change to its format affects. The test shows that the part of the system actually checks its data, since a generated RuntimeCheck that nothing calls refuses nothing.",
  examples: [
    "The RecordType of a request is declared in the section that describes how a user submits a request to an operator. The types and the RuntimeCheck generated from it carry its SpecTag. A test that carries its SpecTag tries to store a request without the time at which it was submitted, and expects the part of the system to refuse it. The code that stores requests carries the SpecTag of the rule on submitting a request.",
  ],
  ruTitle: "RecordType — правило",
  ruText: "RecordType (§s-7vm323mhry2enx3) — правило того раздела, в котором он объявлен. Код, который его реализует, — это типы и RuntimeChecks, сгенерированные из него (§s-e877bnfa559tvk9). Тест, привязанный к нему, проверяет, что часть системы отказывается выдать или сохранить запись данных, которая ему не соответствует (§s-wxcmpbvy9bzkfj9).",
  ruReason: "Формат RecordType — требование к данным, которые часть системы выдаёт и хранит. RecordType, привязанный к своему коду и своему тесту, как любое другое правило, показывает, какой код и какие тесты затрагивает изменение его формата. Тест показывает, что часть системы действительно проверяет свои данные: сгенерированный RuntimeCheck, который никто не вызывает, ничего не отклоняет.",
  ruExamples: [
    "RecordType заявки объявлен в разделе, который описывает, как пользователь подаёт заявку оператору. Типы и RuntimeCheck, сгенерированные из него, несут его SpecTag. Тест с его SpecTag пытается сохранить заявку без времени подачи и ожидает, что часть системы её отклонит. Код, который сохраняет заявки, несёт SpecTag правила о подаче заявки.",
  ],
  changes: [
    "Новый узел, по вашему решению от 21 ноября: RecordType — правило. Это вариант А со страницы https://claude.ai/artifact/EMKvRer7iZo1UKBwLkLeku.",
    "Узел стоит в расширении RecordType, потому что SpecSheriff guidelines расширений не называют (1.7.3).",
    "Узел стоит после 12.3, потому что называет код, который 12.3 генерирует.",
    "Без новых слов из него следует: правило 9.2 требует от одобренного RecordType привязанного кода и проходящего теста, а SpecTag сгенерированного кода называет правило, как требует строка 10.1.26.",
    "Для шага, который меняет инструменты: тест с SpecTag RecordType станет разрешён, а у одобренного RecordType — обязателен. Сейчас инструменты такой тест отклоняют.",
  ],
};
// Insert after 12.3, keeping the object's key order, which the page follows.
const out = {};
for (const [k, v] of Object.entries(nf)) {
  out[k] = v;
  if (k === "12.3") out["12.3a"] = node;
}
if (!out["12.3a"]) throw new Error("12.3 not found");
fs.writeFileSync(nfPath, JSON.stringify(out, null, 2) + "\n");

const sp = new URL("base-structure.html", here);
fs.copyFileSync(sp, new URL("base-structure.before-propose-12-3a.html", here));
let h = fs.readFileSync(sp, "utf8");
const row3 = '      ["12.3","part",0,"1.24","part of 1.24: Data structures are described in the specification","уходит сюда: Типы и RuntimeChecks генерируются из RecordType"],\n';
h = swap(h, row3, row3 + '      ["12.3a","new",0,"","A RecordType is a rule","RecordType — правило","","",[],""],\n', "structure row");
fs.writeFileSync(sp, h);

const dp = new URL("decisions-out-5.json", here);
const decisions = JSON.parse(fs.readFileSync(dp, "utf8"));
decisions["12.3a"] = [{
  date: "2026-11-21",
  problem: "The types and RuntimeChecks generated from a RecordType carry that RecordType's SpecTag, and row 10.1.26 of the main table of checks requires each SpecTag to name a rule. No rule said that a RecordType is a rule, and no rule of the SpecSheriff guidelines can say it, since they name no extension (s-chk5hnzmcpeqj25).",
  ruling: "The owner: a RecordType is a rule. Its title and text, which state what its data is for, and its format, which refines them, stay in one node. The code generated from it and a test carry its SpecTag. The other ways considered were a separate rule stating what the format is for, beside a RecordType that holds only the format, and a RecordType that is not a rule, whose generated code would carry the SpecTag of the rule that generates the types (s-e877bnfa559tvk9).",
  type: "textual",
}];
fs.writeFileSync(dp, JSON.stringify(decisions, null, 2) + "\n");
console.log("12.3a drafted");
