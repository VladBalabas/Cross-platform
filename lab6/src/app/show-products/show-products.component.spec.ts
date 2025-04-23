import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProductsComponent } from './show-products.component';
import { Toy } from '../lab6/abstract/toy';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Fully implemented mock classes that satisfy the Toy abstract class
class MockToy implements Toy {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }

  calculateDiscount(): number {
    return 0; // Default no discount
  }

  getInfo(): string {
    return `${this.name} - ${this.price}`;
  }

  getType(): string {
    return 'toy';
  }
}

class MockBoardGame extends MockToy {
  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    public type: string = 'boardGame'
  ) {
    super(id, name, price, description);
  }

  
  override getType(): string {
    return this.type;
  }
}

class MockStuffedToy extends MockToy {
  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    public type: string = 'stuffedToy'
  ) {
    super(id, name, price, description);
  }

  override getType(): string {
    return this.type;
  }
}

describe('ShowProductsComponent', () => {
  let component: ShowProductsComponent;
  let fixture: ComponentFixture<ShowProductsComponent>;

  const testProducts: Toy[] = [
    new MockBoardGame(1, 'Chess', 100, 'Strategy game'),
    new MockBoardGame(2, 'Monopoly', 200, 'Family game'),
    new MockStuffedToy(3, 'Teddy Bear', 50, 'Soft toy'),
    new MockStuffedToy(4, 'Doll', 75, 'Plastic doll'),
    new MockToy(5, 'Generic Toy', 150, 'Basic toy')
  ];

  const testCategories = [
    { name: 'Board Games', type: 'boardGame' },
    { name: 'Stuffed Toys', type: 'stuffedToy' },
    { name: 'Other Toys', type: 'toy' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, IonicModule, FormsModule, ShowProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowProductsComponent);
    component = fixture.componentInstance;
    
    component.products = [...testProducts];
    component.categories = [...testCategories];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});