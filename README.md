# Genial Inc. theme

Hugo theme of the [Genial Inc. website](https://github.com/Genial-Inc/Genial-Inc.github.io).
Requires Hugo **0.168+**. Multilingual-ready (French and English labels included in `i18n/`).

## Templates

```text
layouts/
  baseof.html            page skeleton
  home.html              home page: hero, about, team + poll, projects carousel, contact
  page.html              generic page (e.g. "About us")
  section.html           generic list
  projects/page.html     a project (cover, buttons, content)
  projects/section.html  list of projects
  404.html               shown in every language
  _partials/             head, header, language switcher, footer, cover images, project card
```

## Site parameters

| Parameter | Description |
| --- | --- |
| `description` | Site description (meta description, footer) — usually per language |
| `author` | Copyright holder |
| `themeColor`, `themeColorStrong` | Brand colour and its hover variant |
| `themeColorText` | Text colour on top of `themeColor` (default white) |
| `bigLogo`, `smallLogo`, `favicon` | Paths in `static/` |
| `images` | Default Open Graph image |
| `links.github`, `links.studyProgram`, `links.contactForm`, `links.email` | Footer / contact links (all optional) |
| `hero.project` | Path of the featured project page (its `cover.*` is the background) |
| `hero.title`, `hero.image` | Optional overrides of the project title / cover |
| `hero.description`, `hero.quote`, `hero.quoteAuthor` | Hero texts (the description is shown when there is no quote) |
| `hero.button.text`, `hero.button.url` | Hero button (defaults: "Play" and the project's `params.play`) |
| `about.title`, `about.description`, `about.page` | About section and its "Learn more" page |
| `team.title`, `team.members` | Members: `name`, `shortName`, `description`, optional `image` |

Menu entries are translated with `T .Identifier`; an entry with `params.anchor` links to a section of the home page.

## Project front matter

```yaml
title: My project
date: 2026-01-31
description: One-sentence summary.
params:
  event: Global Game Jam 2026   # badge
  play: /play/my-project/        # "Play" button
  playLabel: Try it              # optional button label
  source: https://github.com/…   # "Source code" button
  link: https://…                # "Official page" button
  coverAlt: Description of cover.png
```

Put a `cover.png`/`cover.jpg` next to `index.<lang>.md`; it is resized and converted to WebP.
