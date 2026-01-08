import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { RoleEntity } from './role.entity'
import { PermissionEntity } from './permission.entity'

@Entity({ name: 'role_permission' })
@Index('uq_cps_role_permissions_role_permission', ['roleId', 'permissionId'], {
  unique: true,
})
export class RolePermissionEntity {
  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'role_id' })
  roleId!: string

  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'permission_id' })
  permissionId!: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @ManyToOne(() => RoleEntity, (r) => r.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity

  @ManyToOne(() => PermissionEntity, (p) => p.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission!: PermissionEntity
}
