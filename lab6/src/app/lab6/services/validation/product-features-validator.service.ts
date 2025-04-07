import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductFeaturesValidatorService {
  constructor() {}

  private parseFeatures(control: AbstractControl): string[] {
    if (!control.value || typeof control.value !== 'string') {
      return [];
    }

    return control.value
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
  }

  validateMinimumFeatures(minFeatures: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const features = this.parseFeatures(control);
      console.log('Length:', features);
      console.log('minFeatures:', minFeatures);
      return features.length < minFeatures
        ? { minimumFeatures: { required: minFeatures, actual: features.length } }
        : null;
    };
  }

  validateUniqueFeatures(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const features = this.parseFeatures(control);
      console.log('\nParsed features:', features);
      
      const uniqueFeatures = new Set(features.map((f) => f.toLowerCase()));
      console.log('Unique features:', features);
      if (uniqueFeatures.size !== features.length) {
        return { duplicateFeatures: true };
      }

      return null;
    };
  }

  validateFeatureLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const features = this.parseFeatures(control);

      const invalidFeatures = features.filter((f) => f.length > maxLength);
      console.log('Invalid features:', invalidFeatures);
      return invalidFeatures.length > 0
        ? { featureTooLong: { maxLength, invalidFeatures } }
        : null;
    };
  }
}
