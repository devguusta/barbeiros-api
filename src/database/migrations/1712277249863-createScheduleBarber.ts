import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScheduleBarber1712277249863 implements MigrationInterface {
    name = 'CreateScheduleBarber1712277249863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule_barber" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "barber_id" character varying NOT NULL, "client_id" character varying NOT NULL, "schedule_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "REL_50a98d3f5b0baf318c5081a2f2" UNIQUE ("addressId"), CONSTRAINT "PK_30c4796f7c11fd33999391a2642" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule_barber" ADD CONSTRAINT "FK_50a98d3f5b0baf318c5081a2f2f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_barber" DROP CONSTRAINT "FK_50a98d3f5b0baf318c5081a2f2f"`);
        await queryRunner.query(`DROP TABLE "schedule_barber"`);
    }

}
