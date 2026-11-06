import { readdirSync, readFileSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import { Language, Parser, type Node } from "web-tree-sitter";

/** A description of a language: what counts as a symbol and as a test in it. */
interface Description {
  extensions: string[];
  grammars: Record<string, string>;
  comment: string;
  /** doc: a tag stands in a doc comment, /** … *\/; line: in the comment lines above. */
  tagComment: "doc" | "line";
  symbols: string[];
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
}

export interface CodeFile {
  path: string;
  symbols: CodeSymbol[];
  tests: CodeTest[];
  problems: Array<{ line: number; message: string }>;
}

const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
const LEADING_SID = /^(s-[2-9a-hjkmnp-z]{15})(?=\s|$)/;
const LEADING_TAG = /^@spec (s-[2-9a-hjkmnp-z]{15})(?=\s|$)/;
const TAG = /^@spec (?:(s-[2-9a-hjkmnp-z]{15})|none (\S.*))$/;

const descriptions: Description[] = readdirSync(new URL("../languages/", import.meta.url))
  .filter((n) => n.endsWith(".json"))
  .map((n) => JSON.parse(readFileSync(new URL(`../languages/${n}`, import.meta.url), "utf8")));

let ready: Promise<void> | null = null;
const languages = new Map<string, Promise<Language>>();

function language(grammar: string): Promise<Language> {
  if (!languages.has(grammar)) languages.set(grammar, Language.load(fileURLToPath(new URL(`../grammars/${grammar}`, import.meta.url))));
  return languages.get(grammar)!;
}

/** The text of a comment line with its delimiters taken off. */
function bare(line: string): string {
  return line.trim().replace(/^\/\*\*?/, "").replace(/\*\/$/, "").replace(/^\*(?!\/)/, "").replace(/^(\/\/|#)/, "").trim();
}

/** Every named node of the tree, in the order the text reads. */
function* walk(node: Node): Generator<Node> {
  yield node;
  for (const child of node.namedChildren) if (child) yield* walk(child);
}

const line = (n: Node) => n.startPosition.row + 1;
const lastLine = (n: Node) => n.endPosition.row + 1;

/**
 * The tokens of each line as the file's language reads them: comments left out, and every token of
 * a string marked with a leading quote, so that the text of a string is never taken for a name. Null
 * where no language is described for the file.
 */
export async function lineTokens(path: string, text: string): Promise<string[][] | null> {
  const ext = extname(path);
  const description = descriptions.find((d) => d.extensions.includes(ext));
  if (!description) return null;
  ready ??= Parser.init();
  await ready;
  const parser = new Parser();
  parser.setLanguage(await language(description.grammars[ext]!));
  const tree = parser.parse(text)!;
  const lines: string[][] = text.split("\n").map(() => []);
  const visit = (node: Node, literal: boolean) => {
    if (node.type === description.comment) return;
    const inString = literal || /string|template/.test(node.type);
    if (node.childCount === 0) {
      node.text.split("\n").forEach((piece, i) => {
        const token = piece.trim();
        if (token) lines[node.startPosition.row + i]?.push(inString ? `"${token}` : token);
      });
      return;
    }
    for (const child of node.children) if (child) visit(child, inString);
  };
  visit(tree.rootNode, false);
  return lines;
}

export async function readCode(path: string, text: string): Promise<CodeFile | null> {
  const ext = extname(path);
  const description = descriptions.find((d) => d.extensions.includes(ext));
  if (!description) return null;
  ready ??= Parser.init();
  await ready;
  const parser = new Parser();
  parser.setLanguage(await language(description.grammars[ext]!));
  const tree = parser.parse(text)!;
  const file: CodeFile = { path, symbols: [], tests: [], problems: [] };
  const attached = new Set<number>();

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

  const tagsAbove = (node: Node): Tag[] => {
    const tags: Tag[] = [];
    for (const comment of commentsAbove(node)) {
      comment.text.split("\n").forEach((raw, i) => {
        const at = line(comment) + i;
        const content = bare(raw);
        if (!content.includes("@spec")) return;
        attached.add(at);
        const m = TAG.exec(content);
        if (!m) file.problems.push({ line: at, message: "a SpecTag shares its line with something other than the comment's delimiters" });
        else tags.push(m[1] ? { line: at, sid: m[1] } : { line: at, none: m[2]! });
      });
    }
    return tags;
  };

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
      if (tags.length) inner.push({ name: nameOf(child), start: line(child), end: lastLine(child), tags, inner: [], strings: [] });
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

  let run: Tag[] | null = null;
  let runEnd = 0;
  for (const node of tree.rootNode.namedChildren) {
    if (!node || !isSymbol(node)) {
      run = null;
      continue;
    }
    const symbolNode = node.type === "expression_statement" ? node.namedChildren[0]! : node;
    let tags = tagsAbove(node);
    if (isReExport(node)) {
      if (run && line(node) === runEnd + 1 && tags.length === 0) tags = run;
      else run = tags;
      runEnd = lastLine(node);
    } else run = null;
    const strings = [...walk(node)].filter((n) => n.type === "string_fragment" || n.type === "string_content").map((n) => n.text);
    file.symbols.push({ name: nameOf(symbolNode), start: line(node), end: lastLine(node), tags, inner: innerTagged(node), strings });
  }

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
    return { name, sid, bare, at: line(first), start: line(node), end: lastLine(node), skipped };
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
    return { name: qualified, sid, bare: sid ? null : bare, at, start: line(holder), end: lastLine(holder), skipped };
  }
  return null;
}

/**
 * Whether a line differs from the one it replaces only by `@spec ` put before a bare sid, as `sheriff reindex` writes
 * the SpecTag of a test an earlier release read by its bare sid (s-rah8b37kytb682y).
 */
export function onlySpecTagged(was: string, now: string): boolean {
  return now !== was && now.replace(/@spec (s-[2-9a-hjkmnp-z]{15})/g, "$1") === was;
}

/** Whether a file is in a language a description covers, so that the tools read it for SpecTags. */
export function readsForTags(path: string): boolean {
  const ext = extname(path);
  return descriptions.some((d) => d.extensions.includes(ext));
}
