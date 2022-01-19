import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('should get a successful html response', async () => {
    const response = await request.get(
      '/images?filename=fjord&width=300&height=350'
    );
    expect(response.status).toEqual(200);
  });
});
