import { FilterRoomDto } from './../dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { ICurrentUser } from 'src/modules/auth/interfaces';
import { CreateRoomDto } from '../dto';
import { RoomService } from '../services';
import { pick } from 'lodash';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'create room successfully' })
  @Post()
  async createRoom(
    @Body() body: CreateRoomDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    if (user.id) {
      body.user = user.id;
    }
    return await this.roomService.create(body);
  }

  @ApiOkResponse({ description: 'rooms list' })
  @Get('list')
  async rooms(@Query() filterRoom: FilterRoomDto) {
    const options = pick(filterRoom, ['limit', 'page']);
    const filter = pick(filterRoom, ['province']);
    const order = pick(filterRoom, ['order_by']);
    return await this.roomService.find(options, filter, order);
  }

  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('host/list')
  async roomsByHost(
    @Query() filterRoom: FilterRoomDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    //get rooms by host
    filterRoom.user = user.id;

    const options = pick(filterRoom, ['limit', 'page']);
    const filter = pick(filterRoom, ['province', 'user']);
    const order = pick(filterRoom, ['order_by']);

    return await this.roomService.find(options, filter, order);
  }
}
