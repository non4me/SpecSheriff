import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { guard } from "../../src/guard.ts";
import { message } from "../../src/message.ts";
import { claudeArgs, codexArgs, codexRunner, programOfShim, review, reviewInput, runnerEnv, runnerSettings, SYSTEM_PROMPT, VERDICT_SCHEMA, type Runner } from "../../src/review.ts";
import { spawnSync } from "node:child_process";
import { gitConfig } from "../repo.ts";
import { loadConfig } from "../../src/config.ts";
import { writeTypes } from "../../src/types.ts";
import { NONE, OWNER, sid } from "../fixture.ts";
import { codeProject, editSpec, git, nodeIn, OPEN, OPEN_TEST, put, typedProject } from "../code-project.ts";

const CHANGED_OPEN = OPEN.replace("return amount;", "return amount * 2;");
const texts = (findings: Array<{ where: string; message: string }>) => findings.map((f) => `${f.where}: ${f.message}`);

test("s-ef93u6cnbs2sevr passes a message naming every node the tags on the changed symbols name", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  assert.deepEqual(texts(await message(root, `Accounts: opening doubles the amount (${sid("open")})\n`)), []);
});

test("s-ef93u6cnbs2sevr refuses a message leaving out a node a changed symbol's tag names", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const found = texts(await message(root, "Accounts: opening doubles the amount\n"));
  assert.ok(found.some((m) => m.includes(sid("open")) && /does not name/.test(m)), found.join("\n"));
});

test("s-ef93u6cnbs2sevr refuses a message naming a section or a node that does not exist, its comment lines left out", async () => {
  const root = codeProject();
  const found = texts(await message(root, `Accounts (${sid("accounts")}, ${NONE})\n# ${sid("draft")} in a comment\n`));
  assert.ok(found.some((m) => m.includes(sid("accounts")) && /section/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes(NONE) && /no node/.test(m)), found.join("\n"));
  assert.ok(!found.some((m) => m.includes(sid("draft"))), found.join("\n"));
});

test("s-jau82aq9juv9zzh passes a message of a commit that changes no code", async () => {
  const root = codeProject();
  put(root, "README.md", "Reworded.\n");
  assert.deepEqual(texts(await message(root, "Docs: the readme reworded\n")), []);
});

const edit = (file_path: string, old_string: string, new_string: string) => ({ tool_name: "Edit", tool_input: { file_path, old_string, new_string } });

test("s-83ev4wwesbwnhnp refuses before it is made an edit changing the code of a rule no test carries the sid of", async () => {
  const root = codeProject();
  const refused = await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "src", "draft.ts"), content: `/** @spec ${sid("draft")} */\nexport const drafted = 1;\n` } });
  assert.match(refused ?? "", new RegExp(`no test carries ${sid("draft")}`));
});

test("s-83ev4wwesbwnhnp lets an edit through where a test carries the sid of every rule whose code it changes, and an edit to a test", async () => {
  const root = codeProject();
  assert.equal(await guard(root, edit(join(root, "src", "open.ts"), "return amount;", "return amount * 2;")), null);
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "test", "draft.test.ts"), content: `test("${sid("draft")} drafts", () => {});\n` } }), null);
});

test("s-st6td4mua9uqt9z reads the tests as the edit would leave the working tree", async () => {
  const root = codeProject();
  const path = join(root, "test", "open.test.ts");
  const refused = await guard(root, { tool_name: "MultiEdit", tool_input: { file_path: path, edits: [{ old_string: sid("open"), new_string: sid("draft") }] } });
  assert.equal(refused, null);
  put(root, "test/open.test.ts", `test("${sid("draft")} drafts", () => {});\n`);
  assert.match((await guard(root, edit(join(root, "src", "open.ts"), "return amount;", "return amount * 2;"))) ?? "", /no test carries/);
});

test("s-83ev4wwesbwnhnp refuses before it is made an edit leaving a node checked over a wording its owner never confirmed", async () => {
  const root = codeProject();
  const path = join(root, "specs", "contracts", "c.json");
  const text = readFileSync(path, "utf8");
  const refused = await guard(root, edit(path, "What open requires.", "What open requires, reworded."));
  assert.match(refused ?? "", new RegExp(`${sid("open")}.*checked`));
  const emptied = text.replace("What open requires.", "What open requires, reworded.").replace(/("sid": "[^"]+",\n\s+"kind": "rule",\n\s+"title": "open",\n\s+"status": )"checked"/, '$1""');
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: emptied } }), null);
});

