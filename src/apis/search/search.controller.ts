import { Controller, Get, Header, Query } from '@nestjs/common';
import { SearchQueries } from './search.dto';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async search(
    @Query()
    searchQueries: SearchQueries,
  ) {
    return await this.searchService.makeSearch(
      searchQueries.search_word,
      searchQueries.timestamp_offset,
    );
  }
}
