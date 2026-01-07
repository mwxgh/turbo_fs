import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Common columns shared by most tables.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt?: Date
}
