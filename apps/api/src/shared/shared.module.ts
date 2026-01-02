import { Module } from '@nestjs/common'

/**
 * SharedModule is for common providers/pipes/utilities used across feature modules.
 * Keep it lightweight and avoid importing feature modules here.
 */
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class SharedModule {}
