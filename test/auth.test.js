const request = require('supertest');
const app = require('../src/app'); 

describe('Auth API', () => {
  it('should signup a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    // Signup first
    await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    // Then login
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'fail@example.com',
      password: 'password123',
      role: 'user'
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'fail@example.com',
      password: 'wrongpass'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
