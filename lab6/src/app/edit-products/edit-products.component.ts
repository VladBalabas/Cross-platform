import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Toy } from '../lab6/abstract/toy';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { BoardGameFormComponent } from '../forms/board-game-form/board-game-form.component';
import { StuffedToyFormComponent } from '../forms/stuffed-toy-form/stuffed-toy-form.component';
import { CreativeKitFormComponent } from '../forms/creative-kit-form/creative-kit-form.component';
import { UniversalFormComponent } from '../forms/universal-form/universal-form.component';
import { BoardGame } from '../lab6/toys/board_game';
import { StuffedToy } from '../lab6/toys/stuffed_toy';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { Universal } from '../lab6/toys/universal';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardGameFormComponent,
    StuffedToyFormComponent,
    CreativeKitFormComponent,
    UniversalFormComponent,
  ],
  standalone: true,
})
export class EditProductsComponent implements OnInit {
  @Input() products: Toy[] = [];
  selectedProductId: number | null = null;
  selectedProduct: Toy | null = null;
  selectedType: string = '';
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productFactory: ProductFactoryService,
    private reactiveFormsService: ReactiveFormsService
  ) {
    this.productForm = this.fb.group({});
  }

  ngOnInit() {}

  onEdit(product: Toy) {
    this.selectedProductId = product.id;
    this.selectedProduct = product;
    this.selectedType = this.getProductType(product);

    this.productForm = this.reactiveFormsService.createForm(this.selectedType);
    this.patchFormValues();
  }

  onDelete(product: Toy) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    this.resetForm();
  }

  private getProductType(product: Toy): string {
    if (product instanceof BoardGame) return 'boardGame';
    if (product instanceof StuffedToy) return 'stuffedToy';
    if (product instanceof CreativeKit) return 'creativeKit';
    if (product instanceof Universal) return 'universal';
    return '';
  }

  private patchFormValues() {
    if (this.selectedProduct) {
      const { id, ...formValue } = this.selectedProduct;
      this.productForm.patchValue(formValue);
    }
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedProductId) {
      const updatedData = {
        ...this.productForm.value,
        id: this.selectedProductId,
        type: this.selectedType,
      };

      const updatedProduct = this.productFactory.createProduct(updatedData);

      const index = this.products.findIndex(
        (p) => p.id === this.selectedProductId
      );
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }

      this.resetForm();
    }
  }

  private resetForm() {
    this.selectedProductId = null;
    this.selectedProduct = null;
    this.selectedType = '';
    this.productForm.reset();
  }
}
