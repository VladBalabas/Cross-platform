import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, FormsModule, HeaderComponent],
})
export class Tab3Page {
  matrixSize: number = 0;
  matrix: number[][] = [];
  result: { max: number, min: number } = { max: 0, min: 0 };

  generateMatrix() {
    if (this.matrixSize && this.matrixSize > 0) {
      this.matrix = [];
      let max = -Infinity;
      let min = Infinity;

      for (let i = 0; i < this.matrixSize; i++) {
        const row = [];
        for (let j = 0; j < this.matrixSize; j++) {
          const randomValue = this.getRandomInt(-100, 100);
          row.push(randomValue);

          if (randomValue > max) {
            max = randomValue;
          }
          if (randomValue < min) {
            min = randomValue;
          }
        }
        this.matrix.push(row);
      }

      for (let i = 0; i < this.matrixSize; i++) {
        if (this.matrix[i][i] % 2 !== 0) {
          this.matrix[i][i] = 0;
        }
      }

      this.result = { max, min };
    }
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCellStyle(rowIndex: number, colIndex: number) {
    const value = this.matrix[rowIndex][colIndex];
    if (Math.abs(value) === Math.abs(this.result.max)) {
      return { 'background-color': 'green', color: 'white' };
    } else if (Math.abs(value) === Math.abs(this.result.min)) {
      return { 'background-color': 'blue', color: 'white' };
    }
    return {};
  }
}
