import app from '../../../app';
import request from 'supertest';

// a test to make sure the findAll route is working properly
it('should return all inventory locations', async () => {
  const token = await global.signin(true);
  // create many inventory locations
  for (let i = 0; i < 10; i++) {
    await request(app)
      .post('/api/inventory_location')
      .set('Authorization', `Bearer ${token}`)
      .send({
        location: `location ${i}`,
      })
      .expect(201);
  }
  // get all inventory locations
  const res = await request(app)
    .get('/api/inventory_location')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  // make sure we got all inventory locations
  expect(res.body.length).toBe(10);
});

// a test to make a non-authorized request can't access the route
it('should not return all inventory locations', async () => {
  await request(app).get('/api/inventory_location').expect(401);
});
