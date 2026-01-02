import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { UserModule } from './user/user.module'

/**
 * Feature modules aggregator.
 *
 * Add new feature modules here (UserModule, AuthModule, etc.)
 * to keep AppModule clean.
 */
@Module({
  imports: [HealthModule, UserModule],
})
export class ModulesModule {}
