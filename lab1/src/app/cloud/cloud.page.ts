import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import Chart from 'chart.js/auto';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.page.html',
  styleUrls: ['./cloud.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class CloudPage implements OnInit, AfterViewInit {
  @ViewChild('bookChart', { static: false }) bookChart!: ElementRef;

  books: any[] = [];
  genres: { name: string }[] = [];
  booksByGenre: { [key: string]: any[] } = {};
  bookChartInstance: Chart | null = null;
  jsonBinUrl = 'https://api.jsonbin.io/v3/b/67bb7dcfad19ca34f80f9bb1/latest';
  jsonBinKey = '$2a$10$tj9Q4CJKqIET6uDVWn/Kj.4AKzFkEh5VJp4vdA5SArauFVIcKis0a';

  constructor() { }

  async ngOnInit() {
    await this.fetchBooks();
    this.groupBooksByGenre();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  getGenres(): string[] {
    return Object.keys(this.booksByGenre);
  }

  async fetchBooks() {
    try {
      const response = await fetch(this.jsonBinUrl, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.jsonBinKey
        }
      });

      if (!response.ok) throw new Error(`Помилка HTTP: ${response.status}`);

      const data = await response.json();
      this.books = data.record || [];
      this.groupBooksByGenre();
      this.updateChart();
    } catch (error) {
      console.error('Помилка завантаження:', error);
    }
  }

  groupBooksByGenre() {
    this.booksByGenre = {};
    this.books.forEach(book => {
      if (!this.booksByGenre[book.genre]) {
        this.booksByGenre[book.genre] = [];
      }
      this.booksByGenre[book.genre].push(book);
    });

    this.genres = Object.keys(this.booksByGenre).map(name => ({ name }));
  }

  createChart() {
    if (!this.books.length || !this.bookChart?.nativeElement) return;

    const ctx = this.bookChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Не вдалося отримати контекст для canvas!');
      return;
    }

    const yearCounts: { [year: number]: number } = {};
    this.books.forEach(book => {
      yearCounts[book.year] = (yearCounts[book.year] || 0) + 1;
    });

    const years = Object.keys(yearCounts).map(y => Number(y)).sort((a, b) => a - b);
    const counts = years.map(y => yearCounts[y]);

    this.bookChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years.map(y => y.toString()),
        datasets: [{
          label: 'Кількість книг',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChart() {
    if (!this.bookChartInstance) {
      this.createChart();
    } else {
      const yearCounts: { [year: number]: number } = {};
      this.books.forEach(book => {
        yearCounts[book.year] = (yearCounts[book.year] || 0) + 1;
      });

      const years = Object.keys(yearCounts).map(y => Number(y)).sort((a, b) => a - b);
      const counts = years.map(y => yearCounts[y]);

      this.bookChartInstance.data.labels = years.map(y => y.toString());
      this.bookChartInstance.data.datasets[0].data = counts;
      this.bookChartInstance.update();
    }
  }
}
