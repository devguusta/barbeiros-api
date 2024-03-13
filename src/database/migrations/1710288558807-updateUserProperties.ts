import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserProperties1710288558807 implements MigrationInterface {
    name = 'UpdateUserProperties1710288558807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_15f2ebe082a6e43a960f9f88411"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_15f2ebe082a6e43a960f9f88411" UNIQUE ("cellphone")`);
    }

}
