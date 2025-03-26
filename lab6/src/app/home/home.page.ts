import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../lab6/services/products.service';
import { Toy } from '../lab6/abstract/toy';
import { IonContent, IonList, IonLabel, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonItem, IonLabel, IonContent, IonList, CommonModule]
})
export class HomePage implements OnInit {
  products: Toy[] = [];

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    await this.productsService.fetchProducts();
    this.products = this.productsService.products;
  }
}
