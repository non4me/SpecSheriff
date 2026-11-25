// Gives a node moved unchanged a draft of its own, so that the page can mark it agreed: node adopt-moved.mjs <key> [date].
// Its English stays a reference to the present node; its Russian reading, written at the showing, is in moved-ru.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("moved-ru.json", here), "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const present = {};
(function walk(ns) { for (const n of ns) { present[n.location.replace("_guidelines/spec/", "")] = n; if (n.children) walk(n.children); } })(spec.nodes);

const [key, date] = process.argv.slice(2);
const r = ru[key];
if (!r) throw new Error("no reading of " + key);
if (!present[r.from]) throw new Error("no present node " + r.from);
d[key] = {
  from: r.from, sid: "kept", title: "=" + r.from, text: "=" + r.from, reason: "=" + r.from,
  ruTitle: r.ruTitle, ruText: r.ruText, ruReason: r.ruReason,
  changes: ["Перенесён без изменения формулировки."], sidValue: present[r.from].sid,
  ...(date ? { agreed: date } : {}),
};
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("adopted", key, "from", r.from, date ? "agreed " + date : "");
