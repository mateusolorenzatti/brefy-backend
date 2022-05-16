import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from './book.entity';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book';
import { GetBooksFilterDto } from './dto/get-books-filter';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BooksRepository)
        private booksRepository: BooksRepository,
    ) { }

    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
        return this.booksRepository.getBooks(filterDto)
    }

    async getBookById(id: string): Promise<Book> {
        let found = await this.booksRepository.findOne(id)

        if (!found)
            throw new NotFoundException(`Book with ID "${id}" not found`)

        return found
    }

    createBook(createBookDto: CreateBookDto): Promise<Book> {
        return this.booksRepository.createBook(createBookDto)
    }

    async deleteBook(id: string): Promise<void> {
        const result = await this.booksRepository.delete(id)

        if (result.affected === 0)
            throw new NotFoundException(`Book with ID "${id}" not found`)
    }

    async updateBook(id: string, updatedBook: CreateBookDto): Promise<Book> {
        const book = await this.getBookById(id)

        book.title = updatedBook.title
        book.description = updatedBook.description
        book.pages = updatedBook.pages
        book.year = updatedBook.year
        book.genre = updatedBook.genre

        await this.booksRepository.save(book)

        return book
    }
}

