import { git } from "./diff.ts";
import { PROJECT, specificationApproved } from "./model.ts";
import type { SpecNode } from "./spec-files.ts";

/**
 * Run by the pre-push hook with the commits the refs a push creates or updates name: ends with status 0 where one of
 * them holds the specification approved, the rule approving it standing approved in its project's own guidelines, and 1
 * where none does (s-b6qdtghnyha3fhk).
 */
const root = process.cwd();
const live = process.argv.slice(2).some((sha) => {
  const shown = git(root, "show", `${sha}:${PROJECT}`);
  if (!shown.ok) return false;
  try {
    const nodes: SpecNode[] = [];
    const walk = (ns: SpecNode[] = []) => ns.forEach((n) => (nodes.push(n), walk(n.children)));
    walk((JSON.parse(shown.out) as { nodes?: SpecNode[] }).nodes);
    return specificationApproved(nodes);
  } catch {
    return false;
  }
});
process.exit(live ? 0 : 1);
