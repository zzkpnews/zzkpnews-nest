import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetBooksListQueries {
  @IsString()
  @IsOptional()
  creator_id?: string;

  @IsInt()
  @IsOptional()
  timestamp_offset?: number;

  @IsInt()
  @IsOptional()
  count?: number;
}
