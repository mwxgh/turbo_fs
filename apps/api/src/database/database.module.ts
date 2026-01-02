import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const logger = new Logger('DatabaseModule')

        const host = configService.get<string>('database.host', 'localhost')
        const port = configService.get<number>('database.port', 13306)
        const username = configService.get<string>(
          'database.username',
          'default_username',
        )
        const password = configService.get<string>(
          'database.password',
          'default_password',
        )
        const database = configService.get<string>(
          'database.name',
          'default_database',
        )

        const synchronize = configService.get<boolean>(
          'database.synchronize',
          false,
        )
        const logging = configService.get<boolean>('database.logging', false)

        logger.log(`Connecting to database: ${database}@${host}:${port}`)

        const ignoreFirstStartupQuery = (query: string) =>
          // TypeORM (MySQL) often probes the connection with SELECT VERSION()
          // which is noisy in logs and not actionable.
          query.trim().toLowerCase() === 'select version()'

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize,
          // If logging is enabled, suppress the initial noisy probe query.
          logging,
          logger: logging
            ? {
                logQuery: (query: string) => {
                  if (ignoreFirstStartupQuery(query)) return
                  logger.debug(query)
                },
                logQueryError: (
                  error: string | Error,
                  query: string,
                  parameters?: unknown[],
                ) => {
                  logger.error(
                    {
                      err: error,
                      query,
                      parameters,
                    },
                    'TypeORM query error',
                  )
                },
                logQuerySlow: (
                  time: number,
                  query: string,
                  parameters?: unknown[],
                ) => {
                  logger.warn(
                    {
                      time,
                      query,
                      parameters,
                    },
                    'TypeORM slow query',
                  )
                },
                // TypeORM can be noisy about entity discovery when it boots.
                // Hide those messages by default.
                logSchemaBuild: () => {
                  // no-op
                },
                logMigration: (message: string) => {
                  logger.log(message)
                },
                log: (level: 'log' | 'info' | 'warn', message: unknown) => {
                  // Suppress noisy non-query logs like:
                  // "All classes found using provided glob pattern ..."
                  if (
                    typeof message === 'string' &&
                    message.includes(
                      'All classes found using provided glob pattern',
                    )
                  ) {
                    return
                  }

                  if (level === 'warn') logger.warn(message)
                  else logger.log(message)
                },
              }
            : undefined,
        }
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
