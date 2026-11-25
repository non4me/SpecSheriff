// Sets each node's meta.tests to the list `sheriff binding` says the tests' SpecTags produce, where the two differ.
// The binding check stays the judge: this only copies what it names, in the order it names it.
import fs from "node:fs";
import { spawnSync } from "node:child_process";
const root = "D:/SpecSheriff";
const out = spawnSync("node", [`${root}/skills/claude-code/tools/dist/cli.js`, "binding"], { cwd: root, encoding: "utf8" });
const text = `${out.stdout}\n${out.stderr}`;
const wanted = new Map();
for (const line of text.split("\n")) {
  const m = line.match(/^(specs\/[^:]+): (s-[a-z0-9]{15}) \([^)]*\): its list of tests is not what the tests' SpecTags produce: (.*)$/);
  if (!m) continue;
  const entries = m[3].split(", skills/").map((e, i) => (i === 0 ? e : `skills/${e}`));
  wanted.set(m[2], { file: m[1], entries });
}
for (const [sid, { file, entries }] of wanted) {
  const path = `${root}/${file}`;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  const walk = (n) => {
    if (n.sid === sid) {
      n.meta ??= {};
      n.meta.tests = entries;
      return true;
    }
    return (n.children || []).some(walk);
  };
  data.nodes.some(walk);
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`${sid}: ${entries.length} tests`);
}
