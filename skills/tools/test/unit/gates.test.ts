import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { guard } from "../../src/guard.ts";
import { message, noChangeTrailers } from "../../src/message.ts";
import { claudeArgs, claudeRunner, codexArgs, codexRunner, programOfShim, review, reviewInput, runCli, runnerEnv, runnerSettings, SYSTEM_PROMPT, VERDICT_SCHEMA, type Runner } from "../../src/review.ts";
import { spawnSync } from "node:child_process";
import { gitConfig } from "../repo.ts";
import { loadConfig } from "../../src/config.ts";
import { writeTypes } from "../../src/types.ts";
import { file, node, NONE, OWNER, sid } from "../fixture.ts";
import { approve } from "../../src/approvals.ts";
import { reindex, writeLists } from "../../src/reindex.ts";
import { approveSpecification, codeProject, editSpec, git, nodeIn, OPEN, OPEN_TEST, put, typedProject, withGenerator } from "../code-project.ts";

const CHANGED_OPEN = OPEN.replace("return amount;", "return amount * 2;");
const texts = (findings: Array<{ where: string; message: string }>) => findings.map((f) => `${f.where}: ${f.message}`);

test("@spec s-qqs2svksmjct753 passes a commit message that names every node that the SpecTags on the changed symbols name", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  assert.deepEqual(texts(await message(root, `Accounts: opening doubles the amount (${sid("open")})\n`)), []);
});

test("@spec s-qqs2svksmjct753 refuses a commit message that leaves out a node that a changed symbol's SpecTag names, naming the node's file, sid and location", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const found = texts(await message(root, "Accounts: opening doubles the amount\n"));
  assert.ok(found.some((m) => new RegExp(`the commit adds or changes code bound to ${sid("open")} \\(contracts/[0-9.]+\\) in specs/contracts/c\\.json, and the message does not name it`).test(m)), found.join("\n"));
});

test("@spec s-qqs2svksmjct753 counts the code outside every symbol and a file that the bindings file binds", async () => {
  const root = codeProject();
  put(root, "src/boot.ts", `/** @spec ${sid("open")} */\n\nstart();\n`);
  put(root, "src/texts.json", "{}\n");
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/texts.json": [`@spec ${sid("states")}`] }) + "\n");
  const found = texts(await message(root, "Accounts: the boot and the texts\n"));
  assert.ok(found.some((m) => m.includes(sid("open"))), found.join("\n"));
  assert.ok(found.some((m) => m.includes(sid("states"))), found.join("\n"));
  assert.deepEqual(texts(await message(root, `Accounts: the boot and the texts (${sid("open")}, ${sid("states")})\n`)), []);
});

test("@spec s-qqs2svksmjct753 ignores git's comment lines, by core.commentChar, and the scissors line with every line after it", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  assert.ok(texts(await message(root, `Accounts: opening\n# ${sid("open")}\n`)).some((m) => m.includes(sid("open"))));
  git(root, "config", "core.commentChar", ";");
  assert.deepEqual(texts(await message(root, `Accounts: opening\n# ${sid("open")}\n`)), []);
  assert.ok(texts(await message(root, `Accounts: opening\n; ${sid("open")}\n`)).some((m) => m.includes(sid("open"))));
  const verbose = `Accounts: opening\n; ------------------------ >8 ------------------------\n; Do not modify or remove the line above.\ndiff --git a/src/open.ts b/src/open.ts\n+ ${sid("open")}\n`;
  assert.ok(texts(await message(root, verbose)).some((m) => m.includes(sid("open"))));
});

test("@spec s-qqs2svksmjct753 counts in a merge commit only the code that differs from every parent", async () => {
  const root = codeProject();
  git(root, "checkout", "-q", "-b", "side");
  put(root, "src/open.ts", CHANGED_OPEN);
  git(root, "add", "-A");
  git(root, "commit", "-qm", `Accounts: doubled (${sid("open")})`);
  git(root, "checkout", "-q", "-");
  put(root, "src/more.ts", `/** @spec ${sid("states")} */\nexport const more = 1;\n`);
  git(root, "add", "-A");
  git(root, "commit", "-qm", `Accounts: more (${sid("states")})`);
  git(root, "merge", "-q", "--no-ff", "--no-commit", "side");
  assert.deepEqual(texts(await message(root, "Merge the side branch\n")), []);
});

test("@spec s-7gab4ptjt2khfr5 reads the trailers as git interpret-trailers --parse does, each spelled exactly as given and holding a single sid", () => {
  const root = codeProject();
  const body = (trailers: string) => `Accounts: reworded\n\nThe rule is reworded.\n\n${trailers}\n`;
  assert.deepEqual([...noChangeTrailers(root, body(`Implementation-Needs-No-Change: ${sid("open")}\nImplementation-Needs-No-Change: ${sid("states")}`))], [sid("open"), sid("states")]);
  assert.deepEqual([...noChangeTrailers(root, body(`implementation-needs-no-change: ${sid("open")}`))], []);
  assert.deepEqual([...noChangeTrailers(root, body(`Implementation-Needs-No-Change: ${sid("open")} ${sid("states")}`))], []);
  assert.deepEqual([...noChangeTrailers(root, `Accounts: Implementation-Needs-No-Change: ${sid("open")}\n`)], []);
});

/** A project with code, its specification approved and committed. */
function approvedCode(): string {
  const root = codeProject();
  approveSpecification(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "approved");
  return root;
}
const reword = (root: string, name = "open") => {
  editSpec(root, (d) => (nodeIn(d, name).text = "Reworded."));
  approve(root, [sid(name)], { me: OWNER });
};
const lags = async (root: string, text: string) => texts(await message(root, text)).filter((m) => /lags? behind it/.test(m));

test("@spec s-txbwsthdqhvyzd2 refuses, while the specification is approved, a commit that changes a rule's approved wording and leaves its tests and its code as they are, naming the trailer", async () => {
  const root = approvedCode();
  reword(root);
  const said = `Accounts: reworded (${sid("open")})\n`;
  const found = await lags(root, said);
  assert.ok(found.some((m) => new RegExp(`${sid("open")} \\(contracts/[0-9.]+\\) in specs/contracts/c\\.json: its tests and its code lag behind it.*Implementation-Needs-No-Change: ${sid("open")}`).test(m)), found.join("\n"));
  put(root, "test/open.test.ts", `test("@spec ${sid("open")} opens an account", () => { void 0; });\n`);
  assert.match((await lags(root, said)).join("\n"), /its code lags behind it/);
  put(root, "src/open.ts", OPEN.replace("return amount;", "return amount + 0;"));
  assert.deepEqual(await lags(root, said), []);
});

