import { git } from "./diff.ts";
import { APPROVAL_RULE, PROJECT, statusNow } from "./model.ts";
import type { SpecNode } from "./spec-files.ts";

/**
 * This script is run by the pre-push hook with the commits named by the refs that a push creates or updates. It exits
 * with status 0 if at least one of those commits records the specification as approved, and with 1 if none does (s-b6qdtghnyha3fhk). A commit records the
 * specification as approved if the last entry for the approval status in its `sheriff.config.json` approves the specification
 * (s-d3nkw9b6mn98vuw). A commit whose
 * settings hold no entry for the approval status is read as `sheriff reindex` would rewrite its settings: an approved rule of its `project.json` on
 * the specification's approval status is read as an entry that approves the specification (s-gb8s9657a65hqmv).
 */
const root = process.cwd();
const read = (sha: string, path: string): unknown => {
  const shown = git(root, "show", `${sha}:${path}`);
  if (!shown.ok) return undefined;
  try {
    return JSON.parse(shown.out);
  } catch {
    return undefined;
  }
};
const live = process.argv.slice(2).some((sha) => {
  const entries = (read(sha, "sheriff.config.json") as { approvalStatus?: Array<{ status?: string }> } | undefined)?.approvalStatus;
  if (Array.isArray(entries) && entries.length) return entries.at(-1)?.status === "approved";
  const nodes: SpecNode[] = [];
  const walk = (ns: SpecNode[] = []) => ns.forEach((n) => (nodes.push(n), walk(n.children)));
  walk((read(sha, PROJECT) as { nodes?: SpecNode[] } | undefined)?.nodes);
  return nodes.some((n) => n.refs?.some((r) => r.type === "refines" && r.to === APPROVAL_RULE) && statusNow(n.status) === "approved");
});
process.exit(live ? 0 : 1);
