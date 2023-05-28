import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { bookProviders } from './book.provider';

@Module({
  imports: [DatabaseModule],
  providers: bookProviders,
})
export class BookModule {}
