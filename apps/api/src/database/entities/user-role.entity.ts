import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { RoleEntity } from './role.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'user_role' })
@Index(['userId', 'roleId'], { unique: true })
export class UserRoleEntity extends BaseEntity {
  // Foreign keys
  @Column({ name: 'user_id', type: 'int' })
  userId!: number

  @Column({ name: 'role_id', type: 'int' })
  roleId!: number

  // Relations
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity
}
