import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { confirm } from "../src/confirmations.ts";
import { reindex } from "../src/reindex.ts";
import { DATA_STRUCTURES, writeTypes } from "../src/types.ts";
import { file, node, OWNER, repo, sid, taking } from "./fixture.ts";

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
export const OPEN_TEST = `test("${sid("open")} opens an account", () => {});\n`;

/** A project whose code and tests agree with its specification, committed. */
export function codeProject(): string {
  const root = repo({
    "sheriff.config.json": { code: ["src/**"], tests: ["test/**"], writesSpecSheriffGuidelines: true },
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours." })),
    "specs/contracts/c.json": file("contracts", "c", node("accounts", { kind: "section", text: "Accounts.", children: [
      node("open", { meta: { code: [{ file: "src/open.ts" }], tests: [`test/open.test.ts::${sid("open")} opens an account`] } }),
      node("draft"),
      node("states", { list: { of: "the states of an account", members: ["open", "closed"], declaredIn: { file: "src/states.ts", declaration: "State" } }, meta: { code: [{ file: "src/states.ts", symbols: ["State"] }] } }),
    ] })),
    "src/open.ts": OPEN,
    "src/states.ts": `/** @spec ${sid("states")} */\nexport type State = "open" | "closed";\n`,
    "test/open.test.ts": OPEN_TEST,
    "README.md": `See §${sid("open")}.\n`,
  });
  reindex(root);
  confirm(root, [sid("open"), sid("states"), sid("accounts")], { me: OWNER });
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
      node("customer", { kind: "record", title, fields: [{ name: "number", type: { is: "text" }, required: true, text: "" }], unknown: "refused", meta: { code: [{ file: "src/types.ts" }] } }),
    ] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [
      node("generated types", { refs: [{ type: "implements", to: DATA_STRUCTURES }], list: { of: "the files of the generated types and runtime checks", members: ["src/types.ts", "schemas/checks.json"] } }),
    ] })),
  });
  confirm(root, [sid("customer")], { me: OWNER });
  writeTypes(root);
  git(root, "init", "-q");
  git(root, "config", "user.email", OWNER);
  git(root, "config", "user.name", "Owner");
  git(root, "add", "-A");
  git(root, "commit", "-qm", "first");
  return root;
}
