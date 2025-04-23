import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductsComponent } from './create-products.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductFactoryService } from '../lab6/services/productfactory.service';
import { ReactiveFormsService } from '../lab6/services/reactive-forms.service';
import { ProductsService } from '../lab6/services/products.service';
import { Toy } from '../lab6/abstract/toy';
import { of } from 'rxjs';

describe('CreateProductsComponent', () => {
  let component: CreateProductsComponent;
  let fixture: ComponentFixture<CreateProductsComponent>;
  let mockProductFactory: jasmine.SpyObj<ProductFactoryService>;
  let mockReactiveFormsService: jasmine.SpyObj<ReactiveFormsService>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    mockProductFactory = jasmine.createSpyObj('ProductFactoryService', ['createProduct']);
    mockReactiveFormsService = jasmine.createSpyObj('ReactiveFormsService', ['createForm']);
    mockProductsService = jasmine.createSpyObj('ProductsService', ['addProduct']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateProductsComponent],
      providers: [
        FormBuilder,
        { provide: ProductFactoryService, useValue: mockProductFactory },
        { provide: ReactiveFormsService, useValue: mockReactiveFormsService },
        { provide: ProductsService, useValue: mockProductsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductsComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    // Initialize with empty products array
    component.products = [];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize with an empty form group', () => {
      expect(component.productForm).toBeDefined();
      expect(component.productForm.controls).toEqual({});
    });
  });
});