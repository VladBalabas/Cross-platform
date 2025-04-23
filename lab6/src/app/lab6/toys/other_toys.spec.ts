import { OtherToys } from "./other_toys";


describe('OtherToys', () => {
  let toy: OtherToys;

  beforeEach(() => {
    toy = new OtherToys("", 1, 'Мʼячик', 120, 'Гумовий мʼячик для дітей');
  });

  it('should create an instance', () => {
    expect(toy).toBeTruthy();
  });

  it('should return correct name', () => {
    expect(toy.getName()).toBe('Мʼячик');
  });

  it('should return correct price', () => {
    expect(toy.getPrice()).toBe(120);
  });

  it('should return correct description', () => {
    expect(toy.getDescription()).toBe('Гумовий мʼячик для дітей');
  });

  it('should return formatted info string', () => {
    const expectedInfo = 'Тип:  Мʼячик - 120 грн. Опис: Гумовий мʼячик для дітей';
    expect(toy.getInfo()).toBe(expectedInfo);
  });
});
