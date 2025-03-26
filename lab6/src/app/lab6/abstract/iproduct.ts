export interface IProduct {
    getInfo(): string;
    calculateDiscount(percent: number): number;
    getId(): number;
    getName(): string;
    getPrice(): number;
    getDescription(): string;
}