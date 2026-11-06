import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { approve } from "../src/approvals.ts";
import { reindex } from "../src/reindex.ts";
import { APPROVAL_RULE } from "../src/model.ts";
import { DATA_STRUCTURES, writeTypes } from "../src/types.ts";
import { BASE, file, node, OWNER, repo, sid, taking } from "./fixture.ts";

export const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

export const put = (root: string, path: string, text: string) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
};

/** Changes the nodes of the project's contracts and reindexes. */
export const editSpec = (root: string, change: (data: any) => void) => {
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  change(data);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
};

export const nodeIn = (data: any, name: string): any => data.nodes[0].children.find((n: any) => n.sid === sid(name));

export const OPEN = `/** @spec ${sid("open")} */\nexport function open(amount: number) {\n  return amount;\n}\n`;
export const OPEN_TEST = `test("@spec ${sid("open")} opens an account", () => {});\n`;

/**
 * The sid of the rule of the project's own guidelines that approves the specification: the one the reindex adds where
 * the project takes the SpecSheriff guidelines, or, in a project writing guidelines that hold no base's rule on it,
 * one added here.
 */
export function approvalRuleSid(root: string): string {
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  const find = () => (data.nodes[0].children ?? []).find((n: any) => n.refs.some((r: any) => r.type === "refines" && r.to === APPROVAL_RULE));
  if (!find()) {
    data.nodes[0].children = [...(data.nodes[0].children ?? []), node("approved spec", { title: "The specification is approved", text: "This project's specification is approved.", refs: [{ type: "refines", to: APPROVAL_RULE }] })];
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    reindex(root);
  }
  return find().sid;
}

/** Approves the specification (s-qzthyh7yqvfhsa2), its rule approved by its owner, or withdraws that approval. */
export function approveSpecification(root: string, { withdraw = false, me = OWNER } = {}): void {
  reindex(root);
  approve(root, [approvalRuleSid(root)], { me, withdraw });
  reindex(root);
}

/** A project whose code and tests agree with its specification, committed. */
export function codeProject(): string {
  const root = repo({
    "sheriff.config.json": { code: ["src/**"], tests: ["test/**"], writesSpecSheriffGuidelines: true },
    "specs/_guidelines/spec.json": BASE,
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours." })),
    "specs/contracts/c.json": file("contracts", "c", node("accounts", { kind: "section", text: "Accounts.", children: [
      node("open", { meta: { code: [{ file: "src/open.ts" }], tests: [`test/open.test.ts::@spec ${sid("open")} opens an account`] } }),
      node("draft"),
      node("states", { list: { of: "the states of an account", members: ["open", "closed"], declaredIn: { file: "src/states.ts", declaration: "State" } }, meta: { code: [{ file: "src/states.ts", symbols: ["State"] }] } }),
    ] })),
    "src/open.ts": OPEN,
    "src/states.ts": `/** @spec ${sid("states")} */\nexport type State = "open" | "closed";\n`,
    "test/open.test.ts": OPEN_TEST,
    "README.md": `See §${sid("open")}.\n`,
  });
  reindex(root);
  approve(root, [sid("open"), sid("states")], { me: OWNER });
  reindex(root);
  git(root, "init", "-q");
  git(root, "config", "user.email", OWNER);
  git(root, "config", "user.name", "Owner");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "first");
  return root;
}

/**
 * A project taking the SpecSheriff guidelines whose stack lists where the types go, its types written
 * and committed; by default the code's globs do not reach them.
 */
export function typedProject(title = "customer", code = ["src/app/**"]): string {
  const root = taking({
    "sheriff.config.json": { code, tests: ["test/**"] },
    "specs/contracts/c.json": file("contracts", "c", node("ledger", { kind: "section", text: "Ledger.", children: [
      node("customer", { kind: "recordType", title, fields: [{ name: "number", type: { is: "text" }, required: true, text: "" }], unknown: "refused", meta: { code: [{ file: "src/types.ts" }] } }),
    ] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [
      node("generated types", { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "the files of the generated types and runtime checks", members: ["src/types.ts", "schemas/checks.json"] } }),
    ] })),
  });
  approve(root, [sid("customer")], { me: OWNER });
  reindex(root);
  writeTypes(root);
  git(root, "init", "-q");
  git(root, "config", "user.email", OWNER);
  git(root, "config", "user.name", "Owner");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "first");
  return root;
}

/** The base's rule on a project's own generators, which the rule listing them refines. */
export const OWN_GENERATORS = "s-km4x4s26kv7pjze";

/**
 * Adds to a project a generator listed by a rule of its own guidelines: it prints, for the node named `from`, a file at
 * `path` holding that node's title, or a path under specs/ where `path` says so. The rule is approved.
 */
export function withGenerator(root: string, path = "gen/titles.txt", from = "open"): void {
  const project = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(project, "utf8"));
  data.nodes[0].children = [...(data.nodes[0].children ?? []), node("our generators", {
    refs: [{ type: "refines", to: OWN_GENERATORS }],
    list: { of: "the project's own generators", property: "name", members: [{ name: "titles" }] },
  })];
  writeFileSync(project, JSON.stringify(data, null, 2) + "\n");
  writeFileSync(join(root, "gen.mjs"), [
    'let input = "";',
    'process.stdin.on("data", (c) => (input += c)).on("end", () => {',
    `  const open = JSON.parse(input).nodes.find((n) => n.sid === "${sid(from)}");`,
    `  console.log(JSON.stringify([{ path: "${path}", content: open.title + "\\n", sids: [open.sid] }]));`,
    '});',
  ].join("\n"));
  const config = JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8"));
  config.generators = [{ rule: sid("our generators"), name: "titles", command: "node gen.mjs", code: ["gen.mjs"], tests: [] }];
  writeFileSync(join(root, "sheriff.config.json"), JSON.stringify(config));
  reindex(root);
  approve(root, [sid("our generators")], { me: OWNER });
  reindex(root);
}