test("s-83ev4wwesbwnhnp refuses before it is made an edit giving a checked node an owner who never confirmed it", async () => {
  const root = codeProject();
  const path = join(root, "specs", "_guidelines", "project.json");
  const refused = await guard(root, edit(path, `"owner": "${OWNER}"`, `"owner": "other@example.com"`));
  assert.match(refused ?? "", new RegExp(`${sid("open")}.*other@example\\.com`));
});

test("s-83ev4wwesbwnhnp refuses before it is made an edit of the confirmations made with the agent's file tools", async () => {
  const root = codeProject();
  const path = join(root, "specs", "_confirmations.jsonl");
  const forged = `{"sid":"${sid("draft")}","fingerprint":"0","owner":"${OWNER}","confirmed":true}\n`;
  assert.match((await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: readFileSync(path, "utf8") + forged } })) ?? "", /confirmations.*sheriff confirm/);
  const [first] = readFileSync(path, "utf8").split("\n");
  assert.match((await guard(root, edit(path, first!, first!.replace(OWNER, "other@example.com")))) ?? "", /confirmations.*sheriff confirm/);
});

test("s-83ev4wwesbwnhnp judges no tool that makes no edit, and no file outside the repository's code, tests and specification", async () => {
  const root = codeProject();
  assert.equal(await guard(root, { tool_name: "Read", tool_input: { file_path: join(root, "src", "open.ts") } }), null);
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "notes.txt"), content: "x" } }), null);
});

const patch = (...lines: string[]) => ({ tool_name: "apply_patch", tool_input: { command: ["*** Begin Patch", ...lines, "*** End Patch"].join("\n") } });

test("s-n76wt2bkqdmh78x judges each file a patch adds, updates, deletes or moves as an edit made with the file tools", async () => {
  const root = codeProject();
  const line = readFileSync(join(root, "specs", "contracts", "c.json"), "utf8").split("\n").find((l) => l.includes("What open requires."))!;
  const reworded = await guard(root, patch("*** Update File: specs/contracts/c.json", "@@", `-${line}`, `+${line.replace("requires.", "requires, reworded.")}`));
  assert.match(reworded ?? "", new RegExp(`${sid("open")}.*checked`));
  const added = await guard(root, patch("*** Add File: src/draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"));
  assert.match(added ?? "", new RegExp(`no test carries ${sid("draft")}`));
  assert.match((await guard(root, patch("*** Delete File: specs/_confirmations.jsonl"))) ?? "", /confirmations.*sheriff confirm/);
  const moved = await guard(root, patch("*** Update File: README.md", "*** Move to: specs/_confirmations.jsonl", "@@", `-See §${sid("open")}.`, "+forged"));
  assert.match(moved ?? "", /confirmations.*sheriff confirm/);
  assert.equal(await guard(root, patch("*** Update File: src/open.ts", "@@", " export function open(amount: number) {", "-  return amount;", "+  return amount * 2;")), null);
  const declared = OPEN_TEST.trimEnd();
  assert.equal(await guard(root, patch("*** Update File: test/open.test.ts", "*** Move to: test/opened.test.ts", "@@", `-${declared}`, `+${declared.replace("an account", "an account at once")}`)), null);
});

test("s-n76wt2bkqdmh78x refuses the whole patch where it refuses one of its files", async () => {
  const root = codeProject();
  const refused = await guard(root, patch("*** Add File: notes.txt", "+one", "*** Add File: src/draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"));
  assert.match(refused ?? "", new RegExp(`no test carries ${sid("draft")}`));
});

test("s-n76wt2bkqdmh78x refuses a patch it cannot read or apply", async () => {
  const root = codeProject();
  assert.match((await guard(root, { tool_name: "apply_patch", tool_input: { command: "not a patch" } })) ?? "", /cannot read the patch/);
  assert.match((await guard(root, patch("*** Frobnicate File: src/open.ts"))) ?? "", /cannot read the patch/);
  assert.match((await guard(root, patch("*** Update File: src/open.ts", "@@", "-  return nothing;", "+  return amount;"))) ?? "", /cannot apply the patch to src\/open\.ts/);
  assert.match((await guard(root, patch("*** Update File: src/missing.ts", "@@", "-a", "+b"))) ?? "", /cannot apply the patch to src\/missing\.ts/);
  assert.match((await guard(root, patch("*** Add File: notes.txt", "one"))) ?? "", /cannot read the patch/);
});

