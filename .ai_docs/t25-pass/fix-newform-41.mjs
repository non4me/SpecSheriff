// The owner's comment of 2026-11-09 on node 3.4 "RecordType": the sentence on a domain's API, in their words.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "Through it a domain describes its API.", "A domain uses it in its API.");
n.ruText = swap(n.ruText, "Через него домен описывает свой API.", "Его домен использует в своём API.");
n.changes.push("Вторая фраза первого абзаца — ваша, по комментарию на странице.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[0]);
console.log(n.ruText.split("\n\n")[0]);
