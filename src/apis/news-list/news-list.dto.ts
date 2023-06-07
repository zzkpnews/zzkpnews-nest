import { Optional } from '@nestjs/common';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class GetNewsListQueries {
  @IsString()
  @IsOptional()
  section_id?: string;

  @IsString()
  @IsOptional()
  creator_id?: string;

  @IsString()
  @IsOptional()
  group_id?: string;

  @IsString()
  @IsOptional()
  topic_id?: string;

  @Optional()
  @IsIn(['article', 'video', 'all'])
  type?: 'article' | 'video' | 'all';

  @IsInt()
  @IsOptional()
  timestamp_offset?: number;
}
