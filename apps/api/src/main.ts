import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  // bufferLogs ensures early logs are not lost before logger is ready
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  // use the nestjs-pino logger for Nest internal logs (and consistent formatting)
  app.useLogger(app.get(Logger))

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const port = Number(process.env.API_PORT ?? 3003)

  // Bind explicitly to IPv4 localhost so URLs don't show up as http://[::1]
  await app.listen(port, '127.0.0.1')

  const baseUrl = `http://127.0.0.1:${port}`
  app.get(Logger).log(`API running at ${baseUrl}`)
  app.get(Logger).log(`Swagger docs at ${baseUrl}/docs`)
}
void bootstrap()
