import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthLoginTable1683531977771 implements MigrationInterface {
    name = 'AuthLoginTable1683531977771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "auth_login" (
                "id" SERIAL NOT NULL,
                "uid" character varying(36),
                "userId" integer,
                "refreshToken" character varying NOT NULL,
                "refreshExpireTime" character varying NOT NULL,
                "ipAddress" character varying,
                "location" character varying,
                "userAgent" character varying,
                "isRevoked" boolean DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_925e8e14bb74e91fc95c90ef0d1" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "auth_login"
        `);
    }
}
