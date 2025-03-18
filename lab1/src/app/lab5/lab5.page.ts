import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { Chart, registerables } from 'chart.js';
import { TabService } from '../services/tab/tab.service';
import { SeriesService } from '../services/series/series.service';
import { RecursionService } from '../services/recursion/recursion.service';

Chart.register(...registerables);

@Component({
  selector: 'app-lab5',
  templateUrl: './lab5.page.html',
  styleUrls: ['./lab5.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class Lab5Page implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  tabulatedData: { x: number, y: number }[] = [];
  seriesData: { x: number, y: number }[] = [];
  recursionData: { x: number, y: number }[] = [];
  displayedResults: { x: number, tabulated: number, series: number, recursion: number }[] = [];

  constructor(
    private tabService: TabService,
    private seriesService: SeriesService,
    private recursionService: RecursionService
  ) {}

  ngOnInit() {
    this.computeValues();
  }

  computeValues() {
    const start = -0.9;
    const end = 0.9;
    const step = 0.1;
    const terms = 10;

    this.tabulatedData = this.tabService.tabulateFunction(start, end, step);
    this.seriesData = this.tabulatedData.map(point => ({
      x: point.x,
      y: this.seriesService.computeLnSeries(point.x, terms)
    }));
    this.recursionData = this.tabulatedData.map(point => ({
      x: point.x,
      y: this.recursionService.computeLnRecursive(point.x, terms)
    }));

    this.displayedResults = this.tabulatedData.slice(0, 5).map((point, index) => ({
      x: point.x,
      tabulated: point.y,
      series: this.seriesData[index].y,
      recursion: this.recursionData[index].y
    }));

    setTimeout(() => {
      this.drawChart();
    }, 500);
  }

  drawChart() {
    new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.tabulatedData.map(point => point.x.toFixed(2)),
        datasets: [
          {
            label: 'Табуляція ln(1 + x)',
            data: this.tabulatedData.map(point => point.y),
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Розклад у ряд',
            data: this.seriesData.map(point => point.y),
            borderColor: 'red',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Рекурсивний метод',
            data: this.recursionData.map(point => point.y),
            borderColor: 'green',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
