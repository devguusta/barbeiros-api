import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScheduleDateBarberModel1712877281195 implements MigrationInterface {
    name = 'AddScheduleDateBarberModel1712877281195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD "schedule_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP COLUMN "schedule_date"`);
    }

}
