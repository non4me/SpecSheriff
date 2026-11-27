import { approvedWordings } from "./approved-wording.ts";
import { rewritingTools } from "./model.ts";
import { loadSpecification } from "./spec-files.ts";

/**
 * The scripts of the git hooks run this script with the name of their hook (s-n4m5zvh96yb299p). The project's own guidelines
 * list some of the project's own tools as tools that rewrite files. The script prints the path of each such tool for that hook,
 * one per line, relative to `.githooks/` and in the order of the list. A specification that cannot be read lists no such tool.
 */
const root = process.cwd();
const hook = process.argv[2] ?? "";
try {
  const spec = loadSpecification(root);
  for (const path of rewritingTools(spec, approvedWordings(root, spec), hook)) process.stdout.write(`${path}\n`);
} catch {
  // The checks that run after the project's own tools name what is wrong with the specification.
}
