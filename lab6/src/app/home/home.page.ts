import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowProductsComponent } from '../show-products/show-products.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Toy } from '../lab6/abstract/toy';
import { ProductsService } from '../lab6/services/products.service';
import { CreateProductsComponent } from "../create-products/create-products.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShowProductsComponent,
    EditProductsComponent,
    ReactiveFormsModule,
    CreateProductsComponent
]
})
export class HomePage implements OnInit {
  selectedSegment: string = 'show';
  products: Toy[] = [];
  categories: string[] = [];
  formattedCategories: { name: string, type: string }[] = [];
  isLoading: boolean = true;

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    await this.productsService.fetchProducts();
    this.products = this.productsService.products;
    this.categories = this.productsService.categories;

    this.formattedCategories = this.categories.map(type => ({
      type,
      name: this.getDisplayName(type)
    }));

    this.isLoading = false;
  }

  private getDisplayName(type: string): string {
    switch (type) {
      case 'boardGame': return 'Board Games';
      case 'stuffedToy': return 'Stuffed Toys';
      case 'creativeKit': return 'Creative Kits';
      case 'universal': return 'Universal Toys';
      default: return type;
    }
  }
}
