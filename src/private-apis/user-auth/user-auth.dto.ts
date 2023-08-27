import { IsNumber, IsString } from 'class-validator';

export class CreatorLoginAuthDTO {
  @IsString()
  creatorId: string;
  @IsString()
  password: string;
  @IsNumber()
  timestamp: number;
}

export class CreatorLogoutAuthDTO {
  @IsString()
  creatorId: string;
  @IsNumber()
  timestamp: number;
}
