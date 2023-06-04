import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTable1685512636809 implements MigrationInterface {
    name = 'UserTable1685512636809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "login" character varying,
                "passwordHash" text,
                "phone" character varying(20),
                "email" character varying,
                "languageCode" character varying,
                "isBanned" boolean NOT NULL DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
