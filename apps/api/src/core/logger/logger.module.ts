import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

const isProd = process.env.NODE_ENV === 'production'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
        transport: isProd
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: false,
                translateTime: 'dd/mm/yyyy HH:MM:ss',
                ignore: 'pid,hostname',
              },
            },
        redact: {
          paths: ['req.headers.authorization', 'req.headers.cookie'],
          remove: true,
        },
      },
    }),
  ],
})
export class AppLoggerModule {}
