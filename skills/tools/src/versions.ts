import type { CodeFile, CodeSymbol, CodeTest, Tag } from "./code.ts";

/**
 * A part of a file whose two versions a commit compares (s-2x58az67bm6cxq2): a symbol, a test, or the file's own code. The
 * file's own code is the code outside every symbol, imports aside, or, in a file bound as a whole, the whole file.
 */
export interface Unit {
  kind: "symbol" | "test" | "file";
  /**
   * A symbol's key is its name, preceded by the names of the symbols it is nested in. A test's key is `test:` followed by its
   * name. The key of the file's own code is the empty string.
   */
  key: string;
  tags: Tag[];
  /** The unit's syntax tree with comments left out (s-u6mj5yv8ngnz79v), or its text where no grammar parses it. */
  shape: string;
  text: string;
  symbol?: CodeSymbol;
  test?: CodeTest;
  /** For a unit that the commit changes: the same unit in the commit's parent. */
  was?: Unit;
}

/** What a commit adds, changes and removes in one file: each unit as the commit leaves it, or as the parent holds it where it is removed. */
export interface FileComparison {
  added: Unit[];
  changed: Unit[];
  removed: Unit[];
}

/** The text of a SpecTag, by which two SpecTags are recognised as the same (s-2x58az67bm6cxq2). */
export const tagText = (t: Tag): string => (t.sid ? `@spec ${t.sid}` : `@spec none ${t.none}`);

/**
 * The units of a file, each keyed so that a unit in the parent commit's version is matched with the same unit after the commit. A
 * file of tests holds only its tests as units: its own code and its helpers carry no SpecTag (s-2x58az67bm6cxq2).
 */
export function unitsOf(file: CodeFile, tests = false): Unit[] {
  const units: Unit[] = [];
  const seen = new Map<string, number>();
  // Two symbols or tests of the same name are told apart by their order.
  const keyed = (key: string) => {
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    return n ? `${key}#${n}` : key;
  };
  const visit = (s: CodeSymbol, outer: string) => {
    const key = keyed(`${outer}${s.name}`);
    units.push({ kind: "symbol", key, tags: s.tags, shape: s.shape, text: s.text, symbol: s });
    for (const inner of s.inner) visit(inner, `${key}/`);
  };
  if (!tests) file.symbols.forEach((s) => visit(s, ""));
  for (const t of file.tests) {
    units.push({ kind: "test", key: keyed(`test:${t.name}`), tags: t.sid ? [{ line: t.at, sid: t.sid }] : [], shape: t.shape, text: t.text, test: t });
  }
  if (!tests && (file.whole || file.fileShape || file.fileTags.length)) units.push({ kind: "file", key: "", tags: file.fileTags, shape: file.fileShape, text: file.fileText });
  return units;
}

/**
 * Compares a file in the commit's parent with the same file after the commit (s-2x58az67bm6cxq2). A unit counts as changed
 * where the syntax trees of its two versions differ (s-u6mj5yv8ngnz79v), or where its SpecTags differ. Where the grammar finds a syntax error in either
 * version, the texts are compared instead of the trees. A test that the commit renames, keeping its SpecTag and changing
 * nothing else in it, stays the same test.
 */
export function compareFiles(was: CodeFile | null, now: CodeFile | null, tests = false): FileComparison {
  const textual = Boolean(was?.syntaxError || now?.syntaxError);
  const tags = (u: Unit) => u.tags.map(tagText).sort().join("\n");
  const same = (a: Unit, b: Unit) => (textual ? a.text === b.text : a.shape === b.shape) && tags(a) === tags(b);
  const old = was ? unitsOf(was, tests) : [];
  const byKey = new Map(old.map((u) => [`${u.kind}:${u.key}`, u]));
  const kept = new Set<Unit>();
  const out: FileComparison = { added: [], changed: [], removed: [] };
  for (const u of now ? unitsOf(now, tests) : []) {
    const o = byKey.get(`${u.kind}:${u.key}`);
    if (!o) out.added.push(u);
    else {
      kept.add(o);
      if (!same(o, u)) out.changed.push({ ...u, was: o });
    }
  }
  const removed = old.filter((o) => !kept.has(o));
  out.added = out.added.filter((u) => {
    const i = u.kind === "test" ? removed.findIndex((o) => o.kind === "test" && same(o, u)) : -1;
    if (i >= 0) removed.splice(i, 1);
    return i < 0;
  });
  out.removed = removed;
  return out;
}
