import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBarberStore1711227867818 implements MigrationInterface {
  name = 'CreateBarberStore1711227867818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "barber_store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying, "document" character varying NOT NULL, "cellphone" character varying, "owner_name" character varying NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_67ba082363111e7a3bcdccd185d" UNIQUE ("document"), CONSTRAINT "REL_09b3a82526798808af44c77ae9" UNIQUE ("addressId"), CONSTRAINT "PK_9fafaf9f2f06b7e8cc6b8a6bfb8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "barber_store" ADD CONSTRAINT "FK_09b3a82526798808af44c77ae93" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "barber_store" DROP CONSTRAINT "FK_09b3a82526798808af44c77ae93"`,
    );
    await queryRunner.query(`DROP TABLE "barber_store"`);
  }
}
