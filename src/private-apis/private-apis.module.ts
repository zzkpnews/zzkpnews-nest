import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [ViewsModule],
})
export class PublicApisModule {}
