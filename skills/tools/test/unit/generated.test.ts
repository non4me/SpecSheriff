import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";
import { confirm } from "../../src/confirmations.ts";
import { exportMarkdown, guide, render } from "../../src/generated.ts";
import { domainOrder } from "../../src/model.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification, type SpecNode } from "../../src/spec-files.ts";
import { REPO } from "../repo.ts";
import { file, loc, node, OWNER, repo, sid } from "../fixture.ts";
import { LEVELS_RULE } from "../../src/model.ts";

function project(): string {
  const root = repo({
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule", { reason: "Because." })] })),
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
  confirm(root, [sid("base")], { me: OWNER });
  return root;
}

test("s-zefk589ykh37b8u keeps the readable export and the map out of git", () => {
  const root = project();
  spawnSync("git", ["init", "-q"], { cwd: root });
  exportMarkdown(root);
  render(root);
  for (const path of ["md-version/contracts/c.md", "specs/_viewer/index.html"]) {
    assert.equal(spawnSync("git", ["check-ignore", "-q", path], { cwd: root }).status, 0, `${path} is ignored`);
  }
});

test("s-uw9n84edf7cbe9n orders the domains each after every domain it uses, the order of their names deciding a tie", () => {
  const spec = loadSpecification(project());
  assert.deepEqual(domainOrder(spec), ["zeta", "alpha", "helper"]);
});

test("s-uw9n84edf7cbe9n puts a domain as close as possible before the first domain that uses it", () => {
  const header = (name: string, uses: string[] = []) => file(name, `00-${name}`, node(name, { kind: "domain", level: "core", code: null, sections: [], refs: uses.map((u) => ({ type: "consumes", to: sid(`${u} section`) })) }));
  const section = (name: string) => file(name, "s", node(`${name} section`, { kind: "section", text: "S.", children: [node(`${name} rule`)] }));
  const root = repo({
    "specs/a/00-a.json": header("a"), "specs/a/s.json": section("a"),
    "specs/b/00-b.json": header("b"), "specs/b/s.json": section("b"),
    "specs/z/00-z.json": header("z", ["a"]), "specs/z/s.json": section("z"),
  });
  assert.deepEqual(domainOrder(loadSpecification(root)), ["b", "a", "z"]);
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

/** A specification whose nodes hold, between them, every kind of value a node's file can hold. */
function everything(): string {
  const root = repo({
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [
      node("listed rule", {
        reason: "Because.",
        refs: [{ type: "implements", to: sid("base") }],
        list: { of: "the colours", members: ["red", "green"], declaredIn: { file: "src/colour.ts", declaration: "Colour" } },
        meta: {
          decisions: [{ date: "2026-11-02", problem: "Which colours.", ruling: "Two of them.", type: "textual" }],
          todos: [{ date: "2026-11-02", by: OWNER, text: "Add blue." }],
          comments: [{ date: "2026-11-02", by: OWNER, text: "Red reads badly on dark ground.", type: "problem" }],
          tests: ["test/colour.test.ts::lists the colours"],
        },
        children: [node("nested rule")],
      }),
    ] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: LEVELS_RULE }], list: { of: "the levels", members: ["core"] } }),
    ] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [
      node("Invoice", { kind: "recordType", text: "A bill sent to a customer.", fields: [{ name: "total", type: { is: "whole number" }, required: true, text: "The sum owed." }], unknown: "refused" }),
      node("customer", { kind: "term", text: "Whoever is billed.", refs: [{ type: "term-relation", to: sid("Invoice"), ratio: "1:0..N" }] }),
    ] })),
    "specs/alpha/00-alpha.json": file("alpha", "00-alpha", node("alpha", { kind: "domain", owner: OWNER, level: "core", code: "src/alpha", sections: [] })),
    "specs/alpha/a.json": file("alpha", "a", node("alpha section", { kind: "section", text: "A.", children: [node("alpha rule")] })),
  });
  reindex(root);
  return root;
}

