# Keeping the website current

Most updates only touch one content file. Use a branch and pull request; merging to `master` publishes automatically after the checks pass.

## Add a publication

1. Verify the title, author order, venue, year, DOI, and links against the publisher or conference page.
2. Add the preview image to `assets/img/publication_preview/`.
3. Add the BibTeX entry near the top of `_bibliography/papers.bib`.
4. If it is newsworthy, add a dated item under `_news/`.
5. If it belongs in the selected project gallery, add a card under `_projects/` and adjust the other `importance` values if needed.

Minimal example:

```bibtex
@inproceedings{Surname:2026:ShortName,
  author    = {Surname, First and Averkiou, Melinos},
  title     = {Full Paper Title},
  booktitle = {Conference Name},
  year      = {2026},
  month     = {jun},
  pages     = {1--10},
  doi       = {10.xxxx/example},
  abstract  = {One concise, factual summary.},
  website   = {https://example.org/project/},
  code      = {https://github.com/example/repository},
  pdf       = {https://example.org/paper.pdf},
  arxiv     = {2601.01234},
  preview   = {short-name.jpg},
  selected  = {true}
}
```

Use a bare DOI, not a full `https://doi.org/...` URL. `preview` is only the filename. Omit unknown fields instead of guessing. Use `selected = {true}` only for papers that should appear on the homepage.

## Add a news item

Create the next numbered file, for example `_news/announcement_10.md`:

```markdown
---
layout: post
date: 2026-01-15
inline: true
---

Our paper [Short Name](https://example.org/) was accepted at Conference 2026. The [code](https://github.com/example/repository) is available online.
```

Always use an ISO date (`YYYY-MM-DD`) so sorting is predictable.

## Add or change a project card

Create or edit a file under `_projects/`:

```markdown
---
layout: page
title: Project Name
description: One short sentence describing the contribution.
img: assets/img/publication_preview/project-image.jpg
importance: 1
redirect: https://example.org/project/
---
```

Lower `importance` values appear first. Keep the gallery focused on a small selection rather than duplicating the full publication list.

## Update the CV, biography, or links

- Replace `assets/pdf/averkiou_cv.pdf` without changing its filename.
- Edit the biography in `_pages/about.md`.
- Edit email and profile links in `_data/socials.yml`.
- Update titles, analytics, or feature flags in `_config.yml`.

## Ask an agent to do an update

A useful request is:

> Update my website with this publication: [publisher/project URL]. Verify the metadata from primary sources, add the publication, preview image, news item, and project card if appropriate. Build and test it, then open a pull request. Do not merge or deploy directly.

The agent can clone the repository, work in its container, and open a pull request. No local setup is required unless you want to edit or preview the site yourself. Repository write access is required only to push the review branch; production changes only after you merge it.

## Upgrade safely

The site intentionally keeps only one theme override: `_sass/_themes.scss`, for the blue accent color. Do not copy al-folio layouts or includes into the repository unless there is a documented need. Before merging dependency updates, run the audit, production build, formatting check, and browser tests listed in `README.md`.
