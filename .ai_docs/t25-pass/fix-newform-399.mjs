// Node 12.3.6, "Guaranteed fields", a draft waiting for the owner: brought into line with the rules of section 7 agreed
// since it was last shown, after the wording checker. RecordType, the domain and RuntimeCheck are cited where they are
// first used (node 7.2.7). "never removes that value" said what the domain does not do, so the first condition says
// that the field keeps a value from then on. "the value" in the second and third conditions pointed back into the
// first, so they say "the field's value". In the reason, "Otherwise" could mean two things, and "should output" read as
// a requirement, so the last sentence says what happens if the domain invents no value.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-399.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.6"];
const RT = "s-7vm323mhry2enx3", DOM = "s-h6h25ctd3yryudh", RC = "s-e877bnfa559tvk9";
n.text = [
  `A RecordType (§${RT}) marks a field as guaranteed only where at least one of these holds:`,
  "",
  `- the domain (§${DOM}) sets the field's value when it creates a data record, and the field keeps a value from then on;`,
  "- the domain itself produces or observes the field's value whenever it outputs or stores a data record;",
  "- the domain outputs or stores a data record only once it has the field's value, such as an identifier from an external system.",
].join("\n");
n.ruText = [
  `RecordType (§${RT}) отмечает поле как гарантированное, только если верно хотя бы одно из следующего:`,
  "",
  `- домен (§${DOM}) задаёт значение поля, когда создаёт запись данных, и с тех пор у поля всегда есть значение;`,
  "- домен сам формирует или наблюдает значение поля всякий раз, когда выдаёт или сохраняет запись данных;",
  "- домен выдаёт или сохраняет запись данных, только когда значение поля у него уже есть, например идентификатор от внешней системы.",
].join("\n");
n.reason = `A guaranteed field tells the domains that read the data what they can rely on. Where a field whose value may be missing is marked as guaranteed, the domain that outputs the data has to invent a value for it. If the domain does not, the RuntimeCheck (§${RC}) generated from the RecordType refuses a correct data record.`;
n.ruReason = `Гарантированное поле сообщает доменам, которые читают данные, на что они могут полагаться. Если поле, значения которого может не быть, отмечено как гарантированное, домену, который выдаёт данные, приходится выдумывать для него значение. Если домен этого не делает, RuntimeCheck (§${RC}), сгенерированный из RecordType, отклоняет правильную запись данных.`;
n.changes.push("16 ноября, после согласования раздела 7: RecordType, домен и RuntimeCheck при первом употреблении ссылаются на узлы, которые их определяют (7.2.7); «никогда его не удаляет» стало «с тех пор у поля всегда есть значение» (без отрицания); во втором и третьем условиях «значение поля» вместо «это значение», которое отсылало к первому условию; в обосновании «Иначе» стало «Если домен этого не делает», а «которую домен должен выдать» — «правильную запись данных», чтобы обоснование ничего не требовало.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText, "\n", n.ruReason);
