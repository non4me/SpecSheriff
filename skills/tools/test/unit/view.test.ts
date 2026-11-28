import { test } from "node:test";
import assert from "node:assert/strict";
import { approve } from "../../src/approvals.ts";
import { domainDiagram } from "../../src/model.ts";
import { reindex } from "../../src/reindex.ts";
import { nodeMarkdown } from "../../src/show.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { viewModel } from "../../src/view.ts";
import { file, node, OWNER, repo, sid, table, taking } from "../fixture.ts";
import { LEVELS_RULE } from "../../src/model.ts";

const chosen = (...names: string[]) => names.map((name) => ({ name, chosen: true, by: OWNER }));

/** A project with guidelines, contracts, three domains at two levels and a technical appendix. */
function project(extensions = ["domains", "views"]): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: chosen(...extensions) },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [
      node("base rule", { reason: "Because.", text: `It uses §${sid("shared rule")}.`, refs: [{ type: "cites", to: sid("shared rule") }] }),
    ] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: LEVELS_RULE }], list: { of: "the levels", members: ["core", "auxiliary"] } }),
    ] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [
      node("shared rule", { meta: {
        decisions: [{ date: "2026-11-27", problem: "P.", ruling: "R.", type: "textual" }],
        comments: [{ date: "2026-11-27", by: OWNER, text: "C." }, { date: "2026-11-28", by: OWNER, text: "D." }],
        todos: [{ date: "2026-11-27", by: OWNER, text: "T." }],
      } }),
      table("shared table", [["shared check", "refused"]]),
    ] })),
    "specs/zeta/00-zeta.json": file("zeta", "00-zeta", node("zeta", { kind: "header", level: "core", sections: [] })),
    "specs/zeta/z.json": file("zeta", "z", node("zeta section", { kind: "section", text: "Z.", children: [node("zeta rule")] })),
    "specs/alpha/00-alpha.json": file("alpha", "00-alpha", node("alpha", { kind: "header", level: "core", sections: [], refs: [{ type: "consumes", to: sid("zeta section") }] })),
    "specs/alpha/a.json": file("alpha", "a", node("alpha section", { kind: "section", text: "A.", children: [node("alpha rule")] })),
    "specs/helper/00-helper.json": file("helper", "00-helper", node("helper", { kind: "header", level: "auxiliary", sections: [] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [node("runtime")] })),
  });
  reindex(root);
  approve(root, [sid("base rule"), sid("our levels")], { me: OWNER });
  reindex(root);
  return root;
}

test("@spec s-exgg4vm4ds7t9jg returns the boxes in the order of the branches of the map, with the domains among them in the order of the diagram of the domains", () => {
  const model = viewModel(project());
  assert.deepEqual(model.parts.map((p) => [p.name, p.domain]), [
    ["spec", false], ["domains", false], ["views", false], ["project", false],
    ["contracts", false], ["zeta", true], ["alpha", true], ["helper", true], ["tech", false],
  ]);
});

test("@spec s-rj7yxrktxywvxzj counts, for each box, the nodes whose approval status is not derived, and how many of them are approved", () => {
  const parts = new Map(viewModel(project()).parts.map((p) => [p.name, [p.approved, p.all]]));
  assert.deepEqual(parts.get("spec"), [1, 1]);
  assert.deepEqual(parts.get("project"), [1, 1]);
  // The shared rule, the TableRule and the node in its cell; the section is left out.
  assert.deepEqual(parts.get("contracts"), [0, 3]);
  // The domain's header and its section are left out.
  assert.deepEqual(parts.get("zeta"), [0, 1]);
});

test("@spec s-exgg4vm4ds7t9jg returns the diagram of the domains as the SpecSheriff tools draw it", () => {
  const root = project();
  assert.deepEqual(viewModel(root).diagram, domainDiagram(loadSpecification(root), ["core", "auxiliary"]));
});

