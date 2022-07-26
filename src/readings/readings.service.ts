import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Book } from 'src/books/book.entity';
import { BooksRepository } from 'src/books/books.repository';
import { BooksService } from 'src/books/books.service';
import { CreateReadingDto } from './dto/create-reading';
import { GetReadingsFilterDto } from './dto/get-readings-filter';
import { Reading } from './reading.entity';
import { ReadingsRepository } from './readings.repository';

@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(ReadingsRepository)
        private readingsRepository: ReadingsRepository,
        private booksService: BooksService,
    ) { }

    async getReadings(filterDto: GetReadingsFilterDto): Promise<Reading[]> {
        return this.readingsRepository.getReadings(filterDto)
    }
    
    async createReading(createDto: CreateReadingDto, user: User): Promise<Reading> {
        const book = await this.booksService.getBookById(createDto.book)

        return this.readingsRepository.createReading(createDto, book, user)
    }

    /*

    async getBookById(id: string): Promise<Book> {
        let found = await this.booksRepository.findOne(id)

        if (!found)
            throw new NotFoundException(`Book with ID "${id}" not found`)

        return found
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

    */
}
