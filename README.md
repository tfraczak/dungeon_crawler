# [Dungeon Crawler 3000](https://tfraczak.github.io/dungeon_crawler/)

A browser-based dungeon crawler built in vanilla JavaScript and Canvas 2D — no game engine, no runtime dependencies. Procedurally generated rooms, arc-based melee combat, and a from-scratch web-audio sound engine.

[<img src="https://github.com/tfraczak/dungeon_crawler/blob/main/design_docs/main.gif?raw=true" style="height: 300px;">](https://tfraczak.github.io/dungeon_crawler/)

**Play it now:** <https://tfraczak.github.io/dungeon_crawler/>

---

## The Game

You're a rogue, deep in a dank dungeon by your own choice. Legend says **10 gold coins** is enough to retire on, but you still have to climb back out alive.

- **Win:** Collect at least 10 coins, then find a ladder and climb out.
- **Lose:** Your HP hits zero.

Each room is generated the moment you step through a doorway, so no two runs play the same. Once you've stockpiled 10 coins, ladders start appearing in newly entered rooms — find one and escape.

### Features

- Procedurally generated, infinite room graph (1–4 exits per room, weighted toward 2-exit rooms).
- Sword combat with directional swings, knockback, stamina costs, and post-hit invulnerability windows.
- Wandering monsters with line-of-sight detection, chase logic, and varied behaviors.
- Pickups: gold coins (the win currency) and HP potions (dropped by enemies).
- Custom collision-box system tuned to character feet, so hits feel fair.
- Hand-rolled web-audio engine for SFX — no audio assets streamed at runtime.
- Animated sprites, status bars (HP / invulnerability / stamina), and a coin counter HUD.
- Mobile support: thumb joystick, attack/sprint buttons, landscape orientation, configurable zoom via `?zoom=<n>`.

A full controls reference, HUD legend, and combat / stamina rules are available in-game via the **How to play?** button on the title screen.

---

## Tech Stack

- **JavaScript (ES modules)** — game loop, entity logic, collision, sound.
- **Canvas 2D** — all rendering.
- **HTML / Sass** — title screen, HUD overlays, dev drawer, how-to page.
- **Webpack 5 + Babel** — bundling and dev server.
- **Yarn 4 (Berry, via Corepack)** — package manager.
- **GitHub Actions + GitHub Pages** — CI build, lint, and deploy on push to `main`.

---

## Local Development

### Prerequisites

- **Node.js** — version pinned in [`.nvmrc`](./.nvmrc) (currently Node 25). If you use [`nvm`](https://github.com/nvm-sh/nvm), just run `nvm use`.
- **Yarn** via Corepack (ships with modern Node):

  ```bash
  corepack enable
  ```

### Install

```bash
git clone https://github.com/tfraczak/dungeon_crawler.git
cd dungeon_crawler
yarn install --immutable
```

### Run the dev server

```bash
yarn serve
```

This starts `webpack-dev-server` with hot reload on `http://localhost:8080` and opens your default browser. Source files in `src/` rebuild on save.

### Other scripts

| Command           | What it does                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| `yarn serve`      | Dev server with HMR (auto-opens browser).                               |
| `yarn watch`      | Webpack in watch mode without a server (useful when serving externally).|
| `yarn build:dev`  | One-off development build into `dist/`.                                 |
| `yarn build`      | Production build into `dist/` (minified, source maps).                  |
| `yarn lint`       | Run ESLint over `src/`.                                                 |

### Dev Options Drawer

In non-production builds, a **Dev Options** link is rendered on the title screen. It opens a side drawer that toggles cheats and visualizations (god mode, collision box overlay, enemy detect-radius rendering, ladder forcing, map variant cycling, etc.) and persists choices to `localStorage`. The whole module is tree-shaken out in production, so none of it ships to GitHub Pages.

---

## Production Build & Deploy

### Build locally

```bash
yarn build
```

The production bundle, source maps, and processed assets land in `dist/`. The deployable site is the combination of:

- `index.html` (root)
- `dist/` (built JS/CSS bundles)
- `src/assets/` (sprites, audio, map images — referenced directly at runtime)
- `design_docs/` (only used by the README hero images)

### Automated deploy (GitHub Pages)

Pushes to `main` are deployed automatically by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The workflow:

1. Checks out the repo and sets up Node from `.nvmrc`.
2. Enables Corepack and runs `yarn install --immutable`.
3. Runs `yarn lint` and `yarn build`.
4. Stages `index.html`, `dist/`, `src/assets/`, and `design_docs/` into a `_site/` directory.
5. Uploads `_site/` as a Pages artifact and deploys it to the `github-pages` environment.

The live site is served at <https://tfraczak.github.io/dungeon_crawler/>.

### Manual deploy

You can trigger the same workflow manually from the **Actions** tab on GitHub (`workflow_dispatch`), or build locally and host the four directories above on any static file server.

---

## Project Layout

```
.
├── index.html              # title screen, HUD, dev drawer, how-to page
├── src/
│   ├── index.js            # entry point: asset loading + game bootstrap
│   ├── scripts/            # game logic (world, entities, sounds, dev flags, utils)
│   ├── styles/             # Sass partials
│   └── assets/             # sprites, audio, map background images
├── dist/                   # webpack output (gitignored locally, built by CI)
├── webpack.common.js       # shared webpack config
├── webpack.dev.js          # dev server config
├── webpack.prod.js         # production build config
└── .github/workflows/      # CI / Pages deploy
```

---

## License

ISC. See [`package.json`](./package.json).
