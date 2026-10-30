#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { confirm } from "./confirmations.ts";
import { binding, citationsOutside } from "./binding.ts";
import { exportMarkdown, guide, render } from "./generated.ts";
import { guard } from "./guard.ts";
import { init } from "./init.ts";
import { message } from "./message.ts";
import { review } from "./review.ts";
import { reindex } from "./reindex.ts";
import { show } from "./show.ts";
import { loadSpecification, specificationOf, type SpecFile, type Specification } from "./spec-files.ts";
import { validate } from "./validate.ts";

const USAGE = `Usage: sheriff <command>

Commands:
  reindex                     give sids, compute addresses, rebuild incoming links and heads' indexes,
                              empty every status no confirmation by its owner holds
  validate                    check the specification on its own
  confirm [--withdraw] <sid>  record the owner's confirmation of a node's wording, or withdraw it
  show <sid|address>          print a node with its links
  export                      write the readable export in markdown to md-version/
  render                      write the map to specs/_viewer/
  guide                       print the guidelines and where the specification stands
  binding                     check the specification against the code and the tests
  citations                   check the sids in the code, the tests and the documents
  message <file>              check a commit's message against the code it changes
  review <file>               ask the independent reviewer for its verdict on the commit being made
  guard                       judge the edit an agent's harness describes on standard input
  init                        set the repository up: the git hooks, the plugin for Claude Code, settings

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

async function run(command: string | undefined, args: string[]): Promise<number> {
  switch (command) {
    case undefined:
      process.stdout.write(USAGE);
      return 0;
    case "--version":
      process.stdout.write(JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version + "\n");
      return 0;
    case "reindex": {
      const report = reindex(root);
      for (const m of report.merged) process.stdout.write(`merged: ${m.file}: "${m.key}" at ${m.path || "/"}, lines ${m.lines.join(", ")}\n`);
      for (const s of report.emptied) process.stdout.write(`status emptied: ${s}\n`);
      for (const f of report.written) process.stdout.write(`written: ${f}\n`);
      return 0;
    }
    case "validate": {
      const findings = validate(root, { before: lastCommitted() });
      for (const f of findings) process.stdout.write(`${f.where}: ${f.message}\n`);
      return findings.length ? 1 : 0;
    }
    case "confirm": {
      const withdraw = args[0] === "--withdraw";
      const sids = withdraw ? args.slice(1) : args;
      const me = git("config", "user.email").stdout.trim();
      if (!me) throw new Error("git names no email for whoever confirms: set it with git config user.email");
      if (!sids.length) throw new Error("name the sid of every node to confirm");
      confirm(root, sids, { me, withdraw });
      return 0;
    }
    case "export":
      for (const path of exportMarkdown(root)) process.stdout.write(`written: ${path}\n`);
      return 0;
    case "render":
      process.stdout.write(`written: ${render(root)}\n`);
      return 0;
    case "guide":
      process.stdout.write(guide(loadSpecification(root)));
      return 0;
    case "binding": {
      const findings = await binding(root);
      for (const f of findings) process.stdout.write(`${f.where}: ${f.reported ? "reported: " : ""}${f.message}\n`);
      return findings.some((f) => !f.reported) ? 1 : 0;
    }
    case "message":
    case "review": {
      if (!args[0]) throw new Error("name the file holding the commit's message");
      const text = readFileSync(args[0], "utf8");
      const findings = command === "message" ? await message(root, text) : await review(root, text);
      for (const f of findings) process.stdout.write(`${f.where}: ${f.message}\n`);
      return findings.length ? 1 : 0;
    }
    case "guard": {
      // The harness blocks the edit on exit code 2 and hands what is written to standard error to the agent.
      const reason = await guard(root, JSON.parse(readFileSync(0, "utf8") || "{}"));
      if (reason) process.stderr.write(`sheriff guard: ${reason}\n`);
      return reason ? 2 : 0;
    }
    case "init": {
      const report = init(root);
      for (const p of report.written) process.stdout.write(`written: ${p}\n`);
      for (const p of report.left) process.stdout.write(`left as it is: ${p} differs from what init would write\n`);
      for (const n of report.notes) process.stdout.write(`${n}\n`);
      return 0;
    }
    case "citations": {
      const findings = await citationsOutside(root);
      for (const f of findings) process.stdout.write(`${f.where}: ${f.message}\n`);
      return findings.length ? 1 : 0;
    }
    case "show":
      if (!args[0]) throw new Error("name a node by its sid or its address");
      process.stdout.write(show(loadSpecification(root), args[0]));
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
