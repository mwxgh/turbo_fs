import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { DatabaseModule } from './database/database.module'
import { ModulesModule } from './modules/modules.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    // Global ConfigModule + typed config loaders live here
    CoreModule,
    DatabaseModule,
    SharedModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
