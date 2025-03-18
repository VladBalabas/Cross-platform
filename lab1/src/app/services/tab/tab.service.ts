import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor() { }

  tabulateFunction(start: number, end: number, step: number): { x: number, y: number }[] {
    let results: { x: number, y: number }[] = [];
    for (let x = start; x <= end; x += step) {
      results.push({ x: x, y: Math.log(1 + x) });
    }
    return results;
  }
}