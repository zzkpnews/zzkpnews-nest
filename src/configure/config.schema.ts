import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfigureFileSchema {
  @IsString()
  @IsNotEmpty()
  MYSQL_USERNAME: string;
  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD: string;
  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE: string;
  @IsString()
  @IsNotEmpty()
  MYSQL_HOSTNAME: string;
  @IsNumber()
  @IsOptional()
  MYSQL_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATA_PATH: string;
  @IsString()
  @IsNotEmpty()
  LOG_PATH: string;

  @IsNumber()
  @IsOptional()
  SERVER_PORT: number;
  @IsString()
  @IsNotEmpty()
  SERVER_HOSTNAME: string;
}
