// T25, stage 2, group 1, round c: applies the findings of the second review (review-g1b-a.md to review-g1b-e.md) to
// the drafts and proposals of group 1, and adds the proposal for rule 10.3 (s-83ev4wwesbwnhnp) that the header-status
// nodes require. Copies tools-drafts.json to tools-drafts.before-group1-c.json first. Run again, it rebuilds the keys of
// this group from that copy and leaves every other key as tools-drafts.json holds it. It checks every draft before it
// writes.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group1-c.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-23";

const GROUP = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w",
  "s-qvgzubkrafadqgf", "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf",
  ...Object.keys(before).filter((k) => k.startsWith("proposal:"))];
// On a re-run, this group's keys start again from the copy; the keys this script adds are removed first.
for (const k of GROUP) drafts[k] = structuredClone(before[k]);
for (const k of Object.keys(drafts)) if (k.startsWith("proposal:") && !(k in before)) delete drafts[k];

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });

const E = (key) => {
  if (!drafts[key]) throw new Error(`no draft ${key}`);
  return drafts[key];
};
const at = (key, prefix) => {
  const i = E(key).proposal.parts.findIndex((p) => p.en.startsWith(prefix));
  if (i < 0) throw new Error(`${key}: no part opening with "${prefix}"`);
  return i;
};
const part = (key, prefix) => E(key).proposal.parts[at(key, prefix)];
const setPart = (key, prefix, p) => { E(key).proposal.parts[at(key, prefix)] = p; };
// Replaces a part's English and Russian and keeps its note of what changed, adding to it where a note is given.
const reword = (key, prefix, en, ru, more) => {
  const old = part(key, prefix);
  setPart(key, prefix, { ...old, en, ru, change: more ? `${old.change} ${more}` : old.change });
};
const cutPart = (key, prefix) => { E(key).proposal.parts.splice(at(key, prefix), 1); };
const insertAfter = (key, prefix, ...parts) => { E(key).proposal.parts.splice(at(key, prefix) + 1, 0, ...parts); };
const reason = (key, en, ru, change) => Object.assign(E(key).proposal, { reason: en, ruReason: ru, ...(change ? { reasonChange: change } : {}) });
const refs = (key, list) => { E(key).proposal.refs = list; };
const addRefs = (key, ...list) => { E(key).proposal.refs.push(...list); };
const dropRef = (key, to) => {
  const n = E(key).proposal.refs.length;
  E(key).proposal.refs = E(key).proposal.refs.filter((r) => r.to !== to);
  if (E(key).proposal.refs.length === n) throw new Error(`${key}: no link to ${to}`);
};
const examples = (key, list) => { E(key).proposal.examples = list; };
const stage3 = (key, text) => { E(key).stage3 = text; };
const reviewed = (key, report) => { E(key).review = `${E(key).review ? E(key).review + "; " : ""}specsheriff-rule-reviewer, ${DATE}, second review: ${report}; fix-group1-c.mjs applied its findings`; };
const SAME = "Как в согласованной формулировке.";

