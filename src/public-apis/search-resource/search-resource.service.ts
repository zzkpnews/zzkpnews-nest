import { DependenceFlags } from '@/constant/dep-flags';
import { SearchResourceAPI } from '@/interface/api/search-resource';
import { SearchListItemRepository } from '@/model/view/search-list-item/search-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SearchResourceService {
  constructor(
    @Inject(DependenceFlags.SearchListItemRepository)
    private readonly searchListItemRepository: SearchListItemRepository,
  ) {}

  async makeSearch(
    searchWord: string,
    pageSize?: number,
    pageNum?: number,
    timestampStart?: number,
    timestampEnd?: number,
  ): Promise<SearchResourceAPI> {
    return await this.searchListItemRepository.find({
      searchWord: searchWord,
      pageSize: pageSize && pageSize < 11 ? pageSize : 10,
      pageNum: pageNum,
      timestampStart: timestampStart,
      timestampEnd: timestampEnd,
    });
  }
}
