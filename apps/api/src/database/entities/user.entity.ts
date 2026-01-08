import { Column, Entity, Index, OneToMany } from 'typeorm'
import { SoftDeletableEntity } from './base.entity'
import { UserRoleEntity } from './user-role.entity'
import { UserStatus } from './enums'
import { UserIdentityEntity } from './user-identity.entity'
import { UserSessionEntity } from './user-session.entity'
import { VerificationTokenEntity } from './verification-token.entity'

@Entity({ name: 'users' })
@Index('idx_users_status', ['status'])
@Index('uq_users_email', ['email'], { unique: true })
export class UserEntity extends SoftDeletableEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null

  @Column({ name: 'email_verified_at', type: 'datetime', nullable: true })
  emailVerifiedAt!: Date | null

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  passwordHash!: string | null

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string | null

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl!: string | null

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus

  @Column({ name: 'last_login_at', type: 'datetime', nullable: true })
  lastLoginAt!: Date | null

  @OneToMany(() => UserIdentityEntity, (i) => i.user)
  identities!: UserIdentityEntity[]

  @OneToMany(() => UserSessionEntity, (s) => s.user)
  sessions!: UserSessionEntity[]

  @OneToMany(() => VerificationTokenEntity, (t) => t.user)
  verificationTokens!: VerificationTokenEntity[]

  @OneToMany(() => UserRoleEntity, (ur) => ur.user)
  userRoles!: UserRoleEntity[]
}