test("s-n76wt2bkqdmh78x reads the paths of a patch from the directory the session works in", async () => {
  const root = codeProject();
  const input = { ...patch("*** Add File: draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"), cwd: join(root, "src") };
  assert.match((await guard(root, input)) ?? "", new RegExp(`no test carries ${sid("draft")}`));
});

const answer = (verdict: string, findings: object[] = []): Runner => () => ({ status: "ok", out: JSON.stringify({ verdict, findings }) });

/** Runs `body` with the user's global git configuration a file of its own holding `settings`, written as git writes them. */
async function withUserConfig<T>(settings: Record<string, string>, body: (file: string) => T | Promise<T>): Promise<T> {
  const file = gitConfig();
  for (const [key, value] of Object.entries(settings)) spawnSync("git", ["config", "--file", file, `specsheriff.review.${key}`, value]);
  const saved = process.env.GIT_CONFIG_GLOBAL;
  process.env.GIT_CONFIG_GLOBAL = file;
  try {
    return await body(file);
  } finally {
    process.env.GIT_CONFIG_GLOBAL = saved;
  }
}

test("s-xr5xxa9cxf2mq5u reads each runner's settings from the user's git configuration, an empty one confirmed, and takes the default of each it lacks", async () => {
  const root = codeProject();
  await withUserConfig({ claudeModel: "sonnet", codexModel: "" }, () => {
    assert.deepEqual(runnerSettings(root, "claude"), {
      values: { claudeModel: "sonnet", claudeFallbackModel: "sonnet", claudeEffort: "high" },
      defaulted: ["claudeFallbackModel", "claudeEffort"],
    });
    assert.deepEqual(runnerSettings(root, "codex"), { values: { codexModel: "", codexEffort: "high" }, defaulted: ["codexEffort"] });
  });
  await withUserConfig({}, () => {
    assert.deepEqual(runnerSettings(root, "claude"), {
      values: { claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" },
      defaulted: ["claudeModel", "claudeFallbackModel", "claudeEffort"],
    });
  });
});

test("s-xr5xxa9cxf2mq5u runs the reviewer at the settings read, and with every review held at a default names each setting it took and how the user confirms it", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  let given: unknown;
  const notices: string[] = [];
  const run: Runner = (_input, settings) => ((given = settings), { status: "ok", out: JSON.stringify({ verdict: "pass", findings: [] }) });
  await withUserConfig({ claudeModel: "sonnet" }, () => review(root, msg, { run, notice: (m) => notices.push(m) }));
  assert.deepEqual(given, { minutes: 20, values: { claudeModel: "sonnet", claudeFallbackModel: "sonnet", claudeEffort: "high" } });
  assert.equal(notices.length, 1);
  for (const key of ["claudeFallbackModel", "claudeEffort"]) assert.match(notices[0]!, new RegExp(`specsheriff\\.review\\.${key}`));
  assert.doesNotMatch(notices[0]!, /specsheriff\.review\.claudeModel /);
  assert.match(notices[0]!, /git config --global specsheriff\.review\.claudeEffort high/);
  assert.match(notices[0]!, /\/config/);
  notices.length = 0;
  await withUserConfig({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, () => review(root, msg, { run, notice: (m) => notices.push(m) }));
  assert.deepEqual(notices, []);
});

test("s-nyh9yk22ba6g77q gives the reviewer the change and the text of the nodes its message and tags name, and nothing else", async () => {
  const root = codeProject();
  editSpec(root, (d) => (nodeIn(d, "draft").text = "Drafting is described here."));
  put(root, "src/open.ts", CHANGED_OPEN);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const [, nodes] = input.split(/^# The nodes it names$|^# The change$/m);
  assert.ok(input.includes("return amount * 2;"));
  assert.ok(nodes!.includes("What open requires."), nodes);
  assert.ok(!nodes!.includes("Drafting is described here."), nodes);
});

test("s-nyh9yk22ba6g77q gives the reviewer the whole change of the commit, its specification, documents and settings included", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "README.md", "Opening doubles the amount.\n");
  editSpec(root, (d) => (nodeIn(d, "draft").title = "draft renamed"));
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  assert.ok(input.includes("return amount * 2;"), input);
  assert.ok(input.includes("+Opening doubles the amount."), input);
  assert.ok(input.includes("draft renamed"), input);
});

