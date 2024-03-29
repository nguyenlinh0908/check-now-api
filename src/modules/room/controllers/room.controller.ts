import { FilterRoomDto } from './../dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  Param,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { format } from 'date-fns';
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
import { Room } from '../models';

import { MediaService } from 'src/modules/media/media.service';
import { UpdateRoomDto } from '../dto/update-room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(
    private roomService: RoomService,
    private mediaService: MediaService,
  ) {}

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
      body.user = Number(user.id);
    }
    const room = await this.roomService.create(body);

    return {
      id: room.id,
    };
  }

  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'update room successfully' })
  @Patch(':id')
  async updateRoom(@Param('id') roomID: number, @Body() body: UpdateRoomDto) {
    const updated = await this.roomService.update(roomID, body);
    if (updated?.affected == 1) {
      const roomUpdated = await this.roomService.findOne(String(roomID));
      await this.mediaService.deleteByRoomId(roomUpdated.id);
      return roomUpdated;
    }
    throw new HttpException('update room fail', HttpStatus.BAD_REQUEST);
  }

  @ApiOkResponse({ description: 'rooms list' })
  @Get('list')
  async rooms(@Query() filterRoom: FilterRoomDto) {
    const filter = pick(filterRoom, ['province', 'district', 'ward', 'type']);
    const order = pick(filterRoom, ['order_by']);
    const rooms = await this.roomService.find(filter, order);

    const formattedRooms = rooms.map((room) => {
      return {
        id: room.id,
        name: room.name,
        description: room.description,
        micro_address: room.micro_address,
        type: room.type,
        star: room.star,
        price: room.price,
        acreage: room.acreage,
        status: room.status,
        expired: room.expired,
        avatar: room['avatar'],
        favorite: room['favorite'],
        address: `${room.ward['_name']}, ${room.district['_name']}, ${room.province['_name']}`,
        created_at: format(room.created_at, 'dd-MM-yyyy HH:mm'),
      };
    });
    return formattedRooms;
  }

  @ApiCreatedResponse({ description: 'room detail' })
  @Get(':id')
  async room(
    @Param('id')
    id: String,
  ) {
    const medias = await this.mediaService.findAll(id);
    const roomFound = await this.roomService.findOne(id);
    return {
      ...roomFound,
      address: `${roomFound.ward['_name']}, ${roomFound.district['_name']}, ${roomFound.province['_name']}`,
      created_at: format(roomFound.created_at, 'dd-MM-yyyy HH:mm'),
      medias,
    };
  }

  @ApiBearerAuth()
  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('host/list')
  async roomsByHost(
    @Query() filterRoom: FilterRoomDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    //get rooms by host
    filterRoom.user = user.id;

    const filter = pick(filterRoom, ['province', 'user']);
    const order = pick(filterRoom, ['order_by']);
    const rooms = await this.roomService.find(filter, order);

    const formattedRooms = rooms.map((room) => {
      return {
        id: room.id,
        name: room.name,
        description: room.description,
        micro_address: room.micro_address,
        type: room.type,
        star: room.star,
        price: room.price,
        acreage: room.acreage,
        expired: room.expired,
        avatar: room['avatar'],
        favorite: room['favorite'],
        address: `${room.ward['_name']}, ${room.district['_name']}, ${room.province['_name']}`,
        created_at: format(room.created_at, 'dd-MM-yyyy HH:mm'),
      };
    });
    return formattedRooms;
  }

  @ApiOkResponse({ description: 'get all rooms' })
  @Get('list/all')
  async allRooms() {
    return await this.roomService.findAll();
  }

  @ApiOkResponse({ description: 'get detail room' })
  @Get('detail')
  async detail(@Query('id') id: number): Promise<Room> {
    return await this.roomService.findById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.HOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteRoom = await this.roomService.delete(id);

    if (deleteRoom) {
      return {
        message: 'Deleted',
      };
    }
    return {
      message: 'failed',
    };
  }
}
