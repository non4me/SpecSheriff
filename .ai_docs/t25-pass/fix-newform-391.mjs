// The subsection "Naming", after the five reviewers and the owner's ruling of 2026-11-16 («широкое значение»): an
// entity, in the rules on names, is anything the specification defines. 7.2.4.1 now defines both the name and the
// entity, so a rule's title, which names no entity, is not a name, while a term's title is; the scope paragraphs go.
// The other nodes cite 7.2.4.1 where they first use "name" or "entity". The reviewers' other findings:
// - 7.2.4.1 states the goal, "A name means the same thing in every rule that uses it", since "says by itself what it
//   names" repeated 7.2.4.3; one word, "property", for a field and a property;
// - 7.2.4.2 becomes "Coined names", the specification coining a name only where the ordinary word also appears in
//   another sense, as "tag" does in git's sense;
// - 7.2.4.3 becomes "What a name is made of": a general word forms a name only when joined with what it applies to,
//   which keeps the agreed "includes"; its second example no longer comes from the method's own tools;
// - 7.2.4.4 binds a node that writes a property's key, since "names a property" made every plain "a node's text"
//   break it; `meta.comments` goes, since `meta` is a key;
// - 7.2.4.5 becomes "Relations to other entities", since "position" was defined nowhere.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-391.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const A = "s-9w3u3wn37wksyxd";
const GW = "s-me9k7g34jqb4rzn";
const ruled = "по вашему решению от 16 ноября";

// 7.2.4.1, the proposal.
const aEn = [
  "A name is the word or phrase that the specification gives to an entity. An entity is anything that the specification defines, for example:\n- a concept of the subject area, such as a user, a record or a request;\n- a procedure or a constant;\n- a concept of the method itself, such as SpecTag;\n- a property of another entity, such as a field of a record.",
  "A name means the same thing in every rule that uses it.",
].join("\n\n");
const aRu = [
  "Имя — это слово или выражение, которое спецификация даёт сущности. Сущность — это всё, что определяет спецификация, например:\n- понятие предметной области, такое как пользователь, запись или запрос;\n- процедура или константа;\n- понятие самого метода, такое как SpecTag;\n- свойство другой сущности, такое как поле записи.",
  "Имя значит одно и то же в каждом правиле, которое его использует.",
].join("\n\n");
const aEx = "A term node titled \"refund\" gives a name to an entity, so the rules on names apply to its title. The mistake closest to that case is to apply them to the title of a rule, such as \"Limits\", which gives no name to an entity.";
const aRuEx = "Узел-термин с заголовком «refund» даёт имя сущности, поэтому правила об именах распространяются на его заголовок. Ближайшая ошибка — применять их к заголовку правила, например «Ограничения»: такой заголовок не даёт имя сущности.";
const aReason = "A name is read in every rule that uses it, far from its definition. A reader applies those rules correctly only where the name means the same thing in all of them.";
const aRuReason = "Имя читают в каждом правиле, которое его использует, вдали от его определения. Читатель правильно применяет эти правила, только если имя значит одно и то же во всех них.";
const a = d["7.2.4.1"];
a.proposals = [
  {
    where: "заголовок, текст, пример и обоснование",
    en: ["Title: What a name is", "", `Text: ${aEn}`, "", `Example: ${aEx}`, "", `Reason: ${aReason}`].join("\n"),
    ru: ["Заголовок: Что такое имя", "", `Текст: ${aRu}`, "", `Пример: ${aRuEx}`, "", `Обоснование: ${aRuReason}`].join("\n"),
    why: [
      `Правило об именах стало подразделом 7.2.4 «Образование имён», ${ruled}, и в него перенесены принципы из раздела «Naming» skill spec-review. Этот узел открывает подраздел: что такое имя и что такое сущность.`,
      "Заголовок «Naming» («Образование имён») перешёл к подразделу; у узла новый заголовок «What a name is» («Что такое имя»).",
      "Текст. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action.» и два абзаца о том, как записывают свойство. Стало: определение имени, определение сущности со списком примеров и требование «Имя значит одно и то же в каждом правиле, которое его использует». Абзац об общем слове перешёл в 7.2.4.3 «Из чего состоит имя», абзацы о свойствах — в 7.2.4.4 «Свойства».",
      `Сущность — это всё, что определяет спецификация, ${ruled} («широкое значение»). Определение сущности из нынешнего 1.37 («сущность — это то, что называет термин») в новую форму не перешло; теперь сущность определена здесь. Поле записи вошло в определение как свойство другой сущности.`,
      "Абзаца об области действия больше нет. Заголовок правила не даёт имя сущности, поэтому он не имя и правила об именах к нему не применяются, как вы решили 15 ноября. Заголовок узла-термина даёт имя сущности, поэтому правила к нему применяются. Это показывает новый пример.",
      "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова.» Стало: «Имя читают в каждом правиле, которое его использует, вдали от его определения. Читатель правильно применяет эти правила, только если имя значит одно и то же во всех них.» Пример с полем type перешёл в обоснование 7.2.4.3, слова о ключе и шрифте кода — в обоснование 7.2.4.4.",
    ].join(" "),
  },
];
delete d["7.2.4.1~"];

