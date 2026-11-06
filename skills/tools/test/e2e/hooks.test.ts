import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loc, sid } from "../fixture.ts";
import { codeProject, OPEN, put, putLive, typedProject, withGenerator } from "../code-project.ts";
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
/** Changes the RecordType of the typed project, its wording confirmed again by its owner. */
function editRecord(root: string, from: string, to: string): void {
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(from, to));
  sheriff(root, "reindex");
  sheriff(root, "confirm", sid("customer"));
}

test("@spec s-477gtdrkw34dzxw the pre-commit hook writes the types the staged nodes generate into the working tree, stages none of them, and the commit waits for its author to stage them", () => {
  const root = typedHooked();
  editRecord(root, '"name": "number"', '"name": "reference"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: a customer is known by its reference (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /src\/types\.ts: not what the RecordTypes generate/);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
  assert.ok(!git(root, "diff", "--cached", "--name-only").stdout.includes("src/types.ts"), "nothing staged by the hook");
});

test("@spec s-477gtdrkw34dzxw a changed RecordType is committed before its confirmation, its types left as they were and their wait reported", () => {
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

test("@spec s-477gtdrkw34dzxw the pre-commit hook stops a commit whose staged RecordTypes cannot be generated", () => {
  const root = typedHooked();
  editRecord(root, '"title": "customer"', '"title": "3d customer"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: the customer renamed (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /3dCustomer cannot be generated in src\/types\.ts/);
});

test("@spec s-477gtdrkw34dzxw after an agent's edit the types are written before the checks run", () => {
  const root = typedHooked();
  editRecord(root, '"name": "number"', '"name": "reference"');
  pluginHook("after-edit.sh", machine, root);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
});

test("@spec s-477gtdrkw34dzxw a commit changing no code passes the hooks, and the export and the map are written", () => {
  const root = hooked();
  put(root, "README.md", `Reworded; see §${sid("open")}.\n`);
  git(root, "add", "-A");
  const run = commit(root, "Docs: the readme reworded");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.ok(readFileSync(join(root, "md-version", "contracts", "c.md"), "utf8").includes(sid("open")));
});

test("@spec s-477gtdrkw34dzxw the pre-commit hook refuses a commit whose specification does not hold together", () => {
  const root = hooked();
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(`"location": "${loc("contracts", "1")}"`, `"location": "${loc("contracts", "9")}"`));
  git(root, "add", "-A");
  const run = commit(root, "Contracts: a location moved by hand");
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /contracts\/9 is not the one its place gives/);
});

test("@spec s-477gtdrkw34dzxw the checks read what is staged, not what the working tree holds beside it", () => {
  const root = hooked();
  put(root, "README.md", "Staged.\n");
  git(root, "add", "README.md");
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(`"location": "${loc("contracts", "1")}"`, `"location": "${loc("contracts", "9")}"`));
  const run = commit(root, "Docs: staged alone");
  assert.equal(run.status, 0, run.stdout + run.stderr);
});

test("@spec s-477gtdrkw34dzxw a commit goes on where the export and the map cannot be written from the working tree, which reports it", () => {
  const root = hooked();
  commit(root, "Hooks in");
  put(root, "README.md", "Staged.\n");
  git(root, "add", "README.md");
  writeFileSync(join(root, "specs", "contracts", "c.json"), "{ not json\n");
  const run = commit(root, "Docs: staged alone, the working tree's specification broken");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stderr, /the export and the map were not written from the working tree/);
});

test("@spec s-477gtdrkw34dzxw the commit-msg hook refuses a message that leaves out a node the changed code serves", () => {
  const root = hooked();
  put(root, "src/open.ts", OPEN.replace("return amount;", "return amount * 2;"));
  git(root, "add", "-A");
  const run = commit(root, "Accounts: opening doubles the amount");
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, new RegExp(`tagged ${sid("open")}.*does not name it`));
});

