import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { HealthModule } from './modules/health/health.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [CoreModule, SharedModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
