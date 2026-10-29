import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { exportMarkdown, guide, render } from "../../src/generated.ts";
import { domainOrder } from "../../src/model.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { REPO } from "../repo.ts";
import { file, node, OWNER, repo, sid } from "../fixture.ts";
import { LEVELS_RULE } from "../../src/model.ts";

function project(): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], writesSpecSheriffGuidelines: false },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", status: "checked", children: [node("base rule", { rationale: "Because." })] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: LEVELS_RULE }], list: { of: "the levels", members: ["core", "auxiliary"] } }),
    ] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [node("shared rule")] })),
    "specs/zeta/00-zeta.json": file("zeta", "00-zeta", node("zeta", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/zeta/z.json": file("zeta", "z", node("zeta section", { kind: "section", text: "Z.", children: [node("zeta rule")] })),
    "specs/alpha/00-alpha.json": file("alpha", "00-alpha", node("alpha", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("zeta section") }] })),
    "specs/alpha/a.json": file("alpha", "a", node("alpha section", { kind: "section", text: "A.", children: [node("alpha rule")] })),
    "specs/helper/00-helper.json": file("helper", "00-helper", node("helper", { kind: "domain", level: "auxiliary", code: null, sections: [] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [node("runtime")] })),
  });
  reindex(root);
  return root;
}

test("s-uw9n84edf7cbe9n orders the domains each after every domain it uses, the order of their names deciding a tie", () => {
  const spec = loadSpecification(project());
  assert.deepEqual(domainOrder(spec), ["helper", "zeta", "alpha"]);
});

test("s-kh8qcd5kxgh9z3j exports every file of the specification to markdown, each node with its sid, text and reason", () => {
  const root = project();
  exportMarkdown(root);
  const md = readFileSync(join(root, "md-version", "_guidelines", "spec.md"), "utf8");
  const spec = loadSpecification(root);
  for (const name of ["base", "base rule"]) {
    const n = spec.nodes.get(sid(name))!.node;
    assert.ok(md.includes(n.sid) && md.includes(n.title) && md.includes(n.text), name);
  }
  assert.ok(md.includes("Because."));
  assert.ok(existsSync(join(root, "md-version", "alpha", "a.md")));
});

test("s-jsqxdx47wkkj7gp exporting again changes nothing, and leaves no export of a file that is gone", () => {
  const root = project();
  exportMarkdown(root);
  const once = readFileSync(join(root, "md-version", "_guidelines", "spec.md"), "utf8");
  rmSync(join(root, "specs", "tech"), { recursive: true });
  exportMarkdown(root);
  assert.equal(readFileSync(join(root, "md-version", "_guidelines", "spec.md"), "utf8"), once);
  assert.deepEqual(readdirSync(join(root, "md-version")).sort(), ["_guidelines", "alpha", "contracts", "helper", "zeta"]);
});

test("s-rpv4fkdqqguptqd writes the map as a web page that draws it with markmap from an outline it holds no file of", () => {
  const root = project();
  render(root);
  const page = readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8");
  assert.match(page, /markmap-autoloader@\d+\.\d+\.\d+/);
  assert.deepEqual(readdirSync(join(root, "specs", "_viewer")), ["index.html"]);
});

test("s-zu8ne3wq84zchc4 the map reads guidelines, contracts, a branch per level from the top with its domains in order, the technical appendix last", () => {
  const root = project();
  render(root);
  const page = readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8");
  const at = (text: string) => {
    const i = page.indexOf(text);
    assert.ok(i >= 0, text);
    return i;
  };
  const order = ["Guidelines", "Contracts", "1 core", "zeta", "alpha", "2 auxiliary", "helper", "Technical appendix"].map(at);
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.ok(page.includes("zeta rule") && page.includes("runtime"));
});

test("s-zu8ne3wq84zchc4 the map shows titles and nesting only, nothing of a rule's text", () => {
  const root = project();
  render(root);
  assert.ok(!readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8").includes("What zeta rule requires."));
});

test("s-xtqebaxjrqjsjwn sheriff guide prints every node of the guidelines and the figures counted off the model as it prints", () => {
  const root = project();
  const out = guide(loadSpecification(root));
  for (const name of ["base", "base rule", "project", "our levels"]) assert.ok(out.includes(sid(name)), name);
  assert.ok(!out.includes(sid("shared rule")));
  assert.match(out, /_guidelines: 4 nodes, 1 checked/);
  assert.match(out, /alpha: 3 nodes, 0 checked/);
});

test("s-f5rz6b7dhxejjts sheriff guide prints the SpecSheriff guidelines of this repository whole", () => {
  const spec = loadSpecification(REPO);
  const out = guide(spec);
  for (const [s, at] of spec.nodes) if (at.file.path.startsWith("specs/_guidelines/")) assert.ok(out.includes(s), s);
});
