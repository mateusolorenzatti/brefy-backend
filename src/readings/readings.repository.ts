import { User } from "src/auth/user.entity";
import { Book } from "src/books/book.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReadingDto } from "./dto/create-reading";
import { GetReadingsFilterDto } from "./dto/get-readings-filter";

import { Reading } from "./reading.entity";

@EntityRepository(Reading)
export class ReadingsRepository extends Repository<Reading> {

    async getReadings(filterDto: GetReadingsFilterDto): Promise<Reading[]> {
        const { book, author } = filterDto
        const query = this.createQueryBuilder('reading')
            .leftJoinAndSelect('reading.book', 'book')

        if (book)
            query.andWhere(
                'LOWER( book.title ) LIKE LOWER( :search )',
                { search: `%${book}%` }
            )

        /*
        if (author)
            query.andWhere(
                'LOWER( book.author ) LIKE LOWER( :search )',
                { search: `%${author}%` }
            )
        */
       
        const readings = await query.getMany()
        return readings
    }

    async createReading(createDto: CreateReadingDto, book: Book, user: User): Promise<Reading>{
        const reading = this.create({
            start: createDto.start,
            end: createDto.end,
            status: createDto.status,
            book: book,
            user: user
        })

        await this.save(reading)

        return reading
    }
}