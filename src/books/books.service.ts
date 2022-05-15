import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Book } from './book.model';
import { CreateBookDto } from './dto/create-book';
import { GetBooksFilterDto } from './dto/get-books-filter';

@Injectable()
export class BooksService {
    private books: Book[] = []

    getAllBooks(): Book[] {
        return this.books
    }

    getBooksWithFilters(filterDto: GetBooksFilterDto): Book[] {
        const { search } = filterDto

        let books = this.getAllBooks()

        if (search)
            books = books.filter((book) => (book.title.includes(search)))

        return books
    }

    getBookById(id: string): Book {
        let found = this.books.find((book) => book.id === id)

        if (!found)
            throw new NotFoundException(`Book with ID "${id}" not found`)

        return found
    }

    createBook(createBookDto: CreateBookDto): Book {
        const book: Book = {
            id: uuid(),
            title: createBookDto.title,
            description: createBookDto.description,
            pages: createBookDto.pages,
            year: createBookDto.year,
            genre: createBookDto.genre
        }

        this.books.push(book)
        return book
    }

    deleteBook(id: string): void {
        const found = this.getBookById(id)
        this.books = this.books.filter((book) => book.id != id)
    }

    updateBook(id: string, updatedBook: CreateBookDto): Book {
        const book = this.getBookById(id)

        book.title = updatedBook.title
        book.description = updatedBook.description
        book.pages = updatedBook.pages
        book.year = updatedBook.year
        book.genre = updatedBook.genre

        return book
    }
}

