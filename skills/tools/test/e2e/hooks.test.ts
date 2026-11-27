import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loc, node, sid, writing } from "../fixture.ts";
import { ORDER_RULE } from "../../src/model.ts";
import { approveSpecification, codeProject, OPEN, put, typedProject, withGenerator } from "../code-project.ts";
import { current, PLUGIN, pluginHook, plugins } from "../plugin.ts";

const machine = plugins();
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8", env: current(machine.env) });

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
/** Changes the RecordType of the typed project, its wording approved again by its owner. */
function editRecord(root: string, from: string, to: string): void {
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replaceAll(from, to));
  sheriff(root, "reindex");
  sheriff(root, "approve", sid("customer"));
}

test("@spec s-npnmwyt6s3gypwe the pre-commit hook writes the types that the staged nodes generate into the working tree, stages none of them, and stops the commit until its author stages them", () => {
  const root = typedHooked();
  editRecord(root, '"number"', '"reference"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: a customer is known by its reference (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /src\/types\.ts: not what the RecordTypes generate/);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
  assert.ok(!git(root, "diff", "--cached", "--name-only").stdout.includes("src/types.ts"), "nothing staged by the hook");
});

test("@spec s-npnmwyt6s3gypwe a changed RecordType is committed before its approval, while its types are still generated from its last approved wording", () => {
  const root = typedHooked();
  const before = readFileSync(join(root, "src", "types.ts"), "utf8");
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replaceAll('"number"', '"reference"'));
  sheriff(root, "reindex");
  git(root, "add", "specs");
  const run = commit(root, "Ledger: a customer known by its reference, proposed");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.equal(readFileSync(join(root, "src", "types.ts"), "utf8"), before);
});

test("@spec s-npnmwyt6s3gypwe the pre-commit hook stops a commit if the types cannot be generated from its staged RecordTypes", () => {
  const root = typedHooked();
  editRecord(root, '"title": "customer"', '"title": "3d customer"');
  git(root, "add", "specs");
  const run = commit(root, `Ledger: the customer renamed (${sid("customer")})`);
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /3dCustomer cannot be generated in src\/types\.ts/);
});

test("@spec s-hcmpjmwtgfwzncu after an agent's edit the types are written before the checks run", () => {
  const root = typedHooked();
  editRecord(root, '"number"', '"reference"');
  pluginHook("after-edit.sh", machine, root);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^ {2}reference: string;$/m);
});

test("@spec s-npnmwyt6s3gypwe a commit changing no code passes the hooks, and the export and the map are written only where the Views extension is chosen", () => {
  const root = hooked();
  put(root, "README.md", `Reworded; see §${sid("open")}.\n`);
  git(root, "add", "-A");
  const run = commit(root, "Docs: the readme reworded");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.ok(!existsSync(join(root, "md-version")), "no export where the Views extension is not chosen");
  put(root, "specs/_guidelines/extensions/views.json", JSON.stringify({ schemaVersion: 1, scope: "_guidelines/extensions", section: "views", nodes: [] }, null, 2) + "\n");
  const path = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(path, "utf8"));
  settings.extensions = [{ name: "views", chosen: true, by: "owner@example.org" }];
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
  put(root, "README.md", `Reworded again; see §${sid("open")}.\n`);
  git(root, "add", "-A");
  const chosen = commit(root, "Docs: the Views extension chosen");
  assert.equal(chosen.status, 0, chosen.stdout + chosen.stderr);
  assert.ok(readFileSync(join(root, "md-version", "contracts", "c.md"), "utf8").includes(sid("open")));
  assert.ok(existsSync(join(root, "specs", "_viewer", "index.html")));
});