// 7.2.4.2.
const b = d["7.2.4.2"];
Object.assign(b, {
  title: "Coined names",
  ruTitle: "Придуманные имена",
  text: `The specification coins a name (§${A}) for an entity only where the ordinary word for that entity also appears in the specification in another sense.`,
  ruText: `Спецификация придумывает имя (§${A}) для сущности только там, где обычное слово для этой сущности встречается в спецификации также в другом смысле.`,
  examples: ["The specification calls the reference that binds code to a node a SpecTag, because the word \"tag\" also appears in it in the sense of a git tag. The mistake closest to that case is to coin NodeArchive for the archive of removed nodes, though the word \"archive\" appears in the specification in no other sense."],
  ruExamples: ["Спецификация называет ссылку, которая связывает код с узлом, SpecTag, потому что слово «tag» встречается в ней и в смысле тега git. Ближайшая ошибка — придумать имя NodeArchive для архива удалённых узлов, хотя слово «archive» в спецификации ни в каком другом смысле не встречается."],
  reason: "A coined name that nobody needs suggests to the reader a special meaning that is not there. It is also one more name that every reader has to learn.",
  ruReason: "Ненужное придуманное имя наводит читателя на мысль об особом смысле, которого нет. Кроме того, это ещё одно имя, которое приходится выучить каждому читателю.",
});
b.changes.push("По замечаниям рецензента: узел говорит о придуманном имени, а условие — «в другом смысле», как у слова «tag» в смысле git, а не «в своём обычном смысле»; ошибка в примере показывает случай, а не пересказывает правило.");

// 7.2.4.3.
const c = d["7.2.4.3"];
Object.assign(c, {
  title: "What a name is made of",
  ruTitle: "Из чего состоит имя",
  text: `A name (§${A}) says what its entity is, by how the entity is used or by what it holds. A general word (§${GW}) forms a name only when it is joined with what it applies to, as in userAction.`,
  ruText: `Имя (§${A}) говорит, что такое его сущность: как её используют или что она содержит. Общее слово (§${GW}) образует имя, только когда оно соединено с тем, к чему относится, как в userAction.`,
  examples: [
    "A field that holds the action a user took, and is used apart from its object, is named userAction. The mistake closest to that case is to name it action.",
    "A field that holds the address to which a user's invoices are sent is named billingAddress. The mistake closest to that case is to name it userData, which says only whose the data are.",
  ],
  ruExamples: [
    "Поле, в котором хранится действие пользователя и которое используют отдельно от своего объекта, называется userAction. Ближайшая ошибка — назвать его action.",
    "Поле, в котором хранится адрес, куда отправляют счета пользователя, называется billingAddress. Ближайшая ошибка — назвать его userData: такое имя говорит только, чьи это данные.",
  ],
  reason: "A name that does not say what it names fits many meanings. In each rule that uses such a name, it means whatever that rule's context suggests. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third.",
  ruReason: "Имя, которое не говорит, что оно называет, подходит под многие значения. В каждом правиле, которое использует такое имя, оно значит то, что подскажет контекст этого правила. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем.",
});
c.changes.push("По замечаниям рецензента: «образует имя, только когда соединено» сохраняет согласованное «включает»; второй пример взят из того, что есть в любой системе, а не из инструментов самого метода.");

