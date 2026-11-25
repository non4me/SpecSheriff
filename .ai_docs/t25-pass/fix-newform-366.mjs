// Node 7.2.7: the English fixes that EngStickler's readers found after the owner agreed to the node. None changes the
// meaning, so the owner's agreement stands.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-366.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "The explanation or the citation stands where", "The explanation or the citation appears where");
n.text = swap(n.text, "takes its meaning from the specification where it is either:", "takes its meaning from the specification if it is either of the following:");
n.text = swap(n.text, "a meaning that differs from its everyday one, such as a narrower one.", "a meaning that differs from its everyday meaning, such as a narrower meaning.");
n.text = swap(n.text, "The exception is the words whose definitions every reader is given", "Words and phrases whose definitions every reader is given are exempt");
n.reason = swap(n.reason, "stands unexplained", "is left unexplained");
n.examples[0] = swap(n.examples[0], "\"SpecTag\" stands bare, and only a node that the reader reaches later defines it.", "\"SpecTag\" appears with neither an explanation nor a citation, and only a node that the reader comes to later defines it.");
n.examples[1] = swap(n.examples[1], "\"quota\" stands bare, and the reader takes it in its everyday meaning, a limit of any kind.", "\"quota\" appears with neither an explanation nor a citation, and the reader takes it in its everyday sense, a limit of any kind.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
