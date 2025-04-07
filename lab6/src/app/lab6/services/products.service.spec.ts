import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { ProductFactoryService } from './productfactory.service';
import { BoardGame } from '../toys/board_game';

describe('ProductsService', () => {
  let service: ProductsService;
  let productFactorySpy: jasmine.SpyObj<ProductFactoryService>;
  let fetchSpy: jasmine.Spy;

  const mockProducts = [
    { id: 1, name: 'Chess', type: 'boardGame', price: 20, description: 'Classic game', playersCount: 2, duration: 60 },
    { id: 2, name: 'Teddy', type: 'stuffedToy', price: 15, description: 'Soft toy', material: 'cotton', height: 30 }
  ];

  beforeEach(() => {
    productFactorySpy = jasmine.createSpyObj('ProductFactoryService', ['createProduct']);
    
    fetchSpy = spyOn(window, 'fetch');

    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: ProductFactoryService, useValue: productFactorySpy }
      ]
    });

    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchProducts', () => {
    it('should fetch products and populate the products array', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ record: { products: mockProducts } })
      };
      fetchSpy.and.returnValue(Promise.resolve(mockResponse));

      productFactorySpy.createProduct.and.callFake((data: any) => data);

      await service.fetchProducts();

      expect(fetchSpy).toHaveBeenCalledWith(service['jsonBinUrl'], {
        method: 'GET',
        headers: {
          'X-Master-Key': service['jsonBinKey']
        }
      });

      expect(productFactorySpy.createProduct).toHaveBeenCalledTimes(2);
      expect(productFactorySpy.createProduct).toHaveBeenCalledWith(mockProducts[0]);
      expect(productFactorySpy.createProduct).toHaveBeenCalledWith(mockProducts[1]);

      expect(service.products.length).toBe(2);
      expect(service.products[0].name).toBe('Chess');
      expect(service.products[1].name).toBe('Teddy');
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ record: {} })
      };
      fetchSpy.and.returnValue(Promise.resolve(mockResponse));

      await service.fetchProducts();

      expect(service.products).toEqual([]);
    });

    it('should handle malformed response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({})
      };
      fetchSpy.and.returnValue(Promise.resolve(mockResponse));

      await service.fetchProducts();

      expect(service.products).toEqual([]);
    });

    it('should handle fetch error', async () => {
      spyOn(console, 'error');
      fetchSpy.and.returnValue(Promise.reject(new Error('Network error')));

      await service.fetchProducts();

      expect(console.error).toHaveBeenCalledWith('Помилка завантаження продуктів:', jasmine.any(Error));
      expect(service.products).toEqual([]);
    });


    it('should create proper product instances', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ record: { products: [mockProducts[0]] } })
      };
      fetchSpy.and.returnValue(Promise.resolve(mockResponse));

      const mockBoardGame = new BoardGame(1, 'Chess', 20, 'Classic game', 2, 60);
      productFactorySpy.createProduct.and.returnValue(mockBoardGame);

      await service.fetchProducts();

      expect(productFactorySpy.createProduct).toHaveBeenCalled();
      expect(service.products.length).toBe(1);
      expect(service.products[0]).toBe(mockBoardGame);
    });
  });

  describe('API configuration', () => {
    it('should have correct API URL', () => {
      expect(service['jsonBinUrl']).toBe('https://api.jsonbin.io/v3/b/67e3c5ad8a456b79667cf338/latest');
    });

    it('should have correct API key', () => {
      expect(service['jsonBinKey']).toBe('$2a$10$tj9Q4CJKqIET6uDVWn/Kj.4AKzFkEh5VJp4vdA5SArauFVIcKis0a');
    });
  });
});