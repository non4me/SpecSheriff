import { spawnSync } from "node:child_process";
import { APPROVALS, CONFIRMATIONS, lastApproval, parseApprovals, type Approval } from "./approvals.ts";
import { implemented, implementing, parentSpecification, readCommit, type Commit } from "./binding.ts";
import type { Tag } from "./code.ts";
import { loadConfig, ownerSettings, strictDefault } from "./config.ts";
import { fingerprint, isProjectKind } from "./model.ts";
import { needsCode } from "./schema.ts";
import { git } from "./diff.ts";
import { codeReader } from "./lists.ts";
import { loadSpecification, type Specification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";
import { compareFiles } from "./versions.ts";

const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;
const SCISSORS = `${"-".repeat(24)} >8 ${"-".repeat(24)}`;

/** Git's comment character, or string, as the repository's configuration sets it: `#` by default, `auto` where git chooses it. */
export function commentOf(root: string): string {
  return git(root, "config", "--get", "core.commentString").out.trim() || git(root, "config", "--get", "core.commentChar").out.trim() || "#";
}

/**
 * The message's own text (s-qqs2svksmjct753). The function leaves out each line that starts with git's comment character. It also leaves out
 * the scissors line that `git commit --verbose` writes, and every line after it. Where the comment character is `auto`, the character
 * that git chooses cannot be reproduced, so a line made of any single character, a space and the scissors text counts as the scissors line.
 */
export function messageText(text: string, comment = "#"): string {
  const lines = text.split("\n");
  const scissors = (l: string) => (comment === "auto" ? l.length === SCISSORS.length + 2 && l.slice(1) === ` ${SCISSORS}` : l === `${comment} ${SCISSORS}`);
  const cut = lines.findIndex(scissors);
  const own = cut < 0 ? lines : lines.slice(0, cut);
  return own.filter((l) => !l.startsWith(comment === "auto" ? "#" : comment)).join("\n");
}

/**
 * The sids named by the `Implementation-Needs-No-Change: <sid>` trailers of a message (s-7gab4ptjt2khfr5). The trailers are read
 * as `git interpret-trailers --parse` reads them. Each key is spelled exactly as `Implementation-Needs-No-Change`, and each value is a single sid.
 */
export function noChangeTrailers(root: string, text: string): Set<string> {
  const run = spawnSync("git", ["interpret-trailers", "--parse"], { cwd: root, input: messageText(text, commentOf(root)), encoding: "utf8" });
  const sids = new Set<string>();
  for (const line of (run.stdout ?? "").split("\n")) {
    const at = line.indexOf(":");
    if (at < 0 || line.slice(0, at) !== "Implementation-Needs-No-Change") continue;
    const value = line.slice(at + 1).trim();
    if (SID.test(value)) sids.add(value);
  }
  return sids;
}

/**
 * The sids of the SpecTags that bind the code, other than tests, that the commit adds or changes (s-qqs2svksmjct753). That code
 * is the symbols, the code outside every symbol and the files bound as a whole. Their SpecTags are read as the commit leaves
 * them. In a merge, only the code that differs from its version in every parent counts.
 */
async function boundByChangedCode(root: string, spec: Specification, commit: Commit): Promise<Set<string>> {
  const merging = git(root, "rev-parse", "-q", "--verify", "MERGE_HEAD").ok;
  const read = codeReader(root, spec);
  const sids = new Set<string>();
  const add = (tags: Array<{ sid?: string }>) => tags.forEach((t) => t.sid && sids.add(t.sid));
  for (const file of commit.codeFiles) {
    const symbols = commit.changedSymbols.get(file.path) ?? new Set();
    const own = commit.changedFiles.has(file.path);
    if (!symbols.size && !own) continue;
    // In a merge, only a change that also differs from the parent being merged in counts.
    let fromOther: Set<unknown> | null = null;
    if (merging) {
      const shown = git(root, "show", `MERGE_HEAD:${file.path}`);
      const { added, changed } = compareFiles(shown.ok ? await read(file.path, shown.out) : null, file);
      fromOther = new Set([...added, ...changed].map((u) => u.symbol ?? (u.kind === "file" ? "file" : u)));
    }
    for (const s of symbols) if (!fromOther || fromOther.has(s)) add(s.tags);
    if (own && (!fromOther || fromOther.has("file"))) add(file.fileTags);
  }
  return sids;
}

/**
 * A commit's message contains the sid of each node to which a SpecTag binds code that the commit adds or changes
 * (s-qqs2svksmjct753). A refusal names each node whose sid the message lacks, by its file, its sid and its location.
 */
export async function message(root: string, text: string): Promise<Finding[]> {
  const spec = loadSpecification(root);
  const named = new Set(messageText(text, commentOf(root)).match(SIDS) ?? []);
  const findings: Finding[] = [];
  const config = loadConfig(root);
  const commit = await readCommit(root, config, spec);
  for (const sid of await boundByChangedCode(root, spec, commit)) {
    if (named.has(sid)) continue;
    const at = spec.nodes.get(sid);
    const node = at ? `${sid} (${at.node.location}) in ${at.file.path}` : sid;
    findings.push({ where: "the message", message: `the commit adds or changes code bound to ${node}, and the message does not name it` });
  }
  if (ownerSettings(config, strictDefault(root)).approved) findings.push(...lagging(root, spec, commit, text));
  return findings;
}

/** The specification and the approvals as a commit holds them, the approvals in the form into which `sheriff reindex` rewrites them. */
function stateAt(root: string, ref: string): { spec: Specification | null; lines: Approval[] } {
  const shown = (path: string) => {
    const at = git(root, "show", `${ref}:${path}`);
    return at.ok ? at.out : "";
  };
  return { spec: parentSpecification(root, ref), lines: [...parseApprovals(shown(APPROVALS)), ...parseApprovals(shown(CONFIRMATIONS), CONFIRMATIONS)] };
}

/**
 * The approved rules whose tests or code lag behind them after the commit (s-txbwsthdqhvyzd2), each refused unless a trailer of
 * the message says that its implementation needs no change (s-7gab4ptjt2khfr5). The tests lag where the commit changes the rule's
 * approved wording, tests were bound to it before, and the commit touches none of them. The code lags where the commit changes the
 * wording or touches the rule's tests, code was bound to it before, and the commit touches none of that code. Code and tests count
 * through chains of `implements` links. In a merge, the wording counts as changed only where it differs from every parent's.
 */
function lagging(root: string, spec: Specification, commit: Commit, text: string): Finding[] {
  const merging = git(root, "rev-parse", "-q", "--verify", "MERGE_HEAD").ok;
  const parent = stateAt(root, "HEAD");
  const parents = merging ? [parent, stateAt(root, "MERGE_HEAD")] : [parent];
  const needs = needsCode(root);
  const isRule = (kind?: string) => kind === "TextRule" || kind === "TableRule" || kind === "RecordType" || Boolean(kind && isProjectKind(kind) && needs(kind));
  // The rules whose tests or code the commit adds, changes or removes, read from the specification after the commit and from that of
  // its parent.
  const tests = new Set<string>();
  const code = new Set<string>();
  const touch = (into: Set<string>, tags: Tag[], state: Specification | null) => {
    for (const t of tags) if (t.sid) for (const r of implemented(state ?? spec, t.sid)) into.add(r);
  };
  for (const file of commit.testFiles) for (const t of file.tests) {
    if (!commit.changedTests.get(file.path)?.has(t.name)) continue;
    touch(tests, t.sid ? [{ line: t.at, sid: t.sid }] : [], spec);
    touch(tests, commit.earlier.get(`test:${file.path}::${t.name}`) ?? [], parent.spec);
  }
  for (const file of commit.codeFiles) {
    for (const s of commit.changedSymbols.get(file.path) ?? []) {
      touch(code, s.tags, spec);
      touch(code, commit.earlier.get(s) ?? [], parent.spec);
    }
    if (commit.changedFiles.has(file.path)) {
      touch(code, file.fileTags, spec);
      touch(code, commit.earlier.get(`file:${file.path}`) ?? [], parent.spec);
    }
  }
  for (const r of commit.removed) touch(r.kind === "test" ? tests : code, r.tags, parent.spec);
  // Bound before the commit: the lists of the rule and of the nodes that implement it, as the parent holds them.
  const before = (sid: string, list: "code" | "tests") => Boolean(parent.spec) && [...implementing(parent.spec!, sid)].some((s) => {
    const meta = parent.spec!.nodes.get(s)?.node.meta as { code?: unknown[]; tests?: unknown[] } | undefined;
    return Boolean(meta?.[list]?.length);
  });
  const stated = noChangeTrailers(root, text);
  const found: Finding[] = [];
  for (const [sid, { node, file, cell }] of spec.nodes) {
    if (node.status !== "approved" || !isRule(node.kind) || stated.has(sid)) continue;
    const now = fingerprint(node, cell);
    // The approved wording counts as changed where, for each parent, it differs from the last approval that the parent records for the rule.
    const reworded = parents.every(({ spec: was, lines }) => {
      const at = was?.nodes.get(sid);
      const last = lastApproval(lines, sid, at ? fingerprint(at.node, at.cell) : "");
      return last !== undefined && last.fingerprint !== now;
    });
    const testsLag = reworded && before(sid, "tests") && !tests.has(sid);
    const codeLags = (reworded || tests.has(sid)) && before(sid, "code") && !code.has(sid);
    if (!testsLag && !codeLags) continue;
    const what = testsLag && codeLags ? "its tests and its code lag" : testsLag ? "its tests lag" : "its code lags";
    found.push({ where: `${sid} (${node.location}) in ${file.path}`, message: `${what} behind it; where its implementation needs no change, the message says so with the trailer Implementation-Needs-No-Change: ${sid}` });
  }
  return found;
}
