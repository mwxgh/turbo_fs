import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string
}

/** Entity that has createdAt only */
export abstract class CreatableEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date
}

/** Entity that has createdAt + updatedAt */
export abstract class AuditableEntity extends CreatableEntity {
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date
}

/** Entity that supports soft delete */
export abstract class SoftDeletableEntity extends AuditableEntity {
  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null
}
