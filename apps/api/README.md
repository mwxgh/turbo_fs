# API (NestJS)

NestJS API service for the **turbo_fs** monorepo.

## Requirements

- Node.js + pnpm
- MySQL (or compatible) database

## Getting started

From the repo root:

```bash
pnpm install
```

Run the API in watch mode:

```bash
pnpm --filter api dev
```

Build:

```bash
pnpm --filter api build
```

Start the compiled server:

```bash
pnpm --filter api start:prod
```

## Database & migrations (TypeORM)

This service uses TypeORM.

### Passing the migration name

The migration scripts are written to read the migration name from `npm_config_name`:

- `m:generate`: `npm run twd -- migration:generate src/database/migrations/${npm_config_name} -p`
- `m:create`: `npm run typeorm -- migration:create src/database/migrations/${npm_config_name}`

That means you must pass the name using `--name=...`.

From the repo root (works when `--name` is forwarded correctly):

```bash
# Generate a migration
pnpm --filter api m:generate --name=create_users

# Create an empty migration template
pnpm --filter api m:create --name=add_index

# Run pending migrations
pnpm --filter api m:run

# Revert last migration
pnpm --filter api m:revert
```

If pnpm in your setup does **not** forward `--name` into `npm_config_name`, run via npm inside `apps/api`:

```bash
cd apps/api
npm run m:generate --name=create_users
npm run m:create --name=add_index
```

## Lint

```bash
pnpm --filter api lint
```

## Notes

- Configure environment variables as required by `src/database/data-source.ts` (and any Nest config modules).
- Swagger (if enabled in `main.ts`) is typically available at `/api` or `/docs` depending on setup.
