import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Creator } from './creator.entity';
import { getPasswordHash } from '@/libs/password';

@Injectable()
export class CreatorRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async findById(id: string): Promise<Creator | null> {
    return null;
  }

  async create(
    id: string,
    title: string,
    phone: string,
    email: string,
    description: string | null,
    address: string | null,
    qq: string | null,
    wechat: string | null,
    weibo: string | null,
    url: string | null,
    logo: string | null,
    password: string,
  ): Promise<Creator> {
    const { salt, hash } = getPasswordHash(password);
    return new Creator(
      id,
      title,
      phone,
      email,
      description,
      address,
      qq,
      wechat,
      weibo,
      url,
      logo,
      salt,
      hash,
      false,
    );
  }

  async save(creator: Creator): Promise<void> {
    await this.dataSource('creator')
      .insert({
        id: creator.id,
        title: creator.title,
        phone: creator.phone,
        email: creator.email,
        description: creator.description,
        address: creator.address,
        qq: creator.qq,
        wechat: creator.wechat,
        weibo: creator.weibo,
        url: creator.url,
        logo: creator.logo,
        salt: creator.salt,
        passwordHash: creator.passwordHash,
        closed: creator.closed,
      })
      .onConflict()
      .merge();
  }
}
