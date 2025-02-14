import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonItem, IonContent, IonLabel, IonCard, IonInput, IonButton, IonCardTitle, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCardTitle, FormsModule, IonContent, HeaderComponent, IonItem, IonLabel, IonCard, IonInput, IonButton, CommonModule],
})
export class Tab1Page {
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  result: number = 0;

  isFirstDigitEven(num: number): boolean {
    const firstDigit = parseInt(num.toString()[0], 10);
    return firstDigit % 2 === 0;
  }

  calculate() {
    let sum = 0;

    const numbers = [this.number1, this.number2, this.number3];

    for (let num of numbers) {
      if (num !== null && num % 11 === 0 && this.isFirstDigitEven(num)) {
        sum += Math.pow(num, 3);
      }
    }

    this.result = sum;
  }
}
