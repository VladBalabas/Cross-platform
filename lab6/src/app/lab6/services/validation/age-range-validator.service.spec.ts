import { AgeRangeValidatorService } from './age-range-validator.service';
import { AbstractControl } from '@angular/forms';

describe('AgeRangeValidatorService', () => {
  let service: AgeRangeValidatorService;

  beforeEach(() => {
    service = new AgeRangeValidatorService();
  });

  function createControl(value: string | null): AbstractControl {
    return {
      value,
      setValue: () => {},
      patchValue: () => {},
      reset: () => {},
      validator: null,
      asyncValidator: null,
      _parent: null,
      _asyncValidationSubscription: null,
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
      status: 'VALID',
      valueChanges: {} as any,
      statusChanges: {} as any,
      updateOn: 'change',
      setValidators: () => {},
      setAsyncValidators: () => {},
      clearValidators: () => {},
      clearAsyncValidators: () => {},
      markAsTouched: () => {},
      markAsUntouched: () => {},
      markAsDirty: () => {},
      markAsPristine: () => {},
      markAsPending: () => {},
      disable: () => {},
      enable: () => {},
      setParent: () => {},
      updateValueAndValidity: () => {},
      setErrors: () => {},
      getError: () => null,
      hasError: () => false,
    } as unknown as AbstractControl;
  }

  describe('validateAgeRange', () => {
    it('should return null for empty value', () => {
      const control = createControl('');
      const validator = service.validateAgeRange();
      expect(validator(control)).toBeNull();
    });

    it('should return invalidAgeFormat for incorrect format', () => {
      const control = createControl('abc');
      const validator = service.validateAgeRange();
      expect(validator(control)).toEqual({ invalidAgeFormat: true });
    });

    it('should return null for valid single age (with +)', () => {
      const control = createControl('6+');
      const validator = service.validateAgeRange();
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid age range', () => {
      const control = createControl('3-5');
      const validator = service.validateAgeRange();
      expect(validator(control)).toBeNull();
    });

    it('should return minAgeGreaterThanMax when min > max', () => {
      const control = createControl('5-3');
      const validator = service.validateAgeRange();
      expect(validator(control)).toEqual({ minAgeGreaterThanMax: true });
    });

    it('should return invalidAgeFormat for negative max age', () => {
      const control = createControl('3--5');
      const validator = service.validateAgeRange();
      expect(validator(control)).toEqual({ invalidAgeFormat: true });
    });
  });

  describe('validateMinimumAge', () => {
    it('should return null for empty value', () => {
      const control = createControl('');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toBeNull();
    });

    it('should return null for invalid format', () => {
      const control = createControl('abc');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toBeNull();
    });

    it('should return null when min age is equal to required', () => {
      const control = createControl('5+');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toBeNull();
    });

    it('should return null when min age is greater than required', () => {
      const control = createControl('6-10');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toBeNull();
    });

    it('should return minimumAgeRequired when min age is less than required (range)', () => {
      const control = createControl('3-5');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toEqual({
        minimumAgeRequired: {
          requiredAge: 5,
          actualAge: 3,
        },
      });
    });

    it('should return minimumAgeRequired when min age is less than required (single)', () => {
      const control = createControl('4+');
      const validator = service.validateMinimumAge(5);
      expect(validator(control)).toEqual({
        minimumAgeRequired: {
          requiredAge: 5,
          actualAge: 4,
        },
      });
    });

    it('should handle edge cases correctly', () => {
      const control = createControl('0+');
      const validator = service.validateMinimumAge(1);
      expect(validator(control)).toEqual({
        minimumAgeRequired: {
          requiredAge: 1,
          actualAge: 0,
        },
      });
    });
  });
});