test("@spec s-txbwsthdqhvyzd2 passes a commit whose message states with the trailer that the rule's implementation needs no change, and checks nothing while the specification is a draft", async () => {
  const root = approvedCode();
  reword(root);
  assert.deepEqual(await lags(root, `Accounts: reworded (${sid("open")})\n\nImplementation-Needs-No-Change: ${sid("open")}\n`), []);
  const draft = codeProject();
  reword(draft);
  assert.deepEqual(await lags(draft, `Accounts: reworded (${sid("open")})\n`), []);
});

test("@spec s-txbwsthdqhvyzd2 counts a wording approved after an earlier reword, and the tests and the code of a node that implements the rule", async () => {
  const root = approvedCode();
  editSpec(root, (d) => (nodeIn(d, "open").text = "Reworded."));
  git(root, "add", "-A");
  git(root, "commit", "-qm", "reworded, a draft");
  approve(root, [sid("open")], { me: OWNER });
  assert.match((await lags(root, `Accounts: approved (${sid("open")})\n`)).join("\n"), /its tests and its code lag behind it/);

  const chain = approvedCode();
  editSpec(chain, (d) => d.nodes[0].children.push(
    node("close", { text: "An account is closed." }),
    node("closing", { text: "Closing, carried out.", refs: [{ type: "implements", to: sid("close") }] }),
  ));
  approve(chain, [sid("close"), sid("closing")], { me: OWNER });
  put(chain, "src/close.ts", `/** @spec ${sid("closing")} */\nexport function close() {}\n`);
  put(chain, "test/close.test.ts", `test("@spec ${sid("closing")} closes", () => {});\n`);
  await writeLists(chain);
  git(chain, "add", "-A");
  git(chain, "commit", "-qm", "closing");
  reword(chain, "close");
  assert.match((await lags(chain, `Accounts: closing reworded (${sid("close")})\n`)).join("\n"), new RegExp(`${sid("close")} .*its tests and its code lag behind it`));
});

test("@spec s-txbwsthdqhvyzd2 counts in a merge commit only what the merge changes relative to every parent", async () => {
  const root = approvedCode();
  git(root, "checkout", "-q", "-b", "side");
  reword(root);
  git(root, "add", "-A");
  git(root, "commit", "-qm", `Accounts: reworded (${sid("open")})`);
  git(root, "checkout", "-q", "-");
  put(root, "docs/notes.md", "Notes.\n");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "notes");
  git(root, "merge", "-q", "--no-ff", "--no-commit", "side");
  assert.deepEqual(await lags(root, "Merge the side branch\n"), []);
});

test("@spec s-qqs2svksmjct753 excludes the SpecTags on symbols in the tests from what a commit message must name", async () => {
  const root = codeProject();
  put(root, "test/open.test.ts", `${OPEN_TEST}/** @spec ${sid("open")} */\nexport function helper() {\n  return 2;\n}\n`);
  assert.deepEqual(texts(await message(root, "Tests: a helper added\n")), []);
});

test("@spec s-qqs2svksmjct753 accepts a message that names a section or a sid of no node", async () => {
  const root = codeProject();
  assert.deepEqual(texts(await message(root, `Accounts (${sid("accounts")}, ${NONE})\n`)), []);
});

test("@spec s-jau82aq9juv9zzh passes a message of a commit that changes no code", async () => {
  const root = codeProject();
  put(root, "README.md", "Reworded.\n");
  assert.deepEqual(texts(await message(root, "Docs: the readme reworded\n")), []);
});

const edit = (file_path: string, old_string: string, new_string: string) => ({ tool_name: "Edit", tool_input: { file_path, old_string, new_string } });

test("@spec s-83ev4wwesbwnhnp refuses before it is made an edit changing the code of a rule no test carries the sid of", async () => {
  const root = codeProject();
  const refused = await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "src", "draft.ts"), content: `/** @spec ${sid("draft")} */\nexport const drafted = 1;\n` } });
  assert.match(refused ?? "", new RegExp(`no test carries the SpecTag of ${sid("draft")}`));
});

test("@spec s-83ev4wwesbwnhnp lets an edit through where a test carries the sid of every rule whose code it changes, and an edit to a test", async () => {
  const root = codeProject();
  assert.equal(await guard(root, edit(join(root, "src", "open.ts"), "return amount;", "return amount * 2;")), null);
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "test", "draft.test.ts"), content: `test("@spec ${sid("draft")} drafts", () => {});\n` } }), null);
});

test("@spec s-st6td4mua9uqt9z reads the tests as the edit would leave the working tree", async () => {
  const root = codeProject();
  const path = join(root, "test", "open.test.ts");
  const refused = await guard(root, { tool_name: "MultiEdit", tool_input: { file_path: path, edits: [{ old_string: sid("open"), new_string: sid("draft") }] } });
  assert.equal(refused, null);
  put(root, "test/open.test.ts", `test("@spec ${sid("draft")} drafts", () => {});\n`);
  assert.match((await guard(root, edit(join(root, "src", "open.ts"), "return amount;", "return amount * 2;"))) ?? "", /no test carries/);
});

test("@spec s-st6td4mua9uqt9z names sheriff reindex where only a test carrying a bare sid names the rule whose code an edit changes", async () => {
  const root = codeProject();
  put(root, "test/open.test.ts", `test("${sid("open")} opens an account", () => {});\n`);
  const refused = await guard(root, edit(join(root, "src", "open.ts"), "return amount;", "return amount * 2;"));
  assert.match(refused ?? "", new RegExp(`no test carries the SpecTag of ${sid("open")}.*bare sid.*sheriff reindex`));
});

