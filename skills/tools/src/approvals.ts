import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { before as committed } from "./diff.ts";
import { fingerprint, isContainer, ownersOf } from "./model.ts";
import { cellNodes, loadSpecification, writeSpecFile } from "./spec-files.ts";

export interface Approval {
  sid: string;
  fingerprint: string;
  /** Whoever approved, or withdrew the approval. */
  by: string;
  withdrawn?: true;
}

export const APPROVALS = "specs/_approvals.jsonl";
/** The file earlier releases kept the confirmations in, each naming its owner where an approval names `by`. */
export const CONFIRMATIONS = "specs/_confirmations.jsonl";

/** The lines of an approvals file, or of an earlier release's confirmations, each `owner` read as `by`. */
export function parseApprovals(text: string, name = APPROVALS): Approval[] {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line, i) => {
      let value: Record<string, unknown>;
      try {
        value = JSON.parse(line);
      } catch (error) {
        throw new Error(`${name}: line ${i + 1}: ${(error as Error).message}`);
      }
      const { owner, by, ...rest } = value;
      return { ...rest, by: (by ?? owner) as string } as Approval;
    });
}

/**
 * The approvals of the repository (s-v4qus7raqnwzneb): the lines of the approvals file, then those that an earlier release kept as
 * confirmations, as `sheriff reindex` appends them (s-gb8s9657a65hqmv).
 */
export function readApprovals(root: string): Approval[] {
  const read = (path: string) => (existsSync(join(root, path)) ? parseApprovals(readFileSync(join(root, path), "utf8"), path) : []);
  return [...read(APPROVALS), ...read(CONFIRMATIONS)];
}

/**
 * Moves an earlier release's confirmations into the approvals, each line's `owner` written as `by`, appended after the lines
 * that the approvals file already holds, and removes the old file; says whether it changed anything (s-gb8s9657a65hqmv).
 */
export function migrateApprovals(root: string): boolean {
  const old = join(root, CONFIRMATIONS);
  if (!existsSync(old)) return false;
  const lines = parseApprovals(readFileSync(old, "utf8"), CONFIRMATIONS);
  const now = join(root, APPROVALS);
  const kept = existsSync(now) ? readFileSync(now, "utf8") : "";
  const ordered = (a: Approval) => JSON.stringify({ sid: a.sid, fingerprint: a.fingerprint, ...(a.withdrawn ? { withdrawn: true } : {}), by: a.by });
  writeFileSync(now, [...(kept ? [kept.replace(/\n$/, "")] : []), ...lines.map(ordered)].join("\n") + "\n");
  rmSync(old);
  return true;
}

/** The line that decides for a wording of a node: the latest for the node's sid and that fingerprint. */
export function latest(lines: Approval[], sid: string, print: string): Approval | undefined {
  return lines.findLast((l) => l.sid === sid && l.fingerprint === print);
}

/** Whether an approval stands for that wording of the node: the line deciding for it is an approval. */
export function stands(lines: Approval[], sid: string, print: string): boolean {
  const line = latest(lines, sid, print);
  return line !== undefined && !line.withdrawn;
}

/**
 * A node's last approval (s-v4qus7raqnwzneb): the latest line for its sid and the fingerprint of its current wording, where that
 * line is an approval; otherwise the latest line for its sid that is an approval, whether or not a later line withdraws it.
 */
export function lastApproval(lines: Approval[], sid: string, current: string): Approval | undefined {
  const own = latest(lines, sid, current);
  return own && !own.withdrawn ? own : lines.findLast((l) => l.sid === sid && !l.withdrawn);
}

/** Whether any wording of the node was ever approved. */
export function everApproved(lines: Approval[], sid: string): boolean {
  return lines.some((l) => l.sid === sid && !l.withdrawn);
}

/** The fingerprint of each wording of the node for which an approval stands, whether the node holds it or not. */
export function standingPrints(lines: Approval[], sid: string): string[] {
  const prints = new Set(lines.filter((l) => l.sid === sid).map((l) => l.fingerprint));
  return [...prints].filter((print) => stands(lines, sid, print));
}

/**
 * Approves the nodes as `me` (s-upkur92ry6332y5), or withdraws their approval (s-xybjqp2rxh8gszf); refuses all of them where one
 * may not be, so that a run records what it names or nothing. Approving a TableRule also approves each node in its cells, after
 * the table, in the order of the rows and the columns; withdrawing it withdraws only the approvals of the table's own wordings.
 */
export function approve(root: string, sids: string[], { me, withdraw = false }: { me: string; withdraw?: boolean }): void {
  const spec = loadSpecification(root);
  const lines = readApprovals(root);

  for (const sid of sids) {
    const at = spec.nodes.get(sid);
    if (!at) throw new Error(`${sid}: no node in the files that the repository keeps holds this sid`);
    if (at.file.taken) {
      throw new Error(`${sid}: no node in the files that the repository keeps holds this sid: it names a node of the SpecSheriff guidelines or of a chosen extension, which this project takes from the plugin and which is approved only where it is written`);
    }
    if (isContainer(at.node.kind)) {
      throw new Error(`${sid}: a ${at.node.kind === "header" ? "domain's header" : "section"}, whose status is built from the nodes under it, so nobody approves it`);
    }

    if (withdraw) continue;
    const owners = ownersOf(spec, sid);
    if (!owners.length) throw new Error(`${sid}: no owner is named for this node`);
    if (!owners.includes(me)) throw new Error(`${sid}: its owners are ${owners.join(", ")}, not ${me}`);
  }
  // The nodes in the cells of each TableRule that is being approved follow it, row by row and, within a row, column by column.
  const named = withdraw ? sids : sids.flatMap((sid) => [sid, ...cellNodes(spec.nodes.get(sid)!.node).map((c) => c.node.sid)]);
  const changed = new Set<string>();
  for (const sid of named) {
    const at = spec.nodes.get(sid)!;
    // A withdrawal takes back the approval of every wording for which one stands, one line for each.
    const print = fingerprint(at.node, at.cell);
    const added: Approval[] = withdraw
      ? standingPrints(lines, sid).map((p): Approval => ({ sid, fingerprint: p, withdrawn: true, by: me }))
      : stands(lines, sid, print) ? [] : [{ sid, fingerprint: print, by: me }];
    for (const a of added) {
      appendFileSync(join(root, APPROVALS), JSON.stringify(a) + "\n");
      lines.push(a);
    }
    const status = withdraw ? "draft" : "approved";
    if (at.node.status !== status) {
      at.node.status = status;
      changed.add(at.file.path);
    }
  }
  for (const f of spec.files) if (changed.has(f.path)) writeSpecFile(root, f);
}

/**
 * The approvals a commit records: the lines that the approvals file holds beyond those in the last commit, read together
 * with what an earlier release kept as confirmations, so that the lines a release carries over are not judged again (s-75ue25v6r23jkk8).
 */
export function addedApprovals(root: string, lines: Approval[]): Approval[] {
  const key = (a: Approval) => [a.sid, a.fingerprint, a.by, a.withdrawn ? 1 : 0].join(" ");
  const last = new Map<string, number>();
  for (const path of [CONFIRMATIONS, APPROVALS]) {
    for (const a of parseApprovals(committed(root, path) ?? "", path)) last.set(key(a), (last.get(key(a)) ?? 0) + 1);
  }
  return lines.filter((a) => {
    const left = last.get(key(a)) ?? 0;
    if (left) last.set(key(a), left - 1);
    return !left;
  });
}
