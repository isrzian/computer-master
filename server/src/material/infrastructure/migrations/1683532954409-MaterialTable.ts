import {MigrationInterface, QueryRunner} from 'typeorm';

export class MaterialTable1683532954409 implements MigrationInterface {
    name = 'MaterialTable1683532954409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "material" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "count" integer NOT NULL,
                "cost" integer NOT NULL,
                CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "material"
        `);
    }
}