// ---------------------------------------------------------------------------------------------------------------
// Report A (review-g1b-a.md)
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-stxmhq3hgfndvn6";
  reword(k, "`sheriff validate` refuses each node whose location",
    "`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the location computed.",
    "`sheriff validate` отвергает каждый узел, расположение которого (§s-kag2m9tzdnduxdx) отличается от вычисленного для него (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). Отказ называет файл и sid узла, расположение, которое хранит файл, и вычисленное расположение.");
  addRefs(k, R("cites", "s-kag2m9tzdnduxdx"));
  reviewed(k, "review-g1b-a.md");
}
{
  const k = "new:tools-7-1-location";
  E(k).proposal.parts = [
    P("The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and its place in the specification. They compute it for each node of the specification in the files that the repository keeps.",
      "Инструменты SpecSheriff вычисляют расположение узла (§s-kag2m9tzdnduxdx) по пути к его файлу и по его месту в спецификации. Они вычисляют его для каждого узла спецификации в файлах, которые хранит репозиторий.",
      part(k, "The SpecSheriff tools compute").change),
    P("The first node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5) takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations include `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) takes the domain's name as its location.",
      "Первый узел на вершине файла guidelines или технического приложения (§s-tj38pvm38nepaf5) получает расположением путь к этому файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u). Среди таких расположений — `_guidelines/spec`, `_guidelines/extensions/domains` и `tech/stack`. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена (§s-yggv9myedprnaa7) получает расположением имя домена.",
      "Новое в тексте; так делает код. Первая фраза — как в правиле 8.5; путь назван целиком, потому что файлы расширений guidelines лежат во вложенной папке, а «первый» — потому что в файле может быть и следующий узел на вершине. Последняя фраза опирается на предлагаемое общее предложение правила 8.5 об узле, которым открывается часть (вопрос 1): по правилу 11.1.3 спецификация домена открывается заголовком."),
    P("Every other node's location is one of the following, followed by a slash and the node's place:",
      "Расположение любого другого узла — одно из следующего, затем косая черта и место узла:",
      "Новое в тексте; так делает код."),
    L("in a file of the guidelines or of the technical appendix, the location of the first node at the top of that file, as in `_guidelines/spec/1.3.4`;",
      "в файле guidelines или технического приложения — расположение первого узла на вершине этого файла, как в `_guidelines/spec/1.3.4`;",
      "Как в правиле 8.5."),
    structuredClone(part(k, "in the base specification")),
    P("Every node is numbered except the following:", "Нумеруется каждый узел, кроме следующих:", "Новое в тексте; так делает код. Исключения — списком, по замечанию рецензента."),
    L("a term (§s-ypa92gpcj3f5zj8);", "термина (§s-ypa92gpcj3f5zj8);", "Как в правиле 8.5."),
    L("the first node at the top of a file of the guidelines or of the technical appendix;", "первого узла на вершине файла guidelines или технического приложения;", "Как в правиле 8.5."),
    L("a domain's header.", "заголовка домена.", "По предлагаемому общему предложению правила 8.5 (вопрос 1)."),
    structuredClone(part(k, "A numbered node's place")),
    structuredClone(part(k, "The SpecSheriff tools take the numbered nodes")),
    P("In a folder of the base specification, the nodes at the top of its files and the children of a domain's header are considered nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths. The nodes at the top of one file are taken in the order in which the file lists them. The children of a domain's header take the header's place in that order.",
      "В папке базовой спецификации узлы на вершине её файлов и дочерние узлы заголовка домена считаются узлами под одним родителем. Инструменты SpecSheriff берут их файл за файлом, в порядке кодовых точек путей к файлам. Узлы на вершине одного файла берутся в том порядке, в каком их перечисляет файл. Дочерние узлы заголовка домена занимают в этом порядке место заголовка.",
      `${part(k, "In a folder of the base specification").change} Место дочерних узлов заголовка — по замечанию рецензента; так делает код.`),
    P("In a file of the guidelines or of the technical appendix, each further node at the top of the file is numbered under the location of the first node, after that node's children.",
      "В файле guidelines или технического приложения каждый следующий узел на вершине файла нумеруется под расположением первого узла, после его дочерних узлов.",
      part(k, "In a file of the guidelines or of the technical appendix").change),
  ];
  reason(k,
    "`sheriff reindex` writes the locations that `sheriff validate` checks (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Both therefore need one computation that gives every node a location of its own, the same on every machine.",
    "`sheriff reindex` записывает расположения, которые проверяет `sheriff validate` (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Поэтому обоим нужно одно вычисление, которое даёт каждому узлу собственное расположение, одно и то же на любой машине.");
  const ex = E(k).proposal.examples[0];
  const cut = (s, from) => { if (!s.includes(from)) throw new Error(`example: "${from}" not found`); return s.replace(from, ""); };
  examples(k, [X(
    cut(ex.en, "A term `request` in `specs/contracts/terms.json` is `contracts/request`. "),
    cut(ex.ru, "Термин `request` в `specs/contracts/terms.json` — `contracts/request`. "))]);
  reviewed(k, "review-g1b-a.md");
}
{
  const k = "new:tools-7-1-approval-by";
  reword(k, "`sheriff validate` refuses any other approval",
    "`sheriff validate` refuses any other approval that the commit adds. The refusal names the sid and the email address that the approval holds. Where the files that the repository keeps hold the node, the refusal also names the node's file, its location (§s-kag2m9tzdnduxdx) and its owners.",
    "Любое другое одобрение, которое добавляет коммит, `sheriff validate` отвергает. Отказ называет sid и адрес электронной почты, которые содержит одобрение. Если узел находится в файлах, которые хранит репозиторий, отказ называет также файл, расположение (§s-kag2m9tzdnduxdx) и ответственных за узел.",
    "У одобрения нет своего sid: оно содержит sid узла (рецензент).");
  reviewed(k, "review-g1b-a.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report B (review-g1b-b.md)
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-agc6fb3vx46pc23";
  reword(k, "`sheriff validate` computes the following values",
    "`sheriff validate` refuses each node in which a value built from other nodes differs from the value that `sheriff reindex` would write (§s-ztseyetus7np6br). It computes the following values:",
    "`sheriff validate` отвергает каждый узел, в котором значение, построенное из других узлов, отличается от значения, которое записал бы `sheriff reindex` (§s-ztseyetus7np6br). Он вычисляет следующие значения:",
    "Узел открывается тем, что отвергается, как требует правило 7.2.2 (рецензент).");
  reword(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status",
    part(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status").en,
    part(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status").ru);
  part(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status").change =
    "Новое: предлагаемые правило расширения Domains и строка таблицы 11.3 исполняют ваше решение от 2026-11-06 на правиле 1.3.8 (статус заголовка — состояние того, что в нём, строится и только показывается; заголовок никто не одобряет). Код этот статус уже сравнивает.";
  reword(k, "`sheriff validate` checks each node",
    "`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and says which of these values differs.",
    "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Отказ называет файл, sid и расположение узла в спецификации (§s-kag2m9tzdnduxdx) и говорит, какое из этих значений отличается.",
    "Фраза о том, что отвергается, перенесена в начало узла.");
  stage3(k, `${E(k).stage3} builtStatuses (model.ts:218) derives a header's status from every node of the domain's files other than the header, and so leaves out the header's own children, and every node in a cell; it is to count both.`);
  reviewed(k, "review-g1b-b.md");
}
{
  const k = "new:tools-7-1-consumes";
  reason(k,
    "The index in a domain's header, and the check for a cycle in which domains use one another, both learn from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would make the index or the cycle check wrong.",
    "Указатель в заголовке домена и проверка цикла, в котором домены пользуются друг другом, узнают из связей `consumes`, какой домен каким разделом пользуется (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Любая другая связь `consumes` сделала бы неверным указатель или проверку цикла.");
  const ex = E(k).proposal.examples[0];
  examples(k, [X(ex.en,
    "Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, описывающим, как пользователь входит в систему, и `sheriff validate` эту связь принимает. Ближайшая ошибка — направить связь на то правило этого раздела, на которое опирается домен: тогда `sheriff validate` связь отвергает.")]);
  reviewed(k, "review-g1b-b.md");
}
{
  const k = "s-qvgzubkrafadqgf";
  reason(k,
    "An `exempts` link lifts the requirement that the system's code implement its target (§s-6fw72j65jkqrfpf). So a link that the rule on exempting a rule does not allow (§s-gf6n8ge4mke3pr2) would hide a rule that the system's code does not implement.",
    "Связь `exempts` снимает требование, чтобы код системы реализовал её цель (§s-6fw72j65jkqrfpf). Поэтому связь, которую не допускает правило об освобождении правила от имплементации (§s-gf6n8ge4mke3pr2), скрыла бы правило, которое код системы не реализует.");
  dropRef(k, "s-dpe5kcz4eamv39g");
  addRefs(k, R("cites", "s-6fw72j65jkqrfpf"));
  const ex = E(k).proposal.examples[0];
  const swap = (s, from, to) => { if (!s.includes(from)) throw new Error(`example: "${from}" not found`); return s.replace(from, to); };
  examples(k, [X(
    swap(ex.en, "an `exempts` link to it, so `sheriff validate` accepts the link.", "an `exempts` link to it, and `sheriff validate` accepts the link."),
    swap(ex.ru, "связь `exempts`, поэтому `sheriff validate` связь принимает.", "связь `exempts`, и `sheriff validate` эту связь принимает."))]);
  reviewed(k, "review-g1b-b.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report C (review-g1b-c.md)
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-link-target";
  reword(k, "`sheriff validate` refuses each link whose target",
    "`sheriff validate` accepts a link only where its target is the sid of a node of the model of the specification (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It refuses any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.",
    "`sheriff validate` принимает связь, только если её цель — sid узла модели спецификации (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). Любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), он отвергает. Отказ называет файл, sid и расположение в спецификации (§s-kag2m9tzdnduxdx) узла, который объявляет связь, а также тип связи и её цель.",
    "Теперь сказано, что принимается, а затем — что отвергается (рецензент).");
  reason(k,
    "Only a link whose target is a node of the specification can be followed. Only such a link is built into that node, among the links pointing at it (§s-bpdqd9v72wg7vsz).",
    "По связи можно перейти, только если её цель — узел спецификации. Только такая связь строится в этом узле среди связей, указывающих на него (§s-bpdqd9v72wg7vsz).");
  const ex = E(k).proposal.examples[0];
  examples(k, [X(
    `${ex.en} The closest mistake is to look for the target only among the nodes of the files that the repository keeps: a rule of a project's own guidelines refines a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin, and \`sheriff validate\` accepts that link.`,
    `${ex.ru} Ближайшая ошибка — искать цель только среди узлов файлов, которые хранит репозиторий: правило собственных guidelines проекта уточняет правило SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff, и \`sheriff validate\` принимает эту связь.`)]);
  reviewed(k, "review-g1b-c.md");
}
{
  const k = "s-qzyacnqwvaeaps4";
  E(k).proposal.title = "Citations and the links that match them";
  E(k).proposal.ruTitle = "Ссылки и соответствующие им связи";
  reword(k, "A `§` followed by a sid",
    "A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9). Any other `§` followed by one or more characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.",
    "`§`, за которым следует sid, а за ним нет строчной буквы или цифры, — ссылка на этот sid, в том числе в тексте в обратных кавычках (§s-cxtt6jvhqcey2k9). Любой другой `§`, за которым следует один или более знаков до пробельного символа, запятой, точки с запятой или закрывающей скобки, — ссылка по расположению, если только он не стоит в тексте в обратных кавычках.",
    "«Любой другой `§`» вместо «один или более других знаков»: так sid, за которым идёт строчная буква, явно относится ко второму случаю (рецензент).");
  reviewed(k, "review-g1b-c.md");
}
{
  const k = "s-pvnnr844f3y964m";
  reword(k, "`sheriff validate` accepts a link of type",
    "`sheriff validate` accepts a link of type `term-relation` or `uses` only where both of its ends are term nodes (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.",
    "`sheriff validate` принимает связь типа `term-relation` или `uses`, только если оба её конца — узлы-термины (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). Связь любого другого типа, в том числе `cites`, он принимает, только если хотя бы на одном её конце узел, который не является узлом-термином.",
    "«Оба её конца» вместо «к другому узлу-термину»: связь термина с самим собой код принимает, и ни одно правило её не запрещает (рецензент).");
  reword(k, "`sheriff validate` refuses every other link",
    "`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It checks only a link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be settled with the specification's owners.",
    "Любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), `sheriff validate` отвергает. Он проверяет только связь, цель которой — узел модели спецификации (§s-w6gybeqn2ttydqx). Отказ называет файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который объявляет связь, а также тип связи и её цель. Он говорит, что связь нужно решить с ответственными за спецификацию.",
    "Связь с sid, у которого нет узла, отвергает только узел «The target of a link», поэтому этот узел её не проверяет (рецензент).");
  reason(k,
    "Whether two terms are bound, and how, says how the entities (§s-9w3u3wn37wksyxd) that they name relate. The specification's owners decide that, so the refusal sends whoever wrote the link to them, rather than suggesting a type.",
    "Связаны ли два термина и как, говорит о том, как соотносятся сущности (§s-9w3u3wn37wksyxd), которые они называют. Это решают ответственные за спецификацию, поэтому отказ отсылает автора связи к ним, а не подсказывает тип.");
  addRefs(k, R("cites", "s-w6gybeqn2ttydqx"));
  reviewed(k, "review-g1b-c.md");
}
{
  const k = "s-e2vdhfsndy5stq9";
  reword(k, "`sheriff validate` checks each node",
    "`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). It reads a node in a cell of a `TableRule` as it reads any other node.",
    "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, каким бы ни был его статус. Он читает заголовок, текст и обоснование узла, каждую строку в каждом элементе его `TextRule.list` и каждую текстовую ячейку `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). Узел в ячейке `TableRule` он читает так же, как любой другой узел.");
  const word = at(k, "In what it reads");
  E(k).proposal.parts.splice(word, 4,
    P("In what it reads, a word set in capitals is two or more characters that meet each of these conditions:",
      "В том, что он читает, слово, набранное заглавными, — это два или более знака, которые отвечают каждому из этих условий:",
      "Было: «каждое такое слово — из двух или более знаков». Теперь условия, как их проверяет код (validate.ts:167), даны списком (рецензент); «любой письменности» относится только к буквам: дефис код принимает только ASCII."),
    L("each of them is a capital letter of any script, a digit or a hyphen;", "каждый из них — заглавная буква любой письменности, цифра или дефис;", "Новое в тексте; так делает код."),
    L("the first is a capital letter, and the last is a capital letter or a digit;", "первый — заглавная буква, а последний — заглавная буква или цифра;", "Новое в тексте; так делает код."),
    L("no letter, digit or underscore stands immediately before or after them.", "непосредственно перед ними и после них нет буквы, цифры или подчёркивания.", "Новое в тексте; так делает код."),
    P("A run is three or more such words with only spaces or tabs between them. Text in backticks or in straight or typographic double quotation marks is left out.",
      "Слова подряд — это три или более таких слова, между которыми только пробелы или табуляции. Текст в обратных кавычках или в прямых или типографских двойных кавычках не учитывается.",
      "Как было; сказано, какие двойные кавычки, как в коде. Почему цитата не учитывается, говорит обоснование."));
  const ex = E(k).proposal.examples[0];
  const swap = (s, from, to) => { if (!s.includes(from)) throw new Error(`example: "${from}" not found`); return s.replace(from, to); };
  examples(k, [X(swap(ex.en, "such as HTTP REST API, pass", "such as “HTTP REST API”, pass"), swap(ex.ru, "например HTTP REST API:", "например «HTTP REST API»:"))]);
  reviewed(k, "review-g1b-c.md");
}
{
  const k = "s-zhen42p6mnaxu7w";
  reason(k,
    "A section whose rules have all been moved or removed still reads as a part of the specification. Its approval status, which the SpecSheriff tools derive from the nodes under it (§s-9kfdycuq34beqvs), does not show that the section contains no rule.",
    "Раздел, все правила которого перенесены или удалены, по-прежнему выглядит частью спецификации. Его статус одобрения, который инструменты SpecSheriff выводят из узлов под ним (§s-9kfdycuq34beqvs), не показывает, что в разделе нет правила.");
  addRefs(k, R("cites", "s-9kfdycuq34beqvs"));
  reviewed(k, "review-g1b-c.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report D (review-g1b-d.md)
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-guidelines-to-extension";
  const p0 = part(k, "`sheriff validate` refuses each link");
  const cut = (s, from) => { if (!s.includes(from)) throw new Error(`"${from}" not found`); return s.replace(from, ""); };
  reword(k, "`sheriff validate` refuses each link",
    cut(p0.en, " A node of an extension is a node of a file in `specs/_guidelines/extensions/`."),
    cut(p0.ru, " Узел расширения — это узел файла в `specs/_guidelines/extensions/`."),
    "Последняя фраза о папке расширений убрана: её путь даёт «Where the files are», на который узел ссылается (рецензент).");
  examples(k, [X(
    "A rule of `spec.json` cites a rule of an extension. `sheriff validate` refuses the `cites` link that the citation requires.",
    "Правило `spec.json` цитирует правило расширения. `sheriff validate` отвергает связь `cites`, которой требует цитата.")]);
  reviewed(k, "review-g1b-d.md");
}
{
  const k = "s-yprj7d6tnvauggr";
  reword(k, "In the files that the repository keeps",
    "In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, where the node lacks the link named for it:",
    "В файлах, которые хранит репозиторий, `sheriff validate` отвергает каждый из следующих узлов, кроме раздела, если у узла нет названной для него связи:",
    "По-русски «у которого нет» читалось как «раздел, у которого нет связи» (рецензент).");
  const swap = (s, from, to) => { if (!s.includes(from)) throw new Error(`"${from}" not found`); return s.replace(from, to); };
  const l1 = part(k, "a node of the technical appendix");
  reword(k, "a node of the technical appendix",
    swap(l1.en, "an `implements` link to", "an `implements` link (§s-sn6au3vcr9uy5pm) to"),
    swap(l1.ru, "связь `implements` с", "связь `implements` (§s-sn6au3vcr9uy5pm) с"),
    "Ссылка на правило 6.1 — при первом упоминании типа связи (рецензент).");
  reword(k, "`sheriff validate` tells which part",
    "`sheriff validate` tells which part of the specification a node belongs to by the path of its file (§s-zefk589ykh37b8u). It checks a node in a cell of a `TableRule` as it checks any other node (§s-5fewsp22mmdz7y6).",
    "К какой части спецификации относится узел, `sheriff validate` определяет по пути к его файлу (§s-zefk589ykh37b8u). Узел в ячейке `TableRule` он проверяет так же, как любой другой узел (§s-5fewsp22mmdz7y6).");
  E(k).proposal.ruReason = "Узел, связанный с правилом, на которое он опирается, находят при каждом изменении этого правила. Согласуются ли они по-прежнему, может судить только читатель.";
  stage3(k, `${E(k).stage3} partOf (model.ts:55) marks only spec.json and tools.json as the SpecSheriff guidelines, so validate.ts:462 reads the files of the extensions of the guidelines as the project's own guidelines; only specs/_guidelines/project.json is to be read that way.`);
  reviewed(k, "review-g1b-d.md");
}
{
  const k = "s-6bmnsbskg6en4nf";
  E(k).proposal.title = "Copies of the files that the SpecSheriff plugin delivers";
  E(k).proposal.ruTitle = "Копии файлов, которые поставляет плагин SpecSheriff";
  reword(k, "`sheriff validate` refuses each copy",
    "`sheriff validate` refuses each copy of the files that are common to every project and come with the SpecSheriff tools in the SpecSheriff plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).",
    "`sheriff validate` отвергает каждую копию файлов, которые общие для всех проектов и поставляются вместе с инструментами SpecSheriff в плагине SpecSheriff (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). Такой файл он принимает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).",
    "Плагин назван своим именем, плагин SpecSheriff (рецензент).");
  reword(k, "The refusal names each such file",
    "The refusal names each copy. While the repository keeps a copy, `sheriff validate` makes only the check for copies.",
    "Отказ называет каждую копию. Пока репозиторий хранит копию, `sheriff validate` делает только проверку на копии.",
    "«Делает только проверку на копии» вместо «делает только эту проверку», которое читалось и как «делает её в одиночку» (рецензент).");
  reason(k,
    "In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin (§s-zefk589ykh37b8u). A copy in the project's repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed.",
    "В проекте инструменты SpecSheriff читают файлы, общие для всех проектов, из плагина SpecSheriff (§s-zefk589ykh37b8u). Копию в репозитории проекта читают люди и агенты, но не читает ни один инструмент SpecSheriff, поэтому она незаметно отстаёт от действующих файлов.");
  reviewed(k, "review-g1b-d.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report E (review-g1b-e.md): the proposals
// ---------------------------------------------------------------------------------------------------------------
{ // rule 8.5
  const k = "proposal:s-kag2m9tzdnduxdx";
  E(k).proposal.parts = [
    P("A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. The following nodes take no number:",
      "Расположение узла называет, где он находится в спецификации: часть, в которой он находится, а за ней его место в ней. Место узла — его номер среди узлов того же родителя. Номера не получают следующие узлы:",
      "Первые две фразы — как в согласованной формулировке. Исключения из нумерации, которые стояли в трёх абзацах, собраны в список, как требует правило 7.2.2: согласованный узел приводится к правилам о том, как пишется узел, раз он меняется (рецензент)."),
    L("a term (§s-ypa92gpcj3f5zj8), whose place is the term's name;",
      "термин (§s-ypa92gpcj3f5zj8), место которого — имя термина;",
      "Как в согласованной формулировке; добавлена ссылка на правило о термине, как требует правило 7.2.7."),
    L("the node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name and the file's;",
      "узел на вершине файла guidelines или технического приложения (§s-tj38pvm38nepaf5), который располагается по имени части и имени файла;",
      "Как в согласованной формулировке; добавлена ссылка на правило о техническом приложении, как требует правило 7.2.7."),
    L("where an extension of the guidelines (§s-mbmnsnxenmavu3z) defines a kind of node that a part of the base specification (§s-5x737t9nee4zgaa) opens with, a node of that kind, which takes the part's name alone as its location.",
      "если расширение guidelines (§s-mbmnsnxenmavu3z) определяет тип узла, которым открывается часть базовой спецификации (§s-5x737t9nee4zgaa), — узел этого типа, который получает расположением одно имя части.",
      "Новое (вопрос 1). Прежнее правило 1.4 располагало заголовок домена по имени домена. При согласовании 8.5 это «переходило в часть 14» и нигде не было записано. Пункт не называет ни одного расширения, как требует правило 1.7.3. Заголовок домена — такой узел, потому что по правилу 11.1.3 спецификация домена открывается заголовком. Раздел, который просто стоит первым в `base` или `contracts`, сюда не попадает: тип раздела определяют guidelines, а не расширение."),
    P("In each file of the guidelines or of the technical appendix, the nodes are numbered under the location of the file's top node. The nodes under a node that a part opens with are numbered together with the other nodes at the top of the part.",
      "Каждый файл guidelines или технического приложения нумерует свои узлы под расположением своего верхнего узла. Узлы под узлом, которым открывается часть, нумеруются вместе с остальными узлами на вершине части.",
      "Первая фраза — как в согласованной формулировке, только «каждый такой файл» стало «каждый файл guidelines или технического приложения»: «такой» указывал на абзац, которого теперь нет. Вторая фраза — новая (вопрос 1)."),
    P("The location is computed from where the node is and is never written by hand.",
      "Расположение вычисляется из того, где узел находится, и никогда не пишется вручную.",
      SAME),
  ];
  reason(k,
    "A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.",
    "Расположение говорит читателю, где находится узел. Вычисляемое, оно никогда не расходится с тем, где узел находится.",
    "Как в согласованной формулировке. Почему узел, которым открывается часть, располагается по её имени, записано в предлагаемом решении (рецензент).");
  examples(k, [X(
    "A rule kept in `specs/_guidelines/spec.json` as the fifth node of its eighth section is at `_guidelines/spec/8.5`. Where an extension makes a part `requests` open with a header, the header is at `requests`, and the part's first section, kept in another of its files, is at `requests/1`. The closest mistake is to number the header, which would put that section at `requests/2`.",
    "Правило, которое хранится в `specs/_guidelines/spec.json` пятым узлом его восьмого раздела, расположено в `_guidelines/spec/8.5`. Если расширение открывает часть `requests` заголовком, заголовок расположен в `requests`, а первый раздел части, хранящийся в другом её файле, — в `requests/1`. Ближайшая ошибка — пронумеровать заголовок: тогда этот раздел оказался бы в `requests/2`.")]);
  addRefs(k, R("cites", "s-ypa92gpcj3f5zj8"), R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-5x737t9nee4zgaa"));
  E(k).proposedDecision = {
    date: "(the date of the owner's answer)",
    problem: "The new form of the rule no longer said where a domain's header is located. The former rule stated it, and the plan of 2026-11-10 to state it in the extension for domains was never carried out.",
    ruling: "The owner: where an extension of the guidelines defines a kind of node that a part of the base specification opens with, a node of that kind takes the part's name alone as its location, and the nodes under it are numbered together with the part's other nodes at the top. Such a node describes the part as a whole, so the part's name locates it.",
    type: "textual",
  };
  reviewed(k, "review-g1b-e.md");
}
{ // the approval status of a domain's header
  const k = "proposal:domains-header-status";
  E(k).question = "None: carries out the owner's ruling of 2026-11-06 on rule 1.3.8 (s-9kfdycuq34beqvs), shown to the owner as a proposal";
  E(k).proposal.parts = [
    P("The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) as they derive a section's (§s-9kfdycuq34beqvs). The header is approved while every node of the domain other than a section and other than the header itself is approved, in whichever of the domain's documents (§s-k73czmpkazcx7mu) the node is kept. Nobody approves a header.",
      "Инструменты SpecSheriff выводят статус одобрения (§s-tgrnpagrb58tya7) заголовка домена (§s-yggv9myedprnaa7) так же, как статус раздела (§s-9kfdycuq34beqvs). Заголовок одобрен, пока одобрен каждый узел домена, кроме раздела и самого заголовка, в каком бы из документов домена (§s-k73czmpkazcx7mu) этот узел ни хранился. Заголовок никто не одобряет.",
      "Новое правило расширения Domains. Оно исполняет ваше решение от 2026-11-06, записанное на правиле 1.3.8: статус раздела и заголовка домена — состояние того, что в них входит, он строится и только показывается, а их собственную формулировку никто не одобряет. Новая форма правила 1.3.8 о заголовке больше не говорит, а правило SpecSheriff guidelines и не может его назвать (правило 1.7.3). Статус выводится из всех узлов домена, а не только из узлов под заголовком: разделы домена часто лежат в других его файлах, и под заголовком нет ни одного узла. Сказано, когда заголовок одобрен, как правило 1.3.3 говорит это о разделе (рецензент)."),
  ];
  refs(k, [R("cites", "s-9kfdycuq34beqvs"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-tgrnpagrb58tya7"), R("cites", "s-k73czmpkazcx7mu")]);
  examples(k, [X(
    "A domain is kept in two documents: the first holds its header, and the second holds its two sections, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The closest mistake is to derive the header's status only from the nodes under the header, of which there are none here, and so to show the header approved while a rule of the domain is still a draft.",
    "Домен хранится в двух документах: в первом — его заголовок, во втором — два его раздела, и одно правило в них — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Ближайшая ошибка — выводить статус заголовка только из узлов под заголовком, которых здесь нет, и тем самым показывать заголовок одобренным, пока правило домена ещё черновик.")]);
  reviewed(k, "review-g1b-e.md");
}
{ // row 11.3.2a
  E("proposal:11-3-header-status-row").question = "None: carries out the owner's ruling of 2026-11-06 on rule 1.3.8 (s-9kfdycuq34beqvs), shown to the owner as a proposal";
}
{ // row 10.1.8
  const k = "proposal:row-10-1-8";
  E(k).question = "None: carries out the owner's ruling of 2026-11-06 on rule 1.3.8 (s-9kfdycuq34beqvs), shown to the owner as a proposal";
  reword(k, "Every node of the specification outside",
    "Every node of the specification outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen, except a section and any other node whose approval status is derived from other nodes, is approved only while an approval of its current wording is in force",
    "Каждый узел спецификации вне SpecSheriff guidelines, которые использует проект, и вне выбранных им расширений, кроме раздела и любого другого узла, статус одобрения которого выводится из других узлов, одобрен, только пока в силе одобрение его нынешней формулировки");
  part(k, "Every node of the specification outside").change = "Было: «…кроме раздела, одобрен, только пока…». Добавлено «и любого другого узла, статус одобрения которого выводится из других узлов». Иначе строка требовала бы одобрения для одобренного заголовка домена, которого по вашему решению от 2026-11-06 никто не одобряет; правило расширения не может отменить строку основной таблицы (правило 1.7.2). Слова «который никто не одобряет» читались и как «которого никто не одобрил» (рецензент). Строка по-прежнему не называет ни одного расширения (правило 1.7.3).";
  reviewed(k, "review-g1b-e.md");
}
{ // rule 6.1
  const k = "proposal:s-sn6au3vcr9uy5pm";
  E(k).question = "None: carries out the owner's ruling of 2026-11-11 that one link type, `refines`, covers both refining and extending; shown to the owner as a proposal";
  const refinesItem = part(k, "`refines` —");
  reword(k, "`refines` —", refinesItem.en,
    refinesItem.ru.replace("связь имеет тип `implements`.", "связь имеет тип `implements`, а не `refines`."));
  if (!part(k, "`refines` —").ru.includes("а не `refines`")) throw new Error("6.1: the Russian of `refines` was not changed");
  reason(k,
    "A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.\n\nA project may need a relation that the guidelines do not provide for, so its own guidelines may add a type of link, as they may add a kind of node.",
    "Связь без типа лишь фиксирует, что кто-то подумал о двух узлах вместе. Ни одна проверка не может её оценить. Ни одна диаграмма не может её нарисовать. Тип, названный без значения, — та же догадка на шаг дальше.\n\nПроекту может понадобиться отношение, которого guidelines не предусматривают, поэтому его собственные guidelines могут добавить тип связи, как могут добавить вид узла.",
    "Как в согласованной формулировке. Почему один тип выражает и уточнение, и расширение, записано в решении от 2026-11-11 (рецензент).");
  const ex = E(k).proposal.examples;
  examples(k, [ex[0], X(
    "`refines`, extending a rule: a rule of a project's own guidelines lists the fixtures of the tests of a check that reads citations, a list that the rule it refines leaves to each project. The closest mistake is an `implements` link from that rule: the rule does not state how the rule it builds on is implemented.",
    "`refines`, расширение правила: правило собственных guidelines проекта перечисляет фикстуры тестов проверки, которая читает ссылки, — этот перечень уточняемое правило оставляет каждому проекту. Ближайшая ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается.")]);
  E(k).proposedDecisions = [
    {
      date: "2026-11-11",
      problem: "Rule 2.3 and the row on the rules of a project's own guidelines say that such a rule refines or extends a rule, while this rule gave `refines` only the meaning of refining.",
      ruling: "The owner: one link type, `refines`, covers both refining and extending, since the line between the two is thin and no check could tell them apart.",
      type: "textual",
    },
    {
      date: "(the date of the owner's answer)",
      problem: "The meaning of `refines` had to cover extending without letting a link weaken the rule it builds on, and without overlapping `implements`.",
      ruling: "The owner agreed to the wording: a node extends another when it adds a requirement on the other's subject that the other leaves open; the linking node leaves every requirement of the linked node in force; a node that states how another is implemented links to it with `implements`.",
      type: "textual",
    },
  ];
  reviewed(k, "review-g1b-e.md");
}
{ // row 10.1.17
  const k = "proposal:row-10-1-17";
  const p0 = part(k, "No sentence of the specification");
  reword(k, "No sentence of the specification",
    p0.en.replace("such as part numbers, one or two in a row.", "such as part numbers, where there are one or two of them in a row."),
    p0.ru);
  if (!part(k, "No sentence of the specification").en.includes("where there are one or two of them in a row")) throw new Error("row 10.1.17 was not changed");
  reviewed(k, "review-g1b-e.md");
}
{ // "What `sheriff reindex` writes"
  const k = "proposal:s-ztseyetus7np6br";
  reword(k, "the location of each node",
    "the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);",
    "расположение каждого узла (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);");
  reword(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status",
    "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header, derived from the domain's nodes, those in the cells of a `TableRule` included (§s-yccuyqbypzzx2gu);",
    "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — статус одобрения заголовка каждого домена, выведенный из узлов домена, в том числе из узлов в ячейках `TableRule` (§s-yccuyqbypzzx2gu);",
    "Узлы в ячейках названы и здесь, как в пункте о разделе (рецензент).");
  reviewed(k, "review-g1b-e.md");
}
drafts["proposal:s-83ev4wwesbwnhnp"] = {
  question: "None: carries out the owner's ruling of 2026-11-06 on rule 1.3.8 (s-9kfdycuq34beqvs), shown to the owner as a proposal",
  location: "spec 10.3",
  sidValue: "s-83ev4wwesbwnhnp",
  proposal: {
    title: "An agent's edit is checked before it is made",
    ruTitle: "Правку агента проверяют до того, как она сделана",
    parts: [
      P("Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:",
        "Прежде чем правка агента сделана, инструменты SpecSheriff отклоняют её, если она сделала бы что-то из этого:",
        SAME),
      L("leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section or another node whose approval status is derived from other nodes;",
        "оставила бы узел одобренным при формулировке, на которую нет одобрения в силе (§s-5ah25f6gy99panq), кроме раздела и другого узла, статус одобрения которого выводится из других узлов;",
        "Было: «…, кроме раздела». Добавлен другой узел, статус одобрения которого выводится из других узлов, теми же словами, что в предлагаемой строке 10.1.8. Без этого правило отклоняло бы правку агента, которая оставляет одобренным заголовок домена, хотя по вашему решению от 2026-11-06 его статус строится и никто его не одобряет; правило расширения не может отменить правило guidelines (правило 1.7.2). Правило по-прежнему не называет расширений (правило 1.7.3). Код уже так поступает (guard.ts:117)."),
      L("change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-rah8b37kytb682y);",
        "изменила бы код, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни у одного теста нет SpecTag этого правила (§s-rah8b37kytb682y);",
        SAME),
      L("change the approvals, the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.",
        "изменила бы одобрения, записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) или её флаг `strict` (§s-q3pfzyaxvpr2zj2), или запись о выбранных проектом расширениях (§s-9ttvcwpqkehm58g) иначе чем через процедуры, которые их записывают или отзывают.",
        SAME),
      P("The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.",
        "Отказ до правки применяется только к правке, в запросе которой названы файлы, которые она пишет, и то, что она в них пишет. Команда оболочки не называет ни того, ни другого.",
        SAME),
    ],
    reason: "An agent that could set an approval status, write an approval, set the `strict` flag or choose an extension itself could make a decision that only the owners make. Every later check takes the approvals as given, so they can be guarded only where they are written.\n\nA commit contains a test and its code together, whichever of them was written first, so the order of the work can be enforced only where the edits are made. Before a shell command runs, no deterministic check can tell which files it will change or how.",
    ruReason: "Агент, который мог бы сам выставить статус, записать одобрение, задать флаг `strict` или выбрать расширение, мог бы принять решение, которое принимают только ответственные. Каждая следующая проверка принимает одобрения как данность, поэтому удержать их можно только там, где их пишут.\n\nКоммит держит тест и его код вместе, что бы ни было написано первым, поэтому порядок работы можно удержать только там, где делаются правки. До запуска команды оболочки ни одна детерминированная проверка не может узнать, какие файлы она изменит и как.",
    reasonChange: SAME,
    refs: [R("cites", "s-5ah25f6gy99panq"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-rah8b37kytb682y"), R("cites", "s-qzthyh7yqvfhsa2"), R("cites", "s-q3pfzyaxvpr2zj2"), R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-67vekyup7y8smap"), R("cites", "s-sfjka4zc4rhfu67")],
    // The node's decisions cite these two; a proposal restates only the wording.
    citedInDecisions: ["s-67vekyup7y8smap", "s-sfjka4zc4rhfu67"],
    removed: [],
    date: DATE,
  },
  review: "review-g1b-e.md proposed the change; written by fix-group1-c.mjs",
};

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
const targets = new Set();
const collect = (file) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c.node) walk(c.node);
  };
  JSON.parse(fs.readFileSync(file, "utf8")).nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(path.join(moved, "spec.json"));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(path.join(moved, "extensions", f));
collect(path.join(root, "specs/_guidelines/tools.json"));
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
const KEYS = [...GROUP, "proposal:s-83ev4wwesbwnhnp"];

for (const key of KEYS) {
  const e = drafts[key];
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title || "", p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join("\n");
  const ru = [p.ruTitle || "", p.ruText, p.ruReason || "", ...(p.examples || []).map((x) => x.ru)].join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !(p.citedInDecisions || []).includes(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (/оглавлени/.test(ru)) problems.push(`${key}: the Russian still says «оглавление»`);
  for (const sentence of [p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`rewrote ${KEYS.length} keys:\n${KEYS.join("\n")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
