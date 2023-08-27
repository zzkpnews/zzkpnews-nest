import { UserLoginAuthAPIContent, UserRefreshTokenAPIContent } from '@/interface/private-api/user-auth';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { AuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Body, Controller, Header, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatorLoginAuthDTO } from './user-auth.dto';
import { CreatorAuthAPIService } from './user-auth.service';

@Controller('private-api/user-auth')
@UseFilters(APIExceptionFilter)
export class UserAuthAPIController {
  constructor(private readonly userAuthAPIService: CreatorAuthAPIService) {}

  @Post('creator-login')
  @UseInterceptors(APIInterceptor<UserLoginAuthAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorLogin(@Body() loginPost: CreatorLoginAuthDTO): Promise<UserLoginAuthAPIContent> {
    return await this.userAuthAPIService.creatorLogin(loginPost.creatorId, loginPost.password);
  }

  @Post('creator-refresh-token/:creator_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<UserRefreshTokenAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async creatorRefreshToken(@Param('creator_id') creatorId: string): Promise<UserRefreshTokenAPIContent> {
    return await this.userAuthAPIService.creatorRefreshToken(creatorId);
  }
}
