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

  async addProduct(product: Toy): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${product.id}`);
      await set(productRef, product);
      console.log(`Product with ID ${product.id} added to DB`);
      await this.fetchProducts();
    } catch (error) {
      console.error('Помилка додавання продукту в Firebase:', error);
    }
  }

  async updateProduct(product: Toy): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${product.id}`);
      await set(productRef, product);
      console.log(`Product with ID ${product.id} updated in DB`);
      await this.fetchProducts();
    } catch (error) {
      console.error('Помилка оновлення продукту в Firebase:', error);
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${id}`);
      await remove(productRef);
      console.log(`Product with ID ${id} deleted from DB`);
      await this.fetchProducts();
    } catch (error) {
      console.error('Помилка видалення продукту з Firebase:', error);
    }
  }

  async deleteProductsByType(type: string): Promise<void> {
    try {
      const dbRefMain = ref(this.db);
      const snapshot = await get(child(dbRefMain, 'products'));
      
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const deletionPromises: Promise<void>[] = [];
        
        Object.keys(productsData).forEach(key => {
          if (productsData[key].type === type) {
            deletionPromises.push(remove(ref(this.db, `products/${key}`)));
          }
        });
        
        await Promise.all(deletionPromises);
        console.log(`All products of type '${type}' have been deleted`);
        await this.fetchProducts();
      }
    } catch (error) {
      console.error('Помилка каскадного видалення продуктів:', error);
    }
  }
}