import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form.component';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArrayService } from '../array_service/array.service';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let arrayService: jasmine.SpyObj<ArrayService>;

  beforeEach(async () => {
    const arrayServiceSpy = jasmine.createSpyObj('ArrayService', ['updateData']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, IonicModule, StudentFormComponent],
      providers: [
        FormBuilder,
        { provide: ArrayService, useValue: arrayServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    arrayService = TestBed.inject(ArrayService) as jasmine.SpyObj<ArrayService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with default coursesCount', () => {
      expect(component.coursesCount).toBe(4);
    });

    it('should initialize groups form with correct number of controls', () => {
      expect(component.groupsFormArray.length).toBe(4);
    });

    it('should initialize empty students form', () => {
      expect(component.studentsFormArray.length).toBe(0);
    });
  });

  describe('Form Validation', () => {
    describe('isGroupsFormValid', () => {
      it('should return false when any group has zero or negative value', () => {
        component.groupsFormArray.patchValue([1, 0, 2, -1]);
        expect(component.isGroupsFormValid()).toBeFalse();
      });

      it('should return true when all groups have positive values', () => {
        component.groupsFormArray.patchValue([1, 2, 3, 4]);
        expect(component.isGroupsFormValid()).toBeTrue();
      });
    });

    describe('isStudentsFormValid', () => {
      beforeEach(() => {
        // Set up for 2 courses with groups
        component.groupsFormArray.patchValue([2, 1, 0, 0]);
        component.onGroupsSubmit();
      });

      it('should return false when form is invalid', () => {
        component.studentsFormArray.at(0).patchValue([0, -1]);
        component.studentsFormArray.at(1).patchValue([0]);
        expect(component.isStudentsFormValid()).toBeFalse();
      });

      it('should return true when all student counts are valid', () => {
        component.studentsFormArray.at(0).patchValue([5, 10]);
        component.studentsFormArray.at(1).patchValue([15]);
        expect(component.isStudentsFormValid()).toBeTrue();
      });

      it('should return false when students form is empty', () => {
        component.studentsFormArray.clear();
        expect(component.isStudentsFormValid()).toBeFalse();
      });
    });
  });

  describe('Form Methods', () => {
    describe('onGroupsSubmit', () => {
      it('should update groupsPerCourse and initialize students form', () => {
        const testGroups = [2, 3, 1, 0];
        component.groupsFormArray.patchValue(testGroups);
        
        component.onGroupsSubmit();
        
        expect(component.groupsPerCourse).toEqual(testGroups);
        expect(component.studentsFormArray.length).toBe(4);
        expect((component.studentsFormArray.at(0) as FormArray).length).toBe(2);
        expect((component.studentsFormArray.at(1) as FormArray).length).toBe(3);
        expect((component.studentsFormArray.at(2) as FormArray).length).toBe(1);
        expect((component.studentsFormArray.at(3) as FormArray).length).toBe(0);
      });
    });

    describe('onSubmit', () => {
      it('should update service and emit event with correct data', () => {
        const testData = [[10, 20], [5], [], []];
        spyOn(component.dataSubmitted, 'emit');

        component.groupsFormArray.patchValue([2, 1, 0, 0]);
        component.onGroupsSubmit();
        component.studentsFormArray.at(0).patchValue([10, 20]);
        component.studentsFormArray.at(1).patchValue([5]);
        
        component.onSubmit();
        
        expect(arrayService.updateData).toHaveBeenCalledWith(testData);
        expect(component.dataSubmitted.emit).toHaveBeenCalledWith(testData);
      });
    });

    describe('getCourseGroups', () => {
      beforeEach(() => {
        component.groupsFormArray.patchValue([2, 1, 0, 0]);
        component.onGroupsSubmit();
      });

      it('should return correct FormArray for course', () => {
        const course0Groups = component.getCourseGroups(0);
        expect(course0Groups.length).toBe(2);
        
        const course1Groups = component.getCourseGroups(1);
        expect(course1Groups.length).toBe(1);
      });
    });
  });

  describe('Input Changes', () => {
    it('should not reinitialize form when coursesCount changes', () => {
      component.coursesCount = 3;
      component.ngOnInit();
      
      expect(component.groupsFormArray.length).toBe(3);
      expect(component.groupsPerCourse.length).toBe(4);
    });
  });
});