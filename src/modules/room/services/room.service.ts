import { Favorite } from './../../favorite/models/favorite.model';
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
    return (await this.roomRepository.insert(createRoomDto)).generatedMaps[0];
  }

  async findOne(id: String) {
    return await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndMapOne(
        'room.avatar',
        Media,
        'media',
        'room.id = media.roomId',
      )
      .leftJoinAndMapOne(
        'room.favorite',
        Favorite,
        'favorite',
        'room.id = favorite.roomId AND favorite.userId = 12',
      )
      .leftJoinAndMapOne('room.user', User, 'user', 'room.user = user.id')
      .innerJoinAndSelect('room.province', 'province')
      .innerJoinAndSelect('room.district', 'district')
      .innerJoinAndSelect('room.ward', 'ward')
      .where({ id: id })
      .getOne();
  }

  async find(filter: any, orderBy: any) {
    const queryBuilder = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndMapOne(
        'room.avatar',
        Media,
        'media',
        'room.id = media.roomId',
      )
      .leftJoinAndMapOne(
        'room.favorite',
        Favorite,
        'favorite',
        'room.id = favorite.roomId AND favorite.userId = 12',
      )
      .innerJoinAndSelect('room.province', 'province')
      .innerJoinAndSelect('room.district', 'district')
      .innerJoinAndSelect('room.ward', 'ward')
      .where(filter)
      .orderBy('room.created_at', 'DESC')
      .getMany();

    return queryBuilder;
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

  async findById(id: number): Promise<Room> {
    return await this.roomRepository.findOne({ where: { id: id } });
  }

  async delete(id: String) {
    await this.deleteFavorite(id);
    await this.deleteMedia(id);
    return await this.roomRepository
      .createQueryBuilder('room')
      .delete()
      .from(Room)
      .where('id = :id', { id: Number(id) })
      .execute();
  }

  async deleteFavorite(id: String) {
    return await this.roomRepository
      .createQueryBuilder('favorite')
      .delete()
      .from(Favorite)
      .where('roomId = :id', { id: Number(id) })
      .execute();
  }

  async deleteMedia(id: String) {
    return await this.roomRepository
      .createQueryBuilder('media')
      .delete()
      .from(Media)
      .where('roomId = :id', { id: Number(id) })
      .execute();
  }
}
