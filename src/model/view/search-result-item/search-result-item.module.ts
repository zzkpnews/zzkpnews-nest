import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { SearchResultItemProviders } from './search-result-item.providers';
import { SearchResultItem } from './search-result-item.view';

@Module({
  imports: [DatabaseModule],
  providers: [SearchResultItem, ...SearchResultItemProviders],
  exports: [SearchResultItem, ...SearchResultItemProviders],
})
export class SearchResultItemModule {}
