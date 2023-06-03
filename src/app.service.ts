import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './model/entity/article/article.entity';
import { DependenceFlags } from './constant/dep-flags';
import { Creator } from './model/entity/creator/creator.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private articleRepository: Repository<Article>,
    @Inject(DependenceFlags.CreatorRepository)
    private creatorRepository: Repository<Creator>,
  ) {}
  async getHello() {
    return await this.creatorRepository.find();
  }
}
