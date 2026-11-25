// The English of 10.2 and 1.3.2, agreed on 2026-11-17, brought into line with their Russian text after EngStickler's
// readers had read it: a push is a moment, as 10.2's own list says, so the guidelines name it "as the moment at which the
// tests run"; "except" instead of "but"; the code outside the commit, not the commit, carries no SpecTag.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-454.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (key, field, from, to) => {
  const n = d[key];
  if (!n[field].includes(from)) throw new Error(`${key}.${field}: not found: ${from}`);
  n[field] = n[field].split(from).join(to);
};
swap("10.2", "text", "name a push as the place where the tests run", "name a push as the moment at which the tests run");
swap("10.2", "text", "every check in that table but the tests and the review of the code", "every check in that table except the tests and the review of the code");
swap("10.2", "ruText", "называют push местом запуска тестов", "называют push моментом запуска тестов");
swap("1.3.2", "text", "and the checks give no warning about code outside the commit that carries no SpecTag", "and the checks give no warning about code that is outside the commit and carries no SpecTag");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const tf = new URL("table-10-1.json", here);
fs.copyFileSync(tf, new URL("table-10-1.before-454.json", here));
const t = JSON.parse(fs.readFileSync(tf, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.44");
r.cost = r.cost.replace("name a push as the place where the tests run", "name a push as the moment at which the tests run");
r.ruCost = r.ruCost.replace("называют push местом запуска тестов", "называют push моментом запуска тестов");
fs.writeFileSync(tf, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
