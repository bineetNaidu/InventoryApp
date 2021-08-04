import { MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1628001689303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			insert into inventory_locations (location, created_at, updated_at)
			values 
				('Kitchen Pantry', now(), now()),
				('Basement Pantry', now(), now()),
				('Basement Freezer', now(), now()),
				('Kitchen Fridge', now(), now());
				
			insert into item_types (name, created_at, updated_at)
			values
				('Inventory', now(), now()),
				('Non Inventory', now(), now()),
				('Food', now(), now()),
				('Drink', now(), now()),
				('Other', now(), now());
		`);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
