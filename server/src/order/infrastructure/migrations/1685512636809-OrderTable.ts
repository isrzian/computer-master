import {MigrationInterface, QueryRunner} from 'typeorm';

export class OrderTable1685512636809 implements MigrationInterface {
    name = 'OrderTable1685512636809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "phoneModel" character varying NOT NULL,
                "phoneColor" character varying NOT NULL,
                "phonePassword" character varying NOT NULL,
                "phoneView" character varying NOT NULL,
                "imei" character varying NOT NULL,
                "clientId" integer,
                "isDone" boolean NOT NULL DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_material" (
                "orderId" integer NOT NULL,
                "materialId" integer NOT NULL,
                CONSTRAINT "PK_f1c8eecee2da05f41a14d006343" PRIMARY KEY ("orderId", "materialId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "order_material"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
    }
}
