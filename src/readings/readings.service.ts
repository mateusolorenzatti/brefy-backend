import { Controller, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/auth/user.entity';
import { UsersService } from 'src/auth/users.service';
import { BooksService } from 'src/books/books.service';
import { CreateReadingDto } from './dto/create-reading';
import { GetReadingsFilterDto } from './dto/get-readings-filter';
import { UpdateReadingDto } from './dto/update-reading';
import { Reading } from './reading.entity';
import { ReadingsRepository } from './readings.repository';

@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(ReadingsRepository)
        private readingsRepository: ReadingsRepository,
        private booksService: BooksService,
        private usersService: UsersService,
    ) { }

    async getReadingsByUser(filterDto: GetReadingsFilterDto, sessionUser: User): Promise<Reading[]> {
        let readings: Reading[]

        if (filterDto.user) {
            let user = await this.usersService.getUserById(filterDto.user)
            readings = await this.readingsRepository.getReadingsByUser(filterDto, user)
            readings = readings.filter(reading => reading.public)

        } else {
            readings = await this.readingsRepository.getReadingsByUser(filterDto, sessionUser)

        }

        return readings
    }

    async createReading(createDto: CreateReadingDto, user: User): Promise<Reading> {
        const book = await this.booksService.getBookById(createDto.book)

        return this.readingsRepository.createReading(createDto, book, user)
    }

    async getReadingById(id: string, user: User): Promise<Reading> {
        let found = new Reading()
        let notFoundMessage = `Reading with ID ${id} not found`

        try {

            found = await this.readingsRepository.findOne({
                where: [
                    { id, user },
                    { id, public: 1 }
                ]
            })

        } catch (QueryFailedError) {
            throw new NotFoundException(notFoundMessage)
        }

        if (!found) throw new NotFoundException(notFoundMessage)

        return found
    }

    async deleteReading(id: string, user: User): Promise<void> {
        const result = await this.readingsRepository.delete({ id, user })

        if (result.affected === 0)
            throw new NotFoundException(`Reading with ID ${id} not found`)
    }

    async updateReading(id: string, updatedBook: UpdateReadingDto, user: User): Promise<Reading> {
        const reading = await this.readingsRepository.findOne({
            where: [{ id, user }]
        })

        if (!reading)
            throw new NotFoundException(`Reading with ID ${id} not found`)

        reading.start = updatedBook.start ? updatedBook.start : reading.start
        reading.end = updatedBook.end ? updatedBook.end : reading.end
        reading.status = updatedBook.status ? updatedBook.status : reading.status
        reading.public = (!(updatedBook.public === null)) ? updatedBook.public : reading.public

        await this.readingsRepository.save(reading)

        return reading
    }

}
