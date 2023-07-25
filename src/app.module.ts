import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import conf from './configure/config';
import { ConfigValidate } from './configure/config.validation';
import { PublicApisModule } from './public-apis/public-apis.module';
import { TemplatesModule } from './template/templates.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env'],
      validate: ConfigValidate,
      load: [conf],
      isGlobal: true,
    }),
    TemplatesModule,
    PublicApisModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./data/static'),
      serveRoot: '/static',
      serveStaticOptions: {
        setHeaders: (res) => res.set('Access-Control-Allow-Origin', '*'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
