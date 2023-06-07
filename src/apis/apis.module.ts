import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';

@Module({
  imports: [ViewsModule, SearchModule],
  controllers: [SearchController],
})
export class ApisModule {}
