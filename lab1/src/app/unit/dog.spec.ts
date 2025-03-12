import { Dog } from "../classes/lab3/dog";

describe('Dog Class', () => {
    let dog: Dog;
    beforeEach(() => {
      dog = new Dog('Rex', 5, 10, 'Labrador');
    });
  
    it('should be created', () => {
      expect(dog).toBeTruthy();
    });
  
    it('should return the correct name', () => {
      expect(dog.getName()).toBe('Rex');
    });
  
    it('should return the correct speed', () => {
      expect(dog.getSpeed()).toBe(10);
    });
  
    it('should return correct bark sound', () => {
      expect(dog.bark()).toBe('Гав!');
    });
  
    it('should return correct display info', () => {
      expect(dog.displayInfo()).toContain('Назва: ${this.name}, Вік: ${this.age}, Швидкість: ${this.speed} км/год');
      expect(dog.displayInfo()).toContain('Порода: Labrador');
    });
  });