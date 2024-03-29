import { Favorite } from './modules/favorite/models/favorite.model';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RewriteApiEndpointMiddleware } from './app.middleware';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Token } from './modules/auth/models';
import { HttpExceptionFilter, TransformInterceptor } from './helpers';
import { User } from './modules/user/models';
import { UserModule } from './modules/user/user.module';
import { LocationModule } from './modules/location/location.module';
import { RoomModule } from './modules/room/room.module';
import { Room } from './modules/room/models';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { MediaModule } from './modules/media/media.module';
import { Media } from './modules/media/models/media.model';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';
import { District, Province, Street, Ward } from './modules/location/models';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<ServeStaticModuleOptions[]> => {
        return [
          {
            rootPath: join(
              __dirname,
              '..',
              configService.get<string>('MULTER_DEST'),
            ),
            serveRoot: `/${configService.get<string>('MULTER_DEST')}/`,
          },
        ];
      },
      inject: [ConfigService],
    }),
    // config module import
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // config database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Token,
          Room,
          Media,
          Favorite,
          Province,
          District,
          Street,
          Ward,
        ],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),

    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (
    //     configService: ConfigService,
    //   ): Promise<RedisModuleOptions> => {
    //     return {
    //       config: {
    //         host: configService.get('REDIS_HOST'),
    //         port: configService.get('REDIS_PORT'),
    //       },
    //     };
    //   },
    // }),

    AuthModule,
    UserModule,
    LocationModule,
    RoomModule,
    FavoriteModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RewriteApiEndpointMiddleware,

    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RewriteApiEndpointMiddleware).forRoutes('/api/v1'); // <--- not the .forRoutes('*')
  }
}
