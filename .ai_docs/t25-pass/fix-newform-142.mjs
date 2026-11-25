// Section 10 by the reviewer of 2026-11-10, who consolidated review-8-10.md with the day's rulings. 10.1 keeps only which changes make an approved node a draft;
// 10.2 takes that a withdrawal makes a node a draft and loses the section, which nobody approves; 10.3 gets a draft of its own, the domain's header going to part 14;
// 10.4 approves a wording, not a change. The section's purpose line no longer speaks of a node leaving the specification, which agreed 2.5 holds.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const [a, w, g] = [d["10.1"], d["10.2"], d["10.4"]];
if (a.sidValue !== "s-5ah25f6gy99panq" || w.sidValue !== "s-fpq35tf3pehgk64" || g.sidValue !== "s-t5uw8zfxzhfdg86" || d["10.3"]) throw new Error("unexpected drafts");

Object.assign(a, {
  title: "Which changes make an approved node a draft",
  ruTitle: "Какие изменения делают одобренный узел черновиком",
  text: "An approval covers a node's present wording. That wording is its title, text and reason, and the values the node's kind adds beside them, such as `TextRule.list`.\n\nAny change to that wording makes the node a draft until the wording it then holds is approved. A change made by an owner is no exception.\n\nThe approval status stays as it is through a change to:\n\n- the node's links or its metadata;\n- who its owners are;\n- what is built into it from other nodes;\n- where it is in the specification.\n\nThis rule does not apply to a section, whose approval status is built from the nodes under it (§s-9kfdycuq34beqvs).",
  ruText: "Одобрение покрывает нынешнюю формулировку узла. Эта формулировка — его заголовок, текст и обоснование, а также значения, которые тип узла добавляет к ним, например `TextRule.list`.\n\nЛюбое изменение этой формулировки делает узел черновиком, пока не будет одобрена формулировка, которую узел тогда содержит. Изменение, сделанное самим ответственным, не исключение.\n\nСтатус одобрения остаётся прежним при изменении:\n\n- связей узла или его метаданных;\n- того, кто его ответственные;\n- того, что встроено в него из других узлов;\n- того, где он находится в спецификации.\n\nЭто правило не относится к разделу: его статус одобрения строится из узлов под ним (§s-9kfdycuq34beqvs).",
  reason: "A node requires only what its wording states, so an approval lapses with a change to that wording and with no other change. Everything else about a node changes as the specification grows around it.",
  ruReason: "Узел требует только того, что говорит его формулировка, поэтому одобрение теряет силу при изменении этой формулировки и ни при каком другом. Всё остальное в узле меняется по мере того, как спецификация растёт вокруг него.",
  changes: [
    "Заголовок новый: узел говорит, какие изменения делают одобренный узел черновиком.",
    "Убрано то, что уже говорят согласованные 1.3.1, 1.3.2 и 1.3.3: какие значения у статуса, когда узел одобрен и что раздел никто не одобряет.",
    "Список значений статуса (`draft`, `approved`) при переносе перейдёт в согласованный 1.3.1, который их называет. Смысла это не меняет, поэтому будет одобрено от вашего имени и сообщено одной строкой.",
    "То, что отзыв делает узел черновиком, перешло в 10.2.",
    "«Пока один из его ответственных не одобрит» стало «пока не будет одобрена»: по 1.3.4 одобрить от имени ответственного может и агент.",
    "Обоснование новое: почему одобрение теряет силу только при изменении формулировки. Прежнее повторяло 1.3.2 и 1.3.3.",
    "«NodeKind» заменён по вашему решению: «the node's kind», «тип узла».",
    "Сохраняет sid 1.5.",
  ],
});

Object.assign(w, {
  text: "Anyone may withdraw the approval of a node, except that of:\n\n- a node of the SpecSheriff guidelines a project uses (§s-bsya3febm6u64ab);\n- the rule of the project's own guidelines stating that the specification is approved (§s-qzthyh7yqvfhsa2).\n\nA withdrawal makes the node a draft. It names whoever made it.",
  ruText: "Одобрение узла может отозвать кто угодно, кроме одобрения:\n\n- узла SpecSheriff guidelines, которые использует проект (§s-bsya3febm6u64ab);\n- правила собственных guidelines проекта, которое говорит, что спецификация одобрена (§s-qzthyh7yqvfhsa2).\n\nОтзыв делает узел черновиком. Отзыв называет того, кто его сделал.",
  reason: "A withdrawal gives no agreement in anyone's name, so whoever finds an approved rule wrong can stop any further change to its code (§s-utvqbypzhmgndug) without waiting for its owners. The name on it tells the owners whom to ask. The SpecSheriff guidelines are approved where they are written (§s-bsya3febm6u64ab). The specification's approval is its owners' choice (§s-qzthyh7yqvfhsa2). So neither is anyone's to withdraw.",
  ruReason: "Отзыв ни от чьего имени не даёт согласия, поэтому тот, кто считает одобренное правило неверным, может остановить любые дальнейшие изменения его кода (§s-utvqbypzhmgndug), не дожидаясь его ответственных. Имя в отзыве говорит ответственным, кого спросить. SpecSheriff guidelines одобрены там, где написаны (§s-bsya3febm6u64ab). Одобрение спецификации — выбор её ответственных (§s-qzthyh7yqvfhsa2). Поэтому ни то ни другое не может отозвать кто угодно.",
  changes: [
    "Заголовок новый.",
    "Пункт о разделе убран: раздел никто не одобряет, это говорит согласованный 1.3.3.",
    "«takes» стало «uses», как в согласованном 2.4. Правило не «одобряет спецификацию», а говорит, что она одобрена.",
    "Из 10.1 сюда перешло, что отзыв делает узел черновиком.",
    "Обоснование сокращено. Вместо «кода или его тестов» — «изменения его кода»: где есть код, есть и тест.",
    "Новый sid. Сюда переходит решение от 2026-10-31 о том, кто может отозвать одобрение.",
  ],
});

