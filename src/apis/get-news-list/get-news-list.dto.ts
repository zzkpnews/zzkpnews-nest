import { Optional } from '@nestjs/common';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  only_home_hot?: boolean;

  @IsBoolean()
  @IsOptional()
  only_section_hot?: boolean;

  @IsBoolean()
  @IsOptional()
  only_creator_hot?: boolean;

  @IsString()
  @IsOptional()
  topic_id?: string;

  @Optional()
  @IsIn(['article', 'video', 'all'])
  type?: 'article' | 'video' | 'all';

  @IsInt()
  @IsOptional()
  timestamp_offset?: number;

  @IsInt()
  @IsOptional()
  count?: number;
}
