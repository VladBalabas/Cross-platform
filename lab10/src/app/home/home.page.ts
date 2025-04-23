import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonLabel, IonSelectOption, IonSelect } from '@ionic/angular/standalone';
import { Toy } from '../lab6/abstract/toy';
import { ProductsService } from '../lab6/services/products.service';
import { FormsModule } from '@angular/forms';
import { UppercaseAndPricePipe } from '../pipes/uppercase.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonLabel, IonItem, IonList, IonSpinner, IonHeader, IonToolbar, IonTitle, IonContent, IonSelectOption, IonSelect, FormsModule, UppercaseAndPricePipe, CommonModule ],
})
export class HomePage {
  products: Toy[] = [];
  categories: string[] = [];
  filteredProducts: Toy[] = [];
  isLoading: boolean = true;
  selectedCategory: string = '';

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    await this.productsService.fetchProducts();
    this.products = this.productsService.products;
    this.categories = this.productsService.categories;

    this.isLoading = false;
    this.filteredProducts = [...this.products]; // Отображаем все товары изначально
  }

  filterProductsByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredProducts = [...this.products]; // Если категория не выбрана, показываем все товары
    } else {
      this.filteredProducts = this.products.filter(product => product.getType() === category);
    }
  }
}
