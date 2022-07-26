import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { Book } from './book.entity'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book'
import { GetBooksFilterDto } from './dto/get-books-filter'

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Get()
  getBooks(@Query() filterDto: GetBooksFilterDto): Promise<Book[]> {
    return this.booksService.getBooks(filterDto)
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id)
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto)
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
}
