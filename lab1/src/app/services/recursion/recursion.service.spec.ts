import { TestBed } from '@angular/core/testing';
import { RecursionService } from './recursion.service';

describe('RecursionService', () => {
  let service: RecursionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursionService);
  });

  it('повинен створюватися', () => {
    expect(service).toBeTruthy();
  });

  it('повинен правильно обчислювати ln(1 + x) рекурсивно', () => {
    const result = service.computeLnRecursive(0.1, 10);
    expect(result).toBeCloseTo(Math.log(1.1), 3);
  });

  it('повинен викидати помилку для x <= -1 або x >= 1', () => {
    expect(() => service.computeLnRecursive(-1)).toThrow();
    expect(() => service.computeLnRecursive(1)).toThrow();
  });
});
