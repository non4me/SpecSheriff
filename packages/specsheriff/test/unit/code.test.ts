import { test } from "node:test";
import assert from "node:assert/strict";
import { readCode } from "../../src/code.ts";

const A = "s-aaaaaaaaaaaaaab";
const B = "s-aaaaaaaaaaaaaac";

test("s-5z5gnu7pahr82xp reads a tag in the doc comment directly above a TypeScript symbol, several where it carries several", async () => {
  const file = await readCode("src/a.ts", `/**\n * Opens an account.\n * @spec ${A}\n * @spec ${B}\n */\nexport function open() {}\n\n/** @spec none glue the framework needs */\nexport const glue = 1;\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid ?? `none: ${t.none}`), s.start, s.end]), [
    ["open", [A, B], 6, 6],
    ["glue", ["none: glue the framework needs"], 9, 9],
  ]);
  assert.deepEqual(file!.problems, []);
});

test("s-5z5gnu7pahr82xp finds a symbol carrying no tag, and a tag not directly above a symbol", async () => {
  const file = await readCode("src/a.ts", `/** @spec ${A} */\n\nfunction apart() {}\n\nclass Plain {}\n\n// @spec ${A}\nfunction lineComment() {}\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.length]), [["apart", 0], ["Plain", 0], ["lineComment", 0]]);
  assert.deepEqual(file!.problems.map((p) => p.line), [1, 7]);
  assert.match(file!.problems[0]!.message, /stands on no symbol/);
});

test("s-5z5gnu7pahr82xp refuses a tag sharing its line with anything but the comment's delimiters", async () => {
  const file = await readCode("src/a.ts", `/** Opens it. @spec ${A} */\nexport function open() {}\n`);
  assert.equal(file!.problems.length, 1);
  assert.match(file!.problems[0]!.message, /shares its line/);
});

test("s-5z5gnu7pahr82xp covers a member by the tag of the class it stands in", async () => {
  const file = await readCode("src/a.ts", `/** @spec ${A} */\nexport class Account {\n  open() {}\n  close() {}\n}\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.start, s.end]), [["Account", 2, 5]]);
});

test("s-5z5gnu7pahr82xp lets the first of a run of re-exports say for the whole run that it implements no rule", async () => {
  const file = await readCode("src/index.ts", `/** @spec none the package's entry point */\nexport { open } from "./a.ts";\nexport * from "./b.ts";\n\nexport { close } from "./c.ts";\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.start, s.tags.length]), [[2, 1], [3, 1], [5, 0]]);
});

test("s-5z5gnu7pahr82xp reads a Python tag in the comment lines above a symbol's decorators, and an assignment at the module's level", async () => {
  const file = await readCode("app/a.py", `# Opening.\n# @spec ${A}\n@cached\ndef open_account():\n    pass\n\n# @spec none a constant of the stack\nLIMIT = 3\n\nclass Plain:\n    pass\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid ?? "none"), s.start, s.end]), [
    ["open_account", [A], 3, 5],
    ["LIMIT", ["none"], 8, 8],
    ["Plain", [], 10, 11],
  ]);
});

test("s-zrsc6asgmhv8tnc reads the sid a TypeScript test opens its name with, a template's leading text included", async () => {
  const file = await readCode("test/a.test.ts", `test("${A} opens an account", () => {});\nit(\`${B} closes \${x}\`, () => {});\ntest(\`\${R} reads\`, () => {});\ndescribe("group", () => { test("no sid", () => {}); });\n`);
  assert.deepEqual(file!.tests.map((t) => [t.sid, t.start]), [[A, 1], [B, 2], [null, 3], [null, 4]]);
  assert.equal(file!.tests[0]!.name, `${A} opens an account`);
});

test("s-zrsc6asgmhv8tnc reads the sid a Python test declares by its mark", async () => {
  const file = await readCode("tests/test_a.py", `import pytest\n\n@pytest.mark.spec("${A}")\ndef test_open():\n    pass\n\ndef test_bare():\n    pass\n\nclass TestGroup:\n    @pytest.mark.spec("${B}")\n    def test_inner(self):\n        pass\n`);
  assert.deepEqual(file!.tests.map((t) => [t.name, t.sid]), [["test_open", A], ["test_bare", null], ["TestGroup.test_inner", B]]);
});

test("s-5z5gnu7pahr82xp reads nothing of a file in a language no description covers", async () => {
  assert.equal(await readCode("notes.txt", "@spec s-aaaaaaaaaaaaaab"), null);
});
