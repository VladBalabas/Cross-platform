import { Cat } from "./cat";
import { Dog } from "./dog";
import { Pig } from "./pig";

export type AnimalName = 'Dog' | 'Cat' | 'Pig';
export type AnimalNameMap = {
    [key: string]: AnimalName;
}

export type AnimalsNameMap = {
    Dog: "Собака";
    Cat: "Кіт";
    Pig: "Свиня";
}

export class AnimalFactory {
    public static getAnimal(type: string, name: string, age: number, speed: number, optional: string) {
        if (type === 'Dog') {
            return new Dog(name, age, speed, optional);
        } else if (type === 'Cat') {    
            return new Cat(name, age, speed, optional);
        } else if (type === 'Pig') {
            return new Pig(name, age, speed, optional);
        } else {
            throw new Error('Invalid animal type');
        }
    }
}