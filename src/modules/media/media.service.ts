import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}
  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaRepository.insert(createMediaDto);
  }

  async createMany(createMultipleMediaDto: CreateMediaDto[]) {
    return await this.mediaRepository
      .createQueryBuilder()
      .insert()
      .into(Media)
      .values(createMultipleMediaDto)
      .execute();
  }

  async findAll(roomId: String) {
    const queryBuilder = await this.mediaRepository
      .createQueryBuilder('media')
      .where({ tag: 'content' })
      .where('media.roomId = :roomId', { roomId })
      .getMany();
    return queryBuilder;
  }

  async findOne(id: number): Promise<Media> {
    return await this.mediaRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteByRoomId(roomID: number) {
    return await this.mediaRepository.delete({ room: roomID });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
