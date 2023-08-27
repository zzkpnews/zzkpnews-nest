import { CreatorModule } from '@/model/entity/creator/creator.module';
import { Module } from '@nestjs/common';
import { UserAuthAPIController } from './user-auth.controller';
import { CreatorAuthAPIService } from './user-auth.service';

@Module({
  imports: [CreatorModule],
  providers: [CreatorAuthAPIService],
  controllers: [UserAuthAPIController],
  exports: [CreatorAuthAPIService],
})
export class CreatorAuthAPIModule {}
