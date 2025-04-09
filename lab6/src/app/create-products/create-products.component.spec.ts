import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductsComponent } from './create-products.component';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Toy } from '../lab6/abstract/toy';
import { BoardGame } from '../lab6/toys/board_game';
import { StuffedToy } from '../lab6/toys/stuffed_toy';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { Universal } from '../lab6/toys/universal';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('CreateProductsComponent', () => {
  let component: CreateProductsComponent;
  let fixture: ComponentFixture<CreateProductsComponent>;
  let reactiveFormsService: ReactiveFormsService;
  let productFactoryService: ProductFactoryService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateProductsComponent
      ],
      providers: [
        ReactiveFormsService,
        ProductFactoryService,
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductsComponent);
    component = fixture.componentInstance;
    reactiveFormsService = TestBed.inject(ReactiveFormsService);
    productFactoryService = TestBed.inject(ProductFactoryService);
    fb = TestBed.inject(FormBuilder);

    component.products = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTypeChange', () => {
    it('should reset the form and create a new form when type changes', () => {
      spyOn(reactiveFormsService, 'createForm').and.callThrough();
      
      component.selectedType = 'boardGame';
      component.onTypeChange();
      
      expect(reactiveFormsService.createForm).toHaveBeenCalledWith('boardGame');
      expect(component.productForm).toBeTruthy();
    });

    it('should throw error for unknown product type', () => {
      spyOn(reactiveFormsService, 'createForm').and.throwError('Unknown product type');
      
      component.selectedType = 'unknownType';
      expect(() => component.onTypeChange()).toThrowError('Unknown product type');
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.selectedType = 'boardGame';
      component.onTypeChange();
    });

    it('should not submit if form is invalid', () => {
      spyOn(productFactoryService, 'createProduct');
      
      component.onSubmit();
      
      expect(productFactoryService.createProduct).not.toHaveBeenCalled();
      expect(component.products.length).toBe(0);
    });

    it('should create and add a board game when form is valid', () => {
      spyOn(productFactoryService, 'createProduct').and.callThrough();
      
      component.productForm.patchValue({
        name: 'Chess',
        price: 20,
        description: 'Classic strategy game',
        playersCount: 2,
        duration: 60
      });
      
      component.onSubmit();
      
      expect(productFactoryService.createProduct).toHaveBeenCalled();
      expect(component.products.length).toBe(1);
      expect(component.products[0] instanceof BoardGame).toBeTrue();
      expect(component.productForm.pristine).toBeTrue(); // Form should be reset
    });

    it('should create and add a stuffed toy when form is valid', () => {
      component.selectedType = 'stuffedToy';
      component.onTypeChange();
      
      component.productForm.patchValue({
        name: 'Teddy Bear',
        price: 30,
        description: 'Soft plush toy',
        material: 'Cotton',
        height: 50
      });
      
      component.onSubmit();
      
      expect(component.products.length).toBe(1);
      expect(component.products[0] instanceof StuffedToy).toBeTrue();
    });

    it('should create and add a creative kit when form is valid', () => {
      component.selectedType = 'creativeKit';
      component.onTypeChange();
      
      component.productForm.patchValue({
        name: 'Painting Set',
        price: 25,
        description: 'Complete painting kit',
        kitType: 'Art',
        componentsCount: 12,
        difficultyLevel: 'Medium'
      });
      
      component.onSubmit();
      
      expect(component.products.length).toBe(1);
      expect(component.products[0] instanceof CreativeKit).toBeTrue();
    });

    it('should assign correct id to new product', () => {
      component.products = [
        new BoardGame(1, 'Test Game', 10, 'Test', 2, 30),
        new BoardGame(2, 'Test Game 2', 15, 'Test 2', 4, 45)
      ];
      
      component.selectedType = 'boardGame';
      component.onTypeChange();
      
      component.productForm.patchValue({
        name: 'New Game',
        price: 20,
        description: 'New game description',
        playersCount: 2,
        duration: 60
      });
      
      component.onSubmit();
      
      expect(component.products[2].id).toBe(3);
    });
  });

  describe('Form Validation', () => {
    it('should mark board game form as invalid when required fields are empty', () => {
      component.selectedType = 'boardGame';
      component.onTypeChange();
      
      expect(component.productForm.valid).toBeFalse();
      expect(component.productForm.get('name')?.hasError('required')).toBeTrue();
      expect(component.productForm.get('price')?.hasError('required')).toBeTrue();
      expect(component.productForm.get('description')?.hasError('required')).toBeTrue();
      expect(component.productForm.get('playersCount')?.hasError('required')).toBeTrue();
      expect(component.productForm.get('duration')?.hasError('required')).toBeTrue();
    });

    it('should mark stuffed toy form as invalid when height is less than 1', () => {
      component.selectedType = 'stuffedToy';
      component.onTypeChange();
      
      component.productForm.patchValue({
        height: 0
      });
      
      expect(component.productForm.get('height')?.hasError('min')).toBeTrue();
    });

    it('should mark creative kit form as invalid when componentsCount is less than 1', () => {
      component.selectedType = 'creativeKit';
      component.onTypeChange();
      
      component.productForm.patchValue({
        componentsCount: 0
      });
      
      expect(component.productForm.get('componentsCount')?.hasError('min')).toBeTrue();
    });
  });
});