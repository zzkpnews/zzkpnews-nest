import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetBooksListQueries {
  @IsString()
  @IsOptional()
  creator_id?: string;

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
