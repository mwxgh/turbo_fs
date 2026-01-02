# Turbo FS

A modern **Turborepo** monorepo set up for building and shipping a web app + API with a shared UI system.

- **Apps** live in `apps/*`
- **Reusable packages** live in `packages/*`
- **One-command** local dev via pnpm scripts

---

## Monorepo layout

| Workspace       | Path                         | What it is                                            |
| --------------- | ---------------------------- | ----------------------------------------------------- |
| Web app         | `apps/web`                   | Next.js + Tailwind CSS                                |
| API             | `apps/api`                   | API service                                           |
| UI library      | `packages/ui`                | Shared React components + Tailwind                    |
| TS config       | `packages/typescript-config` | Shared `tsconfig` presets (`@repo/typescript-config`) |
| ESLint config   | `packages/eslint-config`     | Shared lint rules (`@repo/eslint-config`)             |
| Tailwind config | `packages/tailwind-config`   | Shared Tailwind preset                                |

---

## Quick start

### 1) Install

```sh
pnpm install
```

### 2) Run everything

```sh
pnpm dev
```

### 3) Build

```sh
pnpm build
```

### 4) Lint & typecheck

```sh
pnpm lint
pnpm typecheck
```

---

## UI package notes (`packages/ui`)

The UI package is designed to be consumed by the apps while keeping Tailwind usage predictable.

- Builds compiled styles into `packages/ui/dist`
- Apps can consume UI components directly (commonly via Next.js `transpilePackages`)
- Tailwind class collisions are avoided by using a `ui-` prefix for UI components

### Tailwind content configuration

If you consume `packages/ui` **from source** (without transpiling/building), ensure your app Tailwind config scans UI files.

Example (see [`packages/tailwind-config/tailwind.config.ts`](packages/tailwind-config/tailwind.config.ts)):

```js
content: [
  // app content
  `src/**/*.{js,ts,jsx,tsx}`,
  // include packages
  "../../packages/ui/*.{js,ts,jsx,tsx}",
],
```

If you choose this strategy, you may be able to remove `tailwindcss` and `autoprefixer` deps from `packages/ui`.

---

## Scripts (common)

> Exact script names can vary by workspace. Check the root `package.json` for the source of truth.

- `pnpm dev` — start dev mode (apps + packages)
- `pnpm build` — build all workspaces
- `pnpm lint` — lint all workspaces
- `pnpm typecheck` — run TypeScript across the repo

---

## Conventions

- **TypeScript everywhere**
- Shared TS presets via `@repo/typescript-config`
- Keep UI exports explicit and stable

---

## Troubleshooting

### TS config preset not found

If you see an error like:

> File '@repo/typescript-config/react-library.json' not found

Make sure the consuming package extends the preset using the package name:

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```
