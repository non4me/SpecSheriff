import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sid } from "../fixture.ts";
import { codeProject, OPEN, put, typedProject } from "../code-project.ts";
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
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, ...args], { cwd: root, encoding: "utf8" });

/** A project whose stack lists where the types go, set up by sheriff init and committed, its code's globs reaching the types. */
function typedHooked(): string {
  const root = typedProject("customer", ["src/**"]);
  sheriff(root, "init");
  pluginHook("session-start.sh", machine, root);
  writeFileSync(join(root, ".gitignore"), "md-version/\nspecs/_viewer/\n");
  git(root, "add", "-A");
  const run = commit(root, "Set up");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  return root;
}
/** Changes the data record of the typed project, its wording confirmed again by its owner. */
function editRecord(root: string, from: string, to: string): void {
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(from, to));
  sheriff(root, "reindex");
  sheriff(root, "confirm", sid("customer"));
}

test("s-477gtdrkw34dzxw the pre-commit hook writes the types the staged nodes generate into the working tree, stages none of them, and the commit waits for its author to stage them", () => {
  const root = typedHooked();
  editRecord(root, '"name": "number"', '"name": "reference"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: a customer is known by its reference (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /src\/types\.ts: not what the data record nodes generate/);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
  assert.ok(!git(root, "diff", "--cached", "--name-only").stdout.includes("src/types.ts"), "nothing staged by the hook");
});

test("s-477gtdrkw34dzxw a changed data record node is committed before its confirmation, its types left as they were and their wait reported", () => {
  const root = typedHooked();
  const before = readFileSync(join(root, "src", "types.ts"), "utf8");
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"name": "number"', '"name": "reference"'));
  sheriff(root, "reindex");
  git(root, "add", "specs");
  const run = commit(root, "Ledger: a customer known by its reference, proposed");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout + run.stderr, /wait for its confirmation/);
  assert.equal(readFileSync(join(root, "src", "types.ts"), "utf8"), before);
});

test("s-477gtdrkw34dzxw the pre-commit hook stops a commit whose staged data record nodes cannot be generated", () => {
  const root = typedHooked();
  editRecord(root, '"title": "customer"', '"title": "3d customer"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: the customer renamed (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /3dCustomer cannot be generated in src\/types\.ts/);
});

test("s-477gtdrkw34dzxw after an agent's edit the types are written before the checks run", () => {
  const root = typedHooked();
  editRecord(root, '"name": "number"', '"name": "reference"');
  pluginHook("after-edit.sh", machine, root);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
});

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
  writeFileSync(path, readFileSync(path, "utf8").replace('"id": "contracts/1"', '"id": "contracts/9"'));
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
  writeFileSync(path, readFileSync(path, "utf8").replace('"id": "contracts/1"', '"id": "contracts/9"'));
  const run = commit(root, "Docs: staged alone");
  assert.equal(run.status, 0, run.stdout + run.stderr);
});

test("s-477gtdrkw34dzxw a commit goes on where the export and the map cannot be written from the working tree, which reports it", () => {
  const root = hooked();
  commit(root, "Hooks in");
  put(root, "README.md", "Staged.\n");
  git(root, "add", "README.md");
  writeFileSync(join(root, "specs", "contracts", "c.json"), "{ not json\n");
  const run = commit(root, "Docs: staged alone, the working tree's specification broken");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stderr, /the export and the map were not written from the working tree/);
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

/** Names the command the tests run by, committed through the hooks. */
function testCommand(root: string, command?: string): void {
  const path = join(root, "sheriff.config.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  if (command === undefined) delete data.testCommand;
  else data.testCommand = command;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  git(root, "add", "sheriff.config.json");
  const run = commit(root, "Tests");
  assert.equal(run.status, 0, run.stdout + run.stderr);
}

/** A hooked project with a bare repository on disk as its origin, ignoring build/, its tests passing. */
function pushing(): string {
  const root = hooked();
  writeFileSync(join(root, ".gitignore"), "md-version/\nspecs/_viewer/\nbuild/\n");
  git(root, "add", "-A");
  assert.equal(commit(root, "Hooks in").status, 0);
  const remote = mkdtempSync(join(tmpdir(), "sheriff-remote-"));
  git(remote, "init", "-q", "--bare");
  git(root, "remote", "add", "origin", remote);
  testCommand(root, 'node -e "process.exit(0)"');
  return root;
}

test("s-477gtdrkw34dzxw the pre-push hook runs the tests by the command the settings name, and refuses a push without one", () => {
  const root = pushing();
  testCommand(root);
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(1)"');
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(0)"');
  const pushed = git(root, "push", "-q", "origin", "HEAD");
  assert.equal(pushed.status, 0, pushed.stderr);
});

test("s-477gtdrkw34dzxw the pre-push hook refuses a push while the working tree differs from the commit it sends, naming each such file", () => {
  const root = pushing();
  const push = () => git(root, "push", "-q", "origin", "HEAD");
  put(root, "notes.txt", "a draft\n");
  let refused = push();
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /notes\.txt/);
  rmSync(join(root, "notes.txt"));

  put(root, "README.md", "Changed.\n");
  refused = push();
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /README\.md/);
  git(root, "add", "README.md");
  refused = push();
  assert.notEqual(refused.status, 0, "a change staged but not committed is not what the push sends");
  assert.match(refused.stderr, /README\.md/);
  git(root, "reset", "-q", "--hard");

  rmSync(join(root, "src", "open.ts"));
  refused = push();
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /src\/open\.ts/);
  git(root, "checkout", "-q", "--", "src/open.ts");

  const pushed = push();
  assert.equal(pushed.status, 0, pushed.stderr);
});

test("s-477gtdrkw34dzxw the pre-push hook compares every ref the push sends, tags and other branches included, leaving aside the files the working tree ignores", () => {
  const root = pushing();
  const main = git(root, "rev-parse", "--abbrev-ref", "HEAD").stdout.trim();
  // A commit of a build's output, as a release makes one: the built file is ignored where the work goes on.
  git(root, "checkout", "-qb", "release");
  put(root, "build/out.js", "built once\n");
  git(root, "add", "-f", "build/out.js");
  assert.equal(commit(root, "Release").status, 0);
  git(root, "tag", "-a", "v1", "-m", "v1");
  git(root, "checkout", "-q", main);
  put(root, "build/out.js", "built again\n");
  const released = git(root, "push", "-q", "--atomic", "origin", main, "release", "v1");
  assert.equal(released.status, 0, released.stderr);

  git(root, "checkout", "-qb", "other");
  put(root, "README.md", `See §${sid("open")} again.\n`);
  git(root, "add", "README.md");
  assert.equal(commit(root, "Other").status, 0);
  git(root, "checkout", "-q", main);
  const refused = git(root, "push", "-q", "origin", "other");
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /README\.md/);

  const deleted = git(root, "push", "-q", "origin", ":release");
  assert.equal(deleted.status, 0, deleted.stderr);
});
