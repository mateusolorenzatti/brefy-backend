import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ReadModule } from 'src/read/read.module';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BooksRepository]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => ReadModule),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
