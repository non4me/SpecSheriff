/**
 * JSON read as text, so that a key an object holds twice is seen: JSON.parse keeps the last of two
 * keys silently, and the first value, somebody's intent, would be lost unseen.
 */

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Node =
  | { kind: "object"; entries: Array<{ key: string; line: number; value: Node }> }
  | { kind: "array"; items: Node[] }
  | { kind: "scalar"; value: Json };

export interface KeyTwice {
  /** The JSON pointer of the object holding the key. */
  path: string;
  key: string;
  /** The line of each time the key is written. */
  lines: number[];
}

function parse(text: string): Node {
  let at = 0;
  const starts = [0];
  for (let i = text.indexOf("\n"); i !== -1; i = text.indexOf("\n", i + 1)) starts.push(i + 1);
  const lineAt = (i: number) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid]! <= i) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
  const fail = (what: string): never => {
    throw new Error(`line ${lineAt(at)}: ${what}`);
  };
  const space = () => {
    while (/\s/.test(text[at] ?? "")) at++;
  };
  const string = (): string => {
    const match = /^"(?:[^"\\\u0000-\u001f]|\\.)*"/.exec(text.slice(at));
    if (!match) fail("a string expected");
    at += match![0].length;
    return JSON.parse(match![0]);
  };
  const value = (): Node => {
    space();
    const c = text[at];
    if (c === "{") {
      at++;
      const entries: Array<{ key: string; line: number; value: Node }> = [];
      space();
      if (text[at] === "}") return at++, { kind: "object", entries };
      for (;;) {
        space();
        const line = lineAt(at);
        const key = string();
        space();
        if (text[at++] !== ":") fail("':' expected");
        entries.push({ key, line, value: value() });
        space();
        const next = text[at++];
        if (next === "}") return { kind: "object", entries };
        if (next !== ",") fail("',' or '}' expected");
      }
    }
    if (c === "[") {
      at++;
      const items: Node[] = [];
      space();
      if (text[at] === "]") return at++, { kind: "array", items };
      for (;;) {
        items.push(value());
        space();
        const next = text[at++];
        if (next === "]") return { kind: "array", items };
        if (next !== ",") fail("',' or ']' expected");
      }
    }
    if (c === '"') return { kind: "scalar", value: string() };
    const match = /^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(text.slice(at));
    if (!match) return fail("a value expected");
    at += match[0].length;
    return { kind: "scalar", value: JSON.parse(match[0]) };
  };
  const root = value();
  space();
  if (at < text.length) fail("nothing expected after the value");
  return root;
}

const pointer = (path: string, key: string | number) => `${path}/${String(key).replace(/~/g, "~0").replace(/\//g, "~1")}`;

/** Every key an object of the text holds more than once. */
export function keysTwice(text: string): KeyTwice[] {
  const found: KeyTwice[] = [];
  const walk = (node: Node, path: string) => {
    if (node.kind === "array") node.items.forEach((item, i) => walk(item, pointer(path, i)));
    if (node.kind !== "object") return;
    const lines = new Map<string, number[]>();
    for (const entry of node.entries) {
      lines.set(entry.key, [...(lines.get(entry.key) ?? []), entry.line]);
      walk(entry.value, pointer(path, entry.key));
    }
    for (const [key, at] of lines) if (at.length > 1) found.push({ path, key, lines: at });
  };
  walk(parse(text), "");
  return found;
}

/** Equal as JSON Schema holds two values equal: numbers by value, objects whatever the order of their keys. */
export function jsonEqual(a: Json, b: Json): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => jsonEqual(x, b[i]!));
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length && keys.every((k) => k in b && jsonEqual(a[k]!, b[k]!));
  }
  return a === b;
}

function merge(a: Json, b: Json): Json {
  if (jsonEqual(a, b)) return a;
  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b.filter((x) => !a.some((y) => jsonEqual(x, y)))];
  const isObject = (v: Json): v is { [key: string]: Json } => v !== null && typeof v === "object" && !Array.isArray(v);
  if (isObject(a) && isObject(b)) {
    const out = { ...a };
    for (const [k, v] of Object.entries(b)) out[k] = k in out ? merge(out[k]!, v) : v;
    return out;
  }
  throw new Error("cannot merge");
}

/**
 * The text's value with the values an object holds under one key merged into those written before
 * them, and every key merged; two values that cannot be merged are refused, naming both.
 */
export function mergeKeys(text: string): { value: Json; merged: KeyTwice[] } {
  const merged: KeyTwice[] = [];
  const build = (node: Node, path: string): Json => {
    if (node.kind === "scalar") return node.value;
    if (node.kind === "array") return node.items.map((item, i) => build(item, pointer(path, i)));
    const out: { [key: string]: Json } = {};
    const lines = new Map<string, number[]>();
    for (const { key, line, value } of node.entries) {
      const built = build(value, pointer(path, key));
      const before = lines.get(key);
      lines.set(key, [...(before ?? []), line]);
      if (!before) {
        out[key] = built;
        continue;
      }
      try {
        out[key] = merge(out[key]!, built);
      } catch {
        throw new Error(
          `"${key}" at ${path || "/"} cannot be merged: line ${before.at(-1)}: ${JSON.stringify(out[key])}; line ${line}: ${JSON.stringify(built)}`,
        );
      }
    }
    for (const [key, at] of lines) if (at.length > 1) merged.push({ path, key, lines: at });
    return out;
  };
  return { value: build(parse(text), ""), merged };
}
