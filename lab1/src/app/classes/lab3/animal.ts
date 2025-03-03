export abstract class Animal {
    constructor(
        protected name: string,
        protected age: number,
        protected speed: number
    ) {}

    getName(): string {
        return this.name;
    }

    getSpeed(): number {
        return this.speed;
    }

    displayInfo(): String {
        return `Назва: ${this.name}, Вік: ${this.age}, Швидкість: ${this.speed} км/год`;
    }
}