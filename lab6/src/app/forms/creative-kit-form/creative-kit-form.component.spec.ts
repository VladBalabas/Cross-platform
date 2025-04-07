import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreativeKitFormComponent } from './creative-kit-form.component';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('CreativeKitFormComponent', () => {
  let component: CreativeKitFormComponent;
  let fixture: ComponentFixture<CreativeKitFormComponent>;
  let reactiveFormsService: ReactiveFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule, ReactiveFormsModule, CreativeKitFormComponent],
      providers: [ReactiveFormsService, FormBuilder]
    });

    fixture = TestBed.createComponent(CreativeKitFormComponent);
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

  it('should have creative kit form with required fields', () => {
    const form = component.formGroup;
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['price'].valid).toBeFalsy();
    expect(form.controls['kitType'].valid).toBeFalsy();
    expect(form.controls['componentsCount'].valid).toBeFalsy();
    expect(form.controls['difficultyLevel'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.formGroup;
    form.controls['name'].setValue('');
    form.controls['price'].setValue('');
    form.controls['kitType'].setValue('');
    form.controls['componentsCount'].setValue('');
    form.controls['difficultyLevel'].setValue('');

    expect(form.controls['name'].hasError('required')).toBeTrue();
    expect(form.controls['price'].hasError('required')).toBeTrue();
    expect(form.controls['kitType'].hasError('required')).toBeTrue();
    expect(form.controls['componentsCount'].hasError('required')).toBeTrue();
    expect(form.controls['difficultyLevel'].hasError('required')).toBeTrue();
  });
});
