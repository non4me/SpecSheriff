import { readdirSync, readFileSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import { Language, Parser, type Node } from "web-tree-sitter";

/** A description of a language: what counts as a symbol, an import and a test in it. */
interface Description {
  extensions: string[];
  /** For a dialect of JSON: the `$schema` of the top-level object of each file that the description covers. */
  dialect?: string;
  grammars: Record<string, string>;
  comment: string;
  /** doc: a SpecTag is written in a doc comment, /** … *\/; line: in the comment lines above the symbol; property: in the symbol's `$comment`. */
  tagComment: "doc" | "line" | "property";
  symbols: string[];
  /** The kinds of statement that are imports; in a dialect of JSON, the keys of the top-level object that are imports. */
  imports: string[];
  export: string | null;
  decorated: string | null;
  /** skips: what tells the framework to skip a test — a member of the call or a key of its options, or a mark. */
  tests: { calls?: string[]; functions?: string; mark?: string; skips?: string[] };
}

export interface Tag {
  line: number;
  sid?: string;
  /** The reason given by a tag that names no node. */
  none?: string;
}

export interface CodeSymbol {
  name: string;
  /** Its first and last line, decorators and export included, the comment above it not. */
  start: number;
  end: number;
  tags: Tag[];
  /** The symbols inside it carrying tags of their own. */
  inner: CodeSymbol[];
  /** The text of every string literal in it: the members of a list it declares, where it declares one. */
  strings: string[];
  /** The symbol's syntax tree, with its comments left out (s-u6mj5yv8ngnz79v). */
  shape: string;
  text: string;
}

export interface CodeTest {
  name: string;
  /** The sid its SpecTag names, `@spec <sid>` opening its name or standing in its mark. */
  sid: string | null;
  /** A sid it carries bare where its SpecTag stands, as an earlier release read it: no SpecTag. */
  bare: string | null;
  /** The line of the name or the mark where the SpecTag or the bare sid stands. */
  at: number;
  start: number;
  end: number;
  /** Its framework is told to skip it, or to expect it to fail, so it does not run as a passing test. */
  skipped: boolean;
  /** The test's syntax tree, with its comments left out and its name left out except for its SpecTag (s-u6mj5yv8ngnz79v). */
  shape: string;
  text: string;
}

export interface CodeFile {
  path: string;
  symbols: CodeSymbol[];
  tests: CodeTest[];
  problems: Array<{ line: number; message: string }>;
  /**
   * The SpecTags of the code outside every symbol, imports aside (s-33fw3ga4ctd94dq), or, in a file bound as a whole, the
   * SpecTags of the whole file (s-5qdjyf6t898rsd4).
   */
  fileTags: Tag[];
  /** Whether the file is bound as a whole. A file is bound as a whole where no language description covers its language. */
  whole: boolean;
  /** Each line of the code outside every symbol, other than imports. */
  outside: number[];
  /**
   * The syntax tree of the file's own code, with its comments left out. The file's own code is the code outside every symbol,
   * imports aside, or the whole file where the file is bound as a whole. Where no grammar parses the file, this is the text of
   * that code.
   */
  fileShape: string;
  fileText: string;
  /** Whether the grammar finds a syntax error in the file. Where it does, two versions of the file are compared by their text. */
  syntaxError: boolean;
  /** Whether the file is bound as a whole and its format allows no comments, so that its SpecTags come from the bindings file. */
  fromBindings?: boolean;
  /** The comments of the file, where the SpecSheriff tools build its syntax tree (s-7vpsdsy8dpqdy6r). */
  comments?: CodeComment[];
}

/** A comment in a file: its lines, its text, and the text by which two versions of the file are compared. */
export interface CodeComment {
  start: number;
  end: number;
  text: string;
  /** The comment's text without its SpecTags and its whitespace; empty where no letter or digit is left. */
  key: string;
}

const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
const LEADING_SID = /^(s-[2-9a-hjkmnp-z]{15})(?=\s|$)/;
const LEADING_TAG = /^@spec (s-[2-9a-hjkmnp-z]{15})(?=\s|$)/;
const TAG = /^@spec (?:(s-[2-9a-hjkmnp-z]{15})|none (\S.*))$/;
const NEITHER = "a text opening with `@spec` has neither form of a SpecTag: `@spec <sid>` or `@spec none <statement>`";
const NONE_BESIDE = "a SpecTag on code that carries `@spec none` beside another SpecTag: code that implements no rule carries `@spec none` as its only SpecTag";
const DIALECT_KEYS = ["$schema", "$defs", "$comment"];

/** The grammar of each file bound as a whole that the SpecSheriff tools parse to compare two versions of it (s-u6mj5yv8ngnz79v). */
const WHOLE_GRAMMARS: Record<string, string> = {
  ".yaml": "tree-sitter-yaml.wasm",
  ".yml": "tree-sitter-yaml.wasm",
  ".css": "tree-sitter-css.wasm",
  ".sql": "tree-sitter-sql.wasm",
  ".sh": "tree-sitter-bash.wasm",
  ".json": "tree-sitter-json.wasm",
};
/** The kinds of node that are comments in those grammars: `marginalia` is a block comment in SQL. */
const WHOLE_COMMENTS = new Set(["comment", "marginalia", "js_comment"]);

const descriptions: Description[] = readdirSync(new URL("../languages/", import.meta.url))
  .filter((n) => n.endsWith(".json"))
  .map((n) => JSON.parse(readFileSync(new URL(`../languages/${n}`, import.meta.url), "utf8")));

let ready: Promise<void> | null = null;
const languages = new Map<string, Promise<Language>>();

function language(grammar: string): Promise<Language> {
  if (!languages.has(grammar)) languages.set(grammar, Language.load(fileURLToPath(new URL(`../grammars/${grammar}`, import.meta.url))));
  return languages.get(grammar)!;
}

async function parse(grammar: string, text: string) {
  ready ??= Parser.init();
  await ready;
  const parser = new Parser();
  parser.setLanguage(await language(grammar));
  return parser.parse(text)!;
}

/** What goes into a shape in place of a node: nothing (null), the given text (a string), or the node's own shape (undefined). */
type Leave = (n: Node) => string | null | undefined;

/**
 * A node's syntax tree as text (s-u6mj5yv8ngnz79v). It holds the kind of each construct, how the constructs nest and the text
 * of each token, except what `leave` leaves out. It holds none of the whitespace between tokens.
 */
function shapeOf(node: Node, leave: Leave): string {
  const instead = leave(node);
  if (instead !== undefined) return instead ?? "";
  if (node.childCount === 0) return `${node.type}=${JSON.stringify(node.text)}`;
  return `${node.type}(${node.children.flatMap((c) => (c ? [shapeOf(c, leave)] : [])).filter(Boolean).join(" ")})`;
}

/** Whether a syntax-tree node starts on the file's first line and opens with `#!`. A comparison of two versions of code does not leave such a line out. */
const isShebang = (n: Node) => n.startPosition.row === 0 && n.text.startsWith("#!");

/** The description that covers a file, found by its extension and, for a dialect of JSON, by the `$schema` of its top-level object. */
function describe(path: string, text: string): Description | undefined {
  const ext = extname(path);
  return descriptions.find((d) => d.extensions.includes(ext) && (!d.dialect || dialectOf(text) === d.dialect));
}

function dialectOf(text: string): unknown {
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? value.$schema : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The SpecTag that a text opening with `@spec` holds. Where the text has neither form of a SpecTag, `@spec <sid>` or
 * `@spec none <statement>`, the problem is recorded and null is returned.
 */
export function tagOf(content: string, at: number, problems: CodeFile["problems"]): Tag | null {
  const m = TAG.exec(content);
  if (m) return m[1] ? { line: at, sid: m[1] } : { line: at, none: m[2]! };
  problems.push({ line: at, message: NEITHER });
  return null;
}

/** Refuses each SpecTag of code that carries `@spec none` together with another SpecTag (s-5z5gnu7pahr82xp). */
export function noneAlone(tags: Tag[], problems: CodeFile["problems"]): void {
  if (tags.length > 1 && tags.some((t) => t.none !== undefined)) for (const t of tags) problems.push({ line: t.line, message: NONE_BESIDE });
}

/**
 * A file in a language that no description covers, bound as a whole by the SpecTags at its start where its format allows
 * comments (s-5qdjyf6t898rsd4). Those are on the lines before the first line that holds a letter or a digit outside a SpecTag;
 * a first line opening with `#!` or `<?` is skipped.
 */
async function wholeFile(path: string, text: string, allowsComments: boolean): Promise<CodeFile> {
  const file: CodeFile = { path, symbols: [], tests: [], problems: [], fileTags: [], whole: true, outside: [], fileShape: text, fileText: text, syntaxError: false };
  const grammar = WHOLE_GRAMMARS[extname(path)];
  if (grammar) {
    const tree = await parse(grammar, text);
    file.syntaxError = tree.rootNode.hasError;
    file.fileShape = shapeOf(tree.rootNode, (n) => (WHOLE_COMMENTS.has(n.type) && !isShebang(n) ? null : undefined));
    file.comments = [...walk(tree.rootNode)].filter((n) => WHOLE_COMMENTS.has(n.type) && !isShebang(n)).map((n) => commentOf(n.text, line(n), lastLine(n)));
  }
  if (!allowsComments) return file;
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]!;
    if (i === 0 && /^(#!|<\?)/.test(raw)) continue;
    const at = raw.indexOf("@spec");
    if (/[\p{L}\p{N}]/u.test(at < 0 ? raw : raw.slice(0, at))) {
      // A SpecTag after the start of the file binds nothing (s-9rtrj24myzjvshu).
      lines.forEach((later, j) => {
        if (j >= i && later.includes("@spec")) file.problems.push({ line: j + 1, message: "a SpecTag after the start of the file binds nothing: the SpecTags of such a file come before the first line that holds a letter or a digit outside a SpecTag" });
      });
      break;
    }
    if (at < 0) continue;
    // The text after `@spec none` runs to the end of its line, without the characters at the end of the line that are neither letters nor digits.
    const tag = tagOf(raw.slice(at).replace(/[^\p{L}\p{N}]+$/u, ""), i + 1, file.problems);
    if (tag) file.fileTags.push(tag);
  }
  noneAlone(file.fileTags, file.problems);
  return file;
}

/** The text of a comment line with its delimiters taken off. */
function bare(line: string): string {
  return line.trim().replace(/^\/\*\*?/, "").replace(/\*\/$/, "").replace(/^\*(?!\/)/, "").replace(/^(\/\/|#)/, "").trim();
}

/**
 * A comment as it is compared between two versions of a file (s-7vpsdsy8dpqdy6r). The lines that hold a SpecTag are left out,
 * since a change to a SpecTag is a change to the code. Whitespace is left out too.
 */
function commentOf(text: string, start: number, end: number): CodeComment {
  const key = text.split("\n").filter((l) => !bare(l).startsWith("@spec")).join("").replace(/\s+/g, "");
  return { start, end, text, key: /[\p{L}\p{N}]/u.test(key) ? key : "" };
}

/** Every named node of the tree, in the order the text reads. */
function* walk(node: Node): Generator<Node> {
  yield node;
  for (const child of node.namedChildren) if (child) yield* walk(child);
}

const line = (n: Node) => n.startPosition.row + 1;
const lastLine = (n: Node) => n.endPosition.row + 1;

/**
 * Reads a file for its symbols, its tests and their SpecTags. A file in a language that no description covers is bound as a
 * whole. Its format allows no comments when its name ends in `.json`, or when the caller says so for a format that the
 * project's own guidelines list (s-trwczfskj5zmuft).
 */
export async function readCode(path: string, text: string, options: { allowsComments?: boolean } = {}): Promise<CodeFile | null> {
  const description = describe(path, text);
  if (!description) return wholeFile(path, text, !path.endsWith(".json") && options.allowsComments !== false);
  const tree = await parse(description.grammars[extname(path)]!, text);
  if (description.tagComment === "property") return readDialect(path, tree.rootNode, description);
  const file: CodeFile = { path, symbols: [], tests: [], problems: [], fileTags: [], whole: false, outside: [], fileShape: "", fileText: "", syntaxError: tree.rootNode.hasError };
  file.comments = [...walk(tree.rootNode)].filter((n) => n.type === description.comment && !isShebang(n)).map((n) => commentOf(n.text, line(n), lastLine(n)));
  const attached = new Set<number>();
  const comments: Leave = (n) => (n.type === description.comment && !isShebang(n) ? null : undefined);

  /** The comments directly above a node, nearest last, with no blank line between them or below them. */
  const commentsAbove = (node: Node): Node[] => {
    const found: Node[] = [];
    let next = node;
    for (let prev = node.previousNamedSibling; prev && prev.type === description.comment && lastLine(prev) === line(next) - 1; prev = prev.previousNamedSibling) {
      if (description.tagComment === "doc" && !prev.text.startsWith("/**")) break;
      found.unshift(prev);
      next = prev;
      if (description.tagComment === "doc") break;
    }
    return found;
  };

  const tagsOf = (comments: Node[]): Tag[] => {
    const tags: Tag[] = [];
    for (const comment of comments) {
      comment.text.split("\n").forEach((raw, i) => {
        const at = line(comment) + i;
        const content = bare(raw);
        if (!content.includes("@spec")) return;
        attached.add(at);
        if (!content.startsWith("@spec")) file.problems.push({ line: at, message: "a SpecTag shares its line with something other than the comment's delimiters" });
        else {
          const tag = tagOf(content, at, file.problems);
          if (tag) tags.push(tag);
        }
      });
    }
    noneAlone(tags, file.problems);
    return tags;
  };
  const tagsAbove = (node: Node): Tag[] => tagsOf(commentsAbove(node));

  const nameOf = (node: Node): string => {
    const named = node.childForFieldName("name") ?? node.childForFieldName("left");
    if (named) return named.text;
    const declarator = node.namedChildren.find((c) => c?.type === "variable_declarator");
    if (declarator) return declarator.childForFieldName("name")?.text ?? declarator.text;
    const inner = node.childForFieldName("declaration") ?? node.childForFieldName("definition");
    if (inner) return nameOf(inner);
    const source = node.childForFieldName("source");
    if (source) return `export from ${source.text}`;
    if (node.type === description.export) return node.text.startsWith("export default") ? "default" : node.text.replace(/\s+/g, " ").slice(0, 60);
    return node.type;
  };

  /** Symbols inside a symbol that carry tags of their own. */
  const innerTagged = (node: Node): CodeSymbol[] => {
    const inner: CodeSymbol[] = [];
    for (const child of walk(node)) {
      if (child === node || child.type === description.comment) continue;
      const tags = commentsAbove(child).some((c) => c.text.includes("@spec")) ? tagsAbove(child) : [];
      if (tags.length) inner.push({ name: nameOf(child), start: line(child), end: lastLine(child), tags, inner: [], strings: [], shape: shapeOf(child, comments), text: child.text });
    }
    return inner;
  };

  const isSymbol = (node: Node): boolean => {
    if (description.symbols.includes(node.type)) return true;
    if (node.type === description.decorated) return true;
    if (node.type === "expression_statement" && node.namedChildren[0]?.type === "assignment" && description.symbols.includes("assignment")) return true;
    return node.type === description.export;
  };
  const isReExport = (node: Node) => node.type === description.export && node.childForFieldName("source") !== null;

  // The file's first comment, not counting a shebang. In Python, a run of comment lines with no blank line between them is one comment.
  const top = tree.rootNode.namedChildren.filter((n): n is Node => n !== null && !isShebang(n));
  const first: Node[] = [];
  for (const n of top) {
    if (n.type !== description.comment || (first.length && (description.tagComment !== "line" || line(n) !== lastLine(first.at(-1)!) + 1))) break;
    first.push(n);
  }
  const next = top[first.length];
  // The SpecTags of that comment bind the code outside every symbol where the comment comes before any code and is not directly
  // above a symbol.
  if (first.length && top[0] === first[0] && !(next && isSymbol(next) && line(next) === lastLine(first.at(-1)!) + 1)) {
    file.fileTags = tagsOf(first);
  }

  let run: Tag[] | null = null;
  let runEnd = 0;
  for (const node of tree.rootNode.namedChildren) {
    if (!node || !isSymbol(node)) {
      run = null;
      if (node && node.type !== description.comment && !description.imports.includes(node.type) && !isShebang(node)) {
        for (let l = line(node); l <= lastLine(node); l++) file.outside.push(l);
      }
      continue;
    }
    const symbolNode = node.type === "expression_statement" ? node.namedChildren[0]! : node;
    let tags = tagsAbove(node);
    if (isReExport(node)) {
      // Only `@spec none` on the first of a run of re-exports binds the later ones that carry no SpecTag (s-33fw3ga4ctd94dq).
      if (run && line(node) === runEnd + 1 && tags.length === 0) tags = run.length === 1 && run[0]!.none !== undefined ? run : [];
      else run = tags;
      runEnd = lastLine(node);
    } else run = null;
    const strings = [...walk(node)].filter((n) => n.type === "string_fragment" || n.type === "string_content").map((n) => n.text);
    file.symbols.push({ name: nameOf(symbolNode), start: line(node), end: lastLine(node), tags, inner: innerTagged(node), strings, shape: shapeOf(node, comments), text: node.text });
  }
  // The file's own code: the code outside every symbol, other than imports. It includes a shebang line, which a comparison of two
  // versions does not leave out.
  const own = tree.rootNode.namedChildren.filter((n): n is Node => n !== null && !isSymbol(n) && !description.imports.includes(n.type) && (n.type !== description.comment || isShebang(n)));
  file.fileShape = own.map((n) => shapeOf(n, comments)).join(" ");
  file.fileText = own.map((n) => n.text).join("\n");

  for (const node of walk(tree.rootNode)) {
    if (node.type === description.comment) {
      node.text.split("\n").forEach((raw, i) => {
        const at = line(node) + i;
        if (bare(raw).includes("@spec") && !attached.has(at)) file.problems.push({ line: at, message: "a SpecTag that stands on no symbol: it must be in the comment directly above the symbol it binds" });
      });
    }
    const t = testOf(node, description);
    if (t) file.tests.push(t);
  }
  file.problems.sort((a, b) => a.line - b.line);
  return file;
}

/**
 * A JSON Schema document, which is a JSON file. Its symbols are the definitions under the `$defs` of its top-level object. Each
 * definition is bound by SpecTags in its `$comment`, each of which occupies a whole line of the `$comment` string. The `$comment` of
 * the top-level object binds the keys other than `$schema`, `$defs` and `$comment` (s-33fw3ga4ctd94dq).
 */
function readDialect(path: string, root: Node, d: Description): CodeFile {
  const file: CodeFile = { path, symbols: [], tests: [], problems: [], fileTags: [], whole: false, outside: [], fileShape: "", fileText: "", syntaxError: root.hasError };
  const keyOf = (pair: Node) => {
    const key = pair.childForFieldName("key");
    return key ? (JSON.parse(key.text) as string) : "";
  };
  const pairs = (object: Node | null | undefined) => (object?.type === "object" ? object.namedChildren.filter((n): n is Node => n?.type === "pair") : []);
  const attached = new Set<number>();
  /** The SpecTags in the `$comment` of an object, each occupying a whole line of the `$comment` string. */
  const tagsIn = (object: Node | null | undefined): Tag[] => {
    const comment = pairs(object).find((p) => keyOf(p) === "$comment");
    const value = comment?.childForFieldName("value");
    if (!comment || value?.type !== "string") return [];
    attached.add(comment.startIndex);
    const tags: Tag[] = [];
    for (const raw of (JSON.parse(value.text) as string).split("\n")) {
      const content = raw.trim();
      if (!content.includes("@spec")) continue;
      if (!content.startsWith("@spec")) file.problems.push({ line: line(comment), message: "a SpecTag shares its line in a `$comment` with other text" });
      else {
        const tag = tagOf(content, line(comment), file.problems);
        if (tag) tags.push(tag);
      }
    }
    noneAlone(tags, file.problems);
    return tags;
  };
  // Each `$comment` is left out of a shape: its SpecTags are compared separately (s-u6mj5yv8ngnz79v).
  const comments: Leave = (n) => ((n.type === "pair" && keyOf(n) === "$comment") || n.type === "comment" ? null : undefined);
  const own: Node[] = [];
  const top = root.namedChildren.find((n) => n?.type === "object");
  file.fileTags = tagsIn(top);
  for (const pair of pairs(top)) {
    const key = keyOf(pair);
    if (d.symbols.includes(key)) {
      for (const def of pairs(pair.childForFieldName("value"))) {
        const strings = [...walk(def)].filter((n) => n.type === "string_content").map((n) => n.text);
        file.symbols.push({ name: keyOf(def), start: line(def), end: lastLine(def), tags: tagsIn(def.childForFieldName("value")), inner: [], strings, shape: shapeOf(def, comments), text: def.text });
      }
    } else if (!DIALECT_KEYS.includes(key) && !d.imports.includes(key)) {
      own.push(pair);
      for (let l = line(pair); l <= lastLine(pair); l++) file.outside.push(l);
    }
  }
  file.fileShape = own.map((n) => shapeOf(n, comments)).join(" ");
  file.fileText = own.map((n) => n.text).join("\n");
  // The comments of a JSON Schema are the strings in its `$comment` keys.
  file.comments = [...walk(root)].flatMap((n) => {
    const value = n.type === "pair" && keyOf(n) === "$comment" ? n.childForFieldName("value") : null;
    if (value?.type === "string") return [commentOf(JSON.parse(value.text) as string, line(n), lastLine(n))];
    return n.type === "comment" ? [commentOf(n.text, line(n), lastLine(n))] : [];
  });
  for (const n of walk(root)) {
    if (n.type !== "pair" || attached.has(n.startIndex) || keyOf(n) !== "$comment" || !n.text.includes("@spec")) continue;
    file.problems.push({ line: line(n), message: "a SpecTag that stands on no symbol: it must be in the `$comment` of a definition under `$defs`, or of the top-level object" });
  }
  file.problems.sort((a, b) => a.line - b.line);
  return file;
}

function testOf(node: Node, d: Description): CodeTest | null {
  if (d.tests.calls && node.type === "call_expression") {
    const fn = node.childForFieldName("function");
    const callee = fn?.type === "member_expression" ? fn.childForFieldName("object") : fn;
    if (!callee || !d.tests.calls.includes(callee.text)) return null;
    const first = node.childForFieldName("arguments")?.namedChildren[0];
    if (!first || (first.type !== "string" && first.type !== "template_string")) return null;
    const name = first.text.slice(1, -1);
    const leading = first.type === "template_string" ? name.split("${")[0]! : name;
    const skips = d.tests.skips ?? [];
    const member = fn?.type === "member_expression" ? fn.childForFieldName("property")?.text : undefined;
    const options = node.childForFieldName("arguments")?.namedChildren[1];
    const byOption = options?.type === "object" && options.namedChildren.some((p) =>
      p?.type === "pair" && skips.includes(p.childForFieldName("key")?.text ?? "") && p.childForFieldName("value")?.text !== "false");
    const skipped = (member !== undefined && skips.includes(member)) || byOption;
    const sid = LEADING_TAG.exec(leading)?.[1] ?? null;
    const bare = sid ? null : LEADING_SID.exec(leading)?.[1] ?? null;
    // The test's name is left out of its shape, except for its SpecTag (s-u6mj5yv8ngnz79v).
    const shape = shapeOf(node, (n) => (n.startIndex === first.startIndex && n.type === first.type ? `name=${sid ?? ""}` : n.type === d.comment ? null : undefined));
    return { name, sid, bare, at: line(first), start: line(node), end: lastLine(node), skipped, shape, text: node.text };
  }
  if (d.tests.functions && node.type === "function_definition") {
    const name = node.childForFieldName("name")?.text ?? "";
    if (!name.startsWith(d.tests.functions)) return null;
    const holder = node.parent?.type === d.decorated ? node.parent : node;
    let sid: string | null = null;
    let bare: string | null = null;
    let at = line(holder);
    let skipped = false;
    for (const decorator of holder.namedChildren.filter((c) => c?.type === "decorator")) {
      const m = new RegExp(`^@${d.tests.mark!.replace(/\./g, "\\.")}\\(\\s*["'](@spec )?(s-[^"']*)["']`).exec(decorator!.text);
      if (m && SID.test(m[2]!)) {
        if (m[1]) sid = m[2]!;
        else bare = m[2]!;
        at = line(decorator!);
      }
      const mark = /^@([\w.]+)/.exec(decorator!.text)?.[1];
      if (mark && (d.tests.skips ?? []).includes(mark)) skipped = true;
    }
    let qualified = name;
    for (let p = holder.parent; p; p = p.parent) {
      if (p.type === "class_definition") qualified = `${p.childForFieldName("name")?.text}.${qualified}`;
    }
    const named = node.childForFieldName("name");
    const shape = shapeOf(holder, (n) => (named && n.startIndex === named.startIndex && n.type === named.type ? "name" : n.type === d.comment ? null : undefined));
    return { name: qualified, sid, bare: sid ? null : bare, at, start: line(holder), end: lastLine(holder), skipped, shape, text: holder.text };
  }
  return null;
}

/** Whether a description covers the file's language. If one does, the SpecSheriff tools read the file's symbols for SpecTags. */
export function readsForTags(path: string, text: string): boolean {
  return describe(path, text) !== undefined;
}