test("@spec s-4s3aru64yudz4kh returns each node as `sheriff show` prints it, with the nodes under it and with the nodes in a TableRule's cells after the TableRule's children", () => {
  const root = project();
  const model = viewModel(root);
  const spec = loadSpecification(root);
  const rule = model.nodes[sid("shared rule")]!;
  assert.equal(rule.markdown, nodeMarkdown(spec, spec.nodes.get(sid("shared rule"))!.node, 1, { children: false }));
  assert.equal(rule.parent, sid("shared"));
  assert.equal(rule.part, "contracts");
  assert.equal(rule.status, "draft");
  assert.equal(model.nodes[sid("base rule")]!.status, "approved");
  assert.deepEqual(model.nodes[sid("shared")]!.children, [sid("shared rule"), sid("shared table")]);
  assert.deepEqual(model.nodes[sid("shared table")]!.children, [sid("shared check")]);
  assert.equal(model.nodes[sid("shared check")]!.parent, sid("shared table"));
});

test("@spec s-k4nqjr96ux7a5m7 sheriff view writes a node in Markdown as sheriff show writes it, and gives a node in a cell a heading that consists of its location alone", () => {
  const root = project();
  const spec = loadSpecification(root);
  const { nodes } = viewModel(root);
  for (const name of ["base rule", "shared table", "shared check"]) {
    assert.equal(nodes[sid(name)]!.markdown, nodeMarkdown(spec, spec.nodes.get(sid(name))!.node, 1, { children: false }), name);
  }
  assert.match(nodes[sid("shared check")]!.markdown, new RegExp(`^# ${nodes[sid("shared check")]!.location}\\n`));
});

test("@spec s-4s3aru64yudz4kh returns the counts of each node's decisions, comments and todos", () => {
  const model = viewModel(project());
  assert.deepEqual(model.nodes[sid("shared rule")]!.marks, { decisions: 1, comments: 2, todos: 1 });
  assert.deepEqual(model.nodes[sid("zeta rule")]!.marks, { decisions: 0, comments: 0, todos: 0 });
});

test("@spec s-4s3aru64yudz4kh returns each link between two nodes with its type, a `cites` link and a `consumes` link among them", () => {
  const { links } = viewModel(project());
  assert.ok(links.some((l) => l.from === sid("base rule") && l.to === sid("shared rule") && l.type === "cites"));
  assert.ok(links.some((l) => l.from === sid("alpha") && l.to === sid("zeta section") && l.type === "consumes"));
  // Each link once, from the node that declares it.
  assert.equal(links.filter((l) => l.to === sid("shared rule")).length, 1);
});

test("@spec s-282zba8mtxvxnm5 returns only the diagram of the domains where the project has chosen the Domains extension and not the Views extension", () => {
  const model = viewModel(project(["domains"]));
  assert.equal(model.views, false);
  assert.equal(model.domains, true);
  assert.deepEqual(model.parts, []);
  assert.deepEqual(model.nodes, {});
  assert.deepEqual(model.links, []);
  assert.deepEqual(model.diagram?.rows.map((r) => r.label), ["1 core", "2 auxiliary"]);
});

test("@spec s-282zba8mtxvxnm5 returns no diagram of the domains where the project has chosen the Views extension and not the Domains extension", () => {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: chosen("views") },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
    "specs/base/b.json": file("base", "b", node("rules", { kind: "section", text: "R.", children: [node("a rule")] })),
  });
  reindex(root);
  const model = viewModel(root);
  assert.equal(model.diagram, null);
  assert.deepEqual(model.parts.map((p) => p.name), ["spec", "views", "base"]);
});

test("@spec s-282zba8mtxvxnm5 refuses to run where the project has chosen neither the Views nor the Domains extension, with a refusal that names both extensions and `sheriff settings`", () => {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: chosen("recordtype") },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
  });
  assert.throws(() => viewModel(root), (error: Error) => /Views/.test(error.message) && /Domains/.test(error.message) && /sheriff settings/.test(error.message));
});

test("@spec s-282zba8mtxvxnm5 reads the specification as `sheriff json` reads it: an extension that the project receives from the plugin but has not chosen is left out", () => {
  const root = taking({ "sheriff.config.json": { code: [], tests: [], extensions: chosen("views") } });
  reindex(root);
  const names = viewModel(root).parts.map((p) => p.name);
  assert.ok(names.includes("views"), names.join(", "));
  assert.ok(!names.includes("domains"), names.join(", "));
  assert.ok(names.includes("tools"), names.join(", "));
});
