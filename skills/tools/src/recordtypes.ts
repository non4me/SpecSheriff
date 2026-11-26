import { isDomain, partOf } from "./model.ts";
import type { Located, SpecNode, Specification } from "./spec-files.ts";
import { fieldKey, gather, schemasWithin, sourcedFields, type Gathered } from "./values.ts";

type Json = Record<string, unknown>;
type Refuse = (sid: string, message: string) => void;
type Report = (sid: string, message: string) => void;

const isObject = (v: unknown): v is Json => Boolean(v) && typeof v === "object" && !Array.isArray(v);
const SID = /^s-[23456789abcdefghjkmnpqrstuvwxyz]{15}$/;

/**
 * The checks that `sheriff validate` performs on the RecordTypes of a project that has chosen the RecordType extension
 * (s-hzuzn8hbq6q9q4s). Each RecordType of the files that the repository keeps is checked against the specification as
 * a whole.
 */
export function recordTypeChecks(spec: Specification, kept: Array<[string, Located]>, options: { domains: boolean; projectKinds: Set<string> }, refuse: Refuse, report: Report): void {
  const records = kept.filter(([, { node }]) => node.kind === "RecordType");
  const recordOf = (sid: unknown) => (typeof sid === "string" ? spec.nodes.get(sid)?.node : undefined);
  const isRecord = (n: SpecNode | undefined): n is SpecNode => n?.kind === "RecordType";
  /** The RecordTypes that a RecordType refines, in the order in which it lists them. */
  const refined = (n: SpecNode) => n.refs.filter((r) => r.type === "refines" && r.to).map((r) => recordOf(r.to)).filter(isRecord);
  /** Every RecordType that a RecordType reaches through `refines` links, each once. */
  const reached = (n: SpecNode): SpecNode[] => {
    const out: SpecNode[] = [];
    const visit = (m: SpecNode) => {
      for (const r of refined(m)) if (r !== n && !out.includes(r)) out.push(r), visit(r);
    };
    visit(n);
    return out;
  };
  const declared = (n: SpecNode): string[] => Object.keys(isObject(n.schema) && isObject(n.schema.properties) ? n.schema.properties : {});
  /** The fields that a RecordType declares or takes through `refines` (s-c2r9jndrjbtbsv6, s-3anv9qcmx8pwp2w). */
  const fieldsOf = (n: SpecNode) => [...new Set([...declared(n), ...reached(n).flatMap(declared)])];
  /** Each schema declared for a field with the given name in a RecordType or in any RecordType that it reaches. */
  const schemasOf = (n: SpecNode, name: string): Json[] =>
    [n, ...reached(n)].map((m) => (isObject(m.schema) && isObject(m.schema.properties) ? m.schema.properties[name] : undefined)).filter(isObject);

  identifiers(records, recordOf, fieldsOf, schemasOf, refuse);
  const gathered = gather(spec, { domains: options.domains });
  const valuesOf = (holder: SpecNode, pointer: string, schema: Json): string[] =>
    Array.isArray(schema.enum) ? schema.enum.map(String) : isObject(schema.enumSource) ? (gathered.get(fieldKey(holder, pointer)) ?? []).map((g) => g.value) : [];
  enums(records, gathered, valuesOf, options.projectKinds, refuse);
  variants(spec, records, { refined, reached, declared, fieldsOf, schemasOf }, gathered, refuse);
  references(spec, records, recordOf, refined, options.domains, refuse, report);
}

/**
 * A field with `identifierOf`, at any depth, names a RecordType that names one of its fields in its `identifiedBy`, and
 * the chain of identifiers that starts at the field ends in a field without `identifierOf` (s-3anv9qcmx8pwp2w).
 */
function identifiers(
  records: Array<[string, Located]>,
  recordOf: (sid: unknown) => SpecNode | undefined,
  fieldsOf: (n: SpecNode) => string[],
  schemasOf: (n: SpecNode, name: string) => Json[],
  refuse: Refuse,
): void {
  /** The schema of the field that identifies the data records of the RecordType that an `identifierOf` names; null where there is none. */
  const identifying = (sid: unknown): Json | null => {
    const target = recordOf(sid);
    if (target?.kind !== "RecordType" || typeof target.identifiedBy !== "string" || !fieldsOf(target).includes(target.identifiedBy)) return null;
    const schemas = schemasOf(target, target.identifiedBy);
    return schemas.find((s) => "identifierOf" in s) ?? schemas[0] ?? {};
  };
  for (const [sid, { node }] of records) {
    for (const { pointer, schema } of schemasWithin(node.schema)) {
      if (!("identifierOf" in schema)) continue;
      const failed: string[] = [];
      let at = identifying(schema.identifierOf);
      if (!at) failed.push(`its identifierOf names ${String(schema.identifierOf)}, which names no field that identifies its data records`);
      const passed = new Set<Json>([schema]);
      while (at && "identifierOf" in at) {
        if (passed.has(at)) break;
        passed.add(at);
        at = identifying(at.identifierOf);
      }
      if (!at || "identifierOf" in at) failed.push("the chain of identifiers that starts at it does not end in a field without identifierOf");
      if (failed.length) refuse(sid, `the field ${pointer}: ${failed.join("; ")}`);
    }
  }
}

