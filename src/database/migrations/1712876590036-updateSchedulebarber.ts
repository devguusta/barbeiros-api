import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchedulebarber1712876590036 implements MigrationInterface {
    name = 'UpdateSchedulebarber1712876590036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP CONSTRAINT "FK_50a98d3f5b0baf318c5081a2f2f"`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" RENAME COLUMN "addressId" TO "canceled"`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP COLUMN "canceled"`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD "canceled" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP COLUMN "canceled"`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD "canceled" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" RENAME COLUMN "canceled" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD CONSTRAINT "FK_50a98d3f5b0baf318c5081a2f2f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
