import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm'
import { AuthProvider } from './enums'
import { UserEntity } from './user.entity'
import { AuditableEntity } from './base.entity'

@Entity({ name: 'user_identities' })
@Index('uq_cps_provider_provider_user_id', ['provider', 'providerUserId'], {
  unique: true,
})
@Index('idx_user_identities_user_id', ['userId'])
export class UserIdentityEntity extends AuditableEntity {
  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  userId!: string

  @Column({ type: 'enum', enum: AuthProvider })
  provider!: AuthProvider

  @Column({ name: 'provider_user_id', type: 'varchar', length: 191 })
  providerUserId!: string

  @Column({
    name: 'email_at_provider',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailAtProvider!: string | null

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  displayName!: string | null

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl!: string | null

  @Column({ name: 'access_token', type: 'text', nullable: true, select: false })
  accessToken!: string | null

  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshToken!: string | null

  @Column({ name: 'token_expires_at', type: 'datetime', nullable: true })
  tokenExpiresAt!: Date | null

  @ManyToOne(() => UserEntity, (u) => u.identities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}
