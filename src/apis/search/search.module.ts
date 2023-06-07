import { SearchResultItemModule } from '@/model/view/search-result-item/search-result-item.module';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

@Module({
  imports: [SearchResultItemModule],
  providers: [SearchService],
  exports: [SearchResultItemModule, SearchService],
})
export class SearchModule {}
