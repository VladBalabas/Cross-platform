import { Animal } from "./animal";

export class Cat extends Animal {
    constructor(name: string, age: number, speed: number, private furColor: string) {
        super(name, age, speed);
    }

    meow(): String {
        return "Мяу!";
    }

    override displayInfo(): String {
        return super.displayInfo + `\nКолір шерсті: ${this.furColor}`
    }
}