// Check 10.1.3: "can name" for "may name" in the reason's first sentence. "may" reads as permission elsewhere in the
// specification, and a reason permits nothing; "can" states the possibility the Russian «могут называть» means. The
// owner agrees the Russian, which stays as it is, and leaves the choice of the English to the agent (2026-11-12).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.reason = r.reason.replace("documents may name", "documents can name");
if (!r.reason.includes("can name")) throw new Error("10.1.3: the reason was not changed");
r.change += " В английском обоснования «may name» заменено на «can name»: «may» здесь читалось бы как разрешение. Русский текст не изменился.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 reason:", r.reason);
