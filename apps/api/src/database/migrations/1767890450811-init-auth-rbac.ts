import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitAuthRbac1767890450811 implements MigrationInterface {
  name = 'InitAuthRbac1767890450811'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`permissions\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`code\` varchar(100) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`description\` varchar(255) NULL,
                \`module\` varchar(50) NULL,
                UNIQUE INDEX \`uq_permissions_code\` (\`code\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`role_permission\` (
                \`role_id\` bigint UNSIGNED NOT NULL,
                \`permission_id\` bigint UNSIGNED NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`uq_cps_role_permissions_role_permission\` (\`role_id\`, \`permission_id\`),
                PRIMARY KEY (\`role_id\`, \`permission_id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`code\` enum ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'USER') NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`description\` varchar(255) NULL,
                UNIQUE INDEX \`uq_roles_code\` (\`code\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`user_role\` (
                \`user_id\` bigint UNSIGNED NOT NULL,
                \`role_id\` bigint UNSIGNED NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`uq_cps_user_roles_user_role\` (\`user_id\`, \`role_id\`),
                PRIMARY KEY (\`user_id\`, \`role_id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`user_identities\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_id\` bigint UNSIGNED NOT NULL,
                \`provider\` enum ('google', 'facebook', 'github') NOT NULL,
                \`provider_user_id\` varchar(191) NOT NULL,
                \`email_at_provider\` varchar(255) NULL,
                \`display_name\` varchar(255) NULL,
                \`avatar_url\` text NULL,
                \`access_token\` text NULL,
                \`refresh_token\` text NULL,
                \`token_expires_at\` datetime NULL,
                INDEX \`idx_user_identities_user_id\` (\`user_id\`),
                UNIQUE INDEX \`uq_cps_provider_provider_user_id\` (\`provider\`, \`provider_user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`user_sessions\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`user_id\` bigint UNSIGNED NOT NULL,
                \`refresh_token_hash\` varchar(255) NOT NULL,
                \`expires_at\` datetime NOT NULL,
                \`revoked_at\` datetime NULL,
                \`last_used_at\` datetime NULL,
                \`ip\` varchar(45) NULL,
                \`user_agent\` text NULL,
                \`device_id\` varchar(100) NULL,
                \`device_name\` varchar(255) NULL,
                INDEX \`idx_user_sessions_refresh_hash\` (\`refresh_token_hash\`),
                INDEX \`idx_user_sessions_expires_at\` (\`expires_at\`),
                INDEX \`idx_user_sessions_user_id\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`email\` varchar(255) NULL,
                \`email_verified_at\` datetime NULL,
                \`password_hash\` varchar(255) NULL,
                \`name\` varchar(255) NULL,
                \`avatar_url\` text NULL,
                \`status\` enum ('ACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
                \`last_login_at\` datetime NULL,
                UNIQUE INDEX \`uq_users_email\` (\`email\`),
                INDEX \`idx_users_status\` (\`status\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`verification_tokens\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`user_id\` bigint UNSIGNED NULL,
                \`email\` varchar(255) NOT NULL,
                \`type\` enum ('VERIFY_EMAIL', 'RESET_PASSWORD') NOT NULL,
                \`token_hash\` varchar(255) NOT NULL,
                \`expires_at\` datetime NOT NULL,
                \`consumed_at\` datetime NULL,
                INDEX \`idx_verification_expires_at\` (\`expires_at\`),
                INDEX \`idx_cps_verification_email_type\` (\`email\`, \`type\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`login_attempts\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`identifier\` varchar(255) NULL,
                \`ip\` varchar(45) NULL,
                \`success\` tinyint NOT NULL DEFAULT '0',
                \`reason\` varchar(255) NULL,
                INDEX \`idx_cps_login_attempt_ip_created\` (\`ip\`, \`created_at\`),
                INDEX \`idx_cps_login_attempt_identifier_created\` (\`identifier\`, \`created_at\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\`
            ADD CONSTRAINT \`FK_3d0a7155eafd75ddba5a7013368\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\`
            ADD CONSTRAINT \`FK_e3a3ba47b7ca00fd23be4ebd6cf\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_identities\`
            ADD CONSTRAINT \`FK_bf5fe01eb8cad7114b4c371cdc7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_sessions\`
            ADD CONSTRAINT \`FK_e9658e959c490b0a634dfc54783\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`verification_tokens\`
            ADD CONSTRAINT \`FK_31d2079dc4079b80517d31cf4f2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`verification_tokens\` DROP FOREIGN KEY \`FK_31d2079dc4079b80517d31cf4f2\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_sessions\` DROP FOREIGN KEY \`FK_e9658e959c490b0a634dfc54783\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_identities\` DROP FOREIGN KEY \`FK_bf5fe01eb8cad7114b4c371cdc7\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3a3ba47b7ca00fd23be4ebd6cf\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_3d0a7155eafd75ddba5a7013368\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_cps_login_attempt_identifier_created\` ON \`login_attempts\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_cps_login_attempt_ip_created\` ON \`login_attempts\`
        `)
    await queryRunner.query(`
            DROP TABLE \`login_attempts\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_cps_verification_email_type\` ON \`verification_tokens\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_verification_expires_at\` ON \`verification_tokens\`
        `)
    await queryRunner.query(`
            DROP TABLE \`verification_tokens\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_users_status\` ON \`users\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_users_email\` ON \`users\`
        `)
    await queryRunner.query(`
            DROP TABLE \`users\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_user_sessions_user_id\` ON \`user_sessions\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_user_sessions_expires_at\` ON \`user_sessions\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_user_sessions_refresh_hash\` ON \`user_sessions\`
        `)
    await queryRunner.query(`
            DROP TABLE \`user_sessions\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_cps_provider_provider_user_id\` ON \`user_identities\`
        `)
    await queryRunner.query(`
            DROP INDEX \`idx_user_identities_user_id\` ON \`user_identities\`
        `)
    await queryRunner.query(`
            DROP TABLE \`user_identities\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_cps_user_roles_user_role\` ON \`user_role\`
        `)
    await queryRunner.query(`
            DROP TABLE \`user_role\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_roles_code\` ON \`roles\`
        `)
    await queryRunner.query(`
            DROP TABLE \`roles\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_cps_role_permissions_role_permission\` ON \`role_permission\`
        `)
    await queryRunner.query(`
            DROP TABLE \`role_permission\`
        `)
    await queryRunner.query(`
            DROP INDEX \`uq_permissions_code\` ON \`permissions\`
        `)
    await queryRunner.query(`
            DROP TABLE \`permissions\`
        `)
  }
}
