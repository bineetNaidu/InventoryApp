import app from '../../../app';
import request from 'supertest';

// test to create a new inventory location
it(`should return the created inventory location`, async () => {
  const token = await global.signin(true);
  return request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location: 'Test Inventory Location',
    })
    .expect(201);
});

// test to create a new inventory location with invalid data and return 400
it(`should return 400 for invalid inventory location`, async () => {
  const token = await global.signin(true);
  return request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location: '',
    })
    .expect(400);
});

// a test to check if only admin can create a new inventory location
it(`should return 403 for non admin to create a new inventory location`, async () => {
  const token = await global.signin();
  return request(app)
    .post('/api/inventory_location')
    .set('Authorization', `bearer ${token}`)
    .send({
      location: 'Test Inventory Location',
    })
    .expect(401);
});
