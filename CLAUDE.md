# EasyRunner Docs

Documentation site for EasyRunner, built with **MkDocs** + **Material for MkDocs**.

- Config: [mkdocs.yml](mkdocs.yml) (nav, theme, markdown extensions)
- Content: [docs/](docs/)
- Build locally: `.venv/bin/mkdocs build --strict` (use `serve` for live preview)

## Authoring with Material for MkDocs

When formatting docs, **use the full range of Material for MkDocs formatting features** — don't fall back to plain paragraphs when a richer, clearer construct fits. Reach for admonitions, content tabs, grid cards, code annotations, buttons, icons/emoji, etc. where they improve scannability.

### Free version only — no Insiders/Sponsor features

We run the **free community edition** (`mkdocs-material` 9.7.6, see [pyproject.toml](pyproject.toml)). We do **not** have Insiders/Sponsor access.

**Rule:** before using any Material feature, confirm it works in the community edition. In the Material docs, anything flagged "Sponsors only" / Insiders is off-limits. If a feature silently does nothing after `mkdocs build`, suspect it's Insiders-only.

Common **Insiders-only** features to avoid (verify against the docs, as this shifts per release):

- Theme features: `navigation.instant.prefetch`, `navigation.instant.progress`, `navigation.path` (breadcrumbs), `content.code.select`
- Plugins: `optimize`, `typeset`, `group`, `projects`, and several `tags` extras (tag hierarchies/listings)

(`navigation.instant`, the `privacy` and `meta` plugins, social cards, and grid cards are all free and fine to use.)

### Free features available right now

Already enabled in [mkdocs.yml](mkdocs.yml) — use freely:

- **Admonitions** — `!!! note`, plus all types (`tip`, `warning`, `success`, `danger`, `question`, `example`, `quote`, …) and collapsible variants (`???`, `???+`) via `pymdownx.details`.
- **Content tabs** — `=== "Tab"` (`pymdownx.tabbed`, `content.tabs.link` keeps tabs in sync across the page).
- **Grid cards** — `<div class="grid cards" markdown>` with `-   #### Title` items (note the 3-space indent and `md_in_html`; markdownlint MD030/MD033/MD001 warnings on this pattern are expected — ignore them).
- **Code blocks** — copy button (`content.code.copy`), annotations (`content.code.annotate`, the `(1)` markers), titles, line numbers, and `hl_lines` highlighting via `pymdownx.highlight`/`superfences`.
- **Inline formatting** — highlight `==mark==`, strike `~~del~~`, sub `~x~`, super `^x^` (`pymdownx.caret`/`mark`/`tilde`).
- **Icons & emoji** — `:material-rocket-launch:`, `:fontawesome-brands-github:`, etc. (`pymdownx.emoji`, twemoji).
- **Buttons** — `[Label](url){ .md-button }` / `{ .md-button .md-button--primary }` via `attr_list`.
- **Mermaid diagrams** — fenced ` ```mermaid ` blocks.
- **Snippets / includes** — `pymdownx.snippets`.
- **Figures & image alignment** — `md_in_html` (`<figure>`, `{ align=left }`, light/dark `#only-light`/`#only-dark`).

### Free features that need enabling first

Add to `markdown_extensions` in [mkdocs.yml](mkdocs.yml) when you need them (all free):

- `tables` — GitHub-style tables (not currently enabled)
- `pymdownx.tasklist` — `- [x]` task lists
- `pymdownx.keys` — keyboard keys, e.g. `++ctrl+c++`
- `footnotes` — `[^1]` footnotes
- `def_list` — definition lists
- `abbr` (+ `pymdownx.snippets` glossary) — abbreviation tooltips

Always run `.venv/bin/mkdocs build --strict` after changes and confirm the feature actually renders.

## Content Authoring and Site Information Architecture

The strategy is available in @STRATEGY.md