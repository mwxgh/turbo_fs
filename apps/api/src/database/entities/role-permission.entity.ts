import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { PermissionEntity } from './permission.entity'
import { RoleEntity } from './role.entity'

@Entity({ name: 'role_permission' })
@Index(['roleId', 'permissionId'], { unique: true })
export class RolePermissionEntity extends BaseEntity {
  // Foreign keys
  @Column({ name: 'role_id', type: 'int' })
  roleId!: number

  @Column({ name: 'permission_id', type: 'int' })
  permissionId!: number

  // Relations
  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity

  @ManyToOne(() => PermissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission!: PermissionEntity
}