/** Every value a node's file holds for it, other than the text written as headings, links and children: each as the export writes it. */
function values(n: SpecNode): string[] {
  const { location, sid: s, kind, title, status, text, reason, refs, children, ...rest } = n;
  return [s, kind, title, text, ...(reason ? [reason] : []), ...Object.entries(rest).map(([k, v]) => (typeof v === "string" ? v : JSON.stringify(v, null, 2)))];
}

const exported = (root: string, part: string) => readFileSync(join(root, "md-version", `${part}.md`), "utf8");

test("s-k4nqjr96ux7a5m7 the export writes a node with every value its file holds, each that is not text under its key as JSON", () => {
  const root = everything();
  exportMarkdown(root);
  const spec = loadSpecification(root);
  for (const [name, part] of [["listed rule", loc("_guidelines", "spec")], ["Invoice", "contracts/c"], ["customer", "contracts/c"], ["alpha", "alpha/00-alpha"]] as const) {
    const md = exported(root, part);
    for (const v of values(spec.nodes.get(sid(name))!.node)) assert.ok(md.includes(v), `${name}: ${v}`);
  }
  assert.ok(exported(root, loc("_guidelines", "spec")).includes(`**list:**\n\n\`\`\`json\n${JSON.stringify(spec.nodes.get(sid("listed rule"))!.node.list, null, 2)}\n\`\`\``));
});

test("s-k4nqjr96ux7a5m7 the export writes each link with its type, its direction, its ratio and the sid, location and title of the node at the other end", () => {
  const root = everything();
  exportMarkdown(root);
  const spec = loadSpecification(root);
  const at = (name: string) => spec.nodes.get(sid(name))!.node;
  const md = exported(root, "contracts/c");
  assert.ok(md.includes(`- term-relation 1:0..N → ${sid("Invoice")} ${at("Invoice").location} Invoice`));
  assert.ok(md.includes(`- term-relation 0..N:1 ← ${sid("customer")} ${at("customer").location} customer`));
  assert.ok(exported(root, loc("_guidelines", "spec")).includes(`- implements ← ${sid("listed rule")} ${at("listed rule").location} listed rule`));
});

