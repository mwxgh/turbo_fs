import 'reflect-metadata'

import { join } from 'path'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

/**
 * TypeORM CLI datasource (migrations).
 *
 * Keep this file independent from NestJS bootstrap so `typeorm` CLI can load it.
 */
dotenv.config()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 13306),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'app',

  // Entities/Migrations globs must work both from `src` (ts-node) and `dist` (node)
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

  // Never auto-sync in production; migrations are the source of truth
  synchronize: false,

  // Keep logging minimal by default; enable with TYPEORM_LOGGING=true
  logging: process.env.TYPEORM_LOGGING === 'true',
})

// IMPORTANT for TypeORM CLI: export exactly ONE DataSource instance from this file.
// (The CLI throws if it detects multiple exports that look like DataSource.)
export default AppDataSource
