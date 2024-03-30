import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddress1711579310016 implements MigrationInterface {
    name = 'UpdateAddress1711579310016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
    }

}
