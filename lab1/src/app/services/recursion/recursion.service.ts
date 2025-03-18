import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecursionService {

  constructor() { }

  computeLnRecursive(x: number, terms: number = 10, n: number = 1, sum: number = 0): number {
    if (x <= -1 || x >= 1) {
      throw new Error("Ряд працює тільки на проміжку -1 < x < 1");
    }

    if (n > terms) return sum;
    return this.computeLnRecursive(x, terms, n + 1, sum + (Math.pow(-1, n + 1) * Math.pow(x, n)) / n);
  }
}