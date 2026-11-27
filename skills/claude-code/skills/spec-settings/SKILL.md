---
name: spec-settings
description: Showing and changing the settings that only an owner of the specification changes — its approval status, its strict flag and the extensions of the guidelines that the project has chosen. Use when an owner wants to approve the specification or return it to draft status, turn the strict flag on or off, or choose or drop an extension.
---

# spec-settings

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

1. Run `sheriff settings` at the root of the repository with no arguments, and show the user in the
   chat what it prints: the approval status, the `strict` flag and each extension that the plugin
   delivers.
2. Ask the user in which of these two ways they want to change the settings:
   - by running `sheriff settings` in a separate terminal window, where the command itself asks the
     user about each change. Offer this only where you can open such a window on the
     graphical desktop of the machine that runs this session: on Windows, on macOS, or on Linux with
     `DISPLAY` or `WAYLAND_DISPLAY` set;
   - through questions in the chat.
3. If the user chose questions in the chat, ask which change the user wants, and run
   `sheriff settings` with the arguments for that change: `status approved`, `status draft`,
   `strict on`, `strict off`, `extension <name> on` or `extension <name> off`. Show what it prints.
   If the checks that run before the specification is approved find problems, show what they found, and run
   `sheriff settings status approved --confirm` only when the user tells you to.
4. If the user chose the terminal window, run `sheriff settings` with no arguments again
   once the window closes, and report how the settings differ from those shown in step 1.
