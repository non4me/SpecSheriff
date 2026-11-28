import { approvedWordings } from "./approved-wording.ts";
import { loadConfig, ownerSettings, strictDefault } from "./config.ts";
import { viewedFiles } from "./generated.ts";
import { domainDiagram, isContainer, isDomain, levelsOf, partOf, statusNow, type DomainDiagram } from "./model.ts";
import { nodeMarkdown } from "./show.ts";
import { cellNodes, loadSpecification, type SpecFile, type SpecNode } from "./spec-files.ts";

/**
 * A box at the top of the viewer's web page (s-exgg4vm4ds7t9jg). It represents one of these: a file of the guidelines, the
 * appendix of the tools, a folder of the base specification, or the technical appendix.
 */
export interface ViewPart {
  name: string;
  files: string[];
  /** The top-level nodes of the box's files, in the order of the files. */
  roots: string[];
  approved: number;
  all: number;
  domain: boolean;
}

/** A node as the web page draws it (s-4s3aru64yudz4kh). For a TableRule, `children` lists its children first and then the nodes in its cells. */
export interface ViewNode {
  sid: string;
  location: string;
  kind: string;
  title: string;
  status: "approved" | "draft";
  part: string;
  parent: string | null;
  children: string[];
  marks: { decisions: number; comments: number; todos: number };
  /** The node as `sheriff show` prints it (s-2dhbqy43tcm6qj2). */
  markdown: string;
}

export interface ViewLink {
  from: string;
  to: string;
  type: string;
}

/** What the web page that `sheriff view` serves is drawn from (s-282zba8mtxvxnm5). */
export interface ViewModel {
  built: string;
  views: boolean;
  domains: boolean;
  parts: ViewPart[];
  diagram: DomainDiagram | null;
  nodes: Record<string, ViewNode>;
  links: ViewLink[];
}

/** The box that a file belongs to. A file of the guidelines has a box of its own, named after the file's `section`. Any other file belongs to the box of its folder. */
const boxOf = (file: SpecFile) => {
  const { part } = partOf(file.path);
  if (part === "_guidelines") return file.path === "specs/_guidelines/tools.json" ? "tools" : file.data.section;
  return part;
};

/**
 * The position of a file in the order of the boxes. The boxes are in the order of the branches of the map (s-rpv4fkdqqguptqd):
 * - the base of the SpecSheriff guidelines, the extensions in the code-point order of their paths, the project's own guidelines;
 * - the appendix of the tools;
 * - the contracts section, then the other folders of the base specification, the domains in the order of the diagram;
 * - the technical appendix.
 */
function rank(file: SpecFile, domainOrder: string[]): [number, number, string] {
  const { part } = partOf(file.path);
  if (file.path === "specs/_guidelines/spec.json") return [0, 0, file.path];
  if (file.path.startsWith("specs/_guidelines/extensions/")) return [0, 1, file.path];
  if (file.path === "specs/_guidelines/tools.json") return [1, 0, file.path];
  if (part === "_guidelines") return [0, 2, file.path];
  if (part === "contracts") return [2, 0, file.path];
  if (part === "tech") return [4, 0, file.path];
  const at = domainOrder.indexOf(part);
  return [3, at < 0 ? domainOrder.length : at, file.path];
}

/**
 * Builds the model that the web page that `sheriff view` serves is drawn from (s-282zba8mtxvxnm5). It reads the specification as
 * `sheriff json` reads it. The model contains:
 * - the boxes, in the order of the map's branches (s-exgg4vm4ds7t9jg), each counting only the nodes whose approval status is not
 *   derived (s-rj7yxrktxywvxzj);
 * - each node as `sheriff show` prints it, with the counts of its decisions, comments and todos (s-4s3aru64yudz4kh);
 * - each link that a node declares;
 * - the diagram of the domains, where the Domains extension is chosen.
 * Where only the Domains extension is chosen, the model contains the diagram alone. Where neither the Views nor the Domains extension is chosen, the function throws an error.
 */
export function viewModel(root: string): ViewModel {
  const chosen = ownerSettings(loadConfig(root), strictDefault(root)).extensions;
  const views = chosen.has("views");
  const domains = chosen.has("domains");
  if (!views && !domains) {
    throw new Error("sheriff view runs only where the project has chosen the Views or the Domains extension of the guidelines, which an owner chooses with sheriff settings extension views on or sheriff settings extension domains on");
  }
  const spec = loadSpecification(root);
  const diagram = domains ? domainDiagram(spec, levelsOf(spec, approvedWordings(root, spec))) : null;
  const model: ViewModel = { built: new Date().toISOString(), views, domains, parts: [], diagram, nodes: {}, links: [] };
  if (!views) return model;

  const domainOrder = diagram?.rows.flatMap((r) => r.domains) ?? [];
  const files = [...viewedFiles(spec, chosen)].sort((a, b) => {
    const [x, y] = [rank(a, domainOrder), rank(b, domainOrder)];
    return x[0] - y[0] || x[1] - y[1] || (x[2] < y[2] ? -1 : x[2] > y[2] ? 1 : 0);
  });
  const parts = new Map<string, ViewPart>();
  for (const file of files) {
    const name = boxOf(file);
    const part = parts.get(name) ?? { name, files: [], roots: [], approved: 0, all: 0, domain: domains && isDomain(partOf(file.path).part) };
    parts.set(name, part);
    part.files.push(file.path);
    part.roots.push(...file.data.nodes.map((n) => n.sid));
    const walk = (n: SpecNode, parent: string | null) => {
      const below = [...(n.children ?? []), ...(n.kind === "TableRule" ? cellNodes(n).map((c) => c.node) : [])];
      const status = statusNow(n.status);
      if (!isContainer(n.kind)) {
        part.all += 1;
        if (status === "approved") part.approved += 1;
      }
      const meta = n.meta as { decisions?: unknown[]; comments?: unknown[]; todos?: unknown[] } | undefined;
      model.nodes[n.sid] = {
        sid: n.sid, location: n.location, kind: n.kind, title: n.title ?? "", status, part: name, parent,
        children: below.map((c) => c.sid),
        marks: { decisions: meta?.decisions?.length ?? 0, comments: meta?.comments?.length ?? 0, todos: meta?.todos?.length ?? 0 },
        markdown: nodeMarkdown(spec, n, 1, { children: false }),
      };
      for (const r of n.refs ?? []) if (r.to) model.links.push({ from: n.sid, to: r.to, type: r.type });
      for (const c of below) walk(c, n.sid);
    };
    for (const n of file.data.nodes) walk(n, null);
  }
  model.parts = [...parts.values()];
  return model;
}
