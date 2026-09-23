# gtnh-java-style-skill

An installable [Agent Skills](https://agentskills.io/) package for GT New Horizons Java code style.

It turns the GTNH Code Style wiki page into a compact agent workflow plus an on-demand reference, so coding agents can apply the conventions while writing and reviewing Java.

## Install with npx

After publishing to npm:

```bash
npx gtnh-java-style-skill
```

Default destination:

```text
~/.agents/skills/gtnh-java-style/
```

Install into another skills directory:

```bash
npx gtnh-java-style-skill --dir ~/.claude/skills
```

Replace an existing installation:

```bash
npx gtnh-java-style-skill --force
```

## Local development

```bash
npm test
npm run check
```

Test the package exactly as npm will publish it:

```bash
npm pack
npx ./gtnh-java-style-skill-0.1.0.tgz --dir ./tmp-skills
```

## Publish

1. Pick an available npm package name if `gtnh-java-style-skill` is already taken.
2. Run `npm login`.
3. Run `npm run check`.
4. Run `npm publish`.

The package has one `bin` entry, so `npx gtnh-java-style-skill` resolves directly to the installer.

## Licensing and attribution

The installer code is MIT licensed. The skill documentation is adapted from the GT New Horizons Wiki “Code Style” page and is licensed under CC BY-SA 4.0. See `LICENSE` for details.
