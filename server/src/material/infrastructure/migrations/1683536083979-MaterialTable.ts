import {MigrationInterface, QueryRunner} from 'typeorm';

export class MaterialTable1683536083979 implements MigrationInterface {
    name = 'MaterialTable1683536083979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "material"
            ADD "createTime" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "material"
            ADD "updateTime" TIMESTAMP(0) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "material" DROP COLUMN "updateTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "material" DROP COLUMN "createTime"
        `);
    }
}
