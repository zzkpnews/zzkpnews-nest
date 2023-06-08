import { Module } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './template/templates.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TemplatesModule,
    ApisModule,
    ServeStaticModule.forRoot({
      rootPath: './data',
      serveRoot: 'static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
