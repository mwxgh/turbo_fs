import { Global, Module } from '@nestjs/common'
import { CustomLoggerModule } from './logger/logger.module'
import { ConfigurationModule } from './config/configuration.module'

@Global()
@Module({
  imports: [CustomLoggerModule, ConfigurationModule],
  exports: [CustomLoggerModule],
})
export class CoreModule {}
