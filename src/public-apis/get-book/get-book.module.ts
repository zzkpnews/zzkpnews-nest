import { BookModule } from '@/model/entity/book/book.module';
import { Module } from '@nestjs/common';
import { GetBookAPIController } from './get-book.controller';
import { GetBookAPIService } from './get-book.service';

@Module({
  imports: [BookModule],
  providers: [GetBookAPIService],
  controllers: [GetBookAPIController],
  exports: [GetBookAPIService],
})
export class GetBookAPIModule {}
