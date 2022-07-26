import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';
import { ReadingsController } from './readings.controller';
import { ReadingsRepository } from './readings.repository';
import { ReadingsService } from './readings.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([ReadingsRepository]),
      
      forwardRef(() => AuthModule),
      forwardRef(() => BooksModule),
    ],
    controllers: [ReadingsController, ReadingsController],
    providers: [ReadingsService, ReadingsService]
  })
export class ReadingsModule {}
