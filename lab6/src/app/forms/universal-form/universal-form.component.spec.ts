import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversalFormComponent } from './universal-form.component';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('UniversalFormComponent', () => {
  let component: UniversalFormComponent;
  let fixture: ComponentFixture<UniversalFormComponent>;
  let reactiveFormsService: ReactiveFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule, ReactiveFormsModule, UniversalFormComponent],
      providers: [ReactiveFormsService, FormBuilder]
    });

    fixture = TestBed.createComponent(UniversalFormComponent);
    component = fixture.componentInstance;
    reactiveFormsService = TestBed.inject(ReactiveFormsService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have formGroup initialized', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should have universal form with required fields', () => {
    const form = component.formGroup;
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['price'].valid).toBeFalsy();
    expect(form.controls['ageRange'].valid).toBeFalsy();
    expect(form.controls['features'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.formGroup;
    form.controls['name'].setValue('');
    form.controls['price'].setValue('');
    form.controls['ageRange'].setValue('');
    form.controls['features'].setValue([]);

    expect(form.controls['name'].hasError('required')).toBeTrue();
    expect(form.controls['price'].hasError('required')).toBeTrue();
    expect(form.controls['ageRange'].hasError('required')).toBeTrue();
    expect(form.controls['features'].hasError('required')).toBeTrue();
  });

  it('should validate features as an array', () => {
    const form = component.formGroup;
    form.controls['features'].setValue('');
    expect(form.controls['features'].hasError('required')).toBeTrue();
  });
});
