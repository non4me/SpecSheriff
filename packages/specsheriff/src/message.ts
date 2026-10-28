import { changedTags, readCommit } from "./binding.ts";
import { loadConfig } from "./config.ts";
import { loadSpecification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";

const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;

/** The message's own text: git's comment lines left out. */
export const messageText = (text: string) => text.split("\n").filter((l) => !l.startsWith("#")).join("\n");

/** A commit's message names every node the tags on the symbols it changes name, and no head or section. */
export async function message(root: string, text: string): Promise<Finding[]> {
  const spec = loadSpecification(root);
  const named = new Set(messageText(text).match(SIDS) ?? []);
  const findings: Finding[] = [];
  const where = "the message";
  for (const sid of named) {
    const node = spec.nodes.get(sid)?.node;
    if (!node) findings.push({ where, message: `names ${sid}, which names no node` });
    else if (node.kind === "domain" || node.kind === "section") {
      findings.push({ where, message: `names ${sid} (${node.id}), a ${node.kind === "domain" ? "domain's head" : "section"}, which requires nothing a change could serve` });
    }
  }
  for (const sid of changedTags(await readCommit(root, loadConfig(root)))) {
    if (!named.has(sid)) findings.push({ where, message: `the commit changes code tagged ${sid} (${spec.nodes.get(sid)?.node.id ?? "no node"}), and it does not name it` });
  }
  return findings;
}