d["10.3"] = {
  from: "1.6", sid: "kept",
  title: "How a section's approval status is built",
  ruTitle: "Как строится статус одобрения раздела",
  text: "A section's approval status is built from every node under it, at any depth, that is no section. It is `approved` where every one of them is approved, and `draft` otherwise.\n\nThe SpecSheriff tools build it anew after every change to the specification. Nobody writes it by hand.",
  reason: "Built from the nodes under it and anew after every change, the status never falls behind those nodes (§s-kh8qcd5kxgh9z3j).",
  ruText: "Статус одобрения раздела строится из всех узлов под ним, на любой глубине, кроме разделов. Он `approved`, если одобрен каждый из них, и `draft` в противном случае.\n\nИнструменты SpecSheriff строят его заново после каждого изменения спецификации. Вручную его никто не пишет.",
  ruReason: "Построенный из узлов под разделом и заново после каждого изменения, статус никогда не отстаёт от этих узлов (§s-kh8qcd5kxgh9z3j).",
  changes: [
    "Заголовок новый: узел говорит только о разделе.",
    "Статус заголовка домена уходит в часть 14 отдельным узлом.",
    "«Nobody approves a section» убрано: это говорит согласованный 1.3.3.",
    "«Под ним» уточнено словами «на любой глубине»: так инструменты и считают.",
    "Обоснование сокращено до того, зачем статус строится заново.",
    "Сохраняет sid 1.6.",
  ],
  sidValue: "s-9kfdycuq34beqvs",
};

const swap = (node, field, from, to) => {
  if (node[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  node[field] = node[field].replace(from, to);
};
g.title = "An agent approves in an owner's name a wording that states nothing new";
g.ruTitle = "Агент одобряет от имени ответственного формулировку, которая не говорит ничего нового";
swap(g, "text", " The owner may withdraw it.", "");
swap(g, "ruText", " Ответственный может его отозвать.", "");
swap(g, "ruText", "чтобы сказать то, что один из его ответственных одобрил в другом узле", "чтобы сказать то, что один из ответственных за узел одобрил в другом узле");
g.reason = "A change that only states what an owner approved, or changes no meaning, leaves the owners nothing to choose, so showing it again would only spend their attention. An agent working for an owner already acts in their name. The agent's report lets the owner withdraw the approval where the change stated something new (§s-fpq35tf3pehgk64).";
g.ruReason = "Изменение, которое лишь говорит то, что ответственный уже одобрил, или не меняет смысла, не оставляет ответственным выбора, поэтому показ его снова только потратил бы их внимание. Агент, работающий на ответственного, уже действует от его имени. Сообщение агента позволяет ответственному отозвать одобрение, если изменение сказало что-то новое (§s-fpq35tf3pehgk64).";
g.changes = [
  "Текст — абзацы 3–4 нынешнего 1.7.",
  "Заголовок: одобряется формулировка, а не изменение.",
  "Убрано «Ответственный может его отозвать»: отозвать одобрение может кто угодно, это говорит 10.2.",
  "Обоснование сокращено.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

let page = fs.readFileSync(pagePath, "utf8");
const purposeFrom = 'purpose: "Как узел становится одобренным и как уходит из спецификации."';
const rowFrom = '["10.3","move",0,"1.6",';
if (page.split(purposeFrom).length !== 2 || page.split(rowFrom).length !== 2) throw new Error("unexpected page");
page = page.replace(purposeFrom, 'purpose: "Как узел становится одобренным и как теряет одобрение."').replace(rowFrom, '["10.3","split",0,"1.6",');
fs.writeFileSync(pagePath, page);
console.log("section 10 drafted:", ["10.1", "10.2", "10.3", "10.4"].map((k) => d[k].title).join(" | "));
