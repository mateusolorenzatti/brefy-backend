import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'

import { Book } from './book.entity'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book'
import { GetBooksFilterDto } from './dto/get-books-filter'

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Get()
  getTasks(@Query() filterDto: GetBooksFilterDto): Promise<Book[]> {
    return this.booksService.getBooks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id)
  }

  @Post()
  createTask(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id)
  }

  @Put('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updatedBook: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updatedBook)
  }
}
