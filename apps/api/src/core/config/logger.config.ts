import { registerAs } from '@nestjs/config'

export const loggerConfig = registerAs('logger', () => {
  const nodeEnv = process.env.NODE_ENV ?? 'development'
  const isProd = nodeEnv === 'production'

  return {
    level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
    pretty: !isProd,
  }
})