test("@spec s-83ev4wwesbwnhnp after an agent's edit the checks run over the working tree, and what they refuse is handed to the agent", () => {
  const root = hooked();
  const afterEdit = () => pluginHook("after-edit.sh", machine, root);
  const clean = afterEdit();
  assert.equal(clean.status, 0, clean.stderr);
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  const refused = afterEdit();
  assert.equal(refused.status, 2);
  assert.match(refused.stderr, /close carries no SpecTag/);
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

/**
 * A hooked project with a bare repository on disk as its origin, ignoring build/, its tests passing, live unless asked;
 * it takes the SpecSheriff guidelines from the plugin, whose rule on putting a specification live its own rule refines.
 */
function pushing(live = true): string {
  const root = hooked();
  const config = join(root, "sheriff.config.json");
  writeFileSync(config, JSON.stringify({ ...JSON.parse(readFileSync(config, "utf8")), writesSpecSheriffGuidelines: false }, null, 2) + "\n");
  rmSync(join(root, "specs", "_schema"), { recursive: true, force: true });
  if (live) putLive(root);
  writeFileSync(join(root, ".gitignore"), "md-version/\nspecs/_viewer/\nbuild/\n");
  git(root, "add", "-A");
  const setUp = commit(root, "Hooks in");
  assert.equal(setUp.status, 0, setUp.stdout + setUp.stderr);
  const remote = mkdtempSync(join(tmpdir(), "sheriff-remote-"));
  git(remote, "init", "-q", "--bare");
  git(root, "remote", "add", "origin", remote);
  testCommand(root, 'node -e "process.exit(0)"');
  return root;
}

test("@spec s-477gtdrkw34dzxw the pre-push hook runs the tests by the command the settings name, and refuses a push without one", () => {
  const root = pushing();
  testCommand(root);
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(1)"');
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(0)"');
  const pushed = git(root, "push", "-q", "origin", "HEAD");
  assert.equal(pushed.status, 0, pushed.stderr);
});

test("@spec s-477gtdrkw34dzxw the pre-push hook refuses a push while the working tree differs from the commit it sends, naming each such file", () => {
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

test("@spec s-477gtdrkw34dzxw the pre-push hook compares every ref the push sends, tags and other branches included, leaving aside the files the working tree ignores", () => {
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

test("@spec s-b6qdtghnyha3fhk in draft mode the pre-push hook runs no test and compares nothing, and says so", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  put(root, "notes.txt", "a draft\n");
  const pushed = git(root, "push", "-q", "origin", "HEAD");
  assert.equal(pushed.status, 0, pushed.stderr);
  assert.match(pushed.stderr, /specification is a draft.*no test ran/);
});

test("@spec s-b6qdtghnyha3fhk the pre-push hook runs the tests where a commit the push sends puts the specification live, and where the push only deletes a ref", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  const drafted = git(root, "push", "-q", "origin", "HEAD:refs/heads/other");
  assert.equal(drafted.status, 0, drafted.stderr);
  putLive(root);
  git(root, "add", "-A");
  const live = commit(root, "Live");
  assert.equal(live.status, 0, live.stdout + live.stderr);
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0, "the commit putting it live is tested");
  assert.notEqual(git(root, "push", "-q", "origin", ":other").status, 0, "a push only deleting a ref runs the tests as before");
});

test("@spec s-n4m5zvh96yb299p runs the project's own tools of a hook after the checks, names a file it does not run, and fails where one fails or changes the staged files", () => {
  const root = hooked();
  const setUp = commit(root, "Set up");
  assert.equal(setUp.status, 0, setUp.stdout + setUp.stderr);
  const steps = join(root, ".githooks", "pre-commit.d");
  mkdirSync(steps);
  writeFileSync(join(steps, "10-ok.sh"), "#!/bin/sh\necho ran > ran.txt\n");
  writeFileSync(join(steps, "20-notes.txt"), "what these tools are for\n");
  put(root, "docs/a.md", "A note.\n");
  git(root, "add", "docs/a.md");
  const ok = commit(root, "Docs: a note");
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  assert.match(ok.stdout + ok.stderr, /20-notes\.txt.*not run/);
  assert.equal(readFileSync(join(root, "ran.txt"), "utf8").trim(), "ran");
  writeFileSync(join(steps, "30-scan.sh"), "#!/bin/sh\necho an internal name found >&2\nexit 1\n");
  put(root, "docs/b.md", "B note.\n");
  git(root, "add", "docs/b.md");
  const failed = commit(root, "Docs: b note");
  assert.notEqual(failed.status, 0);
  assert.match(failed.stdout + failed.stderr, /an internal name found/);
  assert.match(failed.stdout + failed.stderr, /30-scan\.sh/);
  rmSync(join(steps, "30-scan.sh"));
  writeFileSync(join(steps, "30-stage.sh"), "#!/bin/sh\necho extra > extra.txt\ngit add extra.txt\n");
  const staged = commit(root, "Docs: b note");
  assert.notEqual(staged.status, 0);
  assert.match(staged.stdout + staged.stderr, /30-stage\.sh.*changed the staged files/);
});

test("@spec s-477gtdrkw34dzxw the agent's hook after an edit runs the checks only where something changed since they last ran", () => {
  const root = hooked();
  const afterEdit = () => pluginHook("after-edit.sh", machine, root);
  assert.equal(afterEdit().status, 0);
  put(root, "src/open.ts", OPEN + "export function close() {}\n");
  assert.equal(afterEdit().status, 2);
  const unchanged = afterEdit();
  assert.equal(unchanged.status, 0, unchanged.stderr);
  assert.equal(unchanged.stderr, "");
  put(root, "src/open.ts", OPEN + "export function close() { return 1; }\n");
  assert.equal(afterEdit().status, 2);
});

test("@spec s-477gtdrkw34dzxw the agent's hook after an edit tells the agent each node whose status the reindex emptied", () => {
  const root = hooked();
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace("What open requires.", "What open requires now."));
  const run = pluginHook("after-edit.sh", machine, root);
  assert.match(run.stdout + run.stderr, new RegExp(`status emptied: ${sid("open")}`));
});

test("@spec s-477gtdrkw34dzxw after an agent's edit, a file changed while the checks run is checked at the next edit, not taken as checked", () => {
  const root = hooked();
  withGenerator(root);
  // The generator runs once in the regeneration and again in the checks, counting each run in a file of its own.
  const gen = join(root, "gen.mjs");
  writeFileSync(gen, 'import { appendFileSync } from "node:fs";\nappendFileSync("count.txt", "run\\n");\n' + readFileSync(gen, "utf8"));
  const runs = () => readFileSync(join(root, "count.txt"), "utf8").split("\n").filter(Boolean).length;
  pluginHook("after-edit.sh", machine, root);
  const first = runs();
  pluginHook("after-edit.sh", machine, root);
  assert.ok(runs() > first, `the second edit ran no check: ${runs()} runs`);
});

test("@spec s-n4m5zvh96yb299p runs the project's own tools in git's own environment, the locale they are listed in held to the listing", () => {
  const root = hooked();
  assert.equal(commit(root, "Set up").status, 0);
  const steps = join(root, ".githooks", "pre-commit.d");
  mkdirSync(steps);
  writeFileSync(join(steps, "10-locale.sh"), '#!/bin/sh\necho "${LC_ALL-unset}" > locale.txt\n');
  put(root, "docs/a.md", "A note.\n");
  git(root, "add", "docs/a.md");
  const run = commit(root, "Docs: a note");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.equal(readFileSync(join(root, "locale.txt"), "utf8").trim(), machine.env.LC_ALL ?? "unset");
});
