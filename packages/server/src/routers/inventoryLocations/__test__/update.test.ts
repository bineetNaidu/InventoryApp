import app from '../../../app';
import request from 'supertest';

// a test to ensure the inventory locations update endpoint is working properly
it('should update an inventory location', async () => {
  const token = await global.signin(true);
  // create a new inventory location
  const location = 'Test Inventory Location';

  const { body } = await request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location,
    })
    .expect(201);

  // update the inventory location
  const { body: updatedLocation } = await request(app)
    .put(`/api/inventory_location/${body.inventoryLocation.id}`)
    .set('Authorization', `bearer ${token}`)
    .send({
      location: 'Updated Inventory Location',
    })
    .expect(200);

  // check that the updated location is correct
  expect(updatedLocation.inventoryLocation.location).toBe(
    'Updated Inventory Location'
  );
});

// a test that a non admin user can't update an inventory location
it('should not update an inventory location as a non admin user', async () => {
  const token1 = await global.signin(true);
  const token2 = await global.signin(false);
  // create a new inventory location
  const location = 'Test Inventory Location';

  const { body } = await request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token1}`)
    .send({
      location,
    })
    .expect(201);

  // update the inventory location
  await request(app)
    .put(`/api/inventory_location/${body.inventoryLocation.id}`)
    .set('Authorization', `bearer ${token2}`)
    .send({
      location: 'Updated Inventory Location',
    })
    .expect(401);
});

// a test that a inventory location can't be updated if it doesn't exist
it("should not update an inventory location if it doesn't exist", async () => {
  const token = await global.signin(true);
  // update the inventory location
  await request(app)
    .put('/api/inventory_location/0')
    .set('Authorization', `bearer ${token}`)
    .send({
      location: 'Updated Inventory Location',
    })
    .expect(400);
});

// a test that return 400 if inventory location is not provided
it('should return 400 if inventory location is not provided', async () => {
  const token = await global.signin(true);
  // create a new inventory location
  const location = 'Test Inventory Location';

  const { body } = await request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location,
    })
    .expect(201);

  // update the inventory location
  await request(app)
    .put(`/api/inventory_location/${body.inventoryLocation.id}`)
    .set('Authorization', `bearer ${token}`)
    .send({})
    .expect(400);
});
