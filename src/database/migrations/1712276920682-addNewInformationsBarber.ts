import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewInformationsBarber1712276920682 implements MigrationInterface {
    name = 'AddNewInformationsBarber1712276920682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barber_store" ADD "interval_between_clients" integer`);
        await queryRunner.query(`ALTER TABLE "barber_store" ADD "store_description" character varying`);
        await queryRunner.query(`ALTER TABLE "barber_store" ADD "opening_time" character varying NOT NULL DEFAULT '9'`);
        await queryRunner.query(`ALTER TABLE "barber_store" ADD "closing_time" character varying NOT NULL DEFAULT '18'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barber_store" DROP COLUMN "closing_time"`);
        await queryRunner.query(`ALTER TABLE "barber_store" DROP COLUMN "opening_time"`);
        await queryRunner.query(`ALTER TABLE "barber_store" DROP COLUMN "store_description"`);
        await queryRunner.query(`ALTER TABLE "barber_store" DROP COLUMN "interval_between_clients"`);
    }

}
