import { Cat } from "../classes/lab3/cat";

describe('Cat Class', () => {
    let cat: Cat;
    beforeEach(() => {
      cat = new Cat('Tom', 3, 15, 'Black');
    });
  
    it('should return correct meow sound', () => {
      expect(cat.meow()).toBe('Мяу!');
    });
  });
  