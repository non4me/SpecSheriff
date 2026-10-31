import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sid } from "../fixture.ts";
import { codeProject, OPEN, put } from "../code-project.ts";
import { PLUGIN, pluginHook, plugins } from "../plugin.ts";

const machine = plugins();
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8", env: machine.env });

/** A project set up by sheriff init, on a machine where a session of Claude Code has started. */
function hooked(): string {
  const root = codeProject();
  spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "init"], { cwd: root, encoding: "utf8" });
  pluginHook("session-start.sh", machine, root);
  writeFileSync(join(root, ".gitignore"), "md-version/\nspecs/_viewer/\n");
  git(root, "add", "-A");
  return root;
}
const commit = (root: string, message: string) => git(root, "commit", "-qm", message);

test("s-477gtdrkw34dzxw a commit changing no code passes the hooks, and the export and the map are written", () => {
  const root = hooked();
  put(root, "README.md", `Reworded; see §${sid("open")}.\n`);
  git(root, "add", "-A");
  const run = commit(root, "Docs: the readme reworded");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.ok(readFileSync(join(root, "md-version", "contracts", "c.md"), "utf8").includes(sid("open")));
});

test("s-477gtdrkw34dzxw the pre-commit hook refuses a commit whose specification does not hold together", () => {
  const root = hooked();
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"id": "contracts/1.1"', '"id": "contracts/9"'));
  git(root, "add", "-A");
  const run = commit(root, "Contracts: an address moved by hand");
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /contracts\/9 is not the address/);
});

test("s-477gtdrkw34dzxw the checks read what is staged, not what the working tree holds beside it", () => {
  const root = hooked();
  put(root, "README.md", "Staged.\n");
  git(root, "add", "README.md");
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"id": "contracts/1.1"', '"id": "contracts/9"'));
  const run = commit(root, "Docs: staged alone");
  assert.equal(run.status, 0, run.stdout + run.stderr);
});

test("s-477gtdrkw34dzxw the commit-msg hook refuses a message that leaves out a node the changed code serves", () => {
  const root = hooked();
  put(root, "src/open.ts", OPEN.replace("return amount;", "return amount * 2;"));
  git(root, "add", "-A");
  const run = commit(root, "Accounts: opening doubles the amount");
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, new RegExp(`tagged ${sid("open")}.*does not name it`));
});

test("s-83ev4wwesbwnhnp after an agent's edit the checks run over the working tree, and what they refuse is handed to the agent", () => {
  const root = hooked();
  const afterEdit = () => pluginHook("after-edit.sh", machine, root);
  const clean = afterEdit();
  assert.equal(clean.status, 0, clean.stderr);
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  const refused = afterEdit();
  assert.equal(refused.status, 2);
  assert.match(refused.stderr, /close carries no tag/);
});

test("s-477gtdrkw34dzxw the pre-push hook runs the tests by the command the settings name, and refuses a push without one", () => {
  const root = hooked();
  commit(root, "Hooks in");
  const remote = mkdtempSync(join(tmpdir(), "sheriff-remote-"));
  git(remote, "init", "-q", "--bare");
  git(root, "remote", "add", "origin", remote);
  const config = (testCommand?: string) => {
    const path = join(root, "sheriff.config.json");
    const data = JSON.parse(readFileSync(path, "utf8"));
    if (testCommand === undefined) delete data.testCommand;
    else data.testCommand = testCommand;
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  };
  config();
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  config('node -e "process.exit(1)"');
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  config('node -e "process.exit(0)"');
  const pushed = git(root, "push", "-q", "origin", "HEAD");
  assert.equal(pushed.status, 0, pushed.stderr);
});
