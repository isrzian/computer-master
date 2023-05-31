import {MigrationInterface, QueryRunner} from 'typeorm';

export class ClientTable1683536083979 implements MigrationInterface {
    name = 'ClientTable1683536083979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "createTime" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "updateTime" TIMESTAMP(0) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "updateTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "createTime"
        `);
    }
}
