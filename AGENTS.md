# Repository instructions for coding agents

## Goal and constraints

Maintain a lean academic site for Melinos Averkiou. Preserve the existing routes (`/`, `/publications/`, `/projects/`, and `/cv/`), restrained academic presentation, blue accent, light/dark themes, and responsive behavior. Prefer small content changes over new features or dependencies.

Never push directly to `master`, merge a pull request, or edit the generated `gh-pages` branch. Work on a branch, validate it, and leave deployment to the reviewed merge workflow.

## Architecture

This is a thin al-folio v1.x Jekyll site. The versioned gems in `Gemfile.lock` own the runtime layouts, includes, and assets. Do not vendor or copy theme-owned `_layouts`, `_includes`, `_plugins`, CSS, or JavaScript into this repository. The sole acknowledged theme override is `_sass/_themes.scss`; its provenance is recorded in `.al-folio-overrides.yml`.

Content lives in:

- `_pages/about.md` for the homepage
- `_bibliography/papers.bib` for publications
- `assets/img/publication_preview/` for publication/project artwork
- `_projects/` for selected project cards
- `_news/` for announcements
- `assets/pdf/averkiou_cv.pdf` for the CV
- `_data/socials.yml` for contact/profile links
- `_config.yml` for configuration

## Content rules

- Verify new publication metadata using primary sources such as the publisher, conference proceedings, DOI record, arXiv paper, or official project repository. Never infer or fabricate a publication.
- Preserve author order and spelling. The scholar configuration recognizes `Melinos Averkiou` and `M. Averkiou`.
- In BibTeX, use bare DOI identifiers, preview filenames rather than paths, and `{true}`/`{false}` for `selected`.
- Store preview images locally and use repository-owned or author-provided artwork when available.
- Use ISO dates (`YYYY-MM-DD`) in new news files.
- Keep the projects page selective and descriptions concise.
- Do not replace the CV with generated or reconstructed content; use a user-provided PDF.

## Required validation

Use Ruby 3.3.5, Bundler 4, Node 20+, and ImageMagick. Before handing off a change, run:

```sh
bundle install
npm ci
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit
npm run format:check
JEKYLL_ENV=production bundle exec jekyll build
npm run purge:css
npx playwright install chromium
npm run test:site
git diff --check
```

For any visual or layout change, inspect both desktop and 390-pixel mobile layouts in light and dark mode. Preserve internal link availability and avoid horizontal overflow.

## Handoff

Summarize content changes, list validation results, and call out any unverified metadata or user-supplied assets still needed. Open a draft pull request for review; do not deploy directly.
