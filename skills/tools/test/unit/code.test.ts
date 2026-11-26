import { test } from "node:test";
import assert from "node:assert/strict";
import { readCode } from "../../src/code.ts";
import { sid } from "../fixture.ts";

const A = sid("a");
const B = sid("b");

test("@spec s-33fw3ga4ctd94dq reads a SpecTag in the doc comment directly above a TypeScript symbol, and several where the symbol has several", async () => {
  const file = await readCode("src/a.ts", `/**\n * Opens an account.\n * @spec ${A}\n * @spec ${B}\n */\nexport function open() {}\n\n/** @spec none glue the framework needs */\nexport const glue = 1;\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid ?? `none: ${t.none}`), s.start, s.end]), [
    ["open", [A, B], 6, 6],
    ["glue", ["none: glue the framework needs"], 9, 9],
  ]);
  assert.deepEqual(file!.problems, []);
});

test("@spec s-33fw3ga4ctd94dq finds a symbol with no SpecTag, and a SpecTag not directly above a symbol", async () => {
  const file = await readCode("src/a.ts", `const x = 1;\n/** @spec ${A} */\n\nfunction apart() {}\n\nclass Plain {}\n\n// @spec ${A}\nfunction lineComment() {}\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.length]), [["x", 0], ["apart", 0], ["Plain", 0], ["lineComment", 0]]);
  assert.deepEqual(file!.problems.map((p) => p.line), [2, 8]);
  assert.match(file!.problems[0]!.message, /stands on no symbol/);
  assert.deepEqual(file!.fileTags, []);
});

test("@spec s-33fw3ga4ctd94dq refuses a SpecTag sharing its line with anything but the comment's delimiters", async () => {
  const file = await readCode("src/a.ts", `/** Opens it. @spec ${A} */\nexport function open() {}\n`);
  assert.equal(file!.problems.length, 1);
  assert.match(file!.problems[0]!.message, /shares its line/);
});

test("@spec s-33fw3ga4ctd94dq covers a member by the SpecTag of the class it is in", async () => {
  const file = await readCode("src/a.ts", `/** @spec ${A} */\nexport class Account {\n  open() {}\n  close() {}\n}\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.start, s.end]), [["Account", 2, 5]]);
});

test("@spec s-33fw3ga4ctd94dq lets the first of a run of re-exports say for the whole run that it implements no rule, and passes no other SpecTag on to the rest of the run", async () => {
  const file = await readCode("src/index.ts", `/** @spec none the package's entry point */\nexport { open } from "./a.ts";\nexport * from "./b.ts";\n\nexport { close } from "./c.ts";\n\n/** @spec ${A} */\nexport { shut } from "./d.ts";\nexport { lock } from "./e.ts";\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.start, s.tags.length]), [[2, 1], [3, 1], [5, 0], [8, 1], [9, 0]]);
});

test("@spec s-33fw3ga4ctd94dq reads a Python SpecTag in the comment lines above a symbol's decorators, and one above an assignment at module level", async () => {
  const file = await readCode("app/a.py", `# Opening.\n# @spec ${A}\n@cached\ndef open_account():\n    pass\n\n# @spec none a constant of the stack\nLIMIT = 3\n\nclass Plain:\n    pass\n`);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid ?? "none"), s.start, s.end]), [
    ["open_account", [A], 3, 5],
    ["LIMIT", ["none"], 8, 8],
    ["Plain", [], 10, 11],
  ]);
});

test("@spec s-zrsc6asgmhv8tnc reads the SpecTag a TypeScript test opens its name with, a template's leading text included", async () => {
  const file = await readCode("test/a.test.ts", `test("@spec ${A} opens an account", () => {});\nit(\`@spec ${B} closes \${x}\`, () => {});\ntest(\`\${R} reads\`, () => {});\ndescribe("group", () => { test("no sid", () => {}); });\ntest("@spec ${A}", () => {});\ntest("@spec ${A}x stuck to a word", () => {});\n`);
  assert.deepEqual(file!.tests.map((t) => [t.sid, t.start]), [[A, 1], [B, 2], [null, 3], [null, 4], [A, 5], [null, 6]]);
  assert.equal(file!.tests[0]!.name, `@spec ${A} opens an account`);
});

