import { Column, Entity, Index } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity {
  // e.g. "cms.page.read", "cms.page.write", "user.manage"
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150 })
  key!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null
}
