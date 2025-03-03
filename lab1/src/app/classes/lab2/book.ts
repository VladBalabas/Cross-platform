
export class Book {
    title: string;
    author: string;
    genre: string;
    pages: number;
    year: number;

    constructor(title: string, author: string, genre: string, pages: number, year: number) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.year = year;
    }

    
}