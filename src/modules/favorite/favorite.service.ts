import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Room } from '../room/models';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './models/favorite.model';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}
  async create(updateFavorite: UpdateFavoriteDto) {
    return await this.favoriteRepository.insert(updateFavorite);
  }

  async find(options, filter): Promise<Pagination<Favorite>> {
    const queryBuilder = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndMapOne(
        'favorite.room',
        Room,
        'room',
        'favorite.roomId = room.Id',
      )
      .where(filter);

    return await paginate<Favorite>(queryBuilder, options);
  }

  async findOne(updateFavoriteDto: UpdateFavoriteDto): Promise<Favorite> {
    return await this.favoriteRepository
      .createQueryBuilder('favorite')
      .innerJoin('favorite.user', 'user')
      .innerJoin('favorite.room', 'room')
      .where('user.id = :userId', { userId: updateFavoriteDto.user })
      .andWhere('room.id = :roomId', { roomId: updateFavoriteDto.room })
      .getOne();
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(id: number) {
    return await this.favoriteRepository.delete(id);
  }
}
