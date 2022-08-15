import { EntityRepository, Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { CreateBookDto } from "./dto/create-book";
import { GetBooksFilterDto } from "./dto/get-books-filter";

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {

    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]>{
        const { search } = filterDto
        const query = this.createQueryBuilder('book')

        if (search)
            query.andWhere(
                'LOWER( book.title ) LIKE LOWER( :search )', 
                { search: `%${search}%` }
            )

        const books = await query.getMany()
        return books
    }

    async createBook(createBookDto: CreateBookDto): Promise<Book>{
        const book = this.create({
            title: createBookDto.title,
            description: createBookDto.description,
            pages: createBookDto.pages,
            year: createBookDto.year,
            genre: createBookDto.genre
        })

        await this.save(book)

        return book
    }
}