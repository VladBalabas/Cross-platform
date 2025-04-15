import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProductsComponent } from './show-products.component';
import { Toy } from '../lab6/abstract/toy';
import { BoardGame } from '../lab6/toys/board_game';
import { StuffedToy } from '../lab6/toys/stuffed_toy';
import { CreativeKit } from '../lab6/toys/creative_kit';
import { Universal } from '../lab6/toys/universal';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ShowProductsComponent', () => {
  let component: ShowProductsComponent;
  let fixture: ComponentFixture<ShowProductsComponent>;

  const testProducts: Toy[] = [
    new BoardGame(1, 'Chess', 20, 'Classic strategy game', 2, 60),
    new StuffedToy(2, 'Teddy Bear', 30, 'Soft plush toy', 'Cotton', 50),
    new CreativeKit(3, 'Painting Set', 25, 'Art supplies', 'Art', 12, 'Medium'),
    new Universal(4, 'Building Blocks', 35, 'Educational toy', '3-6', ['Colorful', 'Safe materials'])
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        ShowProductsComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowProductsComponent);
    component = fixture.componentInstance;
    component.products = [...testProducts];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct price range from products', () => {
    expect(component.minPrice).toBe(20);
    expect(component.maxPrice).toBe(35);
    expect(component.priceRange.lower).toBe(20);
    expect(component.priceRange.upper).toBe(35);
  });

  it('should filter products by category when categories are selected', () => {
    component.categories[0].selected = true;
    component.onCategoryChange();
    fixture.detectChanges();
    
    expect(component.filteredProducts.length).toBe(0);

    component.categories[1].selected = true;
    component.onCategoryChange();
    fixture.detectChanges();
    
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should show all products when no categories are selected', () => {
    component.categories.forEach(c => c.selected = false);
    component.onCategoryChange();
    fixture.detectChanges();
    
    expect(component.filteredProducts.length).toBe(4);
  });

  it('should filter products by price range', () => {
    component.priceFilter$.next({ min: 25, max: 30 });
    fixture.detectChanges();
    
    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts.some(p => p.name === 'Teddy Bear')).toBeTrue();
    expect(component.filteredProducts.some(p => p.name === 'Painting Set')).toBeTrue();
  });

  it('should combine category and price filters', () => {
    component.categories[2].selected = true;
    component.onCategoryChange();

    component.priceFilter$.next({ min: 20, max: 25 });
    fixture.detectChanges();
    
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should update price range when products change', () => {
    const newProducts = [
      new BoardGame(5, 'Checkers', 15, 'Classic game', 2, 30),
      new StuffedToy(6, 'Rabbit', 40, 'Soft toy', 'Wool', 30)
    ];
    component.products = newProducts;
    component.ngOnInit();
    
    expect(component.minPrice).toBe(15);
    expect(component.maxPrice).toBe(40);
    expect(component.priceRange.lower).toBe(15);
    expect(component.priceRange.upper).toBe(40);
  });

  it('should handle empty products array', () => {
    component.products = [];
    component.ngOnInit();
    
    expect(component.minPrice).toBe(20);
    expect(component.maxPrice).toBe(35);
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should update filtered products when price range changes', () => {
    const event = {
      detail: {
        value: { lower: 25, upper: 30 }
      }
    };
    component.onPriceChange(event);
    
    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts.some(p => p.name === 'Teddy Bear')).toBeTrue();
    expect(component.filteredProducts.some(p => p.name === 'Painting Set')).toBeTrue();
  });

  it('should display correct number of products after filtering', () => {
    fixture.detectChanges();
    let productElements = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(productElements.length).toBe(10);

    component.priceFilter$.next({ min: 30, max: 35 });
    fixture.detectChanges();
    productElements = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(productElements.length).toBe(8);
  });
});