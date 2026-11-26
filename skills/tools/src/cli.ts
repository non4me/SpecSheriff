#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { approve } from "./approvals.ts";
import { binding, citationsOutside, untagged } from "./binding.ts";
import { exportMarkdown, guide, render } from "./generated.ts";
import { guard } from "./guard.ts";
import { init, remove } from "./init.ts";
import { message } from "./message.ts";
import { review } from "./review.ts";
import { reindex, rewriteTests, writeLists } from "./reindex.ts";
import { changeSetting, parseChange, settingsText, type Change } from "./settings.ts";
import { show, todos } from "./show.ts";
import { loadConfig, modelFlags, ownerSettings } from "./config.ts";
import { modelOf } from "./model.ts";
import { loadSpecification, specificationOf, type SpecFile, type Specification } from "./spec-files.ts";
import { writeTypes } from "./types.ts";
import { readAgainstSchema, validate } from "./validate.ts";

const USAGE = `Usage: sheriff <command>

Commands:
  reindex                     give sids, compute locations, rebuild incoming links and headers' indexes,
                              make a draft each node no approval stands for, build the status of
                              sections and headers, write the SpecTag of each test an earlier
                              release read by its bare sid, and write each node's lists of its code
                              and its tests from the SpecTags
  validate                    check the specification on its own
  approve [--withdraw] <sid>  record an owner's approval of a node's wording, or withdraw it
  show <sid|location>         print a node with its links
  todos                       print the work put off on the nodes, the newest first, each with its node
  json                        print the model of the specification as JSON, which a project's own check or generator reads
  markdown                    write the readable export in markdown to md-version/, where the Views extension is chosen
  map                         write the map to specs/_viewer/, where the Views extension is chosen
  guide                       print the guidelines and where the specification stands
  types                       write the types and runtime checks generated from the RecordTypes
                              into the files the technical appendix lists for them
  binding                     check the specification against the code and the tests
  untagged                    list the system's code and the tests that no SpecTag binds
  citations                   check the sids in the code, the tests and the documents
  commit-message <file>       check a commit's message against the code it changes
  review <file>               ask the independent reviewer for its verdict on the commit being made
  guard                       judge the edit an agent's harness describes on standard input
  settings [<change>]         show the settings that only an owner of the specification changes, or make one change:
                              status approved [--confirm], status draft, strict on, strict off,
                              extension <name> on, extension <name> off
  init [--agent claude|codex] set the repository up: the git hooks, the agent's plugin or hooks, settings
  remove                      take out of the repository what init writes, leaving specs/ as it is

Options:
  --version  print the version of the SpecSheriff tools
`;

