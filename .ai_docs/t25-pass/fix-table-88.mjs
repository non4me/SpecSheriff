// Check 10.1.26 is agreed (the owner, 2026-11-13: «оставляем и согласовано»), with the exception for symbols in tests
// kept: under agreed 9.1 the tests are part of the system's code, and agreed 1.5.2 makes the same exception.
// Check 10.1.27 in the new form: its approved words as the text, with their Russian, what it affects, its tests, the
// Russian of tools 7.2.3, and one whole proposed wording, checked against node 7.17: one thought to a sentence, the
// rule named in the words of agreed 1.3.7, the commit no longer an actor.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.26");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change =
  "Ваша формулировка (2026-11-13) с двумя дополнениями из согласованных 1.5.2 и 9.1: SpecTag символа, который не реализует правила, говорит об этом; символы в тестах из первого предложения исключены, у теста SpecTag в названии. " +
  "Цена «а пока спецификация — черновик… сообщается» ушла в расширение «Адоптация существующего проекта» (12.6), по вашему решению от 2026-11-11.";
delete a.proposals;
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.27");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "Коммит, который возвращает спецификацию в черновик, записывает отзыв одним из ответственных за спецификацию одобрения правила, которое её одобряет";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает коммит, после которого одобренная спецификация снова становится черновиком. " +
  "От того, одобрена ли спецификация, зависит, насколько строго проверки держат её код и тесты (10.6). " +
  "Без этой проверки любой вернул бы спецификацию в черновик, изменив формулировку её правила или удалив его. " +
  "Отозвать одобрение этого правила может только ответственный за спецификацию (1.3.7).";
r.tests = [
  "unit/binding.test.ts: refuses a commit putting the specification back to draft by an edit of its rule's wording or by its removal, and passes one recording an owner's withdrawal",
  "unit/binding.test.ts: counts a withdrawal of the rule's approval of whichever wording, by one of the specification's owners as the commit holds them",
  "unit/approve.test.ts: refuses to approve the rule that approves the specification, or to withdraw its approval, to anyone but the specification's owners",
];
t.toolsRu["s-j9r8z4xdrfkfs47"] = {
  title: "От черновика к одобренной спецификации и обратно",
  text:
    "`sheriff binding` следит за переходом спецификации из черновика в одобренную и обратно (§s-qzthyh7yqvfhsa2). Правило, которое одобряет спецификацию, он находит в `project.json`.\n\n" +
    "Спецификацию до коммита он берёт такой, какой её держит первый родитель коммита, прочитанной так, как её переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts). Если у коммита нет родителя, спецификация до коммита считается черновиком.\n\n" +
    "Пока коммит оставляет спецификацию черновиком, `sheriff binding` сообщает о каждом из следующего, а не отклоняет, если коммит этого не меняет (§s-kkbqcb9xrpaepwn):\n\n" +
    "- символ кода системы вне его тестов, у которого нет SpecTag;\n- тест, у которого нет SpecTag.\n\n" +
    "Пока коммит оставляет спецификацию одобренной, оба отклоняются.\n\n" +
    "Коммит, который возвращает спецификацию в черновик, проходит, только если добавляет к одобрениям отзыв одобрения этого правила, какой бы ни была его формулировка, сделанный одним из ответственных за спецификацию, какими их держит сам коммит.",
};
r.proposals = [
  {
    en:
      "A commit in which the specification goes back to draft contains a withdrawal of the approval of the rule stating that the specification is approved. " +
      "One of the specification's owners makes that withdrawal | refused",
    ru:
      "Коммит, в котором спецификация возвращается в черновик, содержит отзыв одобрения правила, утверждающего, что спецификация одобрена. " +
      "Этот отзыв делает один из ответственных за спецификацию | отклоняется",
    why:
      "1) Две мысли — что коммит содержит отзыв и кто его делает — разнесены в два предложения (7.5, 7.17). " +
      "2) «Правило, которое её одобряет» → «правило, утверждающее, что спецификация одобрена»: правило ничего не одобряет, одобряют ответственные; это слова согласованного 1.3.7. " +
      "3) «Записывает» → «содержит»: коммит не действующее лицо. Смысл прежний.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "agreed |", r.num, "|", r.proposals[0].en);
