import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm'
import { VerificationTokenType } from './enums'
import { UserEntity } from './user.entity'
import { CreatableEntity } from './base.entity'

@Entity({ name: 'verification_tokens' })
@Index('idx_cps_verification_email_type', ['email', 'type'])
@Index('idx_verification_expires_at', ['expiresAt'])
export class VerificationTokenEntity extends CreatableEntity {
  @Column({ name: 'user_id', type: 'bigint', unsigned: true, nullable: true })
  userId!: string | null

  @Column({ type: 'varchar', length: 255 })
  email!: string

  @Column({ type: 'enum', enum: VerificationTokenType })
  type!: VerificationTokenType

  @Column({ name: 'token_hash', type: 'varchar', length: 255 })
  tokenHash!: string

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt!: Date

  @Column({ name: 'consumed_at', type: 'datetime', nullable: true })
  consumedAt!: Date | null

  @ManyToOne(() => UserEntity, (u) => u.verificationTokens, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity | null
}
