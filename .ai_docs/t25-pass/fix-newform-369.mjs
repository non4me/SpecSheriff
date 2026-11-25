// Node 7.2.1: "as a rule does" can be read as the idiom "as a rule" (usually), and "its subject" can attach to the
// description or to the shortcoming, so the second paragraph says that the description, too, names a subject.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-369.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "the description names its subject as a rule does, and states what that subject does", "the description too names a subject, and states what that subject does");
n.ruText = swap(n.ruText, "описание называет свой субъект так же, как правило, и говорит", "описание тоже называет субъект и говорит");
n.changes[n.changes.length - 1] = n.changes[n.changes.length - 1].replace("теперь сказано прямо — «так же, как правило»", "теперь сказано «описание тоже называет субъект» (вариант «as a rule does» читался как идиома «как правило»)");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
