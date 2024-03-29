import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ReadingsModule } from './readings/readings.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    ReadingsModule,
    AuthorsModule,
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'brefy',
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
