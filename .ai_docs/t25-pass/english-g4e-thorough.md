### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-7pk89t8z6wymmj9 — How a project's own check is run
TRANSLATION: Отказ или сообщение называет проверку и показывает, что эта проверка вывела в свой стандартный поток вывода и в свой стандартный поток ошибок.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-nh8b2hjvzasdxmd — A node's location outside the specification
TRANSLATION: (1) `sheriff binding` считает расположением каждое из перечисленного ниже, независимо от регистра букв: (2) После изменения порядка расположение, оставшееся в файле, указывало бы на другой узел спецификации или ни на какой, и ни одна другая проверка этого бы не заметила.
TWO READINGS:
- "it": (а) само расположение, оставшееся в файле; (б) то, что расположение теперь указывает на другой узел или ни на какой. Контекст допускает оба чтения, и практический смысл у них один.
- "a location left in a file": (а) расположение, которое осталось в файле после изменения порядка; (б) расположение, которое кто-то оставил (записал) в файле. Контекст поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-dbk2vyeg8z5jxna — Generated copies checked against their nodes
TRANSLATION: второе правило в разделе технического приложения (§s-tj38pvm38nepaf5), посвящённом стеку, которое перечисляет такие файлы;
TWO READINGS:
- "a second rule": (а) ещё одно правило сверх первого, то есть случай, когда такие файлы перечисляют два правила или больше; (б) именно второе по порядку правило раздела. Контекст поддерживает (а). Неясно и то, отвергается только лишнее правило или сам факт, что их два.
- "the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack": (а) sid обозначает техническое приложение; (б) sid обозначает раздел о стеке. Другие узлы ставят этот sid сразу после "the technical appendix", поэтому контекст поддерживает (а). Читатель одного этого пункта скорее выберет (б).
- "that lists such files": (а) перечисляет правило; (б) перечисляет раздел. Запятые поддерживают (а).
- "such files": отсылает назад, за пределы пункта. Скорее всего, это файлы для типов и RuntimeChecks, которые генерируются из RecordTypes и названы в первом пункте того же списка.
LANGUAGE:
- "in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack" → "in the section on the stack of the technical appendix (§s-tj38pvm38nepaf5)" — скобка с sid отрывает "on the stack" от "section", и читатель спотыкается. Замена сохраняет смысл, только если sid обозначает приложение.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-txbwsthdqhvyzd2 — An approved rule whose tests or code lag behind it
TRANSLATION: считается, что merge-коммит изменяет одобренную формулировку правила либо добавляет, изменяет или удаляет тест или код, только там, где он делает это относительно каждого из своих родителей;
TWO READINGS:
- "its parents": (а) родительские коммиты merge-коммита; (б) родители правила, то есть узлы над ним в дереве спецификации. Контекст поддерживает (а).
- "relative to each of its parents": (а) изменение есть при сравнении с каждым родителем без исключения; (б) изменение рассматривается по отдельности для каждого родителя, и достаточно одного. Слова "only where" и "each" поддерживают (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-jgejd5rpd9d43pd — An approved rule without code or a test
TRANSLATION: Тест помечается как пропускаемый или как ожидаемо падающий меткой, вызовом или опцией, которые названы для этой цели в описании языка, на котором написан тест (§s-33fw3ga4ctd94dq).
TWO READINGS:
- "is marked as skipped or as expected to fail by": (а) определение: тест считается помеченным, если на нём есть такая метка, вызов или опция; (б) описание способа: тесты помечают вот так. Для правила проверки естественно (а), но формулировка этого не говорит.
- "that is named for that purpose": (а) перечислены в описании языка как служащие этой цели; (б) получили своё имя ради этой цели, то есть так называются. Контекст поддерживает (а).
- "that is named": (а) относится ко всем трём — метке, вызову и опции; (б) относится только к "an option". Контекст поддерживает (а), а единственное число "is" грамматически допускает (б).
- "the description of the language": (а) узел спецификации, описывающий язык, на который указывает sid; (б) документация самого языка. Sid в скобках поддерживает (а).
LANGUAGE:
- "that is named for that purpose in the description of the language" → "that the description of the language in which the test is written lists for that purpose" — "named for" по-английски чаще значит «назван в честь» или «назван ради». Замена сохраняет смысл, только если подразумевалось «перечислены».
- "marked as skipped or as expected to fail by a mark" → "marked as skipped or as expected to fail with a mark" — "by" после пассива читается как деятель, а средство вводится через "with". Повтор "marked … a mark" остаётся, потому что "mark" — термин pytest.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · proposal:row-10-1-41-g4 — a row of the main table of checks
TRANSLATION: Поэтому, если бы эта проверка принимала такой тест, правило, единственный тест которого помечен одним из этих двух способов, проходило бы и эту проверку, и запуск тестов, в то время как правило ничто не проверяет.
TWO READINGS:
- "nothing checks the rule": (а) ни один тест на деле не проверяет, что код выполняет правило; (б) ни одна проверка (check) не проверяет правило. Чтение (б) противоречит началу предложения, где правило проходит "this check". Контекст поддерживает (а), но слово "check" употреблено в предложении в двух смыслах.
- "while": (а) «хотя», противопоставление; (б) «в то время как», одновременность. Контекст поддерживает (а).
- "either of these ways": отсылает назад. Скорее всего, это два случая из предыдущего предложения: пропущенный тест и падающий тест, от которого падение ожидается. Там они названы как виды тестов, а не как способы пометки.
- "such a test": отсылает назад. Скорее всего, это тест, помеченный как пропускаемый или как ожидаемо падающий, из предыдущего предложения.
LANGUAGE:
- "would pass this check and the test run" → "would pass this check, and the test run would not fail" — правило не «проходит запуск тестов»: запуск проходит или падает сам. Не уверен, что замена точно передаёт задуманное.
- "while nothing checks the rule" → "although no test would check the rule" — после "would pass" нужно согласование времён, а "while" двусмысленно. Замена "nothing" на "no test" сохраняет смысл, только если имелось в виду чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · s-b6qdtghnyha3fhk — Running the tests before a push
TRANSLATION: (1) Они берут связи `refines` каждого правила из того коммита, который добавил последнее одобрение этого правила в `specs/_approvals.jsonl`, поскольку одобрение не охватывает связи (§s-5ah25f6gy99panq). (2) Спецификация одобрена, и общепроектные настройки задают `testCommand`. (3) Наиболее вероятная ошибка — запустить тесты из-за того, что `testCommand` задан.
TWO READINGS:
- "They": отсылает назад. Скорее всего, это инструменты SpecSheriff ("the SpecSheriff tools"), названные двумя предложениями раньше в том же абзаце. Предыдущее предложение тоже начинается с "They".
- "the rule's last approval": (а) самое недавнее одобрение правила; (б) окончательное одобрение. Контекст поддерживает (а). Не сказано, на какой момент оно последнее, хотя предыдущее предложение уточняет "as of that commit".
- "an approval does not cover links": (а) одобрение не фиксирует связи, поэтому их состояние берут из дерева того коммита; (б) одобрение на связи не распространяется: связи не одобряются, и их изменение не меняет статус одобрения. При чтении (б) неясно, почему связи берутся именно из коммита одобрения, а не из текущего. Контекст поддерживает (а).
- "take … from the commit": (а) из состояния файлов, каким его оставляет этот коммит; (б) из изменений, которые внёс этот коммит. Контекст поддерживает (а).
LANGUAGE:
- "the rule's last approval" → "the rule's latest approval" — "last" допускает чтение «окончательное».
- "the project-wide settings set a `testCommand`" → "the project-wide settings define a `testCommand`" — "settings set" рядом режет слух, и носитель так не напишет.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4e.md · proposal:new-tools-1-project-g4 — What the SpecSheriff tools read in the project's own guidelines
TRANSLATION: Правило, которое ни разу не было одобрено, считается ничего не перечисляющим.
TWO READINGS: none
LANGUAGE: none
