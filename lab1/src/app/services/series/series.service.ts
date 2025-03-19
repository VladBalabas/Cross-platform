import { Injectable, Optional } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(@Optional() private logService: LogService) { }

  computeLnSeries(x: number, terms: number = 10): number {
    if (x <= -1 || x >= 1) {
      throw new Error("Ряд працює тільки на проміжку -1 < x < 1");
    }
    let sum = 0;
    for (let n = 1; n <= terms; n++) {
      sum += (Math.pow(-1, n + 1) * Math.pow(x, n)) / n;
    }

    if (this.logService) {
      this.logService.write(`Series: x=${x}, terms=${terms}, sum=${sum}`);
    }
    return sum;
  }
}