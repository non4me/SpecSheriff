# The English of the rows of table 12.12 that the owner agreed on 2026-11-19

- 12.12.2: A field with `identifierOf` refers to a RecordType that names one of its own fields as the field identifying its data records
- 12.12.3: A chain of identifiers, followed from each identifying field to the next, ends in a field without `identifierOf`
- 12.12.4: A RecordType variant has a `refines` link to the RecordType whose fields it extends
- 12.12.5: A RecordType variant is declared in the same section of the base specification as its RecordType
- 12.12.6: A RecordType variant declares at least one field
- 12.12.7: The name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from a RecordType that it refines
- 12.12.8: A RecordType variant names values only for the fields that select a variant of its RecordType, one value for each of them
- 12.12.9: Each value that a RecordType variant names for a field is in the `enum` of that field
- 12.12.10: Each variant of one RecordType corresponds to its own combination of values
- 12.12.11: Each value of a field with `enum` is declared once, the values gathered beside it not counted
- 12.12.12: Every field with `enum` holds at least one value from its source
- 12.12.13: A field whose values are the sids of the nodes of one of the project's own kinds names a kind that exists
- 12.12.14: The values gathered beside a field are what their source produces
- 12.12.15: In the types of its fields and through `refines`, a RecordType refers only to the RecordTypes of the part of the system that outputs its data and to fragments of a format declared in the contracts section
- 12.12.16: A fragment of a format refers only to other fragments of a format
