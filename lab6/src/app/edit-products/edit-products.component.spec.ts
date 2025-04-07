import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductsComponent } from './edit-products.component';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoardGame } from '../lab6/toys/board_game';
import { StuffedToy } from '../lab6/toys/stuffed_toy';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { Universal } from '../lab6/toys/universal';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Toy } from '../lab6/abstract/toy';

describe('EditProductsComponent', () => {
  let component: EditProductsComponent;
  let fixture: ComponentFixture<EditProductsComponent>;
  let reactiveFormsService: ReactiveFormsService;
  let productFactoryService: ProductFactoryService;
  let fb: FormBuilder;

  const testProducts = [
    new BoardGame(1, 'Chess', 20, 'Classic strategy game', 2, 60),
    new StuffedToy(2, 'Teddy Bear', 30, 'Soft plush toy', 'Cotton', 50),
    new CreativeKit(3, 'Painting Set', 25, 'Complete painting kit', 'Art', 12, 'Medium'),
    new Universal(4, 'Building Blocks', 35, 'Educational toy', '3-6', ['Colorful', 'Safe materials'])
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditProductsComponent
      ],
      providers: [
        ReactiveFormsService,
        ProductFactoryService,
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductsComponent);
    component = fixture.componentInstance;
    reactiveFormsService = TestBed.inject(ReactiveFormsService);
    productFactoryService = TestBed.inject(ProductFactoryService);
    fb = TestBed.inject(FormBuilder);

    component.products = [...testProducts];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEdit', () => {
    it('should set up form for editing a board game', () => {
      spyOn(reactiveFormsService, 'createForm').and.callThrough();
      const product = testProducts[0];
      
      component.onEdit(product);
      
      expect(component.selectedProductId).toBe(1);
      expect(component.selectedProduct).toBe(product);
      expect(component.selectedType).toBe('boardGame');
      expect(reactiveFormsService.createForm).toHaveBeenCalledWith('boardGame');
      expect(component.productForm.value.name).toBe('Chess');
    });

    it('should set up form for editing a stuffed toy', () => {
      const product = testProducts[1];
      component.onEdit(product);
      
      expect(component.selectedType).toBe('stuffedToy');
      expect(component.productForm.value.material).toBe('Cotton');
    });

    it('should set up form for editing a creative kit', () => {
      const product = testProducts[2];
      component.onEdit(product);
      
      expect(component.selectedType).toBe('creativeKit');
      expect(component.productForm.value.kitType).toBe('Art');
    });

    it('should set up form for editing a universal product', () => {
      const product = testProducts[3];
      component.onEdit(product);
      
      expect(component.selectedType).toBe('universal');
      expect(component.productForm.value.ageRange).toBe('3-6');
    });
  });

  describe('onDelete', () => {
    it('should remove the product from the list and reset form', () => {
      const product = testProducts[0];
      component.onEdit(product);
      
      component.onDelete(product);
      
      expect(component.products.length).toBe(3);
      expect(component.products.find(p => p.id === 1)).toBeUndefined();
      expect(component.selectedProductId).toBeNull();
      expect(component.selectedProduct).toBeNull();
      expect(component.selectedType).toBe('');
    });

    it('should not modify products if product not found', () => {
      const initialLength = component.products.length;
      const fakeProduct = new BoardGame(99, 'Fake', 0, '', 0, 0);
      
      component.onDelete(fakeProduct);
      
      expect(component.products.length).toBe(initialLength);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.onEdit(testProducts[0]);
    });

    it('should not submit if form is invalid', () => {
      spyOn(productFactoryService, 'createProduct');
      component.productForm.get('name')?.setValue('');
      
      component.onSubmit();
      
      expect(productFactoryService.createProduct).not.toHaveBeenCalled();
    });

    it('should update the board game when form is valid', () => {
      component.productForm.patchValue({
        name: 'Updated Chess',
        price: 25,
        description: 'Updated description',
        playersCount: 4,
        duration: 90
      });
      
      component.onSubmit();
      
      const updatedProduct = component.products.find(p => p.id === 1);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct?.name).toBe('Updated Chess');
      expect(updatedProduct?.price).toBe(25);
      expect(component.selectedProductId).toBeNull();
    });

    it('should update the stuffed toy when form is valid', () => {
      component.onEdit(testProducts[1]);
      component.productForm.patchValue({
        name: 'Updated Teddy',
        material: 'Silk',
        height: 60
      });
      
      component.onSubmit();
      
      const updatedProduct = component.products.find(p => p.id === 2) as StuffedToy;
      expect(updatedProduct.material).toBe('Silk');
      expect(updatedProduct.height).toBe(60);
    });

    it('should not update anything if product ID not found', () => {
      component.selectedProductId = 99;
      component.onSubmit();
      
      expect(component.products).toEqual(testProducts);
    });
  });

  describe('getProductType', () => {
    it('should return correct type for BoardGame', () => {
      const type = component['getProductType'](testProducts[0]);
      expect(type).toBe('boardGame');
    });

    it('should return correct type for StuffedToy', () => {
      const type = component['getProductType'](testProducts[1]);
      expect(type).toBe('stuffedToy');
    });

    it('should return correct type for CreativeKit', () => {
      const type = component['getProductType'](testProducts[2]);
      expect(type).toBe('creativeKit');
    });

    it('should return correct type for Universal', () => {
      const type = component['getProductType'](testProducts[3]);
      expect(type).toBe('universal');
    });

    it('should return empty string for unknown type', () => {
      const fakeProduct = { id: 99, name: 'Fake' } as unknown as Toy;
      const type = component['getProductType'](fakeProduct);
      expect(type).toBe('');
    });
  });

  describe('resetForm', () => {
    it('should reset all form state', () => {
      component.onEdit(testProducts[0]);
      
      component['resetForm']();
      
      expect(component.selectedProductId).toBeNull();
      expect(component.selectedProduct).toBeNull();
      expect(component.selectedType).toBe('');
      expect(component.productForm.pristine).toBeTrue();
    });
  });
});