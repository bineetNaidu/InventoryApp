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

			insert into manufacturers (name, description, contacts, website, logo_url, created_at, updated_at)
			values 
				('Amazon', 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.', 'https://www.amazon.com/gp/help/customer/display.html?nodeId=GSD587LKW72HKU2V', 'https://www.amazon.com/', 'http://pngimg.com/uploads/amazon/amazon_PNG11.png', now(), now()),
				('Flipkart', 'Flipkart is an online shopping platform for consumer electronics, home, and personal care.', 'https://www.flipkart.com/helpcentre', 'https://www.flipkart.com/', 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png', now(), now()),
				('Apple', 'Apple Inc. is an American multinational technology company that makes personal computers and mobile devices.', 'https://support.apple.com/', 'https://www.apple.com/', 'https://www.apple.com/ac/globalnav/6/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__cxwwnrj0urau_large.svg', now(), now());
		`);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
