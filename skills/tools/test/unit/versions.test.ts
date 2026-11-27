import { test } from "node:test";
import assert from "node:assert/strict";
import { readCode } from "../../src/code.ts";
import { compareFiles } from "../../src/versions.ts";
import { sid } from "../fixture.ts";

const A = sid("a");
const B = sid("b");

/** The keys of what a commit adds, changes and removes in a file, from its version in the parent to its version after the commit. */
async function compare(path: string, was: string | null, now: string | null) {
  const c = compareFiles(was === null ? null : await readCode(path, was), now === null ? null : await readCode(path, now), /^tests?\//.test(path));
  return { added: c.added.map((u) => u.key), changed: c.changed.map((u) => u.key), removed: c.removed.map((u) => u.key) };
}
const NOTHING = { added: [], changed: [], removed: [] };

test("@spec s-u6mj5yv8ngnz79v counts as unchanged a call re-wrapped onto several lines with a comment added above it, and as changed a renamed identifier", async () => {
  const was = `/** @spec ${A} */\nexport function mail() {\n  send(to, subject, body);\n}\n`;
  assert.deepEqual(await compare("src/mail.ts", was, `/** @spec ${A} */\nexport function mail() {\n  // Sends the mail.\n  send(\n    to,\n    subject,\n    body\n  );\n}\n`), NOTHING);
  assert.deepEqual(await compare("src/mail.ts", was, was.replace("subject", "title")), { ...NOTHING, changed: ["mail"] });
});

test("@spec s-u6mj5yv8ngnz79v counts as unchanged a test renamed with its SpecTag kept, and as changed a test whose body changes", async () => {
  const was = `test("@spec ${A} refuses an empty name", () => {\n  check("");\n});\n`;
  assert.deepEqual(await compare("test/a.test.ts", was, was.replace("an empty", "a blank")), NOTHING);
  assert.deepEqual(await compare("test/a.test.ts", was, was.replace(`check("")`, `check(" ")`)), { ...NOTHING, changed: [`test:@spec ${A} refuses an empty name`] });
  assert.deepEqual(await compare("tests/test_a.py", `import pytest\n\n@pytest.mark.spec("@spec ${A}")\ndef test_empty():\n    check("")\n`, `import pytest\n\n@pytest.mark.spec("@spec ${A}")\ndef test_blank():\n    check("")\n`), NOTHING);
});

test("@spec s-u6mj5yv8ngnz79v compares a file bound as a whole in YAML, CSS, SQL or Bash by its syntax tree, comments and spacing left out", async () => {
  assert.deepEqual(await compare("conf/app.yml", "# @spec none the settings\na:\n  b: 1\nretries: 2\n", "# @spec none the settings\n# Retries.\na:\n  b: 1\nretries:   2\n"), NOTHING);
  assert.deepEqual(await compare("conf/app.yml", "a:\n  b: 1\nretries: 2\n", "a:\n  b: 1\n  retries: 2\n"), { ...NOTHING, changed: [""] });
  assert.deepEqual(await compare("src/page.css", "/* The page. */\na:hover { color: red; }\n", "/* The whole page. */\na:hover {\n  color: red;\n}\n"), NOTHING);
  assert.deepEqual(await compare("src/page.css", "a:hover { color: red; }\n", "a :hover { color: red; }\n"), { ...NOTHING, changed: [""] });
  assert.deepEqual(await compare("db/schema.sql", "-- The accounts.\ncreate table account (id int);\n", "-- Every account.\ncreate table account (\n  id int\n);\n"), NOTHING);
  assert.deepEqual(await compare("bin/run.sh", "#!/bin/sh\n# Runs it.\nx=1\n", "#!/bin/sh\n# Runs the server.\nx=1\n"), NOTHING);
  assert.deepEqual(await compare("bin/run.sh", "#!/bin/sh\nx=1\n", "#!/bin/sh\nx = 1\n"), { ...NOTHING, changed: [""] });
  assert.deepEqual(await compare("bin/run.sh", "#!/bin/sh\nx=1\n", "#!/bin/bash\nx=1\n"), { ...NOTHING, changed: [""] });
});

test("@spec s-u6mj5yv8ngnz79v compares by their text two versions of a file in a language with no grammar, or where the grammar finds a syntax error in either", async () => {
  assert.deepEqual(await compare("docs/page.txt", "one\n", "one \n"), { ...NOTHING, changed: [""] });
  assert.deepEqual(await compare("src/page.css", "a { color: red; }\n/* x */\n", "a { color: red;\n/* y */\n"), { ...NOTHING, changed: [""] });
});

test("@spec s-u6mj5yv8ngnz79v leaves each $comment of a JSON Schema file out of its tree, other than the SpecTags in it", async () => {
  const schema = (comment: string, type = "object") => JSON.stringify({ $schema: "https://json-schema.org/draft/2020-12/schema", $defs: { Account: { $comment: comment, type } } }, null, 2) + "\n";
  assert.deepEqual(await compare("schemas/s.json", schema(`@spec ${A}\nAn account.`), schema(`@spec ${A}\nAn account of the ledger.`)), NOTHING);
  assert.deepEqual(await compare("schemas/s.json", schema(`@spec ${A}\nAn account.`), schema(`@spec ${B}\nAn account.`)), { ...NOTHING, changed: ["Account"] });
  assert.deepEqual(await compare("schemas/s.json", schema(`@spec ${A}`), schema(`@spec ${A}`, "string")), { ...NOTHING, changed: ["Account"] });
});

test("@spec s-2x58az67bm6cxq2 counts a symbol whose lines the commit deletes as changed, one it deletes whole as removed, and one it writes as added", async () => {
  const was = `export function close() {\n  log(id);\n  shut(id);\n}\n\nexport function gone() {}\n`;
  assert.deepEqual(await compare("src/a.ts", was, `export function close() {\n  shut(id);\n}\n\nexport function come() {}\n`), { added: ["come"], changed: ["close"], removed: ["gone"] });
  assert.deepEqual(await compare("src/a.ts", null, was), { added: ["close", "gone"], changed: [], removed: [] });
  assert.deepEqual(await compare("src/a.ts", was, null), { added: [], changed: [], removed: ["close", "gone"] });
});

test("@spec s-2x58az67bm6cxq2 counts as unchanged a SpecTag whose comment is reformatted around it, and as changed a symbol whose SpecTag's text changes", async () => {
  const was = `/** @spec ${A} */\nexport const a = 1;\n\n/** @spec none glue */\nexport const b = 2;\n`;
  assert.deepEqual(await compare("src/a.ts", was, `/**\n * Says why.\n * @spec ${A}\n */\nexport const a = 1;\n\n/** @spec none glue */\nexport const b = 2;\n`), NOTHING);
  assert.deepEqual(await compare("src/a.ts", was, was.replace("@spec none glue", "@spec none glue the framework needs")), { ...NOTHING, changed: ["b"] });
});

test("@spec s-2x58az67bm6cxq2 treats the code outside every symbol, imports aside, as one more symbol, named by its file alone", async () => {
  const was = `import { x } from "./x.ts";\n\nexport const a = 1;\nx();\n`;
  assert.deepEqual(await compare("src/main.ts", was, was.replace(`"./x.ts"`, `"./y.ts"`)), NOTHING);
  assert.deepEqual(await compare("src/main.ts", was, was.replace("x();", "x(2);")), { ...NOTHING, changed: [""] });
  assert.deepEqual(await compare("src/main.ts", `export const a = 1;\n`, `export const a = 1;\nx();\n`), { ...NOTHING, added: [""] });
});
