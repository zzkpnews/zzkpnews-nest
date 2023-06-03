import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Book, BookRepository],
  exports: [Book, BookRepository],
})
export class BookModule {}
