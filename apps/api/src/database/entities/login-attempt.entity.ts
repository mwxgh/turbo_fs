import { Entity, Column, Index } from 'typeorm'
import { CreatableEntity } from './base.entity'

@Entity({ name: 'login_attempts' })
@Index('idx_cps_login_attempt_identifier_created', ['identifier', 'createdAt'])
@Index('idx_cps_login_attempt_ip_created', ['ip', 'createdAt'])
export class LoginAttemptEntity extends CreatableEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  identifier!: string | null

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip!: string | null

  @Column({ type: 'tinyint', default: 0 })
  success!: 0 | 1

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason!: string | null
}
