import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { APPROVALS, readApprovals, type Approval } from "./approvals.ts";
import { git } from "./diff.ts";
import { fingerprint } from "./model.ts";
import { renameEarlier } from "./reindex.ts";
import { specificationOf, type CellPlace, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface ApprovedWordings {
  /** The node in its last approved wording, or nothing where no wording of it was ever approved or no approved wording is found anywhere. */
  wording(sid: string): SpecNode | undefined;
  /** The node's links as the commit that added its last approval holds them, or as the files hold them until that commit is made. */
  links(sid: string): SpecNode["refs"];
  /** The nodes whose last approved wording is found neither in the files nor on the current branch; for each, the wording of an earlier approval is used. */
  readonly named: string[];
}

/**
 * The last approved wording of each node (s-a8fn72xa782wvbk), which is the wording whose fingerprint the node's last
 * approval records. It is taken from the files of the specification where they contain it. Otherwise it is taken from
 * the latest commit on the current branch whose files contain it, read as `sheriff reindex` would rewrite it. Where
 * neither the files nor any commit on the branch contains it, the node is reported under its sid. Its wording is then the latest one that an approval records and
 * that the files or the branch contain.
 */
export function approvedWordings(root: string, spec: Specification, lines: Approval[] = readApprovals(root)): ApprovedWordings {
  const named: string[] = [];
  const history = new Map<string, Array<{ node: SpecNode; cell?: CellPlace }>>();
  const cache = new Map<string, SpecNode | undefined>();

  /** Every wording of the node on the current branch, the latest commit first. */
  const versions = (sid: string) => {
    if (!history.has(sid)) {
      const found: Array<{ node: SpecNode; cell?: CellPlace }> = [];
      const commits = git(root, "log", "--format=%H", "HEAD", "--", "specs/").out.split("\n").filter(Boolean);
      for (const commit of commits) {
        const at = nodeAt(root, commit, sid);
        if (at) found.push(at);
      }
      history.set(sid, found);
    }
    return history.get(sid)!;
  };

  const wording = (sid: string): SpecNode | undefined => {
    if (cache.has(sid)) return cache.get(sid);
    const approvals = lines.filter((l) => l.sid === sid && !l.withdrawn);
    const now = spec.nodes.get(sid);
    let found: SpecNode | undefined;
    for (const [i, approval] of [...approvals].reverse().entries()) {
      if (now && fingerprint(now.node, now.cell) === approval.fingerprint) found = now.node;
      else found = versions(sid).find((v) => fingerprint(v.node, v.cell) === approval.fingerprint)?.node;
      if (found) {
        if (i > 0) named.push(sid);
        break;
      }
    }
    cache.set(sid, found);
    return found;
  };

  const links = (sid: string): SpecNode["refs"] => {
    const now = spec.nodes.get(sid)?.node.refs ?? [];
    const commit = approvingCommit(root, sid);
    return commit ? (nodeAt(root, commit, sid)?.node.refs ?? now) : now;
  };

  return { wording, links, named };
}

/** The node with the given sid as the files of a commit hold it, with the earlier names of its keys and kinds replaced by the current ones. */
function nodeAt(root: string, commit: string, sid: string): { node: SpecNode; cell?: CellPlace } | undefined {
  const paths = git(root, "grep", "-l", "-F", sid, commit, "--", "specs/").out.split("\n").filter(Boolean).map((p) => p.slice(commit.length + 1));
  const files: SpecFile[] = [];
  for (const path of paths.filter((p) => p.endsWith(".json") && !p.startsWith("specs/_archive/"))) {
    const shown = git(root, "show", `${commit}:${path}`);
    if (!shown.ok) continue;
    try {
      files.push({ path, data: JSON.parse(shown.out) });
    } catch {
      continue;
    }
  }
  renameEarlier(files);
  const at = specificationOf(files).nodes.get(sid);
  return at ? { node: at.node, ...(at.cell ? { cell: at.cell } : {}) } : undefined;
}

/** The latest commit on the current branch that added the node's last approval, or none while that approval is not committed. */
function approvingCommit(root: string, sid: string): string | undefined {
  const path = join(root, APPROVALS);
  if (!existsSync(path)) return undefined;
  const last = readFileSync(path, "utf8").split("\n").filter((l) => {
    try {
      const a = JSON.parse(l) as Approval;
      return a.sid === sid && !a.withdrawn;
    } catch {
      return false;
    }
  }).at(-1);
  if (!last) return undefined;
  const committed = git(root, "show", `HEAD:${APPROVALS}`);
  if (!committed.ok || !committed.out.split("\n").includes(last)) return undefined;
  return git(root, "log", "--format=%H", "-S", last, "HEAD", "--", APPROVALS).out.split("\n").find(Boolean);
}
