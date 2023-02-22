import { FilterRoomDto } from './../dto/filter-room.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { ICurrentUser } from 'src/modules/auth/interfaces';
import { CreateRoomDto } from '../dto';
import { RoomService } from '../services';

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

  @Roles(Role.ADMIN, Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'rooms list' })
  @Get()
  async rooms(
    @Param() filter: FilterRoomDto,
    @CurrentUser() userInfo: ICurrentUser,
  ) {
    filter.user = userInfo.id;
    return await this.roomService.find(filter);
  }
}
