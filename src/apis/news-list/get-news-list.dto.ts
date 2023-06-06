import { Optional } from '@nestjs/common';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class GetNewsListQueryDTO {
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
  @IsIn(['article', 'video'])
  type?: 'article' | 'video';

  @IsInt()
  @IsOptional()
  timestamp_offset?: number;
}
