import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitRbac1767630573666 implements MigrationInterface {
  name = 'InitRbac1767630573666'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`role\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(100) NOT NULL,
                \`description\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`user_role\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`user_id\` int NOT NULL,
                \`role_id\` int NOT NULL,
                UNIQUE INDEX \`IDX_f634684acb47c1a158b83af515\` (\`user_id\`, \`role_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`email\` varchar(255) NOT NULL,
                \`name\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`permission\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`key\` varchar(150) NOT NULL,
                \`description\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_20ff45fefbd3a7c04d2572c3bb\` (\`key\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`role_permission\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`role_id\` int NOT NULL,
                \`permission_id\` int NOT NULL,
                UNIQUE INDEX \`IDX_19a94c31d4960ded0dcd039775\` (\`role_id\`, \`permission_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\`
            ADD CONSTRAINT \`FK_3d0a7155eafd75ddba5a7013368\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\`
            ADD CONSTRAINT \`FK_e3a3ba47b7ca00fd23be4ebd6cf\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3a3ba47b7ca00fd23be4ebd6cf\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_3d0a7155eafd75ddba5a7013368\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_19a94c31d4960ded0dcd039775\` ON \`role_permission\`
        `)
    await queryRunner.query(`
            DROP TABLE \`role_permission\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_20ff45fefbd3a7c04d2572c3bb\` ON \`permission\`
        `)
    await queryRunner.query(`
            DROP TABLE \`permission\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `)
    await queryRunner.query(`
            DROP TABLE \`user\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_f634684acb47c1a158b83af515\` ON \`user_role\`
        `)
    await queryRunner.query(`
            DROP TABLE \`user_role\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\`
        `)
    await queryRunner.query(`
            DROP TABLE \`role\`
        `)
  }
}
