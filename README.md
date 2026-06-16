# To be a better PM

A review-first knowledge base for product management, AI product thinking, commercialization frameworks, project retrospectives, and automation-ready macro report prompts.

## Published Site

- Site: https://jingmingliu01.github.io/To-be-a-better-PM/
- Source branch: `main`
- Publishing folder: `docs/`

## Repository Structure

- `docs/`: GitHub Pages static site assets. Only reviewed and publication-ready HTML/CSS/JS should live here.
- `knowledge/`: raw Markdown knowledge notes awaiting review. Every note should use YAML front matter with `title`, `date`, `status`, `source`, and `tags`.
- `macro-reports/`: automation-ready macroeconomic report prompts and future generated report files.
- `AGENTS.md`: repository instructions for Codex and other coding agents.

## Knowledge Workflow

1. Capture raw discussions, research chains, and useful thinking in `knowledge/`.
2. Preserve the original questions, reasoning, caveats, and open issues.
3. Review and refine notes before publishing.
4. Convert reviewed material into static pages under `docs/`, then update navigation and assets there.

## Macro Report Automations

The `macro-reports/` directory contains prompts and an agent guide for creating Codex Automations that generate monthly, quarterly, and annual macroeconomic reports.

To install those automations in another repo, copy `macro-reports/` and ask Codex:

```text
请读取 macro-reports/create-codex-automations-agent-guide.md，并按里面的说明在当前 repo 创建 Codex Automations。
```

## Repository Hygiene

- GitHub Pages entry files stay under `docs/`.
- Raw Markdown notes stay under `knowledge/`.
- Generated macro reports stay under `macro-reports/`.
- OS metadata files such as `.DS_Store` are ignored and should not be committed.
