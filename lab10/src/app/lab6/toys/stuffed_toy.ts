import { Toy } from "../abstract/toy";

export class StuffedToy extends Toy {
    constructor(
        id: number,
        name: string,
        price: number,
        description: string,
        public material: string,
        public height: number
    ) {
        super(id, name, price, description);
    }

    getInfo(): string {
        return `${this.getName()} - ${this.getPrice()} грн. Матеріал: ${this.material}, висота: ${this.height} см.`;
    }

    getMaterial(): string {
        return this.material;
    }

    getHeight(): number {
        return this.height;
    }

    getType(): string {
        return 'stuffedToy';
      }
}