import { Animal } from "./animal";

export class Dog extends Animal {
    constructor(name: string, age: number, speed: number, private breed: string) {
        super(name, age, speed);
    }

    bark(): String {
        return "Гав!";
    }

    override displayInfo(): String {
        return super.displayInfo + `\nПорода: ${this.breed}`;
    }
}