test("s-nyh9yk22ba6g77q leaves the files generated from the specification out of the change the reviewer is given", async () => {
  const root = typedProject("customer", ["src/**"]);
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"name": "number"', '"name": "reference"'));
  writeTypes(root);
  put(root, "src/app/use.ts", `/** @spec ${sid("customer")} */\nexport const usedReference = "r";\n`);
  git(root, "add", "-A");
  const input = await reviewInput(root, `Ledger (${sid("customer")})\n`);
  const [, change] = input.split(/^# The change$|^# The files left out of the change$/m);
  assert.ok(change!.includes("usedReference"), input);
  assert.ok(!/src\/types\.ts|schemas\/checks\.json|reference: string/.test(change!), input);
});

test("s-nyh9yk22ba6g77q names each file left out to the reviewer, and counts what a RecordType requires as carried out by the types and runtime checks generated from it", async () => {
  const root = typedProject("customer", ["src/**"]);
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"name": "number"', '"name": "reference"'));
  writeTypes(root);
  git(root, "add", "-A");
  const input = await reviewInput(root, `Ledger (${sid("customer")})\n`);
  const [, left] = input.split(/^# The files left out of the change$/m);
  assert.ok(left, input);
  assert.match(left!, /src\/types\.ts/);
  assert.match(left!, /schemas\/checks\.json/);
  assert.match(left!, /types and runtime checks generated from the RecordTypes/);
  assert.match(left!, /compares them with what the nodes produce/);
  assert.match(SYSTEM_PROMPT, /what a RecordType requires .*carried out by the types and runtime checks generated from it/i);
});

test("s-nyh9yk22ba6g77q passes where the reviewer passes, and refuses naming the rule and the line of each finding", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  assert.deepEqual(await review(root, `Accounts (${sid("open")})\n`, { run: answer("pass") }), []);
  const refused = texts(await review(root, `Accounts (${sid("open")})\n`, { run: answer("refuse", [{ rule: sid("open"), file: "src/open.ts", line: 3, problem: "doubles what the rule does not ask to double" }]) }));
  assert.deepEqual(refused, [`src/open.ts:3: ${sid("open")}: doubles what the rule does not ask to double`]);
});

test("s-nyh9yk22ba6g77q refuses a review that cannot be held, and says why", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  assert.match(texts(await review(root, msg, { run: () => ({ status: "missing", detail: "claude" }) }))[0]!, /no reviewer to run/);
  assert.match(texts(await review(root, msg, { run: () => ({ status: "timeout", detail: "20 minutes" }) }))[0]!, /did not end/);
  assert.match(texts(await review(root, msg, { run: () => ({ status: "ok", out: "I think it is fine." }) }))[0]!, /cannot be read/);
});

test("s-jau82aq9juv9zzh asks no review of a commit that changes no code", async () => {
  const root = codeProject();
  put(root, "README.md", "Reworded.\n");
  let asked = false;
  assert.deepEqual(await review(root, "Docs\n", { run: () => ((asked = true), { status: "ok", out: "" }) }), []);
  assert.equal(asked, false);
});

