import { Injectable } from '@angular/core';
import { Toy } from '../abstract/toy';
import { BoardGame } from '../toys/board_game';
import { StuffedToy } from '../toys/stuffed_toy';
import { CreativeKit } from '../toys/creative_kit';

@Injectable({ providedIn: 'root' })
export class ProductFactoryService {
  createProduct(data: any): Toy {
    switch (data.type) {
      case 'boardGame':
        return new BoardGame(data.id, data.name, data.price, data.description, data.playersCount, data.duration);
      case 'stuffedToy':
        return new StuffedToy(data.id, data.name, data.price, data.description, data.material, data.height);
      case 'creativeKit':
        return new CreativeKit(data.id, data.name, data.price, data.description, data.kitType, data.componentsCount, data.difficultyLevel);
      default:
        throw new Error('Unknown product type');
    }
  }
}