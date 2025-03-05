import { Pig } from "../classes/lab3/pig";

describe('Pig Class', () => {
    let pig: Pig;
    beforeEach(() => {
      pig = new Pig('Babe', 2, 5, 'Thick');
    });
  
    it('should return correct pig sound', () => {
      expect(pig.sound()).toBe('GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOAL');
    });
  });