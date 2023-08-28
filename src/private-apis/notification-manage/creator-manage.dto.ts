import { IsNumber, IsString } from 'class-validator';

export class CreatorUpdateProfileDTO {
  @IsString()
  creatorId: string;
  @IsString()
  password: string;
  @IsNumber()
  timestamp: number;
}

export class CreatorChangePasswordDTO {
  @IsString()
  creatorId: string;
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
