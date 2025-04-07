import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ArrayService } from '../array_service/array.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ResultsComponent } from '../results/results.component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let arrayService: jasmine.SpyObj<ArrayService>;

  beforeEach(async () => {
    const arrayServiceSpy = jasmine.createSpyObj('ArrayService', ['calculateTotalStudentsPerCourse']);

    await TestBed.configureTestingModule({
      imports: [HomePage, StudentFormComponent, ResultsComponent],
      providers: [
        { provide: ArrayService, useValue: arrayServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    arrayService = TestBed.inject(ArrayService) as jasmine.SpyObj<ArrayService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDataSubmitted', () => {
    it('should update studentsData and calculate totals', () => {
      const testData = [[10, 20], [5, 15]];
      const expectedTotals = [30, 20];

      arrayService.calculateTotalStudentsPerCourse.and.returnValue(expectedTotals);

      component.onDataSubmitted(testData);

      expect(component.studentsData).toEqual(testData);
      expect(arrayService.calculateTotalStudentsPerCourse).toHaveBeenCalled();
      expect(component.totals).toEqual(expectedTotals);
    });

    it('should handle empty data', () => {
      const testData: number[][] = [];
      const expectedTotals: number[] = [];
      
      arrayService.calculateTotalStudentsPerCourse.and.returnValue(expectedTotals);

      component.onDataSubmitted(testData);

      expect(component.studentsData).toEqual(testData);
      expect(component.totals).toEqual(expectedTotals);
    });

    it('should handle single course with multiple groups', () => {
      const testData = [[5, 10, 15]];
      const expectedTotals = [30];
      
      arrayService.calculateTotalStudentsPerCourse.and.returnValue(expectedTotals);

      component.onDataSubmitted(testData);

      expect(component.studentsData).toEqual(testData);
      expect(component.totals).toEqual(expectedTotals);
    });
  });

  it('should pass data to child components correctly', () => {
    fixture.detectChanges();
    
    const studentFormComponent = fixture.debugElement.query(
      el => el.componentInstance instanceof StudentFormComponent
    )?.componentInstance as StudentFormComponent;
    
    const resultsComponent = fixture.debugElement.query(
      el => el.componentInstance instanceof ResultsComponent
    )?.componentInstance as ResultsComponent;
    
    expect(studentFormComponent).toBeTruthy();
    expect(resultsComponent).toBeTruthy();
  });
});