test("s-xr5xxa9cxf2mq5u starts the Claude Code CLI in print mode with no tools, settings, memory or session, at the model, the effort and the fallback model given", () => {
  const args = claudeArgs({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, "/prompt.md");
  for (const flag of ["-p", "--strict-mcp-config", "--no-session-persistence", "--disable-slash-commands"]) assert.ok(args.includes(flag), flag);
  const value = (flag: string) => args[args.indexOf(flag) + 1];
  assert.equal(value("--model"), "opus");
  assert.equal(value("--fallback-model"), "sonnet");
  assert.equal(value("--effort"), "high");
  assert.equal(value("--tools"), "");
  assert.equal(value("--setting-sources"), "");
  assert.equal(value("--system-prompt-file"), "/prompt.md");
});

test("s-xr5xxa9cxf2mq5u starts the Codex CLI in codex exec, read-only and unkept, with no skill and every tool a setting reaches turned off, its answer held to the verdict's schema", () => {
  const args = codexArgs({ codexModel: "", codexEffort: "high" }, { prompt: "/prompt.md", schema: "/schema.json", out: "/out.json" });
  const value = (flag: string) => args[args.indexOf(flag) + 1];
  const values = (flag: string) => args.flatMap((a, i) => (a === flag ? [args[i + 1]] : []));
  assert.equal(args[0], "exec");
  for (const flag of ["--ephemeral", "--skip-git-repo-check"]) assert.ok(args.includes(flag), flag);
  assert.equal(value("-s"), "read-only");
  assert.equal(value("--output-schema"), "/schema.json");
  assert.equal(value("-o"), "/out.json");
  for (const setting of ["model_reasoning_effort='high'", "model_instructions_file='/prompt.md'", "skills.include_instructions=false", "skills.bundled.enabled=false", "web_search='disabled'"]) {
    assert.ok(values("-c").includes(setting), setting);
  }
  for (const feature of ["shell_tool", "unified_exec", "apps", "browser_use", "computer_use", "hooks", "image_generation", "multi_agent", "plugins", "view_image"]) {
    assert.ok(values("--disable").includes(feature), feature);
  }
  assert.ok(!args.includes("-m"), "an empty model asks for the one Codex chooses for the account");
  assert.equal(args.at(-1), "-", "the input read from standard input");
  const chosen = codexArgs({ codexModel: "gpt-6", codexEffort: "high" }, { prompt: "/p", schema: "/s", out: "/o" });
  assert.equal(chosen[chosen.indexOf("-m") + 1], "gpt-6");
  const schema = JSON.parse(VERDICT_SCHEMA);
  assert.deepEqual(schema.properties.verdict.enum, ["pass", "refuse"]);
  assert.deepEqual(schema.properties.findings.items.required, ["rule", "file", "line", "problem"]);
});

test("s-xr5xxa9cxf2mq5u runs the Codex CLI in an empty directory with a Codex home of its own holding a copy of the user's sign-in and nothing else, deleted after the run", () => {
  const user = mkdtempSync(join(tmpdir(), "sheriff-user-codex-"));
  const held: Array<[string, string]> = [["auth.json", '{"token":"t"}'], ["config.toml", 'model = "x"\n'], ["AGENTS.md", "Be someone.\n"], ["hooks.json", "{}"]];
  for (const [name, text] of held) writeFileSync(join(user, name), text);
  const bin = mkdtempSync(join(tmpdir(), "sheriff-fake-codex-"));
  const log = join(bin, "log.json");
  // A stand-in for the Codex CLI: it records what it was given and answers with a verdict where -o names.
  writeFileSync(join(bin, "fake.mjs"), [
    'import { readdirSync, readFileSync, writeFileSync } from "node:fs";',
    "const args = process.argv.slice(2);",
    "const home = process.env.CODEX_HOME;",
    "const prompt = args.find((a) => a.startsWith(\"model_instructions_file='\")).slice(25, -1);",
    "const schema = args[args.indexOf(\"--output-schema\") + 1];",
    `writeFileSync(${JSON.stringify(log)}, JSON.stringify({ home, files: readdirSync(home), auth: readFileSync(home + "/auth.json", "utf8"), cwd: readdirSync(process.cwd()), input: readFileSync(0, "utf8"), prompt: readFileSync(prompt, "utf8"), schema: readFileSync(schema, "utf8") }));`,
    'writeFileSync(args[args.indexOf("-o") + 1], JSON.stringify({ verdict: "pass", findings: [] }));',
  ].join("\n"));
  writeFileSync(join(bin, "codex"), '#!/bin/sh\nexec node "$(dirname "$0")/fake.mjs" "$@"\n', { mode: 0o755 });
  writeFileSync(join(bin, "codex.cmd"), '@node "%~dp0fake.mjs" %*\r\n');
  const saved = { PATH: process.env.PATH, CODEX_HOME: process.env.CODEX_HOME };
  process.env.PATH = [bin, process.env.PATH].join(delimiter);
  process.env.CODEX_HOME = user;
  try {
    const result = codexRunner("the reviewer's input\n", { minutes: 20, values: { codexModel: "", codexEffort: "high" } });
    assert.equal(result.status, "ok", JSON.stringify(result));
    assert.deepEqual(JSON.parse((result as { out: string }).out), { verdict: "pass", findings: [] });
    const seen = JSON.parse(readFileSync(log, "utf8"));
    assert.deepEqual(seen.files, ["auth.json"]);
    assert.equal(seen.auth, '{"token":"t"}');
    assert.deepEqual(seen.cwd, []);
    assert.equal(seen.input, "the reviewer's input\n");
    assert.ok(!existsSync(seen.home), "the Codex home deleted after the run");
    assert.equal(seen.prompt, SYSTEM_PROMPT);
    assert.equal(seen.schema, VERDICT_SCHEMA);
  } finally {
    process.env.PATH = saved.PATH;
    if (saved.CODEX_HOME === undefined) delete process.env.CODEX_HOME;
    else process.env.CODEX_HOME = saved.CODEX_HOME;
  }
});

test("s-xr5xxa9cxf2mq5u holds the Claude Code CLI's answer to the schema of the verdict", () => {
  const args = claudeArgs({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, "/prompt.md");
  assert.equal(args[args.indexOf("--json-schema") + 1], VERDICT_SCHEMA);
});

test("s-xr5xxa9cxf2mq5u reads an answer that passes with a finding, or refuses with none, as one that cannot be read", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  const finding = { rule: sid("open"), file: "src/open.ts", line: 3, problem: "doubles" };
  assert.match(texts(await review(root, msg, { run: answer("pass", [finding]) }))[0]!, /cannot be read/);
  assert.match(texts(await review(root, msg, { run: answer("refuse", []) }))[0]!, /cannot be read/);
});

test("s-xr5xxa9cxf2mq5u hands a runner only the variables of the environment it needs, none an agent or git sets", () => {
  const env = runnerEnv({ PATH: "/bin", HOME: "/home/u", LANG: "C.UTF-8", HTTPS_PROXY: "http://p", ANTHROPIC_API_KEY: "k", CLAUDE_CONFIG_DIR: "/c",
    CLAUDECODE: "1", CLAUDE_EFFORT: "low", CLAUDE_CODE_SESSION_ID: "s", GIT_DIR: "/r/.git", GIT_WORK_TREE: "/tmp/x", OPENAI_API_KEY: "o", SECRET_TOKEN: "x" });
  assert.deepEqual(Object.keys(env).sort(), ["ANTHROPIC_API_KEY", "CLAUDE_CONFIG_DIR", "HOME", "HTTPS_PROXY", "LANG", "OPENAI_API_KEY", "PATH"]);
});

test("s-xr5xxa9cxf2mq5u starts the program an npm command script starts, with the arguments it gives, rather than the script through a shell", () => {
  const exe = '@ECHO off\r\nGOTO start\r\n:find_dp0\r\nSET dp0=%~dp0\r\nEXIT /b\r\n:start\r\nSETLOCAL\r\nCALL :find_dp0\r\n"%dp0%\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe"   %*\r\n';
  assert.deepEqual(programOfShim(exe, "C:\\npm"), { program: "C:\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe", args: [] });
  const js = '@ECHO off\r\nSETLOCAL\r\nCALL :find_dp0\r\nIF EXIST "%dp0%\\node.exe" (\r\n  SET "_prog=%dp0%\\node.exe"\r\n) ELSE (\r\n  SET "_prog=node"\r\n)\r\nendLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\\node_modules\\@openai\\codex\\bin\\codex.js" %*\r\n';
  assert.deepEqual(programOfShim(js, "C:\\npm"), { program: process.execPath, args: ["C:\\npm\\node_modules\\@openai\\codex\\bin\\codex.js"] });
});

test("s-vp24dqydygztqbt gives the runner the nodes with their reasons and each changed symbol whole with the tags that bind it, and asks it to judge each symbol", async () => {
  const root = codeProject();
  editSpec(root, (d) => (nodeIn(d, "open").reason = "An account holds what is put in."));
  put(root, "src/open.ts", CHANGED_OPEN);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  assert.ok(input.includes("An account holds what is put in."), input);
  const [, symbols] = input.split(/^# The symbols the commit changes$/m);
  assert.ok(symbols && symbols.includes("src/open.ts") && symbols.includes(sid("open")) && symbols.includes("return amount * 2;"), input);
  assert.match(SYSTEM_PROMPT, /each changed symbol/i);
  assert.match(SYSTEM_PROMPT, /a tag naming a node the symbol does not implement/i);
  assert.match(SYSTEM_PROMPT, new RegExp(`names no node.*s-kgbzk2ph9e6jfb4`, "s"));
});

test("s-vp24dqydygztqbt gives the runner only the symbols of the system's code, telling a symbol with no tag from one whose tag names no node", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "src/pad.ts", "/** @spec none formatting only, no rule of the system */\nexport function pad(s: string) {\n  return s.padStart(4);\n}\n\nexport function raw(s: string) {\n  return s;\n}\n");
  put(root, "test/helper.test.ts", "export function helper() {\n  return 1;\n}\n");
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const [, symbols] = input.split(/^# The symbols the commit changes$/m);
  const section = symbols!.split(/^# The change$/m)[0]!;
  assert.ok(!section.includes("test/helper.test.ts"), section);
  assert.match(section, /src\/pad\.ts:\d+-\d+ pad \(tags: none: formatting only, no rule of the system\)/);
  assert.match(section, /src\/pad\.ts:\d+-\d+ raw \(tags: no tag\)/);
});
