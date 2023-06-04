import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthRoleTable1685512636809 implements MigrationInterface {
    name = 'AuthRoleTable1685512636809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "auth_role" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "title" character varying,
                "description" character varying,
                "isActive" boolean NOT NULL DEFAULT false,
                "expireTime" character varying,
                "parentId" integer,
                CONSTRAINT "PK_695d9779f1a6218ed589cb436d6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "auth_role_user" (
                "authRoleId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_ddcfb6ef99ee2deedfa8e77b621" PRIMARY KEY ("authRoleId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "auth_role_auth_permission" (
                "authRoleId" integer NOT NULL,
                "authPermissionId" integer NOT NULL,
                CONSTRAINT "PK_2a311a775150fbd13c792a38d47" PRIMARY KEY ("authRoleId", "authPermissionId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "auth_role_auth_permission"
        `);
        await queryRunner.query(`
            DROP TABLE "auth_role_user"
        `);
        await queryRunner.query(`
            DROP TABLE "auth_role"
        `);
    }
}
