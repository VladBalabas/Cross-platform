import { Component } from '@angular/core';
import { IonContent, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonItem, CommonModule, FormsModule, IonContent, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, HeaderComponent],
})
export class Tab2Page {
  a: number = 0;
  b: number = 0;
  result: number = 0;

  sumOfDigits(num: number): number {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  calculate() {
    let sum = 0;

    for (let num = this.a; num <= this.b; num++) {
      if (num % 12 === 0 && num % 8 === 4 && this.sumOfDigits(num) % 2 === 0) {
        sum += num;
      }
    }

    this.result = sum;
  }
}
