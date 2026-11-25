# "Term nodes outside the contracts section", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

Term nodes outside the contracts section

## Text

`sheriff validate` refuses each term node (§s-ypa92gpcj3f5zj8) of the specification that is kept outside `specs/contracts/`, the folder of the contracts section (§s-z6tq6a3btnvvwx7, §s-zefk589ykh37b8u, §s-7kc8dw7zdz63q53). The refusal names the node's file and location (§s-kag2m9tzdnduxdx).

## Reason

The contracts section is the only part of the specification kept in `specs/contracts/`, so the folder of a term node's file shows whether the node is in that section.

## Todo

The owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain (§s-7kc8dw7zdz63q53). Once the rules that place every term in the contracts section (§s-ypa92gpcj3f5zj8, §s-7kc8dw7zdz63q53) allow that, this check follows them.
