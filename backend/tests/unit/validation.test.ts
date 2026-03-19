import { validatePoetOption } from '../../src/middleware/validation';

describe('Validation Middleware', () => {
  describe('validatePoetOption', () => {
    it('should return the same value for valid poet options', () => {
      expect(validatePoetOption('A')).toBe('A');
      expect(validatePoetOption('B')).toBe('B');
      expect(validatePoetOption('C')).toBe('C');
      expect(validatePoetOption('D')).toBe('D');
    });

    it('should return default "A" for invalid poet options', () => {
      expect(validatePoetOption('E')).toBe('A');
      expect(validatePoetOption('')).toBe('A');
      expect(validatePoetOption('invalid')).toBe('A');
      expect(validatePoetOption('1')).toBe('A');
    });

    it('should return default "A" for undefined', () => {
      expect(validatePoetOption(undefined)).toBe('A');
    });
  });
});
