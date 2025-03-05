import { Animal } from "./animal";

export class Pig extends Animal {
    constructor(name: string, age: number, speed: number, private salo: string) {
        super(name, age, speed);
    }

    sound(): String {
        return "GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOAL";
    }

    override displayInfo(): String {
        return super.displayInfo + `\nЯкісь сала: ${this.salo}`;
    }
}