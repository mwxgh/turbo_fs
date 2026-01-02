import { registerAs } from '@nestjs/config'

/**
 * Centralized app config.
 *
 * Values are resolved once at startup and exposed through Nest ConfigService.
 * Access via: configService.get('app.port') etc.
 */
export const appConfig = registerAs('app', () => {
  const port = Number(process.env.API_PORT ?? 3002)
  const host = process.env.API_HOST ?? '127.0.0.1'

  const swaggerEnabled = (process.env.SWAGGER_ENABLED ?? 'true') === 'true'
  const swaggerPath = process.env.SWAGGER_PATH ?? 'docs'

  return {
    port,
    host,
    swagger: {
      enabled: swaggerEnabled,
      path: swaggerPath,
      title: process.env.SWAGGER_TITLE ?? 'API',
      description: process.env.SWAGGER_DESCRIPTION ?? 'API documentation',
      version: process.env.SWAGGER_VERSION ?? '1.0',
    },
  }
})
