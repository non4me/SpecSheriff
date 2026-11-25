// The rule reviewer on the new reason of 10.1: "That" had no clear antecedent and "to compare" no object.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const h = t.head;
h.reason =
  "In one table, every check can be seen at a glance with what its failure costs. " +
  "Gathered so, the checks are easier to read and to compare with one another than when spread across separate rules.";
h.ruReason =
  "В одной таблице все проверки видны сразу, вместе с ценой непрохождения каждой. " +
  "Так проверки проще читать и сравнивать друг с другом, чем когда они разнесены по отдельным правилам.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(h.reason);
