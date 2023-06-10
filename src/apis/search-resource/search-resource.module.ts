import { SearchListItemModule } from '@/model/view/search-list-item/search-list-item.module';
import { Module } from '@nestjs/common';
import { SearchResourceService } from './search-resource.service';
import { SearchResourceController } from './search-resource.controller';

@Module({
  imports: [SearchListItemModule],
  providers: [SearchResourceService],
  controllers: [SearchResourceController],
  exports: [SearchResourceService],
})
export class SearchResourceModule {}
