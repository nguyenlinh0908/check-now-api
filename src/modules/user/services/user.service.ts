import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { User } from '../models';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { FilterUserDto } from '../dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const user = await this.userRepository.insert(body);
    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find({
      select: { id: true, username: true, role: true },
    });
    return allUsers;
  }

  async findOne(filter): Promise<User> {
    const user = await this.userRepository.findOne({ where: filter });
    return user;
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async isExistUser(filter): Promise<Boolean> {
    const isExist = await this.userRepository.exist({
      where: filter,
    });
    return isExist;
  }

  async find(
    options: IPaginationOptions,
    filter: FilterUserDto,
    orderBy: any,
  ): Promise<Pagination<User>> {
    return await paginate<User>(this.userRepository, options, {
      where: {
        ...filter,
      },
      order: {
        ...orderBy,
      },
    });
  }
}
