import {MigrationInterface, QueryRunner} from 'typeorm';

export class OrderTable1685431106999 implements MigrationInterface {
    name = 'OrderTable1685431106999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "isDone" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "isDone"
        `);
    }
}
