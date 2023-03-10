import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateRoomDto, FilterRoomDto } from '../dto';
import { Room } from '../models';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.roomRepository.insert(createRoomDto);
  }

  async find(
    options: IPaginationOptions,
    filter: any,
    orderBy: any,
  ): Promise<Pagination<Room>> {
    return await paginate<Room>(this.roomRepository, options, {
      where: {
        ...filter,
      },
      order: {
        created_at: -1,
        ...orderBy,
      },
    });
  }
}
