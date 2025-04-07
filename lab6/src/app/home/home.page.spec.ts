import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ProductsService } from '../lab6/services/products.service';
import { ShowProductsComponent } from '../show-products/show-products.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { CreateProductsComponent } from '../create-products/create-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Toy } from '../lab6/abstract/toy';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let productsService: ProductsService;

  beforeEach(() => {
    // Мокаем ProductsService
    const productsServiceMock = {
      fetchProducts: jasmine.createSpy('fetchProducts').and.returnValue(Promise.resolve()),
      products: [
        { id: 1, name: 'Toy 1', price: 10 },
        { id: 2, name: 'Toy 2', price: 15 }
      ]
    };

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        ShowProductsComponent,
        EditProductsComponent,
        CreateProductsComponent,
        HomePage
      ],
      providers: [{ provide: ProductsService, useValue: productsServiceMock }]
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);

    fixture.detectChanges();
  });

  it('should create the HomePage component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial segment set to "show"', () => {
    expect(component.selectedSegment).toBe('show');
  });

  it('should fetch products on ngOnInit', async () => {
    await component.ngOnInit();
    expect(productsService.fetchProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.products[0].name).toBe('Toy 1');
  });

});
