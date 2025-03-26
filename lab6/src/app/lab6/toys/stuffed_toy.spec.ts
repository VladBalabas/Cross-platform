import { StuffedToy } from "./stuffed_toy";


describe('StuffedToy Class', () => {
    let stuffedToy: StuffedToy;

    beforeEach(() => {
        stuffedToy = new StuffedToy(1, 'Мишка', 200, 'М’яка іграшка для дітей', 'Плюш', 30);
    });

    it('should return correct toy info', () => {
        expect(stuffedToy.getInfo()).toBe('Мишка - 200 грн. Матеріал: Плюш, висота: 30 см.');
    });

    it('should return correct material', () => {
        expect(stuffedToy.getMaterial()).toBe('Плюш');
    });

    it('should return correct height', () => {
        expect(stuffedToy.getHeight()).toBe(30);
    });
});
