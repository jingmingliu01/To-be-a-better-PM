# Agent Notes

## GitHub Pages

This repository has GitHub Pages enabled.

- Publishing source: `main` branch
- Publishing folder: `/docs`

Keep GitHub Pages entry files and generated/static site assets under `docs/`. Do not move the published site to the repository root or another branch unless the GitHub Pages settings are updated at the same time.

## Knowledge Base Pipeline

This repository uses a review-first knowledge pipeline:

1. Raw knowledge notes are first written as Markdown under `knowledge/`.
2. Human review decides whether a note is accurate, useful, and ready to publish.
3. Reviewed notes can then be edited, merged, or transformed into static HTML pages under `docs/`.

Guidelines:

- Treat `knowledge/` as the source and review layer for Markdown notes. Do not assume every Markdown file there is ready for publication.
- Use dated, descriptive kebab-case filenames for new notes, for example `2026-06-16-topic-summary.md`.
- Preserve the original discussion context, the user's questions, the reasoning chain, open questions, and any caveats. These notes are meant to capture knowledge with strong problem awareness, not to be compressed into short blog posts.
- When a reviewed note is published, update the relevant HTML entry points, navigation, styles, and scripts under `docs/`.
- Do not place unreviewed raw Markdown notes directly into `docs/` unless the GitHub Pages publishing workflow is intentionally changed.

## Markdown Metadata

Every Markdown note under `knowledge/` should start with YAML front matter:

- Required fields: `title`, `date`, `status`, `source`, `tags`.
- Use `status: raw-note` for unreviewed source notes.
- Keep `tags` topical and reusable, such as domains, concepts, industries, people, or methods. Do not use repository names, slogans, or broad collection labels as tags.
- Prefer concise metadata. Put nuance, uncertainty, and publication caveats in the body of the note.
