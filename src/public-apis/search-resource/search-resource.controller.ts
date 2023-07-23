import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { ParamsValidationPipe } from '@/rc/pipe/vaildation.pipe';
import { Controller, Get, Header, Query, UseInterceptors } from '@nestjs/common';
import { SearchQueries } from './search-resource.dto';
import { SearchResourceService } from './search-resource.service';
import { SearchResourceAPI } from '@/interface/api/search-resource';

@Controller('api/search-resource')
export class SearchResourceController {
  constructor(private readonly searchResourceService: SearchResourceService) {}

  @Get()
  @UseInterceptors(APIInterceptor<SearchResourceAPI[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async search(
    @Query(new ParamsValidationPipe())
    searchQueries: SearchQueries,
  ): Promise<SearchResourceAPI> {
    return await this.searchResourceService.makeSearch(
      searchQueries.search_word,
      searchQueries.page_size,
      searchQueries.page_num,
      searchQueries.timestamp_start,
      searchQueries.timestamp_end,
    );
  }
}
