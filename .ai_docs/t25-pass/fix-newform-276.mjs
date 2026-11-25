// Node 12.2.5, agreed on 2026-11-14: the English alone is brought into line with the agreed Russian, after the
// EngStickler reader's report. Nothing the node states changes.
// - "It may go to any section" read as a link to a section node: the link goes to a node in any section.
// - "what is relied on" is an impersonal calque; "whoever writes the link first adds" read two ways, "first" taken as
//   "the first to write it": the second paragraph now names the order of the two acts.
// - "shows that reliance on both nodes" read as a reliance on both nodes; "described only in words" is a calque; "seen by
//   no check" does not collocate.
// The reader's "has" → "must have" is rejected: the house style states a requirement in the indicative.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.5"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

n.text = swap(n.text, "It may go to any section of that domain.", "It may go to a node in any section of that domain.");
n.text = swap(
  n.text,
  "Where no node of that domain states what is relied on, whoever writes the link first adds that statement to that domain:\n- to an existing node that the statement fits;",
  "Where no node of the other domain states what a node relies on, the link's author adds the missing statement to the other domain before writing the link:\n- to an existing node that the statement fits;",
);
n.reason = swap(n.reason, "shows that reliance on both nodes.", "makes that reliance visible in both nodes.");
n.reason = swap(
  n.reason,
  "A reliance described only in words is seen by no reader of the other domain and by no check.",
  "A reliance described only in prose is visible to no reader of the other domain and to no check.",
);
n.changes.push(
  "Только английский текст, по замечаниям читателя: связь ведёт к узлу в любом разделе; второй абзац прямо говорит, что утверждение добавляют до того, как пишут связь; в обосновании «видна в обоих узлах». Смысл узла не изменился.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.5 English fixed:\n" + n.text + "\n---\n" + n.reason);