// 7.2.4.4.
const p = d["7.2.4.4"];
Object.assign(p, {
  text: `A node that writes a property's key also names the object that the property belongs to, using only these forms:\n- where the object has a name (§${A}) of its own: that name, a dot and the key, all in code font, such as \`TextRule.list\`;\n- where the object has no name of its own: the key in code font, with the object named in the same phrase, such as a node's \`kind\` or a link's \`type\`.\n\nSo a property's key may be a general word (§${GW}). A property gets a name of its own only where it is also used apart from the object it belongs to.`,
  ruText: `Узел, который пишет ключ свойства, называет и объект, которому свойство принадлежит, используя только эти формы:\n- если у объекта есть собственное имя (§${A}): это имя, точка и ключ, всё шрифтом кода, например \`TextRule.list\`;\n- если у объекта нет собственного имени: ключ шрифтом кода, а объект назван в той же фразе, например \`kind\` узла или \`type\` связи.\n\nПоэтому ключ свойства может быть общим словом (§${GW}). Собственное имя свойство получает, только если его используют и отдельно от объекта, которому оно принадлежит.`,
});
p.changes.push("По замечаниям рецензента: правило связывает узел, который пишет ключ свойства, иначе нарушением стало бы обычное «текст узла» в других правилах; пример `meta.comments` убран, потому что `meta` — ключ, а не собственное имя.");

// 7.2.4.5.
const e = d["7.2.4.5"];
Object.assign(e, {
  title: "Relations to other entities",
  ruTitle: "Отношения к другим сущностям",
  text: `Where a node says how an entity (§${A}) relates to another entity, it states that relation in words next to the entity's name.`,
  ruText: `Где узел говорит, как сущность (§${A}) относится к другой сущности, он выражает это отношение словами рядом с её именем.`,
  examples: ["A rule speaks of \"the owner of a section\". The mistake closest to that case is to coin SectionOwner, which reads as the name of a new entity."],
  ruExamples: ["Правило говорит об «ответственном за раздел». Ближайшая ошибка — придумать имя SectionOwner: оно читается как имя новой сущности."],
  reason: "A name coined for an entity in one relation reads as the name of a new entity, and the reader looks for its definition.",
  ruReason: "Имя, придуманное для сущности в одном отношении, читается как имя новой сущности, и читатель ищет её определение.",
});
e.changes.push("По замечаниям рецензента: слово «положение» нигде не определено и читалось как место узла, уровень домена или пункт документа; узел говорит об отношении сущности к другой сущности.");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
for (const [x, y] of [
  ['"When an entity gets a special name","Когда сущность получает особое имя"', '"Coined names","Придуманные имена"'],
  ['"What a name says","Что говорит имя"', '"What a name is made of","Из чего состоит имя"'],
  ['"Positions","Положение сущности"', '"Relations to other entities","Отношения к другим сущностям"'],
  ['purpose: "Как спецификация даёт имена тому, что определяет."', 'purpose: "Как спецификация даёт имена тому, что определяет, и как узлы ими пользуются."'],
]) {
  if (!h.includes(x)) throw new Error("page: " + x);
  h = h.replace(x, y);
}
fs.writeFileSync(page, h);
console.log("ok");
