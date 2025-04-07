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

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    await this.productsService.fetchProducts();
    this.products = this.productsService.products;
  }
}
