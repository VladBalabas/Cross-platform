import { IProduct } from "./iproduct";


export abstract class Toy implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public description: string
    ) {}

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getDescription(): string {
        return this.description;
    }

    calculateDiscount(percent: number): number {
        if (percent < 0 || percent > 100) {
            throw new Error('Discount percentage must be between 0 and 100');
        }
        return this.price * (1 - percent / 100);
    }

    abstract getInfo(): string;

    abstract getType(): string;
}