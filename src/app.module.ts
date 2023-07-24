import { Module } from '@nestjs/common';
import { PublicApisModule } from './public-apis/public-apis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './template/templates.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [process.env.NODE_ENV === 'dev' ? 'dev.env' : 'prod.env'],
    //   isGlobal: true,
    // }),
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
console.log(process.env.NODE_ENV);