test("@spec s-utf4mbt7ref8g9c reads a sid a test carries bare, opening its name or as its mark, as no SpecTag, and keeps it to name", async () => {
  const ts = await readCode("test/a.test.ts", `test("${A} opens an account", () => {});\nit("${B}", () => {});\ntest("${A}x not a sid", () => {});\ntest("@spec ${A} tagged", () => {});\n`);
  assert.deepEqual(ts!.tests.map((t) => [t.sid, t.bare]), [[null, A], [null, B], [null, null], [A, null]]);
  const py = await readCode("tests/test_a.py", `import pytest\n\n@pytest.mark.spec("${A}")\ndef test_open():\n    pass\n\n@pytest.mark.spec("@spec ${B}")\ndef test_close():\n    pass\n`);
  assert.deepEqual(py!.tests.map((t) => [t.name, t.sid, t.bare]), [["test_open", null, A], ["test_close", B, null]]);
});

test("@spec s-jgejd5rpd9d43pd reads a TypeScript test its framework is told to skip, by its call or by its options, as skipped", async () => {
  const file = await readCode("test/a.test.ts", `test("@spec ${A} runs", () => {});\ntest.skip("@spec ${A} skipped", () => {});\nit.todo("@spec ${A} to do");\ntest("@spec ${A} skipped by option", { skip: true }, () => {});\ntest("@spec ${A} not skipped", { skip: false }, () => {});\n`);
  assert.deepEqual(file!.tests.map((t) => [t.name.slice(`@spec ${A} `.length), t.skipped]), [["runs", false], ["skipped", true], ["to do", true], ["skipped by option", true], ["not skipped", false]]);
});

test("@spec s-jgejd5rpd9d43pd reads a Python test marked to be skipped or expected to fail as skipped", async () => {
  const file = await readCode("tests/test_a.py", `import pytest\n\n@pytest.mark.spec("@spec ${A}")\ndef test_runs():\n    pass\n\n@pytest.mark.skip(reason="later")\n@pytest.mark.spec("@spec ${A}")\ndef test_skipped():\n    pass\n\n@pytest.mark.xfail\n@pytest.mark.spec("@spec ${A}")\ndef test_failing():\n    pass\n`);
  assert.deepEqual(file!.tests.map((t) => [t.name, t.skipped]), [["test_runs", false], ["test_skipped", true], ["test_failing", true]]);
});

test("@spec s-zrsc6asgmhv8tnc reads the SpecTag a Python test declares by its mark", async () => {
  const file = await readCode("tests/test_a.py", `import pytest\n\n@pytest.mark.spec("@spec ${A}")\ndef test_open():\n    pass\n\ndef test_bare():\n    pass\n\nclass TestGroup:\n    @pytest.mark.spec('@spec ${B}')\n    def test_inner(self):\n        pass\n`);
  assert.deepEqual(file!.tests.map((t) => [t.name, t.sid]), [["test_open", A], ["test_bare", null], ["TestGroup.test_inner", B]]);
});

test("@spec s-5qdjyf6t898rsd4 reads the SpecTags at the start of a file in a language that no language description covers, after a shebang or a declaration, as binding the whole file", async () => {
  const css = await readCode("src/page.css", `/* @spec ${A}\n   @spec none the reset the browsers need */\n\nbody { margin: 0; }\n/* @spec ${B} */\n`);
  assert.equal(css!.whole, true);
  assert.deepEqual(css!.symbols, []);
  assert.deepEqual(css!.fileTags.map((t) => [t.line, t.sid ?? `none: ${t.none}`]), [[1, A], [2, "none: the reset the browsers need"]]);
  const sh = await readCode("bin/run.sh", `#!/bin/sh\n# @spec ${A}\nexec node main.js\n`);
  assert.deepEqual(sh!.fileTags.map((t) => t.sid), [A]);
  const xml = await readCode("src/page.xml", `<?xml version="1.0"?>\n<!-- @spec none the format the feed requires -->\n<feed/>\n`);
  assert.deepEqual(xml!.fileTags.map((t) => t.none), ["the format the feed requires"]);
});

test("@spec s-5qdjyf6t898rsd4 reads no SpecTag after the first line that holds a letter or a digit outside a SpecTag, and none in a file whose format allows no comments", async () => {
  const sql = await readCode("db/schema.sql", `-- The accounts.\n-- @spec ${A}\ncreate table account (id int);\n`);
  assert.deepEqual(sql!.fileTags, []);
  const json = await readCode("src/texts.json", `{ "@spec ${A}": 1 }\n`);
  assert.equal(json!.whole, true);
  assert.deepEqual(json!.fileTags, []);
  const listed = await readCode("src/texts.yml", `# @spec ${A}\nkey: value\n`, { allowsComments: false });
  assert.deepEqual(listed!.fileTags, []);
});

