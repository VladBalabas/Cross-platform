import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toy } from '../lab6/abstract/toy';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardGameFormComponent } from '../forms/board-game-form/board-game-form.component';
import { StuffedToyFormComponent } from '../forms/stuffed-toy-form/stuffed-toy-form.component';
import { CreativeKitFormComponent } from '../forms/creative-kit-form/creative-kit-form.component';
import { UniversalFormComponent } from '../forms/universal-form/universal-form.component';
import { OtherToysFormComponent } from '../forms/other-toys-form/other-toys-form.component';
import { ProductsService } from '../lab6/services/products.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardGameFormComponent,
    StuffedToyFormComponent,
    CreativeKitFormComponent,
    UniversalFormComponent,
    OtherToysFormComponent,
  ],
  standalone: true,
})
export class CreateProductsComponent implements OnInit {
  @Input() products: Toy[] = [];
  selectedType: string = '';
  productForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private productFactory: ProductFactoryService,
    private reactiveFormsService: ReactiveFormsService,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({});
  }

  ngOnInit() {}

  onTypeChange() {
    this.productForm.reset();
    this.productForm = this.reactiveFormsService.createForm(this.selectedType);
  }

  async onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      const productData = {
        ...this.productForm.value,
        id: this.products.length + 1,
        ...(this.selectedType !== 'new' && { type: this.selectedType }),
      };

      const newProduct = this.productFactory.createProduct(productData);
      this.products.push(newProduct);
      this.productForm.reset();

      await this.productsService.addProduct(productData);
    } else {
      console.log('Form is invalid!', this.productForm.errors);
    }
  }
}
