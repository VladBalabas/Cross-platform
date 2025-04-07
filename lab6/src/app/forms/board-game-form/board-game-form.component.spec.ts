import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardGameFormComponent } from './board-game-form.component';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('BoardGameFormComponent', () => {
  let component: BoardGameFormComponent;
  let fixture: ComponentFixture<BoardGameFormComponent>;
  let reactiveFormsService: ReactiveFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule, ReactiveFormsModule, BoardGameFormComponent],
      providers: [ReactiveFormsService, FormBuilder]
    });

    fixture = TestBed.createComponent(BoardGameFormComponent);
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

  it('should have board game form with required fields', () => {
    const form = component.formGroup;
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['price'].valid).toBeFalsy();
    expect(form.controls['playersCount'].valid).toBeFalsy();
    expect(form.controls['duration'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.formGroup;
    form.controls['name'].setValue('');
    form.controls['price'].setValue('');
    form.controls['playersCount'].setValue('');
    form.controls['duration'].setValue('');

    expect(form.controls['name'].hasError('required')).toBeTrue();
    expect(form.controls['price'].hasError('required')).toBeTrue();
    expect(form.controls['playersCount'].hasError('required')).toBeTrue();
    expect(form.controls['duration'].hasError('required')).toBeTrue();
  });
});