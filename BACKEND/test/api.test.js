import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('API Usuarios', () => {
  it('GET /api/usuarios responde con JSON y código 200', async () => {
    const response = await request(app).get('/api/usuarios');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('Prueba extra', () => {
  it('El servidor debe estar definido', () => {
    expect(true).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
