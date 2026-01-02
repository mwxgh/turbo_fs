import { Global, Module } from '@nestjs/common'
import { AppLoggerModule } from './logger/logger.module'

@Global()
@Module({
  imports: [AppLoggerModule],
  exports: [AppLoggerModule],
})
export class CoreModule {}
