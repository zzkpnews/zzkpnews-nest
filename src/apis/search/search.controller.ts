import { Controller, Get, Header, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async search(
    @Query('search_word') search_word: string,
    @Query('offset') offset: number,
  ) {
    return await this.searchService.makeSearch(search_word, offset);
  }
}
