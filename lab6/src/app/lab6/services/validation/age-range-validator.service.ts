import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AgeRangeValidatorService {
  constructor() {}

  validateAgeRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // "3-5", "6+", "12-15"
      const agePattern = /^(\d+)(-(\d+)|\+)?$/;

      if (!agePattern.test(value)) {
        return { invalidAgeFormat: true };
      }

      const matches = value.match(agePattern);
      const minAge = parseInt(matches[1], 10);

      if (matches[3]) {
        // If "3-5")
        const maxAge = parseInt(matches[3], 10);
        if (minAge >= maxAge) {
          return { minAgeGreaterThanMax: true };
        }
      }

      if (minAge < 0) {
        return { negativeAge: true };
      }

      return null;
    };
  }

  validateMinimumAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const agePattern = /^(\d+)(-(\d+)|\+)?$/;
      if (!agePattern.test(value)) return null;

      const matches = value.match(agePattern);
      const currentMinAge = parseInt(matches[1], 10);

      return currentMinAge < minAge
        ? {
            minimumAgeRequired: {
              requiredAge: minAge,
              actualAge: currentMinAge,
            },
          }
        : null;
    };
  }
}
