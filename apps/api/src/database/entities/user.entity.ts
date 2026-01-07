import { Column, Entity, Index, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserRoleEntity } from './user-role.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string | null

  // Relations
  @OneToMany(() => UserRoleEntity, (ur) => ur.user)
  userRoles!: UserRoleEntity[]
}
