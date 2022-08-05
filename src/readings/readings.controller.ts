import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReadingDto } from './dto/create-reading';
import { GetReadingsFilterDto } from './dto/get-readings-filter';
import { UpdateReadingDto } from './dto/update-reading';
import { Reading } from './reading.entity';
import { ReadingsService } from './readings.service';

@Controller('readings')
@UseGuards(AuthGuard())
export class ReadingsController {
    constructor(private readingsService: ReadingsService) { }

    @Get()
    getReadings(
        @Param('userId') userId: string,
        @Query() filterDto: GetReadingsFilterDto,
        @GetUser() user: User
    ): Promise<Reading[]> {
        return this.readingsService.getReadingsByUser(filterDto, user)
    }

    @Post()
    createReading(
        @Body() createDto: CreateReadingDto,
        @GetUser() user: User
    ): Promise<Reading> {
        return this.readingsService.createReading(createDto, user)
    }
    
    @Get('/:id')
    getReadingById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Reading> {
        return this.readingsService.getReadingById(id, user)
    }
    
    @Delete('/:id')
    deleteReading(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<void> {
        return this.readingsService.deleteReading(id, user)
    }

    @Put('/:id')
    updateBook(
        @Param('id') id: string,
        @Body() updatedReading: UpdateReadingDto,
        @GetUser() user: User
    ): Promise<Reading> {
        return this.readingsService.updateReading(id, updatedReading, user)
    }

}
