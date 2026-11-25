// Node 1.5.2: "at once" in the reason could mean "all together"; it becomes "immediately". The temporary key "1.5.2~"
// is removed, since the proposal carries the whole wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-445.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const prop = d["1.5.2"].proposals[0];
const from = "lets the checks find at once code that has lost its link";
if (!prop.en.includes(from)) throw new Error("reason not as expected");
prop.en = prop.en.replace(from, "lets the checks immediately find code that has lost its link");
delete d["1.5.2~"];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
