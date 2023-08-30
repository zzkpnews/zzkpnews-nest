import { UserLoginAuthAPIContent, UserRefreshTokenAPIContent } from '@/interface/private-api/user-auth';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { CreatorAuthGuard, SuperAuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { CreatorAuthTokenPayload } from '@/types/token-payload';
import { Body, Controller, Header, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatorLoginAuthDTO, SuperLoginAuthDTO } from './user-auth.dto';
import { UserAuthAPIService } from './user-auth.service';

@Controller('private-api/user-auth')
@UseFilters(APIExceptionFilter)
export class UserAuthAPIController {
  constructor(private readonly userAuthAPIService: UserAuthAPIService) {}

  @Post('creator-login')
  @UseInterceptors(APIInterceptor<UserLoginAuthAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorLogin(@Body() target: CreatorLoginAuthDTO): Promise<UserLoginAuthAPIContent> {
    return await this.userAuthAPIService.creatorLogin(target);
  }

  @Post('super-login')
  @UseInterceptors(APIInterceptor<UserLoginAuthAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async superLogin(@Body() target: SuperLoginAuthDTO): Promise<UserLoginAuthAPIContent> {
    return await this.userAuthAPIService.superLogin(target);
  }

  @Post('creator-refresh-token')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<UserRefreshTokenAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorRefreshToken(@Req() request: Request): Promise<UserRefreshTokenAPIContent> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.userAuthAPIService.creatorRefreshToken(authTokenPayload);
  }

  @Post('super-refresh-token')
  @UseGuards(SuperAuthGuard)
  @UseInterceptors(APIInterceptor<UserRefreshTokenAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async superRefreshToken(): Promise<UserRefreshTokenAPIContent> {
    return await this.userAuthAPIService.superRefreshToken();
  }
}
