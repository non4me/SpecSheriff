// Node 7.2.4, the proposal of fix-newform-385.mjs, after the wording checker. The first sentence opened with a long
// condition, so the main thought now comes first in a short sentence (node 7.2.2), and the contrast with action, type
// or item moves to a proposed example, which shows the typical case and the closest mistake (node 7.6.3). The list of
// the forms of a property names the only forms allowed, so its lead says "only", and the lead no longer opens with a
// condition. "in code font" in the first form covers the whole of `TextRule.list`, so it says "all in code font".
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-387.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.4"];
const text = [
  "A name that the specification defines includes what any general word in it applies to. Such a name may be, for example, a term or a field used without its object.",
  "A node that names a property names the object that the property belongs to as well, using only these forms:\n- where the object has a name of its own: that name, a dot and the property's key, all in code font, such as `TextRule.list` or `meta.comments`;\n- where the object has no name of its own: the property's key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.\n\nA key written in any of these forms may be a general word.",
  "This rule applies to a node's text, reason, list members and table cells.",
].join("\n\n");
const ruText = [
  "Имя, которое определяет спецификация, содержит то, к чему относится каждое общее слово в нём. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта.",
  "Узел, который называет свойство, называет и объект, которому свойство принадлежит, используя только эти формы:\n- если у объекта есть собственное имя: это имя, точка и ключ свойства, всё шрифтом кода, например `TextRule.list` или `meta.comments`;\n- если у объекта нет собственного имени: ключ свойства шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.\n\nКлюч, записанный в любой из этих форм, может быть общим словом.",
  "Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const example = "A field that holds the action a user took is named userAction. The mistake closest to that case is to name it action, type or item, words that mean other things in other rules.";
const ruExample = "Поле, в котором хранится действие пользователя, называется userAction. Ближайшая ошибка — назвать его action, type или item: в других правилах эти слова значат другое.";
const reason = "A name that the specification defines is read in every rule that uses it, far from its definition. A general word standing alone in such a name means whatever the context of each rule suggests. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third. Naming what the word applies to, or the object that a key belongs to, gives the name the same meaning in every rule.";
const ruReason = "Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит там то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле.";
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
      "Первый абзац. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action». Стало: «Имя, которое определяет спецификация, содержит то, к чему относится каждое общее слово в нём. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта». Прежний абзац говорил через отрицание («никогда не бывает»), а перечень внутри предложения стоял между тире. Противопоставление userAction и action, type, item перенесено в предлагаемый пример: он показывает типичный случай и ближайшую ошибку (узел 7.6.3).",
      "Второй и третий абзацы стали одним абзацем со списком. Было два абзаца: «Свойство объекта, у которого есть собственное имя, записывают как это имя, точку и ключ свойства, шрифтом кода: `TextRule.list`, `meta.comments`. При такой записи ключ может быть общим словом» и «Свойство объекта без собственного имени записывают, называя этот объект в той же фразе: `kind` узла, `type` связи». Стало: «Узел, который называет свойство, называет и объект, которому свойство принадлежит, используя только эти формы:» и два пункта списка. Это два случая одного рода, а узел 7.2.2 требует для них списка. «Записывают» не называло, кто записывает (узел 7.2.1); теперь действует узел. «Только» говорит, что других форм нет, как требует ваше правило «Правило говорит, что верно».",
      "«При такой записи ключ может быть общим словом» относилось только к записи через точку, хотя примеры второго способа, `kind` и `type`, тоже общие слова. Стало: «Ключ, записанный в любой из этих форм, может быть общим словом». Во втором пункте добавлено «шрифтом кода»: так уже записаны его примеры.",
      "Новый последний абзац: «Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла». По вашему решению от 15 ноября правило не применяется к заголовку; слова те же, что в 7.2.3.",
      "Новый пример: «Поле, в котором хранится действие пользователя, называется userAction. Ближайшая ошибка — назвать его action, type или item: в других правилах эти слова значат другое».",
      "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова». Стало: «Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит там то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле». Прежнее обоснование разбирало абзацы текста по одному, а узел 7.4.2 это запрещает.",
    ].join(" "),
  },
];
d["7.2.4~"] = { ...n, text, ruText, reason, ruReason, examples: [example], ruExamples: [ruExample] };
delete d["7.2.4~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(block("en"));
