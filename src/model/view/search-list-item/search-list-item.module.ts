import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { SearchListItemProviders } from './search-list-item.providers';
import { SearchListItem } from './search-list-item.view';

@Module({
  imports: [DatabaseModule],
  providers: [SearchListItem, ...SearchListItemProviders],
  exports: [SearchListItem, ...SearchListItemProviders],
})
export class SearchListItemModule {}
