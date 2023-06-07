import { DependenceFlags } from '@/constant/dep-flags';
import { SearchResultItemRepository } from '@/model/view/search-result-item/search-result-item.repository';
import { SearchResultItem } from '@/model/view/search-result-item/search-result-item.view';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(
    @Inject(DependenceFlags.SearchResultItemRepository)
    private readonly searchResultItemRepository: SearchResultItemRepository,
  ) {}

  async makeSearch(
    searchWord: string,
    offset = 0,
  ): Promise<SearchResultItem[]> {
    return await this.searchResultItemRepository.find(searchWord, offset, 10);
  }
}
