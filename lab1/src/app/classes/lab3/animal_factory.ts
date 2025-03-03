import { Cat } from "./cat";
import { Dog } from "./dog";

export type AnimalName = 'Dog' | 'Cat';
export type AnimalNameMap = {
    [key: string]: AnimalName;
}

export type AnimalsNameMap = {
    Dog: "Собака";
    Cat: "Кіт";
}

export class AnimalFactory {
    public static getAnimal(type: string, name: string, age: number, speed: number, optional: string) {
        if (type === 'Dog') {
            return new Dog(name, age, speed, optional);
        } else if (type === 'Cat') {    
            return new Cat(name, age, speed, optional);
        } else {
            throw new Error('Invalid animal type');
        }
    }
}