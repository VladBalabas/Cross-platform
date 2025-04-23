import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ProductsService } from '../lab6/services/products.service';
import { UppercaseAndPricePipe } from '../pipes/uppercase.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toy } from '../lab6/abstract/toy';
import { of } from 'rxjs';

// Mock Toy implementation for testing
class MockToy extends Toy {
  override getType(): string {
    return 'mockToy';
  }
  override getInfo(): string {
    return `mock toy info`
  }

  play(): string {
    return 'Playing with toy';
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['fetchProducts']);
    
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HomePage, UppercaseAndPricePipe],
      providers: [
        { provide: ProductsService, useValue: spy }
      ],
    }).compileComponents();

    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize products and categories', async () => {
      // Mock data
      const mockProducts: Toy[] = [
        new MockToy(1, 'Doll', 20, 'Dolls'),
        new MockToy(2, 'Car', 15, 'Vehicles')
      ];
      const mockCategories = ['Dolls', 'Vehicles'];
      
      // Setup spy
      productsServiceSpy.fetchProducts.and.returnValue(Promise.resolve());
      productsServiceSpy.products = mockProducts;
      productsServiceSpy.categories = mockCategories;
      
      await component.ngOnInit();
      
      expect(productsServiceSpy.fetchProducts).toHaveBeenCalled();
      expect(component.products).toEqual(mockProducts);
      expect(component.categories).toEqual(mockCategories);
      expect(component.filteredProducts).toEqual(mockProducts);
      expect(component.isLoading).toBeFalse();
    });

    it('should handle empty products', async () => {
      productsServiceSpy.fetchProducts.and.returnValue(Promise.resolve());
      productsServiceSpy.products = [];
      productsServiceSpy.categories = [];
      
      await component.ngOnInit();
      
      expect(component.products).toEqual([]);
      expect(component.categories).toEqual([]);
      expect(component.filteredProducts).toEqual([]);
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('filterProductsByCategory', () => {
    beforeEach(async () => {
      // Initialize with mock data
      component.products = [
        new MockToy(1, 'Doll', 20, 'Dolls'),
        new MockToy(2, 'Car', 15, 'Vehicles'),
        new MockToy(3, 'Truck', 25, 'Vehicles')
      ];
      component.categories = ['Dolls', 'Vehicles'];
      component.filteredProducts = [...component.products];
    });

    it('should filter products by selected category', () => {
      component.filterProductsByCategory('Dolls');
      
      expect(component.selectedCategory).toBe('Dolls');
      expect(component.filteredProducts.length).toBe(0);
    });

    it('should return all products when category is empty string', () => {
      component.filterProductsByCategory('Dolls'); // First filter
      component.filterProductsByCategory(''); // Then reset
      
      expect(component.selectedCategory).toBe('');
      expect(component.filteredProducts.length).toBe(3);
    });

    it('should handle category with no matching products', () => {
      component.filterProductsByCategory('NonExistingCategory');
      
      expect(component.selectedCategory).toBe('NonExistingCategory');
      expect(component.filteredProducts.length).toBe(0);
    });
  });

  describe('initial state', () => {
    it('should have initial values set correctly', () => {
      expect(component.products).toEqual([]);
      expect(component.categories).toEqual([]);
      expect(component.filteredProducts).toEqual([]);
      expect(component.isLoading).toBeTrue();
      expect(component.selectedCategory).toBe('');
    });
  });
});