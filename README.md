# Mixtape

A small album browser, used as the JavaScript warm-up for **CEN 5016 - Software
Engineering** at UCF.

Mixtape is deliberately built in the same style as the codebase you will work on
for the Software Development Project: React function components, custom hooks, a
`src/utils.js` of small pure helpers, and a test suite split between unit tests
and UI tests. It is a different application, so nothing here is copy-and-paste
transferable, but every pattern should look familiar when you get to the project.

There is no API key, no database, and no network access required. The album
catalogue is a local JSON file.

---

## Requirements

- **Node.js 24** or newer (`node --version` to check)
- npm 11 or newer, which ships with Node 24

If you need to manage more than one Node version, [nvm](https://github.com/nvm-sh/nvm)
is the usual tool: `nvm install --lts && nvm use --lts`.

## Getting started

```bash
npm install     # install dependencies (a few seconds)
npm run dev     # start the dev server, then open the URL it prints
```

## The commands you will need

| Command | What it does |
|---|---|
| `npm run dev` | Start the app locally with hot reload |
| `npm test` | Run every test once, unit and UI |
| `npm run test:watch` | Re-run tests as you edit |
| `npm run test:unit-only` | Just the pure-function unit tests |
| `npm run test:ui-only` | Just the component UI tests |
| `npm run lint` | Run ESLint |
| `npm run build` | Production build |

## How the code is laid out

```
src/
  App.jsx                 top-level state: search text, favorites, open album
  utils.js                pure helpers, unit tested directly
  utils.test.js           unit tests
  App.test.jsx            UI tests that drive the whole app
  data/albums.json        the album catalogue
  hooks/
    useFavorites.js       favorites, persisted to localStorage
  components/
    AlbumArt.jsx          gradient stand-in for cover art
    AlbumCard.jsx         one album in the grid
    AlbumCard.test.jsx    UI tests for the card
    AlbumGrid.jsx         the grid, plus the empty state
    DetailModal.jsx       details dialog
    FeaturedAlbum.jsx     the hero panel at the top
    SearchBar.jsx         the search input
```

### Two kinds of test

- **Unit tests** (`src/utils.test.js`) call the helpers in `src/utils.js`
  directly. No rendering, no browser.
- **UI tests** (`*.test.jsx`) render real components with
  [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  and interact with them the way a person would: typing into the search box,
  clicking the favorite button. They assert on what the user can see.

Both run under [Vitest](https://vitest.dev/) in the same `npm test` command, and
both run in CI on every push and pull request.

---

## Your task

**`main` is broken.** Run the tests, or look at the Actions tab on GitHub, and
you will find failing tests. They are failing because of real defects in the
application, and each one has a symptom you can see for yourself by running
`npm run dev` and using the app.

Your job is to work through the Git and GitHub workflow described in the
assignment on the course website:

1. Read the CI output and work out what is broken.
2. Open one issue per defect, and put them on a project board.
3. Fix each defect on its own branch.
4. Open a pull request for each fix, review it, and merge it.
5. Confirm CI is green on `main` when you are done.

The fixes themselves are small. The point of this assignment is the workflow
around them, not the number of lines you change.

> [!TIP]
> Start the dev server and use the app before you start reading code. Both
> defects have symptoms that are visible on screen, and seeing them will make
> the failing test names much easier to understand.

### Optional, if you would like to go further

Once CI is green, make one small change of your own on a third branch: a
different accent color, sorting the grid newest-first, showing the genre on each
card, whatever you like. Take it through the same issue, branch, pull request,
review, merge cycle. This is not graded, but it is good practice.

---

## Licence

Course material for CEN 5016 at the University of Central Florida. The album
descriptions are original text written for this exercise; no cover art is
included.
