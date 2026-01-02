import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './app.config'
import { databaseConfig } from './database.config'
import { loggerConfig } from './logger.config'

/**
 * Global configuration module.
 *
 * Add additional registerAs(...) configs here (authConfig, appConfig, databaseConfig etc.).
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, loggerConfig],
    }),
  ],
})
export class ConfigurationModule {}
