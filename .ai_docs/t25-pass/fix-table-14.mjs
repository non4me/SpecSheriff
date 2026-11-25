// The owner of 2026-11-11 agreed the head of 10.1, its reason included: «Да, шапка согласована, включая обоснование».
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
t.head.agreed = "2026-11-11";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("head agreed", t.head.agreed);
