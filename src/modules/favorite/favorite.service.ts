import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FilterFavoriteDto } from './dto/filter-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './models/favorite.model';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.insert(createFavoriteDto);
  }

  async find(options, filter): Promise<Pagination<Favorite>> {
    return await paginate<Favorite>(this.favoriteRepository, options, {
      where: filter,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(id: number) {
    return await this.favoriteRepository.delete(id);
  }
}
