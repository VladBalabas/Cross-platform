import { TestBed } from '@angular/core/testing';
import { ReactiveFormsService } from './reactive-forms.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormsService', () => {
  let service: ReactiveFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ReactiveFormsService, FormBuilder]
    });
    service = TestBed.inject(ReactiveFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a board game form', () => {
    const form = service.createBoardGameForm();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('price')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('playersCount')).toBeTrue();
    expect(form.contains('duration')).toBeTrue();
  });

  it('should create a stuffed toy form', () => {
    const form = service.createStuffedToyForm();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('price')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('material')).toBeTrue();
    expect(form.contains('height')).toBeTrue();
  });

  it('should create a creative kit form', () => {
    const form = service.createCreativeKitForm();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('price')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('kitType')).toBeTrue();
    expect(form.contains('componentsCount')).toBeTrue();
    expect(form.contains('difficultyLevel')).toBeTrue();
  });

  it('should create a universal form', () => {
    const form = service.createUniversalForm();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('price')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('ageRange')).toBeTrue();
    expect(form.contains('features')).toBeTrue();
  });

  it('should create the correct form based on type', () => {
    let form = service.createForm('boardGame');
    expect(form.contains('playersCount')).toBeTrue();
    form = service.createForm('stuffedToy');
    expect(form.contains('material')).toBeTrue();
    form = service.createForm('creativeKit');
    expect(form.contains('kitType')).toBeTrue();
    form = service.createForm('universal');
    expect(form.contains('ageRange')).toBeTrue();
  });
});
