import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

    /* ToDo: 
        Validation for:
            - Book does not exists
            - Status does not exists
            - Blocked users (in general)
    */

    @Post()
    createReading(
        @Body() createDto: CreateReadingDto,
        @GetUser() user: User
    ): Promise<Reading> {
        return this.readingsService.createReading(createDto, user)
    }
    
    /*

    @Get('/:id')
    getBookById(@Param('id') id: string): Promise<Book> {
        return this.booksService.getBookById(id)
    }


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
