import { Toy } from "../abstract/toy";

export class Universal extends Toy {
  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    public ageRange: string,
    public features: string[]
  ) {
    super(id, name, price, description);
  }

  getInfo(): string {
    return `${this.getName()} - ${this.getPrice()} грн. Підходить для віку: ${this.ageRange}. Особливості: ${this.features}.`;
  }

  getAgeRange(): string {
    return this.ageRange;
  }

  getFeatures(): string[] {
    return this.features;
  }

  getType(): string {
    return 'universal';
  }
}