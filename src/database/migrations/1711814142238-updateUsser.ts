import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsser1711814142238 implements MigrationInterface {
    name = 'UpdateUsser1711814142238'

    public async up(queryRunner: QueryRunner): Promise<void> {
     
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barber_store" DROP CONSTRAINT "FK_09b3a82526798808af44c77ae93"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
        await queryRunner.query(`DROP TABLE "barber_store"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
