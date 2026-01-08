import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreatableEntity } from './base.entity'

@Entity({ name: 'user_sessions' })
@Index('idx_user_sessions_user_id', ['userId'])
@Index('idx_user_sessions_expires_at', ['expiresAt'])
@Index('idx_user_sessions_refresh_hash', ['refreshTokenHash'])
export class UserSessionEntity extends CreatableEntity {
  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  userId!: string

  @Column({ name: 'refresh_token_hash', type: 'varchar', length: 255 })
  refreshTokenHash!: string

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt!: Date

  @Column({ name: 'revoked_at', type: 'datetime', nullable: true })
  revokedAt!: Date | null

  @Column({ name: 'last_used_at', type: 'datetime', nullable: true })
  lastUsedAt!: Date | null

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip!: string | null

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent!: string | null

  @Column({ name: 'device_id', type: 'varchar', length: 100, nullable: true })
  deviceId!: string | null

  @Column({ name: 'device_name', type: 'varchar', length: 255, nullable: true })
  deviceName!: string | null

  @ManyToOne(() => UserEntity, (u) => u.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}
