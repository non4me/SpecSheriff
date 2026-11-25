# The English of 12.6 and of two rows of table 12.12, agreed by the owner on 2026-11-19

## 12.6 RecordType variants

A RecordType variant declares the fields that a data record of a RecordType (§s-7vm323mhry2enx3) holds because of the values of some fields of that RecordType. The fields of the RecordType whose values decide this are the fields that select a RecordType variant. They are named by the RecordType itself or by a RecordType that it refines. Each combination of their values, one value of each field, has its own RecordType variant if the combination adds fields of its own, and only then.

A RecordType variant is a RecordType that:
- is declared where the RecordType that it is a variant of is declared: in the same section of the base specification or in the contracts section (§s-z6tq6a3btnvvwx7);
- has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType;
- names the values it corresponds to, one value of each field that selects a RecordType variant.

A data record holds the fields of its RecordType variant beside the fields of its RecordType. The name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from a RecordType that it refines.

Reason: Where the values of some fields decide which other fields a data record holds, a RecordType alone does not describe every field that the parts of the system that read its data records can expect. Its RecordType variants describe the rest. Since they are declared where the RecordType is declared, those parts of the system find the whole description of the data records where they look for the RecordType (§s-7vm323mhry2enx3).

Example: The RecordType of a notification names its field `channel` as the field that selects its RecordType variant. The value `email` adds the field `address`, so the RecordType variant for `email` declares `address`. A data record of a notification by email holds `address` beside `channel` and `text`. The value `app` adds no field, so it has no RecordType variant.

Example: In a base specification divided into domains, the audit domain declares the RecordType of an audit log entry, whose field `domain` takes the names of the domains as its values. Entries about orders also hold the number of the order. The value `orders` comes from the domain of orders, but its RecordType variant is declared in the audit domain.

Decision, problem: The fields of a RecordType variant were held in a nested field of type `variant`, a structure that JSON Schema does not have, although the SpecSheriff tools check both the nodes and the data records against schemas written in JSON Schema.

Decision, ruling: The owner: everything about RecordType follows JSON Schema 2020-12. A data record holds the fields of its RecordType variant beside the fields of its RecordType, as a pair of `if` and `then` adds them in JSON Schema. The type `variant` is dropped, and with it the ruling of 2026-10-31 that a data record holds at most one field of that type. The other half of that ruling, that two independent choices are two data records, stands.

## Rows of table 12.12

- A RecordType variant declares at least one field
- The name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from a RecordType that it refines

## 12.2, the changed item of its list

- each of its fields, with the field's type in terms that belong to no programming language, including any bounds on the field's value, whether the field's value is guaranteed and what the field means;
