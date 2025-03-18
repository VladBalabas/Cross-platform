import { TestBed } from '@angular/core/testing';
import { TabService } from './tab.service';

describe('TabService', () => {
  let service: TabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabService);
  });

  it('повинен створюватися', () => {
    expect(service).toBeTruthy();
  });

  it('повинен правильно табулювати ln(1 + x)', () => {
    const result = service.tabulateFunction(0, 0.2, 0.1);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ x: 0, y: Math.log(1) }); // ln(1) = 0
    expect(result[1].x).toBeCloseTo(0.1);
    expect(result[1].y).toBeCloseTo(Math.log(1.1));
  });

  it('повинен правильно працювати з від’ємними значеннями у допустимому діапазоні', () => {
    const result = service.tabulateFunction(-0.2, 0, 0.1);
    expect(result.length).toBe(3);
    expect(result[0].y).toBeCloseTo(Math.log(0.8)); // ln(0.8)
  });
});
