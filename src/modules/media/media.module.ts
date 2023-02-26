import * as dayjs from 'dayjs';
import * as fs from 'fs';
import * as slug from 'slug';
import * as multer from 'multer';
import * as path from 'path';
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './models/media.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
        storage: multer.diskStorage({
          destination: async function (req, file, cb) {
            if (
              file.mimetype.match(
                /image\/png|image\/jpeg|image\/jpg|imagesvg\+xml|image\/gif|image\/svg\+xml|video\/mp4/,
              )
            ) {
              let storage = path.join(
                process.cwd(),
                configService.get<string>('MULTER_DEST'),
              );
              if (!fs.existsSync(storage)) {
                fs.mkdirSync(storage, { recursive: true });
              }
              cb(null, storage);
            } else {
              cb(
                new HttpException(
                  `Unsupported file type ${path.extname(file.originalname)}`,
                  HttpStatus.BAD_REQUEST,
                ),
                null,
              );
            }
          },
          filename: async function (req, file, cb) {
            const fileExtname = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExtname, '');
            const uniqueSuffix = `${dayjs().format(
              'HHmmssDDMMYYYY',
            )}${Math.round(Math.random() * 1e6)}`;

            cb(null, `${slug(fileName)}-${uniqueSuffix}${fileExtname}`);
          },
        }),
        fileFilter: async (req: any, file: any, cb: any) => {
          if (
            file.mimetype.match(
              /image\/png|image\/jpeg|image\/jpg|imagesvg\+xml|image\/gif|image\/svg\+xml|video\/mp4/,
            )
          ) {
            cb(null, true);
          } else {
            cb(
              new HttpException(
                `Unsupported file type ${path.extname(file.originalname)}`,
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
          }
        },
        preservePath: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