test("@spec s-5z5gnu7pahr82xp refuses a text that opens with @spec but has neither form of a SpecTag, naming the forms", async () => {
  const file = await readCode("src/a.ts", `/** @spec none */\nexport const a = 1;\n\n/** @spec s-short */\nexport const b = 2;\n`);
  assert.deepEqual(file!.problems.map((p) => p.line), [1, 4]);
  for (const p of file!.problems) assert.match(p.message, /neither form of a SpecTag: `@spec <sid>` or `@spec none <statement>`/);
  const start = await readCode("src/page.css", `/* @spec none */\nbody {}\n`);
  assert.deepEqual(start!.problems.map((p) => p.line), [1]);
});

test("@spec s-5z5gnu7pahr82xp refuses each SpecTag on code that carries @spec none together with another SpecTag", async () => {
  const file = await readCode("src/a.ts", `/**\n * @spec ${A}\n * @spec none glue the framework needs\n */\nexport const a = 1;\n\n/** @spec none glue */\nexport const b = 2;\n`);
  assert.deepEqual(file!.problems.map((p) => p.line), [2, 3]);
  for (const p of file!.problems) assert.match(p.message, /`@spec none` beside another SpecTag/);
});

test("@spec s-33fw3ga4ctd94dq reads the SpecTags of the code outside every symbol in the file's first comment, before any code and after a shebang, and the lines of that code, imports aside", async () => {
  const ts = await readCode("src/main.ts", `#!/usr/bin/env node\n/**\n * Starts the server.\n * @spec ${A}\n */\n\nimport { serve } from "./serve.ts";\n\n/** @spec ${B} */\nexport function port() { return 80; }\n\nserve(port());\n`);
  assert.deepEqual(ts!.fileTags.map((t) => [t.line, t.sid]), [[4, A]]);
  assert.deepEqual(ts!.outside, [12]);
  assert.deepEqual(ts!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid)]), [["port", [B]]]);
  assert.deepEqual(ts!.problems, []);
  const above = await readCode("src/a.ts", `/** @spec ${A} */\nexport function a() {}\n`);
  assert.deepEqual(above!.fileTags, [], "a first comment directly above a symbol is the symbol's");
  const late = await readCode("src/b.ts", `import x from "x";\n// @spec ${A}\n\nx();\n`);
  assert.deepEqual(late!.fileTags, [], "a comment after code is not the file's first comment");
  assert.deepEqual(late!.problems.map((p) => p.line), [2]);
});

test("@spec s-33fw3ga4ctd94dq reads a run of Python comment lines as one first comment, after a shebang", async () => {
  const py = await readCode("app/main.py", `#!/usr/bin/env python\n# Starts the server.\n# @spec ${A}\n\nimport os\n\n# @spec ${B}\ndef port():\n    return 80\n\nserve(port())\n`);
  assert.deepEqual(py!.fileTags.map((t) => [t.line, t.sid]), [[3, A]]);
  assert.deepEqual(py!.outside, [11]);
  assert.deepEqual(py!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid)]), [["port", [B]]]);
});

test("@spec s-33fw3ga4ctd94dq reads a file in JSON Schema: its definitions as symbols with the SpecTags in their $comment, the top-level $comment for the code outside them, and $schema as its import", async () => {
  const text = JSON.stringify({
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $comment: `@spec ${A}\nThe shapes of the ledger.`,
    title: "Ledger",
    $defs: {
      Account: { $comment: `@spec ${B}\nAn account.`, $anchor: B, type: "object", properties: { state: { enum: ["open", "closed"] } } },
      Plain: { type: "string" },
      Wrong: { $comment: `see @spec ${B}`, type: "string" },
    },
  }, null, 2) + "\n";
  const file = await readCode("schemas/ledger.json", text);
  assert.equal(file!.whole, false);
  assert.deepEqual(file!.symbols.map((s) => [s.name, s.tags.map((t) => t.sid)]), [["Account", [B]], ["Plain", []], ["Wrong", []]]);
  assert.deepEqual(file!.fileTags.map((t) => t.sid), [A]);
  assert.deepEqual(file!.outside, [4]);
  assert.deepEqual(file!.symbols[0]!.strings.filter((s) => s === "open" || s === "closed"), ["open", "closed"]);
  assert.deepEqual(file!.problems.map((p) => p.line), [text.split("\n").findIndex((l) => l.includes("see @spec")) + 1]);
  const plain = await readCode("src/texts.json", JSON.stringify({ $schema: "http://json-schema.org/draft-07/schema#", $defs: {} }));
  assert.equal(plain!.whole, true, "a JSON file of another dialect is bound as a whole");
});
