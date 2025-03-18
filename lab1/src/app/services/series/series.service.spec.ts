import { TestBed } from '@angular/core/testing';
import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesService);
  });

  it('повинен створюватися', () => {
    expect(service).toBeTruthy();
  });

  it('повинен правильно обчислювати ln(1 + x) за допомогою ряду', () => {
    const result = service.computeLnSeries(0.1, 10);
    expect(result).toBeCloseTo(Math.log(1.1), 3);
  });

  it('повинен викидати помилку для x <= -1 або x >= 1', () => {
    expect(() => service.computeLnSeries(-1)).toThrow();
    expect(() => service.computeLnSeries(1)).toThrow();
  });
});
