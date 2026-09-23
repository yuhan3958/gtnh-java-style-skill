---
name: gtnh-java-style
description: Use when writing, reviewing, refactoring, or formatting Java code for GT New Horizons (GTNH), especially when a task mentions GTNH, GregTech 5 Unofficial, GTNH mods, Spotless, Java code style, naming, comments, logging, declarations, deprecation, or pull-request readability.
license: CC-BY-SA-4.0
metadata:
  source: https://wiki.gtnewhorizons.com/wiki/Code_Style
  version: "0.1.0"
---

# GTNH Java Style

Apply GTNH's Java conventions while keeping behavior changes and style changes easy to review.

## Priority order

1. Preserve correctness and requested behavior.
2. Follow repository-local formatter/linter configuration, especially Spotless.
3. Apply the GTNH conventions in [references/style-guide.md](references/style-guide.md).
4. Prefer readability when a literal rule would create needless ceremony, unless the readable shortcut introduces a known pitfall.

Do not churn unrelated legacy code merely to make it match the guide.

## Workflow

Before editing, inspect nearby code and build configuration. Determine whether the module exposes Spotless tasks and whether modern Java syntax is enabled.

While editing:

- Keep files reasonably sized; treat 2000 lines as a warning sign, not an automatic refactor mandate.
- Order class members consistently: static fields, instance fields, constructors, then methods grouped by functionality.
- Delete commented-out code instead of preserving it as comments.
- Prefer code that explains itself; write comments for intent, constraints, or non-obvious reasoning rather than narrating syntax.
- Declare variables at the beginning of the relevant block and initialize locals at declaration when practical.
- Use descriptive mixed-case names: noun-like classes, verb-like methods, meaningful variables.
- Avoid unexplained magic constants and chained assignments.
- Keep fields non-public unless public state is genuinely part of the API.
- Keep `@Deprecated` and `@deprecated` Javadoc paired, and point to the replacement.
- Use parentheses generously in mixed-operator expressions when they improve clarity.
- For GTNH logs, normally use one write call per line; keep one-sentence messages lowercase.
- Do not use wildcard imports; static wildcard imports are allowed.

After editing, run the repository's formatter/checker if available. Prefer the project's own Gradle tasks over manually reformatting around them.

## Review output

When reviewing code, report concrete violations with the smallest useful fix. Separate formatter-enforced issues from judgment calls. If a proposed style change would reduce readability or create broad diff noise, leave it alone and explain why.

For exact examples and edge cases, read [references/style-guide.md](references/style-guide.md).
