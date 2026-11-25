// The owner's decision of 2026-11-16 («переноси»): the rule on names becomes subsection 7.2.4, "Naming", of
// subsection 7.2, and the principles of naming kept in the section "Naming" of the skill spec-review move into it.
// The subsection holds five nodes: 7.2.4.1, what a name is and where these rules apply (the agreed 7.2.4, keeping
// its sid, its new wording a proposal); 7.2.4.2, when a thing gets a special name (item 1 of the skill); 7.2.4.3,
// what a name says (item 3 of the skill and the paragraph on general words); 7.2.4.4, properties (item 4 of the skill
// and the paragraphs on properties); 7.2.4.5, positions (item 6 of the skill). Nodes 7.2.5 to 7.2.7 keep their
// numbers. The page shows the subsection indented under 7.2, and the checker's group "words" lists the new numbers.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-naming.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (!d["7.2.4"] || d["7.2.4.1"]) throw new Error("already restructured?");
const gw = "s-me9k7g34jqb4rzn";
const decided = "по вашему решению от 16 ноября";

// 7.2.4.1: the agreed node, under its new key, with a proposal.
const a = d["7.2.4"];
delete a.proposals;
const aText = [
  "A name that the specification defines says by itself what it names, whatever rule it is read in. Such a name can be, for example, a term, or a field used apart from its object.",
  "The rules of this section apply to such a name where the specification defines it, and to a node's text, reason, list members and table cells.",
].join("\n\n");
const aRuText = [
  "Имя, которое определяет спецификация, само говорит, что оно называет, в каком бы правиле его ни читали. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта.",
  "Правила этого раздела распространяются на такое имя там, где его определяет спецификация, а также на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const aReason = "A name that the specification defines is read in every rule that uses it, far from its definition. Only a name that says what it names means the same thing in each of those rules.";
const aRuReason = "Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Только имя, которое само говорит, что оно называет, значит одно и то же в каждом из этих правил.";
a.proposals = [
  {
    where: "заголовок, текст и обоснование",
    en: [`Title: What a name is`, "", `Text: ${aText}`, "", `Reason: ${aReason}`].join("\n"),
    ru: [`Заголовок: Что такое имя`, "", `Текст: ${aRuText}`, "", `Обоснование: ${aRuReason}`].join("\n"),
    why: [
      `Правило об именах стало подразделом 7.2.4 «Образование имён», ${decided}, и в него перенесены принципы из раздела «Naming» skill spec-review. Этот узел открывает подраздел: что такое имя, чего от него требуют и где действуют правила подраздела.`,
      "Заголовок «Naming» («Образование имён») перешёл к подразделу; у узла новый заголовок «What a name is» («Что такое имя»).",
      "Текст. Было: «Имя, определённое спецификацией, — термин, поле, используемое отдельно от своего объекта, — никогда не бывает одним общим словом, таким как type, action или item. Оно включает то, к чему относится общее слово: userAction, а не action.» и два абзаца о том, как записывают свойство. Стало: «Имя, которое определяет спецификация, само говорит, что оно называет, в каком бы правиле его ни читали. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта.» и абзац об области действия. Абзац об общем слове перешёл в 7.2.4.3 «Что говорит имя», абзацы о свойствах — в 7.2.4.4 «Свойства».",
      "Абзац об области действия теперь относится ко всем правилам подраздела. Он включает имя там, где его определяет спецификация, потому что у узла-термина заголовок и есть сам термин, а имена полей не стоят ни в каком тексте.",
      "Обоснование. Было: «Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем. Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова.» Стало: «Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Только имя, которое само говорит, что оно называет, значит одно и то же в каждом из этих правил.» Пример с полем type перешёл в обоснование 7.2.4.3, а слова о ключе и шрифте кода — в обоснование 7.2.4.4.",
    ].join(" "),
  },
];

const fresh = (title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples, changes) => ({
  from: "", sid: "new", title, ruTitle, text, reason, ruText, ruReason, changes, examples, ruExamples,
});

const b = fresh(
  "When a thing gets a special name", "Когда вещь получает особое имя",
  "A thing gets a special name, one made for the specification rather than taken from ordinary language, only where both of these hold:\n- the thing is a procedure, an entity, a constant or a variable;\n- the ordinary word for the thing also appears in the specification in its ordinary sense.\n\nAny other thing is called by its ordinary word.",
  "Вещь получает особое имя, созданное для спецификации, а не взятое из обычной речи, только если верно и то и другое:\n- эта вещь — процедура, сущность, константа или переменная;\n- обычное слово для этой вещи встречается в спецификации и в своём обычном смысле.\n\nЛюбую другую вещь называют её обычным словом.",
  "A special name that nobody needs suggests a meaning that the thing does not have. It is also one more name that every reader has to learn.",
  "Особое имя, которое никому не нужно, намекает на смысл, которого у вещи нет. Кроме того, это ещё одно имя, которое приходится выучить каждому читателю.",
  ["The specification calls the reference that binds code to a node a SpecTag, because the word \"tag\" also appears in it in the sense of a git tag. The mistake closest to that case is to give a special name to a thing whose ordinary word appears in no other sense."],
  ["Спецификация называет ссылку, которая связывает код с узлом, SpecTag, потому что слово «tag» встречается в ней и в смысле тега git. Ближайшая ошибка — дать особое имя вещи, обычное слово для которой ни в каком другом смысле не встречается."],
  [`Новый узел, ${decided}: пункт 1 раздела «Naming» skill spec-review, «A special name only for a real term», перенесён в базу.`],
);
const c = fresh(
  "What a name says", "Что говорит имя",
  `A name says what the thing is, by how the thing is used or by what it holds. A general word (§${gw}) serves as a name only together with what it applies to.`,
  `Имя говорит, что это за вещь: как её используют или что она содержит. Общее слово (§${gw}) служит именем только вместе с тем, к чему оно относится.`,
  "A name that does not say what the thing is fits many things, and the context of each rule picks a different one. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third.",
  "Имя, которое не говорит, что это за вещь, подходит ко многим вещам, и контекст каждого правила выбирает свою. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем.",
  [
    "A field that holds the action a user took, and is used apart from its object, is named userAction. The mistake closest to that case is to name it action.",
    "A list of the rules that a check covers is named CoveredRules. The mistake closest to that case is to name it SpecList, which says only whose the list is.",
  ],
  [
    "Поле, в котором хранится действие пользователя и которое используют отдельно от его объекта, называется userAction. Ближайшая ошибка — назвать его action.",
    "Список правил, которые охватывает проверка, называется CoveredRules. Ближайшая ошибка — назвать его SpecList: такое имя говорит только, чей это список.",
  ],
  [`Новый узел, ${decided}: пункт 3 раздела «Naming» skill spec-review, «A name is one word, as concrete as possible», без правила о записи одним словом с заглавными буквами частей, которое относится к именам самого метода, и первый абзац согласованного 7.2.4 об общем слове, в редакции без отрицания. Пример с полем type взят из обоснования согласованного 7.2.4.`],
);
const dd = fresh(
  "Properties", "Свойства",
  "A node that names a property names the object that the property belongs to as well, using only these forms:\n- where the object has a name of its own: that name, a dot and the property's key, all in code font, such as `TextRule.list` or `meta.comments`;\n- where the object has no name of its own: the property's key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.\n\nSo a property's key may be a general word. A property gets a name of its own only where it is also used apart from its object.",
  "Узел, который называет свойство, называет и объект, которому свойство принадлежит, используя только эти формы:\n- если у объекта есть собственное имя: это имя, точка и ключ свойства, всё шрифтом кода, например `TextRule.list` или `meta.comments`;\n- если у объекта нет собственного имени: ключ свойства шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.\n\nПоэтому ключ свойства может быть общим словом. Собственное имя свойство получает, только если его используют и отдельно от его объекта.",
  "Named together with its object, a property's key means the same thing in every rule, even where the key is a general word. Code font sets the key apart from the ordinary word it may be.",
  "Названный вместе со своим объектом, ключ свойства значит одно и то же в каждом правиле, даже если сам ключ — общее слово. Шрифт кода отличает ключ от обычного слова, которым он может быть.",
  undefined, undefined,
  [`Новый узел, ${decided}: второй и третий абзацы согласованного 7.2.4 о записи свойства, в редакции со списком, которую я предложил 16 ноября, и пункт 4 раздела «Naming» skill spec-review: собственное имя свойство получает, только если его используют и отдельно от его объекта. Слова о шрифте кода взяты из обоснования согласованного 7.2.4.`],
);
delete dd.examples;
delete dd.ruExamples;
const e = fresh(
  "Positions", "Положение вещи",
  "A thing that has a name keeps that name in every position. A node states the thing's position in words next to the name, such as \"the owner of a section\".",
  "Вещь, у которой есть имя, сохраняет это имя в любом положении. Узел называет положение вещи словами рядом с её именем, например «ответственный за раздел».",
  "A new compound name for a position reads as a new thing, and the reader looks for its definition. Called by its own name, the thing stays one thing in every position.",
  "Новое составное имя для положения читается как новая вещь, и читатель ищет её определение. Названная своим именем, вещь остаётся одной и той же в любом положении.",
  ["A rule speaks of \"the owner of a section\". The mistake closest to that case is to coin SectionOwner, which reads as a new kind of owner."],
  ["Правило говорит об «ответственном за раздел». Ближайшая ошибка — придумать имя SectionOwner, которое читается как новый вид ответственного."],
  [`Новый узел, ${decided}: пункт 6 раздела «Naming» skill spec-review, «A position is said in words», перенесён в базу; пример взят из того, что есть в любой спецификации.`],
);

const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "7.2.4") {
    out["7.2.4.1"] = a;
    out["7.2.4.2"] = b;
    out["7.2.4.3"] = c;
    out["7.2.4.4"] = dd;
    out["7.2.4.5"] = e;
  } else out[k] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

