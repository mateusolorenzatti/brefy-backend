import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ReadingsModule } from 'src/readings/readings.module';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BooksRepository]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => ReadingsModule),
  ],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
