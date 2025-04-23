import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgeRangeValidatorService } from './validation/age-range-validator.service';
import { ProductFeaturesValidatorService } from './validation/product-features-validator.service';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormsService {

  private ageValidator: AgeRangeValidatorService = new AgeRangeValidatorService();
  private featuresValidator: ProductFeaturesValidatorService = new ProductFeaturesValidatorService();

  constructor(
    private fb: FormBuilder
  ) {}

  private createCommonForm(): any {
    return {
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      price: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(10000)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]]
    };
  }

  createOtherToysForm(): FormGroup {
    return this.fb.group({
      ...this.createCommonForm(),
      type: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
    });
  }

  createBoardGameForm(): FormGroup {
    return this.fb.group({
      ...this.createCommonForm(),
      playersCount: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(20)
      ]],
      duration: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(600)
      ]]
    });
  }

  createStuffedToyForm(): FormGroup {
    return this.fb.group({
      ...this.createCommonForm(),
      material: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      height: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(200)
      ]]
    });
  }

  createCreativeKitForm(): FormGroup {
    return this.fb.group({
      ...this.createCommonForm(),
      kitType: ['', Validators.required],
      componentsCount: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(500)
      ]],
      difficultyLevel: ['', Validators.required]
    });
  }

  createUniversalForm(): FormGroup {
    return this.fb.group({
      ...this.createCommonForm(),
      ageRange: ['', [
        Validators.required,
        this.ageValidator.validateAgeRange(),
        this.ageValidator.validateMinimumAge(0)
      ]],
      features: [[], [
        Validators.required,
        this.featuresValidator.validateMinimumFeatures(1),
        this.featuresValidator.validateUniqueFeatures(),
        this.featuresValidator.validateFeatureLength(50)
      ]]
    });
  }

  createForm(type: string): FormGroup {
    switch (type) {
      case 'boardGame':
        return this.createBoardGameForm();
      case 'stuffedToy':
        return this.createStuffedToyForm();
      case 'creativeKit':
        return this.createCreativeKitForm();
      case 'universal':
        return this.createUniversalForm();
      default:
        return this.createOtherToysForm();
    }
  }
}