// The page: subsection 7.2 splits around the new subsection 7.2.4, which stands indented.
const page = new URL("base-structure.html", here);
fs.copyFileSync(page, new URL("base-structure.before-naming.html", here));
let h = fs.readFileSync(page, "utf8");
const swap = (x, y) => {
  if (!h.includes(x)) throw new Error("page: not found " + x.slice(0, 60));
  h = h.replace(x, y);
};
swap(`      ["7.2.4","part",0,"6.10","Naming","Образование имён"],\n`,
  `     ]},\n     { n: "7.2.4", sub: true, en: "Naming", ru: "Образование имён", purpose: "Как спецификация даёт имена тому, что определяет.", rows: [\n` +
  `      ["7.2.4.1","part",0,"6.10","What a name is","Что такое имя"],\n` +
  `      ["7.2.4.2","new",0,"","When a thing gets a special name","Когда вещь получает особое имя","","Новый узел, ${decided}: принцип из skill spec-review.",[],""],\n` +
  `      ["7.2.4.3","new",0,"","What a name says","Что говорит имя","","Новый узел, ${decided}: принцип из skill spec-review и абзац об общем слове из 7.2.4.",[],""],\n` +
  `      ["7.2.4.4","new",0,"","Properties","Свойства","","Новый узел, ${decided}: абзацы о свойствах из 7.2.4 и принцип из skill spec-review.",[],""],\n` +
  `      ["7.2.4.5","new",0,"","Positions","Положение вещи","","Новый узел, ${decided}: принцип из skill spec-review.",[],""]\n` +
  `     ]},\n     { rows: [\n`);
