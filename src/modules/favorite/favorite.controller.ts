import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { CurrentUser, Roles } from '../auth/decorators';
import { Role } from '../auth/enums';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { ICurrentUser } from '../auth/interfaces';
import { FilterFavoriteDto } from './dto/filter-favorite.dto';
import { pick } from 'lodash';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteService.create(createFavoriteDto);
  }

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async find(
    @Query() filterFavoriteDto: FilterFavoriteDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    filterFavoriteDto.user = user.id;

    const options = pick(filterFavoriteDto, ['limit', 'page']);
    const filter = pick(filterFavoriteDto, ['user']);

    return await this.favoriteService.find(options, filter);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoriteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFavoriteDto: UpdateFavoriteDto,
  // ) {
  //   return this.favoriteService.update(+id, updateFavoriteDto);
  // }

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.favoriteService.remove(+id);
  }
}
