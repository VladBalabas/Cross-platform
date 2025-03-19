import { Injectable, Optional } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(@Optional() private logService: LogService) { }

  tabulateFunction(start: number, end: number, step: number): { x: number, y: number }[] {
    let results: { x: number, y: number }[] = [];
    for (let x = start; x <= end; x += step) {
      let y = Math.log(1 + x);
      results.push({ x, y });

      if (this.logService) {
        this.logService.write(`Tabulated: x=${x}, y=${y}`);
      }
    }
    return results;
  }
}