test("@spec s-83ev4wwesbwnhnp refuses an edit before it is made, where the edit would leave a node approved with a wording that no approval records", async () => {
  const root = codeProject();
  const path = join(root, "specs", "contracts", "c.json");
  const text = readFileSync(path, "utf8");
  const refused = await guard(root, edit(path, "What open requires.", "What open requires, reworded."));
  assert.match(refused ?? "", new RegExp(`${sid("open")}.*would stand approved over a wording for which no approval stands`));
  const drafted = text.replace("What open requires.", "What open requires, reworded.").replace(/("sid": "[^"]+",\n\s+"kind": "TextRule",\n\s+"title": "open",\n\s+"status": )"approved"/, '$1"draft"');
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: drafted } }), null);
});

test("@spec s-83ev4wwesbwnhnp lets an edit change a node's owners, an approved node keeping its approval, and leaves a section's status to the reindex", async () => {
  const root = codeProject();
  const path = join(root, "specs", "_guidelines", "project.json");
  assert.equal(await guard(root, edit(path, `"${OWNER}"`, `"other@example.com"`)), null);
  const contracts = join(root, "specs", "contracts", "c.json");
  const section = readFileSync(contracts, "utf8").replace(/("title": "accounts",\n\s+"status": )"[a-z]+"/, '$1"approved"');
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: contracts, content: section } }), null);
});

test("@spec s-83ev4wwesbwnhnp refuses before it is made an edit of the approvals made with the agent's file tools", async () => {
  const root = codeProject();
  const path = join(root, "specs", "_approvals.jsonl");
  const forged = `{"sid":"${sid("draft")}","fingerprint":"0","by":"${OWNER}"}\n`;
  assert.match((await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: readFileSync(path, "utf8") + forged } })) ?? "", /_approvals\.jsonl is written by sheriff approve alone/);
  const [first] = readFileSync(path, "utf8").split("\n");
  assert.match((await guard(root, edit(path, first!, first!.replace(OWNER, "other@example.com")))) ?? "", /_approvals\.jsonl is written by sheriff approve alone/);
});

test("@spec s-83ev4wwesbwnhnp judges no tool that makes no edit, and no file outside the repository's code, tests and specification", async () => {
  const root = codeProject();
  assert.equal(await guard(root, { tool_name: "Read", tool_input: { file_path: join(root, "src", "open.ts") } }), null);
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "notes.txt"), content: "x" } }), null);
});

const patch = (...lines: string[]) => ({ tool_name: "apply_patch", tool_input: { command: ["*** Begin Patch", ...lines, "*** End Patch"].join("\n") } });

test("@spec s-n76wt2bkqdmh78x judges each file a patch adds, updates, deletes or moves as an edit made with the file tools", async () => {
  const root = codeProject();
  const line = readFileSync(join(root, "specs", "contracts", "c.json"), "utf8").split("\n").find((l) => l.includes("What open requires."))!;
  const reworded = await guard(root, patch("*** Update File: specs/contracts/c.json", "@@", `-${line}`, `+${line.replace("requires.", "requires, reworded.")}`));
  assert.match(reworded ?? "", new RegExp(`${sid("open")}.*would stand approved`));
  const added = await guard(root, patch("*** Add File: src/draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"));
  assert.match(added ?? "", new RegExp(`no test carries the SpecTag of ${sid("draft")}`));
  assert.match((await guard(root, patch("*** Delete File: specs/_approvals.jsonl"))) ?? "", /_approvals\.jsonl is written by sheriff approve alone/);
  const moved = await guard(root, patch("*** Update File: README.md", "*** Move to: specs/_approvals.jsonl", "@@", `-See §${sid("open")}.`, "+forged"));
  assert.match(moved ?? "", /_approvals\.jsonl is written by sheriff approve alone/);
  assert.equal(await guard(root, patch("*** Update File: src/open.ts", "@@", " export function open(amount: number) {", "-  return amount;", "+  return amount * 2;")), null);
  const declared = OPEN_TEST.trimEnd();
  assert.equal(await guard(root, patch("*** Update File: test/open.test.ts", "*** Move to: test/opened.test.ts", "@@", `-${declared}`, `+${declared.replace("an account", "an account at once")}`)), null);
});

test("@spec s-n76wt2bkqdmh78x refuses the whole patch where it refuses one of its files", async () => {
  const root = codeProject();
  const refused = await guard(root, patch("*** Add File: notes.txt", "+one", "*** Add File: src/draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"));
  assert.match(refused ?? "", new RegExp(`no test carries the SpecTag of ${sid("draft")}`));
});

test("@spec s-n76wt2bkqdmh78x refuses a patch it cannot read or apply", async () => {
  const root = codeProject();
  assert.match((await guard(root, { tool_name: "apply_patch", tool_input: { command: "not a patch" } })) ?? "", /cannot read the patch/);
  assert.match((await guard(root, patch("*** Frobnicate File: src/open.ts"))) ?? "", /cannot read the patch/);
  assert.match((await guard(root, patch("*** Update File: src/open.ts", "@@", "-  return nothing;", "+  return amount;"))) ?? "", /cannot apply the patch to src\/open\.ts/);
  assert.match((await guard(root, patch("*** Update File: src/missing.ts", "@@", "-a", "+b"))) ?? "", /cannot apply the patch to src\/missing\.ts/);
  assert.match((await guard(root, patch("*** Add File: notes.txt", "one"))) ?? "", /cannot read the patch/);
});

