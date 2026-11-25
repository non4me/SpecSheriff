// Nodes 1.3.7 and 10.6, agreed on 2026-11-13: the one reading of their English after the agreement. The fixes change only
// the English.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swap = (n, field, from, to) => {
  if (!d[n][field].includes(from)) throw new Error(`missing in ${n}.${field}: ${from}`);
  d[n][field] = d[n][field].replace(from, to);
};
swap("1.3.7", "text", "Anyone may withdraw the approval of a node, except that of a node", "Anyone may withdraw the approval of a node, except the approval of a node");
swap("1.3.7", "reason", "A withdrawal gives no agreement in anyone's name,", "A withdrawal approves nothing on anyone's behalf,");
swap("1.3.7", "reason", "so their approval is not for just anyone to withdraw.", "so not just anyone may withdraw their approval.");
d["1.3.7"].changes.push("Английский прочитан один раз после согласования: «except that of» → «except the approval of», «gives no agreement in anyone's name» → «approves nothing on anyone's behalf», «is not for just anyone to withdraw» → «not just anyone may withdraw». Смысл не менялся.");
swap("10.6", "reason", "separate from agreeing to any rule.", "separate from approving any rule.");
d["10.6"].changes.push("Второе чтение английского: «agreeing to any rule» → «approving any rule». Смысл не менялся.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
