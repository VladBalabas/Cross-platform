import { TestBed } from '@angular/core/testing';
import { ProductFactoryService } from './productfactory.service';
import { BoardGame } from '../toys/board_game';
import { StuffedToy } from '../toys/stuffed_toy';
import { CreativeKit } from '../toys/creative_kit';

describe('ProductFactoryService', () => {
  let service: ProductFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFactoryService);
  });

  it('should create a BoardGame product', () => {
    const boardGameData = {
      type: 'boardGame',
      id: 1,
      name: 'Chess',
      price: 30,
      description: 'A classic board game',
      playersCount: 2,
      duration: 30
    };

    const product = service.createProduct(boardGameData);

    expect(product).toBeInstanceOf(BoardGame);
    expect(product.id).toBe(1);
    expect(product.name).toBe('Chess');
    expect(product.price).toBe(30);
    expect(product.description).toBe('A classic board game');
  });

  it('should create a StuffedToy product', () => {
    const stuffedToyData = {
      type: 'stuffedToy',
      id: 2,
      name: 'Teddy Bear',
      price: 20,
      description: 'A cute stuffed toy',
      material: 'Cotton',
      height: 30
    };

    const product = service.createProduct(stuffedToyData);

    expect(product).toBeInstanceOf(StuffedToy);
    expect(product.id).toBe(2);
    expect(product.name).toBe('Teddy Bear');
    expect(product.price).toBe(20);
    expect(product.description).toBe('A cute stuffed toy');
  });

  it('should create a CreativeKit product', () => {
    const creativeKitData = {
      type: 'creativeKit',
      id: 3,
      name: 'Art Kit',
      price: 15,
      description: 'A kit for young artists',
      kitType: 'Drawing',
      componentsCount: 10,
      difficultyLevel: 'Easy'
    };

    const product = service.createProduct(creativeKitData);

    expect(product).toBeInstanceOf(CreativeKit);
    expect(product.id).toBe(3);
    expect(product.name).toBe('Art Kit');
    expect(product.price).toBe(15);
    expect(product.description).toBe('A kit for young artists');
  });

  it('should throw error for unknown product type', () => {
    const unknownProductData = {
      type: 'unknown',
      id: 4,
      name: 'Unknown Toy',
      price: 25,
      description: 'An unknown toy'
    };

    expect(() => service.createProduct(unknownProductData)).toThrowError('Unknown product type');
  });
});