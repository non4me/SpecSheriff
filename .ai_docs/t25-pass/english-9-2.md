# The implementation of an approved rule

If the specification's approval status is `approved`, the system's code must implement every approved rule. Such a rule is considered implemented when both of the following hold (§s-8xw4mgvpexyvw5q):
- code of the system other than tests is bound to it (§s-kgbzk2ph9e6jfb4);
- a test bound to it passes.

Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to such a rule, directly or through a chain of such links, counts towards that rule.

The requirement that a rule be implemented does not apply to:
- the rules of the SpecSheriff guidelines and of the extensions that the project has chosen (§s-9ttvcwpqkehm58g);
- the rules of the project's own guidelines;
- a rule of a project's own kind whose nodes require no implementation in code (§s-vsh384ybt4w25a2);
- the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);
- a rule exempted from being implemented (§s-gf6n8ge4mke3pr2).

Reason: An approved rule the system's code does not implement leaves the specification stating what is not true of the system.
