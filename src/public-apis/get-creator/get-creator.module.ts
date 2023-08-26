import { CreatorModule } from '@/model/entity/creator/creator.module';
import { Module } from '@nestjs/common';
import { GetCreatorAPIController } from './get-creator.controller';
import { GetCreatorAPIService } from './get-creator.service';

@Module({
  imports: [CreatorModule],
  providers: [GetCreatorAPIService],
  controllers: [GetCreatorAPIController],
  exports: [GetCreatorAPIService],
})
export class GetCreatorAPIModule {}
