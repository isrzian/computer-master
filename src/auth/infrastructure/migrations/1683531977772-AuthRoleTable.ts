import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthRoleTable1683531977772 implements MigrationInterface {
    name = 'AuthRoleTable1683531977772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_ad2199f671a0038d34ce4dedc8" ON "auth_role_user" ("authRoleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_fe08e1de61a95f0c1c1b6d3a7b" ON "auth_role_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_43de61f9be7ab7932c4187db35" ON "auth_role_auth_permission" ("authRoleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_192eece5691e52cc96d0053ce1" ON "auth_role_auth_permission" ("authPermissionId")
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role"
            ADD CONSTRAINT "FK_3572cd30f3eb1ceb7660f3956c8" FOREIGN KEY ("parentId") REFERENCES "auth_role"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user"
            ADD CONSTRAINT "FK_ad2199f671a0038d34ce4dedc86" FOREIGN KEY ("authRoleId") REFERENCES "auth_role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user"
            ADD CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_auth_permission"
            ADD CONSTRAINT "FK_43de61f9be7ab7932c4187db35d" FOREIGN KEY ("authRoleId") REFERENCES "auth_role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_auth_permission"
            ADD CONSTRAINT "FK_192eece5691e52cc96d0053ce1e" FOREIGN KEY ("authPermissionId") REFERENCES "auth_permission"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_role_auth_permission" DROP CONSTRAINT "FK_192eece5691e52cc96d0053ce1e"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_auth_permission" DROP CONSTRAINT "FK_43de61f9be7ab7932c4187db35d"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user" DROP CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user" DROP CONSTRAINT "FK_ad2199f671a0038d34ce4dedc86"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role" DROP CONSTRAINT "FK_3572cd30f3eb1ceb7660f3956c8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_192eece5691e52cc96d0053ce1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_43de61f9be7ab7932c4187db35"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fe08e1de61a95f0c1c1b6d3a7b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ad2199f671a0038d34ce4dedc8"
        `);
    }
}
