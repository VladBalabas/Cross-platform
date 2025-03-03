import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonCardHeader, IonCardTitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-lab3-abstract',
  templateUrl: './lab3-abstract.page.html',
  styleUrls: ['./lab3-abstract.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class Lab3AbstractPage implements OnInit {

  jsonBinUrl = 'https://api.jsonbin.io/v3/b/67c38321acd3cb34a8f34802/latest';
  jsonBinKey = '$2a$10$tj9Q4CJKqIET6uDVWn/Kj.4AKzFkEh5VJp4vdA5SArauFVIcKis0a';

  animals: any[] = [];
  averageSpeed = 0;

  constructor() {}

  async ngOnInit() {
    try {
      const response = await fetch(this.jsonBinUrl, {
        headers: { 'X-Master-Key': this.jsonBinKey }
      });
      const data = await response.json();
      this.animals = data.record;
      this.calculateAverageSpeed();
      this.setBorderColors();
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }

  calculateAverageSpeed() {
    const totalSpeed = this.animals.reduce((sum, animal) => sum + animal.speed, 0);
    this.averageSpeed = totalSpeed / this.animals.length;
  }

  setBorderColors() {
    this.animals = this.animals.map(animal => ({
      ...animal,
      borderColor: animal.speed >= this.averageSpeed ? 'green' : 'red'
    }));
  }

}