const root = process.cwd();
const git = (...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

/** The specification as the last commit holds it, or none where there is no commit. */
function lastCommitted(): Specification | undefined {
  const listed = git("ls-tree", "-r", "--name-only", "HEAD", "specs");
  if (listed.status !== 0) return undefined;
  const files: SpecFile[] = [];
  for (const path of listed.stdout.split("\n").filter((p) => p.endsWith(".json") && !/^specs\/_(schema|viewer)\//.test(p))) {
    const shown = git("show", `HEAD:${path}`);
    if (shown.status === 0) files.push({ path, data: JSON.parse(shown.stdout) });
  }
  return specificationOf(files);
}

/** Whether a person who can be asked to choose and to confirm is at a terminal. */
const terminal = () => Boolean(process.stdin.isTTY && process.stdout.isTTY);

async function ask(question: string): Promise<string> {
  const { createInterface } = await import("node:readline/promises");
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

/** Makes one change to the settings and reports it: the exit status is 0 where the change was recorded or nothing needed to change. */
async function applySetting(change: Change, me: string, confirm: boolean): Promise<number> {
  const askToConfirm = async (found: string[]) => {
    for (const f of found) process.stdout.write(`${f}\n`);
    return /^y(es)?$/i.test(await ask("The checks before an approval found the above. Approve the specification all the same? [y/N] "));
  };
  const outcome = await changeSetting(root, change, { me, confirm: confirm || (terminal() ? askToConfirm : false) });
  for (const r of outcome.refused) process.stdout.write(`refused: ${r}\n`);
  if (outcome.unconfirmed) {
    if (!terminal()) for (const f of outcome.found) process.stdout.write(`${f}\n`);
    process.stdout.write("not recorded: the checks before an approval found the above, and the approval is recorded only once an owner confirms it, with sheriff settings status approved --confirm where no terminal is attached\n");
  }
  if (outcome.note) process.stdout.write(`${outcome.note}\n`);
  if (outcome.recorded) process.stdout.write(`recorded in sheriff.config.json, by ${me}\n`);
  return outcome.recorded || outcome.note ? 0 : 1;
}

/** At a terminal, shows the settings and lets the person who runs the command change them, one at a time. */
async function chooseSettings(me: string): Promise<number> {
  for (;;) {
    const lines = settingsText(root).trim().split("\n");
    const changes: Change[] = lines.map((line) => {
      const [key, value] = line.split(": ");
      if (key === "status") return { status: value === "approved" ? "draft" : "approved" };
      if (key === "strict") return { strict: value !== "on" };
      return { extension: key!.slice("extension ".length), chosen: value !== "chosen" };
    });
    lines.forEach((line, i) => process.stdout.write(`${i + 1}. ${line}\n`));
    const answer = await ask("Enter the number of a setting to change it, or press Enter to finish: ");
    if (!answer) return 0;
    const change = changes[Number(answer) - 1];
    if (!change) process.stdout.write(`no setting has the number ${answer}\n`);
    else await applySetting(change, me, false);
  }
}

async function run(command: string | undefined, args: string[]): Promise<number> {
  switch (command) {
    case undefined:
      process.stdout.write(USAGE);
      return 0;
    case "--version":
      process.stdout.write(JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version + "\n");
      return 0;
    case "reindex": {
      // The reindex runs before the tests are rewritten, so that it names each merge of a key written twice (s-w5wg69pvvhedsws).
      const report = reindex(root);
      for (const m of report.merged) process.stdout.write(`merged: ${m.file}: "${m.key}" at ${m.path || "/"}, lines ${m.lines.join(", ")}\n`);
      for (const f of report.rewritten) process.stdout.write(`rewritten from the form that an earlier release wrote: ${f}\n`);
      for (const s of report.drafted) process.stdout.write(`made a draft: ${s}\n`);
      for (const f of report.written) process.stdout.write(`written: ${f}\n`);
      for (const s of report.added) process.stdout.write(`added a draft rule, which the SpecSheriff tools read only once it is approved: ${s}\n`);
      for (const f of await rewriteTests(root)) process.stdout.write(`rewritten: ${f}\n`);
      for (const f of await writeLists(root)) process.stdout.write(`written: ${f}\n`);
      return 0;
    }
    case "validate": {
      const findings = validate(root, { before: lastCommitted(), strict: args.includes("--strict") });
      for (const f of findings) process.stdout.write(`${f.where}: ${f.reported ? "reported: " : ""}${f.message}\n`);
      if (!findings.some((f) => !f.reported)) return 0;
      // Exit status 3: the check for a key written more than once or the validation against the schema failed, so the pre-commit hook
      // runs neither `sheriff binding` nor `sheriff citations` (s-npnmwyt6s3gypwe).
      return readAgainstSchema(root).findings.length ? 3 : 1;
    }
    case "approve": {
      const withdraw = args[0] === "--withdraw";
      const sids = withdraw ? args.slice(1) : args;
      const me = git("config", "user.email").stdout.trim();
      if (!me) throw new Error("git names no email for whoever approves: set it with git config user.email");
      if (!sids.length) throw new Error("name the sid of every node to approve");
      approve(root, sids, { me, withdraw });
      // A status changed is a change to the specification, after which the status of each section and header is built anew.
      reindex(root);
      return 0;
    }
    case "markdown":
      for (const path of exportMarkdown(root)) process.stdout.write(`written: ${path}\n`);
      return 0;
    case "map":
      process.stdout.write(`written: ${render(root)}\n`);
      return 0;
    case "json":
      const spec = loadSpecification(root);
      process.stdout.write(JSON.stringify(modelOf(spec, modelFlags(root, loadConfig(root), spec)), null, 2) + "\n");
      return 0;
    case "guide":
      process.stdout.write(guide(loadSpecification(root), ownerSettings(loadConfig(root), false).approved));
      return 0;
    case "types": {
      const report = writeTypes(root);
      for (const f of report.refusals) process.stdout.write(`${f.where}: ${f.message}\n`);
      for (const sid of report.waiting) process.stdout.write(`${sid}: a draft rule that lists a project's own generator, which sheriff types runs only once the rule is approved\n`);
      for (const sid of report.leftOut) process.stdout.write(`${sid}: left out, since it relies on a RecordType that has never been approved\n`);
      for (const sid of report.named) process.stdout.write(`${sid}: its last approved wording is found neither in the files nor on the current branch\n`);
      for (const path of report.written) process.stdout.write(`written: ${path}\n`);
      return report.refusals.length ? 1 : 0;
    }
    case "binding": {
      const findings = await binding(root);
      for (const f of findings) process.stdout.write(`${f.where}: ${f.reported ? "reported: " : ""}${f.message}\n`);
      return findings.some((f) => !f.reported) ? 1 : 0;
    }
    case "commit-message":
    case "review": {
      if (!args[0]) throw new Error("name the file holding the commit's message");
      const text = readFileSync(args[0], "utf8");
      const notice = (m: string) => process.stderr.write(m);
      const findings = command === "commit-message" ? await message(root, text) : await review(root, text, { notice });
      // A warning, such as a finding about a comment, does not cause the commit to be refused (s-68ds99w8wd67aae).
      for (const f of findings) process.stdout.write(`${f.where}: ${f.reported ? "reported: " : ""}${f.message}\n`);
      return findings.some((f) => !f.reported) ? 1 : 0;
    }
    case "guard": {
      // The harness blocks the edit on exit code 2 and hands what is written to standard error to the agent.
      const reason = await guard(root, JSON.parse(readFileSync(0, "utf8") || "{}"));
      if (reason) process.stderr.write(`sheriff guard: ${reason}\n`);
      return reason ? 2 : 0;
    }
    case "init": {
      if (args.length && (args[0] !== "--agent" || args.length !== 2)) throw new Error("the only option is --agent claude or --agent codex");
      const report = init(root, args[1]);
      for (const p of report.written) process.stdout.write(`written: ${p}\n`);
      for (const p of report.replaced) process.stdout.write(`replaced: ${p}, which an earlier release of sheriff init wrote\n`);
      for (const p of report.left) process.stdout.write(`left as it is: ${p} differs from what init would write\n`);
      for (const n of report.notes) process.stdout.write(`${n}\n`);
      return 0;
    }
    case "remove": {
      const report = remove(root);
      for (const p of report.removed) process.stdout.write(`removed: ${p}\n`);
      for (const p of report.left) process.stdout.write(`left as it is: ${p}\n`);
      for (const n of report.notes) process.stdout.write(`${n}\n`);
      return 0;
    }
    case "settings": {
      const me = git("config", "user.email").stdout.trim();
      if (!args.length) {
        if (terminal()) return chooseSettings(me);
        process.stdout.write(settingsText(root));
        return 0;
      }
      let parsed: ReturnType<typeof parseChange>;
      try {
        parsed = parseChange(args);
      } catch (error) {
        process.stderr.write(`${(error as Error).message}\n`);
        return 2;
      }
      return applySetting(parsed.change, me, parsed.confirm);
    }
    case "untagged":
      for (const line of await untagged(root)) process.stdout.write(`${line}\n`);
      return 0;
    case "citations": {
      const findings = await citationsOutside(root);
      for (const f of findings) process.stdout.write(`${f.where}: ${f.message}\n`);
      return findings.length ? 1 : 0;
    }
    case "show":
      if (!args[0]) throw new Error("name a node by its sid or its location");
      process.stdout.write(show(loadSpecification(root), args[0]));
      return 0;
    case "todos":
      process.stdout.write(todos(loadSpecification(root)));
      return 0;
    default:
      process.stderr.write(`sheriff: unknown command: ${command}\n\n${USAGE}`);
      return 2;
  }
}

// A reader that stops early, as `| head` does, is not a failure of the command.
process.stdout.on("error", (error: NodeJS.ErrnoException) => (error.code === "EPIPE" ? process.exit(0) : (process.exitCode = 1)));

const [command, ...args] = process.argv.slice(2);
try {
  process.exitCode = await run(command, args);
} catch (error) {
  process.stderr.write(`sheriff ${command}: ${(error as Error).message}\n`);
  process.exitCode = 1;
}
