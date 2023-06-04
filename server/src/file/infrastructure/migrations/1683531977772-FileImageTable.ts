import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1683531977772 implements MigrationInterface {
    name = 'FileImageTable1683531977772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_image"
            ADD CONSTRAINT "FK_b6580740697430f3d0c5ba05994" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_image" DROP CONSTRAINT "FK_b6580740697430f3d0c5ba05994"
        `);
    }
}
