import { CreatorChangePasswordAPIContent } from '@/interface/private-api/creator-manage';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { CreatorAuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Body, Controller, Header, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatorChangePasswordDTO } from './creator-manage.dto';
import { CreatorManageAPIService } from './creator-manage.service';

@Controller('private-api/creator-manage')
@UseFilters(APIExceptionFilter)
export class CreatorManageAPIController {
  constructor(private readonly creatorManageAPIService: CreatorManageAPIService) {}

  @Post('change-password')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<CreatorChangePasswordAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async changePassword(@Body() task: CreatorChangePasswordDTO): Promise<CreatorChangePasswordAPIContent> {
    return await this.creatorManageAPIService.changePassword(task.creatorId, task.oldPassword, task.newPassword);
  }
}
