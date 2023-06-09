import { Controller, Get, Header, Query } from '@nestjs/common';
import { SearchQueries } from './search-resource.dto';
import { SearchResourceService } from './search-resource.service';

@Controller('api/search-resource')
export class SearchResourceController {
  constructor(private readonly searchResourceService: SearchResourceService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async search(
    @Query()
    searchQueries: SearchQueries,
  ) {
    return await this.searchResourceService.makeSearch(
      searchQueries.search_word,
      searchQueries.page_size,
      searchQueries.page_num,
      searchQueries.timestamp_start,
      searchQueries.timestamp_end,
    );
  }
}
