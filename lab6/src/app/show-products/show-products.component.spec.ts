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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct product information for each product', () => {
    component.products = [testProducts[0]];
    fixture.detectChanges();
    
    const productElement = fixture.debugElement.query(By.css('ion-item'));
    const textContent = productElement.nativeElement.textContent;
    
    expect(textContent).toContain('Chess');
    expect(textContent).toContain('20 грн');
    expect(textContent).toContain('Для 2 гравців');
    expect(textContent).toContain('60 хв');
  });

  it('should display different product types correctly', () => {
    component.products = testProducts;
    fixture.detectChanges();
    
    const productElements = fixture.debugElement.queryAll(By.css('ion-item'));
    
    // BoardGame specific info
    expect(productElements[0].nativeElement.textContent).toContain('Для 2 гравців');
    expect(productElements[0].nativeElement.textContent).toContain('60 хв');
    
    // StuffedToy specific info
    expect(productElements[1].nativeElement.textContent).toContain('Матеріал: Cotton');
    expect(productElements[1].nativeElement.textContent).toContain('50 см');
    
    // CreativeKit specific info
    expect(productElements[2].nativeElement.textContent).toContain('Тип набору: Art');
    expect(productElements[2].nativeElement.textContent).toContain('12');
    
    // Universal specific info
    expect(productElements[3].nativeElement.textContent).toContain('Підходить для віку: 3-6');
    expect(productElements[3].nativeElement.textContent).toContain('Colorful');
  });
});