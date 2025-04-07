import { Universal } from './universal';

describe('Universal Toy', () => {
  let toy: Universal;

  beforeEach(() => {
    toy = new Universal(1, 'Універсальна Іграшка', 399, 'Ідеальна для всіх!', '3-10 років', ['Яскраві кольори', 'Безпечні матеріали']);
  });

  it('should create an instance', () => {
    expect(toy).toBeTruthy();
  });

  it('should return correct info string', () => {
    const expected = 'Універсальна Іграшка - 399 грн. Підходить для віку: 3-10 років. Особливості: Яскраві кольори, Безпечні матеріали.';
    expect(toy.getInfo()).toBe(expected);
  });

  it('should return correct age range', () => {
    expect(toy.getAgeRange()).toBe('3-10 років');
  });

  it('should return correct features', () => {
    expect(toy.getFeatures()).toEqual(['Яскраві кольори', 'Безпечні матеріали']);
  });
});