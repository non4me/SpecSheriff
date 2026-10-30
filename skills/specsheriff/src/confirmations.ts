import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fingerprint, ownerOf, partOf } from "./model.ts";
import { loadSpecification, takesGuidelines, writeSpecFile, type Specification } from "./spec-files.ts";

export interface Confirmation {
  sid: string;
  fingerprint: string;
  owner: string;
  withdrawn?: true;
}

const FILE = join("specs", "_confirmations.jsonl");

export function readConfirmations(root: string): Confirmation[] {
  const path = join(root, FILE);
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim())
    .map((line, i) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${FILE.replace(/\\/g, "/")}: line ${i + 1}: ${(error as Error).message}`);
      }
    });
}

/** The line that decides for a wording of a node: the latest for its fingerprint. */
export function latest(lines: Confirmation[], sid: string, print: string): Confirmation | undefined {
  return lines.findLast((l) => l.sid === sid && l.fingerprint === print);
}

/** Whether the wording a node holds now stands confirmed by its owner. */
export function holds(spec: Specification, lines: Confirmation[], sid: string): boolean {
  const at = spec.nodes.get(sid);
  if (!at) return false;
  const line = latest(lines, sid, fingerprint(at.node));
  return line !== undefined && !line.withdrawn && line.owner === ownerOf(spec, sid);
}

/** Whether any wording of the node was ever confirmed. */
export function everConfirmed(lines: Confirmation[], sid: string): boolean {
  return lines.some((l) => l.sid === sid && !l.withdrawn);
}

/**
 * Confirms the nodes as `me`, or withdraws their confirmation; refuses all of them where one has
 * another owner, none, or does not exist, so that a run confirms what it names or nothing.
 */
export function confirm(root: string, sids: string[], { me, withdraw = false }: { me: string; withdraw?: boolean }): void {
  const spec = loadSpecification(root);
  const lines = readConfirmations(root);
  for (const sid of sids) {
    if (!spec.nodes.has(sid)) throw new Error(`${sid}: no node holds this sid`);
    if (takesGuidelines(root) && partOf(spec.nodes.get(sid)!.file.path).specSheriffGuidelines) {
      throw new Error(`${sid}: a node of the SpecSheriff guidelines, confirmed only in the repository they are written in`);
    }
    const owner = ownerOf(spec, sid);
    if (owner === null) throw new Error(`${sid}: no owner is named for this node`);
    if (!withdraw && owner !== me) throw new Error(`${sid}: its owner is ${owner}, not ${me}`);
  }
  const changed = new Set<string>();
  for (const sid of sids) {
    const at = spec.nodes.get(sid)!;
    const print = fingerprint(at.node);
    const line = latest(lines, sid, print);
    const decided = withdraw ? line === undefined || line.withdrawn === true : line !== undefined && !line.withdrawn && line.owner === me;
    if (!decided) {
      const added: Confirmation = { sid, fingerprint: print, owner: me, ...(withdraw ? { withdrawn: true as const } : {}) };
      appendFileSync(join(root, FILE), JSON.stringify(added) + "\n");
      lines.push(added);
    }
    const status = withdraw ? "" : "checked";
    if (at.node.status !== status) {
      at.node.status = status;
      changed.add(at.file.path);
    }
  }
  for (const f of spec.files) if (changed.has(f.path)) writeSpecFile(root, f);
}
