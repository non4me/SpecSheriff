import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { guard } from "../../src/guard.ts";
import { message } from "../../src/message.ts";
import { claudeArgs, review, reviewInput, type Runner } from "../../src/review.ts";
import { loadConfig } from "../../src/config.ts";
import { sid } from "../fixture.ts";
import { codeProject, editSpec, nodeIn, OPEN, put } from "../code-project.ts";

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
  const found = texts(await message(root, `Accounts (${sid("accounts")}, s-aaaaaaaaaaaaaab)\n# ${sid("draft")} in a comment\n`));
  assert.ok(found.some((m) => m.includes(sid("accounts")) && /section/.test(m)), found.join("\n"));
  assert.ok(found.some((m) => m.includes("s-aaaaaaaaaaaaaab") && /no node/.test(m)), found.join("\n"));
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

test("s-4kd2pave7vm4hmd reads the tests as the edit would leave the working tree", async () => {
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

test("s-83ev4wwesbwnhnp judges no tool that makes no edit, and no file outside the repository's code, tests and specification", async () => {
  const root = codeProject();
  assert.equal(await guard(root, { tool_name: "Read", tool_input: { file_path: join(root, "src", "open.ts") } }), null);
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "notes.txt"), content: "x" } }), null);
});

const answer = (verdict: string, findings: object[] = []): Runner => () => ({ status: "ok", out: JSON.stringify({ verdict, findings }) });

test("s-nyh9yk22ba6g77q gives the reviewer the change and the text of the nodes its message and tags name, and nothing else", async () => {
  const root = codeProject();
  editSpec(root, (d) => (nodeIn(d, "draft").text = "Drafting is described here."));
  put(root, "src/open.ts", CHANGED_OPEN);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  assert.ok(input.includes("return amount * 2;"));
  assert.ok(input.includes("What open requires."));
  assert.ok(!input.includes("Drafting is described here."));
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

test("s-xr5xxa9cxf2mq5u starts the Claude Code CLI in print mode with no tools, settings, memory or session, the model and its fallback asked for", () => {
  const args = claudeArgs(loadConfig(codeProject()).review, "/prompt.md");
  for (const flag of ["-p", "--strict-mcp-config", "--no-session-persistence", "--disable-slash-commands"]) assert.ok(args.includes(flag), flag);
  const value = (flag: string) => args[args.indexOf(flag) + 1];
  assert.equal(value("--model"), "fable");
  assert.equal(value("--fallback-model"), "opus");
  assert.equal(value("--tools"), "");
  assert.equal(value("--setting-sources"), "");
  assert.equal(value("--system-prompt-file"), "/prompt.md");
});
