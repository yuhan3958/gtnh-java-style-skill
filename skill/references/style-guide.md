# GTNH Java Code Style Reference

Source: GT New Horizons Wiki, “Code Style” — https://wiki.gtnewhorizons.com/wiki/Code_Style

This reference is an adapted, condensed form of that page. The source wiki content is available under CC BY-SA 4.0; this adaptation is distributed under the same terms.

## Philosophy and formatter

Consistency exists to reduce maintenance cost and make pull requests easier to read. Code is read far more often than it is written. Use good judgment: readability may override a guideline when strict compliance would be needless or less clear, but do not trade away safety merely for visual simplicity.

GTNH uses Spotless for line wrapping, spacing, and indentation. When a repository provides Spotless tasks, treat their result as authoritative for mechanical formatting.

## File and class organization

Avoid files longer than **2000 lines** when practical.

Inside a class or interface, use this broad order:

1. Optional documentation comment.
2. Class or interface declaration.
3. Optional implementation-wide comment.
4. Static fields: public, protected, package-private, private.
5. Instance fields in the same accessibility order.
6. Constructors.
7. Methods grouped by functionality, not by visibility. A private helper may sit between public methods if that makes the feature easier to follow.

## Comments

Delete commented-out code; Git history already preserves old implementations. Avoid comments that are likely to become stale. Before adding a comment, consider whether clearer code would remove the need for it. Do not decorate comments with giant boxes of asterisks.

Use `//` for a short single-line comment. For a multi-line explanatory comment, use a conventional block:

```java
/*
 * Explain the non-obvious reason here.
 */
```

`@author` is optional because version control already records authorship.

## Declarations

Prefer one declaration per line unless variables are tightly coupled, such as 3D coordinates:

```java
int x, y, z;
```

Never mix declaration styles or types in a confusing declaration. Initialize local variables where they are declared unless some required computation must happen first.

Place declarations at the **beginning of blocks**. In this guide, a block is code enclosed by braces. Avoid delaying a declaration until its first use.

## Statements

When modern Java syntax is enabled for the mod, prefer a modern switch form:

```java
switch (condition) {
    case ABC, DEF, KLM -> {
        handleGroup();
    }
    case XYZ -> {
        handleXyz();
    }
    default -> {
        handleDefault();
    }
}
```

Do not introduce syntax newer than the module's configured Java compatibility allows.

## Naming

- **Classes:** noun-like, descriptive UpperCamelCase names. Prefer whole words; use acronyms only when widely understood.
- **Interfaces:** UpperCamelCase like classes.
- **Methods:** verb-like lowerCamelCase names, such as `run()` or `getBackgroundColor()`.
- **Variables:** meaningful lowerCamelCase names. Start with a letter rather than `_` or `$`.

Short names are fine when their role is obvious and local; otherwise optimize for intent rather than keystrokes.

## GTNH log formatting

For uniform logs, normally use **one write call per line**. A one-sentence log message should usually begin lowercase. If the message contains multiple sentences, normal sentence capitalization is appropriate.

## Programming practices

Do not expose instance or class variables as `public` without a good reason. Prefer behavior-oriented methods over direct mutable state access when that produces a clearer API.

Replace unexplained literal values with well-named constants when the value has domain meaning:

```java
private static final int RECIPE_ID = 16281;

methodName(RECIPE_ID);
```

Avoid chained assignments such as:

```java
fooBar.fChar = barFoo.lchar = 'c';
```

They save little space and make state changes harder to scan.

## Deprecation

`@Deprecated` and the `@deprecated` Javadoc tag must appear together. The Javadoc should identify the replacement or migration path.

```java
/**
 * @deprecated use {@link DBHelper#update(String, Map)}
 */
@Deprecated(forRemoval = true)
public int insert(String request, Map<String, ?> params) {
    // existing behavior
}
```

## Parentheses

Use **parentheses** liberally when expressions mix operators and grouping could otherwise be misread. Prefer:

```java
if ((a == b) && (c == d)) {
    run();
}
```

over relying on every reader to mentally evaluate precedence correctly.

## Imports

Do not use wildcard imports. GTNH checks this automatically.

Prefer explicit imports:

```java
import java.util.List;
import java.util.Map;
```

Avoid:

```java
import java.util.*;
```

Static wildcard imports are allowed:

```java
import static org.junit.Assert.*;
```

## Review checklist

Check in this order: formatter/Spotless, member organization, comments, declarations, naming, GTNH log style, field visibility, constants, assignments, deprecation pairing, then expression clarity. Keep fixes local to the touched code unless the user explicitly requests a broader cleanup.
