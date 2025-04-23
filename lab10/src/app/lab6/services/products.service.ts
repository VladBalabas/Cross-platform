import { Injectable } from '@angular/core';
import { Toy } from '../abstract/toy';
import { ProductFactoryService } from './productfactory.service';
import { child, get, ref, remove, set } from 'firebase/database';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Toy[] = [];
  categories: string[] = [];

  constructor(
    private productFactory: ProductFactoryService,
    private db: Database
  ) {}

  async fetchProducts() {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(child(dbRef, 'products'));
      
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        this.products = [];
        const typesSet = new Set<string>();
        
        Object.keys(productsData).forEach(key => {
          const productData = productsData[key];
          if (productData?.type) {
            typesSet.add(productData.type);
          }
          const product = this.productFactory.createProduct(productData);
          this.products.push(product);
        });
        
        this.categories = Array.from(typesSet);
      } else {
        console.warn('Продукти не знайдено');
      }
    } catch (error) {
      console.error('Помилка завантаження продуктів з Firebase:', error);
    }
  }
}