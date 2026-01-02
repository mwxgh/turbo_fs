import { registerAs } from '@nestjs/config'

/**
 * Centralized app config.
 *
 * Values are resolved once at startup and exposed through Nest ConfigService.
 * Access via: configService.get('database.port') etc.
 */
export const databaseConfig = registerAs('database', () => {
  const nodeEnv = process.env.NODE_ENV ?? 'development'

  return {
    host: process.env.DB_HOST ?? 'default_host',
    port: Number(process.env.DB_PORT ?? 13306),
    username: process.env.DB_USERNAME ?? 'default_username',
    password: process.env.DB_PASSWORD ?? 'default_password',
    name: process.env.DB_NAME ?? 'default_name',

    // NOTE: keep false in production; true only for local dev if you want auto schema sync
    synchronize: nodeEnv !== 'production',
    logging: nodeEnv === 'development',
  }
})
