import { Toy } from "../abstract/toy";

export class BoardGame extends Toy {
    constructor(
        id: number,
        name: string,
        price: number,
        description: string,
        public playersCount: number,
        public duration: number
    ) {
        super(id, name, price, description);
    }

    getInfo(): string {
        return `${this.getName()} - ${this.getPrice()} грн. Для ${this.playersCount} гравців, тривалість ${this.duration} хв.`;
    }

    getPlayersCount(): number {
        return this.playersCount;
    }

    getDuration(): number {
        return this.duration;
    }

    getType(): string {
        return 'boardGame';
      }
}