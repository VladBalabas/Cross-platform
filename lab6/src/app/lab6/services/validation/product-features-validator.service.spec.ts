import { ProductFeaturesValidatorService } from './product-features-validator.service';

describe('ProductFeaturesValidatorService', () => {
  let service: ProductFeaturesValidatorService;

  beforeEach(() => {
    service = new ProductFeaturesValidatorService();
  });

  describe('validateMinimumFeatures', () => {
    it('should return invalidFeaturesArray for non-array values', () => {
      const validator = service.validateMinimumFeatures(3);
      expect(validator({ value: null } as any)).toEqual({ invalidFeaturesArray: true });
      expect(validator({ value: undefined } as any)).toEqual({ invalidFeaturesArray: true });
      expect(validator({ value: 'not an array' } as any)).toEqual({ invalidFeaturesArray: true });
      expect(validator({ value: 123 } as any)).toEqual({ invalidFeaturesArray: true });
      expect(validator({ value: {} } as any)).toEqual({ invalidFeaturesArray: true });
    });

    it('should return null when array meets minimum features requirement', () => {
      const validator = service.validateMinimumFeatures(2);
      expect(validator({ value: ['a', 'b'] } as any)).toBeNull();
      expect(validator({ value: ['a', 'b', 'c'] } as any)).toBeNull();
    });

    it('should return error when array has fewer features than required', () => {
      const validator = service.validateMinimumFeatures(3);
      expect(validator({ value: [] } as any)).toEqual({
        minimumFeaturesRequired: { required: 3, actual: 0 }
      });
      expect(validator({ value: ['a'] } as any)).toEqual({
        minimumFeaturesRequired: { required: 3, actual: 1 }
      });
      expect(validator({ value: ['a', 'b'] } as any)).toEqual({
        minimumFeaturesRequired: { required: 3, actual: 2 }
      });
    });

    it('should work with different minimum requirements', () => {
      const validator1 = service.validateMinimumFeatures(1);
      expect(validator1({ value: [] } as any)).not.toBeNull();
      expect(validator1({ value: ['a'] } as any)).toBeNull();

      const validator0 = service.validateMinimumFeatures(0);
      expect(validator0({ value: [] } as any)).toBeNull();
    });
  });

  describe('validateUniqueFeatures', () => {
    it('should return null for non-array values', () => {
      const validator = service.validateUniqueFeatures();
      expect(validator({ value: null } as any)).toBeNull();
      expect(validator({ value: undefined } as any)).toBeNull();
      expect(validator({ value: 'not an array' } as any)).toBeNull();
    });

    it('should return null for empty array', () => {
      const validator = service.validateUniqueFeatures();
      expect(validator({ value: [] } as any)).toBeNull();
    });

    it('should return null when all features are unique', () => {
      const validator = service.validateUniqueFeatures();
      expect(validator({ value: ['a', 'b', 'c'] } as any)).toBeNull();
      expect(validator({ value: ['Feature 1', 'Feature 2'] } as any)).toBeNull();
    });

    it('should detect case-insensitive duplicates', () => {
      const validator = service.validateUniqueFeatures();
      expect(validator({ value: ['a', 'A'] } as any)).toEqual({ duplicateFeatures: true });
      expect(validator({ value: ['Feature', 'feature'] } as any)).toEqual({ duplicateFeatures: true });
    });

    it('should detect multiple duplicates', () => {
      const validator = service.validateUniqueFeatures();
      expect(validator({ value: ['a', 'b', 'a', 'c', 'b'] } as any)).toEqual({ duplicateFeatures: true });
    });
  });

  describe('validateFeatureLength', () => {
    it('should return null for non-array values', () => {
      const validator = service.validateFeatureLength(10);
      expect(validator({ value: null } as any)).toBeNull();
      expect(validator({ value: undefined } as any)).toBeNull();
      expect(validator({ value: 'not an array' } as any)).toBeNull();
    });

    it('should return null when all features meet length requirement', () => {
      const validator = service.validateFeatureLength(5);
      expect(validator({ value: ['a', 'ab', 'abc'] } as any)).toBeNull();
      expect(validator({ value: ['12345'] } as any)).toBeNull();
      expect(validator({ value: [] } as any)).toBeNull();
    });

    it('should detect features that are too long', () => {
      const validator = service.validateFeatureLength(3);
      expect(validator({ value: ['abcd'] } as any)).toEqual({
        featureTooLong: { maxLength: 3, invalidFeatures: ['abcd'] }
      });
      expect(validator({ value: ['a', 'abc', 'abcd'] } as any)).toEqual({
        featureTooLong: { maxLength: 3, invalidFeatures: ['abcd'] }
      });
      expect(validator({ value: ['a', 'abcde', 'abcdef'] } as any)).toEqual({
        featureTooLong: { maxLength: 3, invalidFeatures: ['abcde', 'abcdef'] }
      });
    });

    it('should work with different length limits', () => {
      const validator10 = service.validateFeatureLength(10);
      expect(validator10({ value: ['1234567890'] } as any)).toBeNull();
      expect(validator10({ value: ['12345678901'] } as any)).not.toBeNull();

      const validator0 = service.validateFeatureLength(0);
      expect(validator0({ value: [''] } as any)).toBeNull();
      expect(validator0({ value: ['a'] } as any)).toEqual({
        featureTooLong: { maxLength: 0, invalidFeatures: ['a'] }
      });
    });
  });
});