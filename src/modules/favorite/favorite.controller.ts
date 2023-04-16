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
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { CurrentUser, Roles } from '../auth/decorators';
import { Role } from '../auth/enums';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { ICurrentUser } from '../auth/interfaces';
import { FilterPaginateFavoriteDto } from './dto/filter-paginate-favorite.dto';
import { pick } from 'lodash';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async changeFavorite(
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    updateFavoriteDto.user = Number(user.id);
    const favorite = await this.favoriteService.findOne(updateFavoriteDto);
    if (!favorite) {
      await this.favoriteService.create(updateFavoriteDto);
      return { status: true };
    } else {
      await this.favoriteService.remove(favorite.id);
      return { status: false };
    }
  }

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list')
  async find(
    @Query() filterFavoriteDto: FilterPaginateFavoriteDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    filterFavoriteDto.user = Number(user.id);

    const options = pick(filterFavoriteDto, ['limit', 'page']);
    const filter = pick(filterFavoriteDto, ['user']);

    return await this.favoriteService.find(options, filter);
  }
}
