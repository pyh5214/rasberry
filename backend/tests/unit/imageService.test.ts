import { convertFileToBase64 } from '../../src/services/imageService';

describe('ImageService', () => {
  describe('convertFileToBase64', () => {
    it('should convert buffer to ImageData object', () => {
      const mockFile = {
        buffer: Buffer.from('test image content'),
        mimetype: 'image/png',
        originalname: 'test.png',
        size: 100
      } as Express.Multer.File;

      const result = convertFileToBase64(mockFile);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('base64');
      expect(result).toHaveProperty('mimeType');
      expect(result).toHaveProperty('dataUrl');
    });

    it('should return correct mime type', () => {
      const mockJpegFile = {
        buffer: Buffer.from('jpeg content'),
        mimetype: 'image/jpeg',
        originalname: 'test.jpg',
        size: 100
      } as Express.Multer.File;

      const result = convertFileToBase64(mockJpegFile);

      expect(result.mimeType).toBe('image/jpeg');
    });

    it('should return valid base64 encoding', () => {
      const testContent = 'Hello, World!';
      const mockFile = {
        buffer: Buffer.from(testContent),
        mimetype: 'image/png',
        originalname: 'test.png',
        size: testContent.length
      } as Express.Multer.File;

      const result = convertFileToBase64(mockFile);

      // Verify it's valid base64
      const decoded = Buffer.from(result.base64, 'base64').toString();
      expect(decoded).toBe(testContent);
    });

    it('should generate correct dataUrl format', () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/png',
        originalname: 'test.png',
        size: 4
      } as Express.Multer.File;

      const result = convertFileToBase64(mockFile);

      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
    });
  });
});
