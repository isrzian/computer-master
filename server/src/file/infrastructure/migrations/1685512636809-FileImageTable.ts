import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1685512636809 implements MigrationInterface {
    name = 'FileImageTable1685512636809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "file_image" (
                "id" SERIAL NOT NULL,
                "previewName" character varying NOT NULL,
                "isOriginal" boolean NOT NULL DEFAULT false,
                "storageName" character varying,
                "fileName" character varying NOT NULL,
                "fileSize" integer NOT NULL,
                "fileMimeType" character varying,
                "folder" character varying,
                "width" integer,
                "height" integer,
                "createTime" TIMESTAMP(0) NOT NULL,
                "fileId" integer,
                CONSTRAINT "PK_378728468f1edd285f78bff8bdb" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "file_image"
        `);
    }
}
