// Saves the working files of T25 to the branch t25-work, which main never receives, and pushes the branch when run with
// --push. The owner chose this on 2026-11-24 (option A), so that the agreed groups do not exist on one machine only.
//
// The commit's tree is main's last commit plus .ai_docs/t25-one-thought.md and .ai_docs/t25-pass/, which the global
// gitignore otherwise keeps out of git. Two kinds of file are left out:
// - the backups, whose names contain ".before": each only lets a script rebuild its own output, and the state that they
//   lead to is in tools-drafts.json;
// - the folder checks/, which holds the inputs and outputs of runs of the wording checker, some 5,700 files that a new
//   run writes again.
// The briefs that the drafting agents follow are copied
// from the session's scratchpad into .ai_docs/t25-pass/briefs/ first, so that they are saved too.
//
// The commit's parent is the branch's last commit, or main's last commit when the branch does not exist yet. Nothing is
// committed when the tree is the same as the parent's. The working tree, the index and the current branch stay as they are.
//
// Usage: node .ai_docs/t25-pass/save-to-branch.mjs [--dry-run] [--push] [--scratchpad <dir>]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repo = "D:/SpecSheriff";
const args = process.argv.slice(2);
const push = args.includes("--push");
const sp = args.includes("--scratchpad") ? args[args.indexOf("--scratchpad") + 1] : null;
const branch = "t25-work";
const index = path.join(repo, ".git", "t25-work.index");
const git = (a, env = {}) => execFileSync("git", a, { cwd: repo, encoding: "utf8", env: { ...process.env, ...env } }).trim();

if (sp) {
  const dest = path.join(repo, ".ai_docs/t25-pass/briefs");
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(sp).filter((f) => /^t25-.*brief.*\.md$/.test(f))) fs.copyFileSync(path.join(sp, f), path.join(dest, f));
}

const env = { GIT_INDEX_FILE: index };
fs.rmSync(index, { force: true });
git(["read-tree", "HEAD"], env);
git(["add", "-f", "--", ".ai_docs/t25-one-thought.md", ".ai_docs/t25-pass", ":(exclude,glob).ai_docs/t25-pass/**/*.before*", ":(exclude,glob).ai_docs/t25-pass/**/*.before*/**", ":(exclude).ai_docs/t25-pass/checks"], env);
const tree = git(["write-tree"], env);
fs.rmSync(index, { force: true });

if (args.includes("--dry-run")) {
  const files = git(["ls-tree", "-r", "--name-only", tree, "--", ".ai_docs"]).split("\n").filter(Boolean).length;
  console.log(`dry run: tree ${tree.slice(0, 7)} would hold ${files} working files; nothing committed`);
  process.exit(0);
}
let parent;
try { parent = git(["rev-parse", "--verify", "--quiet", `refs/heads/${branch}`]); } catch { parent = git(["rev-parse", "HEAD"]); }
if (git(["rev-parse", `${parent}^{tree}`]) === tree) {
  console.log(`${branch}: nothing changed since ${parent.slice(0, 7)}`);
} else {
  const stamp = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const commit = git(["commit-tree", tree, "-p", parent, "-m", `T25 working files: the state as of ${stamp}`]);
  git(["update-ref", `refs/heads/${branch}`, commit]);
  const files = git(["ls-tree", "-r", "--name-only", commit, "--", ".ai_docs"]).split("\n").filter(Boolean).length;
  console.log(`${branch}: ${commit.slice(0, 7)}, ${files} working files`);
}
if (push) console.log(git(["push", "origin", `${branch}:${branch}`]));
