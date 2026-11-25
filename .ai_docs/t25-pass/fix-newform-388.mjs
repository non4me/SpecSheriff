// Node 7.2.4, the proposal of fix-newform-385.mjs and fix-newform-387.mjs, after specsheriff-rule-reviewer.
// - "any general word in it" bound every word inside a compound name, wider than the agreed rule and its reason ("a
//   general word standing alone"); the first sentence now says that a general word serves as a defined name only with
//   what it applies to, and cites node 7.2.3 for "general word".
// - "may be, for example" read as a permission, so "can be"; "used without its object" read as "named without its
//   object", which the second paragraph forbids, so "used apart from its object", as the Russian «отдельно» says.
// - The sentence on keys pointed back into the list before it, so it says "So a property's key may be a general word".
// - The example named three mistakes and let `UserEvent.action` pass as one; it now shows the closest one.
// - The scope paragraph left out a term's title, which is the term itself, and the names of fields, which no text
//   holds, so the rule would never reach a name where it is defined; it now covers a name wherever the specification
//   defines it. The owner's ruling of 2026-11-15 on titles holds for every other title.
// - The Russian reason loses «там», which the English does not have.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-388.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.4"];
const gw = "s-me9k7g34jqb4rzn";
const text = [
  `A general word (§${gw}) serves as a name that the specification defines only together with what it applies to. Such a name can be, for example, a term or a field used apart from its object.`,
  "A node that names a property names the object that the property belongs to as well, using only these forms:\n- where the object has a name of its own: that name, a dot and the property's key, all in code font, such as `TextRule.list` or `meta.comments`;\n- where the object has no name of its own: the property's key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.\n\nSo a property's key may be a general word.",
  "This rule applies to a name wherever the specification defines it, and to a node's text, reason, list members and table cells.",
].join("\n\n");
const ruText = [
  `Общее слово (§${gw}) служит именем, которое определяет спецификация, только вместе с тем, к чему оно относится. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта.`,
  "Узел, который называет свойство, называет и объект, которому свойство принадлежит, используя только эти формы:\n- если у объекта есть собственное имя: это имя, точка и ключ свойства, всё шрифтом кода, например `TextRule.list` или `meta.comments`;\n- если у объекта нет собственного имени: ключ свойства шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.\n\nПоэтому ключ свойства может быть общим словом.",
  "Это правило распространяется на имя там, где его определяет спецификация, а также на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const example = "A field that holds the action a user took, and is used apart from its object, is named userAction. The mistake closest to that case is to name it action.";
const ruExample = "Поле, в котором хранится действие пользователя и которое используют отдельно от его объекта, называется userAction. Ближайшая ошибка — назвать его action.";
const reason = "A name that the specification defines is read in every rule that uses it, far from its definition. A general word standing alone in such a name means whatever the context of each rule suggests. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third. Naming what the word applies to, or the object that a key belongs to, gives the name the same meaning in every rule.";
const ruReason = "Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле.";
const block = (lang) => {
  const L = lang === "en" ? ["Title", "Text", "Example", "Reason"] : ["Заголовок", "Текст", "Пример", "Обоснование"];
  const v = lang === "en" ? [n.title, text, example, reason] : [n.ruTitle, ruText, ruExample, ruReason];
  return L.map((l, i) => `${l}: ${v[i]}`).join("\n\n");
};
n.proposals = [
  {
    where: "текст, пример и обоснование",
    en: block("en"),
    ru: block("ru"),
    why: [
      "Первый абзац. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action». Стало: «Общее слово (§s-me9k7g34jqb4rzn) служит именем, которое определяет спецификация, только вместе с тем, к чему оно относится. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта». Прежний абзац говорил через отрицание («никогда не бывает»), а перечень внутри предложения стоял между тире. Ссылка ведёт на 7.2.3, где сказано, что такое общее слово. Противопоставление userAction и action перенесено в пример.",
      "Второй и третий абзацы стали одним абзацем со списком. Было два абзаца: «Свойство объекта, у которого есть собственное имя, записывают как это имя, точку и ключ свойства, шрифтом кода: `TextRule.list`, `meta.comments`. При такой записи ключ может быть общим словом» и «Свойство объекта без собственного имени записывают, называя этот объект в той же фразе: `kind` узла, `type` связи». Стало: «Узел, который называет свойство, называет и объект, которому свойство принадлежит, используя только эти формы:» и два пункта списка, а после них: «Поэтому ключ свойства может быть общим словом». Это два случая одного рода, а узел 7.2.2 требует для них списка. «Записывают» не называло, кто записывает (узел 7.2.1). «Только» говорит, что других форм нет. Разрешение для ключа относилось только к записи через точку, хотя примеры второй формы, `kind` и `type`, тоже общие слова. Во второй форме добавлено «шрифтом кода»: так уже записаны её примеры.",
      "Новый последний абзац: «Это правило распространяется на имя там, где его определяет спецификация, а также на текст, обоснование, члены списка и ячейки таблицы узла». По вашему решению от 15 ноября правило не применяется к заголовку узла. Но у узла-термина заголовок и есть сам термин, а имена полей стоят в полях RecordType, а не в тексте. Без слов «на имя там, где его определяет спецификация» правило не применялось бы там, где имя определяют. К остальным заголовкам ваше решение применяется как есть.",
      "Новый пример: «Поле, в котором хранится действие пользователя и которое используют отдельно от его объекта, называется userAction. Ближайшая ошибка — назвать его action».",
      "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова». Стало: «Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле». Прежнее обоснование разбирало абзацы текста по одному, а узел 7.4.2 это запрещает.",
    ].join(" "),
  },
];
d["7.2.4~"] = { ...n, text, ruText, reason, ruReason, examples: [example], ruExamples: [ruExample] };
delete d["7.2.4~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(block("en"));
