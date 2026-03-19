import request from 'supertest';
import app from '../../src/app';

describe('Health Check Endpoint', () => {
  describe('GET /health', () => {
    it('should return 200 with status ok', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('apiKeySet');
    });

    it('should include server status message', async () => {
      const response = await request(app).get('/health');

      expect(response.body.message).toBe('Server is running normally.');
    });

    it('should indicate API key configuration status', async () => {
      const response = await request(app).get('/health');

      expect(typeof response.body.apiKeySet).toBe('boolean');
    });
  });
});
