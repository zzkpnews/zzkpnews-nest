import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchQueries {
  @IsString()
  @MaxLength(100)
  search_word: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  timestamp_start?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  timestamp_end?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page_size?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page_num?: number;
}