test("@spec s-n76wt2bkqdmh78x reads the paths of a patch from the directory the session works in", async () => {
  const root = codeProject();
  const input = { ...patch("*** Add File: draft.ts", `+/** @spec ${sid("draft")} */`, "+export const drafted = 1;"), cwd: join(root, "src") };
  assert.match((await guard(root, input)) ?? "", new RegExp(`no test carries the SpecTag of ${sid("draft")}`));
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

test("@spec s-tnz9zgqx8c629a7 reads each runner's settings from the user's git configuration, counting an empty setting as confirmed, and uses the default of each setting that the configuration lacks", async () => {
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

test("@spec s-tnz9zgqx8c629a7 runs the reviewer with the settings it has read, and in every review that ran with a default names each setting whose default it used and how the user confirms that setting", async () => {
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

/** A node of the technical appendix that implements `implemented`, added to a file of its own and approved, uncommitted. */
function withAppendix(root: string, name = "opening", implemented = sid("open")): void {
  put(root, `specs/tech/${name}.json`, JSON.stringify(file("tech", name, node(`${name} section`, { kind: "section", text: "How it is built.", children: [
    node(name, { text: `How ${name} is built.`, refs: [{ type: "implements", to: implemented }] }),
  ] })), null, 2) + "\n");
  reindex(root);
  approve(root, [sid(name)], { me: OWNER });
  reindex(root);
}

const commitAll = (root: string, message = "next") => (git(root, "add", "-A"), git(root, "commit", "-qm", message));
const sectionOf = (input: string, title: string) => input.split(new RegExp(`^# ${title}$`, "m"))[1]?.split(/^# The /m)[0];

test("@spec s-vp24dqydygztqbt gives the reviewer the change and the wording of the nodes that its message and its SpecTags name, and nothing else", async () => {
  const root = codeProject();
  editSpec(root, (d) => {
    nodeIn(d, "draft").text = "Drafting is described here.";
    nodeIn(d, "open").examples = ["Opening with 5 keeps 5."];
  });
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "test/open.test.ts", `${OPEN_TEST}test("@spec ${sid("states")} lists the states", () => {});\n`);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const nodes = sectionOf(input, "The nodes that the message and the SpecTags name")!;
  assert.ok(input.includes("return amount * 2;"));
  assert.ok(nodes.includes("What open requires."), nodes);
  assert.ok(nodes.includes("Opening with 5 keeps 5."), nodes);
  assert.ok(nodes.includes("What states requires."), nodes);
  assert.ok(nodes.includes('"valueList"'), nodes);
  assert.ok(!nodes.includes("Drafting is described here."), nodes);
});

test("@spec s-vp24dqydygztqbt asks for a verdict on a commit whose message states that a rule's implementation needs no change, and on one that approves a node of the technical appendix implementing a rule of the base specification", async () => {
  const root = codeProject();
  let asked = 0;
  const run: Runner = () => ((asked += 1), { status: "ok", out: JSON.stringify({ verdict: "pass", findings: [] }) });
  await review(root, `Docs\n\nImplementation-Needs-No-Change: ${sid("open")}\n`, { run });
  assert.equal(asked, 1);
  withAppendix(root);
  await review(root, "Opening\n", { run });
  assert.equal(asked, 2);
  commitAll(root);
  await review(root, "Docs\n", { run });
  assert.equal(asked, 2);
});

test("@spec s-vp24dqydygztqbt disregards a finding on a statement that a rule's implementation needs no change while the commit leaves the specification a draft", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n\nImplementation-Needs-No-Change: ${sid("states")}\n`;
  const statement = { nodes: [sid("states")], judgement: "statement", file: null, line: null, problem: "the states change" };
  const code = { nodes: [sid("open")], judgement: "code", file: "src/open.ts", line: 3, problem: "doubles" };
  assert.deepEqual(await review(root, msg, { run: answer("refuse", [statement]) }), []);
  assert.deepEqual(texts(await review(root, msg, { run: answer("refuse", [statement, code]) })), [`src/open.ts:3: ${sid("open")}: doubles`]);
  approveSpecification(root);
  assert.deepEqual(texts(await review(root, msg, { run: answer("refuse", [statement]) })), [`the review: ${sid("states")}: the states change`]);
});

test("@spec s-vp24dqydygztqbt leaves out every file that `sheriff types` writes, including those of a project's generator, names those of them that the commit changes, and keeps the bindings file", async () => {
  const root = codeProject();
  withGenerator(root);
  writeTypes(root);
  commitAll(root, "generator");
  put(root, "gen/titles.txt", "# a hand edit\n");
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "src/limits.json", '{ "max": 3 }\n');
  put(root, "sheriff.bindings.json", JSON.stringify({ "src/limits.json": [`@spec ${sid("open")}`] }, null, 2) + "\n");
  git(root, "add", "-A");
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const change = sectionOf(input, "The change")!;
  assert.ok(change.includes("sheriff.bindings.json"), change);
  assert.ok(!change.includes("a hand edit"), change);
  assert.ok(!sectionOf(input, "The code the commit adds or changes")!.includes("gen/titles.txt"), input);
  assert.match(sectionOf(input, "The files left out of the change")!, /^- gen\/titles\.txt$/m);
  commitAll(root);
  put(root, "src/open.ts", OPEN);
  assert.equal(sectionOf(await reviewInput(root, `Accounts (${sid("open")})\n`), "The files left out of the change"), undefined);
});

test("@spec s-vp24dqydygztqbt gives the reviewer the whole change that the commit makes, including its changes to the specification, the documents and the settings", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "README.md", "Opening doubles the amount.\n");
  editSpec(root, (d) => (nodeIn(d, "draft").title = "draft renamed"));
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  assert.ok(input.includes("return amount * 2;"), input);
  assert.ok(input.includes("+Opening doubles the amount."), input);
  assert.ok(input.includes("draft renamed"), input);
});

test("@spec s-vp24dqydygztqbt leaves the files generated from the specification out of the change the reviewer is given", async () => {
  const root = typedProject("customer", ["src/**"]);
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].schema = { type: "object", properties: { reference: { type: "string" } }, required: ["reference"], unevaluatedProperties: false };
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("customer")], { me: OWNER });
  reindex(root);
  writeTypes(root);
  put(root, "src/app/use.ts", `/** @spec ${sid("customer")} */\nexport const usedReference = "r";\n`);
  git(root, "add", "-A");
  const input = await reviewInput(root, `Ledger (${sid("customer")})\n`);
  const [, change] = input.split(/^# The change$|^# The files left out of the change$/m);
  assert.ok(change!.includes("usedReference"), input);
  assert.ok(!/src\/types\.ts|schemas\/checks\.json|reference: string/.test(change!), input);
  assert.ok(!sectionOf(input, "The code the commit adds or changes")!.includes("src/types.ts"), input);
});

test("@spec s-vp24dqydygztqbt names each file left out to the reviewer, and counts what a RecordType requires as carried out by the types and runtime checks generated from it", async () => {
  const root = typedProject("customer", ["src/**"]);
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].schema = { type: "object", properties: { reference: { type: "string" } }, required: ["reference"], unevaluatedProperties: false };
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
  approve(root, [sid("customer")], { me: OWNER });
  reindex(root);
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

test("@spec s-68ds99w8wd67aae passes where the reviewer passes, and refuses, naming the nodes, the file and the line of each finding", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  assert.deepEqual(await review(root, `Accounts (${sid("open")})\n`, { run: answer("pass") }), []);
  const refused = texts(await review(root, `Accounts (${sid("open")})\n`, { run: answer("refuse", [{ nodes: [sid("open")], judgement: "code", file: "src/open.ts", line: 3, problem: "doubles what the rule does not ask to double" }]) }));
  assert.deepEqual(refused, [`src/open.ts:3: ${sid("open")}: doubles what the rule does not ask to double`]);
});

test("@spec s-68ds99w8wd67aae reads a verdict that passes with findings on comments alone, each a warning, and one that refuses with a finding under a judgement other than the one on comments", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  const comment = { nodes: [sid("open")], judgement: "comments", file: "src/open.ts", line: 2, problem: "the comment says it halves" };
  const code = { nodes: [sid("open")], judgement: "code", file: null, line: null, problem: "doubles" };
  const passed = await review(root, msg, { run: answer("pass", [comment]) });
  assert.deepEqual(passed.map((f) => [f.where, f.message, f.reported]), [["src/open.ts:2", `${sid("open")}: the comment says it halves`, true]]);
  const refused = await review(root, msg, { run: answer("refuse", [comment, code]) });
  assert.deepEqual(refused.map((f) => [f.where, Boolean(f.reported)]), [["src/open.ts:2", true], ["the review", false]]);
  assert.match(texts(await review(root, msg, { run: answer("refuse", [comment]) }))[0]!, /cannot be read/);
});

test("@spec s-68ds99w8wd67aae refuses the commit where the review cannot be carried out, and says why", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  assert.match(texts(await review(root, msg, { run: () => ({ status: "missing", detail: "claude" }) }))[0]!, /no reviewer to run/);
  assert.match(texts(await review(root, msg, { run: () => ({ status: "timeout", detail: "20 minutes" }) }))[0]!, /did not end/);
  assert.match(texts(await review(root, msg, { run: () => ({ status: "ok", out: "I think it is fine." }) }))[0]!, /cannot be read/);
});

test("@spec s-jau82aq9juv9zzh asks no review of a commit that changes no code", async () => {
  const root = codeProject();
  put(root, "README.md", "Reworded.\n");
  let asked = false;
  assert.deepEqual(await review(root, "Docs\n", { run: () => ((asked = true), { status: "ok", out: "" }) }), []);
  assert.equal(asked, false);
});

test("@spec s-tnz9zgqx8c629a7 passes no flag for an empty setting, leaving its value to the runner's CLI", () => {
  const claude = claudeArgs({ claudeModel: "", claudeFallbackModel: "", claudeEffort: "" }, "/prompt.md");
  for (const flag of ["--model", "--fallback-model", "--effort"]) assert.ok(!claude.includes(flag), flag);
  const codex = codexArgs({ codexModel: "", codexEffort: "" }, { prompt: "/p", schema: "/s", out: "/o" });
  assert.ok(!codex.some((a) => a.startsWith("model_reasoning_effort")), codex.join(" "));
});

test("@spec s-wgedv32rdaqca9k ends the whole tree of the runner's processes when the review runs out of time", async () => {
  const dir = mkdtempSync(join(tmpdir(), "sheriff-tree-"));
  const marker = join(dir, "outlived.txt");
  const child = join(dir, "child.mjs");
  writeFileSync(child, `import { writeFileSync } from "node:fs";\nsetTimeout(() => writeFileSync(${JSON.stringify(marker)}, "alive"), 4000);\n`);
  const parent = join(dir, "parent.mjs");
  writeFileSync(parent, `import { spawn } from "node:child_process";\nspawn(process.execPath, [${JSON.stringify(child)}], { stdio: "ignore" });\nsetTimeout(() => {}, 60000);\n`);
  const result = runCli(process.execPath, [parent], "test runner", "", { minutes: 0.02, values: {} }, dir);
  assert.equal(result.status, "timeout");
  await new Promise((done) => setTimeout(done, 5000));
  assert.ok(!existsSync(marker), "a process that the runner started outlived the limit");
});

test("@spec s-3wh8uhgn9jr2k74 starts the Claude Code CLI in print mode, without keeping a session, with the given model, reasoning effort and fallback model", () => {
  const args = claudeArgs({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, "/prompt.md");
  for (const flag of ["-p", "--no-session-persistence"]) assert.ok(args.includes(flag), flag);
  const value = (flag: string) => args[args.indexOf(flag) + 1];
  assert.equal(value("--model"), "opus");
  assert.equal(value("--fallback-model"), "sonnet");
  assert.equal(value("--effort"), "high");
});

test("@spec s-avvnasjhsfkgajh starts the Claude Code CLI with no tools, settings, MCP servers or slash commands, and with the reviewer's own system prompt", () => {
  const args = claudeArgs({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, "/prompt.md");
  for (const flag of ["--strict-mcp-config", "--disable-slash-commands"]) assert.ok(args.includes(flag), flag);
  const value = (flag: string) => args[args.indexOf(flag) + 1];
  assert.equal(value("--tools"), "");
  assert.equal(value("--setting-sources"), "");
  assert.equal(value("--system-prompt-file"), "/prompt.md");
});

/** Builds the command-line arguments for the Codex CLI, with the model left empty and the reasoning effort set to "high", and returns them together with functions that read the value or values following a flag. */
const codexRun = () => {
  const args = codexArgs({ codexModel: "", codexEffort: "high" }, { prompt: "/prompt.md", schema: "/schema.json", out: "/out.json" });
  return { args, value: (flag: string) => args[args.indexOf(flag) + 1], values: (flag: string) => args.flatMap((a, i) => (a === flag ? [args[i + 1]] : [])) };
};

test("@spec s-u2n5hwwqkb6zk4z starts the Codex CLI with the codex exec command, in a read-only sandbox, without keeping a session, with no skills and with the given model and reasoning effort", () => {
  const { args, value, values } = codexRun();
  assert.equal(args[0], "exec");
  for (const flag of ["--ephemeral", "--skip-git-repo-check"]) assert.ok(args.includes(flag), flag);
  assert.equal(value("-s"), "read-only");
  for (const setting of ["model_reasoning_effort='high'", "skills.include_instructions=false", "skills.bundled.enabled=false"]) assert.ok(values("-c").includes(setting), setting);
  assert.ok(!args.includes("-m"), "an empty model asks for the one Codex chooses for the account");
  const chosen = codexArgs({ codexModel: "gpt-6", codexEffort: "high" }, { prompt: "/p", schema: "/s", out: "/o" });
  assert.equal(chosen[chosen.indexOf("-m") + 1], "gpt-6");
});

test("@spec s-avvnasjhsfkgajh starts the Codex CLI with every tool that a setting can turn off turned off, with the reviewer's own system prompt, and with the input on standard input", () => {
  const { args, values } = codexRun();
  for (const setting of ["model_instructions_file='/prompt.md'", "web_search='disabled'"]) assert.ok(values("-c").includes(setting), setting);
  for (const feature of ["shell_tool", "unified_exec", "apps", "browser_use", "computer_use", "hooks", "image_generation", "multi_agent", "plugins", "view_image"]) {
    assert.ok(values("--disable").includes(feature), feature);
  }
  assert.equal(args.at(-1), "-", "the input read from standard input");
});

test("@spec s-68ds99w8wd67aae requires the Codex CLI's answer to match the schema of the verdict, and reads it from the file that the CLI writes", () => {
  const { value } = codexRun();
  assert.equal(value("--output-schema"), "/schema.json");
  assert.equal(value("-o"), "/out.json");
});

test("@spec s-68ds99w8wd67aae the schema of the verdict allows the verdicts \"pass\" and \"refuse\", and requires each finding to name its nodes, its problem, its judgement, its file and its line", () => {
  const schema = JSON.parse(VERDICT_SCHEMA);
  assert.deepEqual(schema.properties.verdict.enum, ["pass", "refuse"]);
  assert.deepEqual(schema.properties.findings.items.required, ["nodes", "problem", "judgement", "file", "line"]);
});

test("@spec s-u2n5hwwqkb6zk4z runs the Codex CLI with a Codex home of its own holding a copy of the user's sign-in credentials and nothing else, which is deleted after the run", () => {
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
    assert.equal(seen.input, "the reviewer's input\n");
    assert.ok(!existsSync(seen.home), "the Codex home deleted after the run");
  } finally {
    process.env.PATH = saved.PATH;
    if (saved.CODEX_HOME === undefined) delete process.env.CODEX_HOME;
    else process.env.CODEX_HOME = saved.CODEX_HOME;
  }
});

test("@spec s-68ds99w8wd67aae holds the Claude Code CLI's answer to the schema of the verdict", () => {
  const args = claudeArgs({ claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" }, "/prompt.md");
  assert.equal(args[args.indexOf("--json-schema") + 1], VERDICT_SCHEMA);
});

test("@spec s-68ds99w8wd67aae reads an answer that passes with a finding on code, or refuses with none, as one that cannot be read", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  const msg = `Accounts (${sid("open")})\n`;
  const finding = { nodes: [sid("open")], judgement: "code", file: "src/open.ts", line: 3, problem: "doubles" };
  assert.match(texts(await review(root, msg, { run: answer("pass", [finding]) }))[0]!, /cannot be read/);
  assert.match(texts(await review(root, msg, { run: answer("refuse", []) }))[0]!, /cannot be read/);
});

test("@spec s-avvnasjhsfkgajh starts the Claude Code CLI in an empty directory, with the system prompt that sheriff review writes and with none of the settings, servers, commands, tools, sessions or variables of the session that made the change", () => {
  const bin = mkdtempSync(join(tmpdir(), "sheriff-fake-claude-"));
  const log = join(bin, "log.json");
  // A stand-in for the Claude Code CLI: it records what it was given and answers with a verdict in the CLI's JSON envelope.
  writeFileSync(join(bin, "fake.mjs"), [
    'import { readdirSync, readFileSync, writeFileSync } from "node:fs";',
    "const args = process.argv.slice(2);",
    'const prompt = args[args.indexOf("--system-prompt-file") + 1];',
    `writeFileSync(${JSON.stringify(log)}, JSON.stringify({ args, cwd: readdirSync(process.cwd()), env: Object.keys(process.env), prompt: readFileSync(prompt, "utf8"), input: readFileSync(0, "utf8") }));`,
    'process.stdout.write(JSON.stringify({ result: JSON.stringify({ verdict: "pass", findings: [] }) }));',
  ].join("\n"));
  writeFileSync(join(bin, "claude"), '#!/bin/sh\nexec node "$(dirname "$0")/fake.mjs" "$@"\n', { mode: 0o755 });
  writeFileSync(join(bin, "claude.cmd"), '@node "%~dp0fake.mjs" %*\r\n');
  const saved = { PATH: process.env.PATH, CLAUDECODE: process.env.CLAUDECODE };
  process.env.PATH = [bin, process.env.PATH].join(delimiter);
  process.env.CLAUDECODE = "1";
  try {
    const result = claudeRunner("the reviewer's input\n", { minutes: 20, values: { claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" } });
    assert.equal(result.status, "ok", JSON.stringify(result));
    const seen = JSON.parse(readFileSync(log, "utf8"));
    assert.deepEqual(seen.cwd, []);
    assert.equal(seen.prompt, SYSTEM_PROMPT);
    assert.equal(seen.input, "the reviewer's input\n");
    assert.ok(!seen.env.some((k: string) => k.toUpperCase() === "CLAUDECODE"), seen.env.join(" "));
    const value = (flag: string) => seen.args[seen.args.indexOf(flag) + 1];
    assert.equal(value("--setting-sources"), "");
    assert.equal(value("--tools"), "");
    for (const flag of ["--strict-mcp-config", "--disable-slash-commands", "--no-session-persistence"]) assert.ok(seen.args.includes(flag), flag);
  } finally {
    process.env.PATH = saved.PATH;
    if (saved.CLAUDECODE === undefined) delete process.env.CLAUDECODE;
    else process.env.CLAUDECODE = saved.CLAUDECODE;
  }
});

test("@spec s-avvnasjhsfkgajh passes a runner only the environment variables that it needs, and none that an agent or git sets", () => {
  const env = runnerEnv({ PATH: "/bin", HOME: "/home/u", LANG: "C.UTF-8", HTTPS_PROXY: "http://p", ANTHROPIC_API_KEY: "k", CLAUDE_CONFIG_DIR: "/c",
    CLAUDECODE: "1", CLAUDE_EFFORT: "low", CLAUDE_CODE_SESSION_ID: "s", GIT_DIR: "/r/.git", GIT_WORK_TREE: "/tmp/x", OPENAI_API_KEY: "o", SECRET_TOKEN: "x" });
  assert.deepEqual(Object.keys(env).sort(), ["ANTHROPIC_API_KEY", "CLAUDE_CONFIG_DIR", "HOME", "HTTPS_PROXY", "LANG", "OPENAI_API_KEY", "PATH"]);
});

test("@spec s-avvnasjhsfkgajh starts the program that an npm command script starts, with the arguments that the script passes, rather than starting the script through a shell", () => {
  const exe = '@ECHO off\r\nGOTO start\r\n:find_dp0\r\nSET dp0=%~dp0\r\nEXIT /b\r\n:start\r\nSETLOCAL\r\nCALL :find_dp0\r\n"%dp0%\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe"   %*\r\n';
  assert.deepEqual(programOfShim(exe, "C:\\npm"), { program: "C:\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe", args: [] });
  const js = '@ECHO off\r\nSETLOCAL\r\nCALL :find_dp0\r\nIF EXIST "%dp0%\\node.exe" (\r\n  SET "_prog=%dp0%\\node.exe"\r\n) ELSE (\r\n  SET "_prog=node"\r\n)\r\nendLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\\node_modules\\@openai\\codex\\bin\\codex.js" %*\r\n';
  assert.deepEqual(programOfShim(js, "C:\\npm"), { program: process.execPath, args: ["C:\\npm\\node_modules\\@openai\\codex\\bin\\codex.js"] });
});

test("@spec s-rd9nftptjuz6bwv gives the runner the nodes with their reasons and each changed symbol in full with the SpecTags that bind it, and asks it to judge each symbol, file and test", async () => {
  const root = codeProject();
  editSpec(root, (d) => (nodeIn(d, "open").reason = "An account holds what is put in."));
  put(root, "src/open.ts", CHANGED_OPEN);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  assert.ok(input.includes("An account holds what is put in."), input);
  const code = sectionOf(input, "The code the commit adds or changes");
  assert.ok(code && code.includes("src/open.ts:2-4 open") && code.includes(sid("open")) && code.includes("return amount * 2;"), input);
  assert.match(SYSTEM_PROMPT, /each changed symbol, file and test/i);
  assert.match(SYSTEM_PROMPT, /a changed test checks something that the rule its SpecTag names does not state/i);
  assert.match(SYSTEM_PROMPT, /a SpecTag naming a rule that it does not implement/i);
  assert.match(SYSTEM_PROMPT, /`@spec none`.*s-kgbzk2ph9e6jfb4/s);
});

test("@spec s-rd9nftptjuz6bwv gives the runner the changed symbols and tests of the system's code, telling a symbol with no SpecTag from one that carries `@spec none`", async () => {
  const root = codeProject();
  put(root, "src/open.ts", CHANGED_OPEN);
  put(root, "src/pad.ts", "/** @spec none formatting only, no rule of the system */\nexport function pad(s: string) {\n  return s.padStart(4);\n}\n\nexport function raw(s: string) {\n  return s;\n}\n");
  put(root, "test/helper.test.ts", "export function helper() {\n  return 1;\n}\n");
  put(root, "test/open.test.ts", `test("@spec ${sid("open")} opens an account", () => {\n  open(5);\n});\n`);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const section = sectionOf(input, "The code the commit adds or changes")!;
  assert.ok(!section.includes("test/helper.test.ts"), section);
  assert.match(section, /src\/pad\.ts:\d+-\d+ pad \(SpecTags: @spec none formatting only, no rule of the system\)/);
  assert.match(section, /src\/pad\.ts:\d+-\d+ raw \(SpecTags: no SpecTag\)/);
  assert.ok(section.includes(`test/open.test.ts:1-3 the test "@spec ${sid("open")} opens an account" (SpecTags: ${sid("open")})`), section);
  assert.ok(section.includes("open(5);"), section);
});

test("@spec s-rd9nftptjuz6bwv gives the reviewer each changed file bound as a whole and the changed code outside every symbol, whole, with its lines and the SpecTags at the file's start", async () => {
  const root = codeProject();
  put(root, "src/setup.sh", `# @spec ${sid("open")}\necho opening\n`);
  put(root, "src/boot.ts", `/** @spec ${sid("states")} */\nconsole.log("booting");\n\n/** @spec ${sid("open")} */\nexport function boot() {\n  return 1;\n}\n`);
  const input = await reviewInput(root, `Accounts (${sid("open")})\n`);
  const section = sectionOf(input, "The code the commit adds or changes")!;
  assert.ok(section.includes(`src/setup.sh:1-2 the whole file (SpecTags: ${sid("open")})`), section);
  assert.ok(section.includes("echo opening"), section);
  assert.ok(section.includes(`src/boot.ts:2 the code outside every symbol (SpecTags: ${sid("states")})`), section);
  assert.ok(section.includes('console.log("booting");'), section);
  assert.ok(section.includes(`src/boot.ts:5-7 boot (SpecTags: ${sid("open")})`), section);
});

test("@spec s-kgqxg4gunzynwsv gives the reviewer, for each rule that a trailer names, its wording before and after the commit, and the code and the tests bound to it in full, directly or through implements links", async () => {
  const root = codeProject();
  withAppendix(root);
  put(root, "src/opening.ts", `/** @spec ${sid("opening")} */\nexport function opening() {\n  return "opened";\n}\n`);
  reindex(root);
  commitAll(root);
  editSpec(root, (d) => (nodeIn(d, "open").text = "What open requires, said again."));
  const input = await reviewInput(root, `Reword open\n\nImplementation-Needs-No-Change: ${sid("open")}\n`);
  const section = sectionOf(input, "The rules whose implementation, as the message states, needs no change")!;
  assert.ok(section, input);
  assert.match(section, /What open requires\.\n/);
  assert.match(section, /What open requires, said again\./);
  for (const expected of ["src/open.ts:2-4 open", "return amount;", `test/open.test.ts:1 the test "@spec ${sid("open")} opens an account"`, "src/opening.ts:2-4 opening", 'return "opened";']) {
    assert.ok(section.includes(expected), `${expected}\n${section}`);
  }
  assert.ok(!section.includes("src/states.ts"), section);
  assert.match(SYSTEM_PROMPT, /"statement"/);
});

test("@spec s-4bwa4zepd4nwcv8 gives the reviewer each node of the technical appendix that the commit approves and that implements a rule of the base specification, with the rules of the base specification that bear on it", async () => {
  const root = codeProject();
  editSpec(root, (d) => d.nodes.push(node("billing", { kind: "section", text: "Billing.", children: [
    node("bill", { text: `Bills what §${sid("open")} opens.`, refs: [{ type: "cites", to: sid("open") }] }),
    node("other"),
  ] })));
  commitAll(root);
  withAppendix(root);
  const input = await reviewInput(root, "Opening\n");
  const section = sectionOf(input, "The nodes of the technical appendix that the commit approves")!;
  assert.ok(section, input);
  for (const expected of ["How opening is built.", "What open requires.", "What draft requires.", "What states requires.", `Bills what §${sid("open")} opens.`]) {
    assert.ok(section.includes(expected), `${expected}\n${section}`);
  }
  assert.ok(!section.includes("What other requires."), section);
  assert.match(SYSTEM_PROMPT, /"appendix"/);
});

test("@spec s-4bwa4zepd4nwcv8 gives, for a rule of the base specification in no section, the other rules of its folder that are in no section either", async () => {
  const root = codeProject();
  put(root, "specs/contracts/d.json", JSON.stringify(file("contracts", "d", node("lone"), node("lone too")), null, 2) + "\n");
  reindex(root);
  commitAll(root);
  withAppendix(root, "solo", sid("lone"));
  const section = sectionOf(await reviewInput(root, "Solo\n"), "The nodes of the technical appendix that the commit approves")!;
  for (const expected of ["How solo is built.", "What lone requires.", "What lone too requires."]) assert.ok(section.includes(expected), `${expected}\n${section}`);
  assert.ok(!section.includes("What open requires."), section);
});

test("@spec s-7vpsdsy8dpqdy6r asks for a verdict on a commit that changes only comments, and gives the reviewer each changed comment with the code that it describes", async () => {
  const root = codeProject();
  put(root, "src/open.ts", `/**\n * Opens an account with the amount given.\n * @spec ${sid("open")}\n */\nexport function open(amount: number) {\n  // The amount is kept as it is.\n  return amount;\n}\n`);
  put(root, "src/states.ts", `/** @spec ${sid("states")} */\nexport type State = "open" | "closed";\n\n// The states end here.\n`);
  let asked = 0;
  const run: Runner = () => ((asked += 1), { status: "ok", out: JSON.stringify({ verdict: "pass", findings: [] }) });
  await review(root, "Comments\n", { run });
  assert.equal(asked, 1);
  const input = await reviewInput(root, "Comments\n");
  assert.equal(sectionOf(input, "The code the commit adds or changes"), undefined, input);
  const section = sectionOf(input, "The comments the commit adds or changes")!;
  assert.ok(section, input);
  const [, first, second, third] = section.split(/^## /m);
  assert.match(first!, /^src\/open\.ts:1-4\n[\s\S]*Opens an account with the amount given\.[\s\S]*src\/open\.ts:5-8 open/);
  assert.match(second!, /^src\/open\.ts:6\n[\s\S]*The amount is kept as it is\.[\s\S]*src\/open\.ts:5-8 open/);
  assert.match(third!, /^src\/states\.ts:4\n[\s\S]*The states end here\.[\s\S]*src\/states\.ts:1-4 the whole file/);
  const nodes = sectionOf(input, "The nodes that the message and the SpecTags name")!;
  assert.ok(nodes.includes("What states requires."), nodes);
  assert.match(SYSTEM_PROMPT, /"comments"/);
  assert.match(SYSTEM_PROMPT, /tell the comments apart from the code/i);
});

test("@spec s-7vpsdsy8dpqdy6r counts a comment whose text differs only in its SpecTags or its whitespace as unchanged", async () => {
  const root = codeProject();
  put(root, "src/open.ts", `/** @spec ${sid("open")} */\nexport function open(amount: number) {\n  return amount;\n}\n// Spare   words.\n`);
  commitAll(root);
  put(root, "src/open.ts", `/**\n * @spec ${sid("open")}\n */\nexport function open(amount: number) {\n  return amount;\n}\n// Spare words.\n`);
  let asked = 0;
  await review(root, "Reflow\n", { run: () => ((asked += 1), { status: "ok", out: "" }) });
  assert.equal(asked, 0);
});

test("@spec s-st6td4mua9uqt9z refuses an edit of sheriff.config.json that changes the specification's approval status, the strict flag or the chosen extensions, naming the list and the command sheriff settings", async () => {
  const root = codeProject();
  const path = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(path, "utf8"));
  for (const [key, entry] of [["approvalStatus", { status: "approved", by: OWNER }], ["strict", { on: true, by: OWNER }], ["extensions", { name: "views", chosen: true, by: OWNER }]] as const) {
    const changed = { ...settings, [key]: [...(settings[key] ?? []), entry] };
    const refused = await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: JSON.stringify(changed, null, 2) + "\n" } });
    assert.match(refused ?? "", new RegExp(`${key}.*sheriff settings`), key);
  }
  const globs = { ...settings, code: [...settings.code, "lib/**"] };
  assert.equal(await guard(root, { tool_name: "Write", tool_input: { file_path: path, content: JSON.stringify(globs, null, 2) + "\n" } }), null);
});

test("@spec s-st6td4mua9uqt9z refuses an edit that changes a file bound as a whole to a rule whose SpecTag no test carries", async () => {
  const root = codeProject();
  const refused = await guard(root, { tool_name: "Write", tool_input: { file_path: join(root, "src", "run.sh"), content: `# @spec ${sid("states")}\necho running\n` } });
  assert.match(refused ?? "", new RegExp(`no test carries the SpecTag of ${sid("states")}`));
});

test("@spec s-st6td4mua9uqt9z names the file and the location of a node that an edit would leave approved with a wording that no approval records", async () => {
  const root = codeProject();
  const path = join(root, "specs", "contracts", "c.json");
  const refused = await guard(root, edit(path, "What open requires.", "What open requires, reworded."));
  assert.match(refused ?? "", new RegExp(`specs/contracts/c\\.json: ${sid("open")} \\([^)]+\\) would stand approved`));
});
