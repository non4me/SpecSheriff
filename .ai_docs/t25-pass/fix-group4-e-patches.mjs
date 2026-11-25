// The patches of round e of group 4, imported by fix-group4-e.mjs: the nits of review-g4d-a.md to review-g4d-d.md and
// the readers' findings of english-g4d-fast.md and english-g4d-thorough.md that fix-brief-group4-e.md asks for.
// Every edit replaces text in place and throws where it does not find the text it replaces.
export const SAME = "Как в согласованной формулировке.";

export function applyPatches(drafts) {
  const rep = (where, s, from, to) => {
    if (typeof s !== "string" || !s.includes(from)) throw new Error(`${where}: no text ${from}`);
    return s.replace(from, to);
  };
  // Replaces text in the fields of the part that starts with `start`: edits is {en: [[from, to]], ru: [...], change: [...]}.
  const edit = (key, start, edits) => {
    const parts = drafts[key].proposal.parts;
    const i = parts.findIndex((x) => x.en.startsWith(start));
    if (i < 0) throw new Error(`${key}: no part starts with ${start}`);
    const x = { ...parts[i] };
    for (const [field, pairs] of Object.entries(edits)) for (const [from, to] of pairs) x[field] = rep(`${key} / ${start} / ${field}`, x[field], from, to);
    parts[i] = x;
  };
  const field = (obj, name, from, to, where) => {
    obj[name] = rep(where, obj[name], from, to);
  };
  const example = (key, lang, from, to) => {
    const p = drafts[key].proposal;
    p.examples = p.examples.map((x, i) => (i === 0 ? { ...x, [lang]: rep(`${key} example`, x[lang], from, to) } : x));
  };
  const FIXTURES_OLD = "it is to read the rule in its last approved wording, as proposal:new-tools-1-project-g4 says.";
  const FIXTURES_NEW = "it is to read the rule in its last approved wording, with its refines links taken from the commit that added that approval (s-5ah25f6gy99panq), as proposal:new-tools-1-project-g4 says.";

  // Item 33: s-7pk89t8z6wymmj9.
  edit("s-7pk89t8z6wymmj9", "Where a check that a project's own guidelines add", {
    en: [["shows what the check printed on its standard output and its standard error", "shows what the check printed to its standard output and its standard error"]],
  });
  edit("s-7pk89t8z6wymmj9", "`sheriff validate` refuses the change where one of the project's own checks", {
    change: [["по правилу 10.12 собственные проверки проекта не меняют файлов,", "по правилу 10.12 собственные проверки проекта оставляют файлы такими, какими они были, кроме тех, которые git игнорирует,"]],
  });

  // Row 10.1.37a: the draft's question field, which is not part of the node.
  field(drafts["proposal:row-10-1-37a"], "question", "whose second step runs a project's own checks, none of which changes a file,", "whose second step requires each of a project's own checks to leave the files as they were, except for those that git ignores,", "proposal:row-10-1-37a question");

  // Item 34: s-nh8b2hjvzasdxmd.
  edit("s-nh8b2hjvzasdxmd", "`sheriff binding` treats each of the following as a location", {
    en: [["regardless of the case of its letters:", "regardless of letter case:"]],
    ru: [["в каком бы регистре ни были написаны его буквы:", "независимо от регистра букв:"]],
  });
  field(drafts["s-nh8b2hjvzasdxmd"].proposal, "reason", "would point at another node, or at none,", "would point to another node, or to none,", "s-nh8b2hjvzasdxmd reason");
  field(drafts["s-nh8b2hjvzasdxmd"], "stage3", FIXTURES_OLD, FIXTURES_NEW, "s-nh8b2hjvzasdxmd stage3");

  // Item 35: s-m8nmfsxkcfu7cjp.
  field(drafts["s-m8nmfsxkcfu7cjp"], "stage3", FIXTURES_OLD, FIXTURES_NEW, "s-m8nmfsxkcfu7cjp stage3");

  // Item 36: s-dbk2vyeg8z5jxna.
  edit("s-dbk2vyeg8z5jxna", "a second rule, in the section of the technical appendix", {
    en: [["in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack,", "in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack,"]],
  });

  // Item 37: s-txbwsthdqhvyzd2 (review d-c, N1).
  edit("s-txbwsthdqhvyzd2", "the merge changes a rule's approved wording", {
    en: [["the merge changes a rule's approved wording, or adds, changes or removes a test or code, only where it does so relative to each of its parents;", "the merge counts as changing a rule's approved wording, or as adding, changing or removing a test or code, only where it does so relative to each of its parents;"]],
  });

  // Item 38: s-jgejd5rpd9d43pd.
  edit("s-jgejd5rpd9d43pd", "A test is marked as skipped", {
    en: [["that the description of the test's language names for that purpose (§s-33fw3ga4ctd94dq)", "that is named for that purpose in the description of the language in which the test is written (§s-33fw3ga4ctd94dq)"]],
    ru: [["которые описание языка теста называет для этой цели (§s-33fw3ga4ctd94dq)", "которые для этой цели называет описание языка, на котором написан тест (§s-33fw3ga4ctd94dq)"]],
  });

  // Row 10.1.41 (review d-c, N2).
  {
    const k = "proposal:row-10-1-41-g4";
    const p = drafts[k].proposal;
    field(p, "reason", "So, if such a test counted, a rule whose only test", "So, if this check accepted such a test, a rule whose only test", `${k} reason`);
    p.reasonChange = "Как в согласованной формулировке; два английских предложения перестроены по замечаниям читателей: «A test run counts neither a skipped test nor a failing test that is expected to fail as failed» и «So, if this check accepted such a test, …», где «counted» без дополнения читалось двояко. Смысл и русский текст те же.";
    field(drafts[k], "change", "второй пункт перечня и одно предложение обоснования.", "второй пункт перечня и два предложения обоснования.", `${k} change`);
  }

  // Item 39: s-qqs2svksmjct753 (review d-c, N3).
  field(drafts["s-qqs2svksmjct753"], "stage3",
    "messageText is to find the comment string as git does in that case, and the scissors line as that string followed by ` ------------------------ >8 ------------------------`.",
    "under `auto` the hook cannot repeat git's choice, so messageText is to treat as the scissors line any single character followed by ` ------------------------ >8 ------------------------`, and under a string, that string followed by the same text.",
    "s-qqs2svksmjct753 stage3");

  // Item 40: s-b6qdtghnyha3fhk (review d-d, N1, and the readers).
  edit("s-b6qdtghnyha3fhk", "In the commit that a ref points to", {
    en: [["from the commit that added the approval of that wording,", "from the commit that added the rule's last approval to `specs/_approvals.jsonl`,"]],
    ru: [["из коммита, который добавил одобрение этой формулировки,", "из коммита, который добавил последнее одобрение этого правила в `specs/_approvals.jsonl`,"]],
  });
  example("s-b6qdtghnyha3fhk", "en", "the project-wide settings give a `testCommand`.", "the project-wide settings set a `testCommand`.");
  example("s-b6qdtghnyha3fhk", "en", "because a `testCommand` is given.", "because a `testCommand` is set.");

  // The change fields that the owner reads on the page name what changed, never who asked for it (fix-brief-group4-e.md).
  const MERGE_OLD = "Новое, ответ, который рекомендует рецензент; это вопрос ответственному.";
  const MERGE_NEW = "Новое: ответ А на вопрос о коммитах слияния в конце страницы, который я рекомендую. Если вы выберете другой ответ, этот абзац изменится или уйдёт.";
  edit("s-txbwsthdqhvyzd2", "`sheriff commit-message` judges a merge commit", { change: [[MERGE_OLD, MERGE_NEW]] });
  edit("s-qqs2svksmjct753", "For a merge commit", { change: [[MERGE_OLD, MERGE_NEW]] });
  field(drafts["proposal:row-10-1-41-g4"], "change", "По замечаниям читателей перестроены, без изменения смысла и русского текста, английские предложения о привязке к коду и тесту, второй пункт перечня и два предложения обоснования.", "Без изменения смысла и русского текста перестроены английские предложения о привязке к коду и тесту, второй пункт перечня и два предложения обоснования, чтобы каждое читалось однозначно.", "proposal:row-10-1-41-g4 change");
  field(drafts["proposal:row-10-1-41-g4"].proposal, "reasonChange", "два английских предложения перестроены по замечаниям читателей: «A test run counts neither a skipped test nor a failing test that is expected to fail as failed» и «So, if this check accepted such a test, …», где «counted» без дополнения читалось двояко.", "два английских предложения перестроены, чтобы читаться однозначно: «A test run counts neither a skipped test nor a failing test that is expected to fail as failed» и «So, if this check accepted such a test, …»; прежнее «counted» без дополнения читалось двояко.", "proposal:row-10-1-41-g4 reasonChange");
  field(drafts["proposal:new-tools-1-project-g4"], "change", "а несколько слов поправлены по замечаниям читателей.", "а несколько английских слов поправлены, чтобы текст читался однозначно.", "proposal:new-tools-1-project-g4 change");
  field(drafts["proposal:new-tools-1-project-g4"].proposal, "reasonChange", "«may give» и «through» — правка английского по замечаниям читателей;", "«may give» и «through» — правка английского, чтобы текст читался однозначно;", "proposal:new-tools-1-project-g4 reasonChange");

  // The proposal for new:tools-1-project.
  edit("proposal:new-tools-1-project-g4", "The SpecSheriff tools read the `TextRule.list` of each rule", {
    en: [["A rule that has never been approved lists nothing.", "A rule that has never been approved counts as listing nothing."]],
    ru: [["Правило, которое ни разу не было одобрено, ничего не перечисляет.", "Считается, что правило, которое ни разу не было одобрено, ничего не перечисляет."]],
  });
}
