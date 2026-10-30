// Makes a release of SpecSheriff, as internal/release.md describes: the version written where each
// part names it and committed on main, then a commit on the branch release adding the built tools to
// the plugin for Claude Code, tagged, and pushed with main in one atomic push.
import { execFileSync, execSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const version = process.argv[2] ?? "";
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error("name the version: npm run release -- <major>.<minor>.<patch>");
const run = (command, args, env = process.env) => execFileSync(command, args, { encoding: "utf8", env, stdio: ["ignore", "pipe", "inherit"] }).trim();
const git = (...args) => run("git", args);
// npm is a script on Windows, so it runs through the shell; the version it is handed is checked above.
const npm = (command) => execSync(`npm ${command}`, { stdio: ["ignore", "ignore", "inherit"] });

if (git("rev-parse", "--abbrev-ref", "HEAD") !== "main") throw new Error("a release is made from main");
if (git("status", "--porcelain")) throw new Error("the working tree is not clean");
if (git("tag", "--list", `v${version}`)) throw new Error(`v${version} is already released`);

// The version, where the tools, the plugin and the plugin for pytest each name it.
npm(`version ${version} -w specsheriff --no-git-tag-version`);
for (const [path, pattern] of [["skills/claude-code/.claude-plugin/plugin.json", /"version": "[^"]*"/], ["skills/pytest-specsheriff/pyproject.toml", /^version = "[^"]*"/m]]) {
  const text = readFileSync(path, "utf8");
  writeFileSync(path, text.replace(pattern, (found) => found.replace(/"[^"]*"$/, `"${version}"`)));
}
git("add", "-A");
git("commit", "-qm", `Release: ${version}`);

// The release commit: main's tree with the built tools added, on top of main and of the release before.
npm("run build -w specsheriff");
const env = { ...process.env, GIT_INDEX_FILE: join(mkdtempSync(join(tmpdir(), "release-")), "index") };
run("git", ["read-tree", "HEAD"], env);
run("git", ["add", "-f", "skills/claude-code/tools"], env);
const tree = run("git", ["write-tree"], env);
const previous = git("ls-remote", "origin", "refs/heads/release").split(/\s/)[0];
if (previous) git("fetch", "-q", "origin", "release");
const commit = git("commit-tree", tree, "-p", "HEAD", ...(previous ? ["-p", previous] : []), "-m", `Release ${version}: the plugin for Claude Code with its built tools`);
git("tag", `v${version}`, commit);
git("branch", "-f", "release", commit);
execFileSync("git", ["push", "--atomic", "origin", "main", "release", `v${version}`], { stdio: "inherit" });
