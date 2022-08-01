import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReadingDto } from './dto/create-reading';
import { GetReadingsFilterDto } from './dto/get-readings-filter';
import { Reading } from './reading.entity';
import { ReadingsService } from './readings.service';

@Controller('readings')
@UseGuards(AuthGuard())
export class ReadingsController {
    constructor(private readingsService: ReadingsService) { }

    @Get()
    getReadings(
        @Query() filterDto: GetReadingsFilterDto
    ): Promise<Reading[]> {
        return this.readingsService.getReadings(filterDto)
    }

    @Post()
    createReading(
        @Body() createDto: CreateReadingDto,
        @GetUser() user: User
    ): Promise<Reading> {
        return this.readingsService.createReading(createDto, user)
    }

    /*
    ToDo:
        - Filter for public tag and owner of reading
        - Create getReadingsByUser (public for not owners and all for owner)
    */
    
    @Get('/:id')
    getReadingById(@Param('id') id: string): Promise<Reading> {
        return this.readingsService.getReadingById(id)
    }

    /*
    
    @Delete('/:id')
    deleteBook(@Param('id') id: string): Promise<void> {
        return this.booksService.deleteBook(id)
    }

    @Put('/:id')
    updateBook(
        @Param('id') id: string,
        @Body() updatedBook: CreateBookDto,
    ): Promise<Book> {
        return this.booksService.updateBook(id, updatedBook)
    }

    */
}
