import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';
import { ReadController } from './read.controller';
import { ReadRepository } from './read.repository';
import { ReadService } from './read.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadRepository]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => BooksModule),
  ],
  controllers: [ReadController],
  providers: [ReadService]
})
export class ReadModule { }
