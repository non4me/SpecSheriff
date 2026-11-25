// Node 7.2.4, agreed on 2026-11-16: a proposal of a new wording, from the wording checker's findings and the owner's
// ruling of 2026-11-15. "is never a general word alone" was a negation, so the first paragraph says what a name that
// contains a general word also contains. The two ways of writing a property were two paragraphs of the same kind, so
// they form a list (node 7.2.2), led by what a node does where it names a property; "Written this way, the key may be
// a general word" applied to the first way only, while the examples of the second way, `kind` and `type`, are general
// words too, so it now covers both. A last paragraph names the parts of a node the rule applies to, which leaves out
// the title, as the owner ruled on 2026-11-15 and as node 7.2.3 now says. The reason went through the paragraphs one at
// a time, which node 7.4.2 forbids, so it now says why the rule exists as a whole. The temporary key "7.2.4~" holds the
// proposed wording for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-385.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.4"];
const text = [
  "Where a name that the specification defines, such as a term or a field used without its object, contains a general word, such as type, action or item, the name also contains what that word applies to, as userAction does.",
  "Where a node names a property, it also names the object that the property belongs to, in one of these ways:\n- where the object has a name of its own: that name, a dot and the property's key, in code font, such as `TextRule.list` or `meta.comments`;\n- where the object has no name of its own: the property's key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.\n\nA key named in either of these ways may be a general word.",
  "This rule applies to a node's text, reason, list members and table cells.",
].join("\n\n");
const ruText = [
  "Если имя, которое определяет спецификация, например термин или поле, используемое отдельно от своего объекта, содержит общее слово, такое как type, action или item, то имя содержит и то, к чему это слово относится, как userAction.",
  "Где узел называет свойство, он называет и объект, которому свойство принадлежит, одним из этих способов:\n- если у объекта есть собственное имя: это имя, точка и ключ свойства, шрифтом кода, например `TextRule.list` или `meta.comments`;\n- если у объекта нет собственного имени: ключ свойства шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.\n\nКлюч, названный любым из этих способов, может быть общим словом.",
  "Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const reason = "A name that the specification defines is read in every rule that uses it, far from its definition. A general word standing alone in such a name means whatever the context of each rule suggests. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third. Naming what the word applies to, or the object that a key belongs to, gives the name the same meaning in every rule.";
const ruReason = "Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит там то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле.";
const block = (lang) => {
  const L = lang === "en" ? ["Title", "Text", "Reason"] : ["Заголовок", "Текст", "Обоснование"];
  const v = lang === "en" ? [n.title, text, reason] : [n.ruTitle, ruText, ruReason];
  return L.map((l, i) => `${l}: ${v[i]}`).join("\n\n");
};
n.proposals = [
  {
    where: "текст и обоснование",
    en: block("en"),
    ru: block("ru"),
    why: [
      "Первый абзац. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action». Стало: «Если имя, которое определяет спецификация, например термин или поле, используемое отдельно от своего объекта, содержит общее слово, такое как type, action или item, то имя содержит и то, к чему это слово относится, как userAction». Прежний абзац говорил через отрицание («никогда не бывает»), а перечень внутри предложения стоял между тире.",
      "Второй и третий абзацы стали одним абзацем со списком. Было два абзаца: «Свойство объекта, у которого есть собственное имя, записывают как это имя, точку и ключ свойства, шрифтом кода: `TextRule.list`, `meta.comments`. При такой записи ключ может быть общим словом» и «Свойство объекта без собственного имени записывают, называя этот объект в той же фразе: `kind` узла, `type` связи». Стало: «Где узел называет свойство, он называет и объект, которому свойство принадлежит, одним из этих способов:» и два пункта списка. Это два случая одного рода, а узел 7.2.2 требует для них списка. «Записывают» не называло, кто записывает (узел 7.2.1); теперь действует узел.",
      "«При такой записи ключ может быть общим словом» относилось только к записи через точку, хотя примеры второго способа, `kind` и `type`, тоже общие слова. Стало: «Ключ, названный любым из этих способов, может быть общим словом». Во втором пункте добавлено «шрифтом кода»: так уже записаны его примеры.",
      "Новый последний абзац: «Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла». По вашему решению от 15 ноября правило не применяется к заголовку; слова те же, что в 7.2.3.",
      "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова». Стало: «Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Общее слово, стоящее в таком имени одно, значит там то, что подскажет контекст каждого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Когда названо то, к чему относится слово, или объект, которому принадлежит ключ, имя значит одно и то же в каждом правиле». Прежнее обоснование разбирало абзацы текста по одному, а узел 7.4.2 это запрещает.",
    ].join(" "),
  },
];
d["7.2.4~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.2.4~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(block("en"));
