import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCityOnAddress1712277064540 implements MigrationInterface {
    name = 'AddCityOnAddress1712277064540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
    }

}
