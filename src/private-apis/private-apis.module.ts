import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { UserAuthAPIModule } from './user-auth/user-auth.module';
import { ArticleManageAPIModule } from './article-manage/article-manage.module';
@Module({
  imports: [ViewsModule, UserAuthAPIModule, ArticleManageAPIModule],
})
export class PrivateApisModule {}
