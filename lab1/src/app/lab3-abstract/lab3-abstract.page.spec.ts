import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab3AbstractPage } from './lab3-abstract.page';

describe('Lab3AbstractPage', () => {
  let component: Lab3AbstractPage;
  let fixture: ComponentFixture<Lab3AbstractPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab3AbstractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
