import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOwnerNameScheduleBarber1712877081695 implements MigrationInterface {
    name = 'RemoveOwnerNameScheduleBarber1712877081695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP COLUMN "schedule_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD "schedule_date" TIMESTAMP NOT NULL`);
    }

}