/**
 * A field with `enum`, at any depth, holds at least one value from its source, and an `enumSource` of the kind names a kind
 * that the project's extension of the schema adds (s-dk3zfkbhc3v6xbp). The values gathered beside a field are exactly
 * what its source produces (s-agc6fb3vx46pc23).
 */
function enums(
  records: Array<[string, Located]>,
  gathered: Map<string, Gathered[]>,
  valuesOf: (holder: SpecNode, pointer: string, schema: Json) => string[],
  projectKinds: Set<string>,
  refuse: Refuse,
): void {
  for (const [sid, { node }] of records) {
    for (const { pointer, schema } of schemasWithin(node.schema)) {
      if (!("enum" in schema) && !isObject(schema.enumSource)) continue;
      const failed: string[] = [];
      if (!valuesOf(node, pointer, schema).length) failed.push("its source gives it no value");
      const source = schema.enumSource as Json | undefined;
      if (source?.from === "kind" && !projectKinds.has(String(source.kind))) failed.push(`it names the kind ${String(source.kind)}, which the project's extension of the schema does not add`);
      if (failed.length) refuse(sid, `the field ${pointer}: ${failed.join("; ")}`);
    }
    for (const { pointer, source } of sourcedFields(node)) {
      const want = gathered.get(fieldKey(node, pointer)) ?? [];
      if (JSON.stringify(source.gathered ?? []) !== JSON.stringify(want)) refuse(sid, `the values gathered beside ${pointer} are not what their source produces; sheriff reindex writes them`);
    }
  }
}

interface Fields {
  refined: (n: SpecNode) => SpecNode[];
  reached: (n: SpecNode) => SpecNode[];
  declared: (n: SpecNode) => string[];
  fieldsOf: (n: SpecNode) => string[];
  schemasOf: (n: SpecNode, name: string) => Json[];
}

/** Each RecordType variant agrees with its RecordType (s-c2r9jndrjbtbsv6). */
function variants(spec: Specification, records: Array<[string, Located]>, f: Fields, gathered: Map<string, Gathered[]>, refuse: Refuse): void {
  /**
   * The RecordTypes that name the fields that select a variant of the given RecordType: the RecordType itself where it
   * has a chosenBy, otherwise the RecordTypes with a chosenBy that it reaches through the fewest `refines` links.
   */
  const choosers = (n: SpecNode): SpecNode[] => {
    let level = [n];
    const seen = new Set<SpecNode>();
    while (level.length) {
      const found = level.filter((m) => Array.isArray(m.chosenBy));
      if (found.length) return found;
      level.forEach((m) => seen.add(m));
      level = [...new Set(level.flatMap(f.refined))].filter((m) => !seen.has(m));
    }
    return [];
  };
  const selecting = (n: SpecNode): string[] | null => {
    const found = choosers(n);
    if (!found.length) return null;
    const names = found.map((m) => JSON.stringify([...(m.chosenBy as string[])].sort()));
    return new Set(names).size === 1 ? (found[0]!.chosenBy as string[]) : null;
  };
  /** The nearest section that holds a node, or the part that its location names where no section holds it. */
  const sectionOf = (sid: string): string => {
    for (let at = spec.nodes.get(sid); at; at = at.parent ? spec.nodes.get(at.parent.sid) : undefined) {
      if (at.parent?.kind === "section") return at.parent.sid;
      if (!at.parent) return partOf(at.file.path).part;
    }
    return "";
  };
  /** The values of a field of a RecordType, as the SpecSheriff tools collect them (s-5nf87c3e3jg9v7c). */
  const values = (n: SpecNode, name: string): string[] => {
    for (const holder of [n, ...f.reached(n)]) {
      const schema = isObject(holder.schema) && isObject(holder.schema.properties) ? holder.schema.properties[name] : undefined;
      if (!isObject(schema)) continue;
      if (Array.isArray(schema.enum)) return schema.enum.map(String);
      if (isObject(schema.enumSource)) return (gathered.get(fieldKey(holder, `/properties/${name.replaceAll("~", "~0").replaceAll("/", "~1")}`)) ?? []).map((g) => g.value);
    }
    return [];
  };

  const byRecord = new Map<SpecNode, Array<[string, SpecNode]>>();
  for (const [sid, { node }] of records) {
    if (!isObject(node.answersTo)) continue;
    const candidates = f.refined(node).filter((r) => choosers(r).length);
    const record = candidates.length === 1 ? candidates[0]! : undefined;
    const fields = record && selecting(record);
    if (!record || !fields) {
      const ambiguous = candidates.length === 1 ? choosers(candidates[0]!).map((m) => m.sid).join(", ") : "";
      refuse(sid, `a RecordType variant must have a refines link to exactly one RecordType that has fields that select a variant${ambiguous ? `; the RecordTypes that name those fields name different ones: ${ambiguous}` : ""}`);
      continue;
    }
    byRecord.set(record, [...(byRecord.get(record) ?? []), [sid, node]]);
    const failed: string[] = [];
    if (sectionOf(sid) !== sectionOf(record.sid)) failed.push("it is not declared in the same section as its RecordType");
    const inherited = new Set([record, ...f.reached(record)]);
    const added = [...new Set([...f.declared(node), ...f.reached(node).filter((m) => !inherited.has(m)).flatMap(f.declared)])];
    if (!added.length) failed.push("it adds no field, while a RecordType variant adds at least one field");
    const clashing = added.filter((name) => f.fieldsOf(record).includes(name));
    if (clashing.length) failed.push(`it adds a field that its RecordType already has: ${clashing.join(", ")}`);
    const answers = node.answersTo as Record<string, string>;
    const named = Object.keys(answers);
    if ([...named].sort().join() !== [...fields].sort().join()) failed.push(`its answersTo names ${named.join(", ")}, while the fields that select a variant are ${fields.join(", ")}`);
    for (const [name, value] of Object.entries(answers)) {
      if (fields.includes(name) && !values(record, name).includes(value)) failed.push(`"${value}" is not one of the values of ${name}`);
    }
    if (failed.length) refuse(sid, `a RecordType variant that fails these conditions: ${failed.join("; ")}`);
  }
  for (const [record, variantsOf] of byRecord) {
    const sid = record.sid;
    if (isObject(record.schema) && "additionalProperties" in record.schema && records.some(([s]) => s === sid)) {
      refuse(sid, "a RecordType that has RecordType variants and holds additionalProperties at the top level of its schema");
    }
    for (const [one, variant] of variantsOf) {
      const same = variantsOf.filter(([other, v]) => other !== one && JSON.stringify(sortedEntries(v.answersTo)) === JSON.stringify(sortedEntries(variant.answersTo)));
      if (same.length) refuse(one, `a RecordType variant that answers to the same values as ${same.map(([s]) => s).join(", ")}`);
    }
  }
}

