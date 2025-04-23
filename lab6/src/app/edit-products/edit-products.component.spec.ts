import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditProductsComponent } from './edit-products.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Toy } from '../lab6/abstract/toy';
import { BoardGame } from '../lab6/toys/board_game';
import { StuffedToy } from '../lab6/toys/stuffed_toy';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { Universal } from '../lab6/toys/universal';
import { OtherToys } from '../lab6/toys/other_toys';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { ProductsService } from '../lab6/services/products.service';
import { AlertController } from '@ionic/angular/standalone';
import { of } from 'rxjs';

describe('EditProductsComponent', () => {
  let component: EditProductsComponent;
  let fixture: ComponentFixture<EditProductsComponent>;
  let mockProductFactory: jasmine.SpyObj<ProductFactoryService>;
  let mockReactiveFormsService: jasmine.SpyObj<ReactiveFormsService>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockAlertCtrl: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    mockProductFactory = jasmine.createSpyObj('ProductFactoryService', ['createProduct']);
    mockReactiveFormsService = jasmine.createSpyObj('ReactiveFormsService', ['createForm']);
    mockProductsService = jasmine.createSpyObj('ProductsService', [
      'deleteProduct', 
      'updateProduct', 
      'deleteProductsByType',
      'getProducts'
    ]);
    mockAlertCtrl = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: ProductFactoryService, useValue: mockProductFactory },
        { provide: ReactiveFormsService, useValue: mockReactiveFormsService },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: AlertController, useValue: mockAlertCtrl }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductsComponent);
    component = fixture.componentInstance;
    
    // Initialize with some test products
    component.products = [
      new BoardGame(1, 'Chess', 299, 'Classic strategy game', 2, 60),
      new StuffedToy(2, 'Teddy Bear', 199, 'Soft plush toy', 'Brown', 30),
      new CreativeKit(3, 'Painting Set', 399, 'Art supplies kit', 'Painting', 24),
      new Universal(4, 'Lego Set', 599, 'Building blocks', 'Construction', ['']),
      new OtherToys('puzzle', 5, 'Jigsaw Puzzle', 149, '1000 pieces landscape')
    ];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEdit', () => {
    it('should set up form for BoardGame', () => {
      const boardGame = component.products[0] as BoardGame;
      const mockForm = new FormBuilder().group({
        name: [''],
        price: [0],
        description: [''],
        playersCount: [0],
        duration: [0]
      });
      
      mockReactiveFormsService.createForm.and.returnValue(mockForm);
      
      component.onEdit(boardGame);
      
      expect(component.selectedProductId).toBe(1);
      expect(component.selectedProduct).toBe(boardGame);
      expect(component.selectedType).toBe('boardGame');
      expect(mockReactiveFormsService.createForm).toHaveBeenCalledWith('boardGame');
      expect(component.productForm).toBe(mockForm);
    });

    it('should set up form for StuffedToy', () => {
      const stuffedToy = component.products[1] as StuffedToy;
      const mockForm = new FormBuilder().group({
        name: [''],
        price: [0],
        description: [''],
        color: [''],
        size: [0]
      });
      
      mockReactiveFormsService.createForm.and.returnValue(mockForm);
      
      component.onEdit(stuffedToy);
      
      expect(component.selectedProductId).toBe(2);
      expect(component.selectedProduct).toBe(stuffedToy);
      expect(component.selectedType).toBe('stuffedToy');
      expect(mockReactiveFormsService.createForm).toHaveBeenCalledWith('stuffedToy');
      expect(component.productForm).toBe(mockForm);
    });
  });

  describe('onDelete', () => {
    it('should delete product and reset form', fakeAsync(() => {
      const product = component.products[0];
      mockProductsService.deleteProduct.and.returnValue(Promise.resolve());
      
      component.onDelete(product);
      tick();
      
      expect(component.products.length).toBe(4);
      expect(mockProductsService.deleteProduct).toHaveBeenCalledWith(1);
      expect(component.selectedProductId).toBeNull();
      expect(component.selectedProduct).toBeNull();
      expect(component.selectedType).toBe('');
    }));
  });

  describe('getProductType', () => {
    it('should return correct type for BoardGame', () => {
      const result = component.getProductType(new BoardGame(1, 'Test', 100, 'Test', 2, 30));
      expect(result).toBe('boardGame');
    });

    it('should return correct type for StuffedToy', () => {
      const result = component.getProductType(new StuffedToy(1, 'Test', 100, 'Test', 'Red', 20));
      expect(result).toBe('stuffedToy');
    });

    it('should return correct type for CreativeKit', () => {
      const result = component.getProductType(new CreativeKit(1, 'Test', 100, 'Test', 'Craft', 12));
      expect(result).toBe('creativeKit');
    });

    it('should return correct type for Universal', () => {
      const result = component.getProductType(new Universal(1, 'Test', 100, 'Test', 'Type', ['']));
      expect(result).toBe('universal');
    });

    it('should return "new" for unknown types', () => {
      const result = component.getProductType(new OtherToys('unknown', 1, 'Test', 100, 'Test'));
      expect(result).toBe('new');
    });
  });

  describe('onTypeChange', () => {
    it('should change form type and preserve common data', () => {
      const boardGame = component.products[0] as BoardGame;
      const initialForm = new FormBuilder().group({
        name: ['Chess'],
        price: [299],
        description: ['Classic strategy game'],
        playersCount: [2],
        duration: [60]
      });
      
      const newForm = new FormBuilder().group({
        name: [''],
        price: [0],
        description: [''],
        color: [''],
        size: [0]
      });
      
      component.selectedProduct = boardGame;
      component.selectedType = 'boardGame';
      component.productForm = initialForm;
      
      mockReactiveFormsService.createForm.and.returnValue(newForm);
      
      component.onTypeChange('stuffedToy');
      
      expect(component.selectedType).toBe('stuffedToy');
      expect(mockReactiveFormsService.createForm).toHaveBeenCalledWith('stuffedToy');
      expect(component.productForm.value).toEqual(jasmine.objectContaining({
        name: 'Chess',
        price: 299,
        description: 'Classic strategy game'
      }));
    });
  });

  describe('onSubmit', () => {
    it('should update product when form is valid', fakeAsync(() => {
      const boardGame = component.products[0] as BoardGame;
      const updatedBoardGame = new BoardGame(1, 'Updated Chess', 350, 'Updated description', 4, 90);
      
      const form = new FormBuilder().group({
        name: ['Updated Chess'],
        price: [350],
        description: ['Updated description'],
        playersCount: [4],
        duration: [90]
      });
      
      component.selectedProductId = 1;
      component.selectedType = 'boardGame';
      component.productForm = form;
      
      mockProductFactory.createProduct.and.returnValue(updatedBoardGame);
      mockProductsService.updateProduct.and.returnValue(Promise.resolve());
      
      component.onSubmit();
      tick();
      
      expect(mockProductFactory.createProduct).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Chess',
        price: 350,
        description: 'Updated description',
        playersCount: 4,
        duration: 90,
        type: 'boardGame'
      });
      
      expect(component.products[0]).toBe(updatedBoardGame);
      expect(mockProductsService.updateProduct).toHaveBeenCalledWith(updatedBoardGame);
      expect(component.selectedProductId).toBeNull();
    }));
  });
});