import {MigrationInterface, QueryRunner} from 'typeorm';

export class OrderTable1683536083979 implements MigrationInterface {
    name = 'OrderTable1683536083979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_73452cb6059a1eac9ef7358747" ON "order_material" ("orderId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3cc1667c4724754a5c08c02755" ON "order_material" ("materialId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "order_material"
            ADD CONSTRAINT "FK_73452cb6059a1eac9ef7358747e" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "order_material"
            ADD CONSTRAINT "FK_3cc1667c4724754a5c08c027551" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_material" DROP CONSTRAINT "FK_3cc1667c4724754a5c08c027551"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_material" DROP CONSTRAINT "FK_73452cb6059a1eac9ef7358747e"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3cc1667c4724754a5c08c02755"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_73452cb6059a1eac9ef7358747"
        `);
    }
}
