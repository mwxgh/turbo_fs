import { Column, Entity, Index, OneToMany } from 'typeorm'
import { UserRoleEntity } from './user-role.entity'
import { RolePermissionEntity } from './role-permission.entity'
import { SoftDeletableEntity } from './base.entity'
import { RoleCode } from './enums'

@Entity({ name: 'roles' })
@Index('uq_roles_code', ['code'], { unique: true })
export class RoleEntity extends SoftDeletableEntity {
  @Column({
    type: 'enum',
    enum: RoleCode,
  })
  code!: RoleCode

  @Column({ type: 'varchar', length: 100 })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null

  @OneToMany(() => UserRoleEntity, (ur) => ur.role)
  userRoles!: UserRoleEntity[]

  @OneToMany(() => RolePermissionEntity, (rp) => rp.role)
  rolePermissions!: RolePermissionEntity[]
}
