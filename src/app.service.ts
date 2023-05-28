import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './model/entity/article/article.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
  ) {}
  async getHello() {
    return await this.articleRepository.find();
  }
}
