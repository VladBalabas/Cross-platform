import { CreativeKit } from "./creative_kit";


describe('CreativeKit Class', () => {
    let creativeKit: CreativeKit;

    beforeEach(() => {
        creativeKit = new CreativeKit(1, 'Конструктор LEGO', 350, 'Набір для будівництва модельок', 'Механічний', 150);
    });

    it('should return correct game info', () => {
        expect(creativeKit.getInfo()).toBe(
            'Конструктор LEGO - 350 грн. Тип набору: Механічний, Кількість компонентів: 150, Рівень складності: початковий'
        );
    });

    it('should return correct kit type', () => {
        expect(creativeKit.getKitType()).toBe('Механічний');
    });

    it('should return correct components count', () => {
        expect(creativeKit.getComponentsCount()).toBe(150);
    });

    it('should return default difficulty level as "початковий"', () => {
        expect(creativeKit.getDifficultyLevel()).toBe('початковий');
    });

    it('should allow changing the difficulty level', () => {
        creativeKit.setDifficultyLevel('середній');
        expect(creativeKit.getDifficultyLevel()).toBe('середній');
    });
});
