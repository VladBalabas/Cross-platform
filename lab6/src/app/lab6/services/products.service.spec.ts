import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { ProductFactoryService } from './productfactory.service';

import { Toy } from '../abstract/toy';
import { StuffedToy } from '../toys/stuffed_toy';

describe('ProductsService', () => {
  let service: ProductsService;
  let productFactorySpy: jasmine.SpyObj<ProductFactoryService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductFactoryService', ['createProduct']);

    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: ProductFactoryService, useValue: spy }
      ]
    });

    service = TestBed.inject(ProductsService);
    productFactorySpy = TestBed.inject(ProductFactoryService) as jasmine.SpyObj<ProductFactoryService>;
  });

  it('should handle fetch errors gracefully', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject('Network Error'));

    await service.fetchProducts();

    expect(service.products.length).toBe(0);
  });

  it('should successfully fetch and process products', async () => {
    const mockProductData = { id: 1, name: 'Toy 1', price: 100, description: 'Description', material: 'Plush', height: 30 };
    const mockProduct = new StuffedToy(1, 'Toy 1', 100, 'Description', 'Plush', 30);

    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ record: { products: [mockProductData] } }),
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
    } as Response;

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    productFactorySpy.createProduct.and.returnValue(mockProduct);

    await service.fetchProducts();

    expect(service.products.length).toBe(1);
    expect(service.products[0]).toEqual(mockProduct);
    expect(productFactorySpy.createProduct).toHaveBeenCalledWith(mockProductData);
  });

  it('should handle empty product list gracefully', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ record: { products: [] } }),
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
    } as Response;

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    await service.fetchProducts();

    expect(service.products.length).toBe(0);
  });

  it('should not process products if the API response is invalid', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: () => Promise.resolve({}),
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
    } as Response;

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    await service.fetchProducts();

    expect(service.products.length).toBe(0);
  });
});