const sortedEntries = (o: unknown) => Object.entries(o as Json).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

/**
 * A `$ref` within a RecordType's schema names a RecordType by `#` followed by its sid (s-yhe32vrbygjyd66). A RecordType
 * refers only to the RecordTypes of its own part of the system and to the fragments of a format, and a fragment only to
 * other fragments; any other reference is reported (s-ezq8csd433vj6fj).
 */
function references(
  spec: Specification,
  records: Array<[string, Located]>,
  recordOf: (sid: unknown) => SpecNode | undefined,
  refined: (n: SpecNode) => SpecNode[],
  domains: boolean,
  refuse: Refuse,
  report: Report,
): void {
  /** The part of the system that a RecordType belongs to: its domain, the contracts section, or a section of specs/base. */
  const partOfRecord = (sid: string): string => {
    const at = spec.nodes.get(sid);
    if (!at) return "";
    const { part } = partOf(at.file.path);
    if (part === "contracts") return "contracts";
    if (domains) return isDomain(part) ? part : `other:${part}`;
    if (part !== "base") return `other:${part}`;
    const top = /^base\/\d+/.exec(at.node.location ?? "");
    return top ? top[0] : "base";
  };
  for (const [sid, { node }] of records) {
    const named: string[] = [];
    for (const { schema } of schemasWithin(node.schema)) {
      if ("$ref" in schema) {
        const ref = String(schema.$ref);
        const target = ref.startsWith("#") && SID.test(ref.slice(1)) ? recordOf(ref.slice(1)) : undefined;
        if (target?.kind !== "RecordType") refuse(sid, `a $ref that names no RecordType by # followed by its sid: "${ref}"`);
        else named.push(target.sid);
      }
      if (typeof schema.identifierOf === "string" && recordOf(schema.identifierOf)?.kind === "RecordType") named.push(schema.identifierOf);
    }
    named.push(...refined(node).map((r) => r.sid));
    const mine = partOfRecord(sid);
    const outside = [...new Set(named)].filter((to) => {
      const theirs = partOfRecord(to);
      return mine === "contracts" ? theirs !== "contracts" : theirs !== mine && theirs !== "contracts";
    });
    if (outside.length) {
      report(sid, `${mine === "contracts" ? "a fragment of a format that refers to a RecordType outside the contracts section" : "a RecordType that refers to a RecordType of another part of the system"}: ${outside.join(", ")}`);
    }
  }
}
