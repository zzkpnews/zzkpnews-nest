import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchQueries {
  @IsString()
  @MaxLength(100)
  search_word: string;

  @IsInt()
  @IsOptional()
  timestamp_offset?: number;
}
