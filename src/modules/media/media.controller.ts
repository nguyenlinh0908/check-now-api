import { CreateMediaDto } from './dto/create-media.dto';
import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import * as _ from 'lodash';
import { MediaService } from './media.service';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, Roles } from '../auth/decorators';
import { Role } from '../auth/enums';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { ICurrentUser } from '../auth/interfaces';
import { MediaTag } from './enum';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private configService: ConfigService,
  ) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        user: {
          type: 'string',
        },
        room: {
          type: 'string',
        },
        tag: {
          type: 'enum',
          enum: [MediaTag.AVATAR, MediaTag.CONTENT],
        },
      },
      required: ['file', 'tag'],
    },
  })
  @Roles(Role.HOST, Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @Body()
    body: { user: string; room: string; tag: MediaTag },
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: ICurrentUser,
  ) {
    return await this.mediaService.create({
      title: file.filename,
      type: file.mimetype,
      author: Number(user.id),
      url: `${this.configService.get<string>('MULTER_DEST')}/${file.filename}`,
      // tag: body?.tag,
    });
  }

  @ApiBearerAuth()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        user: {
          type: 'string',
        },
        room: {
          type: 'string',
        },
        tag: {
          type: 'enum',
          enum: [MediaTag.AVATAR, MediaTag.CONTENT],
        },
      },
      required: ['files', 'tag'],
    },
  })
  @Roles(Role.HOST, Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiple(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body()
    body: {
      user: string;
      room: string;
      // tag: MediaTag;
    },
    @CurrentUser() user: ICurrentUser,
  ) {
    let createMultipleMediaDto: CreateMediaDto[];

    createMultipleMediaDto = _.map(files, (file) => {
      return {
        title: file.filename,
        url: `${this.configService.get<string>('MULTER_DEST')}/${
          file.filename
        }`,
        type: file.mimetype,
        author: user.id,
        user: body.user ? body.user : null,
        room: body.room ? body.room : null,
        // tag: body?.tag,
      };
    });

    const uploadFile = await this.mediaService.createMany(
      createMultipleMediaDto,
    );

    if (uploadFile) {
      return { message: 'Upload successfully' };
    }
    return { message: 'Upload failed' };
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const media = await this.mediaService.findOne(+id);
    return media;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
