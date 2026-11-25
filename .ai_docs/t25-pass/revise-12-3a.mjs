// Applies the findings of specsheriff-rule-reviewer on draft 12.3a, "A RecordType is a rule":
// - the test sentence holds for a fragment of a format and for a RecordType variant, and asks for at least one test;
// - "bound" cites the SpecTag (s-8xw4mgvpexyvw5q);
// - the code sentence no longer says that generated code is the only code implementing a RecordType;
// - the node says what in a RecordType states the requirement and what stands for its reason, which refines rule 1.2.3
//   (s-dpe5kcz4eamv39g), so the draft gets a `refines` link to it, and build-moved.mjs learns to write a draft's own links;
// - the reason no longer restates the text sentence by sentence; the Russian example drops «несёт SpecTag».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-revise-12-3a.json", here));
const n = nf["12.3a"];
if (!n) throw new Error("12.3a is missing");
n.text = [
  "A RecordType (§s-7vm323mhry2enx3) is a rule of the section that declares it. Its fields (§s-6eb92ddch7shuvu) state what it requires. The description of what it is for serves as its reason (§s-dpe5kcz4eamv39g).",
  "The code generated from it, such as its types and RuntimeChecks (§s-e877bnfa559tvk9), is bound to it by SpecTags (§s-8xw4mgvpexyvw5q). At least one test bound to it checks that a part of the system refuses to output or store a data record that violates it (§s-wxcmpbvy9bzkfj9).",
].join("\n\n");
n.ruText = [
  "RecordType (§s-7vm323mhry2enx3) — правило того раздела, в котором он объявлен. Чего он требует, задают его поля (§s-6eb92ddch7shuvu). Описание того, для чего он предназначен, служит его обоснованием (§s-dpe5kcz4eamv39g).",
  "Код, сгенерированный из него, например его типы и RuntimeChecks (§s-e877bnfa559tvk9), привязан к нему SpecTag (§s-8xw4mgvpexyvw5q). Хотя бы один тест, привязанный к нему, проверяет, что часть системы отказывается выдать или сохранить запись данных, которая его нарушает (§s-wxcmpbvy9bzkfj9).",
].join("\n\n");
n.reason = "A RecordType states a requirement on the data that a part of the system outputs and stores, and the checks require bound code and a passing test only of a rule (§s-6fw72j65jkqrfpf). Were a RecordType not a rule, nothing would reveal a generated RuntimeCheck that no part of the system calls. The description of what its data is for already says why the data must have these fields, so a reason of its own would repeat it.";
n.ruReason = "RecordType задаёт требование к данным, которые часть системы выдаёт и хранит, а привязанный код и проходящий тест проверки требуют только у правила (§s-6fw72j65jkqrfpf). Не будь RecordType правилом, ничто не выявило бы сгенерированный RuntimeCheck, который не вызывает ни одна часть системы. Описание того, для чего нужны его данные, уже говорит, почему у них должны быть эти поля, поэтому отдельное обоснование его повторяло бы.";
n.examples = [
  "The RecordType of a request is declared in the section that describes how a user submits a request to an operator. The types and the RuntimeCheck generated from it carry its SpecTag. A test that carries its SpecTag tries to store a request without the time at which it was submitted, and expects the part of the system that stores requests to refuse it. The code that stores requests carries the SpecTag of the rule on submitting a request.",
  "The fragment of a format for an address is declared in the contracts section, and its field for the city is guaranteed. A test that carries the fragment's SpecTag tries to store a request whose address has no city, and expects the part of the system that stores requests to refuse it.",
];
n.ruExamples = [
  "RecordType заявки объявлен в разделе, который описывает, как пользователь подаёт заявку оператору. У типов и RuntimeCheck, сгенерированных из него, есть его SpecTag. Тест с его SpecTag пытается сохранить заявку без времени подачи и ожидает, что часть системы, которая хранит заявки, её отклонит. У кода, который сохраняет заявки, есть SpecTag правила о подаче заявки.",
  "Фрагмент формата для адреса объявлен в разделе контрактов, и поле города в нём гарантировано. Тест со SpecTag этого фрагмента пытается сохранить заявку, в адресе которой нет города, и ожидает, что часть системы, которая хранит заявки, её отклонит.",
];
n.links = [{ type: "refines", to: "s-dpe5kcz4eamv39g" }];
n.changes = [
  "Новый узел, по вашему решению от 21 ноября: RecordType — правило. Это вариант А со страницы https://claude.ai/artifact/EMKvRer7iZo1UKBwLkLeku.",
  "Узел стоит в расширении RecordType, потому что SpecSheriff guidelines расширений не называют (1.7.3). Стоит после 12.3, потому что называет код, который 12.3 генерирует.",
  "Второе и третье предложения — ответ на находку рецензента. Правило 1.2.3 говорит, что текст правила задаёт требование, а обоснование объясняет, зачем оно. У RecordType требование задают поля, а текст говорит, для чего нужны данные. Я предлагаю считать этот текст обоснованием RecordType, а не требовать от RecordType ещё одного обоснования. Поэтому узел уточняет 1.2.3 и получает связь `refines` с ним.",
  "«Код, сгенерированный из него, например…»: код, который из RecordType пишут собственные генераторы проекта (10.9), например описание таблицы базы данных, тоже к нему привязан. Код, написанный вручную, может реализовать RecordType через узел технического приложения со связью `implements`, как любое правило (9.2).",
  "«Запись данных, которая его нарушает»: так предложение верно и для фрагмента формата, и для варианта. Заявка с адресом без города нарушает фрагмент «адрес», а заявка без адреса его не нарушает, если адрес в ней не гарантирован.",
  "«Хотя бы один тест»: как в вашем решении. Тестов у RecordType может быть больше.",
  "Без новых слов из узла следует: правило 9.2 требует от одобренного RecordType привязанного кода и проходящего теста, а SpecTag сгенерированного кода называет правило, как требует строка 10.1.26.",
  "Для шага, который меняет инструменты: тест со SpecTag RecordType станет разрешён, а у одобренного RecordType — обязателен. Сейчас инструменты такой тест отклоняют.",
];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const bp = new URL("build-moved.mjs", here);
let b = fs.readFileSync(bp, "utf8");
if (!b.includes("extraLinks: d.links || []")) {
  b = swap(b, "src: 'draft', key, present, num: key, extraCites: d.cites || [],", "src: 'draft', key, present, num: key, extraCites: d.cites || [], extraLinks: d.links || [],", "build: a draft's own links");
  fs.writeFileSync(bp, b);
}
console.log("12.3a revised");
