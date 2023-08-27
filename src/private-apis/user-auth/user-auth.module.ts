import { CreatorModule } from '@/model/entity/creator/creator.module';
import { Module } from '@nestjs/common';
import { UserAuthAPIController } from './user-auth.controller';
import { UserAuthAPIService } from './user-auth.service';

@Module({
  imports: [CreatorModule],
  providers: [UserAuthAPIService],
  controllers: [UserAuthAPIController],
  exports: [UserAuthAPIService],
})
export class UserAuthAPIModule {}
