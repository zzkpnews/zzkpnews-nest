import { IsString } from 'class-validator';

export class CreatorLoginAuthDTO {
  @IsString()
  creatorId: string;
  @IsString()
  password: string;
}

export class SuperLoginAuthDTO {
  @IsString()
  password: string;
}

export class CreatorRefreshTokenDTO {
  @IsString()
  creatorId: string;
}
