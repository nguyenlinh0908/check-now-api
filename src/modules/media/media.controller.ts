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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../auth/decorators';
import { Role } from '../auth/enums';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { ICurrentUser } from '../auth/interfaces';

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
      },
      required: ['file'],
    },
  })
  @Roles(Role.HOST, Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: ICurrentUser,
  ) {
    return await this.mediaService.create({
      title: file.filename,
      type: file.mimetype,
      author: user.id,
      url: `${this.configService.get<string>('MULTER_DEST')}/${file.filename}`,
    });
  }

  @ApiBearerAuth()
  @Roles(Role.HOST, Role.ADMIN, Role.USER)
  @Post('upload/multiple')
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {}

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
