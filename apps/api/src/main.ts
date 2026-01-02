import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  // bufferLogs ensures early logs are not lost before logger is ready
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  // use the nestjs-pino logger for Nest internal logs (and consistent formatting)
  app.useLogger(app.get(Logger))

  const configService = app.get(ConfigService)
  const host = configService.get<string>('app.host', '127.0.0.1')
  const port = configService.get<number>('app.port', 3003)

  const swaggerEnabled = configService.get<boolean>('app.swagger.enabled', true)
  if (swaggerEnabled) {
    const swagger = {
      path: configService.get<string>('app.swagger.path', 'docs'),
      title: configService.get<string>('app.swagger.title', 'API'),
      description: configService.get<string>(
        'app.swagger.description',
        'API documentation',
      ),
      version: configService.get<string>('app.swagger.version', '1.0'),
    }

    const swaggerConfig = new DocumentBuilder()
      .setTitle(swagger.title)
      .setDescription(swagger.description)
      .setVersion(swagger.version)
      .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup(swagger.path, app, document)
  }

  // Bind explicitly to IPv4 localhost so URLs don't show up as http://[::1]
  await app.listen(port, host)

  const baseUrl = `http://${host}:${port}`
  app.get(Logger).log(`API running at ${baseUrl}`)
  if (swaggerEnabled)
    app
      .get(Logger)
      .log(
        `Swagger docs at ${baseUrl}/${configService.get('app.swagger.path', 'docs')}`,
      )
}
void bootstrap()
