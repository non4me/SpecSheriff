import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { PAGE } from "../../src/view-server.ts";
import { sid } from "../fixture.ts";

type Model = Record<string, unknown>;
interface Viewer {
  shown(model: Model, showDrafts: boolean): Set<string>;
  counts(model: Model, sid: string): { approved: number; all: number };
  linkColour(type: string): string;
  dashed(type: string): boolean;
  rows(model: Model): Array<{ label: string; domains: Array<{ name: string; col: number; count: string | null }> }>;
  arrows(model: Model): Array<{ from: string; to: string }>;
  lonely(model: Model, sid: string): boolean;
  markdownHtml(text: string, nodes: Record<string, { location: string; title: string }>): string;
}

/** The page's own logic: the one script of the page that does not access the page's elements, run in a context of its own. */
function viewer(): Viewer {
  const page = readFileSync(PAGE, "utf8");
  const logic = /<script id="logic">([\s\S]*?)<\/script>/.exec(page);
  assert.ok(logic, "the page holds its logic in a script of its own");
  const context = createContext({});
  runInContext(logic[1]!, context);
  return (context as { VIEWER: Viewer }).VIEWER;
}

/** A value created in the page's context, copied into this test's context, so that a strict comparison looks only at its contents. */
const plain = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const node = (sid: string, fields: Record<string, unknown> = {}) => ({ sid, location: `p/${sid}`, kind: "TextRule", title: sid, status: "approved", part: "p", parent: null, children: [], marks: { decisions: 0, comments: 0, todos: 0 }, markdown: "", ...fields });

function model(): Model {
  return {
    views: true,
    domains: true,
    parts: [
      { name: "spec", files: [], roots: ["sec"], approved: 1, all: 2, domain: false },
      { name: "zeta", files: [], roots: [], approved: 0, all: 1, domain: true },
      { name: "alpha", files: [], roots: [], approved: 3, all: 4, domain: true },
    ],
    diagram: { rows: [{ label: "1 core", domains: ["zeta", "alpha"] }, { label: "No level", domains: ["helper"] }], arrows: [{ from: "alpha", to: "zeta" }] },
    nodes: {
      sec: node("sec", { kind: "section", status: "draft", children: ["ok", "draft", "inner"] }),
      ok: node("ok", { parent: "sec" }),
      draft: node("draft", { status: "draft", parent: "sec" }),
      inner: node("inner", { kind: "section", status: "draft", parent: "sec", children: ["deep"] }),
      deep: node("deep", { status: "draft", parent: "inner" }),
      table: node("table", { kind: "TableRule", children: ["cell"] }),
      cell: node("cell", { parent: "table" }),
    },
    links: [{ from: "ok", to: "draft", type: "refines" }],
  };
}

test("@spec s-rj7yxrktxywvxzj shows only the approved nodes and the nodes above them, until the reader asks to see the drafts", () => {
  const { shown } = viewer();
  assert.deepEqual([...shown(model(), false)].sort(), ["ok", "sec"]);
  assert.deepEqual([...shown(model(), true)].sort(), ["deep", "draft", "inner", "ok", "sec"]);
});

test("@spec s-4s3aru64yudz4kh counts, for a node that holds other nodes, the nodes under it at any depth, as a box at the top of the web page counts them", () => {
  const { counts } = viewer();
  // The section under `sec` is left out of the count, as a box at the top of the web page leaves a section out.
  assert.deepEqual(plain(counts(model(), "sec")), { approved: 1, all: 3 });
});

test("@spec s-4s3aru64yudz4kh draws each link in the colour of its type, dashed for a `cites` link, and a link of an unknown type in a colour of its own", () => {
  const { linkColour, dashed } = viewer();
  const types = ["implements", "refines", "constrains", "consumes", "exempts", "checks", "cites", "term-relation", "uses"];
  const colours = types.map(linkColour);
  assert.equal(new Set(colours).size, types.length, "each type has a colour of its own");
  assert.ok(!colours.includes(linkColour("a type of a project's own")));
  assert.equal(dashed("cites"), true);
  assert.equal(dashed("refines"), false);
});

test("@spec s-4s3aru64yudz4kh marks a rule that is linked to no other node", () => {
  const { lonely } = viewer();
  const m = model();
  assert.equal(lonely(m, "deep"), true);
  assert.equal(lonely(m, "ok"), false);
  assert.equal(lonely(m, "draft"), false, "a link that leads to the node counts");
  assert.equal(lonely(m, "inner"), false, "a section is not a rule");
  assert.equal(lonely(m, "table"), true, "a TableRule whose cells hold nodes is a rule");
});

test("@spec s-exgg4vm4ds7t9jg draws the rows of the diagram of the domains in the order that the model gives, and each domain's numbers only where the Views extension is chosen", () => {
  const { rows, arrows } = viewer();
  const m = model();
  assert.deepEqual(plain(rows(m)), [
    { label: "1 core", domains: [{ name: "zeta", col: 0, count: "0/1" }, { name: "alpha", col: 1, count: "3/4" }] },
    { label: "No level", domains: [{ name: "helper", col: 0, count: null }] },
  ]);
  assert.deepEqual(plain(arrows(m)), [{ from: "alpha", to: "zeta" }]);
  assert.deepEqual(plain(rows({ ...m, views: false })).flatMap((r) => r.domains.map((d) => d.count)), [null, null, null]);
  assert.deepEqual(plain(rows({ ...m, diagram: null })), []);
});

test("@spec s-4s3aru64yudz4kh renders a node's Markdown as formatted text, with every character of the node escaped for HTML and every cited sid shown as a link", () => {
  const { markdownHtml } = viewer();
  const other = sid("the other node");
  const own = sid("the node shown");
  const nodes = { [other]: { location: "x/1", title: "the other" } };
  const html = markdownHtml([
    "# x/2 <script>alert(1)</script> & co",
    "`" + own + "` · TextRule · approved",
    `It cites §${other} and **holds** ` + "`code`.",
    "| a | b |",
    "|---|---|",
    "| 1 | 2 |",
    "**Links:**",
    "",
    `- cites → ${other} x/1 the other`,
  ].join("\n"), nodes);
  assert.ok(!html.includes("<script>"), html);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; co/);
  assert.match(html, /<b>holds<\/b>/);
  assert.match(html, /<code>code<\/code>/);
  assert.match(html, /<table>[\s\S]*<td>1<\/td>[\s\S]*<\/table>/);
  assert.equal(html.split(`data-sid="${other}"`).length - 1, 2, "the citation and the link both lead to the node");
  // The panel shows the node as `sheriff show` prints it: a cited sid is shown as the sid itself, and the location and title of
  // the node that it identifies appear in its tooltip.
  assert.ok(html.includes(`>§${other}</span>`), html);
  assert.ok(html.includes(`title="x/1 the other"`), html);
});
