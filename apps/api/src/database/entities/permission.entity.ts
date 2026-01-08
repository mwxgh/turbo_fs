import { Column, Entity, Index, OneToMany } from 'typeorm'
import { RolePermissionEntity } from './role-permission.entity'
import { AuditableEntity } from './base.entity'

@Entity({ name: 'permissions' })
@Index('uq_permissions_code', ['code'], { unique: true })
export class PermissionEntity extends AuditableEntity {
  @Column({ type: 'varchar', length: 100 })
  code!: string

  @Column({ type: 'varchar', length: 100 })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null

  @Column({ type: 'varchar', length: 50, nullable: true })
  module!: string | null

  @OneToMany(() => RolePermissionEntity, (rp) => rp.permission)
  rolePermissions!: RolePermissionEntity[]
}
