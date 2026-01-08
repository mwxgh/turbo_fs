import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { RoleEntity } from './role.entity'

@Entity({ name: 'user_role' })
@Index('uq_cps_user_roles_user_role', ['userId', 'roleId'], {
  unique: true,
})
export class UserRoleEntity {
  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  userId!: string

  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'role_id' })
  roleId!: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @ManyToOne(() => UserEntity, (u) => u.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @ManyToOne(() => RoleEntity, (r) => r.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity
}
