import { Toy } from "../abstract/toy";

export class OtherToys extends Toy {
    constructor(
        public type: string,
        id: number,
        name: string,
        price: number,
        description: string,
    ) {
        super(id, name, price, description);
    }

    getInfo(): string {
        return `Тип: ${this.type} ${this.getName()} - ${this.getPrice()} грн. Опис: ${this.getDescription()}`;
    }

    getType(): string {
        return this.type;
      }
}