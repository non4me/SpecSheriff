import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface SpecNode {
  sid: string;
  location: string;
  kind: string;
  title: string;
  status: string;
  text: string;
  refs: Array<{ type: string; to?: string; from?: string; ratio?: string }>;
  reason?: string;
  meta?: Record<string, unknown>;
  children?: SpecNode[];
  [field: string]: unknown;
}

export interface SpecFile {
  /** The file's path from the root of the repository, with forward slashes. */
  path: string;
  data: { schemaVersion: number; scope: string; section: string; nodes: SpecNode[] };
  /** `taken` is true for a file that the SpecSheriff plugin delivers, and absent for one that the repository keeps. */
  taken?: true;
}

/** The place of a node in a cell of a TableRule (s-5fewsp22mmdz7y6): the headings of its column and its group, and its row's text cells. */
export interface CellPlace {
  column: string;
  group: string | null;
  row: Record<string, string>;
}

export interface Located {
  node: SpecNode;
  file: SpecFile;
  /** The node above it; for a node in a cell, the TableRule. */
  parent: SpecNode | null;
  /** Where the node is, if it is in a cell of a TableRule. */
  cell?: CellPlace;
}

interface TableColumn {
  key: string;
  heading: string;
  holds: string;
}
interface TableGroup {
  heading: string | null;
  rows: Array<{ cells: Record<string, { node?: SpecNode; text?: string }> }>;
}

/** The nodes in the cells of a TableRule, each with its place, row by row through its groups and, within a row, column by column. */
export function cellNodes(table: SpecNode): Array<{ node: SpecNode; cell: CellPlace }> {
  const columns = (table.columns as TableColumn[] | undefined) ?? [];
  const out: Array<{ node: SpecNode; cell: CellPlace }> = [];
  for (const group of (table.groups as TableGroup[] | undefined) ?? []) {
    for (const { cells } of group.rows) {
      const row = Object.fromEntries(Object.entries(cells).filter(([, c]) => !c.node).map(([key, c]) => [key, c.text ?? ""]));
      for (const column of columns) {
        const node = cells[column.key]?.node;
        if (node) out.push({ node, cell: { column: column.heading, group: group.heading, row } });
      }
    }
  }
  return out;
}

export interface Specification {
  files: SpecFile[];
  archive: SpecFile[];
  /** Every node of the files, by its sid; the archive's are not among them. */
  nodes: Map<string, Located>;
}

/** Directories under specs/ that hold no part of the specification. */
const NOT_PARTS = new Set(["_schema", "_viewer"]);

function jsonFiles(root: string, dir: string): string[] {
  return readdirSync(join(root, dir), { withFileTypes: true })
    .flatMap((entry) => {
      const path = posix.join(dir, entry.name);
      if (entry.isDirectory()) return dir === "specs" && NOT_PARTS.has(entry.name) ? [] : jsonFiles(root, path);
      return entry.name.endsWith(".json") ? [path] : [];
    });
}

function readSpecFile(root: string, path: string): SpecFile {
  try {
    return { path, data: JSON.parse(readFileSync(join(root, path), "utf8")) };
  } catch (error) {
    throw new Error(`${path}: ${(error as Error).message}`);
  }
}

/** The paths of the files of the specification and of its archive, in the order they are read: the code-point order of the paths (s-ygg5kpcxgzq3m7w). */
export function specPaths(root: string): string[] {
  return jsonFiles(root, "specs").sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** The specification the files make, the archive's set apart. */
export function specificationOf(files: SpecFile[]): Specification {
  const spec: Specification = { files: [], archive: [], nodes: new Map() };
  for (const file of files) {
    if (file.path.startsWith("specs/_archive/")) {
      spec.archive.push(file);
      continue;
    }
    spec.files.push(file);
    const walk = (node: SpecNode, parent: SpecNode | null, cell?: CellPlace) => {
      spec.nodes.set(node.sid, cell ? { node, file, parent, cell } : { node, file, parent });
      for (const child of node.children ?? []) walk(child, node);
      for (const at of cellNodes(node)) walk(at.node, node, at.cell);
    };
    for (const node of file.data.nodes ?? []) walk(node, null);
  }
  return spec;
}

export function loadSpecification(root: string): Specification {
  return withTaken(root, specPaths(root).map((path) => readSpecFile(root, path)));
}

/** The SpecSheriff guidelines and their schema as the SpecSheriff tools carry them. */
export const CARRIED = fileURLToPath(new URL("../guidelines/", import.meta.url));

/** For the repository at the given root, the folder from which the SpecSheriff tools read the schema of the SpecSheriff guidelines (s-zefk589ykh37b8u). */
export function schemaDir(root: string): string {
  return takesGuidelines(root) ? join(CARRIED, "_schema") : join(root, "specs", "_schema");
}

/**
 * Whether the SpecSheriff guidelines are written in the repository at the given root. The SpecSheriff tools recognize the
 * repository only by the environment variable SPECSHERIFF_GUIDELINES_REPO, which holds the path to its root (s-zefk589ykh37b8u).
 */
export function writesGuidelines(root: string): boolean {
  const named = process.env.SPECSHERIFF_GUIDELINES_REPO;
  if (!named) return false;
  const canonicalPath = (p: string) => {
    const full = resolve(p);
    return process.platform === "win32" ? full.toLowerCase() : full;
  };
  return canonicalPath(named) === canonicalPath(root);
}

/** Whether the repository is set up for the SpecSheriff tools and takes the SpecSheriff guidelines from them, rather than writing them. */
export function takesGuidelines(root: string): boolean {
  return existsSync(join(root, "sheriff.config.json")) && !writesGuidelines(root);
}

/**
 * The specification the repository's own files make, with the SpecSheriff guidelines it takes from
 * the tools where it takes them, standing where they are written; a copy the project holds is left out.
 */
export function withTaken(root: string, own: SpecFile[]): Specification {
  if (!takesGuidelines(root)) return specificationOf(own);
  // The base of the guidelines, the appendix of the tools and every extension of the guidelines, as the plugin delivers them.
  const extensions = readdirSync(join(CARRIED, "extensions")).filter((n) => n.endsWith(".json")).sort().map((n) => `extensions/${n}`);
  const taken = ["spec.json", "tools.json", ...extensions].map((name) => ({ path: `specs/_guidelines/${name}`, data: JSON.parse(readFileSync(join(CARRIED, name), "utf8")), taken: true as const }));
  return specificationOf([...own.filter((f) => !taken.some((t) => t.path === f.path)), ...taken]);
}

/** The one formatting of a file of the specification: two spaces, keys in their order, text as it is, LF. */
export function canonical(data: unknown): string {
  return JSON.stringify(data, null, 2) + "\n";
}

export function writeSpecFile(root: string, file: SpecFile): void {
  writeFileSync(join(root, file.path), canonical(file.data));
}
