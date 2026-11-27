/** @spec {{The title of a record}} */
export function createRecord(records, title, body) {
  if (title.length < 1 || title.length > 80) throw new Error("A title has from 1 to 80 characters.");
  const record = { number: records.length + 1, title, body, inUse: true };
  records.push(record);
  return record;
}

/** @spec {{Archiving a record}} */
export function archive(records, number) {
  const record = records.find((r) => r.number === number);
  if (!record) throw new Error(`No record has the number ${number}.`);
  record.inUse = false;
}

/**
 * @spec {{Archiving a record}}
 * @spec {{The order of the list}}
 */
export function list(records) {
  return records.filter((r) => r.inUse).reverse();
}
