import app from '../../../app';
import request from 'supertest';

//  a test to make sure the delete route is working properly
it('should return a 200 status code and delete the inventory location', async () => {
  const token = await global.signin(true);
  // create a new inventory location
  const location = 'Test Inventory Location';

  const { body: createData } = await request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location,
    })
    .expect(201);

  // delete the new inventory location
  const { body: deleteData } = await request(app)
    .delete(`/api/inventory_location/${createData.inventoryLocation.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(200);
  expect(deleteData.deleted_inventory_location_id).toBe(
    createData.inventoryLocation.id
  );
});

// a test to make a non admin user can't delete an inventory location
it('should return a 401 status code and not delete the inventory location', async () => {
  const token1 = await global.signin(true);
  const token2 = await global.signin();

  // create a new inventory location
  const location = 'Test Inventory Location';

  const { body: createData } = await request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token1}`)
    .send({
      location,
    })
    .expect(201);

  // delete the new inventory location
  await request(app)
    .delete(`/api/inventory_location/${createData.inventoryLocation.id}`)
    .set('Authorization', `bearer ${token2}`)
    .expect(401);
});
