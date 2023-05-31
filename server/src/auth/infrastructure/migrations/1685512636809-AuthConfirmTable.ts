import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthConfirmTable1685512636809 implements MigrationInterface {
    name = 'AuthConfirmTable1685512636809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "auth_confirm" (
                "id" SERIAL NOT NULL,
                "uid" character varying(36),
                "userId" integer,
                "email" character varying,
                "phone" character varying(20),
                "code" character varying NOT NULL,
                "providerName" character varying NOT NULL,
                "isConfirmed" boolean NOT NULL DEFAULT false,
                "expireTime" TIMESTAMP(0) NOT NULL,
                "lastSentTime" TIMESTAMP(0) NOT NULL,
                "attemptsCount" integer,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_e37b62da285cc255612e260753c" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "auth_confirm"
        `);
    }
}
