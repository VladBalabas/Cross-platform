import { Toy } from "../abstract/toy";


export class CreativeKit extends Toy {
    constructor(
        id: number,
        name: string,
        price: number,
        description: string,
        public kitType: string,
        public componentsCount: number,
        public difficultyLevel: string = 'початковий'
    ) {
        super(id, name, price, description);
    }

    getInfo(): string {
        return `${this.getName()} - ${this.getPrice()} грн. Тип набору: ${this.kitType}, Кількість компонентів: ${this.componentsCount}, Рівень складності: ${this.difficultyLevel}`;
    }

    getKitType(): string {
        return this.kitType;
    }

    getComponentsCount(): number {
        return this.componentsCount;
    }

    getDifficultyLevel(): string {
        return this.difficultyLevel;
    }

    setDifficultyLevel(level: string): void {
        this.difficultyLevel = level;
    }
}