import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffedToyFormComponent } from './stuffed-toy-form.component';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('StuffedToyFormComponent', () => {
  let component: StuffedToyFormComponent;
  let fixture: ComponentFixture<StuffedToyFormComponent>;
  let reactiveFormsService: ReactiveFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule, ReactiveFormsModule, StuffedToyFormComponent],
      providers: [ReactiveFormsService, FormBuilder]
    });

    fixture = TestBed.createComponent(StuffedToyFormComponent);
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

  it('should have stuffed toy form with required fields', () => {
    const form = component.formGroup;
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['price'].valid).toBeFalsy();
    expect(form.controls['material'].valid).toBeFalsy();
    expect(form.controls['height'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.formGroup;
    form.controls['name'].setValue('');
    form.controls['price'].setValue('');
    form.controls['material'].setValue('');
    form.controls['height'].setValue('');

    expect(form.controls['name'].hasError('required')).toBeTrue();
    expect(form.controls['price'].hasError('required')).toBeTrue();
    expect(form.controls['material'].hasError('required')).toBeTrue();
    expect(form.controls['height'].hasError('required')).toBeTrue();
  });

  it('should validate height as positive number', () => {
    const form = component.formGroup;
    form.controls['height'].setValue(-1);
    expect(form.controls['height'].hasError('min')).toBeTrue();

    form.controls['height'].setValue(0);
    expect(form.controls['height'].hasError('min')).toBeTrue();

    form.controls['height'].setValue(10);
    expect(form.controls['height'].valid).toBeTrue();
  });
});