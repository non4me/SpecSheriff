# "The settings that only an owner of the specification changes", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

The settings that only an owner of the specification changes

## Text

`sheriff settings` shows and changes the settings that only an owner of the specification changes: the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g).

Run in a terminal with no arguments, `sheriff settings` shows the settings that only an owner changes, and every extension that the plugin delivers. It then lets the person who runs it change each of them. Run with no terminal attached and with no arguments, it prints them.

Run with one of the following sets of arguments, `sheriff settings` makes that one change:
- `status approved` or `status draft`, for the specification's approval status;
- `strict on` or `strict off`, for the `strict` flag;
- `extension <name> on` or `extension <name> off`, for the choice of an extension.

`sheriff settings` records each change as an entry in `sheriff.config.json` that names the person who made the change, by the email address set in git's configuration. It records a change only when that person is an owner of the specification (§s-6sk8uet75dmq5qz), and refuses it otherwise.

`sheriff settings` records or refuses each change as required by the rules on the approval status, on the `strict` flag and on withdrawing an extension (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Where those rules require the owner to confirm an approval and no terminal is attached, the owner confirms it by adding `--confirm` to `status approved`, personally or through an agent working for that owner.

`sheriff settings` records the choice of an extension only where the plugin delivers that extension (§s-j5qmmdq4m26mdvw).

A refusal caused by the `strict` flag names, for each check that would refuse, the command that lists what that check finds:
- `sheriff untagged`, for the check for code without a SpecTag (§s-weuyx98r7c923ab);
- `sheriff validate --strict`, for a project's own checks: it runs the project's own checks as if the specification were approved and its `strict` flag were on (§s-7pk89t8z6wymmj9).

## Reason

An agent may record a change to the specification's approval status, its `strict` flag or its chosen extensions only through a procedure (§s-83ev4wwesbwnhnp). `sheriff settings` is that procedure, for an owner at a terminal and for an agent working for that owner alike.

## Example

The agent runs `sheriff settings status approved`. The checks find two symbols without a SpecTag, and the command prints them and records nothing. The owner agrees, and the agent runs `sheriff settings status approved --confirm`. But not: the first run records the approval.
