import { EntityRepository, Repository } from "typeorm";

import { Read } from "./read.entity";

@EntityRepository(Read)
export class ReadRepository extends Repository<Read> {

    
    /* 
       ToDo: Modelo a seguir na implementação

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

    */
}