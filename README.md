# Melinos Averkiou — academic website

Source for [melinos.github.io](https://melinos.github.io/), built with Jekyll and the current thin al-folio starter. Content stays in this repository while layouts and components come from versioned al-folio gems, which keeps upgrades smaller than maintaining a full theme fork.

## Content map

- `_pages/about.md` — homepage biography and profile
- `_bibliography/papers.bib` — publication metadata
- `assets/img/publication_preview/` — publication and project images
- `_projects/` — project cards
- `_news/` — homepage news items
- `assets/pdf/averkiou_cv.pdf` — downloadable CV
- `_data/socials.yml` — profile and social links
- `_config.yml` — site and feature settings

See [MAINTENANCE.md](MAINTENANCE.md) for copy-and-paste update examples.

## Local development

Prerequisites: Ruby 3.3.5, Bundler 4, Node 20 or newer, and ImageMagick.

```sh
bundle install
npm ci
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000>. For a production-equivalent check:

```sh
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit
npm run format:check
JEKYLL_ENV=production bundle exec jekyll build
npm run purge:css
npx playwright install chromium
npm run test:site
```

## Publishing

Work on a branch and open a pull request against `master`. Pull requests build and test with read-only repository access. After a reviewed pull request is merged, the same tested artifact is published to the generated `gh-pages` branch. Do not edit `gh-pages` by hand.

Dependabot proposes grouped monthly updates for Ruby, JavaScript, and GitHub Actions dependencies. Review and merge those only after the checks pass.
