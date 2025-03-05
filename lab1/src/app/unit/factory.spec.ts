import { AnimalFactory } from "../classes/lab3/animal_factory";
import { Cat } from "../classes/lab3/cat";
import { Dog } from "../classes/lab3/dog";
import { Pig } from "../classes/lab3/pig";


describe('AnimalFactory', () => {
    it('should create a Dog instance', () => {
      const dog = AnimalFactory.getAnimal('Dog', 'Rex', 5, 10, 'Labrador');
      expect(dog).toBeInstanceOf(Dog);
      expect(dog.getName()).toBe('Rex');
    });
  
    it('should create a Cat instance', () => {
      const cat = AnimalFactory.getAnimal('Cat', 'Tom', 3, 15, 'Black');
      expect(cat).toBeInstanceOf(Cat);
    });
  
    it('should create a Pig instance', () => {
      const pig = AnimalFactory.getAnimal('Pig', 'Babe', 2, 5, 'Thick');
      expect(pig).toBeInstanceOf(Pig);
    });
  
    it('should throw an error for invalid animal type', () => {
      expect(() => AnimalFactory.getAnimal('Horse', 'Spirit', 4, 20, 'Wild')).toThrowError('Invalid animal type');
    });
  });