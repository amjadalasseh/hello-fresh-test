import { validateAddress, validateEmail, validatePhoneNumber } from './index';

describe('Helper Functions', () => {
  describe('validateEmail', () => {
    it('returns true for a valid email', () => {
      const validEmail = 'test@example.com';
      const isValid = validateEmail(validEmail);
      expect(isValid).toBe(true);
    });

    it('returns false for an invalid email', () => {
      const invalidEmail = 'invalidemail';
      const isValid = validateEmail(invalidEmail);
      expect(isValid).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('returns true for a valid phone number', () => {
      const validPhoneNumber = '123-456-7890';
      const isValid = validatePhoneNumber(validPhoneNumber);
      expect(isValid).toBe(true);
    });

    it('returns false for an invalid phone number', () => {
      const invalidPhoneNumber = '123';
      const isValid = validatePhoneNumber(invalidPhoneNumber);
      expect(isValid).toBe(false);
    });
  });

  describe('validateAddress', () => {
    it('returns true for a non-empty address', () => {
      const validAddress = '123 Main St';
      const isValid = validateAddress(validAddress);
      expect(isValid).toBe(true);
    });

    it('returns false for an empty address', () => {
      const invalidAddress = '';
      const isValid = validateAddress(invalidAddress);
      expect(isValid).toBe(false);
    });
  });
});
