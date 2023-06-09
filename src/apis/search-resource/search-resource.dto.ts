import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchQueries {
  @IsString()
  @MaxLength(100)
  search_word: string;

  @IsInt()
  @IsOptional()
  timestamp_start?: number;

  @IsInt()
  @IsOptional()
  timestamp_end?: number;

  @IsInt()
  @IsOptional()
  page_size?: number;

  @IsInt()
  @IsOptional()
  page_num?: number;
}
