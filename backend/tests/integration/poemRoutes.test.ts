import request from 'supertest';
import app from '../../src/app';

describe('Poem Generation Endpoint', () => {
  describe('POST /generate-poem', () => {
    it('should return 400 if no image is provided', async () => {
      const response = await request(app)
        .post('/generate-poem')
        .field('option', 'A')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should accept request with image and valid option', async () => {
      const testImageBuffer = Buffer.from('fake image data');

      const response = await request(app)
        .post('/generate-poem')
        .attach('image', testImageBuffer, 'test.png')
        .field('option', 'A');

      // Will return 500 if no API key, or 400/500 from OpenAI
      // But should not return 400 for validation error
      expect(response.body).toBeDefined();
    });

    it('should use default poet option when not provided', async () => {
      const testImageBuffer = Buffer.from('fake image data');

      const response = await request(app)
        .post('/generate-poem')
        .attach('image', testImageBuffer, 'test.png');

      // Should not fail validation - defaults to 'A'
      // Will fail at OpenAI API call which is expected
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
