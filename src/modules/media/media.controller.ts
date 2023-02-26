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
  Res,
  StreamableFile,
} from '@nestjs/common';
import * as _ from 'lodash';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators';
import { Role } from '../auth/enums';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private configService: ConfigService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return await this.mediaService.create({
      title: file.filename,
      url: `${this.configService.get<string>('MULTER_DEST')}/${file.filename}`,
    });
  }

  @Post('upload/multiple')
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
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
