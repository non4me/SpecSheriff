import { APPROVALS, CONFIRMATIONS, lastApproval, parseApprovals } from "./approvals.ts";
import { git } from "./diff.ts";
import { fingerprint, PROJECT, TESTS_PASS_RULE } from "./model.ts";
import type { SpecNode } from "./spec-files.ts";

/**
 * The pre-push hook runs this script for the refs that a push creates or updates (s-b6qdtghnyha3fhk). Its arguments are
 * pairs, each made of such a ref and the commit that the ref points to. The tests run for a commit that meets both of these conditions:
 * - the commit leaves the specification approved: the last entry for the approval status in its `sheriff.config.json` approves
 *   the specification (s-d3nkw9b6mn98vuw);
 * - the project's own guidelines, as of that commit, name a push as the moment at which the tests run.
 * Where at least one commit meets both, the script prints each such commit on a line that starts with the word `run`, and exits
 * with status 0. The pre-push hook then compares the working tree with only those commits (s-8a5eyy5n5hnsgrs). Otherwise the script
 * prints, for each ref, the conditions that its commit does not meet, and exits with status 1.
 */
const root = process.cwd();
const show = (commit: string, path: string): string | null => {
  const shown = git(root, "show", `${commit}:${path}`);
  return shown.ok ? shown.out : null;
};
const read = (commit: string, path: string): unknown => {
  const text = show(commit, path);
  if (text === null) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};
const nodesOf = (data: unknown): SpecNode[] => {
  const nodes: SpecNode[] = [];
  const walk = (ns: SpecNode[] = []) => ns.forEach((n) => (nodes.push(n), walk(n.children)));
  walk((data as { nodes?: SpecNode[] } | undefined)?.nodes);
  return nodes;
};

function approved(commit: string): boolean {
  const entries = (read(commit, "sheriff.config.json") as { approvalStatus?: Array<{ status?: string }> } | undefined)?.approvalStatus;
  return Array.isArray(entries) && entries.at(-1)?.status === "approved";
}

/**
 * Whether the project's own guidelines, as of the commit, name a push as the moment at which the tests run. Each rule of
 * `project.json` is read in its last approved wording as of the commit, found in the commit or its ancestors (s-a8fn72xa782wvbk).
 * Its `refines` links are taken from the commit that added that approval, since an approval does not cover links (s-5ah25f6gy99panq).
 */
function namesPush(commit: string): boolean {
  const lines = [APPROVALS, CONFIRMATIONS].flatMap((path) => parseApprovals(show(commit, path) ?? "", path));
  for (const node of nodesOf(read(commit, PROJECT))) {
    const approval = lastApproval(lines, node.sid, fingerprint(node));
    if (!approval || approval.withdrawn) continue;
    const added = git(root, "log", "-1", "--format=%H", `-S${approval.fingerprint}`, commit, "--", APPROVALS, CONFIRMATIONS).out.trim();
    if (!added) continue;
    const linked = nodesOf(read(added, PROJECT)).find((n) => n.sid === node.sid);
    if (!linked?.refs?.some((r) => r.type === "refines" && r.to === TESTS_PASS_RULE)) continue;
    const wording = fingerprint(node) === approval.fingerprint ? node : earlierWording(commit, node.sid, approval.fingerprint);
    const list = wording?.list as { members?: unknown[]; property?: string } | undefined;
    // A member's value is the member itself, or, if the member is an object, the value of the property that the list names (s-5hb9k2e34dgn284).
    const valueOf = (m: unknown) => (m && typeof m === "object" ? (m as Record<string, unknown>)[list?.property ?? ""] : m);
    if (list?.members?.some((m) => valueOf(m) === "push")) return true;
  }
  return false;
}

/** The node's wording whose fingerprint is the given one, in the latest of the commit and its ancestors that holds it. */
function earlierWording(commit: string, sid: string, print: string): SpecNode | undefined {
  for (const sha of git(root, "log", "--format=%H", commit, "--", PROJECT).out.split("\n").filter(Boolean)) {
    const node = nodesOf(read(sha, PROJECT)).find((n) => n.sid === sid);
    if (node && fingerprint(node) === print) return node;
  }
  return undefined;
}

const args = process.argv.slice(2);
const reasons: string[] = [];
const meeting: string[] = [];
for (let i = 0; i + 1 < args.length; i += 2) {
  const [ref, commit] = [args[i]!, args[i + 1]!];
  const why = [
    ...(approved(commit) ? [] : ["the specification is a draft"]),
    ...(namesPush(commit) ? [] : ["the project's own guidelines do not name a push as the moment at which the tests run"]),
  ];
  if (!why.length) meeting.push(commit);
  else reasons.push(`${ref}: ${why.join(", and ")}`);
}
for (const line of meeting.length ? [...new Set(meeting)].map((c) => `run ${c}`) : reasons) process.stdout.write(`${line}\n`);
process.exit(meeting.length ? 0 : 1);
