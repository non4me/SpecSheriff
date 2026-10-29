import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";

export interface SpecNode {
  sid: string;
  id: string;
  kind: string;
  title: string;
  status: string;
  text: string;
  refs: Array<{ type: string; to?: string; from?: string; ratio?: string }>;
  rationale?: string;
  meta?: Record<string, unknown>;
  children?: SpecNode[];
  [field: string]: unknown;
}

export interface SpecFile {
  /** The file's path from the root of the repository, with forward slashes. */
  path: string;
  data: { schemaVersion: number; scope: string; section: string; nodes: SpecNode[] };
}

export interface Located {
  node: SpecNode;
  file: SpecFile;
  parent: SpecNode | null;
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
    .sort((a, b) => a.name.localeCompare(b.name))
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

/** The paths of the files of the specification and of its archive, in the order they are read. */
export function specPaths(root: string): string[] {
  return jsonFiles(root, "specs");
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
    const walk = (node: SpecNode, parent: SpecNode | null) => {
      spec.nodes.set(node.sid, { node, file, parent });
      for (const child of node.children ?? []) walk(child, node);
    };
    for (const node of file.data.nodes ?? []) walk(node, null);
  }
  return spec;
}

export function loadSpecification(root: string): Specification {
  return specificationOf(specPaths(root).map((path) => readSpecFile(root, path)));
}

/** The one formatting of a file of the specification: two spaces, keys in their order, text as it is, LF. */
export function canonical(data: unknown): string {
  return JSON.stringify(data, null, 2) + "\n";
}

export function writeSpecFile(root: string, file: SpecFile): void {
  writeFileSync(join(root, file.path), canonical(file.data));
}
