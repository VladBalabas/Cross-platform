import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, IonicModule, ResultsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {

    it('should handle empty inputs', () => {
      component.studentsData = [];
      component.totals = [];
      fixture.detectChanges();

      expect(component.studentsData).toEqual([]);
      expect(component.totals).toEqual([]);

      const courseElements = fixture.nativeElement.querySelectorAll('.course');
      expect(courseElements.length).toBe(0);
    });

  });
});