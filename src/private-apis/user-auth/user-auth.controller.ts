import { UserLoginAuthAPIContent, UserRefreshTokenAPIContent } from '@/interface/private-api/user-auth';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { AuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Body, Controller, Header, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatorLoginAuthDTO, CreatorRefreshTokenDTO, SuperLoginAuthDTO } from './user-auth.dto';
import { UserAuthAPIService } from './user-auth.service';

@Controller('private-api/user-auth')
@UseFilters(APIExceptionFilter)
export class UserAuthAPIController {
  constructor(private readonly userAuthAPIService: UserAuthAPIService) {}

  @Post('creator-login')
  @UseInterceptors(APIInterceptor<UserLoginAuthAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorLogin(@Body() target: CreatorLoginAuthDTO): Promise<UserLoginAuthAPIContent> {
    return await this.userAuthAPIService.creatorLogin(target.creatorId, target.password);
  }

  @Post('super-login')
  @UseInterceptors(APIInterceptor<UserLoginAuthAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async superLogin(@Body() target: SuperLoginAuthDTO): Promise<UserLoginAuthAPIContent> {
    return await this.userAuthAPIService.superLogin(target.password);
  }

  @Post('creator-refresh-token')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<UserRefreshTokenAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorRefreshToken(@Body() target: CreatorRefreshTokenDTO): Promise<UserRefreshTokenAPIContent> {
    return await this.userAuthAPIService.creatorRefreshToken(target.creatorId);
  }

  @Post('super-refresh-token')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<UserRefreshTokenAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async superRefreshToken(): Promise<UserRefreshTokenAPIContent> {
    return await this.userAuthAPIService.superRefreshToken();
  }
}
