import { CreatorModule } from '@/model/entity/creator/creator.module';
import { Module } from '@nestjs/common';
import { CreatorManageAPIController } from './creator-manage.controller';
import { CreatorManageAPIService } from './creator-manage.service';

@Module({
  imports: [CreatorModule],
  providers: [CreatorManageAPIService],
  controllers: [CreatorManageAPIController],
  exports: [CreatorManageAPIService],
})
export class CreatorManageAPIModule {}
