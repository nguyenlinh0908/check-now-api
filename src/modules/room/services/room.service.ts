import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Media } from 'src/modules/media/models/media.model';
import { User } from 'src/modules/user/models';
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

  async findOne(id: String) {
    return await this.roomRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async find(
    options: IPaginationOptions,
    filter: any,
    orderBy: any,
  ): Promise<Pagination<Room>> {
    const queryBuilder = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndMapOne(
        'room.avatar',
        Media,
        'media',
        'room.id = media.roomId',
      )
      .where(filter);
    return await paginate<Room>(queryBuilder, options);
  }

  async findAll() {
    const queryBuilder = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndMapOne(
        'room.avatar',
        Media,
        'media',
        'room.id = media.roomId',
      )
      .getMany();
    return queryBuilder;
  }
}
