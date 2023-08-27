import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { CreatorAuthAPIModule } from './user-auth/user-auth.module';
import { ArticleManageAPIModule } from './article-manage/article-manage.module';
@Module({
  imports: [ViewsModule, CreatorAuthAPIModule, ArticleManageAPIModule],
})
export class PrivateApisModule {}
