import { Injectable } from '@angular/core';

import { Toy } from '../abstract/toy';
import { ProductFactoryService } from './productfactory.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private jsonBinUrl = 'https://api.jsonbin.io/v3/b/67e3c5ad8a456b79667cf338/latest';
  private jsonBinKey = '$2a$10$tj9Q4CJKqIET6uDVWn/Kj.4AKzFkEh5VJp4vdA5SArauFVIcKis0a';
  
  products: Toy[] = [];

  constructor(private productFactory: ProductFactoryService) {}

  async fetchProducts() {
    try {
      const response = await fetch(this.jsonBinUrl, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.jsonBinKey
        }
      });

      if (!response.ok) throw new Error(`Помилка HTTP: ${response.status}`);

      const data = await response.json();
      this.products = (data.record?.products || []).map((productData: any) => 
        this.productFactory.createProduct(productData)
      );
    } catch (error) {
      console.error('Помилка завантаження продуктів:', error);
    }
  }
}