swap(`  .group-head .purpose { flex-basis: 100%; }\n`,
  `  .group-head .purpose { flex-basis: 100%; }\n  .group-head.sub, ol.nodes.sub { margin-left: 22px; }\n`);
swap(`      const gh = el("div", "part-head group-head");`, `      const gh = el("div", "part-head group-head" + (g.sub ? " sub" : ""));`);
swap(`    const ol = el("ol", "nodes");\n    for (const [n, k, law, o, en, ru, gist, note, rel, now] of g.rows) {`,
  `    const ol = el("ol", "nodes" + (g.sub ? " sub" : ""));\n    for (const [n, k, law, o, en, ru, gist, note, rel, now] of g.rows) {`);
fs.writeFileSync(page, h);

// The checker: the group "words" lists the rules of the new subsection.
const cfgPath = "D:/SpecSheriff/.claude/vt/checker-v3.json";
fs.copyFileSync(cfgPath, cfgPath.replace(".json", ".before-naming.json"));
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const words = cfg.groups.find((g) => g.id === "words");
const i = words.rules.indexOf("7.2.4");
if (i < 0) throw new Error("checker: no 7.2.4 in words");
words.rules.splice(i, 1, "7.2.4.1", "7.2.4.2", "7.2.4.3", "7.2.4.4", "7.2.4.5");
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + "\n");
console.log("restructured: 7.2.4 → 7.2.4.1–7.2.4.5");
