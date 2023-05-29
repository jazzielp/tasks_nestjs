import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFieldUser1685401054590 implements MigrationInterface {
  name = 'ChangeFieldUser1685401054590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`fistName\` \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`firstName\` \`fistName\` varchar(255) NOT NULL`,
    );
  }
}
