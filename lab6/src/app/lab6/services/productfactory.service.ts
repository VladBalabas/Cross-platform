import { Injectable } from '@angular/core';
import { Toy } from '../abstract/toy';
import { BoardGame } from '../toys/board_game';
import { StuffedToy } from '../toys/stuffed_toy';
import { CreativeKit } from '../toys/creative_kit';
import { Universal } from '../toys/universal';

@Injectable({ providedIn: 'root' })
export class ProductFactoryService {
  createProduct(data: any): Toy {
    let product: Toy;

    switch (data.type) {
      case 'boardGame':
        product = new BoardGame(data.id, data.name, data.price, data.description, data.playersCount, data.duration);
        break;
      case 'stuffedToy':
        product = new StuffedToy(data.id, data.name, data.price, data.description, data.material, data.height);
        break;
      case 'creativeKit':
        product = new CreativeKit(data.id, data.name, data.price, data.description, data.kitType, data.componentsCount, data.difficultyLevel);
        break;
      case 'universal':
        product = new Universal(data.id, data.name, data.price, data.description, data.ageRange, data.features);
          break;
        default:
        throw new Error('Unknown product type');
    }

    (product as any).type = data.type;

    return product;
  }
}