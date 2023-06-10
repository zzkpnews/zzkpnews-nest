import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Creator } from './creator.entity';
import { getPasswordHash } from '@/libs/password';
import { CreatorTable } from '@/types/tables';

@Injectable()
export class CreatorRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async findById(id: string): Promise<Creator | null> {
    const result_fields = await this.dataSource<CreatorTable>('creator').where({
      id,
    });
    if (result_fields.length === 0) return null;
    return new Creator(
      result_fields[0].id,
      result_fields[0].title,
      result_fields[0].phone,
      result_fields[0].email,
      result_fields[0].description,
      result_fields[0].address,
      result_fields[0].qq,
      result_fields[0].wechat,
      result_fields[0].weibo,
      result_fields[0].url,
      result_fields[0].logo,
      result_fields[0].salt,
      result_fields[0].passwordHash,
      result_fields[0].closed,
      result_fields[0].coverImage,
    );
  }

  async findAll(): Promise<Creator[]> {
    const result_fields = await this.dataSource<CreatorTable>('creator');
    return result_fields.map(
      (item) =>
        new Creator(
          item.id,
          item.title,
          item.phone,
          item.email,
          item.description,
          item.address,
          item.qq,
          item.wechat,
          item.weibo,
          item.url,
          item.logo,
          item.salt,
          item.passwordHash,
          item.closed,
          item.coverImage,
        ),
    );
  }

  async findClosed(): Promise<Creator[]> {
    const result_fields = await this.dataSource<CreatorTable>('creator').where({
      closed: true,
    });
    return result_fields.map(
      (item) =>
        new Creator(
          item.id,
          item.title,
          item.phone,
          item.email,
          item.description,
          item.address,
          item.qq,
          item.wechat,
          item.weibo,
          item.url,
          item.logo,
          item.salt,
          item.passwordHash,
          item.closed,
          item.coverImage,
        ),
    );
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
    coverImage: string | null,
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
      coverImage,
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
