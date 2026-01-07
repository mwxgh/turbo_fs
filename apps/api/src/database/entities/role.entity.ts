import { Column, Entity, Index } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null
}
