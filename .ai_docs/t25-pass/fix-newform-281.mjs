// Node 12.2.1: the owner decided on 2026-11-14 that it keeps the wording agreed on 2026-11-08. A RecordType connects the
// parts of the system, as a cable connects blocks without being a block itself, so dividing the specification into
// domains produces only the domains and the contracts section they share. The proposal to add the data models to the
// node (fix-newform-275.mjs to fix-newform-280.mjs) is withdrawn.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.1"];
if (!n.proposals) throw new Error("12.2.1 has no proposal");
delete n.proposals;
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.1 proposal withdrawn");
