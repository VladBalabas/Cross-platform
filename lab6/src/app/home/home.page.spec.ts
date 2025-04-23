import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ProductsService } from '../lab6/services/products.service';
import { ShowProductsComponent } from '../show-products/show-products.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { CreateProductsComponent } from '../create-products/create-products.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toy } from '../lab6/abstract/toy';
import { of } from 'rxjs';
import { BoardGame } from '../lab6/toys/board_game';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { StuffedToy } from '../lab6/toys/stuffed_toy';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  const mockProducts: Toy[] = [
    new BoardGame(1, 'Chess', 15, 'Classic board game', 2, 60),
    new StuffedToy(2, 'Teddy Bear', 25, 'Fluffy toy', 'Cotton', 30),
    new CreativeKit(3, 'Painting Set', 30, 'Art kit', 'Art', 24, 'Medium')
  ];
  
  const mockCategories: string[] = ['boardGame', 'stuffedToy', 'creativeKit', 'universal'];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['fetchProducts']);
    
    Object.defineProperty(spy, 'products', { 
      get: jasmine.createSpy('products getter').and.returnValue(mockProducts) 
    });
    Object.defineProperty(spy, 'categories', { 
      get: jasmine.createSpy('categories getter').and.returnValue(mockCategories) 
    });
    
    spy.fetchProducts.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HomePage,
        ShowProductsComponent,
        EditProductsComponent,
        CreateProductsComponent
      ],
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    }).compileComponents();

    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "show" as default selected segment', () => {
    expect(component.selectedSegment).toBe('show');
  });

  it('should initialize with isLoading set to true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should call fetchProducts on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(productsServiceSpy.fetchProducts).toHaveBeenCalled();
  }));

  it('should load products and categories on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    
    expect(component.products).toEqual(mockProducts);
    expect(component.categories).toEqual(mockCategories);
    expect(component.isLoading).toBeFalse();
  }));

  it('should format categories correctly', fakeAsync(() => {
    component.ngOnInit();
    tick();
    
    const expectedFormattedCategories = [
      { type: 'boardGame', name: 'Board Games' },
      { type: 'stuffedToy', name: 'Stuffed Toys' },
      { type: 'creativeKit', name: 'Creative Kits' },
      { type: 'universal', name: 'Universal Toys' }
    ];
    
    expect(component.formattedCategories).toEqual(expectedFormattedCategories);
  }));

  it('should get correct display name for each type', () => {
    expect(component['getDisplayName']('boardGame')).toBe('Board Games');
    expect(component['getDisplayName']('stuffedToy')).toBe('Stuffed Toys');
    expect(component['getDisplayName']('creativeKit')).toBe('Creative Kits');
    expect(component['getDisplayName']('universal')).toBe('Universal Toys');
    expect(component['getDisplayName']('unknownType')).toBe('unknownType');
  });
});