test("@spec s-npnmwyt6s3gypwe the pre-commit hook refuses a commit whose specification sheriff validate refuses", () => {
  const root = hooked();
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(`"location": "${loc("contracts", "1")}"`, `"location": "${loc("contracts", "9")}"`));
  git(root, "add", "-A");
  const run = commit(root, "Contracts: a location moved by hand");
  assert.notEqual(run.status, 0);
  assert.match(run.stdout + run.stderr, /contracts\/9 differs from the location computed for it/);
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

test("@spec s-npnmwyt6s3gypwe a commit proceeds where the Views extension is chosen and the export and the map cannot be written from the working tree, and the hook reports this", () => {
  const root = hooked();
  put(root, "specs/_guidelines/extensions/views.json", JSON.stringify({ schemaVersion: 1, scope: "_guidelines/extensions", section: "views", nodes: [] }, null, 2) + "\n");
  const path = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(path, "utf8"));
  settings.extensions = [{ name: "views", chosen: true, by: "owner@example.org" }];
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
  git(root, "add", "-A");
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
  assert.match(run.stdout + run.stderr, new RegExp(`code bound to ${sid("open")} .*does not name it`));
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
  writing(null);
  rmSync(join(root, "specs", "_schema"), { recursive: true, force: true });
  rmSync(join(root, "specs", "_guidelines", "spec.json"), { force: true });
  if (live) {
    approveSpecification(root);
    // The project's own rule on when the tests run, which names a push, approved by its owner.
    sheriff(root, "approve", sid("tests run"));
  }
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

test("@spec s-b6qdtghnyha3fhk the pre-push hook runs the tests with the command that the settings name, and refuses a push where they name none", () => {
  const root = pushing();
  testCommand(root);
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(1)"');
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0);
  testCommand(root, 'node -e "process.exit(0)"');
  const pushed = git(root, "push", "-q", "origin", "HEAD");
  assert.equal(pushed.status, 0, pushed.stderr);
});

test("@spec s-8a5eyy5n5hnsgrs the pre-push hook refuses a push while the working tree differs from the commit it sends, naming each such file", () => {
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

test("@spec s-8a5eyy5n5hnsgrs the pre-push hook compares the working tree only with the commits for which the tests run, including the commits that tags and other branches point to, and not counting the files that git ignores", () => {
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

  // A branch whose commit leaves the specification a draft: no tests run for it, so the working tree is not compared with it.
  git(root, "checkout", "-qb", "drafted");
  approveSpecification(root, { withdraw: true });
  put(root, "README.md", "A draft's readme.\n");
  git(root, "add", "-A");
  assert.equal(commit(root, "Drafted").status, 0);
  git(root, "checkout", "-q", main);
  put(root, "notes.txt", "The main branch moves on.\n");
  git(root, "add", "notes.txt");
  assert.equal(commit(root, "Main").status, 0);
  const mixed = git(root, "push", "-q", "origin", main, "drafted");
  assert.equal(mixed.status, 0, mixed.stderr);

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

test("@spec s-b6qdtghnyha3fhk the pre-push hook runs no test where the ref's commit leaves the specification a draft, compares nothing with the working tree, and names the reason for the ref", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  put(root, "notes.txt", "a draft\n");
  const pushed = git(root, "push", "-q", "origin", "HEAD:refs/heads/work");
  assert.equal(pushed.status, 0, pushed.stderr);
  assert.match(pushed.stderr, /no test ran/);
  assert.match(pushed.stderr, /refs\/heads\/work: .*the specification is a draft/);
});

test("@spec s-b6qdtghnyha3fhk the pre-push hook runs the tests where a ref's commit leaves the specification approved and the project's own guidelines, in their approved wording, name a push as the moment at which the tests run; and runs none where the push only deletes a ref", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  const drafted = git(root, "push", "-q", "origin", "HEAD:refs/heads/other");
  assert.equal(drafted.status, 0, drafted.stderr);
  approveSpecification(root);
  sheriff(root, "approve", sid("tests run"));
  git(root, "add", "-A");
  const approved = commit(root, "Approved");
  assert.equal(approved.status, 0, approved.stdout + approved.stderr);
  assert.notEqual(git(root, "push", "-q", "origin", "HEAD").status, 0, "the commit that approves it is tested");
  const deleted = git(root, "push", "-q", "origin", ":other");
  assert.equal(deleted.status, 0, deleted.stderr);
});

test("@spec s-b6qdtghnyha3fhk the pre-push hook runs no test where the project's own guidelines do not name a push as the moment at which the tests run, or only a draft rule names it, and names the reason", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  approveSpecification(root);
  git(root, "add", "-A");
  assert.equal(commit(root, "Approved, its rule on the tests a draft").status, 0);
  const draftRule = git(root, "push", "-q", "origin", "HEAD:refs/heads/draft-rule");
  assert.equal(draftRule.status, 0, draftRule.stderr);
  assert.match(draftRule.stderr, /refs\/heads\/draft-rule: .*guidelines do not name a push/);
  assert.doesNotMatch(draftRule.stderr, /refs\/heads\/draft-rule: .*specification is a draft/);
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.find((n: { sid: string }) => n.sid === sid("tests run")).list.members = ["commit"];
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  sheriff(root, "reindex");
  sheriff(root, "approve", sid("tests run"));
  git(root, "add", "-A");
  assert.equal(commit(root, "Tests at a commit").status, 0);
  const noPush = git(root, "push", "-q", "origin", "HEAD:refs/heads/no-push");
  assert.equal(noPush.status, 0, noPush.stderr);
  assert.match(noPush.stderr, /refs\/heads\/no-push: .*guidelines do not name a push/);
});

test("@spec s-b6qdtghnyha3fhk the pre-push hook names, for each ref that a push creates or updates, the reason why no test ran for it", () => {
  const root = pushing(false);
  testCommand(root, 'node -e "process.exit(1)"');
  git(root, "branch", "drafted");
  approveSpecification(root);
  git(root, "add", "-A");
  assert.equal(commit(root, "Approved").status, 0);
  const pushed = git(root, "push", "-q", "origin", "drafted", "HEAD:refs/heads/approved");
  assert.equal(pushed.status, 0, pushed.stderr);
  assert.match(pushed.stderr, /refs\/heads\/drafted: the specification is a draft, and the project's own guidelines do not name a push/);
  assert.match(pushed.stderr, /refs\/heads\/approved: the project's own guidelines do not name a push/);
});

test("@spec s-n4m5zvh96yb299p runs the project's own tools for a hook, names a file in their folder that it does not run, and fails where one of the tools fails, changes what is staged or changes a file of the working tree", () => {
  const root = hooked();
  const setUp = commit(root, "Set up");
  assert.equal(setUp.status, 0, setUp.stdout + setUp.stderr);
  const steps = join(root, ".githooks", "pre-commit.d");
  mkdirSync(steps);
  writeFileSync(join(steps, "10-ok.sh"), "#!/bin/sh\nmkdir -p md-version && echo ran > md-version/ran.txt\n");
  writeFileSync(join(steps, "20-notes.txt"), "what these tools are for\n");
  put(root, "docs/a.md", "A note.\n");
  git(root, "add", "docs/a.md");
  const ok = commit(root, "Docs: a note");
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  assert.match(ok.stdout + ok.stderr, /20-notes\.txt.*not run/);
  assert.equal(readFileSync(join(root, "md-version", "ran.txt"), "utf8").trim(), "ran");
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
  assert.match(staged.stdout + staged.stderr, /30-stage\.sh.*changed what is staged/);
  git(root, "rm", "-q", "--cached", "extra.txt");
  rmSync(join(root, "extra.txt"));
  rmSync(join(steps, "30-stage.sh"));
  writeFileSync(join(steps, "40-write.sh"), "#!/bin/sh\necho stray > stray.out\n");
  const written = commit(root, "Docs: b note");
  assert.notEqual(written.status, 0);
  assert.match(written.stdout + written.stderr, /40-write\.sh.*changed files of the working tree: stray\.out/);
});

test("@spec s-n4m5zvh96yb299p runs first, in the order in which they are listed, the tools that the project's own guidelines list as rewriting files, which may change what is staged, and names a listed path at which no tool is found", () => {
  const root = hooked();
  const specPath = join(root, "specs", "_guidelines", "spec.json");
  const base = JSON.parse(readFileSync(specPath, "utf8"));
  base.nodes[0].children.push({ ...node("the order of tools and checks"), sid: ORDER_RULE });
  writeFileSync(specPath, JSON.stringify(base, null, 2) + "\n");
  const projectPath = join(root, "specs", "_guidelines", "project.json");
  const own = JSON.parse(readFileSync(projectPath, "utf8"));
  own.nodes[0].children.push(node("our rewriters", { refs: [{ type: "refines", to: ORDER_RULE }], list: { of: "the tools that rewrite files", members: ["pre-commit.d/50-format.sh", "pre-commit.d/60-missing.sh"] } }));
  writeFileSync(projectPath, JSON.stringify(own, null, 2) + "\n");
  sheriff(root, "reindex");
  sheriff(root, "approve", ORDER_RULE, sid("our rewriters"));
  const steps = join(root, ".githooks", "pre-commit.d");
  mkdirSync(steps);
  writeFileSync(join(steps, "10-ok.sh"), "#!/bin/sh\nmkdir -p md-version && echo ok >> md-version/order.txt\n");
  writeFileSync(join(steps, "50-format.sh"), "#!/bin/sh\nmkdir -p md-version && echo format >> md-version/order.txt\nif [ -f docs/a.md ]; then printf 'Formatted.\\n' > docs/a.md && git add docs/a.md; fi\n");
  git(root, "add", "-A");
  const setUp = commit(root, "Set up, with a tool that formats");
  assert.equal(setUp.status, 0, setUp.stdout + setUp.stderr);
  rmSync(join(root, "md-version", "order.txt"), { force: true });
  put(root, "docs/a.md", "A note.\n");
  git(root, "add", "docs/a.md");
  const run = commit(root, "Docs: a note");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.deepEqual(readFileSync(join(root, "md-version", "order.txt"), "utf8").trim().split(/\r?\n/), ["format", "ok"]);
  assert.equal(git(root, "show", "HEAD:docs/a.md").stdout, "Formatted.\n");
  assert.match(run.stdout + run.stderr, /pre-commit\.d\/60-missing\.sh.*nothing runs/);
});

test("@spec s-hcmpjmwtgfwzncu the agent's hook after an edit runs the checks only where something changed since they last ran", () => {
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

test("@spec s-hcmpjmwtgfwzncu the agent's hook after an edit tells the agent about each node that the reindex made a draft", () => {
  const root = hooked();
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace("What open requires.", "What open requires now."));
  const run = pluginHook("after-edit.sh", machine, root);
  assert.match(run.stdout + run.stderr, new RegExp(`made a draft: ${sid("open")}`));
});

test("@spec s-hcmpjmwtgfwzncu after an agent's edit, a file changed while the checks run is checked at the next edit, not treated as checked", () => {
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
  writeFileSync(join(steps, "10-locale.sh"), '#!/bin/sh\nmkdir -p md-version && echo "${LC_ALL-unset}" > md-version/locale.txt\n');
  put(root, "docs/a.md", "A note.\n");
  git(root, "add", "docs/a.md");
  const run = commit(root, "Docs: a note");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.equal(readFileSync(join(root, "md-version", "locale.txt"), "utf8").trim(), machine.env.LC_ALL ?? "unset");
});

test("@spec s-npnmwyt6s3gypwe the pre-commit hook runs sheriff binding and sheriff citations only where the check for a key written more than once and the validation against the schema have passed", () => {
  const root = hooked();
  assert.equal(commit(root, "Set up").status, 0);
  const path = join(root, "specs", "contracts", "c.json");
  const text = readFileSync(path, "utf8");
  writeFileSync(path, text.replace('"status": ', '"status": "draft",\n      "status": '));
  git(root, "add", "-A");
  const run = commit(root, "Contracts: a key written twice");
  assert.notEqual(run.status, 0);
  const said = run.stdout + run.stderr;
  assert.equal(said.match(/is written 2 times in one object/g)?.length, 1, said);
});

test("@spec s-hcmpjmwtgfwzncu after an agent's edit to the code of a project's own generator alone, the hook writes the types and writes neither the export nor the map", () => {
  const root = hooked();
  withGenerator(root);
  // The file that the generator writes is written, and bound to its node, before the hook first runs, so that the edit below is the only change the hook sees.
  sheriff(root, "types");
  sheriff(root, "reindex");
  put(root, "specs/_guidelines/extensions/views.json", JSON.stringify({ schemaVersion: 1, scope: "_guidelines/extensions", section: "views", nodes: [] }, null, 2) + "\n");
  const settings = join(root, "sheriff.config.json");
  writeFileSync(settings, JSON.stringify({ ...JSON.parse(readFileSync(settings, "utf8")), extensions: [{ name: "views", chosen: true, by: "owner@example.org" }] }, null, 2) + "\n");
  pluginHook("after-edit.sh", machine, root);
  assert.ok(existsSync(join(root, "md-version")), "the export is written on the first run");
  rmSync(join(root, "md-version"), { recursive: true, force: true });
  rmSync(join(root, "specs", "_viewer"), { recursive: true, force: true });
  const generator = join(root, "gen.mjs");
  writeFileSync(generator, readFileSync(generator, "utf8").replace('open.title + "\\n"', 'open.title + "!\\n"'));
  pluginHook("after-edit.sh", machine, root);
  assert.match(readFileSync(join(root, "gen", "titles.txt"), "utf8"), /open!/);
  assert.ok(!existsSync(join(root, "md-version")), "no export");
  assert.ok(!existsSync(join(root, "specs", "_viewer")), "no map");
});

test("@spec s-hcmpjmwtgfwzncu after an agent's edit to code alone, the hook reindexes and runs the checks, and writes neither the types nor the export", () => {
  const root = hooked();
  assert.equal(commit(root, "Set up").status, 0);
  pluginHook("after-edit.sh", machine, root);
  put(root, "src/more.ts", `/** @spec ${sid("open")} */\nexport function more() {\n  return 2;\n}\n`);
  pluginHook("after-edit.sh", machine, root);
  const data = JSON.parse(readFileSync(join(root, "specs", "contracts", "c.json"), "utf8"));
  const open = data.nodes[0].children.find((n: { sid: string }) => n.sid === sid("open"));
  assert.ok(open.meta.code.some((c: { file: string }) => c.file === "src/more.ts"), JSON.stringify(open.meta.code));
  assert.ok(!existsSync(join(root, "md-version")), "no export where the Views extension is not chosen");
});
