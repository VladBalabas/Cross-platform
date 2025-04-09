import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl } from '@angular/forms';
import { ProductFeaturesValidatorService } from './product-features-validator.service';

describe('ProductFeaturesValidatorService', () => {
  let service: ProductFeaturesValidatorService;
  let control: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFeaturesValidatorService);
    control = new FormControl('');
  });

  describe('parseFeatures', () => {
    it('should return empty array for null value', () => {
      control.setValue(null);
      expect(service['parseFeatures'](control)).toEqual([]);
    });

    it('should return empty array for empty string', () => {
      control.setValue('');
      expect(service['parseFeatures'](control)).toEqual([]);
    });

    it('should return array of features', () => {
      control.setValue('feature1, feature2, feature3');
      expect(service['parseFeatures'](control)).toEqual(['feature1', 'feature2', 'feature3']);
    });

    it('should trim whitespace from features', () => {
      control.setValue('  feature1 , feature2  ,  feature3  ');
      expect(service['parseFeatures'](control)).toEqual(['feature1', 'feature2', 'feature3']);
    });

    it('should filter out empty features', () => {
      control.setValue('feature1,,feature2, ,feature3');
      expect(service['parseFeatures'](control)).toEqual(['feature1', 'feature2', 'feature3']);
    });
  });

  describe('validateMinimumFeatures', () => {
    it('should return null when enough features are provided', () => {
      const validator = service.validateMinimumFeatures(3);
      control.setValue('feature1, feature2, feature3');
      expect(validator(control)).toBeNull();
    });

    it('should return error when not enough features are provided', () => {
      const validator = service.validateMinimumFeatures(3);
      control.setValue('feature1, feature2');
      const result = validator(control);
      expect(result).toEqual({
        minimumFeatures: {
          required: 3,
          actual: 2
        }
      });
    });

    it('should handle empty input', () => {
      const validator = service.validateMinimumFeatures(1);
      control.setValue('');
      const result = validator(control);
      expect(result).toEqual({
        minimumFeatures: {
          required: 1,
          actual: 0
        }
      });
    });
  });

  describe('validateUniqueFeatures', () => {
    it('should return null when all features are unique', () => {
      const validator = service.validateUniqueFeatures();
      control.setValue('feature1, feature2, feature3');
      expect(validator(control)).toBeNull();
    });

    it('should return error when duplicate features exist', () => {
      const validator = service.validateUniqueFeatures();
      control.setValue('feature1, feature2, feature1');
      expect(validator(control)).toEqual({ duplicateFeatures: true });
    });

    it('should be case insensitive', () => {
      const validator = service.validateUniqueFeatures();
      control.setValue('feature1, Feature1, FEATURE1');
      expect(validator(control)).toEqual({ duplicateFeatures: true });
    });

    it('should handle empty input', () => {
      const validator = service.validateUniqueFeatures();
      control.setValue('');
      expect(validator(control)).toBeNull();
    });
  });

  describe('validateFeatureLength', () => {
    it('should return null when all features are within length limit', () => {
      const validator = service.validateFeatureLength(10);
      control.setValue('short, medium, length');
      expect(validator(control)).toBeNull();
    });

    it('should return error when any feature exceeds length limit', () => {
      const validator = service.validateFeatureLength(5);
      control.setValue('short, medium, long');
      const result = validator(control);
      expect(result).toEqual({
        featureTooLong: {
          maxLength: 5,
          invalidFeatures: ['medium']
        }
      });
    });

    it('should return multiple invalid features', () => {
      const validator = service.validateFeatureLength(5);
      control.setValue('short, medium, verylong');
      const result = validator(control);
      expect(result).toEqual({
        featureTooLong: {
          maxLength: 5,
          invalidFeatures: ['medium', 'verylong']
        }
      });
    });

    it('should handle empty input', () => {
      const validator = service.validateFeatureLength(10);
      control.setValue('');
      expect(validator(control)).toBeNull();
    });
  });
});