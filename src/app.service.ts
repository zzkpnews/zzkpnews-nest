import { Inject, Injectable } from '@nestjs/common';
import { DependenceFlags } from './constant/dep-flags';
import { ArticleRepository } from './model/entity/article/article.repository';
import { CreatorRepository } from './model/entity/creator/creator.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private articleRepository: ArticleRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private creatorRepository: CreatorRepository,
  ) {}
  async getHello() {
    return {};
  }
}
