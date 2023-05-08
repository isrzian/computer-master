import {MigrationInterface, QueryRunner} from 'typeorm';

export class ClientTable1683531977771 implements MigrationInterface {
    name = 'ClientTable1683531977771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "initials" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "email" character varying NOT NULL,
                "passportSeries" character varying NOT NULL,
                "passportNumber" character varying NOT NULL,
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "client"
        `);
    }
}
