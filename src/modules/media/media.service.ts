import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all media`;
  }

  async findOne(id: number): Promise<Media> {
    return await this.mediaRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
