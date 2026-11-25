// The rule reviewer on the rewritten head of 10.1: "must pass must find" reads as a garden path.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const from = "which checks an edit of the specification or of the code must pass must find";
if (t.head.reason.split(from).length !== 2) throw new Error("marker");
t.head.reason = t.head.reason.replace(from, "which checks an edit of the specification or of the code has to pass must find");
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(t.head.reason);