test("s-k4nqjr96ux7a5m7 the export writes a node's children after it, each under a heading one level deeper than its parent's", () => {
  const root = everything();
  exportMarkdown(root);
  const spec = loadSpecification(root);
  const md = exported(root, loc("_guidelines", "spec"));
  const heading = (name: string, level: number) => {
    const n = spec.nodes.get(sid(name))!.node;
    const i = md.indexOf(`${"#".repeat(level)} ${n.location} ${n.title}\n`);
    assert.ok(i >= 0 && md[i - 1] !== "#", `${name} at level ${level}`);
    return i;
  };
  const order = [heading("base", 1), heading("listed rule", 2), heading("nested rule", 3)];
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test("s-k4nqjr96ux7a5m7 sheriff guide writes each node of the guidelines as the export does, except its metadata", () => {
  const root = everything();
  exportMarkdown(root);
  const out = guide(loadSpecification(root));
  const md = exported(root, loc("_guidelines", "spec"));
  const metadata = md.slice(md.indexOf("**meta:**"), md.indexOf("**Links:**", md.indexOf("**meta:**")));
  assert.ok(metadata.includes("Which colours."));
  assert.ok(out.includes(md.replace(metadata, "").trimEnd()), "the export of the base, its metadata left out");
  assert.ok(!out.includes("Which colours.") && !out.includes("**meta:**"));
  assert.ok(out.includes(`**list:**`) && out.includes(`- implements → ${sid("base")}`));
});

test("s-jsqxdx47wkkj7gp exporting again changes nothing, and leaves no export of a file that is gone", () => {
  const root = project();
  exportMarkdown(root);
  const once = readFileSync(join(root, "md-version", "_guidelines", "spec.md"), "utf8");
  rmSync(join(root, "specs", "tech"), { recursive: true });
  exportMarkdown(root);
  assert.equal(readFileSync(join(root, "md-version", "_guidelines", "spec.md"), "utf8"), once);
  assert.deepEqual(readdirSync(join(root, "md-version")).sort(), [".gitignore", "_guidelines", "alpha", "contracts", "helper", "zeta"]);
});

test("s-jsqxdx47wkkj7gp the export and the map empty the folder they write into and keep the folder itself, which a running server may hold", () => {
  const root = project();
  for (const [dir, write] of [["md-version", exportMarkdown], [join("specs", "_viewer"), render]] as const) {
    mkdirSync(join(root, dir), { recursive: true });
    writeFileSync(join(root, dir, "stale.md"), "left by hand\n");
    const before = statSync(join(root, dir), { bigint: true }).ino;
    write(root);
    assert.equal(statSync(join(root, dir), { bigint: true }).ino, before, dir);
    assert.ok(!existsSync(join(root, dir, "stale.md")), dir);
  }
});

test("s-rpv4fkdqqguptqd writes the map as a web page that draws it with markmap from an outline it holds no file of", () => {
  const root = project();
  render(root);
  const page = readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8");
  assert.match(page, /markmap\.Markmap\.create\(/);
  assert.deepEqual(readdirSync(join(root, "specs", "_viewer")).sort(), [".gitignore", "index.html"]);
});

test("s-rpv4fkdqqguptqd the map's page carries markmap and every library it needs, each with its licence notice, and loads nothing from the network", () => {
  const root = project();
  render(root);
  const page = readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8");
  assert.doesNotMatch(page, /<script[^>]*\bsrc=|<link\b|@import|url\(\s*["']?https?:|\b(?:src|href)\s*=\s*["']?https?:/i);
  // An address stands only as a namespace of XML or inside a library's notice, where nothing loads it.
  const hosts = new Set([...page.matchAll(/https?:\/\/([^/"'\s>)]+)/g)].map((m) => m[1]!));
  assert.deepEqual([...hosts].filter((h) => !["www.w3.org", "d3js.org", "unlicense.org"].includes(h)), []);
  for (const library of ["d3", "internmap", "delaunator", "robust-predicates", "markmap-view", "@gera2ld/jsx-dom", "d3-flextree"]) {
    assert.match(page, new RegExp(`^ \\* ${library.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")} \\d+\\.\\d+\\.\\d+$`, "m"), library);
  }
  for (const notice of ["Mike Bostock", "Gerald", "Mapbox", "unencumbered", "Sam Hocevar"]) assert.ok(page.includes(notice), notice);
});

test("s-rpv4fkdqqguptqd the map's page reads a title as text, so that no title makes it load anything", () => {
  const root = project();
  const path = join(root, "specs", "zeta", "z.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].title = "Costs $x$ and <b>more</b>";
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  render(root);
  const page = readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8");
  assert.ok(!page.includes("<b>more"), "the title written as markup");
  assert.doesNotMatch(page, /katex/i);
  // The page's own scripts, the outline and the drawing, run against a markmap that keeps the tree it is given.
  const scripts = [...page.matchAll(/<script>([^]*?)<\/script>/g)].map((m) => m[1]!);
  const drawn: { tree?: any } = {};
  const context = createContext({ markmap: { Markmap: { create: (_svg: unknown, _options: unknown, tree: unknown) => (drawn.tree = tree) } } });
  for (const script of [scripts[0]!, scripts.at(-1)!]) runInContext(script.replace(/^const OUTLINE/, "var OUTLINE"), context);
  const titles = (n: any): string[] => [n.content, ...n.children.flatMap(titles)];
  assert.equal(drawn.tree.content, "Specification");
  assert.ok(titles(drawn.tree).includes("Costs $x$ and &lt;b&gt;more&lt;/b&gt;"), titles(drawn.tree).join(" | "));
  const zeta = drawn.tree.children.find((c: any) => c.content === "1 core").children.find((c: any) => c.content === "zeta");
  assert.deepEqual(titles(zeta), ["zeta", "zeta section", "Costs $x$ and &lt;b&gt;more&lt;/b&gt;"]);
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
