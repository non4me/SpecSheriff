// Node 7.1: the English fixes that EngStickler's readers found after the owner agreed to the node. None changes the
// meaning, so the owner's agreement stands and the owner is told in one line.
// Node 7.3.1: after the wording checker, the text no longer gives the reason that the reason already gives, and its
// sentences name what they refer to.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-357.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

const a = d["7.1"];
a.text = swap(a.text, "Whoever writes a node words it so that whoever applies the node understands it correctly on first reading, with the least effort.",
  "Whoever writes a node chooses its wording so that whoever applies the node understands it correctly on first reading and with the least effort.");
a.text = swap(a.text, "- can read the nodes it links to;", "- can read the nodes that the node links to;");
a.text = swap(a.text, "Each other rule of this section applies to the parts of a node that it names.", "Each of the other rules of this section applies to the parts of a node that it names.");
a.text = swap(a.text, "apart from the citations among them.", "except the citations in them.");
a.reason = swap(a.reason, "apply the rules of this section alike only when", "apply the rules of this section in the same way only when");

const t = d["7.3.1"];
t.text = "A node's title is a short name for what the node is about, such as \"Guaranteed fields\". The text of the node states its rule. The title names only what sets the node apart within its section.";
t.ruText = "Заголовок узла — краткое имя того, о чём узел, например «Гарантированные поля». Правило узла излагает его текст. Заголовок называет только то, что отличает узел внутри его раздела.";
t.reason = "The reader sees a title first, often in a tree or in a list beside the titles of the other nodes in the same section, and decides from it what to open. A title that stated the rule would repeat the main thought that the text opens with.";
t.ruReason = "Читатель видит заголовок первым, часто в дереве или в списке рядом с заголовками других узлов того же раздела, и по нему решает, что открыть. Заголовок, который излагал бы правило, повторял бы главную мысль, с которой начинается текст.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
