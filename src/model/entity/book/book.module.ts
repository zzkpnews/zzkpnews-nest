import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BookProviders } from './book.provider';

@Module({
  imports: [DatabaseModule],
  providers: [Book, ...BookProviders],
  exports: [Book, ...BookProviders],
})
export class BookModule {}
